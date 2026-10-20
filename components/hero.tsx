import Image from "next/image"
import { HeroBackground } from "@/components/hero-background"
import { CircularText } from "@/components/circular-text"
import { site } from "@/lib/site"

export function Hero() {
  const { hero } = site
  const [headlineLead, headlineTail] = hero.headline.split("websites")

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white min-h-screen flex flex-col justify-end"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <HeroBackground
          variant="circle"
          pixelSize={4}
          color="#6366f1"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.25}
          transparent
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* HERO PHOTO CONTAINER: stacked flow on mobile, absolute split on desktop */}
      <div className="pointer-events-none relative order-2 flex h-auto w-full items-end justify-center lg:absolute lg:bottom-0 lg:right-0 lg:z-10 lg:h-full lg:w-1/2 lg:justify-end">
        <Image
          src="/hero-photo.png"
          alt="Masabur Rahman Sifat — Creative Engineer & UI/UX Designer"
          width={2559}
          height={1440}
          priority
          quality={100}
          unoptimized
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 800px"
          decoding="async"
          fetchPriority="high"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
          className="h-auto w-[85vw] max-w-[340px] sm:max-w-[420px] mx-auto object-cover object-top [-webkit-image-rendering:-webkit-optimize-contrast] [image-rendering:-webkit-optimize-contrast] select-none filter drop-shadow-2xl animate-rise-in [animation-delay:360ms] origin-bottom lg:mx-0 lg:h-[92vh] lg:w-auto lg:max-w-none lg:scale-125 lg:translate-x-44 lg:object-contain lg:object-bottom xl:translate-x-52"
        />

        {/* Rotating Circular Text Badge over the shoulder/chest area */}
        <div
          aria-hidden="true"
          className="absolute right-8 bottom-8 z-20 pointer-events-auto transition-transform duration-300 hover:scale-110 lg:right-16 lg:bottom-12"
        >
          <CircularText text="SIFAT * FRONTEND * DESIGNER *" spinDuration={18} />
        </div>
      </div>

      {/* TEXT CONTENT LAYER */}
      <div className="relative z-20 order-1 mx-auto w-full max-w-shell px-4 sm:px-6 md:px-12 pb-16 md:pb-20 pt-[6rem]">
        <div className="max-w-[440px] sm:max-w-[480px] lg:max-w-[520px]">
          <h1
            id="hero-heading"
            className="mt-6 animate-rise-in font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.96] font-medium tracking-display text-neutral-900 text-balance [animation-delay:90ms]"
          >
            {headlineLead}
            <span className="font-serif font-normal italic">websites</span>
            {headlineTail}
          </h1>

          {/* AI extraction summary: screen-reader and crawler accessible,
              visually hidden to preserve the hero design. */}
          <p className="sr-only">
            Masabur Rahman Sifat — Frontend Engineer and UI/UX Designer building
            Next.js web applications and digital products.
          </p>

          <p className="mt-7 max-w-[44ch] animate-rise-in text-[1.0625rem] leading-[1.7] text-neutral-700 [animation-delay:180ms] md:text-lg">
            {hero.subline}
          </p>

          <div className="mt-10 flex animate-rise-in flex-col items-start gap-5 font-sans [animation-delay:270ms] sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              id="hero-cta-primary"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-950 px-8 py-4 font-sans text-sm font-medium text-white shadow-2xl transition-all duration-300 hover:bg-neutral-800 hover:scale-105 active:scale-95 border border-black/10"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10 mr-3 transition-colors duration-300">
                {hero.primaryCta.label}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={hero.secondaryCta.href}
              id="hero-cta-secondary"
              className="link-rule font-sans text-sm font-medium normal-case tracking-normal text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}