import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { TECH_CARDS } from '../../data/content'
import { useSectionReveal } from '../../animations/useSectionReveal'
import { ResearchViz } from './ResearchViz'

export function Technology() {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)

  return (
    <section ref={ref} id="technology" className="relative border-t hairline py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p data-reveal className="text-eyebrow mb-6">
          02 — Technology
        </p>
        <h2
          data-reveal
          className="max-w-2xl font-display text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl"
        >
          From biological signals to <span className="text-accent">actionable intelligence.</span>
        </h2>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {TECH_CARDS.map((card) => (
            <a
              key={card.index}
              href="#research"
              data-reveal
              data-cursor="OPEN"
              className="group relative overflow-hidden rounded-2xl border hairline bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-mint/40 hover:bg-surface-2 sm:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-sm text-mint transition-transform duration-500 group-hover:-translate-y-1">
                  {card.index}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                />
              </div>
              <h3 className="mt-10 font-display text-xl font-medium tracking-wide uppercase sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{card.body}</p>
              <span className="mt-8 inline-block font-display text-xs tracking-[0.2em] text-fog/60 uppercase transition-colors duration-300 group-hover:text-accent">
                Explore →
              </span>
              {/* hover visualization: expanding pulse rings */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-36 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                {[16, 32, 48].map((r, i) => (
                  <circle
                    key={r}
                    cx="60"
                    cy="60"
                    r={r}
                    fill="none"
                    stroke="rgba(184,255,101,0.35)"
                    strokeDasharray="2 5"
                    className="origin-center animate-[spin_14s_linear_infinite]"
                    style={{ animationDelay: `${i * -3}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}
                  />
                ))}
                <circle cx="60" cy="60" r="4" fill="#B8FF65" />
              </svg>
            </a>
          ))}
        </div>

        <div data-reveal className="mt-16">
          <ResearchViz />
        </div>
      </div>
    </section>
  )
}
