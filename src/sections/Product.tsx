const POINTS = [
  ['Hedged and standard pools side by side', 'Each row shows bin step, base fee, TVL, 24h volume and APY. Hedged pools are tagged.'],
  ['One deposit asset', 'Enter with USDC. The app handles the swap, the position, and the short.'],
  ['Position and hedge in one view', 'Fees earned, funding paid, current short size and net exposure, on the same screen.'],
]

export function Product() {
  return (
    <section className="border-b border-line">
      <div className="wrap py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] lg:text-4xl">
              Pick a pool, deposit, done.
            </h2>
            <p className="mt-4 leading-relaxed text-text-secondary">
              The app is two screens. A pool list, and a deposit form. Everything after the deposit runs on its own.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
            {POINTS.map(([h, b]) => (
              <li key={h}>
                <h3 className="font-body text-base font-semibold">{h}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{b}</p>
              </li>
            ))}
          </ul>
        </div>
        <figure className="mt-12 overflow-hidden rounded-xl border border-line">
          <img
            src="/app/pools.png"
            width={1280}
            height={1120}
            loading="lazy"
            alt="SolHedge pools screen: a table of Meteora DLMM pools with hedged or standard tags, bin step, base fee, TVL, 24h volume and APY."
            className="block w-full"
          />
        </figure>
      </div>
    </section>
  )
}
