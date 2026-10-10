import Link from "next/link"

import { ArrowUpRight } from "@/components/icons"
import { site } from "@/lib/site"

/**
 * The one promo card in the directory: the owner's own offer, sitting inside the
 * resource grid.
 *
 * It is built to be legible as promotion rather than as a resource, since the
 * nine cards around it are all free tools: the gradient border, the emerald
 * wash, the availability line and an off-site CTA all say "work with me" and
 * none of them claim to be a download.
 *
 * The aura is a sibling of the card rather than a child, so it can bleed past
 * the border, and it is animated with opacity because blur plus a colour
 * transition would repaint the whole halo every frame.
 */
export function AgencyPromoCard() {
  return (
    <div className="group relative h-full transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-sm bg-emerald-500/[0.12] opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <article className="relative flex h-full flex-col rounded-sm border border-emerald-500/30 bg-gradient-to-br from-zinc-900 to-emerald-950/30 p-5 backdrop-blur-md transition-colors duration-300 group-hover:border-emerald-500/50">
        <span className="label text-emerald-300/80">
          {site.hero.availability}
        </span>

        <h3 className="mt-5 font-display text-lg leading-snug font-semibold tracking-tightish text-balance text-zinc-100">
          Need a bespoke, anti-slop digital platform?
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          We engineer lightning-fast, high-converting websites tailored to your
          brand.
        </p>

        <Link
          href="/#contact"
          className="group/cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-[0_0_24px_rgba(16,185,129,0.35)] transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          Get a Free Technical Audit
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      </article>
    </div>
  )
}
