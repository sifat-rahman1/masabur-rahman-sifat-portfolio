"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ThoughtLineProps {
  steps?: string[]
  label?: string
  fontSize?: number | string
  glyph?: "sparkle" | "dots" | "wave"
  collapsible?: boolean
  collapseOnSettle?: boolean
  showTimer?: boolean
  doneLabel?: string
  settleDuration?: number
  settleBlur?: number
  breathDepth?: number
  breathPeriod?: number
  build?: boolean
  onSettle?: (seconds: number) => void
  ready?: boolean
}

function SparkleGlyph({ opacity }: { opacity: number }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity }}
      className="text-white/70"
    >
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </motion.svg>
  )
}

function DotsGlyph({ count = 3 }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-1 h-1 rounded-full bg-white/60"
          style={{
            animation: `bounce 1.2s infinite ${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </span>
  )
}

function WaveGlyph() {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="block w-0.5 bg-white/60"
          style={{
            height: `${8 + Math.sin(i) * 4}px`,
            animation: `wave 1s ease-in-out ${i * 0.1}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave {
          from { height: 4px; opacity: 0.4; }
          to { height: 14px; opacity: 1; }
        }
      `}</style>
    </span>
  )
}

export default function ThoughtLine({
  steps = ["Initializing...", "Parsing AI pipelines...", "Optimizing micro-interactions...", "Portfolio ready..."],
  label,
  fontSize = 15,
  glyph = "sparkle",
  showTimer = false,
  doneLabel = "System ready in",
  settleDuration = 400,
  settleBlur = 3,
  breathDepth = 0.4,
  breathPeriod = 1.4,
  onSettle,
  ready = false,
}: ThoughtLineProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  /**
   * Mount stamp for the "ready in" readout. Stamped in an effect, not in render:
   * `Date.now()` is impure, and the first interval tick that reads it fires a
   * full 100ms after mount, so the sketch of the number is unchanged.
   */
  const startTimeRef = useRef(0)
  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const didSettleRef = useRef(false)

  // Handle step cycling and timer when not ready
  useEffect(() => {
    if (!ready) {
      // Cycle through steps
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= (steps?.length ?? 1) - 1) {
            clearInterval(interval)
            setIsDone(true)
            return prev
          }
          return prev + 1
        })
      }, 800)

      // Timer for display
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 100))
      }, 100)

      return () => {
        clearInterval(interval)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    } else {
      // When ready becomes true, immediately transition to done state
      // if we haven't already settled
      if (!isDone && !didSettleRef.current) {
        setIsDone(true)
      }
    }
    // `isDone` stays out of this list on purpose: including it would restart the
    // step cycle and the elapsed timer the moment the line settles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, steps])

  // Handle the settle callback when isDone becomes true
  useEffect(() => {
    if (isDone && onSettle && !didSettleRef.current) {
      didSettleRef.current = true
      
      const elapsedSeconds = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
      
      settleTimerRef.current = setTimeout(() => {
        onSettle(Number(elapsedSeconds))
      }, settleDuration)

      return () => {
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
      }
    }
  }, [isDone, onSettle, settleDuration])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
    }
  }, [])

  // Timer updates only while not done
  useEffect(() => {
    if (!isDone && ready) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 100))
      }, 100)

      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [ready, isDone])

  const displayText = isDone
    ? `${doneLabel} ${(elapsed / 10).toFixed(1)}s`
    : (label ?? steps?.[currentStep] ?? "")

  const glyphComponents = {
    sparkle: <SparkleGlyph opacity={isDone ? 0.3 : 1} />,
    dots: <DotsGlyph />,
    wave: <WaveGlyph />,
  }

  return (
    <div
      className="flex items-center gap-3 font-mono"
      style={{ fontSize }}
    >
      <span className="shrink-0">
        {glyphComponents[glyph]}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayText}
          initial={{ opacity: 0, y: 4, filter: `blur(${settleBlur}px)` }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -4 }}
          transition={{
            duration: 0.3,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="text-white/90 whitespace-nowrap"
          style={{
            animation: isDone ? undefined : `breath ${breathPeriod}s ease-in-out infinite`,
          }}
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
      {showTimer && !isDone && (
        <span className="text-white/40 text-xs ml-2">
          {(elapsed / 10).toFixed(1)}s
        </span>
      )}
      <style>{`
        @keyframes breath {
          0%, 100% { opacity: 0.6; }
          50% { opacity: ${1 - breathDepth}; }
        }
      `}</style>
    </div>
  )
}