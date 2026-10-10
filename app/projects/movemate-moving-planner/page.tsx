"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import {
  ArrowUpRight,
  Box,
  Calculator,
  Check,
  ChevronDown,
  ClipboardList,
  Cpu,
  Gauge,
  Layers,
  ListChecks,
  Route,
  Smartphone,
  Sparkles,
  TriangleAlert,
  Wallet,
} from "lucide-react"

const TAGS = [
  "Web App",
  "Moving Planner",
  "Productivity Tool",
  "Devin AI Engine",
  "Vanilla JS Engine",
] as const

const METRICS = [
  { label: "Framework payload", value: "0 KB", detail: "No frameworks, no libraries", icon: Cpu },
  { label: "Runtime dependencies", value: "0", detail: "HTML + CSS + vanilla JS", icon: Layers },
  { label: "Motion budget", value: "60 FPS", detail: "transform-gpu micro-interactions", icon: Gauge },
  { label: "Layout model", value: "Mobile-first", detail: "Run moving day from a phone", icon: Smartphone },
] as const

const STACK = [
  "HTML5",
  "Vanilla CSS3 · custom design tokens",
  "Modular Vanilla JS",
  "Devin AI · initial structural draft",
  "Custom prompting · UX polish pass",
  "Mobile-first responsive layout",
] as const

const ROADMAP = [
  "LocalStorage saved state, then user auth",
  "PDF / CSV exportable moving plans",
  "Smart distance-based cost algorithms",
  "Task push reminders",
  "Multi-move dashboard support",
] as const

const FAQS = [
  {
    q: "What is MoveMate?",
    a: "MoveMate is a moving planner web app that keeps an entire move in one place: a structured task checklist, a task tracker, an interactive cost estimator, and a visual timeline — so moving day runs off a plan instead of scattered notes and spreadsheets.",
  },
  {
    q: "Who is MoveMate for?",
    a: "Anyone planning a move — renters, families, and first-time movers — who wants calm, step-by-step structure. The layout is mobile-first, so tasks can be checked off on-site from a smartphone.",
  },
  {
    q: "What technologies were used?",
    a: "HTML5, vanilla CSS3 with custom design tokens, and modular vanilla JavaScript. There is zero framework bloat: fast payload, clean DOM, and lightweight optimized interactions.",
  },
  {
    q: "How was AI used in the build?",
    a: "Devin AI produced the initial structural draft, then custom AI prompting drove refinement and UX polish — spacing, typography, responsive behavior, and feature integration — so every module feels like one cohesive product rather than disjointed generated cards.",
  },
] as const

type TierId = "diy" | "hybrid" | "full"

const TIERS: readonly { id: TierId; label: string; blurb: string }[] = [
  { id: "diy", label: "DIY", blurb: "You pack, you haul" },
  { id: "hybrid", label: "Hybrid", blurb: "Pros load, you pack" },
  { id: "full", label: "Full service", blurb: "Pack + move + unload" },
]

function estimate(rooms: number, miles: number, tier: TierId) {
  const truck = Math.round(
    89 + rooms * 42 + miles * 0.62 * (tier === "diy" ? 1 : tier === "hybrid" ? 1.12 : 1.3)
  )
  const materials = Math.round(24 + rooms * 31)
  const labor =
    tier === "diy"
      ? 0
      : tier === "hybrid"
        ? Math.round(140 + rooms * 85)
        : Math.round(320 + rooms * 180 + miles * 0.4)
  return { truck, materials, labor, total: truck + materials + labor }
}

const fmtUSD = (n: number) => `$${n.toLocaleString("en-US")}`

type Phase = { id: string; label: string; window: string; tasks: readonly string[] }

const PHASES: readonly Phase[] = [
  {
    id: "four-weeks",
    label: "4 Weeks Before",
    window: "T-28 → T-14",
    tasks: [
      "Declutter room by room — donate, sell, bin",
      "Get quotes and lock a moving date",
      "Order boxes, tape, and mattress covers",
      "Notify landlord / confirm lease dates",
      "Start a moving-day essentials box",
    ],
  },
  {
    id: "one-week",
    label: "1 Week Before",
    window: "T-07 → T-01",
    tasks: [
      "Pack non-essentials and label every box",
      "Confirm movers, truck, and arrival time",
      "File change-of-address + transfer utilities",
      "Photograph electronics cable setups",
      "Defrost freezer and use up perishables",
    ],
  },
  {
    id: "moving-day",
    label: "Moving Day",
    window: "T-00",
    tasks: [
      "Walk rooms with the checklist — nothing left",
      "Protect floors, doors, and railings",
      "Load heavy first, strap, fill gaps",
      "Meter readings + final photos of old place",
      "Hand over keys, collect receipts",
    ],
  },
  {
    id: "post-move",
    label: "Post-Move",
    window: "T+01 → T+14",
    tasks: [
      "Unpack essentials box + beds first",
      "Connect utilities and test appliances",
      "Update address: bank, ID, subscriptions",
      "Break down boxes, recycle packing",
      "Rate movers, close out the budget",
    ],
  },
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
      <p className="mb-3 font-mono text-xs tracking-widest text-orange-400 uppercase">
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

function CostEstimator() {
  const [rooms, setRooms] = useState(2)
  const [miles, setMiles] = useState(25)
  const [tier, setTier] = useState<TierId>("hybrid")
  const cost = estimate(rooms, miles, tier)
  const tierLabel = TIERS.find((t) => t.id === tier)?.label
  const rows = [
    { label: "Truck + mileage", value: cost.truck, hint: "Base + rooms + distance" },
    { label: "Packing materials", value: cost.materials, hint: "Boxes, tape, covers" },
    { label: "Labor", value: cost.labor, hint: tier === "diy" ? "Your crew: $0" : "Load + unload crew" },
  ]
  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-orange-400" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">Cost estimator sandbox</span>
        </div>
        <span className="rounded-sm bg-orange-500/15 px-2 py-0.5 font-mono text-[10px] tracking-wider text-orange-300 uppercase">Live</span>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-2 md:p-6">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase">
              <label htmlFor="mm-rooms" className="tracking-wider text-zinc-400">Room count</label>
              <span className="text-white">{rooms >= 5 ? "5+ rooms" : `${rooms} room${rooms > 1 ? "s" : ""}`}</span>
            </div>
            <input id="mm-rooms" type="range" min={1} max={5} step={1} value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className="w-full accent-orange-500" />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-600"><span>1</span><span>5+</span></div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase">
              <label htmlFor="mm-miles" className="tracking-wider text-zinc-400">Est. distance</label>
              <span className="text-white">{miles} mi</span>
            </div>
            <input id="mm-miles" type="range" min={2} max={500} step={1} value={miles} onChange={(e) => setMiles(Number(e.target.value))} className="w-full accent-orange-500" />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-600"><span>2 mi</span><span>500 mi</span></div>
          </div>
          <div>
            <span id="mm-tier-label" className="mb-2 block font-mono text-[11px] tracking-wider text-zinc-400 uppercase">Service tier</span>
            <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="mm-tier-label">
              {TIERS.map((t) => (
                <button key={t.id} type="button" onClick={() => setTier(t.id)} aria-pressed={tier === t.id}
                  className={`rounded-sm border px-2 py-2.5 text-left transition-colors ${tier === t.id ? "border-orange-500/60 bg-orange-500/10" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}>
                  <span className={`block text-xs font-semibold ${tier === t.id ? "text-white" : "text-zinc-300"}`}>{t.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-zinc-500">{t.blurb}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-sm border border-white/10 bg-white/[0.02] p-5">
          <p className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">Estimated total</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-white tabular-nums md:text-5xl">{fmtUSD(cost.total)}</p>
          <p className="mt-1 font-mono text-[11px] text-zinc-500">{rooms >= 5 ? "5+ rooms" : `${rooms} room${rooms > 1 ? "s" : ""}`} · {miles} mi · {tierLabel}</p>
          <ul className="mt-5 space-y-3 border-t border-white/10 pt-4">
            {rows.map((r) => (
              <li key={r.label}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-zinc-300">{r.label}</span>
                  <span className="font-mono text-white tabular-nums">{fmtUSD(r.value)}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-orange-500 transform-gpu"
                    animate={{ width: `${cost.total > 0 ? Math.max((r.value / cost.total) * 100, 2) : 0}%` }}
                    transition={{ type: "spring", stiffness: 160, damping: 24 }} />
                </div>
                <p className="mt-1 font-mono text-[10px] tracking-wider text-zinc-600 uppercase">{r.hint}</p>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-4 font-mono text-[10px] leading-relaxed tracking-wider text-zinc-600 uppercase">Demo model — flat illustration, not a quote engine</p>
        </div>
      </div>
    </div>
  )
}

function TimelineStepper() {
  const [phaseId, setPhaseId] = useState<string>(PHASES[0].id)
  const [done, setDone] = useState<Record<string, boolean>>({})
  const phase = PHASES.find((p) => p.id === phaseId) ?? PHASES[0]
  const totalTasks = PHASES.reduce((n, p) => n + p.tasks.length, 0)
  const doneCount = Object.values(done).filter(Boolean).length
  const pct = Math.round((doneCount / totalTasks) * 100)
  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-orange-400" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">Timeline + checklist stepper</span>
        </div>
        <span className="font-mono text-[11px] text-zinc-400 tabular-nums">{doneCount}/{totalTasks} · {pct}%</span>
      </div>
      <div className="px-5 pt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-orange-500 transform-gpu" animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 160, damping: 24 }} />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto p-5 pb-2" role="tablist" aria-label="Moving phases">
        {PHASES.map((p) => (
          <button key={p.id} type="button" role="tab" aria-selected={phaseId === p.id} onClick={() => setPhaseId(p.id)}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition-colors ${phaseId === p.id ? "border-orange-500/60 bg-orange-500/10 text-white" : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-200"}`}>
            {p.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={phase.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-2 p-5 pt-3">
          <li className="flex items-center justify-between pb-1 font-mono text-[10px] tracking-wider text-zinc-600 uppercase">
            <span>{phase.label} · {phase.window}</span>
            <span>{phase.tasks.filter((_, i) => done[`${phase.id}-${i}`]).length}/{phase.tasks.length} done</span>
          </li>
          {phase.tasks.map((task, i) => {
            const key = `${phase.id}-${i}`
            const checked = !!done[key]
            return (
              <li key={key}>
                <button type="button" onClick={() => setDone((prev) => ({ ...prev, [key]: !prev[key] }))} aria-pressed={checked}
                  className={`flex w-full items-start gap-3 rounded-sm border px-4 py-3 text-left transition-colors ${checked ? "border-orange-500/40 bg-orange-500/[0.07]" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}>
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors ${checked ? "border-orange-500 bg-orange-500 text-zinc-950" : "border-zinc-600 text-transparent"}`}>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className={`text-sm ${checked ? "text-zinc-500 line-through" : "text-zinc-200"}`}>{task}</span>
                </button>
              </li>
            )
          })}
        </motion.ul>
      </AnimatePresence>
    </div>
  )
}

function SlopToggle() {
  const [view, setView] = useState<"raw" | "refined">("refined")
  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-orange-400" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">AI slop vs product polish</span>
        </div>
        <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-1" role="group" aria-label="Compare outputs">
          {(["raw", "refined"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors ${view === v ? "bg-orange-500 text-zinc-950" : "text-zinc-500 hover:text-zinc-200"}`}>
              {v === "raw" ? "Raw AI" : "Refined"}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {view === "raw" ? (
          <motion.div key="raw" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="grid gap-3 p-5 md:grid-cols-3">
            {[
              { t: "Checklist Card", d: "Tasks live here. Maybe. Spacing TBD." },
              { t: "Cost Widget?", d: "A number appears. No units. Good luck." },
              { t: "Timeline Box", d: "Steps in a row. None of them connect." },
            ].map((c) => (
              <div key={c.t} className="rounded-sm border border-dashed border-zinc-700 bg-zinc-900/40 p-4">
                <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-zinc-400"><TriangleAlert className="h-3.5 w-3.5 text-zinc-500" />{c.t}</p>
                <p className="text-xs leading-relaxed text-zinc-600">{c.d}</p>
                <p className="mt-3 font-mono text-[10px] tracking-wider text-zinc-700 uppercase">No system · no states · no scale</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="refined" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="p-5">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { icon: ClipboardList, t: "One checklist language", d: "Same checkbox, same spacing, every phase." },
                { icon: Wallet, t: "One money language", d: "Itemized tally with units on every row." },
                { icon: Route, t: "One timeline language", d: "Phases connect; progress is always visible." },
              ].map((c) => (
                <div key={c.t} className="rounded-sm border border-orange-500/25 bg-orange-500/[0.06] p-4">
                  <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-white"><c.icon className="h-3.5 w-3.5 text-orange-400" />{c.t}</p>
                  <p className="text-xs leading-relaxed text-zinc-400">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] leading-relaxed tracking-wider text-zinc-500 uppercase">Refinement = tokens, spacing rhythm, shared states — the sandbox widgets above run this system</p>
          </motion.div>
        )}
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
            <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 bg-zinc-950 px-5 py-4 text-left transition-colors hover:bg-zinc-900">
              <span className="text-sm font-semibold text-white md:text-base">{f.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-orange-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <p className="border-t border-white/5 bg-zinc-950/60 px-5 py-4 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function MoveMateCaseStudy() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <div className="relative min-h-screen bg-[#08080A] font-sans text-zinc-100 selection:bg-orange-500 selection:text-zinc-950">
      <motion.div className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-orange-500" style={{ scaleX }} />
      <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <div className="mb-6 flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-wider text-zinc-300 uppercase">{t}</span>
            ))}
          </div>
          <h1 className="mb-6 max-w-4xl text-4xl leading-tight font-bold tracking-tight text-white md:text-7xl">MoveMate — Moving Planner Web App Case Study</h1>
          <p className="mb-10 max-w-3xl text-lg leading-relaxed font-light text-zinc-300 md:text-2xl">One calm place to plan a move: checklist, task tracker, cost estimator, and timeline — no scattered notes, no spreadsheet chaos.</p>
          <div className="flex flex-wrap items-center gap-6 border-t border-zinc-800/80 pt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-zinc-950">
              <span>Live demo on this page</span><ArrowUpRight className="h-4 w-4" />
            </span>
            <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider text-zinc-400 uppercase">
              <div><span className="block text-zinc-600">Role</span>Product design + build</div>
              <div><span className="block text-zinc-600">Engine</span>Vanilla JS</div>
              <div><span className="block text-zinc-600">AI</span>Devin · draft + polish</div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-orange-950/20">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex w-full max-w-md items-center justify-center gap-2 rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-1 font-mono text-xs text-zinc-400"><Box className="h-3 w-3 text-orange-400" /><span>movemate · planner build</span></div>
              <div className="hidden font-mono text-xs text-zinc-600 sm:block">VANILLA JS</div>
            </div>
            <div className="relative aspect-[16/9] max-h-[500px] w-full overflow-hidden bg-[#08080A]">
              <Image src="/movemate-ss.png" alt="MoveMate — Interactive Moving Planner & Expense Estimator App" fill sizes="(max-width: 1024px) 100vw, 1100px" quality={80} className="object-cover object-top" priority={false} />
            </div>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto mb-20 grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-widest text-orange-400 uppercase">01 // The problem</p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Moving fails on small details</h2>
          <p className="text-sm leading-relaxed text-zinc-400 md:text-base">Packing, budgeting, booking transport, changing addresses — a move is a hundred small tasks scattered across notes, spreadsheets, and random reminders. Without one structured plan, the stress compounds exactly when there is no time left.</p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mb-3 font-mono text-xs tracking-widest text-orange-400 uppercase">02 // The solution</p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">A real product, not a marketing page</h2>
          <p className="text-sm leading-relaxed text-zinc-400 md:text-base">MoveMate brings the checklist, task tracker, cost estimator, and timeline into one calm tool. Clear structure over decorative bloat: readable contrast, tactile interactions, and modules that feel like they belong to a single product system.</p>
        </Reveal>
      </section>
      <section className="mx-auto mb-20 max-w-7xl space-y-6 px-6">
        <SectionHead index="03 // Live sandbox" title="Try the product logic, right here" lede="The estimator and the checklist below run the same interaction model as the app: sliders with instant itemized math, and a phased checklist with persistent-feeling progress." />
        <Reveal><CostEstimator /></Reveal>
        <Reveal><TimelineStepper /></Reveal>
      </section>
      <section className="mx-auto mb-20 max-w-7xl space-y-6 px-6">
        <SectionHead index="04 // Core challenge" title="Beating AI Slop Syndrome" lede="Generated interfaces look clean until you use them: mismatched cards, dead states, no system. The fix was unglamorous — spacing rhythm, one type scale, shared tokens, responsive rules — until every module read as one product." />
        <Reveal><SlopToggle /></Reveal>
      </section>
      <section className="mb-20 border-y border-zinc-800/80 bg-zinc-950/60 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead index="05 // Performance" title="Zero framework bloat" lede="Fast payload, clean DOM, lightweight optimized interactions — nothing ships that the move does not need." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05}>
                <div className="rounded-sm border border-white/10 bg-zinc-900/60 p-5">
                  <m.icon className="mb-3 h-5 w-5 text-orange-400" />
                  <p className="text-2xl font-bold text-white">{m.value}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">{m.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{m.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto mb-20 grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
        <div>
          <SectionHead index="06 // Stack" title="Built lean on purpose" />
          <div className="mt-6 flex flex-wrap gap-2.5">
            {STACK.map((tool) => (
              <span key={tool} className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-white">{tool}</span>
            ))}
          </div>
        </div>
        <div className="rounded-sm border border-white/10 bg-zinc-950 p-6">
          <p className="mb-4 font-mono text-[11px] tracking-wider text-orange-400 uppercase">Roadmap — what ships next</p>
          <ul className="space-y-2.5">
            {ROADMAP.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-zinc-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />{r}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <SectionHead index="07 // FAQ" title="Answers, straight" />
        <div className="mt-6"><Reveal><Faq /></Reveal></div>
      </section>
      <footer className="border-t border-zinc-800/80 bg-[#08080A] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <span className="mb-1 block font-mono text-xs tracking-widest text-zinc-500 uppercase">
              Next case study
            </span>
            <Link className="text-2xl font-bold text-white transition-colors hover:text-orange-400 md:text-3xl" href="/projects/contentforge">ContentForge &rarr;</Link>
          </div>
          <Link className="rounded-full border border-zinc-800 px-6 py-3 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white" href="/projects/sparkle-clean-chandpur">&larr; Sparkle Clean</Link>
        </div>
      </footer>
    </div>
  )
}
