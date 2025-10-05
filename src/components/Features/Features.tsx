import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import { type Feature } from '../../types/config'
import * as LucideIcons from 'lucide-react'

export const Features = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Title animation
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.features-header', {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    })

    // Cards animation
    const cards = gridRef.current?.querySelectorAll('.feature-card')
    if (cards && cards.length > 0) {
      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: 'auto'
          })
        },
        once: true,
        start: 'top 85%'
      })
    }
  })

  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<{ size?: number; className?: string }>
    return Icon || LucideIcons.Box
  }

  const highlightedFeatures = siteConfig.features.filter((f: Feature) => f.highlight)
  const regularFeatures = siteConfig.features.filter((f: Feature) => !f.highlight)

  return (
    <section ref={sectionRef} id="features" className="section-padding bg-gta-black relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-hud-grid bg-hud-grid opacity-20" />

      <div className="container-gta relative z-10">
        {/* GTA V Header */}
        <div ref={titleRef} className="mb-16">
          <div className="features-header inline-block bg-accent-yellow px-4 py-1 mb-4">
            <span className="font-ui text-xs uppercase tracking-wider text-gta-black font-bold">
              {siteConfig.ui?.features?.sectionTag || 'Server Features'}
            </span>
          </div>

          <h2 className="features-header font-display text-6xl md:text-7xl lg:text-8xl text-gta-white uppercase leading-none mb-4">
            {siteConfig.ui?.features?.title || 'Server'}{' '}
            <span className="text-accent-blue">{siteConfig.ui?.features?.titleAccent || 'Features'}</span>
          </h2>

          <div className="features-header h-1 w-24 bg-accent-blue" />
        </div>

        {/* Features Grid */}
        <div ref={gridRef} className="space-y-16">
          {/* Highlighted Features - GTA V HUD Cards */}
          {highlightedFeatures.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {highlightedFeatures.map((feature: Feature, index: number) => {
                const IconComponent = getIcon(feature.icon)

                return (
                  <article
                    key={feature.id}
                    className="feature-card group"
                  >
                    <div className="card-gta p-8 h-full flex flex-col">
                      {/* Header with number */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-accent-blue text-sm font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="p-3 bg-gta-panel-light group-hover:bg-accent-blue/20 transition-colors duration-200">
                          <IconComponent className="w-6 h-6 text-accent-blue" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="font-heading text-2xl lg:text-3xl text-gta-white uppercase mb-3 font-bold">
                        {feature.title}
                      </h3>

                      <p className="font-body text-gta-gray-light text-base leading-relaxed flex-1">
                        {feature.description}
                      </p>

                      {/* Bottom indicator */}
                      <div className="mt-6 pt-4 border-t border-gta-panel-light">
                        <div className="h-[2px] w-12 bg-accent-blue transition-all duration-300 group-hover:w-20" />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* Regular Features */}
          {regularFeatures.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] flex-1 bg-gta-panel" />
                <span className="font-ui text-xs uppercase tracking-wider text-accent-yellow">
                  Additional Features
                </span>
                <div className="h-[2px] flex-1 bg-gta-panel" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularFeatures.map((feature: Feature) => {
                  const IconComponent = getIcon(feature.icon)

                  return (
                    <article
                      key={feature.id}
                      className="feature-card group"
                    >
                      <div className="card-gta p-6 h-full flex flex-col">
                        <div className="mb-4">
                          <div className="inline-flex p-2 bg-gta-panel-light group-hover:bg-accent-blue/20 transition-colors duration-200">
                            <IconComponent className="w-5 h-5 text-accent-blue" />
                          </div>
                        </div>

                        <h3 className="font-heading text-lg text-gta-white uppercase mb-2 font-bold">
                          {feature.title}
                        </h3>

                        <p className="font-body text-gta-gray-light text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bottom Stats */}
          <div className="text-center pt-8">
            <p className="font-mono text-xs uppercase tracking-wider text-accent-blue">
              {siteConfig.ui?.features?.highlight || `${siteConfig.server.maxPlayers}+ Players • Custom Scripts • Premium Experience`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
