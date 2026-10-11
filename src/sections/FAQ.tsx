const FAQS = [
  {
    q: 'Is SolHedge custodial?',
    a: 'Yes. Each deposit sits in a dedicated escrow wallet. SolHedge holds that wallet\'s private key in an encrypted key management service so it can rebalance, hedge, and compound without asking you to sign every step. Withdrawals return funds to your wallet.',
  },
  {
    q: 'Do I need to understand perps or hedging?',
    a: 'No. You deposit and activate; the AI manages range, hedging, rebalancing, and compounding for you.',
  },
  {
    q: 'What happens when the AI detects high risk?',
    a: 'Liquidity may move back to stablecoins to protect capital. That stops fee accrual and realizes the position at that point, so it only happens when multiple risk signals confirm together.',
  },
  {
    q: 'How do I withdraw?',
    a: 'Start a withdrawal from the dashboard. Open hedges close, liquidity is pulled from Meteora, and accrued fees plus principal return to your wallet, typically in one transaction.',
  },
  {
    q: 'Has SolHedge been audited?',
    a: 'Smart contracts have been penetration tested by Daemon. The report is available to institutional counterparties on request.',
  },
  {
    q: 'What returns should I expect?',
    a: 'Returns vary with market conditions and pool activity. SolHedge aims to capture LP fees with smaller drawdowns than unhedged LPing. No fixed APY is guaranteed.',
  },
  {
    q: 'Is SolHedge live?',
    a: 'Yes. SolHedge runs on Solana mainnet at app.solhedge.xyz.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Questions,
            <span className="text-gradient-brand block">answered.</span>
          </h2>
        </div>

        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              name="faq"
              open={i === 0}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-100 hover:border-white/[0.12]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-base font-medium tracking-tight sm:text-lg">{f.q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-surface-800 transition-transform duration-150 ease-out group-open:rotate-45" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-text-secondary" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 font-body text-sm text-text-secondary sm:text-base">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
