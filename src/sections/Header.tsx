import { useState } from 'react'

export const APP_URL = 'https://app.solhedge.xyz'

const NAV = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Strategies', href: '#strategies' },
  { label: 'Pools', href: '#pools' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface-900/90 backdrop-blur">
      <div className="wrap flex items-center justify-between py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo-mini.png" alt="" className="h-6 w-6" />
          <span className="font-display text-[17px] font-semibold tracking-tight">SolHedge</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={APP_URL} className="btn btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">
            Launch app
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-surface-600 p-2 md:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-line md:hidden">
          <ul className="wrap flex flex-col gap-4 py-5">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="text-base text-text-secondary">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={APP_URL} className="btn btn-primary">Launch app</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
