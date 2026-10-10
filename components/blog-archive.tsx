"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

import type { BlogPost } from "@/data/blogs"

const FILTERS = [
  { label: "All Posts", match: null as string | null },
  { label: "UI/UX & Engineering", match: "UI/UX & Engineering" },
  { label: "Frontend Performance", match: "Frontend Engineering" },
  { label: "Developer Tools", match: "Developer Tools & UI" },
] as const

type FilterLabel = (typeof FILTERS)[number]["label"]

const PILL_BASE =
  "inline-flex min-h-11 items-center rounded-full text-xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 motion-reduce:transition-none md:min-h-0"
const PILL_ACTIVE = "bg-emerald-500 font-semibold text-black"
const PILL_IDLE =
  "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function matches(post: BlogPost, needle: string) {
  if (!needle) return true
  const haystack =
    `${post.title} ${post.description} ${post.category}`.toLowerCase()
  return needle
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

export function BlogArchive({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<FilterLabel>("All Posts")
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const active = FILTERS.find((f) => f.label === filter) ?? FILTERS[0]
  const needle = query.trim()

  const visible = useMemo(() => {
    return posts.filter(
      (post) =>
        (active.match === null || post.category === active.match) &&
        matches(post, needle)
    )
  }, [posts, active, needle])

  const [featured, ...rest] = visible
  const filtering = filter !== "All Posts" || needle.length > 0

  function clear() {
    setFilter("All Posts")
    setQuery("")
  }

  function countFor(label: FilterLabel) {
    const entry = FILTERS.find((f) => f.label === label) ?? FILTERS[0]
    if (entry.match === null) return posts.length
    return posts.filter((post) => post.category === entry.match).length
  }

  return (
    <>
      <div className="relative overflow-clip">
        {/* Hero backdrop: silent, decorative — content contrast comes from
            the obsidian scrims sandwiching it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Moon%20-%2011.png')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08080a]/70 via-[#08080a]/60 to-[#08080a]"
        />
        <header className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-20">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs tracking-wider text-emerald-400">
            <span aria-hidden="true" className="mr-1.5">
              ✦
            </span>
            SIFAT // JOURNAL &amp; ARTICLES
          </span>
          <span className="font-mono text-xs text-zinc-500" aria-live="polite">
            {posts.length} {posts.length === 1 ? "POST" : "POSTS"}
          </span>
        </div>
        <h1 className="mt-5 max-w-[28ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance text-white">
          Articles on Engineering, Design &amp;{" "}
          <span className="text-emerald-400">Anti-Slop Web Architecture</span>
        </h1>
        <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-[1.75] text-zinc-400">
          Deep dives into performance optimization, bespoke frontend systems,
          and conversion-focused UI design.
        </p>
        <div className="mt-8 mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter articles by category"
            className="flex flex-wrap items-center gap-3"
          >
            {FILTERS.map((entry) => {
              const isActive = entry.label === filter
              return (
                <button
                  key={entry.label}
                  type="button"
                  onClick={() => setFilter(entry.label)}
                  aria-pressed={isActive}
                  className={`${PILL_BASE} px-4 py-2 ${isActive ? PILL_ACTIVE : PILL_IDLE}`}
                >
                  {entry.label} ({countFor(entry.label)})
                </button>
              )
            })}
          </div>
          <div className="relative w-full lg:w-72 lg:shrink-0">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full rounded-sm border border-zinc-800 bg-zinc-900/60 py-2 pr-14 pl-11 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none"
            />
            <kbd
              aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rounded-sm border border-zinc-800 bg-zinc-950/60 px-1.5 py-0.5 font-mono text-[0.65rem] text-zinc-500"
          >
              ⌘K
            </kbd>
          </div>
          </div>
        </header>
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-12">
        {visible.length === 0 ? (
          <div className="py-20 text-center md:py-28">
            <p className="font-display text-lg tracking-tightish text-zinc-200">
              {needle
                ? `No articles match \u201C${needle}\u201D.`
                : "No articles match this filter."}
            </p>
            <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-zinc-400">
              Try a different keyword or category — clearing the filters brings
              all {posts.length} back.
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
          <>
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group mb-14 block overflow-hidden rounded-sm border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-900/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[320px]">
                    <Image
                      src={featured.coverImage}
                      alt={`Cover for ${featured.title}`}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[0.7rem] font-medium tracking-widest text-emerald-400 uppercase">
                        Featured · {featured.category}
                      </span>
                      <span className="label text-zinc-500">
                        {formatDate(featured.publishedAt)} · {featured.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-white transition-colors duration-200 group-hover:text-emerald-50 md:text-[2rem]">
                      {featured.title}
                    </h2>
                    <p className="max-w-[52ch] leading-[1.7] text-zinc-400">
                      {featured.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-all duration-200 group-hover:gap-2.5">
                      Read Article <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )}
            {rest.length > 0 && (
              <>
                <div className="mb-8 flex items-baseline justify-between gap-4">
                  <h2 className="label text-zinc-500">More articles</h2>
                  {filtering && (
                    <button
                      type="button"
                      onClick={clear}
                      className="label inline-flex min-h-11 items-center text-emerald-300 underline decoration-emerald-500/40 underline-offset-4 transition-colors duration-200 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 motion-reduce:transition-none md:min-h-0"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-sm border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-900/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={`Cover for ${post.title}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-widest text-emerald-400 uppercase">
                              {post.category}
                            </span>
                            <span className="label text-zinc-600">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-display text-lg leading-[1.25] font-semibold tracking-[-0.02em] text-white transition-colors duration-200 group-hover:text-emerald-50">
                            {post.title}
                          </h3>
                          <p className="text-sm leading-[1.7] text-zinc-500">
                            {post.description}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-1.5 self-start text-xs font-medium text-emerald-400 transition-all duration-200 group-hover:gap-2.5">
                            Read Article <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
