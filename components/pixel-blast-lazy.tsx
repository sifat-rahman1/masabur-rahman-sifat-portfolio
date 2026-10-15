"use client"

import dynamic from "next/dynamic"

const PixelBlast = dynamic(() => import("@/components/PixelBlast"), {
  ssr: false,
  loading: () => null,
})

type PixelBlastLazyProps = Record<string, unknown>

/**
 * PixelBlastLazy. Client boundary that defers the three.js / postprocessing
 * bundle until after hydration. The hero headline stays server-rendered;
 * only the canvas background is code-split. Visually identical once loaded.
 */
export function PixelBlastLazy(props: PixelBlastLazyProps) {
  return <PixelBlast {...props} />
}

export default PixelBlastLazy
