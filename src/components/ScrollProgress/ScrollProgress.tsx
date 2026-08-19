import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? window.scrollY / max : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[55] h-0.5 w-full bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-mint to-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
