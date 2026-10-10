/**
 * The LocalBusiness payload for the Sparkle Clean case study. One source, two
 * readers: `layout.tsx` embeds it as JSON-LD in the served HTML, and the case
 * study's schema inspector previews the exact same object, so the preview can
 * never drift from what ships to crawlers.
 */
export const SPARKLE_LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sparkle Clean",
  description:
    "House cleaning service in Chandpur, Bangladesh. Clear service tiers with instant WhatsApp booking.",
  areaServed: { "@type": "City", name: "Chandpur", addressCountry: "BD" },
  priceRange: "৳৳",
  image: "/sparkleclean-ss.png",
  url: "/projects/sparkle-clean-chandpur",
} as const

/** Pretty-printed for the inspector's raw view. */
export const SPARKLE_LOCAL_BUSINESS_JSON = JSON.stringify(
  SPARKLE_LOCAL_BUSINESS,
  null,
  2
)
