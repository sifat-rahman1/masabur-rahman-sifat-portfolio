"use client"

import { useEffect, useRef, useState } from "react"

export type ElementSize = {
  width: number
  height: number
}

const EMPTY: ElementSize = { width: 0, height: 0 }

/**
 * Measures an element's border box and keeps it current.
 *
 * Used where a size has to be animated as a number but is really decided by the
 * content - the dock's width is set by its own links, so a hard-coded value
 * would break the moment a label changed length or the display face landed.
 * Measuring keeps the geometry honest.
 *
 * Returns a tuple so the ref and the measurement travel together.
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<ElementSize>(EMPTY)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const read = () => {
      const rect = node.getBoundingClientRect()
      setSize((current) =>
        current.width === rect.width && current.height === rect.height
          ? current
          : { width: rect.width, height: rect.height }
      )
    }

    read()
    const observer = new ResizeObserver(read)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, size] as const
}
