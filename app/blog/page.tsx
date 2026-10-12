import type { Metadata, Viewport } from "next"
import { BLOG_POSTS } from "@/data/blogs"
import { BlogArchive } from "@/components/blog-archive"
import { PagePreloader } from "@/components/page-preloader"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Frontend architecture, anti-slop design, and Next.js optimization by Sifat — Creative Engineer & UI/UX Designer.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description:
      "Deep dives into performance optimisation, bespoke frontend systems, and conversion-focused UI design.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/og-image.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "Masabur Rahman Sifat — Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Deep dives into performance optimisation, bespoke frontend systems, and conversion-focused UI design.",
    images: ["/og-image.jpg?v=3"],
  },
}

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
}

/** Subtle radial mesh identical to the /tools page aesthetic. */
const MESH = [
  "radial-gradient(60rem 40rem at 10% -10%, rgba(16,185,129,0.06), transparent 70%)",
  "radial-gradient(50rem 34rem at 90% 8%, rgba(250,250,248,0.03), transparent 70%)",
  "radial-gradient(70rem 50rem at 50% 110%, rgba(6,182,212,0.04), transparent 72%)",
].join(", ")

export default function BlogPage() {
  return (
    <>
      <PagePreloader label="Blog" />
      <div className="relative isolate min-h-screen bg-[#08080a] text-zinc-100 [color-scheme:dark]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: MESH }}
      />
      <main id="main" className="relative z-10">
        <BlogArchive posts={BLOG_POSTS} />
      </main>
    </div>
    </>
  )
}
