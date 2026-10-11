const APP_URL = 'https://app.solhedge.xyz'
const DOCS_URL = 'https://docs.solhedge.xyz'

export function CTA() {
  return (
    <section className="relative p-2 sm:p-3">
      <div className="relative isolate overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-800 [clip-path:inset(0_round_1.5rem)] px-6 py-24 text-center sm:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-blue/25 via-surface-800 to-brand-purple/30" aria-hidden="true" />
        <div className="grid-pattern absolute inset-0 -z-10 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden="true" />

        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          Earn fees when the market trades.
          <span className="text-gradient-brand-animated block pb-1">Let the AI handle the rest.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg text-text-secondary">
          Connect a wallet, pick a pool, and let the portfolio run.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={APP_URL}
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 font-body text-sm font-medium text-surface-900 transition-[background-color,transform] duration-100 hover:bg-text-secondary active:scale-[0.97]"
          >
            Launch app
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-7 font-body text-sm font-medium text-text-primary transition-colors duration-100 hover:bg-white/[0.08]"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  )
}
