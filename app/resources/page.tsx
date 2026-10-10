import type { Metadata, Viewport } from "next"
import Image from "next/image"

import { ResourceDirectory } from "@/components/resource-directory"
import { resourceCategories, resources } from "@/lib/resources"
import { PagePreloader } from "@/components/page-preloader"

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free resources for web developers and designers: UI kits, icon sets, type foundries, stock assets and hosting.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources",
    description:
      "Free resources for web developers and designers: UI kits, icon sets, type foundries, stock assets and hosting.",
    url: "/resources",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free web development & design resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources",
    description:
      "Free resources for web developers and designers: UI kits, icon sets, type foundries, stock assets and hosting.",
    images: ["/og-image.png"],
  },
}

/**
 * The light system sets `color-scheme: light` and a white theme colour at the
 * root, so this route has to say otherwise or the scrollbar and the browser
 * chrome stay bright against the charcoal page.
 */
export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
}

export default function ResourcesPage() {
  /**
   * Built from the array the grid renders, so the schema can never describe a
   * resource the page does not show.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Web Development & Design Resources",
    description: `${resources.length} free tools for building on the web, grouped by category.`,
    numberOfItems: resources.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: resources.map((resource, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: resource.title,
      description: resource.description,
      url: resource.url,
    })),
  }

  return (
    <>
      <PagePreloader label="Free Resources" />
      <div className="relative isolate min-h-screen bg-zinc-950 text-zinc-100 [color-scheme:dark]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        Hero background wrapper: one ambient plate, one obsidian scrim, the
        page header on top. The plate is a 6144x3456 local file served through
        `next/image` with `sizes="100vw"`, so the optimiser answers with a
        viewport-sized derivative rather than the 2.6 MB original. The path
        holds a space, so it is escaped once here — `encodeURI` leaves `%`
        untouched, so re-escaping is a no-op rather than a double-encode.
        `mix-blend-screen` drops the plate's dark pixels instead of painting
        them: the gradient's colour survives while its blacks fall through to
        the ground. The scrim then hands the hero over to the page ground at
        the bottom edge, so the controls zone below has no seam to cross.
        The content column below keeps the route's `max-w-shell` shell, so the
        header aligns with the search row and grid the directory renders.
      */}
      <div className="relative w-full overflow-clip bg-[#08080A] pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Layer 1: ambient background image + dark obsidian scrim vignette. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none"
        >
          <Image
            src={encodeURI("/Hero Gradient V3 - 37.png")}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center opacity-60 mix-blend-screen"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#08080A]/40 via-[#08080A]/80 to-[#08080A]" />
        </div>

        {/* Layer 2: hero content. */}
        <header className="relative z-20 mx-auto w-full max-w-shell px-6 md:px-12">
          <span className="label block text-zinc-500">
            {resources.length} resources / {resourceCategories.length - 1}{" "}
            categories
          </span>
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.03] font-medium tracking-display text-balance text-zinc-100">
            Free web development &amp; design resources
          </h1>
          <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-[1.7] text-zinc-400">
            A working list of free tools for building on the web: UI kits,
            icons, type, assets and hosting. Filter by category, or search the
            whole set.
          </p>
        </header>
      </div>

      <ResourceDirectory />
    </div>
    </>
  )
}
