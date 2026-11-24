# MASTER PROMPT — Oona Varga — Fieldwork (px-to-px · Elementor page on demo.uichemy.com · assets in WP Media)

## ▶ HOW TO USE THIS PROMPT (do this first)
**Paste this entire document into Claude with the UiChemy MCP for `https://demo.uichemy.com` connected** (WP admin: `https://demo.uichemy.com/wp-admin/`). **Nothing to attach** — every asset (images, models, fonts, video) already lives in that site's WordPress Media Library, and its URL is baked into the code below.

**Target: build this page as an Elementor page on `https://demo.uichemy.com`, pixel-for-pixel (px-to-px) identical to the original.**

This document has **two halves:**
- **PART A — the specification**: describes the page as documentation.
- **PART B — the appendix** (`APPENDIX · VERBATIM SOURCE`): the **complete, tested source of every file**. **This is the half that guarantees the identical page** — convert from it, never re-invent from Part A.

**INSTRUCTION TO CLAUDE — BUILD IT, DO NOT ASK.** Every decision this build needs is already made in this document. Do **not** stop to ask the user questions, do not offer options, and do not ask for confirmation before starting. Build the page, then report what you built and flag anything that failed.

1. **Read the site's build process first:** call `uichemy-composer/read-skill` with `name: "code-to-wordpress"` (and its `webgl` / `animation` parts — this page has 3D and/or motion), then `uichemy-composer/describe-site`. Follow that process exactly — **except that its header/footer question is already answered: build the header and the footer as ordinary sections of this page, the first one and the last one. Do NOT create site-wide theme-builder templates, and do NOT ask the user about it.** Keep the header's literal logo image and its literal `<li>` nav items exactly as the appendix has them; use no dynamic tags.
2. **The appendix is the source of truth.** Split it into sections and build them with `uichemy-composer/page` (`create` for the first section, `append-section` for the rest), reproducing markup, copy, colors, fonts, spacing, breakpoints and motion **exactly as written**. Do not redesign, restyle, paraphrase, shorten or "improve" anything — the delivery-only page-speed changes in step 4 are the one exception, and they must not change how the page looks or moves.
3. **Media — ALWAYS WP Media, already done.** Every image / video / font / 3D model is **already in this site's media library** at the URLs in the ASSET MANIFEST (and already wired into the appendix). Use those URLs as-is. Do **not** re-upload them, hotlink them from anywhere else, or use `data:` / `blob:` / local paths. If an asset is ever missing: `uichemy-composer/media` → `find` first, then `request-upload` (for an image, add its ASSET MANIFEST **Alt text** to the upload URL as `&alt=<URL-encoded alt text>`; fonts and models have none, so leave `&alt=` out) — WP Media, never GitHub or a third-party host.
4. **PAGE SPEED — target 90+ on PageSpeed Insights, mobile AND desktop.** These are delivery changes only: the page must still look and move px-to-px like the original.
   **First read UiChemy's own speed rules:** `uichemy-composer/read-skill` with `name: "improve-page-speed"`, and follow them together with this step.
   **Then switch on UiChemy's Performance settings on this site — do this yourself, the user does not need to.** Call `uichemy-composer/performance` → `list-performance-settings` and note each setting's current state (for the report). For every one of these that is OFF, call `set-performance-setting` with `state: "enable"`, master switch first: `performance-optimization`, `critical-css`, `remove-js`, `defer-js`, `lazy-images`, `lcp-animations`, `elementor-css`, `elementor-icons`, `elementor-assets`. They only affect pages built with Composer widgets or files nothing uses, so they are safe site-wide. The two settings tied to Elementor's own site options — `elementor-fonts` (Elementor > Settings > Advanced > Google Fonts) and `font-awesome` (Load Font Awesome 4 Support) — change EVERY Elementor page: enable them only if `uichemy-composer/page` → `list` shows no published pages other than the ones this build creates; otherwise leave them as they are. Never disable a setting. Call `list-performance-settings` again to confirm, and in your final report list exactly which settings you turned on (and which you left alone and why), and that each can be turned back off in UiChemy's Performance screen or with `set-performance-setting` `state: "disable"`.
   **What those settings then do automatically — do NOT re-implement them in section code:** critical CSS and eager images for the header and the first sections, deferred library scripts (GSAP, Lenis…), removal of unused jQuery/Elementor scripts and CSS, lazy-loading of images below the first sections, LCP-safe fade-ins. They work only if the page is built for them: the first three sections (by position) stay light and visible at load (no `opacity:0` start, no hidden reveal) with heavy content further down, and section code uses no jQuery, `elementorFrontend` or `.elementor-*` classes.
   **This build must also do the following, which UiChemy does not do:**
   - **Images → WebP.** Convert every JPG/PNG photo to WebP (quality ≈ 78; PNG with transparency keeps its alpha), resized to at most **2× its largest displayed width** (never wider than the original, cap 1600 px). Upload each through the same `uichemy-composer/media` upload slot under the same base name with `.webp`, keep the original alt text, and replace the whole URL everywhere it is used. Leave SVG, GIF, video, fonts and 3D models as they are. Upload the WebP copies as NEW files; never overwrite or delete the originals.
   - **Image sizes.** Every `<img>` gets `width` and `height` attributes equal to the file's real pixel size (keeps the layout from jumping). Images outside the first screen get `loading="lazy" decoding="async"`. The one largest image in the first screen (the hero image, if there is one) gets `loading="eager" fetchpriority="high"`. Never add `<link rel="preload" as="image">`.
   - **Fonts.** In the page head code, preload only the 1–2 `.woff2` files the first screen's headline and body text use (`<link rel="preload" as="font" type="font/woff2" crossorigin>`), keep `font-display: swap`, and do not load font families or weights the page never uses. Google Fonts stylesheets use `rel="preload" as="style"` with `display=swap`, not a plain `rel="stylesheet"`.
   - **Scripts.** Page-level `<script src>` tags use `defer` (never `async` for a library another script needs). A heavy library used only by a section below the first screen (a slider, a map, a 3D scene further down) loads with UiChemy's "Run with" carrier bound to that section: `<script type="uich/deferred" data-uich-run-with="#that-section" data-uich-kind="script" data-uich-src="…" data-uich-attrs=""></script>` — never for the first three sections.
   - **Pinned scroll sections.** If a section in or right after the first screen is pinned with GSAP ScrollTrigger (`pin: true` with pin spacing), the section after it jumps down when the pin is created, which PageSpeed scores as a large layout shift. Reserve that scroll distance in CSS from the first paint (a class on `<html>` that adds the same space), and remove the class in the same script run that creates the pins, followed by `ScrollTrigger.refresh()` — nothing then moves on screen.
   - **3D / WebGL in the first screen.** PageSpeed's test devices have no GPU: every WebGL frame costs 0.2–2 s of CPU, so a scene that renders from page load scores 10–40 however light the rest is. Do this (tested: Orbit Ledger went from 9–17 to 87–100): (1) render the scene's first frame once from the real scene at its start pose — a desktop-shaped and a mobile-shaped capture, transparent background — save both as WebP with alpha, upload them, and show them as the CSS background of the 3D canvas (`background-size: auto 100%` on desktop, `100% auto` under `max-aspect-ratio: 761/1000`); (2) after the page has loaded, only `<link rel="prefetch">` the three.js, model and scene files — do not run them; (3) on the visitor's first `wheel`, `pointermove`, `pointerdown`, `touchstart` or `keydown` (not `scroll`, which scripts also fire), or as soon as the page is scrolled more than 50 px (a restored scroll position), load them in order — model before the scene script — and when the real model is ready render one frame and remove the still picture in the same task, then run the original render loop unchanged; (4) if WebGL is unavailable keep the still picture; reduced-motion visitors may load it after page load. If other code drives the scene through a shared object (e.g. scroll timelines tweening a state object), give that code a stand-in object at load and forward its values to the real one once the scene script runs. Never render a WebGL frame synchronously inside a scroll/ScrollTrigger callback — coalesce into one `requestAnimationFrame`.
   - **Measure.** After publishing, run PageSpeed Insights (`https://pagespeed.web.dev/`) on the published URL, mobile and desktop, **twice each**, logged out. Report Performance, FCP, LCP, TBT, CLS and Speed Index per run. If a run is under 90, open "Avoid long main-thread tasks" and "Layout shift culprits" in that report, fix the cause named there, and measure again.
   **For Fieldwork the measured result is already prepared: follow the `PAGE SPEED BUILD` section (before the ASSET MANIFEST) — two edits to `js/app.js` — instead of re-deriving the items above. The carousel is the first screen and the page's only content, so it stays live from load (no still picture), and the photographs keep their files. The static fallback below uses the same edited `js/app.js`.**
5. **Verify px-to-px before you call it done:** open the preview link and compare against the original at 1440 / 1024 / 768 / 390 px — same dimensions, spacing, type sizes, colors, and the same animations / 3D behaviour. Fix any drift, then run `uichemy-composer/audit`.

**Static fallback (no WordPress available):** transcribe every appendix file verbatim into a folder and serve it over HTTP (`python3 -m http.server 8777`, then open `http://localhost:8777`). It renders identically — assets still load from the WP Media URLs. An internet connection is required either way.

---

## OVERVIEW

- **Stack:** vanilla HTML + CSS + JS + Three.js (ES module, loaded from a CDN via importmap). No build step.
- **Target:** Elementor page on `https://demo.uichemy.com` via UiChemy Composer (one Composer widget per section).
- **Files:** `index.html`, `fonts/fonts.css`, `js/app.js`, `js/data.js`, `style.css`, `vendor/three.core.js`, `vendor/three.module.js`.

## PAGE SPEED BUILD — Fieldwork, exactly as tested (overrides the matching parts above)

Built and measured on demo.uichemy.com (test page, 7 Oct 2026, four PageSpeed runs; then the same build on the live demo):

| Google PageSpeed Insights | Before (live demo) | After (tested build, 4 runs) | After (live demo) |
|---|---|---|---|
| Desktop score | 59–99 | 63–100 (three of four runs 99–100) | **100** |
| Mobile score | 97–100 | 67–99 (three of four runs 97–99) | **97** |
| Total Blocking Time (desktop) | up to 17,900 ms | 0–1,500 ms | 60 ms |
| WebGL draw calls while the carousel sits idle (2 s) | 1,440 | 0 | 0 |

Same design, copy, photographs, intro loader and motion — the carousel, its turn, the shatter into a series and the lightbox look and move exactly as before (screenshots identical). This page is one WebGL scene, so its PageSpeed score swings with the test machine's graphics speed: on hosts with slow software WebGL every drawn frame costs 0.1–0.3 s. The change below removes the cost of redrawing an unchanged picture and lets slow devices finish the intro in real time.

### A · Two edits to `js/app.js` (exact find → replace, each find occurs exactly once)

Apply them to the appendix `js/app.js` before you load it as the page's module (the `three` / `./data.js` specifier changes from build note 3 are separate and still apply). Nothing else changes for speed on this page: the photographs stay as they are (they are WebGL textures listed in `js/data.js`; converting them was not needed — see build note 9 for where they live), and no still picture is needed because the carousel itself is the first screen.

What they do: A1 raises the frame-time cap from 0.05 s to 0.25 s, so a device running under 20 fps plays the intro and the turns in real time instead of in slow motion (at 60 fps nothing changes). A2 draws a frame only when something on screen changed — camera, every object's world matrix and opacity, uniforms, canvas size and newly loaded textures are compared to 4 decimals — so the idle carousel costs no WebGL work while every turn, tween, intro step, resize or texture load still draws. Everything else in `js/app.js` is unchanged.

**A1 · `js/app.js`** — find (occurs exactly once):

```js
  const dt = Math.min(0.05, (now - lastT) / 1000);
```

replace with:

```js
  const dt = Math.min(0.25, (now - lastT) / 1000); /* speed: devices under 20 fps catch up in real time (was capped at 0.05) */
```

**A2 · `js/app.js`** — find (occurs exactly once):

```js
  updateGlass(now / 1000);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
```

replace with:

```js
  updateGlass(now / 1000);
  if (sceneChanged()) renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

/* speed: a frame identical to the one already on screen is not drawn again (values compared to 4 decimals, far below a
   pixel), so the idle carousel costs nothing; every change (turn, intro, tweens, resize, new texture) still draws. */
let lastSig = '';
function sceneChanged() {
  const a = [renderer.domElement.width, renderer.domElement.height];
  const add = v => a.push(Math.round(v * 1e4));
  scene.updateMatrixWorld(); camera.updateMatrixWorld();
  camera.matrixWorld.elements.forEach(add); camera.projectionMatrix.elements.forEach(add);
  scene.traverse(o => {
    a.push(o.visible ? 1 : 0); if (!o.visible) return;
    o.matrixWorld.elements.forEach(add);
    const m = o.material; if (!m) return;
    add(m.opacity); a.push(m.version);
    const u = m.uniforms; if (!u) return;
    for (const k in u) {
      const x = u[k].value;
      if (typeof x === 'number') add(x);
      else if (x && x.isTexture) a.push(x.id, x.version);
      else if (x && x.toArray) x.toArray().forEach(add);
      else a.push(x == null ? -1 : 0);
    }
  });
  const sig = a.join(',');
  if (sig === lastSig) return false;
  lastSig = sig; return true;
}
```

### B · Check after publishing

- Logged out: the loader counts to 100, `FIELDWORK` rises, the drum turns with scroll and drag, a click shatters a plate into its series, frames open the lightbox — exactly as before; no console errors.
- With the carousel idle, the WebGL canvas is not redrawn: wrap `getContext('webgl2')`'s `drawElements`/`drawArrays` in a counter for 2 s — 0 calls while idle, calls again as soon as you scroll or drag.
- PageSpeed Insights on the published URL, mobile and desktop, twice each, logged out: expect about 97–100 on both; a run in the 60s with a multi-second Total Blocking Time means that test machine had slow software WebGL — run it again.

## ASSET MANIFEST — WP Media Library on `demo.uichemy.com` (already referenced by URL in the appendix)

41 asset(s) in WP Media. **Alt text:** the photographs' alt is the one `js/app.js` gives them in the series view (`<Series title> — frame <n>`); fonts have none.

| Asset (original path) | Hosted URL | Attachment | Via | Alt text |
|---|---|---|---|---|
| `fonts/bodoni-moda-latin-400-italic.woff2` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-bodoni-moda-latin-400-italic.woff2` | — | mapped | — |
| `fonts/bodoni-moda-latin-400-normal.woff2` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-bodoni-moda-latin-400-normal.woff2` | — | mapped | — |
| `fonts/hanken-grotesk-latin-400-normal.woff2` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-hanken-grotesk-latin-400-normal.woff2` | — | mapped | — |
| `fonts/hanken-grotesk-latin-500-normal.woff2` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-hanken-grotesk-latin-500-normal.woff2` | — | mapped | — |
| `fonts/hanken-grotesk-latin-600-normal.woff2` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-hanken-grotesk-latin-600-normal.woff2` | — | mapped | — |
| `img/dusk-1.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-1.jpg` | — | mapped | Dusk — frame 1 |
| `img/dusk-2.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-2.jpg` | — | mapped | Dusk — frame 2 |
| `img/dusk-3.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-3.jpg` | — | mapped | Dusk — frame 3 |
| `img/dusk-4.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-4.jpg` | — | mapped | Dusk — frame 4 |
| `img/dusk-5.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-5.jpg` | — | mapped | Dusk — frame 5 |
| `img/dusk-6.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-6.jpg` | — | mapped | Dusk — frame 6 |
| `img/fog-1.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-1.jpg` | — | mapped | Fog — frame 1 |
| `img/fog-2.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-2.png` | — | mapped | Fog — frame 2 |
| `img/fog-3.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-3.jpg` | — | mapped | Fog — frame 3 |
| `img/fog-4.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-4.jpg` | — | mapped | Fog — frame 4 |
| `img/fog-5.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-5.jpg` | — | mapped | Fog — frame 5 |
| `img/fog-6.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-6.jpg` | — | mapped | Fog — frame 6 |
| `img/ice-1.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-1.jpg` | — | mapped | Ice — frame 1 |
| `img/ice-2.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-2.jpg` | — | mapped | Ice — frame 2 |
| `img/ice-3.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-3.jpg` | — | mapped | Ice — frame 3 |
| `img/ice-4.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-4.jpg` | — | mapped | Ice — frame 4 |
| `img/ice-5.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-5.jpg` | — | mapped | Ice — frame 5 |
| `img/ice-6.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-6.jpg` | — | mapped | Ice — frame 6 |
| `img/ridge-1.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-1.jpg` | — | mapped | Ridge — frame 1 |
| `img/ridge-2.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-2.jpg` | — | mapped | Ridge — frame 2 |
| `img/ridge-3.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-3.jpg` | — | mapped | Ridge — frame 3 |
| `img/ridge-4.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-4.jpg` | — | mapped | Ridge — frame 4 |
| `img/ridge-5.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-5.jpg` | — | mapped | Ridge — frame 5 |
| `img/ridge-6.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-6.jpg` | — | mapped | Ridge — frame 6 |
| `img/salt-1.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-1.jpg` | — | mapped | Salt — frame 1 |
| `img/salt-2.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-2.jpg` | — | mapped | Salt — frame 2 |
| `img/salt-3.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-3.jpg` | — | mapped | Salt — frame 3 |
| `img/salt-4.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-4.jpg` | — | mapped | Salt — frame 4 |
| `img/salt-5.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-5-1.jpg` | — | mapped | Salt — frame 5 |
| `img/salt-6.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-6.jpg` | — | mapped | Salt — frame 6 |
| `img/tide-1.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-1.jpg` | — | mapped | Tide — frame 1 |
| `img/tide-2.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-2.jpg` | — | mapped | Tide — frame 2 |
| `img/tide-3.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-3.jpg` | — | mapped | Tide — frame 3 |
| `img/tide-4.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-4.jpg` | — | mapped | Tide — frame 4 |
| `img/tide-5.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-5.jpg` | — | mapped | Tide — frame 5 |
| `img/tide-6.jpg` | `https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-6.jpg` | — | mapped | Tide — frame 6 |


---

# APPENDIX · VERBATIM SOURCE

The complete source of every file. **Transcribe / convert from these exactly** — do not change a value, a comment, a class name, or the order of a declaration. Recreate the file layout below.

```
index.html
fonts/fonts.css
js/app.js
js/data.js
style.css
vendor/three.core.js
vendor/three.module.js
```

## `index.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Oona Varga — Fieldwork</title>
  <meta name="description" content="Oona Varga photographs weather on northern water: fog, ice, salt, tide, ridge and dusk.">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='13' r='7' fill='%231d4a3f'/%3E%3Crect x='4' y='23' width='24' height='2.5' rx='1.25' fill='%231d4a3f'/%3E%3C/svg%3E">
  <link rel="stylesheet" href="fonts/fonts.css">
  <link rel="stylesheet" href="style.css?v=6">
  <script type="importmap">{ "imports": { "three": "./vendor/three.module.js" } }</script>
</head>
<body data-view="loading">

  <!-- Loader -->
  <div class="loader" aria-hidden="true">
    <div class="loader-inner">
      <svg class="mark" viewBox="0 0 32 32"><circle cx="16" cy="13" r="7"/><rect x="4" y="23" width="24" height="2.5" rx="1.25"/></svg>
      <p class="loader-name">Oona Varga</p>
      <div class="loader-bar"><i></i></div>
      <span class="loader-count">000</span>
    </div>
  </div>

  <!-- Top bar -->
  <header class="top">
    <a class="brand" href="#" data-home aria-label="Oona Varga, home">
      <svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="13" r="7"/><rect x="4" y="23" width="24" height="2.5" rx="1.25"/></svg>
      <span>Oona Varga</span>
    </a>
    <p class="top-line">Photographs of weather on northern water.</p>
    <button class="top-link" data-about>About</button>
  </header>

  <!-- Home -->
  <h1 class="mega" aria-label="Fieldwork"><span class="mega-inner">FIELDWORK</span></h1>
  <p class="home-hint"><span class="home-index">01 / 06</span><span class="home-help">Scroll or drag to turn · click to open</span></p>

  <canvas class="gl" aria-hidden="true"></canvas>
  <div class="tag" aria-hidden="true">Open series</div>

  <!-- Series (content filled by JS) -->
  <div class="scroll-space"></div>
  <main class="series" aria-live="polite"></main>

  <!-- Lightbox -->
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer">
    <div class="lightbox-bg"></div>
    <img class="lightbox-img" alt="">
    <p class="lightbox-cap"></p>
  </div>

  <!-- About -->
  <aside class="about" aria-hidden="true">
    <div class="about-card">
      <button class="about-close" data-about aria-label="Close about">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <p class="eyebrow">About</p>
      <p class="about-lede">Oona Varga walks out early and waits for the weather to do something worth keeping. Six ongoing series, shot on foot, from the air and from very cold shorelines.</p>
      <p class="about-row"><span>Commissions</span><a href="mailto:studio@oonavarga.example">studio@oonavarga.example</a></p>
      <p class="about-row"><span>Represented by</span><em>Available for editorial and print work</em></p>
      <p class="about-credits"></p>
    </div>
  </aside>

  <!-- Control dock -->
  <nav class="dock" aria-label="Controls">
    <div class="dock-shell">
      <button class="dock-btn dock-back" data-act="back" aria-label="Back to all series">
        <svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
      </button>
      <div class="dock-info">
        <span class="dock-thumb"><img alt=""></span>
        <span class="dock-text"><small></small><b></b></span>
      </div>
      <div class="dock-arrows">
        <button class="dock-mini" data-act="prev" aria-label="Previous">
          <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <button class="dock-mini" data-act="next" aria-label="Next">
          <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
    <button class="dock-round" data-act="round">
      <svg class="i-flat" viewBox="0 0 24 24"><path d="M4 9h16M4 15h16"/></svg>
      <svg class="i-arc" viewBox="0 0 24 24"><path d="M4 8c5 3 11 3 16 0M4 16c5-3 11-3 16 0"/></svg>
      <svg class="i-close" viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>
      <svg class="i-up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
      <span class="dock-round-label">Unroll</span>
    </button>
  </nav>

  <noscript><p class="noscript">This portfolio needs JavaScript to show its photographs.</p></noscript>
  <script type="module" src="js/app.js?v=7"></script>
</body>
</html>

```

## `fonts/fonts.css`

```css
/* Self-hosted, SIL Open Font License 1.1 — see OFL-*.txt in this folder. */
@font-face { font-family: "Bodoni Moda"; font-style: normal; font-weight: 400; font-display: swap; src: url("bodoni-moda-latin-400-normal.woff2") format("woff2"); }
@font-face { font-family: "Bodoni Moda"; font-style: italic; font-weight: 400; font-display: swap; src: url("bodoni-moda-latin-400-italic.woff2") format("woff2"); }
@font-face { font-family: "Hanken Grotesk"; font-style: normal; font-weight: 400; font-display: swap; src: url("hanken-grotesk-latin-400-normal.woff2") format("woff2"); }
@font-face { font-family: "Hanken Grotesk"; font-style: normal; font-weight: 500; font-display: swap; src: url("hanken-grotesk-latin-500-normal.woff2") format("woff2"); }
@font-face { font-family: "Hanken Grotesk"; font-style: normal; font-weight: 600; font-display: swap; src: url("hanken-grotesk-latin-600-normal.woff2") format("woff2"); }

```

## `js/app.js`

```js
import * as THREE from 'three';
import { SERIES } from './data.js';

/* ================================================================
   Fieldwork — a curved WebGL contact strip that breaks into glass.
   Plain JS + Three.js. Everything is measured in CSS pixels: the
   camera sits so that 1 world unit == 1px on the z=0 plane.
   ================================================================ */

const N = SERIES.length;
const $ = (s, r = document) => r.querySelector(s);
const body = document.body;
const root = document.documentElement;
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(pointer: fine)').matches;
const FROST = [0.945, 0.957, 0.953];

const pad = n => String(n).padStart(2, '0');
const mod = (a, n) => ((a % n) + n) % n;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const chars = t => [...t].map((c, i) => `<span class="ch" style="--i:${i}" aria-hidden="true">${c}</span>`).join('');

/* ---------- tiny tween engine ---------- */
const ease = {
  out: t => 1 - Math.pow(1 - t, 4),
  expo: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  io: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  lin: t => t,
};
const tweens = new Set();
function tween(dur, fn, e = ease.io, delay = 0) {
  const k = REDUCE ? 0.001 : 1;
  return new Promise(res => tweens.add({ t0: performance.now() + delay * 1000 * k, dur: Math.max(1, dur * 1000 * k), fn, e, res }));
}
function runTweens(now) {
  for (const tw of tweens) {
    if (now < tw.t0) continue;
    const p = Math.min(1, (now - tw.t0) / tw.dur);
    tw.fn(tw.e(p), p);
    if (p === 1) { tweens.delete(tw); tw.res(); }
  }
}
const wait = s => new Promise(r => setTimeout(r, REDUCE ? 0 : s * 1000));
const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.decoding = 'async'; i.onload = () => res(i); i.onerror = rej; i.src = src; });

/* ---------- DOM ---------- */
const el = {
  loaderBar: $('.loader-bar i'), loaderCount: $('.loader-count'),
  megaInner: $('.mega-inner'), mega: $('.mega'),
  homeIndex: $('.home-index'), tag: $('.tag'),
  series: $('.series'), space: $('.scroll-space'),
  lb: $('.lightbox'), lbImg: $('.lightbox-img'), lbCap: $('.lightbox-cap'), lbBg: $('.lightbox-bg'),
  shell: $('.dock-shell'), dockText: $('.dock-text'), dockSmall: $('.dock-text small'), dockBig: $('.dock-text b'),
  dockThumb: $('.dock-thumb img'), round: $('.dock-round'), roundLabel: $('.dock-round-label'),
  credits: $('.about-credits'),
};
el.megaInner.innerHTML = chars(el.megaInner.textContent);

const credits = [...new Set(SERIES.flatMap(s => s.frames.map(f => f.by)))];
el.credits.textContent = `This is a demo portfolio. Photographs by ${credits.join(', ')} — via Pexels, used under the Pexels licence.`;

/* ---------- state ---------- */
let view = 'loading';            // loading | home | series | lightbox
let busy = true;
let current = 0;                 // series index shown/open
let vw = innerWidth, vh = innerHeight;
function setView(v) { view = v; body.dataset.view = v; }
function setBusy(b) { busy = b; body.classList.toggle('busy', b); }
setBusy(true);

/* ================================================================
   Renderer
   ================================================================ */
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ canvas: $('.gl'), antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  root.classList.add('webgl');
} catch (e) { renderer = null; }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 1, 10000);
const texLoader = new THREE.TextureLoader();
const MAX_ANISO = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;

/* ================================================================
   Drum — six panels on one cylinder; uCurve morphs it into a flat strip
   ================================================================ */
const drumVS = /* glsl */`
  uniform float uW, uH, uR, uGap, uCurve, uOffset, uStep, uMirror, uY, uReflGap;
  varying vec2 vUv;
  varying float vFace;
  void main() {
    vUv = uv;
    float x = position.x * uW;
    float y = position.y * uH;
    float a = uOffset * uStep + x / uR;
    vec3 onArc  = vec3(uR * sin(a), y, uR * cos(a) - uR);
    vec3 onLine = vec3(uOffset * (uW + uGap) + x, y, 0.0);
    vec3 p = mix(onLine, onArc, uCurve);
    if (uMirror > 0.5) p.y = -uH - uReflGap - p.y;
    p.y += uY;
    vFace = mix(1.0, cos(a), uCurve);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }`;
const drumFS = /* glsl */`
  uniform sampler2D uTex;
  uniform float uAlpha, uMirror, uHide;
  varying vec2 vUv;
  varying float vFace;
  const vec3 FROST = vec3(${FROST.join(',')});
  void main() {
    vec4 c = texture2D(uTex, vUv);
    c.rgb = mix(FROST, c.rgb, clamp(0.4 + 0.6 * vFace, 0.0, 1.0));
    float a = uAlpha * (1.0 - uHide) * smoothstep(-0.1, 0.6, vFace);
    if (uMirror > 0.5) {
      a *= 0.34 * (1.0 - smoothstep(0.0, 0.55, vUv.y));
      c.rgb = mix(c.rgb, FROST, 0.3);
    }
    if (a < 0.004) discard;
    gl_FragColor = vec4(c.rgb, a);
  }`;

const drum = { W: 0, H: 0, R: 0, gap: 0, y: 0, progress: 0, target: 0, lift: 0 };
const common = {
  uW: { value: 1 }, uH: { value: 1 }, uR: { value: 1 }, uGap: { value: 0 }, uCurve: { value: 1 },
  uStep: { value: (Math.PI * 2) / N }, uY: { value: 0 }, uReflGap: { value: 0 }, uAlpha: { value: 0 },
};
const drumGeo = new THREE.PlaneGeometry(1, 1, 72, 1);
const panels = SERIES.map(() => {
  const make = mirror => {
    const mat = new THREE.ShaderMaterial({
      uniforms: { ...common, uTex: { value: null }, uOffset: { value: 0 }, uMirror: { value: mirror }, uHide: { value: 0 } },
      vertexShader: drumVS, fragmentShader: drumFS, transparent: true, side: THREE.DoubleSide, depthWrite: !mirror,
    });
    const m = new THREE.Mesh(drumGeo, mat);
    m.frustumCulled = false;
    m.renderOrder = mirror ? 0 : 1;
    m.visible = false;
    scene.add(m);
    return m;
  };
  return { front: make(0), refl: make(1), tex: null };
});
const setHidden = (i, h) => { panels[i].front.material.uniforms.uHide.value = h; panels[i].refl.material.uniforms.uHide.value = h; };

function layoutDrum() {
  const small = vw < 720;
  drum.W = small ? vw * 0.8 : clamp(vw * 0.44, 320, 780);
  drum.H = drum.W * 0.55;
  drum.gap = drum.W * 0.04;
  drum.R = (N * (drum.W + drum.gap)) / (Math.PI * 2);
  drum.y = small ? vh * 0.03 : -vh * 0.045;
  common.uW.value = drum.W; common.uH.value = drum.H; common.uR.value = drum.R;
  common.uGap.value = drum.gap; common.uReflGap.value = drum.H * 0.05;
}

// Panel artwork: photo + series title, painted once into a canvas texture.
function paintPanel(img, s, i) {
  const cw = 1600, ch = Math.round(cw * 0.55);
  const c = document.createElement('canvas');
  c.width = cw; c.height = ch;
  const g = c.getContext('2d');
  const k = Math.max(cw / img.width, ch / img.height);
  g.drawImage(img, (cw - img.width * k) / 2, (ch - img.height * k) / 2, img.width * k, img.height * k);
  const wash = g.createLinearGradient(0, 0, 0, ch);
  wash.addColorStop(0, 'rgba(29,74,63,0.04)');
  wash.addColorStop(1, 'rgba(29,74,63,0.22)');
  g.fillStyle = wash; g.fillRect(0, 0, cw, ch);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = 'rgba(29,74,63,0.35)'; g.shadowBlur = 50;
  g.fillStyle = 'rgba(241,244,243,0.9)';
  g.font = `italic 400 ${Math.round(ch * 0.36)}px "Bodoni Moda"`;
  g.fillText(s.title, cw / 2, ch * 0.47);
  g.shadowBlur = 0;
  g.font = `600 ${Math.round(ch * 0.028)}px "Hanken Grotesk"`;
  if ('letterSpacing' in g) g.letterSpacing = `${Math.round(ch * 0.008)}px`;
  g.fillText(`SERIES ${pad(i + 1)}  ·  ${s.place.toUpperCase()}`, cw / 2, ch * 0.86);
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = MAX_ANISO;
  return t;
}

/* ================================================================
   Glass — Voronoi shards cut from the clicked panel
   ================================================================ */
const shardVS = /* glsl */`
  varying vec2 vUv;
  varying float vTilt;
  void main() {
    vUv = uv;
    vec3 n = normalize(normalMatrix * vec3(0.0, 0.0, 1.0));
    vTilt = 1.0 - abs(n.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;
const shardFS = /* glsl */`
  uniform sampler2D uTex;
  uniform float uAlpha;
  varying vec2 vUv;
  varying float vTilt;
  const vec3 FROST = vec3(${FROST.join(',')});
  void main() {
    vec3 c = texture2D(uTex, vUv).rgb;
    c = mix(c, FROST, 0.1 + vTilt * 0.5);
    gl_FragColor = vec4(c, uAlpha);
  }`;
const shardMat = new THREE.ShaderMaterial({
  uniforms: { uTex: { value: null }, uAlpha: { value: 1 } },
  vertexShader: shardVS, fragmentShader: shardFS, side: THREE.DoubleSide, transparent: true,
});
const glass = { list: [], mode: 'none', t: 0, crack: 0 };

function clipPoly(poly, a, b, c) {
  const out = [];
  for (let k = 0; k < poly.length; k++) {
    const P = poly[k], Q = poly[(k + 1) % poly.length];
    const dp = a * P[0] + b * P[1] - c, dq = a * Q[0] + b * Q[1] - c;
    if (dp <= 0) out.push(P);
    if ((dp < 0 && dq > 0) || (dp > 0 && dq < 0)) {
      const t = dp / (dp - dq);
      out.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]);
    }
  }
  return out;
}
function voronoiCells(W, H, cx, cy) {
  const seeds = [];
  for (let i = 0; i < 20; i++) seeds.push([rand(-W / 2, W / 2), rand(-H / 2, H / 2)]);
  for (let i = 0; i < 16; i++) {
    const a = rand(0, Math.PI * 2), r = Math.pow(Math.random(), 1.4) * W * 0.17;
    seeds.push([clamp(cx + Math.cos(a) * r, -W / 2 + 1, W / 2 - 1), clamp(cy + Math.sin(a) * r, -H / 2 + 1, H / 2 - 1)]);
  }
  const rect = [[-W / 2, -H / 2], [W / 2, -H / 2], [W / 2, H / 2], [-W / 2, H / 2]];
  return seeds.map((s, i) => {
    let poly = rect;
    for (let j = 0; j < seeds.length && poly.length >= 3; j++) {
      if (i === j) continue;
      const t = seeds[j];
      poly = clipPoly(poly, t[0] - s[0], t[1] - s[1], (t[0] ** 2 + t[1] ** 2 - s[0] ** 2 - s[1] ** 2) / 2);
    }
    return poly;
  }).filter(p => p.length >= 3);
}

// Maps a flat point on the front panel to its place on the (possibly curved) drum.
function onDrum(x, y) {
  const c = common.uCurve.value, a = x / drum.R;
  return new THREE.Vector3(lerp(x, drum.R * Math.sin(a), c), y + drum.y, lerp(0, drum.R * Math.cos(a) - drum.R, c));
}

function colHalf() { return Math.min(640, vw * 0.86) / 2; }

function buildGlass(i, clickX, clickY) {
  clearGlass();
  shardMat.uniforms.uTex.value = panels[i].tex;
  const { W, H } = drum;
  const cells = voronoiCells(W, H, clickX, clickY);
  const half = colHalf();
  const roomy = vw / 2 - half > 110;
  const span = vh + 300;
  const sides = { '-1': [], '1': [] };

  cells.forEach(poly => {
    let gx = 0, gy = 0;
    poly.forEach(p => { gx += p[0]; gy += p[1]; });
    gx /= poly.length; gy /= poly.length;
    const C = onDrum(gx, gy);
    const pos = [], uv = [];
    for (let k = 0; k < poly.length; k++) {
      const tri = [[gx, gy], poly[k], poly[(k + 1) % poly.length]];
      for (const [x, y] of tri) {
        const m = onDrum(x, y);
        pos.push(m.x - C.x, m.y - C.y, m.z - C.z);
        uv.push(x / W + 0.5, y / H + 0.5);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    const mesh = new THREE.Mesh(geo, shardMat);
    mesh.frustumCulled = false;
    mesh.renderOrder = 3;
    scene.add(mesh);

    const dx = gx - clickX, dy = gy - clickY, dist = Math.hypot(dx, dy) || 1;
    const dir = [dx / dist, dy / dist];
    const side = gx < 0 ? -1 : 1;
    const s = {
      mesh, A: C, dir, side,
      delay: clamp(dist / W, 0, 1) * 0.3,
      mid: new THREE.Vector3(C.x + dir[0] * (dist * 0.6 + W * 0.3), C.y + dir[1] * (dist * 0.6 + H * 0.4), rand(240, 520)),
      crack: rand(4, 11),
      rot: [rand(-1.1, 1.1), rand(-1.2, 1.2), rand(-Math.PI, Math.PI)],
      sc: rand(0.45, 0.9),
      phase: rand(0, Math.PI * 2),
      k: 0, F: new THREE.Vector3(),
    };
    s.F.x = roomy ? side * rand(half + 40, vw / 2 + 20) : side * rand(vw * 0.34, vw * 0.62);
    if (!roomy) s.sc *= 0.6;
    s.F.z = roomy ? rand(-260, 140) : rand(-800, -350);
    s.k = 0.18 + (s.F.z + 800) / 1400 * 0.5;       // nearer shards drift faster with scroll
    sides[side].push(s);
    glass.list.push(s);
  });
  // spread each side evenly down the page so shards never clump
  for (const k in sides) {
    const arr = sides[k].sort(() => Math.random() - 0.5);
    arr.forEach((s, j) => { s.F.y = -span / 2 + ((j + 0.5) / arr.length) * span + rand(-30, 30); });
  }
}
function clearGlass() {
  glass.list.forEach(s => { scene.remove(s.mesh); s.mesh.geometry.dispose(); });
  glass.list = [];
  glass.mode = 'none';
}

const bez = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c;
const tmp = new THREE.Vector3();
function floatState(s, time) {
  const span = vh + 300;
  let y = s.F.y + scroll.smooth * s.k + Math.sin(time * 0.6 + s.phase) * 14;
  y = mod(y + span / 2, span) - span / 2;
  return {
    x: s.F.x + Math.sin(time * 0.4 + s.phase) * 10, y, z: s.F.z,
    rx: s.rot[0] + Math.sin(time * 0.35 + s.phase) * 0.25,
    ry: s.rot[1] + Math.cos(time * 0.3 + s.phase) * 0.3,
    rz: s.rot[2] + time * 0.05 * s.side,
  };
}
function updateGlass(time) {
  if (!glass.list.length) return;
  for (const s of glass.list) {
    const f = floatState(s, time);
    const m = s.mesh;
    const cx = s.A.x + s.dir[0] * s.crack * glass.crack;
    const cy = s.A.y + s.dir[1] * s.crack * glass.crack;
    const cz = s.A.z + s.crack * 2 * glass.crack;
    if (glass.mode === 'float') {
      m.position.set(f.x, f.y, f.z); m.rotation.set(f.rx, f.ry, f.rz); m.scale.setScalar(s.sc);
    } else if (glass.mode === 'hold') {
      m.position.set(cx, cy, cz); m.rotation.set(0, 0, s.dir[0] * 0.02 * glass.crack); m.scale.setScalar(1);
    } else {
      const lt = clamp((glass.t - (glass.mode === 'burst' ? s.delay : 0.3 - s.delay)) / 0.7, 0, 1);
      const u = glass.mode === 'burst' ? ease.out(lt) : 1 - ease.io(lt);
      tmp.set(bez(cx, s.mid.x, f.x, u), bez(cy, s.mid.y, f.y, u), bez(cz, s.mid.z, f.z, u));
      m.position.copy(tmp);
      m.rotation.set(f.rx * u, f.ry * u, f.rz * u);
      m.scale.setScalar(lerp(1, s.sc, u));
    }
  }
}

/* ================================================================
   Series frames — WebGL planes that follow DOM boxes and bend with speed
   ================================================================ */
const planeVS = /* glsl */`
  uniform vec2 uSize, uPos;
  uniform float uVel;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = vec3(position.xy * uSize, 0.0);
    float bow = sin(uv.x * 3.14159265);
    p.y -= uVel * bow * 0.9;
    p.z -= abs(uVel) * bow * 1.6;
    p.xy += uPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }`;
const planeFS = /* glsl */`
  uniform sampler2D uTex;
  uniform float uReveal, uHover, uAlpha, uLoaded;
  varying vec2 vUv;
  const vec3 MIST = vec3(0.875, 0.902, 0.890);
  void main() {
    if (vUv.y > uReveal) discard;
    float z = 1.0 - 0.07 * uHover - 0.14 * (1.0 - uReveal);
    vec3 c = texture2D(uTex, (vUv - 0.5) * z + 0.5).rgb;
    gl_FragColor = vec4(mix(MIST, c, uLoaded), uAlpha);
  }`;
const planeGeo = new THREE.PlaneGeometry(1, 1, 24, 12);
let planes = [];
let seriesIn = false;

function buildPlanes(i) {
  clearPlanes();
  const frames = SERIES[i].frames;
  el.series.querySelectorAll('.frame').forEach((box, k) => {
    const u = {
      uTex: { value: null }, uSize: { value: new THREE.Vector2() }, uPos: { value: new THREE.Vector2() },
      uVel: { value: 0 }, uReveal: { value: 0 }, uHover: { value: 0 }, uAlpha: { value: 1 }, uLoaded: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: planeVS, fragmentShader: planeFS, transparent: true });
    const mesh = new THREE.Mesh(planeGeo, mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = 2;
    scene.add(mesh);
    const p = { box, mesh, u, top: 0, left: 0, w: 0, h: 0, shown: false, hover: 0, hoverTo: 0 };
    texLoader.load(frames[k].src, t => {
      if (!planes.includes(p)) { t.dispose(); return; }
      t.anisotropy = MAX_ANISO;
      u.uTex.value = t;
      tween(0.6, e => (u.uLoaded.value = e));
    });
    box.addEventListener('pointerenter', () => (p.hoverTo = 1));
    box.addEventListener('pointerleave', () => (p.hoverTo = 0));
    planes.push(p);
  });
  measure();
}
function clearPlanes() {
  planes.forEach(p => { scene.remove(p.mesh); p.mesh.material.dispose(); p.u.uTex.value?.dispose(); });
  planes = [];
}
function measure() {
  planes.forEach(p => {
    const r = p.box.getBoundingClientRect();
    p.top = r.top + scroll.smooth; p.left = r.left; p.w = r.width; p.h = r.height;
  });
  if (view === 'series' || view === 'lightbox') el.space.style.height = `${el.series.offsetHeight}px`;
}
function updatePlanes() {
  for (const p of planes) {
    const y = p.top - scroll.smooth;
    const on = y < vh + 240 && y + p.h > -240;
    p.mesh.visible = on;
    if (!on) continue;
    p.u.uPos.value.set(p.left + p.w / 2 - vw / 2, vh / 2 - (y + p.h / 2));
    p.u.uSize.value.set(p.w, p.h);
    p.u.uVel.value = REDUCE ? 0 : clamp(scroll.vel, -70, 70);
    p.hover += (p.hoverTo - p.hover) * 0.1;
    p.u.uHover.value = p.hover;
    if (!p.shown && seriesIn && y < vh * 0.9) {
      p.shown = true;
      tween(1.4, e => (p.u.uReveal.value = e), ease.expo);
    }
  }
}

/* ---------- virtual smooth scroll (series view) ---------- */
const scroll = { smooth: 0, vel: 0, last: 0 };
function updateScroll(dt) {
  if (view !== 'series' && view !== 'lightbox') return;
  const k = 1 - Math.pow(1 - (FINE ? 0.1 : 0.3), dt * 60);
  const prev = scroll.smooth;
  scroll.smooth += (scrollY - scroll.smooth) * k;
  if (Math.abs(scrollY - scroll.smooth) < 0.05) scroll.smooth = scrollY;
  scroll.vel += ((scroll.smooth - prev) - scroll.vel) * 0.25;
  el.series.style.transform = `translate3d(0,${-scroll.smooth}px,0)`;
}
function resetScroll() {
  window.scrollTo(0, 0);
  scroll.smooth = 0; scroll.vel = 0;
  el.series.style.transform = 'translate3d(0,0,0)';
}

/* ================================================================
   Series DOM
   ================================================================ */
function renderSeries(i) {
  const s = SERIES[i], next = SERIES[(i + 1) % N];
  el.series.innerHTML = `
    <header class="series-head">
      <p class="eyebrow">Series ${pad(i + 1)} / ${pad(N)} · ${s.place} · ${s.years}</p>
      <h2 class="series-title" aria-label="${s.title}">${chars(s.title)}</h2>
      <p class="series-blurb">${s.blurb}</p>
    </header>
    <section class="frames" aria-label="${s.title} photographs">
      ${s.frames.map((f, k) => `
        <figure class="${k % 3 === 1 ? 'wide' : ''}">
          <button class="frame" data-k="${k}" style="aspect-ratio:${f.w} / ${f.h}" aria-label="Enlarge frame ${k + 1}">
            <img src="${f.src}" alt="${s.title} — frame ${k + 1}" loading="lazy" decoding="async">
            <span class="frame-tag">View</span>
          </button>
          <figcaption><span><b>${pad(k + 1)}</b> · ${f.time}</span><span>Photograph: ${f.by} / Pexels</span></figcaption>
        </figure>`).join('')}
    </section>
    <section class="next">
      <p class="eyebrow">Next series</p>
      <a class="next-link" href="#" data-next="${(i + 1) % N}"><span>${next.title}</span><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </section>
    <footer class="series-foot"><span>© 2026 Oona Varga — demo portfolio</span><span>Photographs courtesy of Pexels contributors</span></footer>`;
}

/* ================================================================
   Dock
   ================================================================ */
function dock(small, big, thumb) {
  if (el.dockBig.textContent !== big || el.dockSmall.textContent !== small) {
    el.dockSmall.textContent = small;
    el.dockBig.textContent = big;
    el.dockText.classList.remove('swap'); void el.dockText.offsetWidth; el.dockText.classList.add('swap');
  }
  if (thumb && !el.dockThumb.src.endsWith(thumb)) el.dockThumb.src = thumb;
  const label = view === 'home' ? (body.dataset.mode === 'arc' ? 'Unroll' : 'Curve') : view === 'series' ? 'Top' : 'Close';
  el.roundLabel.textContent = label;
  el.round.setAttribute('aria-label', view === 'home' ? label === 'Unroll' ? 'Unroll the strip' : 'Curve the strip' : label);
  requestAnimationFrame(() => {
    let w = 0;
    for (const c of el.shell.children) {
      if (getComputedStyle(c).display === 'none') continue;
      w += c.offsetWidth + parseFloat(getComputedStyle(c).marginLeft);
    }
    el.shell.style.width = `${w + 2}px`;
  });
}
function dockHome(i) {
  dock(`Series ${pad(i + 1)}`, SERIES[i].title, SERIES[i].frames[0].src);
  el.homeIndex.textContent = `${pad(i + 1)} / ${pad(N)}`;
}

/* ================================================================
   Home interaction
   ================================================================ */
let shownIndex = -1;
let snapTimer = 0;

const step = d => { drum.target = Math.round(drum.target) + d; };
const settled = () => Math.abs(drum.progress - Math.round(drum.progress)) < 0.35;
const prefetched = new Set();
function prefetch(i) {
  if (prefetched.has(i)) return;
  prefetched.add(i);
  SERIES[i].frames.forEach(f => loadImg(f.src).catch(() => {}));
}

function frontHit(x, y) {
  const c = common.uCurve.value;
  const halfW = lerp(drum.W / 2, drum.R * Math.sin(drum.W / (2 * drum.R)) * 0.96, c);
  const cy = vh / 2 - drum.y;
  const lx = x - vw / 2, ly = cy - y;
  const inY = Math.abs(ly) < drum.H / 2;
  if (!inY) return 0;
  if (Math.abs(lx) < halfW) return 'front';
  return lx < 0 ? -1 : 1;
}
function toPanelLocal(x, y) {
  const c = common.uCurve.value;
  const sx = x - vw / 2;
  const onArc = drum.R * Math.asin(clamp(sx / drum.R, -1, 1));
  return [clamp(lerp(sx, onArc, c), -drum.W / 2, drum.W / 2), clamp((vh / 2 - y) - drum.y, -drum.H / 2, drum.H / 2)];
}

const ignore = t => t.closest('.dock, .top, .about, .lightbox');
let drag = null;
addEventListener('pointerdown', e => {
  if (view !== 'home' || busy || ignore(e.target) || body.classList.contains('about-open')) return;
  drag = { x: e.clientX, y: e.clientY, start: drum.target, moved: false, id: e.pointerId };
});
addEventListener('pointermove', e => {
  if (view !== 'home') return;
  if (drag && drag.id === e.pointerId) {
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 6) { drag.moved = true; body.classList.add('dragging'); }
    if (drag.moved) drum.target = drag.start - dx / (drum.W + drum.gap) * 1.1;
  }
  const hit = !drag?.moved && !busy && !ignore(e.target) && frontHit(e.clientX, e.clientY) === 'front';
  body.classList.toggle('over-panel', hit);
  el.tag.classList.toggle('on', hit && FINE);
  el.tag.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
});
addEventListener('pointerup', e => {
  if (!drag || drag.id !== e.pointerId) return;
  const d = drag; drag = null;
  body.classList.remove('dragging');
  if (d.moved) { drum.target = Math.round(drum.target); return; }
  if (view !== 'home' || busy) return;
  const hit = frontHit(e.clientX, e.clientY);
  if (hit === 'front' && settled()) openSeries(mod(Math.round(drum.progress), N), toPanelLocal(e.clientX, e.clientY));
  else if (hit === -1 || hit === 1) step(hit);
});
addEventListener('pointercancel', () => { drag = null; body.classList.remove('dragging'); });
addEventListener('wheel', e => {
  if (view === 'lightbox') { e.preventDefault(); return; }
  if (view !== 'home' || busy) return;
  e.preventDefault();
  // One notch or one flick = one panel; the drum leans a little while you scroll.
  const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  const now = performance.now();
  if (now - wheel.last > 420) wheel.base = Math.round(drum.target);
  wheel.acc += d;
  if (Math.abs(wheel.acc) > 40 && now - wheel.stepAt > 420) {
    wheel.base += Math.sign(wheel.acc);
    wheel.acc = 0;
    wheel.stepAt = now;
  }
  wheel.last = now;
  drum.target = wheel.base + clamp(wheel.acc / 200, -0.25, 0.25);
  clearTimeout(snapTimer);
  snapTimer = setTimeout(() => { wheel.acc = 0; drum.target = wheel.base; }, 160);
}, { passive: false });
const wheel = { acc: 0, last: 0, stepAt: 0, base: 0 };

function toggleMode() {
  const flat = body.dataset.mode === 'arc';
  body.dataset.mode = flat ? 'flat' : 'arc';
  const from = common.uCurve.value;
  tween(1.2, e => (common.uCurve.value = lerp(from, flat ? 0 : 1, e)), ease.io);
  dockHome(current);
}

/* ================================================================
   Transitions
   ================================================================ */
function resetMega() {
  el.mega.querySelectorAll('.ch').forEach(c => (c.style.transition = 'none'));
  body.classList.remove('leave-home', 'show-home');
  void el.mega.offsetWidth;
  el.mega.querySelectorAll('.ch').forEach(c => (c.style.transition = ''));
}

async function openSeries(i, local) {
  setBusy(true);
  current = i;
  el.tag.classList.remove('on');
  body.classList.remove('over-panel');
  drum.target = Math.round(drum.progress);
  prefetch(i);
  await tween(0.25, e => (drum.progress = lerp(drum.progress, drum.target, e)), ease.out);

  body.classList.remove('show-home');
  body.classList.add('leave-home');
  tween(0.8, e => (common.uAlpha.value = 1 - e), ease.io, 0.15);

  setView('series');
  resetScroll();
  renderSeries(i);
  el.space.style.height = `${el.series.offsetHeight}px`;
  buildPlanes(i);
  dock('Series', SERIES[i].title, SERIES[i].frames[0].src);

  if (!REDUCE) {
    buildGlass(i, local[0], local[1]);
    setHidden(i, 1);
    glass.mode = 'hold';
    await tween(0.32, e => (glass.crack = e), ease.out);
    glass.t = 0; glass.mode = 'burst';
    tween(1.9, e => (glass.t = e), ease.lin).then(() => { if (glass.mode === 'burst') glass.mode = 'float'; });
    await wait(0.35);
  } else {
    setHidden(i, 1);
  }
  seriesIn = true;
  el.series.classList.add('in');
  await wait(0.6);
  setBusy(false);
}

async function backHome() {
  if (busy || view === 'home') return;
  setBusy(true);
  seriesIn = false;
  el.series.classList.remove('in');
  planes.forEach(p => tween(0.5, e => (p.u.uAlpha.value = 1 - e)));
  const hadGlass = glass.list.length > 0;
  if (hadGlass) {
    glass.crack = 0; glass.t = 0; glass.mode = 'gather';
  }
  await wait(0.55);
  resetMega();
  body.classList.add('show-home');
  if (hadGlass) await tween(1.4, e => (glass.t = e), ease.lin);
  setView('home');
  clearPlanes();
  el.series.innerHTML = '';
  el.space.style.height = '0px';
  resetScroll();
  common.uAlpha.value = 0;
  tween(0.9, e => (common.uAlpha.value = e), ease.io);
  if (hadGlass) {
    // hand the glass back to the panel under it
    await wait(0.05);
    setHidden(current, 0);
    clearGlass();
  } else setHidden(current, 0);
  dockHome(current);
  setBusy(false);
}

async function switchSeries(j) {
  if (busy) return;
  setBusy(true);
  seriesIn = false;
  el.series.classList.remove('in');
  planes.forEach(p => tween(0.5, e => (p.u.uAlpha.value = 1 - e)));
  await tween(0.6, e => (shardMat.uniforms.uAlpha.value = 1 - e));
  clearGlass();
  setHidden(current, 0);

  const base = Math.round(drum.progress);
  drum.progress = drum.target = base + mod(j - base, N);
  current = j;
  prefetch(j);
  resetScroll();
  renderSeries(j);
  el.space.style.height = `${el.series.offsetHeight}px`;
  buildPlanes(j);
  dock('Series', SERIES[j].title, SERIES[j].frames[0].src);
  setHidden(j, 1);
  if (!REDUCE) {
    buildGlass(j, rand(-drum.W * 0.2, drum.W * 0.2), rand(-drum.H * 0.2, drum.H * 0.2));
    glass.mode = 'float';
    shardMat.uniforms.uAlpha.value = 0;
    tween(0.9, e => (shardMat.uniforms.uAlpha.value = e), ease.io, 0.2);
  }
  shardMat.uniforms.uAlpha.value = REDUCE ? 1 : 0;
  await wait(0.05);
  seriesIn = true;
  el.series.classList.add('in');
  await wait(0.6);
  setBusy(false);
}

/* ---------- Lightbox ---------- */
const lb = { k: 0 };
function fitRect(w, h) {
  const mw = vw * (vw < 720 ? 0.92 : 0.78), mh = vh * 0.72;
  const s = Math.min(mw / w, mh / h);
  const W = w * s, H = h * s;
  return { left: (vw - W) / 2, top: (vh - H) / 2 - 18, width: W, height: H };
}
function placeLb(r) {
  Object.assign(el.lbImg.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
}
function lbCaption() {
  const s = SERIES[current], f = s.frames[lb.k];
  el.lbCap.textContent = `${s.title} · frame ${pad(lb.k + 1)} · ${f.time} — photograph: ${f.by} / Pexels`;
  dock('Frame', `${pad(lb.k + 1)} / ${pad(s.frames.length)}`, f.src);
}
function openLightbox(k) {
  if (busy) return;
  lb.k = k;
  const f = SERIES[current].frames[k];
  const from = planes[k].box.getBoundingClientRect();
  const to = fitRect(f.w, f.h);
  el.lbImg.src = f.src;
  el.lbImg.alt = `${SERIES[current].title} — frame ${k + 1}`;
  placeLb(to);
  el.lbImg.style.transition = 'none';
  el.lbImg.style.opacity = '1';
  el.lbImg.style.transform = `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`;
  void el.lbImg.offsetWidth;
  el.lbImg.style.transition = 'transform .85s var(--ease-out), opacity .3s';
  el.lbImg.style.transform = 'none';
  el.lb.classList.add('open');
  planes[k].u.uAlpha.value = 0;
  root.style.overflow = 'hidden';
  setView('lightbox');
  lbCaption();
}
function navLightbox(d) {
  const frames = SERIES[current].frames;
  lb.k = mod(lb.k + d, frames.length);
  const f = frames[lb.k];
  el.lbImg.style.opacity = '0';
  setTimeout(() => {
    placeLb(fitRect(f.w, f.h));
    el.lbImg.onload = () => { el.lbImg.style.opacity = '1'; el.lbImg.onload = null; };
    el.lbImg.src = f.src;
  }, 220);
  planes.forEach((p, i) => (p.u.uAlpha.value = i === lb.k ? 0 : 1));
  lbCaption();
}
function closeLightbox() {
  if (view !== 'lightbox') return;
  const p = planes[lb.k];
  const r = p.box.getBoundingClientRect();
  const to = el.lbImg.getBoundingClientRect();
  const onScreen = r.bottom > 0 && r.top < vh;
  if (onScreen) el.lbImg.style.transform = `translate(${r.left - to.left}px, ${r.top - to.top}px) scale(${r.width / to.width})`;
  else el.lbImg.style.opacity = '0';
  el.lb.classList.remove('open');
  el.lb.style.visibility = 'visible';
  setView('series');
  root.style.overflow = '';
  dock('Series', SERIES[current].title, SERIES[current].frames[0].src);
  setTimeout(() => {
    planes.forEach(q => (q.u.uAlpha.value = 1));
    el.lb.style.visibility = '';
    el.lbImg.style.opacity = '0';
  }, REDUCE ? 0 : 700);
}

/* ---------- global clicks & keys ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const act = t.closest('[data-act]')?.dataset.act;
  if (act) {
    if (act === 'back') backHome();
    else if (act === 'prev' || act === 'next') {
      const d = act === 'prev' ? -1 : 1;
      if (view === 'home' && !busy) step(d);
      else if (view === 'lightbox') navLightbox(d);
    } else if (act === 'round') {
      if (view === 'home' && !busy) toggleMode();
      else if (view === 'series') window.scrollTo({ top: 0, behavior: 'smooth' });
      else if (view === 'lightbox') closeLightbox();
    }
    return;
  }
  if (t.closest('[data-about]')) { toggleAbout(); return; }
  if (t.closest('.about') && !t.closest('.about-card')) { toggleAbout(false); return; }
  if (t.closest('[data-home]')) { e.preventDefault(); if (view === 'lightbox') closeLightbox(); else if (view === 'series') backHome(); return; }
  const frame = t.closest('.frame');
  if (frame && view === 'series') { openLightbox(+frame.dataset.k); return; }
  const next = t.closest('[data-next]');
  if (next) { e.preventDefault(); switchSeries(+next.dataset.next); return; }
  if (t.closest('.lightbox-bg') || t.closest('.lightbox-img')) closeLightbox();
});

function toggleAbout(force) {
  const open = force ?? !body.classList.contains('about-open');
  body.classList.toggle('about-open', open);
  $('.about').setAttribute('aria-hidden', String(!open));
}

addEventListener('keydown', e => {
  if (e.key === 'Escape' && body.classList.contains('about-open')) { toggleAbout(false); return; }
  if (view === 'home' && !busy) {
    if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Enter' && e.target === body && settled()) openSeries(mod(Math.round(drum.progress), N), [0, 0]);
  } else if (view === 'series') {
    if (e.key === 'Escape') backHome();
  } else if (view === 'lightbox') {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); navLightbox(-1); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); navLightbox(1); }
  }
});

/* ================================================================
   Layout
   ================================================================ */
function fitMega() {
  el.mega.style.setProperty('--mega-size', '100px');
  const w = el.megaInner.getBoundingClientRect().width;
  const size = (100 * vw * 0.95) / w;
  el.mega.style.setProperty('--mega-size', `${size}px`);
  const drumTop = vh / 2 - drum.y - drum.H / 2;
  el.mega.style.setProperty('--mega-top', `${Math.max(58, drumTop - size * 0.82 * 0.6)}px`);
}
function resize() {
  vw = innerWidth; vh = innerHeight;
  if (renderer) {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(vw, vh, false);
  }
  camera.aspect = vw / vh;
  camera.position.z = vh / 2 / Math.tan(THREE.MathUtils.degToRad(15));
  camera.far = camera.position.z * 5;
  camera.updateProjectionMatrix();
  layoutDrum();
  fitMega();
  measure();
}
addEventListener('resize', resize);

/* ================================================================
   Frame loop
   ================================================================ */
let lastT = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - lastT) / 1000);
  lastT = now;
  runTweens(now);

  drum.progress += (drum.target - drum.progress) * (1 - Math.pow(1 - 0.085, dt * 60));
  const idx = mod(Math.round(drum.progress), N);
  if (view === 'home' && idx !== shownIndex) {
    shownIndex = idx; current = idx; dockHome(idx);
    if (settled()) prefetch(idx);
  }
  common.uY.value = drum.y + drum.lift;
  const vis = common.uAlpha.value > 0.002;
  panels.forEach((p, i) => {
    const o = mod(i - drum.progress + N / 2, N) - N / 2;
    p.front.material.uniforms.uOffset.value = o;
    p.refl.material.uniforms.uOffset.value = o;
    p.front.visible = p.refl.visible = vis;
  });

  updateScroll(dt);
  updatePlanes();
  updateGlass(now / 1000);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

/* ================================================================
   Boot
   ================================================================ */
function fallback() {
  // No WebGL: a plain, still usable list of series.
  root.classList.remove('webgl');
  body.classList.add('no-gl', 'ready', 'show-home');
  setView('home');
  const list = document.createElement('div');
  list.className = 'fallback';
  list.innerHTML = SERIES.map((s, i) => `<a href="#" data-fb="${i}"><img src="${s.frames[0].src}" alt=""><span>${s.title}</span></a>`).join('');
  body.appendChild(list);
  list.addEventListener('click', e => {
    const a = e.target.closest('[data-fb]');
    if (!a) return;
    e.preventDefault();
    current = +a.dataset.fb;
    setView('series'); renderSeries(current);
    el.series.classList.add('in'); el.series.style.position = 'static';
    list.remove(); window.scrollTo(0, 0);
  });
}

async function boot() {
  el.dockThumb.src = SERIES[0].frames[0].src;
  if (!renderer) { fallback(); return; }
  resize();

  let done = 0, shown = 0;
  const total = N + 1;
  const bump = () => done++;
  const fonts = Promise.all([
    document.fonts.load('italic 400 100px "Bodoni Moda"'),
    document.fonts.load('400 100px "Bodoni Moda"'),
    document.fonts.load('600 14px "Hanken Grotesk"'),
    document.fonts.load('400 14px "Hanken Grotesk"'),
  ]).catch(() => {}).then(bump);
  const covers = Promise.all(SERIES.map(s => loadImg(s.frames[0].src).then(img => { bump(); return img; })));

  const t0 = performance.now();
  await new Promise(res => {
    const tick = () => {
      const target = done / total;
      const minT = clamp((performance.now() - t0) / 1400, 0, 1);  // never flash past
      shown += (Math.min(target, minT) - shown) * 0.12;
      if (Math.min(target, minT) - shown < 0.002 && target >= 1 && minT >= 1) shown = 1;
      el.loaderBar.style.transform = `scaleX(${shown})`;
      el.loaderCount.textContent = String(Math.round(shown * 100)).padStart(3, '0');
      if (shown >= 1) res(); else requestAnimationFrame(tick);
    };
    tick();
  });
  const imgs = await covers;
  await fonts;

  fitMega();
  imgs.forEach((img, i) => {
    const t = paintPanel(img, SERIES[i], i);
    panels[i].tex = t;
    panels[i].front.material.uniforms.uTex.value = t;
    panels[i].refl.material.uniforms.uTex.value = t;
  });
  body.dataset.mode = 'arc';
  requestAnimationFrame(frame);

  await wait(0.15);
  setView('home');
  drum.progress = -2.6; drum.target = 0;
  drum.lift = -vh * 0.1;
  tween(1.6, e => (common.uAlpha.value = e), ease.io, 0.35);
  tween(2.2, e => (drum.lift = -vh * 0.1 * (1 - e)), ease.expo, 0.35);
  await wait(0.45);
  body.classList.add('show-home');
  await wait(0.5);
  body.classList.add('ready');
  dockHome(0);
  setBusy(false);
  prefetch(0);
}
boot();

```

## `js/data.js`

```js
// Series content. Photographs: Pexels licence (free for commercial use), credited in the About panel.
export const SERIES = [
 {
  "key": "fog",
  "title": "Fog",
  "place": "Northern valleys",
  "years": "2021 — 23",
  "blurb": "Mornings when the valley loses its edges and every pine is only a rumour of itself.",
  "frames": [
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-1.jpg",
    "w": 1600,
    "h": 972,
    "by": "Eric Goverde",
    "time": "05:48"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-2.png",
    "w": 1600,
    "h": 1066,
    "by": "tarshinastya",
    "time": "06:12"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-3.jpg",
    "w": 1600,
    "h": 1200,
    "by": "Vardan Ghazaryan",
    "time": "06:31"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-4.jpg",
    "w": 1600,
    "h": 800,
    "by": "Matvey Jenssen",
    "time": "07:04"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-5.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Jonathan Aman",
    "time": "07:26"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-fog-6.jpg",
    "w": 1600,
    "h": 1066,
    "by": "FATMA AKGÜN",
    "time": "07:55"
   }
  ]
 },
 {
  "key": "ice",
  "title": "Ice",
  "place": "Frozen lakes",
  "years": "2022",
  "blurb": "Pressure lines drawn overnight, read from the air in the one hour before the glare.",
  "frames": [
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-1.jpg",
    "w": 1600,
    "h": 1065,
    "by": "Mikhail Nilov",
    "time": "05:48"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-2.jpg",
    "w": 1600,
    "h": 900,
    "by": "Fernando Ortiz",
    "time": "06:12"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-3.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Julia Volk",
    "time": "06:31"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-4.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Кирилл Абрамов",
    "time": "07:04"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-5.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Кирилл Абрамов",
    "time": "07:26"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ice-6.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Кирилл Абрамов",
    "time": "07:55"
   }
  ]
 },
 {
  "key": "salt",
  "title": "Salt",
  "place": "Salt pans",
  "years": "2019",
  "blurb": "A floor that keeps a copy of the sky. Standing still is the only way to see it.",
  "frames": [
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-1.jpg",
    "w": 1600,
    "h": 1198,
    "by": "Stephen Leonardi",
    "time": "05:48"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-2.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Willian Justen de Vasconcellos",
    "time": "06:12"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-3.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Willian Justen de Vasconcellos",
    "time": "06:31"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-4.jpg",
    "w": 1600,
    "h": 1033,
    "by": "mohamed Zekry",
    "time": "07:04"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-5-1.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Alexander Rondón",
    "time": "07:26"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-salt-6.jpg",
    "w": 1600,
    "h": 976,
    "by": "Mycroft Roxton",
    "time": "07:55"
   }
  ]
 },
 {
  "key": "tide",
  "title": "Tide",
  "place": "Atlantic shelf",
  "years": "2020 — 24",
  "blurb": "Each frame is a single second of the sea making up its mind about the rock.",
  "frames": [
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-1.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Eli G",
    "time": "05:48"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-2.jpg",
    "w": 1600,
    "h": 900,
    "by": "Rohann Van Zyl",
    "time": "06:12"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-3.jpg",
    "w": 1600,
    "h": 1200,
    "by": "Martin Škeřík",
    "time": "06:31"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-4.jpg",
    "w": 1600,
    "h": 1200,
    "by": "Lio Voo",
    "time": "07:04"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-5.jpg",
    "w": 1600,
    "h": 947,
    "by": "Zeca Souza",
    "time": "07:26"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-tide-6.jpg",
    "w": 1600,
    "h": 1200,
    "by": "Berndt Åkesson",
    "time": "07:55"
   }
  ]
 },
 {
  "key": "ridge",
  "title": "Ridge",
  "place": "High divide",
  "years": "2023",
  "blurb": "The first four minutes of light on high snow, before the colour goes flat.",
  "frames": [
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-1.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Alan Kabeš",
    "time": "05:48"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-2.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Manon Ridet",
    "time": "06:12"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-3.jpg",
    "w": 1600,
    "h": 1067,
    "by": "Ahmet Yüksek ✪",
    "time": "06:31"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-4.jpg",
    "w": 1600,
    "h": 899,
    "by": "Marek Piwnicki",
    "time": "07:04"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-5.jpg",
    "w": 1600,
    "h": 1030,
    "by": "Marek Piwnicki",
    "time": "07:26"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-ridge-6.jpg",
    "w": 1600,
    "h": 1198,
    "by": "Vladimir Srajber",
    "time": "07:55"
   }
  ]
 },
 {
  "key": "dusk",
  "title": "Dusk",
  "place": "Western fjords",
  "years": "2018 — 24",
  "blurb": "Blue hour in long exposures — water, hills and air settling into one tone.",
  "frames": [
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-1.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Lesia Burlachenko",
    "time": "05:48"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-2.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Bruna Santos",
    "time": "06:12"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-3.jpg",
    "w": 1600,
    "h": 1000,
    "by": "Mantas Sinkevičius",
    "time": "06:31"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-4.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Lesia Burlachenko",
    "time": "07:04"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-5.jpg",
    "w": 1600,
    "h": 1066,
    "by": "Evelin Magnus",
    "time": "07:26"
   },
   {
    "src": "https://demo.uichemy.com/wp-content/uploads/2026/09/fw-dusk-6.jpg",
    "w": 1600,
    "h": 1002,
    "by": "Marek Piwnicki",
    "time": "07:55"
   }
  ]
 }
];

```

## `style.css`

```css
:root {
  /* Locked palette — every colour below derives from these five. */
  --frost: #f1f4f3;
  --mist: #dfe6e3;
  --pine: #1d4a3f;
  --slate: #58675f;
  --lichen: #c2d443;

  --pine-08: rgba(29, 74, 63, .08);
  --pine-14: rgba(29, 74, 63, .14);
  --pine-40: rgba(29, 74, 63, .4);
  --frost-70: rgba(241, 244, 243, .7);
  --frost-94: rgba(241, 244, 243, .94);

  --serif: "Bodoni Moda", "Didot", "Bodoni 72", Georgia, serif;
  --sans: "Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif;
  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --ease-io: cubic-bezier(.65, 0, .35, 1);
  --col: min(640px, 86vw);
  --col-wide: min(840px, 92vw);
}

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; scrollbar-width: none; }
html::-webkit-scrollbar { display: none; }
body {
  margin: 0;
  background: var(--frost);
  color: var(--pine);
  font: 400 14px/1.5 var(--sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
a { color: inherit; }
svg { display: block; }
:focus-visible { outline: 2px solid var(--lichen); outline-offset: 3px; border-radius: 4px; }

.mark { width: 22px; height: 22px; fill: var(--pine); }

/* ---------- Loader ---------- */
.loader {
  position: fixed; inset: 0; z-index: 50;
  display: grid; place-items: center;
  background: var(--frost);
  transition: opacity .8s var(--ease-io) .35s, visibility 0s linear 1.2s;
}
.loader-inner { display: grid; justify-items: center; gap: 14px; transition: transform 1s var(--ease-io), opacity .6s var(--ease-io); }
.loader .mark { width: 30px; height: 30px; }
.loader-name { margin: 0; font: 400 30px/1 var(--serif); letter-spacing: -.01em; }
.loader-bar { width: 180px; height: 1px; background: var(--mist); overflow: hidden; }
.loader-bar i { display: block; height: 100%; background: var(--pine); transform-origin: 0 50%; transform: scaleX(0); }
.loader-count { font: 500 11px/1 var(--sans); letter-spacing: .16em; color: var(--slate); font-variant-numeric: tabular-nums; }
body:not([data-view="loading"]) .loader { opacity: 0; visibility: hidden; }
body:not([data-view="loading"]) .loader-inner { transform: translateY(-24px); opacity: 0; }

/* ---------- Top bar ---------- */
.top {
  position: fixed; inset: 0 0 auto; z-index: 20;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  padding: 18px 28px;
  font-size: 13px;
  opacity: 0; transform: translateY(-10px);
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
body.ready .top { opacity: 1; transform: none; }
.top::before { content: ""; position: absolute; inset: 0 0 -28px; z-index: -1; background: linear-gradient(var(--frost-94) 55%, rgba(241, 244, 243, 0)); opacity: 0; transition: opacity .6s var(--ease-io); pointer-events: none; }
body[data-view="series"] .top::before { opacity: 1; }
.brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 600; justify-self: start; }
.top-line { margin: 0; color: var(--slate); }
.top-link { justify-self: end; font-weight: 500; padding: 6px 2px; background: linear-gradient(var(--pine), var(--pine)) 0 100% / 0 1px no-repeat; transition: background-size .45s var(--ease-out); }
.top-link:hover { background-size: 100% 1px; }

/* ---------- Home ---------- */
.mega {
  position: fixed; left: 0; right: 0; top: var(--mega-top, 11vh); z-index: 0;
  margin: 0; text-align: center; white-space: nowrap;
  font: 400 var(--mega-size, 17vw)/.82 var(--serif);
  letter-spacing: -.035em;
  color: var(--pine);
  pointer-events: none; user-select: none;
}
.mega-inner { display: inline-block; overflow: hidden; padding: .02em .04em .06em; }
.mega .ch { display: inline-block; transform: translateY(108%); transition: transform 1.15s var(--ease-out); transition-delay: calc(var(--i) * 45ms); }
body.show-home .mega .ch { transform: none; }
body.leave-home .mega .ch { transform: translateY(-108%); transition-duration: .8s; transition-timing-function: var(--ease-io); transition-delay: calc(var(--i) * 25ms); }

.home-hint {
  position: fixed; left: 28px; right: 28px; bottom: 36px; z-index: 3; margin: 0;
  display: flex; justify-content: space-between; align-items: center;
  font: 500 11px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--slate);
  opacity: 0; transition: opacity .6s var(--ease-io);
  pointer-events: none;
}
body.show-home .home-hint { opacity: 1; transition-delay: .9s; }
.home-index { font-variant-numeric: tabular-nums; }

.gl { position: fixed; inset: 0; z-index: 1; width: 100%; height: 100%; pointer-events: none; }
body[data-view="home"] { cursor: grab; }
body[data-view="home"].dragging { cursor: grabbing; }
body[data-view="home"].over-panel { cursor: pointer; }

.tag {
  position: fixed; left: 0; top: 0; z-index: 30; pointer-events: none;
  padding: 7px 12px 6px; border-radius: 99px;
  background: var(--lichen); color: var(--pine);
  font: 600 10px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase;
  opacity: 0; scale: .6; transition: opacity .25s var(--ease-out), scale .35s var(--ease-out);
}
.tag.on { opacity: 1; scale: 1; }

/* ---------- Series ---------- */
.scroll-space { height: 0; }
.series {
  position: fixed; left: 0; right: 0; top: 0; z-index: 2;
  will-change: transform;
  visibility: hidden;
}
body[data-view="series"] .series, body[data-view="lightbox"] .series, body.series-on .series { visibility: visible; }

.series-head { padding: 19vh 24px 0; text-align: center; }
.eyebrow { margin: 0; font: 500 11px/1.4 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--slate); }
.series-title {
  margin: 2vh 0 0; font: 400 clamp(96px, 17vw, 260px)/.86 var(--serif); letter-spacing: -.04em;
  overflow: hidden; padding: 0 .05em .08em;
}
.series-title .ch { display: inline-block; transform: translateY(110%); transition: transform 1.1s var(--ease-out); transition-delay: calc(.25s + var(--i) * 55ms); }
.series-blurb { max-width: 30ch; margin: 4vh auto 0; font: italic 400 clamp(19px, 1.7vw, 24px)/1.35 var(--serif); color: var(--pine); }
.series-head .eyebrow, .series-blurb { opacity: 0; transform: translateY(14px); transition: opacity .9s var(--ease-out) .55s, transform .9s var(--ease-out) .55s; }
.series.in .series-title .ch, .series.in .series-head .eyebrow, .series.in .series-blurb { transform: none; opacity: 1; }

.frames { display: grid; justify-items: center; gap: 15vh; padding: 17vh 0 0; }
.frames figure { margin: 0; width: var(--col); }
.frames figure.wide { width: var(--col-wide); }
.frame { position: relative; display: block; width: 100%; background: var(--mist); cursor: zoom-in; }
.frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
html.webgl .frame { background: transparent; }
html.webgl .frame img { opacity: 0; }
.frame-tag {
  position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  padding: 7px 12px 6px; border-radius: 99px; background: var(--lichen); color: var(--pine);
  font: 600 10px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase;
  opacity: 0; scale: .7; transition: opacity .3s var(--ease-out), scale .4s var(--ease-out);
}
.frame:hover .frame-tag, .frame:focus-visible .frame-tag { opacity: 1; scale: 1; }
figcaption { display: flex; justify-content: space-between; gap: 16px; padding-top: 12px; font-size: 12px; color: var(--slate); }
figcaption b { font-weight: 600; color: var(--pine); font-variant-numeric: tabular-nums; }

.next { display: grid; justify-items: center; gap: 2vh; padding: 26vh 24px 8vh; text-align: center; }
.next-link { display: inline-flex; align-items: baseline; gap: .15em; font: italic 400 clamp(72px, 12vw, 180px)/.9 var(--serif); letter-spacing: -.03em; text-decoration: none; }
.next-link span { background: linear-gradient(var(--lichen), var(--lichen)) 0 88% / 0 .12em no-repeat; transition: background-size .6s var(--ease-out); }
.next-link:hover span { background-size: 100% .12em; }
.next-link svg { width: .42em; height: .42em; stroke: currentColor; stroke-width: 1.2; fill: none; transition: transform .5s var(--ease-out); }
.next-link:hover svg { transform: translateX(.08em); }
.series-foot { display: flex; justify-content: space-between; gap: 16px; padding: 3vh 28px 110px; font-size: 12px; color: var(--slate); border-top: 1px solid var(--pine-14); margin: 0 28px; padding-left: 0; padding-right: 0; }

/* ---------- Lightbox ---------- */
.lightbox { position: fixed; inset: 0; z-index: 40; visibility: hidden; pointer-events: none; }
.lightbox.open { visibility: visible; pointer-events: auto; }
.lightbox-bg { position: absolute; inset: 0; background: var(--frost-94); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); opacity: 0; transition: opacity .6s var(--ease-io); cursor: zoom-out; }
.lightbox.open .lightbox-bg { opacity: 1; }
.lightbox-img { position: absolute; left: 0; top: 0; transform-origin: 0 0; box-shadow: 0 30px 80px -30px var(--pine-40); user-select: none; }
.lightbox-cap { position: absolute; left: 0; right: 0; top: 22px; margin: 0; text-align: center; font-size: 12px; color: var(--slate); opacity: 0; transition: opacity .5s var(--ease-io); }
.lightbox.open .lightbox-cap { opacity: 1; transition-delay: .35s; }

/* ---------- About ---------- */
.about { position: fixed; inset: 0; z-index: 45; pointer-events: none; }
.about-card {
  position: absolute; right: 20px; top: 64px; width: min(400px, calc(100vw - 40px));
  padding: 26px 26px 22px; border-radius: 20px;
  background: var(--frost-94); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid var(--pine-14); box-shadow: 0 30px 70px -40px var(--pine-40);
  opacity: 0; transform: translateY(-12px) scale(.98); transform-origin: 100% 0;
  transition: opacity .4s var(--ease-out), transform .5s var(--ease-out);
}
body.about-open .about { pointer-events: auto; }
body.about-open .about-card { opacity: 1; transform: none; }
.about-close { position: absolute; right: 14px; top: 14px; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; transition: background .3s; }
.about-close:hover { background: var(--pine-08); }
.about-close svg, .dock svg { width: 16px; height: 16px; stroke: currentColor; stroke-width: 1.6; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.about-lede { margin: 14px 0 20px; font: 400 21px/1.3 var(--serif); }
.about-row { display: flex; justify-content: space-between; gap: 12px; margin: 0; padding: 10px 0; border-top: 1px solid var(--pine-14); font-size: 13px; }
.about-row span { color: var(--slate); }
.about-row em { font-style: normal; text-align: right; }
.about-credits { margin: 16px 0 0; font-size: 11px; line-height: 1.55; color: var(--slate); }

/* ---------- Dock ---------- */
.dock {
  position: fixed; left: 50%; bottom: 22px; z-index: 42;
  display: flex; gap: 8px; align-items: center;
  translate: -50% 0;
  opacity: 0; transform: translateY(20px);
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
body.ready .dock { opacity: 1; transform: none; }
.dock-shell, .dock-round {
  height: 54px; border-radius: 16px;
  background: var(--frost-70); backdrop-filter: blur(16px) saturate(1.3); -webkit-backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid var(--pine-14);
  box-shadow: 0 14px 40px -24px var(--pine-40);
}
.dock-shell { display: flex; align-items: center; overflow: hidden; transition: width .6s var(--ease-out); }
.dock-shell > * { flex: none; }
.dock-btn { width: 44px; height: 44px; margin-left: 5px; border-radius: 12px; display: grid; place-items: center; transition: background .3s; }
.dock-btn:hover, .dock-mini:hover, .dock-round:hover { background-color: var(--pine-08); }
.dock-info { display: flex; align-items: center; gap: 10px; padding: 0 14px 0 5px; min-width: 150px; }
.dock-thumb { width: 42px; height: 42px; border-radius: 11px; overflow: hidden; background: var(--mist); }
.dock-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.dock-text { display: grid; line-height: 1.15; }
.dock-text small { font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--slate); }
.dock-text b { font-weight: 600; font-size: 14px; letter-spacing: .02em; font-variant-numeric: tabular-nums; }
.dock-text.swap { animation: dockSwap .5s var(--ease-out); }
@keyframes dockSwap { from { opacity: 0; transform: translateY(8px); } }
.dock-arrows { display: flex; gap: 2px; padding-right: 6px; }
.dock-mini { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; transition: background .3s; }
.dock-round { min-width: 54px; padding: 0 17px; display: flex; align-items: center; gap: 8px; transition: background .3s, width .5s var(--ease-out); }
.dock-round svg { display: none; }
.dock-round-label { max-width: 0; overflow: hidden; white-space: nowrap; font-weight: 600; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; transition: max-width .5s var(--ease-out), opacity .4s; opacity: 0; }
.dock-round:hover .dock-round-label, .dock-round:focus-visible .dock-round-label { max-width: 70px; opacity: 1; }

.dock-back { display: none; }
body[data-view="series"] .dock-back { display: grid; }
body[data-view="series"] .dock-arrows { display: none; }
body[data-view="home"][data-mode="arc"] .i-flat,
body[data-view="home"][data-mode="flat"] .i-arc,
body[data-view="series"] .i-up,
body[data-view="lightbox"] .i-close { display: block; }
body.busy .dock { pointer-events: none; }

.noscript { position: fixed; inset: auto 0 40% 0; text-align: center; z-index: 60; }

/* ---------- Small screens ---------- */
@media (max-width: 720px) {
  .top { padding: 14px 16px; grid-template-columns: 1fr auto; }
  .top-line { display: none; }
  .home-hint { left: 16px; right: 16px; bottom: 96px; justify-content: center; }
  .home-help { display: none; }
  .dock { bottom: 14px; }
  .dock-info { min-width: 0; }
  .frames { gap: 9vh; }
  .series-foot { flex-direction: column; margin: 0 16px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: .01ms !important; transition-delay: 0s !important; animation-duration: .01ms !important; }
}

/* ---------- Touch + no-WebGL fallback ---------- */
body[data-view="home"] { touch-action: none; overscroll-behavior: none; }
.lightbox-img { opacity: 0; }
.fallback { position: fixed; left: 50%; top: 52%; translate: -50% -50%; z-index: 3; display: grid; grid-template-columns: repeat(3, minmax(0, 200px)); gap: 12px; width: min(640px, 90vw); }
.fallback a { position: relative; display: block; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 6px; }
.fallback img { width: 100%; height: 100%; object-fit: cover; }
.fallback span { position: absolute; inset: auto 0 0; padding: 8px 10px; color: var(--frost); font: italic 400 22px/1 var(--serif); }
body.no-gl .home-help { display: none; }

```

## `vendor/three.module.js` and `vendor/three.core.js` — fetch, do NOT transcribe

These two files are **three.js r186, unmodified** — byte-identical to the published build. They are
2.1 MB of minified-adjacent library source, they contain triple backticks (which would break the
fence around them), and nothing about them is specific to this page, so they are **not** in this
appendix. Fetch them instead, verify, and upload them as code files:

```bash
curl -sfL -o three.module.js https://demo.uichemy.com/wp-content/uichemy-composer/fw-three.module.js
curl -sfL -o three.core.js   https://demo.uichemy.com/wp-content/uichemy-composer/fw-three-core.js
```

| File | Bytes | sha256 |
|---|---|---|
| `three.module.js` | 662,772 | `9052042d676cb0fdc1ddfefe193053f34b7ac0513a616fdac4535d49987812ea` |
| `three.core.js` | 1,458,113 | `9edde002b066a9a05676a6127f67735b62baf399bdea529f2f7e31657da769e6` |

(The same bytes are on jsDelivr at `three@0.186.0/build/…` if the library copy is ever unavailable —
verified identical. Prefer the media-library copy so the page owes nothing to a third-party host.)

**Two things to get right when uploading them as code files:**
- WordPress refuses a code-file name with a second dot: upload the core as **`fw-three-core.js`**,
  and repoint the two `from './three.core.js'` imports inside `three.module.js` to
  `'./fw-three-core.js'` before uploading it.
- The page's own script imports three by **absolute code-file URL**, not the bare specifier `three`,
  so no importmap is needed — an importmap tag is not reliably emitted in the Elementor editor.
