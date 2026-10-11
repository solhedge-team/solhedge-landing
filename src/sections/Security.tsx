import { Reveal } from '@/components/Reveal'

const POINTS = [
  {
    title: 'Dedicated escrow',
    desc: 'Each deposit gets its own escrow wallet. SolHedge holds its key in an encrypted key management service, never in the app or your browser.',
  },
  {
    title: 'Penetration tested',
    desc: 'Smart contracts pen-tested by Daemon. Report available to institutional counterparties on request.',
  },
  {
    title: 'Multi-source pricing',
    desc: 'Price data comes from multiple on-chain sources to limit oracle manipulation.',
  },
  {
    title: 'Sized exposure',
    desc: 'Position sizing limits cap counterparty exposure on Jupiter Perps and Phoenix.',
  },
  {
    title: 'Verifiable performance',
    desc: 'Fees earned and hedged vs. unhedged returns are tracked from on-chain data anyone can check.',
  },
  {
    title: 'Production infrastructure',
    desc: 'OOBE Protocol RPC and AWS keep the engine online and reacting in real time.',
  },
]

export function Security() {
  return (
    <section id="security" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Held in escrow.
              <span className="text-gradient-brand block">Visible on-chain.</span>
            </h2>
          </div>
          <a
            href="https://docs.solhedge.xyz/security/risk-framework"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 self-start rounded-full font-body text-sm text-text-secondary transition-colors duration-100 hover:text-text-primary md:self-auto"
          >
            Read the risk framework
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <li key={p.title} className="bg-surface-900">
              <Reveal delay={i * 0.05} className="h-full p-7">
                <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 font-body text-sm text-text-secondary">{p.desc}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-warning/20 bg-warning/[0.04] px-6 py-4">
          <p className="font-body text-sm text-text-secondary">
            <span className="font-medium text-warning">Protected isn't risk-free.</span> Hedges can be imperfectly
            sized, so some impermanent loss can remain. In Defensive mode, fee accrual stops and the position is
            realized at that moment, including any IL already incurred. Nothing here is financial advice.
          </p>
        </div>
      </div>
    </section>
  )
}
