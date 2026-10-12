import { Reveal } from '@/components/Reveal'

const QUOTES = [
  {
    quote: 'Hedged once. Never looked back.',
    author: '@yonathandinata',
    role: 'Algorithmic Trader',
    avatar: 'from-brand-purple to-brand-blue',
  },
  {
    quote: 'Make money when we sleep',
    author: '@Friday_SOL',
    role: 'Solana OG',
    avatar: 'from-brand-blue to-brand-cyan',
  },
  {
    quote: 'Before SolHedge: anxiety, dips, regret. After SolHedge: vibes, yield, peace.',
    author: '@LugasAnegah',
    role: 'DeFi Enthusiast',
    avatar: 'from-brand-cyan to-brand-purple',
  },
]

// Back to front: the back cards sit greyed under a veil until hovered or focused.
const STACK = [
  'hover:-translate-y-10 focus-visible:-translate-y-10',
  'translate-x-8 translate-y-6 sm:translate-x-16 sm:translate-y-10 hover:-translate-y-1 focus-visible:-translate-y-1',
  'translate-x-16 translate-y-12 sm:translate-x-32 sm:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10 focus-visible:translate-y-6 sm:focus-visible:translate-y-10',
]
const VEILED =
  'grayscale before:absolute before:inset-0 before:rounded-2xl before:bg-surface-900/60 before:transition-opacity before:duration-500 before:content-[""] hover:grayscale-0 hover:before:opacity-0 focus-visible:grayscale-0 focus-visible:before:opacity-0'

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Trusted by crypto
            <span className="text-gradient-brand block">enthusiasts worldwide</span>
          </h2>
        </div>

        <Reveal className="mt-16 flex justify-center pb-24 sm:pb-36">
          <ul className="grid -translate-x-8 [grid-template-areas:'stack'] sm:-translate-x-16" aria-label="Testimonials">
            {QUOTES.map((q, i) => (
              <li
                key={q.author}
                tabIndex={0}
                className={`relative flex min-h-[160px] w-[260px] -skew-y-[8deg] select-none flex-col justify-between rounded-2xl border border-white/[0.08] bg-surface-800/90 px-4 py-4 backdrop-blur-sm transition-all duration-700 [grid-area:stack] hover:border-white/[0.16] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan sm:min-h-[180px] sm:w-[380px] ${STACK[i]} ${i < QUOTES.length - 1 ? VEILED : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${q.avatar} font-display text-sm font-semibold sm:size-11`}
                    aria-hidden="true"
                  >
                    {q.author.charAt(1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-body text-sm font-medium text-text-primary">{q.author}</p>
                    <p className="truncate font-body text-xs text-text-muted">{q.role}</p>
                  </div>
                  <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-current text-text-secondary" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <blockquote className="mt-3 font-display text-base font-medium leading-snug tracking-tight text-text-primary sm:text-lg">
                  "{q.quote}"
                </blockquote>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
