"use client"

import { useState } from "react"
import { site } from "@/lib/site"

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; message: string }
  | { state: "error"; message: string; hint?: string }

/** Setup hints are only useful to whoever is running the site locally. */
const isDev = process.env.NODE_ENV !== "production"

/**
 * Print-media brief form: bottom rules only, no fills, no radius, no shadow.
 * Posts to /api/contact, which forwards the brief to CONTACT_WEBHOOK_URL and
 * reports honestly when delivery is not configured.
 */
export function BriefForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" })
  const { fields } = site.contact

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus({ state: "sending" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          brief: String(data.get("brief") ?? ""),
        }),
      })

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string
        hint?: string
      }

      if (!response.ok) {
        setStatus({
          state: "error",
          message: payload.error ?? "That didn\u2019t send. Please try again.",
          hint: payload.hint,
        })
        return
      }

      form.reset()
      setStatus({
        state: "sent",
        message: "Brief received. I\u2019ll reply to the address you gave.",
      })
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again in a moment.",
      })
    }
  }

  const sending = status.state === "sending"

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-5 md:gap-6">
        {/* Card 1: Name */}
        <div className="group rounded-sm border border-zinc-200/80 bg-zinc-100/70 p-5 md:p-6 shadow-sm transition-all duration-300 ease-out focus-within:border-zinc-950 focus-within:bg-white focus-within:ring-1 focus-within:ring-zinc-950 focus-within:shadow-lg focus-within:shadow-black/5">
          <label
            htmlFor="name"
            className="block text-xs font-semibold tracking-widest text-zinc-400 uppercase transition-colors duration-200 group-focus-within:text-zinc-600 mb-2"
          >
            01 / NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder={fields.name.placeholder}
            className="w-full bg-transparent text-xl md:text-2xl font-medium text-zinc-950 placeholder:text-zinc-300 outline-none transition-colors"
          />
        </div>

        {/* Card 2: Email */}
        <div className="group rounded-sm border border-zinc-200/80 bg-zinc-100/70 p-5 md:p-6 shadow-sm transition-all duration-300 ease-out focus-within:border-zinc-950 focus-within:bg-white focus-within:ring-1 focus-within:ring-zinc-950 focus-within:shadow-lg focus-within:shadow-black/5">
          <label
            htmlFor="email"
            className="block text-xs font-semibold tracking-widest text-zinc-400 uppercase transition-colors duration-200 group-focus-within:text-zinc-600 mb-2"
          >
            02 / EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={fields.email.placeholder}
            className="w-full bg-transparent text-xl md:text-2xl font-medium text-zinc-950 placeholder:text-zinc-300 outline-none transition-colors"
          />
        </div>

        {/* Card 3: Brief */}
        <div className="group rounded-sm border border-zinc-200/80 bg-zinc-100/70 p-5 md:p-6 shadow-sm transition-all duration-300 ease-out focus-within:border-zinc-950 focus-within:bg-white focus-within:ring-1 focus-within:ring-zinc-950 focus-within:shadow-lg focus-within:shadow-black/5">
          <label
            htmlFor="brief"
            className="block text-xs font-semibold tracking-widest text-zinc-400 uppercase transition-colors duration-200 group-focus-within:text-zinc-600 mb-2"
          >
            03 / THE BRIEF
          </label>
          <textarea
            id="brief"
            name="brief"
            required
            rows={4}
            maxLength={5000}
            placeholder={fields.brief.placeholder}
            className="min-h-[120px] w-full resize-none bg-transparent text-xl md:text-2xl font-medium text-zinc-950 placeholder:text-zinc-300 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-3 rounded-full bg-zinc-950 px-8 py-4 font-bold text-sm tracking-wider text-white uppercase shadow-xl transition-all duration-300 hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          <span>{sending ? "Sending\u2026" : "SEND THE BRIEF"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <p
          role="status"
          aria-live="polite"
          className="text-xs font-medium tracking-wide text-zinc-500 max-w-[34ch]"
        >
          {status.state === "sending" && "Transmitting brief\u2026"}
          {status.state === "sent" && status.message}
          {status.state === "error" && status.message}
        </p>
      </div>

      {status.state === "error" && status.hint && isDev ? (
        <p className="mt-4 text-xs leading-relaxed text-red-500/80">
          {status.hint}
        </p>
      ) : null}
    </form>
  )
}
