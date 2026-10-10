"use client"

import { useRef } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion"
import { Cpu, Laptop, Rocket, School, type LucideIcon } from "lucide-react"

type Milestone = {
  icon: LucideIcon
  title: string
  subheading: string
  description: string
}

/**
 * The owner's academic record, in order. The icons track that order: school,
 * technical school, polytechnic coursework, and the vocational programme that
 * runs into the present.
 */
const MILESTONES: Milestone[] = [
  {
    icon: School,
    title: "Secondary School Foundations",
    subheading: "H.M.P Government High School",
    description:
      "Core analytical studies, mathematics, and early computer fundamentals that sparked a deep interest in software and technology.",
  },
  {
    icon: Cpu,
    title: "Secondary School Certificate (SSC) in Technical Studies",
    subheading: "Kachua Government Technical School & College",
    description:
      "Practical technical training, computer science basics, and vocational engineering fundamentals with a strong focus on applied problem-solving.",
  },
  {
    icon: Laptop,
    title: "Intensive Computer Science & Electronics Coursework",
    subheading: "Technical Polytechnic Foundations",
    description:
      "Immersive technical curriculum covering core computer science concepts, digital logic, and hardware fundamentals — building a strong foundation before pivoting into accelerated, real-world product development.",
  },
  {
    icon: Rocket,
    title: "HSC Vocational — Technical Engineering & Real-World Practice",
    subheading: "Advanced Applied Specialization (Present)",
    description:
      "Structuring academic growth around direct industry execution — combining technical coursework with modern frontend development, UI/UX engineering, and client product delivery.",
  },
]

/**
 * Rail physics. Raw scroll progress wrapped in a spring, so a fast flick of
 * the wheel still grows the line smoothly. All scroll data lives in motion
 * values: no scroll listeners, no per-frame setState, and each milestone
 * re-renders only when its own in-view boolean flips.
 */
const BEAM_SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 } as const

/**
 * Bottom-anchored activation. The viewport shrinks by 30% at its bottom edge,
 * so an item lights up the moment its top crosses the 70% line — the same
 * region the beam tip is filling. `once: false` lets items mute again when
 * scrolled back out.
 */
const ITEM_VIEW_MARGIN = "0px 0px -30% 0px" as const

/**
 * Contrast states, exactly as specced. Every transition rides opacity,
 * transform, or color only — filter/blur is banned on scroll paths.
 */
const NODE_BASE =
  "flex h-full w-full items-center justify-center rounded-full border transform-gpu"
const NODE_ACTIVE =
  "bg-zinc-950 text-white border-zinc-950 scale-110 shadow-xl shadow-black/20 ring-4 ring-black/10 transition-all duration-300"
const NODE_INACTIVE =
  "bg-zinc-100 text-zinc-400 border-zinc-300 scale-90 transition-all duration-300"

const TITLE_BASE =
  "font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.15] tracking-display text-balance transform-gpu"
const TITLE_ACTIVE =
  "text-zinc-950 font-bold opacity-100 transition-all duration-300 ease-out"
const TITLE_INACTIVE =
  "text-zinc-400 font-medium opacity-30 transition-all duration-300 ease-out"

const SUB_BASE =
  "mt-3 font-serif text-[0.95rem] leading-snug tracking-tightish md:text-base transform-gpu"
const SUB_ACTIVE =
  "text-zinc-700 font-semibold italic opacity-100 transition-all duration-300 ease-out"
const SUB_INACTIVE =
  "text-zinc-400 italic opacity-30 transition-all duration-300 ease-out"

const BODY_BASE = "mt-4 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-pretty transform-gpu"
const BODY_ACTIVE =
  "text-zinc-800 font-normal opacity-100 transition-all duration-300 ease-out"
const BODY_INACTIVE =
  "text-zinc-400 opacity-20 transition-all duration-300 ease-out"

type TimelineItemProps = {
  milestone: Milestone
}

function TimelineItem({ milestone }: TimelineItemProps) {
  const itemRef = useRef<HTMLLIElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const isInView = useInView(itemRef, {
    margin: ITEM_VIEW_MARGIN,
    once: false,
  })
  const active = reduceMotion || isInView
  const Icon = milestone.icon

  return (
    <li ref={itemRef} className="flex transform-gpu gap-6 md:gap-10">
      <div className="relative z-10 h-12 w-12 shrink-0 md:h-14 md:w-14">
        <div
          className={`${NODE_BASE} ${active ? NODE_ACTIVE : NODE_INACTIVE}`}
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5 md:h-6 md:w-6"
            strokeWidth={1.5}
          />
        </div>
      </div>

      <div className="min-w-0">
        <h3 className={`${TITLE_BASE} ${active ? TITLE_ACTIVE : TITLE_INACTIVE}`}>
          {milestone.title}
        </h3>
        <p className={`${SUB_BASE} ${active ? SUB_ACTIVE : SUB_INACTIVE}`}>
          {milestone.subheading}
        </p>
        <p className={`${BODY_BASE} ${active ? BODY_ACTIVE : BODY_INACTIVE}`}>
          {milestone.description}
        </p>
      </div>
    </li>
  )
}

/**
 * Education and journey. One rail behind the list: a dim track for the whole
 * distance, a spring-smoothed beam for how much of it is behind you.
 *
 * `useScroll` reads the section container directly — its own resize handling
 * replaces any manual geometry measurement. Progress 0 lands as the container
 * start reaches 60% of the viewport; progress 1 as its end reaches 80%, which
 * keeps the beam tip inside the node band for the whole fill.
 */
export function EducationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() ?? false

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  })
  const smoothLine = useSpring(scrollYProgress, BEAM_SPRING)

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="rule-t relative bg-transparent py-20 text-[#1a1a1a] md:py-32"
    >
      <div className="mx-auto w-full max-w-shell px-6 md:px-12">
        <header className="rule-b pb-8">
          <span className="label block text-muted">
            04 / EDUCATION &amp; JOURNEY
          </span>
          <h2 id="education-heading" className="sr-only">
            Education and journey
          </h2>
        </header>

        <div ref={containerRef} className="relative mt-16 md:mt-24">
          {/* The rail is this page's hairline stood on end. The beam grows
              from the top edge only: scaleY on a motion value, no filters. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-6 -ml-px w-0.5 md:left-7"
          >
            <div className="absolute inset-0 bg-zinc-200" />
            {reduceMotion ? (
              <div className="absolute inset-0 bg-zinc-950" />
            ) : (
              <motion.div
                style={{ scaleY: smoothLine, originY: 0 }}
                className="absolute inset-0 bg-zinc-950 shadow-[0_0_12px_rgba(0,0,0,0.8)] transform-gpu"
              />
            )}
          </div>

          <ol className="relative space-y-16 md:space-y-24">
            {MILESTONES.map((milestone) => (
              <TimelineItem key={milestone.title} milestone={milestone} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default EducationTimeline
