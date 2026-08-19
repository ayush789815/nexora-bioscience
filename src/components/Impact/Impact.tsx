import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS } from '../../data/content'
import { useSectionReveal } from '../../animations/useSectionReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Impact() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useSectionReveal(ref)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
        const target = Number(node.dataset.count)
        const decimals = Number(node.dataset.decimals ?? 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 85%', once: true },
          onUpdate: () => {
            node.textContent = obj.v.toFixed(decimals)
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} id="impact" className="relative overflow-hidden border-t hairline py-24 sm:py-32">
      {/* background sphere visual */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/10" />
        <div className="absolute top-1/2 left-1/2 h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-mint/15 motion-safe:animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 h-[34vmin] w-[34vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,255,101,0.06),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <p data-reveal className="text-eyebrow mb-6">
          05 — Impact
        </p>
        <h2 data-reveal className="max-w-xl font-display text-3xl leading-tight font-medium sm:text-4xl">
          Measured in signal, speed, and <span className="text-accent">precision.</span>
        </h2>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} data-reveal className="border-l hairline pl-5 sm:pl-7">
              <dd className="font-display text-4xl font-semibold tracking-tight text-fog sm:text-5xl lg:text-6xl">
                <span data-count={stat.value} data-decimals={stat.decimals}>
                  {reduced ? stat.value.toFixed(stat.decimals) : '0'}
                </span>
                <span className="text-accent">{stat.suffix}</span>
              </dd>
              <dt className="mt-3 font-display text-[11px] tracking-[0.22em] text-muted uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <p data-reveal className="mt-14 max-w-md text-xs leading-relaxed text-muted">
          Figures represent conceptual platform benchmarks across internal research programs.
        </p>
      </div>
    </section>
  )
}
