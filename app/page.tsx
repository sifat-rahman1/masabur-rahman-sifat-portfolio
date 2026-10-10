"use client"

import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"
import { Work } from "@/components/work"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { EducationTimeline } from "@/components/education-timeline"
import { MainCTA } from "@/components/contact-cta"

export default function Page() {
  return (
    <div className="site-container">
      <Hero />
      <LogoMarquee />
      <main id="main" className="glass-grain-wrapper">
        <Work />
        <Services />
        <About />
        <EducationTimeline />
        <MainCTA />
      </main>
    </div>
  )
}
