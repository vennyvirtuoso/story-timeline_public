# MASTER PROMPT — Long Take 12 — Festival of unbroken cinema, Tallinn
### Plain HTML, CSS and JavaScript. No WordPress, no page builder, no framework, no build step.

## ▶ HOW TO USE THIS PROMPT

**Paste this whole document into Claude. Nothing to attach.** It carries the complete source of the site plus the address of every image, so Claude can assemble a folder that owns its own assets and hand it back as a zip.

**INSTRUCTION TO CLAUDE — BUILD IT, DO NOT ASK.** Every decision is already made in this document. Do not stop to ask the user questions, do not offer options, and do not ask for confirmation before starting. Write the files, zip them, hand over the archive, then report what you built.

1. Create a folder named `longtake` and write out every file in the appendix below **exactly as written** — do not reformat, rename, shorten, reorder or "improve" anything. The only exception is the delivery-only PAGE SPEED step below, which must not change how the page looks or moves.
2. **Download the 15 images into `assets/`.** The code already points at `assets/…` — nothing in it references a remote host. Run this from inside the folder; it reads the ASSET MANIFEST at the end of this document:

   ```bash
   mkdir -p assets
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-01-projector-beam.jpg' -o 'assets/01-projector-beam.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-02-night-tram.jpg' -o 'assets/02-night-tram.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-03-usher-torch.jpg' -o 'assets/03-usher-torch.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-04-faces-in-the-light.jpg' -o 'assets/04-faces-in-the-light.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-05-ferry-deck.jpg' -o 'assets/05-ferry-deck.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-06-attendant-booth.jpg' -o 'assets/06-attendant-booth.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-07-counting-coins.jpg' -o 'assets/07-counting-coins.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-08-rooftop-storm.jpg' -o 'assets/08-rooftop-storm.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-09-falconer-moor.jpg' -o 'assets/09-falconer-moor.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-10-forest-road.jpg' -o 'assets/10-forest-road.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-11-waiting-room-singer.jpg' -o 'assets/11-waiting-room-singer.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-12-tidal-flats.jpg' -o 'assets/12-tidal-flats.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-13-glasshouse-night.jpg' -o 'assets/13-glasshouse-night.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-14-crossing-above.jpg' -o 'assets/14-crossing-above.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-15-threading-film.jpg' -o 'assets/15-threading-film.jpg'
   ```

   Then check every file arrived and none is a zero-byte or HTML error page:

   ```bash
   ls assets | wc -l             # expect 15 files
   find assets -size -1k         # expect no output
   ```

   If any download fails, retry it — the host is occasionally slow. Do **not** fall back to hotlinking the remote URL: the whole point is a folder that works offline.

3. **PAGE SPEED — target 90+ in Lighthouse, mobile AND desktop.** Apply these to the files in the folder. They are delivery changes only: the page must still look and move px-to-px like the original.
   - **Images → WebP.** For every JPG/PNG photo in `assets/`: convert to WebP (quality ≈ 78; PNG with transparency keeps its alpha), resized to at most **2× its largest displayed width** (never wider than the original, cap 1600 px). Use `cwebp` if installed, otherwise Python Pillow (`pip install pillow` if needed), otherwise macOS `sips -s format webp`. Replace the old path in every HTML/CSS/JS file (`grep -rn 'assets/<name>.jpg'` must then find nothing), then delete the JPG/PNG. Leave SVG, GIF, video, fonts and 3D models as they are. If no converter works, keep the originals and say so in your report.
   - **Image sizes and lazy loading.** Every `<img>` gets `width` and `height` equal to its file's pixel size. Images outside the first screen get `loading="lazy" decoding="async"`; the one largest image in the first screen gets `loading="eager" fetchpriority="high"`. Do not add `<link rel="preload" as="image">`.
   - **Scripts.** Add `defer` to every external `<script src>` (not to `type="module"`, which is already deferred; never `async` for a library another script uses). Any inline `<script>` that calls those libraries runs inside `document.addEventListener('DOMContentLoaded', …)` so the order still holds. A heavy library used only by a section below the first screen (slider, map, 3D further down) is loaded by a small `IntersectionObserver` (`rootMargin: '300px'`) that appends its `<script>` when that section approaches the screen.
   - **CSS and fonts.** Keep the one stylesheet as a normal `<link rel="stylesheet">` in `<head>` — it is the only render-blocking file allowed. Preload the 1–2 font files the first screen's headline and body text use (`<link rel="preload" as="font" type="font/woff2" crossorigin>`), keep `font-display: swap`, and drop font families or weights the page never uses. Google Fonts links get `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin) and `display=swap`.
   - **First screen visible at load.** Nothing in the first screen starts at `opacity: 0` (CSS or a GSAP `from`) — use `0.01` so the browser can measure it; there is no plugin doing this for you here.
   - **Pinned scroll sections.** If a section in or right after the first screen is pinned with ScrollTrigger (`pin: true` with pin spacing), the next section jumps down when the pin is created — a large layout shift. Reserve that scroll distance in CSS from the first paint (a class on `<html>` that adds the same space) and remove the class in the same script run that creates the pins, then `ScrollTrigger.refresh()`.
   - **Measure.** Serve the folder (`python3 -m http.server 8000` from inside it) and, if Google Chrome is available, run `npx lighthouse http://localhost:8000 --only-categories=performance` and again with `--preset=desktop`, twice each. Report Performance, FCP, LCP, TBT, CLS and Speed Index. If a run is under 90, fix the cause named under "Avoid long main-thread tasks" / "Layout shift culprits". If Lighthouse cannot run here, say so and tell the user to test the deployed URL at https://pagespeed.web.dev/. When it is deployed, any static host with compression (gzip/brotli) and long cache headers for `assets/` (Netlify, Vercel, Cloudflare Pages) keeps the score.
   **For Long Take:** download the fifteen prepared WebP stills and apply edits W1–W16 from the `PAGE SPEED BUILD` section instead of converting the photos yourself; keep `<html class="is-booting">`; change nothing else unless your measurement is under 90. Follow the `PAGE SPEED BUILD` section (before the ASSET MANIFEST) exactly instead of re-deriving it.
4. **Zip that folder and give the user the archive.** Its contents:

   ```
   longtake/
     index.html
     script.js
     style.css
     assets/
       01-projector-beam.jpg
       02-night-tram.jpg
       03-usher-torch.jpg
       04-faces-in-the-light.jpg
       … 11 more images
   ```

   ```bash
   zip -r longtake.zip longtake -x '*.DS_Store'
   ```

   Then hand over `longtake.zip` as a file the user can download, not as text in the chat.
5. Before handing it over, serve the folder and confirm it runs:

   ```bash
   cd longtake && python3 -m http.server 8000     # then open http://localhost:8000
   ```

   Check the page renders, the images load from `assets/` with the network throttled or offline, and scrolling drives the animations.

The finished folder needs no network for its images — they are in `assets/`; only the motion libraries load from a CDN.
Do not rebuild the design from the description below. The description is there so a person can understand and edit the code. The appendix is the deliverable.

---

## ▶ WHAT YOU GET

Long Take is a ten-night festival for films shot without a cut. Forty-two screenings across six Tallinn venues, 5–14 March 2027.

**3 code files plus an `assets/` folder holding 15 images, delivered as `longtake.zip`.**

| File | What it is |
|---|---|
| `index.html` | a page, 16 KB |
| `script.js` | the script, 21 KB |
| `style.css` | the stylesheet, 17 KB |
| `assets/` | 15 images, downloaded at build time |

**Libraries, from a CDN, already referenced in the HTML:** `gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js`. No npm install, no bundler, no framework.

**Sections (4):** `#hero` · `#programme` · `#films` · `#passes`.

---

## ▶ WHERE THE MEDIA COMES FROM

All 15 files (15 images) live in `assets/` inside the folder, and every reference in the markup, the CSS and the script is a relative `assets/…` path. Once the folder is assembled it owns its own media: no CDN, no media library, no external image host. Open it on a laptop with the wifi off and it still renders.

They are fetched **once, at build time**, from the WordPress media library on `demo.uichemy.com` — the same `longtake__` files the WordPress build of this page uses. That is only how they travel into the folder; nothing in the delivered code points back at that host. Replacing an image means dropping a new file into `assets/` under the same name.

The manifest at the end of this document lists every source URL against the filename it is saved as, so the download step is reproducible and checkable.

---

## ▶ HOW THE MOTION IS PUT TOGETHER

Nearly every visual effect is scroll-driven: 33 GSAP calls and 5 ScrollTrigger attachments.

- Reveals generally run both ways, so scrolling back up replays them in reverse rather than leaving them finished.
- Pinned sections own their scroll distance in the markup, so the document height is authored rather than grown by script.
- `prefers-reduced-motion` is honoured: every animated block checks it and falls back to the finished state, so the page stays readable with motion off.
- The numbers are inline — durations, eases, stagger, parallax speeds. There is no config layer and no control panel; it is plain GSAP.

---

## ▶ DESIGN TOKENS

Everything is driven from custom properties at the top of the stylesheet:

`--ink` `--paper` `--accent` `--ink-2` `--paper-2` `--paper-60` `--ink-60` `--rule` `--rule-ink` `--lt-display` (renamed from `--display`, see T1–T12) `--sans` `--label` `--gut`

Fonts load from `https://fonts.googleapis.com`, `https://fonts.gstatic.com`.

---

## ▶ WHAT THIS PROMPT DELIBERATELY DOES NOT CONTAIN

- No WordPress, no page builder, and none of the wrapper classes or compatibility CSS a builder needs. The WordPress build is a separate prompt.
- No framework, no TypeScript, no bundler, no `package.json`.
- No backend. Any form here validates and replies in place; it posts nowhere.
- No CMS. The content lives in the files.
- No external image host. The images ship inside the zip; nothing in the code calls out to a media library at runtime.

---

## PAGE SPEED BUILD — Long Take (from the tested WordPress build; overrides the matching appendix parts)

The same changes measured on demo.uichemy.com (WordPress build, 8 Oct 2026):

| Google PageSpeed Insights | Before (live demo, 8 Oct, 3 runs) | Tested build (3 runs) | Live demo after the change (3 runs) |
|---|---|---|---|
| Mobile score | 91 / 70 / 69 (median **70**) | 91 / 95 / 96 (median **95**) | 93 / 95 / 93 (median **93**) |
| Desktop score | 91 / 97 / 97 (median **97**) | 98 / 99 / 99 (median **99**) | 98 / 98 / 97 (median **98**) |
| Largest Contentful Paint (mobile) | 1.6 / 6.0 / 6.3 s | 2.6–3.2 s | 2.7–2.9 s |
| Speed Index (mobile) | 5.2–9.1 s | 3.1–3.8 s | 3.6–4.4 s |
| Total Blocking Time (mobile) | 20–40 ms | 0–30 ms | 0–20 ms |
| Cumulative Layout Shift | ≤ 0.006 | ≤ 0.001 | ≤ 0.001 |
| Image weight (15 stills) | 3,737 KB (JPG, up to 1952 px) | 1,344 KB (WebP) | same |

The slow mobile runs on the old demo were caused by the hero stills: they sit under the opening gate, loaded late (272 KB for the first one) and painted under the gate, which made them the page's Largest Contentful Paint at 6 s. The opening gate's own animation (kept unchanged) is what still sets the mobile Speed Index.

Same design, copy, sections and motion. Nothing visible changes. Section positions and heights were identical at 1425 × 900 and 412 × 823. Element boxes, opacity and visibility were identical at 16 desktop and 15 phone scroll positions through the programme pin, the competition stack and the pass turn (the only difference is the CSS-blinking clock colon). The gate (button and Enter key), the four nav links, the hero hover pixel replay and the pass flip all behaved the same. Phone widths 360–430 showed no overflow, and the Elementor editor (Desktop / Tablet / Mobile) showed the same page with the same motion. 0 console errors.

### A · Download the prepared WebP stills

Run inside the folder after step 2, then delete the 15 replaced file(s) from `assets/`:

```bash
mkdir -p assets
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-01-projector-beam.webp' -o 'assets/01-projector-beam.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-02-night-tram.webp' -o 'assets/02-night-tram.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-03-usher-torch.webp' -o 'assets/03-usher-torch.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-04-faces-in-the-light.webp' -o 'assets/04-faces-in-the-light.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-05-ferry-deck.webp' -o 'assets/05-ferry-deck.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-06-attendant-booth.webp' -o 'assets/06-attendant-booth.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-07-counting-coins.webp' -o 'assets/07-counting-coins.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-08-rooftop-storm.webp' -o 'assets/08-rooftop-storm.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-09-falconer-moor.webp' -o 'assets/09-falconer-moor.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-10-forest-road.webp' -o 'assets/10-forest-road.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-11-waiting-room-singer.webp' -o 'assets/11-waiting-room-singer.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-12-tidal-flats.webp' -o 'assets/12-tidal-flats.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-13-glasshouse-night.webp' -o 'assets/13-glasshouse-night.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-14-crossing-above.webp' -o 'assets/14-crossing-above.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/longtake-fast__img-15-threading-film.webp' -o 'assets/15-threading-film.webp'
rm -f 'assets/01-projector-beam.jpg' 'assets/02-night-tram.jpg' 'assets/03-usher-torch.jpg' 'assets/04-faces-in-the-light.jpg' 'assets/05-ferry-deck.jpg' 'assets/06-attendant-booth.jpg' 'assets/07-counting-coins.jpg' 'assets/08-rooftop-storm.jpg' 'assets/09-falconer-moor.jpg' 'assets/10-forest-road.jpg' 'assets/11-waiting-room-singer.jpg' 'assets/12-tidal-flats.jpg' 'assets/13-glasshouse-night.jpg' 'assets/14-crossing-above.jpg' 'assets/15-threading-film.jpg'
```

| Replaces | WebP | width × height | Alt text (unchanged) |
|---|---|---|---|
| `assets/01-projector-beam.jpg` | `assets/01-projector-beam.webp` | 1672 × 941 | A projector beam cutting through haze above empty cinema seats |
| `assets/02-night-tram.jpg` | `assets/02-night-tram.webp` | 860 × 361 | The inside of a night tram, snow streaking past the windows |
| `assets/03-usher-torch.jpg` | `assets/03-usher-torch.webp` | 420 × 525 | An usher holding a torch in a dark cinema aisle |
| `assets/04-faces-in-the-light.jpg` | `assets/04-faces-in-the-light.webp` | 600 × 400 | A row of audience faces lit by the screen |
| `assets/05-ferry-deck.jpg` | `assets/05-ferry-deck.webp` | 1586 × 992 | Passengers on a ferry deck at first light, the sea flat and grey |
| `assets/06-attendant-booth.jpg` | `assets/06-attendant-booth.webp` | 1122 × 1402 | A car-park attendant in a lit booth at night |
| `assets/07-counting-coins.jpg` | `assets/07-counting-coins.webp` | 1122 × 1402 | Hands counting coins under a desk lamp |
| `assets/08-rooftop-storm.jpg` | `assets/08-rooftop-storm.webp` | 1586 × 992 | Two people on a flat roof under a building storm |
| `assets/09-falconer-moor.jpg` | `assets/09-falconer-moor.webp` | 1672 × 941 | A falconer on an open moor with a bird on the glove, wind flattening the grass |
| `assets/10-forest-road.jpg` | `assets/10-forest-road.webp` | 1600 × 662 | Headlights on a snowy forest road at night, seen from the driver's seat |
| `assets/11-waiting-room-singer.jpg` | `assets/11-waiting-room-singer.webp` | 1600 × 661 | A woman singing while standing in a crowded municipal waiting room |
| `assets/12-tidal-flats.jpg` | `assets/12-tidal-flats.webp` | 1600 × 662 | A lone figure walking across wet tidal flats at dusk |
| `assets/13-glasshouse-night.jpg` | `assets/13-glasshouse-night.webp` | 1600 × 662 | A figure among rows of plants inside a glasshouse at night |
| `assets/14-crossing-above.jpg` | `assets/14-crossing-above.webp` | 1600 × 662 | A busy street crossing seen from high above, people criss-crossing |
| `assets/15-threading-film.jpg` | `assets/15-threading-film.webp` | 780 × 1001 | A projectionist's hands threading film through a projector gate |

### B · Edit the code — exact find → replace (each find occurs exactly once in each file named)

**W1 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/01-projector-beam.jpg"
```

replace with:

```html
data-src="assets/01-projector-beam.webp"
```

**W2 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/02-night-tram.jpg"
```

replace with:

```html
data-src="assets/02-night-tram.webp"
```

**W3 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/03-usher-torch.jpg"
```

replace with:

```html
data-src="assets/03-usher-torch.webp"
```

**W4 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/04-faces-in-the-light.jpg"
```

replace with:

```html
data-src="assets/04-faces-in-the-light.webp"
```

**W5 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/05-ferry-deck.jpg"
```

replace with:

```html
data-src="assets/05-ferry-deck.webp"
```

**W6 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/06-attendant-booth.jpg"
```

replace with:

```html
data-src="assets/06-attendant-booth.webp"
```

**W7 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/07-counting-coins.jpg"
```

replace with:

```html
data-src="assets/07-counting-coins.webp"
```

**W8 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/08-rooftop-storm.jpg"
```

replace with:

```html
data-src="assets/08-rooftop-storm.webp"
```

**W9 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/09-falconer-moor.jpg"
```

replace with:

```html
data-src="assets/09-falconer-moor.webp"
```

**W10 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/10-forest-road.jpg"
```

replace with:

```html
data-src="assets/10-forest-road.webp"
```

**W11 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/11-waiting-room-singer.jpg"
```

replace with:

```html
data-src="assets/11-waiting-room-singer.webp"
```

**W12 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/12-tidal-flats.jpg"
```

replace with:

```html
data-src="assets/12-tidal-flats.webp"
```

**W13 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/13-glasshouse-night.jpg"
```

replace with:

```html
data-src="assets/13-glasshouse-night.webp"
```

**W14 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/14-crossing-above.jpg"
```

replace with:

```html
data-src="assets/14-crossing-above.webp"
```

**W15 · `index.html`** — find (occurs exactly once in it):

```html
data-src="assets/15-threading-film.jpg"
```

replace with:

```html
data-src="assets/15-threading-film.webp"
```

**W16 · `index.html`** — find (occurs exactly once in it):

```html
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,300..400&family=Schibsted+Grotesk:wght@400;500&display=swap" rel="stylesheet">
```

replace with:

```html
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..500&family=Schibsted+Grotesk:wght@400;500&display=swap" rel="stylesheet">
  <script>
    // page speed: the italic Newsreader faces are only used further down (programme and competition headings). They are added on the
    // first wheel / touch / click / key, or 3 s after load, so they never compete with the first screen or hold up the gate (it waits for document.fonts.ready).
    (function () { var done = false, ev = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
      function add() { if (done) return; done = true; ev.forEach(function (e) { removeEventListener(e, add, true); });
        var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,300..400&display=swap'; document.head.appendChild(l); }
      ev.forEach(function (e) { addEventListener(e, add, { capture: true, passive: true }); });
      addEventListener('load', function () { setTimeout(add, 3000); }); })();
  </script>
```

Afterwards `grep -rn "01\-projector\-beam\.jpg\|02\-night\-tram\.jpg\|03\-usher\-torch\.jpg\|04\-faces\-in\-the\-light\.jpg\|05\-ferry\-deck\.jpg\|06\-attendant\-booth\.jpg\|07\-counting\-coins\.jpg\|08\-rooftop\-storm\.jpg\|09\-falconer\-moor\.jpg\|10\-forest\-road\.jpg\|11\-waiting\-room\-singer\.jpg\|12\-tidal\-flats\.jpg\|13\-glasshouse\-night\.jpg\|14\-crossing\-above\.jpg\|15\-threading\-film\.jpg" .` must find nothing.

### C · Everything else stays exactly as the appendix

Keep `<html class="is-booting">` exactly as written: it keeps the hero stills under the gate from painting before `script.js` takes them over, which is what made the old demo slow on phones. Leave `script.js`, `style.css`, the gate and all motion as written. Measure as in step 3; if a run is under 90, fix only the cause the report names.

### P · Live-demo parity (exact find → replace in the appendix `style.css`; checked against the live demo on 8 Oct 2026)

**T1–T12:** the live demo calls the display-font token `--lt-display` (WordPress/Elementor reserves `--display` for its containers); apply the rename (one definition and eleven uses) so this build uses the same names as the demo. Afterwards no `var(--display)` may remain. **T13–T14:** the live demo's text reset gives paragraphs and list items `line-height: 1.5`; these two edits reproduce the two places where that shows (the clock labels and the Passes price rows). Nothing else changes against the demo.

**T1 · `style.css`** — find (occurs exactly once):

```css
--display: 'Newsreader', Georgia, serif;
```

replace with:

```css
--lt-display: 'Newsreader', Georgia, serif;
```

**T2 · `style.css`** — find (occurs exactly once):

```css
display: flex; font: 300 clamp(64px, 12vw, 200px)/1 var(--display); letter-spacing: -.02em; padding: .05em .03em .07em;
```

replace with:

```css
display: flex; font: 300 clamp(64px, 12vw, 200px)/1 var(--lt-display); letter-spacing: -.02em; padding: .05em .03em .07em;
```

**T3 · `style.css`** — find (occurs exactly once):

```css
.nav__mark { font: 400 21px/1 var(--display); letter-spacing: -.01em; background: var(--ink); color: var(--paper); padding: 9px 12px 8px; }
```

replace with:

```css
.nav__mark { font: 400 21px/1 var(--lt-display); letter-spacing: -.01em; background: var(--ink); color: var(--paper); padding: 9px 12px 8px; }
```

**T4 · `style.css`** — find (occurs exactly once):

```css
font: 300 clamp(52px, 8.4vw, 160px)/.98 var(--display); text-align: center; letter-spacing: -.025em;
```

replace with:

```css
font: 300 clamp(52px, 8.4vw, 160px)/.98 var(--lt-display); text-align: center; letter-spacing: -.025em;
```

**T5 · `style.css`** — find (occurs exactly once):

```css
align-self: center; font: 200 min(62svh, 30vw)/.85 var(--display); letter-spacing: -.03em;
```

replace with:

```css
align-self: center; font: 200 min(62svh, 30vw)/.85 var(--lt-display); letter-spacing: -.03em;
```

**T6 · `style.css`** — find (occurs exactly once):

```css
.panel__h { font: 300 clamp(44px, 5.6vw, 104px)/.98 var(--display); letter-spacing: -.02em; margin: 14px 0 16px; }
```

replace with:

```css
.panel__h { font: 300 clamp(44px, 5.6vw, 104px)/.98 var(--lt-display); letter-spacing: -.02em; margin: 14px 0 16px; }
```

**T7 · `style.css`** — find (occurs exactly once):

```css
.films__title { font: 300 clamp(52px, 6.6vw, 124px)/.98 var(--display); letter-spacing: -.025em; }
```

replace with:

```css
.films__title { font: 300 clamp(52px, 6.6vw, 124px)/.98 var(--lt-display); letter-spacing: -.025em; }
```

**T8 · `style.css`** — find (occurs exactly once):

```css
.film__num { position: absolute; left: 24px; top: 16px; z-index: 4; font: 300 clamp(40px, 3.6vw, 60px)/1 var(--display); font-variant-numeric: lining-nums; color: rgba(255,255,255,.6); }
```

replace with:

```css
.film__num { position: absolute; left: 24px; top: 16px; z-index: 4; font: 300 clamp(40px, 3.6vw, 60px)/1 var(--lt-display); font-variant-numeric: lining-nums; color: rgba(255,255,255,.6); }
```

**T9 · `style.css`** — find (occurs exactly once):

```css
.film__t { font: 300 clamp(34px, 3.6vw, 62px)/1 var(--display); letter-spacing: -.015em; }
```

replace with:

```css
.film__t { font: 300 clamp(34px, 3.6vw, 62px)/1 var(--lt-display); letter-spacing: -.015em; }
```

**T10 · `style.css`** — find (occurs exactly once):

```css
.pass__p { font: 300 clamp(56px, 6.4vw, 104px)/.9 var(--display); font-variant-numeric: lining-nums; margin-top: 10px; }
```

replace with:

```css
.pass__p { font: 300 clamp(56px, 6.4vw, 104px)/.9 var(--lt-display); font-variant-numeric: lining-nums; margin-top: 10px; }
```

**T11 · `style.css`** — find (occurs exactly once):

```css
font: 300 9vw/1 var(--display); letter-spacing: -.025em;
```

replace with:

```css
font: 300 9vw/1 var(--lt-display); letter-spacing: -.025em;
```

**T12 · `style.css`** — find (occurs exactly once):

```css
.foot__word text { font: 300 229px var(--display); letter-spacing: -.02em; fill: var(--ink); }
```

replace with:

```css
.foot__word text { font: 300 229px var(--lt-display); letter-spacing: -.02em; fill: var(--ink); }
```

**T13 · `style.css`** — the live demo sets paragraph and list-item line height to 1.5 (its WordPress text reset), so the three small labels under each clock are 18px tall, not 16.8px; find (occurs exactly once):

```css
.clock__sub { display: flex; gap: 18px; font: 400 12px/1.4 var(--label); }
```

replace with:

```css
.clock__sub { display: flex; gap: 18px; font: 400 12px/1.4 var(--label); }
.clock__sub > p { line-height: 1.5; }
```

**T14 · `style.css`** — same reset: the four price rows in Passes use line height 1.5 on the live demo (the section is 3px taller); find (occurs exactly once):

```css
.finale__list li { display: flex; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--rule); padding-bottom: 8px; }
```

replace with:

```css
.finale__list li { display: flex; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--rule); padding-bottom: 8px; line-height: 1.5; }
```

## ASSET MANIFEST — download these into `assets/`

Source is the media library on `demo.uichemy.com`. Save each one under the name in the second column; the code already refers to it by that name.

| Download from | Save as | Alt text |
|---|---|---|
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-01-projector-beam.jpg` | `assets/01-projector-beam.jpg` | A projector beam cutting through haze above empty cinema seats |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-02-night-tram.jpg` | `assets/02-night-tram.jpg` | The inside of a night tram, snow streaking past the windows |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-03-usher-torch.jpg` | `assets/03-usher-torch.jpg` | An usher holding a torch in a dark cinema aisle |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-04-faces-in-the-light.jpg` | `assets/04-faces-in-the-light.jpg` | A row of audience faces lit by the screen |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-05-ferry-deck.jpg` | `assets/05-ferry-deck.jpg` | Passengers on a ferry deck at first light, the sea flat and grey |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-06-attendant-booth.jpg` | `assets/06-attendant-booth.jpg` | A car-park attendant in a lit booth at night |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-07-counting-coins.jpg` | `assets/07-counting-coins.jpg` | Hands counting coins under a desk lamp |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-08-rooftop-storm.jpg` | `assets/08-rooftop-storm.jpg` | Two people on a flat roof under a building storm |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-09-falconer-moor.jpg` | `assets/09-falconer-moor.jpg` | A falconer on an open moor with a bird on the glove, wind flattening the grass |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-10-forest-road.jpg` | `assets/10-forest-road.jpg` | Headlights on a snowy forest road at night, seen from the driver's seat |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-11-waiting-room-singer.jpg` | `assets/11-waiting-room-singer.jpg` | A woman singing while standing in a crowded municipal waiting room |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-12-tidal-flats.jpg` | `assets/12-tidal-flats.jpg` | A lone figure walking across wet tidal flats at dusk |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-13-glasshouse-night.jpg` | `assets/13-glasshouse-night.jpg` | A figure among rows of plants inside a glasshouse at night |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-14-crossing-above.jpg` | `assets/14-crossing-above.jpg` | A busy street crossing seen from high above, people criss-crossing |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/longtake__img-15-threading-film.jpg` | `assets/15-threading-film.jpg` | A projectionist's hands threading film through a projector gate |


---

# APPENDIX · VERBATIM SOURCE

The complete source of every file. **Write them out exactly** — do not change a value, a comment, a class name, or the order of a declaration. Recreate this file layout:

```
index.html
script.js
style.css
```

## `index.html`

```html
<!doctype html>
<html lang="en" class="is-booting">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Long Take 12 — Festival of unbroken cinema, Tallinn</title>
  <meta name="description" content="Long Take is a ten-night festival for films shot without a cut. Forty-two screenings across six Tallinn venues, 5–14 March 2027.">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230b0b0b'/%3E%3Crect x='9' y='9' width='14' height='14' fill='%23ff2d95'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,300..400&family=Schibsted+Grotesk:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=4">
</head>
<body>

  <!-- Gate: a window opens on the dark house, the title draws, the reader walks in -->
  <div class="gate" id="gate" aria-hidden="false">
    <div class="gate__window">
      <figure class="slot slot--dark slot--cap-top" data-slot="01" data-src="assets/01-projector-beam.jpg" data-alt="A projector beam cutting through haze above empty cinema seats" style="--ratio: 16/9">
        <figcaption>01 · Projector beam over empty seats · 16:9</figcaption>
      </figure>
    </div>
    <div class="gate__mark">
      <i class="gate__rule gate__rule--top"></i>
      <div class="gate__mask">
        <p class="gate__word" aria-label="Long Take">
          <span><b>L</b></span><span><b>o</b></span><span><b>n</b></span><span><b>g</b></span><span class="gate__gap"><b>&nbsp;</b></span><span><b>T</b></span><span><b>a</b></span><span><b>k</b></span><span><b>e</b></span>
        </p>
      </div>
      <i class="gate__rule gate__rule--bottom"></i>
    </div>
    <div class="gate__foot">
      <div class="rise"><span>Twelfth edition · 42 films</span></div>
      <button class="gate__go rise" id="gateGo" type="button"><span>Enter the festival <em>→</em></span></button>
      <div class="rise"><span>Tallinn · 5–14 March 2027</span></div>
    </div>
  </div>

  <header class="nav" id="nav">
    <a class="nav__mark" href="#top">Long Take <sup>12</sup></a>
    <nav class="nav__links" aria-label="Sections">
      <a href="#programme">Programme</a>
      <a href="#films">Competition</a>
      <a href="#passes" class="nav__cta">Passes</a>
    </nav>
  </header>

  <main id="top">

    <!-- 1 · Hero: the title and the stills resolve out of coarse blocks -->
    <section class="hero" id="hero">
      <p class="hero__kicker mono">(International festival of unbroken cinema)</p>
      <h1 class="hero__title" aria-label="Ten nights of cinema without a cut">
        <span class="hero__line" aria-hidden="true"><span class="hero__txt">Ten nights</span></span>
        <span class="hero__line" aria-hidden="true"><span class="hero__txt">of cinema</span></span>
        <span class="hero__line" aria-hidden="true"><span class="hero__txt">without a cut</span></span>
      </h1>

      <figure class="slot hero__still hero__still--a" data-slot="02" data-src="assets/02-night-tram.jpg" data-alt="The inside of a night tram, snow streaking past the windows" style="--ratio: 2.39/1">
        <figcaption>02 · Night tram in snow · 2.39:1</figcaption>
      </figure>
      <figure class="slot hero__still hero__still--b" data-slot="03" data-src="assets/03-usher-torch.jpg" data-alt="An usher holding a torch in a dark cinema aisle" style="--ratio: 4/5">
        <figcaption>03 · Usher with a torch · 4:5</figcaption>
      </figure>
      <figure class="slot hero__still hero__still--c" data-slot="04" data-src="assets/04-faces-in-the-light.jpg" data-alt="A row of audience faces lit by the screen" style="--ratio: 3/2">
        <figcaption>04 · Faces in the screen light · 3:2</figcaption>
      </figure>

      <div class="hero__meta">
        <p class="mono">Tallinn · 5–14 March 2027<br>Six venues · forty-two screenings</p>
        <p class="mono hero__rule">One rule: the camera never stops.</p>
        <a class="mono hero__cue" href="#programme">The programme <i></i></a>
      </div>
    </section>

    <!-- 2 · Programme — the screening clock (signature) -->
    <section class="day" id="programme" aria-label="Programme highlights, by screening time">
      <div class="day__stage">
        <div class="day__track">

          <article class="clock" data-clock>
            <div class="clock__inner">
              <p class="clock__kicker mask"><span>Thursday 5 March · Harbour Cinema</span></p>
              <p class="clock__time" aria-label="19:30">19<em>:</em>30</p>
              <div class="clock__sub"><p class="mask"><span>(01)</span></p><p class="mask"><span>Opening night</span></p><p class="mask"><span>142 minutes, one shot</span></p></div>
            </div>
          </article>

          <article class="panel" data-panel>
            <div class="panel__img">
              <figure class="slot slot--dark" data-slot="05" data-src="assets/05-ferry-deck.jpg" data-alt="Passengers on a ferry deck at first light, the sea flat and grey" style="--ratio: 16/10">
                <figcaption>05 · Ferry deck at first light · 16:10</figcaption>
              </figure>
            </div>
            <div class="panel__copy">
              <p class="mono">Ilse Maran · Estonia · 142 min</p>
              <h2 class="panel__h">The Salt<br>Road</h2>
              <p class="panel__p">A night ferry from Tallinn to Stockholm, filmed from gangway to gangway without the camera ever stopping.</p>
            </div>
          </article>

          <article class="clock clock--light" data-clock>
            <div class="clock__inner">
              <p class="clock__kicker mask"><span>Friday 6 March · The Salt Store</span></p>
              <p class="clock__time" aria-label="14:15">14<em>:</em>15</p>
              <div class="clock__sub"><p class="mask"><span>(02)</span></p><p class="mask"><span>Documentary</span></p><p class="mask"><span>96 minutes, two takes</span></p></div>
            </div>
          </article>

          <article class="panel panel--split" data-panel>
            <div class="panel__img">
              <figure class="slot slot--dark" data-slot="06" data-src="assets/06-attendant-booth.jpg" data-alt="A car-park attendant in a lit booth at night" style="--ratio: 4/5">
                <figcaption>06 · Attendant in a lit booth · 4:5</figcaption>
              </figure>
            </div>
            <div class="panel__img panel__img--b">
              <figure class="slot slot--dark" data-slot="07" data-src="assets/07-counting-coins.jpg" data-alt="Hands counting coins under a desk lamp" style="--ratio: 4/5">
                <figcaption>07 · Hands counting coins · 4:5</figcaption>
              </figure>
            </div>
            <div class="panel__copy">
              <p class="mono">Tomasz Hładki · Poland · 96 min</p>
              <h2 class="panel__h">Night shift<br>at Lot 9</h2>
            </div>
          </article>

          <article class="clock" data-clock>
            <div class="clock__inner">
              <p class="clock__kicker mask"><span>Saturday 7 March · The Ninth Screen</span></p>
              <p class="clock__time" aria-label="22:40">22<em>:</em>40</p>
              <div class="clock__sub"><p class="mask"><span>(03)</span></p><p class="mask"><span>Midnight slot</span></p><p class="mask"><span>118 minutes, one shot</span></p></div>
            </div>
          </article>

          <article class="panel" data-panel>
            <div class="panel__img">
              <figure class="slot slot--dark" data-slot="08" data-src="assets/08-rooftop-storm.jpg" data-alt="Two people on a flat roof under a building storm" style="--ratio: 16/10">
                <figcaption>08 · Two on a roof before a storm · 16:10</figcaption>
              </figure>
            </div>
            <div class="panel__copy">
              <p class="mono">Ayo Okafor-Lind · Sweden, Nigeria · 118 min</p>
              <h2 class="panel__h">Weather<br>for two</h2>
              <p class="panel__p">An argument on a roof that outlasts the rain, the light and the patience of the neighbours.</p>
            </div>
          </article>

          <article class="clock clock--accent" data-clock>
            <div class="clock__inner">
              <p class="clock__kicker mask"><span>Saturday 14 March · Harbour Cinema</span></p>
              <p class="clock__time" aria-label="20:00">20<em>:</em>00</p>
              <div class="clock__sub"><p class="mask"><span>(04)</span></p><p class="mask"><span>Closing night</span></p><p class="mask"><span>164 minutes, one shot</span></p></div>
            </div>
          </article>

          <article class="panel panel--wide" data-panel>
            <div class="panel__img">
              <figure class="slot slot--dark" data-slot="09" data-src="assets/09-falconer-moor.jpg" data-alt="A falconer on an open moor with a bird on the glove, wind flattening the grass" style="--ratio: 16/9">
                <figcaption>09 · Falconer on the moor · 16:9</figcaption>
              </figure>
            </div>
            <div class="panel__copy">
              <p class="mono">Mireille Duval · France · 164 min</p>
              <h2 class="panel__h">Kestrel,<br>kestrel</h2>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- 3 · Competition — five numbered cards that stack -->
    <section class="films" id="films">
      <header class="films__head">
        <p class="mono">(In competition · five films)</p>
        <h2 class="films__title">Five films.<br><em>Not one cut.</em></h2>
        <p class="films__lede">Each title below was shot as a single take, or as a handful of takes joined in plain sight. The jury watches them in order, on consecutive nights.</p>
      </header>
      <div class="stack" id="stack">
        <article class="film">
          <div class="film__body">
            <figure class="slot slot--dark" data-slot="10" data-src="assets/10-forest-road.jpg" data-alt="Headlights on a snowy forest road at night, seen from the driver's seat" style="--ratio: 2.42/1">
              <figcaption>10 · Forest road, headlights · 2.42:1</figcaption>
            </figure>
            <p class="film__num">01</p>
            <div class="film__info">
              <h3 class="film__t">Ninety minutes north</h3>
              <p class="film__m mono">Karin Vesk · Estonia, Finland · 91 min · longest take 91:00</p>
            </div>
          </div>
        </article>
        <article class="film">
          <div class="film__body">
            <figure class="slot slot--dark" data-slot="11" data-src="assets/11-waiting-room-singer.jpg" data-alt="A woman singing while standing in a crowded municipal waiting room" style="--ratio: 2.42/1">
              <figcaption>11 · Singer in a waiting room · 2.42:1</figcaption>
            </figure>
            <p class="film__num">02</p>
            <div class="film__info">
              <h3 class="film__t">The waiting room opera</h3>
              <p class="film__m mono">Paolo Ienco · Italy · 104 min · longest take 52:10</p>
            </div>
          </div>
        </article>
        <article class="film">
          <div class="film__body">
            <figure class="slot slot--dark" data-slot="12" data-src="assets/12-tidal-flats.jpg" data-alt="A lone figure walking across wet tidal flats at dusk" style="--ratio: 2.42/1">
              <figcaption>12 · Tidal flats at dusk · 2.42:1</figcaption>
            </figure>
            <p class="film__num">03</p>
            <div class="film__info">
              <h3 class="film__t">Low tide, late</h3>
              <p class="film__m mono">Hana Morikawa · Japan · 88 min · longest take 88:00</p>
            </div>
          </div>
        </article>
        <article class="film">
          <div class="film__body">
            <figure class="slot slot--dark" data-slot="13" data-src="assets/13-glasshouse-night.jpg" data-alt="A figure among rows of plants inside a glasshouse at night" style="--ratio: 2.42/1">
              <figcaption>13 · Glasshouse at night · 2.42:1</figcaption>
            </figure>
            <p class="film__num">04</p>
            <div class="film__info">
              <h3 class="film__t">Glass orchard</h3>
              <p class="film__m mono">Sade Adebayo · Nigeria, UK · 112 min · longest take 37:45</p>
            </div>
          </div>
        </article>
        <article class="film">
          <div class="film__body">
            <figure class="slot slot--dark" data-slot="14" data-src="assets/14-crossing-above.jpg" data-alt="A busy street crossing seen from high above, people criss-crossing" style="--ratio: 2.42/1">
              <figcaption>14 · Street crossing from above · 2.42:1</figcaption>
            </figure>
            <p class="film__num">05</p>
            <div class="film__info">
              <h3 class="film__t">Everything at once</h3>
              <p class="film__m mono">Lukas Brenner · Austria · 127 min · longest take 127:00</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 4 · Passes — a card rises through the split headline and turns over -->
    <section class="finale" id="passes" aria-label="Festival passes">
      <p class="finale__kicker mono">(Passes on sale 12 January)</p>
      <div class="finale__run" id="finaleRun">
        <div class="finale__rail">
          <div class="pass" id="pass">
            <div class="pass__turn" id="passTurn">
              <div class="pass__face pass__face--front">
                <figure class="slot slot--dark" data-slot="15" data-src="assets/15-threading-film.jpg" data-alt="A projectionist's hands threading film through a projector gate" style="--ratio: 0.78/1">
                  <figcaption>15 · Threading the projector · 0.78:1</figcaption>
                </figure>
              </div>
              <a class="pass__face pass__face--back" href="mailto:passes@longtake.film?subject=Festival%20pass" tabindex="-1">
                <span class="pass__k">Festival pass</span>
                <span class="pass__p">€96</span>
                <span class="pass__l">Ten nights<br>Forty-two films<br>Every venue</span>
                <span class="pass__go">Book a pass →</span>
              </a>
            </div>
          </div>
        </div>
        <h2 class="finale__title" aria-label="One take. No cuts. All in.">
          <span class="cl" aria-hidden="true"><span class="cl__w">One</span><span class="cl__w">take</span></span>
          <span class="cl" aria-hidden="true"><span class="cl__w">No</span><span class="cl__w">cuts</span></span>
          <span class="cl" aria-hidden="true"><span class="cl__w">All</span><span class="cl__w">in</span></span>
        </h2>
      </div>
      <div class="finale__foot">
        <ul class="finale__list mono">
          <li><span>Festival pass</span><span>€96</span></li>
          <li><span>Five-film strip</span><span>€40</span></li>
          <li><span>Single screening</span><span>€9</span></li>
          <li><span>Students, 65+ and jobseekers</span><span>half price</span></li>
        </ul>
        <div class="finale__acts">
          <a class="btn btn--accent" href="mailto:passes@longtake.film?subject=Festival%20pass">Book a pass <em>→</em></a>
          <a class="btn" href="#programme">Back to the programme</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="foot">
    <div class="foot__cols">
      <p class="mono">Harbour Cinema · Sadama 21<br>The Salt Store · Soola 4<br>The Ninth Screen · Telliskivi 60</p>
      <p class="mono">Box office 12:00 – 22:00<br>Every festival day</p>
      <p class="mono"><a href="mailto:hello@longtake.film">hello@longtake.film</a><br>+372 600 1212</p>
    </div>
    <svg class="foot__word" viewBox="0 0 1000 236" aria-label="Long Take"><text x="500" y="178" text-anchor="middle">Long Take</text></svg>
    <p class="foot__base mono"><span>© 2027 Long Take festival, Tallinn</span><span>Shot in one take</span></p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js"></script>
  <script defer src="script.js?v=5"></script>
</body>
</html>

```

## `script.js`

```js
// LONG TAKE — motion engine.
// Every duration / ease / distance below is a measured value
// (_reference/motion/SPEC-longtake.md and SPEC-page1.md); markup, copy and art are original to this page.

(() => { // own scope: loaded as a classic script so the page also runs when index.html is opened from disk
const { gsap, ScrollTrigger, Lenis } = window;
gsap.registerPlugin(ScrollTrigger);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const html = document.documentElement;
const params = new URLSearchParams(location.search);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const phone = () => window.innerWidth <= 760;

// cubic-bezier as a GSAP ease (where the measured curve was a CSS bezier)
const bezier = (x1, y1, x2, y2) => (x) => {
  if (x <= 0) return 0; if (x >= 1) return 1;
  let lo = 0, hi = 1, t = x;
  for (let i = 0; i < 24; i++) { t = (lo + hi) / 2; const bx = 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t * t * x2 + t ** 3; if (bx < x) lo = t; else hi = t; }
  return 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t * t * y2 + t ** 3;
};
const EASE_MASK = bezier(0.215, 0.61, 0.355, 1); // gate + chapter masks, 1.2 s

// ─────────── Smooth scroll: a notch loses 0.095 of the remaining gap per 60 Hz frame (settles ~1.08 s) ───────────
const lenis = new Lenis({ lerp: 0.1, smoothWheel: !reduced, syncTouch: false }); // 0.1 = −ln(1 − 0.095)
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
ScrollTrigger.addEventListener('refresh', () => lenis.resize());
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ─────────── Image slots: placeholder until img/ holds the file ───────────
// Motion always targets the figure (or a wrapper), never the <img>, so it behaves the same either way.
const slots = $$('.slot[data-src]');
function fillSlot(fig) {
  const probe = new Image();
  probe.decoding = 'async';
  probe.onload = () => {
    const img = document.createElement('img');
    img.src = probe.src; img.alt = fig.dataset.alt || '';
    img.decoding = 'async';
    fig.prepend(img); fig.classList.add('is-filled'); fig._img = img;
  };
  probe.src = fig.dataset.src; // on error the placeholder simply stays
}
// A worker asks the server which files exist first (a one-byte range request), so an empty img/ folder costs no 404s in the
// page console; where that cannot run (file://, old browsers) every slot is probed directly.
function whichExist(urls) {
  return new Promise((resolve) => {
    let w;
    const fallback = () => { try { w && w.terminate(); } catch (e) {} resolve(null); };
    try {
      const code = 'onmessage=async(e)=>{const o={};await Promise.all(e.data.map(async(u)=>{try{const r=await fetch(u,{headers:{Range:"bytes=0-0"},cache:"no-store"});await r.arrayBuffer();o[u]=r.ok}catch(x){o[u]=null}}));postMessage(o)}';
      w = new Worker(URL.createObjectURL(new Blob([code], { type: 'text/javascript' })));
      const timer = setTimeout(fallback, 4000);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); resolve(e.data); };
      w.onerror = () => { clearTimeout(timer); fallback(); };
      w.postMessage(urls);
    } catch (e) { fallback(); }
  });
}
const slotUrl = (fig) => new URL(fig.dataset.src, location.href).href;
whichExist(slots.map(slotUrl)).then((found) => {
  slots.forEach((fig) => { const ok = found && found[slotUrl(fig)]; if (ok !== false) fillSlot(fig); });
});

// ─────────── Pixel resolve (hero) ───────────
// Coarse blocks → sharp: a downsampled copy is scaled back up with no smoothing.
// Default schedule: first level 18.92 px blocks, columns ×1.277 per level (18.92^(1/12)), 10 levels × 150 ms.
// Fast schedule: 7 levels, ×1.445 per level, 80 ms each. Then the canvas is dropped.
const PX = {
  normal: { cell: 18.92, steps: 12, keep: 0.9, hold: 150 },
  fast: { cell: 18.92, steps: 8, keep: 0.9, hold: 80 },
};
function levels(width, { cell, steps, keep }) {
  const c0 = Math.max(1, Math.round(width / cell));
  const r = cell ** (1 / steps); // columns grow geometrically until blocks reach ~1 px after `steps`
  const n = Math.max(1, Math.floor(steps * keep));
  const out = [];
  for (let i = 0; i < n; i++) out.push(Math.max(1, Math.round(c0 * r ** i)));
  for (let i = 1; i < out.length; i++) if (out[i] <= out[i - 1]) out[i] = out[i - 1] + 1;
  return out;
}

// paints the element (text line or slot) into a full-resolution source canvas
function paintSource(el, w, h, dpr) {
  const src = document.createElement('canvas');
  src.width = Math.round(w * dpr); src.height = Math.round(h * dpr);
  const g = src.getContext('2d');
  g.scale(dpr, dpr);
  if (el.classList.contains('slot')) {
    const cs = getComputedStyle(el);
    const img = el._img;
    if (img && img.naturalWidth) {
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const iw = img.naturalWidth * s, ih = img.naturalHeight * s;
      g.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
    } else {
      // the placeholder itself: panel, hairline diagonal, caption
      g.fillStyle = cs.backgroundColor; g.fillRect(0, 0, w, h);
      g.strokeStyle = cs.getPropertyValue('--ph-line').trim() || 'rgba(0,0,0,.15)'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(0, h); g.lineTo(w, 0); g.stroke();
      const cap = $('figcaption', el);
      if (cap) {
        const cr = cap.getBoundingClientRect(), er = el.getBoundingClientRect();
        const ccs = getComputedStyle(cap);
        g.fillStyle = cs.backgroundColor; g.fillRect(cr.left - er.left, cr.top - er.top, cr.width, cr.height);
        g.fillStyle = ccs.color; g.font = `${ccs.fontWeight} ${ccs.fontSize} ${ccs.fontFamily}`;
        g.textAlign = 'center'; g.textBaseline = 'middle';
        if ('letterSpacing' in g) g.letterSpacing = ccs.letterSpacing;
        // wrap the caption the way the DOM does, so the last level lines up with the real caption
        const maxW = cr.width - parseFloat(ccs.paddingLeft) - parseFloat(ccs.paddingRight) + 1;
        const lines = [];
        for (const word of cap.textContent.trim().split(/\s+/)) {
          const cur = lines.length ? lines[lines.length - 1] + ' ' + word : word;
          if (lines.length && g.measureText(cur).width <= maxW) lines[lines.length - 1] = cur; else lines.push(word);
        }
        const lh = parseFloat(ccs.lineHeight) || 16;
        const cx = cr.left - er.left + cr.width / 2, cy = cr.top - er.top + cr.height / 2;
        lines.forEach((ln, k) => g.fillText(ln, cx, cy + (k - (lines.length - 1) / 2) * lh));
      }
    }
  } else {
    // a headline line: same face, size and alignment as the DOM text, baseline from the font's own metrics
    const cs = getComputedStyle(el);
    const size = parseFloat(cs.fontSize);
    g.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`;
    g.fillStyle = cs.color;
    g.textAlign = 'center';
    g.textBaseline = 'alphabetic';
    if ('letterSpacing' in g) g.letterSpacing = cs.letterSpacing;
    const text = el.textContent.trim();
    const m = g.measureText(text);
    const lh = parseFloat(cs.lineHeight) || size;
    const base = (lh - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
    g.fillText(text, w / 2, base);
  }
  return src;
}

function pixelResolve(el, mode = 'normal', { onStart } = {}) {
  return new Promise((resolve) => {
    const w = el.offsetWidth, h = el.offsetHeight;
    if (!w || !h || reduced) { onStart && onStart(); resolve(); return; }
    const dpr = Math.min(2, Math.max(1, Math.floor(devicePixelRatio || 1)));
    const cfg = PX[mode];
    const src = paintSource(el, w, h, dpr);
    const isText = !el.classList.contains('slot');
    const cv = document.createElement('canvas');
    cv.className = 'px'; cv.setAttribute('aria-hidden', 'true');
    cv.width = src.width; cv.height = src.height;
    const ctx = cv.getContext('2d');
    const small = document.createElement('canvas');
    const sctx = small.getContext('2d', { willReadFrequently: isText });
    const steps = levels(w, cfg);
    const draw = (cols) => {
      const rows = Math.max(1, Math.round((h / w) * cols));
      small.width = cols; small.height = rows;
      // averaged downsample so thin strokes survive at coarse sizes
      sctx.imageSmoothingEnabled = true; sctx.imageSmoothingQuality = 'medium';
      sctx.clearRect(0, 0, cols, rows);
      sctx.drawImage(src, 0, 0, cols, rows);
      if (isText) { // 1-bit blocks for type: a block is ink if a quarter of it is covered
        const d = sctx.getImageData(0, 0, cols, rows); const a = d.data;
        for (let i = 3; i < a.length; i += 4) a[i] = a[i] > 64 ? 255 : 0;
        sctx.putImageData(d, 0, 0);
      }
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(small, 0, 0, cols, rows, 0, 0, cv.width, cv.height);
    };
    el.appendChild(cv);
    draw(steps[0]);
    onStart && onStart();
    let i = 0, t0 = performance.now();
    const tick = (now) => {
      if (now - t0 >= cfg.hold) { i++; t0 += cfg.hold; if (i < steps.length) draw(steps[i]); }
      if (i >= steps.length) { cv.remove(); el.classList.add('is-resolved'); resolve(); return; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// ─────────── Start states (transforms owned here, never in CSS) ───────────
const heroLines = $$('.hero__line');
const heroStills = $$('.hero__still');
gsap.set('.nav', { yPercent: -100 });
gsap.set(heroLines.map((l) => $('.hero__txt', l)), { visibility: 'hidden' });
gsap.set(heroStills, { visibility: 'hidden' });
html.classList.remove('is-booting');

// ─────────── Hero in: lines switch on 0.25 s apart, each resolving from blocks; header drops 0.7 s power3.out ───────────
function heroIn(delay = 0) {
  const LINE = 0.25;
  const tl = gsap.timeline({ delay });
  heroLines.forEach((line, n) => {
    tl.add(() => {
      if (reduced) { gsap.set($('.hero__txt', line), { visibility: 'visible' }); return; }
      pixelResolve(line, 'normal').then(() => gsap.set($('.hero__txt', line), { visibility: 'visible' }));
    }, n * LINE);
  });
  // the stills follow on the same 0.25 s cadence
  heroStills.forEach((fig, k) => {
    tl.add(() => pixelResolve(fig, 'normal', { onStart: () => gsap.set(fig, { visibility: 'visible' }) }), (heroLines.length + k) * LINE);
  });
  // header starts 0.1 s before the last line switches on
  tl.to('.nav', { yPercent: 0, duration: 0.7, ease: 'power3.out' }, Math.max(0, (heroLines.length - 1) * LINE - 0.1));
  return tl;
}

// ─────────── Gate (SPEC-page1 S0 / S0b) ───────────
const gate = $('#gate');
const letters = $$('.gate__word b');
const half = (letters.length - 1) / 2;
let gateOpen = false;

function runGate() {
  if (params.has('skip') || reduced) {
    gate.classList.add('is-gone'); gate.setAttribute('aria-hidden', 'true');
    heroIn(0.1);
    return;
  }
  html.classList.add('is-locked');
  lenis.stop();
  const rules = $$('.gate__rule');
  const mask = $('.gate__mask');
  const foot = $$('.gate__foot .rise > span, .gate__go > span');
  // the window is driven through a proxy so all four insets stay explicit (a computed 2-value inset would not tween)
  const win = $('.gate__window');
  const clip = { tb: 40.2, lr: 40.8 };
  const drawClip = () => { win.style.clipPath = `inset(${clip.tb}% ${clip.lr}% ${clip.tb}% ${clip.lr}%)`; };
  drawClip(); win.style.visibility = "visible";
  gsap.set(mask, { scaleY: 0 });
  gsap.set(letters, { x: (i) => (i <= half ? 20 : -20), opacity: 0 });
  gsap.set(foot, { yPercent: 120 });
  gsap.set('.gate__foot', { opacity: 0 });
  const edge = () => mask.offsetHeight / 2 + 10;

  const tl = gsap.timeline({ delay: 0.35 });
  tl.to(clip, { tb: 0, lr: 0, duration: 0.617, ease: 'circ.inOut', onUpdate: drawClip }, 0) // window 617 ms circ.inOut
    .to(mask, { scaleY: 1, duration: 0.483, ease: 'circ.inOut' }, 0.55) // mask 483 ms
    .to(rules[0], { y: () => -edge(), duration: 0.483, ease: 'circ.inOut' }, 0.55) // hairlines split with the mask
    .to(rules[1], { y: () => edge(), duration: 0.483, ease: 'circ.inOut' }, 0.55)
    .to(letters, { x: 0, opacity: 1, duration: 1.0, ease: 'power4.out', stagger: { each: 0.05, from: 'center' } }, 0.62) // ±20 px, 1 s power4.out
    .to('.gate__foot', { opacity: 1, duration: 0.602, ease: 'power2.in' }, 1.03) // 602 ms power2.in after the mask
    .to(foot, { yPercent: 0, duration: 1.2, ease: EASE_MASK, stagger: 0.1 }, 1.2) // 120 % → 0, 1.2 s, .1 s apart
    .add(() => { armGate(); }, 1.4);
}

function armGate() {
  const go = () => {
    if (gateOpen) return;
    gateOpen = true;
    ['wheel', 'touchmove', 'keydown'].forEach((e) => window.removeEventListener(e, onAny));
    document.activeElement && document.activeElement.blur();
    gate.inert = true;
    const tl = gsap.timeline({
      onComplete: () => {
        gate.classList.add('is-gone'); gate.setAttribute('aria-hidden', 'true');
        html.classList.remove('is-locked'); lenis.start();
      },
    });
    tl.to('.gate__foot .rise > span, .gate__go > span', { yPercent: -120, duration: 0.24, ease: EASE_MASK }, 0) // exit .24 s
      .to(letters, { x: (i) => (i <= half ? -20 : 20), opacity: 0, duration: 1.8, ease: 'power4.out', stagger: { each: 0.05, from: 'center' } }, 0) // leave 1.8 s
      .to('.gate__rule', { scaleX: 0, duration: 0.483, ease: 'circ.inOut' }, 0.1)
      .to(gate, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 0.45);
    heroIn(1.0);
  };
  const onAny = (e) => { if (e.type !== 'keydown' || ['Enter', ' ', 'ArrowDown', 'PageDown'].includes(e.key)) go(); };
  $('#gateGo').addEventListener('click', go, { once: true });
  ['wheel', 'touchmove', 'keydown'].forEach((e) => window.addEventListener(e, onAny, { passive: true }));
  $('#gateGo').focus({ preventScroll: true });
}

// ─────────── Programme: vertical scroll drives the track 1 : 1 (SPEC-page1 S2) ───────────
const track = $('.day__track');
const items = $$('.day__track > *');
const clocks = items.filter((el) => el.hasAttribute('data-clock'));
const played = new WeakSet();
clocks.forEach((c) => gsap.set($$('.mask > span', c), { yPercent: 120 }));

function playClock(c) {
  if (played.has(c)) return;
  played.add(c);
  gsap.to($$('.mask > span', c), { yPercent: 0, duration: 1.2, ease: EASE_MASK, stagger: 0.1 });
}

function renderDay(x) {
  const vw = window.innerWidth;
  gsap.set(track, { x });
  for (const el of items) {
    const left = el.offsetLeft + x;
    if (el.hasAttribute('data-clock')) {
      const w = el.offsetWidth;
      // the time card holds while the next film slides over it: pinned for its own width,
      // scaling 1 → 0.86 and fading out over the first 57.4 % (757 / 1318 px) of that distance
      const pin = clamp(-left, 0, w);
      const q = clamp(pin / (w * 0.574), 0, 1);
      gsap.set($('.clock__inner', el), { x: pin, scale: 1 - 0.14 * q, opacity: 1 - q });
      if (left < vw * 0.6) playClock(el);
    } else {
      // the still lags 229 px (15.9 % of the viewport) behind its panel while the panel travels in
      const q = clamp(left / vw, 0, 1);
      $$('.panel__img .slot', el).forEach((fig) => gsap.set(fig, { x: -0.159 * vw * q }));
    }
  }
}

let dayST;
function buildDay() {
  if (dayST) dayST.kill();
  const travel = () => track.scrollWidth - window.innerWidth;
  dayST = ScrollTrigger.create({
    trigger: '.day',
    start: 'top top',
    end: () => '+=' + travel(),
    pin: '.day__stage',
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => renderDay(-self.progress * travel()),
    onRefresh: (self) => renderDay(-self.progress * travel()),
  });
}
buildDay();

// ─────────── Competition: five cards stick 70 px apart and shrink toward a common end ───────────
const stack = $('#stack');
const films = $$('.film', stack);
const bodies = films.map((f) => $('.film__body', f));
const N = films.length;
let stackTop = 0, pitch = 1, stickBase = 0;
function measureStack() {
  stackTop = stack.getBoundingClientRect().top + window.scrollY - (gsap.getProperty(stack, 'y') || 0);
  pitch = films[0].offsetHeight;
  stickBase = parseFloat(getComputedStyle(films[0]).top) || 0;
}
function renderStack() {
  // card i: 1 → 1 − 0.05·(N − i). Starts when its slot is 8.6 % of a pitch past the stick line; every card
  // finishes where card 0's slot is 4.164 pitches past it. u = 1 − (1 − v)^1.35 (measured progress shape).
  const y = window.scrollY + stickBase - stackTop;
  const end = 4.164 * pitch;
  for (let i = 0; i < N - 1; i++) {
    const start = i * pitch + 0.086 * pitch;
    const v = clamp((y - start) / (end - start), 0, 1);
    const u = 1 - (1 - v) ** 1.35;
    gsap.set(bodies[i], { scale: 1 - 0.05 * (N - i) * u });
  }
}
gsap.set(stack, { y: 200, opacity: 0 });
ScrollTrigger.create({
  trigger: stack, start: 'top 73%', once: true, // stack top crosses 73 % of the viewport
  onEnter: () => gsap.to(stack, { y: 0, opacity: 1, duration: 1.19, ease: 'power3.out' }),
});
ScrollTrigger.create({
  trigger: stack, start: 'top bottom', end: 'bottom top',
  onUpdate: renderStack, onRefresh: () => { measureStack(); renderStack(); },
});

// ─────────── Passes: the card pins at 43.3 % of the viewport for 1.06 vh and turns over ───────────
const run = $('#finaleRun');
const rail = $('.finale__rail', run);
const turn = $('#passTurn');
const back = $('.pass__face--back');
// split every word into letters inside its mask
$$('.cl__w').forEach((w) => { const t = w.textContent; w.textContent = ''; for (const ch of t) { const i = document.createElement('i'); i.textContent = ch; w.appendChild(i); } });
const chars = $$('.cl__w > i');
const vh = () => window.innerHeight;
const pinStart = () => rail.getBoundingClientRect().top + window.scrollY - 0.433 * vh();

if (reduced) {
  gsap.set(turn, { rotationX: 0, rotationY: -180, rotationZ: 0 });
  back.tabIndex = 0;
} else {
  gsap.set(turn, { rotationX: 15, rotationY: 25, rotationZ: 15 });
  gsap.set(chars, { yPercent: 120 });
  // turn: linear in scroll over the first 0.818 vh of the pin (736 of 953 px)
  gsap.to(turn, {
    rotationX: 0, rotationY: -180, rotationZ: 0, ease: 'none',
    scrollTrigger: { trigger: run, start: () => pinStart(), end: () => pinStart() + 0.818 * vh(), scrub: true, invalidateOnRefresh: true,
      onUpdate: (s) => { back.tabIndex = s.progress > 0.5 ? 0 : -1; } },
  });
  // letters: y 120 % → 0, each 1 s power3.out, 0.05 s apart in random order, scrubbed over 0.551 vh from 0.127 vh into the pin
  gsap.timeline({
    scrollTrigger: { trigger: run, start: () => pinStart() + 0.127 * vh(), end: () => pinStart() + 0.678 * vh(), scrub: true, invalidateOnRefresh: true },
  }).to(chars, { yPercent: 0, duration: 1, ease: 'power3.out', stagger: { each: 0.05, from: 'random' } });
}

// ─────────── In-page links: glide through Lenis instead of the native jump (pinned sections need real scroll) ───────────
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    if (!gateOpen && !gate.classList.contains('is-gone')) return;
    lenis.scrollTo(target, { duration: reduced ? 0 : 1.6, easing: (t) => 1 - (1 - t) ** 4, immediate: reduced });
    a.blur();
  });
});

// ─────────── Hero hover: pointer over a line's letters replays its block resolve (fast schedule) ───────────
if (!reduced && matchMedia('(hover: hover)').matches) {
  const busy = new WeakSet();
  const over = new WeakSet();
  const inside = (line, x, y) => {
    const r = document.createRange(); r.selectNodeContents($('.hero__txt', line));
    const b = r.getBoundingClientRect();
    return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
  };
  const replay = (line) => {
    if (busy.has(line) || !line.classList.contains('is-resolved')) return;
    busy.add(line);
    const txt = $('.hero__txt', line);
    pixelResolve(line, 'fast', { onStart: () => gsap.set(txt, { visibility: 'hidden' }) })
      .then(() => { gsap.set(txt, { visibility: 'visible' }); busy.delete(line); });
  };
  $('.hero__title').addEventListener('pointermove', (e) => {
    heroLines.forEach((line) => {
      const hit = inside(line, e.clientX, e.clientY);
      if (hit && !over.has(line)) { over.add(line); replay(line); }
      else if (!hit) over.delete(line);
    });
  });
  $('.hero__title').addEventListener('pointerleave', () => heroLines.forEach((l) => over.delete(l)));
}

// ─────────── Boot ───────────
const ready = document.fonts ? Promise.all([document.fonts.ready, document.fonts.load('300 100px Newsreader')]).catch(() => {}) : Promise.resolve();
// start the gate only once fonts and the page have loaded and measured, so no long task eats its first frames
const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }));
Promise.all([ready, loaded]).then(() => { ScrollTrigger.refresh(); requestAnimationFrame(() => runGate()); });
new ResizeObserver(() => { lenis.resize(); }).observe(document.body);

// review hook
window.longtake = { lenis, renderDay, dayST: () => dayST, pixelResolve, levels, renderStack, tick: () => gsap.ticker.tick() };
})();

```

## `style.css`

```css
/* LONG TAKE — festival of unbroken cinema
   White and near-black base, one accent (magenta). Newsreader (optical-size serif) for display, in sentence case;
   Schibsted Grotesk for text and every label, time and caption. No all-caps anywhere.
   Transform start states live in script.js (gsap.set) only; CSS here may hide with opacity/visibility. */

:root {
  --ink: #0b0b0b;
  --paper: #ffffff;
  --accent: #ff2d95;
  --ink-2: #161616;
  --paper-2: #f3f3f3;
  --paper-60: rgba(255, 255, 255, .7);
  --ink-60: rgba(11, 11, 11, .66);
  --rule: rgba(255, 255, 255, .2);
  --rule-ink: rgba(11, 11, 11, .14);
  --display: 'Newsreader', Georgia, serif;
  --sans: 'Schibsted Grotesk', system-ui, sans-serif;
  --label: 'Schibsted Grotesk', system-ui, sans-serif;
  --gut: clamp(16px, 2.2vw, 32px);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { background: var(--ink); color: var(--ink); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
body { font: 400 16px/1.5 var(--sans); background: var(--paper); overflow-x: clip; }
html.is-locked body { overflow: hidden; }
img { display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
.mono { font: 400 13px/1.45 var(--label); letter-spacing: 0; }

.mask { overflow: hidden; }
.mask > span { display: block; }
.rise { overflow: hidden; }
.rise > span { display: block; }

/* ─────────── Image slots (placeholder until img/ has the file) ─────────── */
.slot {
  --ph: #e6e6e6; --ph-line: rgba(11, 11, 11, .16); --ph-ink: #555555;
  position: relative; margin: 0; overflow: hidden; aspect-ratio: var(--ratio, 4/5);
  background: var(--ph); display: grid; place-items: center;
}
.slot--dark { --ph: #1c1c1c; --ph-line: rgba(255, 255, 255, .13); --ph-ink: #a3a3a3; }
.slot::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to top right, transparent calc(50% - .6px), var(--ph-line) 50%, transparent calc(50% + .6px));
}
.slot figcaption {
  position: relative; z-index: 1; max-width: 82%; padding: 6px 10px; background: var(--ph);
  font: 400 12px/1.45 var(--label); color: var(--ph-ink); text-align: center;
}
.slot--cap-top { align-items: start; }
.slot--cap-top figcaption { margin-top: 18vh; }
.slot > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.slot.is-filled::before, .slot.is-filled figcaption { display: none; }
.px { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 3; }

/* ─────────── Gate ─────────── */
.gate { position: fixed; inset: 0; z-index: 100; background: var(--ink); color: var(--paper); display: grid; place-items: center; }
.gate.is-gone { pointer-events: none; visibility: hidden; }
.gate__window { position: absolute; inset: 0; visibility: hidden; } /* shown by the gate once its clip is set */
.gate__window .slot { position: absolute; inset: 0; aspect-ratio: auto; }
.gate__window .slot > img { filter: grayscale(1) contrast(1.05) brightness(.55); }
.gate__mark { position: relative; z-index: 2; display: grid; place-items: center; }
.gate__mask { overflow: hidden; transform-origin: 50% 50%; }
.gate__word {
  display: flex; font: 300 clamp(64px, 12vw, 200px)/1 var(--display); letter-spacing: -.02em; padding: .05em .03em .07em;
}
.gate__word span { display: block; overflow: hidden; }
.gate__word .gate__gap { width: .22em; }
.gate__word b { display: block; font-weight: inherit; }
.gate__rule { position: absolute; left: 50%; top: 50%; width: min(62vw, 880px); height: 1px; background: var(--paper); margin-left: calc(min(62vw, 880px) / -2); }
.gate__foot {
  position: absolute; left: var(--gut); right: var(--gut); bottom: calc(var(--gut) + 8px); z-index: 2;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: end; gap: 16px;
  font: 400 12px/1.4 var(--label);
}
.gate__foot > :last-child { text-align: right; }
.gate__go { font: 400 13px/1 var(--label); outline: none; }
.gate__go > span { display: inline-flex; gap: .7em; align-items: center; padding: 16px 22px; border: 1px solid var(--paper); transition: background .35s, color .35s, border-color .35s; }
.gate__go em { font-style: normal; color: var(--accent); transition: color .35s; }
.gate__go:hover > span, .gate__go:focus-visible > span { background: var(--accent); color: var(--ink); border-color: var(--accent); }
.gate__go:hover em, .gate__go:focus-visible em { color: var(--ink); }

/* ─────────── Nav: dark tabs that read over white, black, magenta and any still ─────────── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: start; padding: 14px var(--gut); pointer-events: none;
}
.nav a { pointer-events: auto; }
.nav__mark { font: 400 21px/1 var(--display); letter-spacing: -.01em; background: var(--ink); color: var(--paper); padding: 9px 12px 8px; }
.nav__mark sup { font: 400 9px var(--label); vertical-align: top; color: var(--accent); margin-left: 2px; }
.nav__links { display: flex; gap: 4px; }
.nav__links a { font: 400 12px/1 var(--label); background: var(--ink); color: var(--paper); padding: 11px 12px 10px; transition: background .3s, color .3s; }
.nav__links a:hover { background: var(--paper); color: var(--ink); }
.nav__links .nav__cta { background: var(--accent); color: var(--ink); }
.nav__links .nav__cta:hover { background: var(--paper); }

/* ─────────── Hero ─────────── */
.hero { position: relative; height: 100svh; min-height: 620px; background: var(--paper); color: var(--ink); overflow: hidden; }
.hero__kicker { position: absolute; top: 88px; left: 50%; translate: -50% 0; white-space: nowrap; color: var(--ink-60); }
.hero__title {
  position: absolute; left: var(--gut); right: var(--gut); top: 47%; translate: 0 -50%; z-index: 2;
  font: 300 clamp(52px, 8.4vw, 160px)/.98 var(--display); text-align: center; letter-spacing: -.025em;
}
.hero__line { position: relative; display: block; }
.hero__txt { display: block; }
.hero__still { position: absolute; z-index: 1; }
.hero__still--a { left: var(--gut); bottom: 92px; width: 22vw; }
.hero__still--b { right: 5.5vw; top: 78px; width: 10.5vw; }
.hero__still--c { right: var(--gut); bottom: 92px; width: 15vw; }
.hero__meta { position: absolute; left: var(--gut); right: var(--gut); bottom: var(--gut); display: grid; grid-template-columns: 1fr auto 1fr; align-items: end; gap: 16px; }
.hero__rule { text-align: center; }
.hero__cue { justify-self: end; display: flex; align-items: center; gap: 10px; }
.hero__cue i { width: 8px; height: 8px; background: var(--accent); }

/* ─────────── Programme (horizontal screening clock) ─────────── */
.day { position: relative; background: var(--ink); }
.day__stage { position: relative; height: 100svh; overflow: hidden; }
.day__track { position: absolute; top: 0; left: 0; height: 100%; display: flex; will-change: transform; }
.day__track > * { position: relative; flex: none; height: 100%; }

.clock { width: 100vw; z-index: 1; }
.clock__inner {
  position: absolute; inset: 0; background: var(--ink); color: var(--paper);
  display: grid; grid-template-rows: auto 1fr auto; justify-items: center; padding: 84px var(--gut) var(--gut);
  transform-origin: 50% 50%;
}
.clock--light .clock__inner { background: var(--paper); color: var(--ink); }
.clock--accent .clock__inner { background: var(--accent); color: var(--ink); }
.clock__kicker { font: 400 12px/1.4 var(--label); }
.clock__time {
  align-self: center; font: 200 min(62svh, 30vw)/.85 var(--display); letter-spacing: -.03em;
  font-variant-numeric: lining-nums tabular-nums; padding-top: .04em;
}
.clock__time em { font-style: normal; color: var(--accent); animation: blink 2s step-end infinite; }
.clock--accent .clock__time em { color: inherit; }
@keyframes blink { 0% { visibility: hidden; } 50% { visibility: visible; } }
.clock__sub { display: flex; gap: 18px; font: 400 12px/1.4 var(--label); }

.panel { width: 91.5vw; z-index: 2; background: var(--ink); color: var(--paper); overflow: hidden; }
.panel--wide { width: 100vw; }
.panel__img { position: absolute; inset: 0; overflow: hidden; }
.panel__img .slot { position: absolute; top: 0; left: 0; height: 100%; width: 116%; aspect-ratio: auto; }
.panel--split .panel__img { right: 50%; }
.panel--split .panel__img--b { left: 50%; right: 0; border-left: 1px solid var(--ink); }
.panel__copy { position: absolute; left: var(--gut); bottom: var(--gut); max-width: 640px; z-index: 4; }
/* local pool of shade under the copy block, not a veil over the frame */
.panel__copy::before { content: ""; position: absolute; inset: -34% -40% -30% -30%; z-index: -1; pointer-events: none; background: radial-gradient(closest-side, rgba(11,11,11,.78), rgba(11,11,11,.5) 55%, transparent); }
.panel__h { font: 300 clamp(44px, 5.6vw, 104px)/.98 var(--display); letter-spacing: -.02em; margin: 14px 0 16px; }
.panel__p { max-width: 390px; color: var(--paper-60); }

/* ─────────── Competition (stacked cards) ─────────── */
.films { background: var(--paper); color: var(--ink); padding: clamp(96px, 14vh, 160px) 0 clamp(96px, 16vh, 180px); }
.films__head { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: var(--gut); align-items: end; padding: 0 var(--gut); margin-bottom: clamp(56px, 9vh, 110px); }
.films__title { font: 300 clamp(52px, 6.6vw, 124px)/.98 var(--display); letter-spacing: -.025em; }
.films__title em, .panel__h em { font-style: italic; font-weight: 300; }
.films__lede { color: var(--ink-60); max-width: 340px; }
.stack { --stick: 88px; --step: 70px; width: 77.8vw; margin: 0 auto; display: flex; flex-direction: column; gap: 0; }
.film { position: sticky; top: calc(var(--stick) + var(--step) * var(--i, 0)); }
.film:last-child { position: relative; top: auto; }
.film:nth-child(1) { --i: 0; } .film:nth-child(2) { --i: 1; } .film:nth-child(3) { --i: 2; } .film:nth-child(4) { --i: 3; }
.film__body { position: relative; border-radius: 16px; overflow: hidden; transform-origin: 50% 50%; color: var(--paper); background: var(--ink-2); }
.film__body .slot { width: 100%; }
.film__body::after { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,.2); pointer-events: none; z-index: 2; }
.film__num { position: absolute; left: 24px; top: 16px; z-index: 4; font: 300 clamp(40px, 3.6vw, 60px)/1 var(--display); font-variant-numeric: lining-nums; color: rgba(255,255,255,.6); }
.film__num::before, .film__info::before { content: ""; position: absolute; z-index: -1; pointer-events: none; background: radial-gradient(closest-side, rgba(11,11,11,.7), transparent); }
.film__num::before { inset: -60% -90%; }
.film__info { position: absolute; left: 24px; right: 24px; bottom: 22px; z-index: 4; display: flex; justify-content: space-between; align-items: end; gap: 24px; }
.film__info::before { left: -10%; right: 20%; top: -80%; bottom: -60%; }
.film__t { font: 300 clamp(34px, 3.6vw, 62px)/1 var(--display); letter-spacing: -.015em; }
.film__m { color: var(--paper-60); text-align: right; max-width: 280px; }

/* ─────────── Passes (rising card through the split headline) ─────────── */
.finale { position: relative; background: var(--ink); color: var(--paper); padding: clamp(96px, 14vh, 150px) 0 clamp(72px, 10vh, 120px); overflow: clip; }
.finale__kicker { text-align: center; color: var(--paper-60); }
.finale__run { --cardw: 18.7vw; --cardh: calc(var(--cardw) / .78); position: relative; display: flow-root; min-height: calc(var(--cardh) + 106vh); }
.finale__rail { position: absolute; top: 0; left: 0; right: 0; height: calc(var(--cardh) + 106vh); z-index: 2; pointer-events: none; }
.pass { position: sticky; top: 43.3vh; width: var(--cardw); height: var(--cardh); margin: 0 auto; perspective: 2000px; pointer-events: auto; }
.pass__turn { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; }
.pass__face { position: absolute; inset: 0; border-radius: 10px; overflow: hidden; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.pass__face--front .slot { width: 100%; height: 100%; aspect-ratio: auto; }
.pass__face--back {
  transform: rotateY(180deg); background: var(--accent); color: var(--ink);
  display: grid; grid-template-rows: auto auto 1fr auto; padding: 18px 18px 16px;
}
.pass__k { font: 400 11px/1.3 var(--label); }
.pass__p { font: 300 clamp(56px, 6.4vw, 104px)/.9 var(--display); font-variant-numeric: lining-nums; margin-top: 10px; }
.pass__l { align-self: end; font: 500 14px/1.35 var(--sans); padding-bottom: 14px; }
.pass__go { font: 400 12px/1 var(--label); border-top: 1px solid var(--ink); padding-top: 12px; }
.pass__face--back:hover .pass__go, .pass__face--back:focus-visible .pass__go { text-decoration: underline; text-underline-offset: 4px; }
.finale__title {
  position: relative; z-index: 1; margin-top: 40vh; padding: 0 var(--gut);
  font: 300 9vw/1 var(--display); letter-spacing: -.025em;
}
.cl { display: flex; justify-content: center; gap: calc(var(--cardw) + 5vw); }
.cl__w { display: block; overflow: hidden; flex: 1 1 0; padding: .03em 0 .01em; }
.cl__w:first-child { text-align: right; }
.cl__w > i { display: inline-block; font-style: normal; }
.finale__foot { display: grid; grid-template-columns: 1fr auto; gap: var(--gut); align-items: end; padding: clamp(40px, 8vh, 90px) var(--gut) 0; border-top: 1px solid var(--rule); margin: 0 var(--gut); padding-left: 0; padding-right: 0; }
.finale__list { list-style: none; display: grid; gap: 8px; max-width: 520px; width: 100%; }
.finale__list li { display: flex; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--rule); padding-bottom: 8px; }
.finale__acts { display: flex; gap: 8px; flex-wrap: wrap; }
.btn {
  display: inline-flex; gap: 12px; align-items: center; padding: 18px 24px; border: 1px solid var(--paper);
  font: 400 12px/1 var(--label); transition: background .35s, color .35s, border-color .35s;
}
.btn em { font-style: normal; }
.btn:hover { background: var(--paper); color: var(--ink); }
.btn--accent { background: var(--accent); border-color: var(--accent); color: var(--ink); }
.btn--accent:hover { background: var(--paper); border-color: var(--paper); }

/* ─────────── Footer ─────────── */
.foot { background: var(--paper); color: var(--ink); padding: 56px var(--gut) 18px; }
.foot__cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gut); padding-bottom: 40px; border-bottom: 1px solid var(--rule-ink); }
.foot__cols a:hover { text-decoration: underline; text-underline-offset: 3px; }
.foot__word { display: block; width: 100%; height: auto; margin-top: 22px; }
.foot__word text { font: 300 229px var(--display); letter-spacing: -.02em; fill: var(--ink); }
.foot__base { display: flex; justify-content: space-between; gap: 16px; margin-top: 14px; color: var(--ink-60); }

/* Pre-script visibility: only opacity, only while the script owns the page */
html.is-booting .hero__title, html.is-booting .hero__still, html.is-booting .nav { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .clock__time em { animation: none; }
}

/* ─────────── Phone ─────────── */
@media (max-width: 760px) {
  .nav__links a:not(.nav__cta) { display: none; }
  .gate__word { font-size: 15vw; }
  .gate__foot { grid-template-columns: 1fr; justify-items: center; text-align: center; bottom: 28px; }
  .gate__foot > :last-child { text-align: center; }
  .slot--cap-top figcaption { margin-top: 14vh; }

  .hero { min-height: 640px; }
  .hero__kicker { top: 76px; white-space: normal; width: calc(100% - 32px); text-align: center; }
  .hero__title { font-size: 14vw; top: 36%; }
  .hero__still--a { left: var(--gut); bottom: 150px; width: 60vw; }
  .hero__still--b { right: var(--gut); top: auto; bottom: 150px; width: calc(40vw - 40px); }
  .hero__still--c { display: none; }
  .hero__meta { grid-template-columns: 1fr auto; row-gap: 10px; }
  .hero__rule { display: none; }

  .clock__time { font-size: min(52svh, 28vw); }
  .clock__kicker { text-align: center; }
  .clock__sub { flex-wrap: wrap; justify-content: center; gap: 6px 14px; text-align: center; }
  .panel { width: 100vw; }
  .panel__h { font-size: 12vw; }
  .panel__p { font-size: 15px; }
  .panel--split .panel__img { right: 0; bottom: 50%; }
  .panel--split .panel__img--b { top: 50%; bottom: 0; left: 0; border-left: 0; border-top: 1px solid var(--ink); }

  .films__head { grid-template-columns: 1fr; gap: 14px; }
  .films__title { font-size: 13vw; }
  .stack { --stick: 64px; width: calc(100vw - 2 * var(--gut)); }
  .film__body .slot { aspect-ratio: 1 / 1.08; }
  .film__num { left: 16px; top: 12px; font-size: 44px; }
  .film__info { left: 16px; right: 16px; bottom: 16px; flex-direction: column; align-items: start; gap: 10px; }
  .film__t { font-size: 9vw; }
  .film__m { text-align: left; font-size: 11px; }

  .finale__run { --cardw: 42vw; }
  .finale__title { font-size: 11vw; margin-top: 44vh; }
  .cl { gap: calc(var(--cardw) + 4vw); }
  .pass__face--back { padding: 12px; }
  .pass__p { font-size: 11vw; margin-top: 6px; }
  .pass__l { font-size: 12px; padding-bottom: 8px; }
  .pass__go { font-size: 10px; padding-top: 8px; }
  .finale__foot { grid-template-columns: 1fr; }
  .finale__list { font-size: 11px; }
  .btn { padding: 16px 18px; }

  .foot__cols { grid-template-columns: 1fr; gap: 18px; }
  .foot__base { flex-direction: column; gap: 4px; }
}

```
