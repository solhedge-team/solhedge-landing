import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { WhySolHedge } from '@/sections/WhySolHedge'
import { Pools } from '@/sections/Pools'
import { Growth } from '@/sections/Growth'
import { HowItWorks } from '@/sections/HowItWorks'
import { Testimonials } from '@/sections/Testimonials'
import { FAQ } from '@/sections/FAQ'
import { CTA } from '@/sections/CTA'
import { Footer } from '@/sections/Footer'

export function App() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <WhySolHedge />
        <Pools />
        <Growth />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
