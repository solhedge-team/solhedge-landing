import { APP_URL } from '@/sections/Header'

const LINKS: [string, string][] = [
  ['App', APP_URL],
  ['X', 'https://twitter.com'],
  ['Discord', 'https://discord.com'],
]

export function Footer() {
  return (
    <footer>
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/logo-mini.png" alt="" className="h-5 w-5" />
          <span className="font-display font-semibold text-text-primary">SolHedge</span>
          <span>Hedged liquidity on Solana. Supported by Superteam Indonesia.</span>
        </div>
        <ul className="flex gap-6">
          {LINKS.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="hover:text-text-primary">{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <p className="wrap pb-8 text-xs text-text-faint">
        © 2026 SolHedge. Not financial advice. Hedging reduces risk and does not remove it.
      </p>
    </footer>
  )
}
