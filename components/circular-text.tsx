'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useIsMobile } from '@/hooks/use-is-mobile'

interface CircularTextProps {
  text: string
  spinDuration?: number
  className?: string
}

export function CircularText({
  text,
  spinDuration = 20,
  className = '',
}: CircularTextProps) {
  const letters = text.split('')
  const total = letters.length
  const [isHovered, setIsHovered] = useState(false)
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  // Mobile: static badge, no infinite rotation loop on the main thread.
  const staticBadge = reduceMotion || isMobile

  return (
    <div
      className={`relative flex cursor-pointer items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={staticBadge ? undefined : { rotate: 360 }}
        transition={{
          duration: isHovered ? spinDuration / 3 : spinDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="relative flex h-28 w-28 items-center justify-center rounded-full md:h-32 md:w-32"
      >
        {letters.map((letter, i) => {
          const degree = (i / total) * 360
          return (
            <span
              key={i}
              className="absolute font-mono text-[10px] font-bold tracking-widest text-white uppercase drop-shadow-sm md:text-xs"
              style={{
                transform: `rotate(${degree}deg) translateY(-42px)`,
                transformOrigin: 'center center',
              }}
            >
              {letter}
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}

export default CircularText
