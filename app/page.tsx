"use client"

import dynamic from "next/dynamic"
import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"

/**
 * Below-the-fold sections are code-split so the initial bundle carries only
 * the hero + marquee. Each lazy section renders on the server (ssr: true, the
 * default) so desktop layout, breakpoints and content order are identical —
 * only the JS delivery is deferred.
 */
const Work = dynamic(() => import("@/components/work").then((m) => m.Work), {
  loading: () => <div className="min-h-[200px]" />,
})
const Services = dynamic(
  () => import("@/components/services").then((m) => m.Services),
  { loading: () => <div className="min-h-[200px]" /> },
)
const About = dynamic(() => import("@/components/about").then((m) => m.About), {
  loading: () => <div className="min-h-[200px]" />,
})
const EducationTimeline = dynamic(
  () => import("@/components/education-timeline").then((m) => m.EducationTimeline),
  { loading: () => <div className="min-h-[200px]" /> },
)
const HomeFaq = dynamic(() => import("@/components/home-faq").then((m) => m.HomeFaq), {
  loading: () => <div className="min-h-[200px]" />,
})
const MainCTA = dynamic(
  () => import("@/components/contact-cta").then((m) => m.MainCTA),
  { loading: () => <div className="min-h-[200px]" /> },
)

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
