import Link from "next/link"

/**
 * MainCTA. Premium minimalist gateway at the foot of the landing page:
 * centered Jakarta headline with contrast treatment, supporting copy, and
 * one tactile pill button routing to the dedicated /contact page where the
 * brief form lives. No inputs here by design.
 */
export function MainCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="main-cta-heading"
      className="relative w-full overflow-hidden border-t border-neutral-200 bg-white py-28 font-jakarta md:py-36"
    >
      {/* Background Dot Matrix (matches site design system) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(24, 24, 27, 0.22) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center md:px-12">
        {/* Eyebrow Tag */}
        <span className="mb-6 font-mono text-xs tracking-[0.2em] text-neutral-400 uppercase">
          05 / What&apos;s Next
        </span>

        {/* Main Headline */}
        <h2
          id="main-cta-heading"
          className="text-4xl leading-[1.08] font-medium tracking-tight text-neutral-900 sm:text-6xl md:text-7xl"
        >
          Have a vision? <br className="hidden sm:block" />
          <span className="text-neutral-400">
            Let&apos;s build something considered.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-6 mb-10 max-w-xl text-base leading-relaxed font-light text-neutral-500 md:text-xl">
          Tell me what you&apos;re making, who it&apos;s for, and your
          timeline. I&apos;ll bring the design instinct, structural execution,
          and speed.
        </p>

        {/* Interactive Hover CTA Button */}
        <Link
          href="/contact"
          className="group relative inline-flex items-center gap-3.5 rounded-full bg-neutral-900 px-8 py-4 text-base font-medium text-white transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.16)] active:scale-95 md:text-lg"
        >
          <span>Start a conversation</span>
          <svg
            className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default MainCTA
