"use client"

import { useEffect, useRef, useState } from "react"
import {
  Camera,
  Cloud,
  Code,
  Frame,
  Grid,
  Image as ImageIcon,
  Layers,
  Search,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react"

import { AgencyPromoCard } from "@/components/agency-promo-card"
import { ArrowUpRight } from "@/components/icons"
import {
  PROMO_SLOT,
  resourceCategories,
  resources,
  type Resource,
  type ResourceIcon,
} from "@/lib/resources"

/**
 * The dataset names its icons as keys so it stays serialisable for the JSON-LD
 * block. This is where the keys become components, and the `Record` type makes a
 * missing mapping a build error rather than a blank square.
 *
 * `figma` is the frame glyph: lucide v1 dropped its brand marks, and this is the
 * same substitution the tools page makes, so the two routes agree.
 */
const ICONS: Record<ResourceIcon, LucideIcon> = {
  sparkles: Sparkles,
  type: Type,
  grid: Grid,
  figma: Frame,
  code: Code,
  cloud: Cloud,
  layers: Layers,
  image: ImageIcon,
  camera: Camera,
}

/** Card shell: charcoal glass, hairline border, one accent that fires on hover. */
const CARD =
  "group relative flex h-full flex-col rounded-sm border border-zinc-800/60 bg-zinc-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 focus-within:border-emerald-500/40 motion-reduce:transition-none"

const PLATE =
  "flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-950/60 text-zinc-400 transition-colors duration-300 group-hover:border-emerald-500/30 group-hover:text-emerald-400 motion-reduce:transition-none"

/** A chip, not a pill: the pills on this page are the filters and the CTA. */
const BADGE =
  "label rounded-sm border border-zinc-800/80 bg-zinc-950/50 px-2 py-1 text-zinc-400 transition-colors duration-300 group-hover:border-emerald-500/30 group-hover:text-emerald-300 motion-reduce:transition-none"

/**
 * The heading carries the link and its `::after` stretches across the card, so
 * the whole tile is clickable without a second focus stop or an aria-label that
 * would only repeat the title.
 */
const CARD_LINK =
  "rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = ICONS[resource.icon]

  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-4">
        <span className={PLATE}>
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span className={BADGE}>{resource.badge}</span>
      </div>

      <h3 className="mt-5 font-display text-lg leading-snug font-semibold tracking-tightish text-zinc-100">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={CARD_LINK}
        >
          {resource.title}
        </a>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {resource.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
        <span className="label text-zinc-600">{resource.category}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
      </div>
    </article>
  )
}

const PILL =
  "inline-flex min-h-11 items-center rounded-full border px-3.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 motion-reduce:transition-none md:min-h-9"
const PILL_ACTIVE = "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
const PILL_IDLE =
  "border-zinc-800/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"

/**
 * The directory: sticky filter bar, results count, grid.
 *
 * `nav` and `main` both come from this component because the toolbar and the
 * grid are two views of one piece of state, and splitting them would mean a
 * context or a URL param to keep them in step. Client component, but still
 * prerendered to HTML on the server, so the links and descriptions are in the
 * markup before any JavaScript loads.
 */
export function ResourceDirectory() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * ⌘K or Ctrl+K focuses the field from anywhere and selects what is in it, so
   * typing replaces the old query. Escape clears it.
   */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
        return
      }
      if (
        event.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        setQuery("")
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const needle = query.trim().toLowerCase()

  const visible = resources.filter((resource) => {
    if (category !== "All" && resource.category !== category) return false
    if (!needle) return true
    // Title, description and badge. Category stays out because the pill row
    // already filters that axis, and folding it in would make a search for one
    // word behave like a second, hidden filter.
    return `${resource.title} ${resource.description} ${resource.badge}`
      .toLowerCase()
      .includes(needle)
  })

  const filtering = needle.length > 0 || category !== "All"

  const clear = () => {
    setQuery("")
    setCategory("All")
  }

  return (
    <>
      <nav
        aria-label="Filter and search resources"
        className="sticky top-0 z-30 border-y border-zinc-800/60 bg-zinc-950/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex w-full max-w-shell flex-col gap-3 px-6 py-3 md:px-12 md:py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative lg:max-w-sm lg:flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources"
              aria-label="Search resources"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-sm border border-zinc-800/60 bg-zinc-900/60 py-2.5 pr-28 pl-10 font-body text-sm text-zinc-100 transition-colors duration-200 placeholder:text-zinc-500 focus:border-emerald-500/40 focus-visible:outline-2 focus-visible:outline-emerald-400 motion-reduce:transition-none"
            />
            {/* Both keys, because the badge cannot know the platform during
                render without either a hydration mismatch or a wrong key. */}
            <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-sm border border-zinc-700/60 bg-zinc-800/50 px-1.5 py-0.5 font-body text-[0.6875rem] text-zinc-400 sm:block">
              ⌘K / Ctrl+K
            </kbd>
          </div>

          <ul className="flex [scrollbar-width:none] flex-nowrap items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-x-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            {resourceCategories.map((value) => {
              const active = value === category

              return (
                <li key={value} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setCategory(value)}
                    aria-pressed={active}
                    className={`${PILL} ${active ? PILL_ACTIVE : PILL_IDLE}`}
                  >
                    {value}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <main
        id="main"
        className="mx-auto w-full max-w-shell px-6 pb-20 md:px-12 md:pb-28"
      >
        <section aria-labelledby="resources-heading">
          <div className="flex items-baseline justify-between gap-4 border-b border-zinc-800/60 py-6">
            <h2 id="resources-heading" className="sr-only">
              Free web development and design resources
            </h2>
            <p className="label text-zinc-500" aria-live="polite">
              {visible.length} of {resources.length} resources
            </p>
            {filtering ? (
              <button
                type="button"
                onClick={clear}
                className="label inline-flex min-h-11 items-center text-emerald-300 underline decoration-emerald-500/40 underline-offset-4 transition-colors duration-200 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 motion-reduce:transition-none md:min-h-0"
              >
                Clear
              </button>
            ) : null}
          </div>

          {visible.length === 0 ? (
            <div className="py-20 text-center md:py-28">
              <p className="font-display text-lg tracking-tightish text-zinc-200">
                {needle
                  ? `No resources match \u201C${query.trim()}\u201D.`
                  : "No resources match these filters."}
              </p>
              <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-zinc-400">
                The list is short and every entry is a tool someone actually
                uses, so a miss is usually a typo. Clearing the filters brings
                all {resources.length} back.
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-6 inline-flex min-h-11 items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 text-sm font-medium text-emerald-300 transition-colors duration-200 hover:border-emerald-500/60 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 motion-reduce:transition-none"
              >
                Clear search and filters
              </button>
            </div>
          ) : (
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {visible.slice(0, PROMO_SLOT).map((resource) => (
                <li key={resource.id}>
                  <ResourceCard resource={resource} />
                </li>
              ))}

              <li>
                <AgencyPromoCard />
              </li>

              {visible.slice(PROMO_SLOT).map((resource) => (
                <li key={resource.id}>
                  <ResourceCard resource={resource} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}
