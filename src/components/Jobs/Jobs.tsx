import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import { Briefcase, DollarSign, Users, ArrowRight, Shield, Zap } from 'lucide-react'
import siteConfig from '../../config/site.config.json'
import { type Job } from '../../types/config'

export const Jobs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredJobs = selectedCategory === 'all'
    ? siteConfig.jobs.list
    : siteConfig.jobs.list.filter(job => job.category === selectedCategory)

  const categoriesWithJobs = [
    { id: 'all', name: 'All Jobs', color: 'blue', jobCount: siteConfig.jobs.list.length },
    ...siteConfig.jobs.categories.map(category => ({
      ...category,
      jobCount: siteConfig.jobs.list.filter(job => job.category === category.id).length
    })).filter(cat => cat.jobCount > 0)
  ]

  const getSalaryDisplay = (salary: number) => {
    return `$${salary.toLocaleString()}`
  }

  useGSAP(() => {
    // Header animation
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.jobs-header', {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    })

    // Cards animation
    const cards = gridRef.current?.querySelectorAll('.job-card')
    if (cards && cards.length > 0) {
      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          })
        },
        once: true,
        start: 'top 85%'
      })
    }
  }, [selectedCategory])

  return (
    <section ref={containerRef} id="jobs" className="section-padding bg-gta-black relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-hud-grid bg-hud-grid opacity-20" />

      <div className="container-gta relative z-10">
        {/* Section header - GTA V Style */}
        <div ref={titleRef} className="mb-16">
          <div className="jobs-header inline-block bg-accent-yellow px-4 py-1 mb-4">
            <span className="font-ui text-xs uppercase tracking-wider text-gta-black font-bold">
              {siteConfig.ui?.jobs?.sectionTag || 'Career Opportunities'}
            </span>
          </div>

          <h2 className="jobs-header font-display text-6xl md:text-7xl lg:text-8xl text-gta-white uppercase leading-none mb-4">
            {siteConfig.ui?.jobs?.title || 'Make Your'}{' '}
            <span className="text-accent-blue">{siteConfig.ui?.jobs?.titleAccent || 'Living'}</span>
          </h2>

          <p className="jobs-header font-body text-gta-gray-light text-lg max-w-2xl mb-6">
            {siteConfig.ui?.jobs?.subtitle || 'Choose your path in Los Santos. Legal or illegal, the choice is yours.'}
          </p>

          <div className="jobs-header h-1 w-24 bg-accent-blue" />
        </div>

        {/* Category pills - GTA V HUD style */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categoriesWithJobs.map((category) => {
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-6 py-3 font-heading text-sm uppercase tracking-wider
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-accent-blue text-gta-black border-l-4 border-accent-yellow'
                        : 'bg-gta-panel text-gta-gray-light border-l-4 border-transparent hover:bg-gta-panel-light hover:text-gta-white'
                    }
                  `}
                >
                  {category.name}
                  <span className="ml-2 font-mono text-xs">
                    ({category.jobCount})
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Jobs Grid - GTA V HUD Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job: Job) => {
            const category = siteConfig.jobs.categories.find(c => c.id === job.category)
            const isLegal = category?.legal !== false

            return (
              <article
                key={job.id}
                className="job-card group"
              >
                <div className="card-gta h-full flex flex-col overflow-hidden">
                  {/* Image section */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gta-panel-light">
                    {job.image && (
                      <img
                        src={job.image}
                        alt={job.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gta-black via-gta-black/50 to-transparent" />

                    {/* Category badge - Top left */}
                    <div className="absolute top-4 left-4">
                      <div className={`
                        flex items-center gap-2 px-3 py-1 font-mono text-xs uppercase tracking-wider
                        backdrop-blur-sm
                        ${isLegal
                          ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                          : 'bg-accent-red/20 text-accent-red border border-accent-red/30'
                        }
                      `}>
                        {isLegal ? <Shield className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                        <span>{category?.name || 'Unknown'}</span>
                      </div>
                    </div>

                    {/* Salary badge - Bottom right */}
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center gap-2 bg-gta-panel/90 backdrop-blur-sm px-4 py-2 border-l-2 border-accent-yellow">
                        <DollarSign className="w-4 h-4 text-accent-yellow" />
                        <span className="font-mono text-sm text-gta-white font-bold">
                          {getSalaryDisplay(job.salary || 0)}
                        </span>
                        <span className="font-mono text-xs text-gta-gray-light">
                          /hr
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex-1 p-6 flex flex-col bg-gta-panel">
                    {/* Job title */}
                    <h3 className="font-heading text-2xl text-gta-white uppercase mb-3 font-bold">
                      {job.name}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-gta-gray-light text-sm leading-relaxed flex-1 mb-4">
                      {job.description}
                    </p>

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="pt-4 border-t border-gta-panel-light">
                        <p className="font-ui text-xs uppercase tracking-wider text-accent-blue mb-2">
                          Requirements
                        </p>
                        <ul className="space-y-1">
                          {job.requirements.slice(0, 2).map((req: string, i: number) => (
                            <li key={i} className="font-body text-xs text-gta-gray-light flex items-start gap-2">
                              <span className="text-accent-yellow mt-0.5">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Apply button */}
                    <div className="mt-6 pt-4 border-t border-gta-panel-light">
                      <a
                        href={siteConfig.social?.discord || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-2
                          font-heading text-sm uppercase tracking-wider
                          text-accent-blue hover:text-accent-blue-light
                          transition-colors duration-200 group/btn
                        "
                      >
                        {siteConfig.ui?.jobs?.applyButtonText || 'Apply Now'}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Stats bar - GTA V HUD */}
        <div className="mt-20 bg-gta-panel/50 backdrop-blur-sm border-t-2 border-accent-blue p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-blue/20">
                <Briefcase className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <p className="font-heading text-3xl text-gta-white font-bold">
                  {siteConfig.jobs.list.length}
                </p>
                <p className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                  {siteConfig.ui?.jobs?.totalJobsLabel || 'Total Jobs'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-yellow/20">
                <Users className="w-6 h-6 text-accent-yellow" />
              </div>
              <div>
                <p className="font-heading text-3xl text-gta-white font-bold">
                  {siteConfig.jobs.categories.length}
                </p>
                <p className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                  Categories
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-green/20">
                <DollarSign className="w-6 h-6 text-accent-green" />
              </div>
              <div>
                <p className="font-heading text-3xl text-gta-white font-bold">
                  ${Math.min(...siteConfig.jobs.list.map((j: Job) => j.salary || 0))}-${Math.max(...siteConfig.jobs.list.map((j: Job) => j.salary || 0))}
                </p>
                <p className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                  {siteConfig.ui?.jobs?.salaryRangeLabel || 'Salary Range'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
