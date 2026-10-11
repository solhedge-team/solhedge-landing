import { Reveal } from '@/components/Reveal'

const CARDS = [
  { label: 'Liquidity layer', desc: 'Concentrated liquidity with dynamic, volatility-based fees.', stat: 'Meteora DLMM' },
  { label: 'Execution rails', desc: 'Spot and perpetuals routing for hedges and rebalances.', stat: 'Jupiter + Phoenix' },
  { label: 'Always on', desc: 'Range, hedge, rebalance, and compound run without you.', stat: '24/7' },
]

export function Overview() {
  return (
    <section id="overview" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Built for LPs
            <span className="text-gradient-brand block">who'd rather not babysit</span>
          </h2>
          <p className="mt-5 font-body text-base text-text-secondary sm:text-lg">
            Deposit into a portfolio. The AI manages the position around the clock, so volatility turns into fees instead of
            stress.
          </p>
          <a
            href="https://docs.solhedge.xyz/overview/what-is-solhedge"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-10 items-center font-body text-sm text-brand-cyan underline underline-offset-4 transition-colors duration-100 hover:text-text-primary"
          >
            Read what SolHedge is
          </a>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-3">
            {CARDS.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col sm:min-h-56 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-brand-purple/[0.09] p-5">
                  <h3 className="font-display text-base font-medium text-text-primary">{c.label}</h3>
                  <p className="mt-2 font-body text-sm text-text-muted">{c.desc}</p>
                  <p className="text-gradient-brand mt-auto pt-8 font-display text-2xl font-semibold tracking-tight">{c.stat}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.18} className="sm:col-span-3">
              <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.02] to-brand-cyan/[0.07] p-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-md">
                  <h3 className="font-display text-base font-medium text-text-primary">Custody</h3>
                  <p className="mt-2 font-body text-sm text-text-muted">
                    Each deposit sits in a dedicated escrow wallet. SolHedge holds its key in an encrypted key management service so the engine can act 24/7.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {['Dedicated escrow', 'Pen-tested by Daemon'].map((b) => (
                    <li key={b} className="rounded-lg border border-white/[0.1] bg-surface-900/60 px-3 py-2 font-display text-sm font-medium text-text-primary">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <p className="mt-3 font-body text-xs italic text-text-muted">
            Protected isn't risk-free. Hedging reduces risk, but losses and impermanent loss can still happen.
          </p>
        </div>
      </div>
    </section>
  )
}
