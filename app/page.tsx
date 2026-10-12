"use client"

import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"
import { Work } from "@/components/work"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { EducationTimeline } from "@/components/education-timeline"
import { HomeFaq } from "@/components/home-faq"
import { MainCTA } from "@/components/contact-cta"

export default function Page() {
  return (
    <div className="site-container w-full max-w-full overflow-x-clip">
      <Hero />
      <LogoMarquee />
      <main id="main" className="glass-grain-wrapper w-full max-w-full overflow-x-clip">
        <Work />
        <Services />
        <About />
        <EducationTimeline />
        <HomeFaq />
        <MainCTA />
      </main>
    </div>
  )
}
