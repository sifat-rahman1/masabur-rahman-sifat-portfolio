import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Tell me what you're building, who it's for, and your timeline. Every brief gets a reply — no newsletters, no follow-up sequences.",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
