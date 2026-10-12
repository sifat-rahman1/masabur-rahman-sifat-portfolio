import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Sifat — brief form, email, and 24-hour reply. Frontend, UI, and graphic design.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description:
      "Start a project with Sifat — brief form, email, and 24-hour reply.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/og-image.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "Masabur Rahman Sifat — Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description:
      "Start a project with Sifat — brief form, email, and 24-hour reply.",
    images: ["/og-image.jpg?v=3"],
  },
}

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
