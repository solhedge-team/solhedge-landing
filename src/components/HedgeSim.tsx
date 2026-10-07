import { useLayoutEffect, useRef, useState } from 'react'

// Illustrative series, deterministic. Not market data.
const N = 60
const HEDGE_AT = 6
const W = 560
const H = 280
const PAD = { l: 40, r: 16, t: 20, b: 24 }
const Y_MIN = 68
const Y_MAX = 106

function price(i: number) {
  const t = i / (N - 1)
  const drop = 100 - 22 * Math.sin(Math.min(t * 1.35, 1) * Math.PI * 0.5)
  const recover = t > 0.72 ? (t - 0.72) * 30 : 0
  const wobble = Math.sin(i * 1.7) * 0.8 + Math.cos(i * 0.9) * 0.5
  return drop + recover + wobble
}

const prices = Array.from({ length: N }, (_, i) => price(i))
const FEES_PER_STEP = 0.07
const LP_DELTA = 0.68
const lpValue = prices.map((p, i) => 100 + LP_DELTA * (p - 100) - Math.abs(p - 100) * 0.04 + FEES_PER_STEP * i)
const hedgeEntry = prices[HEDGE_AT]
const hedgePnl = prices.map((p, i) => (i < HEDGE_AT ? 0 : LP_DELTA * (hedgeEntry - p)))
const netValue = lpValue.map((v, i) => v + hedgePnl[i])

const x = (i: number) => PAD.l + (i / (N - 1)) * (W - PAD.l - PAD.r)
const y = (v: number) => PAD.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD.t - PAD.b)
const toPath = (s: number[]) => s.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')

const SERIES = [
  { id: 'price', label: 'SOL price', d: toPath(prices), stroke: '#5c616b', width: 1.25, dash: '3 5', delay: 0 },
  { id: 'lp', label: 'Unhedged LP', d: toPath(lpValue), stroke: '#a78bfa', width: 1.75, delay: 0.1 },
  { id: 'net', label: 'Hedged LP', d: toPath(netValue), stroke: '#22d3ee', width: 2.25, delay: 0.2 },
] as const

const last = N - 1
const pct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`
const STATS = [
  { k: 'SOL price', v: pct(prices[last] - 100), tone: 'text-text-secondary' },
  { k: 'Unhedged LP', v: pct(lpValue[last] - 100), tone: 'text-purple' },
  { k: 'Hedged LP', v: pct(netValue[last] - 100), tone: 'text-accent' },
]

function Lines() {
  const ref = useRef<SVGGElement>(null)
  useLayoutEffect(() => {
    ref.current?.querySelectorAll<SVGPathElement>('path.sim-line').forEach((p) => {
      p.style.setProperty('--len', `${p.getTotalLength()}`)
    })
  }, [])
  return (
    <g ref={ref}>
      {SERIES.map((s) => (
        <path
          key={s.id}
          className="sim-line"
          d={s.d}
          fill="none"
          stroke={s.stroke}
          strokeWidth={s.width}
          strokeDasharray={'dash' in s ? s.dash : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ '--delay': `${s.delay}s` } as React.CSSProperties}
        />
      ))}
    </g>
  )
}

export function HedgeSim() {
  const [run, setRun] = useState(0)

  return (
    <figure className="panel overflow-hidden" aria-labelledby="sim-title">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <figcaption id="sim-title" className="text-sm font-medium">
          Hedge replay <span className="text-text-muted">(illustrative)</span>
        </figcaption>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="mono flex items-center gap-1.5 transition-colors hover:text-text-primary"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.4h-2.4" />
          </svg>
          Replay
        </button>
      </div>

      <div key={run}>
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Chart: SOL price falls about twenty percent. The unhedged LP value falls with it. The hedged LP value stays roughly flat while fees accrue.">
          {[70, 80, 90, 100].map((v) => (
            <g key={v}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.06)" />
              <text x={PAD.l - 8} y={y(v) + 3} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5c616b">
                {v}
              </text>
            </g>
          ))}
          <line x1={x(HEDGE_AT)} x2={x(HEDGE_AT)} y1={PAD.t} y2={H - PAD.b} stroke="#22d3ee" strokeOpacity="0.4" strokeDasharray="2 4" />
          <text x={x(HEDGE_AT) + 6} y={H - PAD.b - 6} fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#22d3ee">
            short opened
          </text>
          <Lines />
          <circle cx={x(last)} cy={y(netValue[last])} r="3.5" fill="#22d3ee" className="sim-pop" style={{ '--delay': '2.4s' } as React.CSSProperties} />
        </svg>
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-4 py-2.5" aria-hidden>
        {SERIES.map((s) => (
          <li key={s.id} className="mono flex items-center gap-2">
            <span className="h-0.5 w-4 rounded" style={{ background: s.stroke }} />
            {s.label}
          </li>
        ))}
      </ul>

      <dl className="grid grid-cols-3 divide-x divide-line border-t border-line">
        {STATS.map((s) => (
          <div key={s.k} className="px-4 py-3">
            <dt className="mono">{s.k}</dt>
            <dd className={`num mt-1 font-mono text-sm ${s.tone}`}>{s.v}</dd>
          </div>
        ))}
      </dl>
    </figure>
  )
}
