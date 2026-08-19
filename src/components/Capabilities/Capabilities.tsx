import { useRef, useState } from 'react'
import { CAPABILITIES } from '../../data/content'
import { useSectionReveal } from '../../animations/useSectionReveal'

export function Capabilities() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  useSectionReveal(ref)

  return (
    <section ref={ref} id="capabilities" className="relative border-t hairline bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p data-reveal className="text-eyebrow mb-6">
              03 — Capabilities
            </p>
            <h2 data-reveal className="font-display text-3xl leading-tight font-medium sm:text-4xl lg:sticky lg:top-28 lg:text-5xl">
              Science becomes more powerful when{' '}
              <span className="text-mint">systems connect.</span>
            </h2>
          </div>

          <ul className="flex flex-col">
            {CAPABILITIES.map((cap, i) => (
              <li
                key={cap.index}
                data-reveal
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group border-b hairline"
              >
                <div className="flex items-baseline gap-6 py-7 transition-transform duration-500 sm:gap-10 sm:group-hover:translate-x-3">
                  <span
                    className={`font-display text-sm transition-colors duration-300 ${
                      active === i ? 'text-accent' : 'text-mint/60'
                    }`}
                  >
                    {cap.index}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`font-display text-2xl font-light tracking-wide transition-colors duration-300 sm:text-3xl ${
                        active === i ? 'text-accent' : 'text-fog'
                      }`}
                    >
                      {cap.title}
                    </h3>
                    <p
                      className={`overflow-hidden text-sm leading-relaxed text-muted transition-all duration-500 ${
                        active === i ? 'mt-3 max-h-24 opacity-100' : 'mt-0 max-h-0 opacity-0'
                      } max-sm:mt-3 max-sm:max-h-24 max-sm:opacity-100`}
                    >
                      {cap.body}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`hidden h-2 w-2 rounded-full transition-all duration-300 sm:block ${
                      active === i ? 'scale-125 bg-accent' : 'bg-fog/20'
                    }`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
