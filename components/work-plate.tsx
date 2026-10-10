import { FitText } from "@/components/fit-text"
import type { Project } from "@/lib/projects"

type WorkPlateProps = {
  project: Project
  /**
   * `card` is the single floating plate: its folio numeral is measured to the
   * frame, the way `SIFAT` is measured to the page. `row` is the inline
   * fallback, rendered five times, so it keeps a plain clamped numeral.
   */
  variant?: "card" | "row"
  /**
   * Draw the plate's own hairline frame. Off inside the card, which is already a
   * frame - two frames a pixel apart read as a doubled rule.
   */
  framed?: boolean
}

/**
 * Preview plate: a strict 3:2 media frame.
 *
 * Until a project has media this draws the plate instead - bone fill, hairline
 * frame, the folio numeral and the title, no gradient and no invented imagery.
 * It reads as a printed plate on purpose, so an unfilled project looks
 * deliberate rather than broken.
 *
 * To use real media, add `media` to the project in `lib/projects.ts`:
 *
 *   media: { kind: "video", src: "/work/nebula.mp4", poster: "/work/nebula.jpg" }
 *   media: { kind: "image", src: "/work/nebula.jpg" }
 *
 * That is the whole swap: no change to this component.
 */
export function WorkPlate({
  project,
  variant = "row",
  framed = true,
}: WorkPlateProps) {
  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden bg-bone ${
        framed ? "border border-rule" : ""
      }`}
    >
      {project.media ? (
        <WorkMedia project={project} />
      ) : (
        <WorkPoster project={project} variant={variant} />
      )}
    </div>
  )
}

/** The real media, once it exists. Both branches fill the frame identically. */
function WorkMedia({ project }: { project: Project }) {
  const { media } = project
  if (!media) return null

  if (media.kind === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- same reasoning as portrait-plate: it keeps next/image's remotePatterns out of the swap, and the plain element keeps the <video> branch above literally plug-and-play.
    <img
      src={media.src}
      alt=""
      aria-hidden="true"
      decoding="async"
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  )
}

/** Drawn plate: folio numeral over the title, nothing invented. */
function WorkPoster({
  project,
  variant,
}: {
  project: Project
  variant: "card" | "row"
}) {
  const isCard = variant === "card"

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col justify-between p-3.5 md:p-4"
    >
      {isCard ? (
        <FitText
          text={project.index}
          initialFontSize="6rem"
          lineHeight={0.78}
          scale={0.96}
          className="font-display font-medium tracking-display text-ink"
        />
      ) : (
        <span className="block font-display text-[clamp(2.5rem,11vw,3.5rem)] leading-[0.78] font-medium tracking-display text-ink">
          {project.index}
        </span>
      )}

      {/* The card is the only place the title appears on screen, so it names the
          plate. The inline plate sits in a row that already names the project,
          so it stays a bare folio rather than repeating it. */}
      {isCard ? (
        <span className="label truncate text-ink/55">{project.title}</span>
      ) : null}
    </div>
  )
}
