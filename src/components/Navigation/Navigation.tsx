import { useState, useEffect, useRef, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X, Copy, Check } from 'lucide-react'
import { gsap } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const menuItems = useMemo(
    () => siteConfig.ui?.navigation?.menuItems || ['Features', 'Jobs', 'Rules', 'Team', 'Gallery'],
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ['home', ...menuItems.map(item => item.toLowerCase())]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuItems])

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.3, ease: 'power3.out' }
      )
      gsap.from('.menu-item', {
        x: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        delay: 0.1,
        ease: 'power3.out'
      })
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  const copyServerIP = async () => {
    const serverAddress = `${siteConfig.server.ip}:${siteConfig.server.port}`
    try {
      await navigator.clipboard.writeText(serverAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const isHomePage = location.pathname === '/'

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gta-panel/95 backdrop-blur-md border-b-2 border-accent-blue shadow-gta'
            : 'bg-transparent'
        }`}
      >
        <div className="container-gta">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault()
                  scrollToSection('home')
                }
              }}
            >
              {siteConfig.server?.logo?.type === 'text' ? (
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-accent-yellow" />
                  <span className="font-display text-2xl text-gta-white uppercase">
                    {siteConfig.server.logo.content}
                  </span>
                </div>
              ) : (
                <span className="font-display text-2xl text-gta-white uppercase">
                  {siteConfig.server.shortName || 'RP'}
                </span>
              )}
            </a>

            {/* Desktop Menu */}
            {isHomePage && (
              <div className="hidden lg:flex items-center gap-1">
                {menuItems.map((item) => {
                  const sectionId = item.toLowerCase()
                  const isActive = activeSection === sectionId

                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(sectionId)}
                      className={`
                        relative px-4 py-2 font-heading text-sm uppercase tracking-wider transition-colors duration-200
                        ${isActive ? 'text-accent-blue' : 'text-gta-gray-light hover:text-gta-white'}
                      `}
                    >
                      {item}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={copyServerIP}
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-gta-gray-light hover:text-accent-yellow transition-colors duration-200 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    IP
                  </>
                )}
              </button>

              <a
                href={siteConfig.social?.discord || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gta-yellow text-xs py-2"
              >
                Discord
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gta-white hover:text-accent-blue transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-gta-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          <div
            ref={menuRef}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gta-panel z-50 lg:hidden overflow-y-auto border-l-2 border-accent-blue"
          >
            <div className="p-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-gta-gray-light hover:text-gta-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-12">
                <div className="w-1 h-12 bg-accent-yellow mb-4" />
                <h2 className="font-display text-3xl text-gta-white uppercase">
                  {siteConfig.server.shortName || 'Menu'}
                </h2>
              </div>

              {isHomePage && (
                <nav className="space-y-2 mb-12">
                  {menuItems.map((item, index) => {
                    const sectionId = item.toLowerCase()
                    const isActive = activeSection === sectionId

                    return (
                      <button
                        key={item}
                        onClick={() => scrollToSection(sectionId)}
                        className={`
                          menu-item block w-full text-left px-4 py-3 font-heading uppercase text-lg transition-colors
                          ${isActive ? 'text-accent-blue bg-gta-panel-light border-l-4 border-accent-blue' : 'text-gta-gray-light hover:text-gta-white'}
                        `}
                        style={{ opacity: 0 }}
                      >
                        <span className="font-mono text-xs text-accent-yellow mr-3">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item}
                      </button>
                    )
                  })}
                </nav>
              )}

              <div className="space-y-3 pt-8 border-t-2 border-gta-panel-light">
                <button
                  onClick={copyServerIP}
                  className="menu-item w-full px-4 py-3 font-mono text-sm uppercase tracking-wider text-gta-gray-light hover:text-accent-yellow transition-colors flex items-center gap-2"
                  style={{ opacity: 0 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : `IP: ${siteConfig.server.ip}`}
                </button>

                <a
                  href={siteConfig.social?.discord || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item block w-full btn-gta-yellow text-center text-sm"
                  style={{ opacity: 0 }}
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
