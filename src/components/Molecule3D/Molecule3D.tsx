import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePointerFine } from '../../hooks/usePointerFine'
import { useSectionReveal } from '../../animations/useSectionReveal'
import type { SharedInput } from './HelixScene'

const HelixScene = lazy(() => import('./HelixScene'))

export function Molecule3D() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const input = useRef<SharedInput>({ progress: 0, pointerX: 0, pointerY: 0 })
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  const pointerFine = usePointerFine()

  useSectionReveal(section)

  useEffect(() => {
    const el = section.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) {
      input.current.progress = 1
      return
    }
    const onScroll = () => {
      const el = section.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      const passed = window.innerHeight - rect.top
      input.current.progress = Math.min(1, Math.max(0, passed / total)) * 1.6
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  useEffect(() => {
    if (!pointerFine || reduced) return
    const el = stage.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      input.current.pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      input.current.pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const onLeave = () => {
      input.current.pointerX = 0
      input.current.pointerY = 0
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [pointerFine, reduced])

  return (
    <section
      ref={section}
      id="molecule"
      aria-label="Interactive 3D molecular model"
      className="relative overflow-hidden border-t hairline bg-surface"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
        <div>
          <p data-reveal className="text-eyebrow text-mint">
            03.5 / Molecular Model
          </p>
          <h2
            data-reveal
            className="mt-6 font-display text-4xl font-light tracking-tight text-fog sm:text-5xl"
          >
            The double helix,
            <br />
            <span className="text-accent">assembled in real time.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-muted">
            A live 3D model of the structure our platform reads and writes. Scroll to
            assemble the strand from scattered molecules; move your cursor to inspect it
            from any angle. Rendered procedurally in WebGL — no imported assets, just
            geometry and light.
          </p>
          <dl data-reveal className="mt-10 grid grid-cols-2 gap-6 max-w-sm">
            <div className="border-l hairline pl-4">
              <dt className="text-eyebrow text-muted">Base pairs</dt>
              <dd className="mt-1 font-display text-2xl text-fog">42</dd>
            </div>
            <div className="border-l hairline pl-4">
              <dt className="text-eyebrow text-muted">Render mode</dt>
              <dd className="mt-1 font-display text-2xl text-fog">WebGL</dd>
            </div>
          </dl>
          <p data-reveal className="mt-8 text-xs tracking-wide text-muted/70">
            Conceptual visualization · procedural geometry
          </p>
        </div>

        <div
          ref={stage}
          data-reveal
          className="relative aspect-square max-h-[560px] w-full rounded-2xl border hairline bg-ink/40 lg:aspect-[4/3]"
        >
          <span className="pointer-events-none absolute top-4 left-4 z-10 text-eyebrow text-mint/80">
            MODEL 042-DH · LIVE
          </span>
          <span className="pointer-events-none absolute right-4 bottom-4 z-10 text-eyebrow text-muted/70">
            DRAG-FREE ORBIT · POINTER PARALLAX
          </span>
          {visible && (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-eyebrow text-muted">
                  Loading model…
                </div>
              }
            >
              <HelixScene input={input} frozen={reduced} />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}
