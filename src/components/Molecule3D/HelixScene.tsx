import { useMemo, useRef, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RUNGS = 42
const RADIUS = 1.15
const HEIGHT = 6.2
const TWIST = Math.PI * 3.2

const ACCENT = new THREE.Color('#B8FF65')
const MINT = new THREE.Color('#8FE3C2')
const FOG = new THREE.Color('#F4F7F2')

type SharedInput = {
  progress: number
  pointerX: number
  pointerY: number
}

function rungPosition(i: number, strand: 0 | 1) {
  const t = i / (RUNGS - 1)
  const angle = t * TWIST + (strand === 1 ? Math.PI : 0)
  return new THREE.Vector3(
    Math.cos(angle) * RADIUS,
    (t - 0.5) * HEIGHT,
    Math.sin(angle) * RADIUS,
  )
}

function Helix({ input }: { input: RefObject<SharedInput> }) {
  const group = useRef<THREE.Group>(null)
  const nodes = useRef<THREE.InstancedMesh>(null)
  const bonds = useRef<THREE.InstancedMesh>(null)
  const orbit = useRef<THREE.Points>(null)

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const scatter = useMemo(() => {
    const rng = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
      return x - Math.floor(x)
    }
    return Array.from({ length: RUNGS * 2 }, (_, i) =>
      new THREE.Vector3(
        (rng(i) - 0.5) * 14,
        (rng(i + 100) - 0.5) * 12,
        (rng(i + 200) - 0.5) * 10,
      ),
    )
  }, [])

  const orbitGeometry = useMemo(() => {
    const count = 160
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 2.6
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * HEIGHT * 1.3
      positions[i * 3] = Math.cos(theta) * r
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(theta) * r
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame((state) => {
    const { progress, pointerX, pointerY } = input.current
    const time = state.clock.elapsedTime

    if (group.current) {
      group.current.rotation.y = time * 0.18 + progress * Math.PI * 1.4
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointerY * 0.28 + 0.12,
        0.06,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        pointerX * -0.16,
        0.06,
      )
    }
    if (orbit.current) {
      orbit.current.rotation.y = -time * 0.05
      const material = orbit.current.material as THREE.PointsMaterial
      material.opacity = 0.14 + progress * 0.25
    }

    if (!nodes.current || !bonds.current) return

    for (let i = 0; i < RUNGS; i++) {
      const stagger = THREE.MathUtils.clamp(progress * 1.6 - (i / RUNGS) * 0.6, 0, 1)
      const eased = 1 - Math.pow(1 - stagger, 3)
      const a = rungPosition(i, 0)
      const b = rungPosition(i, 1)
      const posA = scatter[i * 2].clone().lerp(a, eased)
      const posB = scatter[i * 2 + 1].clone().lerp(b, eased)
      const breathe = 1 + Math.sin(time * 1.4 + i * 0.35) * 0.08

      dummy.position.copy(posA)
      dummy.scale.setScalar(0.09 * breathe * (0.3 + eased * 0.7))
      dummy.updateMatrix()
      nodes.current.setMatrixAt(i * 2, dummy.matrix)
      nodes.current.setColorAt(i * 2, i % 3 === 0 ? ACCENT : MINT)

      dummy.position.copy(posB)
      dummy.scale.setScalar(0.09 * breathe * (0.3 + eased * 0.7))
      dummy.updateMatrix()
      nodes.current.setMatrixAt(i * 2 + 1, dummy.matrix)
      nodes.current.setColorAt(i * 2 + 1, i % 4 === 0 ? FOG : MINT)

      const mid = posA.clone().add(posB).multiplyScalar(0.5)
      const dir = posB.clone().sub(posA)
      dummy.position.copy(mid)
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
      dummy.scale.set(eased, dir.length() * 0.5 * eased, eased)
      dummy.updateMatrix()
      bonds.current.setMatrixAt(i, dummy.matrix)
    }
    nodes.current.instanceMatrix.needsUpdate = true
    if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true
    bonds.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group}>
      <instancedMesh ref={nodes} args={[undefined, undefined, RUNGS * 2]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial
          roughness={0.35}
          metalness={0.15}
          emissive={'#2a4a1f'}
          emissiveIntensity={0.5}
        />
      </instancedMesh>
      <instancedMesh ref={bonds} args={[undefined, undefined, RUNGS]}>
        <cylinderGeometry args={[0.016, 0.016, 2, 8]} />
        <meshStandardMaterial
          color={'#8FE3C2'}
          transparent
          opacity={0.45}
          roughness={0.6}
        />
      </instancedMesh>
      <points ref={orbit} geometry={orbitGeometry}>
        <pointsMaterial size={0.035} color={'#B8FF65'} transparent opacity={0.2} />
      </points>
    </group>
  )
}

export default function HelixScene({
  input,
  frozen,
}: {
  input: RefObject<SharedInput>
  frozen: boolean
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={frozen ? 'demand' : 'always'}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color={'#F4F7F2'} />
      <pointLight position={[-5, -3, 2]} intensity={0.7} color={'#B8FF65'} />
      <Helix input={input} />
    </Canvas>
  )
}

export type { SharedInput }
