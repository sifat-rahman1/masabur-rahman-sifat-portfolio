/**
 * HomeFaq. Static homepage FAQ with question-style headings for user
 * intent (SEO/AEO/GEO). Visible Q&A pairs mirror the FAQPage JSON-LD
 * node in app/layout.tsx — keep both in sync.
 */
export function HomeFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="rule-t bg-transparent font-jakarta text-[#1a1a1a]"
    >
      <div className="mx-auto w-full max-w-shell px-6 py-16 md:px-12 md:py-24">
        <span className="label text-muted block">06 / FAQ</span>
        <h2
          id="faq-heading"
          className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.03] font-medium tracking-display text-balance"
        >
          Questions, answered directly.
        </h2>

        <div className="mt-10 max-w-3xl divide-y divide-neutral-200 border-t border-b border-neutral-200">
          <div className="py-6 md:py-8">
            <h3 className="text-xl font-medium tracking-tight text-neutral-900 md:text-2xl">
              What technologies do you use for development?
            </h3>
            <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-neutral-600 md:text-lg">
              I primarily build web applications using Next.js App Router,
              Tailwind CSS, TypeScript, and modern frontend design systems.
            </p>
          </div>

          <div className="py-6 md:py-8">
            <h3 className="text-xl font-medium tracking-tight text-neutral-900 md:text-2xl">
              Are you available for freelance projects?
            </h3>
            <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-neutral-600 md:text-lg">
              Yes, I am available for custom web development, UI/UX design,
              and digital agency collaborations. You can reach out via the
              contact page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFaq
