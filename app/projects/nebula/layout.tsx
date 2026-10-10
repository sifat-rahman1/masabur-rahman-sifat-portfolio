import type { Metadata } from "next"

import { buildProjectMetadata } from "@/lib/projects"

/** Search + social copy, derived from the project registry. */
export const metadata: Metadata = {
  ...buildProjectMetadata("nebula"),
  keywords: [
    "Nebula Digital Agency",
    "B2B agency homepage",
    "lead capture",
    "ROI calculator",
    "Next.js case study",
  ],
}

/** Metadata lives here: page.tsx is a client component and cannot export it. */
export default function NebulaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
