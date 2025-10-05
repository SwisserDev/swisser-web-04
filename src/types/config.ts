// Type definitions for site configuration

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  highlight: boolean
}

export interface GalleryImage {
  id: number
  src: string
  alt?: string
  title: string
  category: string
  featured: boolean
}

export interface GalleryCategory {
  id: string
  name: string
}

export interface JobCategory {
  id: string
  name: string
  color: string
  legal: boolean
}

export interface Job {
  id: string
  name: string
  category: string
  description: string
  requirements: string[]
  salary: number
  image: string
}

export interface Rule {
  id: string
  title: string
  description: string
  category: string
  severity: 'high' | 'medium' | 'low'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  discord: string
  description: string
  badge: string
  status: 'active' | 'inactive'
}

export interface SocialLink {
  name: string
  url: string | null
  icon: string
}