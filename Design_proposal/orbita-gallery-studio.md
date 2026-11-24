# MASTER PROMPT — Orbita Studio
### Plain HTML, CSS and JavaScript. No WordPress, no page builder, no framework, no build step.

## ▶ HOW TO USE THIS PROMPT

**Paste this whole document into Claude. Nothing to attach.** It carries the complete source of the site plus the address of every image, so Claude can assemble a folder that owns its own assets and hand it back as a zip.

**INSTRUCTION TO CLAUDE — BUILD IT, DO NOT ASK.** Every decision is already made in this document. Do not stop to ask the user questions, do not offer options, and do not ask for confirmation before starting. Write the files, zip them, hand over the archive, then report what you built.

1. Create a folder named `orbita-studio` and write out every file in the appendix below **exactly as written** — do not reformat, rename, shorten, reorder or "improve" anything. The only exception is the delivery-only PAGE SPEED step below, which must not change how the page looks or moves.
2. **Download the 24 images into `assets/`.** The code already points at `assets/…` — nothing in it references a remote host. Run this from inside the folder; it reads the ASSET MANIFEST at the end of this document:

   ```bash
   mkdir -p assets
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-01.jpg' -o 'assets/orbita-01.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-02.jpg' -o 'assets/orbita-02.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-03.jpg' -o 'assets/orbita-03.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-04.jpg' -o 'assets/orbita-04.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-05.jpg' -o 'assets/orbita-05.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-06.jpg' -o 'assets/orbita-06.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-07.jpg' -o 'assets/orbita-07.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-08.jpg' -o 'assets/orbita-08.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-09.jpg' -o 'assets/orbita-09.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-10.jpg' -o 'assets/orbita-10.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-11.jpg' -o 'assets/orbita-11.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-12.jpg' -o 'assets/orbita-12.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-13.jpg' -o 'assets/orbita-13.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-14.jpg' -o 'assets/orbita-14.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-15.jpg' -o 'assets/orbita-15.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-16.jpg' -o 'assets/orbita-16.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-17.jpg' -o 'assets/orbita-17.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-18.jpg' -o 'assets/orbita-18.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-19.jpg' -o 'assets/orbita-19.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-20.jpg' -o 'assets/orbita-20.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-21.jpg' -o 'assets/orbita-21.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-22.jpg' -o 'assets/orbita-22.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-23.jpg' -o 'assets/orbita-23.jpg'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-24.jpg' -o 'assets/orbita-24.jpg'
   ```

   Then check every file arrived and none is a zero-byte or HTML error page:

   ```bash
   ls assets | wc -l             # expect 24 files
   find assets -size -1k         # expect no output
   ```

   If any download fails, retry it — hosts occasionally drop a request. Do **not** fall back to hotlinking the remote URL: the whole point is a folder that works offline.

3. **PAGE SPEED — target 90+ in Lighthouse, mobile AND desktop.** Apply these to the files in the folder. They are delivery changes only: the page must still look and move px-to-px like the original.
   - **Images → WebP.** For every JPG/PNG photo in `assets/`: convert to WebP (quality ≈ 78; PNG with transparency keeps its alpha), resized to at most **2× its largest displayed width** (never wider than the original, cap 1600 px). Use `cwebp` if installed, otherwise Python Pillow (`pip install pillow` if needed), otherwise macOS `sips -s format webp`. Replace the old path in every HTML/CSS/JS file (`grep -rn 'assets/<name>.jpg'` must then find nothing), then delete the JPG/PNG. Leave SVG, GIF, video, fonts and 3D models as they are. If no converter works, keep the originals and say so in your report.
   - **Image sizes and lazy loading.** Every `<img>` gets `width` and `height` equal to its file's pixel size. Images outside the first screen get `loading="lazy" decoding="async"`; the one largest image in the first screen gets `loading="eager" fetchpriority="high"`. Do not add `<link rel="preload" as="image">`.
   - **Scripts.** Add `defer` to every external `<script src>` (not to `type="module"`, which is already deferred; never `async` for a library another script uses). Any inline `<script>` that calls those libraries runs inside `document.addEventListener('DOMContentLoaded', …)` so the order still holds. A heavy library used only by a section below the first screen (slider, map, 3D further down) is loaded by a small `IntersectionObserver` (`rootMargin: '300px'`) that appends its `<script>` when that section approaches the screen.
   - **CSS and fonts.** Keep the one stylesheet as a normal `<link rel="stylesheet">` in `<head>` — it is the only render-blocking file allowed. Preload the 1–2 font files the first screen's headline and body text use (`<link rel="preload" as="font" type="font/woff2" crossorigin>`), keep `font-display: swap`, and drop font families or weights the page never uses. Google Fonts links get `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin) and `display=swap`.
   - **First screen visible at load.** Nothing in the first screen starts at `opacity: 0` (CSS or a GSAP `from`) — use `0.01` so the browser can measure it; there is no plugin doing this for you here.
   - **Measure.** Serve the folder (`python3 -m http.server 8000` from inside it) and, if Google Chrome is available, run `npx lighthouse http://localhost:8000 --only-categories=performance` and again with `--preset=desktop`, twice each. Report Performance, FCP, LCP, TBT, CLS and Speed Index. If a run is under 90, fix the cause named under "Avoid long main-thread tasks" / "Layout shift culprits". If Lighthouse cannot run here, say so and tell the user to test the deployed URL at https://pagespeed.web.dev/. When it is deployed, any static host with compression (gzip/brotli) and long cache headers for `assets/` (Netlify, Vercel, Cloudflare Pages) keeps the score.
   **For Orbita the WebP photos and the script edits are already prepared: follow the `PAGE SPEED BUILD` section (before the ASSET MANIFEST) exactly instead of re-deriving them.**
4. **Zip that folder and give the user the archive.** Its contents:

   ```
   orbita-studio/
     index.html
     assets/
       orbita-01.jpg
       orbita-02.jpg
       orbita-03.jpg
       orbita-04.jpg
       … 20 more
   ```

   ```bash
   zip -r orbita-studio.zip orbita-studio -x '*.DS_Store'
   ```

   Then hand over `orbita-studio.zip` as a file the user can download, not as text in the chat.
5. Before handing it over, serve the folder and confirm it runs:

   ```bash
   cd orbita-studio && python3 -m http.server 8000     # then open http://localhost:8000
   ```

   Check the page renders, the images load from `assets/` with the network throttled or offline, and scrolling drives the animations.

The finished folder needs no network for its images — they are in `assets/`.
Do not rebuild the design from the description below. The description is there so a person can understand and edit the code. The appendix is the deliverable.

---

## ▶ WHAT YOU GET

**1 code file plus an `assets/` folder holding 24 images, delivered as `orbita-studio.zip`.**

| File | What it is |
|---|---|
| `index.html` | a page, 24 KB |
| `assets/` | 24 images, downloaded at build time |

---

## ▶ WHERE THE MEDIA COMES FROM

All 24 files (24 images) live in `assets/` inside the folder, and every reference in the markup, the CSS and the script is a relative `assets/…` path. Once the folder is assembled it owns its own media: no CDN, no media library, no external image host. Open it on a laptop with the wifi off and it still renders.

They are fetched **once, at build time**, from the WordPress media library on `demo.uichemy.com` — the same `orbita-studio__` files the WordPress build of this page uses. That is only how they travel into the folder; nothing in the delivered code points back at that host. Replacing an image means dropping a new file into `assets/` under the same name.

The manifest at the end of this document lists every source URL against the filename it is saved as, so the download step is reproducible and checkable.

---

## ▶ WHAT THIS PROMPT DELIBERATELY DOES NOT CONTAIN

- No WordPress, no page builder, and none of the wrapper classes or compatibility CSS a builder needs. The WordPress build is a separate prompt.
- No framework, no TypeScript, no bundler, no `package.json`.
- No backend. Any form here validates and replies in place; it posts nowhere.
- No CMS. The content lives in the files.
- No external image host. The images ship inside the zip; nothing in the code calls out to a media library at runtime.

---

## PAGE SPEED BUILD — Orbita Studio (from the tested WordPress build; overrides the matching appendix parts)

The same changes measured on demo.uichemy.com (WordPress build, 7 Oct 2026):

| Google PageSpeed Insights | Before (live demo, 7 Oct 2026) | Tested build (2 runs) | Live demo after the change |
|---|---|---|---|
| Mobile score | 58 | **92–100** | **92** |
| Desktop score | 79 | **97–99** | **98** |
| Largest Contentful Paint (mobile) | 44.9 s | 1.6–3.3 s | 3.3 s |
| Total Blocking Time (mobile) | 0.67 s | 0 s | 0 s |
| Cumulative Layout Shift | 0 | 0 | 0 |
| Photo weight requested at load (24 photos) | 8,730 KB (JPG) | 411 KB (320 px WebP copies; the full WebP, 1,572 KB, follow on the first input) | same |

Same design, copy, layout and motion; with the animation frozen at its first frame the live and tested pages differ on 0.2 % of pixels (desktop) / 0.7 % (412 × 823), from resampling only. The one visible difference: the globe's idle motion (auto-spin, drift, wave) starts on the visitor's first pointer move / pointer down / wheel / touch / key — until then it shows its exact first frame — and at that moment each card swaps its 320 px copy for the full WebP (once decoded, so no blank frame). Every control (Globe / Grid / Scroll / Wave, drag, wheel, opening a project, ← / →, Esc) works exactly as before. The Elementor editor keeps the always-on motion.

This static version applies the identical changes to the plain files; measure it after deploying (see the PAGE SPEED step, Measure).

### A · Download the prepared WebP photos

Run inside the folder after step 2, then delete the 24 `assets/orbita-NN.jpg` files (nothing uses them any more):

```bash
mkdir -p assets
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__01.webp' -o 'assets/orbita-fast__01.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__01-thumb.webp' -o 'assets/orbita-fast__01-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__02.webp' -o 'assets/orbita-fast__02.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__02-thumb.webp' -o 'assets/orbita-fast__02-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__03.webp' -o 'assets/orbita-fast__03.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__03-thumb.webp' -o 'assets/orbita-fast__03-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__04.webp' -o 'assets/orbita-fast__04.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__04-thumb.webp' -o 'assets/orbita-fast__04-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__05.webp' -o 'assets/orbita-fast__05.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__05-thumb.webp' -o 'assets/orbita-fast__05-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__06.webp' -o 'assets/orbita-fast__06.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__06-thumb.webp' -o 'assets/orbita-fast__06-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__07.webp' -o 'assets/orbita-fast__07.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__07-thumb.webp' -o 'assets/orbita-fast__07-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__08.webp' -o 'assets/orbita-fast__08.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__08-thumb.webp' -o 'assets/orbita-fast__08-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__09.webp' -o 'assets/orbita-fast__09.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__09-thumb.webp' -o 'assets/orbita-fast__09-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__10.webp' -o 'assets/orbita-fast__10.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__10-thumb.webp' -o 'assets/orbita-fast__10-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__11.webp' -o 'assets/orbita-fast__11.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__11-thumb.webp' -o 'assets/orbita-fast__11-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__12.webp' -o 'assets/orbita-fast__12.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__12-thumb.webp' -o 'assets/orbita-fast__12-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__13.webp' -o 'assets/orbita-fast__13.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__13-thumb.webp' -o 'assets/orbita-fast__13-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__14.webp' -o 'assets/orbita-fast__14.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__14-thumb.webp' -o 'assets/orbita-fast__14-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__15.webp' -o 'assets/orbita-fast__15.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__15-thumb.webp' -o 'assets/orbita-fast__15-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__16.webp' -o 'assets/orbita-fast__16.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__16-thumb.webp' -o 'assets/orbita-fast__16-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__17.webp' -o 'assets/orbita-fast__17.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__17-thumb.webp' -o 'assets/orbita-fast__17-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__18.webp' -o 'assets/orbita-fast__18.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__18-thumb.webp' -o 'assets/orbita-fast__18-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__19.webp' -o 'assets/orbita-fast__19.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__19-thumb.webp' -o 'assets/orbita-fast__19-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__20.webp' -o 'assets/orbita-fast__20.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__20-thumb.webp' -o 'assets/orbita-fast__20-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__21.webp' -o 'assets/orbita-fast__21.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__21-thumb.webp' -o 'assets/orbita-fast__21-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__22.webp' -o 'assets/orbita-fast__22.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__22-thumb.webp' -o 'assets/orbita-fast__22-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__23.webp' -o 'assets/orbita-fast__23.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__23-thumb.webp' -o 'assets/orbita-fast__23-thumb.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__24.webp' -o 'assets/orbita-fast__24.webp'
curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/10/orbita-fast__24-thumb.webp' -o 'assets/orbita-fast__24-thumb.webp'
```

| # | Full WebP (orbit + project view) | size | 320 px copy (orbit before first input) | size | KB JPG → WebP / copy | Alt text (unchanged) |
|---|---|---|---|---|---|---|
| 01 | `assets/orbita-fast__01.webp` | 694 × 1040 | `assets/orbita-fast__01-thumb.webp` | 320 × 480 | 211 → 21 / 7 | Green and pink gift boxes — Salina, Packaging |
| 02 | `assets/orbita-fast__02.webp` | 694 × 1040 | `assets/orbita-fast__02-thumb.webp` | 320 × 480 | 480 → 94 / 23 | Orange brand cards with logo — Monte Oro, Branding |
| 03 | `assets/orbita-fast__03.webp` | 694 × 1040 | `assets/orbita-fast__03-thumb.webp` | 320 × 480 | 355 → 47 / 13 | Typographic alphabet poster on a wall — Campo Press, Editorial |
| 04 | `assets/orbita-fast__04.webp` | 780 × 1040 | `assets/orbita-fast__04-thumb.webp` | 320 × 427 | 345 → 52 / 15 | Coffee cups and branded coffee bags — Riva Café, Packaging |
| 05 | `assets/orbita-fast__05.webp` | 694 × 1040 | `assets/orbita-fast__05-thumb.webp` | 320 × 480 | 333 → 54 / 14 | Two business cards on wood — Vespro, Identity |
| 06 | `assets/orbita-fast__06.webp` | 769 × 1040 | `assets/orbita-fast__06-thumb.webp` | 320 × 433 | 628 → 156 / 31 | Festival posters on a concrete wall — Onda Festival, Posters |
| 07 | `assets/orbita-fast__07.webp` | 694 × 1040 | `assets/orbita-fast__07-thumb.webp` | 320 × 480 | 339 → 54 / 18 | Open book layout with a chair photo — Cielo Books, Editorial |
| 08 | `assets/orbita-fast__08.webp` | 848 × 1040 | `assets/orbita-fast__08-thumb.webp` | 320 × 392 | 378 → 54 / 11 | White and pink product box — Piuma, Packaging |
| 09 | `assets/orbita-fast__09.webp` | 780 × 1040 | `assets/orbita-fast__09-thumb.webp` | 320 × 427 | 519 → 96 / 14 | Branded notebook and pen — Ferro & Seta, Identity |
| 10 | `assets/orbita-fast__10.webp` | 694 × 1040 | `assets/orbita-fast__10-thumb.webp` | 320 × 480 | 381 → 75 / 23 | Sign mounted on a painted brick wall — Galleria Uno, Signage |
| 11 | `assets/orbita-fast__11.webp` | 693 × 1040 | `assets/orbita-fast__11-thumb.webp` | 320 × 480 | 281 → 45 / 16 | Row of designed drink cans — Onda Soda, Packaging |
| 12 | `assets/orbita-fast__12.webp` | 780 × 1040 | `assets/orbita-fast__12-thumb.webp` | 320 × 427 | 424 → 67 / 17 | Design books and paper sample brochures — Tram 9, Editorial |
| 13 | `assets/orbita-fast__13.webp` | 694 × 1040 | `assets/orbita-fast__13-thumb.webp` | 320 × 480 | 300 → 47 / 11 | Branded paper shopping bag — Lucciola, Branding |
| 14 | `assets/orbita-fast__14.webp` | 730 × 1040 | `assets/orbita-fast__14-thumb.webp` | 320 × 456 | 150 → 15 / 5 | Green balloon campaign still — Isola Radio, Campaign |
| 15 | `assets/orbita-fast__15.webp` | 693 × 1040 | `assets/orbita-fast__15-thumb.webp` | 320 × 480 | 307 → 52 / 18 | Coffee bags beside a cup — Pane Nero, Packaging |
| 16 | `assets/orbita-fast__16.webp` | 694 × 1040 | `assets/orbita-fast__16-thumb.webp` | 320 × 480 | 500 → 99 / 20 | Stationery card with pen and camera — Stella Alpina, Identity |
| 17 | `assets/orbita-fast__17.webp` | 694 × 1040 | `assets/orbita-fast__17-thumb.webp` | 320 × 480 | 413 → 85 / 23 | Stack of magazines on a table — Marea, Editorial |
| 18 | `assets/orbita-fast__18.webp` | 780 × 1040 | `assets/orbita-fast__18-thumb.webp` | 320 × 427 | 249 → 31 / 10 | Pet treat packs on pink — Nodo, Packaging |
| 19 | `assets/orbita-fast__19.webp` | 694 × 1040 | `assets/orbita-fast__19-thumb.webp` | 320 × 480 | 522 → 134 / 37 | Box with black and white label — Granito, Identity |
| 20 | `assets/orbita-fast__20.webp` | 694 × 1040 | `assets/orbita-fast__20-thumb.webp` | 320 × 480 | 300 → 53 / 18 | Yellow labelled can — Zafferano, Packaging |
| 21 | `assets/orbita-fast__21.webp` | 694 × 1040 | `assets/orbita-fast__21-thumb.webp` | 320 × 480 | 336 → 56 / 18 | Magazines spread on the studio floor — Fornace, Editorial |
| 22 | `assets/orbita-fast__22.webp` | 694 × 1040 | `assets/orbita-fast__22-thumb.webp` | 320 × 480 | 249 → 32 / 12 | White and blue product box — Brezza, Packaging |
| 23 | `assets/orbita-fast__23.webp` | 699 × 1040 | `assets/orbita-fast__23-thumb.webp` | 320 × 476 | 440 → 112 / 23 | Branded boxes on a table — Tessuto, Branding |
| 24 | `assets/orbita-fast__24.webp` | 694 × 1040 | `assets/orbita-fast__24-thumb.webp` | 320 × 480 | 290 → 41 / 14 | Notepad and pencils with leaves — Vento, Identity |

### B · Script edits in `index.html` (exact find → replace, each find occurs once)

What the edits do: J1 adds the WebP size tables and three flags; J2 makes `art(i, thumb)` return the 320 px copy (with `data-orbita-full`) for the orbit cards before the first input and the full WebP otherwise (the opened project always uses the full WebP); J3 makes the cards ask for the thumbnail; J4 stops the `requestAnimationFrame` loop after the first frame until the first input; J5 adds the first-input start (swap to full WebP after decode, restart the loop), the editor exception and a redraw on resize. Nothing else in the file changes.

**J1 · `index.html`** — find (occurs exactly once):

```js
  function art(i) {
```

replace with:

```js
  /* page speed: WebP photos (orbita-fast__NN.webp, same pictures). The cards start with a 320 px wide copy
     (-thumb.webp; before any input they are drawn at most ~150 css px wide) and swap to the full WebP on the visitor's
     first input, together with the start of the motion loop (see the end of this script). The open project always
     uses the full WebP. [width, height] of each file: */
  const ORBITA_FULL = [[694,1040],[694,1040],[694,1040],[780,1040],[694,1040],[769,1040],[694,1040],[848,1040],[780,1040],[694,1040],[693,1040],[780,1040],[694,1040],[730,1040],[693,1040],[694,1040],[694,1040],[780,1040],[694,1040],[694,1040],[694,1040],[694,1040],[699,1040],[694,1040]];
  const ORBITA_THUMB = [[320,480],[320,480],[320,480],[320,427],[320,480],[320,433],[320,480],[320,392],[320,427],[320,480],[320,480],[320,427],[320,480],[320,456],[320,480],[320,480],[320,480],[320,427],[320,480],[320,480],[320,480],[320,480],[320,476],[320,480]];
  let orbitaFull = false, orbitaLive = false, orbitaIdle = false;
  function art(i, thumb) {
```

**J2 · `index.html`** — find (occurs exactly once):

```js
    return `<img src="assets/orbita-${String(i + 1).padStart(2, '0')}.jpg" alt="${alt} — ${name}, ${cat}" decoding="async" draggable="false">`;
```

replace with:

```js
    const nn = String(i + 1).padStart(2, '0'), full = `assets/orbita-fast__${nn}.webp`;
    if (thumb && !orbitaFull) return `<img src="assets/orbita-fast__${nn}-thumb.webp" data-orbita-full="${full}" width="${ORBITA_THUMB[i][0]}" height="${ORBITA_THUMB[i][1]}" alt="${alt} — ${name}, ${cat}" decoding="async" draggable="false">`;
    return `<img src="${full}" width="${ORBITA_FULL[i][0]}" height="${ORBITA_FULL[i][1]}" alt="${alt} — ${name}, ${cat}" decoding="async" draggable="false">`;
```

**J3 · `index.html`** — find (occurs exactly once):

```js
    el.innerHTML = `<div class="face">${art(i)}</div><div class="face back" style="background:${i % 2 ? C.mint : C.lemon}">orbita°</div>`;
```

replace with:

```js
    el.innerHTML = `<div class="face">${art(i, true)}</div><div class="face back" style="background:${i % 2 ? C.mint : C.lemon}">orbita°</div>`;
```

**J4 · `index.html`** — find (occurs exactly once):

```js
    requestAnimationFrame(frame);
```

replace with:

```js
    if (orbitaLive) requestAnimationFrame(frame); else orbitaIdle = true;   // page speed: idle until the first input
```

**J5 · `index.html`** — find (occurs exactly once):

```js

  addEventListener('resize', resize);
```

replace with:

```js

  /* page speed: the first frame is drawn at once exactly as before; the motion loop (auto-spin, drift, wave) and the
     full-size photos start on the visitor's first pointer move / pointer down / wheel / touch / key. */
  const ORBITA_IN = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown'];
  const orbitaWake = () => { if (orbitaIdle) { orbitaIdle = false; requestAnimationFrame(frame); } };
  const orbitaGo = () => {
    if (orbitaLive) return;
    orbitaLive = true; orbitaFull = true;
    ORBITA_IN.forEach(n => removeEventListener(n, orbitaGo, true));
    document.querySelectorAll('img[data-orbita-full]').forEach(img => {   // swap each card once its full WebP is decoded (no blank frame)
      const k = +img.closest('.card').dataset.i, full = img.dataset.orbitaFull, pre = new Image();
      img.removeAttribute('data-orbita-full'); pre.src = full;
      (pre.decode ? pre.decode() : Promise.resolve()).catch(() => {}).then(() => { img.src = full; img.width = ORBITA_FULL[k][0]; img.height = ORBITA_FULL[k][1]; });
    });
    orbitaWake();
  };
  ORBITA_IN.forEach(n => addEventListener(n, orbitaGo, { capture: true, passive: true }));
  if (/[?&]elementor-preview=/.test(location.search)) orbitaGo();   // the Elementor editor keeps the original always-on motion
  addEventListener('resize', orbitaWake);   // a resize before any input redraws the still frame once
  addEventListener('resize', resize);
```

### P · Live-demo look (exact find → replace in `index.html`, each find occurs exactly once)

The live demo (`demo.uichemy.com/orbita-studio/`) no longer looks exactly like the appendix: its UiChemy conversion moved the type styles into site-wide typography classes that do not apply on the page, and dropped the SVG logo mark. Its globe, cards, colours and motion are the appendix's. These edits make the build look like the live demo (checked on 8 Oct 2026: with them, every header, footer, nav, intro and mode-switch element computes the same font, font size, weight, case, tracking, padding and gap as the live demo at 1440 × 900 and 390 × 844, and the cards are unchanged). Apply them after B.

**P1 · `index.html`** — the logo is the word only (no SVG mark); find (occurs exactly once):

```html
    <a class="logo" href="#" aria-label="Orbita home">
      <svg viewBox="0 0 34 34" aria-hidden="true">
        <rect x="11" y="1" width="12" height="6" fill="#FFFFFF"/>
        <rect x="11" y="27" width="12" height="6" fill="#FFFFFF"/>
        <rect x="1" y="11" width="6" height="12" fill="#FFFFFF"/>
        <rect x="27" y="11" width="6" height="12" fill="#FFFFFF"/>
        <rect x="5" y="5" width="6" height="6" fill="#FFFFFF"/>
        <rect x="23" y="5" width="6" height="6" fill="#FFFFFF"/>
        <rect x="5" y="23" width="6" height="6" fill="#FFFFFF"/>
        <rect x="23" y="23" width="6" height="6" fill="#EAFF5A"/>
      </svg>
      <b>orbita</b>
```

replace with:

```html
    <a class="logo" href="#" aria-label="Orbita home">
      <b>orbita</b>
```

**P2 · `index.html`** — no button starts pressed, so there is no white pill until the visitor picks a mode (the script then sets `aria-pressed` as before); find (occurs exactly once):

```html
        <button data-mode="globe" aria-pressed="true">Globe</button>
        <button data-mode="grid" aria-pressed="false">Grid</button>
        <button data-mode="scroll" aria-pressed="false">Scroll</button>
        <button data-mode="wave" aria-pressed="false">Wave</button>
```

replace with:

```html
        <button data-mode="globe">Globe</button>
        <button data-mode="grid">Grid</button>
        <button data-mode="scroll">Scroll</button>
        <button data-mode="wave">Wave</button>
```

**P3 · `index.html`** — the word mark is 16px bold, normal tracking; find (occurs exactly once):

```css
  .logo b { font-weight: 700; font-size: 22px; letter-spacing: -0.02em; }
```

replace with:

```css
  .logo b { font-weight: 700; }
```

**P4 · `index.html`** — the nav is 16px / 400, mixed case, normal tracking; find (occurs exactly once):

```css
  .nav { display: flex; gap: 36px; align-items: center; font-size: 14px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
```

replace with:

```css
  .nav { display: flex; gap: 36px; align-items: center; }
```

**P5 · `index.html`** — the mode buttons are 16px / 400, mixed case; find (occurs exactly once):

```css
  .modes button {
    padding: 10px 18px; border-radius: 999px;
    font-size: 13px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase;
    transition: background .25s ease, color .25s ease;
  }
```

replace with:

```css
  .modes button {
    padding: 10px 18px; border-radius: 999px;
    transition: background .25s ease, color .25s ease;
  }
```

**P6 · `index.html`** — the intro is 16px with normal line height; find (occurs exactly once):

```css
    max-width: 320px; font-size: 14px; line-height: 1.45; margin-bottom: 12px;
```

replace with:

```css
    max-width: 320px; margin-bottom: 12px;
```

**P7 · `index.html`** — the live breakpoints: 1024 / 768 / 480 instead of one at 720 (paddings, nav gaps, the opened-project width, the phone mode switch); find (occurs exactly once):

```css
  @media (max-width: 720px) {
    .top { padding: 18px 16px; }
    .nav { gap: 16px; font-size: 12px; }
    .nav .hide-sm { display: none; }
    .bottom { padding: 16px; flex-direction: column; align-items: stretch; }
    .intro { display: none; }
    .modes { align-self: center; }
    .modes button { padding: 9px 10px; font-size: 11px; letter-spacing: .03em; }
      .feature .cap { font-size: 11px; padding: 8px 12px; left: 8px; right: 8px; bottom: 8px; }
  }
```

replace with:

```css
  @media (max-width: 1024px) {
    .top { padding: 24px 28px; }
    .nav { gap: 28px; }
    .feature { width: min(280px, 54vw); }
    .bottom { padding: 24px 28px; }
    .modes button { padding-inline: 15px; }
  }
  @media (max-width: 768px) {
    .top { padding: 18px 16px; }
    .nav { gap: 16px; }
    .nav .hide-sm { display: none; }
    .feature .cap { font-size: 11px; padding: 8px 12px; left: 8px; right: 8px; bottom: 8px; }
    .bottom { padding: 16px; flex-direction: column; align-items: stretch; }
    .intro { display: none; }
    .modes { align-self: center; }
    .modes button { padding: 9px 10px; font-size: 11px; letter-spacing: .03em; }
  }
  @media (max-width: 480px) {
    .nav { gap: 12px; }
    .feature { width: min(300px, 62vw); }
    .bottom { padding: 12px; }
    .modes { max-width: calc(100vw - 24px); }
    .modes button { padding-inline: 8px; }
  }
```

**P8 · `index.html`** — no web font: the live demo loads no Space Grotesk, so all text renders in the `system-ui` fallback of the same stack; find (occurs exactly once):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

replace with:

```html
<!-- no web font: the live demo renders the "Space Grotesk", system-ui, sans-serif stack without loading Space Grotesk -->
```

### C · Check

Serve the folder: no `.jpg` is requested; the globe shows its first frame and starts spinning on the first mouse move, touch, wheel or key; the full WebP replace the 320 px copies without a blank frame; every control works as before; no console errors. Then measure as in the PAGE SPEED step. Expected, from the WordPress measurement: about 92–100 on both.

## ASSET MANIFEST — download these into `assets/`

Source is the media library on `demo.uichemy.com`. Save each one under the name in the second column; the code already refers to it by that name.

| Download from | Save as |
|---|---|
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-01.jpg` | `assets/orbita-01.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-02.jpg` | `assets/orbita-02.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-03.jpg` | `assets/orbita-03.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-04.jpg` | `assets/orbita-04.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-05.jpg` | `assets/orbita-05.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-06.jpg` | `assets/orbita-06.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-07.jpg` | `assets/orbita-07.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-08.jpg` | `assets/orbita-08.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-09.jpg` | `assets/orbita-09.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-10.jpg` | `assets/orbita-10.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-11.jpg` | `assets/orbita-11.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-12.jpg` | `assets/orbita-12.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-13.jpg` | `assets/orbita-13.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-14.jpg` | `assets/orbita-14.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-15.jpg` | `assets/orbita-15.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-16.jpg` | `assets/orbita-16.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-17.jpg` | `assets/orbita-17.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-18.jpg` | `assets/orbita-18.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-19.jpg` | `assets/orbita-19.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-20.jpg` | `assets/orbita-20.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-21.jpg` | `assets/orbita-21.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-22.jpg` | `assets/orbita-22.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-23.jpg` | `assets/orbita-23.jpg` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/orbita-24.jpg` | `assets/orbita-24.jpg` |


---

# APPENDIX · VERBATIM SOURCE

The complete source of every file. **Write them out exactly** — do not change a value, a comment, a class name, or the order of a declaration. Recreate this file layout:

```
index.html
```

## `index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Orbita Studio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  :root {
    --emerald: #0B8452;
    --lemon: #EAFF5A;
    --coral: #FF7A63;
    --ink: #0A3A26;
    --mint: #CFF5E1;
    --white: #FFFFFF;
    --glass: rgba(255, 255, 255, 0.14);
    --panel: #0B8452;   /* solid emerald so orbiting cards never smear through */
    --glass-line: rgba(255, 255, 255, 0.38);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: var(--emerald);
    color: var(--white);
    font-family: "Space Grotesk", system-ui, sans-serif;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }

  /* ---------- header ---------- */
  .top {
    position: fixed; inset: 0 0 auto 0; z-index: 3000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 40px;
    pointer-events: none;
  }
  .top > * { pointer-events: auto; }
  .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--white); }
  .logo svg { width: 34px; height: 34px; }
  .logo b { font-weight: 700; font-size: 22px; letter-spacing: -0.02em; }
  .nav { display: flex; gap: 36px; align-items: center; font-size: 14px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
  .nav a { color: var(--white); text-decoration: none; position: relative; }
  .nav a::after {
    content: ""; position: absolute; left: 0; right: 0; bottom: -4px; height: 2px;
    background: var(--lemon); transform: scaleX(0); transform-origin: left; transition: transform .3s ease;
  }
  .nav a:hover::after { transform: scaleX(1); }
  .lang { opacity: .75; }
  .lang strong { opacity: 1; color: var(--lemon); font-weight: 500; }

  /* ---------- stage ---------- */
  .stage { position: fixed; inset: 0; cursor: grab; touch-action: none; }
  .stage.dragging { cursor: grabbing; }
  #voxel { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
  .card {
    position: absolute; left: 0; top: 0;
    width: var(--cw); height: calc(var(--cw) * 4 / 3);
    transform-style: preserve-3d;
    will-change: transform, opacity;
    cursor: pointer;
  }
  .card .face {
    position: absolute; inset: 0;
    border-radius: 6px; overflow: hidden;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    background: var(--mint);
    box-shadow: 0 18px 40px -18px rgba(10, 58, 38, 0.55);
    transition: box-shadow .25s ease;
  }
  .card .back {
    transform: rotateY(180deg);
    display: grid; place-items: center;
    background: var(--lemon); color: var(--ink);
    font-weight: 700; font-size: calc(var(--cw) * 0.13); letter-spacing: -0.02em;
  }
  .ph {
    width: 100%; height: 100%;
    display: flex; flex-direction: column; justify-content: center; gap: 6%; padding: 10%;
    background: repeating-linear-gradient(135deg, var(--mint) 0 9px, var(--white) 9px 18px);
    border: 1.5px dashed var(--emerald); border-radius: inherit;
    color: var(--ink); text-align: center; user-select: none;
    font-size: calc(var(--cw) * 0.085); line-height: 1.25;
  }
  .ph-tag {
    align-self: center; padding: 0.25em 0.7em; border-radius: 999px;
    background: var(--emerald); color: var(--white);
    font-size: 0.8em; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
  }
  .ph b { font-size: 1.15em; }
  .ph-what { opacity: .75; font-size: 0.85em; }
  .feature .ph { font-size: 17px; }
  .card img, .feature img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    background: var(--mint); user-select: none; -webkit-user-drag: none;
    color: transparent; font-size: 0;   /* no alt-text spill while a photo is missing */
  }
  .card:hover .face { box-shadow: 0 0 0 3px var(--lemon), 0 18px 40px -18px rgba(10, 58, 38, 0.55); }

  .feature {
    position: absolute; left: 50%; top: 50%;
    width: min(300px, 56vw); aspect-ratio: 3 / 4;
    transform: translate(-50%, -50%);
    z-index: 2500;   /* opened project sits above the wall */
    border-radius: 8px; overflow: hidden;
    box-shadow: 0 40px 80px -30px rgba(10, 58, 38, 0.6);
    transition: opacity .6s ease, transform .6s cubic-bezier(.2,.8,.2,1);
  }
  .feature.swap { opacity: 0; transform: translate(-50%, -46%) scale(.94); }
  .feature:not(.hidden) { box-shadow: 0 0 0 100vmax rgba(11, 132, 82, 0.72), 0 40px 80px -30px rgba(10, 58, 38, 0.6); }
  .feature.hidden { opacity: 0; transform: translate(-50%, -50%) scale(.7); pointer-events: none; }
  .feature .cap {
    position: absolute; left: 12px; right: 12px; bottom: 12px;
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 14px; border-radius: 999px;
    background: var(--white); color: var(--ink);
    font-size: 13px; font-weight: 500;
  }
  .feature .cap span { opacity: .6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .feature .cap b { white-space: nowrap; flex-shrink: 0; }
  .feature .cap { gap: 8px; }

  .tip {
    position: fixed; z-index: 2600; pointer-events: none;
    padding: 6px 12px; border-radius: 999px;
    background: var(--lemon); color: var(--ink);
    font-size: 12px; font-weight: 500; white-space: nowrap;
    opacity: 0; transform: translate(14px, 14px); transition: opacity .15s ease;
  }
  .tip.on { opacity: 1; }

  /* ---------- bottom bar ---------- */
  .bottom {
    position: fixed; inset: auto 0 0 0; z-index: 3000;
    display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
    padding: 28px 40px; pointer-events: none;
  }
  .bottom > * { pointer-events: auto; }
  .modes {
    display: flex; padding: 5px; border-radius: 999px;
    background: var(--panel); border: 1px solid var(--glass-line);
    box-shadow: 0 18px 40px -20px rgba(10, 58, 38, 0.5);
  }
  .modes button {
    padding: 10px 18px; border-radius: 999px;
    font-size: 13px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase;
    transition: background .25s ease, color .25s ease;
  }
  .modes button:hover { background: rgba(255,255,255,.16); }
  .modes button[aria-pressed="true"] { background: var(--white); color: var(--emerald); }
  .intro {
    max-width: 320px; font-size: 14px; line-height: 1.45; margin-bottom: 12px;
    padding: 14px 16px; border-radius: 14px;
    background: var(--panel); border: 1px solid var(--glass-line);
    box-shadow: 0 18px 40px -20px rgba(10, 58, 38, 0.5);
  }

  @media (max-width: 720px) {
    .top { padding: 18px 16px; }
    .nav { gap: 16px; font-size: 12px; }
    .nav .hide-sm { display: none; }
    .bottom { padding: 16px; flex-direction: column; align-items: stretch; }
    .intro { display: none; }
    .modes { align-self: center; }
    .modes button { padding: 9px 10px; font-size: 11px; letter-spacing: .03em; }
      .feature .cap { font-size: 11px; padding: 8px 12px; left: 8px; right: 8px; bottom: 8px; }
  }
</style>
</head>
<body>
  <header class="top">
    <a class="logo" href="#" aria-label="Orbita home">
      <svg viewBox="0 0 34 34" aria-hidden="true">
        <rect x="11" y="1" width="12" height="6" fill="#FFFFFF"/>
        <rect x="11" y="27" width="12" height="6" fill="#FFFFFF"/>
        <rect x="1" y="11" width="6" height="12" fill="#FFFFFF"/>
        <rect x="27" y="11" width="6" height="12" fill="#FFFFFF"/>
        <rect x="5" y="5" width="6" height="6" fill="#FFFFFF"/>
        <rect x="23" y="5" width="6" height="6" fill="#FFFFFF"/>
        <rect x="5" y="23" width="6" height="6" fill="#FFFFFF"/>
        <rect x="23" y="23" width="6" height="6" fill="#EAFF5A"/>
      </svg>
      <b>orbita</b>
    </a>
    <nav class="nav">
      <a href="#">All works</a>
      <a href="#" class="hide-sm">Studio</a>
      <a href="#">Contact</a>
      <span class="lang">IT / <strong>EN</strong></span>
    </nav>
  </header>

  <main class="stage" id="stage" data-mode="globe" aria-label="Project gallery">
    <canvas id="voxel"></canvas>
    <div class="feature hidden" id="feature" aria-live="polite"></div>
  </main>

  <div class="tip" id="tip"></div>

  <footer class="bottom">
    <div>
      <p class="intro">Orbita is a brand &amp; digital design studio in Milano. Identities, packaging and websites for people who make things.</p>
      <div class="modes" role="group" aria-label="Gallery layout">
        <button data-mode="globe" aria-pressed="true">Globe</button>
        <button data-mode="grid" aria-pressed="false">Grid</button>
        <button data-mode="scroll" aria-pressed="false">Scroll</button>
        <button data-mode="wave" aria-pressed="false">Wave</button>
      </div>
    </div>
  </footer>

<script>
(() => {
  const C = { emerald: '#0B8452', ink: '#0A3A26', lemon: '#EAFF5A', mint: '#CFF5E1', coral: '#FF7A63', white: '#FFFFFF' };
  // [name, discipline, year, what the photo shows]  — photos in img/NN.jpg (see gen_images.py)
  const WORKS = [
    ['Salina', 'Packaging', 2026, 'Green and pink gift boxes'],
    ['Monte Oro', 'Branding', 2025, 'Orange brand cards with logo'],
    ['Campo Press', 'Editorial', 2025, 'Typographic alphabet poster on a wall'],
    ['Riva Café', 'Packaging', 2025, 'Coffee cups and branded coffee bags'],
    ['Vespro', 'Identity', 2026, 'Two business cards on wood'],
    ['Onda Festival', 'Posters', 2026, 'Festival posters on a concrete wall'],
    ['Cielo Books', 'Editorial', 2025, 'Open book layout with a chair photo'],
    ['Piuma', 'Packaging', 2024, 'White and pink product box'],
    ['Ferro & Seta', 'Identity', 2025, 'Branded notebook and pen'],
    ['Galleria Uno', 'Signage', 2026, 'Sign mounted on a painted brick wall'],
    ['Onda Soda', 'Packaging', 2026, 'Row of designed drink cans'],
    ['Tram 9', 'Editorial', 2024, 'Design books and paper sample brochures'],
    ['Lucciola', 'Branding', 2025, 'Branded paper shopping bag'],
    ['Isola Radio', 'Campaign', 2025, 'Green balloon campaign still'],
    ['Pane Nero', 'Packaging', 2024, 'Coffee bags beside a cup'],
    ['Stella Alpina', 'Identity', 2024, 'Stationery card with pen and camera'],
    ['Marea', 'Editorial', 2024, 'Stack of magazines on a table'],
    ['Nodo', 'Packaging', 2026, 'Pet treat packs on pink'],
    ['Granito', 'Identity', 2024, 'Box with black and white label'],
    ['Zafferano', 'Packaging', 2026, 'Yellow labelled can'],
    ['Fornace', 'Editorial', 2025, 'Magazines spread on the studio floor'],
    ['Brezza', 'Packaging', 2026, 'White and blue product box'],
    ['Tessuto', 'Branding', 2025, 'Branded boxes on a table'],
    ['Vento', 'Identity', 2026, 'Notepad and pencils with leaves']
  ];
  const N = WORKS.length, TAU = Math.PI * 2;

  /* ---------- project photography (generated, local) ---------- */
  function art(i) {
    const [name, cat, year, alt] = WORKS[i];
    // Project imagery is stored in the single flat assets/ directory.
    return `<img src="assets/orbita-${String(i + 1).padStart(2, '0')}.jpg" alt="${alt} — ${name}, ${cat}" decoding="async" draggable="false">`;
  }

  /* ---------- DOM ---------- */
  const stage = document.getElementById('stage');
  const feature = document.getElementById('feature');
  const tip = document.getElementById('tip');
  const G = N * 3;                                        // globe tiles: each project appears three times
  const makeCard = (i) => {
    const w = WORKS[i];
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<div class="face">${art(i)}</div><div class="face back" style="background:${i % 2 ? C.mint : C.lemon}">orbita°</div>`;
    el.dataset.i = i;
    el.addEventListener('pointerenter', () => { tip.textContent = `${w[0]} · ${w[1]}`; tip.classList.add('on'); hovering = true; });
    el.addEventListener('pointerleave', () => { tip.classList.remove('on'); hovering = false; });
    stage.appendChild(el);
    return el;
  };
  const cards = WORKS.map((w, i) => makeCard(i));
  const ghosts = Array.from({ length: G - N }, (_, k) => makeCard((N + k) % N));   // extra globe-only tiles
  window.addEventListener('pointermove', e => { tip.style.left = e.clientX + 'px'; tip.style.top = e.clientY + 'px'; });

  let featured = 0;
  function setFeatured(i, instant) {
    featured = (i + N) % N;
    const [name, cat, year] = WORKS[featured];
    const fill = () => {
      feature.innerHTML = art(featured) + `<div class="cap"><b>${name}</b><span>${cat} · ${year}</span></div>`;
    };
    if (instant) return fill();
    feature.classList.add('swap');
    setTimeout(() => { fill(); feature.classList.remove('swap'); }, 280);
  }
  setFeatured(0, true);

  /* ---------- layouts ---------- */
  let W, H, R, F, F2, Fw, cw, portrait = false, clock = 0;
  function resize() {
    W = innerWidth; H = innerHeight;
    portrait = W < 720 && H > W;              // phones: spread the orbit wider and taller
    R = portrait ? W * 0.62 : Math.min(W * 0.42, H * 0.75, 620);
    F = R * 3.4;
    F2 = portrait ? W * 0.8 : Math.max(W * 0.6, H * 0.7);   // wide lens for the scroll tunnel
    Fw = portrait ? W * 1.6 : Math.max(W * 0.75, 800);      // lens for the sea surface
    cw = Math.max(72, Math.min(W * 0.1, H * 0.17, 150));
    document.documentElement.style.setProperty('--cw', cw + 'px');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const mod = (a, n) => ((a % n) + n) % n;
  // wave: G tiles floating on a sea surface seen at an angle; two crossing swells roll through,
  // each tile rides the height of the water under it and tilts with its slope
  function waveAt(g) {
    const cols = portrait ? 6 : 12, rows = G / cols, col = g % cols, row = Math.floor(g / cols);   // phones: a deeper, narrower sea
    const size = portrait ? 0.85 : 0.72, w = cw * size;
    const sx = w * 1.12, sv = w * 1.33 * 1.08;
    const u = (col - (cols - 1) / 2) * sx, v = (row - (rows - 1) / 2) * sv;
    const t = clock * 0.001 + scroll * 0.004;
    const k1 = TAU / (sx * 5.5), k2 = TAU / (sv * 3.4), A = w * 0.42;
    const p1 = u * k1 + v * k1 * 0.4 - t * 1.5;               // main swell, running diagonally
    const p2 = v * k2 - u * k2 * 0.3 - t * 1.05;              // cross swell rolling toward the viewer
    const h = A * (Math.sin(p1) + 0.55 * Math.sin(p2));
    const dhdu = A * (k1 * Math.cos(p1) - 0.55 * k2 * 0.3 * Math.cos(p2));
    const dhdv = A * (k1 * 0.4 * Math.cos(p1) + 0.55 * k2 * Math.cos(p2));
    const th = portrait ? 0.8 : 1.02, ct = Math.cos(th), st = Math.sin(th);   // sea plane tilted away from the camera
    return [u, v * ct - h * st - H * (portrait ? 0.02 : 0.07), v * st + h * ct - w * 1.4, -Math.atan(dhdu * ct), size, 1, th + Math.atan(dhdv)];
  }
  // globe: G tiles on a fibonacci sphere, each lying flat on the surface (tangent), facing outward
  function globeAt(g, rot) {
    const t = (g + 0.5) / G, lat = Math.asin(1 - 2 * t);
    const az = g * 2.399963 + rot;
    const rg = Math.min(W, H) * (portrait ? 0.4 : 0.34);
    const size = (rg * 0.3) / cw;                          // tile width ≈ 0.3·r keeps a small even gap
    return [Math.cos(lat) * Math.sin(az) * rg, -Math.sin(lat) * rg, Math.cos(lat) * Math.cos(az) * rg, az, size, 1, lat];
  }
  function layout(mode, i, rot, scroll) {
    // grid: flat wall of cards sliding sideways (first-version layout)
    if (mode === 'grid') {
      const cols = 8, sx = Math.max(cw * 1.45, W / 7), sy = Math.max(cw * 1.33 + 34, portrait ? H * 0.21 : 0);
      const row = Math.floor(i / cols), col = i % cols;
      const span = cols * sx;
      return [mod(col * sx + scroll + (row % 2) * sx * 0.5, span) - span / 2, (row - 1) * sy - 16, 0, 0, 1, 1, 0];
    }
    if (mode === 'wave') return waveAt(i);
    if (mode === 'globe') return globeAt(i, rot);
    // scroll: the camera sits inside an endless cylinder of cards and travels up/down through it
    const cols = 8, rows = 3, sy = H * 0.6, span = rows * sy, rc = F2 * 0.62;
    const row = Math.floor(i / cols), col = i % cols;
    const a = col * TAU / cols + (row % 2) * TAU / 16 + yaw;
    const y = mod(row * sy + scroll, span) - span / 2;
    const z = -Math.cos(a) * rc;
    const op = Math.max(0, Math.min(1, (0.3 * F2 - z) / (0.06 * F2)));            // drop cards swinging past the camera
    return [Math.sin(a) * rc, y, z, -0.7 * Math.atan2(Math.sin(a), Math.cos(a)), 1.9, op, 0];   // faces inward (eased toward camera), drawn larger
  }

  /* ---------- voxel "O" mark ---------- */
  const canvas = document.getElementById('voxel');
  const ctx = canvas.getContext('2d');
  const vox = new Set();
  for (let x = -5; x <= 5; x++) for (let y = -5; y <= 5; y++) {
    const d = Math.hypot(x, y);
    if (d > 2.6 && d < 5.3) for (let z = 0; z < 2; z++) vox.add(`${x},${y},${z}`);
  }
  const FACES = [
    [[1,0,0], [[1,0,0],[1,1,0],[1,1,1],[1,0,1]]], [[-1,0,0], [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]],
    [[0,1,0], [[0,1,0],[0,1,1],[1,1,1],[1,1,0]]], [[0,-1,0], [[0,0,0],[1,0,0],[1,0,1],[0,0,1]]],
    [[0,0,1], [[0,0,1],[1,0,1],[1,1,1],[0,1,1]]], [[0,0,-1], [[0,0,0],[0,1,0],[1,1,0],[1,0,0]]]
  ];
  const quads = [];
  vox.forEach(key => {
    const [x, y, z] = key.split(',').map(Number);
    FACES.forEach(([n, pts]) => {
      if (!vox.has(`${x + n[0]},${y + n[1]},${z + n[2]}`)) quads.push(pts.map(p => [x + p[0] - 0.5, y + p[1] - 0.5, z + p[2] - 1]));
    });
  });

  function drawVoxel(yaw, pitch, alpha, f, size) {
    ctx.clearRect(0, 0, W, H);
    if (alpha < 0.01) return;
    const u = Math.min(W, H) * 0.034 * size * (portrait ? 0.75 : 1);
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const proj = quads.map(q => {
      let zs = 0;
      const pts = q.map(([x, y, z]) => {
        x *= u; y *= u; z *= u;
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
        zs += z2;
        const s = f / (f - z2);
        return [W / 2 + x1 * s, H / 2 + y1 * s];
      });
      return [zs / 4, pts];
    }).sort((a, b) => a[0] - b[0]);
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    for (const [, pts] of proj) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k < 4; k++) ctx.lineTo(pts[k][0], pts[k][1]);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fill();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- state + input ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mode = 'globe', prevMode = 'globe', blend = 1, blendStart = 0;
  let rot = 0, vel = 0, scroll = 0, scrollVel = 0, yaw = 0, yawVel = 0;
  let px = 0, py = 0, tx = 0, ty = 0, hovering = false;
  const autoSpin = reduce ? 0.003 : 0.004;

  document.querySelectorAll('.modes button').forEach(btn => btn.addEventListener('click', () => switchMode(btn.dataset.mode)));
  let fromCards = null, fromGhosts = null, fromMix = null;
  const lastCards = [], lastGhosts = [], lastMix = {};
  function switchMode(m) {
    if (m === mode) return;
    // start the new transition from where every tile is RIGHT NOW (even mid-transition),
    // so quick repeated clicks never snap back to the previous layout
    fromCards = lastCards.map(a => a && a.slice());
    fromGhosts = lastGhosts.map(a => a && a.slice());
    fromMix = Object.assign({}, lastMix);
    prevMode = mode; mode = m; blend = 0; blendStart = performance.now();
    document.querySelectorAll('.modes button').forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === m));
    feature.classList.add('hidden');
    stage.dataset.mode = m;
  }

  let down = null;
  stage.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, moved: 0 }; });
  window.addEventListener('pointermove', e => {
    tx = e.clientX / W - 0.5; ty = e.clientY / H - 0.5;
    if (!down) return;
    const dx = e.clientX - down.lx, dy = e.clientY - down.ly;
    down.lx = e.clientX; down.ly = e.clientY;
    down.moved += Math.abs(dx) + Math.abs(dy);
    if (down.moved > 5) stage.classList.add('dragging');
    if (mode === 'scroll') { scrollVel = dy * 1.2; yawVel = dx * 0.003; } else if (mode === 'globe') vel = dx * 0.004; else scrollVel = dx;
  });
  window.addEventListener('pointerup', e => {
    if (down && down.moved < 6) {
      const card = e.target.closest && e.target.closest('.card');
      const open = !feature.classList.contains('hidden');
      if (open) { if (!e.target.closest('.feature')) feature.classList.add('hidden'); }        // tap outside closes it
      else if (card) { setFeatured(+card.dataset.i, true); feature.classList.remove('hidden'); }  // open the project
    }
    down = null; stage.classList.remove('dragging');
  });
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    const d = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY);
    if (mode === 'scroll') scrollVel -= e.deltaY * 0.12, yawVel += e.deltaX * 0.00008;
    else if (mode === 'globe') vel += d * 0.00012;
    else scrollVel -= d * 0.15;
  }, { passive: false });
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') setFeatured(featured + 1);
    if (e.key === 'ArrowLeft') setFeatured(featured - 1);
    if (e.key === 'Escape') feature.classList.add('hidden');
  });

  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function frame(now) {
    // motion
    rot += autoSpin + vel; vel *= 0.94;
    scroll += 0.6 + scrollVel; scrollVel *= 0.93;
    yaw += 0.0006 + yawVel; yawVel *= 0.93;
    px += (tx - px) * 0.05; py += (ty - py) * 0.05;
    if (blend < 1) blend = Math.min(1, (now - blendStart) / 1300);
    const e = ease(blend);
    clock = now;

    const mix = (key, fn) => {
      const from = fromMix && key in fromMix ? fromMix[key] : fn(prevMode);
      return (lastMix[key] = from + (fn(mode) - from) * e);
    };
    const sc = mix('sc', m => (m === 'scroll' ? 1 : 0));              // 0 orbit .. 1 tunnel
    const vx = mix('vx', m => (m === 'scroll' || m === 'globe' ? 1 : 0)); // voxel mark shows in tunnel + globe
    const wv = mix('wv', m => (m === 'wave' ? 1 : 0));
    const f = F + (F2 - F) * sc + (Fw - F) * wv;                // each mode has its own lens
    const yawOff = px * 0.35;
    const wrap = v => Math.atan2(Math.sin(v), Math.cos(v));
    for (let i = 0; i < N; i++) {
      const b = layout(mode, i, rot + yawOff, scroll);
      const a = (blend < 1 && fromCards && fromCards[i]) || b;   // frozen start pose of this transition
      const lerp = k => a[k] + (b[k] - a[k]) * e;
      const x = lerp(0), y1 = lerp(1), z1 = lerp(2), size = lerp(4), op = lerp(5), rx = lerp(6);
      const s = f / (f - Math.min(z1, f * 0.85));
      const ang = wrap(a[3]) * (1 - e) + wrap(b[3]) * e;       // card turns with its orbit
      lastCards[i] = [x, y1, z1, ang, size, op, rx];
      const el = cards[i];
      el.style.transform = `translate(${W / 2 + x * s - cw / 2}px, ${H / 2 + y1 * s - cw * 2 / 3}px) scale(${s * size}) perspective(${f / s}px) rotateY(${ang}rad) rotateX(${rx}rad)`;
      el.style.opacity = op.toFixed(3);
      el.style.visibility = op < 0.02 ? 'hidden' : 'visible';
      el.style.zIndex = 1000 + Math.round(z1);
    }
    const tileAt = (m, g) => (m === 'globe' ? globeAt(g, rot + yawOff) : m === 'wave' ? waveAt(g) : null);
    const gw = mix('gw', m => (m === 'globe' || m === 'wave' ? 1 : 0));
    for (let g = N; g < G; g++) {
      const B = tileAt(mode, g);
      const A = (blend < 1 && fromGhosts && fromGhosts[g - N]) || tileAt(prevMode, g);
      const P = A && B ? A.map((v, k) => (k === 3 ? wrap(v) * (1 - e) + wrap(B[k]) * e : v + (B[k] - v) * e)) : (B || A);
      if (!P) { ghosts[g - N].style.visibility = 'hidden'; continue; }   // no globe/wave pose yet
      lastGhosts[g - N] = P.slice();
      const [x, y1, z1, ang, size, , rx] = P;
      const s = f / (f - z1), el = ghosts[g - N];
      el.style.transform = `translate(${W / 2 + x * s - cw / 2}px, ${H / 2 + y1 * s - cw * 2 / 3}px) scale(${s * size}) perspective(${f / s}px) rotateY(${ang}rad) rotateX(${rx}rad)`;
      el.style.opacity = gw.toFixed(3);
      el.style.visibility = gw < 0.02 ? 'hidden' : 'visible';
      el.style.zIndex = 1000 + Math.round(z1);
    }
    drawVoxel(rot * 1.6 + px * 0.8 + scroll * 0.004 * sc, (-0.25 + py * 0.5) * (1 - sc) + (-0.08 + py * 0.3) * sc, vx, f, 0.55 * (1 - sc) + 1.35 * sc);
    requestAnimationFrame(frame);
  }

  addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
</script>
</body>
</html>

```
