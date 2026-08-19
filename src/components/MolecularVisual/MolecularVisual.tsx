import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePointerFine } from '../../hooks/usePointerFine'

type Node = {
  x: number
  y: number
  r: number
  phase: number
  speed: number
  orbit: number
  depth: number
}

const ACCENT = '184, 255, 101'
const MINT = '143, 227, 194'
const FOG = '244, 247, 242'

const LABELS = [
  { text: 'SEQ 07-A', x: 0.18, y: 0.16 },
  { text: 'NODE / 42', x: 0.82, y: 0.3 },
  { text: 'SIGNAL 98.4%', x: 0.72, y: 0.82 },
  { text: 'LATTICE-3', x: 0.14, y: 0.72 },
]

/**
 * Procedural molecular network rendered on canvas: orbiting nodes joined by
 * proximity bonds, a DNA-inspired double helix ribbon, and drifting particles.
 * The pointer gently attracts nearby nodes; everything degrades to a static
 * frame when reduced motion is preferred.
 */
export function MolecularVisual({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const pointerFine = usePointerFine()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -1e4, y: -1e4 }

    const nodeCount = window.innerWidth < 768 ? 16 : 26
    const particleCount = window.innerWidth < 768 ? 18 : 36

    let nodes: Node[] = []
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []

    const seed = (n: number) => {
      // deterministic pseudo-random so the layout is stable between resizes
      const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
      return s - Math.floor(s)
    }

    const build = () => {
      nodes = Array.from({ length: nodeCount }, (_, i) => ({
        x: (0.12 + 0.76 * seed(i * 2 + 1)) * width,
        y: (0.1 + 0.8 * seed(i * 3 + 2)) * height,
        r: 1.6 + seed(i * 5 + 3) * 3.4,
        phase: seed(i * 7 + 4) * Math.PI * 2,
        speed: 0.25 + seed(i * 11 + 5) * 0.5,
        orbit: 6 + seed(i * 13 + 6) * 22,
        depth: 0.4 + seed(i * 17 + 7) * 0.6,
      }))
      particles = Array.from({ length: particleCount }, (_, i) => ({
        x: seed(i * 19 + 8) * width,
        y: seed(i * 23 + 9) * height,
        vx: (seed(i * 29 + 10) - 0.5) * 0.25,
        vy: (seed(i * 31 + 11) - 0.5) * 0.25,
        r: 0.6 + seed(i * 37 + 12) * 1.2,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const time = t / 1000

      // helix ribbon
      const cy = height * 0.52
      const amp = Math.min(height * 0.16, 90)
      ctx.lineWidth = 1
      for (const dir of [1, -1]) {
        ctx.beginPath()
        for (let x = 0; x <= width; x += 8) {
          const y = cy + dir * Math.sin(x * 0.012 + time * 0.6) * amp
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(${MINT}, 0.14)`
        ctx.stroke()
      }
      for (let x = 0; x <= width; x += 46) {
        const y1 = cy + Math.sin(x * 0.012 + time * 0.6) * amp
        const y2 = cy - Math.sin(x * 0.012 + time * 0.6) * amp
        ctx.beginPath()
        ctx.moveTo(x, y1)
        ctx.lineTo(x, y2)
        ctx.strokeStyle = `rgba(${MINT}, 0.07)`
        ctx.stroke()
      }

      // node positions this frame
      const pos = nodes.map((n) => {
        const ox = Math.cos(n.phase + time * n.speed) * n.orbit
        const oy = Math.sin(n.phase + time * n.speed * 0.8) * n.orbit
        let x = n.x + ox
        let y = n.y + oy
        const dx = mouse.x - x
        const dy = mouse.y - y
        const dist = Math.hypot(dx, dy)
        if (dist < 180) {
          const pull = ((180 - dist) / 180) * 14 * n.depth
          x += (dx / (dist || 1)) * pull
          y += (dy / (dist || 1)) * pull
        }
        return { x, y, n }
      })

      // bonds
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const a = pos[i]
          const b = pos[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          const max = 150
          if (d < max) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${FOG}, ${(0.14 * (1 - d / max)).toFixed(3)})`
            ctx.stroke()
          }
        }
      }

      // nodes with pulse
      for (const { x, y, n } of pos) {
        const pulse = 0.65 + 0.35 * Math.sin(time * 1.4 + n.phase * 3)
        ctx.beginPath()
        ctx.arc(x, y, n.r, 0, Math.PI * 2)
        ctx.fillStyle =
          n.r > 3.6 ? `rgba(${ACCENT}, ${0.55 * pulse + 0.25})` : `rgba(${MINT}, ${0.4 * pulse + 0.2})`
        ctx.fill()
        if (n.r > 3.6) {
          ctx.beginPath()
          ctx.arc(x, y, n.r + 5 + pulse * 4, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${ACCENT}, ${(0.16 * pulse).toFixed(3)})`
          ctx.stroke()
        }
      }

      // drifting particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${FOG}, 0.18)`
        ctx.fill()
      }

      // scientific labels
      ctx.font = '10px "Space Grotesk", sans-serif'
      for (const l of LABELS) {
        const lx = l.x * width
        const ly = l.y * height + Math.sin(time * 0.7 + l.x * 10) * 4
        ctx.fillStyle = `rgba(${MINT}, 0.55)`
        ctx.fillText(l.text, lx, ly)
        ctx.strokeStyle = `rgba(${MINT}, 0.25)`
        ctx.strokeRect(lx - 6, ly - 11, ctx.measureText(l.text).width + 12, 16)
      }
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -1e4
      mouse.y = -1e4
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
      if (pointerFine) {
        window.addEventListener('pointermove', onMove, { passive: true })
        canvas.addEventListener('pointerleave', onLeave)
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced, pointerFine])

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      role="img"
      aria-label="Animated molecular network visualization — conceptual illustration"
    />
  )
}
