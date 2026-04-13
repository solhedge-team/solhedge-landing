import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Growth() {
  const pathRef = useRef<SVGPathElement>(null)
  const fillRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const fill = fillRef.current
    const dot = dotRef.current
    const heading = headingRef.current
    if (!path || !fill || !dot || !heading) return

    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    gsap.set(fill, { opacity: 0 })
    gsap.set(dot, { opacity: 0, scale: 0.4, transformOrigin: 'center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1,
      },
    })

    tl.to(path, { strokeDashoffset: 0, ease: 'none' }, 0)
      .to(fill, { opacity: 1, ease: 'none' }, 0)
      .to(dot, { opacity: 1, scale: 1, ease: 'power2.out' }, 0.85)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === heading) st.kill()
      })
    }
  }, [])

  return (
    <section className="relative overflow-hidden px-6 py-40">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-purple/10 via-brand-blue/10 to-brand-cyan/10 blur-[160px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2
          ref={headingRef}
          className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Grow Your Crypto,<br />
          <span className="text-gradient-brand">With Smarter Risk Control</span>
        </h2>

        <svg viewBox="0 0 600 200" className="mx-auto mt-16 w-full max-w-2xl" fill="none">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" />
          ))}
          <path
            d="M0 170 Q 80 150 120 140 T 240 120 Q 280 135 320 100 T 440 80 Q 480 90 520 50 T 600 30"
            stroke="rgba(139,92,246,0.25)"
            strokeDasharray="4 6"
            strokeWidth="1.5"
          />
          <path
            ref={fillRef}
            d="M0 170 Q 80 150 120 140 T 240 120 Q 280 135 320 100 T 440 80 Q 480 90 520 50 T 600 30 L 600 200 L 0 200 Z"
            fill="url(#g2)"
          />
          <path
            ref={pathRef}
            d="M0 170 Q 80 150 120 140 T 240 120 Q 280 135 320 100 T 440 80 Q 480 90 520 50 T 600 30"
            stroke="url(#g1)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle ref={dotRef} cx="600" cy="30" r="7" fill="#06B6D4">
            <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>

        <p className="mx-auto mt-12 max-w-2xl font-body text-lg text-text-secondary">
          Steady income in bull markets. Capital defense when things turn. The same vault, either regime.
        </p>
      </div>
    </section>
  )
}
