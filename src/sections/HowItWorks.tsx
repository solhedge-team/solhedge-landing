import { Reveal } from '@/components/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Connect Your Wallet',
    desc: 'Connect your wallet in 1 click. No signup, no KYC required. Simple and secure.',
  },
  {
    n: '02',
    title: 'Choose Pool & Deposit',
    desc: 'Pick a Protected LP pool that fits your thesis and deposit USDC. The vault handles the rest.',
  },
  {
    n: '03',
    title: 'Relax & Earn',
    desc: 'Auto-hedging and rebalancing run in the background. Check in when you want.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">How It Works</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Get started in 3 simple steps.
          </h2>
          <p className="mt-4 font-body text-lg text-text-muted">No hassle, no drama.</p>
        </div>

        <div className="relative mt-20 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15} className="relative">
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.08] bg-surface-800 shadow-lg">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-cyan/20" />
                <span className="relative font-display text-2xl font-semibold tracking-tight text-text-primary">
                  {i + 1}
                </span>
              </div>
              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="font-mono text-xs text-text-muted">{s.n}</p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 font-body text-sm text-text-secondary">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
