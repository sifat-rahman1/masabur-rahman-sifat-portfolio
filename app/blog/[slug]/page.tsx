import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { BLOG_POSTS, getPostBySlug } from "@/data/blogs"
import { ReadingProgress } from "@/components/reading-progress"
import { ArticleBody } from "@/components/article-body"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://masabur-sifat.vercel.app"


/* ── Static params ─────────────────────────────────────────────────── */
export function generateStaticParams() {
    return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

/* ── Dynamic metadata ──────────────────────────────────────────────── */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return {}

    return {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.description,
            url: `/blog/${post.slug}`,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.coverImage],
        },
    }
}

export const viewport: Viewport = {
    themeColor: "#08080a",
    colorScheme: "dark",
}

/* ── Helpers ───────────────────────────────────────────────────────── */
function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

/* ── Page ──────────────────────────────────────────────────────────── */
export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) notFound()

    /* JSON-LD BlogPosting schema */
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        image: post.coverImage,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Person",
            name: "Sifat",
            url: SITE_URL,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
        },
    }

    return (
        <div className="relative isolate min-h-screen bg-[#08080a] text-zinc-100 [color-scheme:dark]">
            {/* Structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Scroll-linked reading progress bar (client component) */}
            <ReadingProgress />

            {/* Subtle ambient mesh */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    backgroundImage: [
                        "radial-gradient(55rem 38rem at 8% -8%, rgba(16,185,129,0.05), transparent 70%)",
                        "radial-gradient(45rem 30rem at 92% 10%, rgba(6,182,212,0.04), transparent 68%)",
                    ].join(", "),
                }}
            />

            <main id="main" className="relative z-10">
                {/* ── Article header ────────────────────────────────────── */}
                <header className="mx-auto w-full max-w-[800px] px-6 pt-32 pb-10 md:px-8 md:pt-44 md:pb-12">

                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="label mb-8 inline-flex items-center gap-2 text-zinc-500 transition-colors duration-200 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                    >
                        <span aria-hidden="true">←</span> All posts
                    </Link>

                    {/* Category + meta */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-widest text-emerald-400">
                            {post.category}
                        </span>
                        <span className="label text-zinc-600">{formatDate(post.publishedAt)}</span>
                        <span className="label text-zinc-700">·</span>
                        <span className="label text-zinc-600">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="mt-6 font-display text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#fafafa]">
                        {post.title}
                    </h1>

                    {/* Description */}
                    <p className="mt-5 text-[1.0625rem] leading-[1.8] text-zinc-400">
                        {post.description}
                    </p>

                    {/* Author */}
                    <div className="mt-8 flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-700">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-200">{post.author.name}</p>
                            <p className="text-xs text-zinc-500">{post.author.role}</p>
                        </div>
                    </div>
                </header>

                {/* ── Hero cover image ──────────────────────────────────── */}
                <div className="mx-auto w-full max-w-[1080px] px-6 pb-14 md:px-8">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-zinc-800/60">
                        <Image
                            src={post.coverImage}
                            alt={`Cover image for "${post.title}"`}
                            fill
                            sizes="(min-width: 1080px) 1080px, 100vw"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
                    </div>
                </div>

                {/* ── Article body ──────────────────────────────────────── */}
                <div className="mx-auto w-full max-w-[800px] px-6 pb-20 md:px-8">
                    <ArticleBody sections={post.sections} />

                    {/* ── Agency CTA banner ─────────────────────────────── */}
                    <div className="mt-16 overflow-hidden rounded-md border border-emerald-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 p-8 md:p-10">
                        <span className="label block text-emerald-500/80">
                            Free audit
                        </span>
                        <h2 className="mt-3 max-w-[30ch] font-display text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-[1.625rem]">
                            Want to make your site better than generic templates?
                        </h2>
                        <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-[1.8] text-zinc-400">
                            I review your landing page against the anti-slop checklist —
                            layout, typography, motion, conversion architecture — and hand
                            you a prioritised action plan. No strings.
                        </p>
                        <Link
                            href="/#contact"
                            className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-300 transition-all duration-200 hover:border-emerald-400/80 hover:bg-emerald-500/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                        >
                            Get a free technical &amp; UI/UX site audit
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
