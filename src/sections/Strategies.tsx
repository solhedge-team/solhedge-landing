const MODES = [
  {
    name: 'Protected LP',
    exposure: 'Partial',
    body: 'The default. Keeps a fraction of the token exposure and hedges the rest. Lower funding cost than a full hedge, smaller drawdown than none.',
  },
  {
    name: 'Always Hedge',
    exposure: 'Near zero',
    body: 'The short stays open the whole time and is resized with the position. You are paid in fees and pay funding, with almost no directional exposure.',
  },
  {
    name: 'Auto Hedge',
    exposure: 'Switches',
    body: 'The short is opened when the market-regime signal turns bearish and closed when it turns back. Saves funding in uptrends. Accepts some exposure before the signal flips.',
  },
  {
    name: 'Easy Rebalance',
    exposure: 'Unhedged',
    body: 'No short. The position range is reset when price leaves it, so it keeps earning fees instead of sitting idle.',
  },
]

export function Strategies() {
  return (
    <section id="strategies" className="scroll-mt-16 border-b border-line">
      <div className="wrap py-16 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] lg:text-4xl">
            Choose how much of the token you want to hold
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            Four strategies, set per position. All of them keep the DLMM position earning fees. They
            differ in how much of the token price you still carry.
          </p>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {MODES.map((m) => (
            <li key={m.name} className="bg-surface-800 p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
                <span className="mono shrink-0">Exposure: {m.exposure}</span>
              </div>
              <p className="mt-3 leading-relaxed text-text-secondary">{m.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
