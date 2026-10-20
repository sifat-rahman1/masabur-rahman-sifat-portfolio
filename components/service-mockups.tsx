'use client'

import React from 'react'
import Image from 'next/image'
import {
  Code2,
  ExternalLink,
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
    <div className="w-full h-full min-h-[280px] md:min-h-[320px] flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-zinc-950 border border-black/30 shadow-2xl overflow-hidden text-white">
      {/* Left side: Dark IDE Window */}
      <div className="flex-1 flex flex-col rounded-md bg-[#000000] border border-white/10 overflow-hidden font-mono text-xs">
        <div className="flex items-center justify-between px-3 py-2 bg-neutral-900 border-b border-white/10 text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-[11px] text-neutral-300 font-sans flex items-center gap-1">
              <Code2 className="w-3 h-3 text-purple-400" /> Page.tsx
            </span>
          </div>
          <span className="text-[10px] text-neutral-500">Next.js 16</span>
        </div>
        <div className="p-3.5 space-y-1.5 text-[11px] leading-relaxed text-neutral-300 overflow-x-hidden">
          <p className="text-neutral-500">{"// 1. Fluid physics"}</p>
          <p>
            <span className="text-purple-400">export function</span>{' '}
            <span className="text-blue-400">Experience</span>() &#123;
          </p>
          <p className="pl-3">
            <span className="text-purple-400">const</span> &#123; scrollY &#125; ={' '}
            <span className="text-amber-300">useScroll</span>()
          </p>
          <p className="pl-3">
            <span className="text-purple-400">return</span> (
          </p>
          <p className="pl-6 text-emerald-400">
            &lt;<span className="text-rose-400">motion.div</span>
          </p>
          <p className="pl-8 text-neutral-400">
            animate=&#123;&#123; <span className="text-cyan-300">fps</span>: 120 &#125;&#125;
          </p>
          <p className="pl-6 text-emerald-400">
            &gt; Ready &lt;/<span className="text-rose-400">motion.div</span>&gt;
          </p>
          <p className="pl-3">&#41;</p>
          <p>&#125;</p>
        </div>
      </div>

      {/* Right side: Live solid dark UI widget */}
      <div className="flex-1 flex flex-col justify-between p-4 rounded-md bg-[#000000] border border-blue-500/30 relative overflow-hidden group">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wider text-emerald-300 uppercase">Live Preview</span>
          </div>
          <span className="px-2 py-0.5 rounded-sm text-[10px] bg-purple-500/20 text-purple-200 border border-purple-400/30">
            v2.4
          </span>
        </div>

        <div className="relative z-10 my-auto py-3 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-neutral-300 font-sans">FPS Render Rate</span>
            <span className="text-lg font-mono font-bold text-white">120.4 <span className="text-xs text-purple-300 font-normal">Hz</span></span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
            <div className="h-full w-[94%] bg-blue-500 rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>Latency: 0.8ms</span>
            <span className="text-emerald-400">GPU Accelerated</span>
          </div>
        </div>

        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-300">
          <span>Stitch Editorial</span>
          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
        </div>
      </div>
    </div>
  )
}

/** Canvas 2: Figma-style canvas with guides & custom cursor pill */
/** Canvas 2: Clean Bento UI Figma export - sits directly on green card */
export function UiUxMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm">
      <Image
        src="/bento-ui.png"
        alt="UI/UX Design Bento Mockup by Masabur Rahman Sifat"
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        className="w-full h-auto object-cover rounded-2xl select-none"
      />
    </div>
  )
}

/** Canvas 3: 3D isometric layered breakdown with transform bounding box & handles */
export function GraphicDesignMockup() {
  return (
    <div className="w-full h-full min-h-[280px] md:min-h-[320px] relative p-6 rounded-lg bg-zinc-950 border border-black/30 shadow-2xl overflow-hidden flex items-center justify-center text-white">
      <div className="relative w-full max-w-[300px] h-[200px] border border-amber-500/40 rounded-sm p-2 flex items-center justify-center">
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-amber-400 border border-neutral-900" />

        <div
          className="relative w-[210px] h-[130px]"
          style={{
            perspective: '800px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Layer 1: Shadow */}
          <div
            className="absolute inset-0 rounded-md bg-[#000000] border border-white/10 p-3 flex flex-col justify-between"
            style={{
              transform: 'rotateX(54deg) rotateZ(-38deg) translateZ(-35px)',
              boxShadow: '0 25px 40px rgba(0,0,0,0.8)',
            }}
          >
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span>01 / Shadow Pass</span>
              <span className="text-amber-400">Multiply</span>
            </div>
            <div className="w-full h-8 rounded-sm bg-neutral-900" />
          </div>

          {/* Layer 2: Subject */}
          <div
            className="absolute inset-0 rounded-md bg-neutral-900 border border-amber-500/40 p-3 flex flex-col justify-between"
            style={{
              transform: 'rotateX(54deg) rotateZ(-38deg) translateZ(5px)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div className="flex items-center justify-between text-[10px] text-amber-200 font-mono">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" /> 02 / Subject Hero
              </span>
              <span>100%</span>
            </div>
            <div className="text-center font-display font-bold text-white text-base tracking-wider uppercase">
              EDITORIAL
            </div>
          </div>

          {/* Layer 3: Glow */}
          <div
            className="absolute inset-0 rounded-md bg-neutral-900/90 border border-amber-400/40 p-3 flex flex-col justify-between"
            style={{
              transform: 'rotateX(54deg) rotateZ(-38deg) translateZ(45px)',
            }}
          >
            <div className="flex items-center justify-between text-[10px] text-white font-mono">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" /> 03 / Specular Highlight
              </span>
              <span className="text-amber-300">Solid</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-amber-400/30 self-end border border-amber-300/40" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
        <Sliders className="w-3 h-3 text-amber-400" /> Layer Stack
      </div>
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
