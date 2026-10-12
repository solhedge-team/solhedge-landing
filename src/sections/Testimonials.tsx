import { Reveal } from '@/components/Reveal'

const CARD = {
  grid: 'grid-pattern border-white/[0.08] bg-surface-800/80',
  // Deeper than the brand purple/blue so white text keeps AA contrast.
  accent: 'border-transparent bg-gradient-to-br from-violet-700 to-blue-700',
  plain: 'border-white/[0.08] bg-surface-700/80',
}

const QUOTES = [
  {
    quote: 'Hedged once. Never looked back.',
    author: '@yonathandinata',
    role: 'Algorithmic Trader',
    style: CARD.grid,
    span: 'md:col-span-3',
  },
  {
    quote: 'Make money when we sleep',
    author: '@Friday_SOL',
    role: 'Solana OG',
    style: CARD.accent,
    span: 'md:col-span-3',
  },
  {
    quote: 'Before SolHedge: anxiety, dips, regret. After SolHedge: vibes, yield, peace.',
    author: '@LugasAnegah',
    role: 'DeFi Enthusiast',
    style: CARD.plain,
    span: 'md:col-span-6',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Trusted by crypto
            <span className="text-gradient-brand block">enthusiasts worldwide</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-6">
          {QUOTES.map((q, i) => (
            <Reveal key={q.author} delay={i * 0.08} className={`h-full ${q.span}`}>
              <figure className={`flex h-full min-h-48 flex-col justify-between gap-8 rounded-2xl border p-6 ${q.style}`}>
                <blockquote className="font-display text-xl font-medium leading-snug tracking-tight text-text-primary sm:text-2xl">
                  "{q.quote}"
                </blockquote>
                <figcaption className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-body text-base font-semibold text-text-primary">{q.author}</p>
                    <p className="font-body text-sm text-white/80">{q.role}</p>
                  </div>
                  <div
                    className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple/60 via-brand-blue/60 to-brand-cyan/60 font-display text-lg font-semibold ring-1 ring-white/15"
                    aria-hidden="true"
                  >
                    {q.author.charAt(1).toUpperCase()}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
