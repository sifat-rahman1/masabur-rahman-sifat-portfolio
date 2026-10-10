import type { Metadata } from "next"

/**
 * The five projects. Titles, taglines and descriptions are exactly as
 * supplied - treat those strings as the source of truth and do not reword
 * them in components. The per-entry seo and social fields are the approved
 * search + social copy for that project's case-study route.
 */
/** Preview media for a project. Absent, the drawn poster plate is used. */
export type ProjectMedia = {
  /** `video` renders a muted, looping, inline video; `image` a plain img. */
  kind: "image" | "video"
  /** Path under /public (e.g. "/work/nebula.jpg"), or an absolute URL. */
  src: string
  /** First frame for a video, or a lighter stand-in for a large image. */
  poster?: string
  /** Native pixel size of the image — required for exact og:image dimensions. */
  width?: number
  height?: number
}

/**
 * Card visuals for the work index. Exact brand colors per project, supplied
 * as Tailwind class strings: `surface` paints the card, `pill` paints the
 * CTA chip. Kept in the data so the list stays a straight map.
 */
export type ProjectCard = {
  /** Card background + text color classes, e.g. "bg-[#0448db] text-white". */
  surface: string
  /** CTA pill classes, e.g. "bg-white/20 text-white backdrop-blur-md". */
  pill: string
}

export type Project = {
  /** Display index, kept as a string so leading zeroes survive. */
  index: string
  title: string
  /** Short scope line, set under the title in the index. */
  tagline: string
  /** Verbatim longer line, used as the caption inside the preview plate. */
  description: string
  /** Brand-card visuals. */
  card: ProjectCard
  /**
   * Real case-study or live URL. While a project has nothing to open, leave
   * this out: the row then stays plain type instead of promising a destination
   * that does not exist.
   */
  href?: string
  /** Label for the right-column CTA, e.g. "VIEW CASE STUDY". Always shown. */
  ctaLabel?: string
  /** Preview media. Absent, the drawn poster plate is used. */
  media?: ProjectMedia
  /**
   * Page <title> for the case-study route. No brand suffix here: the root
   * title.template appends it automatically.
   */
  seoTitle: string
  /** Meta description for the case-study route. */
  seoDescription: string
  /** Social share blurb - punchier than the meta description; may differ. */
  ogDescription: string
}

export const projects: readonly Project[] = [
  {
    index: "01",
    title: "Nebula Digital Agency",
    tagline: "B2B platform",
    description: "B2B agency homepage with lead capture tools",
    href: "/projects/nebula",
    ctaLabel: "VIEW CASE STUDY",
    media: { kind: "image", src: "/nebula-digital-ss.png", width: 1893, height: 1078 },
    seoTitle: "Nebula Digital Agency — Case Study",
    seoDescription:
      "B2B agency homepage with lead capture tools and an interactive ROI calculator. Next.js, Tailwind CSS, Formspree, Vercel.",
    ogDescription:
      "A production-ready B2B agency homepage engineered for conversions: lead capture, ROI calculator, dark/light theme.",
    card: {
      surface: "bg-[#0448db] text-white",
      pill: "bg-white/20 text-white backdrop-blur-md",
    },
  },
  {
    index: "02",
    title: "Chorma Agency Site",
    tagline: "Micro-interaction heavy",
    description:
      "Performance-focused agency site with custom micro-interactions",
    href: "/projects/chorma",
    ctaLabel: "VIEW CASE STUDY",
    media: { kind: "image", src: "/chorma-ss.png", width: 1918, height: 1078 },
    seoTitle: "Chorma: Anti-Slop Motion Design — Case Study",
    seoDescription:
      "Performance-obsessed Next.js agency platform from Chandpur, BD: magnetic GPU hover physics, orbital loaders, and WCAG-exact dark/light themes. Next.js, Tailwind CSS, Netlify.",
    ogDescription:
      "Slick, buttery interactions without the bloat: magnetic buttons, custom orbital loaders, exact-contrast themes.",
    card: {
      surface: "bg-purple-600 text-white",
      pill: "bg-white/20 text-white backdrop-blur-md",
    },
  },
  {
    index: "03",
    title: "Sparkle Clean",
    tagline: "Zero-dependency local platform",
    description: "Zero-dependency landing page with instant booking",
    href: "/projects/sparkle-clean-chandpur",
    ctaLabel: "VIEW CASE STUDY",
    media: { kind: "image", src: "/sparkleclean-ss.png", width: 1894, height: 1078 },
    seoTitle:
      "Sparkle Clean — House Cleaning Service Website (Chandpur, Bangladesh)",
    seoDescription:
      "High-performance landing page for a house cleaning service in Chandpur, Bangladesh — clear service tiers, WhatsApp booking flow, and an ultra-fast zero-dependency build.",
    ogDescription:
      "Zero-dependency landing page with instant WhatsApp booking: ~75 KB, 0 runtime deps, 12/12 WCAG contrast pairs.",
    card: {
      surface: "bg-cyan-400 text-zinc-950",
      pill: "bg-zinc-950 text-white",
    },
  },
  {
    index: "04",
    title: "MoveMate — Moving Planner Web App",
    tagline: "AI-assisted moving planner",
    description:
      "A moving planner web app with a checklist, task tracker, cost estimator, and timeline. Built with HTML, CSS, JS, and Devin AI.",
    href: "/projects/movemate-moving-planner",
    ctaLabel: "VIEW CASE STUDY",
    media: { kind: "image", src: "/movemate-ss.png", width: 1896, height: 1078 },
    seoTitle: "MoveMate — Moving Planner Web App Case Study",
    seoDescription:
      "MoveMate is a moving planner web app that helps users organize tasks, estimate costs, and prepare for moving day with a checklist, timeline, and clean responsive design.",
    ogDescription:
      "A calm, structured moving planner: checklist, task tracker, live cost estimator, and timeline. Vanilla JS, zero framework bloat.",
    card: {
      surface: "bg-orange-500 text-zinc-950",
      pill: "bg-zinc-950 text-white",
    },
  },
  {
    index: "05",
    title: "ContentForge",
    tagline: "Experimental AI content workspace",
    description:
      "Experimental AI content workspace for faster social creation: ideas, hooks, captions, scripts, and planning in one focused surface. Built with React.",
    href: "/projects/contentforge",
    ctaLabel: "VIEW CASE STUDY",
    media: { kind: "image", src: "/Content-forge-desktop.png", width: 1309, height: 697 },
    seoTitle: "ContentForge — AI Content Workspace | Portfolio Case Study",
    seoDescription:
      "Explore ContentForge, an experimental AI content creation app built with React to help creators generate ideas, hooks, captions, scripts, and organize social media content.",
    ogDescription:
      "An experimental AI workspace for faster social creation: ideas, hooks, captions, scripts, and planning in one focused surface.",
    card: {
      surface: "bg-[#06c756] text-zinc-950",
      pill: "bg-zinc-950 text-white",
    },
  },
] as const

/**
 * Case-study lookup by route slug: `getProjectBySlug("nebula")` resolves the
 * entry behind `/projects/nebula`. Returns undefined for unknown slugs so
 * callers can fall back instead of rendering copy for a page that 404s.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.href === `/projects/${slug}`)
}

/**
 * Full search + social metadata for a case-study route, derived from the
 * registry so the copy lives in exactly one place. The Open Graph image
 * reuses the card preview media already stored on the entry.
 */
export function buildProjectMetadata(slug: string): Metadata {
  const project = getProjectBySlug(slug)
  if (!project?.href) return {}
  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: { canonical: project.href },
    openGraph: {
      title: project.seoTitle,
      description: project.ogDescription,
      url: project.href,
      type: "article",
      ...(project.media
        ? {
            images: [
              {
                url: project.media.src,
                width: project.media.width ?? 1200,
                height: project.media.height ?? 630,
                alt: `${project.title} — case study preview`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.ogDescription,
      ...(project.media ? { images: [project.media.src] } : {}),
    },
  }
}
