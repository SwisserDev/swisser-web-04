import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import { AlertCircle, Info, AlertTriangle, Shield } from 'lucide-react'
import siteConfig from '../../config/site.config.json'
import { type Rule } from '../../types/config'

export const Rules = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const rulesRef = useRef<HTMLDivElement>(null)

  // Cast rules to proper type
  const rules = siteConfig.rules as Rule[]

  // Get unique categories from rules
  const categories = ['all', ...Array.from(new Set(rules.map((r) => r.category)))]

  const filteredRules = selectedCategory === 'all'
    ? rules
    : rules.filter((rule) => rule.category === selectedCategory)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-accent-red/10',
          border: 'border-accent-red',
          text: 'text-accent-red',
          iconBg: 'bg-accent-red/20'
        }
      case 'medium':
        return {
          bg: 'bg-accent-yellow/10',
          border: 'border-accent-yellow',
          text: 'text-accent-yellow',
          iconBg: 'bg-accent-yellow/20'
        }
      default:
        return {
          bg: 'bg-accent-blue/10',
          border: 'border-accent-blue',
          text: 'text-accent-blue',
          iconBg: 'bg-accent-blue/20'
        }
    }
  }

  useGSAP(() => {
    // Header animation
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.rules-header', {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    })

    // Rules animation
    const ruleElements = rulesRef.current?.querySelectorAll('.rule-item')
    if (ruleElements && ruleElements.length > 0) {
      ScrollTrigger.batch(ruleElements, {
        onEnter: (elements) => {
          gsap.from(elements, {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out'
          })
        },
        once: true,
        start: 'top 90%'
      })
    }
  }, [selectedCategory])

  // Group rules by severity
  const highPriorityRules = filteredRules.filter((r) => r.severity === 'high')
  const mediumPriorityRules = filteredRules.filter((r) => r.severity === 'medium')
  const lowPriorityRules = filteredRules.filter((r) => r.severity === 'low')

  return (
    <section ref={containerRef} id="rules" className="section-padding bg-gta-black relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-hud-grid bg-hud-grid opacity-20" />

      <div className="container-gta relative z-10">
        {/* Section header - GTA V Style */}
        <div ref={titleRef} className="mb-16">
          <div className="rules-header inline-block bg-accent-red px-4 py-1 mb-4">
            <span className="font-ui text-xs uppercase tracking-wider text-gta-black font-bold flex items-center gap-2">
              <Shield className="w-3 h-3" />
              {siteConfig.ui?.rules?.sectionTag || 'Server Regulations'}
            </span>
          </div>

          <h2 className="rules-header font-display text-6xl md:text-7xl lg:text-8xl text-gta-white uppercase leading-none mb-4">
            {siteConfig.ui?.rules?.title || 'Know The'}{' '}
            <span className="text-accent-red">{siteConfig.ui?.rules?.titleAccent || 'Rules'}</span>
          </h2>

          <p className="rules-header font-body text-gta-gray-light text-lg max-w-2xl mb-6">
            {siteConfig.ui?.rules?.subtitle || 'Break these and face the consequences. We run a tight ship here.'}
          </p>

          <div className="rules-header h-1 w-24 bg-accent-red" />
        </div>

        {/* Category filters - GTA V HUD style */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-3 font-heading text-sm uppercase tracking-wider
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-accent-red text-gta-black border-l-4 border-accent-yellow'
                        : 'bg-gta-panel text-gta-gray-light border-l-4 border-transparent hover:bg-gta-panel-light hover:text-gta-white'
                    }
                  `}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Rules list - GTA V Warning System */}
        <div ref={rulesRef} className="space-y-12">
          {/* High Priority - Critical Warnings */}
          {highPriorityRules.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6 bg-accent-red/10 backdrop-blur-sm p-4 border-l-4 border-accent-red">
                <div className="p-3 bg-accent-red/20">
                  <AlertCircle className="w-6 h-6 text-accent-red" />
                </div>
                <div>
                  <h3 className="font-heading text-lg uppercase tracking-wider text-accent-red font-bold">
                    {siteConfig.ui?.rules?.severityLabels?.high || 'Critical Violations'}
                  </h3>
                  <p className="font-ui text-xs text-gta-gray-light uppercase">
                    Instant Ban Offenses
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {highPriorityRules.map((rule, index) => {
                  const colors = getSeverityColor(rule.severity)
                  return (
                    <article
                      key={rule.id}
                      className="rule-item group"
                    >
                      <div className={`
                        relative bg-gta-panel hover:bg-gta-panel-light
                        border-l-4 ${colors.border}
                        transition-all duration-300
                      `}>
                        <div className="flex items-start gap-4 p-6">
                          {/* Number Badge */}
                          <div className={`
                            flex-shrink-0 w-12 h-12 flex items-center justify-center
                            ${colors.iconBg} ${colors.text}
                            font-heading text-xl font-bold
                          `}>
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="font-heading text-xl text-gta-white uppercase mb-2 font-bold">
                              {rule.title}
                            </h4>
                            <p className="font-body text-gta-gray-light text-sm leading-relaxed">
                              {rule.description}
                            </p>
                          </div>

                          {/* Rule ID */}
                          <div className="hidden lg:block flex-shrink-0">
                            <span className="font-mono text-xs text-gta-gray-light px-3 py-1 bg-gta-black">
                              #{rule.id.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className={`h-[2px] ${colors.bg} transition-all duration-300 group-hover:bg-opacity-50`} />
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}

          {/* Medium Priority - Warnings */}
          {mediumPriorityRules.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6 bg-accent-yellow/10 backdrop-blur-sm p-4 border-l-4 border-accent-yellow">
                <div className="p-3 bg-accent-yellow/20">
                  <AlertTriangle className="w-6 h-6 text-accent-yellow" />
                </div>
                <div>
                  <h3 className="font-heading text-lg uppercase tracking-wider text-accent-yellow font-bold">
                    {siteConfig.ui?.rules?.severityLabels?.medium || 'Important Rules'}
                  </h3>
                  <p className="font-ui text-xs text-gta-gray-light uppercase">
                    Warning System Applies
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {mediumPriorityRules.map((rule, index) => {
                  const colors = getSeverityColor(rule.severity)
                  return (
                    <article
                      key={rule.id}
                      className="rule-item group"
                    >
                      <div className={`
                        relative bg-gta-panel hover:bg-gta-panel-light
                        border-l-4 ${colors.border}
                        transition-all duration-300
                      `}>
                        <div className="flex items-start gap-4 p-6">
                          {/* Number Badge */}
                          <div className={`
                            flex-shrink-0 w-12 h-12 flex items-center justify-center
                            ${colors.iconBg} ${colors.text}
                            font-heading text-xl font-bold
                          `}>
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="font-heading text-xl text-gta-white uppercase mb-2 font-bold">
                              {rule.title}
                            </h4>
                            <p className="font-body text-gta-gray-light text-sm leading-relaxed">
                              {rule.description}
                            </p>
                          </div>

                          {/* Rule ID */}
                          <div className="hidden lg:block flex-shrink-0">
                            <span className="font-mono text-xs text-gta-gray-light px-3 py-1 bg-gta-black">
                              #{rule.id.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className={`h-[2px] ${colors.bg} transition-all duration-300 group-hover:bg-opacity-50`} />
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}

          {/* Low Priority - Guidelines */}
          {lowPriorityRules.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6 bg-accent-blue/10 backdrop-blur-sm p-4 border-l-4 border-accent-blue">
                <div className="p-3 bg-accent-blue/20">
                  <Info className="w-6 h-6 text-accent-blue" />
                </div>
                <div>
                  <h3 className="font-heading text-lg uppercase tracking-wider text-accent-blue font-bold">
                    {siteConfig.ui?.rules?.severityLabels?.low || 'General Guidelines'}
                  </h3>
                  <p className="font-ui text-xs text-gta-gray-light uppercase">
                    Best Practices
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {lowPriorityRules.map((rule, index) => {
                  const colors = getSeverityColor(rule.severity)
                  return (
                    <article
                      key={rule.id}
                      className="rule-item group"
                    >
                      <div className={`
                        relative bg-gta-panel hover:bg-gta-panel-light
                        border-l-4 ${colors.border}
                        transition-all duration-300
                      `}>
                        <div className="flex items-start gap-4 p-6">
                          {/* Number Badge */}
                          <div className={`
                            flex-shrink-0 w-12 h-12 flex items-center justify-center
                            ${colors.iconBg} ${colors.text}
                            font-heading text-xl font-bold
                          `}>
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="font-heading text-xl text-gta-white uppercase mb-2 font-bold">
                              {rule.title}
                            </h4>
                            <p className="font-body text-gta-gray-light text-sm leading-relaxed">
                              {rule.description}
                            </p>
                          </div>

                          {/* Rule ID */}
                          <div className="hidden lg:block flex-shrink-0">
                            <span className="font-mono text-xs text-gta-gray-light px-3 py-1 bg-gta-black">
                              #{rule.id.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className={`h-[2px] ${colors.bg} transition-all duration-300 group-hover:bg-opacity-50`} />
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer warning - GTA V Style */}
        <div className="mt-20 bg-gta-panel/50 backdrop-blur-sm border-t-2 border-accent-red p-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-accent-red" />
            <AlertCircle className="w-8 h-8 text-accent-red" />
            <div className="w-1 h-12 bg-accent-red" />
          </div>
          <p className="font-heading text-xl uppercase tracking-wider text-accent-red mb-2">
            {siteConfig.ui?.rules?.footer || 'Ignorance is Not an Excuse'}
          </p>
          <p className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
            All rules are enforced strictly
          </p>
        </div>
      </div>
    </section>
  )
}
