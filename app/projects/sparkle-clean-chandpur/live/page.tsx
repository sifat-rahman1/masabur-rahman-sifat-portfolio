import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Sparkle Clean — Live Demo",
  description:
    "Interactive live demo of the zero-dependency Sparkle Clean landing page: editorial hero, service tiers, and WhatsApp-first booking flow.",
  alternates: { canonical: "/projects/sparkle-clean-chandpur/live" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Sparkle Clean — Live Demo",
    description:
      "Interactive live demo of the zero-dependency Sparkle Clean landing page: editorial hero, service tiers, and WhatsApp-first booking flow.",
    url: "/projects/sparkle-clean-chandpur/live",
    type: "website",
    images: [
      {
        url: "/sparkleclean-ss.png",
        width: 1894,
        height: 1078,
        alt: "Sparkle Clean landing page — live demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparkle Clean — Live Demo",
    description:
      "Interactive live demo of the zero-dependency Sparkle Clean landing page: editorial hero, service tiers, and WhatsApp-first booking flow.",
    images: ["/sparkleclean-ss.png"],
  },
}

export default function SparkleCleanLiveDemo() {
  return (
    <div className="flex min-h-screen flex-col bg-[#08080A] text-zinc-100">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3 sm:px-6">
        <h1 className="sr-only">Sparkle Clean — Live Demo</h1>
        <Link
          href="/projects/sparkle-clean-chandpur"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 font-mono text-xs tracking-wider text-zinc-300 uppercase transition-colors hover:border-cyan-400/50 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to case study
        </Link>
        <p className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
          Live demo · static build · <span className="text-zinc-300">/sparkle-clean/index.html</span>
        </p>
        <a
          href="/sparkle-clean/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-cyan-200"
        >
          Open full page
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </header>
      <div className="flex-1 bg-white p-2 sm:p-4">
        <iframe
          src="/sparkle-clean/index.html"
          title="Sparkle Clean landing page — live demo"
          className="h-[calc(100vh-120px)] min-h-[600px] w-full rounded-sm border border-zinc-800 bg-white"
          loading="eager"
        />
      </div>
    </div>
  )
}
