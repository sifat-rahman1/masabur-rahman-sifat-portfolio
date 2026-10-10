"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, MotionConfig, motion } from "motion/react"

import { ArrowUpRight } from "@/components/icons"
import { LightboxModal } from "@/components/ui/LightboxModal"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  GALLERY_FILTERS,
  GALLERY_ITEMS,
  type GalleryFilter,
  type GalleryItem,
} from "@/data/galleryData"

/** `--ease-editorial`, as a tuple so the motion types accept it. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FILTER_TAB =
  "label relative isolate rounded-full px-4 py-2 text-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 motion-reduce:transition-none"

const FILTER_TAB_ACTIVE = "font-semibold text-black"

const FILTER_TAB_IDLE = "text-zinc-400 hover:text-white"

/**
 * One card in the archive.
 *
 * A `motion.button`, not the `motion.div` the brief sketched: a div with an
 * `onClick` is unreachable by keyboard, and every plate here opens something.
 * `layout` is what animates the resort, and it only measures correctly because
 * the grid is built from real columns rather than CSS `columns-*` - see the note
 * on `GalleryArchive`.
 */
function GalleryCard({
  item,
  onOpen,
}: {
  item: GalleryItem
  onOpen: (item: GalleryItem) => void
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(item)}
      aria-label={`Open ${item.title} \u2014 ${item.category}, ${item.year}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="group relative block w-full cursor-pointer overflow-hidden rounded-sm border border-zinc-800/80 bg-[#121216] text-left transition-colors duration-300 hover:border-emerald-500/40 focus-visible:border-emerald-500/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 motion-reduce:transition-none"
    >
      {/*
        `width`/`height` are the plate's measured size, so the box is reserved at
        the artwork's own ratio and `h-auto` can never distort it. `sizes` is what
        stops the optimiser from handing a 3905px plate to a 380px column.
      */}
      <Image
        src={item.image}
        alt=""
        width={item.width}
        height={item.height}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
        className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
      />

      {/*
        The overlay repeats what the button's `aria-label` already carries, so it
        is hidden from assistive tech and paints for the eye only. It fires on
        `focus-visible` too: a keyboard reader gets the same title and arrow that
        a mouse reader gets from hover.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div>
            <p className="font-display text-lg leading-tight font-medium tracking-tight text-white">
              {item.title}
            </p>
            <p className="label mt-1.5 text-zinc-400">{item.category}</p>
          </div>
          <span className="text-emerald-400">
            <ArrowUpRight className="h-5 w-5 shrink-0" />
          </span>
        </div>
      </div>
    </motion.button>
  )
}
/**
 * How many masonry columns the viewport earns. The breakpoints mirror the
 * grid's `sm:` / `lg:` tracks exactly, so the JS distribution and the CSS
 * tracks can never disagree about the column count.
 *
 * The server snapshot is one column, which corrects on hydration. That is a
 * deliberate trade: this section sits a full viewport below the hero, so the
 * correction happens before anyone scrolls to it, and the alternative -
 * guessing the viewport on the server - risks a hydration mismatch instead.
 */
function useColumnCount() {
  const sm = useMediaQuery("(min-width: 640px)")
  const lg = useMediaQuery("(min-width: 1024px)")
  return lg ? 3 : sm ? 2 : 1
}

/**
 * The archive hub: heading, sticky filter bar, masonry grid, lightbox.
 *
 * The grid is a JS round-robin split over real flex columns, not CSS
 * `columns-*`. That is the strict-rule call: `motion.button layout` measures
 * its bounding box to animate a resort, and multicol fragments that
 * measurement - cards jump tracks mid-animation. Real columns keep every
 * card in normal flow, so `layout` glides within a column while
 * `AnimatePresence` fades cards that enter or leave the filter. The one
 * behavioural cost is that a card changing columns exits and re-enters
 * rather than gliding across, which reads as an intentional staggered
 * refresh rather than a glitch.
 *
 * `MotionConfig reducedMotion="user"` carries the OS setting for every
 * motion node below - cards, filter pill, lightbox - with no per-card
 * plumbing. The live region announces the result count so a filter change
 * is perceivable without sight.
 */
export function GalleryArchive() {
  const [filter, setFilter] = useState<GalleryFilter>("All")
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  const columnCount = useColumnCount()

  const filtered = useMemo(
    () =>
      filter === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === filter),
    [filter]
  )

  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array.from({ length: columnCount }, () => [])
    filtered.forEach((item, index) => {
      cols[index % columnCount].push(item)
    })
    return cols
  }, [filtered, columnCount])

  const handleOpen = useCallback((item: GalleryItem) => {
    setSelected(item)
  }, [])

  const handleClose = useCallback(() => {
    setSelected(null)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="archive"
        aria-labelledby="archive-heading"
        className="relative scroll-mt-28"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-10 text-center">
          <p className="label text-emerald-400">Sifat // Archive index</p>
          <h2
            id="archive-heading"
            className="mt-4 font-display text-4xl font-extrabold tracking-tighter text-[#FAFAFA] uppercase md:text-6xl"
          >
            Selected work
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Posters, vector illustrations and spatial experiments — filter by
            discipline, open any plate for the full frame.
          </p>
          <p aria-live="polite" className="label mt-6 text-zinc-500">
            Showing {filtered.length} of {GALLERY_ITEMS.length} works
          </p>
        </div>

        {/*
          Floating capsule dock, not a full-bleed band: the outer row is
          `w-full pointer-events-none`, so only the capsule itself takes
          clicks and everything around it passes through to the cards. The
          inner dock is `w-fit rounded-full`, so the blur and border wrap the
          tabs rather than stretching a stripe across the viewport — there is
          no band edge for cards to peek past, and the 80px gap above the
          previous `top-20` band (the source of the black-stripe report) is
          gone. `top-24` clears the fixed header; `z-30` sits below the
          header (`z-[100]`) and above the grid (`z-10`). The dock stays
          inside this section's bounds, so it never overlaps the hero or the
          footer. One shared `layoutId` pill glides tab to tab instead of
          blinking; the spring reads as physical rather than timed, and
          `MotionConfig reducedMotion="user"` stills it for readers who ask
          for no motion. `-z-10` on the pill (inside an `isolate` tab) keeps
          the emerald behind the label without leaving the button's paint.
        */}
        <div className="pointer-events-none sticky top-24 z-30 mb-12 flex w-full justify-center px-4">
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-zinc-800/80 bg-[#121216]/80 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none sm:gap-2 sm:p-2">
            {GALLERY_FILTERS.map((option) => {
              const active = option === filter
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={active}
                  className={`${FILTER_TAB} ${active ? FILTER_TAB_ACTIVE : FILTER_TAB_IDLE}`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeCategoryTab"
                      aria-hidden="true"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 -z-10 rounded-full bg-emerald-400"
                    />
                  )}
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        {/*
          Track count mirrors `useColumnCount`: 1 / 2 / 3 at base / sm / lg.
          `relative z-10` pins the whole grid below the sticky bar (`z-30`)
          in the paint order, so sliding cards never cover the tabs.
          `pt-4` keeps the first row off the bar's bottom border on arrival
          from the hero; `mb-10` on the bar handles the rest of the gap.
          `initial={false}` keeps the below-fold first paint calm - the cards
          simply exist when scrolled to - while filter changes still animate.
        */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 pt-4 pb-32 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="flex min-w-0 flex-col gap-6">
              <AnimatePresence initial={false}>
                {column.map((item) => (
                  <GalleryCard key={item.id} item={item} onOpen={handleOpen} />
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <LightboxModal selectedItem={selected} onClose={handleClose} />
    </MotionConfig>
  )
}

export default GalleryArchive