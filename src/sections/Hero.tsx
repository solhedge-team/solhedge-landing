import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Aurora from '@/reactbits/Aurora'
import { Ticker } from '@/components/Ticker'

const APP_URL = 'https://app.solhedge.xyz'

const headlineVariants = {
  hidden: { opacity: 0, filter: 'blur(18px)', y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
}

export function Hero() {
  const [copied, setCopied] = useState(false)

  const copyContractAddress = () => {
    const contractAddress = '4bR9nvZYq6gpScGFEx3Qr2WcTtnTSXrJebw18FrTs11i'
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
  }

  useEffect(() => {
    if (!copied) return

    const timeoutId = window.setTimeout(() => {
      setCopied(false)
    }, 1600)

    return () => window.clearTimeout(timeoutId)
  }, [copied])

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[calc(100svh-65px)] flex-col overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <Aurora
            colorStops={['#8B5CF6', '#3B82F6', '#06B6D4']}
            amplitude={1.1}
            blend={0.55}
            speed={0.7}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-900/0 via-surface-900/40 to-surface-900" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={headlineVariants}
              className="block text-gradient"
            >
              Turn Volatility Into
            </motion.span>
            <motion.span
              custom={1}
              initial="hidden"
              animate="visible"
              variants={headlineVariants}
              className="block text-gradient-brand-animated"
            >
              Smart Income
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mx-auto mt-8 max-w-2xl font-body text-lg text-text-secondary sm:text-xl"
          >
            AI-powered, automated strategy that protects capital and profits from both up and down markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={APP_URL}
              className="group relative overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan" />
              <span
                className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.8s linear infinite',
                }}
              />
              <span className="relative text-white">Get started now</span>
            </a>
            <button
              type="button"
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-7 py-3 font-body text-sm font-medium text-text-primary backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
              onClick={copyContractAddress}
            >
              {copied ? '📋 Copied' : '📋 Copy CA'}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mx-auto mt-14 max-w-xl font-body text-sm italic text-text-muted"
          >
            SolHedge turns market ups and downs into steady income so you can finally sleep
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="relative"
        >
          <Ticker />
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-6 pb-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-x-10 -inset-y-4 bg-gradient-to-r from-brand-purple/30 via-brand-blue/30 to-brand-cyan/30 opacity-40 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-800/80 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-1.5 border-b border-white/[0.05] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-error/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
              <span className="ml-4 font-mono text-xs text-text-muted">app.solhedge.xyz/portfolio</span>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-5">
                <p className="font-body text-xs text-text-muted">Total Value</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-tight">$48,291</p>
                <p className="mt-1 font-mono text-xs text-success">+12.4%</p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-5">
                <p className="font-body text-xs text-text-muted">Protected LPs</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-tight">4</p>
                <p className="mt-1 font-mono text-xs text-text-muted">SOL · WETH · WBTC · GOLD</p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-gradient-to-br from-brand-purple/10 to-brand-cyan/10 p-5">
                <p className="font-body text-xs text-text-muted">Hedge Status</p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-gradient-brand">Active</p>
                <p className="mt-1 font-mono text-xs text-text-muted">auto-rebalance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
