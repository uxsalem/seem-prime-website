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
    PageShell.tsx          direction, body type scale, progress hairline, reveal pass
    PageMasthead.tsx       the breadcrumb + title + lead every inner page opens with
    SiteHeader / SiteFooter / SiteCta / ImageSlot / Mark
  lib/
    site.tsx               language + theme context, persisted to localStorage
    css.ts                 CSS declaration string → React style object
    hooks.ts               scroll driver, reveal, counters, media query, rails
    typography.ts          the shared style builders (h2, masthead, labels, captions)
    routes.ts              URLs, brand plates, contact details
    content/               Arabic and English copy, one module per page
public/ds/                 fonts and brand imagery
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

## Motion

Scroll work runs through `useScrollDriver`, which mirrors the original throttle: per-frame work
(progress bar, parallax) on every event, heavier passes at ~16fps with a trailing call.

State-driven visuals — the open SEEM letter, the business-model stage, the strategy colonnade —
are plain React renders. Continuous per-frame values are written straight to the DOM through
refs (`src/components/pages/home-motion.ts`), because re-rendering a page this size sixty times
a second to move a background plate would be absurd.

`prefers-reduced-motion: reduce` short-circuits the marquee, the scroll cue, the parallax and
the counters, and lights the reveal system statically.

## Known gaps

- **The contact form and newsletter signup do not send anything.** Both validate and show a
  confirmation locally. Wire them to a route handler or form service — see the `TODO` in
  `src/components/pages/ContactPage.tsx` and `src/components/SiteFooter.tsx`.
- **Most image slots are empty.** `ImageSlot` renders a captioned placeholder naming what
  belongs there. Only the about-page manufacturing photo has real artwork so far; drop files
  into `public/ds/img/` and pass them as `src`.

## `legacy-dc/`

The original Design Combo sources this project was converted from — the `.dc.html` templates,
their runtime (`support.js`), and the `<image-slot>` element. Kept for reference only; nothing
in the app reads them, and their relative asset paths no longer resolve now that the brand
assets live under `public/ds/`. `_ds/` holds the upstream design-system tokens and
documentation, also reference-only.
