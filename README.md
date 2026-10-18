# SEEM PRIME — website

The SEEM PRIME corporate site, as a Next.js App Router project. Five statically prerendered
pages, bilingual Arabic/English with full RTL, and a light/dark theme — all client-side, no
backend. The business model and the roadmap used to be pages of their own; they are chapters of
the strategy page now, and `/model` and `/roadmap` redirect to them (`next.config.ts`).

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
    about|strategy|ecosystem|contact/page.tsx
  components/
    pages/                 the page bodies (client components)
    home/                  the home page's seven sections, each owning its own motion
    about/                 the about page's five chapters and its contents line, likewise
    strategy/              the strategy page's six chapters in three acts, and their contents line
    ecosystem/             the ecosystem page's platforms-and-model stage, and its contents line
    contact/               the contact page's opening line: email, phone, the office
    PageShell.tsx          direction, body type scale, progress hairline, reveal pass, spotlight
    PageMasthead.tsx       the full-height opening shot every inner page starts on
    Plate.tsx              a full-bleed photograph behind a section: blur-up, scrim, drift
    ImageSlot.tsx          a framed photograph, or a captioned empty state
    SiteHeader / SiteFooter / Mark
  lib/
    site.tsx               language + theme context, persisted to localStorage
    css.ts                 CSS declaration string → React style object
    hooks.ts               scroll driver, reveal, counters, in-page glide, rails
    motion.ts              plate parallax and the pointer glow, shared by every page
    media.ts               the photography: files, cuts, blur-ups, alt text, and where each is framed
    typography.ts          the shared style builders (opening title, h2, labels, captions)
    routes.ts              URLs, the chapter addresses, brand plates, contact details
    content/               Arabic and English copy, one module per page
public/ds/                 fonts and imagery
scripts/focus-states.py    regenerates the strategy page's two depth-of-field photographs
scripts/plain-zero.py      takes the dot out of IBM Plex Mono's zero in the site's two cuts
scripts/soft-plate.py      regenerated the out-of-focus plate JAZ Chocolate used to open on (no longer used)
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

A line of one sentence ends without a full stop, in both languages, at the client's request:
the headlines, the statement, the leads, each platform's, pillar's and value's line, the vision
and the mission. A paragraph of two sentences keeps its stops, and so do the form's messages
and the copyright line. The SEEM promise line runs its three beats without the ".." that used to
part them.

The zero is plain. IBM Plex Mono, which sets the phone number, the index numbers and the years,
draws a dot inside its zero; `scripts/plain-zero.py` takes it out of the two cuts in
`public/ds/fonts/`. New Plex Mono files bring the dot back until the script is run again. The
other faces already draw a plain zero.

## Photography

The site is carried by two sets of photographs. The first was all taken at the same golden hour:
a heritage coast, a processing plant, a logistics hub, a residence, a contactless payment, an
evening destination, code before the Riyadh skyline, a city seen from a lit terrace and a resort
above a Red Sea bay, plus two frames cut from an entertainment contact sheet. One light across
every sector is what lets a refinery, a warehouse and a cinema read as one landscape rather than
a stock collage. The second is the client's own sector set, supplied in September 2026 and
replaced in October by a more realistic edition: a picture per sector for the home page's reel,
the statement's first capsule, and pictures of the platforms themselves: JAZ Chocolate's plant
and a box of its chocolate, Qanif's lit sign, and the catering tables. The platforms' logos come
with it. Two September pictures stand in for sectors the October edition has nothing for: a card
at a counter for e-commerce, and a cargo hub for supply. On October 18 the client sent a set for
the hero's day, a few pictures per sector, and one of each became an hour of it: a family on a
villa's terrace for the whole day, a man asleep before dawn, a courier riding into the sunrise
through Riyadh, a farmer picking coffee, chocolate poured into moulds, a yacht over the Red Sea's
reefs, trucks at the docks at dusk, an online shop's studio at sunset and a banquet hall laid for
the evening. Its cocoa pods became the reel's agriculture window, which had stood empty. The
brand's deep green is the ground they all sit on (sections, scrims, the dark between frames),
never a tint laid over the pictures.

The home page shows no photograph twice. The hero, the statement's capsules, the reel, the SEEM
stages and the closing window each have pictures of their own, and the platform index shows the
platforms' logos.

`src/lib/media.ts` is the one place the photographs are named. Each carries its cuts, a 20px WebP
blur-up inlined as a data URI, a focal point, and alt text in both languages. Call sites
reference a **frame** (a photograph plus how to crop it), never a path:

```ts
type Framed = { photo: Photo; focus?: string; zoom?: number; origin?: string }
```

The maps at the foot of the module decide what appears where: `heroFrames`, `sectorFrames`,
`verbFrames`, `seemFrames`, `platformFrames`, `ecosystemPlatforms`, `pagePlates`, `homeClosing`,
`aboutStrands`, `aboutWhole`, `aboutCreed`, `strategyFocus`, `loopFrames`, `roadFrames`.
Re-shooting a subject is a one-line change. The logos live beside the photographs as `marks`.
Qanif's card is set on white from page 1 of its logo file, قنيف over QANIF, the lockup that
carries no line about a farm. SEEM Supply's is set on white from the logo the client sent with
its October notes: an S wound round a globe above a truck and its load, over «SEEM SUPPLY» and
«سيم للتوريدات». The client sent it as a stand-in, because SEEM is meant to name the group
rather than any one venture, so the platform may yet get a brand of its own.

Two photographs have derived states. `techFar` and `techNear` are the desk before the Riyadh
skyline with the focus pulled: the horizon sharp and the laptop soft, then the reverse. They are
generated from the original by `scripts/focus-states.py`, which traces the near plane by hand
and blurs each plane with only its own colours, so the strategy page can rack focus between them
as an opacity crossfade rather than a live blur.

**Cuts.** Both sets ship three: the full file (1402–1774px), a 1280px middle cut and an 880px
card cut, as WebP at quality 80 / 78 / 76. `srcSet()` hands all three to any frame the browser
can size, which covers the plates, the hero, and the reel, stage and closing windows, so a phone
fetches the card cut and a desktop the full one. The entertainment tiles exist at card size only
(~585px). The courier came as a 1717px file, so its full cut is that size. The box of chocolate
is a portrait (1200 × 1607) and ships at full and card size, so it only goes where a frame can
hold a portrait: JAZ's detail. The three pictures in the statement's capsules also ship a 400px
cut (`xs`), because a capsule is a word wide. The logos ship as single 720 × 900 cards, the shape
of the index's thumbnails on a wide screen. The payments frame is cropped to leave out the
emblem that opens the source image.

Two components consume them. **`Plate`** is the full-bleed photograph behind a masthead or a
band of copy: blur-up, photograph, brand scrim, film grain. **`ImageSlot`** is a
framed picture inside a card, window or tile, and still renders its captioned empty state when
no frame is passed. The contact page's portrait slots are deliberately still waiting for real
people.

Image weight, measured against a production build (whole page = after scrolling to the foot):

| Page | 1440×900 first screen | 1440×900 whole page | 390×844 @2x whole page |
|---|---|---|---|
| home | 375KB | 1282KB | 709KB |
| about | 396KB | 663KB | 309KB |
| strategy | 328KB | 1188KB | 522KB |
| ecosystem | 173KB | 1805KB | 709KB |
| contact | 202KB | 202KB | 64KB |

The home page's first screen on desktop is the hero's opening frame plus the next scene, which
is fetched 1.4s in so the first cut never waits. Scenes after that load one ahead, never all at
once. The whole page no longer repeats a photograph, so every section below the hero fetches
pictures of its own rather than cuts the browser already has; it is lighter than it was (1350KB
and 807KB) since the road to 2030, and the city behind it, left the page in October 2026. Food's
window left the reel later that month, and then the technology and financial services windows
did too, for e-commerce, supply and an agriculture window still without a picture; the desktop
page is 9KB heavier for that (it was 1018KB), and a phone's 5KB (713KB). The platform index's
six logos now come with the page on a desktop as well, where they used to wait for the pointer,
which adds 104KB there (it was 1027KB); a phone always fetched them. When the hero became a day
in October 2026, it opened on the family on a villa's terrace, a busier picture than the
logistics hub before it, and the reel's agriculture window took a picture of its own (60KB), so
the desktop page is heavier (it was 283KB on the first screen and 1131KB in all); a phone's is
9KB lighter (718KB), because the opening scenes' card cuts are. The ecosystem page
carries six platforms, and JAZ Chocolate opens on the plant's hall, the heaviest
picture in the set (351KB at full size); it was 1477KB and 645KB with five. SEEM Supply opening
on the cargo hub, where SEEM Catering opened on the buffet, took 5KB and 15KB off it (1810KB and
724KB). The about page's is its opening shot plus the four strand windows peeking under it; the
city they assemble into is only mounted once the reader reaches that chapter. The strategy page's
is its opening shot and the two focus states under it. It carries the business model and the
roadmap as well as the strategy, so it weighs more than any one of the three pages it replaced
(together they were ~1.56MB), but the seal's four pictures and the roadmap's four are only
mounted once their chapter is a screen away. The ecosystem page's first screen is its opening
shot alone. Its stage clips the platforms still to rise, which would keep the browser's lazy
loading waiting until each card is already moving, so each platform's pictures are mounted as
the card before it starts to rise, and load straight away; the model they become is drawn, not
photographed.

## Motion

Scroll work runs through `useScrollDriver`, which mirrors the original throttle: per-frame work
(progress bar, parallax) on every event, heavier passes at ~16fps with a trailing call.

State-driven visuals (the open SEEM stage, the stage the strategy page's seal is on, the year
its counter shows) are plain React renders. Continuous per-frame values are written straight to the DOM through
refs, because re-rendering a page this size sixty times a second to move a background plate
would be absurd.

### The home page, as one journey

Each section in `src/components/home/` owns its motion:

- **`HeroCinema`**: on the first visit in a tab, the page opens on the SEEM square on deep
  green. The photograph fills the square from inside and the square widens to the frame. The
  bootstrap script in `site.tsx` sets `html[data-intro]` before first paint, so this runs in CSS
  from the first frame. The hero then tells **a day in the ecosystem**, in nine scenes: the whole
  day first («منظومة تُرافق يومك», with 24 in the corner), then a sector at the hour it meets
  someone's day, from real estate at dawn, 5:00, through logistics, agriculture, industry,
  tourism, supply and e-commerce, to catering in the evening, 20:30 (`DAY` in
  `content/home.ts`). Each scene is a whole frame: its photograph, its hour drawn in outline in
  the far corner, and its copy in the order the client set it, the hour and the sector, the main
  line, the line under it, what the sector does, whose scene it is and its door. A sector whose
  platform is still being built (supply, e-commerce) says so beside its name and opens onto the
  strategy. Entertainment has no hour in the client's day; Qanif comes in at 9:30, through its
  coffee and cocoa. The scenes cut on a **diagonal blade** (the slant of the cut ends of the mark's
  letter bars) with a light hairline and an ember line riding its edge, and because the copy
  belongs to the frame, the blade carries it: the new lines glide in behind the edge while the
  old ones are pushed on ahead of it. The blade travels right to left in Arabic and left to right
  in English. The index along the foot lays the day out hour by hour and jumps to any scene; a
  pause button stops the clock, and on a touch screen a swipe in the reading direction goes
  forward. A scene holds for nine seconds, long enough to read; the clock only runs while the
  hero is on screen and the tab is visible, and it holds while the pointer rests on the copy or
  the keyboard is inside the hero. Scrolling away closes the frame into an inset panel. The
  page's `h1` is the hero's name for assistive technology and search, «سيم برايم: منظومة تُرافق
  يومك»; on screen each scene's main line is its own heading. The tagline that used to title the
  hero («نُمكّن الأعمال ونُسرّع النمو…») lives on in the footer.
- **`Statement`**: the positioning line, lit word by word at the pace of the scroll. Each verb
  opens a capsule onto the work it names. The capsules hold their width from the start and open
  on a clip, so the line never re-wraps.
- **`SectorReel`**: on a wide screen the section pins and vertical scroll becomes a lateral
  journey past nine windows of one size, 3:2, strung on one line through their middles like
  the frames of a film. The ember line draws itself to the middle of the screen, the counter
  names the frame under it, and each picture slides against the travel. A sector with a
  platform names it under its line: Qanif under entertainment and agriculture, SEEM Supply
  under catering and supply. Everywhere else it is a swipe rail of the same frames.
- **`PlatformIndex`**: the six platforms as an index, each line led by the platform's logo, so
  the logos stand one under another down the reading edge with the names set large beside them.
  The logos are always in sight and never move, on every screen. A window of the logo used to
  float beside a fine pointer instead, until the client asked in October 2026 for the logos to
  show on a laptop the way they do on a phone. From 1000px each platform takes one line, and a
  fine pointer leans its name in and dims the other lines' copy, never their logos. SEEM Supply's
  name is written in Arabic on the Arabic page, so platform names are set by `markType`
  (`typography.ts`), which gives an Arabic mark the Arabic face and no tracking. Qanif's was
  too, until the client asked for it in Latin, «Qanif», on both pages.
- **`SeemStages`**: four standing panels, one photograph each. Scroll (or a click) widens the
  open stage into a window and its question arrives. The panels spell the name, so they stand
  S, E, E, M from left to right in Arabic as well as English, and the scroll walks them left to
  right; each panel keeps the page's direction for its own copy.
- **`ClosingAperture`**: the square again, as a window that opens as it arrives, beside the
  page's closing line. It follows the stages on the same green, so a hairline marks the seam.

The road to 2030 and the 2030 figures had a section of their own between the stages and the
close (`Horizon2030`). It was removed in October 2026 at the client's request; the strategy page
still carries the roadmap and the targets.

Food («الأغذية») was a sector of its own, third of nine, until the client removed it later in
October 2026 as a duplicate of catering and food. The same day the client's next notes changed
the list again: e-commerce («التجارة الإلكترونية») took technology's place, financial services
went, catering and food became catering («التموين») and supply («التوريد»), two sectors of
their own, and agriculture («الزراعة») joined them, for the coffee and cocoa grown at Qanif.
The sectors are nine on every page now.

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

### The strategy page, in three acts

The strategy, the business model and the roadmap were three pages; they are one now, told in
the three beats of the framework's own promise line — from strategy, to execution, to
sustainable impact. The opening shot carries a contents line that groups the six chapters under
those beats (`ActIndex`), and each chapter in `src/components/strategy/` owns its motion:

- **`FocusPull`** (vision and mission): one shot of a desk before the Riyadh skyline, with the
  focus pulled between the two statements. The vision holds the horizon sharp while the laptop
  and its holograms go soft; the scroll racks the focus forward until the work in hand is sharp
  and the city blurs, and the mission takes its place. Each statement sits on the plane that is
  out of focus, and a lens's focus scale tracks the pull from ∞ to arm's length.
- **`Colonnade`** (pillars and sectors): the five pillars built in the order a building goes
  up — the ground line, the nine sectors laid along it as the plinth, each pillar rising in
  turn, and the beam across their heads, lettered SEEM PRIME. Inside each pillar its sentence
  is drawn (`PillarFigure`): layers until the platform stands alone, a share that grows with its
  sector, two sides meeting halfway, reviews pulling to the centre, one line through every
  platform. Every part of a drawing reads its own window of one progress value, so it plays
  back as well as forward.
- **`ValueLoop`** (the business model): the model as the company's seal — a square frame
  lettered with develop, operate, invest and monetize along its sides like a stamp. The section
  pins and an ember line runs the border side by side, each side a stage with its picture in the
  window; when it closes, the yield returns to the ecosystem and a spark keeps running the
  border.
- **`ValueSum`** (the value proposition): the four capabilities and the outcome they add up to,
  set as a ledger column — a plus on each line, a double rule drawn under them, and the total on
  the brand's green below it.
- **`RoadTo2030`** (the roadmap): the year as a mechanical counter. The scroll clicks its wheels
  over, 2025 to 2029, each year holding with its phase named beneath it and its picture behind it;
  at the last turn the tens wheel goes over with the units, and 2030 lands in the light of a low
  sun. A ruler along the foot keeps the phases in proportion to their years.
- **`Targets2030`** (the targets, and the close): each 2030 target is a small counter whose
  wheels spin a full turn and settle on the figure as it arrives, the higher places last. Below
  them sits the page's one call to action.

### The ecosystem page, platform by platform

The ecosystem page presents the six platforms (JAZ Chocolate in industry, eat.plus in logistics,
ZL.TOURS in tourism, HOMERA in real estate, Qanif in entertainment and agriculture, and SEEM
Supply in catering and supply; a platform in two sectors numbers both on its card), and then
what they make together. The opening shot carries a contents line that lists
all seven stops, the platforms first (`EcosystemIndex`), and both chapters play out on one stage
in `src/components/ecosystem/`:

- **`PlatformStack`** (the platforms, and one ecosystem): one pinned stage. A title card lists
  the platforms the way a building lists its floors, top floor first. Then each platform rises
  over the one before it as a full screen of its own (its picture, its name set large, its line,
  and a framed detail of what it leads to) while the one beneath settles back, and a rail along
  the foot keeps count. Once the last is down, the camera pulls back and the deck turns out to
  have been a building: each card lies back into a floor of a model through one `matrix()`,
  drawn the way an architect draws a model, in an oblique projection, on a podium lettered SEEM
  PRIME. Four cores (capital, technology, operations, partnerships) rise through every floor,
  and once they stand, light keeps moving along them, up two and down two. Last, the camera
  looks up at two floors drawn but not yet built: forty platforms by 2030. The model around the
  floors is SVG drawn from the same geometry (`StackModel.tsx`), one layer per height, stacked
  between the cards so that every floor hides what is behind it. Each platform has an address of
  its own (`/ecosystem#homera`), and the home page's platform index links straight to it. The
  stage is built from the platform count: a platform more is a stretch of scroll more (the pin
  sets its height from `--travel`), a card, a floor and a rail stop. The one exception is the
  light on the cores, whose timing in `globals.css` is tuned for six floors.

The page ends on the model. It used to come out into the light for a call to action beside six
plates for partners' logos (`EcosystemClose`); the client did not want it, and it was removed in
October 2026. The footer now follows the model on the same green, so as the camera looks up and
the podium drops below the frame, the stage's foot fades into the green instead of cutting it off.

Pinning and horizontal travel only switch on at 1000px and up, with room in height, and with
motion welcome. Otherwise the sections are ordinary flowing layout.

The header takes the tone of whatever it passes over: any section marked `data-tone="dark"`
under its middle line turns it to dark glass, so a cinematic section is never capped by a white
bar. Every inner page's masthead is cut to the home hero's proportions: a screen tall, the bar
clear over the photograph until the page moves, the title at the home page's scale and measure
(`heroTitle`, which both share), and a contents line along the foot where the home page runs
its index. The contact page's line holds its email, phone and office. The frame widens to the
edges as the page arrives. The about, strategy and ecosystem pages close on moments of their own
(see above); the photographic closing band they once shared is gone.

Photographic plates drift on their own shared loop (`usePlateParallax` in `src/lib/motion.ts`):
one passive listener and one rAF pass for every plate on the page, each measured against its
own section so a masthead 4000px down opens at the same offset as the hero does at the top.
The photograph inside also breathes on a 38s Ken Burns cycle, so a still image never reads as a
flat backdrop.

Two reveal variants sit alongside the base `[data-sc]`:

- `data-sc="mask"` — a frame that *unveils*. The frame opens on a `clip-path` while the picture
  inside settles out of its own crop.
- `data-sc="rise"` — a line of display type arriving up, in, and out of focus into focus. The
  hero's headline lines stagger through it.

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
the reel becomes the swipe rail, and the SEEM stages stack with every stage open. On the about
page the four strands sit flat as a square above the city they make,
the mark is drawn in full, every value is lit, the lines to the five groups are drawn and still,
and the rings hold without their ripple. On the strategy page the two focus states stand one
above the other, each over its statement; the pillars are built and drawn; the seal is traced,
with the four stages in turn beside it and no spark; the phases are pictures in pairs, each with
its years over it; and the targets show their figures without spinning. On the ecosystem page the
platforms are full-bleed frames in turn, and the model stands at rest beneath them, drawn in
full with a key beside it and no light moving along its cores.

A page opened on a chapter's address (`/strategy#roadmap`, or `/roadmap` through its redirect)
is taken back to the chapter once a stored English preference has re-rendered the page and the
fonts have settled, because both move every section below the fold. `PageShell` does this unless
the reader has already started to move.

## Known gaps

- **The contact form and newsletter signup do not send anything.** Both validate and show a
  confirmation locally. Wire them to a route handler or form service — see the `TODO` in
  `src/components/pages/ContactPage.tsx` and `src/components/SiteFooter.tsx`.
- **One kind of image slot is still empty.** The contact page's testimonial portraits are empty
  deliberately (a building is not a stand-in for a person), so they keep their captioned
  placeholder. To fill one, add the file to `public/ds/img/`, name it in `src/lib/media.ts`, and
  pass the frame to `ImageSlot`. (The reel's agriculture window took the cocoa pods from the
  client's October 18 set, and the ecosystem page's partner logo plates went with its closing
  section.)
- **Most of the photography is generated or stock, not shot on site.** The golden-hour set is
  art-directed for the brand, but nothing in it is a SEEM PRIME building, plant or property,
  and the people in it are not staff. The client's October 2026 edition is more realistic: the
  enrobing line in the statement and Qanif's sign are plainly photographs, but the rest reads as
  stock or generated (the box of chocolate is embossed with letters that spell nothing, and
  Qanif's terrace, kept for its detail, is from the earlier generated set). The October 18 set
  for the hero's day reads as generated too; its aerial of a chocolate plant is not used, because
  the sign on its roof reads «JAZAN CHOCOLATE» rather than the platform's name. The edition's second
  industry picture, the plant from outside with workers and a pallet, is not used: it has alpine
  mountains behind it, and every slot it would suit already has a picture. Swapping in real
  assets is a change to `src/lib/media.ts` alone — except the desk before the Riyadh skyline,
  whose two focus states have to be regenerated with `scripts/focus-states.py` (and its near
  plane re-traced) if it is replaced.
- **Some home page copy is draft.** The reel headline, the six new sector lines (e-commerce's,
  catering's, supply's and agriculture's among them), the reel's closing link, and Qanif's and
  SEEM Supply's descriptions and lines are new strings, marked `// draft` in
  `src/lib/content/home.ts`, in both languages. The hero's day is the client's own Arabic copy,
  with a handful of spelling slips corrected (listed beside it); its English is a drafted
  translation, and so are the hero's names for its first scene and for a sector still being
  built. Everything else on the page is the approved framework copy.
- **The hero and the platform pages name the catering venture differently.** The client's copy
  for the hero calls it SEEM Catering, and gives supply no platform of its own, so the hero marks
  supply as in development. The platform index and the ecosystem page still carry the stand-in
  from the client's October notes: one platform, SEEM Supply («سيم للتوريدات»), across catering
  and supply. The hero's SEEM Catering opens onto SEEM Supply's address (`/ecosystem#seem-supply`)
  until the client settles the name.
- **Some about page copy is draft.** The English values are the framework's own full
  statements; their Arabic is a drafted translation. The chapter names, the name chapter's
  headline and its three notes, the values headline and "One ecosystem" are new. All are marked
  `// draft` in `src/lib/content/about.ts`. The mark's rationale (unity, strength, stability)
  and its 4.2 cm stamp size come from the logo concept document.
- **Some strategy page copy is draft.** The vision, mission, pillars, sectors, model, phases and
  targets are the approved copy of the three pages the strategy page replaced. The value
  proposition's English statements are the framework's own; their Arabic is a drafted
  translation. The page lead, the chapter names that are new ("Pillars & sectors", "2030
  targets"), the pillars headline and lead, the focus scale's two ends, the value headline, the
  return line and the stage and phase labels are new. All are marked `// draft` in
  `src/lib/content/strategy.ts`.
- **Some ecosystem page copy is draft.** The first four platforms' names, sectors and lines, the
  four strands and the 2030 target are the approved framework copy, with two changes to JAZ
  Chocolate: its sector is now industry, at the client's request, and its name is spelled as its
  logo spells it, where the framework has "JAZ Choklat". The contents line's group names (its
  "One ecosystem" is the about page's), the platforms headline and lead, the sector labels, the
  six detail captions, Qanif's and SEEM Supply's descriptions and
  lines, the model's headline, the cores line, the target's second line and the model's
  description are new. All are marked `// draft` in `src/lib/content/ecosystem.ts`. Qanif is
  written without «مزرعة» (farm) everywhere, because it is becoming a resort; its address is
  `#qanif` now, not `#qanif-farm`. SEEM Supply took SEEM Catering's place in October 2026: its
  logo covers both supply and catering, so the one platform stands in both sectors, and it is
  written «سيم للتوريدات» on the Arabic page, as the logo writes it. Its address is
  `#seem-supply`.
- **One of the statement's capsules borrows from the entertainment sheet.** The client's set has
  one picture for that section (the enrobing line, for "develop"); "operate" opens onto a
  waitress carrying two plates from the catering set, and "invest" still opens onto a card-size
  frame from the entertainment sheet, the lit promenade. A picture of the client's own would
  suit it better; it is a one-line change to `verbFrames`, plus a 400px cut.
- **Some superseded photographs are no longer used.** Nothing names these, and they are still in
  `public/ds/img/`: `about-manufacturing*.webp` (~200KB), the packing line that once stood for
  JAZ Chocolate, lit by day, with the national emblem on every box; `ent-dining-soft*.webp`
  (~100KB), the blurred table JAZ Chocolate opened on before it had pictures of its own, with
  `scripts/soft-plate.py` that made it; and the concert, coaster, cinema and esports tiles
  (`ent-*-sm.webp`, ~130KB), which closed the reel before every window took one size; the
  client's September set (~2.4MB), which its October edition replaced: `chocolate-factory`,
  `chocolate-vat`, `chocolate-line`, `jaz-box`, `ai-desk-riyadh`, `lagoon-traveller` and
  `corniche-terrace` (each `*.webp`, with its cuts); October's roller coaster
  (`coaster-dusk*.webp`, ~190KB), which the hero's old entertainment scene gave up for
  September's family at Qanif; the technology and financial services windows (`ai-touch-sm.webp` and
  `finance-desk*.webp`, ~210KB) and the buffet SEEM Catering's card opened on
  (`catering-buffet*.webp`, ~350KB), which left with the sectors and the platform; SEEM
  Catering's lettered card (`logo-seem-catering.webp`); and the three pictures the hero lost when
  it became a day (~980KB): the chocolate on its conveyor (`chocolate-conveyor*.webp`), the family
  at Qanif (`qanif-family-day*.webp`) and the banquet table from SEEM Catering's profile
  (`catering-banquet*.webp`). Delete them if they are not wanted back. (The Red Sea resort superseded before them is back in service as HOMERA's detail and the
  home page's closing window.)
- **The five original brand plates are no longer used.** `plates` in `src/lib/routes.ts` still
  names them and the PNGs are still in `public/ds/img/` (~5MB). Delete both if they are not
  wanted back.
- **The strategy page's roadmap loads its four pictures together** (~680KB on a wide screen,
  full-bleed cuts), once the chapter is a screen away, because they crossfade in place. Mounting
  only the current and the next phase would spread that over the chapter, though a reader who
  scrolls through still fetches all four.

## `legacy-dc/`

The original Design Combo sources this project was converted from — the `.dc.html` templates,
their runtime (`support.js`), and the `<image-slot>` element. Kept for reference only; nothing
in the app reads them, and their relative asset paths no longer resolve now that the brand
assets live under `public/ds/`. `_ds/` holds the upstream design-system tokens and
documentation, also reference-only.
