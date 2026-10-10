import { BriefForm } from "@/components/brief-form"
import { FoldText } from "@/components/FoldText"
import { site } from "@/lib/site"

/**
 * Contact section. Redesigned with a subtle tactile dot-matrix grid canvas,
 * sticky left column header, and tactile input cards in the form column.
 */
export function Contact() {
  const { contact } = site

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden border-t border-zinc-200/80 bg-white font-jakarta"
    >
      {/* Signature Dot-Matrix Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(24, 24, 27, 0.22) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Ambient Radial Vignette */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-at-c from-transparent via-white/40 to-white"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-shell px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Sticky Heading & Context */}
          <div className="col-span-1 md:col-span-5 md:sticky md:top-28">
            <span className="label text-muted block mb-4">
              <FoldText text={`${contact.index} / ${contact.label}`} />
            </span>

            <h2
              id="contact-heading"
              className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.96] font-medium tracking-display text-zinc-950 text-balance"
            >
              <FoldText text={contact.title} />
            </h2>

            <p className="mt-6 max-w-[36ch] text-[1.0625rem] leading-[1.65] text-neutral-600">
              {contact.lead}
            </p>

            <ul className="mt-8 hidden flex-col gap-3 text-sm text-neutral-500 sm:flex">
              {contact.brief.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-950/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-zinc-200/80 pt-6">
              <p className="text-xs tracking-wide text-neutral-400">
                {contact.note}
              </p>
            </div>
          </div>

          {/* Right Column: Tactile Form Cards */}
          <div className="col-span-1 md:col-span-7">
            <BriefForm />
          </div>
        </div>
      </div>
    </section>
  )
}