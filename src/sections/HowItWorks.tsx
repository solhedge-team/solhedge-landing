const STEPS = [
  {
    title: 'Deposit USDC into a hedged pool',
    body:
      'Pick a pool. SolHedge swaps into the pair, opens the DLMM position in an escrow account owned by your wallet, and records the target exposure.',
  },
  {
    title: 'A short is opened against the volatile side',
    body:
      'The hedge engine reads how much SOL (or ETH, JUP, and so on) the position holds and opens a perpetual short of the same size. Net exposure to the token lands near zero.',
  },
  {
    title: 'The hedge is resized as the position moves',
    body:
      'A watcher re-reads the position every cycle. When price moves or the range resets, the short is adjusted. Every submission is checked, confirmed on chain, and written to an audit record before the next one.',
  },
]

// Illustrative: $10k SOL/USDC, SOL -20%, 30 days. Not a backtest.
const ROWS = [
  { k: 'LP position value', a: -1380, b: -1380 },
  { k: 'Hedge profit', a: 0, b: 1290 },
  { k: 'Trading fees earned', a: 180, b: 180 },
  { k: 'Funding paid', a: 0, b: -40 },
]
const NET = { k: 'Net', a: -1200, b: 50 }

const usd = (v: number) => (v === 0 ? '0' : `${v < 0 ? '-' : '+'}$${Math.abs(v).toLocaleString()}`)
const tone = (v: number) => (v < 0 ? 'text-error' : v > 0 ? 'text-success' : 'text-text-muted')

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 border-b border-line">
      <div className="wrap py-16 lg:py-24">
        <h2 className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.02em] lg:text-4xl">
          How a hedged position works
        </h2>
        <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-5">
              <span className="mono num">Step {i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-text-secondary">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold tracking-tight">What a 20% drop looks like</h3>
            <p className="mt-3 leading-relaxed text-text-secondary">
              An illustrative $10,000 SOL/USDC position over 30 days, with SOL falling 20%. The same
              pool, with and without the short. These are worked numbers, not a backtest and not a
              promise of returns.
            </p>
          </div>
          <table className="panel w-full border-separate border-spacing-0 overflow-hidden text-sm lg:col-span-8">
            <thead>
              <tr className="mono text-left">
                <th scope="col" className="border-b border-line px-4 py-3 font-normal">Over 30 days</th>
                <th scope="col" className="border-b border-line px-4 py-3 text-right font-normal">Unhedged</th>
                <th scope="col" className="border-b border-line px-4 py-3 text-right font-normal text-accent">Hedged</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.k}>
                  <th scope="row" className="border-b border-line px-4 py-3 text-left font-normal text-text-secondary">{r.k}</th>
                  <td className={`num border-b border-line px-4 py-3 text-right font-mono ${tone(r.a)}`}>{usd(r.a)}</td>
                  <td className={`num border-b border-line px-4 py-3 text-right font-mono ${tone(r.b)}`}>{usd(r.b)}</td>
                </tr>
              ))}
              <tr className="bg-surface-700/60">
                <th scope="row" className="px-4 py-3 text-left font-semibold">{NET.k}</th>
                <td className={`num px-4 py-3 text-right font-mono font-semibold ${tone(NET.a)}`}>{usd(NET.a)}</td>
                <td className={`num px-4 py-3 text-right font-mono font-semibold ${tone(NET.b)}`}>{usd(NET.b)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
