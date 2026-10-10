"use client"

import { useScroll, useSpring, motion } from "motion/react"

/**
 * A 2-px fixed bar pinned to the very top of the viewport that tracks how far
 * the user has scrolled through the article. Emerald-to-cyan gradient so it
 * reads against both light and dark surfaces.
 */
export function ReadingProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left bg-gradient-to-r from-emerald-500 to-cyan-500"
            style={{ scaleX }}
        />
    )
}
