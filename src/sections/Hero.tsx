import { HedgeSim } from '@/components/HedgeSim'
import { APP_URL } from '@/sections/Header'

const FACTS = [
  ['Venue', 'Meteora DLMM'],
  ['Hedge', 'Perpetual short'],
  ['Custody', 'Your wallet, always'],
  ['Network', 'Solana mainnet'],
]

export function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <div className="wrap grid gap-12 pb-16 pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-24">
        <div className="lg:col-span-6">
          <p className="mono">Live on Solana mainnet</p>
          <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
            Earn LP fees without betting on the token.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary">
            SolHedge opens a Meteora DLMM position for you and shorts the volatile side on a
            perpetual exchange. When the token drops, the short gains what the position loses.
            You keep the trading fees.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={APP_URL} className="btn btn-primary">Open a hedged position</a>
            <a href="#how-it-works" className="btn btn-secondary">See how it works</a>
          </div>
          <p className="mt-6 text-sm text-text-muted">
            Deposit USDC. No wallet keys leave your custody. Hedging reduces risk and does not remove it.
          </p>
        </div>
        <div className="lg:col-span-6">
          <HedgeSim />
        </div>
      </div>
      <div className="border-t border-line">
        <dl className="wrap grid grid-cols-2 gap-x-8 gap-y-4 py-5 sm:grid-cols-4">
          {FACTS.map(([k, v]) => (
            <div key={k}>
              <dt className="mono">{k}</dt>
              <dd className="mt-1 text-sm text-text-secondary">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
