/**
 * Hero background layer. Full-width, full-height photograph sitting at z-10
 * directly behind the headline block. Full-bleed `object-cover`, no distortion.
 * All overlaying text is white — see hero.tsx.
 *
 * ADDING THE PHOTO (one step, no code change):
 *   Save the portrait from chat as `hero-portrait.jpg` inside `public/`
 *   (next to `portrait.svg`). This component already points there.
 *
 * Missing-file behaviour: the photograph hides itself on load error and the
 * dark ink ground + readability gradients take over, so white text stays
 * legible and there is never a broken-image icon or white flash.
 *
 * To swap in a different photograph later:
 *   1. Drop the file in /public (e.g. portrait.jpg)
 *   2. Change `SRC` below and update the alt text
 *   3. Replace <img> with <Image> from "next/image" for production builds
 */

"use client"

import { useState } from "react"
import Image from "next/image"

/** Expected photo location — see setup note above. */
const SRC = "/hero-portrait.jpg"

export function PortraitBackground() {
  const [missing, setMissing] = useState(false)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 bg-neutral-900"
    >
      {/* Hero photograph — full-bleed, covers entire area without distortion.
          Hidden on load error: a missing file must never show a broken icon. */}
      {!missing ? (
        <Image
          src={SRC}
          alt=""
          fill
          sizes="100vw"
          decoding="async"
          priority={false}
          onError={() => setMissing(true)}
          className="h-full w-full object-cover object-center"
        />
      ) : null}

      {/* Readability gradient: hierarchy function only, so white text stays
          legible over any photograph — or over the bare ink ground when the
          photo file is missing. Left half stays dark. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      {/* Bottom vignette — grounds the text block */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  )
}
