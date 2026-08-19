import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { INSIGHTS } from '../../data/content'
import { useSectionReveal } from '../../animations/useSectionReveal'

export function Research() {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)

  return (
    <section ref={ref} id="research" className="relative border-t hairline bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p data-reveal className="text-eyebrow mb-6">
          06 — Insights
        </p>
        <h2
          data-reveal
          className="max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight uppercase sm:text-4xl lg:text-5xl"
        >
          The future of biology <span className="text-mint">is computational.</span>
        </h2>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {INSIGHTS.map((item) => (
            <a
              key={item.index}
              href="#contact"
              data-reveal
              data-cursor="VIEW"
              className="group flex flex-col justify-between rounded-2xl border hairline bg-ink/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs tracking-[0.24em] text-mint uppercase">
                    {item.category}
                  </span>
                  <span className="font-display text-sm text-muted">{item.index}</span>
                </div>
                <h3 className="mt-8 font-display text-xl leading-snug font-medium sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
              <span className="mt-10 inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] text-fog/70 uppercase transition-colors duration-300 group-hover:text-accent">
                Read insight
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
