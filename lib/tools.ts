import { GraduationCap, Orbit, Rocket, type LucideIcon } from "lucide-react"

import type { BrandSlug } from "@/lib/brand-marks"

/**
 * The tools and the stack, exactly as supplied. Names and their roles are
 * reproduced verbatim - treat this file as the source of truth.
 */

/**
 * How a tool is drawn.
 *
 * `brand` is the owner's real mark, traced from simple-icons. `monogram` is the
 * vendor's own two-letter abbreviation, for the two Adobe apps whose marks no
 * long-lived library still ships. `glyph` is a neutral shape for products too
 * new or too small to have a mark at all.
 *
 * Nothing here is invented. A stand-in logo for a real product would be a false
 * claim about who made the tool, so where a mark is unavailable the card says
 * less rather than something wrong.
 */
export type ToolMark =
  | { kind: "brand"; slug: BrandSlug }
  | { kind: "monogram"; text: string }
  | { kind: "glyph"; icon: LucideIcon }

export type Tool = {
  /** Product name, as the owner writes it. */
  name: string
  /** What the tool is for, in the owner's words. */
  role: string
  mark: ToolMark
}

export type ToolGroup = {
  /** Display numeral, kept as a string so the leading zero survives. */
  index: string
  title: string
  tools: readonly Tool[]
}

export const toolGroups: readonly ToolGroup[] = [
  {
    index: "01",
    title: "Design & Visual Arts",
    tools: [
      {
        name: "Figma",
        role: "Primary UI/UX canvas",
        mark: { kind: "brand", slug: "figma" },
      },
      {
        name: "Adobe Photoshop",
        role: "Raster manipulation & high-fidelity assets",
        mark: { kind: "monogram", text: "Ps" },
      },
      {
        name: "Adobe Illustrator",
        role: "Precision vector graphics & brand logos",
        mark: { kind: "monogram", text: "Ai" },
      },
      {
        name: "Canva",
        role: "Rapid asset creation & pitch decks",
        mark: { kind: "brand", slug: "canva" },
      },
    ],
  },
  {
    index: "02",
    title: "AI Engines & Intelligence",
    tools: [
      {
        name: "Anthropic Claude",
        role: "Core LLM for complex logic & architecture",
        mark: { kind: "brand", slug: "anthropic" },
      },
      {
        name: "Google Gemini",
        role: "Multimodal analysis & real-time context",
        mark: { kind: "brand", slug: "googlegemini" },
      },
      {
        name: "DeepSeek",
        role: "High-efficiency algorithmic logic",
        mark: { kind: "brand", slug: "deepseek" },
      },
      {
        name: "Perplexity AI",
        role: "Real-time web discovery & deep research",
        mark: { kind: "brand", slug: "perplexity" },
      },
      {
        name: "OpenRouter & OmniRoute",
        role: "Custom LLM routing & API orchestration",
        mark: { kind: "brand", slug: "openrouter" },
      },
    ],
  },
  {
    index: "03",
    title: "Agentic Coding & AI Workflows",
    tools: [
      {
        name: "Antigravity",
        role: "AI-assisted development agent",
        mark: { kind: "glyph", icon: Orbit },
      },
      {
        name: "Cline / Kilo Code",
        role: "Autonomous agentic coding inside VS Code",
        mark: { kind: "brand", slug: "cline" },
      },
      {
        name: "Rocket.new & Floot",
        role: "Rapid frontend prototyping",
        mark: { kind: "glyph", icon: Rocket },
      },
    ],
  },
  {
    index: "04",
    title: "Development, Database & Cloud",
    tools: [
      {
        name: "VS Code",
        role: "Primary IDE",
        mark: { kind: "brand", slug: "visualstudiocode" },
      },
      {
        name: "GitHub",
        role: "Source code management & CI/CD",
        mark: { kind: "brand", slug: "github" },
      },
      {
        name: "Supabase",
        role: "Open-source backend & PostgreSQL",
        mark: { kind: "brand", slug: "supabase" },
      },
      {
        name: "Vercel",
        role: "Edge deployment & Next.js hosting",
        mark: { kind: "brand", slug: "vercel" },
      },
      {
        name: "Railway",
        role: "Cloud infrastructure & containerized backends",
        mark: { kind: "brand", slug: "railway" },
      },
      {
        name: "Netlify",
        role: "Automated deployment pipelines",
        mark: { kind: "brand", slug: "netlify" },
      },
      {
        name: "Tailwind CSS & Node.js",
        role: "Styling engine & JS runtime",
        mark: { kind: "brand", slug: "tailwindcss" },
      },
    ],
  },
  {
    index: "05",
    title: "Product Strategy & Utilities",
    tools: [
      {
        name: "Uxcel",
        role: "UI/UX foundations & product specs",
        mark: { kind: "glyph", icon: GraduationCap },
      },
      {
        name: "MEGA",
        role: "Secure cloud backup & asset archives",
        mark: { kind: "brand", slug: "mega" },
      },
    ],
  },
]

/** Read by the page header, so the count can never drift from the list. */
export const toolCount = toolGroups.reduce(
  (total, group) => total + group.tools.length,
  0
)
