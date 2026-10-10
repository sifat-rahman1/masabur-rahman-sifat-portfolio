"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { MotionConfig, motion, useScroll, useSpring } from "motion/react"
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Cpu,
  Eye,
  FileCode2,
  Gauge,
  Layers,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react"

import {
  SPARKLE_LOCAL_BUSINESS,
  SPARKLE_LOCAL_BUSINESS_JSON,
} from "@/lib/sparkle-schema"

const PREVIEW_SRC = "/sparkleclean-ss.png"
const BASE_MESSAGE =
  "Hello Sparkle Clean! I would like to book a cleaning visit in Chandpur."

const TAGS = ["Local Business", "Landing Page", "Performance", "Accessibility"] as const

const METRICS = [
  { label: "Runtime dependencies", value: "0", detail: "No frameworks, no libraries", icon: Cpu },
  { label: "Total site weight", value: "~75 KB", detail: "HTML + CSS + JS + SVG", icon: Gauge },
  { label: "Hero asset compression", value: "86%", detail: "451 KB to 62.6 KB", icon: Zap },
  { label: "WCAG contrast pairs", value: "12/12", detail: "AA and AAA pass rate", icon: ShieldCheck },
  { label: "SVG sprite efficiency", value: "20/79", detail: "Symbols and total uses", icon: Layers },
] as const

const TIERS = [
  {
    name: "Essential",
    price: "৳800",
    unit: "/ visit",
    blurb: "Studio and 1-bed refresh: dusting, bath, floors, kitchen wipe-down.",
    points: ["45 to 60 min visit", "Bath and kitchen reset", "Floors vacuumed and mopped"],
    featured: false,
  },
  {
    name: "Deep Clean",
    price: "৳1,800",
    unit: "/ visit",
    blurb: "Whole-home reset for 2 to 3 beds, including cabinets and grout.",
    points: ["2 to 3 hr visit", "Inside cabinets and grout", "Windows and balcony", "Before and after photos"],
    featured: true,
  },
  {
    name: "Move / Event",
    price: "Custom",
    unit: "quote",
    blurb: "Move-in, move-out, and post-event cleans scoped over WhatsApp.",
    points: ["Scoped by photos", "Team of 2 to 3", "Same-week slots"],
    featured: false,
  },
] as const

type TierName = (typeof TIERS)[number]["name"]

/** Payload facts, straight from the production build. */
const RAW_HERO_KB = 451
const SHIPPED_HERO_KB = 62.6
const HERO_CUT_PERCENT = Math.round((1 - SHIPPED_HERO_KB / RAW_HERO_KB) * 100)
const HERO_SPEEDUP = (RAW_HERO_KB / SHIPPED_HERO_KB).toFixed(1)
const SHIPPED_BAR_WIDTH = `${((SHIPPED_HERO_KB / RAW_HERO_KB) * 100).toFixed(1)}%`

/** Bandwidth presets for the payload analyzer, in kilobits per second. */
const MIN_KBPS = 400
const MAX_KBPS = 12000
const NETWORK_PRESETS = [
  { label: "3G", kbps: MIN_KBPS },
  { label: "4G", kbps: 2500 },
  { label: "Wi-Fi", kbps: MAX_KBPS },
] as const

/** Log scale, so the low end, where the difference shows, gets half the track. */
function kbpsToSlider(kbps: number) {
  return (Math.log(kbps / MIN_KBPS) / Math.log(MAX_KBPS / MIN_KBPS)) * 100
}

function sliderToKbps(position: number) {
  return MIN_KBPS * Math.pow(MAX_KBPS / MIN_KBPS, position / 100)
}

function transferSeconds(kilobytes: number, kbps: number) {
  return (kilobytes * 8) / kbps
}

function formatSeconds(seconds: number) {
  if (seconds >= 1) return `${seconds.toFixed(1)} s`
  return `${Math.round(seconds * 1000)} ms`
}

function formatBandwidth(kbps: number) {
  if (kbps >= 1000) return `${(kbps / 1000).toFixed(1)} Mbps`
  return `${Math.round(kbps)} Kbps`
}

const BOOKING_CODE = `// booking.js — pre-filled WhatsApp first, email as backup
const MESSAGE = "Hello Sparkle Clean! I would like to book a cleaning visit in Chandpur.";

function bookingHref(tier) {
  const text = encodeURIComponent(MESSAGE + " Tier: " + tier + ".");
  return "https://api.whatsapp.com/send?text=" + text;
}

document.querySelectorAll("[data-book]").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(bookingHref(button.dataset.book), "_blank", "noopener");
  });
});`

const SPRITE_CODE = `<!-- sprite.svg — 20 symbols, referenced 79 times, zero icon fonts -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="i-check" viewBox="0 0 24 24">
    <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="i-wa" viewBox="0 0 24 24"><!-- WhatsApp glyph --></symbol>
  <!-- 18 more symbols: tiers, badges, arrows, dividers -->
</svg>

<!-- usage: one request, then pure reference -->
<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>`

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

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <>
      <p className="mb-3 font-mono text-xs tracking-widest text-cyan-400 uppercase">{index}</p>
      <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </>
  )
}

function BookingSimulator() {
  const [tier, setTier] = useState<TierName>("Deep Clean")
  const [sent, setSent] = useState(false)
  const message = `${BASE_MESSAGE} Tier: ${tier}.`
  const href = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`

  return (
    <div className="rounded-sm border border-zinc-800/90 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-cyan-300" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
            Booking flow simulator
          </span>
        </div>
        <span className="rounded-sm bg-cyan-400/15 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
          Interactive
        </span>
      </div>
      <p className="mb-4 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
        1 · Pick a tier
      </p>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Service tier">
        {TIERS.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => {
              setTier(t.name)
              setSent(false)
            }}
            aria-pressed={tier === t.name}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              tier === t.name
                ? "border-cyan-300 bg-cyan-300 text-zinc-950"
                : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <p className="mb-2 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
        2 · Message preview
      </p>
      <div className="mb-6 rounded-sm rounded-tl-sm border border-zinc-800 bg-zinc-950 p-4">
        <p className="text-sm leading-relaxed text-zinc-200">{message}</p>
        <p className="mt-2 text-right font-mono text-[10px] text-zinc-600">pre-filled · editable in WhatsApp</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setSent(true)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-cyan-200"
      >
        <MessageCircle className="h-4 w-4" />
        Open WhatsApp with this message
      </a>
      <p className="mt-3 text-center font-mono text-[11px] text-zinc-500" role="status" aria-live="polite">
        {sent ? "Opened share sheet — no message sent from this page." : "Demo only — nothing is sent until you press send in WhatsApp."}
      </p>
    </div>
  )
}

function PayloadAnalyzer() {
  const [kbps, setKbps] = useState(2500)
  const rawSeconds = transferSeconds(RAW_HERO_KB, kbps)
  const shippedSeconds = transferSeconds(SHIPPED_HERO_KB, kbps)

  return (
    <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-cyan-300" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
            Payload analyzer
          </span>
        </div>
        <span className="rounded-sm bg-cyan-400/15 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
          Interactive
        </span>
      </div>

      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Network preset"
      >
        {NETWORK_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setKbps(preset.kbps)}
            aria-pressed={Math.round(kbps) === preset.kbps}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              Math.round(kbps) === preset.kbps
                ? "border-cyan-300 bg-cyan-300 text-zinc-950"
                : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
          <span className="text-zinc-500">Simulated bandwidth</span>
          <span className="text-cyan-300">{formatBandwidth(kbps)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={kbpsToSlider(kbps)}
          onChange={(event) => setKbps(sliderToKbps(Number(event.target.value)))}
          aria-label="Simulated network bandwidth"
          className="w-full cursor-pointer accent-cyan-300"
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-600">
          <span>400 Kbps</span>
          <span>12 Mbps</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
            <span className="text-zinc-500">Raw handoff</span>
            <span className="text-zinc-400">451 KB</span>
          </div>
          <div className="font-mono text-3xl font-extrabold text-zinc-300">
            {formatSeconds(rawSeconds)}
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-full rounded-full bg-zinc-600" />
          </div>
          <p className="mt-3 font-mono text-[10px] text-zinc-600">
            Hero plate, uncropped source
          </p>
        </div>

        <div className="rounded-sm border border-cyan-400/40 bg-zinc-900/50 p-5">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
            <span className="text-cyan-300">Shipped build</span>
            <span className="text-zinc-400">62.6 KB</span>
          </div>
          <div className="font-mono text-3xl font-extrabold text-white">
            {formatSeconds(shippedSeconds)}
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: SHIPPED_BAR_WIDTH }}
              className="h-full origin-left transform-gpu rounded-full bg-gradient-to-r from-cyan-400 to-teal-300"
            />
          </div>
          <p className="mt-3 font-mono text-[10px] text-cyan-300/80">
            {HERO_CUT_PERCENT}% smaller, cropped and compressed
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] text-cyan-300">
          {HERO_SPEEDUP}x faster hero transfer
        </span>
        <span className="font-mono text-[11px] text-zinc-500">
          0 runtime dependencies · ~75 KB total
        </span>
      </div>
      <p className="mt-3 font-mono text-[10px] text-zinc-600">
        Estimated from byte counts at the simulated bandwidth. Cold cache, no
        latency modeling.
      </p>
    </div>
  )
}

/** Field kinds for the inspector's structured view. */
const SCHEMA_FIELD_TYPES: Record<string, string> = {
  "@context": "Namespace",
  "@type": "Entity",
  name: "Text",
  description: "Text",
  areaServed: "Place",
  priceRange: "Text",
  image: "URL",
  url: "URL",
}

function formatSchemaValue(value: unknown) {
  if (typeof value === "string") return value
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, entry]) => `${key}: ${String(entry)}`)
      .join(" · ")
  }
  return String(value)
}

function SchemaInspector() {
  const [view, setView] = useState<"fields" | "raw">("fields")
  const entries = Object.entries(SPARKLE_LOCAL_BUSINESS)

  return (
    <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-cyan-300" />
          <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
            LocalBusiness JSON-LD
          </span>
        </div>
        <div
          className="flex items-center gap-1 rounded-sm border border-zinc-800 bg-zinc-950 p-0.5"
          role="tablist"
          aria-label="Schema payload view"
        >
          {(["fields", "raw"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={view === option}
              onClick={() => setView(option)}
              className={`rounded-sm px-3 py-1 font-mono text-[11px] transition-colors ${
                view === option
                  ? "bg-white/10 text-white"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {option === "fields" ? "Fields" : "Raw payload"}
            </button>
          ))}
        </div>
      </div>

      {view === "fields" ? (
        <dl className="divide-y divide-zinc-800/80">
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <dt className="shrink-0 font-mono text-[11px] text-cyan-300">
                {key}
              </dt>
              <dd className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-zinc-200">
                <span className="break-words">{formatSchemaValue(value)}</span>
                <span className="rounded-sm bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                  {SCHEMA_FIELD_TYPES[key] ?? "Value"}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <pre className="max-h-80 overflow-auto p-4 font-mono text-[11px] leading-relaxed text-zinc-300">
          <code>{SPARKLE_LOCAL_BUSINESS_JSON}</code>
        </pre>
      )}

      <div className="border-t border-zinc-800 px-4 py-3 font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
        Emitted with the server-rendered HTML of this page
      </div>
    </div>
  )
}

function ArchTabs() {
  const [tab, setTab] = useState<"booking" | "sprite">("booking")
  const code = tab === "booking" ? BOOKING_CODE : SPRITE_CODE
  const file = tab === "booking" ? "booking.js" : "sprite.svg"
  const Icon = tab === "booking" ? MessageCircle : FileCode2

  return (
    <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 px-4 py-2" role="tablist" aria-label="Implementation files">
        {(
          [
            { id: "booking", label: "booking.js", icon: MessageCircle },
            { id: "sprite", label: "sprite.svg", icon: FileCode2 },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-mono text-[11px] transition-colors ${
              tab === item.id ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-200"
            }`}
          >
            <item.icon className="h-3 w-3" />
            {item.label}
          </button>
        ))}
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] text-zinc-600 sm:inline-flex">
          <Icon className="h-3 w-3" />
          {file} · read-only
        </span>
      </div>
      <pre className="max-h-96 overflow-auto p-4 font-mono text-[11px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}


export default function SparkleCleanCaseStudy() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#08080A] font-sans text-zinc-100 selection:bg-cyan-400/30 selection:text-cyan-200">
        <motion.div
          className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400"
          style={{ scaleX }}
        />

        <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pt-32 pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_60%,transparent_100%)]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs tracking-wider text-cyan-300 uppercase">
                  <Smartphone className="h-3.5 w-3.5" />
                  Chandpur, BD
                </span>
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1 font-mono text-[11px] tracking-wider text-zinc-400 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mb-6 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl">
                Sparkle Clean — House Cleaning Service Landing Page
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed font-light text-zinc-300 md:text-xl">
                A fast, zero-dependency landing page for a local home cleaning
                service in Chandpur — clear service tiers, and a booking flow made
                for how people actually message businesses here: WhatsApp first.
              </p>
              <div className="flex flex-wrap items-center gap-6 border-t border-zinc-800/80 pt-6">
                <Link
                  href="/projects/sparkle-clean-chandpur/live"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-zinc-950 transition-colors duration-200 hover:bg-cyan-200"
                >
                  <span>Open live demo</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={PREVIEW_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-zinc-400 uppercase transition-colors hover:text-white"
                >
                  <span>View page screenshot</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider text-zinc-400 uppercase">
                  <div>
                    <span className="block text-zinc-600">Role</span> Design + build
                  </div>
                  <div>
                    <span className="block text-zinc-600">Stack</span> HTML / CSS / JS
                  </div>
                  <div>
                    <span className="block text-zinc-600">Booking</span> WhatsApp-first
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <div className="rounded-sm border border-zinc-800/90 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-4">
                    <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase">
                      Site weight budget
                    </span>
                    <span className="rounded-sm bg-cyan-400/15 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                      0 DEPS
                    </span>
                  </div>
                  <div className="mb-2 flex items-end justify-between">
                    <span className="font-mono text-5xl font-extrabold text-white">~75</span>
                    <span className="mb-1 font-mono text-sm text-zinc-400">KB total</span>
                  </div>
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-zinc-800" role="img" aria-label="Site weight: about 75 kilobytes">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300"
                    />
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-cyan-300" /> No runtime JS frameworks
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-cyan-300" /> Hero 451 KB to 62.6 KB
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-cyan-300" /> Icons: one sprite, 20 symbols
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </motion.div>
        </section>


        <section className="border-y border-zinc-800/80 bg-zinc-950/60 py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {METRICS.map((m) => (
                <Reveal key={m.label}>
                  <div className="h-full rounded-sm border border-zinc-800/70 bg-zinc-900/40 p-5 transition-colors hover:border-cyan-400/40">
                    <m.icon className="mb-3 h-5 w-5 text-cyan-300" />
                    <div className="font-mono text-2xl font-extrabold text-white md:text-3xl">{m.value}</div>
                    <div className="mt-1 text-xs font-semibold text-zinc-200">{m.label}</div>
                    <div className="mt-0.5 font-mono text-[10px] tracking-wide text-zinc-500 uppercase">{m.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            <Reveal>
              <div>
                <SectionHeading index="01 // Why it exists" title="Booking should feel like texting" />
                <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
                  Most local service sites fail because they load slowly on mobile
                  and make booking feel like work. Sparkle Clean opens instantly,
                  communicates clearly, and completes a booking request in seconds
                  via pre-filled WhatsApp messages.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md md:p-8">
                <SectionHeading index="02 // What visitors get" title="Three tiers, zero ambiguity" />
                <div className="grid gap-4 md:grid-cols-3">
                  {TIERS.map((tier) => (
                    <div
                      key={tier.name}
                      className={`flex flex-col rounded-sm border p-5 ${
                        tier.featured
                          ? "border-cyan-300/60 bg-zinc-950"
                          : "border-zinc-800 bg-zinc-950/60"
                      }`}
                    >
                      {tier.featured && (
                        <span className="mb-3 w-fit rounded-full bg-cyan-300 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-zinc-950 uppercase">
                          Most booked
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-white">{tier.name}</h3>
                      <p className="mt-1 font-mono text-2xl font-extrabold text-white">
                        {tier.price} <span className="text-xs font-normal text-zinc-500">{tier.unit}</span>
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400">{tier.blurb}</p>
                      <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">
                        {tier.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md">
                  <p className="mb-2 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">Typical local site</p>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>3–6s load on budget phones</li>
                    <li>Contact form nobody checks</li>
                    <li>PDF price list from 2019</li>
                    <li>No service-area clarity</li>
                  </ul>
                </div>
                <div className="rounded-sm border border-cyan-400/30 bg-zinc-900/60 p-6 backdrop-blur-md">
                  <p className="mb-2 font-mono text-[11px] tracking-wider text-cyan-300 uppercase">Sparkle Clean pipeline</p>
                  <ul className="space-y-2 text-sm text-zinc-200">
                    <li>Opens in ~1s on 4G</li>
                    <li>1-tap pre-filled WhatsApp</li>
                    <li>Tiers priced on the page</li>
                    <li>Chandpur areas named upfront</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <SectionHeading index="03 // Under the hood" title="100% native, hand-tuned" />
                <p className="mb-6 text-sm leading-relaxed text-zinc-400 md:text-base">
                  No frameworks, no animation libraries. Layout, transitions, and
                  tactile details are hand-tuned; Sharp CLI handles cropping and
                  srcset generation, and a 20-symbol SVG sprite covers 79 icon
                  uses without an icon font.
                </p>
                <ArchTabs />
              </div>
            </Reveal>
          </div>
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <BookingSimulator />
            </Reveal>
            <Reveal delay={0.05}>
              <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">sparkle-clean / home</span>
                </div>
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={PREVIEW_SRC}
                    alt="Sparkle Clean — Local Home Cleaning Service App in Chandpur, Bangladesh"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    quality={80}
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3 font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-3 w-3" /> Live layout reference
                  </span>
                  <span>~75 KB</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <Reveal>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionHeading
                  index="04 // Payload"
                  title="The whole site weighs less than one raw hero"
                />
              </div>
              <p className="max-w-md text-sm leading-relaxed text-zinc-400">
                The hero plate ships 86% lighter after a re-crop and a Sharp CLI
                compression pass: 451 KB at the source, 62.6 KB in the build. The
                markup, styles, script and sprite fit in the remaining 12 KB.
                Move the bandwidth slider to see what that buys on a phone in
                Chandpur.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <PayloadAnalyzer />
          </Reveal>
        </section>

        <section className="border-t border-zinc-800/80 bg-zinc-950/60 py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                index="05 // Local SEO + access"
                title="Built to be found and read in Chandpur"
              />
              <div className="mb-4">
                <SchemaInspector />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-5">
                  <BadgeCheck className="mb-3 h-5 w-5 text-cyan-300" />
                  <h3 className="mb-1 text-sm font-bold text-white">Alt text everywhere</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    Every tier image and icon carries a plain-language description.
                  </p>
                </div>
                <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-5">
                  <ShieldCheck className="mb-3 h-5 w-5 text-cyan-300" />
                  <h3 className="mb-1 text-sm font-bold text-white">12/12 contrast pairs</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    Text, badges, and CTAs pass AA or AAA at every size used.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="h-full rounded-sm border border-cyan-400/25 bg-gradient-to-br from-zinc-900 to-cyan-950/30 p-6 md:p-8">
                <p className="mb-2 font-mono text-[11px] tracking-wider text-cyan-300 uppercase">Roadmap</p>
                <h3 className="mb-4 text-xl font-bold text-white">What ships next</h3>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    Lightweight content setup — update prices without editing code
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    Conversion events — WhatsApp clicks, email triggers, tier picks
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    Multi-page expansion — FAQs and areas beyond Chandpur
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800/80 bg-zinc-950/40 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-6 font-mono text-xs tracking-widest text-cyan-300 uppercase">06 // Stack</h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                "HTML5",
                "Vanilla CSS3 + design tokens",
                "Modular vanilla JS",
                "SVG sprite system",
                "Sharp CLI + srcset",
                "LocalBusiness JSON-LD",
                "VS Code + Cline",
              ].map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-white"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-zinc-800/70 pt-6 text-xs text-zinc-500">
              <Mail className="h-4 w-4" />
              <span>Email backup on every booking CTA — WhatsApp first, inbox as fallback.</span>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-800/80 bg-[#08080A] py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
            <div>
              <span className="mb-1 block font-mono text-xs tracking-widest text-zinc-500 uppercase">
                Next case study
              </span>
              <Link
                className="text-2xl font-bold text-white transition-colors hover:text-cyan-300 md:text-3xl"
                href="/projects/movemate-moving-planner"
              >
                MoveMate &rarr;
              </Link>
            </div>
            <Link
              className="rounded-full border border-zinc-800 px-6 py-3 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
              href="/projects/chorma"
            >
              &larr; Chorma Agency Site
            </Link>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}

