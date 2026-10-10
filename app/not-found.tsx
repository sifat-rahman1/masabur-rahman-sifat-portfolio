import Link from "next/link"
import { GlassNav } from "@/components/glass-nav"
import { ArrowUpRight } from "@/components/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <GlassNav />
      <main
        id="main"
        className="mx-auto flex min-h-[70svh] w-full max-w-shell flex-col justify-center px-6 py-24 md:px-12"
      >
        <span className="label text-muted">Error 404</span>
        <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,4.8vw,3.75rem)] font-medium tracking-display text-balance">
          This page was never built.
        </h1>
        <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-muted">
          The link you followed does not exist. The work does.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex w-fit items-center gap-3 bg-ink px-7 py-4 text-paper transition-colors duration-200 hover:bg-ink/80"
        >
          <span className="label">Back to the portfolio</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </main>
    </>
  )
}
