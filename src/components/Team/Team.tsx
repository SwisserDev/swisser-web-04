import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-config'
import siteConfig from '../../config/site.config.json'
import { type TeamMember } from '../../types/config'
import { Shield, Crown, Wrench, Users, AtSign, Circle } from 'lucide-react'

export const Team = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header animation
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.team-header', {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        })
      }
    })

    // Team cards animation
    const cards = gridRef.current?.querySelectorAll('.team-card')
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
  })

  const getRoleIcon = (role: string) => {
    const roleLower = role.toLowerCase()
    if (roleLower.includes('owner')) return Crown
    if (roleLower.includes('admin')) return Shield
    if (roleLower.includes('dev')) return Wrench
    return Users
  }

  const getRoleColor = (role: string) => {
    const roleLower = role.toLowerCase()
    if (roleLower.includes('owner')) return {
      text: 'text-accent-yellow',
      border: 'border-accent-yellow',
      bg: 'bg-accent-yellow/20'
    }
    if (roleLower.includes('admin')) return {
      text: 'text-accent-red',
      border: 'border-accent-red',
      bg: 'bg-accent-red/20'
    }
    if (roleLower.includes('dev')) return {
      text: 'text-accent-blue',
      border: 'border-accent-blue',
      bg: 'bg-accent-blue/20'
    }
    return {
      text: 'text-accent-green',
      border: 'border-accent-green',
      bg: 'bg-accent-green/20'
    }
  }

  // Cast team to proper type and sort by role importance
  const team = siteConfig.team as TeamMember[]
  const sortedTeam = [...team].sort((a, b) => {
    const roleOrder = ['owner', 'admin', 'dev', 'mod']
    const aIndex = roleOrder.findIndex(r => a.role.toLowerCase().includes(r))
    const bIndex = roleOrder.findIndex(r => b.role.toLowerCase().includes(r))
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
  })

  return (
    <section ref={sectionRef} id="team" className="section-padding bg-gta-panel relative overflow-hidden">
      {/* Diagonal stripes overlay */}
      <div className="absolute inset-0 bg-diagonal-stripes opacity-30" />

      <div className="container-gta relative z-10">
        {/* Section header - GTA V Style */}
        <div ref={titleRef} className="mb-20">
          <div className="team-header inline-block bg-accent-blue px-4 py-1 mb-4">
            <span className="font-ui text-xs uppercase tracking-wider text-gta-black font-bold flex items-center gap-2">
              <Users className="w-3 h-3" />
              {siteConfig.ui?.team?.sectionTag || 'The Crew'}
            </span>
          </div>

          <h2 className="team-header font-display text-6xl md:text-7xl lg:text-8xl text-gta-white uppercase leading-none mb-4">
            {siteConfig.ui?.team?.title || 'The'}{' '}
            <span className="text-accent-yellow">{siteConfig.ui?.team?.titleAccent || 'Team'}</span>
          </h2>

          <p className="team-header font-body text-gta-gray-light text-lg max-w-2xl mb-6">
            {siteConfig.ui?.team?.subtitle || 'The ones who keep the server running smoothly.'}
          </p>

          <div className="team-header h-1 w-24 bg-accent-yellow" />
        </div>

        {/* Team Grid - GTA V Character Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedTeam.map((member) => {
            const RoleIcon = getRoleIcon(member.role)
            const roleColors = getRoleColor(member.role)
            const isActive = member.status === 'active'

            return (
              <article key={member.id} className="team-card group">
                <div className="relative h-full">
                  {/* Card container with left border accent */}
                  <div className={`bg-gta-black border-l-4 ${roleColors.border} overflow-hidden h-full flex flex-col transition-all duration-300 hover:bg-gta-panel`}>
                    {/* Avatar section */}
                    <div className="relative aspect-square bg-gta-panel overflow-hidden">
                      {member.avatar && (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gta-black via-gta-black/40 to-transparent" />

                      {/* Status indicator - Top right */}
                      <div className="absolute top-4 right-4">
                        <div className={`
                          flex items-center gap-2 px-3 py-1
                          backdrop-blur-sm
                          ${isActive
                            ? 'bg-accent-green/20 border border-accent-green/30'
                            : 'bg-gta-panel/80 border border-gta-gray/30'
                          }
                        `}>
                          <Circle className={`w-2 h-2 ${isActive ? 'text-accent-green fill-current animate-pulse' : 'text-gta-gray fill-current'}`} />
                          <span className={`font-ui text-xs uppercase ${isActive ? 'text-accent-green' : 'text-gta-gray-light'}`}>
                            {isActive ? 'Active' : 'Offline'}
                          </span>
                        </div>
                      </div>

                      {/* Role badge - Bottom left */}
                      {member.badge && (
                        <div className="absolute bottom-4 left-4">
                          <div className={`
                            px-3 py-1 font-ui text-xs uppercase tracking-wider font-bold
                            backdrop-blur-sm border
                            ${roleColors.bg} ${roleColors.border} ${roleColors.text}
                          `}>
                            {member.badge}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content section */}
                    <div className="flex-1 p-6 flex flex-col bg-gta-black">
                      {/* Name */}
                      <h3 className="font-heading text-2xl text-gta-white uppercase mb-1 font-bold">
                        {member.name.split(' ')[0]}
                      </h3>

                      {/* Nickname if exists */}
                      {member.name.includes("'") && (
                        <p className={`font-heading text-sm mb-2 ${roleColors.text}`}>
                          "{member.name.match(/'([^']+)'/)?.[1]}"
                        </p>
                      )}

                      {/* Role */}
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gta-panel-light">
                        <RoleIcon className={`w-4 h-4 ${roleColors.text}`} />
                        <span className="font-ui text-sm text-gta-gray-light uppercase">
                          {member.role}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-body text-xs text-gta-gray-light leading-relaxed flex-1">
                        {member.description}
                      </p>

                      {/* Discord handle */}
                      {member.discord && (
                        <div className="mt-4 pt-4 border-t border-gta-panel-light">
                          <div className="flex items-center gap-2">
                            <AtSign className="w-3 h-3 text-accent-blue" />
                            <span className="font-mono text-xs text-accent-blue">
                              {member.discord}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Join CTA - GTA V Style */}
        <div className="mt-20 bg-gta-panel/50 backdrop-blur-sm border-t-2 border-accent-blue p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-accent-yellow" />
              <Users className="w-8 h-8 text-accent-yellow" />
              <div className="h-[2px] w-12 bg-accent-yellow" />
            </div>

            <h3 className="font-display text-4xl md:text-5xl text-gta-white uppercase mb-4">
              {siteConfig.ui?.team?.joinTitle || 'Join The Team'}
            </h3>

            <p className="font-body text-gta-gray-light text-lg mb-8">
              {siteConfig.ui?.team?.joinSubtitle || 'Think you got what it takes?'}
            </p>

            <a
              href={siteConfig.social?.discord || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gta-yellow uppercase"
            >
              {siteConfig.ui?.team?.joinButton || 'Apply on Discord'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
