import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { AppShot } from '@/components/AppShot'

const STEPS = [
  {
    title: 'Connect your wallet',
    desc: 'Connect a Solana wallet at app.solhedge.xyz. No signup, no KYC.',
    shot: { src: '/app/connect.webp', url: 'app.solhedge.xyz', label: 'Connect a wallet dialog listing Phantom, MetaMask and Solflare' },
  },
  {
    title: 'Pick a pool and deposit',
    desc: 'Most capital goes into Meteora DLMM at an AI-selected range. A reserve stays ready for hedging.',
    shot: { src: '/app/deposit.webp', url: 'app.solhedge.xyz/deposit', label: 'Deposit into SOL/USDC with pool stats and price chart' },
  },
  {
    title: 'Activate the portfolio',
    desc: 'Range, hedge, rebalance, and compound switch on together. All automatic.',
    shot: { src: '/app/hedge.webp', url: 'app.solhedge.xyz/escrow', label: 'Active hedge position with Always Hedge enabled' },
  },
  {
    title: 'Earn while it runs',
    desc: 'Fees accrue around the clock. Check the dashboard anytime.',
    shot: { src: '/app/dashboard.webp', url: 'app.solhedge.xyz/portfolio', label: 'Position dashboard with portfolio value, P&L and LP range' },
  },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  // The step crossing the viewport's middle line drives the pinned screenshot.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step))
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const el of stepRefs.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Deposit once.
            <span className="text-gradient-brand block">Walk away.</span>
          </h2>

          <ol className="mt-12 space-y-3 lg:space-y-0">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                data-step={i}
                className="lg:flex lg:min-h-[48vh] lg:items-center"
              >
                <Reveal delay={i * 0.06} className="w-full">
                  <div
                    className={`flex gap-5 rounded-2xl border p-5 transition-[opacity,border-color,background-color] duration-300 ${
                      active === i
                        ? 'border-white/[0.14] bg-white/[0.05]'
                        : 'border-white/[0.06] bg-white/[0.02] lg:opacity-50'
                    }`}
                  >
                    <span className="shrink-0 pt-0.5 font-mono text-xs uppercase tracking-wider text-brand-cyan">
                      Step {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-1 font-body text-sm text-text-secondary">{s.desc}</p>
                    </div>
                  </div>
                  <AppShot {...s.shot} className="mt-3 lg:hidden" />
                </Reveal>
              </li>
            ))}
          </ol>

          <p className="mt-6 font-body text-sm text-text-muted">
            Exit anytime. Hedges close, liquidity leaves the pool, and fees plus principal return to your wallet, usually
            in a single transaction.
          </p>
        </div>

        <div className="sticky top-[calc(50vh-15rem)] hidden lg:block">
          <AppShot url={STEPS[active].shot.url}>
            <div className="relative aspect-[16/11]">
              {STEPS.map((s, i) => (
                <img
                  key={s.shot.src}
                  src={s.shot.src}
                  alt={active === i ? s.shot.label : ''}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none ${
                    active === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </AppShot>
          <p className="mt-4 font-mono text-xs text-text-muted" aria-live="polite">
            Step {active + 1} of {STEPS.length} · {STEPS[active].title}
          </p>
        </div>
      </div>
    </section>
  )
}
