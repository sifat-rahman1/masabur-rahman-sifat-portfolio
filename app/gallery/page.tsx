import type { Metadata, Viewport } from "next"

import { GalleryArchive } from "@/components/gallery-archive"
import { DriftWall } from "@/components/ui/DriftWall"
import { DRIFT_WALL_IMAGES } from "@/data/galleryData"
import { PagePreloader } from "@/components/page-preloader"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A curated vault of posters, vector illustrations and visual experiments by Sifat.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery",
    description:
      "A curated vault of posters, vector illustrations and visual experiments by Sifat.",
    url: "/gallery",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Masabur Rahman Sifat — Design Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery",
    description:
      "A curated vault of posters, vector illustrations and visual experiments by Sifat.",
    images: ["/og-image.png"],
  },
}

/**
 * The light system sets `color-scheme: light` and a white theme colour at the
 * root, so this route has to say otherwise or the scrollbar and the browser
 * chrome stay bright against an obsidian page.
 */
export const viewport: Viewport = {
  themeColor: "#08080A",
  colorScheme: "dark",
}

/**
 * Phase 1: the hero alone. It is one viewport tall — `svh` rather than `vh`, so a
 * phone does not shorten the hero when the URL bar is showing; on desktop the two
 * units are the same number. The archive grid below is Phase 2's section, and
 * the footer closes the page after it.
 */
export default function GalleryPage() {
  return (
    <>
      <PagePreloader label="Gallery" />
      <div className="relative isolate min-h-[100svh] bg-[#08080A] text-zinc-100 [color-scheme:dark]">
      <main id="main" className="relative">
        <section className="relative isolate flex h-[100svh] min-h-[36rem] w-full items-center justify-center overflow-hidden">
          {/* Layer 1 — the wall. Thumbnails only; it paints its own fade mask. */}
          <DriftWall items={DRIFT_WALL_IMAGES} />

          {/*
            Layer 2 — the scrim. Two jobs in one gradient: it holds the wall down
            far enough for type to sit on it, and it hands the bottom of the hero
            over to the page ground, so the next section has no seam to cross.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#08080A]/40 via-[#08080A]/60 to-[#08080A]"
          />

          {/* Layer 3 — the type. */}
          <div className="pointer-events-none relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs tracking-widest text-emerald-400">
              <span aria-hidden="true">&#x2726;</span>
              SIFAT // VISUAL ARCHIVE
            </span>

            {/*
              Uppercase is the stylesheet's, not the source's: assistive tech then
              reads "Design Gallery" instead of spelling out two shouted words. The
              break is deliberate — a stacked lockup holds at every width, where a
              wrapped line would leave the two words at different sizes of impact.
            */}
            <h1 className="font-display text-6xl leading-[0.86] font-extrabold tracking-tighter text-[#FAFAFA] uppercase md:text-8xl lg:text-9xl">
              <span className="block">Design</span>
              <span className="block">Gallery</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm text-zinc-400 md:text-base">
              A curated vault of posters, vector illustrations, and visual
              experiments.
            </p>

            {/*
              The scroll cue is a hairline, not a bouncing arrow: the loop would be
              the only endless animation on a page whose motion budget belongs to
              the wall. Phase 2 gave it the `#archive` destination the Phase 1
              comment promised. `pointer-events-auto` lifts it out of the type
              layer's `pointer-events-none` so it is clickable without making the
              whole overlay clickable.
            */}
            <a
              href="#archive"
              aria-label="Scroll to the archive"
              className="pointer-events-auto absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
            >
              <span className="label text-zinc-500">Scroll to explore</span>
              <span
                aria-hidden="true"
                className="h-10 w-px bg-gradient-to-b from-zinc-600 to-transparent"
              />
            </a>
          </div>
        </section>

        <GalleryArchive />
      </main>
    </div>
    </>
  )
}
