'use client'

import React from 'react'
import { ScrollFloat } from '@/components/ScrollFloat'
import { ScrollStack } from '@/components/ScrollStack'

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="rule-t bg-transparent text-[#1a1a1a] relative font-jakarta"
    >
      <div className="mx-auto w-full max-w-shell px-6 pt-10 md:px-12 md:pt-14">
        {/* Section Index Header */}
        <div className="rule-b pb-8">
          <span className="label text-muted block mb-4">
            03 / WHAT I PROVIDE
          </span>
          <h2 id="services-heading" className="sr-only">
            Services &amp; Capabilities
          </h2>

          {/* ScrollFloat Text Component */}
          <div className="max-w-4xl py-2">
            <ScrollFloat
              text="Everything you need to transform complex ideas into seamless digital products."
              className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink"
            />
          </div>
        </div>

        {/* ScrollStack Cards Pinning Component */}
        <ScrollStack />
      </div>
    </section>
  )
}

export default Services
