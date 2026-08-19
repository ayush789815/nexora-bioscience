import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { MolecularVisual } from '../MolecularVisual/MolecularVisual'
import { useSectionReveal } from '../../animations/useSectionReveal'

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden border-t hairline">
      <div aria-hidden="true" className="absolute inset-0 opacity-40">
        <MolecularVisual />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[80svh] max-w-7xl flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
        <p data-reveal className="text-eyebrow mb-8">
          Get in touch
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.02] font-semibold tracking-tight"
        >
          READY TO
          <br />
          <span className="text-accent">RETHINK BIOLOGY?</span>
        </h2>
        <p data-reveal className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Explore how computational intelligence can unlock new possibilities in biological science.
        </p>
        <a
          data-reveal
          href="mailto:hello@nexorabio.science"
          data-cursor="OPEN"
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-accent px-9 py-4.5 font-display text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04]"
        >
          Start a Conversation
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
