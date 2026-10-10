"use client"

import { useCallback, useSyncExternalStore } from "react"

/**
 * Live media query, read from the source rather than from a library snapshot.
 * The preference can change while the page is open - an OS toggle, a devtools
 * override - and a stale value would leave motion running for a reader who
 * asked for none. The server snapshot is `false`: nothing has been measured yet
 * on the server, and every caller treats `false` as "the plain state".
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", onChange)
      return () => list.removeEventListener("change", onChange)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}
