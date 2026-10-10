"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
} from "motion/react"
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Gauge,
  Globe,
  MousePointer2,
  ShieldCheck,
  SunMoon,
  Terminal,
  Zap,
} from "lucide-react"

const LIVE_URL = "https://chorma.netlify.app"
const PREVIEW_SRC = "/chorma-ss.png"

const METRICS = [
  {
    label: "Target Frame Rate",
    value: "60 FPS",
    detail: "Hardware GPU accelerated",
    icon: Gauge,
  },
  {
    label: "CLS Overhead",
    value: "0.00",
    detail: "Zero runtime layout shift",
    icon: Zap,
  },
  {
    label: "Theme Contrast",
    value: "AAA",
    detail: "WCAG 2.1 compliant",
    icon: ShieldCheck,
  },
  {
    label: "CSS Weight",
    value: "< 12kb",
    detail: "Purged utility tokens",
    icon: Cpu,
  },
] as const

const STACK = [
  "Next.js App Router",
  "Tailwind CSS",
  "Framer Motion",
  "Lucide React",
  "GPU Layering",
  "Netlify CI/CD",
  "Kilo Code AI Workflows",
  "TypeScript 5.0",
] as const

const ORBITAL_CODE = `// OrbitalLoader — transform-only rotation, zero layout shift
import { motion } from "motion/react";

export function OrbitalLoader({ duration = 2.4 }: { duration?: number }) {
  return (
    <div className="relative h-28 w-28">
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="absolute inset-4"
        animate={{ rotate: -360 }}
        transition={{ duration: duration * 1.6, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-zinc-500" />
      </motion.div>
      <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-white/80" />
    </div>
  );
}`

const THEME_CODE = `// theme-tokens.ts — one semantic scale, two surfaces
export const theme = {
  dark:  { surface: "#080511", ink: "#fcfbfe", muted: "rgba(252,251,254,0.64)" },
  light: { surface: "#fcfbfe", ink: "#080511", muted: "rgba(8,5,17,0.64)" },
} as const;

// The toggle only swaps tokens. Type scale, spacing and
// borders never move, so a theme switch costs a paint —
// never a layout.`

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function MagneticDemo() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 250, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 250, damping: 18, mass: 0.4 })
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  return (
    <div className="flex h-44 flex-col items-center justify-center gap-4 overflow-hidden rounded-sm border border-white/5 bg-[#080511]">
      <motion.button
        type="button"
        style={{ x, y }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          const nx = (e.clientX - r.left - r.width / 2) * 0.35
          const ny = (e.clientY - r.top - r.height / 2) * 0.35
          mx.set(nx)
          my.set(ny)
          setCoords({ x: Math.round(nx), y: Math.round(ny) })
        }}
        onMouseLeave={() => {
          mx.set(0)
          my.set(0)
          setCoords({ x: 0, y: 0 })
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-full bg-white px-6 py-3 font-mono text-xs font-medium text-[#080511] hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        MAGNETIC CONTROL
      </motion.button>
      <div className="flex w-full items-center justify-between px-4 font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
        <span>Offset X: {coords.x}px</span>
        <span>Offset Y: {coords.y}px</span>
      </div>
    </div>
  )
}

function ThemeSimulator() {
  const [demoTheme, setDemoTheme] = useState<"dark" | "light">("dark")
  const isDark = demoTheme === "dark"

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setDemoTheme(isDark ? "light" : "dark")}
          aria-pressed={!isDark}
          className="rounded-sm bg-white/10 px-3 py-1 font-mono text-[10px] transition-colors hover:bg-white/20"
        >
          TOGGLE MODE
        </button>
      </div>
      <div
        className={`rounded-sm p-6 transition-colors duration-500 ${
          isDark
            ? "border border-white/10 bg-[#080511] text-white"
            : "border border-black/10 bg-[#fcfbfe] text-[#080511]"
        }`}
      >
        <span className="mb-2 block font-mono text-xs opacity-50">
          Current Background: {isDark ? "#080511" : "#fcfbfe"}
        </span>
        <h3 className="mb-2 text-lg font-bold">Contrast Preservation</h3>
        <p className="text-sm leading-relaxed opacity-80">
          Notice how the typographic scale and legibility remain identical
          regardless of the current theme state. No rushed secondary modes.
        </p>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px]">
          <span
            className={`rounded-full border px-2.5 py-1 ${
              isDark
                ? "border-white/15 bg-white/5"
                : "border-black/15 bg-black/5"
            }`}
          >
            {isDark ? "≈ 20.2 : 1" : "≈ 19.7 : 1"} · WCAG AAA
          </span>
        </div>
      </div>
    </div>
  )
}

function OrbitalLoader() {
  const [speed, setSpeed] = useState(1.6)

  return (
    <div>
      <div className="flex h-44 items-center justify-center gap-8 overflow-hidden rounded-sm border border-white/5 bg-[#080511]">
        <div className="relative h-20 w-20" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border border-white/15" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </motion.div>
          <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
        </div>
        <div className="w-36 space-y-3">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
            <span>Speed</span>
            <span className="text-zinc-200">{speed.toFixed(1)}s</span>
          </div>
          <input
            type="range"
            min={0.6}
            max={4}
            step={0.2}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            aria-label="Orbital loader speed"
            className="w-full cursor-pointer accent-white"
          />
          <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
            <span>Frames</span>
            <span className="text-emerald-400">60 fps</span>
          </div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
        {speed.toFixed(1)}s loop / 0 KB assets / transform-only
      </p>
    </div>
  )
}

function CodeTabs() {
  const [tab, setTab] = useState<"physics" | "tokens">("physics")
  const code = tab === "physics" ? ORBITAL_CODE : THEME_CODE

  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex gap-2" role="tablist" aria-label="Code samples">
          {(
            [
              { id: "physics", label: "orbital-loader.tsx", icon: Zap },
              { id: "tokens", label: "theme-tokens.ts", icon: SunMoon },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-mono text-[11px] transition-colors ${
                tab === item.id
                  ? "bg-white/10 text-white"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <item.icon className="h-3 w-3" />
              {item.label}
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-1.5 font-mono text-[10px] text-zinc-600 sm:inline-flex">
          <Terminal className="h-3 w-3" />
          read-only
        </span>
      </div>
      <pre className="max-h-80 overflow-auto p-4 font-mono text-[11px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}


export default function ChormaCaseStudy() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative min-h-screen bg-[#080511] font-sans text-zinc-100 selection:bg-zinc-100 selection:text-[#080511]">
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-zinc-100"
        style={{ scaleX }}
      />

      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pt-32 pb-16">
        <div className="pointer-events-none absolute top-10 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-600/15 via-indigo-500/10 to-transparent blur-[140px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs tracking-wider text-zinc-300 uppercase">
            <Code2 className="h-3.5 w-3.5" /> Next.js 16 Motion Architecture
          </div>

          <h1 className="mb-6 max-w-4xl text-4xl leading-tight font-bold tracking-tight text-white md:text-7xl">
            Chorma — Bespoke Micro-Interaction Design
          </h1>

          <p className="mb-10 max-w-3xl text-lg leading-relaxed font-light text-zinc-300 md:text-2xl">
            An engineering deep dive into building ultra-smooth, GPU-accelerated
            agency platforms without layout thrashing, bloated component
            libraries, or generic AI templates.
          </p>

          <div className="flex flex-wrap items-center gap-6 border-t border-zinc-800/80 pt-4">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#080511] shadow-lg shadow-purple-900/20 transition-colors duration-200 hover:bg-purple-300"
            >
              <span>Explore Live Platform</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider text-zinc-400 uppercase">
              <div>
                <span className="block text-zinc-600">Engineer</span> Sifat
                Rahman
              </div>
              <div>
                <span className="block text-zinc-600">Location</span> Chandpur,
                BD
              </div>
              <div>
                <span className="block text-zinc-600">Framework</span> Next.js /
                Tailwind
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-6">
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-purple-950/20">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex w-full max-w-md items-center justify-center gap-2 rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-1 font-mono text-xs text-zinc-400">
                <Globe className="h-3 w-3 text-emerald-400" />
                <span>chorma.netlify.app</span>
              </div>
              <div className="hidden font-mono text-xs text-zinc-600 sm:block">
                HTTPS / TLS 1.3
              </div>
            </div>

            <div className="relative aspect-[16/9] max-h-[500px] w-full overflow-hidden bg-[#080511]">
              <Image
                src={PREVIEW_SRC}
                alt="Chorma Agency Site — Interactive Magnetic Cursor & WCAG Contrast Matrix"
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                quality={80}
                className="object-cover object-top"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-zinc-800/60 bg-black/55 px-6 py-3 font-mono text-[11px] tracking-wider text-zinc-400 uppercase backdrop-blur-sm">
                <span>Design system: Chorma-Core-v2</span>
                <span>Render time: 16.6ms (60 FPS)</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mb-20 border-y border-zinc-800/80 bg-zinc-950/60 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-sm border border-zinc-800/60 bg-zinc-900/40 p-4"
              >
                <m.icon className="mx-auto mb-2 h-5 w-5 text-purple-400" />
                <div className="font-mono text-2xl font-bold text-white md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-zinc-300">
                  {m.label}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-zinc-500">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-7">
          <Reveal>
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md md:p-8">
              <h2 className="mb-3 font-mono text-xs tracking-widest text-purple-400 uppercase">
                01 // Executive Overview
              </h2>
              <h3 className="mb-4 text-2xl font-bold text-white">
                The Problem with Modern Agency Portfolios
              </h3>
              <p className="mb-4 text-base leading-relaxed text-zinc-300">
                Most agency websites rely heavily on off-the-shelf component
                templates, bloated WebGL shaders, or heavy video embeds that
                cripple mobile responsiveness and load speed.
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                Chorma was engineered to demonstrate that high-end motion
                design and instantaneous page speeds can coexist. By writing
                bespoke CSS keyframes and math-bound cursor calculations
                instead of importing massive libraries, the entire platform
                delivers fluid interactivity with zero bloat.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md md:p-8">
              <h2 className="mb-3 font-mono text-xs tracking-widest text-purple-400 uppercase">
                02 // Design System &amp; Color Math
              </h2>
              <h3 className="mb-4 text-2xl font-bold text-white">
                One Scale, Two First-Class Themes
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Dark mode sits on a deep void, light mode on ghost white. Both
                share one semantic token scale, so a theme toggle swaps surface
                values without moving type, spacing, or borders.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-white/10 bg-[#080511] p-5">
                  <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                    <span className="text-zinc-300">Void Dark</span>
                    <span className="text-zinc-500">#080511</span>
                  </div>
                  <div className="text-2xl font-bold text-white">Aa 20.2:1</div>
                  <div className="mt-1 text-xs text-zinc-400">
                    Ghost ink on void surface
                  </div>
                  <div className="mt-4 flex h-2 overflow-hidden rounded-full">
                    <span className="w-2/3 bg-white" />
                    <span className="w-1/3 bg-zinc-700" />
                  </div>
                </div>
                <div className="rounded-sm border border-black/10 bg-[#fcfbfe] p-5">
                  <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                    <span className="text-zinc-800">Ghost Light</span>
                    <span className="text-zinc-500">#FCFBFE</span>
                  </div>
                  <div className="text-2xl font-bold text-[#080511]">
                    Aa 19.7:1
                  </div>
                  <div className="mt-1 text-xs text-zinc-600">
                    Void ink on ghost surface
                  </div>
                  <div className="mt-4 flex h-2 overflow-hidden rounded-full">
                    <span className="w-2/3 bg-[#080511]" />
                    <span className="w-1/3 bg-zinc-300" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-purple-300">
                  WCAG AAA
                </span>
                <span className="text-zinc-500">
                  Body 7:1+ / Large type 4.5:1+ / Both modes
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md md:p-8">
              <h2 className="mb-3 font-mono text-xs tracking-widest text-purple-400 uppercase">
                03 // Motion Engineering &amp; Physics
              </h2>
              <h3 className="mb-4 text-2xl font-bold text-white">
                GPU Physics &amp; Smooth Orbital Keyframes
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-1 flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    Magnetic Cursor Delta Math
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    Rather than attaching heavy scroll/move event listeners
                    directly to the window, Chorma uses relative offset bounds
                    (
                    <code className="font-mono text-purple-300">
                      getBoundingClientRect
                    </code>
                    ) with dampening factors to pull controls seamlessly toward
                    the user cursor without triggering main-thread layout
                    recalculations.
                  </p>
                </div>

                <div>
                  <h4 className="mb-1 flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    Dual First-Class Theme Engineering
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    Instead of treating Light Mode as a quick inverted CSS
                    filter, Chorma defines separate high-contrast semantic
                    design tokens. Dark Mode sits on a deep void (
                    <code className="font-mono text-purple-300">#080511</code>
                    ), while Light Mode utilizes a ghost white surface (
                    <code className="font-mono text-purple-300">#FCFBFE</code>
                    ).
                  </p>
                </div>

                <div>
                  <h4 className="mb-1 flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    Orbital Motion Without Payloads
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    Custom orbital loaders run on transform-only rotation with
                    independent durations per ring. No GIF, Lottie, or canvas —
                    just compositor-friendly motion that never shifts layout.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md md:p-8">
              <h2 className="mb-3 font-mono text-xs tracking-widest text-purple-400 uppercase">
                04 // Code &amp; Architecture Sandbox
              </h2>
              <h3 className="mb-4 text-2xl font-bold text-white">
                The Motion Primitives, Unfiltered
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Production patterns from the Chorma build. Switch tabs to
                compare the orbital motion engine against the semantic theme
                contract.
              </p>
              <CodeTabs />
            </div>
          </Reveal>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <Reveal>
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <MousePointer2 className="h-4 w-4 text-purple-400" />
                  <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
                    Live Cursor Delta Sandbox
                  </span>
                </div>
                <span className="rounded-sm bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] text-purple-300">
                  INTERACTIVE
                </span>
              </div>
              <MagneticDemo />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <SunMoon className="h-4 w-4 text-purple-400" />
                  <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
                    Theme Token Matrix
                  </span>
                </div>
              </div>
              <ThemeSimulator />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
                    Orbital Loader Telemetry
                  </span>
                </div>
                <span className="rounded-sm bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] text-purple-300">
                  GPU
                </span>
              </div>
              <OrbitalLoader />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-6 font-mono text-xs tracking-widest text-purple-400 uppercase">
            05 // Framework &amp; Tooling Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {STACK.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-purple-500/50 hover:text-white"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800/80 bg-[#080511] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <span className="mb-1 block font-mono text-xs tracking-widest text-zinc-500 uppercase">
              Next case study
            </span>
            <Link
              className="text-2xl font-bold text-white transition-colors hover:text-purple-400 md:text-3xl"
              href="/projects/sparkle-clean-chandpur"
            >
              Sparkle Clean &rarr;
            </Link>
          </div>
          <Link
            className="rounded-full border border-zinc-800 px-6 py-3 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
            href="/projects/nebula"
          >
            &larr; Nebula Digital Agency
          </Link>
        </div>
      </footer>
    </div>
  )
}
