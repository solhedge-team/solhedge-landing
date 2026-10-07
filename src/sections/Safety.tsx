const CHECKS = [
  'Network and program IDs match the expected cluster',
  'Token mint and decimals match the pool',
  'The escrow is owned by the depositing wallet',
  'Amount and slippage are inside the configured bounds',
  'The job has not already been executed (idempotency key)',
  'A timed-out submission is reconciled before anything is retried',
]

export function Safety() {
  return (
    <section className="border-b border-line">
      <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] lg:text-4xl">
            What is checked before anything is signed
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Positions live in escrow accounts owned by your wallet. SolHedge never custodies funds.
            Signing happens in an isolated key service that the web app and the strategy engine
            cannot reach directly, and every transaction is recorded before and after it lands.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            What remains: smart-contract risk on Meteora and the perpetual venue, funding cost,
            slippage in fast markets, and residual impermanent loss between hedge resizes.
          </p>
        </div>
        <ul className="self-start lg:col-span-6 lg:col-start-7">
          {CHECKS.map((c) => (
            <li key={c} className="flex gap-3 border-b border-line py-3 text-text-secondary">
              <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                <path d="M3 8.5l3 3L13 4.5" />
              </svg>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
