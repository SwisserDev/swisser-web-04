import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { TermsOfService } from './components/Legal/TermsOfService'
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy'
import { refreshScrollTriggers } from './lib/gsap-config'

// ScrollToTop component to handle route changes
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  useEffect(() => {
    // Disable scroll restoration globally
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Refresh ScrollTriggers after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      refreshScrollTriggers()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="min-h-screen bg-street-black">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App