import { Reveal } from '@/components/Reveal'

const MODES = [
  {
    name: 'Calm',
    status: 'Fully deployed',
    desc: 'Healthy market. Liquidity is fully deployed and earning trading fees. No hedge.',
    level: 1,
    bar: 'bg-success',
    text: 'text-success',
  },
  {
    name: 'Caution',
    status: 'Partial hedge',
    desc: 'Early risk signals appear. A partial hedge switches on while fees keep accruing.',
    level: 2,
    bar: 'bg-warning',
    text: 'text-warning',
  },
  {
    name: 'Defensive',
    status: 'Moved to stables',
    desc: 'Multiple signals confirm together. Liquidity moves to stablecoins until conditions settle.',
    level: 3,
    bar: 'bg-error',
    text: 'text-error',
  },
]

export function Strategy() {
  return (
    <section id="strategy" className="relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-purple/10 via-brand-blue/10 to-brand-cyan/10 blur-[160px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Three modes.
            <span className="text-gradient-brand block">One decision engine.</span>
          </h2>
          <p className="mt-6 font-body text-lg text-text-secondary">
            Most of the time SolHedge runs like a well-managed LP. Protection scales up only when market signals
            confirm real risk.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {MODES.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className="h-full">
              <li className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-surface-800/60 p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{m.name}</h3>
                  <span className={`font-mono text-[11px] uppercase tracking-wider ${m.text}`}>{m.status}</span>
                </div>
                <div className="mt-5 flex gap-1.5" role="img" aria-label={`Protection level ${m.level} of 3`}>
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= m.level ? m.bar : 'bg-white/[0.08]'}`} />
                  ))}
                </div>
                <p className="mt-5 font-body text-sm text-text-secondary sm:text-base">{m.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-4 grid gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:grid-cols-2 md:gap-10">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">Fast to protect</p>
            <p className="mt-2 font-body text-sm text-text-secondary">
              Being late to protect a position costs real capital, so the engine shifts toward caution quickly.
            </p>
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">Slow to relax</p>
            <p className="mt-2 font-body text-sm text-text-secondary">
              Returning to calm needs sustained confirmation. A false alarm costs a little fee upside. A missed one
              costs principal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
