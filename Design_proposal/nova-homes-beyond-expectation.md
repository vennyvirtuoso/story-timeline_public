  # MASTER PROMPT — Nova, Private Residences
  ### Plain HTML, CSS and JavaScript. No WordPress, no page builder, no framework, no build step.

  ## ▶ HOW TO USE THIS PROMPT

  **Paste this whole document into Claude. Nothing to attach.** It contains the complete source of a
  two-page site, and every image loads from a URL already written into the code.

  **INSTRUCTION TO CLAUDE — BUILD IT, DO NOT ASK.** Every decision is already made in this document. Do not stop to ask the user questions, do not offer options, and do not ask for confirmation before starting. Write the files, zip them, hand over the archive, then report what you built.

  1. Create a folder named `nova` and write out every file in the appendix below **exactly as written** —
    do not reformat, rename, shorten, reorder or "improve" anything. The only exception is the delivery-only PAGE SPEED
    step below, which must not change how the page looks or moves.
  2. **PAGE SPEED — target 90+ in Lighthouse, mobile AND desktop.** Apply these to the files in the folder. They are delivery changes only: the page must still look and move px-to-px like the original.
     - **Image sizes and lazy loading.** Every `<img>` gets `width` and `height` equal to its file's pixel size. Images outside the first screen get `loading="lazy" decoding="async"`; the one largest image in the first screen gets `loading="eager" fetchpriority="high"`. Do not add `<link rel="preload" as="image">`.
     - **Scripts.** Add `defer` to every external `<script src>` (not to `type="module"`, which is already deferred; never `async` for a library another script uses). Any inline `<script>` that calls those libraries runs inside `document.addEventListener('DOMContentLoaded', …)` so the order still holds. A heavy library used only by a section below the first screen (slider, map, 3D further down) is loaded by a small `IntersectionObserver` (`rootMargin: '300px'`) that appends its `<script>` when that section approaches the screen.
     - **CSS and fonts.** Keep the one stylesheet as a normal `<link rel="stylesheet">` in `<head>` — it is the only render-blocking file allowed. Preload the 1–2 font files the first screen's headline and body text use (`<link rel="preload" as="font" type="font/woff2" crossorigin>`), keep `font-display: swap`, and drop font families or weights the page never uses. Google Fonts links get `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin) and `display=swap`.
     - **First screen visible at load.** Nothing in the first screen starts at `opacity: 0` (CSS or a GSAP `from`) — use `0.01` so the browser can measure it; there is no plugin doing this for you here.
     - **Pinned scroll sections.** If a section in or right after the first screen is pinned with ScrollTrigger (`pin: true` with pin spacing), the next section jumps down when the pin is created — a large layout shift. Reserve that scroll distance in CSS from the first paint (a class on `<html>` that adds the same space) and remove the class in the same script run that creates the pins, then `ScrollTrigger.refresh()`.
     - **Measure.** Serve the folder (`python3 -m http.server 8000` from inside it) and, if Google Chrome is available, run `npx lighthouse http://localhost:8000 --only-categories=performance` and again with `--preset=desktop`, twice each. Report Performance, FCP, LCP, TBT, CLS and Speed Index. If a run is under 90, fix the cause named under "Avoid long main-thread tasks" / "Layout shift culprits". If Lighthouse cannot run here, say so and tell the user to test the deployed URL at https://pagespeed.web.dev/. When it is deployed, any static host with compression (gzip/brotli) and long cache headers for `assets/` (Netlify, Vercel, Cloudflare Pages) keeps the score.
     **For Nova this is already settled: follow the `PAGE SPEED BUILD` section (before the ASSET MANIFEST) exactly instead of re-deriving it — four prepared WebP files on demo.uichemy.com and nine exact edits. The one image preload it adds (the hero sky plate, the LCP image) is the tested exception to the Image sizes bullet. Every pin uses `pinSpacing:false`, so no reserve class is needed.**
  3. **Zip that folder and give the user the archive.** The four files sit at the top level of the zip:

    ```
    nova/
      index.html
      residence.html
      style.css
      script.js
    ```

    ```bash
    zip -r nova.zip nova -x '*.DS_Store'
    ```

    Then hand over `nova.zip` as a file the user can download, not as text in the chat.
  4. Before handing it over, serve the folder and confirm it runs:

    ```bash
    cd nova && python3 -m http.server 8000     # then open http://localhost:8000
    ```

    Check that the hero appears, the images load, and scrolling drives the animations. Open
    `http://localhost:8000/residence.html?id=lantern` and confirm it fills with Lantern House.

  Serve it rather than double-clicking the file: the second page reads a `?id=` query string, which needs
  a real URL. An internet connection is required, because the images and the three motion libraries load
  from the web.

  Do not rebuild the design from the description below. The description is there so a person can
  understand and edit the code. The appendix is the deliverable.

  ---

  ## ▶ WHAT YOU GET

  A landing page for a private collection of architecturally significant homes, and an inner page that
  renders any of five houses from a query string.

  **Four files, delivered as `nova.zip`. One HTML per page, one stylesheet, one script.**

  | File | What it is |
  |---|---|
  | `index.html` | the landing page, ten sections |
  | `residence.html` | one template for all five houses, filled from `?id=` |
  | `style.css` | the entire design, ~48 KB, no preprocessor |
  | `script.js` | all the motion and interaction for **both** pages |

  **One script, not two.** Both pages need the same machinery — smooth scroller, custom cursor, overlay
  menu, height watcher, newsletter — so a second file would have meant a second copy of all of it. Instead
  `residence.html` carries `class="is-residence"` on its `<body>`, the script reads that one flag, and only
  that page's block runs. Each page still loads exactly one script.

  **Three libraries, from a CDN, already referenced in both HTML files:** GSAP, ScrollTrigger and Lenis.
  No npm install, no bundler, no framework. Remove the Lenis tag and the page still works; it just loses
  smooth scrolling.

  **Landing page sections in order:** a layered hero, a studio statement, a pinned five-frame film
  sequence, a masked gallery, a horizontal residence slider, a client carousel, an alternating residence
  index, a parallax depth scene, a three-step viewing process, and a closing enquiry, plus header and
  footer.

  **Inner page:** `residence.html?id=pacific` · `arena` · `lantern` · `solano` · `dune`. Anything else, or
  no id at all, falls back to Pacific House. Everything on that page — name, location, lede, statement,
  body copy, the four frames, the spec table, and the cards for the other four houses — is written by the
  page from one `HOUSES` object in `residence-data.js` (PAGE SPEED step R). Edit that object and the page follows.

  ---

  ## ▶ WHERE THE IMAGES COME FROM

  All 53 images are served from the WordPress media library at
  `https://demo.uichemy.com/wp-content/uploads/2026/09/`, each named with a `nova__images-` prefix. The
  URLs are already written into the markup and the script, so there is nothing to download, upload or wire
  up — the page renders as soon as the files exist.

  These are the **same URLs the WordPress build of this page uses**. One library, one set of files, one
  address, whether the page is built as an Elementor page on that site or as the plain static site here.
  An image only ever has to be replaced in one place.

  There is no local `images/` folder and the page does not expect one.

  ---

  ## ▶ HOW THE MOTION IS PUT TOGETHER

  Worth understanding before editing, because nearly every visual effect is scroll-driven.

  - **`script.js` is one IIFE** that branches on `IS_RESIDENCE`, then runs numbered blocks: the scroller,
    the hero intro, the custom cursor, the nav and overlay menu, the nav's light/dark state, hero parallax,
    global reveals, the gallery and its lightbox, the horizontal journey, the residence index, the reviews
    carousel, the process columns, the pinned film sequence, the depth scene, and a scroll-speed skew.
  - **Reveals run both ways.** Most use `toggleActions: 'play none none reverse'`, so scrolling back up
    plays them in reverse rather than leaving them finished.
  - **Pinned sections own their scroll distance** through `pin` with `pinSpacing: false`, so the document
    height is authored by the markup rather than grown by script.
  - **The custom cursor reads what is under the pointer**, re-evaluated from the pointer position and the
    scroll offset every frame. It deliberately does not rely on `pointerenter`/`pointerleave`: with smooth
    scrolling the page moves under a stationary cursor and the browser does not reliably re-fire those
    events, which leaves the label stuck on over empty space or stuck off over a link.
  - **`prefers-reduced-motion` is honoured throughout.** Every animated block checks it and falls back to
    the finished state, so the page is fully readable with motion off.
  - **Plates that bleed past the page padding** use negative inline margins that cancel the section's own
    padding (`margin: … calc(var(--pad) * -1) …`). Change `--pad` and they follow.

  **To retune the motion**, the numbers are inline — durations, eases, stagger, parallax speeds. There is
  no config layer and no control panel; it is plain GSAP.

  ---

  ## ▶ DESIGN TOKENS

  Everything is driven from custom properties at the top of `style.css`:

  - **Colour:** `--white` `--mist` `--stone` `--char` `--ink` `--gray` `--bronze`, plus two rule colours.
  - **Type:** `--serif` is Instrument Serif for display moments, `--sans` is Inter Tight for everything
    else. Both load from Google Fonts in each HTML head.
  - **Rhythm:** `--pad` is the page gutter and the thing the full-bleed plates cancel. `--plate-r` is the
    corner radius on every card and plate; set it to one value and the whole page changes shape.
  - **Motion:** `--ease` and `--ease-out` are the two curves used throughout.

  ---

  ## ▶ WHAT THIS PROMPT DELIBERATELY DOES NOT CONTAIN

  - No WordPress, no Elementor, no page builder, and none of the wrapper classes or compatibility CSS a
    builder needs. The WordPress build is a separate prompt.
  - No framework, no TypeScript, no bundler, no `package.json`.
  - No backend. The newsletter form validates the address and replies in place; it posts nowhere. Wire it
    to your own endpoint in the footer handler.
  - No CMS. The five houses live in the `HOUSES` object inside `residence-data.js`.

  ---


  ## PAGE SPEED BUILD — Nova Homes (from the tested WordPress build; overrides the matching appendix parts)

  The same changes measured on demo.uichemy.com (WordPress build, 7 Oct 2026):

  | Google PageSpeed Insights | Before (live demo, 7 Oct 2026) | After (tested build) | Live demo after the change (3 runs) |
  |---|---|---|---|
  | Mobile score | 67 | 84–95 (median ≈ 90) | 84–90 (median 86) |
  | Desktop score | 87 | 74–96 (median ≈ 92) | 65–96 (median 93; the 65 was one 600 ms main-thread spike) |
  | Largest Contentful Paint (mobile) | 7.3 s | — | 3.2–3.8 s |
  | Total Blocking Time (mobile / desktop) | 160 / 140 ms | — | 50–140 / 50–600 ms |
  | Cumulative Layout Shift | 0 | 0 | 0 |

  Same markup, copy, intro, film, gallery, journey and motion. Checked on the demo, live original against the changed copy: section positions and heights identical at 1440 × 900 and 412 × 823 (92 ScrollTriggers on both); element boxes, opacity and transforms identical at 7 desktop and 5 mobile scroll positions; menu open / Esc / links, gallery viewer open / close / Esc, voices dots, newsletter and pointer parallax behave the same; screenshots differ by about 1/255 (recompression); no console errors; the Elementor editor shows the same page. What limits mobile below 90 on some runs is the hero's own intro (the sky plate is the LCP element and the intro reveals it through a mask) — it is kept as it is. The changes, nothing visible:
  1. **Lighter first screen.** The sky plate is re-encoded (same 1521 × 1034, 338 → 231 KB) and fetched first; the house cut-out gets a 1040 px copy for screens up to 1200 px wide; the two header logos are 240 px copies of the 760 px files they were shown at 93 px from (27 + 31 → 4 + 6 KB); the film's first plate (425 KB) and the hidden menu thumbnail (304 KB) no longer load at start.
  2. **The intro waits for the right files.** It used to wait for the full-size hero files even when the browser shows the smaller copy; it now waits for exactly what is on screen (same 900 ms cap).
  3. **No jQuery** (WordPress only). UiChemy keeps jQuery (render-blocking) when page code contains `$(`/`$.` or a `<script src>` to a file that is not a known library: the script's own `$`/`$$` helpers are renamed and it is started by a small inline loader.

  This plain version needs changes 1 and 2 only (it loads no jQuery). Measure it after deploying (see the PAGE SPEED step, Measure).

  ### A · New image files (already on demo.uichemy.com, used by URL like every image here)

  | New file (already in the demo media library) | width × height | KB | Alt text |
  |---|---|---|---|
  | `https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__hero-scene.webp` | 1521 × 1034 | 338 → 231 | — (decorative, alt="") |
  | `https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__hero-cut-1040.webp` | 1040 × 707 | 216 → 113 (≤1200 px screens) | A sculptural residence lit from within at dusk |
  | `https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__logo.webp` | 240 × 74 | 27 → 4 | Nova |
  | `https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__logo-ink.webp` | 240 × 74 | 31 → 6 | — (decorative, aria-hidden) |

  ### B · 9 exact edits (`index.html` N1–N7, `script.js` J2–J3; `residence.html` stays as it is)

  **N1 · `index.html`** — Header logo (champagne, shown over the hero). Find (occurs exactly once):

  ```html
  <img class="nav-logo nav-logo-champagne" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo.webp" alt="Nova" width="760" height="235">
  ```

  replace with:

  ```html
  <img class="nav-logo nav-logo-champagne" src="https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__logo.webp" alt="Nova" width="760" height="235">
  ```

  **N2 · `index.html`** — Header logo (ink, shown once the nav turns light). Find (occurs exactly once):

  ```html
  <img class="nav-logo nav-logo-ink" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo-ink.webp" alt="" aria-hidden="true" width="760" height="235">
  ```

  replace with:

  ```html
  <img class="nav-logo nav-logo-ink" src="https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__logo-ink.webp" alt="" aria-hidden="true" width="760" height="235">
  ```

  **N3 · `index.html`** — Hero sky plate (the LCP image). Find (occurs exactly once):

  ```html
  <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-hero-scene.webp" alt="">
  ```

  replace with:

  ```html
  <img src="https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__hero-scene.webp" alt="" loading="eager" fetchpriority="high">
  ```

  **N4 · `index.html`** — Hero house cut-out: a 1040 px copy for screens up to 1200 px wide. Find (occurs exactly once):

  ```html
  <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-hero-cut.webp" alt="A sculptural residence lit from within at dusk">
  ```

  replace with:

  ```html
  <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-hero-cut.webp" srcset="https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__hero-cut-1040.webp 1040w, https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-hero-cut.webp 1521w" sizes="(max-width: 1200px) 125vw, 1521px" alt="A sculptural residence lit from within at dusk" loading="eager">
  ```

  **N5 · `index.html`** — Film: the first plate waits like the other four (loaded a screen before the pinned film). Find (occurs exactly once):

  ```html
  <img class="fl-shot is-on" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-hero.webp"
  ```

  replace with:

  ```html
  <img class="fl-shot is-on" decoding="async" data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-hero.webp"
  ```

  **N6 · `index.html`** — Overlay menu thumbnail: lazy (it is hidden until the menu opens). Find (occurs exactly once):

  ```html
  <img id="menuThumb" src=
  ```

  replace with:

  ```html
  <img id="menuThumb" loading="lazy" decoding="async" src=
  ```

  **N7 · `index.html`** — Head: fetch the hero sky plate first. Find (occurs exactly once):

  ```html
  <link rel="stylesheet" href="style.css">
  ```

  replace with:

  ```html
  <link rel="preload" as="image" href="https://demo.uichemy.com/wp-content/uploads/2026/10/nova-fast__hero-scene.webp" fetchpriority="high">
  <link rel="stylesheet" href="style.css">
  ```

  **J2 · `script.js`** — the intro waits for the hero files actually shown. Find (occurs exactly once):

  ```js
  function startIntro() {
    Promise.race([
      preload(critical),
  ```

  replace with:

  ```js
  function startIntro() {
    // page-speed: wait for the files the browser really shows (the chosen srcset size), not the
    // hidden lawn layer; pages without a hero keep the fixed list.
    const shown = $$('#heroStage img').filter(im => im.getClientRects().length).map(im => im.currentSrc || im.src);
    Promise.race([
      preload(shown.length ? shown : critical),
  ```

  **J3 · `script.js`** — reduced motion: show the first film plate at once. Find (occurs exactly once):

  ```js
    if (shots.length && !REDUCED) {
      // The follow-on plates
  ```

  replace with:

  ```js
    // page-speed: the first plate also waits in data-src; without motion it is shown at once.
    if (REDUCED && shots[0] && shots[0].dataset.src) { shots[0].src = shots[0].dataset.src; delete shots[0].dataset.src; }
    if (shots.length && !REDUCED) {
      // The follow-on plates
  ```

  ### R · Residence page as on the live demo (house data, nav)

  The live demo's residence page (`demo.uichemy.com/residence/?id=pacific` … `dune`) is filled from `?id=`: house number, name (also the large outlined SVG name), place, lede, the hero plate, the three-line statement, the three body paragraphs, the four frames, the spec table and the cards for the other four houses. The appendix `script.js` has no such driver, so built as written the page shows empty placeholders (at 1440 × 900 it is 5,366 px tall against the live 6,212; at 390 × 844, 4,087 against 6,139), and its nav never appears: on this page the script stops at the landing hero's code (`$('.hero')` is missing) before its intro would show the nav. This step reproduces the live result: the house records and the fill are the live demo's own (`residence-data.js` below, which also drops the nav in once the page has loaded), and two small `script.js` edits keep the residence nav in its stuck state and make it read light over the residence hero, as on the live demo. The rest of `script.js` still stops where it did, so `residence-data.js` also carries the live residence page's own motion, with the live values: the plate settles out of a push-in while the intro copy, the outlined name and its letter spacing ease in; plate and name drift on scroll; the frames wipe in from the top with a slow zoom and a slight parallax; the statement lines and body paragraphs reveal; the spec rows and the cards for the other houses rise in (front end only; with reduced motion the page shows its finished state). Expect one console `TypeError` on the residence page from `script.js` (the landing-hero code reading the missing `.hero`): that is where it stops, as it always has; leave it.

  1. **`residence-data.js`** (new file; it runs on the residence page only and does nothing on the landing page):

  ```js
  /* NOVA residence data: the five house records and the fill from ?id=, taken from the live demo's residence
     runtime (demo.uichemy.com/residence/), unchanged except that the "more residences" cards link to this same page.
     Runs once, before script.js, so the template is full before the page script measures and reveals it.
     An unknown or missing ?id= shows Pacific House, as on the live demo. In the Elementor editor, which re-renders
     widgets from their stored (empty) template, it fills again whenever the name goes blank. */
  (function () {
    'use strict';
    var q1 = function (s, r) { return (r || document).querySelector(s); };
  const HOUSES = {
    pacific: {
      no: '01', name: 'Pacific House', place: 'Malibu, California',
      lede: 'Two storeys of white render under deep overhangs, set back behind a garden that you walk through before the door is even visible.',
      statement: ['A house that spends the morning', 'in shade and the evening', 'with every door open.'],
      bodyA: 'The plot is wider than it is deep, so the house was pushed to the back of it and the whole front given over to planting. You arrive along a path through banana and palm, and the door only appears at the last turn — which makes the entrance feel like the end of something rather than the start.',
      bodyB: 'The overhangs are the whole idea. They run close to three metres past the glass on the south and west, which keeps direct sun off the ground floor from March to October and lets the sliding walls stay open right through the afternoon.',
      bodyC: 'Inside, one room runs the length of the plan: sitting, dining and kitchen in a single volume, with a timber stair floating against a pale green wall at the far end. The upper floor holds bedrooms only, and is deliberately smaller than the floor beneath it.',
      plate: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-hero.webp',
      card: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-tall.webp',
      // the front, the long room, the entry under the overhang, then the
      // whole site from above
      shots: ['https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-front.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-living.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-entry.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-above.webp'],
      file: [['Price', '$18,500,000'], ['Architect', 'Estudio Ferrán'], ['Completed', '2023'],
             ['Interior', '9,400 sq ft'], ['Land', '2.4 acres'], ['Bedrooms', 'Six'], ['Bathrooms', 'Eight']],
      next: 'arena',
    },
    arena: {
      no: '02', name: 'Casa Arena', place: 'Tulum, Mexico',
      lede: 'A dark house at the top of a flight of steps, hidden until the last turn by the garden it was planned around.',
      statement: ['A house you reach on foot,', 'through planting, and never', 'see all of at once.'],
      bodyA: 'The walls are rendered almost black, which is less severe than it sounds. Against the grey-green of the planting the house steps back and the garden comes forward, so from the road you see a wall, some olive trees and a run of steps, and nothing else.',
      bodyB: 'The approach was set out before the plan was. The boulders were placed first, then the path threaded between them, then the house pushed back far enough that the walk from the gate takes a little over a minute.',
      bodyC: 'The door is one leaf of oiled timber, two and a half metres tall, and the only warm material anywhere on the elevation. Everything past it opens south, where the roof carries far enough out to hold the terrace in shade all day.',
      plate: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-hero.webp',
      card: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-entrance.webp',
      // the approach, the door itself, the path from above, then the planting
      shots: ['https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-approach.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-door.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-above.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-garden.webp'],
      file: [['Price', '$9,400,000'], ['Architect', 'Taller Mar'], ['Completed', '2021'],
             ['Interior', '7,100 sq ft'], ['Land', '1.1 acres'], ['Bedrooms', 'Five'], ['Bathrooms', 'Six']],
      next: 'lantern',
    },
    lantern: {
      no: '03', name: 'Lantern House', place: 'Dubai, UAE',
      lede: 'A row of white vaults facing a pool, with the sea showing in the gap between the palms.',
      statement: ['Four vaults, one pool,', 'and a plan that does not', 'bother with corridors.'],
      bodyA: 'The house is a single row of vaulted rooms, each opening straight onto the terrace. There is no internal circulation at all — you move between rooms along the pool, under the shade the vaults throw for most of the day.',
      bodyB: 'Every surface is the same lime plaster, carried over the curve of each vault without a break, so the rooms read as carved rather than built. At night they are lit from below the spring line and the house does become a lantern.',
      bodyC: 'The pool sits one step down from the terrace and runs the full length of the elevation. It is the only thing between the rooms and the water, and from inside the two read as a single surface.',
      plate: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-hero.webp',
      card: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-arch.webp',
      // the suite through the arch, the arcade sofa, then the pool wide:
      // one villa shot three ways, matching the plate and the card
      shots: ['https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-suite.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-arcade.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-alcove.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-pool.webp'],
      file: [['Price', '$21,200,000'], ['Architect', 'Office Sadek'], ['Completed', '2024'],
             ['Interior', '12,600 sq ft'], ['Land', '0.9 acres'], ['Bedrooms', 'Seven'], ['Bathrooms', 'Nine']],
      next: 'solano',
    },
    solano: {
      no: '04', name: 'Solano', place: 'Ibiza, Spain',
      lede: 'Not one house but several, stepping down a headland above the bay the way the old village does.',
      statement: ['A house built to look', 'as though it had been added to', 'for two hundred years.'],
      bodyA: 'The brief was for somewhere fifteen people could stay without anyone feeling watched, and the answer was to stop designing a single house. What is here is five linked volumes at different levels, each with its own terrace, joined by outdoor stairs instead of corridors.',
      bodyB: 'Everything is lime-washed by hand and washed again each spring, which is why the white has depth to it rather than sitting flat. The shutters and the joinery carry the one colour the island allows itself.',
      bodyC: 'The main room faces the water through one wide opening, beams overhead, the floor running out to the terrace at the same level. From the top terrace you can watch the boats come in, and not much else.',
      plate: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-hero.webp',
      card: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-village.webp',
      // the long room, then two passes through the village, then the headland
      // from the air — the same place the plate and the card show
      shots: ['https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-living.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-terrace.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-steps.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-aerial.webp'],
      file: [['Price', '$12,800,000'], ['Architect', 'Bauzà i Roig'], ['Completed', '2022'],
             ['Interior', '8,200 sq ft'], ['Land', '3.0 acres'], ['Bedrooms', 'Five'], ['Bathrooms', 'Seven']],
      next: 'dune',
    },
    dune: {
      no: '05', name: 'Dune House', place: 'Joshua Tree, California',
      lede: 'A white house in the high desert, lit from within, with an olive tree older than the building set against its west wall.',
      statement: ['A plain white house,', 'in a landscape that punishes', 'anything complicated.'],
      bodyA: 'The plan is two bars set at right angles around a gravel court, and the court does all the work: it shelters the house from the wind that comes down the valley every afternoon, and gives every room a second aspect that is not the desert.',
      bodyB: 'Walls are white render on block, thick enough to hold the night cold until noon. There are no eaves at all — shade is handled by setting the glass deep into the wall, so the openings read as cut rather than added.',
      bodyC: 'Planting is limited to what lives without irrigation once it is established: olive, agave, prickly pear, and the boulders that were already on the site. The ground is decomposed granite, raked once and then left alone.',
      plate: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-hero.webp',
      card: 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-courtyard.webp',
      // the approach at dusk, the long room, the glazed wall off the court,
      // then the whole plan from above
      shots: ['https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-court.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-kitchen.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-glass.webp', 'https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-plan.webp'],
      file: [['Price', '$26,000,000'], ['Architect', 'Marrow Studio'], ['Completed', '2025'],
             ['Interior', '14,300 sq ft'], ['Land', '18 acres'], ['Bedrooms', 'Eight'], ['Bathrooms', 'Ten']],
      next: 'pacific',
    },
  };

    var id  = new URLSearchParams(location.search).get('id');
    var key = HOUSES[id] ? id : 'pacific';
    var house = HOUSES[key];
    function fillTemplate() {
      /* In the Elementor canvas this runs BEFORE the widgets are rendered, and
         again after every repaint. Bail out quietly until the template is really
         there, and never let one missing node abort the whole runtime. */
      if (!q1('#rsNameSvg') || !q1('#rsMore') || !q1('#rsTable')) return false;
      try {
      document.title = 'Nova — ' + house.name;
      q1('#rsNo').textContent = house.no;
      q1('#rsPlace').textContent = house.place;
      q1('#rsLede').textContent = house.lede;
      q1('#rsNameText').textContent = house.name;
      q1('#rsNameSvg').textContent = house.name.toUpperCase();
      q1('#rsPlate').src = house.plate;
      q1('#rsPlate').alt = house.name + ' — ' + house.place;

      q1('#rsStatement').innerHTML = house.statement
        .map(function (l) { return '<span class="ln"><i>' + l + '</i></span>'; }).join('');

      q1('#rsBodyA').textContent = house.bodyA;
      q1('#rsBodyB').textContent = house.bodyB;
      q1('#rsBodyC').textContent = house.bodyC;

      ['#rsShotA', '#rsShotB', '#rsShotC', '#rsShotD'].forEach(function (sel, i) {
        var im = q1(sel);
        im.src = house.shots[i];
        im.alt = house.name + ' — frame ' + (i + 1);
      });

      q1('#rsTable').innerHTML = house.file
        .map(function (r) { return '<div class="rs-row"><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');

      // every OTHER residence as a card, pointing at this same page
      q1('#rsMore').innerHTML = Object.keys(HOUSES).filter(function (k) { return k !== key; }).map(function (k) {
        var h = HOUSES[k];
        return '<a class="rs-card" href="' + location.pathname + '?id=' + k + '" data-cursor="discover">'
          + '<span class="rs-card-shot"><img loading="lazy" decoding="async" src="' + h.card
          + '" alt="' + h.name + '"></span>'
          + '<span class="rs-card-veil" aria-hidden="true"></span>'
          + '<span class="rs-card-copy">'
          +   '<span class="rs-card-name">' + h.name + '</span>'
          +   '<span class="rs-card-place">' + h.place + '</span>'
          + '</span></a>';
      }).join('');

      return true;
      } catch (e) { return false; }
    }
    fillTemplate();
    var b = document.body, inEditor = false;
    try { inEditor = b.classList.contains('elementor-editor-active') || b.classList.contains('elementor-editor-preview') ||
      (window.parent !== window && !!window.parent.document.getElementById('elementor-editor-wrapper')); } catch (e) {}
    /* The landing-page script stops at the landing hero on this page, before its intro would show the nav; drop the
       nav in once everything has loaded, as the live residence page does. */
    if (!inEditor) addEventListener('load', function () {
      var nav = q1('#nav'), hero = q1('.rs-hero');
      if (!nav) return;
      if (hero) { var r = hero.getBoundingClientRect(); nav.classList.toggle('is-dark', r.top <= 64 && r.bottom > 64); }
      if (window.gsap) gsap.fromTo(nav, { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' });
    });
    if (inEditor) {
      var needsFill = function () { var n = q1('#rsNameSvg'); return !n || !n.textContent.trim(); };
      var pending = null;
      new MutationObserver(function () { clearTimeout(pending); pending = setTimeout(function () { if (needsFill()) fillTemplate(); }, 120); })
        .observe(document.body, { childList: true, subtree: true });
      var tries = 0, iv = setInterval(function () { if (needsFill()) fillTemplate(); if (++tries > 120) clearInterval(iv); }, 500);
    }
    /* The live residence page's own motion (its section scripts and line reveals), front end only: the plate
       settles out of a push-in while the intro copy, the outlined name and its letter spacing ease in; plate and
       name drift on scroll; the frames wipe in from the top with a slow zoom and a slight parallax; the spec rows
       and the cards for the other houses rise in. Values are the live demo's. */
    if (!inEditor && q1('.rs-hero') && !matchMedia('(prefers-reduced-motion: reduce)').matches) (function motion() {
      if (!window.gsap || !window.ScrollTrigger) return setTimeout(motion, 50);
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: 'power3.out' });
      var qa = function (sel, r) { return Array.prototype.slice.call((r || document).querySelectorAll(sel)); };
      qa('.ln > i').forEach(function (i) {
        gsap.fromTo(i, { yPercent: 116 }, { yPercent: 0, duration: 1.25, ease: 'expo.out',
          scrollTrigger: { trigger: i.parentElement, start: 'top 88%' } });
      });
      qa('.line').forEach(function (el) {
        gsap.fromTo(el, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.15,
          scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
      gsap.timeline()
        .fromTo('.rs-plate img', { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, .1)
        .fromTo('.rs-intro > *', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, stagger: .12 }, .5)
        .fromTo('.rs-name', { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.6, ease: 'expo.out' }, .55)
        .fromTo('.rs-name text', { attr: { textLength: 780 } }, { attr: { textLength: 1000 }, duration: 2, ease: 'expo.out' }, .55);
      gsap.to('.rs-plate img', { yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.rs-hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.rs-name', { y: '-18vh', ease: 'none',
        scrollTrigger: { trigger: '.rs-hero', start: 'top top', end: 'bottom top', scrub: true } });
      ['.rs-split-shot', '.rs-grid figure'].forEach(function (sel) {
        qa(sel).forEach(function (fig, k) {
          var img = fig.querySelector('img');
          if (!img) return;
          gsap.fromTo(fig, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.out',
            scrollTrigger: { trigger: fig, start: 'top 88%' } });
          gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.8, ease: 'expo.out',
            scrollTrigger: { trigger: fig, start: 'top 88%' } });
          gsap.fromTo(img, { yPercent: -4 - (k % 3) * 2 }, { yPercent: 4 + (k % 3) * 2, ease: 'none',
            scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
      gsap.fromTo('.rs-table .rs-row', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, stagger: .07,
        scrollTrigger: { trigger: '.rs-table', start: 'top 86%' } });
      gsap.fromTo('.rs-card', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: .09,
        scrollTrigger: { trigger: '.rs-more-grid', start: 'top 88%' } });
    })();
  })();
  ```

  2. **Three edits** (`script.js` R1–R2, `residence.html` R3):

  **R1 · `script.js`** — the nav reads light over the residence hero. Find (occurs exactly once):

  ```js
  const darkGround = $$('.hero, .film, .depth');
  ```

  replace with:

  ```js
  const darkGround = $$('.hero, .film, .depth, .rs-hero');
  ```

  **R2 · `script.js`** — the residence nav stays in its stuck state at the top of the page. Find (occurs exactly once):

  ```js
      nav.classList.toggle('is-stuck', y > 80);
  ```

  replace with:

  ```js
      nav.classList.toggle('is-stuck', y > 80 || document.body.classList.contains('is-residence'));
  ```

  **R3 · `residence.html`** — load the house data before the page script. Find (occurs exactly once):

  ```html
  <script src="script.js"></script>
  ```

  replace with:

  ```html
  <script src="residence-data.js"></script>
  <script src="script.js"></script>
  ```

  Checked against the live demo on 8 Oct 2026 (Pacific House): every residence element computes the same styles and sits at the same position and height at 1440 × 900 (page 6,212 px) and 390 × 844 (6,139 px), nav included; only the four frame photos sit 13–47 px apart inside their frames (the live parallax, which this step now reproduces).

  ### C · Check

  Serve the folder. `residence.html?id=pacific` shows Pacific House with its nav. The intro plays exactly as before, the film's first plate is there when the film pins, the menu thumbnail appears when the menu opens, no console errors. Then measure as in the PAGE SPEED step.

  ---

  # APPENDIX · VERBATIM SOURCE

  The complete source of every file. **Write them out exactly** — do not change a value, a comment, a class name, or the order of a declaration. Recreate this file layout:

  ```
  index.html
  residence.html
  style.css
  script.js
  ```

  ## `index.html`

  ```html
  <!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Nova — Private Residences</title>
  <meta name="description" content="A private collection of architecturally significant residences on five coastlines.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  </head>
  <body>

  <!-- ─────────────────────────────  chrome  ──────────────────────────── -->
  <div class="cursor" id="cursor" aria-hidden="true">
    <svg class="cursor-ring" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30"></circle></svg>
    <span class="cursor-dot"></span>
    <span class="cursor-label"></span>
  </div>

  <header class="nav" id="nav">
    <nav class="nav-links">
      <a class="nav-pill" href="#top" data-cursor="discover">Home</a>
      <a class="nav-pill" href="#journey" data-cursor="discover">Residences</a>
      <a class="nav-pill" href="#gallery" data-cursor="discover">Collection</a>
      <a class="nav-pill" href="#voices" data-cursor="discover">Clients</a>
      <a class="nav-pill" href="#about" data-cursor="discover">Studio</a>
    </nav>

    <a class="nav-mark" href="#top" data-cursor="top" aria-label="Nova — home">
      <img class="nav-logo nav-logo-champagne" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo.webp" alt="Nova" width="760" height="235">
      <img class="nav-logo nav-logo-ink" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo-ink.webp" alt="" aria-hidden="true" width="760" height="235">
    </a>

    <div class="nav-end">
      <button class="nav-burger" id="burger" aria-label="Open menu" aria-expanded="false">
        <i></i><i></i>
      </button>
    </div>
  </header>

  <div class="menu" id="menu" aria-hidden="true">
    <div class="menu-list">
      <a href="#journey" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-pacific.webp"><span class="menu-no">01</span><span class="menu-word">Residences</span></a>
      <a href="#voices" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-solano.webp"><span class="menu-no">02</span><span class="menu-word">Clients</span></a>
      <a href="#about" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-lantern.webp"><span class="menu-no">03</span><span class="menu-word">Journal</span></a>
      <a href="#about" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-dune.webp"><span class="menu-no">04</span><span class="menu-word">Studio</span></a>
      <a href="#getintouch" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-arena.webp"><span class="menu-no">05</span><span class="menu-word">Enquiry</span></a>
    </div>
    <div class="menu-view"><img id="menuThumb" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-pacific.webp" alt=""></div>
    <div class="menu-foot">
      <span>Los Angeles</span><span>Mexico City</span><span>Dubai</span><span>Ibiza</span><span>Singapore</span>
    </div>
  </div>

  <main id="top">

  <!-- ──────────────────────────────  hero  ───────────────────────────────
      An inset plate carrying six planes: sky, glow, the wordmark, the house
      cut out of its own photograph, the lawn, and the interface. The mark
      sits between the sky and the house, so the roofline crosses the letters.
      The wordmark is SVG with textLength — it spans the plate exactly, which
      a vw font-size never does.
      ─────────────────────────────────────────────────────────────────── -->
  <section class="hero" id="hero" data-chapter="01">
    <div class="hero-stage" id="heroStage">
      <div class="hero-layer hero-scene"><img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-hero-scene.webp" alt=""></div>
      <span class="hero-glow"></span>

      <h1 class="hero-mark" id="heroMark">
        <span class="sr-only">Nova — homes beyond expectation</span>
        <svg viewBox="0 0 1000 280" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <text x="0" y="252" text-anchor="start" textLength="640" lengthAdjust="spacing">NOVA</text>
        </svg>
      </h1>

      <div class="hero-layer hero-house">
        <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-hero-cut.webp" alt="A sculptural residence lit from within at dusk">
      </div>
      <div class="hero-layer hero-grass"><img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-hero-grass.webp" alt=""></div>
      <span class="hero-shade"></span>
    </div>

    <div class="hero-frame">
      <p class="hn-statement reveal-up">Architecturally significant homes,<br>placed privately with the people<br>who will live in them well.</p>

      <button class="btn hn-pill" id="explore" data-explore>Consultation</button>
    </div>
  </section>

  <!-- ──────────────────────────────  about  ──────────────────────────── -->
  <section class="about" id="about" data-chapter="02">
    <p class="eyebrow ab-tag line">About</p>

    <h2 class="display ab-say" data-fill>
      We place houses that were built with intention
      <span class="ab-tail">with the people who intend to keep them that way.</span>
    </h2>

    <dl class="ab-rows">
      <div class="ab-row line">
        <dt>A private list</dt>
        <dd>Most of what we hold is never advertised. Introductions are made one
            at a time, to someone the owner has already agreed to meet.</dd>
      </div>
      <div class="ab-row line">
        <dt>Read by builders</dt>
        <dd>Every house is surveyed by people who put them up — structure, light,
            orientation, and what the next twenty years will cost to run.</dd>
      </div>
      <div class="ab-row line">
        <dt>Held, not turned over</dt>
        <dd>We would rather wait two years for the right owner than close in a
            month with the wrong one. It is what keeps the collection worth joining.</dd>
      </div>
    </dl>
  </section>

  <!-- ──────────────────  the film — scroll-driven WebGL  ─────────────── -->
  <section class="film" id="film" data-chapter="03">
    <div class="fl-stage">
      <img class="fl-shot is-on" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-hero.webp" alt="Pacific House behind its garden">
      <img class="fl-shot" decoding="async" data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-hero.webp" alt="Casa Arena at the top of its steps">
      <img class="fl-shot" decoding="async" data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-hero.webp" alt="The vaults at Lantern House">
      <img class="fl-shot" decoding="async" data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-hero.webp" alt="Solano stepping down the headland">
      <img class="fl-shot" decoding="async" data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-hero.webp" alt="Dune House lit from within at dusk">
      <span class="fl-shade"></span>

      <div class="fl-head">
        <p class="eyebrow">The Film</p>
      </div>

      <div class="fl-caps">
        <p class="fl-cap is-on"><span class="k">01 — Malibu</span><span class="v">Pacific House</span></p>
        <p class="fl-cap"><span class="k">02 — Tulum</span><span class="v">Casa Arena</span></p>
        <p class="fl-cap"><span class="k">03 — Dubai</span><span class="v">Lantern House</span></p>
        <p class="fl-cap"><span class="k">04 — Ibiza</span><span class="v">Solano</span></p>
        <p class="fl-cap"><span class="k">05 — Joshua Tree</span><span class="v">Dune House</span></p>
      </div>

      <div class="fl-bar"><i id="filmBar"></i></div>
    </div>
  </section>

  <!-- ─────────────────────────────  gallery  ─────────────────────────── -->
  <section class="gallery" id="gallery" data-chapter="04">
    <header class="sec-head">
      <p class="eyebrow line">The Collection</p>
      <p class="sec-note line">One evening from each house. Move through them the way you would move
        through a property: slowly, and towards the water.</p>
    </header>

    <div class="gal">
      <figure class="gal-item g1" data-view data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-solano.webp" data-name="The village" data-place="Solano — Ibiza">
        <span class="gal-mask"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-solano.webp" alt="The village stepping down to the bay"></span>
        <figcaption><span>01</span><span>The village</span></figcaption>
      </figure>
      <figure class="gal-item g2" data-view data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-pacific.webp" data-name="The garden room" data-place="Pacific House — Malibu">
        <span class="gal-mask"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-pacific.webp" alt="The long room opening to the garden"></span>
        <figcaption><span>02</span><span>The garden room</span></figcaption>
      </figure>
      <figure class="gal-item g3" data-view data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-dune.webp" data-name="The court" data-place="Dune House — Joshua Tree">
        <span class="gal-mask"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-dune.webp" alt="A gravel court held between two white bars"></span>
        <figcaption><span>03</span><span>The court</span></figcaption>
      </figure>
      <figure class="gal-item g4" data-view data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-arena.webp" data-name="The approach" data-place="Casa Arena — Tulum">
        <span class="gal-mask"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-arena.webp" alt="The path to the door seen from above"></span>
        <figcaption><span>04</span><span>The approach</span></figcaption>
      </figure>
      <figure class="gal-item g5" data-view data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-lantern.webp" data-name="Under the vaults" data-place="Lantern House — Dubai">
        <span class="gal-mask"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-lantern.webp" alt="A long seat under the vaults beside the pool"></span>
        <figcaption><span>05</span><span>Under the vaults</span></figcaption>
      </figure>
      <figure class="gal-item g6" data-view data-src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-arch.webp" data-name="Through the arch" data-place="Lantern House — Dubai">
        <span class="gal-mask"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-gal-arch.webp" alt="A room looking out through its arch to the water"></span>
        <figcaption><span>06</span><span>Through the arch</span></figcaption>
      </figure>
    </div>
  </section>

  <!-- ────────────────────  horizontal property journey  ──────────────── -->
  <section class="journey" id="journey" data-chapter="05">
    <div class="jr-pin">
      <div class="jr-head">
        <h2 class="display jr-title">Villas &amp; Residences</h2>
        <a class="btn" href="#index" data-cursor="discover">View all</a>
      </div>
      <div class="jr-track" id="jrTrack">
        <a class="jr-card" href="residence.html?id=pacific" data-cursor="discover">
          <span class="jr-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-pacific-tall.webp" alt="Pacific House"></span>
          <span class="jr-veil" aria-hidden="true"></span>
          <div class="jr-copy">
            <h3 class="jr-name">Pacific House</h3>
            <ul class="jr-meta">
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5V2h3.5M14 10.5V14h-3.5M2.4 13.6 13.6 2.4"/></svg>9,400 sq ft</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 12V5M1.5 8.5h13V12M4.5 8.5V6.5h4.5v2"/></svg>6 bedrooms</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14.5s4.6-4.6 4.6-7.6A4.6 4.6 0 0 0 3.4 6.9c0 3 4.6 7.6 4.6 7.6Z"/><circle cx="8" cy="6.8" r="1.5"/></svg>Malibu</li>
            </ul>
          </div>
        </a>
        <a class="jr-card" href="residence.html?id=arena" data-cursor="discover">
          <span class="jr-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-arena-entrance.webp" alt="Casa Arena"></span>
          <span class="jr-veil" aria-hidden="true"></span>
          <div class="jr-copy">
            <h3 class="jr-name">Casa Arena</h3>
            <ul class="jr-meta">
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5V2h3.5M14 10.5V14h-3.5M2.4 13.6 13.6 2.4"/></svg>7,100 sq ft</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 12V5M1.5 8.5h13V12M4.5 8.5V6.5h4.5v2"/></svg>5 bedrooms</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14.5s4.6-4.6 4.6-7.6A4.6 4.6 0 0 0 3.4 6.9c0 3 4.6 7.6 4.6 7.6Z"/><circle cx="8" cy="6.8" r="1.5"/></svg>Tulum</li>
            </ul>
          </div>
        </a>
        <a class="jr-card" href="residence.html?id=lantern" data-cursor="discover">
          <span class="jr-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-lantern-arch.webp" alt="Lantern House"></span>
          <span class="jr-veil" aria-hidden="true"></span>
          <div class="jr-copy">
            <h3 class="jr-name">Lantern House</h3>
            <ul class="jr-meta">
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5V2h3.5M14 10.5V14h-3.5M2.4 13.6 13.6 2.4"/></svg>12,600 sq ft</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 12V5M1.5 8.5h13V12M4.5 8.5V6.5h4.5v2"/></svg>7 bedrooms</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14.5s4.6-4.6 4.6-7.6A4.6 4.6 0 0 0 3.4 6.9c0 3 4.6 7.6 4.6 7.6Z"/><circle cx="8" cy="6.8" r="1.5"/></svg>Dubai</li>
            </ul>
          </div>
        </a>
        <a class="jr-card" href="residence.html?id=solano" data-cursor="discover">
          <span class="jr-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-solano-village.webp" alt="Solano"></span>
          <span class="jr-veil" aria-hidden="true"></span>
          <div class="jr-copy">
            <h3 class="jr-name">Solano</h3>
            <ul class="jr-meta">
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5V2h3.5M14 10.5V14h-3.5M2.4 13.6 13.6 2.4"/></svg>8,200 sq ft</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 12V5M1.5 8.5h13V12M4.5 8.5V6.5h4.5v2"/></svg>5 bedrooms</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14.5s4.6-4.6 4.6-7.6A4.6 4.6 0 0 0 3.4 6.9c0 3 4.6 7.6 4.6 7.6Z"/><circle cx="8" cy="6.8" r="1.5"/></svg>Ibiza</li>
            </ul>
          </div>
        </a>
        <a class="jr-card" href="residence.html?id=dune" data-cursor="discover">
          <span class="jr-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dune-courtyard.webp" alt="Dune House"></span>
          <span class="jr-veil" aria-hidden="true"></span>
          <div class="jr-copy">
            <h3 class="jr-name">Dune House</h3>
            <ul class="jr-meta">
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5V2h3.5M14 10.5V14h-3.5M2.4 13.6 13.6 2.4"/></svg>14,300 sq ft</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 12V5M1.5 8.5h13V12M4.5 8.5V6.5h4.5v2"/></svg>8 bedrooms</li>
              <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14.5s4.6-4.6 4.6-7.6A4.6 4.6 0 0 0 3.4 6.9c0 3 4.6 7.6 4.6 7.6Z"/><circle cx="8" cy="6.8" r="1.5"/></svg>Joshua Tree</li>
            </ul>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- ───────────  type / cut-out composition — words behind glass  ────── -->
  <!-- ───────────────────────  private clients  ───────────────────────── -->
  <section class="say" id="voices">
    <header class="sy-head">
      <p class="eyebrow line">Private Clients</p>
      <h2 class="display sy-title line">What owners say.</h2>
    </header>

    <div class="sy-rail" id="syRow">
      <blockquote class="sy-card sy-text">
        <h3 class="sy-h">It never asks to be admired</h3>
        <p class="sy-quote">The right house simply makes the rest of your life feel better arranged. Ours does it quietly, every morning, without once announcing itself.</p>
        <footer class="sy-by">
          <span class="sy-who">A collector</span>
          <span class="sy-place"><svg viewBox="0 0 10 12" aria-hidden="true"><path d="M5 11.2C7.4 8.4 8.6 6.3 8.6 4.6A3.6 3.6 0 0 0 1.4 4.6C1.4 6.3 2.6 8.4 5 11.2Z"/><circle cx="5" cy="4.6" r="1.3"/></svg>Côte d’Azur</span>
        </footer>
      </blockquote>

      <figure class="sy-card sy-photo">
        <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-owner-malibu.webp" alt="Portrait of a Nova owner photographed outdoors under a clear sky" width="900" height="1286" loading="lazy">
        <figcaption class="sy-by">
          <span class="sy-who">A family of four</span>
          <span class="sy-place"><svg viewBox="0 0 10 12" aria-hidden="true"><path d="M5 11.2C7.4 8.4 8.6 6.3 8.6 4.6A3.6 3.6 0 0 0 1.4 4.6C1.4 6.3 2.6 8.4 5 11.2Z"/><circle cx="5" cy="4.6" r="1.3"/></svg>Malibu</span>
        </figcaption>
      </figure>

      <blockquote class="sy-card sy-text">
        <h3 class="sy-h">They talked us out of two</h3>
        <p class="sy-quote">That is when we understood what the list was actually for. It is a filter rather than a catalogue, and it works in your favour.</p>
        <footer class="sy-by">
          <span class="sy-who">An architect</span>
          <span class="sy-place"><svg viewBox="0 0 10 12" aria-hidden="true"><path d="M5 11.2C7.4 8.4 8.6 6.3 8.6 4.6A3.6 3.6 0 0 0 1.4 4.6C1.4 6.3 2.6 8.4 5 11.2Z"/><circle cx="5" cy="4.6" r="1.3"/></svg>Lisbon</span>
        </footer>
      </blockquote>

      <figure class="sy-card sy-photo">
        <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-owner-dubai.webp" alt="Portrait of a returning Nova client in a dark studio setting" width="800" height="1200" loading="lazy">
        <figcaption class="sy-by">
          <span class="sy-who">A returning client</span>
          <span class="sy-place"><svg viewBox="0 0 10 12" aria-hidden="true"><path d="M5 11.2C7.4 8.4 8.6 6.3 8.6 4.6A3.6 3.6 0 0 0 1.4 4.6C1.4 6.3 2.6 8.4 5 11.2Z"/><circle cx="5" cy="4.6" r="1.3"/></svg>Dubai</span>
        </figcaption>
      </figure>

      <blockquote class="sy-card sy-text">
        <h3 class="sy-h">Eleven months, then keys</h3>
        <p class="sy-quote">Nothing at all for most of a year, then one afternoon and a set of keys. I would wait the eleven months again for this house.</p>
        <footer class="sy-by">
          <span class="sy-who">A second home</span>
          <span class="sy-place"><svg viewBox="0 0 10 12" aria-hidden="true"><path d="M5 11.2C7.4 8.4 8.6 6.3 8.6 4.6A3.6 3.6 0 0 0 1.4 4.6C1.4 6.3 2.6 8.4 5 11.2Z"/><circle cx="5" cy="4.6" r="1.3"/></svg>Porto</span>
        </footer>
      </blockquote>

      <figure class="sy-card sy-photo">
        <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-owner-ibiza.webp" alt="Portrait of a first-time Nova buyer in warm afternoon light" width="800" height="1200" loading="lazy">
        <figcaption class="sy-by">
          <span class="sy-who">A first purchase</span>
          <span class="sy-place"><svg viewBox="0 0 10 12" aria-hidden="true"><path d="M5 11.2C7.4 8.4 8.6 6.3 8.6 4.6A3.6 3.6 0 0 0 1.4 4.6C1.4 6.3 2.6 8.4 5 11.2Z"/><circle cx="5" cy="4.6" r="1.3"/></svg>Ibiza</span>
        </figcaption>
      </figure>
    </div>

    <div class="sy-dots" id="syDots"></div>
  </section>

  <!-- ────────────────────────  selected residences  ──────────────────── -->
  <section class="index" id="index" data-chapter="06">
    <header class="sec-head">
      <p class="eyebrow line">Selected Residences</p>
      <p class="sec-note line">Five of one hundred and twenty-seven. The rest are shown privately.</p>
    </header>

    <!-- Each residence takes a full band: the plate runs off its own side of
        the page, the file sits in the margin opposite, and the sides alternate
        so the eye crosses the page on the way down. -->
    <div class="rx">
      <article class="rx-item">
        <a class="rx-link" href="residence.html?id=pacific" data-cursor="discover">
          <figure class="rx-frame">
            <span class="rx-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-pacific.webp" alt="Pacific House, Malibu" data-inner="0.12"></span>
          </figure>
          <div class="rx-body">
            <p class="eyebrow rx-no line">01 <em>—</em> Malibu, California</p>
            <h3 class="display rx-name"><span class="ln"><i>Pacific House</i></span></h3>
            <dl class="rx-file line">
              <div><dt>Bedrooms</dt><dd>6</dd></div>
              <div><dt>Interior</dt><dd>9,400 sq ft</dd></div>
              <div><dt>Guide</dt><dd>$18.5M</dd></div>
            </dl>
            <span class="btn btn-sm rx-go line">View the residence</span>
          </div>
        </a>
      </article>

      <article class="rx-item">
        <a class="rx-link" href="residence.html?id=arena" data-cursor="discover">
          <figure class="rx-frame">
            <span class="rx-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-arena.webp" alt="Casa Arena, Tulum" data-inner="0.12"></span>
          </figure>
          <div class="rx-body">
            <p class="eyebrow rx-no line">02 <em>—</em> Tulum, Mexico</p>
            <h3 class="display rx-name"><span class="ln"><i>Casa Arena</i></span></h3>
            <dl class="rx-file line">
              <div><dt>Bedrooms</dt><dd>5</dd></div>
              <div><dt>Interior</dt><dd>7,100 sq ft</dd></div>
              <div><dt>Guide</dt><dd>$9.4M</dd></div>
            </dl>
            <span class="btn btn-sm rx-go line">View the residence</span>
          </div>
        </a>
      </article>

      <article class="rx-item">
        <a class="rx-link" href="residence.html?id=lantern" data-cursor="discover">
          <figure class="rx-frame">
            <span class="rx-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-lantern.webp" alt="Lantern House, Dubai" data-inner="0.12"></span>
          </figure>
          <div class="rx-body">
            <p class="eyebrow rx-no line">03 <em>—</em> Dubai, UAE</p>
            <h3 class="display rx-name"><span class="ln"><i>Lantern House</i></span></h3>
            <dl class="rx-file line">
              <div><dt>Bedrooms</dt><dd>7</dd></div>
              <div><dt>Interior</dt><dd>12,600 sq ft</dd></div>
              <div><dt>Guide</dt><dd>$21.2M</dd></div>
            </dl>
            <span class="btn btn-sm rx-go line">View the residence</span>
          </div>
        </a>
      </article>

      <article class="rx-item">
        <a class="rx-link" href="residence.html?id=solano" data-cursor="discover">
          <figure class="rx-frame">
            <span class="rx-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-solano.webp" alt="Solano, Ibiza" data-inner="0.12"></span>
          </figure>
          <div class="rx-body">
            <p class="eyebrow rx-no line">04 <em>—</em> Ibiza, Spain</p>
            <h3 class="display rx-name"><span class="ln"><i>Solano</i></span></h3>
            <dl class="rx-file line">
              <div><dt>Bedrooms</dt><dd>5</dd></div>
              <div><dt>Interior</dt><dd>8,200 sq ft</dd></div>
              <div><dt>Guide</dt><dd>$12.8M</dd></div>
            </dl>
            <span class="btn btn-sm rx-go line">View the residence</span>
          </div>
        </a>
      </article>

      <article class="rx-item">
        <a class="rx-link" href="residence.html?id=dune" data-cursor="discover">
          <figure class="rx-frame">
            <span class="rx-shot"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-dune.webp" alt="Dune House, Joshua Tree" data-inner="0.12"></span>
          </figure>
          <div class="rx-body">
            <p class="eyebrow rx-no line">05 <em>—</em> Joshua Tree, California</p>
            <h3 class="display rx-name"><span class="ln"><i>Dune House</i></span></h3>
            <dl class="rx-file line">
              <div><dt>Bedrooms</dt><dd>8</dd></div>
              <div><dt>Interior</dt><dd>14,300 sq ft</dd></div>
              <div><dt>Guide</dt><dd>$26.0M</dd></div>
            </dl>
            <span class="btn btn-sm rx-go line">View the residence</span>
          </div>
        </a>
      </article>
    </div>
  </section>

  <!-- ───────────────  depth scene — layers at six speeds  ────────────── -->
  <section class="depth" id="depth">
    <div class="dp-stage">
      <span class="dp-layer dp-far"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-depth-far.webp" alt=""></span>
      <span class="dp-type dp-type-back">Desert</span>
      <span class="dp-layer dp-mid"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-depth-mid.webp" alt="Dune House in the desert at sunset"></span>
      <span class="dp-type dp-type-front">Light<em>.</em></span>
      <span class="dp-layer dp-near"><img loading="lazy" decoding="async" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-depth-near.webp" alt=""></span>
      <div class="dp-note">
        <span class="k">Dune House <em>/</em> Joshua Tree</span>
        <span class="v">Poured in place, then buried to the windowsills in sand that moves a metre a year.</span>
      </div>
    </div>
  </section>

  <!-- ────────────────────────  how a viewing works  ──────────────────── -->
  <section class="steps" id="process" data-chapter="07">
    <header class="sp-head">
      <p class="eyebrow sp-no line">How a Viewing Works</p>

      <h2 class="display sp-title">
        <span class="ln"><i>Three conversations,</i></span>
        <span class="ln"><i class="sp-dim">and no open houses.</i></span>
      </h2>

      <a class="btn btn-sm sp-terms line" href="#getintouch" data-cursor="discover">Read the terms</a>
    </header>

    <ol class="sp-row">
      <li class="sp-step">
        <i class="sp-rule" aria-hidden="true"></i>
        <span class="sp-n">01</span>
        <h3 class="sp-name">Tell us the shape of it</h3>
        <p class="sp-body">Write with the coastline, the season, and how many rooms need to be bedrooms. We answer the same day.</p>
      </li>
      <li class="sp-step">
        <i class="sp-rule" aria-hidden="true"></i>
        <span class="sp-n">02</span>
        <h3 class="sp-name">See them privately</h3>
        <p class="sp-body">We open the house for you alone, on an evening when the light is worth seeing. The owner is not there.</p>
      </li>
      <li class="sp-step">
        <i class="sp-rule" aria-hidden="true"></i>
        <span class="sp-n">03</span>
        <h3 class="sp-name">Take the time it takes</h3>
        <p class="sp-body">Nothing is held until you ask. By then the file — survey, title, running costs — is already on the desk.</p>
      </li>
    </ol>
  </section>

  <!-- ────────────────────────  the closing CTA  ─────────────────────── -->
  <section class="cta2" id="getintouch">
    <div class="c2-copy">
      <h2 class="display c2-title line">A quieter way<br>to find the house</h2>
      <p class="c2-lede line">Whether it is one viewing or a two-year search, we hold the
        list and make the introductions.</p>
      <a class="btn line" href="#getintouch" data-magnetic data-cursor="discover">Get in touch</a>
    </div>
    <figure class="c2-shot">
      <img loading="lazy" decoding="async" width="2400" height="1332"
          src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dusk-cut.webp" alt="A white pool villa at dusk">
    </figure>
    <span class="c2-fade" aria-hidden="true"></span>
  </section>

  <!-- ────────────  second footer — the reference layout  ──────────────── -->
  <footer class="foot2">
    <div class="f2-top">
      <div class="f2-say">
        <h3 class="f2-title">Stay informed</h3>
        <p class="f2-note">Four letters a year — new houses, and where they are.</p>
      </div>

      <form class="f2-form" id="newsForm" novalidate>
        <input type="email" placeholder="Your email address" aria-label="Email address" required>
        <button class="btn btn-sm" type="submit" data-cursor="discover">Subscribe</button>
      </form>
    </div>

    <p class="f2-msg" id="newsMsg"></p>

    <div class="f2-base">
      <span>© MMXXVI Nova. All rights reserved.</span>
      <a class="f2-mark" href="#top" data-cursor="top" aria-label="Nova — home">
        <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo-ink.webp" alt="Nova" width="760" height="235">
      </a>
      <nav class="f2-links">
        <a href="#getintouch">Terms</a><a href="#process">Services</a><a href="#getintouch">Contact</a>
      </nav>
    </div>
  </footer>

  </main>

  <!-- ───────────────────────────  viewer  ────────────────────────────── -->
  <div class="viewer" id="viewer" aria-hidden="true">
    <span class="viewer-bg"></span>
    <figure class="viewer-fig"><img id="viewerImg" alt=""></figure>
    <div class="viewer-meta">
      <span class="viewer-name" id="viewerName"></span>
      <span class="viewer-place" id="viewerPlace"></span>
    </div>
    <button class="btn btn-sm viewer-close" id="viewerClose" aria-label="Close">Close</button>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
  <script src="script.js"></script>
  </body>
  </html>

  ```

  ## `residence.html`

  ```html
  <!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Nova — Residence</title>
  <meta name="description" content="A single residence from the Nova collection.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  </head>
  <body class="is-residence">

  <div class="cursor" id="cursor" aria-hidden="true">
    <svg class="cursor-ring" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30"></circle></svg>
    <span class="cursor-dot"></span>
    <span class="cursor-label"></span>
  </div>

  <header class="nav is-stuck" id="nav">
    <nav class="nav-links">
      <a class="nav-pill" href="index.html" data-cursor="discover">Home</a>
      <a class="nav-pill" href="index.html#journey" data-cursor="discover">Residences</a>
      <a class="nav-pill" href="index.html#gallery" data-cursor="discover">Collection</a>
      <a class="nav-pill" href="index.html#voices" data-cursor="discover">Clients</a>
      <a class="nav-pill" href="index.html#about" data-cursor="discover">Studio</a>
    </nav>

    <a class="nav-mark" href="index.html" data-cursor="top" aria-label="Nova — home">
      <img class="nav-logo nav-logo-champagne" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo.webp" alt="Nova" width="760" height="235">
      <img class="nav-logo nav-logo-ink" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo-ink.webp" alt="" aria-hidden="true" width="760" height="235">
    </a>

    <div class="nav-end">
      <button class="nav-burger" id="burger" aria-label="Open menu" aria-expanded="false">
        <i></i><i></i>
      </button>
    </div>
  </header>

  <div class="menu" id="menu" aria-hidden="true">
    <div class="menu-list">
      <a href="index.html" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-pacific.webp"><span class="menu-no">01</span><span class="menu-word">Home</span></a>
      <a href="index.html#journey" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-arena.webp"><span class="menu-no">02</span><span class="menu-word">Residences</span></a>
      <a href="index.html#gallery" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-lantern.webp"><span class="menu-no">03</span><span class="menu-word">Collection</span></a>
      <a href="index.html#voices" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-solano.webp"><span class="menu-no">04</span><span class="menu-word">Clients</span></a>
      <a href="index.html#about" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-dune.webp"><span class="menu-no">05</span><span class="menu-word">Studio</span></a>
      <a href="#getintouch" data-thumb="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dusk-cut.webp"><span class="menu-no">06</span><span class="menu-word">Enquiry</span></a>
    </div>
    <div class="menu-view"><img id="menuThumb" src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-rx-pacific.webp" alt=""></div>
    <div class="menu-foot">
      <span>Los Angeles</span><span>Mexico City</span><span>Dubai</span><span>Ibiza</span><span>Singapore</span>
    </div>
  </div>

  <main class="rs" id="rsRoot">

    <!-- ── hero: the plate, the paragraph, the name across the bottom ───── -->
    <section class="rs-hero">
      <figure class="rs-plate"><img id="rsPlate" src="" alt=""></figure>
      <span class="rs-plate-shade"></span>

      <div class="rs-intro">
        <p class="eyebrow rs-eyebrow"><span id="rsNo">01</span> <em>/</em> <span id="rsPlace">—</span></p>
        <p class="rs-lede" id="rsLede">—</p>
      </div>

      <h1 class="rs-name" id="rsName">
        <span class="sr-only" id="rsNameText">Residence</span>
        <svg viewBox="0 0 1000 176" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <text x="500" y="158" text-anchor="middle" textLength="1000" lengthAdjust="spacingAndGlyphs" id="rsNameSvg"></text>
        </svg>
      </h1>
    </section>

    <!-- ── the statement ────────────────────────────────────────────────── -->
    <section class="rs-say">
      <p class="eyebrow line">The Brief</p>
      <h2 class="display rs-statement" id="rsStatement"></h2>
    </section>

    <!-- ── a plate beside the account of the house ──────────────────────── -->
    <section class="rs-split">
      <figure class="rs-split-shot"><img id="rsShotA" src="" alt="" loading="lazy" decoding="async"></figure>
      <div class="rs-split-text">
        <p class="line" id="rsBodyA"></p>
        <p class="line" id="rsBodyB"></p>
      </div>
    </section>

    <!-- ── three frames ─────────────────────────────────────────────────── -->
    <section class="rs-grid">
      <div class="rs-grid-note">
        <p class="eyebrow line">Inside</p>
        <p class="line" id="rsBodyC"></p>
      </div>
      <figure class="rs-f1"><img id="rsShotB" src="" alt="" loading="lazy" decoding="async"></figure>
      <figure class="rs-f2"><img id="rsShotC" src="" alt="" loading="lazy" decoding="async"></figure>
      <figure class="rs-f3"><img id="rsShotD" src="" alt="" loading="lazy" decoding="async"></figure>
    </section>

    <!-- ── the file ─────────────────────────────────────────────────────── -->
    <section class="rs-specs">
      <p class="eyebrow line">The File</p>
      <dl class="rs-table" id="rsTable"></dl>
      <a class="btn rs-ask" href="index.html#getintouch" data-cursor="discover">Request the full file</a>
    </section>

    <!-- ── next ─────────────────────────────────────────────────────────── -->
    <!-- ── the rest of the collection, one card per other residence ────── -->
    <section class="rs-more">
      <header class="rs-more-head">
        <h2 class="display rs-more-title">The rest of the collection</h2>
        <a class="btn" href="index.html#journey" data-cursor="discover">View all</a>
      </header>
      <div class="rs-more-grid" id="rsMore"></div>
    </section>

    <!-- ────────────  closing call, then the shared footer  ─────────────── -->
    <section class="cta2" id="getintouch">
      <div class="c2-copy">
        <h2 class="display c2-title line">A quieter way<br>to find the house</h2>
        <p class="c2-lede line">Whether it is one viewing or a two-year search, we hold the
          list and make the introductions.</p>
        <a class="btn line" href="#getintouch" data-magnetic data-cursor="discover">Get in touch</a>
      </div>
      <figure class="c2-shot">
        <img loading="lazy" decoding="async" width="2400" height="1332"
            src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-dusk-cut.webp" alt="A white pool villa at dusk">
      </figure>
      <span class="c2-fade" aria-hidden="true"></span>
    </section>

    <footer class="foot2">
      <div class="f2-top">
        <div class="f2-say">
          <h3 class="f2-title">Stay informed</h3>
          <p class="f2-note">Four letters a year — new houses, and where they are.</p>
        </div>

        <form class="f2-form" id="newsForm" novalidate>
          <input type="email" placeholder="Your email address" aria-label="Email address" required>
          <button class="btn btn-sm" type="submit" data-cursor="discover">Subscribe</button>
        </form>
      </div>

      <p class="f2-msg" id="newsMsg"></p>

      <div class="f2-base">
        <span>© MMXXVI Nova. All rights reserved.</span>
        <a class="f2-mark" href="index.html" data-cursor="top" aria-label="Nova — home">
          <img src="https://demo.uichemy.com/wp-content/uploads/2026/09/nova__images-logo-ink.webp" alt="Nova" width="760" height="235">
        </a>
        <nav class="f2-links">
          <a href="#getintouch">Terms</a><a href="index.html#process">Services</a><a href="#getintouch">Contact</a>
        </nav>
      </div>
    </footer>

  </main>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
  <script src="script.js"></script>
  </body>
  </html>

  ```

  ## `style.css`

  ```css
  /* ==========================================================================
     NOVA — private residences
     Palette: white and a cool grey, near-black charcoal, one bronze.
     Type:    Instrument Serif for display, Inter Tight for text and labels.
     Motion:  GSAP + ScrollTrigger own every animated transform. CSS never
              declares a transform on an element the script animates.
     ========================================================================== */

  :root{
    --white:#FFFFFF;
    --mist:#F0F0F3;
    --stone:#E3E3E8;
    --char:#0E0E11;
    --ink:#17171A;
    --gray:#8B8B93;
    --bronze:#A8834F;
    --line:rgba(23,23,26,.16);
    --line-soft:rgba(23,23,26,.08);

    --pad:clamp(20px,4.4vw,72px);
    /* the hero sits on the page as an inset plate rather than bleeding to the
       window edge */
    --plate:clamp(10px,1.1vw,18px);
    --plate-r:0px;   /* square: every card and plate. One value flips it back. */
    --hero-r:clamp(14px,1.6vw,24px);  /* the hero plate keeps its corners */
    --ease:cubic-bezier(.22,.61,.24,1);
    --ease-out:cubic-bezier(.16,1,.3,1);

    /* Instrument Serif carries the display moments, Inter Tight everything else */
    --serif:"Instrument Serif",Georgia,serif;
    --sans:"Inter Tight",ui-sans-serif,system-ui,sans-serif;

    /* the unstuck bar: its padding twice over, plus the tallest thing in it */
    /* the pill row only: its top padding plus a pill. The bar is transparent,
       so this is the real bottom edge of the chrome. */
    --chrome-h:calc(clamp(14px,1.9vw,26px) + 39px);
    /* how far the footer rides up onto the closing plate */
    --foot-rise:clamp(80px,8vw,120px);
  }

  *,*::before,*::after{box-sizing:border-box}

  html{
    -webkit-text-size-adjust:100%;
    /* Lenis drives scrolling; a native smooth behaviour on top of it makes the
       page drift on its own. */
    scroll-behavior:auto;
  }

  body{
    margin:0;
    background:var(--mist);
    color:var(--ink);
    font:400 16px/1.65 var(--sans);
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }

  body.is-locked{overflow:hidden}

  img{display:block;max-width:100%;height:auto}
  a{color:inherit;text-decoration:none}
  button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
  ::selection{background:var(--bronze);color:var(--white)}

  /* ---------- type primitives ---------------------------------------------- */

  .display{
    font-family:var(--serif);
    font-weight:400;
    line-height:.98;
    letter-spacing:-.015em;
    margin:0;
  }
  .display em{font-style:italic;font-weight:400}

  .eyebrow{
    margin:0;
    font-size:11px;
    letter-spacing:.34em;
    text-transform:uppercase;
    color:var(--bronze);
    font-weight:500;
  }
  .eyebrow em{font-style:normal;color:color-mix(in srgb,var(--bronze) 62%,transparent)}

  .lede{
    margin:0;
    max-width:42ch;
    font-size:clamp(14px,1.12vw,17px);
    line-height:1.72;
    color:color-mix(in srgb,var(--ink) 74%,transparent);
  }

  /* masked line reveal — the <i> is what GSAP moves */
  .ln{display:block;overflow:hidden;padding-bottom:.08em}
  .ln > i{display:block;font-style:inherit}

  /* ---------- the button. There is one. ----------------------------------- */

  .btn{
    display:inline-flex;align-items:center;justify-content:center;
    padding:13px 26px;border-radius:999px;border:0;
    background:var(--ink);color:var(--white);
    font-size:11px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;white-space:nowrap;
    transition:background .5s var(--ease),color .5s var(--ease),letter-spacing .6s var(--ease);
  }
  .btn:hover{background:var(--bronze);letter-spacing:.275em}
  .btn[disabled]{opacity:.4;pointer-events:none}

  /* two sizes of the same thing, and an icon-only round one for carousels */
  .btn-sm{padding:10px 19px;font-size:11.5px}
  .btn-wide{width:100%}
  .btn-round{
    width:clamp(38px,3vw,46px);height:clamp(38px,3vw,46px);
    padding:0;border-radius:50%;
  }
  .btn-round svg{width:20px;height:8px;overflow:visible}
  .btn-round svg path{fill:none;stroke:currentColor;stroke-width:1.2}

  /* ==========================================================================
     cursor, rail, nav
     ========================================================================== */

  .cursor{
    position:fixed;top:0;left:0;z-index:110;
    width:64px;height:64px;margin:-32px 0 0 -32px;
    pointer-events:none;
    display:grid;place-items:center;
    opacity:0;
    mix-blend-mode:difference;
  }
  .cursor-dot{
    width:7px;height:7px;border-radius:50%;background:var(--white);
    grid-area:1/1;
  }
  .cursor-label{
    grid-area:1/1;
    font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--white);
    opacity:0;white-space:nowrap;
  }
  .cursor-ring{
    grid-area:1/1;width:64px;height:64px;
    opacity:0;
  }
  .cursor-ring circle{fill:none;stroke:rgba(255,255,255,.55);stroke-width:1}
  body.no-cursor .cursor{display:none}

  /* ---------- navbar: pill links, centred mark, one phone pill ------------ */

  .nav{
    position:fixed;top:0;left:0;right:0;z-index:80;
    display:grid;
    grid-template-columns:1fr auto auto;
    align-items:center;
    gap:20px;
    padding:clamp(14px,1.9vw,26px) clamp(16px,2.6vw,40px);
    color:var(--white);
    transition:color .6s var(--ease),padding .6s var(--ease),background-color .5s var(--ease);
  }
  /* No bar. The pills already carry their own glass, so a tinted, blurred
     strip on top of them only added a hard edge cutting across the page —
     on scroll the bar just tightens its padding and recolours. */
  .nav.is-stuck{
    padding:10px clamp(16px,2.6vw,40px);
    color:var(--ink);
  }
  .nav.is-dark,.nav.is-stuck.is-dark{color:var(--white)}

  /* every item in the bar is the same glass pill */
  .nav-pill{
    display:inline-flex;align-items:center;gap:9px;
    padding:9px clamp(13px,1.1vw,19px);
    border:1px solid rgba(255,255,255,.26);
    border-radius:999px;
    background:rgba(255,255,255,.07);
    backdrop-filter:blur(10px);
    -webkit-backdrop-filter:blur(10px);
    font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;
    transition:background .5s var(--ease),border-color .5s var(--ease),color .5s var(--ease);
  }
  .nav-pill:hover{background:var(--white);border-color:var(--white);color:var(--ink)}
  .nav.is-stuck .nav-pill{border-color:var(--line);background:rgba(23,23,26,.04)}
  .nav.is-stuck .nav-pill:hover{background:var(--ink);border-color:var(--ink);color:var(--white)}
  .nav.is-stuck.is-dark .nav-pill{border-color:rgba(255,255,255,.26);background:rgba(255,255,255,.07)}
  .nav.is-stuck.is-dark .nav-pill:hover{background:var(--white);border-color:var(--white);color:var(--char)}

  .nav-links{grid-column:1;display:flex;align-items:center;gap:clamp(5px,.5vw,9px);justify-self:start}

  /* the lockup sits at the right edge; the burger, when it shows, to its left */
  .nav-mark{grid-column:3;justify-self:end;display:grid;place-items:center}
  /* Two prints of the supplied lockup: the white artwork vanishes on the light
     bar, so an ink remap of it fades in there instead. The height lives on the
     images — a height on the anchor leaves the grid row auto-sized by the
     artwork and the lockup renders at full size. */
  .nav-logo{
    grid-area:1/1;display:block;
    filter:drop-shadow(0 1px 10px rgba(8,8,10,.30));
    height:clamp(21px,2.05vw,29px);width:auto;
    transition:opacity .55s var(--ease);
  }
  .nav-logo-ink{opacity:0}
  .nav.is-stuck:not(.is-dark) .nav-logo-champagne{opacity:0}
  .nav.is-stuck:not(.is-dark) .nav-logo-ink{opacity:1}

  .nav-end{grid-column:2;display:flex;align-items:center;gap:14px;justify-self:end}

  .nav-burger{display:none;width:26px;height:14px;position:relative}
  .nav-burger i{position:absolute;left:0;right:0;height:1px;background:currentColor;transition:transform .6s var(--ease),opacity .4s}
  .nav-burger i:first-child{top:2px}
  .nav-burger i:last-child{bottom:2px}
  body.menu-open .nav-burger i:first-child{transform:translateY(5px) rotate(15deg)}
  body.menu-open .nav-burger i:last-child{transform:translateY(-5px) rotate(-15deg)}

  @media (max-width:860px){
    /* the pill row folds into the burger, which sits left of the lockup */
    .nav-links{display:none}
    .nav-burger{display:block}
  }

  /* ---------- full-screen menu --------------------------------------------- */

  .menu{
    position:fixed;inset:0;z-index:70;
    background:var(--char);
    color:var(--white);
    display:grid;
    grid-template-columns:1.1fr .9fr;
    align-items:center;
    padding:0 var(--pad);
    clip-path:inset(0 0 100% 0);
    visibility:hidden;
  }
  .menu-list{display:grid;gap:clamp(2px,.6vw,10px);padding-top:6vh}
  .menu-list a{
    display:flex;align-items:baseline;gap:clamp(14px,2vw,34px);
    padding:clamp(6px,1vw,12px) 0;
    overflow:hidden;
  }
  .menu-no{font-size:11px;letter-spacing:.22em;color:var(--bronze)}
  .menu-word{
    font-family:var(--serif);font-weight:400;
    font-size:clamp(38px,6.4vw,92px);line-height:1.05;
    transition:opacity .6s var(--ease),transform .8s var(--ease);
  }
  .menu-list:hover .menu-word{opacity:.35}
  .menu-list a:hover .menu-word{opacity:1;transform:translateX(18px)}
  .menu-view{
    position:relative;aspect-ratio:3/4;width:min(34vw,420px);justify-self:end;
    overflow:hidden;
  }
  .menu-view img{width:100%;height:100%;object-fit:cover;opacity:.9}
  .menu-foot{
    position:absolute;left:var(--pad);right:var(--pad);bottom:clamp(20px,3vh,38px);
    display:flex;flex-wrap:wrap;gap:clamp(14px,2.4vw,34px);
    font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.45);
  }

  @media (max-width:860px){
    /* one column: the list carries the menu, the preview plate is dropped */
    .menu{grid-template-columns:1fr;align-content:center;gap:30px}
    .menu-view{display:none}
  }

  /* ==========================================================================
     hero
     ========================================================================== */

  .hero{
    position:relative;
    height:104svh;
    min-height:620px;
    overflow:hidden;
    color:var(--white);
    isolation:isolate;
  }
  /* The stage is a fixed layer, not a ScrollTrigger pin: the sections that
     follow carry their own opaque ground and rise over it, which is the whole
     "emerging from beneath" effect and costs no pin-spacer. */
  .hero-stage{
    position:fixed;
    top:var(--plate);left:var(--plate);
    width:calc(100% - var(--plate) * 2);
    height:calc(100svh - var(--plate) * 2);
    overflow:hidden;perspective:1500px;z-index:0;
    border-radius:var(--hero-r);
    background:var(--char);
  }
  .hero.is-past .hero-stage{visibility:hidden}
  .hero-frame{
    position:absolute;
    top:var(--plate);left:var(--plate);
    width:calc(100% - var(--plate) * 2);
    height:calc(100svh - var(--plate) * 2);
    z-index:2;
  }
  .hero-layer{position:absolute;overflow:hidden;will-change:transform}
  .hero-layer img{width:100%;height:100%;object-fit:cover}

  /* The photograph behind the words and the SAME photograph with the house cut
     out in front of them — identical geometry, so at rest they register exactly
     and the composite is just the original frame. They only come apart when
     something moves, and the blur on the rear plate turns that into depth
     rather than a doubled building. */
  .hero-scene{inset:-6%;z-index:0}
  .hero-scene img{object-fit:cover;object-position:50% 42%}
  /* warm light gathered where the house will stand */
  .hero-glow{
    position:absolute;left:50%;top:38%;width:120vw;height:70vh;translate:-50% -50%;
    z-index:0;pointer-events:none;
    background:radial-gradient(42% 48% at 50% 62%,rgba(255,196,122,.30),transparent 70%);
  }
  /* THE SANDWICH: the wordmark sits above the sky, below the house. SVG with
     textLength so it measures the plate exactly at any width. */
  .hero-mark{
    position:absolute;left:clamp(14px,2.4vw,40px);right:clamp(14px,2.4vw,40px);
    /* measured off the bottom of the pill row, and the plate inset taken
       back out, because this sits inside the plate rather than on the page */
    top:calc(var(--chrome-h) - var(--plate) + clamp(18px,3.2vh,50px));
    z-index:1;margin:0;line-height:0;
  }
  .hero-mark svg{display:block;width:100%;height:auto;overflow:visible}
  /* The scroll timeline scales .hero-mark (to .94) while it moves. Scaling SVG
     text makes the browser re-rasterise the glyphs every frame, which reads as
     a flicker on the wordmark. Promoting it to its own layer and fixing the
     backface stops the re-raster; the glyph edges then just resample. */
  .hero-mark{will-change:transform;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform-style:flat}
  .hero-mark svg{shape-rendering:geometricPrecision}
  .hero-mark text{
    font-family:var(--serif);
    font-weight:400;font-size:280px;
    fill:var(--white);
    paint-order:stroke;
  }
  @media (max-height:780px){
    /* the house is sized off the stage height: on a short window it reaches
       further up, so the wordmark moves out of its way */
  }
  .sr-only{
    position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
    clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0;
  }
  /* the house, cut out of its own photograph, in front of the words */
  /* the same frame, registered exactly over the plate behind it: at rest the
     two are one photograph, and the wordmark is simply inside it. The extra
     2% keeps the twin covered while the planes drift apart. */
  /* the plate is an empty site, so the cut-out just stands on the plinth —
     no registration, and the planes are free to move at their own speeds */
  /* Planted on the bottom edge of the hero, sized off the STAGE HEIGHT so a
     short window cannot blow it up.

     The centring and the 9.8% push-down (the empty canvas under the building
     in the PNG) live on the IMG, not on the layer: GSAP takes ownership of an
     element's transform by wiping the CSS `translate` property and baking its
     percentages into pixels, which then go stale on the next resize and slide
     the house off-centre. GSAP animates the layer; the img keeps its own
     transform and stays correct at every width. */
  .hero-house{
    position:absolute;inset:0;z-index:2;overflow:visible;
    transform-origin:50% 100%;   /* any scale grows from the ground */
  }
  .hero-house img{
    position:absolute;left:50%;bottom:0;
    height:126%;width:auto;
    aspect-ratio:1521 / 1034;
    transform:translate(-50%, 20.5%);
    object-fit:fill;
    filter:drop-shadow(0 26px 44px rgba(8,8,10,.34));
  }
  /* no strip in front of the house: it cut across the base and read as a gap */
  .hero-grass{display:none}
  .hero-grass img{
    object-position:50% 100%;
    -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 58%);
    mask-image:linear-gradient(180deg,transparent 0,#000 58%);
  }
  /* a pool of shade under the copy only — never a veil over the whole frame */
  .hero-shade{
    position:absolute;inset:0;pointer-events:none;z-index:4;
    background:
      radial-gradient(70% 52% at 22% 84%,rgba(10,10,12,.72),transparent 72%),
      linear-gradient(180deg,rgba(10,10,12,.42),transparent 22%),
      /* seats the house: the bottom crop reads as shadow, not as a cut */
      linear-gradient(0deg,rgba(10,10,12,.84),rgba(10,10,12,.46) 11%,rgba(10,10,12,.16) 20%,transparent 30%);
  }

  /* ---------- hero interface: corners, cards, pill ------------------------ */

  .hn-statement{
    position:absolute;left:clamp(24px,3.4vw,58px);bottom:clamp(38px,6vh,70px);z-index:2;
    margin:0;max-width:34ch;
    font-size:clamp(14px,1.05vw,16px);line-height:1.72;
    color:rgba(255,255,255,.86);
    text-shadow:0 1px 20px rgba(8,8,10,.7);
  }

  /* the pill is also the hover-to-explore control: a fill sweeps across it
     while the pointer rests, then the page moves on its own */
  /* the hero's is the same pill in reverse: ivory on the photograph, with a
     hairline so it keeps an edge where the sky behind it goes pale */
  .hn-pill{
    position:absolute;right:clamp(24px,3.4vw,58px);bottom:clamp(30px,5.2vh,62px);z-index:3;
    background:var(--white);color:var(--ink);
    border:1px solid rgba(23,23,26,.16);
    box-shadow:0 18px 50px rgba(10,8,14,.34);
    transition:background .5s var(--ease),color .5s var(--ease),
               border-color .5s var(--ease),letter-spacing .6s var(--ease);
  }
  .hn-pill:hover{background:var(--bronze);color:var(--white);border-color:var(--bronze)}

  /* The statement sits bottom-left and the pill bottom-right. There is not
     room for both on one line on a phone, and they overlapped — so the pill
     drops to the left edge and the statement lifts clear above it. */
  @media (max-width:620px){
    .hn-pill{left:clamp(20px,5vw,58px);right:auto}
    .hn-statement{
      left:clamp(20px,5vw,58px);right:clamp(20px,5vw,58px);
      max-width:none;
      bottom:calc(clamp(30px,5.2vh,62px) + 64px);
    }
  }

  /* the wordmark is redundant with the nav lockup while the hero is on screen */
  /* the mark is a monogram now, not a second wordmark, so it stays visible
     over the hero instead of fading in on scroll */

  /* ==========================================================================
     about — a tag on the left, the sentence held to the right, three rows
     under it on the same two columns. The first section after the hero, so
     it needs the background and the z-index that cover the fixed plate.
     ========================================================================== */

  .about{
    position:relative;z-index:2;background:var(--mist);
    display:grid;
    grid-template-columns:1fr 1.06fr;
    column-gap:clamp(24px,5vw,80px);
    row-gap:clamp(56px,9vh,120px);
    padding:clamp(96px,16vh,190px) var(--pad) clamp(80px,13vh,150px);
  }
  .ab-tag{margin:0;align-self:start}

  .ab-say{
    grid-column:2;margin:0;
    font-size:clamp(28px,3.5vw,58px);
    line-height:1.16;letter-spacing:-.01em;
    text-wrap:balance;
  }
  /* the word spans the script builds; dim until the scroll fills them in */
  .ab-say .w{opacity:.2}
  .ab-say .ab-tail{display:inline}

  .ab-rows{grid-column:1/-1;margin:0;display:grid}
  .ab-row{
    display:grid;grid-template-columns:1fr 1.06fr;
    column-gap:clamp(24px,5vw,80px);align-items:start;
    padding:clamp(20px,3.2vh,34px) 0;
    border-top:1px solid var(--line-soft);
  }
  .ab-row:last-child{border-bottom:1px solid var(--line-soft)}
  .ab-row dt{
    font-family:var(--serif);
    font-size:clamp(19px,1.8vw,28px);font-weight:400;letter-spacing:-.005em;
  }
  .ab-row dd{
    margin:0;max-width:52ch;
    font-size:15px;line-height:1.78;
    color:color-mix(in srgb,var(--ink) 58%,transparent);
  }

  /* ==========================================================================
     gallery
     ========================================================================== */

  .sec-head{
    display:grid;gap:18px;
    padding:clamp(90px,15vh,170px) var(--pad) clamp(34px,6vh,72px);
    grid-template-columns:1fr;
    max-width:1680px;margin:0 auto;
  }
  .sec-note{margin:0;max-width:52ch;font-size:14px;line-height:1.8;color:color-mix(in srgb,var(--ink) 62%,transparent)}

  .gallery{position:relative;z-index:2;background:var(--mist)}
  .gal{
    display:grid;
    grid-template-columns:repeat(12,1fr);
    gap:clamp(14px,2.2vw,34px) clamp(14px,2vw,28px);
    padding:0 var(--pad) clamp(80px,14vh,170px);
    max-width:1680px;margin:0 auto;
  }
  .gal-item{position:relative;margin:0;cursor:pointer}
  .gal-mask{display:block;position:relative;overflow:hidden;border-radius:var(--plate-r);background:var(--stone)}
  .gal-mask img{width:100%;height:100%;object-fit:cover}
  /* the caption is part of the plate, not a hover reveal: it stays readable
     and only firms up in colour when you are on the picture */
  .gal-item figcaption{
    display:flex;gap:14px;padding-top:12px;
    font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--gray);
    transition:color .6s var(--ease);
  }
  .gal-item figcaption span:first-child{color:var(--bronze)}
  .gal-item:hover figcaption{color:var(--ink)}

  .g1{grid-column:1/8}      .g1 .gal-mask{aspect-ratio:16/9}
  .g2{grid-column:9/13;align-self:end}  .g2 .gal-mask{aspect-ratio:3/4}
  .g3{grid-column:2/9;margin-top:clamp(10px,5vh,60px)} .g3 .gal-mask{aspect-ratio:16/10}
  .g4{grid-column:10/13;align-self:center} .g4 .gal-mask{aspect-ratio:5/4}
  .g5{grid-column:1/6}      .g5 .gal-mask{aspect-ratio:4/3}
  .g6{grid-column:6/13;margin-top:clamp(10px,7vh,90px)} .g6 .gal-mask{aspect-ratio:16/9}

  /* The spans above are a twelve-column composition and they do not survive a
     phone: at 375px they gave frames of 190, 131 and 73px and cut a caption
     off the screen. Below these widths the grid is abandoned for plain
     columns; each frame keeps its own aspect ratio so the rhythm survives. */
  @media (max-width:860px){
    .gal{grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(14px,2.6vw,26px)}
    .g1,.g2,.g3,.g4,.g5,.g6{grid-column:auto;margin-top:0;align-self:auto}
  }
  @media (max-width:600px){
    .gal{grid-template-columns:minmax(0,1fr)}
  }

  /* ==========================================================================
     horizontal journey
     ========================================================================== */

  .journey{position:relative;background:var(--white)}
  /* head and track are rows, not an absolute overlay: a tall card used to
     rise up and paint straight over the heading */
  .jr-pin{
    position:relative;height:100svh;overflow:hidden;
    display:grid;grid-template-rows:auto minmax(0,1fr);
    /* the track is far wider than the pin; without a capped column the grid
       stretches to it and carries the heading row off the right of the screen */
    grid-template-columns:minmax(0,1fr);
    gap:clamp(18px,3.4vh,40px);
    padding:clamp(74px,11vh,124px) 0 clamp(36px,6vh,72px);
  }
  .jr-head{
    padding:0 var(--pad);
    display:flex;align-items:center;justify-content:space-between;gap:20px;
  }
  .jr-title{font-size:clamp(24px,3vw,48px)}

  .jr-track{display:flex;width:max-content;height:100%;gap:clamp(14px,1.8vw,28px);padding:0 var(--pad);will-change:transform}

  /* each residence is a rounded plate with its name and file laid over it */
  .jr-card{
    position:relative;flex:0 0 auto;display:block;overflow:hidden;
    width:clamp(260px,42vw,600px);height:100%;
    max-height:clamp(380px,62vh,620px);align-self:center;
    border-radius:var(--plate-r);
    background:#cfc7b9;
  }
  .jr-shot{position:absolute;inset:0;display:block;overflow:hidden}
  /* GSAP owns the x on this image, so it is given headroom on both sides and
     the offset lives on left, never on transform */
  .jr-shot img{position:absolute;top:0;left:-9%;width:118%;max-width:none;height:100%;object-fit:cover}
  .jr-veil{
    position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(180deg,transparent 36%,rgba(8,8,10,.30) 58%,rgba(8,8,10,.78) 88%,rgba(8,8,10,.82));
  }
  .jr-copy{
    position:absolute;left:clamp(18px,2vw,30px);right:clamp(18px,2vw,30px);
    bottom:clamp(16px,2vh,26px);
    display:grid;gap:clamp(9px,1.2vh,14px);color:var(--white);
  }
  .jr-name{
    margin:0;font-family:var(--serif);font-weight:400;
    font-size:clamp(21px,2.3vw,34px);line-height:1.1;letter-spacing:-.01em;
    text-shadow:0 1px 18px rgba(8,8,10,.4);
    transition:transform .8s var(--ease);
  }
  .jr-card:hover .jr-name{transform:translateX(7px)}
  .jr-meta{
    list-style:none;margin:0;padding:0;
    display:flex;flex-wrap:wrap;gap:6px clamp(12px,1.5vw,22px);
  }
  .jr-meta li{
    display:inline-flex;align-items:center;gap:7px;
    font-size:11.5px;color:rgba(255,255,255,.82);white-space:nowrap;
  }
  .jr-meta svg{
    width:14px;height:14px;flex:0 0 auto;
    fill:none;stroke:rgba(255,255,255,.66);stroke-width:1.1;
    stroke-linecap:round;stroke-linejoin:round;
  }

  @media (max-width:860px){
    .jr-head{flex-direction:column;align-items:flex-start;gap:14px}
    .jr-card{width:clamp(240px,78vw,420px);max-height:none}
  }

  /* ==========================================================================
     type / image composition
     ========================================================================== */

  /* ==========================================================================
     depth scene
     ========================================================================== */

  .depth{position:relative;height:210svh;background:#0C0C0D;color:var(--white)}
  .dp-stage{
    position:relative;height:100svh;overflow:hidden;
    background:linear-gradient(180deg,#14151A,#0C0C0D);
  }
  .dp-layer{position:absolute;left:-6%;right:-6%;display:block;overflow:hidden;will-change:transform}
  .dp-layer img{width:100%;height:100%;object-fit:cover}
  /* the three bands are cut from one plate; feathering the seams is what makes
     them read as distance rather than as three photographs */
  .dp-far{top:-6%;height:54%;-webkit-mask-image:linear-gradient(180deg,#000 62%,transparent);mask-image:linear-gradient(180deg,#000 62%,transparent)}
  .dp-far img{filter:saturate(.9) brightness(.86)}
  .dp-mid{top:24%;height:56%;-webkit-mask-image:linear-gradient(180deg,transparent,#000 22%,#000 74%,transparent);mask-image:linear-gradient(180deg,transparent,#000 22%,#000 74%,transparent)}
  .dp-mid img{filter:saturate(1.02)}
  .dp-near{bottom:-14%;height:50%;-webkit-mask-image:linear-gradient(180deg,transparent,#000 34%);mask-image:linear-gradient(180deg,transparent,#000 34%)}
  .dp-near img{filter:brightness(.72) saturate(.92)}
  .dp-layer::after{
    content:"";position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(180deg,rgba(12,12,13,.55),transparent 22%,transparent 72%,rgba(12,12,13,.72));
  }
  .dp-type{
    position:absolute;left:0;right:0;text-align:center;
    font-family:var(--serif);font-weight:400;
    font-size:clamp(64px,13.5vw,220px);line-height:.9;letter-spacing:-.02em;
    will-change:transform;
  }
  .dp-type-back{top:16%;color:rgba(255,255,255,.9)}
  .dp-type-front{top:46%;color:var(--white);text-shadow:0 2px 40px rgba(0,0,0,.45)}
  .dp-type-front em{font-style:italic;color:var(--bronze)}
  .dp-note{
    position:absolute;left:var(--pad);bottom:clamp(44px,8vh,90px);z-index:3;
    display:grid;gap:10px;max-width:min(42vw,460px);
    text-shadow:0 1px 20px rgba(0,0,0,.6);
  }
  .dp-note .k{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--bronze)}
  .dp-note .k em{font-style:normal;color:rgba(255,255,255,.5)}
  .dp-note .v{font-size:15px;line-height:1.78;color:rgba(255,255,255,.74)}

  /* ==========================================================================
     the film — a pinned stage, WebGL over a still fallback
     ========================================================================== */

  .film{position:relative;height:460svh;background:var(--char)}
  .fl-stage{
    position:relative;height:100svh;overflow:hidden;
    background:var(--char);color:var(--white);
  }
  /* five plates in one cell; the frame in play is the one at opacity 1 */
  .fl-shot{
    position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
    opacity:0;transition:opacity .9s var(--ease);
  }
  .fl-shot.is-on{opacity:1}
  .fl-shade{
    position:absolute;inset:0;pointer-events:none;
    background:
      linear-gradient(180deg,rgba(8,8,10,.6),transparent 26%),
      linear-gradient(0deg,rgba(8,8,10,.72),transparent 40%);
  }
  .fl-head{position:absolute;left:var(--pad);top:clamp(88px,14vh,150px);z-index:2}

  /* the five captions share one grid cell and cross-fade in place */
  .fl-caps{
    position:absolute;left:var(--pad);bottom:clamp(74px,12vh,130px);z-index:2;
    display:grid;
  }
  .fl-cap{
    grid-area:1/1;margin:0;display:grid;gap:10px;
    opacity:0;transform:translateY(14px);
    transition:opacity .7s var(--ease),transform .9s var(--ease);
    text-shadow:0 1px 22px rgba(8,8,10,.6);
  }
  .fl-cap.is-on{opacity:1;transform:none}
  .fl-cap .k{font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:var(--bronze)}
  .fl-cap .v{font-family:var(--serif);font-size:clamp(28px,4.4vw,74px);line-height:1.04}

  .fl-bar{
    position:absolute;left:var(--pad);right:var(--pad);bottom:clamp(38px,6vh,64px);z-index:2;
    height:1px;background:rgba(255,255,255,.2);
  }
  .fl-bar i{display:block;height:100%;background:var(--white);transform-origin:left;transform:scaleX(0)}

  @media (max-width:860px){
    .film{height:420svh}
    .depth{height:180svh}
    .dp-note{max-width:none;right:var(--pad);bottom:clamp(22px,4vh,44px)}
    .dp-note .v{font-size:13px;line-height:1.7}
    .dp-type{font-size:clamp(44px,15vw,120px)}
    .dp-type-back{top:14%}
    .dp-type-front{top:40%}
    .fl-cap .v{font-size:clamp(28px,8vw,44px)}
  }

  @media (prefers-reduced-motion:reduce){
    .film,.depth{height:auto}
    .fl-stage{height:auto;min-height:100svh}
    .fl-caps{position:static;padding:clamp(120px,20vh,220px) 0 0}
    .fl-cap{grid-area:auto;opacity:1;margin-bottom:26px}
    .dp-stage{height:auto;min-height:100svh}
  }

  /* ==========================================================================
     selected residences — alternating plates that bleed off the page
     ========================================================================== */

  .index{position:relative;background:var(--mist);padding-bottom:clamp(90px,15vh,180px);overflow:hidden}

  .rx{display:grid;gap:clamp(76px,12vh,150px);padding:0 var(--pad)}
  .rx-link{
    display:grid;grid-template-columns:1.22fr .78fr;
    gap:clamp(24px,4vw,72px);align-items:center;
  }
  /* the plate runs off its own edge of the page; the sides alternate so the
     eye crosses the measure on the way down */
  .rx-frame{
    position:relative;margin:0;overflow:hidden;
    aspect-ratio:16/10;background:var(--stone);
    margin-left:calc(var(--pad) * -1);
    /* it runs off one edge, so only the corners still on the page are rounded */
    border-radius:0 var(--plate-r) var(--plate-r) 0;
  }
  .rx-item:nth-child(even) .rx-link{grid-template-columns:.78fr 1.22fr}
  .rx-item:nth-child(even) .rx-frame{order:2;margin-left:0;margin-right:calc(var(--pad) * -1);border-radius:var(--plate-r) 0 0 var(--plate-r)}
  .rx-item:nth-child(even) .rx-body{order:1}

  /* GSAP owns yPercent on the img, so the hover push lives on the span around
     it — two transforms on one element would fight */
  .rx-shot{position:absolute;inset:0;display:block;transition:transform 1.1s var(--ease)}
  .rx-shot img{position:absolute;left:0;top:-9%;width:100%;height:118%;object-fit:cover}
  .rx-link:hover .rx-shot{transform:scale(1.035)}

  .rx-body{display:grid;gap:clamp(14px,2vh,24px);justify-items:start}
  .rx-no em{font-style:normal;color:var(--bronze)}
  .rx-name{
    font-size:clamp(30px,3.5vw,62px);
    transition:transform .8s var(--ease);
  }
  .rx-link:hover .rx-name{transform:translateX(9px)}

  .rx-file{margin:0;width:100%;max-width:38ch;display:grid}
  .rx-file div{
    display:flex;justify-content:space-between;align-items:baseline;gap:18px;
    padding:11px 0;border-top:1px solid var(--line-soft);
  }
  .rx-file div:last-child{border-bottom:1px solid var(--line-soft)}
  .rx-file dt{font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--gray)}
  .rx-file dd{
    margin:0;font-family:var(--serif);
    font-size:clamp(15px,1.3vw,21px);letter-spacing:.02em;
  }

  .rx-link:hover .rx-go > span::after{right:0}
  .rx-link:hover .rx-go svg{transform:translateX(7px)}

  @media (max-width:860px){
    /* one column, and the plate bleeds off both edges instead of one */
    .rx{gap:clamp(54px,9vh,90px)}
    .rx-link,.rx-item:nth-child(even) .rx-link{grid-template-columns:1fr;gap:clamp(18px,3vh,28px)}
    .rx-frame,.rx-item:nth-child(even) .rx-frame{
      order:0;aspect-ratio:4/3;border-radius:0;
      margin-left:calc(var(--pad) * -1);margin-right:calc(var(--pad) * -1);
    }
    .rx-item:nth-child(even) .rx-body{order:0}
    .rx-file{max-width:none}
  }

  /* ==========================================================================
     what owners say — a bled rail of tall cards, text and portrait alternating
     ========================================================================== */

  .say{
    position:relative;background:var(--mist);color:var(--ink);
    display:grid;gap:clamp(26px,4.2vh,48px);
    padding:clamp(80px,14vh,170px) var(--pad);
  }
  .sy-head{display:grid;gap:clamp(9px,1.5vh,16px);justify-items:center;text-align:center}
  .sy-title{font-size:clamp(30px,4.2vw,68px)}

  /* The rail runs past the page gutter on both sides, so cards are always cut
     by the window rather than stopping politely inside the column. The snap
     port is inset by the gutter to match the first card — without that the row
     can never rest at its own start. */
  .sy-rail{
    display:flex;gap:clamp(13px,1.3vw,20px);
    margin:0 calc(var(--pad) * -1);padding:4px 0;
    overflow-x:auto;overscroll-behavior-x:contain;
    scroll-snap-type:x mandatory;scroll-behavior:smooth;
    scroll-padding-left:var(--pad);
    scrollbar-width:none;-ms-overflow-style:none;
  }
  .sy-rail::-webkit-scrollbar{display:none}

  .sy-card{
    flex:0 0 clamp(236px,25vw,320px);
    height:clamp(360px,44vh,460px);
    scroll-snap-align:start;
    margin:0;overflow:hidden;
    border-radius:var(--plate-r);
  }
  .sy-card:first-child{margin-left:var(--pad)}
  .sy-card:last-child{margin-right:var(--pad)}

  /* -- the written ones: a line at the top, the quote settled at the foot --- */
  .sy-text{
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-template-rows:auto minmax(0,1fr) auto;
    gap:clamp(13px,1.6vh,18px);
    padding:clamp(22px,2vw,32px);
    background:var(--white);
  }
  .sy-h{
    grid-column:1;grid-row:1;margin:0;
    font-family:var(--serif);font-weight:400;
    font-size:clamp(20px,1.9vw,29px);line-height:1.08;letter-spacing:-.01em;
  }
  .sy-quote{
    grid-column:1/-1;grid-row:2;align-self:end;margin:0;
    font-size:clamp(13.5px,1.02vw,15px);line-height:1.68;
    color:color-mix(in srgb,var(--ink) 74%,transparent);
  }
  .sy-by{
    grid-column:1/-1;grid-row:3;
    display:flex;align-items:baseline;justify-content:space-between;gap:12px;
    padding-top:clamp(11px,1.3vh,15px);border-top:1px solid var(--line-soft);
  }
  .sy-who{font-size:13.5px;font-weight:500}
  .sy-place{
    display:inline-flex;align-items:center;gap:5px;
    font-size:12.5px;color:color-mix(in srgb,var(--ink) 58%,transparent);
  }
  .sy-place svg{width:10px;height:12px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.3}

  /* -- the photographed ones: the name sits on the picture ----------------- */
  .sy-photo{position:relative;background:var(--stone)}
  .sy-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 25%}
  .sy-photo .sy-by{
    position:absolute;left:0;right:0;bottom:0;
    padding:clamp(18px,2vw,26px);border-top:0;color:var(--white);
    background:linear-gradient(to top,rgba(8,8,10,.74),rgba(8,8,10,.28) 52%,rgba(8,8,10,0));
  }
  .sy-photo .sy-place{color:rgba(255,255,255,.74)}

  /* -- where you are in the row -------------------------------------------- */
  .sy-dots{display:flex;justify-content:center;align-items:center;gap:8px}
  .sy-dot{
    width:7px;height:7px;padding:0;border-radius:999px;
    background:color-mix(in srgb,var(--ink) 17%,transparent);
    transition:background .45s var(--ease),width .45s var(--ease);
  }
  .sy-dot.is-on{width:24px;background:var(--ink)}

  @media (max-width:760px){
    .sy-card{flex-basis:min(74vw,300px);height:min(78vw,400px)}
  }

  /* ==========================================================================
     second CTA + footer — the reference composition, in Nova's palette:
     a soft limestone-to-ivory wash, centred type, a pill, and the house
     standing on the gradient with its sky cut away
     ========================================================================== */

  .cta2{
    position:relative;overflow:hidden;
    background:var(--white);
    display:grid;justify-items:center;
    padding:clamp(80px,14vh,170px) var(--pad) 0;
    z-index:0;
  }
  .c2-copy{display:grid;justify-items:center;gap:clamp(16px,2.6vh,26px);text-align:center}
  .c2-title{font-size:clamp(32px,5vw,86px);line-height:1.04}
  .c2-lede{
    margin:0;max-width:44ch;
    font-size:15px;line-height:1.78;
    color:color-mix(in srgb,var(--ink) 58%,transparent);
  }

  /* the house stands on the wash, edge to edge: the negative inline margins
     cancel the section padding so the plate reaches the window on both sides */
  .c2-shot{
    margin:clamp(34px,6vh,70px) calc(var(--pad) * -1) 0;
    justify-self:stretch;width:auto;
  }
  .c2-shot img{width:100%;height:auto;display:block}

  /* the scene keeps going behind the footer: the plate fades out into ivory
     and the footer rides up onto that fade, so the two read as one picture */
  .c2-fade{
    position:absolute;left:0;right:0;bottom:0;z-index:1;pointer-events:none;
    height:calc(var(--foot-rise) + clamp(90px,8vw,130px));
    /* solid ivory by the exact line the footer starts on, so every word in it
       sits on a clean field; above that it tapers off over the plate */
    background:linear-gradient(180deg,transparent,var(--white) calc(100% - var(--foot-rise)));
  }
  .c2-copy{position:relative;z-index:2}

  .foot2{
    position:relative;z-index:2;background:transparent;color:var(--ink);
    /* the top of the footer overlaps the fade and must stay see-through;
       everything below the closing section paints its own ivory */
    margin-top:calc(var(--foot-rise) * -1);
    display:grid;gap:clamp(20px,3.4vh,34px);
    padding:clamp(28px,5vh,60px) var(--pad) clamp(20px,3vh,30px);
  }
  .foot2::before{
    content:'';position:absolute;z-index:-1;
    left:0;right:0;top:var(--foot-rise);bottom:0;
    background:var(--white);
  }
  .f2-top{
    display:grid;grid-template-columns:1fr auto;
    gap:clamp(20px,4vw,60px);align-items:center;
  }
  .f2-say{display:grid;gap:7px}
  .f2-title{
    margin:0;font-family:var(--serif);font-weight:400;
    font-size:clamp(24px,2.6vw,40px);line-height:1.1;letter-spacing:-.01em;
  }
  .f2-note{margin:0;font-size:13.5px;color:color-mix(in srgb,var(--ink) 62%,transparent)}

  .f2-form{
    display:flex;align-items:center;gap:8px;
    padding:6px 6px 6px 20px;border-radius:999px;
    background:color-mix(in srgb,var(--stone) 70%,transparent);
    border:1px solid var(--line-soft);
    transition:border-color .5s var(--ease);
  }
  .f2-form:focus-within{border-color:var(--bronze)}
  .f2-form input{
    width:min(220px,40vw);background:transparent;border:0;outline:none;
    font:400 12.5px/1.6 var(--sans);color:var(--ink);
  }
  .f2-form input::placeholder{color:color-mix(in srgb,var(--ink) 42%,transparent)}
  .f2-msg{margin:0;font-size:11px;color:var(--bronze);min-height:0}
  .f2-msg:empty{display:none}

  .f2-base{
    display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;
    padding-top:clamp(16px,2.6vh,26px);border-top:1px solid var(--line-soft);
    font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;
    color:color-mix(in srgb,var(--ink) 62%,transparent);
  }
  .f2-mark{justify-self:center;display:block;height:21px}
  .f2-mark img{height:100%;width:auto;opacity:.75;transition:opacity .5s var(--ease)}
  .f2-mark:hover img{opacity:1}
  .f2-links{justify-self:end;display:flex;gap:clamp(12px,1.8vw,26px)}
  .f2-links a{transition:color .4s var(--ease)}
  .f2-links a:hover{color:var(--ink)}

  @media (max-width:860px){
    .f2-top{grid-template-columns:1fr;gap:clamp(16px,3vh,24px)}
    .f2-form{justify-self:start;width:100%;max-width:340px}
    .f2-form input{width:100%}
    .f2-base{grid-template-columns:1fr;justify-items:start;gap:14px;text-align:left}
    .f2-mark,.f2-links{justify-self:start}
  }

  /* ==========================================================================
     the full-screen viewer
     ========================================================================== */

  body.viewer-open{overflow:hidden}
  .viewer{position:fixed;inset:0;z-index:100;visibility:hidden}
  .viewer-bg{position:absolute;inset:0;background:rgba(9,9,11,.94);opacity:0}
  /* GSAP drives top/left/width/height, so no transform is declared here */
  .viewer-fig{position:absolute;margin:0;overflow:hidden;background:var(--char)}
  .viewer-fig img{width:100%;height:100%;object-fit:cover}
  .viewer-meta{
    position:absolute;left:clamp(20px,5vw,60px);bottom:clamp(18px,3.6vh,38px);
    display:grid;gap:5px;color:var(--white);opacity:0;
  }
  .viewer-name{font-family:var(--serif);font-size:clamp(19px,2vw,32px)}
  .viewer-place{font-size:11.5px;letter-spacing:.26em;text-transform:uppercase;color:rgba(255,255,255,.6)}
  .viewer-close{
    position:absolute;right:clamp(20px,5vw,60px);top:clamp(18px,3.6vh,38px);
    opacity:0;
  }
  .viewer-close i{font-style:normal;font-size:13px}

  /* ==========================================================================
     how a viewing works — a two-tone heading, a link opposite it, three
     numbered columns each sitting on its own rule
     ========================================================================== */

  .steps{
    position:relative;background:var(--mist);
    display:grid;gap:clamp(44px,7vh,90px);
    padding:clamp(80px,14vh,170px) var(--pad);
  }

  .sp-head{
    display:grid;grid-template-columns:1fr auto;
    gap:clamp(18px,3vw,50px) clamp(24px,4vw,70px);
    align-items:end;
  }
  .sp-no{grid-column:1;grid-row:1;align-self:start}
  .sp-no em{font-style:normal;color:var(--bronze)}
  .sp-terms{grid-column:2;grid-row:2;justify-self:end;align-self:end;white-space:nowrap}
  .sp-title{grid-column:1;grid-row:2;font-size:clamp(30px,4.2vw,72px);line-height:1.08}
  /* the second line steps back, the way the reference greys its own */
  .sp-dim{color:color-mix(in srgb,var(--ink) 34%,transparent)}

  .sp-row{
    list-style:none;margin:0;padding:0;
    display:grid;grid-template-columns:repeat(3,1fr);
    gap:clamp(24px,4vw,70px);
  }
  /* the rule is a real element so it can be drawn in, not a border */
  .sp-step{
    position:relative;
    display:grid;gap:clamp(12px,1.8vh,20px);align-content:start;
    padding-top:clamp(18px,2.6vh,28px);
  }
  .sp-rule{
    position:absolute;left:0;right:0;top:0;height:1px;
    background:var(--line);transform-origin:left;
  }
  .sp-n{
    font-family:var(--serif);font-weight:400;
    font-size:clamp(30px,3.2vw,54px);line-height:1;letter-spacing:.01em;
  }
  .sp-name{
    margin:0;font-family:var(--serif);font-weight:400;
    font-size:clamp(19px,1.7vw,27px);line-height:1.2;letter-spacing:-.005em;
  }
  .sp-body{
    margin:0;max-width:40ch;
    font-size:15px;line-height:1.8;
    color:color-mix(in srgb,var(--ink) 58%,transparent);
  }

  @media (max-width:860px){
    .sp-head{grid-template-columns:1fr}
    .sp-terms{grid-column:1;grid-row:3;justify-self:start}
    .sp-row{grid-template-columns:1fr;gap:0}
    .sp-step{padding:clamp(20px,3vh,28px) 0}
    .sp-rule{top:0}
    .sp-body{max-width:none}
  }

  /* ==========================================================================
     the residence page
     ========================================================================== */

  body.is-residence{background:var(--mist)}
  .rs{position:relative}

  /* ---------- hero: plate, paragraph, the name across the bottom ---------- */

  .rs-hero{
    position:relative;
    height:clamp(560px,92svh,980px);
    overflow:hidden;
    background:var(--char);color:var(--white);
    border-radius:0 0 var(--plate-r) var(--plate-r);
  }
  .rs-plate{position:absolute;inset:-4%;margin:0;overflow:hidden}
  .rs-plate img{width:100%;height:100%;object-fit:cover}
  .rs-plate-shade{
    position:absolute;inset:0;pointer-events:none;
    /* the top band is where the nav sits, and some plates are bright sky up
       there — hold the scrim longer so the pills always have ground */
    background:
      linear-gradient(180deg,rgba(8,8,10,.72),rgba(8,8,10,.42) 15%,transparent 42%),
      linear-gradient(0deg,rgba(8,8,10,.78),rgba(8,8,10,.2) 34%,transparent 58%);
  }
  .rs-intro{
    position:absolute;left:clamp(24px,3.4vw,58px);top:clamp(104px,15vh,168px);
    display:grid;gap:14px;max-width:38ch;
    text-shadow:0 1px 20px rgba(8,8,10,.6);
  }
  .rs-eyebrow{color:#C9A46A}
  .rs-lede{
    margin:0;font-size:clamp(14.5px,1.12vw,17px);line-height:1.72;
    color:rgba(255,255,255,.88);
  }
  /* the name spans the plate exactly — textLength, not a vw font-size */
  .rs-name{
    position:absolute;left:clamp(14px,2.2vw,36px);right:clamp(14px,2.2vw,36px);
    bottom:clamp(-14px,-1.4vw,-6px);
    margin:0;line-height:0;
  }
  .rs-name svg{display:block;width:100%;height:auto;overflow:visible}
  .rs-name text{
    font-family:var(--serif);font-weight:400;font-size:176px;
    fill:var(--white);
  }

  /* ---------- the statement ---------------------------------------------- */

  .rs-say{
    display:grid;gap:clamp(24px,4vh,44px);
    padding:clamp(80px,14vh,170px) var(--pad) clamp(50px,8vh,100px);
    max-width:1680px;margin:0 auto;
  }
  .rs-statement{font-size:clamp(28px,3.9vw,66px);max-width:20ch}

  /* ---------- plate beside the account ------------------------------------ */

  .rs-split{
    display:grid;grid-template-columns:.95fr 1.05fr;
    gap:clamp(28px,5vw,90px);align-items:center;
    padding:clamp(30px,6vh,80px) var(--pad);
    max-width:1680px;margin:0 auto;
  }
  /* the plate runs out to the window rather than stopping at the column, so
     the page has an edge to it and the text keeps a readable measure */
  .rs-split-shot{
    margin:0 0 0 calc(var(--pad) * -1);
    overflow:hidden;aspect-ratio:4/5;background:var(--stone);
  }
  .rs-split-shot img{width:100%;height:112%;object-fit:cover}
  .rs-split-text{display:grid;gap:clamp(16px,2.4vh,26px);max-width:52ch}
  .rs-split-text p{
    margin:0;font-size:clamp(15px,1.1vw,17px);line-height:1.85;
    color:color-mix(in srgb,var(--ink) 68%,transparent);
  }

  /* ---------- three frames ------------------------------------------------ */

  .rs-grid{
    display:grid;
    grid-template-columns:repeat(12,1fr);
    gap:clamp(14px,2.2vw,32px);
    padding:clamp(40px,8vh,110px) var(--pad);
    max-width:1680px;margin:0 auto;
    align-items:start;
  }
  .rs-grid figure{margin:0;overflow:hidden;background:var(--stone)}
  .rs-grid img{width:100%;height:100%;object-fit:cover}
  .rs-grid-note{grid-column:1/5;display:grid;gap:14px;align-content:start;padding-top:clamp(8px,3vh,40px)}
  .rs-grid-note p{margin:0;font-size:15px;line-height:1.8;color:color-mix(in srgb,var(--ink) 66%,transparent)}
  /* Two frames at the top, then a wide one that runs off the right edge — the
     eye is walked across the page rather than down a stack of thirds.
     Scoped to .rs-grid on purpose: `.rs-grid figure{margin:0}` above is a class
     AND a type, so a bare `.rs-f2` loses to it and every margin here would
     silently compute to zero. */
  .rs-grid .rs-f1{grid-column:5/10;aspect-ratio:4/5}
  .rs-grid .rs-f2{grid-column:10/13;aspect-ratio:3/4;margin-top:clamp(28px,9vh,120px)}
  .rs-grid .rs-f3{
    grid-column:4/13;aspect-ratio:16/9;
    margin-top:clamp(14px,3vh,40px);margin-right:calc(var(--pad) * -1);
  }

  /* ---------- the file ---------------------------------------------------- */

  /* a spec sheet reads as a sheet: the label column stays put on the left and
     the file itself occupies the page, instead of the two stacking */
  .rs-specs{
    display:grid;
    grid-template-columns:minmax(150px,.5fr) minmax(0,1.7fr);
    grid-template-rows:auto 1fr;
    gap:clamp(20px,3.4vh,40px) clamp(28px,5vw,80px);
    padding:clamp(40px,8vh,110px) var(--pad) clamp(70px,12vh,150px);
    max-width:1680px;margin:0 auto;
    align-items:start;
  }
  .rs-specs > .eyebrow{grid-column:1;grid-row:1}
  .rs-table{
    grid-column:2;grid-row:1/3;
    margin:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
    gap:0 clamp(28px,5vw,90px);
  }
  .rs-row{
    display:flex;align-items:baseline;justify-content:space-between;gap:20px;
    padding:clamp(13px,2vh,20px) 0;border-bottom:1px solid var(--line-soft);
  }
  .rs-row dt{font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--gray)}
  .rs-row dd{margin:0;font-family:var(--serif);font-size:clamp(17px,1.5vw,23px)}
  .rs-ask{grid-column:1;grid-row:2;justify-self:start;align-self:start}

  /* ---------- the rest of the collection ---------------------------------- */

  /* no background of its own: the width is capped like every other section
     here, and painting a colour on a capped box makes it read as a floating
     panel with gutters instead of part of the page */
  .rs-more{
    display:grid;gap:clamp(20px,3.4vh,40px);
    padding:clamp(46px,9vh,120px) var(--pad) clamp(70px,12vh,150px);
    max-width:1680px;margin:0 auto;
  }
  .rs-more-head{
    display:flex;align-items:center;justify-content:space-between;
    gap:20px;flex-wrap:wrap;
  }
  .rs-more-title{font-size:clamp(24px,3vw,48px)}
  .rs-more-grid{
    display:grid;grid-template-columns:repeat(4,minmax(0,1fr));
    gap:clamp(12px,1.6vw,24px);
  }

  /* the same plate language as the index cards: picture, veil, name at the foot */
  .rs-card{
    position:relative;display:block;overflow:hidden;
    aspect-ratio:3/4;border-radius:var(--plate-r);
    background:#cfc7b9;color:var(--white);
  }
  .rs-card-shot{position:absolute;inset:0;display:block;overflow:hidden}
  .rs-card-shot img{
    width:100%;height:100%;object-fit:cover;
    transition:transform 1.1s var(--ease);
  }
  .rs-card:hover .rs-card-shot img{transform:scale(1.045)}
  .rs-card-veil{
    position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(180deg,transparent 34%,rgba(8,8,10,.34) 58%,rgba(8,8,10,.80) 88%,rgba(8,8,10,.84));
  }
  .rs-card-copy{
    position:absolute;left:0;right:0;bottom:0;
    display:grid;gap:5px;
    padding:clamp(14px,1.5vw,22px);
  }
  .rs-card-name{
    font-family:var(--serif);font-weight:400;
    font-size:clamp(17px,1.5vw,25px);line-height:1.1;
    transition:transform .8s var(--ease);
  }
  .rs-card:hover .rs-card-name{transform:translateX(6px)}
  .rs-card-place{
    font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;
    color:rgba(255,255,255,.7);
  }

  @media (max-width:900px){
    .rs-more-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  }
  @media (max-width:460px){
    .rs-more-grid{grid-template-columns:1fr}
    .rs-card{aspect-ratio:4/3}
  }

  @media (max-width:1100px){
    /* once these stack, a bleed is just a photograph falling off the page */
    .rs-split{grid-template-columns:1fr;gap:clamp(24px,5vh,48px)}
    .rs-split-shot{aspect-ratio:4/3;margin-left:calc(var(--pad) * -1);margin-right:calc(var(--pad) * -1)}
    .rs-grid-note{grid-column:1/13}
    .rs-grid .rs-f1{grid-column:1/8}
    .rs-grid .rs-f2{grid-column:8/13;margin-top:0}
    .rs-grid .rs-f3{grid-column:1/13;margin-right:0}
    .rs-specs{grid-template-columns:1fr;grid-template-rows:auto auto auto}
    .rs-specs > .eyebrow{grid-column:1;grid-row:1}
    .rs-table{grid-column:1;grid-row:2}
    .rs-ask{grid-column:1;grid-row:3}
  }

  @media (max-width:860px){
    .rs-hero{height:clamp(480px,78svh,720px)}
    .rs-intro{top:clamp(92px,13vh,130px);max-width:none;right:clamp(18px,4vw,30px)}
    .rs-statement{font-size:clamp(26px,7vw,40px);max-width:none}
    .rs-table{grid-template-columns:1fr}
    .rs-grid .rs-f1,.rs-grid .rs-f2,.rs-grid .rs-f3{grid-column:1/13;margin-top:0;margin-right:0}
  }

  /* ── Hero house: fit the frame, never distort ─────────────────────────────
     The shipped rule sizes the cut-out by HEIGHT (126%) with width:auto, so the
     global img{max-width:100%} clamps the width while the height stands and
     object-fit:fill stretches it. How badly depends on the stage's aspect, so it
     is not a phone problem: at 1024x900 the 1521x1034 photograph renders at ratio
     0.89, and at 390x844 at 0.356. Letting both axes be auto under a max-width
     and a max-height makes the image scale to fit whichever binds first, always
     at its own ratio. Above 1200px the original sizing is left exactly as shipped.
     Caveat: a viewport wider than 1200px but nearly square (e.g. 1280x1024) still
     squashes, because that is the shipped desktop rule. */
  @media (max-width:1200px){
    .hero-house img{
      width:auto;height:auto;
      max-width:125vw;max-height:64%;
      transform:translate(-50%,6%);
    }
  }

  /* ── Mobile hero + nav ────────────────────────────────────────────────────
     Three things go wrong on a narrow frame and all three are here.
     1. The house is sized by HEIGHT (126%) with width:auto, so the global
        img{max-width:100%} clamps its width while the height stands — and
        object-fit:fill then stretches a 1521x1034 photograph into a 370x1038
        box. Size it by width instead and the natural ratio comes back; the width is in vw,
        not %, so it stays put whatever the containing block does.
     2. A full-height stage leaves the grounded house sitting under a sea of
        sky, so the plate is shortened to 78svh. The house is then sized to the
        frame width and lifted off the floor, so the WHOLE building reads at a
        glance instead of a tight crop of its middle.
     3. .nav-links is display:none here, which takes it out of the grid; the
        lockup then claims row 1 / column 3 and auto-placement pushes the
        burger onto a SECOND row. Both are pinned to row 1, logo left,
        burger right. */
  @media (max-width:860px){
    .hero-stage,.hero-frame{height:calc(78svh - var(--plate) * 2)}
    .nav-mark{grid-column:1;grid-row:1;justify-self:start}
    /* The bar is transparent by design. On a narrow screen the display type runs
       straight under it and the lockup and burger stop being readable, so once it
       sticks it gets a scrim in the page's own colour. */
    .nav.is-stuck{background:rgba(240,240,243,.88);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
    .nav.is-stuck.is-dark{background:rgba(14,14,17,.74)}
    .nav-end{grid-column:3;grid-row:1;justify-self:end}
    /* At this size the two bars cross at only 30deg, which reads as a bowtie
       rather than a close icon. Desktop keeps the original shallow angle. */
    body.menu-open .nav-burger i:first-child{transform:translateY(5px) rotate(45deg)}
    body.menu-open .nav-burger i:last-child{transform:translateY(-5px) rotate(-45deg)}
  }
  ```

  ## `script.js`

  ```js
  /* ==========================================================================
     NOVA — motion
     GSAP + ScrollTrigger + Lenis. Every animated transform is owned here; the
     stylesheet never declares one on an element this file touches, so nothing
     is applied twice.
     ========================================================================== */

  (() => {
  'use strict';

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOUCH   = matchMedia('(hover: none)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // A pin measures from wherever the browser restored the scroll position, so
  // always start a reload at the top.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });

  /* ---------------------------------------------------------------- scroller */

  let lenis = null;
  if (!REDUCED) {
    lenis = new Lenis({
      duration: 1.25,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;          // handle for debugging and for host pages
    lenis.stop();
  }

  const scrollTo = (target, opts = {}) => {
    if (lenis) lenis.scrollTo(target, Object.assign({ duration: 1.5 }, opts));
    else if (typeof target === 'number') window.scrollTo(0, target);
    else target.scrollIntoView();
  };

  /* =============================================== 1. the hero comes forward */

  // No cover screen: the page is ivory and scrollable from the first frame. The
  // hero's own parts are held back for the length of one held breath while the
  // three plates decode, so the mask reveal has something to reveal.
  const critical = [
    'images/hero-scene.webp', 'images/hero-cut.webp', 'images/hero-grass.webp',
  ];

  // Run at parse time, before the first paint, so nothing flashes in and then
  // hides itself again when the timeline is built.
  gsap.set(['.hero-house', '.hero-grass', '.hero-glow', '.hero-mark',
            '.hn-statement', '#explore', '.nav'], { autoAlpha: 0 });

  function preload(list) {
    return Promise.all(list.map(src => new Promise(res => {
      const im = new Image();
      im.onload = res; im.onerror = res;
      im.src = src;
    })));
  }

  let introRan = false;
  function intro() {
    if (introRan) return;
    introRan = true;
    if (lenis) lenis.start();

    const tl = gsap.timeline({ onComplete: resync });

    // The mask carries the plate's own corner the whole way open, so the reveal
    // is never a hard-cornered rectangle sitting inside a rounded one. Read the
    // resolved pixel value: clip-path cannot take the clamp() in --hero-r.
    const r = getComputedStyle($('#heroStage')).borderTopLeftRadius || '16px';

    // the photograph arrives through a mask and settles out of a slow push-in
    tl.fromTo('#heroStage',
        { clipPath: 'inset(16% 22% 38% 22% round ' + r + ')' },
        { clipPath: 'inset(0% 0% 0% 0% round ' + r + ')', duration: 1.7, ease: 'expo.inOut' }, .15)
      // The push-in is applied to the LAYER, never to .hero-house img: that img
      // carries the centring and the 9.8% ground offset as percentages, and any
      // GSAP tween on an element bakes its percentages into pixels that go stale
      // on the next resize.
      .fromTo('.hero-scene img', { scale: 1.12 }, { scale: 1, duration: 2.8, ease: 'expo.out' }, .15)
      .fromTo('.hero-house', { scale: 1.06, autoAlpha: 0 },
                             { scale: 1, autoAlpha: 1, duration: 2.4, ease: 'expo.out' }, .3)
      .fromTo('.hero-grass', { yPercent: 18, autoAlpha: 0 },
                            { yPercent: 0, autoAlpha: 1, duration: 2.1, ease: 'expo.out' }, .45)
      .fromTo('.hero-glow', { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, .5)
      // the wordmark rises out from behind the roofline, letters settling in
      .fromTo('.hero-mark', { yPercent: 26, autoAlpha: 0 },
                            { yPercent: 0, autoAlpha: 1, duration: 1.9, ease: 'expo.out' }, .8)
      .fromTo('.hero-mark text', { attr: { textLength: 548 } },
                                 { attr: { textLength: 640 }, duration: 2.2, ease: 'expo.out' }, .8)
      .fromTo('.hn-statement', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, 1.45)
      .fromTo('#explore', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 1.8)
      .fromTo('.nav', { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, 1.1);
  }

  // Whichever comes first: the plates are decoded, or the wait has gone on long
  // enough that holding an empty hero is worse than revealing a half-loaded one.
  function startIntro() {
    Promise.race([
      preload(critical),
      new Promise(r => setTimeout(r, 900)),
    ]).then(intro);
  }

  /* ============================================================== 2. cursor */

  const cursor = $('#cursor');

  if (TOUCH) {
    document.body.classList.add('no-cursor');
  } else {
    const dot   = $('.cursor-dot');
    const label = $('.cursor-label');
    const ring  = $('.cursor-ring');
    const pos   = { x: innerWidth / 2, y: innerHeight / 2 };
    const aim   = { x: pos.x, y: pos.y };
    let shown = false;

    addEventListener('pointermove', e => {
      aim.x = e.clientX; aim.y = e.clientY;
      if (!shown) { shown = true; gsap.to(cursor, { autoAlpha: 1, duration: .5 }); }
    }, { passive: true });

    gsap.ticker.add(() => {
      pos.x += (aim.x - pos.x) * .18;
      pos.y += (aim.y - pos.y) * .18;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    });

    const setLabel = (text) => {
      if (text) {
        label.textContent = text;
        gsap.to(label, { autoAlpha: 1, duration: .35 });
        gsap.to(ring,  { autoAlpha: 1, scale: 1, duration: .5 });
        gsap.to(dot,   { autoAlpha: 0, duration: .3 });
      } else {
        gsap.to(label, { autoAlpha: 0, duration: .3 });
        gsap.to(ring,  { autoAlpha: 0, scale: .6, duration: .4 });
        gsap.to(dot,   { autoAlpha: 1, duration: .3 });
      }
    };
    gsap.set(ring, { scale: .6 });

    const LABELS = [
      ['[data-view]', 'View'],
      ['[data-cursor="discover"]', 'Discover'],
      ['[data-cursor="top"]', 'Top'],
    ];
    /* The cursor label used to be driven purely by pointerenter/pointerleave on
       each target. With Lenis the PAGE moves under a stationary pointer, and the
       browser does not reliably re-fire those boundary events — so the label went
       stale in both directions: stuck on over empty space, or stuck off while
       still over a link. Derive it from whatever is actually under the pointer,
       re-evaluated from STATE (pointer position + scroll offset) rather than from
       events, so a programmatic jump or a pin can't leave it wrong either. */
    const labelFor = (el) => {
      if (!el) return '';
      for (const [sel, text] of LABELS) if (el.closest(sel)) return text;
      return '';
    };
    let labelNow = '', lastLX = -1, lastLY = -1, lastLS = -1;
    gsap.ticker.add(() => {
      const sy = window.scrollY;
      if (aim.x === lastLX && aim.y === lastLY && sy === lastLS) return;
      lastLX = aim.x; lastLY = aim.y; lastLS = sy;
      const want = labelFor(document.elementFromPoint(aim.x, aim.y));
      if (want !== labelNow) { labelNow = want; setLabel(want); }
    });

    // magnetic attraction
    $$('[data-magnetic]').forEach(el => {
      const qx = gsap.quickTo(el, 'x', { duration: .7, ease: 'power3' });
      const qy = gsap.quickTo(el, 'y', { duration: .7, ease: 'power3' });
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * .32);
        qy((e.clientY - (r.top + r.height / 2)) * .42);
      });
      el.addEventListener('pointerleave', () => { qx(0); qy(0); });
    });
  }

  /* ========================================================= 3. nav + menu */

  const nav = $('#nav');

  const menu = $('#menu'), burger = $('#burger'), menuThumb = $('#menuThumb');
  let menuOpen = false;

  const menuTl = gsap.timeline({ paused: true })
    .set(menu, { visibility: 'visible' })
    .fromTo(menu, { clipPath: 'inset(0 0 100% 0)' },
                  { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
    .fromTo('.menu-list a', { yPercent: 105, autoAlpha: 0 },
                  { yPercent: 0, autoAlpha: 1, duration: .9, stagger: .07, ease: 'expo.out' }, .25)
    .fromTo('.menu-view',  { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1 }, .4)
    .fromTo('.menu-foot',  { autoAlpha: 0 }, { autoAlpha: 1, duration: .6 }, .6);

  function toggleMenu(open) {
    menuOpen = open;
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    if (open) { menuTl.play(); if (lenis) lenis.stop(); }
    else { menuTl.reverse().eventCallback('onReverseComplete', () => gsap.set(menu, { visibility: 'hidden' })); if (lenis) lenis.start(); }
  }
  burger.addEventListener('click', () => toggleMenu(!menuOpen));
  $$('.menu-list a').forEach(a => {
    a.addEventListener('pointerenter', () => {
      const src = a.dataset.thumb;
      if (!src || menuThumb.getAttribute('src') === src) return;
      gsap.to(menuThumb, { autoAlpha: 0, duration: .25, onComplete: () => {
        menuThumb.src = src;
        gsap.fromTo(menuThumb, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: .9, scale: 1, duration: .7 });
      }});
    });
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = $(a.getAttribute('href'));
      toggleMenu(false);
      if (t) setTimeout(() => scrollTo(t), 520);
    });
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) toggleMenu(false); });

  // in-page links
  $$('a[href^="#"]').forEach(a => {
    if (a.closest('.menu')) return;
    a.addEventListener('click', e => {
      const t = $(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      scrollTo(t);
    });
  });

  /* =================================================== 4. nav ground state */

  // One evaluator for "what is under the nav line right now". Per-section
  // onToggle triggers race each other on fast scrolls and leave the nav
  // inverted over an ivory section, so they are not used.
  const darkGround = $$('.hero, .film, .depth');
  let bands = [];

  function measureBands() {
    const y = window.scrollY;
    bands = darkGround.map(el => {
      const r = el.getBoundingClientRect();
      return [r.top + y, r.bottom + y];
    });
  }
  measureBands();
  ScrollTrigger.addEventListener('refresh', measureBands);
  addEventListener('load', measureBands);

  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      const y = self.scroll();
      nav.classList.toggle('is-stuck', y > 80);
      const line = y + 64;                               // where the nav sits
      nav.classList.toggle('is-dark', bands.some(([a, b]) => a <= line && b > line));
    },
  });

  /* ================================================== 5. hero: depth + tilt */

  if (!REDUCED) {
    // stop compositing the fixed stage once the page has covered it
    const heroEl = $('.hero');
    ScrollTrigger.create({
      trigger: '.hero', start: 'bottom top',
      onEnter:     () => heroEl.classList.add('is-past'),
      onLeaveBack: () => heroEl.classList.remove('is-past'),
    });

    // Six planes, six speeds. The wordmark lives between the sky and the
    // house, so as it climbs it slides in behind the roofline instead of
    // over it — that only works because the house is a cut-out.
    const heroTl = gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    heroTl.to('.hero-scene',   { y: '4vh',  scale: 1.06, ease: 'none' }, 0)
          .to('.hero-glow',  { y: '2vh',  opacity: .45, ease: 'none' }, 0)
          .to('.hero-mark',  { y: '-26vh', scale: .94, ease: 'none' }, 0)
          // the house gets NO scroll transform at all. Scale grows the 9.8%
          // overhang under it too, which walks the base off the ground; the
          // depth is carried by the plate, the wordmark and the interface.
          .to('.hero-grass',  { y: '-17vh', scale: 1.14, x: '1.4vw', ease: 'none' }, 0)
          .to('.hero-shade', { opacity: .55, ease: 'none' }, 0);

    // the interface leaves at its own rates
    // fromTo, not to: a scrubbed gsap.to() records its start value the first time
    // it renders, which is while the intro still has these at autoAlpha:0. Scrolling
    // back up then reverses to THAT — permanently hidden copy. Pinning the start
    // state explicitly fixes it; immediateRender:false keeps the intro's own
    // hidden-then-reveal intact on first load.
    gsap.fromTo('.hn-statement', { y: 0, autoAlpha: 1 }, {
      y: '-12vh', autoAlpha: 0, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: true },
    });
    gsap.fromTo('.hn-pill', { y: 0, autoAlpha: 1 }, {
      y: '8vh', autoAlpha: 0, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '40% top', scrub: true },
    });

    // pointer parallax: the further forward the plane, the more it answers
    if (!TOUCH) {
      // [element, sideways, vertical, tilt] — the house gets no vertical
      // travel at all, so the pointer can never lift it off the ground
      const planes = [
        [$('.hero-scene'),  7,  3,  .2 ],
        [$('.hero-mark'),  14,  6,  0  ],
        [$('.hero-house'),  0,  0,   0 ],   /* no pointer sway on the house */
        [$('.hero-grass'), 44, 16,  .85],
      ].map(([el, shift, lift, tilt]) => ({
        shift, lift, tilt,
        qx: gsap.quickTo(el, 'x', { duration: 1.3, ease: 'power3' }),
        qy: gsap.quickTo(el, 'y', { duration: 1.3, ease: 'power3' }),
        ry: gsap.quickTo(el, 'rotationY', { duration: 1.3, ease: 'power3' }),
      }));
      $('.hero').addEventListener('pointermove', e => {
        const nx = (e.clientX / innerWidth - .5) * 2;
        const ny = (e.clientY / innerHeight - .5) * 2;
        planes.forEach(p => { p.qx(-nx * p.shift); p.qy(-ny * p.lift); p.ry(nx * p.tilt); });
      }, { passive: true });
      $('.hero').addEventListener('pointerleave', () => planes.forEach(p => { p.qx(0); p.qy(0); p.ry(0); }));
    }
  }

  /* ======================================== 6. hover-to-explore (reversible) */

  {
    const btn  = $('#explore');
    const badge = $('.hn-pill-badge');
    let ring = null;

    const target = () => $('#about');

    // the pill's own fill is the global button hover now; the dwell timer that
    // carries you down the page is held on the badge instead
    const engage = () => {
      gsap.to(badge, { rotate: 45, duration: .6 });
      ring = gsap.to({}, {
        duration: .9,
        onComplete: () => scrollTo(target(), { duration: 1.9 }),
      });
    };
    const release = () => {
      if (ring) { ring.kill(); ring = null; }
      gsap.to(badge, { rotate: 0, duration: .5 });
    };

    if (TOUCH || REDUCED) {
      btn.addEventListener('click', () => scrollTo(target(), { duration: 1.6 }));
    } else {
      btn.addEventListener('pointerenter', engage);
      btn.addEventListener('pointerleave', release);
      btn.addEventListener('click', () => { release(); scrollTo(target(), { duration: 1.6 }); });
    }
  }

  /* ================================================= 7. reveals, everywhere */

  // Every reveal runs both ways: scrolling back up past the trigger point plays
  // it in reverse, so a section you return to arrives again rather than sitting
  // there already finished. The exit is quicker than the entrance — a reveal
  // wants to be savoured, an un-reveal only wants to get out of the way.
  const BOTH_WAYS = 'play none none reverse';

  function revealLines(scope) {
    $$('.ln > i', scope).forEach(i => {
      // the intro and the pinned sequences own their own lines
      gsap.fromTo(i, { yPercent: 116 }, {
        yPercent: 0, duration: 1.25, ease: 'expo.out',
        scrollTrigger: { trigger: i.parentElement, start: 'top 88%', toggleActions: BOTH_WAYS },
      });
    });
  }
  function revealBlocks() {
    $$('.reveal-up, .line').forEach(el => {
      if (el.closest('.hero')) return;
      gsap.fromTo(el, { y: 26, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 1.15,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: BOTH_WAYS },
      });
    });
  }

  if (REDUCED) {
    gsap.set('.ln > i, .reveal-up, .line', { clearProps: 'all' });
  } else {
    revealLines(document);
    revealBlocks();
  }

  // a sentence that fills in word by word as it comes up the screen: every word
  // starts dim and is brought to full ink on scrub, so the tail of the sentence
  // is still grey while the head has already landed.
  $$('[data-fill]').forEach(el => {
    const wrap = node => {
      if (node.nodeType === 3) {
        if (!node.nodeValue.trim()) return;
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach(part => {
          if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span');
          w.className = 'w';
          w.textContent = part;
          frag.appendChild(w);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !node.classList.contains('w')) {
        Array.from(node.childNodes).forEach(wrap);
      }
    };
    Array.from(el.childNodes).forEach(wrap);

    const words = $$('.w', el);
    if (REDUCED) { gsap.set(words, { opacity: 1 }); return; }
    gsap.to(words, {
      opacity: 1, ease: 'none', stagger: 1, duration: 1,
      // a fixed distance, not the height of the sentence: a three-line block
      // otherwise fills in under 400px of scroll and the effect is over before
      // it has been noticed
      scrollTrigger: { trigger: el, start: 'top 86%', end: '+=90%', scrub: .5 },
    });
  });

  // figure with an image that drifts inside a still frame
  $$('[data-inner]').forEach(img => {
    if (REDUCED) return;
    const amt = parseFloat(img.dataset.inner) || .15;
    gsap.fromTo(img, { yPercent: -amt * 100 * .5 }, {
      yPercent: amt * 100 * .5, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // headline lines that also slide sideways, each at its own rate, so a block
  // of type reads as several planes rather than one
  $$('[data-drift]').forEach(el => {
    if (REDUCED) return;
    const d = parseFloat(el.dataset.drift);
    gsap.fromTo(el, { x: d }, {
      x: -d, ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: .8 },
    });
  });

  // section heads and stat columns drift against their own section. These are
  // wrappers on purpose: the reveal tweens own `y` on the elements inside them.
  $$('.sec-head').forEach((el, i) => {
    if (REDUCED) return;
    gsap.fromTo(el, { y: 40 }, {
      y: -40 - i * 8, ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ================================================= 9. gallery + the viewer */

  if (!REDUCED) {
    $$('.gal-item').forEach((fig, i) => {
      const mask = $('.gal-mask', fig), img = $('img', fig);
      gsap.fromTo(mask, { clipPath: 'inset(0% 0% 100% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.out',
        scrollTrigger: { trigger: fig, start: 'top 86%' },
      });
      gsap.fromTo(img, { scale: 1.16 }, {
        scale: 1, duration: 1.8, ease: 'expo.out',
        scrollTrigger: { trigger: fig, start: 'top 86%' },
      });
      // each frame drifts at its own rate inside its mask, and the odd ones
      // also slide sideways — six speeds instead of one
      gsap.fromTo(img, { yPercent: -8 - (i % 3) * 3, xPercent: (i % 2 ? 2.5 : -2.5) }, {
        yPercent: 8 + (i % 3) * 3, xPercent: (i % 2 ? -2.5 : 2.5), ease: 'none',
        scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      // the caption travels a little faster than the picture it belongs to.
      // it is on screen the whole time now, so the drift is kept small enough
      // that it still reads as attached to its plate
      gsap.fromTo($('figcaption', fig), { y: 12 }, {
        y: -12, ease: 'none',
        scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      fig.addEventListener('pointerenter', () => gsap.to(img, { scale: 1.035, duration: 1.1 }));
      fig.addEventListener('pointerleave', () => gsap.to(img, { scale: 1, duration: 1.1 }));
    });
  }

  {
    const viewer = $('#viewer'), fig = $('.viewer-fig'), vimg = $('#viewerImg');
    const vbg = $('.viewer-bg'), vname = $('#viewerName'), vplace = $('#viewerPlace');
    const vclose = $('#viewerClose');
    let openFrom = null, busy = false;

    const place = r => gsap.set(fig, { top: r.top, left: r.left, width: r.width, height: r.height });

    function open(source) {
      if (busy) return; busy = true;
      openFrom = source;
      const src = source.dataset.src || $('img', source).src;
      vimg.src = src;
      vname.textContent  = source.dataset.name  || '';
      vplace.textContent = source.dataset.place || '';
      const r = ($('img', source) || source).getBoundingClientRect();

      viewer.style.visibility = 'visible';
      viewer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('viewer-open');
      if (lenis) lenis.stop();
      place(r);

      const pad = Math.min(innerWidth, innerHeight) * .06;
      gsap.timeline({ onComplete: () => { busy = false; } })
        .to(vbg, { opacity: 1, duration: .7 }, 0)
        .to(fig, {
          top: pad, left: pad, width: innerWidth - pad * 2, height: innerHeight - pad * 2,
          duration: 1.05, ease: 'expo.inOut',
        }, 0)
        .to(['.viewer-meta', '.viewer-close'], { autoAlpha: 1, duration: .5, stagger: .05 }, .55);
    }

    function close() {
      if (busy || !openFrom) return; busy = true;
      const back = ($('img', openFrom) || openFrom).getBoundingClientRect();
      gsap.timeline({
        onComplete: () => {
          viewer.style.visibility = 'hidden';
          viewer.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('viewer-open');
          if (lenis) lenis.start();
          openFrom = null; busy = false;
        },
      })
        .to(['.viewer-meta', '.viewer-close'], { autoAlpha: 0, duration: .3 }, 0)
        .to(fig, { top: back.top, left: back.left, width: back.width, height: back.height,
                   duration: .95, ease: 'expo.inOut' }, .05)
        .to(vbg, { opacity: 0, duration: .6 }, .35);
    }

    $$('[data-view]').forEach(el => el.addEventListener('click', e => {
      e.preventDefault();
      open(el);
    }));
    vclose.addEventListener('click', close);
    $('.viewer-bg').addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && openFrom) close(); });
  }

  /* ================================================ 10. horizontal journey */

  if (!REDUCED) {
    const track = $('#jrTrack');
    const distance = () => Math.max(0, track.scrollWidth - innerWidth);

    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.journey',
        start: 'top top',
        end: () => '+=' + (distance() + innerHeight * .6),
        scrub: .7,
        pin: '.jr-pin',
        invalidateOnRefresh: true,
      },
    });

    // inside each frame the photograph slides the other way, so the panels have
    // depth of their own while the track travels
    $$('.jr-shot img').forEach(img => gsap.fromTo(img, { xPercent: -6 }, {
      xPercent: 6, ease: 'none',
      scrollTrigger: { trigger: '.journey', start: 'top top',
                       end: () => '+=' + (distance() + innerHeight * .6), scrub: .7 },
    }));

    // neighbours react, very slightly, to the card under the pointer
    $$('.jr-card').forEach((p, i, all) => {
      p.addEventListener('pointerenter', () => {
        const prev = all[i - 1], next = all[i + 1];
        if (prev) gsap.to(prev, { x: -8, duration: .9 });
        if (next) gsap.to(next, { x: 8, duration: .9 });
        gsap.to($('.jr-shot img', p), { scale: 1.04, duration: 1.1 });
      });
      p.addEventListener('pointerleave', () => {
        const prev = all[i - 1], next = all[i + 1];
        if (prev) gsap.to(prev, { x: 0, duration: .9 });
        if (next) gsap.to(next, { x: 0, duration: .9 });
        gsap.to($('.jr-shot img', p), { scale: 1, duration: 1.1 });
      });
    });
  }

  /* ============================= 12. residences index — alternating plates */

  // Each plate wipes open from the edge it bleeds off, so the reveal reads as
  // the picture arriving from outside the page rather than fading in place.
  if (!REDUCED) {
    $$('.rx-item').forEach((item, i) => {
      const frame = $('.rx-frame', item);
      if (!frame) return;
      // odd items bleed off the left edge, so their picture arrives from the
      // left: collapse the right inset, not the left one
      const bleedsLeft = i % 2 === 0;
      gsap.fromTo(frame,
        { clipPath: bleedsLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 84%', toggleActions: BOTH_WAYS } });
    });
  }

  /* ============================================= 13. the reviews carousel */

  // A native snap scroller, so touch and trackpads work without a library. The
  // dots are built from the cards, so the count can never drift out of step
  // with the markup.
  {
    const row  = $('#syRow');
    const dots = $('#syDots');

    if (row) {
      const cards = $$('.sy-card', row);

      const step = () => {
        if (!cards.length) return row.clientWidth;
        const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
        return cards[0].getBoundingClientRect().width + gap;
      };

      const maxLeft = () => row.scrollWidth - row.clientWidth;

      // A dot per resting position, not per card. The row runs out of scroll
      // before the last cards can reach the left edge, so one-dot-per-card
      // leaves the final dots permanently unlit and lying about where you are.
      const reach = () => {
        const s = step();
        return Math.max(1, s ? Math.ceil(maxLeft() / s) + 1 : 1);
      };

      const current = () => {
        const s = step();
        return s ? Math.min(reach() - 1, Math.round(row.scrollLeft / s)) : 0;
      };

      const pips = cards.map((card, i) => {
        if (!dots) return null;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'sy-dot';
        b.setAttribute('aria-label', 'Review ' + (i + 1) + ' of ' + cards.length);
        b.addEventListener('click', () => {
          row.scrollTo({ left: Math.min(i * step(), maxLeft()), behavior: 'smooth' });
          grab(9000);
        });
        dots.appendChild(b);
        return b;
      });

      const sync = () => {
        const n = Math.min(pips.length, reach());
        const at = current();
        pips.forEach((p, i) => {
          if (!p) return;
          p.hidden = i >= n;
          p.classList.toggle('is-on', i === at);
        });
      };

      row.addEventListener('scroll', sync, { passive: true });
      addEventListener('resize', sync);
      sync();

      /* -- and it walks itself ------------------------------------------- */
      // One card every few seconds while the section is on screen, back to the
      // first when it runs out.
      //
      // The clock is gsap.ticker, not setInterval: rAF stops on a hidden tab, so
      // the walk pauses there for free, and Chrome's intensive throttling of
      // background timers never gets a say.
      //
      // Hovering is NOT an interruption. A reader's cursor rests over the middle
      // of the page the whole time they are reading it, and a vertical wheel
      // aimed at the page arrives here too — pausing on either froze the row
      // permanently. Only a deliberate hand on the row stops it: a press, a
      // sideways flick, a focused card, an arrow.
      const PERIOD = 4200;
      let held = false, idle = null, waited = 0;

      // One evaluator, read every frame. An onToggle that sets a flag never
      // fires when the page is loaded already inside the section — a reload
      // part-way down, or a restored scroll position — and the row then sits
      // still forever.
      const onScreen = ScrollTrigger.create({
        trigger: '.say', start: 'top 85%', end: 'bottom 15%',
      });

      const atEnd   = () => row.scrollLeft >= row.scrollWidth - row.clientWidth - 2;
      const advance = () => atEnd()
        ? row.scrollTo({ left: 0, behavior: 'smooth' })
        : row.scrollBy({ left: step(), behavior: 'smooth' });

      if (!REDUCED) gsap.ticker.add((time, dt) => {
        if (held || !onScreen.isActive) { waited = 0; return; }
        waited += dt;
        if (waited >= PERIOD) { waited = 0; advance(); }
      });

      const hold    = () => { held = true; clearTimeout(idle); };
      const release = wait => { clearTimeout(idle); idle = setTimeout(() => { held = false; }, wait); };
      const grab    = wait => { hold(); release(wait); };

      row.addEventListener('focusin',  hold);
      row.addEventListener('focusout', () => release(3000));
      ['touchstart', 'pointerdown'].forEach(
        t => row.addEventListener(t, () => grab(7000), { passive: true }));
      // a sideways wheel is aimed at the row; a vertical one is aimed at the page
      row.addEventListener('wheel',
        e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) grab(6000); }, { passive: true });
    }
  }

  /* ============================================= 14. how a viewing works */

  // Each column arrives as a unit: its rule draws in from the left, then the
  // number, the name and the copy lift under it. Columns follow one another,
  // so the eye is walked 01 → 02 → 03 rather than shown all three at once.
  if (!REDUCED) {
    const steps = $$('.sp-step');
    if (steps.length) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.sp-row', start: 'top 82%', toggleActions: BOTH_WAYS },
      });

      steps.forEach((step, i) => {
        const at = i * 0.16;
        tl.fromTo($('.sp-rule', step), { scaleX: 0 },
                  { scaleX: 1, duration: 1.1, ease: 'expo.out' }, at)
          .fromTo([$('.sp-n', step), $('.sp-name', step), $('.sp-body', step)],
                  { y: 22, autoAlpha: 0 },
                  { y: 0, autoAlpha: 1, duration: .95, stagger: .07 }, at + 0.18);
      });
    }
  }

  /* ====================================== 16. the film — five plates, pinned */

  // A plain cross-fade. The stage pins, scroll picks the frame, and each plate
  // fades to the next — no shader, no displacement, no colour split.
  {
    const shots = $$('.fl-shot');
    const caps  = $$('.fl-cap');

    if (shots.length && !REDUCED) {
      // The follow-on plates hold their URL in data-src so nothing but the
      // first costs anything at page load. `loading="lazy"` is no good here:
      // inside the pinned stage all five count as in view at once, so the
      // browser defers them until the sequence is already running and the
      // frames arrive blank. Load them outright, a screen before the pin.
      ScrollTrigger.create({
        trigger: '.film', start: 'top bottom+=80%', once: true,
        onEnter: () => shots.forEach(s => {
          if (s.dataset.src) { s.src = s.dataset.src; delete s.dataset.src; }
        }),
      });

      ScrollTrigger.create({
        trigger: '.film', start: 'top top', end: 'bottom bottom',
        pin: '.fl-stage', pinSpacing: false,
        onUpdate: self => {
          const k = clamp(Math.round(self.progress * (shots.length - 1)), 0, shots.length - 1);
          shots.forEach((s, i) => s.classList.toggle('is-on', i === k));
          caps.forEach((c, i)  => c.classList.toggle('is-on', i === k));
          gsap.set('#filmBar', { scaleX: self.progress });
        },
      });
    }
  }

  /* ======================================= 16b. depth scene — layered plates */

  if (!REDUCED) {
    const dp = gsap.timeline({
      scrollTrigger: { trigger: '.depth', start: 'top bottom', end: 'bottom top', scrub: .6 },
    });
    // six elements, six speeds: the ground moves most, the sky barely at all
    dp.fromTo('.dp-far',        { yPercent: -8 },  { yPercent: 10,  ease: 'none' }, 0)
      .fromTo('.dp-type-back',  { yPercent: 60 },  { yPercent: -70, ease: 'none' }, 0)
      .fromTo('.dp-mid',        { yPercent: 14 },  { yPercent: -16, ease: 'none' }, 0)
      .fromTo('.dp-type-front', { yPercent: 130 }, { yPercent: -150, ease: 'none' }, 0)
      .fromTo('.dp-near',       { yPercent: 26 },  { yPercent: -34, ease: 'none' }, 0)
      .fromTo('.dp-note',       { y: 90, autoAlpha: 0 }, { y: -60, autoAlpha: 1, ease: 'none' }, 0);

    ScrollTrigger.create({
      trigger: '.depth', start: 'top top', end: 'bottom bottom',
      pin: '.dp-stage', pinSpacing: false,
    });

    // the layers also answer the pointer, at the same three depths
    if (!TOUCH) {
      const st = $('.dp-stage');
      const moves = [
        [$('.dp-far'), 6], [$('.dp-mid'), 14], [$('.dp-near'), 26],
        [$('.dp-type-back'), 10], [$('.dp-type-front'), 20],
      ].map(([el, amp]) => ({ amp, q: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }) }));
      st.addEventListener('pointermove', e => {
        const n = (e.clientX / innerWidth - .5) * 2;
        moves.forEach(m => m.q(-n * m.amp));
      }, { passive: true });
      st.addEventListener('pointerleave', () => moves.forEach(m => m.q(0)));
    }
  }

  /* ================================================ 17. scroll-speed response */

  if (!REDUCED) {
    const skewables = $$('.gal-mask img, .jr-shot img');
    const setters = skewables.map(el => gsap.quickSetter(el, 'skewY', 'deg'));
    let last = 0, vel = 0;

    ScrollTrigger.create({
      onUpdate: self => { vel = clamp(self.getVelocity() / 260, -1.1, 1.1); },
    });
    gsap.ticker.add(() => {
      last += (vel - last) * .12;
      if (Math.abs(last) < .002) return;
      setters.forEach(s => s(last));
    });
  }

  /* ================================================== 17. newsletter (local) */

  {
    const form = $('#newsForm'), msg = $('#newsMsg');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = $('input', form);
      const ok = /.+@.+\..+/.test(input.value.trim());
      msg.textContent = ok
        ? 'Noted — the next quarterly goes out in January.'
        : 'That address does not look complete.';
      gsap.fromTo(msg, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: .5 });
      if (ok) input.value = '';
    });
  }

  /* ------------------------------------------------------------------ boot */

  // Lenis caches the scroll limit. The page grows after boot (pin spacers,
  // images, the webfont), and a stale limit silently makes the last sections
  // unreachable by wheel — so re-measure whenever the document height moves.
  function resync() {
    ScrollTrigger.refresh();
    if (lenis) lenis.resize();
  }
  ScrollTrigger.addEventListener('refresh', () => { if (lenis) lenis.resize(); });

  let lastHeight = 0;
  function watchHeight() {
    const h = document.documentElement.scrollHeight;
    if (Math.abs(h - lastHeight) < 4) return;
    lastHeight = h;
    resync();
  }
  new ResizeObserver(watchHeight).observe(document.documentElement);
  addEventListener('load', watchHeight);
  if (document.fonts) document.fonts.ready.then(watchHeight);
  // the last images and the webfont can land seconds in; poll briefly so a late
  // growth can never leave the tail of the page unreachable
  let ticks = 0;
  const settle = setInterval(() => { watchHeight(); if (++ticks > 12) clearInterval(settle); }, 500);

  addEventListener('resize', resync);
  startIntro();

  // If an image never resolves and the race above somehow never settles, the
  // hero must not stay hidden.
  setTimeout(intro, 3000);

  // The intro always STARTS, but it plays on requestAnimationFrame. Inside an
  // embedded preview or a background tab the ticker is throttled to a crawl, so
  // the copy and the button can sit at autoAlpha:0 long enough to read as a
  // broken hero. If they are still hidden after 5s and the page has not been
  // scrolled, snap the hero to its resting state.
  setTimeout(function () {
    var s = $('.hn-statement');
    if (!s || getComputedStyle(s).visibility !== 'hidden') return;
    if ((window.scrollY || 0) > 10) return;
    var r2 = getComputedStyle($('#heroStage')).borderTopLeftRadius || '16px';
    gsap.set('#heroStage', { clipPath: 'inset(0% 0% 0% 0% round ' + r2 + ')' });
    gsap.set('.hero-scene img', { scale: 1 });
    gsap.set(['.hero-house', '.hero-grass', '.hero-glow', '.hero-mark',
              '.hn-statement', '#explore', '.nav'],
             { autoAlpha: 1, y: 0, yPercent: 0, scale: 1 });
    gsap.set('.hero-mark text', { attr: { textLength: 640 } });
    if (typeof resync === 'function') resync();
  }, 5000);

  })();
  ```
