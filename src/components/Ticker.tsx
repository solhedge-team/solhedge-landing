const ITEMS = [
  { pair: 'SOL / USDC', status: 'Protected LP' },
  { pair: 'WETH / USDC', status: 'Protected LP' },
  { pair: 'WBTC / USDC', status: 'Protected LP' },
  { pair: 'GOLD / USDC', status: 'Featured' },
  { pair: 'SOL / USDC', status: 'Auto-Hedge · Active' },
  { pair: 'WETH / USDC', status: 'Rebalanced · 2m ago' },
  { pair: 'WBTC / USDC', status: 'Always-Hedge · Active' },
]

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] bg-surface-900/40 py-3 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted"
          >
            <span className="h-1 w-1 rounded-full bg-success/70" />
            <span className="text-text-secondary">{item.pair}</span>
            <span className="text-text-faint">·</span>
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
