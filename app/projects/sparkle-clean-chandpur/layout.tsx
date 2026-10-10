import type { Metadata } from "next"

import { SPARKLE_LOCAL_BUSINESS } from "@/lib/sparkle-schema"
import { buildProjectMetadata } from "@/lib/projects"

/** Search + social copy, derived from the project registry. */
export const metadata: Metadata = {
  ...buildProjectMetadata("sparkle-clean-chandpur"),
  keywords: [
    "house cleaning service Chandpur",
    "Sparkle Clean landing page",
    "WhatsApp booking flow",
    "zero-dependency website",
  ],
}

/** Metadata + LocalBusiness schema live here: page.tsx is a client component. */
export default function SparkleCleanLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // `<` escaped per the JSON-LD guide: the payload is static, the
          // escaping just keeps the pattern safe if it ever stops being so.
          __html: JSON.stringify(SPARKLE_LOCAL_BUSINESS).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      {children}
    </>
  )
}
