const HEDGED = ['SOL/USDC', 'ETH/USDC', 'JUP/USDC', 'HYPE/USDC', 'MU/USDC', 'SKHY/USDC', 'PENGU/USDC', 'SNDK/USDC']

export function Pools() {
  return (
    <section id="pools" className="scroll-mt-16 border-b border-line">
      <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] lg:text-4xl">
            Eight hedged USDC pools today
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Every hedged pool pairs a token that has a liquid perpetual market with USDC. Standard
            pools without a hedge, including a USDC/XAUt0 gold pool and SOL-quoted pools, are
            available in the app as well.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 self-start lg:col-span-6 lg:col-start-7 lg:grid-cols-2">
          {HEDGED.map((p) => (
            <li key={p} className="flex items-center justify-between border-b border-line py-2.5 font-display text-lg font-medium tracking-tight">
              {p}
              <span className="mono text-accent">hedged</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
