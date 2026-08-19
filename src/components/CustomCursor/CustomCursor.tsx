import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePointerFine } from '../../hooks/usePointerFine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Desktop-only custom cursor: a small dot with a trailing ring. Hovering
 * elements carrying [data-cursor="LABEL"] expands the ring and shows the label.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const pointerFine = usePointerFine()
  const reduced = useReducedMotion()
  const enabled = pointerFine && !reduced

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('cursor-active')
      return
    }
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('cursor-active')

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor], a, button')
      setLabel(target?.dataset.cursor ?? '')
      gsap.to(ring, {
        scale: target ? (target.dataset.cursor ? 2.6 : 1.7) : 1,
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      document.body.classList.remove('cursor-active')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={dotRef}
        className="absolute -top-0.75 -left-0.75 h-1.5 w-1.5 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full border border-accent/50"
      >
        <span className="font-display text-[7px] tracking-[0.18em] text-accent uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}
