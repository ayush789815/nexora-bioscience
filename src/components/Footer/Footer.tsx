import { NAV_LINKS } from '../../data/content'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'Email', href: 'mailto:hello@nexorabio.science' },
]

export function Footer() {
  return (
    <footer className="border-t hairline bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.22em]">
              NEXORA<span className="text-accent"> BIOSCIENCE</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Engineering the next generation of biological intelligence.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline font-display text-xs tracking-[0.18em] text-muted uppercase transition-colors hover:text-fog"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="link-underline font-display text-xs tracking-[0.18em] text-muted uppercase transition-colors hover:text-fog"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <ul className="flex gap-6 md:flex-col md:gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="link-underline font-display text-xs tracking-[0.18em] text-muted uppercase transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[11px] tracking-[0.2em] text-muted uppercase">
            © 2026 Nexora Bioscience
          </p>
          <p className="font-display text-[11px] tracking-[0.2em] text-muted/60 uppercase">
            A fictional company · concept website
          </p>
        </div>
      </div>
    </footer>
  )
}
