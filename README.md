# Sifat — editorial portfolio

Single-page portfolio for a frontend / UI / graphic-design builder. Pure paper
ground, deep charcoal ink, hairline rules, asymmetric grid. Next.js App Router +
Tailwind CSS v4, no component library, one animation library (Motion — used by
the work index alone).

## Stack

|           |                                                       |
| --------- | ----------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack)                    |
| Styling   | Tailwind CSS v4, tokens declared in `app/globals.css` |
| Type      | Inter + Playfair Display via `next/font`              |
| Motion    | Motion, used by the work index for the hover preview  |
| Form      | Route handler at `app/api/contact` → your webhook     |
| Language  | TypeScript, strict                                    |

## Commands

```bash
npm run dev        # local development
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier, incl. Tailwind class sorting
```

## Structure

```
app/
  layout.tsx              fonts, metadata, skip link, grain
  page.tsx                section composition
  globals.css             design tokens + editorial primitives
  not-found.tsx           404
  api/contact/route.ts    validates a brief, forwards it to your webhook
components/
  nav.tsx                 sticky masthead (server component, no JS)
  hero.tsx                cover spread: watermark / portrait / foreground copy
  fit-text.tsx            scale-to-fit display line (client)
  portrait-plate.tsx      3:4 portrait frame
  work.tsx                work section shell (server)
  work-list.tsx           the index: rows, hover state, pointer-tracked plate
  work-plate.tsx          3:2 preview plate: media, or the drawn folio plate
  about.tsx               asymmetric about spread
  contact.tsx             hire-me layout
  brief-form.tsx          print-style form (client)
  footer.tsx              charcoal block + LET'S BUILD
  icons.tsx               three drawn hairline icons
lib/
  site.ts                 all copy, in one place
  projects.ts             the five projects, verbatim - plus previews and links
public/portrait.svg       3:4 portrait placeholder
```

Copy lives in `lib/site.ts` and `lib/projects.ts`. Edit those, not the
components, unless you are changing layout.

## Typography

The three roles, in fallback order:

| Role               | First choice   | Fallback               | Token            |
| ------------------ | -------------- | ---------------------- | ---------------- |
| Display / headings | Neue Montreal  | Inter → Helvetica Neue | `--font-display` |
| Subheads / accents | Ivyora Display | Playfair Display       | `--font-serif`   |
| Body               | Inter          | —                      | `--font-body`    |

Inter and Playfair Display load through `next/font` (self-hosted, no external
request). The licensed faces are simply listed first, so activating them is a
drop-in with no code change:

1. Put the webfont files in `public/fonts/`.
2. Declare them in `app/globals.css`:

```css
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/NeueMontreal-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```

No extended, wide or stretched display face is used anywhere, and no glyph is
ever scaled non-uniformly. The oversized `SIFAT` and `LET'S BUILD` lines are
fitted by measuring the rendered text and solving for a font size
(`components/fit-text.tsx`) — the letterforms keep their true proportions.

## Swapping the portrait

`public/portrait.svg` is a drawn 3:4 placeholder, kept local so nothing depends
on a remote asset. To use a photograph:

1. Drop `portrait.jpg` into `public/`.
2. In `components/portrait-plate.tsx`, change `src` and the `alt` text. Switch to
   `next/image` at the same time — the SVG placeholder is why it is a plain
   element today.

## Project previews

The work index reads `lib/projects.ts`. One project is one object:

```ts
{
  index: "01",
  title: "Nebula Digital Agency",
  tagline: "B2B platform",              // line under the title
  description: "B2B agency homepage …", // caption inside the preview plate
  href: "/projects/nebula",             // optional - makes the row a link
  ctaLabel: "VIEW CASE STUDY",          // optional - overrides the right-column label
  media: { kind: "video", src: "/work/nebula.mp4", poster: "/work/nebula.jpg" },
}
```

- `media` — the preview plate shows it the moment it exists. Leave it out and the
  plate draws the folio numeral instead, so an unfilled project still looks
  deliberate. `kind: "image"` renders a plain `<img>`, `kind: "video"` a muted,
  looping, inline `<video>`. Both fill a strict 3:2 frame, so nothing else changes.
- `href` / `ctaLabel` — the right column always reads `VIEW CASE STUDY ↗`; it is
  the index's standing label, not a promise. A row only *navigates* when `href`
  points somewhere real — with no `href` the row stays plain type with no pointer
  cursor. Add `href` and the row becomes a link (`ctaLabel` overrides the label).
  Nebula is the live example: its `href: "/projects/nebula"` routes the row to the
  case study.

Media is served straight from `/public`, which is why the plate uses a plain
`<img>` rather than `next/image`: the swap to video stays literal, and a remote URL
needs no `images.remotePatterns` in `next.config.ts`. Switch to `next/image` if you
want its optimiser and will keep the sources local.

The plate is a single element. It follows the pointer on hover — springs at
`stiffness 150 / damping 15`, settling at a `±6°` tilt — and it is decoration:
`aria-hidden`, `pointer-events: none`, clamped so it never clips at a screen edge.
Position and tilt sit on two elements on purpose: the wrapper is exactly the
plate's size, centred on the cursor and translating only, so the plate inside it
tilts about its own centre instead of swinging away from the cursor.

A pointer that cannot hover gets the clean stacked list — the preview is a desktop
luxury, never a dependency - and, once a project has media, a reader who asked for
`prefers-reduced-motion: reduce` gets the same plate inline in the row, where it
cannot move. Nothing about a project depends on a cursor.

## Wiring the form

The form posts JSON to `app/api/contact`, which validates name, email and brief,
then forwards them to `CONTACT_WEBHOOK_URL`.

```bash
cp .env.example .env.local
# set CONTACT_WEBHOOK_URL to any endpoint that accepts a JSON POST
```

Works with Formspree, a Zapier/Make webhook, a Slack incoming webhook, or your
own API. With the variable unset the endpoint answers `503` and the form says
delivery is not configured — it never fakes a success. Add rate limiting before
exposing it publicly.

## Accessibility and performance notes

- Skip link, landmark elements, `aria-labelledby` on every section.
- Form fields are labelled, validated natively, and status is announced through
  `role="status"` / `aria-live="polite"`.
- `prefers-reduced-motion` removes transitions and the entry animation, and drops
  the work index to its inline plate (no pointer tracking);
  `prefers-reduced-transparency` removes the grain overlay.
- The only client components are `fit-text.tsx`, `brief-form.tsx` and
  `work-list.tsx` (plus `work-plate.tsx`, which it shares); everything else
  prerenders to static HTML. The work section shell stays a server component.
- The work preview is decoration, never content: `aria-hidden`,
  `pointer-events: none`, and every word inside it is already in the row. Keyboard
  focus parks it beside the focused row, so the list is fully usable without a
  pointer.
- The decorative `SIFAT` watermark is `aria-hidden`.

## Design rules

See `DESIGN.md` for the token table, grid rules, component specs, motion rules
and the list of banned patterns. If code and that document disagree, one of them
is a bug.
