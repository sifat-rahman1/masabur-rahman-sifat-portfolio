"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Cpu,
  ExternalLink,
  Gauge,
  Globe,
  Layers,
  Layout,
  LoaderCircle,
  Mail,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react"

const LIVE_URL = "https://nebula-digital-agency.vercel.app"

const METRICS = [
  { label: "Performance", value: 100, suffix: "", icon: Gauge },
  { label: "Accessibility", value: 100, suffix: "", icon: ShieldCheck },
  { label: "Best Practices", value: 100, suffix: "", icon: Zap },
  { label: "SEO", value: 100, suffix: "", icon: CheckCircle2 },
] as const

const DELIVERABLES = [
  {
    icon: Mail,
    title: "Lead Capture Pipeline",
    desc: "Formspree backend with seamless AJAX submission.",
  },
  {
    icon: Cpu,
    title: "Interactive ROI Calculator",
    desc: "Dynamic sliders with instant projected-return estimates.",
  },
  {
    icon: Layout,
    title: "Bespoke Dark / Light Theme",
    desc: "WCAG contrast compliance, zero bugs across modes.",
  },
  {
    icon: Palette,
    title: "Customized 3D Vectors",
    desc: "Recolored, optimized SVGs matched to the brand.",
  },
]

const CHALLENGES = [
  {
    tag: "UIverse animation taming",
    body: "UIverse components bring flair but needed overrides to prevent layout thrashing and keep contrast across themes.",
    fix: "Refactored keyframes into modular classes on GPU-composited properties.",
  },
  {
    tag: "Preloader execution timing",
    body: "Stopping preloader flicker and scroll-lock artifacts on fast networks.",
    fix: "Precise DOM mount checks with smooth opacity crossfades.",
  },
  {
    tag: "Raw 3D SVG editing",
    body: "Vendor 3D vectors shipped baked-in fills that clashed with the palette.",
    fix: "Stripped fills to currentColor, simplified paths, inlined optimized SVGs.",
  },
]

const STACK = [
  { icon: Palette, name: "Tailwind CSS", desc: "Utility-first styling, purged to minimal CSS." },
  { icon: Zap, name: "JavaScript ES6+", desc: "Widget logic with zero framework overhead." },
  { icon: Mail, name: "Formspree API", desc: "Lead capture backend, no server to maintain." },
  { icon: Workflow, name: "AJAX Fetch", desc: "Async submission with inline success states." },
  { icon: Layers, name: "UIverse", desc: "Micro-interactions, tamed for GPU compositing." },
  { icon: Cpu, name: "Kilo AI", desc: "AI-assisted scaffolding and refactors." },
  { icon: Globe, name: "Vercel CD", desc: "Edge deployment with instant previews." },
  { icon: ExternalLink, name: "GitHub", desc: "Version control with automated deploys." },
]

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

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1200, 1)
        setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <>
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-emerald-400">
        {index}
      </p>
      <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </>
  )
}

function RoiWidget() {
  const [traffic, setTraffic] = useState(5000)
  const [rate, setRate] = useState(2.5)
  const leads = Math.round(traffic * (rate / 100))

  return (
    <div className="rounded-sm border border-zinc-800/90 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
            Live widget playground
          </span>
        </div>
        <span className="rounded-sm bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
          Interactive
        </span>
      </div>
      <h3 className="mb-1 text-lg font-bold text-white">ROI Calculator Widget</h3>
      <p className="mb-6 text-xs text-zinc-400">
        Test the exact calculation logic embedded on Nebula.
      </p>
      <div className="mb-6">
        <div className="mb-2 flex justify-between font-mono text-xs">
          <span className="text-zinc-400">MONTHLY TRAFFIC</span>
          <span className="font-bold text-emerald-400">{traffic.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={1000}
          max={50000}
          step={1000}
          value={traffic}
          onChange={(e) => setTraffic(Number(e.target.value))}
          aria-label="Monthly traffic"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-sm bg-zinc-800 accent-emerald-400"
        />
      </div>
      <div className="mb-6">
        <div className="mb-2 flex justify-between font-mono text-xs">
          <span className="text-zinc-400">CONVERSION RATE</span>
          <span className="font-bold text-emerald-400">{rate}%</span>
        </div>
        <input
          type="range"
          min={0.5}
          max={10}
          step={0.5}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          aria-label="Conversion rate"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-sm bg-zinc-800 accent-emerald-400"
        />
      </div>
      <div className="rounded-sm border border-emerald-500/30 bg-zinc-950 p-4 text-center">
        <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-zinc-500">
          Projected monthly leads
        </span>
        <span className="font-mono text-3xl font-extrabold text-white">
          {leads} <span className="text-sm font-normal text-emerald-400">leads/mo</span>
        </span>
      </div>
    </div>
  )
}

type FormState = "idle" | "submitting" | "success"

function LeadFormDemo() {
  const [state, setState] = useState<FormState>("idle")
  const timer = useRef<number | null>(null)
  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    []
  )
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (state !== "idle") return
    setState("submitting")
    timer.current = window.setTimeout(() => setState("success"), 1400)
  }
  return (
    <div className="rounded-sm border border-zinc-800/90 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Send className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
            Lead form flow
          </span>
        </div>
        <span className="rounded-sm bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
          AJAX demo
        </span>
      </div>
      {state === "success" ? (
        <div className="flex flex-col items-center py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Check className="h-6 w-6" />
          </span>
          <p className="mt-4 font-semibold text-white">Brief received</p>
          <p className="mt-1 text-sm text-zinc-400">
            Same success state the live site shows.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="mt-5 rounded-full border border-zinc-700 px-5 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Name
            </span>
            <input
              required
              placeholder="Jane Studio"
              disabled={state === "submitting"}
              className="w-full rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none disabled:opacity-60"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              Email
            </span>
            <input
              required
              type="email"
              placeholder="jane@studio.com"
              disabled={state === "submitting"}
              className="w-full rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none disabled:opacity-60"
            />
          </label>
          <button
            type="submit"
            disabled={state === "submitting"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-emerald-400 disabled:opacity-70"
          >
            {state === "submitting" ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Request a quote"
            )}
          </button>
          <p className="text-center font-mono text-[10px] uppercase tracking-wider text-zinc-600">
            Demo only
          </p>
        </form>
      )}
    </div>
  )
}

function ChallengeCard({
  tag,
  body,
  fix,
  index,
}: {
  tag: string
  body: string
  fix: string
  index: number
}) {
  const [open, setOpen] = useState(index === 0)
  const panelId = `challenge-panel-${index}`
  return (
    <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
          Challenge #{index + 1} - {tag}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="px-5 pb-5"
          >
            <p className="text-sm leading-relaxed text-zinc-300">{body}</p>
            <div className="mt-3 rounded-sm border border-emerald-500/20 bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-emerald-400">
              Fix: {fix}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TechPill({
  icon: Icon,
  name,
  desc,
}: {
  icon: typeof Palette
  name: string
  desc: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className={`rounded-sm border p-4 text-left transition-colors duration-300 ${
        open
          ? "border-emerald-500/50 bg-zinc-900"
          : "border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/40"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-emerald-400" />
        <span className="font-mono text-xs text-zinc-200">{name}</span>
      </span>
      <span
        className={`grid transition-all duration-300 ${open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <span className="overflow-hidden text-xs leading-relaxed text-zinc-400">
          {desc}
        </span>
      </span>
    </button>
  )
}

export default function NebulaCaseStudy() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative min-h-screen bg-[#08080A] font-sans text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400">
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500"
      />

      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pt-36 pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-emerald-500/10 via-indigo-500/10 to-transparent blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs tracking-wider text-emerald-400 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            B2B Agency Platform Case Study
          </div>
          <h1 className="mb-6 max-w-4xl text-4xl leading-tight font-bold tracking-tight text-white md:text-7xl">
            Nebula Digital Agency
          </h1>
          <p className="mb-10 max-w-3xl text-lg leading-relaxed font-light text-zinc-400 md:text-2xl">
            A production-ready B2B agency homepage engineered for conversions.
            Real lead capture, an interactive ROI calculator, and a
            high-contrast dark/light theme.
          </p>
          <div className="flex flex-wrap items-center gap-6 border-t border-zinc-800/80 pt-4">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black shadow-lg shadow-white/10 transition-colors duration-200 hover:bg-emerald-400"
            >
              <span>Visit Live Agency Site</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-6 font-mono text-xs tracking-wider text-zinc-400 uppercase">
              <div>
                <span className="block text-zinc-600">Role</span>
                UI/UX and Frontend
              </div>
              <div>
                <span className="block text-zinc-600">Timeline</span>
                2026
              </div>
              <div>
                <span className="block text-zinc-600">Stack</span>
                Next / Tailwind / Formspree
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="border-y border-zinc-800/60 bg-zinc-950/40 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
          {METRICS.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08}>
              <div className="flex flex-col items-center justify-center gap-2 rounded-sm border border-zinc-800/50 bg-zinc-900/30 p-4">
                <metric.icon className="mb-1 h-5 w-5 text-emerald-400" />
                <span className="font-mono text-2xl font-bold text-white md:text-3xl">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </span>
                <span className="text-xs tracking-wider text-zinc-400 uppercase">
                  {metric.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-16">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-zinc-800/80">
            <Image
              src="/nebula-digital-ss.png"
              alt="Nebula Digital Agency — Live ROI Calculator & Dark Mode Interface"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              quality={80}
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-7">
          <Reveal>
            <div>
              <SectionHeading index="01 // Overview" title="Built to Convert, Built to Scale" />
              <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                Nebula Digital Agency is a turnkey, production-ready platform
                designed to eliminate static dead templates. An interactive ROI
                calculator makes the value tangible, and an AJAX lead form wired
                to Formspree captures inquiries without reloads.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <SectionHeading index="02 // Deliverables" title="Key Engineering Highlights" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {DELIVERABLES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-sm border border-zinc-800/80 bg-zinc-900/40 p-5 transition-colors hover:border-emerald-500/40"
                  >
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-white">
                      <item.icon className="h-4 w-4 shrink-0 text-emerald-400" />
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <SectionHeading index="03 // The Hard Part" title="Challenges and Solutions" />
              <div className="space-y-4">
                {CHALLENGES.map((c, i) => (
                  <ChallengeCard
                    key={c.tag}
                    tag={c.tag}
                    body={c.body}
                    fix={c.fix}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="space-y-8 lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <RoiWidget />
          </Reveal>
          <Reveal delay={0.1}>
            <LeadFormDemo />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-zinc-800/80 bg-zinc-950/60 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-emerald-400">
              04 // Technology stack
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {STACK.map((tech) => (
                <TechPill
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  desc={tech.desc}
                />
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-wider text-zinc-600 uppercase">
              Select a tool to see why it made the cut
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-zinc-800/80 bg-[#08080A] py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <span className="mb-1 block font-mono text-xs tracking-widest text-zinc-500 uppercase">
              Previous case study
            </span>
            <Link
              href="/projects/contentforge"
              className="inline-flex items-center gap-2 text-2xl font-bold text-white transition-colors hover:text-emerald-400 md:text-4xl"
            >
              &larr; ContentForge
              <ArrowRight className="h-7 w-7 rotate-180" />
            </Link>
          </div>
          <div className="text-left md:text-right">
            <span className="mb-1 block font-mono text-xs tracking-widest text-zinc-500 uppercase">
              Next case study
            </span>
            <Link
              href="/projects/chorma"
              className="inline-flex items-center gap-2 text-2xl font-bold text-white transition-colors hover:text-emerald-400 md:text-4xl"
            >
              Chorma Agency Site
              <ArrowRight className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

