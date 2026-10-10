import type { Metadata } from "next"

import { buildProjectMetadata } from "@/lib/projects"

/** Search + social copy, derived from the project registry. */
export const metadata: Metadata = {
  ...buildProjectMetadata("contentforge"),
  keywords: [
    "AI content workspace",
    "social media content app",
    "content idea generator",
    "hook and caption writer",
    "React portfolio case study",
  ],
}

/** Pass-through layout: metadata lives here since page.tsx is a client component. */
export default function ContentForgeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
