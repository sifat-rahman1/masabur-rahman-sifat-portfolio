/**
 * The design archive. Every plate is a local file under `public/design gallery/`.
 *
 * `width` / `height` are the files' **measured** pixel dimensions. They are the
 * only authoritative size in this module: the grid and the lightbox both reserve
 * space from them, so no plate is ever cropped to a shape that was never drawn.
 * An earlier revision carried a hand-written `aspectRatio` token instead and got
 * four of eight plates wrong — including one 851x315 banner filed as "square" —
 * which is exactly the class of bug the measurements exist to prevent.
 *
 * `aspectRatio` survives as a *label*: it names the plate's format for the
 * lightbox sidebar, and is the only field here that is derived rather than
 * measured. Its buckets, read against `width / height`:
 *
 *   tall     <= 0.80   the 4:5 family and narrower
 *   portrait  0.80-0.95
 *   square    0.95-1.50
 *   wide     > 1.50    the one banner
 *
 * Two tiers per item: `image` is the full plate (grid + lightbox only), and
 * `thumbnail` is what the hero's `DriftWall` paints. Both point at the same file
 * today, because the source set has no derivative tier yet. That is safe because
 * neither consumer is ever handed the 11.8 MB original: the grid and the lightbox
 * render through `next/image` with an explicit `sizes`, and the wall asks for a
 * 200px tile, so the optimiser answers with a downscaled derivative.
 *
 * The folder name contains a space, so every path is escaped once below rather
 * than at each call site. `encodeURI` leaves `%` untouched, so running it over an
 * already-escaped path is a no-op.
 */
export interface GalleryItem {
  id: string
  title: string
  /** The three real disciplines. "All" is a filter, never an item's category. */
  category: GalleryCategory
  year: string
  tools: string[]
  /** Full plate. Grid and lightbox only — never a background element. */
  image: string
  /** `DriftWall` only. */
  thumbnail: string
  /** Measured pixel width of the file above. */
  width: number
  /** Measured pixel height of the file above. */
  height: number
  /** Format label, bucketed from `width`/`height`. Shown in the lightbox. */
  aspectRatio: "portrait" | "tall" | "square" | "wide"
  description: string
}

export type GalleryCategory = "Poster Design" | "Illustrations" | "3D Art"

/** What the filter bar offers: the three disciplines plus the unfiltered view. */
export type GalleryFilter = GalleryCategory | "All"

export const GALLERY_FILTERS: GalleryFilter[] = [
  "All",
  "Poster Design",
  "Illustrations",
  "3D Art",
]

/**
 * The lightbox reads the format token as words. A `Record` over the union, so a
 * fifth format is a build error here rather than an empty line in the sidebar.
 */
export const GALLERY_FORMAT_LABELS: Record<GalleryItem["aspectRatio"], string> = {
  portrait: "Portrait",
  tall: "Tall portrait",
  square: "Square",
  wide: "Wide banner",
}

/**
 * One path, one escape. Both tiers resolve through here so the two can never
 * disagree, and so a space in the folder name is handled in exactly one place.
 */
function plate(file: string, spec: Omit<GalleryItem, "image" | "thumbnail">) {
  const src = encodeURI(`/design gallery/${file}`)
  return { ...spec, image: src, thumbnail: src }
}

export const GALLERY_ITEMS: GalleryItem[] = [
  plate("fanta juice  advertisment org-v3.png", {
    id: "fanta-juice",
    title: "Fanta Juice Advertisement",
    category: "Poster Design",
    year: "2026",
    tools: ["Photoshop", "Illustrator"],
    width: 3905,
    height: 3905,
    aspectRatio: "square",
    description:
      "Vibrant commercial advertisement concept exploring product visualisation and bold typography.",
  }),
  plate("Flyer Design ver 2.png", {
    id: "flyer-v2",
    title: "Editorial Flyer Concept v2",
    category: "Poster Design",
    year: "2026",
    tools: ["Photoshop", "Figma"],
    width: 2550,
    height: 3300,
    aspectRatio: "tall",
    description:
      "A dark-mode structural layout focusing on grid alignment and high contrast ratios.",
  }),
  plate("MEET THE AI TOOL.png", {
    id: "meet-ai",
    title: "Meet The AI Tool",
    category: "Illustrations",
    year: "2026",
    tools: ["Figma", "Illustrator"],
    width: 1080,
    height: 1350,
    aspectRatio: "tall",
    description:
      "Vector graphic highlighting generative AI integration and user interfaces.",
  }),
  plate("RESEARCH.png", {
    id: "research",
    title: "Research Interface Visual",
    category: "Illustrations",
    year: "2026",
    tools: ["Figma"],
    width: 1080,
    height: 1350,
    aspectRatio: "tall",
    description:
      "Analytical dashboard concept focusing on data visualization and clean UI.",
  }),
  plate("Untitled design.png", {
    id: "untitled",
    title: "Untitled Design Concept",
    category: "3D Art",
    year: "2026",
    tools: ["Blender", "Photoshop"],
    width: 851,
    height: 315,
    aspectRatio: "wide",
    description:
      "Experimental visual exploration using spatial design techniques.",
  }),
  plate("5_20250913_232900_0000.png", {
    id: "project-05",
    title: "Project 05 Exhibition",
    category: "Poster Design",
    year: "2025",
    tools: ["Photoshop"],
    width: 1080,
    height: 1350,
    aspectRatio: "tall",
    description:
      "Archival poster design exploring typography scale and negative space.",
  }),
  plate("Picsart_25-09-23_00-13-57-825.png", {
    id: "picsart-edit",
    title: "Atmospheric Edit",
    category: "Illustrations",
    year: "2025",
    tools: ["Picsart", "Lightroom"],
    width: 3098,
    height: 3872,
    aspectRatio: "tall",
    description: "Atmospheric color grading and composite illustration.",
  }),
  plate("WhatsApp Image 2026-06-26 at 18.18.30.jpeg", {
    id: "archival-image",
    title: "Archival Concept",
    category: "3D Art",
    year: "2026",
    tools: ["Photoshop"],
    width: 1500,
    height: 1500,
    aspectRatio: "square",
    description: "Concept frame kept from the working archive.",
  }),
]

/**
 * The hero background source. Thumbnails only — the wall repeats each entry many
 * times, and eight unique URLs means eight network requests no matter how many
 * tiles end up in the DOM.
 */
export const DRIFT_WALL_IMAGES: string[] = GALLERY_ITEMS.map(
  (item) => item.thumbnail
)
