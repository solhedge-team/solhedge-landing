const APP_URL = 'https://app.solhedge.xyz'
const DOCS_URL = 'https://docs.solhedge.xyz'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Strategy', href: '#strategy' },
  { label: 'How it works', href: '#how' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-surface-900/60 py-2 pl-4 pr-2 shadow-lg shadow-black/20 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-1 rounded-lg transition-opacity duration-100 hover:opacity-80">
          <img src="/logo-mini.png" alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-display text-lg font-semibold tracking-tight">SolHedge</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 font-body text-sm text-text-secondary transition-colors duration-100 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center rounded-xl px-4 font-body text-sm text-text-secondary transition-colors duration-100 hover:text-text-primary sm:inline-flex"
          >
            Docs
          </a>
          <a
            href={APP_URL}
            className="inline-flex h-10 items-center rounded-xl bg-white px-5 font-body text-sm font-medium text-surface-900 transition-[background-color,transform] duration-100 hover:bg-text-secondary active:scale-[0.97]"
          >
            Launch app
          </a>
        </div>
      </div>
    </header>
  )
}
