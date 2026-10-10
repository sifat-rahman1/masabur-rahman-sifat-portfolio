import type { Metadata, Viewport } from "next"
import Image from "next/image"

import { ToolsStack } from "@/components/tools-stack"
import { toolCount, toolGroups } from "@/lib/tools"
import { PagePreloader } from "@/components/page-preloader"

export const metadata: Metadata = {
  title: "Tools & tech stack",
  description:
    "The tools and stack Sifat builds with, grouped by the job each piece does.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Tools & tech stack",
    description:
      "The tools and stack Sifat builds with, grouped by the job each piece does.",
    url: "/tools",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sifat's tools & tech stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools & tech stack",
    description:
      "The tools and stack Sifat builds with, grouped by the job each piece does.",
    images: ["/og-image.png"],
  },
}

/**
 * The light system sets `color-scheme: light` and a white theme colour at the
 * root, so this route has to say otherwise or the scrollbar and the browser
 * chrome stay bright against a charcoal page.
 */
export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
}

export default function ToolsPage() {
  return (
    <>
      <PagePreloader label="Tools & Stack" />
      <div className="relative isolate min-h-screen bg-[#09090b] text-zinc-100 [color-scheme:dark]">
      {/*
        Two sections, not one wrapper: the ambient plate lives inside the hero
        `<section>` alone, so `absolute inset-0` can only ever cover the
        header. The grid section below sits on solid obsidian with no image
        layer at all. The scrim bottoms out at `#08080A`, which is also the
        grid's ground, so the handoff has no line. `object-top` keeps the
        ecliptic's composition anchored while the hero's height varies. The
        old single-wrapper layout is what bled the plate into the grid: one
        `inset-0` stretched over header and stack alike. Both columns keep
        the route's `max-w-shell` shell, so header and groups stay aligned.
      */}
      <main id="main" className="w-full">
        {/* 1. Hero header section — background image contained here only. */}
        <section className="relative w-full overflow-hidden border-b border-zinc-800/40 bg-[#08080A] pt-32 pb-16 md:pt-40 md:pb-20">
          {/* Isolated background image layer + bottom fade scrim. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 select-none"
          >
            <Image
              src={encodeURI("/Ecliptic - 01.jpg")}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-top opacity-50 mix-blend-screen"
            />
            {/*
              Bottom fade scrim: thins to `#08080A` at the hero's bottom edge,
              which is the grid section's own ground, so the transition reads
              as one continuous obsidian field rather than a seam.
            */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#08080A]/20 via-[#08080A]/60 to-[#08080A]" />
          </div>

          {/* Hero text content. */}
          <div className="relative z-20 mx-auto w-full max-w-shell px-6 md:px-12">
            <span className="label block text-zinc-500">
              {toolCount} tools / {toolGroups.length} groups
            </span>
            <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.03] font-medium tracking-display text-balance text-white">
              Tools &amp; tech stack
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-zinc-400">
              What I build with, grouped by the job each piece does. Kept
              short on purpose. I would rather add a tool late than carry one
              I never open.
            </p>
          </div>
        </section>

        {/*
          2. Tool grid section — solid obsidian, no image layer. The top
          padding preserves the header-to-first-group rhythm the old combined
          wrapper had (`mt-14 md:mt-20`); the bottom padding keeps the
          footer's approach unchanged.
        */}
        <section className="relative z-10 bg-[#08080A]">
          <div className="mx-auto w-full max-w-shell px-6 pt-14 pb-20 md:px-12 md:pt-20 md:pb-28">
            <ToolsStack />
          </div>
        </section>
      </main>
    </div>
    </>
  )
}
