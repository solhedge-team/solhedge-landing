import { MotionConfig } from 'motion/react'
import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { Overview } from '@/sections/Overview'
import { Problem } from '@/sections/Problem'
import { Features } from '@/sections/Features'
import { Strategy } from '@/sections/Strategy'
import { HowItWorks } from '@/sections/HowItWorks'
import { Security } from '@/sections/Security'
import { Testimonials } from '@/sections/Testimonials'
import { FAQ } from '@/sections/FAQ'
import { CTA } from '@/sections/CTA'
import { Footer } from '@/sections/Footer'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Overview />
          <Features />
          <Problem />
          <Strategy />
          <HowItWorks />
          <Security />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
