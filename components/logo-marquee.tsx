"use client"

import React from "react"
import { ALL_LOGOS } from "@/components/logo-marquee-data"

export function LogoMarquee() {
  return (
    <section
      aria-label="Technology and design tools"
      className="relative w-full border-y border-zinc-200/80 bg-white py-12 md:py-20 select-none overflow-hidden"
    >
      {/* Background dot pattern matching Hero context */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(24, 24, 27, 0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-shell px-6 mb-6 md:mb-8 text-center">
        <p className="text-xs md:text-sm font-medium tracking-normal text-neutral-500">
          Trusted Tooling &amp; Creative Platforms
        </p>
      </div>

      {/* Marquee viewport with smooth edge-gradient masks */}
      <div
        className="group relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1}
              className="flex shrink-0 items-center justify-around gap-12 sm:gap-16 md:gap-24 px-6 md:px-12"
            >
              {ALL_LOGOS.map((logo) => (
                <div
                  key={`${copyIndex}-${logo.name}`}
                  className="group/item flex items-center gap-3 cursor-pointer py-3"
                  title={logo.name}
                >
                  <svg
                    viewBox={logo.viewBox}
                    className="h-8 md:h-10 w-auto max-w-[42px] md:max-w-[50px] fill-zinc-400 text-zinc-400 opacity-50 transition-all duration-300 ease-out group-hover/item:fill-zinc-950 group-hover/item:text-zinc-950 group-hover/item:opacity-100 group-hover/item:scale-110"
                    role="img"
                    aria-label={logo.name}
                  >
                    {logo.svg}
                  </svg>
                  <span className="text-xs md:text-sm font-semibold tracking-wider text-zinc-400 opacity-50 transition-all duration-300 ease-out group-hover/item:text-zinc-950 group-hover/item:opacity-100">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
