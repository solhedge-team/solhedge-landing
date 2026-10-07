export function Problem() {
  return (
    <section className="border-b border-line">
      <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
        <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] lg:col-span-5 lg:text-4xl">
          Liquidity providers earn fees, then lose them to the token.
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-text-secondary lg:col-span-6 lg:col-start-7">
          <p>
            A SOL/USDC position on Meteora collects fees on every trade that crosses its range.
            That part works. The problem is that roughly two thirds of the position is SOL, so a
            20% drop in SOL costs more than a month of fees.
          </p>
          <p>
            Traders solve this by holding a short against the long. Doing it by hand means sizing the
            short to the position, resizing it every time the range or price moves, and paying funding
            on the way. SolHedge does that work on a schedule, from the position you already have.
          </p>
        </div>
      </div>
    </section>
  )
}
