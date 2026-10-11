import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'

const BinsScene = lazy(() => import('@/components/BinsScene').then((m) => ({ default: m.BinsScene })))

const APP_URL = 'https://app.solhedge.xyz'
const DOCS_URL = 'https://docs.solhedge.xyz'

const PARTNERS = [
  { name: 'Jupiter', logo: '/partners/jupiter.svg' },
  { name: 'Meteora', logo: '/partners/meteora.svg' },
  { name: 'Phoenix', logo: '/partners/phoenix.svg' },
]

const ease = [0.2, 0.8, 0.2, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative flex min-h-svh flex-col">
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-6 pb-12 pt-32 sm:px-10 lg:grid-cols-[5fr_7fr] lg:pt-28">
          <div className="relative z-10">
            <motion.p
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              Live on Solana mainnet
            </motion.p>

            <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl 2xl:text-7xl">
              <motion.span {...rise(0.08)} className="block">
                Earn fees automatically
              </motion.span>
              <motion.span {...rise(0.16)} className="block pb-2 text-[#22d3ee]">
                with protection
              </motion.span>
            </h1>

            <motion.p {...rise(0.24)} className="mt-5 max-w-md font-body text-lg text-text-secondary sm:text-xl">
              Automated AI-powered strategy for Liquidity Providing
            </motion.p>

            <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 font-body text-sm font-medium text-surface-900 transition-[background-color,transform] duration-100 hover:bg-text-secondary active:scale-[0.97]"
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
                className="inline-flex h-12 items-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 font-body text-sm font-medium text-text-primary transition-colors duration-100 hover:bg-white/[0.08]"
              >
                Read the docs
              </a>
            </motion.div>

            <motion.div {...rise(0.4)} className="mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">Powered by</p>
              <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                {PARTNERS.map((p) => (
                  <li key={p.name} className="flex items-center gap-2.5">
                    <img src={p.logo} alt="" width={26} height={26} className="h-[26px] w-[26px]" />
                    <span className="font-display text-lg font-semibold tracking-tight text-text-primary">{p.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:absolute lg:inset-0"
          >
            <Suspense fallback={<div className="h-[340px] sm:h-[460px] lg:h-full" />}>
              <BinsScene />
            </Suspense>
          </motion.div>
        </div>

        <p className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-6 font-mono text-[11px] uppercase tracking-wider text-text-muted sm:px-10">
          Pen-tested by Daemon · Not financial advice
        </p>
      </div>
    </section>
  )
}
