# Design system — Editorial Print

Single source of truth for the visual language. If code and this document
disagree, one of them is a bug.

## Intent

Luxury print quarterly, not a SaaS landing page. One ground, one ink, hairlines
for structure, and typographic scale instead of ornament. Whitespace is a
material: sections open with `py-24` / `py-32` and the grid is deliberately
lopsided.

Variance 8, motion 3, density 2.

## Type

| Role               | Family stack                                                 | Treatment                                                  |
| ------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Display            | `"Neue Montreal", Inter, "Helvetica Neue", Helvetica, Arial` | `font-medium`, tracking `-0.04em`, line-height `0.96–1.06` |
| Subheads / accents | `"Ivyora Display", "Playfair Display", Georgia`              | italic, same optical size as surrounding text              |
| Body               | `Inter`                                                      | `1.0625rem`/`1.75`, max ~62ch                              |
| Micro-label        | `Hanken`-free: display stack at `0.6875–0.75rem`             | uppercase, tracking `0.16em`                               |

Rules:

- The serif is an **accent**, never a headline face on its own, except the hero
  eyebrow and the single word `websites`.
- Negative tracking scales with size. Nothing is ever stretched horizontally,
  and no extended or wide face is used.
- Numbers that need to line up use `tabular-nums`; there are none today.

## Colour

| Token                 | Value                  | Use                                     |
| --------------------- | ---------------------- | --------------------------------------- |
| `--color-paper`       | `#ffffff`              | the only page ground                    |
| `--color-bone`        | `#fafaf8`              | image frame fill, one step off paper    |
| `--color-ink`         | `#1a1a1a`              | all text, primary buttons, footer block |
| `--color-muted`       | `#6f6f6f`              | secondary copy, labels, metadata        |
| `--color-rule`        | `rgb(26 26 26 / 0.1)`  | every divider and field rule            |
| `--color-rule-strong` | `rgb(26 26 26 / 0.22)` | hovered row rule                        |

One accent colour: none. One dark surface: the footer. No gradients, no tinted
shadows, no glow, no second grey family. Preview plates are bone, never washed
with a brand colour invented for the occasion.

## Space and grid

- Shell: `max-w-shell` (1680px), padding `px-6` → `md:px-12`.
- 12-column grid, `gap-x-6`; asymmetric spans are the default, e.g. hero copy
  `lg:col-span-7` against the portrait `lg:col-span-5 lg:col-start-8`.
- Section rhythm: `py-24 md:py-32`. Intro blocks sit `pb-10` above a rule.
- Whitespace column in About: label pinned top, spec list pinned bottom,
  `gap-16` of nothing between them.

## Surfaces and depth

- No shadows, blur, or skeuomorphism anywhere.
- Depth is planar: hairlines (`.rule-b`, `.rule-t`), the charcoal footer, and the
  2 % grain overlay (`.grain::after`).
- No filled cards. No grey section backgrounds. The page ground never changes
  between sections.

## Components

**Header** — fixed pitch-black glass capsule, Roba `SIFAT` wordmark left,
hamburger right. Roba is scoped to the wordmark only — see below. The toggle
morphs two bars into a close cross over 300ms `ease-editorial`. The menu is a
full-viewport `zinc-950/95` overlay with staggered display-type links
(`Home`, `Projects`, `Tools`, `Free Resources`, `Contact`, each `01`–`05`
indexed against existing routes and anchors) and a body-scroll lock with
`Escape`-to-close plus focus return. Entrance: 850ms `ease-editorial` slide,
per-item 60ms stagger; reduced-motion readers get an instant swap.

**Primary button** — `bg-ink px-7 py-4 text-paper`, 0 radius, hover `bg-ink/80`,
arrow nudges 2px on hover. Label is a micro-label.

**Text link** — `.link-rule`: hairline underline that draws in from the left over
320ms `cubic-bezier(0.16, 1, 0.3, 1)`.

**Project row** — 12-column grid: index / title + scope line / details. Hairline
under each row, darkening to `--color-rule-strong` on hover; the title shifts `2`
(8px) right. The right column always reads `VIEW CASE STUDY` with an arrow — the
index's standing label, never gated on a link. A row only _navigates_ when `href`
is set in `lib/projects.ts`: that row wraps in `next/link` and becomes a card
link, so the cursor never promises a destination that does not exist.

**Work preview plate** — the one element allowed to follow the pointer. Fixed
position, `pointer-events: none`, bone fill, hairline frame, `3:2` media box
(photograph, video, or the drawn folio plate) and a caption strip. One frame only:
inside the card the media box drops its own hairline, because two frames a pixel
apart read as a doubled rule. Decorative and `aria-hidden`: every word in it is
already in the row, so it can never be the only way to read a project.

**Field** — `.field`: transparent, bottom rule only, no radius, `:focus`
darkens the rule to ink. Autofill keeps the paper ground.

**Watermark / statement** — `FitText` measures the rendered text and solves for
the font size that fills its container exactly. `SIFAT` uses `scale={1.08}` so it
bleeds past both screen edges and is clipped by the section.

## Motion

- Durations 200–500ms, ease `cubic-bezier(0.16, 1, 0.3, 1)` (`ease-editorial`).
- One entry animation: `animate-rise-in` — transform only, never opacity, so a
  throttled tab or a stalled animation can never leave copy invisible.
  Staggered 0/90/180/270ms in the hero, hero only.
- Hover states are immediate and silent. No infinite loops, no parallax, no
  scroll-jacking. The one exception is the Work preview plate below.
- Work preview plate: springs at `stiffness 150 / damping 15`, entering from
  `scale 0.8 / rotate -3`, settling at `±6°` (the tilt alternates with the folio
  number, so consecutive previews feel placed by hand), and clamped to stay inside
  the viewport instead of clipping at the edges. Position and tilt are split
  across two elements deliberately: the wrapper is the plate's exact size, centred
  on the cursor and translating only, so the plate inside it tilts about its own
  centre. Tilt the wrapper instead and the plate swings off the cursor.
- That plate appears only where it can follow: `hover: hover` plus
  `prefers-reduced-motion: no-preference`. Touch gets the clean stacked list, and - once a project has media - a reduced-motion reader gets the same plate inline in the row (`.row-plate`).
- `prefers-reduced-motion: reduce` disables transitions, animations and smooth
  scrolling.

## Banned

Cards in any form; rounded corners (`--radius: 0rem` everywhere); drop shadows;
glassmorphism; gradient text; grey section blocks; pill chips; icon fonts;
carousels; scroll-hijacking; placeholder copy; invented project names, years,
metrics or client lists.

Sanctioned exception: the Work preview plate is a card, and it moves — both of
which this list otherwise forbids. It is allowed because it stays square-cornered,
shadowless and hairline-framed, because it is decoration rather than content, and
because it is the only pointer-tracking motion on the page.

Sanctioned exception: `GlassNav` is glass — backdrop blur, translucent
neutral-900 shells, white/20 hairlines and a pill dock — which this list
otherwise forbids. It is allowed because the brief explicitly orders a
ReactBits-style liquid-glass dock, because both states keep white legible type
(the bar sits over the dark hero, the dock is its own dark capsule), and
because reduced-motion readers get an instant state swap with no warp.

Sanctioned exception: the Education timeline's rail
Sanctioned exception: the Roba wordmark (header only). The SIFAT logo in
glass-nav.tsx is set in Roba 400 via the --font-wordmark stack, self-hosted
at public/fonts/Roba.woff with font-display swap. Nothing else on the site
may reference that stack: Roba ships a single weight, and the face is licensed
for personal use only, no commercial client work.

(`components/education-timeline.tsx`). It breaks four rules in one element,
each for a stated reason. The beam carries a 12px glow, because a 2px line
cannot show how much distance is behind the reader without one, and it is the
only glow on the page. The nodes are `rounded-full`, because a stop on a rail
reads as a point while a square on a line reads as a label. The lit node is the
only drop shadow outside the Work plate, and it is what separates the stops
already passed from the ones ahead. Unpassed copy sits at 30 % opacity behind a
half-pixel blur; both resolve to nothing on activation, so no final state is
ever soft and no reached text is ever scaled.

The rail is also the only element on the page whose length is derived from
layout. Stops are measured from the rendered rows rather than divided evenly,
because rows differ in height by how much copy they carry, and the beam has to
arrive at a node on the frame it lights. It is fixed to `#education`, is
`pointer-events: none` and `aria-hidden`, and reduced-motion readers get the
finished rail with every stop already passed.

Sanctioned exception: the `/tools` route (`app/tools/page.tsx`,
`components/tools-stack.tsx`). It is a second dark ground, and its grid carries
cards with a 32px radius, backdrop blur, a brightening border, an icon glow, a
gradient mesh and a light sweep — most of which this list forbids. It is allowed
because it is a separate route rather than a section of the editorial flow, and
because the brief orders each of those treatments by name. The page borrows the
two surfaces the site already owns, the charcoal footer and the black glass dock,
and inverts the ink/paper pair instead of introducing a hue: one accent, and it
is a value rather than a colour — bone-white light, at its strongest on the single
card under the pointer and absent everywhere else. Its mesh is three bone-white
value pools, not coloured orbs, and it is fixed, so depth costs nothing per frame.
The sweep is transform-only and the icon glow is the page's only glow. Its
hairlines are white-alpha, because the ink-alpha rules vanish on charcoal. Every
transition, the sweep included, is disabled under `prefers-reduced-motion:
reduce`. Each card carries the tool's own brand mark, and every mark paints
`currentColor`, so the wall stays one value instead of twenty-one brand colours.

Sanctioned exception: the `/resources` route (`app/resources/page.tsx`,
`components/resource-directory.tsx`, `components/agency-promo-card.tsx`). A third
dark ground, and the first place on the site with two accents: emerald and cyan,
on glass cards, a gradient border, a gradient CTA and one blurred aura. It is
allowed because the brief orders that palette by hex, because the site already
carries a brand-colour spectrum in the work index rather than being monochrome in
truth, and because the accents are load-bearing rather than decorative - emerald
appears as the active filter, the link focus ring, or the promo card, and nowhere
else. Its grid is uniform while the tools grid is monochrome, and that divergence
is deliberate: a directory and a spec sheet are different documents. The one glow
is the promo aura, animated by opacity rather than colour so the blur never
repaints, and every transition is disabled under `prefers-reduced-motion:
reduce`.

Sanctioned exception: the `/gallery` route (`app/gallery/page.tsx`,
`components/ui/DriftWall.tsx`). A fourth dark ground, and the only place on the
site where an image field is the page rather than an illustration of it. It earns
three departures. The hero is exactly one viewport tall, because the wall is the
subject and the copy is the caption. The headline is `font-extrabold`, uppercase,
at `tracking-tighter`, against the display rule that type is never bold and never
stretched: it is a poster title set over drifting plates, not a heading read at
`1.0625rem`, and it is stacked into two lines by hand so the lockup holds at every
width. And the wall is the page's single motion source - every other element,
including the scroll cue, is still, so the only endless animation on the route is
the one the brief asked for. The cue is a hairline rather than a bouncing arrow
for the same reason.

The wall is built to stay a ground. Tiles are desaturated to `saturate(0.92)`,
held at 55% under an overlay, and masked by an ellipse that dissolves their edges
plus a bottom-up ramp, so the hero hands over to `#08080A` with no seam and no
plate ever competes with the type above it. The full-value artwork arrives in
Phase 2's grid, which is what the two-tier data in `data/galleryData.ts` exists
for: the wall only ever receives thumbnails. Emerald returns as the eyebrow's tint
and nowhere else. Every mark is a transform on one of a dozen composited tracks,
the frame loop stops when the hero leaves the viewport, and under
`prefers-reduced-motion: reduce` the wall is posed still from CSS and never
animated at all.

Phase 2 adds the archive itself (`components/gallery-archive.tsx`,
`components/ui/LightboxModal.tsx`) and four more departures. The filter bar is a
floating capsule - `rounded-full`, backdrop blur, hairline - against the banned
pill-chip and glassmorphism rules; it is a dock rather than a band because the
section opens on a centred heading, and a stripe across the viewport would cut
that heading off from the grid it labels. Emerald returns twice, as the active
tab and as the plate hover frame, and both are state rather than decoration: the
accent is never painting two things at once at rest. The cards are `rounded-2xl`,
which the radius rule forbids, because a plate is artwork rather than a row in an
index - the corner belongs to the frame around an image, not to the layout. The
lightbox is a body-level portal, because the route root is `isolate` and a panel
inside it would paint under the fixed header.

Motion on the route is still one loop, the wall, plus state changes that exist
only while the reader is acting: the resort, the pill glide, the plate fade.
`MotionConfig reducedMotion="user"` stills all of it for readers who ask. The
grid is masonry built from real flex columns rather than CSS `columns-*`, because
`layout` measures a bounding box and multicol fragments that measurement.

Sanctioned exception: the `/projects/nebula` route
(`app/projects/nebula/page.tsx`). A fifth dark ground, and the only route whose
subject is another site rather than this one. It carries that site's palette -
emerald for state and emphasis, teal and indigo held to the progress hairline and
the hero wash - which is one accent over the house limit; it is allowed only
because the page is a report on work that already used them. `rounded-3xl` and
backdrop blur appear on the two widget shells because those shells reproduce the
client page's own surfaces, at the size a reader would meet them. Both widgets
are live rather than pictured: the ROI calculator computes from its own sliders,
and the lead form runs a real submit-to-success sequence in the browser without
sending anything anywhere. Every transition is CSS or `motion`, on transform and
opacity only, and all of it is stilled under `prefers-reduced-motion: reduce`.

The work index links here: Nebula's row carries `href: "/projects/nebula"` in
`lib/projects.ts`, so it wraps in `next/link` and routes to this case study under
the standing `VIEW CASE STUDY` label.

Sanctioned exception: the `/projects/sparkle-clean-chandpur` route
(`app/projects/sparkle-clean-chandpur/page.tsx` and `layout.tsx`). A dark ground
of its own, and the only case study whose subject is a static, zero-dependency
page, so the route carries cyan - water and light, the register a cleaning
service trades on - as its single accent: the scroll hairline, the active tier,
the payload bars, the booking CTA, the inspector tabs. The three widgets are
live instruments rather than screenshots: the booking simulator deep-links a
real pre-filled WhatsApp message, the payload analyzer recomputes transfer times
from its own bandwidth slider, and the schema inspector previews the exact
LocalBusiness payload `layout.tsx` emits, one shared object in
`lib/sparkle-schema.ts` serving both so the preview cannot drift from the HTML.
All motion is transform or opacity, every transition is CSS or `motion`, and
`MotionConfig reducedMotion="user"` stills it for readers who ask.

The work index links here: Sparkle Clean's row carries
`href: "/projects/sparkle-clean-chandpur"` in `lib/projects.ts`, so it wraps in
`next/link` and routes to this case study under the standing `VIEW CASE STUDY`
label.

