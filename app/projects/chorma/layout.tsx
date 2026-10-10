import type { Metadata } from "next"

import { buildProjectMetadata } from "@/lib/projects"

/** Search + social copy, derived from the project registry. */
export const metadata: Metadata = {
  ...buildProjectMetadata("chorma"),
  keywords: [
    "Chorma agency site",
    "anti-slop motion design",
    "micro-interactions",
    "Next.js case study",
  ],
}

/** Metadata lives here: page.tsx is a client component and cannot export it. */
export default function ChormaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
