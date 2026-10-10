import { Reveal } from '@/components/Reveal'
import { AppShot } from '@/components/AppShot'

const STEPS = [
  { title: 'Connect your wallet', desc: 'Connect a Solana wallet at app.solhedge.xyz. No signup, no KYC.' },
  {
    title: 'Pick a pool and deposit',
    desc: 'Most capital goes into Meteora DLMM at an AI-selected range. A reserve stays ready for hedging.',
  },
  { title: 'Activate the portfolio', desc: 'Range, hedge, rebalance, and compound switch on together. All automatic.' },
  { title: 'Earn while it runs', desc: 'Fees accrue around the clock. Check the dashboard anytime.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Deposit once.
            <span className="text-gradient-brand block">Walk away.</span>
          </h2>

          <ol className="mt-12 space-y-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <li className="flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <span className="shrink-0 pt-0.5 font-mono text-xs uppercase tracking-wider text-brand-cyan">
                    Step {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1 font-body text-sm text-text-secondary">{s.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <p className="mt-6 font-body text-sm text-text-muted">
            Exit anytime. Hedges close, liquidity leaves the pool, and fees plus principal return to your wallet, usually
            in a single transaction.
          </p>
        </div>

        <Reveal className="lg:sticky lg:top-28">
          <AppShot label="Deposit flow" url="app.solhedge.xyz/pools" />
        </Reveal>
      </div>
    </section>
  )
}
