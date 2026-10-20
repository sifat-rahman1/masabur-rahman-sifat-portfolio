'use client'

import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-is-mobile'

export interface ScrollFloatProps {
  /** The text string to animate on scroll */
  text: string
  /** Container CSS classes */
  className?: string
  /** Additional styling for text elements */
  textClassName?: string
}

interface CharProps {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
  textClassName?: string
}

function FloatingChar({ char, index, total, progress, textClassName = '' }: CharProps) {
  // Stagger the activation window for each character across scroll range [0, 1]
  const segment = total > 1 ? 0.65 / total : 0.65
  const start = index * segment
  const end = Math.min(1, start + 0.35)

  // Floating effect: opacity from 0 to 1, y translation from 45px up to 0px
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [45, 0])
  const scale = useTransform(progress, [start, end], [0.88, 1])

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className={`inline-block transform-gpu will-change-transform will-change-opacity select-none ${textClassName}`}
    >
      {char}
    </motion.span>
  )
}

export function ScrollFloat({
  text,
  className = '',
  textClassName = '',
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const isMobile = useIsMobile()

  // Track the element's position relative to the viewport
  // Animation triggers as container enters bottom ("start end") until it reaches center/top ("end center")
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 92%', 'end 55%'],
  })

  // Split text into words and then characters to ensure words don't break awkwardly across lines
  const words = useMemo(() => text.split(' '), [text])

  // Compute absolute character offset for consistent stagger index across words
  let charCounter = 0
  const totalChars = text.replace(/\s+/g, '').length || 1

  // Mobile fallback: static text, no scroll listeners or per-char springs.
  if (isMobile) {
    return (
      <h3
        ref={containerRef}
        className={`relative inline-block leading-[1.12] tracking-tight ${className}`}
      >
        {text}
      </h3>
    )
  }

  return (
    <h3
      ref={containerRef}
      className={`relative inline-block leading-[1.12] tracking-tight ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('')
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
            {wordChars.map((char, charIndex) => {
              const currentTotalIndex = charCounter++
              return (
                <FloatingChar
                  key={`${wordIndex}-${charIndex}`}
                  char={char}
                  index={currentTotalIndex}
                  total={totalChars}
                  progress={scrollYProgress}
                  textClassName={textClassName}
                />
              )
            })}
          </span>
        )
      })}
    </h3>
  )
}

export default ScrollFloat
