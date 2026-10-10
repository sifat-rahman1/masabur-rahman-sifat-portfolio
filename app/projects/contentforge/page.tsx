"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Clapperboard,
  Cpu,
  FlaskConical,
  Gauge,
  Layers,
  Lightbulb,
  Megaphone,
  Sparkles,
  Zap,
} from "lucide-react"

const LIVE_URL = "https://contentforge-official.netlify.app/"
const PREVIEW_SRC = "/Content-forge-desktop.png"

const BADGES = [
  "Experimental",
  "AI Product",
  "Content Creation",
  "React",
  "In Progress",
] as const

const PIPELINE = ["Idea", "Generate", "Refine", "Organize", "Plan"] as const

const FRAGMENTS = [
  { app: "AI chat tool", pain: "Sharp lines with nowhere to keep them" },
  { app: "Notes app", pain: "Ideas buried under everything else" },
  { app: "Planner / sheet", pain: "Plans detached from the drafts" },
  { app: "Native scheduler", pain: "Posting with no pipeline behind it" },
] as const

const MODULES = [
  {
    id: "ideas",
    label: "Generate",
    icon: Lightbulb,
    title: "Generate Ideas",
    body: "New content directions when you are stuck or need inspiration. Start from an angle, not a blank page.",
    points: ["Angle prompts per niche", "Trend-aware starting points", "Keep what sparks, skip the rest"],
  },
  {
    id: "hooks",
    label: "Hooks",
    icon: Megaphone,
    title: "Create Hooks & Captions",
    body: "Turn rough ideas into stronger openings and social-ready copy. The first line earns the second.",
    points: ["Hook variants per idea", "Caption drafts, social-ready", "Tone control: bold, curious, how-to"],
  },
  {
    id: "scripts",
    label: "Scripts",
    icon: Clapperboard,
    title: "Write Scripts",
    body: "Develop structured scripts adapted for short-form video and other formats. Arc first, words second.",
    points: ["Hook, value, CTA arc", "Length tuned per format", "Talking points, not teleprompters"],
  },
  {
    id: "plan",
    label: "Plan",
    icon: CalendarCheck,
    title: "Organize & Plan",
    body: "Keep ideas and content organized instead of spreading them across multiple apps. One queue, zero archaeology.",
    points: ["Ideas, drafts, posts together", "Queue what ships next", "Nothing lost between tools"],
  },
] as const

const FAQS = [
  {
    q: "What is ContentForge?",
    a: "An experimental AI content workspace that helps creators and businesses generate, refine, organize, and plan social media content in one focused surface.",
  },
  {
    q: "What can you create?",
    a: "Content ideas, hooks, captions, scripts, and planned social posts. The pipeline runs idea to scheduled draft without switching apps.",
  },
  {
    q: "Who is it for?",
    a: "Creators, marketers, and small businesses who need a streamlined workflow for consistent posting without the tool sprawl.",
  },
  {
    q: "What is the tech stack?",
    a: "React with AI-assisted development and iterative UI/UX exploration. Zero bloated runtime dependencies, ultra-fast payload, lightweight responsive layouts.",
  },
  {
    q: "What is the project status?",
    a: "Living experiment, in progress. Each iteration tests the same question: can AI make content creation feel less fragmented?",
  },
] as const

const STACK = [
  "React",
  "AI-assisted development",
  "Iterative UI / UX exploration",
  "Zero bloated runtime deps",
  "Responsive layouts",
] as const

const METRICS = [
  { label: "Runtime bloat", value: "Zero", detail: "No heavy dependencies", icon: Cpu },
  { label: "Payload", value: "Ultra-fast", detail: "Lean delivery", icon: Zap },
  { label: "Surfaces", value: "1 workspace", detail: "Replaces 4 app contexts", icon: Layers },
  { label: "Flow stages", value: "5 steps", detail: "Idea to planned post", icon: Gauge },
] as const

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
      className={`transform-gpu ${className ?? ""}`}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({
  index,
  title,
  lede,
}: {
  index: string
  title: string
  lede?: string
}) {
  return (
    <Reveal>
      <p className="mb-3 font-mono text-xs tracking-widest text-emerald-400 uppercase">
        {index}
      </p>
      <h2 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
          {lede}
        </p>
      ) : null}
    </Reveal>
  )
}

const HOOK_TOPICS = [
  { id: "morning-routine", label: "Morning routine", context: "productivity" },
  { id: "freelance-design", label: "Freelance design", context: "client work" },
  { id: "home-workout", label: "Home workout", context: "fitness" },
] as const

const HOOK_TONES = [
  { id: "bold", label: "Bold" },
  { id: "curious", label: "Curious" },
  { id: "howto", label: "How-to" },
] as const

type HookTopicId = (typeof HOOK_TOPICS)[number]["id"]
type HookToneId = (typeof HOOK_TONES)[number]["id"]

function buildHooks(topicId: HookTopicId, toneId: HookToneId): string[] {
  const topic = HOOK_TOPICS.find((t) => t.id === topicId) ?? HOOK_TOPICS[0]
  if (toneId === "bold")
    return [
      `Stop overthinking your ${topic.label}. This system does the heavy lifting.`,
      `Your ${topic.label} is broken. Here is the fix nobody talks about.`,
      `I rebuilt my ${topic.label} from zero. Steal this framework.`,
    ]
  if (toneId === "curious")
    return [
      `What if your ${topic.label} took half the time and worked twice as well?`,
      `Nobody talks about this side of ${topic.label}. Let me show you.`,
      `The ${topic.context} detail that changes your whole ${topic.label}.`,
    ]
  return [
    `How to plan your ${topic.label} in 3 steps (save this).`,
    `A simple ${topic.label} workflow for busy ${topic.context} days.`,
    `${topic.label} in 15 minutes: the repeatable version.`,
  ]
}

function buildCaption(topicId: HookTopicId): string {
  const topic = HOOK_TOPICS.find((t) => t.id === topicId) ?? HOOK_TOPICS[0]
  return `Today's ${topic.label} notes are done. One workspace, one queue, zero app-hopping. Plan the next post while this one is still fresh. #${topic.context.replace(/\s+/g, "")} #contentplanning`
}

function buildScript(topicId: HookTopicId): { beat: string; line: string }[] {
  const topic = HOOK_TOPICS.find((t) => t.id === topicId) ?? HOOK_TOPICS[0]
  return [
    { beat: "0:00 Hook", line: `Your ${topic.label} does not need more tools. It needs one flow.` },
    { beat: "0:05 Value", line: `Capture the idea, sharpen the hook, draft the caption, queue the post.` },
    { beat: "0:20 Proof", line: `Everything for this ${topic.context} post lived in one workspace.` },
    { beat: "0:28 CTA", line: `Save this system and plan tomorrow's post tonight.` },
  ]
}

function HookLab() {
  const [topic, setTopic] = useState<HookTopicId>("morning-routine")
  const [tone, setTone] = useState<HookToneId>("bold")
  const [kept, setKept] = useState<string[]>([])
  const hooks = buildHooks(topic, tone)
  const caption = buildCaption(topic)
  const script = buildScript(topic)

  const keep = (h: string) =>
    setKept((prev) => (prev.includes(h) ? prev.filter((k) => k !== h) : [...prev, h].slice(-3)))

  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
            Hook lab · sandbox demo
          </span>
        </div>
        <span className="rounded-sm bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
          Interactive
        </span>
      </div>
      <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
              1 · Pick a topic
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
              {HOOK_TOPICS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTopic(t.id)}
                  aria-pressed={topic === t.id}
                  className={`rounded-full border px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition-colors ${
                    topic === t.id
                      ? "border-emerald-500/60 bg-emerald-500/10 text-white"
                      : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
              2 · Pick a tone
            </p>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Tone">
              {HOOK_TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  aria-pressed={tone === t.id}
                  className={`rounded-sm border px-3 py-2.5 text-sm font-semibold transition-colors ${
                    tone === t.id
                      ? "border-emerald-500/60 bg-emerald-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
              3 · Keep the winners
            </p>
            <ul className="space-y-2">
              {hooks.map((h) => {
                const saved = kept.includes(h)
                return (
                  <li key={h}>
                    <button
                      type="button"
                      onClick={() => keep(h)}
                      aria-pressed={saved}
                      className={`flex w-full items-start gap-3 rounded-sm border px-4 py-3 text-left transition-colors ${
                        saved
                          ? "border-emerald-500/50 bg-emerald-500/[0.08]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                          saved ? "border-emerald-500 bg-emerald-500 text-zinc-950" : "border-zinc-600 text-transparent"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-zinc-200">{h}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="mt-2 font-mono text-[10px] tracking-wider text-zinc-600 uppercase">
              Kept {kept.length}/3 · feeds the queue draft below
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
              <Megaphone className="h-3.5 w-3.5 text-emerald-400" /> Caption draft
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={caption}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="text-sm leading-relaxed text-zinc-300"
              >
                {caption}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
              <Clapperboard className="h-3.5 w-3.5 text-emerald-400" /> Script beats
            </p>
            <ul className="space-y-2">
              {script.map((s) => (
                <li key={s.beat} className="flex gap-3 text-sm">
                  <span className="w-20 shrink-0 font-mono text-[11px] text-emerald-300 tabular-nums">
                    {s.beat}
                  </span>
                  <span className="text-zinc-300">{s.line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkflowTabs() {
  const [active, setActive] = useState<string>(MODULES[0].id)
  const mod = MODULES.find((m) => m.id === active) ?? MODULES[0]
  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-950">
      <div className="flex gap-2 overflow-x-auto border-b border-white/10 p-3" role="tablist" aria-label="Workspace modules">
        {MODULES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={active === m.id}
            onClick={() => setActive(m.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition-colors ${
              active === m.id
                ? "border-emerald-500/60 bg-emerald-500/10 text-white"
                : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-200"
            }`}
          >
            <m.icon className="h-3.5 w-3.5" />
            {m.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 p-5 md:p-6 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">{mod.title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">{mod.body}</p>
            <ul className="space-y-2">
              {mod.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-emerald-500/25 bg-emerald-500/[0.06] p-4">
            <p className="mb-3 font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
              Pipeline position
            </p>
            <ol className="space-y-2">
              {PIPELINE.map((step, i) => {
                const pos = MODULES.findIndex((m) => m.id === mod.id)
                const hot = i === Math.min(pos + 1, PIPELINE.length - 1)
                return (
                  <li key={step} className="flex items-center gap-2.5 text-sm">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] ${hot ? "bg-emerald-500 text-zinc-950" : "border border-white/15 text-zinc-500"}`}>
                      {i + 1}
                    </span>
                    <span className={hot ? "font-semibold text-white" : "text-zinc-500"}>{step}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="overflow-hidden rounded-sm border border-white/10">
      {FAQS.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className={i > 0 ? "border-t border-white/10" : undefined}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 bg-zinc-950 px-5 py-4 text-left transition-colors hover:bg-zinc-900"
            >
              <span className="text-sm font-semibold text-white md:text-base">{f.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="c"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-white/5 bg-zinc-950/60 px-5 py-4 text-sm leading-relaxed text-zinc-400">
                    {f.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function ContentForgeCaseStudy() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#08080A] font-sans text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      <motion.div className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-emerald-500" style={{ scaleX }} />
      <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-wider text-zinc-300 uppercase">
                {b === "Experimental" ? <FlaskConical className="h-3 w-3 text-emerald-400" /> : null}{b}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-6xl leading-none font-bold tracking-tight text-white md:text-9xl">
            ContentForge
          </h1>
          <p className="mb-10 max-w-3xl text-lg leading-relaxed font-light text-zinc-300 md:text-2xl">
            AI Content Workspace for Faster Social Media Creation
          </p>
          <div className="flex flex-wrap items-center gap-6 border-t border-zinc-800/80 pt-4">
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition-colors duration-200 hover:bg-emerald-400">
              <span>Open live workspace</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider text-zinc-400 uppercase">
              <div><span className="block text-zinc-600">Build</span>React · experimental</div>
              <div><span className="block text-zinc-600">Surface</span>Desktop-first</div>
              <div><span className="block text-zinc-600">Status</span>In progress</div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-emerald-950/20">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex w-full max-w-md items-center justify-center gap-2 rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-1 font-mono text-xs text-zinc-400">
                <span className="truncate">contentforge-official.netlify.app</span>
              </div>
              <div className="hidden font-mono text-xs text-zinc-600 sm:block">LIVE BUILD</div>
            </div>
            <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden bg-[#08080A]">
              <Image src={PREVIEW_SRC} alt="ContentForge — AI Content Workspace for Social Media Creation" fill sizes="(max-width: 1024px) 100vw, 1100px" quality={80} className="object-cover object-top" priority={false} />
            </div>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <SectionHead index="01 // Problem" title="Consistency dies in the gaps between apps" lede="Creating social content sounds simple until you do it every week. The work fragments across four contexts, and every handoff is a place where momentum dies." />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FRAGMENTS.map((f, i) => (
            <Reveal key={f.app} delay={i * 0.05}>
              <div className="h-full rounded-sm border border-dashed border-zinc-700 bg-zinc-900/40 p-5">
                <p className="font-mono text-[11px] tracking-wider text-zinc-600 uppercase">Context 0{i + 1}</p>
                <p className="mt-1 text-base font-semibold text-zinc-300">{f.app}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{f.pain}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 border-l-2 border-emerald-500 pl-5 text-xl leading-snug font-bold tracking-tight text-white md:text-2xl">
            What if the entire process could happen in one place?
          </p>
        </Reveal>
      </section>
      <section className="mx-auto mb-20 max-w-7xl space-y-6 px-6">
        <SectionHead index="02 // Workspace" title="One pipeline, four modules" lede="Idea to planned post in five stages: Idea, Generate, Refine, Organize, Plan. Switch tabs to walk the workspace." />
        <Reveal><WorkflowTabs /></Reveal>
        <Reveal><HookLab /></Reveal>
      </section>
      <section className="mb-20 border-y border-zinc-800/80 bg-zinc-950/60 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead index="03 // Engineering" title="Minimal by design" lede="No decorative AI-startup chrome. A clean product surface centered on content, with a fresh green identity: Focused, Creative, Practical, Modern." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05}>
                <div className="rounded-sm border border-white/10 bg-zinc-900/60 p-5">
                  <m.icon className="mb-3 h-5 w-5 text-emerald-400" />
                  <p className="text-2xl font-bold text-white">{m.value}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">{m.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{m.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {STACK.map((tool) => (
              <span key={tool} className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-white">{tool}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <SectionHead index="04 // Retrospective" title="Friction beats features" />
        <Reveal>
          <blockquote className="mt-6 rounded-sm border border-emerald-500/25 bg-emerald-500/[0.06] p-6 text-lg leading-relaxed font-light text-zinc-200 md:p-8 md:text-2xl">
            The biggest lesson from ContentForge wasn&apos;t about generating content with AI. It was about reducing friction. Adding more AI features doesn&apos;t automatically make a product better.
          </blockquote>
        </Reveal>
        <div className="mt-6"><Reveal><Faq /></Reveal></div>
      </section>
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-950 p-6 md:p-10">
            <p className="mb-3 font-mono text-xs tracking-widest text-emerald-400 uppercase">Outro</p>
            <p className="max-w-3xl text-lg leading-relaxed font-light text-zinc-200 md:text-2xl">
              ContentForge started as a simple question: Can AI make content creation feel less fragmented? I&apos;m still figuring out the answer. And that&apos;s exactly why I built it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition-colors duration-200 hover:bg-emerald-400">
                <span>Try Live Desktop App</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 font-mono text-xs tracking-wider text-zinc-300 uppercase transition-colors hover:border-emerald-500/50 hover:text-white">
                Back to Portfolio
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <footer className="border-t border-zinc-800/80 bg-[#08080A] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <span className="mb-1 block font-mono text-xs tracking-widest text-zinc-500 uppercase">Next case study</span>
            <Link className="text-2xl font-bold text-white transition-colors hover:text-emerald-400 md:text-3xl" href="/projects/nebula">Nebula Digital Agency &rarr;</Link>
          </div>
          <Link className="rounded-full border border-zinc-800 px-6 py-3 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white" href="/projects/movemate-moving-planner">&larr; MoveMate</Link>
        </div>
      </footer>
    </div>
  )
}


