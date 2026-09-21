# SEEM PRIME — Design System

A brand-founded design system for **SEEM PRIME** (SEEM GROUP), a strategic investment and
operating company in Jeddah, Saudi Arabia. Everything here is derived from the two documents
the client supplied; nothing is invented except where explicitly flagged as a substitution.

---

## 1. Sources

| Source | What it gave us |
| --- | --- |
| `uploads/SEEM Prime Corporate Identity Framework.pdf` (18 pp.) | Strategy, positioning, vision/mission, values, portfolio platforms, KPIs, tagline, contact details, and **all brand imagery** (deep-green architecture, glass/silver planes, ember hairline accents, the ZL.TOURS sculpture) |
| `uploads/Seem group.pdf` (1 p.) | Logo concept rationale, the **SEEM GROUP square mark** (as a rubber-stamp mockup), stamp spec `4.2 × 4.2 cm`, typeface origin (Anurati, customised) |

No codebase, Figma file, website, or slide template was provided. There is therefore **no
existing product UI to recreate** — the UI kits in this system are brand-derived surfaces
(corporate site, investor portal) built strictly from the identity framework's own visual
language, not recreations of shipped screens. Anything not evidenced in the sources is called
out as an assumption in this file.

Extracted raw material lives in `scraps/` (page images pulled from the PDFs); the curated,
production-ready subset is in `assets/`.

---

## 2. Company & product context

**Who they are.** SEEM PRIME is a strategic investment and operating company specialising in
developing, operating, and investing in scalable business platforms. It positions itself as an
**"Economic Ecosystem Builder"** connecting capital, technology, operations, and strategic
partnerships.

**The SEEM model** — the name is an acronym and the spine of every narrative:

| S | E | E | M |
| --- | --- | --- | --- |
| **Strategy** — Where are we going? | **Enablement** — Are we ready to execute? | **Execution** — How do we turn plans into reality? | **Measurement & Improvement** — Did we achieve the impact? |
| Clear Strategy | Strong Readiness | Disciplined Execution | Sustainable Impact |

**Revenue model.** Develop → Operate → Invest → Monetize (investment returns, management fees,
platform revenues, advisory services).

**Strategic pillars.** Develop economic platforms · Invest in high-growth sectors · Build
strategic partnerships · Deliver operational excellence · Drive digital transformation.

**Focus sectors.** Industry · Technology · Food · Logistics · Tourism · Real Estate ·
Financial Services · Entertainment.

**Portfolio platforms** (as named in the framework):

- **FUTURE VENTURES** — AI & emerging-technology investments
- **ZL.TOURS** — digital tourism marketplace
- Property & hospitality operating platform
- Premium bean-bar chocolate
- Last-mile operating system

**Roadmap.** 2025 Foundation → 2026–2028 Saudi Expansion → 2029 Regional Expansion → 2030
Leading Economic Ecosystem Platform.

**2030 targets.** 40 business platforms · SR 1B investment portfolio · 200 jobs created ·
50 strategic partnerships · 10% annual growth.

**Values.** Leadership & Innovation · Partnership & Trust · Operational Excellence ·
Sustainability · Results Orientation · Responsibility & Governance.

**Corporate tagline.** *Empowering Businesses | Accelerating Growth | Building Economic Ecosystems*

**Head office.** Al Khalidiyah District, Jeddah, Saudi Arabia · info@seem.sa · +966 53 680 0016

**Audiences (in the framework's own order).** Investors (attractive long-term returns) ·
Government (economic diversification) · Businesses (growth platforms) · Entrepreneurs
(market access) · Communities (jobs & sustainable development).

---

## 3. CONTENT FUNDAMENTALS

### Voice
Institutional, declarative, and unhedged. SEEM PRIME states what it *does*, not what it hopes
to do. Sentences are structurally parallel and often tricolon — the rhythm of the framework is
three or four beats, repeated:

> "We build integrated business ecosystems that connect capital, technology, operations, and strategic partnerships to accelerate sustainable economic growth."

> "From Strategy .. To Execution .. To Sustainable Impact"

> "Empowering Businesses | Accelerating Growth | Building Economic Ecosystems"

### Person
**"We" for the company, never "I".** The reader is almost never addressed as "you" in
corporate copy; the company speaks in the first-person plural and the audience is named in the
third person ("investors", "entrepreneurs", "communities"). The one exception is the strategic
model, which asks questions on the reader's behalf: *"Where are we going?"*, *"Are we ready to
execute?"*, *"Did we achieve the impact?"* — inclusive "we", used as section framing.

In product/UI copy (portal, forms, buttons) shift to second person for actions
("Download the report", "Your portfolio") but keep the institutional register — no chattiness,
no exclamation marks.

### Casing
- **Wordmark:** `S E E M   P R I M E` — all caps, heavily letterspaced (`--tracking-wordmark`, 0.42em). Never lowercase, never "Seem Prime" in running text when used as a lock-up.
- **Company name in prose:** `SEEM PRIME` in caps; `SEEM GROUP` for the parent.
- **Headings:** Title Case for section headings ("Strategic Positioning", "Corporate Values", "Value Proposition"). Sentence case is acceptable for UI labels.
- **Eyebrows / kickers:** ALL CAPS with `--tracking-eyebrow` ("OUR PORTFOLIO PLATFORMS").
- **Platform names:** set exactly as the client writes them — `FUTURE VENTURES`, `ZL.TOURS` (caps, with the dot).

### Sentence & list craft
- Numbered value propositions use a **bold lead-in + colon + one clause**: *"1. Investment Expertise: Identifying, developing, and investing in high-potential opportunities."* Reuse this pattern for feature lists.
- Values are a **short title + one 2-line sentence**, always beginning "We …": *"Operational Excellence — We pursue excellence through disciplined execution, continuous improvement, and world-class operational standards."*
- Pairs and grids over paragraphs: sectors, pillars, and platforms are presented as 2-column or 4-column label grids, not prose.
- Stakeholder statements are **one noun phrase, no verb**: "Attractive long-term returns", "Economic diversification", "Growth platforms".

### Numbers & KPIs
Written as compact value + unit + noun, never a sentence: `40 Business Platforms`,
`SR 1B Investment Portfolio`, `200 Jobs Created`, `10% Annual Growth`. Currency is **SR**
(not SAR, not ريال) in English materials. KPI decks number items `01`–`05`.

### Vocabulary that is *on-brand*
platform, ecosystem, scalable, sustainable, disciplined, readiness, enablement, execution,
measurement, impact, value chain, stakeholders, economic diversification, next-gen, AI-powered.

### Vocabulary to avoid
"revolutionary", "game-changing", "world's best", "we're excited to", "journey", startup
slang, hype adjectives, and any hedging ("we aim to try"). The framework never apologises or
speculates.

### Emoji
**Never.** Not in decks, not in UI, not in email. There is no emoji anywhere in the source
material. Separators are `|`, `·`, `..` (the framework's own ellipsis style) or a ruled line.

### Bilingual note
The company is Saudi and will need Arabic. `--font-arabic` (IBM Plex Sans Arabic) is shipped
and `[dir="rtl"]` flips base typography. No Arabic copy was supplied — do **not** machine-
translate brand lines; request approved Arabic from the client.

---

## 4. VISUAL FOUNDATIONS

The identity framework is built from four materials: **deep forest green**, **glass**,
**brushed silver**, and a **single ember hairline**. Every surface in this system is one of
those four, or white paper.

### Colour
- **Primary: deep forest green** — `--green-900 #062621`, deepening to `--green-950 #041815`. Sampled directly from the framework's architectural and glass plates. This is the brand's *ground*: full-bleed section backgrounds, covers, footers.
- **Neutrals are silver-green, never grey-blue** — `--silver-050 → --silver-900` all carry a faint green cast; `--silver-200 #e4eeef` is the "glass tint" used for cool panels.
- **Ember `#dc4b1c` is an accent, not a colour.** In the source it only ever appears as a hairline on a diagonal edge or a 2–3% corner wedge. Rule of thumb: **ember may occupy no more than ~2% of any composition** — rules, underlines, active indicators, one KPI figure. It is never a button fill, never a background, never a large text colour. (Explicit client direction: orange is not the primary colour.)
- **Teal `#057078` and bronze `#8a6a3b`** come from the ZL.TOURS sculpture (glass wave + machined bronze) and serve as portfolio/secondary accents: bronze for value & premium figures, teal for information.
- Max **two** background colours per composition (green + white/silver). Tinted third surfaces use `--surface-tint` at most.

### Type
- **Display: Sora** — geometric, wide, slightly technical; carries the framework's engineered feel. Display sizes run light (300) at large sizes, semibold (600) at heading sizes. Negative tracking (`-0.02em`) on display, so big type sits tight and architectural.
- **Text: IBM Plex Sans** — corporate, legible, institutional. Body copy is often **light (300) at 18px** in the framework's long statements; UI text is 400/500 at 16px.
- **Labels: caps + wide tracking.** Eyebrows at `0.18em`, the wordmark at `0.42em`. This letterspaced-caps treatment *is* the brand's typographic signature — the wordmark in the PDF is literally set as `S E E M  P R I M E`.
- **Data: IBM Plex Mono** for KPI numerals, dates, reference codes.
- Long statements are set at ~68ch (`--container-prose`) and centred on covers, left-aligned everywhere else.

### Backgrounds & imagery
- **Full-bleed photographic/abstract plates**, never flat decorative gradients. The library: green architectural fins, curved glass façades with brushed-metal handrails, white-and-green diagonal planes, capsule-cut glass blades. All in `assets/imagery/`.
- **Diagonal composition.** The dominant motif is a single diagonal blade splitting the frame: green on one side, white/silver on the other, with a 1px light edge and often a hairline ember line running along it.
- **Capsule cut-outs.** Large pill/stadium shapes (radius `--radius-2xl` → `--radius-capsule`) cut into green fields, echoing the glass balconies.
- **Blueprint line texture.** Faint technical construction lines (arcs, crosses, grids) at 4–8% white over green — used as a corner texture, never across a whole panel.
- **Watermark wordmark.** The SEEM lettering repeated at 6–10% opacity in green-on-green as a background texture (see `assets/imagery/diagonal-glass-planes.png`).
- **Colour vibe of imagery: cool, desaturated, hard light.** Teal-green shadows, silver highlights, no warm tint, no grain, no film texture. If a warm element appears it is bronze and it is an object, not a wash.

### Gradients
Only two legitimate kinds:
1. **Material washes** — `--wash-green` (a 160° deepening of green, mimicking a lit surface) and `--wash-silver`.
2. **Protection gradients** — `--wash-protect-bottom` / `--wash-protect-left`, used to seat text over imagery. Never a decorative colour-to-colour blend, and never purple/blue.

### Glass, transparency & blur
Glass is used for **overlays that sit on imagery**: `--surface-glass` (white 62%) or
`--surface-glass-dark` (green 55%) with `backdrop-filter: var(--blur-glass)` and
`--highlight-top` for the 1px lit edge. Use it for sticky headers over hero plates, image
captions, and stat capsules on photos. Never glass-on-flat-colour — without something behind
it, the effect reads as noise.

### Borders & rules
- Hairlines at 1px, always a tinted alpha (`--border-hairline` = green at 10%), never `#ddd`.
- **Accent rule:** a 3px ember or green bar, `--rule-accent-w`, sitting *above* a heading or under an eyebrow. Full-width 1px dividers separate list rows.
- No double borders, no dashed borders.
- Avoid the "card with a coloured left border" pattern — not present in the source.

### Corner radii
The identity contains both extremes and little in between: the logo is a **hard square**, the
glass elements are **full capsules**. So: `0px` for structural panels, image frames, table
cells and the logo lock-up; `8–14px` for cards and inputs; `24–36px` for large glass/feature
panels; `999px` for pills, tags, and icon buttons. One-corner cuts (`--radius-blade`) quote
the diagonal motif.

### Cards
White (`--surface-card`), **1px hairline border**, radius `--radius-lg` (14px), and a wide
soft green-tinted shadow (`--shadow-card`) — not a hard drop shadow. On green sections cards
become `rgba(255,255,255,.06)` with a `--border-on-brand` hairline and no shadow. Numbered
step badges are the one place the framework's **soft neumorphic pad** appears
(`--shadow-soft`): a circular light-grey disc with paired light/dark soft shadows.

### Shadows
Cool and green-tinted (`rgba(4,24,21,…)`), wide and low-opacity. Three levels only: `card`,
`raised`, `overlay`, plus `brand` for green-on-light panels. Inner shadows are reserved for
the pressed state of soft badges and for glass edge highlights.

### Motion
Measured, architectural, no personality quirks. **Fades and short slides** (8–16px), easing
`--ease-standard` / `--ease-entrance` (decelerating), 150–240ms for controls, 420–720ms for
section reveals. Diagonal blade wipes are the one signature transition for hero/slide changes.
**No bounce, no overshoot, no spring, no rotation.** Everything respects
`prefers-reduced-motion`.

### Interaction states
- **Hover:** darken green fills one step (`--green-900 → --green-950`); light surfaces gain `--shadow-raised` and lift 2px (`--lift-hover`). Ghost/text buttons gain a hairline. Links darken and their underline turns ember.
- **Press:** `scale(.985)` plus removal of the lift — the press feels like the surface seating back down. Never a colour change alone.
- **Focus:** 2px `--focus-ring` outline at 2px offset, green on light, `--green-300` on dark. Focus is never removed.
- **Disabled:** 40% opacity, no shadow, `cursor: not-allowed`. Never grey-on-grey text below 4.5:1 for anything meaningful.
- **Selected/active:** a 3px ember or green indicator bar plus `--surface-tint` background — never a filled pastel block.

### Layout
- 12-column grid, `--container` 1200px (`--container-wide` 1400px for full-bleed sections), `--gutter` 24px.
- Section rhythm `--section-y` 96px desktop / 56px compact.
- **Fixed elements:** a single sticky top bar (glass over imagery, solid white after scroll); nothing else is fixed — no floating action buttons, no sticky sidebars, no cookie-style bars in the source language.
- Content is left-aligned by default; only covers and single-statement slides centre.
- Asymmetry is the norm: 7/5 or 8/4 splits with the image side full-bleed to the viewport edge.

### Things that are off-brand
Purple/blue gradients · emoji · rounded "friendly" illustrations · hand-drawn anything ·
neon accents · large orange areas · drop shadows with black · pastel status blocks ·
photography that is warm, grainy, or people-centric-with-stock-smiles.

---

## 5. ICONOGRAPHY

**The sources contain no icon set.** The framework is entirely typographic + photographic: its
only recurring non-photographic elements are soft circular step badges (numerals inside them),
letterspaced caps labels, and the `|` / `·` / `..` separators. There is no icon font, no SVG
sprite, no PNG icon set, and **no emoji anywhere**.

### Substitution (flagged)
For UI work we link **Lucide** from CDN — 24px grid, 1.5px uniform stroke, square-ish
geometry, no fills. It is the closest available match to the framework's engineered, hairline
aesthetic (thin consistent stroke, geometric construction, no rounded-cartoon terminals).

```html
<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js"></script>
<script>lucide.createIcons();</script>
<i data-lucide="arrow-up-right"></i>
```

Rules for icon usage in this system:
- **Stroke 1.5px, `currentColor`, never filled.** Sizes 16 / 20 / 24 px only.
- Icons are **functional, not decorative** — navigation, controls, table affordances, external-link and download markers. Never an icon per bullet point, never an icon as a "feature illustration".
- Pair with text wherever the target is a primary action; icon-only buttons must be 44px minimum and carry an `aria-label`.
- The brand's own signature affordance is the **arrow-up-right** on links ("read more →") and the **hairline chevron**; prefer those over ornamental glyphs.
- Do **not** draw new icons in the brand style by hand, and do not substitute emoji or unicode dingbats for icons. Unicode is acceptable only for the framework's own separators (`|`, `·`) and arrows (`→`).

**Ask:** if SEEM PRIME has an approved icon library (or wants a bespoke one), supply it and
this section should be replaced.

---

## 6. LOGO

`assets/` holds the mark extracted from the supplied stamp mockup — **no vector logo was
provided**:

| File | Use |
| --- | --- |
| `assets/logo-seem-group-mark-ink.png` | Primary mark on light surfaces (ink `#041815`, transparent background) |
| `assets/logo-seem-group-mark-white.png` | Mark on green/imagery surfaces |
| `assets/logo-seem-group-stamp-blue.png` | The stamp mark in its original blue ink |
| `assets/imagery/seem-group-stamp-photo.png` | The full stamp mockup photograph (brand collateral shot) |

The mark is a **square containing the four initials S, E, E, M**, symbolising unity, strength,
and stability, with `SEEM GROUP` set beneath. Its letterforms are **Anurati, customised** —
a futuristic geometric face whose strokes are cut into horizontal bars.

**Constraints.**
- These files are **raster crops of a photographed rubber stamp**: they carry stamp texture and a residual ~1° tilt. Fine for decks, documents and web at ≥48px; **request the original vector (AI/SVG/EPS) for production and for any use under 48px or over 400px.**
- The "SEEM PRIME" wordmark has **no logotype file**. Wherever a SEEM PRIME wordmark is needed it is set in type: Sora, caps, `--tracking-wordmark` (0.42em) — exactly as the framework does (`S E E M   P R I M E`). See the `Wordmark` component.
- Never redraw, re-trace, restyle, or recolour the mark beyond the three supplied inks. Clear space = the height of one "S" bar on all sides. Stamp spec on file: 4.2 × 4.2 cm.

---

## 7. TYPE SUBSTITUTIONS (please confirm)

| Role | Shipped here | Source says |
| --- | --- | --- |
| Logo lettering | *not shipped* | **Anurati**, customised — licensed for personal use only, so not embeddable. The mark is used as artwork instead. |
| Display / headings | **Sora** 300/400/600/700 | Not specified. Sora is the nearest geometric, wide, technical match to the Anurati-derived identity. |
| Body / UI | **IBM Plex Sans** 300–600 | Not specified. Chosen for institutional legibility and its Arabic sibling. |
| Arabic | **IBM Plex Sans Arabic** 400/600 | Not specified; required for a Saudi bilingual brand. |
| Data / numerals | **IBM Plex Mono** 400/500 | Not specified. |

**Ask:** if SEEM PRIME has licensed brand fonts, send the files and these four families should
be swapped in `tokens/fonts.css` + `tokens/typography.css` only.


---

## 8. INDEX

### Root
| Path | What it is |
| --- | --- |
| `styles.css` | Global CSS entry point — `@import` list only. Link this one file. |
| `readme.md` | This guide (context, content, visual foundations, iconography, logo, index). |
| `SKILL.md` | Agent-skill front matter so this folder works as a Claude Code skill. |
| `thumbnail.html` | Homepage tile for the design system. |
| `tokens/` | `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius.css` · `elevation.css` · `motion.css` · `base.css` |
| `assets/` | `fonts/` (14 woff2) · `imagery/` (8 brand plates) · three logo inks |
| `guidelines/` | 26 foundation specimen cards (Colors · Type · Spacing · Brand) |
| `components/` | 25 React primitives in 6 groups |
| `ui_kits/` | `corporate_site/` · `investor_portal/` |
| `slides/` | 7 sample slides at 1280 × 720 |
| `templates/corporate-deck/` | Design-component deck template (1920 × 1080, 7 slides) |
| `scraps/` | Raw images extracted from the source PDFs (working material) |

### Components
Each component is `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md`, with one `@dsCard` HTML per directory.

- **`components/brand/`** — **Wordmark**, **Logo**, **Eyebrow**, **AccentRule**, **GlassPanel**
- **`components/core/`** — **Button**, **IconButton**, **Card**, **Badge**, **Tag**, **Divider**
- **`components/forms/`** — **Input**, **Textarea**, **Select**, **Checkbox**, **Radio**, **Switch**
- **`components/navigation/`** — **Tabs**, **Breadcrumbs**
- **`components/feedback/`** — **Dialog**, **Toast**, **Tooltip**
- **`components/data/`** — **StatFigure**, **StepBadge**, **DataTable**

Import in card HTML or a consuming page via the compiled bundle:

```html
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Card, StatFigure } = window.SEEMPRIMEDesignSystem_99f8b0;
</script>
```

### Intentional additions
No source defined a component inventory (the brief was brand documents only), so the set above
is a standard primitive library sized to SEEM PRIME's needs. Five items are brand-specific
rather than generic, each earned by something in the source:

| Addition | Why |
| --- | --- |
| **Wordmark** | There is no logotype file; the wordmark must be type-set consistently. |
| **Logo** | Wraps the three supplied stamp inks with the right asset path and tone. |
| **Eyebrow** | The framework opens every section with a letterspaced caps kicker. |
| **AccentRule** | The 3px ember bar is a recurring identity element. |
| **StepBadge** | The soft circular numeral badges appear throughout the framework's model pages. |
| **StatFigure** | The 2030 KPI page has a specific figure + rule + caps-label treatment. |

### UI kits
| Kit | Entry | Screens |
| --- | --- | --- |
| Corporate site | `ui_kits/corporate_site/index.html` | Home · Approach · Portfolio · Contact |
| Investor portal | `ui_kits/investor_portal/index.html` | Sign in · Dashboard · Platforms · Reports · Settings |

Both are **brand-derived, not product recreations** — no website, app, Figma file, or codebase
was supplied. See each kit's `README.md` for what is real source copy and what is placeholder.

---

## 9. OPEN ASKS

1. **Vector logo** (AI / SVG / EPS) for SEEM GROUP and any SEEM PRIME logotype.
2. **Licensed brand fonts** if they exist — Sora / IBM Plex are documented substitutions.
3. **Approved Arabic copy** and confirmation of the Arabic typeface.
4. **An icon library**, if one is in use — Lucide is a flagged substitution.
5. **Real product surfaces** (website URL, app, Figma, or repo) — the UI kits become true
   recreations the moment any of these exist.
6. **Confirmation of ember's role.** Orange is treated here as a hairline accent only, per your
   instruction; the deep green is primary throughout.
