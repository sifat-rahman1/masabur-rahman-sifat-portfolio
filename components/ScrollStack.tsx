'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-is-mobile'
import {
  WebDevMockup,
  UiUxMockup,
  GraphicDesignMockup,
  AiAutomationMockup,
} from '@/components/service-mockups'

export interface ServiceCardData {
  id: number
  index: string
  title: string
  category: string
  tagline: string
  deliverables: string[]
  bgColor: string
  borderAccent: string
  isDarkText: boolean
}

const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: 1,
    index: '01',
    title: 'Web Development',
    category: 'Building Websites & Web Apps',
    tagline: 'I build fast, modern websites that actually work well — not just look good. Smooth interactions, clean code, and solid performance on any device.',
    deliverables: ['Full Websites & Web Apps', 'Smooth Animations & Interactions', 'Clean, Well-Structured Code', 'Fast Loading Speed'],
    bgColor: 'bg-blue-600', // Solid Electric Blue
    borderAccent: 'border-blue-400/30',
    isDarkText: false,
  },
  {
    id: 2,
    index: '02',
    title: 'UI/UX Design',
    category: 'Designing How It Looks & Feels',
    tagline: 'I design interfaces that are easy to use and nice to look at. From wireframes to final screens, every layout is planned so things feel clear, not cluttered.',
    deliverables: ['Wireframes & Prototypes', 'Clean Visual Layouts', 'Mobile-Friendly Design', 'Easy-to-Use Interfaces'],
    bgColor: 'bg-emerald-500', // Solid Bright Mint/Emerald
    borderAccent: 'border-emerald-600/30',
    isDarkText: false,
  },
  {
    id: 3,
    index: '03',
    title: 'Graphic Design & Branding',
    category: 'Visual Identity & Branding',
    tagline: 'I create logos, brand visuals, and designs that help a business look professional and consistent — online and off.',
    deliverables: ['Logos & Brand Identity', 'Posters & Social Graphics', 'Icons & Visual Assets', 'Brand Style Guides'],
    bgColor: 'bg-orange-500', // Solid Vibrant Coral/Tangerine
    borderAccent: 'border-orange-600/30',
    isDarkText: false,
  },
  {
    id: 4,
    index: '04',
    title: 'AI & Automation',
    category: 'Using AI to Work Smarter',
    tagline: 'I use AI tools to speed up building and automate repetitive tasks — so projects get done faster without cutting corners on quality.',
    deliverables: ['AI-Assisted Development', 'Automated Workflows', 'Smart Tools & Integrations', 'Faster Project Delivery'],
    bgColor: 'bg-yellow-400', // Solid Cyber Yellow
    borderAccent: 'border-yellow-500/40',
    isDarkText: false,
  },
]

function renderMockup(id: number) {
  switch (id) {
    case 1:
      return <WebDevMockup />
    case 2:
      return <UiUxMockup />
    case 3:
      return <GraphicDesignMockup />
    case 4:
      return <AiAutomationMockup />
    default:
      return null
  }
}

interface StackCardProps {
  card: ServiceCardData
  index: number
  total: number
  progress: MotionValue<number>
}

function StackCard({ card, index, total, progress }: StackCardProps) {
  const step = 1 / total
  const cardStart = index * step
  const nextCardStart = (index + 1) * step
  const isMobile = useIsMobile()

  // Desktop-only sticky offsets: static classes keep Tailwind JIT picking
  // each variant up. Mobile stays in normal flow (relative, no offset).
  const stickyTops = [
    "md:top-[calc(13vh+0px)]",
    "md:top-[calc(13vh+16px)]",
    "md:top-[calc(13vh+32px)]",
    "md:top-[calc(13vh+48px)]",
  ] as const

  const scale = useTransform(
    progress,
    [cardStart, nextCardStart],
    [1, index === total - 1 ? 1 : 0.94]
  )

  const brightness = useTransform(
    progress,
    [cardStart, nextCardStart],
    [1, index === total - 1 ? 1 : 0.78]
  )

  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  if (isMobile) {
    return (
      <article
        className={`relative w-full overflow-hidden rounded-sm border p-6 sm:p-8 ${card.bgColor} ${card.borderAccent} ${
          card.isDarkText ? 'text-zinc-950' : 'text-white'
        }`}
      >
        <div className="relative z-10 grid grid-cols-1 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-xs px-2.5 py-1 rounded-full ${
                  card.isDarkText
                    ? 'bg-black/10 border border-black/20 text-zinc-950 font-bold'
                    : 'bg-white/15 border border-white/25 text-white font-semibold'
                }`}
              >
                {card.index}
              </span>
              <span
                className={`text-xs uppercase tracking-widest font-bold ${
                  card.isDarkText ? 'text-zinc-950/70' : 'text-white/80'
                }`}
              >
                {card.category}
              </span>
            </div>
            <h3
              className={`font-display text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${
                card.isDarkText ? 'text-zinc-950' : 'text-white'
              }`}
            >
              {card.title}
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed max-w-[42ch] ${
                card.isDarkText ? 'text-zinc-950/85 font-medium' : 'text-white/90'
              }`}
            >
              {card.tagline}
            </p>
            <div className="pt-2">
              <span
                className={`text-[11px] uppercase tracking-wider block mb-2 font-mono font-bold ${
                  card.isDarkText ? 'text-zinc-950/70' : 'text-white/75'
                }`}
              >
                Core Capabilities
              </span>
              <div className="flex flex-wrap gap-2">
                {card.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-3 py-1 rounded-sm ${
                      card.isDarkText
                        ? 'bg-black/10 border border-black/20 text-zinc-950 font-semibold'
                        : 'bg-white/15 border border-white/25 text-white font-medium'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">{renderMockup(card.id)}</div>
        </div>
      </article>
    )
  }

  return (
    <motion.div
      style={{
        scale,
        filter,
      }}
      className={`relative w-full rounded-sm p-6 sm:p-8 md:p-10 md:sticky ${stickyTops[index] ?? "md:top-[13vh]"} ${card.bgColor} ${card.borderAccent} border shadow-[0_25px_60px_rgba(0,0,0,0.35)] ${
        card.isDarkText ? 'text-zinc-950' : 'text-white'
      } transform-gpu will-change-transform overflow-hidden`}
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`font-mono text-xs px-2.5 py-1 rounded-full ${
                card.isDarkText
                  ? 'bg-black/10 border border-black/20 text-zinc-950 font-bold'
                  : 'bg-white/15 border border-white/25 text-white font-semibold'
              }`}
            >
              {card.index}
            </span>
            <span
              className={`text-xs uppercase tracking-widest font-bold ${
                card.isDarkText ? 'text-zinc-950/70' : 'text-white/80'
              }`}
            >
              {card.category}
            </span>
          </div>

          <h3
            className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${
              card.isDarkText ? 'text-zinc-950' : 'text-white'
            }`}
          >
            {card.title}
          </h3>

          <p
            className={`text-sm sm:text-base leading-relaxed max-w-[42ch] ${
              card.isDarkText
                ? 'text-zinc-950/85 font-medium'
                : 'text-white/90'
            }`}
          >
            {card.tagline}
          </p>

          <div className="pt-2">
            <span
              className={`text-[11px] uppercase tracking-wider block mb-2 font-mono font-bold ${
                card.isDarkText ? 'text-zinc-950/70' : 'text-white/75'
              }`}
            >
              Core Capabilities
            </span>
            <div className="flex flex-wrap gap-2">
              {card.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-3 py-1 rounded-sm ${
                    card.isDarkText
                      ? 'bg-black/10 border border-black/20 text-zinc-950 font-semibold'
                      : 'bg-white/15 border border-white/25 text-white font-medium'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Floating Dark Software Canvas */}
        <div className="lg:col-span-7 w-full">
          {renderMockup(card.id)}
        </div>
      </div>
    </motion.div>
  )
}

export function ScrollStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative mt-8 h-auto w-full sm:h-[260vh] md:mt-12 lg:h-[300vh]"
    >
      <div className="relative top-0 flex w-full flex-col justify-start py-8 sm:py-10 md:sticky md:min-h-screen">
        <div className="relative w-full max-w-shell mx-auto px-4 sm:px-6 md:px-12 space-y-8">
          {SERVICE_CARDS.map((card, index) => (
            <StackCard
              key={card.id}
              card={card}
              index={index}
              total={SERVICE_CARDS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollStack
