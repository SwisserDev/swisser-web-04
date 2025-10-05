import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import { Play, Users, MapPin, Zap, Server } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [playerCount, setPlayerCount] = useState(0)
  const [isServerOnline, setIsServerOnline] = useState(true)
  const [currentTip, setCurrentTip] = useState(0)
  const [loadingStage, setLoadingStage] = useState('Initializing')

  // Rotate through loading tips
  useEffect(() => {
    if (!isLoading) return
    const tips = siteConfig.server.loadingTips || []
    if (tips.length === 0) return

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isLoading])

  // Loading progress with stages
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setTimeout(() => setIsLoading(false), 500)
          clearInterval(timer)
          return 100
        }

        // Update loading stage based on progress
        if (prev < 20) setLoadingStage('Initializing Connection')
        else if (prev < 40) setLoadingStage('Loading Server Data')
        else if (prev < 60) setLoadingStage('Syncing Assets')
        else if (prev < 80) setLoadingStage('Preparing Interface')
        else if (prev < 95) setLoadingStage('Final Checks')
        else setLoadingStage('Ready to Launch')

        const increment = Math.random() * 4 + 1.5
        return Math.min(prev + increment, 100)
      })
    }, 60)

    return () => clearInterval(timer)
  }, [])

  // Fetch player data
  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!siteConfig.api.serverCode || siteConfig.api.serverCode === 'replaceme') {
        setPlayerCount(Math.floor(Math.random() * 50) + 10)
        setIsServerOnline(false)
        return
      }

      try {
        const response = await fetch(
          `${siteConfig.api.cfxApiUrl}${siteConfig.api.serverCode}`,
          { method: 'GET', headers: { 'Accept': 'application/json' } }
        )

        if (response.ok) {
          const data = await response.json()
          if (data.Data && Array.isArray(data.Data.players)) {
            setPlayerCount(data.Data.players.length)
            setIsServerOnline(true)
          }
        }
      } catch (error) {
        setPlayerCount(Math.floor(Math.random() * 50) + 10)
        setIsServerOnline(false)
      }
    }

    fetchPlayerData()
    const interval = setInterval(fetchPlayerData, siteConfig.api.refreshInterval)
    return () => clearInterval(interval)
  }, [])

  // Immersive GTA V style animations
  useGSAP(() => {
    if (!isLoading && heroRef.current) {
      const tl = gsap.timeline()

      // Cinematic zoom-in effect
      tl.from(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      })

      // Stagger in HUD elements from different directions
      .from('.hero-label', {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-title-word', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.3')
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2')
      .from('.hero-stats-item', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.3')
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.2')

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              y: self.progress * 150,
              scale: 1 + self.progress * 0.1
            })
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y: self.progress * 80,
              opacity: 1 - self.progress * 0.8
            })
          }
        }
      })
    }
  }, [isLoading])

  // Cinematic Visual Loading Screen
  if (isLoading) {
    const tips = siteConfig.server.loadingTips || []

    return (
      <div className="fixed inset-0 bg-gta-black z-50 overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] ease-out"
            style={{
              backgroundImage: `url('${siteConfig.images?.hero?.loadingBackground || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'}')`,
              transform: `scale(${1 + loadingProgress * 0.001})`,
              filter: 'brightness(0.3)'
            }}
          />
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
          }} />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gta-black/20 to-gta-black" />
          {/* Scanlines effect */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-16">
          {/* Top - Animated Server Name */}
          <div className="flex-shrink-0">
            <div className="flex items-start gap-6">
              <div className="flex flex-col gap-2">
                <div
                  className="w-1 bg-accent-blue transition-all duration-500"
                  style={{ height: `${loadingProgress * 2}px` }}
                />
                <div
                  className="w-1 bg-accent-yellow transition-all duration-700"
                  style={{ height: `${loadingProgress * 1.5}px` }}
                />
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-5xl lg:text-7xl text-gta-white uppercase mb-3 whitespace-nowrap" style={{
                  textShadow: '0 0 30px rgba(94, 156, 211, 0.5)'
                }}>
                  <TypeAnimation
                    sequence={[
                      siteConfig.server?.name || 'Los Santos Roleplay',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    cursor={false}
                    style={{ display: 'inline-block', minWidth: '100%' }}
                  />
                </h1>
                <div className="font-heading text-accent-blue uppercase text-lg tracking-widest whitespace-nowrap">
                  <TypeAnimation
                    sequence={[
                      1000,
                      siteConfig.server?.tagline || 'Welcome to the Experience',
                      1000,
                    ]}
                    wrapper="span"
                    speed={70}
                    cursor={false}
                    style={{ display: 'inline-block', minWidth: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main Progress */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-4xl w-full">
              {/* Large Progress Percentage */}
              <div className="mb-12">
                <div
                  className="font-display text-[12rem] lg:text-[16rem] text-gta-white leading-none relative inline-block"
                  style={{
                    textShadow: `0 0 60px rgba(94, 156, 211, ${0.4 + (loadingProgress / 100) * 0.3})`
                  }}
                >
                  {Math.floor(loadingProgress)}
                  <span className="text-accent-blue text-8xl lg:text-9xl">%</span>
                </div>
              </div>

              {/* Loading Stage with Typewriter */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-4 bg-gta-panel/40 backdrop-blur-md px-8 py-4 border-l-4 border-accent-blue">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-8 bg-accent-blue"
                        style={{
                          animation: 'pulse 1.5s ease-in-out infinite',
                          animationDelay: `${i * 0.15}s`,
                          opacity: 0.3
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-heading text-2xl lg:text-3xl text-gta-white uppercase tracking-wider">
                    {loadingStage}
                  </span>
                </div>
              </div>

              {/* Progress Bar - Cinematic */}
              <div className="max-w-3xl mx-auto">
                <div className="relative h-2 bg-gta-panel/50 backdrop-blur-sm overflow-hidden">
                  {/* Glow effect behind bar */}
                  <div
                    className="absolute -inset-y-2 left-0 blur-xl bg-accent-blue/40 transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />

                  {/* Main progress bar */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-blue via-accent-blue-light to-accent-yellow transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    {/* Shimmer overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{
                        animation: 'shimmer 2s infinite',
                        backgroundSize: '200% 100%'
                      }}
                    />
                  </div>

                  {/* Progress markers */}
                  {[25, 50, 75].map(marker => (
                    <div
                      key={marker}
                      className={`absolute top-0 bottom-0 w-[2px] transition-colors duration-300 ${
                        loadingProgress >= marker ? 'bg-accent-yellow' : 'bg-gta-panel-light'
                      }`}
                      style={{ left: `${marker}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom - Server Tips */}
          <div className="flex-shrink-0">
            {tips.length > 0 && (
              <div className="max-w-2xl">
                <div className="flex items-start gap-4 bg-gta-panel/30 backdrop-blur-md border-l-4 border-accent-yellow p-6">
                  <Zap className="w-6 h-6 text-accent-yellow flex-shrink-0 mt-1 animate-pulse" />
                  <div className="flex-1">
                    <p className="font-ui text-xs uppercase tracking-wider text-accent-yellow mb-2">
                      Server Tip #{currentTip + 1}
                    </p>
                    <p
                      className="font-body text-base lg:text-lg text-gta-white leading-relaxed"
                      key={currentTip}
                      style={{
                        animation: 'fadeIn 0.5s ease-out'
                      }}
                    >
                      {tips[currentTip]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gta-black">
      <div ref={heroRef} className="relative min-h-screen flex items-center">
        {/* Background Image with Parallax */}
        <div ref={imageRef} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${siteConfig.images?.hero?.mainBackground || 'https://images.unsplash.com/photo-1486428128344-5413e434ad35?w=1920&h=1080&fit=crop'}')`,
            }}
          />
          {/* Multiple overlay layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-gta-black via-gta-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gta-black via-transparent to-gta-black/60" />
          <div className="absolute inset-0 bg-diagonal-stripes opacity-20" />
        </div>

        {/* Content */}
        <div className="container-gta relative z-10 py-32">
          <div ref={contentRef} className="max-w-5xl">
            {/* Top Label - GTA V Style */}
            <div className="hero-label mb-8 flex items-center gap-4">
              <div className="h-[2px] w-16 bg-accent-yellow" />
              <div className="bg-accent-yellow px-4 py-2">
                <span className="font-ui text-xs uppercase tracking-wider text-gta-black font-bold">
                  {siteConfig.server?.tagline || 'Los Santos Roleplay'}
                </span>
              </div>
            </div>

            {/* Main Title - Staggered Animation */}
            <h1 className="mb-8">
              {(siteConfig.server?.name || 'Los Santos Roleplay').split(' ').map((word, i) => (
                <span
                  key={i}
                  className="hero-title-word block font-display text-7xl md:text-8xl lg:text-9xl text-gta-white uppercase leading-none mb-2"
                  style={{
                    textShadow: '4px 4px 0 rgba(94, 156, 211, 0.3), 8px 8px 0 rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {i === (siteConfig.server?.name || 'Los Santos Roleplay').split(' ').length - 1 ? (
                    <span className="text-accent-blue">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="hero-description font-body text-xl md:text-2xl text-gta-gray-light mb-12 max-w-2xl leading-relaxed">
              {siteConfig.server?.description || 'Experience the ultimate GTA V roleplay'}
            </p>

            {/* Quick Stats - HUD Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="hero-stats-item bg-gta-panel/80 backdrop-blur-sm border-l-4 border-accent-blue p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent-blue" />
                  <div>
                    <div className="font-heading text-2xl text-gta-white font-bold">
                      {playerCount}/{siteConfig.server.maxPlayers}
                    </div>
                    <div className="font-ui text-xs uppercase text-gta-gray-light">
                      Online Now
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-stats-item bg-gta-panel/80 backdrop-blur-sm border-l-4 border-accent-yellow p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent-yellow" />
                  <div>
                    <div className="font-heading text-2xl text-gta-white font-bold">
                      {siteConfig.server?.stats?.totalPlayers || '15K+'}
                    </div>
                    <div className="font-ui text-xs uppercase text-gta-gray-light">
                      Total Players
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-stats-item bg-gta-panel/80 backdrop-blur-sm border-l-4 border-accent-green p-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent-green" />
                  <div>
                    <div className="font-heading text-2xl text-gta-white font-bold">
                      {siteConfig.jobs?.list?.length || '24/7'}
                    </div>
                    <div className="font-ui text-xs uppercase text-gta-gray-light">
                      Active Jobs
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-stats-item bg-gta-panel/80 backdrop-blur-sm border-l-4 border-accent-blue p-4">
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-accent-blue" />
                  <div>
                    <div className="font-heading text-2xl text-gta-white font-bold flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isServerOnline ? 'bg-accent-green' : 'bg-accent-red'} animate-pulse`} />
                      {isServerOnline ? 'UP' : 'DOWN'}
                    </div>
                    <div className="font-ui text-xs uppercase text-gta-gray-light">
                      Server Status
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`fivem://connect/${siteConfig.api.serverCode}`}
                className="hero-cta btn-gta group"
              >
                <span className="flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Join Server Now
                </span>
              </a>

              <a
                href={siteConfig.social?.discord || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta btn-gta-outline"
              >
                Join Our Discord
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Animated */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-subtle-float">
          <span className="font-ui text-xs uppercase tracking-wider text-accent-blue">
            Scroll to Explore
          </span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-accent-blue to-transparent" />
        </div>
      </div>

      {/* Add shimmer keyframe animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}
