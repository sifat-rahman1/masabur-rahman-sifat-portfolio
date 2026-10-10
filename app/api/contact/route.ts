import { NextResponse } from "next/server"

export const runtime = "nodejs"

const LIMITS = { name: 120, email: 200, brief: 5000 } as const
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Brief = { name: string; email: string; brief: string }

function findProblem(input: Brief): string | null {
  if (!input.name) return "A name is required."
  if (!input.email) return "An email address is required."
  if (!EMAIL_PATTERN.test(input.email))
    return "That email address looks malformed."
  if (input.brief.length < 10) return "Tell me a little more about the project."
  if (
    input.name.length > LIMITS.name ||
    input.email.length > LIMITS.email ||
    input.brief.length > LIMITS.brief
  ) {
    return "That brief is longer than this form accepts."
  }
  return null
}

/**
 * Receives a brief and forwards it to CONTACT_WEBHOOK_URL.
 *
 * Works with anything that takes a JSON POST - Formspree, a Zapier or Make
 * webhook, a Slack incoming webhook, or your own endpoint. With the variable
 * unset the route answers 503 and says so, instead of faking a delivery.
 */
export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 })
  }

  const raw = (payload ?? {}) as Record<string, unknown>
  const brief: Brief = {
    name: String(raw.name ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    brief: String(raw.brief ?? "").trim(),
  }

  const problem = findProblem(brief)
  if (problem) {
    return NextResponse.json({ error: problem }, { status: 422 })
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL

  if (!webhook) {
    return NextResponse.json(
      {
        error: "Delivery is not configured yet.",
        hint: 'Set CONTACT_WEBHOOK_URL in .env.local and restart the dev server. See README.md, section "Wiring the form".',
      },
      { status: 503 }
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...brief, receivedAt: new Date().toISOString() }),
      signal: controller.signal,
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "The delivery service rejected the brief." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "The delivery service did not respond." },
      { status: 502 }
    )
  } finally {
    clearTimeout(timeout)
  }
}
