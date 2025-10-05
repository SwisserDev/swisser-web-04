import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register plugins once globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Global ScrollTrigger configuration
ScrollTrigger.config({
  limitCallbacks: true,
  syncInterval: 40
})

// Global ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  markers: false, // Set to true for debugging
  invalidateOnRefresh: true
})

// Debounced refresh
let refreshTimeout: ReturnType<typeof setTimeout>
const debouncedRefresh = () => {
  clearTimeout(refreshTimeout)
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh()
  }, 150)
}

// Setup resize listener with debouncing
if (typeof window !== 'undefined') {
  window.addEventListener('resize', debouncedRefresh)
}

// Utility function to kill all ScrollTriggers
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Utility function to refresh all ScrollTriggers
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh()
}

// Smooth scroll to element with GSAP
export const smoothScrollTo = (target: string | Element, offset: number = 0) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return

  const y = element.getBoundingClientRect().top + window.scrollY + offset

  gsap.to(window, {
    duration: 1,
    scrollTo: { y, autoKill: false },
    ease: 'power2.inOut'
  })
}

// Batch ScrollTrigger for similar elements
export const createBatchScrollTrigger = (
  elements: string,
  animation: gsap.TweenVars,
  triggerConfig?: ScrollTrigger.Vars
) => {
  ScrollTrigger.batch(elements, {
    onEnter: (targets: Element[]) => {
      gsap.to(targets, animation)
    },
    onLeave: (targets: Element[]) => {
      gsap.to(targets, { ...animation, overwrite: 'auto' })
    },
    onEnterBack: (targets: Element[]) => {
      gsap.to(targets, animation)
    },
    onLeaveBack: (targets: Element[]) => {
      gsap.to(targets, { ...animation, overwrite: 'auto' })
    },
    ...triggerConfig
  } as ScrollTrigger.BatchVars)
}

// Export configured gsap and ScrollTrigger
export { gsap, ScrollTrigger }