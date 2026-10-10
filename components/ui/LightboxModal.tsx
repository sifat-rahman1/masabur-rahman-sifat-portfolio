"use client"

import { useEffect, useId, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { GALLERY_FORMAT_LABELS, type GalleryItem } from "@/data/galleryData"

export interface LightboxModalProps {
  /** The plate on show, or `null` when nothing is open. */
  selectedItem: GalleryItem | null
  onClose: () => void
}

/** Every focus stop the trap has to cycle, including future non-button controls. */
const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** `--ease-editorial`, as a tuple so the motion types accept it. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/**
 * The archive viewer: one plate at full size, its metadata beside it.
 *
 * Three things here are load-bearing rather than decorative:
 *
 * - **A portal to `document.body`.** The route's root element is `isolate`, which
 *   opens its own stacking context, so a `z-[200]` panel inside it still paints
 *   *below* the fixed header at `z-[100]` - the wordmark and the burger would sit
 *   on top of the artwork. A body-level portal outranks the header without the
 *   header being touched, and it also puts the panel beyond any ancestor's
 *   `overflow` and `backdrop-filter`. `document` is absent on the server, where
 *   nothing is open anyway, so the guard below costs no hydration mismatch.
 * - **`object-contain` on a `fill` box.** The archive shows a plate whole. The
 *   one banner in the set (851x315) letterboxes rather than being cropped to fit.
 * - **Focus taken and returned here, not in the grid.** `document.activeElement`
 *   at open is captured and refocused at close, because the grid re-sorts under
 *   the filter: the card that opened the plate can be gone by the time it closes.
 *
 * The exiting frame keeps its content: `AnimatePresence` holds the last rendered
 * child, so the plate does not blank out as the backdrop fades.
 */
export function LightboxModal({ selectedItem, onClose }: LightboxModalProps) {
  const reduce = useReducedMotion()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const open = selectedItem !== null

  useEffect(() => {
    if (!open) return

    returnFocusRef.current = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== "Tab") return

      const stops = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!stops || stops.length === 0) return
      const first = stops[0]
      const last = stops[stops.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !panelRef.current?.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = overflow
      returnFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          key="gallery-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
          onClick={(event) => {
            // Backdrop only. A click that lands on the panel keeps the plate up.
            if (event.target === event.currentTarget) onClose()
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close artwork"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/70 bg-zinc-900/80 text-zinc-300 transition-colors duration-200 hover:border-emerald-500/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 motion-reduce:transition-none md:top-8 md:right-8"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              &#x2715;
            </span>
          </button>

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex h-full w-full flex-col overflow-hidden md:flex-row"
          >
            <div className="flex h-[50vh] w-full shrink-0 items-center justify-center p-6 md:h-full md:w-2/3 md:p-10">
              <div className="relative h-full w-full">
                <Image
                  src={selectedItem.image}
                  alt={`${selectedItem.title} \u2014 ${selectedItem.category}, ${selectedItem.year}`}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-zinc-800/50 bg-[#08080A] p-8 md:h-full md:w-1/3 md:flex-none md:border-t-0 md:border-l md:p-12">
              {/*
                `m-auto` rather than `justify-center`: a centred flex child that
                outgrows its scroll container is clipped at the top in every
                browser, and auto margins centre without that failure.
              */}
              <div className="m-auto w-full max-w-md">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="label inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-400">
                    {selectedItem.category}
                  </span>
                  <span className="label text-zinc-500">
                    {selectedItem.year}
                  </span>
                  <span className="label text-zinc-500">
                    {GALLERY_FORMAT_LABELS[selectedItem.aspectRatio]}
                  </span>
                </div>

                <h2
                  id={titleId}
                  className="mt-5 font-display text-3xl font-bold tracking-tight text-white"
                >
                  {selectedItem.title}
                </h2>

                <p className="mt-6 text-[1.0625rem] leading-[1.75] text-zinc-400">
                  {selectedItem.description}
                </p>

                <div className="mt-8">
                  <span className="label text-zinc-500">Tools</span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {selectedItem.tools.map((tool) => (
                      <li
                        key={tool}
                        className="label rounded-sm border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-300"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default LightboxModal