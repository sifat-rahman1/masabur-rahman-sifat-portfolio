import { BRAND_MARKS } from "@/lib/brand-marks"
import { toolGroups, type ToolMark } from "@/lib/tools"

/**
 * Card shell. `group` sits on the list item because Tailwind's group-hover is a
 * descendant selector - a card cannot hover-parent its own content, and the
 * sweep lives on the card's ::after.
 *
 * The sweep is transform-only: a fixed-width band parked off the left edge,
 * sheared and translated across the face on hover, so nothing reflows and the
 * browser keeps it on the compositor.
 *
 * It transitions `translate`, not `transform`. Tailwind v4 emits translate-x-*
 * as the standalone `translate` property and leaves `transform` to the skew,
 * so a transform-only transition would teleport the band instead of drawing it.
 */
const CARD = [
  "relative h-full overflow-hidden rounded-sm border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-md",
  "transition-all duration-500 ease-editorial motion-reduce:transition-none",
  "group-hover:-translate-y-1.5 group-hover:border-zinc-500 group-hover:bg-zinc-900/70",
  "after:pointer-events-none after:absolute after:inset-y-0 after:-left-[45%] after:w-[35%] after:-skew-x-12",
  "after:bg-[linear-gradient(100deg,transparent,rgba(250,250,248,0.08),transparent)]",
  "after:opacity-0 after:transition-[translate,opacity] after:duration-700 after:ease-editorial after:content-['']",
  "group-hover:after:translate-x-[450%] group-hover:after:opacity-100",
  "motion-reduce:after:hidden",
].join(" ")

/** Every mark draws at 24px inside a 40px plate, so the insets read even. */
const MARK = "h-6 w-6"

/**
 * Plate for a tool's mark: the only glow on the page, and it fires only under
 * the pointer. `bg-zinc-800/50` is a step up from the card face, which is what
 * makes a white mark read as lit rather than stamped flat onto the charcoal.
 */
const PLATE = [
  "flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-800/50 text-zinc-200",
  "transition-all duration-500 ease-editorial motion-reduce:transition-none",
  "group-hover:scale-110 group-hover:border-zinc-700 group-hover:text-white",
  "group-hover:drop-shadow-[0_0_10px_rgba(250,250,248,0.35)]",
].join(" ")

/**
 * The mark itself. Decorative in all three branches, because the card's heading
 * already names the tool, so none of them reach the accessibility tree.
 *
 * Brand paths paint `currentColor` rather than their brand hex: a wall of
 * twenty-one competing colours would fight the card, and the plate already
 * carries the hover state through one text colour.
 */
function ToolMarkGraphic({ mark }: { mark: ToolMark }) {
  if (mark.kind === "brand") {
    const brand = BRAND_MARKS[mark.slug]

    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={MARK}
      >
        {brand.paths.map((d) => (
          <path key={d.slice(0, 20)} d={d} />
        ))}
      </svg>
    )
  }

  if (mark.kind === "monogram") {
    return (
      <span
        aria-hidden="true"
        className={`${MARK} flex items-center justify-center font-display text-[0.8125rem] leading-none font-semibold tracking-tightish`}
      >
        {mark.text}
      </span>
    )
  }

  const Icon = mark.icon

  return <Icon aria-hidden="true" strokeWidth={1.5} className={MARK} />
}

/**
 * The stack, as five numbered groups.
 *
 * Cards are deliberately uniform. This is a registry rather than a feature
 * grid, so the eye needs to scan down a column and compare like with like, and
 * hierarchy is carried by the group header instead of by card size. The group
 * numeral is serif italic because DESIGN.md hands that treatment to subheads,
 * not to labels.
 */
export function ToolsStack() {
  return (
    <div className="flex flex-col gap-14 md:gap-20">
      {toolGroups.map((group) => {
        const headingId = `tools-${group.index}`

        return (
          <section key={group.index} aria-labelledby={headingId}>
            <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-zinc-800/80 pt-6 pb-8 md:pb-10">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-sm text-zinc-500 italic">
                  {group.index}
                </span>
                <h2 id={headingId} className="label text-zinc-300">
                  {group.title}
                </h2>
              </div>
              <span className="label text-zinc-600">
                {group.tools.length} tools
              </span>
            </header>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {group.tools.map((tool) => (
                <li key={tool.name} className="group">
                  <article className={CARD}>
                    <div className={PLATE}>
                      <ToolMarkGraphic mark={tool.mark} />
                    </div>

                    <h3 className="mt-5 font-display text-base leading-snug font-semibold tracking-tightish text-white">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {tool.role}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
