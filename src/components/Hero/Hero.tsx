import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { MolecularVisual } from '../MolecularVisual/MolecularVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const HEADLINE = ['WE ENGINEER', 'BIOLOGY FOR', "WHAT'S NEXT."]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('[data-hero-bg]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 })
        .fromTo('[data-hero-eyebrow]', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.6')
        .fromTo(
          '[data-hero-line]',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.14 },
          '-=0.3',
        )
        .fromTo('[data-hero-copy]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(
          '[data-hero-cta]',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          '-=0.5',
        )
        .fromTo('[data-hero-meta]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, '-=0.3')
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <div data-hero-bg className="absolute inset-0 bg-grid">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(143,227,194,0.07),transparent_60%)]" />
        <MolecularVisual className="absolute inset-0 opacity-70 md:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-8">
        <p data-hero-eyebrow className="text-eyebrow mb-6">
          Biological Intelligence Platform
        </p>

        <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.98] font-semibold tracking-tight">
          {HEADLINE.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-hero-line className="block">
                {line === "WHAT'S NEXT." ? (
                  <>
                    WHAT'S <span className="text-accent">NEXT.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero-copy className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          We combine biological science, computational intelligence, and precision engineering to
          create technologies designed for a healthier and more sustainable future.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#about"
            data-hero-cta
            data-cursor="EXPLORE"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-display text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            Explore Our Science
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#technology"
            data-hero-cta
            className="link-underline font-display text-sm tracking-wide text-fog"
          >
            Discover Technology
          </a>
        </div>

        <div
          data-hero-meta
          className="mt-20 hidden items-center gap-10 border-t hairline pt-6 font-display text-[10px] tracking-[0.28em] text-muted uppercase md:flex"
        >
          <span>EST. 2021</span>
          <span>MOLECULAR / COMPUTATIONAL</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            SYSTEMS ONLINE
          </span>
        </div>
      </div>
    </section>
  )
}
