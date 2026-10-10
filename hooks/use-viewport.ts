"use client"

import { useEffect, useState } from "react"

export type Viewport = {
  /** Document width, excluding any scrollbar. */
  width: number
  /** Window height, for placing a fixed element against the bottom edge. */
  height: number
}

const EMPTY: Viewport = { width: 0, height: 0 }

/**
 * Viewport size, for geometry that has to be computed in pixels rather than
 * expressed in CSS.
 *
 * Width comes from `documentElement.clientWidth`, not `window.innerWidth`: the
 * inner width includes the scrollbar, and a fixed element measured against it
 * overflows the page by the scrollbar's width. Height is the inner height,
 * because vertical placement is not affected by the scrollbar.
 *
 * Starts at zero so a caller can tell "not measured yet" from a real value,
 * which keeps the server and the first client render identical.
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(EMPTY)

  useEffect(() => {
    const read = () =>
      setViewport((current) => {
        const next = {
          width: document.documentElement.clientWidth,
          height: window.innerHeight,
        }
        return current.width === next.width && current.height === next.height
          ? current
          : next
      })

    read()
    window.addEventListener("resize", read, { passive: true })
    return () => window.removeEventListener("resize", read)
  }, [])

  return viewport
}
