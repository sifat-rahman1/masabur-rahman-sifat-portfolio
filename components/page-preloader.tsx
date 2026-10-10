'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

interface PagePreloaderProps {
  label: string
  duration?: number
}

/**
 * PagePreloader. Unified route-level intro for subpages: full-screen black
 * overlay, glowing emerald status dot + Jakarta page label, configurable
 * hold (default 900ms), editorial slide-up exit. Locks background scroll
 * while visible; skips entirely under prefers-reduced-motion.
 */
export function PagePreloader({ label, duration = 900 }: PagePreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setIsLoading(false)
      return
    }
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, duration)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [duration, reduceMotion])

  if (reduceMotion) return null

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        document.body.style.overflow = ''
      }}
    >
      {isLoading && (
        <motion.div
          key={`preloader-${label}`}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black text-white select-none"
          aria-hidden="true"
        >
          <div className="font-jakarta flex items-center gap-3.5 text-3xl font-medium tracking-tight sm:gap-4 sm:text-4xl md:text-5xl">
            {/* Glowing Emerald Status Dot */}
            <span className="h-3.5 w-3.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            {/* Dynamic Page Title */}
            <span className="text-white">{label}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PagePreloader
