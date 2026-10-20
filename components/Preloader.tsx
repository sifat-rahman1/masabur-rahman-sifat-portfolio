"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-is-mobile"

const WORDS = ["Welcome", "Bienvenido", "Benvenuto", "Bem-vindo", "नमस्ते", "স্বাগতম"] as const

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const isMobile = useIsMobile()
  // Mobile phones skip the slow word-by-word cycle: one beat, then exit.
  const stepMs = isMobile ? 120 : 420

  useEffect(() => {
    document.body.style.overflow = "hidden"

    if (index < WORDS.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1)
      }, stepMs)
      return () => clearTimeout(timeout)
    } else {
      const exitTimeout = setTimeout(() => {
        setIsExiting(true)
      }, stepMs)
      return () => clearTimeout(exitTimeout)
    }
  }, [index, stepMs])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "unset"
        onComplete?.()
      }}
    >
      {!isExiting && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-neutral-950"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white"
            >
              {WORDS[index]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
