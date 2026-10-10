import { MetadataRoute } from "next"
import { projects } from "@/lib/projects"
import { BLOG_POSTS } from "@/data/blogs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Production domain; falls back to the live domain when unset locally.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sifatrahman.com"

  // Core static routes. Only real pages live here: /about and /projects are
  // deleted, and /services and /education are homepage anchors
  // (#services, …), not routes — listing them would ship 404s to crawlers.
  // /contact is a real route serving the brief form; the home page links
  // to it from the MainCTA gateway (the #contact anchor still resolves
  // to that gateway section on "/").
  const routes = ["", "/gallery", "/tools", "/blog", "/resources", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }),
  )

  // Dynamic case-study routes from lib/projects.ts. `href` is optional on the
  // type, so only projects that actually resolve to a route are included.
  const projectRoutes = projects
    .filter((project) => Boolean(project.href))
    .map((project) => ({
      url: `${baseUrl}${project.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))

  // Blog articles — active, indexable pages served by app/blog/[slug].
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Note: /projects/sparkle-clean-chandpur/live opts out of indexing
  // (robots: { index: false }) and is deliberately never listed here.
  return [...routes, ...projectRoutes, ...blogRoutes]
}
