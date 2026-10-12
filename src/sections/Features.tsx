import { Reveal } from '@/components/Reveal'
import { AppShot } from '@/components/AppShot'

const JUPITER = '/partners/jupiter.svg'
const METEORA = '/partners/meteora.svg'
const PHOENIX = '/partners/phoenix.svg'

const FEATURES = [
  {
    name: 'Auto-Hedge',
    title: 'Protection that shows up when it matters',
    desc: 'Opens offsetting positions on Jupiter Perps and Phoenix to cut impermanent loss and directional exposure. It fires on confirmed, high-confidence risk events, not on every wick.',
    rails: [{ name: 'Jupiter Perps', logo: JUPITER }, { name: 'Phoenix', logo: PHOENIX }],
    shot: { src: '/app/hedge.webp', url: 'app.solhedge.xyz/escrow', label: 'Hedge position card showing a HYPE short on Phoenix' },
    icon: <path d="M12 3 5 6v5.5c0 4.5 3 8.3 7 9.5 4-1.2 7-5 7-9.5V6l-7-3Z" />,
  },
  {
    name: 'Auto-Range',
    title: 'Liquidity stays where the trades are',
    desc: 'The AI moves your DLMM range boundaries using volatility and momentum signals, so capital earns fees instead of sitting out of range.',
    rails: [{ name: 'Meteora DLMM', logo: METEORA }],
    shot: { src: '/app/range.webp', url: 'app.solhedge.xyz/escrow', label: 'Position P&L card with fees earned on a JUP-SOL position' },
    icon: <path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" />,
  },
  {
    name: 'Auto-Rebalance',
    title: 'Fee efficiency as price moves',
    desc: 'Liquidity is redistributed inside your range as the market shifts. No closing and reopening positions by hand.',
    rails: [{ name: 'Meteora DLMM', logo: METEORA }, { name: 'Jupiter', logo: JUPITER }],
    shot: { src: '/app/rebalance.webp', url: 'app.solhedge.xyz/escrow', label: 'Activity log showing LP positions closed and reopened automatically' },
    icon: <path d="M12 4v16M5 8h14M3 15l2-7 2 7a2.5 2.5 0 0 1-4 0ZM17 15l2-7 2 7a2.5 2.5 0 0 1-4 0Z" />,
  },
  {
    name: 'Auto-Compound',
    title: 'Earned fees go straight back to work',
    desc: 'Fees are harvested and reinvested around the clock, with no manual claims and no timing guesswork.',
    rails: [{ name: 'Meteora DLMM', logo: METEORA }],
    shot: { src: '/app/compound.webp', url: 'app.solhedge.xyz/portfolio', label: 'Daily PnL calendar in the portfolio' },
    icon: <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />,
  },
]

export function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Four autopilots.
            <span className="text-gradient-brand block">One portfolio.</span>
          </h2>
          <p className="mt-6 font-body text-lg text-text-secondary">
            Built on Meteora DLMM, executed through Jupiter and Phoenix. You deposit; the AI runs the position.
          </p>
        </div>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {FEATURES.map((f, i) => (
            <div key={f.name} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 ? 'lg:order-last' : ''}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-surface-800">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-text-primary" aria-hidden="true">
                      {f.icon}
                    </svg>
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">{f.name}</p>
                </div>
                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{f.title}</h3>
                <p className="mt-4 max-w-prose font-body text-base text-text-secondary sm:text-lg">{f.desc}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Execution rails">
                  {f.rails.map((r) => (
                    <li key={r.name} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1 pl-1.5 pr-3 font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                      <img src={r.logo} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                      {r.name}
                    </li>
                  ))}
                </ul>
              </div>
              <Reveal>
                <AppShot {...f.shot} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
