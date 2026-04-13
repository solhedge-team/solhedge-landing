import { SolCoin } from '@/components/SolCoin'

const APP_URL = 'https://app.solhedge.xyz'

export function CTA() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl p-[1px]">
          <div className="conic-border absolute inset-0 rounded-3xl opacity-60" />
          <div className="absolute inset-0 rounded-3xl bg-surface-900" />

          <div className="relative overflow-hidden rounded-3xl bg-surface-800 p-12 text-center sm:p-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[700px] -translate-x-1/2 animate-blob-breathe rounded-full bg-brand-purple/15 blur-[140px]" />

            {/* Signature coin accents — two, intentional */}
            <div className="pointer-events-none absolute bottom-6 left-6 animate-coin-1 sm:bottom-10 sm:left-10">
              <SolCoin size={140} tilt={-18} />
            </div>
            <div className="pointer-events-none absolute right-6 top-6 animate-coin-2 sm:right-10 sm:top-10">
              <SolCoin size={96} tilt={22} />
            </div>

            <div className="relative">
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Earn from DeFi with confidence.<br />
                <span className="text-gradient-brand-animated">No surprises, no regrets.</span>
              </h2>

              <div className="mt-10">
                <a
                  href={APP_URL}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-display text-base font-semibold text-surface-900 transition-transform hover:scale-[1.02]"
                >
                  <span className="relative">Launch SolHedge</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
