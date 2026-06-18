import { Reveal } from '@/components/Reveal'

const FEATURES = [
  {
    title: 'Protected LP',
    desc: 'Downside protection on LP positions. Deposit and let the vault shield you.',
    icon: (
      <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" strokeWidth="1.5" />
    ),
    accent: 'from-brand-purple/20 to-transparent',
  },
  {
    title: 'Easy Rebalance LP',
    desc: 'Automated range management — no more manually closing and reopening positions.',
    icon: (
      <>
        <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.4-2.6M3 12a9 9 0 0 1 15.4-6.4" strokeWidth="1.5" />
        <path d="M21 3v6h-6M3 21v-6h6" strokeWidth="1.5" />
      </>
    ),
    accent: 'from-brand-blue/20 to-transparent',
  },
  {
    title: 'Always Hedge',
    desc: 'Continuous hedging through every market condition. Capital stays covered around the clock.',
    icon: (
      <>
        <path d="M3 12h4l3-9 4 18 3-9h4" strokeWidth="1.5" />
      </>
    ),
    accent: 'from-brand-cyan/20 to-transparent',
  },
  {
    title: 'Auto Hedge (Signal-based)',
    desc: 'AI signals trigger hedge entry and exit — only when the market calls for it.',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" strokeWidth="1.5" />
      </>
    ),
    accent: 'from-brand-purple/20 via-brand-blue/20 to-brand-cyan/20',
  },
]

export function WhySolHedge() {
  return (
    <section id="why" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">Why SolHedge</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Your LP Protector on Solana
          </h2>
          <p className="mt-6 font-body text-lg text-text-secondary">
            DeFi yields are real. So are impermanent loss and whipsaw drawdowns. SolHedge wraps your LPs with automated hedging so the downside doesn't eat your upside.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-colors hover:border-white/[0.12]"
              >
                <div className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${f.accent} blur-3xl transition-opacity group-hover:opacity-80`} />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-surface-800">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-text-primary">
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 font-body text-sm text-text-muted">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-warning/20 bg-warning/[0.04] px-6 py-4">
          <p className="font-body text-sm text-text-secondary">
            <span className="font-medium text-warning">Disclaimer:</span>{' '}
            Protected does not mean risk-free. Hedging helps reduce risk, but losses and impermanent loss (IL) can still happen.
          </p>
        </div>
      </div>
    </section>
  )
}
