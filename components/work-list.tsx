'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'

interface Project {
  id: string
  title: string
  category: string
  href: string
  fullScreenshot: string
}

const projects: Project[] = [
  {
    id: 'nebula',
    title: 'Nebula Digital Agency',
    category: 'B2B Platform & Development',
    href: '/projects/nebula',
    fullScreenshot: '/nebula-digital-ss.png',
  },
  {
    id: 'chorma',
    title: 'Chorma Agency Site',
    category: 'Interaction & UI Engineering',
    href: '/projects/chorma',
    fullScreenshot: '/chorma-ss.png',
  },
  {
    id: 'sparkle',
    title: 'Sparkle Clean',
    category: 'Zero-Dependency Platform',
    href: '/projects/sparkle-clean-chandpur',
    fullScreenshot: '/sparkleclean-ss.png',
  },
  {
    id: 'movemate',
    title: 'MoveMate',
    category: 'AI Application & UX',
    href: '/projects/movemate-moving-planner',
    fullScreenshot: '/movemate-ss.png',
  },
  {
    id: 'contentforge',
    title: 'Content Forge',
    category: 'AI Social Media Tool',
    href: '/projects/contentforge',
    fullScreenshot: '/Content-forge-desktop.png',
  },
]

export function WorkList() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()

  // Cursor position tracking with smooth spring motion
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (reduceMotion) return
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 20)
      mouseY.set(e.clientY - 130)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, reduceMotion])

  return (
    <section className="relative w-full bg-white px-4 pt-12 pb-6 md:px-12 md:pt-16 md:pb-8">
      <div className="mx-auto max-w-6xl divide-y divide-neutral-200 border-t border-b border-neutral-200">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={project.href}
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            onFocus={() => setActiveProject(project)}
            onBlur={() => setActiveProject(null)}
            className="group flex items-center justify-between px-2 py-8 transition-all duration-300 ease-out md:py-10"
          >
            {/* Left: Title with Right Shift + Lighten Color on Hover */}
            <h3 className="text-3xl font-normal tracking-tight text-neutral-900 transition-all duration-300 ease-out group-hover:translate-x-5 group-hover:text-neutral-300 md:text-5xl md:group-hover:translate-x-8">
              {project.title}
            </h3>

            {/* Right: Category Label */}
            <span className="ml-4 shrink-0 text-xs font-normal text-neutral-500 transition-colors duration-300 group-hover:text-neutral-300 md:text-sm">
              {project.category}
            </span>
          </Link>
        ))}
      </div>

      {/* Floating Static 16:9 Hero Preview Card */}
      <AnimatePresence>
        {activeProject && !reduceMotion && (
          <motion.div
            style={{
              x: cursorX,
              y: cursorY,
            }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="pointer-events-none fixed top-0 left-0 z-50 hidden aspect-[16/9] w-[420px] overflow-hidden rounded-lg bg-white shadow-[0_20px_50px_rgba(0,0,0,0.14)] md:block md:w-[480px]"
            aria-hidden="true"
          >
            <div className="relative h-full w-full overflow-hidden bg-white">
              <Image
                key={activeProject.id}
                alt={activeProject.title}
                src={activeProject.fullScreenshot}
                fill
                priority
                sizes="480px"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
