'use client'

import React from 'react'
import Image from 'next/image'
import {
  Layers,
  Sparkles,
  Sliders,
  Terminal,
  Bot,
  Workflow,
  CheckCircle2,
} from 'lucide-react'

/** Canvas 1: Split-pane IDE + Live dark preview widget */
export function WebDevMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm">
      <Image
        src="/web-dev.png"
        alt="Web Development Showcase by Masabur Rahman Sifat"
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        className="w-full h-auto object-cover rounded-2xl select-none"
      />
    </div>
  )
}

/** Canvas 2: Figma-style canvas with guides & custom cursor pill */
/** Canvas 2: Clean Bento UI Figma export - sits directly on green card */
export function UiUxMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
      <Image
        src="/bento-ui.png"
        alt="UI/UX Design Bento Mockup"
        width={1200}
        height={800}
        priority={false}
        className="w-full h-auto object-cover rounded-2xl select-none"
      />
    </div>
  )
}

/** Canvas 3: Graphic Design & Branding Showcase - sits directly on orange card */
export function GraphicDesignMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm">
      <Image alt="Graphic Design & Branding Showcase by Masabur Rahman Sifat" className="w-full h-auto object-cover rounded-2xl select-none" height={800} priority={false} src="/graphic-brand.png" width={1200} />
    </div>
  )
}
/** Canvas 4: AI & Automation Showcase - sits directly on yellow card */
export function AiAutomationMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm">
      <Image alt="AI & Automation Showcase by Masabur Rahman Sifat" className="w-full h-auto object-cover rounded-2xl select-none" height={800} priority={false} src="/ai-tools.png" width={1200} />
    </div>
  )
}

