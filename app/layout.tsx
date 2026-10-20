import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"
import { HomePreloader } from "@/components/home-preloader"
import { RoutePreloader } from "@/components/RoutePreloader"
import { GlassNav } from "@/components/glass-nav"
import { Footer } from "@/components/footer"

/**
 * Type contract.
 * Display:  Neue Montreal (self-host to activate) -> Inter -> Helvetica Neue.
 *           Never an extended or wide display face.
 * Subheads: Ivyora Display (self-host to activate) -> Playfair Display.
 * Body:     Inter.
 *
 * Syne, DM Serif Display and the render-blocking Google Fonts <link> are gone.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-playfair",
})

/**
 * Plus Jakarta Sans — scoped to the home page's Skills, Projects and
 * Contact sections only. Exposed as a CSS variable; applied via the
 * `font-jakarta` Tailwind utility. Never on <body>, never global.
 */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://masabur-sifat.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL("https://masabur-sifat.vercel.app"),
  title: {
    default: site.meta.title,
    template: "%s | Masabur Rahman Sifat",
  },
  description: site.meta.description,
  applicationName: site.name,
  authors: [{ name: "Masabur Rahman Sifat" }],
  creator: "Masabur Rahman Sifat",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Masabur Rahman Sifat | Creative Engineer & UI/UX Designer",
    description: site.meta.description,
    type: "website",
    siteName: site.name,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "https://masabur-sifat.vercel.app/og-image.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "Masabur Rahman Sifat — Creative Engineer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Masabur Rahman Sifat | Creative Engineer & UI/UX Designer",
    description: site.meta.description,
    images: [
      {
        url: "https://masabur-sifat.vercel.app/og-image.jpg?v=3",
        alt: "Masabur Rahman Sifat — Creative Engineer & UI/UX Designer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico?v=2",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Masabur Rahman Sifat",
        alternateName: "Sifat",
        url: SITE_URL,
        image: `${SITE_URL}/hero-photo.png`,
        jobTitle: "Creative Engineer & UI/UX Designer",
        description: site.meta.description,
        sameAs: ["https://github.com/sifat-rahman1/"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "Bangladesh",
        },
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "UI/UX Design",
          "Design Systems",
          "Frontend Architecture",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Masabur Rahman Sifat ■ Portfolio",
        description: "Editorial Portfolio & Creative Engineering by Masabur Rahman Sifat.",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#homepage`,
        url: SITE_URL,
        name: site.meta.title,
        description: site.meta.description,
        dateModified: new Date().toISOString(),
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What technologies do you use for development?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I primarily build web applications using Next.js App Router, Tailwind CSS, TypeScript, and modern frontend design systems.",
            },
          },
          {
            "@type": "Question",
            name: "Are you available for freelance projects?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, I am available for custom web development, UI/UX design, and digital agency collaborations. You can reach out via the contact page.",
            },
          },
        ],
      },
    ],
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable, playfair.variable, plusJakarta.variable)}
    >
      <head>
        <link rel="preconnect" href="https://formspree.io" />
        <link rel="dns-prefetch" href="https://formspree.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper font-body text-ink">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-70 focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:tracking-label focus:text-paper focus:uppercase"
          >
            Skip to content
          </a>
          <HomePreloader />
          <RoutePreloader />
          <GlassNav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
