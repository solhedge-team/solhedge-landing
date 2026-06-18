const APP_URL = 'https://app.solhedge.xyz'
const DEXSCREENER_URL = 'https://dexscreener.com'

const NAV_LINKS = [
  { label: 'Why SolHedge?', href: '#why' },
  { label: 'Pools', href: '#pools' },
  { label: 'How It Works', href: '#how' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-surface-900/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img src="/logo-mini.png" alt="" className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight">
            SolHedge
          </span>
          <span className="hidden font-body text-xs text-text-muted sm:inline mt-1">
            — All LPs, One Shield
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 font-body text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={DEXSCREENER_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-3 py-1.5 font-body text-sm text-text-muted transition-colors hover:text-text-primary sm:inline"
          >
            Dexscreener
          </a>
          <a
            href={APP_URL}
            className="group relative rounded-full px-5 py-2 font-body text-sm font-medium"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan p-[1px]">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-surface-900 transition-colors group-hover:bg-surface-800" />
            </span>
            <span className="relative text-text-primary">Try SolHedge now</span>
          </a>
        </div>
      </div>
    </header>
  )
}
