import { useState, useEffect } from 'react'
import { Home, Gamepad2, Briefcase, Users, Plug } from 'lucide-react'
import siteConfig from '../../config/site.config.json'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: string | number
}

export const BottomNavigation = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [playerCount, setPlayerCount] = useState(0)
  const [isServerOnline, setIsServerOnline] = useState(true)

  const navItems: NavItem[] = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <Home size={20} />,
      href: '#home'
    },
    { 
      id: 'server', 
      label: 'Server', 
      icon: <Gamepad2 size={20} />,
      href: '#features',
      badge: String(playerCount)
    },
    { 
      id: 'jobs', 
      label: 'Jobs', 
      icon: <Briefcase size={20} />,
      href: '#jobs'
    },
    { 
      id: 'community', 
      label: 'Team', 
      icon: <Users size={20} />,
      href: '#team'
    },
    { 
      id: 'connect', 
      label: 'Connect', 
      icon: <Plug size={20} />,
      href: '#connect'
    }
  ]

  // Hide/show navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false) // Scrolling down
      } else {
        setIsVisible(true) // Scrolling up
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Track active section based on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (sectionId === 'features' || sectionId === 'rules') {
            setActiveSection('server')
          } else if (sectionId === 'team' || sectionId === 'gallery') {
            setActiveSection('community')
          } else {
            setActiveSection(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    const sections = ['home', 'features', 'jobs', 'rules', 'team', 'gallery']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Fetch live player data from CFX.re API
  useEffect(() => {
    const fetchPlayerData = async () => {
      // Skip if no server code configured
      if (!siteConfig.api.serverCode || siteConfig.api.serverCode === 'replaceme') {
        console.warn('No server code configured. Please set your CFX.re server code in site.config.json')
        setPlayerCount(Math.floor(Math.random() * 50) + 10)
        setIsServerOnline(false)
        return
      }

      try {
        const response = await fetch(
          `${siteConfig.api.cfxApiUrl}${siteConfig.api.serverCode}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          }
        )
        
        if (response.ok) {
          const data = await response.json()
          // CFX.re API returns data in Data.players array
          if (data.Data && Array.isArray(data.Data.players)) {
            const playerCount = data.Data.players.length
            setPlayerCount(playerCount)
            setIsServerOnline(true)
          } else {
            throw new Error('Invalid response format')
          }
        } else {
          throw new Error('Failed to fetch server data')
        }
      } catch (error) {
        console.warn('Failed to fetch player data:', error)
        // Fallback to random number if API fails
        setPlayerCount(Math.floor(Math.random() * 50) + 10)
        setIsServerOnline(false)
      }
    }

    // Initial fetch
    fetchPlayerData()

    // Set up interval for periodic updates
    const interval = setInterval(fetchPlayerData, siteConfig.api.refreshInterval)

    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, itemId: string) => {
    e.preventDefault()
    
    if (itemId === 'connect') {
      // Handle connect action
      handleConnect()
    } else {
      // Smooth scroll to section
      const target = document.querySelector(href)
      if (target) {
        const offset = 80
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  const handleConnect = () => {
    // Copy server IP to clipboard
    navigator.clipboard.writeText(siteConfig.server.ip).then(() => {
      // Show toast notification
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gta-green text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce-in'
      toast.textContent = `${siteConfig.ui?.navigation?.serverCopyMessage || 'Server IP copied:'} ${siteConfig.server.ip}`
      document.body.appendChild(toast)
      
      setTimeout(() => {
        toast.classList.add('animate-fade-out')
        setTimeout(() => toast.remove(), 300)
      }, 3000)
    })

    // Open FiveM if available
    window.open(`fivem://connect/${siteConfig.server.ip}`, '_blank')
  }

  return (
    <nav 
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gta-panel/95 backdrop-blur-lg border-t-2 border-accent-blue" />
      
      {/* Navigation Items */}
      <div className="relative flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href, item.id)}
            className={`relative flex flex-col items-center justify-center flex-1 h-full py-2 transition-all duration-200 ${
              activeSection === item.id
                ? 'text-accent-blue'
                : 'text-gta-gray-light active:scale-95'
            }`}
          >
            {/* Active indicator */}
            {activeSection === item.id && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-accent-yellow" />
            )}
            
            {/* Icon with badge */}
            <div className="relative">
              <span className={`transition-transform duration-200 ${
                activeSection === item.id ? 'scale-110' : ''
              }`}>
                {item.icon}
              </span>
              
              {/* Badge for online players */}
              {item.badge !== undefined && item.badge !== null && (
                <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-accent-green text-gta-black text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            
            {/* Label */}
            <span className={`text-[10px] mt-1 font-medium transition-all duration-200 ${
              activeSection === item.id 
                ? 'font-semibold transform scale-105' 
                : ''
            }`}>
              {item.label}
            </span>

            {/* Touch feedback ripple effect */}
            <span className="absolute inset-0 rounded-lg overflow-hidden">
              <span className="touch-ripple" />
            </span>
          </a>
        ))}
      </div>

      {/* Server status bar */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-gta-panel/90 backdrop-blur-sm border-t border-gta-panel-light flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isServerOnline ? 'bg-accent-green' : 'bg-accent-red'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isServerOnline ? 'bg-accent-green' : 'bg-accent-red'}`}></span>
          </span>
          <span className="text-gta-gray-light">{isServerOnline ? (siteConfig.ui?.navigation?.onlineText || 'Online') : (siteConfig.ui?.navigation?.offlineText || 'Offline')}</span>
          <>
            <span className="text-gta-gray-light">•</span>
            <span className="text-gta-white font-medium">{playerCount}/{siteConfig.server.maxPlayers}</span>
          </>
        </div>
        <span className="text-gta-gray-light text-xs font-mono">{siteConfig.server.ip}</span>
      </div>
    </nav>
  )
}