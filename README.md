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
    PageShell.tsx          direction, body type scale, progress hairline, reveal pass, spotlight
    PageMasthead.tsx       the breadcrumb + title + lead every inner page opens with
    Plate.tsx              a full-bleed photograph behind a section: blur-up, scrim, drift
    ImageSlot.tsx          a framed photograph, or a captioned empty state
    SiteHeader / SiteFooter / SiteCta / Mark
  lib/
    site.tsx               language + theme context, persisted to localStorage
    css.ts                 CSS declaration string → React style object
    hooks.ts               scroll driver, reveal, counters, media query, rails
    motion.ts              plate parallax and the pointer glow, shared by every page
    media.ts               the photography: files, blur-ups, alt text, and where each is framed
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

`src/lib/media.ts` is the one place the site's photographs are named. Each carries a full-bleed
file, an ~880px cut for cards and rails, a 20px WebP blur-up inlined as a data URI, a focal
point, and alt text in both languages. Call sites reference a **frame** — a photograph plus how
to crop it — never a path:

```ts
type Framed = { photo: Photo; focus?: string; zoom?: number; origin?: string }
```

`zoom` and `origin` take a *detail* out of a picture rather than the whole of it, which is how
the eight strategic sectors run off four photographs without eight frames looking like the same
one. The maps at the foot of the module — `pagePlates`, `platformFrames`, `stageFrames`,
`sectorFrames` — decide what appears where; re-shooting a subject is a one-line change.

Two components consume them. **`Plate`** is the full-bleed photograph behind a hero, masthead,
banner or closing band: blur-up, photograph, brand scrim, film grain. **`ImageSlot`** is a
framed picture inside a card or gallery tile, and still renders its captioned empty state when
no frame is passed — the contact page's portrait slots are deliberately still waiting for real
people.

Source files live in `public/ds/img/*.webp`. Photography weight, measured against a production
build at 1440×900:

| Page | Above the fold | Whole page |
|---|---|---|
| home | 54KB | 437KB |
| about | 171KB | 338KB |
| model | 630KB | 630KB |
| strategy | 212KB | 589KB |
| ecosystem | 363KB | 630KB |
| roadmap | 266KB | 266KB |
| contact | 212KB | 212KB |

The model page is the outlier: its four stage plates are stacked in one box and crossfaded on
`opacity`, so all four intersect the viewport and `loading="lazy"` cannot defer any of them.
That is the shape the stage had before this change too — it is ~7× lighter than the 5MB of PNG
plates it replaces — but it is still the site's heaviest single moment.

## Motion

Scroll work runs through `useScrollDriver`, which mirrors the original throttle: per-frame work
(progress bar, parallax) on every event, heavier passes at ~16fps with a trailing call.

State-driven visuals — the open SEEM letter, the business-model stage, the strategy colonnade —
are plain React renders. Continuous per-frame values are written straight to the DOM through
refs (`src/components/pages/home-motion.ts`), because re-rendering a page this size sixty times
a second to move a background plate would be absurd.

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

`prefers-reduced-motion: reduce` short-circuits the marquee, the scroll cue, the parallax, the
Ken Burns cycle, the counters, the mask and rise reveals, the hover zoom and the pointer glow,
and lights the reveal system statically.

## Known gaps

- **The contact form and newsletter signup do not send anything.** Both validate and show a
  confirmation locally. Wire them to a route handler or form service — see the `TODO` in
  `src/components/pages/ContactPage.tsx` and `src/components/SiteFooter.tsx`.
- **Two sets of image slots are still empty**, both deliberately: the contact page's
  testimonial portraits (a building is not a stand-in for a person) and the ecosystem page's
  partner logo plates. Both keep their captioned placeholder. To fill them, add the file to
  `public/ds/img/`, name it in `src/lib/media.ts`, and pass the frame to `ImageSlot`.
- **The photography is stock-grade, not shot on site.** The frames are art-directed for the
  brand, but nothing in them is a SEEM PRIME building, plant or property. Swapping in real
  assets is a change to `src/lib/media.ts` alone.
- **The five original brand plates are no longer used.** `plates` in `src/lib/routes.ts` still
  names them and the PNGs are still in `public/ds/img/` (~5MB). Delete both if they are not
  wanted back.
- **The business-model stage loads all four of its plates at once** (~630KB), because stacked
  crossfade means every one of them is in the viewport. Deferring the three inactive stages
  would need the stack to mount lazily rather than fade on `opacity`.

## `legacy-dc/`

The original Design Combo sources this project was converted from — the `.dc.html` templates,
their runtime (`support.js`), and the `<image-slot>` element. Kept for reference only; nothing
in the app reads them, and their relative asset paths no longer resolve now that the brand
assets live under `public/ds/`. `_ds/` holds the upstream design-system tokens and
documentation, also reference-only.
