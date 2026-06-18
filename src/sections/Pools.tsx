import { Reveal } from '@/components/Reveal';

const POOLS = [
  {
    name: 'SOL / USDC',
    tag: 'Core',
    accent: 'from-brand-purple/30 to-brand-blue/30',
  },
  {
    name: 'WETH / USDC',
    tag: 'Core',
    accent: 'from-brand-blue/30 to-brand-cyan/30',
  },
  {
    name: 'WBTC / USDC',
    tag: 'Core',
    accent: 'from-brand-cyan/30 to-brand-purple/30',
  },
];

const UNLOCK_STEPS = [
  {
    n: '01',
    title: 'Pay $SHEDGE',
    desc: 'Pay $SHEDGE to unlock the pool.',
  },
  { n: '02', title: 'Connect wallet', desc: 'One click, no signup.' },
  { n: '03', title: 'Access unlocked', desc: 'Protected LPs are live.' },
];

export function Pools() {
  return (
    <section id='pools' className='relative px-6 py-20'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
          <div>
            <p className='font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan'>
              Pools
            </p>
            <h2 className='mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl'>
              Pools That Support
              <br />
              Protected LP
            </h2>
          </div>
          <p className='max-w-sm font-body text-sm text-text-muted'>
            Deposit into any supported pool and your position becomes
            automatically hedged and rebalanced.
          </p>
        </div>

        <div className='mt-12 overflow-hidden rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/10 via-surface-800 to-surface-900 p-10'>
          <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
            <div className='max-w-xl'>
              <p className='font-mono text-xs uppercase tracking-[0.2em] text-brand-gold'>
                Featured Pool
              </p>
              <h3 className='mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl'>
                GOLD / USDC Pool
              </h3>
              <p className='mt-3 font-body text-sm text-text-secondary'>
                Exposure to on-chain gold paired with USDC. Protected LP for
                investors who want defense against both crypto and fiat
                volatility.
              </p>
            </div>
            <div className='flex h-32 w-32 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/10'>
              <span className='font-display text-5xl'>🪙</span>
            </div>
          </div>
        </div>

        <div className='mt-8 grid gap-4 sm:grid-cols-3'>
          {POOLS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className='group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-white/[0.14]'>
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 blur-2xl transition-opacity group-hover:opacity-60`}
                />
                <div className='relative'>
                  <span className='inline-block rounded-full border border-white/[0.08] bg-surface-800 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted'>
                    {p.tag}
                  </span>
                  <p className='mt-8 font-display text-2xl font-semibold tracking-tight'>
                    {p.name}
                  </p>
                  <div className='mt-6 flex items-center justify-between font-body text-xs text-text-muted'>
                    <span>Protected LP</span>
                    <span className='flex items-center gap-1.5 text-success'>
                      <span className='h-1.5 w-1.5 rounded-full bg-success' />{' '}
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className='mt-12'>
          <h3 className='font-display text-2xl font-semibold tracking-tight sm:text-3xl'>
            How to Unlock Protected LP
          </h3>
          <div className='mt-8 grid gap-4 sm:grid-cols-3'>
            {UNLOCK_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className='h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6'>
                  <p className='font-mono text-xs text-text-muted'>{s.n}</p>
                  <p className='mt-3 font-display text-lg font-medium'>
                    {s.title}
                  </p>
                  <p className='mt-1 font-body text-sm text-text-muted'>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
