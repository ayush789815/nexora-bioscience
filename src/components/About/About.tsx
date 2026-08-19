import { useRef, useState } from 'react'
import { SYSTEM_STAGES } from '../../data/content'
import { useSectionReveal } from '../../animations/useSectionReveal'

/**
 * Editorial section with an interactive circular "biological system" diagram.
 * Hovering (or focusing) a node expands it and shows its supporting detail;
 * on small screens the diagram becomes a vertical stacked system.
 */
export function About() {
  const ref = useRef<HTMLElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  useSectionReveal(ref)

  const cx = 200
  const cy = 200
  const radius = 140

  return (
    <section ref={ref} id="about" className="relative border-t hairline bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p data-reveal className="text-eyebrow mb-6">
            01 — Our Approach
          </p>
          <h2
            data-reveal
            className="font-display text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl"
          >
            Biology is not a limitation.
            <br />
            <span className="text-mint">It's the next interface.</span>
          </h2>
          <p data-reveal className="mt-8 max-w-lg leading-relaxed text-muted">
            Nexora unifies molecular biology, computational science, artificial intelligence, and
            precision engineering into a single research system. Every experiment produces
            structured signal. Every signal trains the models that design the next experiment.
          </p>
          <p data-reveal className="mt-4 max-w-lg leading-relaxed text-muted">
            The result is a continuous loop where living systems become measurable, predictable —
            and ultimately, programmable.
          </p>
          <div data-reveal className="mt-10 rounded-xl border hairline bg-ink/40 p-5">
            <p className="font-display text-xs tracking-[0.2em] text-mint uppercase">
              {SYSTEM_STAGES[activeStage].label}
            </p>
            <p className="mt-2 text-sm text-fog/80">{SYSTEM_STAGES[activeStage].detail}</p>
          </div>
        </div>

        {/* Circular system — desktop */}
        <div data-reveal className="hidden justify-center md:flex">
          <svg viewBox="0 0 400 400" className="w-full max-w-md" aria-hidden="true">
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(244,247,242,0.1)" strokeDasharray="3 6" />
            <circle cx={cx} cy={cy} r={radius - 46} fill="none" stroke="rgba(143,227,194,0.12)" />
            {SYSTEM_STAGES.map((stage, i) => {
              const angle = (i / SYSTEM_STAGES.length) * Math.PI * 2 - Math.PI / 2
              const x = cx + Math.cos(angle) * radius
              const y = cy + Math.sin(angle) * radius
              const next = (i + 1) % SYSTEM_STAGES.length
              const na = (next / SYSTEM_STAGES.length) * Math.PI * 2 - Math.PI / 2
              const nx = cx + Math.cos(na) * radius
              const ny = cy + Math.sin(na) * radius
              const isActive = activeStage === i
              return (
                <g key={stage.label}>
                  <line
                    x1={x}
                    y1={y}
                    x2={nx}
                    y2={ny}
                    stroke={isActive ? 'rgba(184,255,101,0.5)' : 'rgba(244,247,242,0.15)'}
                    className="transition-all duration-500"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 30 : 22}
                    fill={isActive ? 'rgba(184,255,101,0.12)' : 'rgba(11,23,20,0.9)'}
                    stroke={isActive ? '#B8FF65' : 'rgba(143,227,194,0.4)'}
                    className="cursor-pointer transition-all duration-500"
                    onMouseEnter={() => setActiveStage(i)}
                  />
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="middle"
                    className="pointer-events-none fill-fog font-display text-[9px] tracking-widest uppercase"
                  >
                    {stage.label}
                  </text>
                </g>
              )
            })}
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              className="fill-mint font-display text-[10px] tracking-[0.3em] uppercase"
            >
              Continuous
            </text>
            <text
              x={cx}
              y={cy + 12}
              textAnchor="middle"
              className="fill-mint font-display text-[10px] tracking-[0.3em] uppercase"
            >
              Loop
            </text>
          </svg>
        </div>

        {/* Vertical stacked system — mobile */}
        <ol className="flex flex-col gap-1 md:hidden" aria-label="Research system stages">
          {SYSTEM_STAGES.map((stage, i) => (
            <li key={stage.label}>
              <button
                type="button"
                onClick={() => setActiveStage(i)}
                aria-pressed={activeStage === i}
                className={`w-full rounded-lg border px-5 py-4 text-left transition-colors duration-300 ${
                  activeStage === i
                    ? 'border-accent/60 bg-accent/8'
                    : 'hairline border bg-ink/30'
                }`}
              >
                <span className="mr-3 font-display text-xs text-mint">0{i + 1}</span>
                <span className="font-display text-sm tracking-widest uppercase">{stage.label}</span>
                {activeStage === i && <p className="mt-2 text-sm text-muted">{stage.detail}</p>}
              </button>
              {i < SYSTEM_STAGES.length - 1 && (
                <div className="mx-auto h-4 w-px bg-mint/30" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
