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
/** Canvas 4: Node-based workflow diagram with pulsing SVG connectors & glowing status */
export function AiAutomationMockup() {
  return (
    <div className="w-full h-full min-h-[280px] md:min-h-[320px] relative p-5 rounded-lg bg-zinc-950 border border-black/30 shadow-2xl overflow-hidden flex flex-col justify-center text-white">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2">
        {/* Node 1: Prompt */}
        <div className="w-full md:w-[28%] p-3 rounded-md bg-[#000000] border border-white/15 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-400 uppercase">Step 01</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Prompt Input
          </div>
          <p className="text-[10px] text-neutral-400 font-mono truncate">
            &quot;Sync brief -&gt; app&quot;
          </p>
        </div>

        {/* SVG Connector 1 */}
        <div className="flex items-center justify-center my-[-4px] md:my-0 md:mx-1 text-cyan-400/60">
          <svg className="w-6 h-6 md:w-8 md:h-6" viewBox="0 0 32 24" fill="none">
            <path
              d="M0 12H28M28 12L20 6M28 12L20 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Node 2: AI Engine */}
        <div className="w-full md:w-[32%] p-3.5 rounded-md bg-[#000000] border border-cyan-400/40 shadow-xl space-y-2 relative">
          <div className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-sm bg-cyan-400 text-black text-[9px] font-bold uppercase tracking-wider">
            Agent Core
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <Bot className="w-4 h-4 text-cyan-300" /> Claude / GPT-4o
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-neutral-300">
              <span>Token Latency</span>
              <span className="text-cyan-300 font-mono">18ms</span>
            </div>
            <div className="w-full h-1 rounded-full bg-neutral-800">
              <div className="w-3/4 h-full bg-cyan-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* SVG Connector 2 */}
        <div className="flex items-center justify-center my-[-4px] md:my-0 md:mx-1 text-cyan-400/60">
          <svg className="w-6 h-6 md:w-8 md:h-6" viewBox="0 0 32 24" fill="none">
            <path
              d="M0 12H28M28 12L20 6M28 12L20 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Node 3: Output */}
        <div className="w-full md:w-[28%] p-3 rounded-md bg-[#000000] border border-white/15 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Step 03</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <Workflow className="w-3.5 h-3.5 text-emerald-400" /> Shipped Output
          </div>
          <p className="text-[10px] text-emerald-300 font-mono truncate">
            Production Merged
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
        <span>Webhook Orchestration</span>
        <span className="text-cyan-300">200 OK</span>
      </div>
    </div>
  )
}


