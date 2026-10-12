import { useEffect, useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { AppShot } from '@/components/AppShot'

const STEPS = [
  {
    title: 'Connect your wallet',
    desc: 'Any Solana wallet. No signup, no KYC.',
    shot: { src: '/app/connect.webp', url: 'app.solhedge.xyz', label: 'Connect a wallet dialog listing Phantom, MetaMask and Solflare' },
  },
  {
    title: 'Pick a pool and deposit',
    desc: 'The AI sets your range and keeps a reserve for hedging.',
    shot: { src: '/app/deposit.webp', url: 'app.solhedge.xyz/deposit', label: 'Deposit into SOL/USDC with pool stats and price chart' },
  },
  {
    title: 'Activate the portfolio',
    desc: 'Range, hedge, rebalance, and compound run on their own.',
    shot: { src: '/app/hedge.webp', url: 'app.solhedge.xyz/escrow', label: 'Active hedge position with Always Hedge enabled' },
  },
  {
    title: 'Earn while it runs',
    desc: 'Fees accrue 24/7. Exit anytime back to your wallet.',
    shot: { src: '/app/dashboard.webp', url: 'app.solhedge.xyz/portfolio', label: 'Position dashboard with portfolio value, P&L and LP range' },
  },
]

const AUTO_ADVANCE_MS = 5000

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(false)

  // Cycles the screenshots until the visitor picks a step.
  useEffect(() => {
    if (picked || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % STEPS.length), AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [picked])

  return (
    <section id="how" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Deposit once.
            <span className="text-gradient-brand block">Walk away.</span>
          </h2>

          <ol className="mt-10 space-y-2">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.06}>
                  <button
                    type="button"
                    aria-pressed={active === i}
                    onClick={() => {
                      setActive(i)
                      setPicked(true)
                    }}
                    className={`flex w-full gap-5 rounded-2xl border p-4 text-left transition-[opacity,border-color,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan ${
                      active === i
                        ? 'border-white/[0.14] bg-white/[0.05]'
                        : 'border-white/[0.06] bg-white/[0.02] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <span className="shrink-0 pt-0.5 font-mono text-xs uppercase tracking-wider text-brand-cyan">
                      Step {i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold tracking-tight">{s.title}</span>
                      <span className="mt-1 block font-body text-sm text-text-secondary">{s.desc}</span>
                    </span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <AppShot url={STEPS[active].shot.url}>
            <div className="relative aspect-[16/11]">
              {STEPS.map((s, i) => (
                <img
                  key={s.shot.src}
                  src={s.shot.src}
                  alt={active === i ? s.shot.label : ''}
                  aria-hidden={active !== i}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none ${
                    active === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </AppShot>
          <p className="mt-4 font-mono text-xs text-text-muted" aria-live={picked ? 'polite' : 'off'}>
            Step {active + 1} of {STEPS.length} · {STEPS[active].title}
          </p>
        </div>
      </div>
    </section>
  )
}
