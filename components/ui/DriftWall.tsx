"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import type { CSSProperties } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import "./DriftWall.css"

export interface DriftWallProps {
  /** Image URLs. Low-res only: each one is painted many times over. */
  items: string[]
  /**
   * Base column count. The wall grows past this to cover a wide viewport, and
   * never drops below it, so the number is a floor rather than a setting.
   */
  columns?: number
  tileWidth?: number
  tileHeight?: number
  gap?: number
  radius?: number
  /** Resting pose of the plane, in degrees. */
  tilt?: number
  turn?: number
  roll?: number
  perspective?: number
  /** How far the plane sits behind the perspective origin, in px. */
  depth?: number
  /** Drift speed in px/s for a column whose variance factor lands on 1. */
  speed?: number
  direction?: "up" | "down"
  /** Spread of the per-column speeds around `speed`, 0 = every column equal. */
  variance?: number
  /** Pointer travel in degrees, 0 = the plane never answers the pointer. */
  parallax?: number
  /** 0 = hard edges, 1 = the wall dissolves before it reaches the frame. */
  fade?: number
  /** Tile opacity beneath the overlay: the wall's overall weight. */
  dim?: number
  grayscale?: boolean
  overlayColor?: string
  className?: string
  style?: CSSProperties
}

/**
 * Scale of the plane past its container. Has to clear the tilt and the roll at
 * 100vh, or a corner of the wall lifts into view. Mirrored by `--dw-scale` in
 * DriftWall.css so the resting pose and the animated one cannot drift apart.
 */
const PLANE_SCALE = 1.18

/** Degrees of yaw and pitch at full parallax travel. */
const PARALLAX_YAW = 12
const PARALLAX_PITCH = 9

/**
 * Per-frame smoothing at 60fps. Both are corrected for the real frame duration
 * below, so a 120Hz display damps at the same rate in wall-clock time instead of
 * twice as fast.
 */
const POINTER_SMOOTHING = 0.08
const SPEED_SMOOTHING = 0.06

/**
 * Ceiling on a single frame's step. A background tab stops rAF but not the
 * clock, so without this the first frame after a restore advances the wall by
 * however many seconds the reader was away.
 */
const MAX_STEP_SECONDS = 1 / 20

/** Guard rail on DOM size: columns multiply the tile count. */
const MAX_COLUMNS = 14

/** Narrow viewports shrink the tile instead of thinning out the wall. */
const NARROW_WIDTH = 768
const NARROW_TILE_FRACTION = 0.42

/** Height the column copies have to cover, as a multiple of the container. */
const COPY_OVERSCAN = 1.6

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches

/**
 * Server snapshot: assume motion is welcome. A reader who has asked for less gets
 * a still wall on hydration, without the wall ever drifting for one frame first.
 */
const getReducedMotionOnServer = () => false

/**
 * An infinitely drifting wall of tiles behind the gallery hero.
 *
 * The drift is transform-only: the frame loop writes `translate3d` to one track
 * per column and one transform to the plane, and nothing else. Layout, paint and
 * decode happen once, so the loop stays inside a compositor frame.
 */
export function DriftWall({
  items,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = "up",
  variance = 0.45,
  parallax = 0.6,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = "#08080A",
  className,
  style,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const trackRefs = useRef<(HTMLDivElement | null)[]>([])

  const offsetsRef = useRef<number[]>([])
  const velocitiesRef = useRef<number[]>([])
  const pointerRef = useRef({ x: 0, y: 0 })
  const dampedRef = useRef({ x: 0, y: 0 })
  const lastTsRef = useRef<number | null>(null)

  /**
   * Width starts at 0 so the server and the first client render agree on the
   * column count. The ResizeObserver corrects it before the first paint.
   */
  const [size, setSize] = useState({ width: 0, height: 600 })
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionOnServer
  )

  useLayoutEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height: height || 600 })
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /**
   * A narrow viewport scales the tile down as one factor applied to both axes, so
   * the wall keeps its proportions and simply reads closer. It does not thin the
   * wall out: the column count follows the measured width either way.
   */
  const narrow =
    size.width > 0 && size.width < NARROW_WIDTH
      ? Math.max(
          110 / tileWidth,
          (size.width * NARROW_TILE_FRACTION) / tileWidth
        )
      : 1
  const tileW = Math.round(tileWidth * narrow)
  const tileH = Math.round(tileHeight * narrow)

  /** Enough columns to cover the viewport at this scale, never fewer than asked. */
  const columnCount = useMemo(() => {
    if (!size.width) return columns
    const needed = Math.ceil(size.width / PLANE_SCALE / (tileW + gap)) + 1
    return Math.min(MAX_COLUMNS, Math.max(columns, needed))
  }, [columns, gap, size.width, tileW])

  /** Items dealt round-robin, so a short list spreads across the whole wall. */
  const columnItems = useMemo(() => {
    const cols: string[][] = Array.from({ length: columnCount }, () => [])
    items.forEach((item, index) => cols[index % columnCount].push(item))
    return cols.map((col) => (col.length ? col : items.slice(0, 1)))
  }, [items, columnCount])

  /**
   * The loop translates a track by at most one copy height, so the column has to
   * hold enough copies to fill the container even at that offset - plus the
   * headroom the tilt and the plane scale need.
   */
  const columnMeta = useMemo(
    () =>
      columnItems.map((col) => {
        const unit = tileH + gap
        const copyHeight = Math.max(unit, col.length * unit)
        const copies = Math.max(
          2,
          Math.ceil((size.height * COPY_OVERSCAN) / copyHeight) + 1
        )
        return { copyHeight, copies }
      }),
    [columnItems, gap, size.height, tileH]
  )

  /**
   * Prime the phases once, then keep every column where it already was: a resize
   * should correct the wall, not teleport the drift.
   */
  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => {
      const current =
        offsetsRef.current[c] ?? meta.copyHeight * ((c * 0.37) % 1)
      return current % meta.copyHeight
    })
    velocitiesRef.current = columnItems.map(
      (_, c) => velocitiesRef.current[c] ?? 0
    )
  }, [columnItems, columnMeta])

  /**
   * Adjacent columns drift opposite ways at slightly different speeds, from a
   * golden-ratio sequence: neighbours pull apart without looking shuffled. Same
   * curve as the React Bits original.
   */
  const baseVelocities = useMemo(() => {
    const sign = direction === "up" ? 1 : -1
    return columnItems.map((_, c) => {
      const pseudo = ((c * 0.6180339887 + 0.35) % 1) * 2 - 1
      const alternate = c % 2 === 0 ? 1 : -1
      return speed * (1 + variance * pseudo) * sign * alternate
    })
  }, [columnItems, direction, speed, variance])

  /**
   * `px` and `py` are the damped pointer position, -0.5 to 0.5 per axis. Travel
   * leans the plane away from the pointer, which is what sells the depth: moving
   * right turns the wall's far edge in, rather than tipping it over the reader.
   */
  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current
      if (!plane) return
      const yaw = turn + px * parallax * PARALLAX_YAW
      const pitch = tilt - py * parallax * PARALLAX_PITCH
      plane.style.transform =
        `translate(-50%, -50%) scale(${PLANE_SCALE}) ` +
        `rotateX(${pitch.toFixed(3)}deg) rotateY(${yaw.toFixed(3)}deg) ` +
        `rotateZ(${roll}deg) translateZ(${-depth}px)`
    },
    [depth, parallax, roll, tilt, turn]
  )

  /** Resting pose, so the wall is placed before the loop has ever run. */
  useLayoutEffect(() => {
    applyPlaneTransform(0, 0)
  }, [applyPlaneTransform])

  /**
   * The frame loop. Nothing here reads layout: offsets live in refs, the tracks
   * hold the tiles, and the only work per frame is one transform per column plus
   * one for the plane.
   */
  useEffect(() => {
    const node = containerRef.current
    if (!node || reduced) return

    let frame = 0

    const step = (timestamp: number) => {
      const previous = lastTsRef.current
      lastTsRef.current = timestamp
      const dt =
        previous === null
          ? 0
          : Math.min((timestamp - previous) / 1000, MAX_STEP_SECONDS)

      if (dt > 0) {
        const speedEase = 1 - Math.pow(1 - SPEED_SMOOTHING, dt * 60)

        for (let c = 0; c < columnMeta.length; c += 1) {
          const meta = columnMeta[c]
          const track = trackRefs.current[c]
          if (!track) continue

          const velocity = velocitiesRef.current[c] ?? 0
          const target = baseVelocities[c] ?? 0
          const next = velocity + (target - velocity) * speedEase
          velocitiesRef.current[c] = next

          const height = meta.copyHeight
          let offset = (offsetsRef.current[c] ?? 0) + next * dt
          if (offset >= height || offset <= -height) offset %= height
          if (offset < 0) offset += height
          offsetsRef.current[c] = offset

          track.style.transform = `translate3d(0, ${-offset.toFixed(2)}px, 0)`
        }

        const pointerEase = 1 - Math.pow(1 - POINTER_SMOOTHING, dt * 60)
        const damped = dampedRef.current
        const pointer = pointerRef.current
        damped.x += (pointer.x - damped.x) * pointerEase
        damped.y += (pointer.y - damped.y) * pointerEase
        applyPlaneTransform(damped.x, damped.y)
      }

      frame = requestAnimationFrame(step)
    }

    const start = () => {
      if (frame) return
      // The gap since the last frame is unknowable after a stop, so drop it.
      lastTsRef.current = null
      frame = requestAnimationFrame(step)
    }

    const stop = () => {
      if (!frame) return
      cancelAnimationFrame(frame)
      frame = 0
      lastTsRef.current = null
    }

    /**
     * The wall drifts only while the hero is on screen. Off screen it costs
     * nothing, which is the difference between a background and a background tax.
     */
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      stop()
    }
  }, [applyPlaneTransform, baseVelocities, columnMeta, reduced])

  /**
   * The pointer is read from the window, not from the wall: the wall is
   * `pointer-events: none` so it can never sit between the reader and the page.
   * Viewport coordinates are enough, and they cost no layout read per frame.
   */
  useEffect(() => {
    if (reduced || parallax <= 0) return
    // Touch has no hover state to read, and a drag would fight the scroll.
    if (window.matchMedia("(hover: none)").matches) return

    const onMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      }
    }
    const recenter = () => {
      pointerRef.current = { x: 0, y: 0 }
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("blur", recenter)
    document.documentElement.addEventListener("pointerleave", recenter)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("blur", recenter)
      document.documentElement.removeEventListener("pointerleave", recenter)
    }
  }, [parallax, reduced])

  const cssVars = {
    "--dw-tile-w": `${tileW}px`,
    "--dw-tile-h": `${tileH}px`,
    "--dw-gap": `${gap}px`,
    "--dw-radius": `${radius}px`,
    "--dw-perspective": `${perspective}px`,
    "--dw-scale": `${PLANE_SCALE}`,
    "--dw-tilt": `${tilt}deg`,
    "--dw-turn": `${turn}deg`,
    "--dw-roll": `${roll}deg`,
    "--dw-depth": `${-depth}px`,
    "--dw-dim": `${dim}`,
    "--dw-gray": grayscale ? "1" : "0",
    "--dw-overlay": overlayColor,
    "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
    ...style,
  } as CSSProperties

  /** One width per tile, so no 1920px plate is ever served to a 220px tile. */
  const imageSizes = `(max-width: ${NARROW_WIDTH}px) 45vw, ${tileW}px`

  return (
    <div
      ref={containerRef}
      className={cn("drift-wall", className)}
      style={cssVars}
      aria-hidden="true"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => (
          <div className="drift-wall__col" key={`col-${c}`}>
            <div
              className="drift-wall__track"
              ref={(element) => {
                trackRefs.current[c] = element
              }}
            >
              {Array.from({ length: columnMeta[c]?.copies ?? 0 }).map(
                (_, copy) =>
                  col.map((item, index) => (
                    <div
                      className="drift-wall__tile"
                      key={`${c}-${copy}-${index}`}
                    >
                      <span className="drift-wall__inner">
                        <Image
                          className="drift-wall__img"
                          src={item}
                          alt=""
                          fill
                          sizes={imageSizes}
                          draggable={false}
                        />
                        <span className="drift-wall__overlay" />
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DriftWall
