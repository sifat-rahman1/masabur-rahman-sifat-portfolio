"use client"

import { PixelBlastLazy } from "@/components/pixel-blast-lazy"
import { useIsMobile } from "@/hooks/use-is-mobile"

type HeroBackgroundProps = Record<string, unknown>

/**
 * HeroBackground. Renders the WebGL PixelBlast canvas on desktop only.
 * PixelBlastLazy is `ssr: false`, so the server always emits null — gating
 * on mobile changes nothing about SSR HTML, and desktop loads the exact
 * same chunk as before. On phones the three.js / postprocessing bundle
 * never downloads and no WebGL loop ever starts, removing the single
 * biggest main-thread cost from mobile PageSpeed.
 */
export function HeroBackground(props: HeroBackgroundProps) {
  const isMobile = useIsMobile()
  if (isMobile) return null
  return <PixelBlastLazy {...props} />
}

export default HeroBackground
