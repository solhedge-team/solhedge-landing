import { Reveal } from '@/components/Reveal'

const COLUMNS = ['Hold stablecoins', 'Manual LP', 'SolHedge']

const ROWS = [
  { label: 'Earns trading fees', values: ['No', 'Yes', 'Yes'] },
  { label: 'Impermanent loss', values: ['None', 'Fully exposed', 'Hedged on risk signals'] },
  { label: 'Range management', values: ['—', 'Manual, constant', 'AI, automatic'] },
  { label: 'Compounding', values: ['—', 'Manual claims', 'Automatic, 24/7'] },
  { label: 'Perps know-how', values: ['Not needed', 'Needed to hedge', 'Not needed'] },
  { label: 'Custody', values: ['Your wallet', 'Your wallet', 'SolHedge escrow'] },
]

export function Problem() {
  return (
    <section id="compare" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Safety or yield?{' '}
            <span className="relative inline-block">
              <span className="text-gradient-brand">Stop choosing.</span>
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-brand-cyan" fill="none" aria-hidden="true">
                <path d="M2 9c50-6 130-8 196-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="mt-8 font-body text-lg text-text-secondary">
            Holding cash earns nothing. Passive LPing leaks value to impermanent loss. SolHedge earns the fees and
            defends the capital.
          </p>
        </div>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <td className="p-4 sm:w-1/4 sm:p-5" />
                  {COLUMNS.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      // ponytail: "Hold stablecoins" hidden under sm so SolHedge stays on-screen; mobile card layout if it needs all three
                      className={`p-4 font-display text-sm font-semibold sm:w-1/4 sm:p-5 sm:text-base ${i === 0 ? 'hidden sm:table-cell' : ''} ${i === 2 ? 'bg-brand-purple/[0.12] text-brand-cyan' : 'text-text-primary'}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-white/[0.05] last:border-0">
                    <th scope="row" className="p-4 font-display text-sm font-medium text-text-primary sm:p-5 sm:text-base">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td
                        key={i}
                        className={`p-4 font-body text-sm sm:p-5 sm:text-base ${i === 0 ? 'hidden sm:table-cell' : ''} ${i === 2 ? 'bg-brand-purple/[0.12] text-text-primary' : 'text-text-muted'}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
