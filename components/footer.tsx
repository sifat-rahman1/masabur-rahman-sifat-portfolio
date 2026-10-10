import Link from "next/link"

import { ArrowUp, ArrowUpRight, Marker } from "@/components/icons"
import { site } from "@/lib/site"

/**
 * Footer. Obsidian editorial: massive stacked wordmark + contact block,
 * 3-column nav grid (Site / Extras / Follow), hairline outro bar.
 * Approved from the Stitch preview (project 18260062211261181539).
 * FOLLOW links are placeholders to #contact until real social URLs land,
 * except GitHub which points at the live profile.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const { footer } = site

  return (
    <footer className="overflow-x-clip bg-[#08080A] text-[#F4F4F0]">
      <div className="mx-auto w-full max-w-shell px-6 md:px-12">
        {/* 1 — Branding + direct contact */}
        <div className="grid gap-10 border-b border-white/10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <p
              aria-label="Masabur Rahman Sifat"
              className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase"
            >
              <span className="block">{footer.wordmark[0]}</span>
              <span className="block">{footer.wordmark[1]}</span>
              <span className="flex items-center gap-[0.18em]">
                <Marker className="h-[0.55em] w-[0.55em] bg-[#F4F4F0]" />
                <span>{footer.wordmark[2]}</span>
              </span>
            </p>
          </div>

          <div className="md:col-span-5 md:pt-2">
            <p className="font-serif text-xl text-white/85 italic md:text-2xl">
              {footer.contact.heading}
            </p>
            <a
              href={`mailto:${footer.contact.email}`}
              className="mt-3 block text-xl font-semibold break-all transition-colors duration-200 hover:text-white md:text-2xl"
            >
              {footer.contact.email}
            </a>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] tracking-widest text-white/60 uppercase">
              {footer.contact.location}
            </p>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-white/55">
              {footer.contact.blurb}
            </p>
          </div>
        </div>

        {/* 2 — Navigation grid */}
        <nav
          aria-label="Footer navigation"
          className="grid gap-10 py-14 md:grid-cols-3 md:py-20"
        >
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-2.5 md:space-y-3">
                {col.links.map((item) => {
                  const external = item.href.startsWith("http")
                  const cls =
                    "group inline-flex items-center gap-1.5 text-xl font-medium text-white/80 transition-all duration-200 hover:translate-x-1 hover:text-white md:text-2xl"
                  return (
                    <li key={item.label}>
                      {external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cls}
                        >
                          {item.label}
                          <ArrowUpRight className="h-4 w-4 text-white/40 transition-colors duration-200 group-hover:text-white" />
                        </a>
                      ) : (
                        <Link href={item.href} className={cls}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* 3 — Outro */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[11px] tracking-widest text-white/45 uppercase">
            &copy; {year} Masabur Rahman Sifat — {footer.legal}
          </span>
          <a
            href="#home"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] tracking-widest text-white/60 uppercase transition-colors duration-200 hover:text-white"
          >
            {footer.backToTop}
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
