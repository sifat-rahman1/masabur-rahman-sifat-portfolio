/**
 * The resource directory, exactly as supplied. Titles, descriptions, categories,
 * badges and URLs are reproduced verbatim - treat this file as the source of
 * truth.
 *
 * `icon` is a key rather than a component on purpose: the array stays plain
 * serialisable data, so the same source can drive the grid and the JSON-LD
 * block without either one reaching into React.
 */

export type ResourceIcon =
  | "sparkles"
  | "type"
  | "grid"
  | "figma"
  | "code"
  | "cloud"
  | "layers"
  | "image"
  | "camera"

export type Resource = {
  id: string
  title: string
  description: string
  category: string
  url: string
  badge: string
  icon: ResourceIcon
}

export const resources: readonly Resource[] = [
  {
    id: "res-1",
    title: "UIverse",
    description:
      "Community-made, open-source CSS and Tailwind UI elements (buttons, cards, loaders, inputs).",
    category: "UI Kits",
    url: "https://uiverse.io",
    badge: "Community",
    icon: "sparkles",
  },
  {
    id: "res-2",
    title: "Fontshare",
    description:
      "A free quality font service by Indian Type Foundry delivering modern typography for web design.",
    category: "Typography",
    url: "https://fontshare.com",
    badge: "Fonts",
    icon: "type",
  },
  {
    id: "res-3",
    title: "Lucide Icons",
    description:
      "Beautiful & consistent open-source icon library designed for modern vector graphics.",
    category: "Icons",
    url: "https://lucide.dev",
    badge: "SVG Icons",
    icon: "grid",
  },
  {
    id: "res-4",
    title: "Figma",
    description:
      "The industry-standard collaborative design and prototyping tool for web and mobile interfaces.",
    category: "UI/UX",
    url: "https://figma.com",
    badge: "Design Tool",
    icon: "figma",
  },
  {
    id: "res-5",
    title: "HyperUI",
    description:
      "Free open-source Tailwind CSS components for marketing pages, e-commerce, and dashboards.",
    category: "UI Kits",
    url: "https://hyperui.dev",
    badge: "Tailwind",
    icon: "code",
  },
  {
    id: "res-6",
    title: "Vercel Hosting",
    description:
      "The modern frontend platform to deploy Next.js, React, and static sites with global edge network.",
    category: "Hosting & Infra",
    url: "https://vercel.com",
    badge: "Deployment",
    icon: "cloud",
  },
  {
    id: "res-7",
    title: "Shadcn UI",
    description:
      "Re-usable component primitives built with Radix UI and Tailwind CSS. Accessible and open-source.",
    category: "UI Kits",
    url: "https://ui.shadcn.com",
    badge: "Components",
    icon: "layers",
  },
  {
    id: "res-8",
    title: "SVG Repo",
    description:
      "Search and download over 500,000 free SVG vectors, icons, and logo sets for web projects.",
    category: "Icons",
    url: "https://svgrepo.com",
    badge: "Vectors",
    icon: "image",
  },
  {
    id: "res-9",
    title: "Unsplash API",
    description:
      "High-resolution free stock images and API integration for modern digital layouts.",
    category: "Assets",
    url: "https://unsplash.com",
    badge: "Media",
    icon: "camera",
  },
]

/**
 * Filter values, derived from the data so a new category can never leave the
 * filter row behind. `All` is the reset state rather than a real category.
 */
export const resourceCategories: readonly string[] = [
  "All",
  ...new Set(resources.map((resource) => resource.category)),
]

/**
 * Where the promo card lands: after the fifth resource, so it reads as part of
 * the set rather than an interruption before it.
 */
export const PROMO_SLOT = 5
