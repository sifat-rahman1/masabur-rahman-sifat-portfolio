'use client'

import { useState } from 'react'
import Link from 'next/link'
import { site } from '@/lib/site'
import { ContactPreloader } from '@/components/contact-preloader'

const BUDGETS = ['< $1k', '$1k – $3k', '$3k+', 'Just exploring'] as const

type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'sent' }
  | { state: 'error'; message: string }

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const [budget, setBudget] = useState<string>('$1k – $3k')
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const email = site.footer.contact.email

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzedjrld'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const subject = String(data.get('subject') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    setStatus({ state: 'sending' })
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          subject: subject || `New project inquiry from ${name || 'your portfolio'}`,
          _subject: subject || `New project inquiry from ${name || 'your portfolio'}`,
          message: `${message}\n\nBudget: ${budget}`,
          budget,
        }),
      })
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string
          errors?: Array<{ message?: string }>
        }
        const formspreeError = payload.errors
          ?.map((entry) => entry.message)
          .filter(Boolean)
          .join(' ')
        setStatus({
          state: 'error',
          message:
            payload.error ??
            formspreeError ??
            'That didn’t send. Please try again.',
        })
        return
      }
      form.reset()
      setBudget('$1k – $3k')
      setStatus({ state: 'sent' })
    } catch {
      setStatus({
        state: 'error',
        message: 'Network error. Please try again in a moment.',
      })
    }
  }

  const sending = status.state === 'sending'

  return (
    <>
      <ContactPreloader />
      <main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900 selection:bg-neutral-900 selection:text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Top Navigation */}
        <nav className="mb-16">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
          >
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to selected work</span>
          </Link>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Context & Metadata */}
          <div className="flex flex-col space-y-8 lg:col-span-5">
            {/* Status Badge */}
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 shadow-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-neutral-700">
                Available for Q3/Q4 projects
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-jakarta text-4xl leading-[1.08] font-medium tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              Let&apos;s build <br />
              <span className="text-neutral-400">something considered.</span>
            </h1>

            <p className="max-w-md text-base leading-relaxed font-light text-neutral-600">
              Have a product idea, frontend build, or redesign in mind? Fill
              out the form or reach out directly.
            </p>

            {/* Direct Email Card */}
            <div className="flex flex-col space-y-4 border-t border-neutral-200/80 pt-4">
              <div className="flex flex-col space-y-1">
                <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                  Direct Email
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="group inline-flex w-fit items-center gap-3 text-lg font-medium text-neutral-900 transition-colors hover:text-neutral-600"
                  aria-live="polite"
                >
                  <span>{email}</span>
                  <span className="rounded-sm bg-neutral-200/70 px-2 py-1 font-mono text-xs text-neutral-700 transition-colors group-hover:bg-neutral-200">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              {/* Location & Response Metadata */}
              <div className="flex flex-col space-y-1 font-mono text-xs text-neutral-500">
                <p>Location: Chandpur, BD (UTC +6)</p>
                <p>Response Time: Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-8 shadow-xs md:p-10 lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              {/* Field 01: Name */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="contact-name"
                  className="font-sans text-xs font-medium tracking-widest text-neutral-500 uppercase"
                >
                  Name or Studio
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="e.g. Alex Morgan or Studio Arc"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Field 02: Email */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="contact-email"
                  className="font-sans text-xs font-medium tracking-widest text-neutral-500 uppercase"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="alex@domain.com"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Field 03: Subject */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="font-sans text-xs font-medium tracking-widest text-neutral-500 uppercase"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  autoComplete="off"
                  maxLength={150}
                  placeholder="Website redesign, landing page, design system…"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Field 04: Project Details */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="contact-message"
                  className="font-sans text-xs font-medium tracking-widest text-neutral-500 uppercase"
                >
                  Project Details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  maxLength={5000}
                  placeholder="Tell me what you're making, who it's for, and your expected timeline..."
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Field 05: Budget Selector */}
              <div className="flex flex-col space-y-3 pt-2">
                <span
                  id="budget-label"
                  className="font-sans text-xs font-medium tracking-widest text-neutral-500 uppercase"
                >
                  Estimated Budget
                </span>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby="budget-label"
                >
                  {BUDGETS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBudget(option)}
                      aria-pressed={budget === option}
                      className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                        budget === option
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={sending}
                  aria-disabled={sending}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-neutral-900 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:scale-[1.01] hover:bg-black hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending && (
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={4}
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  <span>{sending ? 'Sending…' : 'Send Message'}</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
                {status.state === 'sent' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-4 animate-[fadeSlideIn_0.4s_ease-out] rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-center"
                  >
                    <p className="text-sm font-semibold text-emerald-800">
                      Thank you! Your message has been received.
                    </p>
                    <p className="mt-1 text-xs text-emerald-700">
                      I will get back to you shortly — usually within 24
                      hours.
                    </p>
                  </div>
                )}
                {status.state === 'error' && (
                  <div
                    role="alert"
                    className="mt-4 animate-[fadeSlideIn_0.4s_ease-out] rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-center text-sm font-medium text-red-700"
                  >
                    {status.message}
                  </div>
                )}
                {status.state !== 'sent' && status.state !== 'error' && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="mt-3 text-center text-xs font-medium text-neutral-500"
                  >
                    {sending ? 'Sending your message…' : ''}
                  </p>
                )}
                <style jsx>{`
                  @keyframes fadeSlideIn {
                    from {
                      opacity: 0;
                      transform: translateY(6px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
