import { useState } from 'react'

const FAQS = [
  {
    q: 'Who holds my funds?',
    a: 'You do. Each position sits in an escrow account tied to your wallet. SolHedge services can submit transactions for that escrow but cannot withdraw to another address.',
  },
  {
    q: 'What is the difference between Always Hedge and Auto Hedge?',
    a: 'Always Hedge keeps the short open at all times and resizes it with the position. Auto Hedge opens the short only while the market-regime signal is bearish, which saves funding but accepts some exposure before the signal flips.',
  },
  {
    q: 'What return should I expect?',
    a: 'Pool trading fees minus funding paid on the short, with much smaller drawdowns than an unhedged position. There is no guaranteed APY. The figures shown in the app are current pool rates, not forecasts.',
  },
  {
    q: 'What can still go wrong?',
    a: 'Smart-contract risk on Meteora and the perpetual venue, funding turning expensive, slippage in fast moves, and residual impermanent loss between hedge resizes. Hedging lowers risk and does not remove it.',
  },
  {
    q: 'Which perpetual venue is used?',
    a: 'Hedges are placed on a Solana-native perpetual exchange from an isolated signing service. The venue for each pool is shown in the app before you deposit.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="scroll-mt-16 border-b border-line">
      <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
        <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] lg:col-span-4 lg:text-4xl">
          Questions
        </h2>
        <ul className="lg:col-span-7 lg:col-start-6">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            const id = `faq-${i}`
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium tracking-tight hover:text-text-secondary"
                  >
                    {f.q}
                    <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </button>
                </h3>
                <p id={id} hidden={!isOpen} className="pb-6 leading-relaxed text-text-secondary">{f.a}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
