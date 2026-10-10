'use client'

import { usePathname } from "next/navigation"
import Preloader from "@/components/Preloader"

/**
 * HomePreloader. Mounts the global multi-language welcome preloader
 * exclusively on the homepage ("/"). Subpages own their intro via the
 * green-dot PagePreloader, so this returns null everywhere else —
 * exactly one preloader executes per route.
 */
export function HomePreloader() {
  const pathname = usePathname()
  if (pathname !== "/") return null
  return <Preloader />
}

export default HomePreloader
