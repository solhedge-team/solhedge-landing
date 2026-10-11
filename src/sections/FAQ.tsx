import { useState } from 'react'

const FAQS = [
  {
    q: 'What is Protected LP?',
    a: 'A liquidity position wrapped with automated hedging. SolHedge takes short exposure against your LP so the downside is covered while the upside still earns fees.',
  },
  {
    q: 'What is Easy Rebalance?',
    a: 'Concentrated liquidity ranges drift out of market as prices move. Easy Rebalance repositions your LP automatically so you keep earning fees without manual intervention.',
  },
  {
    q: 'What does Always Hedge mean?',
    a: "A strategy that keeps a hedge open at all times, regardless of market direction. It's designed for depositors who prioritize downside protection over maximum upside.",
  },
  {
    q: 'What is Auto Hedge (Signal-based)?',
    a: 'AI-driven signals trigger hedge entry and exit only when the market calls for it. You get protection when volatility spikes and full LP exposure when it doesn\'t.',
  },
  {
    q: 'Is my capital safe?',
    a: 'SolHedge is custodial. Each deposit sits in a dedicated escrow wallet whose private key SolHedge holds in an encrypted key management service, so the vault can rebalance and hedge without asking you to sign every step. Protected does not mean risk-free — custody risk, smart contract risk, and residual impermanent loss still apply.',
  },
  {
    q: 'How do I get started?',
    a: 'Connect a Solana wallet, pick a supported pool, and deposit USDC. The vault handles pool entry, hedging, and rebalancing from there.',
  },
  {
    q: 'What returns should I expect?',
    a: 'Returns vary with market conditions and pool activity. Protected LPs aim to capture LP fees with reduced drawdown versus unhedged LPing. No fixed APY is guaranteed.',
  },
  {
    q: 'Is SolHedge live?',
    a: 'Yes. SolHedge runs live on Solana mainnet with on-chain settlement and transparent positions.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">FAQ</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors hover:border-white/[0.12]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium tracking-tight sm:text-lg">{f.q}</span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-surface-800 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-text-secondary" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 font-body text-sm text-text-secondary">
                    {f.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
