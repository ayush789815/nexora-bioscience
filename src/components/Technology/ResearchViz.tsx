import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const BASES = ['A', 'G', 'C', 'T'] as const
const SEQUENCE = [
  { base: 'A', value: '04' },
  { base: 'G', value: '17' },
  { base: 'C', value: '09' },
  { base: 'T', value: '22' },
  { base: 'G', value: '11' },
  { base: 'A', value: '31' },
  { base: 'C', value: '08' },
  { base: 'T', value: '19' },
]

/** Conceptual scientific dashboard — all data shown is fictional. */
export function ResearchViz() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [tick, setTick] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reduced) return
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [visible, reduced])

  const highlight = tick % SEQUENCE.length

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border hairline bg-surface"
      role="img"
      aria-label="Conceptual molecular signal dashboard with fictional data"
    >
      <div className="flex items-center justify-between border-b hairline px-6 py-4">
        <p className="font-display text-xs tracking-[0.28em] text-mint uppercase">
          SEQ. 07A — Molecular Signal
        </p>
        <p className="hidden font-display text-[10px] tracking-[0.2em] text-muted uppercase sm:block">
          Conceptual visualization · fictional data
        </p>
        <span className="flex items-center gap-2 font-display text-[10px] tracking-widest text-accent uppercase">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Live
        </span>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {SEQUENCE.map((s, i) => (
              <div
                key={i}
                className={`flex min-w-14 flex-col items-center rounded-lg border px-3 py-2.5 transition-all duration-500 ${
                  visible && i === highlight
                    ? 'border-accent/70 bg-accent/10 text-accent'
                    : 'hairline border text-fog/70'
                }`}
              >
                <span className="font-display text-lg font-medium">{s.base}</span>
                <span className="font-display text-[10px] text-muted">{s.value}</span>
              </div>
            ))}
          </div>

          {/* waveform */}
          <svg viewBox="0 0 600 120" className="mt-8 w-full" aria-hidden="true">
            <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(244,247,242,0.08)" />
            <polyline
              fill="none"
              stroke="rgba(143,227,194,0.7)"
              strokeWidth="1.5"
              points={Array.from({ length: 61 }, (_, i) => {
                const x = i * 10
                const y =
                  60 -
                  Math.sin(i * 0.55 + tick * 0.7) * 26 * Math.exp(-Math.abs(i - 30) / 28) -
                  Math.sin(i * 1.3) * 6
                return `${x},${y.toFixed(1)}`
              }).join(' ')}
            />
            {[8, 22, 38, 52].map((i) => (
              <circle
                key={i}
                cx={i * 10}
                cy={60 - Math.sin(i * 0.55 + tick * 0.7) * 26 * Math.exp(-Math.abs(i - 30) / 28) - Math.sin(i * 1.3) * 6}
                r="3"
                fill="#B8FF65"
              />
            ))}
          </svg>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t hairline pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <div>
            <p className="font-display text-[10px] tracking-[0.24em] text-muted uppercase">
              Signal stability
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink">
              <div
                className="h-full rounded-full bg-gradient-to-r from-mint to-accent transition-[width] duration-1000 ease-out"
                style={{ width: visible ? '87%' : '0%' }}
              />
            </div>
            <p className="mt-2 font-display text-2xl font-medium text-fog">87%</p>
          </div>
          <div>
            <p className="font-display text-[10px] tracking-[0.24em] text-muted uppercase">Precision</p>
            <p className="mt-2 font-display text-4xl font-medium text-accent">98.4%</p>
          </div>
          <div className="grid grid-cols-4 gap-2" aria-hidden="true">
            {BASES.map((b) => (
              <div key={b} className="rounded-md border hairline py-2 text-center">
                <span className="font-display text-xs text-mint">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
