"use client"

import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * useIsMobile. True on viewports narrower than `breakpoint` (default 768px,
 * matching Tailwind's `md:` breakpoint). The server snapshot is `false`, so
 * SSR output and desktop behavior are unchanged — mobile-only fallbacks
 * switch in after mount behind a `mounted` guard, avoiding hydration
 * mismatches entirely.
 */
export function useIsMobile(breakpoint = 768) {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`)
}

export default useIsMobile
