import { APP_URL } from '@/sections/Header'

export function Closing() {
  return (
    <section className="border-b border-line">
      <div className="wrap flex flex-col gap-8 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] lg:text-5xl">
          Keep providing liquidity. Stop holding the token.
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <a href={APP_URL} className="btn btn-primary">Open a hedged position</a>
          <a href="#faq" className="text-sm text-text-muted underline underline-offset-4 hover:text-text-primary">
            Read the risks first
          </a>
        </div>
      </div>
    </section>
  )
}
