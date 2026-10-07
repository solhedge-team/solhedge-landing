import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { Problem } from '@/sections/Problem'
import { HowItWorks } from '@/sections/HowItWorks'
import { Product } from '@/sections/Product'
import { Strategies } from '@/sections/Strategies'
import { Pools } from '@/sections/Pools'
import { Safety } from '@/sections/Safety'
import { FAQ } from '@/sections/FAQ'
import { Closing } from '@/sections/Closing'
import { Footer } from '@/sections/Footer'

export function App() {
  return (
    <>
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-text-primary focus:px-3 focus:py-2 focus:text-surface-900">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Product />
        <Strategies />
        <Pools />
        <Safety />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
