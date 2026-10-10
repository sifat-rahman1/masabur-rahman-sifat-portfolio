import type { Metadata } from "next"

import { buildProjectMetadata } from "@/lib/projects"

/** Search + social copy, derived from the project registry. */
export const metadata: Metadata = {
  ...buildProjectMetadata("movemate-moving-planner"),
  keywords: [
    "moving planner app",
    "moving checklist website",
    "moving cost estimator",
    "moving day planner",
    "relocation planning tool",
    "productivity web app",
  ],
}

/** Pass-through layout: metadata lives here since page.tsx is a client component. */
export default function MoveMateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
