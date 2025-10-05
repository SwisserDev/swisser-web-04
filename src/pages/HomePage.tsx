import { useEffect } from 'react'
import { Hero } from '../components/Hero/Hero'
import { Navigation } from '../components/Navigation/Navigation'
import { Features } from '../components/Features/Features'
import { Jobs } from '../components/Jobs/Jobs'
import { Rules } from '../components/Rules/Rules'
import { Team } from '../components/Team/Team'
import { Gallery } from '../components/Gallery/Gallery'
import { Footer } from '../components/Footer/Footer'

export const HomePage = () => {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0)
    
    // Also handle browser back/forward navigation
    window.history.scrollRestoration = 'manual'
    
    return () => {
      // Re-enable default scroll restoration when leaving
      window.history.scrollRestoration = 'auto'
    }
  }, [])

  return (
    <>
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="jobs">
          <Jobs />
        </section>
        <section id="rules">
          <Rules />
        </section>
        <section id="team">
          <Team />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
      </main>
      <Footer />
    </>
  )
}