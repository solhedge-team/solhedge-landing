const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Strategy', href: '#strategy' },
      { label: 'How it works', href: '#how' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Launch app', href: 'https://app.solhedge.xyz' },
      { label: 'Docs', href: 'https://docs.solhedge.xyz', external: true },
      { label: 'Risk framework', href: 'https://docs.solhedge.xyz/security/risk-framework', external: true },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Twitter / X', href: 'https://x.com/solhedge_prjct', external: true },
      { label: 'Discord', href: 'https://discord.com/invite/m4dF8uDftS', external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] px-6 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-1">
              <img src="/logo-mini.png" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-tight">SolHedge</span>
            </div>
            <p className="mt-5 max-w-sm font-body text-sm text-text-muted">
              Automated AI-powered strategy for liquidity providing on Solana.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{col.title}</p>
              <ul className="mt-4 space-y-1 font-body text-sm text-text-secondary">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...('external' in l ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="inline-block rounded py-1 transition-colors duration-100 hover:text-text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.05] pt-6">
          <p className="font-body text-xs text-text-muted">© 2026 SolHedge. All rights reserved. Built on Solana.</p>
        </div>
      </div>
    </footer>
  )
}
