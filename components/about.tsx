"use client"

import { site } from "@/lib/site"
import ProfileCard from "./ProfileCard"
import { FoldText } from "@/components/FoldText"

/**
 * About. Two-column editorial layout with left 3D profile card.
 */
export function About() {
  const { about } = site

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="about" aria-labelledby="about-heading" className="rule-t">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-12 md:py-32">
        {/* Section label */}
        <span className="label text-muted mb-12 block">
          <FoldText text={`${about.index} / ${about.label}`} />
        </span>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[60vh]">
          {/* LEFT COLUMN — 3D Profile Card */}
          <div className="lg:col-span-5">
            <ProfileCard
              avatarUrl="/images/sifat-portrait-no-bg.png"
              contactText="Get in Touch"
              enableTilt={true}
              handle="sifat"
              name="Sifat"
              onContactClick={handleContactClick}
              showUserInfo={true}
              status="Available for Hire"
              title="AI-Native Builder & Designer"
            />
          </div>

          {/* RIGHT COLUMN — About text content */}
          <div className="lg:col-span-7">
            <h2
              id="about-heading"
              className="mb-8 text-3xl font-medium tracking-tight text-neutral-900 text-balance md:mb-10 md:text-5xl"
            >
              <FoldText text={about.lead} />
            </h2>

            <div className="mt-10 flex flex-col space-y-6 text-base leading-relaxed text-neutral-600 md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="max-w-[62ch] text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
