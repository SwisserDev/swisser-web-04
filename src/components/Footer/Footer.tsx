import { Link } from 'react-router-dom'
import siteConfig from '../../config/site.config.json'
import {
  Github, Twitter, Youtube, Instagram, Twitch,
  Circle, ExternalLink, MapPin
} from 'lucide-react'

// Discord icon as component since lucide doesn't have it
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

export const Footer = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'discord': return DiscordIcon
      case 'twitter': return Twitter
      case 'youtube': return Youtube
      case 'instagram': return Instagram
      case 'twitch': return Twitch
      case 'github': return Github
      default: return ExternalLink
    }
  }

  const socialLinks = [
    { name: 'Discord', url: siteConfig.social?.discord, icon: 'discord' },
    { name: 'Twitter', url: siteConfig.social?.twitter, icon: 'twitter' },
    { name: 'Youtube', url: siteConfig.social?.youtube, icon: 'youtube' },
    { name: 'Instagram', url: siteConfig.social?.instagram, icon: 'instagram' },
    { name: 'Twitch', url: siteConfig.social?.twitch, icon: 'twitch' },
  ].filter(link => link.url)

  const navigationLinks = siteConfig.ui?.navigation?.menuItems || ['Features', 'Jobs', 'Rules', 'Team', 'Gallery']

  return (
    <footer className="relative bg-gta-black border-t-2 border-accent-blue">
      {/* Top accent line */}
      <div className="h-1 bg-accent-yellow" />

      {/* Main Footer Content */}
      <div className="container-gta py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand Column - GTA V Style */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              {siteConfig.server?.logo?.type === 'text' ? (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-12 bg-accent-yellow" />
                  <h3 className="font-display text-4xl text-gta-white uppercase tracking-wider">
                    {siteConfig.server.logo.content}
                  </h3>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-12 bg-accent-yellow" />
                  <h3 className="font-display text-3xl text-gta-white uppercase tracking-wider">
                    {siteConfig.server?.name || 'Los Santos RP'}
                  </h3>
                </div>
              )}
              <p className="font-body text-gta-gray-light text-sm max-w-sm leading-relaxed">
                {siteConfig.server?.description || 'Experience the most immersive GTA V roleplay server'}
              </p>
            </div>

            {/* Server Connection - HUD Style */}
            <div className="bg-gta-panel border-l-4 border-accent-blue p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-accent-blue" />
                <p className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                  {siteConfig.ui?.footer?.serverConnection || 'Server Connection'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm text-gta-white">
                  {siteConfig.server?.ip}:{siteConfig.server?.port}
                </p>
                <div className="flex items-center gap-2">
                  <Circle className="w-2 h-2 text-accent-green fill-current animate-pulse" />
                  <span className="font-ui text-xs text-accent-green uppercase">
                    {siteConfig.ui?.footer?.onlineStatus || 'Online'}
                  </span>
                </div>
              </div>
            </div>

            {/* Established */}
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-accent-yellow" />
              <p className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                {siteConfig.ui?.footer?.establishedPrefix || 'Est.'} {siteConfig.server?.stats?.established || '2024'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[2px] w-4 bg-accent-blue" />
              <h4 className="font-heading text-sm uppercase tracking-wider text-accent-blue">
                {siteConfig.ui?.footer?.sections?.navigation || 'Navigation'}
              </h4>
            </div>
            <nav className="space-y-3">
              {navigationLinks.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block font-body text-sm text-gta-gray-light hover:text-gta-white transition-colors hover:translate-x-1 transform duration-200"
                >
                  → {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Server Stats - HUD Style */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[2px] w-4 bg-accent-yellow" />
              <h4 className="font-heading text-sm uppercase tracking-wider text-accent-yellow">
                {siteConfig.ui?.footer?.sections?.serverStats || 'Server Stats'}
              </h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gta-panel p-3">
                <span className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                  {siteConfig.ui?.footer?.statsLabels?.players || 'Players'}
                </span>
                <span className="font-heading text-lg text-accent-blue font-bold">
                  {siteConfig.server?.stats?.totalPlayers || '15K+'}
                </span>
              </div>
              <div className="flex items-center justify-between bg-gta-panel p-3">
                <span className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                  {siteConfig.ui?.footer?.statsLabels?.activeGangs || 'Gangs'}
                </span>
                <span className="font-heading text-lg text-accent-yellow font-bold">
                  {siteConfig.server?.stats?.activeGangs || '12'}
                </span>
              </div>
              <div className="flex items-center justify-between bg-gta-panel p-3">
                <span className="font-ui text-xs uppercase tracking-wider text-gta-gray-light">
                  {siteConfig.ui?.footer?.statsLabels?.businesses || 'Businesses'}
                </span>
                <span className="font-heading text-lg text-accent-green font-bold">
                  {siteConfig.server?.stats?.businesses || '45+'}
                </span>
              </div>
            </div>
          </div>

          {/* Connect - Social & CTA */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[2px] w-4 bg-accent-blue" />
              <h4 className="font-heading text-sm uppercase tracking-wider text-accent-blue">
                {siteConfig.ui?.footer?.sections?.connect || 'Connect'}
              </h4>
            </div>

            {/* Social Links - GTA V Style */}
            <div className="flex flex-wrap gap-2 mb-6">
              {socialLinks.map(link => {
                const Icon = getSocialIcon(link.icon)
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-10 h-10 flex items-center justify-center
                      bg-gta-panel border-2 border-gta-panel-light
                      hover:bg-accent-blue hover:border-accent-blue
                      hover:text-gta-black text-gta-white
                      transition-all duration-200
                    "
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="space-y-3">
              <a
                href={`fivem://connect/${siteConfig.api.serverCode}`}
                className="btn-gta uppercase text-sm w-full text-center block"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - HUD Style */}
      <div className="border-t-2 border-gta-panel-light">
        <div className="container-gta py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="font-ui text-xs text-gta-gray-light">
                {siteConfig.footer?.copyright || `© ${new Date().getFullYear()} ${siteConfig.server?.name}. All rights reserved.`}
              </p>

              {/* Legal Links */}
              <div className="flex items-center gap-6">
                <Link
                  to="/privacy"
                  className="font-ui text-xs text-gta-gray-light hover:text-accent-blue transition-colors uppercase"
                >
                  {siteConfig.ui?.common?.privacy || 'Privacy'}
                </Link>
                <Link
                  to="/terms"
                  className="font-ui text-xs text-gta-gray-light hover:text-accent-blue transition-colors uppercase"
                >
                  {siteConfig.ui?.common?.terms || 'Terms'}
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="font-ui text-xs text-gta-gray-light text-center md:text-right opacity-60">
              {siteConfig.footer?.disclaimer || siteConfig.ui?.footer?.disclaimer || 'Not affiliated with Rockstar Games'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
