"use client"

import { useCallback, useEffect, useLayoutEffect, useRef } from "react"

type FitTextProps = {
  text: string
  /**
   * Rendered on the server and used for the first paint, before JS measures.
   * Give it a close `vw` value so there is no visible reflow on hydration.
   */
  initialFontSize?: string
  /** 1 = fills the container exactly. Above 1 bleeds past both edges. */
  scale?: number
  /** Unitless line-height, so it scales with the fitted font size. */
  lineHeight?: number
  className?: string
  ariaHidden?: boolean
}

/** Size the text is measured at before solving for the fitted size. */
const MEASURE_AT = 100

/**
 * Scales a single line of type so it spans its container exactly.
 *
 * Uniform scaling only: the font size is solved for and the glyphs are never
 * stretched or squashed, so the face keeps its true proportions. Re-fits on
 * resize and again once the webfonts have landed.
 */
export function FitText({
  text,
  initialFontSize = "10vw",
  scale = 1,
  lineHeight = 0.86,
  className = "",
  ariaHidden = false,
}: FitTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const fit = useCallback(() => {
    const wrapper = wrapperRef.current
    const node = textRef.current
    if (!wrapper || !node) return

    const available = wrapper.clientWidth
    if (available < 1) return

    const target = available * scale
    const range = document.createRange()
    const width = () => {
      range.selectNodeContents(node)
      return range.getBoundingClientRect().width
    }

    // Measure the natural advance width at a known size, then solve for the
    // size that fills the container.
    node.style.fontSize = `${MEASURE_AT}px`
    const natural = width()

    if (natural < 1) {
      node.style.fontSize = initialFontSize
      return
    }

    let next = Math.max(8, (target * MEASURE_AT) / natural)
    node.style.fontSize = `${next.toFixed(2)}px`

    // Correction pass: sub-pixel rounding and trailing letter-spacing can
    // push a fitted line past the container. Never let it happen - the
    // measurement is always the winner, not the arithmetic.
    const actual = width()
    if (actual > target + 0.5) {
      next *= target / actual
      node.style.fontSize = `${next.toFixed(2)}px`
    }
  }, [initialFontSize, scale])

  useLayoutEffect(() => {
    fit()
  }, [fit, text])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let lastWidth = wrapper.clientWidth

    const observer = new ResizeObserver(() => {
      const width = wrapperRef.current?.clientWidth ?? 0
      // Height-only changes are caused by our own font-size writes:
      // ignore them so the observer cannot loop.
      if (width === lastWidth) return
      lastWidth = width
      fit()
    })

    observer.observe(wrapper)

    // The first fit runs on fallback metrics, so it is a guess: re-fit on
    // the next frame, whenever a webfont lands, and on a short timer as a
    // safety net for fonts that arrive after `fonts.ready` resolves.
    const raf = requestAnimationFrame(() => requestAnimationFrame(fit))
    const timers = [250, 900, 2000].map((ms) => window.setTimeout(fit, ms))

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => fit()).catch(() => undefined)
      document.fonts.addEventListener("loadingdone", fit)
    }

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach((timer) => window.clearTimeout(timer))
      observer.disconnect()
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.removeEventListener("loadingdone", fit)
      }
    }
  }, [fit])

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <span
        ref={textRef}
        aria-hidden={ariaHidden || undefined}
        className={`block whitespace-nowrap ${className}`}
        style={{ fontSize: initialFontSize, lineHeight }}
      >
        {text}
      </span>
    </div>
  )
}
