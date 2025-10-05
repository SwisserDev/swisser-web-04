import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import animationConfig from '../config/animations.config.json'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (
  target: string | Element | null,
  animation: keyof typeof animationConfig.scrollTrigger.sections,
  customOptions?: gsap.TweenVars
) => {
  useGSAP(() => {
    if (!target) return

    const config = animationConfig.scrollTrigger.sections[animation]
    const defaults = animationConfig.scrollTrigger.defaults

    gsap.from(target, {
      ...config,
      scrollTrigger: {
        trigger: target,
        ...defaults,
        ...(customOptions?.scrollTrigger || {})
      },
      ...customOptions
    })
  }, [target])
}

export const useParallax = (target: string | Element | null, speed: number = 0.5) => {
  useGSAP(() => {
    if (!target) return

    gsap.to(target, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top'
      }
    })
  }, [target])
}

export const useTextReveal = (target: string | Element | null) => {
  useGSAP(() => {
    if (!target) return

    const chars = gsap.utils.toArray(`${target} .char`) as Element[]
    
    gsap.from(chars, {
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: animationConfig.text.stagger,
      duration: animationConfig.text.duration,
      ease: animationConfig.easing.smooth,
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, [target])
}

export const useHoverAnimation = (target: string | Element | null) => {
  useGSAP(() => {
    if (!target) return

    const element = typeof target === 'string' ? document.querySelector(target) : target

    if (!element) return

    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: animationConfig.hover.scale,
        duration: animationConfig.hover.duration,
        ease: animationConfig.hover.ease
      })
    })

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: animationConfig.hover.duration,
        ease: animationConfig.hover.ease
      })
    })
  }, [target])
}