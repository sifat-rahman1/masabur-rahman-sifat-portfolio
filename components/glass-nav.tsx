"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Site header — Roba wordmark fixed top-left, hamburger fixed top-right.
 * The wordmark is the only element allowed to use the Roba typeface.
 * See DESIGN.md "Roba wordmark (header only)".
 *
 * Menu resolves to real routes and in-page anchors only — no dead entries.
 */

const MENU_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "GALLERY", href: "/gallery" },
  { label: "BLOG", href: "/blog" },
  { label: "TOOLS", href: "/tools" },
  { label: "RESOURCES", href: "/resources" },
  { label: "CONTACT", href: "/contact" },
]

/* ─── Framer Motion Variants ──────────────────────────────────────── */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" as const } },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 24 },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
}

const taglineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.55, ease: "easeOut" as const },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

/* ─── HamburgerIcon — morphs bars into X cross ───────────────────── */

function HamburgerIcon({ open }: { open: boolean }) {
  /* White bars on the black button — morph into an X when the overlay is open. */
  const bar = `absolute left-1/2 block h-[2.5px] w-7 -translate-x-1/2 rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`
  return (
    <span aria-hidden="true" className="relative block h-7 w-7">
      <span
        className={`${bar} ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[8px]"
          }`}
      />
      <span
        className={`${bar} ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[19px]"
          }`}
      />
    </span>
  )
}

/* ─── GlassNav ────────────────────────────────────────────────────── */

export function GlassNav() {
  const pathname = usePathname()
  const onHome = pathname === "/"
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  /* Lock body scroll while the overlay owns the viewport. */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /* Escape key closes the overlay and returns focus to the toggle. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, close])

  /* Shift focus to the first link when the overlay opens. */
  useEffect(() => {
    if (open) {
      // Slight delay so AnimatePresence has mounted the links.
      const id = setTimeout(() => firstLinkRef.current?.focus(), 50)
      return () => clearTimeout(id)
    }
  }, [open])

  return (
    <>
      {/* ── Wordmark — fixed top-left ─────────────────────────────── */}
      <Link
        href="/"
        aria-label="Sifat — back to home"
        className="fixed top-6 left-6 z-[100] font-wordmark text-lg font-normal leading-none tracking-[0.08em] text-white mix-blend-difference md:left-10"
      >
        SIFAT
      </Link>

      {/* ── Burger / Close toggle — fixed top-right ──────────────── */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-6 right-6 z-[100] flex h-12 w-12 min-h-12 min-w-12 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/25 ring-1 ring-white/20 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-10"
      >
        <HamburgerIcon open={open} />
      </button>

      {/* ── Full-screen overlay menu ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-50 flex flex-col justify-center bg-zinc-950/95 px-6 pb-10 pt-24 backdrop-blur-xl md:px-14"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ── Nav links ──────────────────────────────────────── */}
            <nav aria-label="Site" className="w-full">
              <motion.ul
                className="flex flex-col"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {MENU_ITEMS.map((item, index) => {
                  const active =
                    item.href === "/"
                      ? onHome
                      : item.href === pathname ||
                      (onHome && item.href.startsWith("/#"))
                  const pad = String(index + 1).padStart(2, "0")

                  return (
                    <motion.li
                      key={item.href + item.label}
                      variants={itemVariants}
                      className="border-b border-zinc-800/60 first:border-t"
                    >
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "group flex items-center gap-5 py-5 transition-transform duration-300",
                          "hover:translate-x-4",
                          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                          active ? "text-white" : "text-zinc-400 hover:text-white",
                        ].join(" ")}
                      >
                        {/* Index label */}
                        <span
                          className="font-mono text-[0.65rem] tracking-widest text-zinc-600 transition-colors duration-300"
                          aria-hidden="true"
                        >
                          {pad}
                        </span>

                        {/* Slash divider */}
                        <span
                          className="text-zinc-700 transition-colors duration-300"
                          aria-hidden="true"
                        >
                          {"//"}
                        </span>

                        {/* Link text */}
                        <span className="text-[clamp(1.75rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] transition-colors duration-300">
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </nav>

            {/* ── Bottom tagline ─────────────────────────────────── */}
            <motion.p
              className="label mt-10 text-zinc-600"
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Available for select work
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GlassNav
