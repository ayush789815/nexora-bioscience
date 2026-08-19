import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveals elements marked with [data-reveal] inside the given container as it
 * enters the viewport. Elements animate upward with a small stagger.
 */
export function useSectionReveal(ref: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [ref, reduced])
}
