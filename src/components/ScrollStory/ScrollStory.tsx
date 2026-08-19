import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  'Molecular systems appear',
  'Molecules connect',
  'Data points emerge',
  'Structure forms',
  'Signal becomes insight',
] as const

const FLOW = ['BIOLOGY', 'DATA', 'INTELLIGENCE', 'IMPACT'] as const

// deterministic pseudo-random helper for stable node layout
const seed = (n: number) => {
  const s = Math.sin(n * 91.7 + 47.3) * 24634.6345
  return s - Math.floor(s)
}

const NODES = Array.from({ length: 14 }, (_, i) => ({
  sx: 8 + seed(i * 2) * 84, // scattered %
  sy: 12 + seed(i * 3 + 1) * 70,
  gx: 14 + (i % 7) * 12, // grid %
  gy: i < 7 ? 34 : 60,
}))

/**
 * Pinned scroll-driven story: scattered molecular nodes progressively connect,
 * sprout data readouts, then organize into a structured grid that resolves into
 * the BIOLOGY → DATA → INTELLIGENCE → IMPACT flow. With reduced motion, the
 * final state renders statically.
 */
export function ScrollStory() {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) {
      setProgress(1)
      return
    }
    setProgress(0)

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.4,
      onUpdate: (self) => setProgress(self.progress),
    })
    return () => st.kill()
  }, [reduced])

  const stageIndex = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length))
  const connect = gsap.utils.clamp(0, 1, (progress - 0.15) / 0.2) // stage 2
  const dataPhase = gsap.utils.clamp(0, 1, (progress - 0.35) / 0.2) // stage 3
  const structure = gsap.utils.clamp(0, 1, (progress - 0.55) / 0.25) // stage 4-5
  const finale = gsap.utils.clamp(0, 1, (progress - 0.82) / 0.15) // stage 6

  return (
    <section ref={ref} className="relative min-h-svh overflow-hidden border-t hairline bg-ink">
      <div className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
        <p className="text-eyebrow mb-4">04 — The System</p>
        <p className="font-display text-sm text-muted" aria-live="polite">
          {STAGES[stageIndex]}
        </p>

        <div className="relative mt-8 h-[46svh] w-full" aria-hidden="true">
          <svg className="absolute inset-0 h-full w-full">
            {NODES.map((n, i) =>
              NODES.slice(i + 1).map((m, j) => {
                const d = Math.hypot(n.sx - m.sx, n.sy - m.sy)
                if (d > 30) return null
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={`${gsap.utils.interpolate(n.sx, n.gx, structure)}%`}
                    y1={`${gsap.utils.interpolate(n.sy, n.gy, structure)}%`}
                    x2={`${gsap.utils.interpolate(m.sx, m.gx, structure)}%`}
                    y2={`${gsap.utils.interpolate(m.sy, m.gy, structure)}%`}
                    stroke="rgba(143,227,194,0.35)"
                    strokeWidth="1"
                    opacity={connect * (1 - finale * 0.7)}
                  />
                )
              }),
            )}
          </svg>
          {NODES.map((n, i) => {
            const x = gsap.utils.interpolate(n.sx, n.gx, structure)
            const y = gsap.utils.interpolate(n.sy, n.gy, structure)
            return (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%`, opacity: 1 - finale * 0.75 }}
              >
                <span
                  className="block rounded-full bg-accent"
                  style={{
                    width: 6 + (i % 3) * 3,
                    height: 6 + (i % 3) * 3,
                    opacity: 0.4 + 0.6 * connect,
                    boxShadow: connect > 0.5 ? '0 0 12px rgba(184,255,101,0.4)' : 'none',
                  }}
                />
                {i % 4 === 0 && (
                  <span
                    className="absolute top-3 left-2 font-display text-[9px] whitespace-nowrap text-mint"
                    style={{ opacity: dataPhase * (1 - finale) }}
                  >
                    {(0.62 + seed(i) * 0.36).toFixed(3)}
                  </span>
                )}
              </div>
            )
          })}

          {/* final flow */}
          <div
            className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6"
            style={{ opacity: finale, transform: `translateY(${(1 - finale) * 24}px)` }}
          >
            {FLOW.map((word, i) => (
              <span key={word} className="flex items-center gap-4 sm:gap-6">
                <span
                  className={`font-display text-2xl font-semibold tracking-tight sm:text-5xl lg:text-6xl ${
                    i === FLOW.length - 1 ? 'text-accent' : 'text-fog'
                  }`}
                >
                  {word}
                </span>
                {i < FLOW.length - 1 && <span className="text-xl text-mint sm:text-3xl">→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* progress ticks */}
        <div className="mt-6 flex gap-2" aria-hidden="true">
          {STAGES.map((s, i) => (
            <span
              key={s}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= stageIndex ? 'bg-accent' : 'bg-fog/10'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
