export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] px-6 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo-mini.png" alt="" className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-tight">SolHedge</span>
            </div>
            <p className="mt-5 max-w-sm font-body text-sm text-text-muted">
              Secure your LPs in seconds, hedge like a pro. With SolHedge, finally volatility doesn't scare you anymore.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Supported by</span>
              <span className="font-display text-sm font-medium">Superteam Indonesia</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Product</p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-text-secondary">
              <li><a href="#why" className="hover:text-text-primary">Why SolHedge</a></li>
              <li><a href="#pools" className="hover:text-text-primary">Pools</a></li>
              <li><a href="#how" className="hover:text-text-primary">How It Works</a></li>
              <li><a href="#faq" className="hover:text-text-primary">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Resources</p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-text-secondary">
              <li><a href="https://dexscreener.com" target="_blank" rel="noreferrer" className="hover:text-text-primary">Dexscreener</a></li>
              <li><a href="https://app.solhedge.xyz" className="hover:text-text-primary">Launch App</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Community</p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-text-secondary">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-text-primary">Twitter / X</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-text-primary">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-text-muted">
            © 2025 SolHedge. All rights reserved. Built with ❤️ on Solana
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
            v1 · mainnet
          </p>
        </div>
      </div>
    </footer>
  )
}
