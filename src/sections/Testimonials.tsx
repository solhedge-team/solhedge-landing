import { Reveal } from '@/components/Reveal'

const QUOTES = [
  {
    quote: 'Hedged once. Never looked back.',
    author: '@yonathandinata',
    role: 'Algorithmic Trader',
    gradient: 'from-brand-purple/30 to-transparent',
  },
  {
    quote: 'Make money when we sleep',
    author: '@Friday_SOL',
    role: 'Solana OG',
    gradient: 'from-brand-blue/30 to-transparent',
  },
  {
    quote: 'Before SolHedge: anxiety, dips, regret. After SolHedge: vibes, yield, peace.',
    author: '@LugasAnegah',
    role: 'DeFi Enthusiast',
    gradient: 'from-brand-cyan/30 to-transparent',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Trusted by crypto
            <span className="text-gradient-brand block">enthusiasts worldwide</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.author} delay={i * 0.12} className='md:mt-10'>
            <figure
              className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-transform hover:-translate-y-1`}
            >
              <div className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${q.gradient} blur-3xl`} />
              <div className="relative">
                <svg viewBox="0 0 32 24" className="h-6 w-8 text-brand-purple/40" fill="currentColor">
                  <path d="M0 24V14Q0 8 2 5T10 0v4Q6 4 5 6t-1 6h5v12Zm18 0V14q0-6 2-9T28 0v4q-4 0-5 2t-1 6h5v12Z" />
                </svg>
                <blockquote className="mt-5 font-display text-xl font-medium leading-snug tracking-tight text-text-primary">
                  "{q.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple/40 via-brand-blue/40 to-brand-cyan/40 font-display text-sm font-semibold">
                    {q.author.charAt(1).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-text-primary">{q.author}</p>
                    <p className="font-body text-xs text-text-muted">{q.role}</p>
                  </div>
                </figcaption>
              </div>
            </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
