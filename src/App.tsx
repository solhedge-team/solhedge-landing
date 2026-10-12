import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { Overview } from '@/sections/Overview'
import { Problem } from '@/sections/Problem'
import { Features } from '@/sections/Features'
import { Strategy } from '@/sections/Strategy'
import { HowItWorks } from '@/sections/HowItWorks'
import { Testimonials } from '@/sections/Testimonials'
import { FAQ } from '@/sections/FAQ'
import { CTA } from '@/sections/CTA'
import { Footer } from '@/sections/Footer'

const GradientWaves = lazy(() => import('@/components/GradientWaves'))
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      {!reducedMotion && (
        <div className="pointer-events-none fixed inset-0 opacity-60" aria-hidden="true">
          <Suspense fallback={null}>
            <GradientWaves horizonColor="#8B5CF6" waveColor="#3B82F6" crestColor="#06B6D4" brightness={1.2} height={4} />
          </Suspense>
        </div>
      )}
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Overview />
          <Features />
          <Problem />
          <Strategy />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
