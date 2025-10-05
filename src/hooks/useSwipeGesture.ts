import { useEffect, useRef } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeOptions {
  threshold?: number // Minimum distance for swipe
  velocity?: number // Minimum velocity for swipe
  preventDefault?: boolean
}

export const useSwipeGesture = (
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) => {
  const {
    threshold = 50,
    velocity = 0.5,
    preventDefault = true
  } = options

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (preventDefault && touchStartRef.current) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const deltaTime = Date.now() - touchStartRef.current.time

      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      // Calculate velocity
      const velocityX = absX / deltaTime
      const velocityY = absY / deltaTime

      // Determine if it's a valid swipe
      if (Math.max(absX, absY) < threshold) {
        touchStartRef.current = null
        return
      }

      // Determine swipe direction
      if (absX > absY) {
        // Horizontal swipe
        if (velocityX >= velocity) {
          if (deltaX > 0) {
            handlers.onSwipeRight?.()
          } else {
            handlers.onSwipeLeft?.()
          }
        }
      } else {
        // Vertical swipe
        if (velocityY >= velocity) {
          if (deltaY > 0) {
            handlers.onSwipeDown?.()
          } else {
            handlers.onSwipeUp?.()
          }
        }
      }

      touchStartRef.current = null
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventDefault })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handlers, threshold, velocity, preventDefault])

  return elementRef
}