# SEEM PRIME — website

The SEEM PRIME corporate site, as a Next.js App Router project. Seven statically prerendered
pages, bilingual Arabic/English with full RTL, and a light/dark theme — all client-side, no
backend.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
npm run typecheck  # tsc --noEmit
```

## Layout

```
src/
  app/                     one route per page; each is a thin server component
    layout.tsx             <html>, global CSS, theme bootstrap, SiteProvider
    globals.css            fonts, tokens, reveal system, layout grids, hover states
    page.tsx               /            → HomePage
    about|model|strategy|ecosystem|roadmap|contact/page.tsx
  components/
    pages/                 the page bodies (client components)
    home/                  the home page's seven sections, each owning its own motion
    about/                 the about page's five chapters and its contents line, likewise
    PageShell.tsx          direction, body type scale, progress hairline, reveal pass, spotlight
    PageMasthead.tsx       the full-height opening shot every inner page starts on
    Plate.tsx              a full-bleed photograph behind a section: blur-up, scrim, drift
    ImageSlot.tsx          a framed photograph, or a captioned empty state
    SiteHeader / SiteFooter / SiteCta / Mark
  lib/
    site.tsx               language + theme context, persisted to localStorage
    css.ts                 CSS declaration string → React style object
    hooks.ts               scroll driver, reveal, counters, media query, rails
    motion.ts              plate parallax and the pointer glow, shared by every page
    media.ts               the photography: files, cuts, blur-ups, alt text, and where each is framed
    typography.ts          the shared style builders (h2, masthead, labels, captions)
    routes.ts              URLs, brand plates, contact details
    content/               Arabic and English copy, one module per page
public/ds/                 fonts and imagery
```

## How the styling works

The design is authored as **CSS declaration strings** — the same strings the original build
carried in its `style` attributes. `css()` in `src/lib/css.ts` parses one into a React style
object and memoises it, so the markup stays a line-for-line match with the design source while
still being ordinary React.

What an inline `style` cannot express lives in `globals.css`:

- **Tokens** (`--page`, `--ink`, `--line`, …) and their `html[data-theme="dark"]` overrides.
- **The reveal system**: `[data-sc]` starts dimmed and offset; `PageShell` stamps `data-in` on
  it once it crosses 94% of the viewport. `[data-stagger]` with a `--i` index delays siblings.
- **Layout grids** declared by attribute (`[data-split]`, `[data-cols]`, `[data-eco]`, …).
- **Hover and press states**, as `.sp-*` classes. Shape and colour still come from the
  element's own inline declarations; the class only describes what changes. `.sp-lift` reads
  `--lift-sh` so each call site keeps its own shadow.

Per-page rules that differ are scoped by `[data-page="…"]`, set on the shell.

## Language, direction and theme

`SiteProvider` (`src/lib/site.tsx`) holds both, persists them to `localStorage`
(`seemprime-lang`, `seemprime-theme`), and mirrors them onto `<html>`. A small inline script in
the layout applies the stored theme before first paint so dark mode never flashes light.

Arabic is the default. `ar` drives more than the copy: a heavier display weight, looser
leading, no letter-spacing, no uppercasing, and reversed arrows. The builders in
`src/lib/typography.ts` take that flag so the rule lives in one place.

## Photography

The site is carried by one set of photographs, all taken at the same golden hour: a heritage
coast, a processing plant, a logistics hub, a residence, a contactless payment, an evening
destination, code before the Riyadh skyline, and a city seen from a lit terrace, plus six
entertainment frames cut from one contact sheet. One light across every sector is what lets a
refinery, a warehouse and a cinema read as one landscape rather than a stock collage. The
brand's deep green is the ground they sit on (sections, scrims, the dark between frames), never
a tint laid over the pictures.

`src/lib/media.ts` is the one place the photographs are named. Each carries its cuts, a 20px WebP
blur-up inlined as a data URI, a focal point, and alt text in both languages. Call sites
reference a **frame** (a photograph plus how to crop it), never a path:

```ts
type Framed = { photo: Photo; focus?: string; zoom?: number; origin?: string }
```

The maps at the foot of the module decide what appears where: `heroFrames`, `sectorFrames`,
`verbFrames`, `seemFrames`, `leisureTiles`, `platformFrames`, `stageFrames`, `pagePlates`,
`homeHorizon`, `homeClosing`, `aboutStrands`, `aboutWhole`, `aboutCreed`. Re-shooting a subject
is a one-line change.

**Cuts.** The golden-hour set ships three: the full file (1402–1774px), a 1280px middle cut and
an 880px card cut, as WebP at quality 80 / 78 / 76. `srcSet()` hands all three to any frame the
browser can size, which covers the plates, the hero, and the reel, stage and closing windows, so
a phone fetches the card cut and a desktop the full one. The entertainment tiles exist at card
size only (~585px). The payments frame is cropped to leave out the emblem that opens the source
image.

Two components consume them. **`Plate`** is the full-bleed photograph behind a hero, masthead,
banner or closing band: blur-up, photograph, brand scrim, film grain. **`ImageSlot`** is a
framed picture inside a card, window or tile, and still renders its captioned empty state when
no frame is passed. The contact page's portrait slots are deliberately still waiting for real
people.

Image weight, measured against a production build (whole page = after scrolling to the foot):

| Page | 1440×900 first screen | 1440×900 whole page | 390×844 @2x whole page |
|---|---|---|---|
| home | 437KB | 861KB | 387KB |
| about | 396KB | 663KB | 309KB |
| model | 617KB | 617KB | 213KB |
| strategy | 95KB | 694KB | 264KB |
| ecosystem | 173KB | 1108KB | 869KB |
| roadmap | 249KB | 249KB | 86KB |
| contact | 202KB | 202KB | 65KB |

The home page's first screen on desktop is the hero's opening frame plus the next scene, which
is fetched 1.4s in so the first cut never waits. Scenes after that load one ahead, never all at
once. The about page's is its opening shot plus the four strand windows peeking under it; the
city they assemble into is only mounted once the reader reaches that chapter.

## Motion

Scroll work runs through `useScrollDriver`, which mirrors the original throttle: per-frame work
(progress bar, parallax) on every event, heavier passes at ~16fps with a trailing call.

State-driven visuals (the open SEEM stage, the business-model stage, the strategy colonnade)
are plain React renders. Continuous per-frame values are written straight to the DOM through
refs, because re-rendering a page this size sixty times a second to move a background plate
would be absurd.

### The home page, as one journey

Each section in `src/components/home/` owns its motion:

- **`HeroCinema`**: on the first visit in a tab, the page opens on the SEEM square on deep
  green. The photograph fills the square from inside and the square widens to the frame. The
  bootstrap script in `site.tsx` sets `html[data-intro]` before first paint, so this runs in CSS
  from the first frame. The hero then cuts between seven sectors on a **diagonal blade** (the
  slant of the cut ends of the mark's letter bars) with a light hairline and an ember line
  riding its edge. The blade travels right to left in Arabic and left to right in English. The
  index along the foot names every scene and jumps to it; a pause button stops the clock. The
  clock only runs while the hero is on screen and the tab is visible. Scrolling away closes the
  frame into an inset panel.
- **`Statement`**: the positioning line, lit word by word at the pace of the scroll. Each verb
  opens a capsule onto the work it names. The capsules hold their width from the start and open
  on a clip, so the line never re-wraps.
- **`SectorReel`**: on a wide screen the section pins and vertical scroll becomes a lateral
  journey along one horizon line past eight windows of art-directed sizes. The ember line draws
  itself to the middle of the screen, and each picture slides against the travel. Everywhere
  else it is a swipe rail.
- **`PlatformIndex`**: the four platforms as a typographic index. With a fine pointer, a window
  of the platform's picture floats beside the cursor and the other rows dim. Touch screens get
  an inline thumbnail instead.
- **`SeemStages`**: four standing panels, one photograph each. Scroll (or a click) widens the
  open stage into a window and its question arrives.
- **`Horizon2030`**: the page returns to the coast it opened on, turned in Arabic so the sun
  always sits at the end of the reading line, where 2030 is. The four phases light along the
  horizon as the rule draws toward the sun, and the targets count up along the foot. On a phone
  the line runs down the reading edge instead.
- **`ClosingAperture`**: the square again, as a window that opens as it arrives, beside the
  page's closing line.

### The about page, in five chapters

The about page tells the company rather than listing it. It opens on the shared masthead with a
contents line along its foot, and each chapter in `src/components/about/` owns its motion:

- **`Convergence`** (what we do): the framework's one sentence, with its four strands, capital,
  technology, operations and partnership, open as four windows at the corners of the screen.
  The section pins, and the scroll moves them in two beats. First they gather along the screen's
  edges, clear of the sentence. Once it has gone, they close across the middle into one square,
  framed the way the mark frames its letters. Each photograph then gives way to its piece of a
  single city, and the square opens to the edges: one ecosystem. Everywhere else it is the
  sentence, the four windows as a square, and the city below them.
- **`MarkAnatomy`** (our name): the mark drawn as a construction on a sheet, from the artwork's
  own paths (`MARK_PATHS` in `Mark.tsx`). First the frame, then each letter traced in outline and
  filled, S, E, E, M, each naming its stage. Last comes the grid of bars every letter is cut
  from. On a wide screen the drawing holds still while its three notes scroll past, then holds a
  beat once finished.
- **`ValuesCreed`** (our values): the six values as the framework's full sentences, set large
  under a band of green glass that fades into the section. Each comes up to full strength at the
  reading line, and the ones already read stay half-lit.
- **`StakeholderFlow`** (who we serve): five lines leave the mark and fan out to the five groups
  it serves, drawn in turn, then carry a slow ember pulse outward. On a phone the same line runs
  down the reading edge.
- **`AboutClose`** (from Jeddah): the roadmap's phases as rings around Jeddah, 2025, widening
  to the Kingdom, the region and 2030 at the rim, with a ripple leaving the centre once they are
  drawn. Beside them sits the page's one call to action.

Pinning and horizontal travel only switch on at 1000px and up, with room in height, and with
motion welcome. Otherwise the sections are ordinary flowing layout.

The header takes the tone of whatever it passes over: any section marked `data-tone="dark"`
under its middle line turns it to dark glass, so a cinematic section is never capped by a white
bar. Every inner page's masthead is now a full-height opening shot whose frame widens to the
edges as the page arrives, and every closing band lands on a different photograph from the one
the page opened on. The about page closes on a drawing of its own instead (see above).

Photographic plates drift on their own shared loop (`usePlateParallax` in `src/lib/motion.ts`):
one passive listener and one rAF pass for every plate on the page, each measured against its
own section so a masthead 4000px down opens at the same offset as the hero does at the top.
The photograph inside also breathes on a 38s Ken Burns cycle, so a still image never reads as a
flat backdrop.

Two reveal variants sit alongside the base `[data-sc]`:

- `data-sc="mask"` — a frame that *unveils*. The frame opens on a `clip-path` while the picture
  inside settles out of its own crop.
- `data-sc="rise"` — a line of display type arriving up, in, and out of focus into focus. The
  hero's three headline lines stagger through it.

Pointer states are all CSS, fed by one delegated listener: `[data-spot]` cards take an ember
glow that follows the cursor (`useSpotlight`, wired once in `PageShell`), `.sp-zoom` leans its
picture in, `.sp-sheen` runs a single highlight across a pill, `.sp-nav` draws an ember rule in
from the reading edge. Nested transforms are kept on separate elements on purpose — the reveal
owns `[data-imgwrap]`, the editorial crop owns `[data-imgcrop]`, the hover owns `[data-img]` —
so they compose instead of fighting.

`prefers-reduced-motion: reduce` short-circuits the parallax, the Ken Burns cycle, the counters,
the mask and rise reveals, the hover zoom and the pointer glow, and lights the reveal system
statically. On the home page the aperture never plays, the hero holds its first scene (the index
still switches scenes, without the blade), the statement is fully lit with its capsules open,
the reel becomes the swipe rail, the SEEM stages stack with every stage open, and the horizon is
drawn in full. On the about page the four strands sit flat as a square above the city they make,
the mark is drawn in full, every value is lit, the lines to the five groups are drawn and still,
and the rings hold without their ripple.

## Known gaps

- **The contact form and newsletter signup do not send anything.** Both validate and show a
  confirmation locally. Wire them to a route handler or form service — see the `TODO` in
  `src/components/pages/ContactPage.tsx` and `src/components/SiteFooter.tsx`.
- **Two sets of image slots are still empty**, both deliberately: the contact page's
  testimonial portraits (a building is not a stand-in for a person) and the ecosystem page's
  partner logo plates. Both keep their captioned placeholder. To fill them, add the file to
  `public/ds/img/`, name it in `src/lib/media.ts`, and pass the frame to `ImageSlot`.
- **The photography is generated imagery, not shot on site.** The golden-hour set is
  art-directed for the brand, but nothing in it is a SEEM PRIME building, plant or property,
  and the people in it are not staff. Swapping in real assets is a change to `src/lib/media.ts`
  alone.
- **Some home page copy is draft.** The reel headline, the four new sector lines, the
  platforms kicker and the reel's closing link are new strings, marked `// draft` in
  `src/lib/content/home.ts`, in both languages. Everything else on the page is the approved
  framework copy.
- **Some about page copy is draft.** The English values are the framework's own full
  statements; their Arabic is a drafted translation. The chapter names, the name chapter's
  headline and its three notes, the values headline and "One ecosystem" are new. All are marked
  `// draft` in `src/lib/content/about.ts`. The mark's rationale (unity, strength, stability)
  and its 4.2 cm stamp size come from the logo concept document.
- **Two sectors have thinner photography than the rest.** Food's only picture is the waterfront
  table from the entertainment contact sheet, so it is card-sized and left out of the hero.
  Entertainment's extra frames are ~585px tiles. A proper food-manufacturing shot and larger
  entertainment frames would close both.
- **One superseded photograph is no longer used.** `red-sea-hospitality*.webp` is still in
  `public/ds/img/` (~245KB); nothing names it. Delete it if it is not wanted back. (The skyline
  that sat beside it is back in service as the about page's city.)
- **The five original brand plates are no longer used.** `plates` in `src/lib/routes.ts` still
  names them and the PNGs are still in `public/ds/img/` (~5MB). Delete both if they are not
  wanted back.
- **The business-model stage loads all four of its plates at once** (~620KB), because stacked
  crossfade means every one of them is in the viewport. Deferring the three inactive stages
  would need the stack to mount lazily rather than fade on `opacity`.

## `legacy-dc/`

The original Design Combo sources this project was converted from — the `.dc.html` templates,
their runtime (`support.js`), and the `<image-slot>` element. Kept for reference only; nothing
in the app reads them, and their relative asset paths no longer resolve now that the brand
assets live under `public/ds/`. `_ds/` holds the upstream design-system tokens and
documentation, also reference-only.
