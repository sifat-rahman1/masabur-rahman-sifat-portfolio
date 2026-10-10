import { WorkList } from "@/components/work-list"
import { site } from "@/lib/site"
import { FoldText } from "@/components/FoldText"

/**
 * Work index. Minimalist typographic rows (title + category, hover shift and
 * lighten) with a static 16:9 cursor-tracking floating preview card.
 */
export function Work() {
  const { work } = site

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="rule-t bg-transparent text-[#1a1a1a] font-jakarta"
    >
      <div className="mx-auto w-full max-w-shell px-6 pt-24 pb-0 md:px-12 md:pt-32 md:pb-0">
        <header className="rule-b grid grid-cols-12 items-end gap-x-6 gap-y-8 pb-10">
          <div className="col-span-12 lg:col-span-7">
            <span className="label text-muted block">
              <FoldText text={`${work.index} / ${work.label}`} />
            </span>
            <h2
              id="work-heading"
              className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.03] font-medium tracking-display text-balance"
            >
              <FoldText text={work.title} />
            </h2>
          </div>
          <p className="col-span-12 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-muted lg:col-span-4 lg:col-start-9 lg:pb-2">
            {work.intro}
          </p>
        </header>

        <WorkList />
      </div>
    </section>
  )
}
