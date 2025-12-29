import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import ServicesOverview from '@/components/home/ServicesOverview'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import RevealSection from '@/components/ui/RevealSection'
import Pricing from '@/components/home/Pricing'
import HowItWorks from '@/components/home/HowItWorks'
import FAQ from '@/components/home/FAQ'

export const metadata = {
  title: 'SafeHands | Trusted Baby & Elderly Care at Home',
  description:
    'SafeHands helps you book reliable babysitting, elderly care, and special care at home across Bangladesh. Simple, safe, and accessible caregiving.',
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <RevealSection>
        <About />
      </RevealSection>

      <RevealSection>
        <ServicesOverview />
      </RevealSection>

      <RevealSection>
        <HowItWorks />
      </RevealSection>

      <RevealSection>
        <Pricing />
      </RevealSection>

      <RevealSection>
        <Stats />
      </RevealSection>

      <RevealSection>
        <Testimonials />
      </RevealSection>

      <RevealSection>
        <FAQ />
      </RevealSection>
    </>
  )
}
