"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

/**
 * Route-specific transition preloader for blog article pages only.
 * Homepage ("/") returns null so its dedicated multi-language
 * Preloader owns the intro, and gallery / blog / resources / tools /
 * contact return null so their green-dot PagePreloader owns the intro.
 * Total runtime stays under 800ms.
 */
function titleFor(pathname: string): string | null {
  // Nested blog reader routes share the BLOG curtain. The /blog index
  // itself is owned by its green-dot PagePreloader instead.
  if (pathname.startsWith("/blog/")) return "BLOG"
  return null
}

const EXIT_DELAY_MS = 300
const CURTAIN_DURATION = 0.45
const SNAPPY_EASE = [0.76, 0, 0.24, 1] as const

export function RoutePreloader() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const title = titleFor(pathname ?? "")

  return <Curtain key={pathname} title={title} disabled={reduceMotion} />
}

function Curtain({
  title,
  disabled,
}: {
  title: string | null
  disabled: boolean | null
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!title || disabled) return
    document.body.style.overflow = "hidden"
    const hide = window.setTimeout(() => setVisible(false), EXIT_DELAY_MS)
    return () => {
      window.clearTimeout(hide)
      document.body.style.overflow = ""
    }
  }, [title, disabled])

  if (!title || disabled) return null

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ""
      }}
    >
      {visible && (
        <motion.div
          key="route-curtain"
          initial={{ y: "0%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: CURTAIN_DURATION, ease: SNAPPY_EASE }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center bg-[#08080A]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-mono text-4xl font-bold tracking-widest text-[#FAFAFA] md:text-6xl"
          >
            <span aria-hidden="true" className="mr-3 text-emerald-400">
              ✦
            </span>
            {title}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
