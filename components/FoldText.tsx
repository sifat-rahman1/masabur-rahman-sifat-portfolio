'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-is-mobile'

interface FoldTextProps {
  text?: string
  children?: React.ReactNode
  className?: string
}

export function FoldText({ text, children, className = '' }: FoldTextProps) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  // Mobile + reduced-motion fallback: plain static text, no per-word
  // IntersectionObservers or spring frames — pure CSS paint only.
  const staticText = reduceMotion || isMobile
  // Extract string content cleanly
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
      return extractText(node.props.children)
    }
    return ''
  }

  const rawText = text || extractText(children)

  // Fail-safe: If no plain text string is present, render children directly without hiding
  if (!rawText) {
    return <span className={className}>{children}</span>
  }

  // Mobile + reduced-motion fallback: static text, zero observers or springs.
  if (staticText) {
    return <span className={`inline-block max-w-full ${className}`}>{rawText}</span>
  }

  const words = rawText.split(' ')

  return (
    <span className={`inline-block max-w-full ${className}`}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block overflow-hidden py-[0.1em] -my-[0.1em] mr-[0.25em] last:mr-0 align-bottom"
        >
          <motion.span
            className="inline-block transform-gpu"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-10px' }}
            transition={{
              duration: 0.5,
              delay: wordIdx * 0.04,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
