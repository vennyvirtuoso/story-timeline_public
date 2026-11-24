# MASTER PROMPT — Understory
### Plain HTML, CSS and JavaScript. No WordPress, no page builder, no framework, no build step.

## ▶ HOW TO USE THIS PROMPT

**Paste this whole document into Claude. Nothing to attach.** It carries the complete source of the site plus the address of every image, so Claude can assemble a folder that owns its own assets and hand it back as a zip.

**INSTRUCTION TO CLAUDE — BUILD IT, DO NOT ASK.** Every decision is already made in this document. Do not stop to ask the user questions, do not offer options, and do not ask for confirmation before starting. Write the files, zip them, hand over the archive, then report what you built.

1. Create a folder named `understory` and write out every file in the appendix below **exactly as written** — do not reformat, rename, shorten, reorder or "improve" anything. The only exception is the delivery-only PAGE SPEED step below, which must not change how the page looks or moves.
2. **Download the 2 3D models into `assets/`.** The code already points at `assets/…` — nothing in it references a remote host. Run this from inside the folder; it reads the ASSET MANIFEST at the end of this document:

   ```bash
   mkdir -p assets
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/understory-forest-hdr.glb' -o 'assets/forest-hdr.glb'
   curl -fsSL 'https://demo.uichemy.com/wp-content/uploads/2026/09/understory-jungle.glb' -o 'assets/jungle.glb'
   ```

   Then check every file arrived and none is a zero-byte or HTML error page:

   ```bash
   ls assets | wc -l             # expect 2 files
   find assets -size -1k         # expect no output
   ```

   If any download fails, retry it — hosts occasionally drop a request. Do **not** fall back to hotlinking the remote URL: the whole point is a folder that works offline.

3. **PAGE SPEED — target 90+ in Lighthouse, mobile AND desktop.** Apply these to the files in the folder. They are delivery changes only: the page must still look and move px-to-px like the original.
   - **Images → WebP.** For every JPG/PNG photo in `assets/`: convert to WebP (quality ≈ 78; PNG with transparency keeps its alpha), resized to at most **2× its largest displayed width** (never wider than the original, cap 1600 px). Use `cwebp` if installed, otherwise Python Pillow (`pip install pillow` if needed), otherwise macOS `sips -s format webp`. Replace the old path in every HTML/CSS/JS file (`grep -rn 'assets/<name>.jpg'` must then find nothing), then delete the JPG/PNG. Leave SVG, GIF, video, fonts and 3D models as they are. If no converter works, keep the originals and say so in your report.
   - **Image sizes and lazy loading.** Every `<img>` gets `width` and `height` equal to its file's pixel size. Images outside the first screen get `loading="lazy" decoding="async"`; the one largest image in the first screen gets `loading="eager" fetchpriority="high"`. Do not add `<link rel="preload" as="image">`.
   - **Scripts.** Add `defer` to every external `<script src>` (not to `type="module"`, which is already deferred; never `async` for a library another script uses). Any inline `<script>` that calls those libraries runs inside `document.addEventListener('DOMContentLoaded', …)` so the order still holds. A heavy library used only by a section below the first screen (slider, map, 3D further down) is loaded by a small `IntersectionObserver` (`rootMargin: '300px'`) that appends its `<script>` when that section approaches the screen.
   - **CSS and fonts.** Keep the one stylesheet as a normal `<link rel="stylesheet">` in `<head>` — it is the only render-blocking file allowed. Preload the 1–2 font files the first screen's headline and body text use (`<link rel="preload" as="font" type="font/woff2" crossorigin>`), keep `font-display: swap`, and drop font families or weights the page never uses. Google Fonts links get `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin) and `display=swap`.
   - **First screen visible at load.** Nothing in the first screen starts at `opacity: 0` (CSS or a GSAP `from`) — use `0.01` so the browser can measure it; there is no plugin doing this for you here.
   - **3D / WebGL in the first screen.** Lighthouse's test devices have no GPU, so a scene rendering from page load costs seconds of CPU and caps the score around 10–40. Show a still WebP of the scene's first frame as the 3D canvas's CSS background (if the ASSET MANIFEST has a `hero-poster` image use it — `background-size: auto 100%`, and the mobile one under `max-aspect-ratio: 761/1000` with `100% auto`). After the page has loaded, only `<link rel="prefetch">` the 3D files; on the visitor's first `wheel`, `pointermove`, `pointerdown`, `touchstart` or `keydown` (not `scroll`), or as soon as the page is scrolled more than 50 px (a restored scroll position), load them in order, render one frame when the model is ready, remove the still picture in the same task, and then run the original render loop unchanged. If WebGL is unavailable keep the picture. If there is no poster in the manifest and you cannot capture one, load the 3D after page load instead and say so in your report.
   - **Measure.** Serve the folder (`python3 -m http.server 8000` from inside it) and, if Google Chrome is available, run `npx lighthouse http://localhost:8000 --only-categories=performance` and again with `--preset=desktop`, twice each. Report Performance, FCP, LCP, TBT, CLS and Speed Index. If a run is under 90, fix the cause named under "Avoid long main-thread tasks" / "Layout shift culprits". If Lighthouse cannot run here, say so and tell the user to test the deployed URL at https://pagespeed.web.dev/. When it is deployed, any static host with compression (gzip/brotli) and long cache headers for `assets/` (Netlify, Vercel, Cloudflare Pages) keeps the score.
   **For Understory this is already settled: follow the `PAGE SPEED BUILD` section (before the ASSET MANIFEST) exactly instead of re-deriving it — the page module moves into `app.js` unchanged and two new files run it in a Web Worker. There are no photos to convert and nothing waits for input.**
4. **Zip that folder and give the user the archive.** Its contents:

   ```
   understory/
     index.html
     atmosphere.js
     butterflies.js
     fur.js
     post.js
     realism.js
     wind.js
     assets/
       forest-hdr.glb
       jungle.glb
   ```

   ```bash
   zip -r understory.zip understory -x '*.DS_Store'
   ```

   Then hand over `understory.zip` as a file the user can download, not as text in the chat.
5. Before handing it over, serve the folder and confirm it runs:

   ```bash
   cd understory && python3 -m http.server 8000     # then open http://localhost:8000
   ```

   Check the page renders, the images load from `assets/` with the network throttled or offline, and scrolling drives the animations.

The finished folder needs no network for its images — they are in `assets/`.
Do not rebuild the design from the description below. The description is there so a person can understand and edit the code. The appendix is the deliverable.

---

## ▶ WHAT YOU GET

Understory — continuous biodiversity measurement for the forest floor.

**7 code files plus an `assets/` folder holding 2 3D models, delivered as `understory.zip`.**

| File | What it is |
|---|---|
| `index.html` | a page, 36 KB |
| `atmosphere.js` | the script, 11 KB |
| `butterflies.js` | the script, 7 KB |
| `fur.js` | the script, 13 KB |
| `post.js` | the script, 3 KB |
| `realism.js` | the script, 6 KB |
| `wind.js` | the script, 2 KB |
| `assets/` | 2 3D models, downloaded at build time |

---

## ▶ WHERE THE MEDIA COMES FROM

All 2 files (2 3D models) live in `assets/` inside the folder, and every reference in the markup, the CSS and the script is a relative `assets/…` path. Once the folder is assembled it owns its own media: no CDN, no media library, no external image host. Open it on a laptop with the wifi off and it still renders.

They are fetched **once, at build time**, from the WordPress media library on `demo.uichemy.com` — the same `understory__` files the WordPress build of this page uses. That is only how they travel into the folder; nothing in the delivered code points back at that host. Replacing an image means dropping a new file into `assets/` under the same name.

The manifest at the end of this document lists every source URL against the filename it is saved as, so the download step is reproducible and checkable.

---

## ▶ WHAT THIS PROMPT DELIBERATELY DOES NOT CONTAIN

- No WordPress, no page builder, and none of the wrapper classes or compatibility CSS a builder needs. The WordPress build is a separate prompt.
- No framework, no TypeScript, no bundler, no `package.json`.
- No backend. Any form here validates and replies in place; it posts nowhere.
- No CMS. The content lives in the files.
- No external image host. The images ship inside the zip; nothing in the code calls out to a media library at runtime.

---

## PAGE SPEED BUILD — Understory (from the tested WordPress build; overrides the matching appendix parts)

The same split measured on demo.uichemy.com (WordPress build, 7 Oct 2026):

| Google PageSpeed Insights | Before (live demo, 7 Oct 2026) | After (tested build, 6 runs) | Live demo after the change |
|---|---|---|---|
| Mobile score | no result — "the page stopped responding" | **98–100** | **100** |
| Desktop score | no result — "the page stopped responding" | **99–100** | **100** |
| Total Blocking Time | — (scene build + every frame on the main thread) | 0 ms | 0 ms |
| Largest Contentful Paint (mobile) | — | 1.2–1.3 s (the loader title) | 1.2 s |
| Cumulative Layout Shift | — | 0 | 0 |

Same markup, copy, loader, headline rise, forest, wind, butterflies, mist, bloom, specimen tag and pointer look — nothing waits for input and nothing looks different. What changed is where the work happens: the whole WebGL scene (HDR + GLB, hundreds of thousands of moss strands, post-processing, one frame every display refresh) now runs in a module Web Worker on an OffscreenCanvas, so the page's main thread stays free. The page module itself is not edited: the worker imports it unchanged and stands in for the handful of DOM objects it touches. Proven on a static build made from this prompt: worker path, no-OffscreenCanvas fallback and worker-error fallback all reach `ready` with the forest drawn and the specimen tag on the log (within 1 px of the original), the loader → reveal sequence matches the original, the pointer look-up matches, no console errors. On the demo (WordPress) the same split measured as above.

This static version applies the identical change to the plain files; measure it after deploying (see the PAGE SPEED step, Measure).

### A · Move the page module into `app.js`

In `index.html`, the last `<script type="module">` holds the page module (it starts with `import * as THREE from 'three';` and ends with the comment about hidden tabs). Cut everything between `<script type="module">` and its `</script>` into a new file **`app.js`** next to `index.html` — byte for byte, nothing changed (its `./fur.js` etc. imports and `assets/…glb` URLs resolve the same from there). Then replace the now-empty `<script type="module"></script>` with:

```html
<script type="module" src="app-fast.js"></script>
```

The import map above it stays exactly as it is.

### B · Two new files: `gl.js` (worker) and `app-fast.js` (entry)

How it works: `app-fast.js` is loaded instead of the page module. If the browser can draw WebGL in a module worker (`OffscreenCanvas` + `webgl2`) and the visitor has no reduced-motion preference and this is not the Elementor editor, it puts a canvas into `#stage`, hands it to `gl.js` with `transferControlToOffscreen()` together with the page's import map and the module's URL, and forwards pointer, scroll, resize, font readiness and the headline/tag boxes. `gl.js` imports the page module (`app.js`) **unchanged** — workers have no import map, so it fetches each module and writes the import names out in full, exactly as the import map resolves them — after standing in for `document.getElementById` (stage, loader, bar, %, specimen), `document.body` and its `ready` class, the headline boxes, `innerWidth`/`innerHeight`/`devicePixelRatio`/`scrollY`, `matchMedia` and the window events. Every change the module makes to those elements (bar width, %, `done`, loader removal, `ready`, the tag's transform/flip/off/leader line) is sent back and applied to the real DOM. Otherwise — or if the worker fails at any point — `app-fast.js` imports the original module on the page, which then runs exactly as before.

**New file `gl.js`** (the worker):

```js
/* UNDERSTORY · page speed: the 3D forest runs here, in a module Web Worker drawing to an OffscreenCanvas, so building
   the scene (HDR + GLB, the moss strands, wind, butterflies, mist, bloom) and every frame never block the page.
   The scene is the page's ORIGINAL module (app.js), imported unchanged together with its own imports. Before importing
   it, this file stands in for the few browser objects the module touches (document.getElementById for the stage, the
   loader bar and percentage and the specimen tag, document.body and its 'ready' class, the headline boxes, innerWidth /
   innerHeight / devicePixelRatio / scrollY, matchMedia, pointer / scroll / resize events, document.fonts.ready) and sends
   every change the module makes to those elements to the page (app-fast.js), which applies it to the real DOM. */

/* Workers have no import map. The page sends its import map; every module the app imports is fetched here, its import
   names written out in full (exactly as the import map would resolve them) and run from a blob URL. three.module.js
   itself is imported by its real URL, so there is one three.js. */
let IMPORTMAP = {};
const mods = new Map();
function resolve(spec, base) {
  if (IMPORTMAP[spec]) return IMPORTMAP[spec];
  for (const k in IMPORTMAP) if (k.endsWith('/') && spec.startsWith(k)) return IMPORTMAP[k] + spec.slice(k.length);
  return new URL(spec, base).href;
}
function moduleUrl(url) {
  if (url === IMPORTMAP.three) return Promise.resolve(url);
  if (!mods.has(url)) mods.set(url, (async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(url + ' ' + res.status);
    const src = await res.text();
    /* static imports / re-exports only: `import … from '…'`, `export … from '…'`, `import '…'` at the start of a line */
    const re = /^(\s*(?:import|export)\b[^;'"]*?\bfrom\s*|\s*import\s*)(['"])([^'"]+)\2/gm, found = [];
    let m; while ((m = re.exec(src))) found.push(m);
    const urls = await Promise.all(found.map((x) => moduleUrl(resolve(x[3], url))));
    let out = '', at = 0;
    found.forEach((x, i) => { const s = x.index + x[1].length + 1; out += src.slice(at, s) + urls[i]; at = s + x[3].length; });
    out += src.slice(at) + '\n//# sourceURL=' + url;
    return URL.createObjectURL(new Blob([out], { type: 'text/javascript' }));
  })());
  return mods.get(url);
}

/* ---------- page -> worker state ---------- */
const V = { sh: 1 };
let rects = {}, heights = {}, fontsDone = null;
const fontsReady = new Promise((res) => { fontsDone = res; });
function view(m) {
  if (m.iw != null) { self.innerWidth = m.iw; self.innerHeight = m.ih; self.devicePixelRatio = m.dpr; }
  if (m.sy != null) { self.scrollY = m.sy; self.pageYOffset = m.sy; V.sh = m.sh; }
  if (m.rects) rects = m.rects;
  if (m.heights) heights = m.heights;
}

/* ---------- worker -> page: DOM changes, batched per task ---------- */
let ops = [], queued = false;
function rec(op) {
  ops.push(op);
  if (!queued) { queued = true; queueMicrotask(() => { queued = false; const o = ops; ops = []; self.postMessage({ type: 'dom', ops: o }); }); }
}

/* ---------- stand-in elements (keys are resolved by the page: '#id', 'body', 'doc>>selector', 'parent>>selector') ---------- */
const els = {};
function E(key, cls) {
  if (els[key]) return els[key];
  const set = new Set(cls || []), attrs = {}, styleVals = {};
  let text = '';
  const e = {
    key,
    style: new Proxy(styleVals, { set(t, p, v) { if (t[p] !== v) { t[p] = v; rec([key, 's', p, v]); } return true; } }),
    classList: {
      add(...c) { c.forEach((x) => { if (!set.has(x)) { set.add(x); rec([key, 'c', x, true]); } }); },
      remove(...c) { c.forEach((x) => { if (set.has(x)) { set.delete(x); rec([key, 'c', x, false]); } }); },
      toggle(x, f) { const on = f === undefined ? !set.has(x) : !!f; if (on !== set.has(x)) { on ? set.add(x) : set.delete(x); rec([key, 'c', x, on]); } return on; },
      contains(x) { return set.has(x); },
    },
    setAttribute(n, v) { v = String(v); if (attrs[n] !== v) { attrs[n] = v; rec([key, 'a', n, v]); } },
    getAttribute(n) { return n in attrs ? attrs[n] : null; },
    get textContent() { return text; },
    set textContent(v) { v = String(v); if (v !== text) { text = v; rec([key, 't', v]); } },
    remove() { rec([key, 'r']); },
    appendChild(c) { return c; },            /* the renderer's canvas is already in #stage on the page */
    querySelector(s) { return E(key + '>>' + s); },
    getBoundingClientRect() { const r = rects[key] || { left: 0, top: 0, width: 0, height: 0 }; return { ...r, right: r.left + r.width, bottom: r.top + r.height, x: r.left, y: r.top }; },
    get offsetHeight() { return heights[key] || 0; },
    get scrollHeight() { return V.sh; },
    isConnected: true,
  };
  els[key] = e;
  return e;
}

/* ---------- start: the page sends the canvas, the import map, the module URL and the current view ---------- */
self.onmessage = async (ev) => {
  const m = ev.data;
  if (m.type === 'init') {
    view(m);
    IMPORTMAP = m.importmap || {};
    self.window = self;
    const canvas = m.canvas;
    canvas.style = {};                      /* three's setSize() writes canvas.style.width/height; the page sizes the element */
    E('#specimen', m.specimenClass);
    const body = E('body', m.bodyClass);
    self.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    self.document = {
      querySelector: (s) => E('doc>>' + s),
      querySelectorAll: () => [],
      getElementById: (id) => E('#' + id),
      body,
      documentElement: { style: {} },
      fonts: { ready: fontsReady },
      hidden: false,
      createElementNS: (ns, n) => (n === 'canvas' ? canvas : null),
      createElement: (n) => (n === 'canvas' ? canvas : null),
    };
    try { await import(await moduleUrl(m.app)); self.postMessage({ type: 'started' }); }
    catch (err) { self.postMessage({ type: 'fail', msg: String(err && err.message || err) }); }
  } else if (m.type === 'fonts') { view(m); fontsDone(); }
  else if (m.type === 'rects') { view(m); }
  else if (m.type === 'ptr') { const e = new Event('pointermove'); e.clientX = m.x; e.clientY = m.y; self.dispatchEvent(e); }
  else if (m.type === 'scroll') { view(m); self.dispatchEvent(new Event('scroll')); }
  else if (m.type === 'resize') { view(m); self.dispatchEvent(new Event('resize')); }
};
self.addEventListener('unhandledrejection', (e) => { self.postMessage({ type: 'warn', msg: String(e.reason && e.reason.message || e.reason) }); });
```

**New file `app-fast.js`** (the entry script):

```js
/* UNDERSTORY · page speed — loads instead of the page module (app.js) and decides where the 3D forest runs.
   When this browser can draw WebGL in a worker (module Worker + OffscreenCanvas + webgl2), the forest runs in gl.js:
   this file puts the canvas into #stage, hands it to the worker together with the page's import map, forwards pointer /
   scroll / resize / font readiness and the headline + tag boxes, and applies the DOM changes the scene makes (loader bar
   and %, the loader's 'done' class and removal, body 'ready', the specimen tag's position, flip/off classes and leader
   line). Everything else is the original page.
   Otherwise — no worker WebGL, reduced motion, the Elementor editor, or any worker error — it imports the ORIGINAL app.js
   on the page, which runs exactly as before. */
const ORIGINAL = new URL('./app.js', import.meta.url).href;   /* the page module, unchanged */
const GL = new URL('./gl.js', import.meta.url).href;          /* the worker */
const SVG = '<svg class="lead-line" viewBox="0 0 118 96" preserveAspectRatio="none"><path d="M0 96 L46 30 L118 30" fill="none" stroke="rgba(230,207,150,.75)" stroke-width="1"/></svg>';

let originalStarted = false;
function original() {
  if (originalStarted) return; originalStarted = true;
  import(ORIGINAL).catch((e) => { if (window.console) console.error('Understory failed to load:', e); });
}
let WK = false;
try {
  WK = !/[?&]elementor-preview=/.test(location.search) && !matchMedia('(prefers-reduced-motion: reduce)').matches &&
    typeof Worker === 'function' && typeof OffscreenCanvas === 'function' && 'transferControlToOffscreen' in HTMLCanvasElement.prototype &&
    !!new OffscreenCanvas(1, 1).getContext('webgl2');
} catch (e) { WK = false; }

function front() {
  const stage = document.getElementById('stage');
  if (!stage) { original(); return; }
  /* the specimen tag's leader line (an editor save can strip inline <svg>): same repair the WordPress loader does */
  const sp = document.getElementById('specimen');
  if (sp && !sp.querySelector('svg.lead-line')) {
    const pin = sp.querySelector('.pin');
    if (pin) pin.insertAdjacentHTML('afterend', SVG); else sp.insertAdjacentHTML('afterbegin', SVG);
  }
  let importmap = {};
  document.querySelectorAll('script[type="importmap"]').forEach((s) => {
    try { Object.assign(importmap, JSON.parse(s.textContent).imports || {}); } catch (e) {}
  });
  for (const k in importmap) importmap[k] = new URL(importmap[k], document.baseURI).href;

  const canvas = document.createElement('canvas');
  const size = () => { canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px'; };
  canvas.style.display = 'block';   /* as three.js styles its own canvas */
  size();
  stage.appendChild(canvas);
  let off, worker, dead = false;
  function fallback() {
    if (dead) return; dead = true;
    try { worker && worker.terminate(); } catch (e) {}
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    original();
  }
  try { off = canvas.transferControlToOffscreen(); worker = new Worker(GL, { type: 'module' }); }
  catch (e) { fallback(); return; }

  /* element keys used by the worker -> real elements */
  const cache = {};
  function el(key) {
    if (cache[key]) return cache[key];
    const i = key.lastIndexOf('>>');
    let e;
    if (key === 'body') e = document.body;
    else if (i < 0) e = document.querySelector(key);
    else {
      const parent = key.slice(0, i), s = key.slice(i + 2);
      e = parent === 'doc' ? document.querySelector(s) : (el(parent) && el(parent).querySelector(s));
    }
    if (e) cache[key] = e;
    return e;
  }
  const box = (e) => { const r = e && e.getBoundingClientRect(); return r ? { left: r.left, top: r.top, width: r.width, height: r.height } : null; };
  function measures() {
    const r = {}, h = {};
    for (const k of ['doc>>.lead h1', 'doc>>.eyebrow']) if (el(k)) r[k] = box(el(k));
    if (el('#specimen>>.tag')) h['#specimen>>.tag'] = el('#specimen>>.tag').offsetHeight;
    return { rects: r, heights: h };
  }
  function viewMsg(type) {
    const m = measures();
    return { type, iw: innerWidth, ih: innerHeight, dpr: window.devicePixelRatio || 1, sy: window.scrollY || 0,
      sh: document.body.scrollHeight, rects: m.rects, heights: m.heights };
  }
  const post = (m) => { if (!dead) worker.postMessage(m); };
  function apply(ops) {
    for (const o of ops) {
      const e = el(o[0]);
      if (!e) continue;
      if (o[1] === 's') e.style[o[2]] = o[3];
      else if (o[1] === 'c') {
        e.classList.toggle(o[2], o[3]);
        /* the module measures the headline again 1.8 s after 'ready' (the rise animation has settled by then) */
        if (o[0] === 'body' && o[2] === 'ready' && o[3]) setTimeout(() => post(viewMsg('rects')), 1700);
      }
      else if (o[1] === 'a') e.setAttribute(o[2], o[3]);
      else if (o[1] === 't') e.textContent = o[2];
      else if (o[1] === 'r') { if (e.parentNode) e.parentNode.removeChild(e); delete cache[o[0]]; }
    }
  }
  worker.onmessage = (e) => {
    const d = e.data || {};
    if (d.type === 'dom') apply(d.ops);
    else if (d.type === 'fail') { if (window.console) console.warn('Understory worker failed, running on the page:', d.msg); fallback(); }
  };
  worker.onerror = (e) => { if (e && e.preventDefault) e.preventDefault(); fallback(); };

  const init = viewMsg('init');
  init.canvas = off;
  init.importmap = importmap;
  init.app = ORIGINAL;
  init.specimenClass = sp ? [...sp.classList] : [];
  init.bodyClass = [...document.body.classList];
  worker.postMessage(init, [off]);

  addEventListener('pointermove', (e) => post({ type: 'ptr', x: e.clientX, y: e.clientY }), { passive: true });
  addEventListener('scroll', () => post({ type: 'scroll', sy: window.scrollY || 0, sh: document.body.scrollHeight }), { passive: true });
  addEventListener('resize', () => { size(); post(viewMsg('resize')); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => post(viewMsg('fonts')));
}

if (!WK) original();
else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', front);
else front();
```

The folder now also holds `app.js`, `app-fast.js` and `gl.js` (zip them with the rest).

### C · Check

Serve the folder over HTTP. The loader counts to 100 % and lifts, the headline rises, the forest moves, the specimen tag pins to the log, the pointer swings the shot; `window.__app` is undefined on the page (the scene runs in the worker) and there are no console errors. With reduced motion turned on, `window.__app` exists (the original module on the page) and the page looks the same. Then measure as in the PAGE SPEED step. Expected, from the WordPress measurement: 98–100 on both.

## ASSET MANIFEST — download these into `assets/`

Source is the media library on `demo.uichemy.com`. Save each one under the name in the second column; the code already refers to it by that name.

| Download from | Save as |
|---|---|
| `https://demo.uichemy.com/wp-content/uploads/2026/09/understory-forest-hdr.glb` | `assets/forest-hdr.glb` |
| `https://demo.uichemy.com/wp-content/uploads/2026/09/understory-jungle.glb` | `assets/jungle.glb` |


---

# APPENDIX · VERBATIM SOURCE

The complete source of every file. **Write them out exactly** — do not change a value, a comment, a class name, or the order of a declaration. Recreate this file layout:

```
index.html
atmosphere.js
butterflies.js
fur.js
post.js
realism.js
wind.js
```

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Understory</title>
<meta name="description" content="Understory — continuous biodiversity measurement for the forest floor.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..600,0..100,0..1;1,9..144,300..600,0..100,0..1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#eef2ea;
    --ink-soft:rgba(238,242,234,.74);
    --ink-faint:rgba(238,242,234,.48);
    --moss:#bcd894;
    --lichen:#e6cf96;
    --bark:#0c0f0b;
    --hair:rgba(238,242,234,.20);
    --glass:rgba(12,16,11,.38);
    --serif:"Fraunces",Georgia,serif;
    --mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;
    --pad:44px;
  }
  *{box-sizing:border-box}
  body{
    margin:0;background:var(--bark);color:var(--ink);font-family:var(--serif);
    -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
    overflow:hidden;height:100svh;
  }

  /* ---------- the 3D stage ---------- */
  #stage{position:fixed;inset:0;z-index:0}
  #stage canvas{display:block;width:100%;height:100%}
  .scrim{
    position:fixed;inset:0;z-index:1;pointer-events:none;
    background:
      linear-gradient(to bottom, rgba(9,12,8,.62) 0%, rgba(9,12,8,0) 22%),
      linear-gradient(to top,    rgba(9,12,8,.78) 0%, rgba(9,12,8,.30) 32%, rgba(9,12,8,0) 55%),
      linear-gradient(to right,  rgba(9,12,8,.45) 0%, rgba(9,12,8,0) 46%);
  }
  /* film grain — a render is perfectly clean, a photograph never is */
  .grain{
    position:fixed;inset:-50%;z-index:2;pointer-events:none;opacity:.07;mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    animation:grain 1.2s steps(6) infinite;
  }
  @keyframes grain{
    0%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}
    60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,2%)}100%{transform:translate(0,0)}
  }

  /* ---------- loader ---------- */
  #loader{
    position:fixed;inset:0;z-index:40;background:var(--bark);
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;
    transition:opacity .9s ease;
  }
  #loader.done{opacity:0;pointer-events:none}
  .mark{font-family:var(--serif);font-style:italic;font-size:32px;font-weight:340;
        font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 72}
  .bar{width:180px;height:1px;background:var(--hair);overflow:hidden}
  .bar i{display:block;height:100%;width:0%;background:var(--moss);transition:width .25s ease}
  .pct{font:400 11px/1 var(--mono);letter-spacing:.22em;color:var(--ink-faint)}

  /* ---------- layout ---------- */
  .content{position:fixed;inset:0;z-index:3;pointer-events:none}
  .content a,.content button{pointer-events:auto}
  .mono{font-family:var(--mono);font-weight:400;font-size:11px;letter-spacing:.16em;text-transform:uppercase}

  /* top bar: field-station metadata, not navigation */
  .topbar{
    position:absolute;top:0;left:0;right:0;padding:30px var(--pad);
    display:flex;justify-content:space-between;align-items:flex-start;
  }
  .brand{display:flex;flex-direction:column;gap:7px}
  .brand b{font-weight:360;font-style:italic;font-size:24px;letter-spacing:-.01em;line-height:1;
           font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 60}
  .brand span{color:var(--ink-faint)}
  .station{text-align:right;display:flex;flex-direction:column;gap:8px;color:var(--ink-soft)}
  .rec{display:inline-flex;align-items:center;gap:8px;justify-content:flex-end;color:var(--moss)}
  .rec i{width:6px;height:6px;border-radius:50%;background:var(--moss);box-shadow:0 0 0 0 rgba(188,216,148,.7);
         animation:rec 2.2s ease-out infinite}
  @keyframes rec{0%{box-shadow:0 0 0 0 rgba(188,216,148,.6)}100%{box-shadow:0 0 0 10px rgba(188,216,148,0)}}

  /* headline block, bottom-left */
  .lead{position:absolute;left:var(--pad);bottom:48px;width:min(760px,62vw)}
  .eyebrow{display:flex;align-items:center;gap:12px;color:var(--lichen);margin:0 0 26px}
  .eyebrow::before{content:"";width:34px;height:1px;background:var(--lichen);opacity:.7}
  h1{
    margin:0 0 30px;font-weight:330;line-height:.9;letter-spacing:-.035em;font-size:104px;
    font-variation-settings:"SOFT" 60,"WONK" 0,"opsz" 144;
  }
  h1 span{display:block}
  h1 .l2{padding-left:.9em}
  h1 .l3{padding-left:.28em}
  h1 em{font-style:italic;font-weight:300;color:var(--moss);
        font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144}
  .lede{margin:0;max-width:430px;font-size:18px;line-height:1.55;font-weight:350;color:var(--ink-soft);
        font-variation-settings:"opsz" 18}
  .lede b{font-weight:500;color:var(--ink)}
  /* specimen tag pinned to the log — positioned every frame from the 3D scene */
  .specimen{position:absolute;left:0;top:0;width:0;height:0;will-change:transform;transition:opacity .6s}
  .specimen.off{opacity:0}
  .pin{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;
       border:1.5px solid var(--lichen);background:rgba(230,207,150,.25)}
  .pin::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:1px solid rgba(230,207,150,.55);
              animation:ping 2.6s ease-out infinite}
  @keyframes ping{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.6);opacity:0}}
  .lead-line{position:absolute;left:0;top:-96px;width:118px;height:96px;overflow:visible}
  .tag{
    position:absolute;left:118px;top:-126px;width:214px;padding:12px 14px;
    background:rgba(236,232,214,.92);color:#1c2016;border-radius:1px;
    box-shadow:0 18px 40px -18px rgba(0,0,0,.6);
  }
  .tag .no{display:block;color:#6b6a4e;font-size:10px;margin-bottom:8px}
  .tag b{display:block;font-weight:500;font-style:italic;font-size:17px;line-height:1.1;
         font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 30}
  .tag .common{display:block;font-size:13px;color:#4b4d3c;margin-top:3px}
  /* near the right edge the tag swings to the other side of its pin */
  .specimen.flip .lead-line{left:-118px;transform:scaleX(-1)}
  .specimen.flip .tag{left:auto;right:118px}
  .tag .meta{display:flex;justify-content:space-between;margin-top:10px;padding-top:8px;border-top:1px dashed #a8a488;
             color:#6b6a4e;font-size:9.5px}

  /* staged entrance once the scene is ready */
  .rise{opacity:0;transform:translateY(18px)}
  body.ready .rise{animation:rise 1.1s cubic-bezier(.2,.7,.2,1) forwards}
  body.ready .d1{animation-delay:.10s} body.ready .d2{animation-delay:.22s}
  body.ready .d3{animation-delay:.34s} body.ready .d4{animation-delay:.48s}
  body.ready .d5{animation-delay:.62s} body.ready .d6{animation-delay:.80s}
  body.ready .d7{animation-delay:1.05s}
  @keyframes rise{to{opacity:1;transform:none}}

  @media(max-width:1200px){
    h1{font-size:76px}
    .lead{width:min(620px,60vw)}
  }
  @media(max-width:900px){
    :root{--pad:20px}
    h1{font-size:50px}
    .lede{font-size:16px;max-width:none}
    .lead{width:auto;right:var(--pad);bottom:30px}
    .specimen,.station .coords{display:none}
  }
  /* mobile fix: on the narrowest phones the eyebrow breaks into two even lines instead of leaving one word alone */
  @media(max-width:380px){ .lead .eyebrow{ text-wrap:balance } }
  @media(prefers-reduced-motion:reduce){
    .grain,.pin::after,.rec i{animation:none}
    .rise{opacity:1;transform:none}
    body.ready .rise{animation:none}
  }
</style>
</head>
<body>

<div id="stage"></div>
<div class="scrim"></div>

<div id="loader">
  <div class="mark">Understory</div>
  <div class="bar"><i id="barfill"></i></div>
  <div class="pct" id="pct">0%</div>
</div>

<div class="grain"></div>

<div class="content">
  <div class="topbar">
    <div class="brand rise d1">
      <b>Understory</b>
      <span class="mono">Ground-layer ecology</span>
    </div>
    <div class="station rise d2">
      <span class="rec mono"><i></i>Recording</span>
      <span class="mono coords">Plot 04 · 01°22′N 103°48′E · 212 m</span>
    </div>
  </div>

  <div class="specimen off" id="specimen" aria-hidden="true">
    <i class="pin"></i>
    <svg class="lead-line" viewBox="0 0 118 96" preserveAspectRatio="none">
      <path d="M0 96 L46 30 L118 30" fill="none" stroke="rgba(230,207,150,.75)" stroke-width="1"/>
    </svg>
    <div class="tag">
      <span class="no mono">Specimen 0417</span>
      <b>Hypnum cupressiforme</b>
      <span class="common">Cypress-leaved plait-moss</span>
      <span class="meta mono"><span>On fallen log</span><span>0.9 m</span></span>
    </div>
  </div>

  <section class="lead">
    <p class="eyebrow mono rise d3">Survey Nº 04 — Life below the knee</p>
    <h1 class="rise d4">
      <span class="l1">The forest</span>
      <span class="l2"><em>floor</em> is</span>
      <span class="l3">the forest.</span>
    </h1>
    <p class="lede rise d5">Ninety percent of a woodland’s living diversity grows <b>under your boot</b> — and almost none of it appears in canopy surveys. We measure the layer everyone walks over.</p>
  </section>

</div>

<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/"
  }
}
</script>

<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { makeFur } from './fur.js';
import { makeButterflies } from './butterflies.js';
import { applyWind, tickWind } from './wind.js';
import { addSurfaceDetail } from './realism.js';
import { makeShafts, makeMist, makeMotes, makeSky } from './atmosphere.js';
import { makePost } from './post.js';

const stage  = document.getElementById('stage');
const loader = document.getElementById('loader');
const barfill= document.getElementById('barfill');
const pctEl  = document.getElementById('pct');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- renderer ---------- */
const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.28;
stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
let post = null;

/* Blender camera: loc (0.2, -10.5, 0.6), 34 mm on a 36 mm sensor.
   glTF is Y-up, so Blender (x,y,z) -> three (x, z, -y).                        */
const CAM_HOME = new THREE.Vector3(1.1, -0.679, 9.4);
const TARGET   = new THREE.Vector3(-0.4, -1.587, -1.8);
const H_FOV    = 61.93;                                   // degrees, from the 30 mm lens

const camera = new THREE.PerspectiveCamera(35, innerWidth/innerHeight, 0.1, 400);
camera.position.copy(CAM_HOME);
camera.lookAt(TARGET);

/* keep the Blender framing whatever the window aspect is: hold horizontal FOV,
   derive vertical, and never let a tall phone crop the branch out of frame     */
post = makePost(renderer, scene, camera, {
  /* keyed high and weak: bloom should catch only the shaft cores, not
     halo the moss and swallow the headline */
  bloomStrength: 0.20, bloomRadius: 0.5, bloomThreshold: 0.94,
  contrast: 1.12, saturation: 1.05, lift: 0.010, vignette: 0.5, warm: 0.7,
});

function applyFov(){
  const aspect = innerWidth / innerHeight;
  const hRad = THREE.MathUtils.degToRad(H_FOV);
  const vRad = 2 * Math.atan(Math.tan(hRad/2) / Math.max(aspect, 0.62));
  camera.fov = THREE.MathUtils.radToDeg(vRad);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}
applyFov();

/* a little directional shaping on top of the environment */
const key = new THREE.DirectionalLight(0xffe9c4, 1.55);
key.position.set(4, 6, -4);
scene.add(key);
const fill = new THREE.DirectionalLight(0xbcd3e8, 0.62);
fill.position.set(-5, 3, 5);
scene.add(fill);

/* Overcast sky is a DOME of light, not a direction. Without this, anything seen
   against the sky — every branch and every canopy leaf — has no light on the
   camera side at all and renders as a black stick. A hemisphere light fills
   upward-facing surfaces with sky and downward ones with bounced ground. */
const hemi = new THREE.HemisphereLight(0x9fb4a4, 0x3f4a33, 1.25);
scene.add(hemi);

/* ---------- loading ---------- */
let envDone = false, modelDone = false;
let envPct = 0, modelPct = 0;
function progress(){
  const p = Math.round(envPct * 0.32 + modelPct * 0.68);
  barfill.style.width = p + '%';
  pctEl.textContent = p + '%';
  if (envDone && modelDone){
    loader.classList.add('done');
    document.body.classList.add('ready');
    setTimeout(measureLead, 1800);
    setTimeout(() => loader.remove(), 800);
  }
}

const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();

/* The HDR's exact bytes ride inside a .glb carrier
   (BIN chunk = the untouched .hdr file). */
async function loadHdrCarrier(url, onPct){
  const res = await fetch(url);
  if (!res.ok) throw new Error('HDR carrier ' + res.status);
  const total = +res.headers.get('content-length') || 0;
  const reader = res.body.getReader(); const parts = []; let got = 0;
  for (;;){
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value); got += value.length;
    if (total) onPct(got / total * 100);
  }
  const buf = new Uint8Array(got); let o = 0;
  for (const p of parts){ buf.set(p, o); o += p.length; }
  const dv = new DataView(buf.buffer);
  const jsonLen = dv.getUint32(12, true);
  const binStart = 20 + jsonLen;
  const meta = JSON.parse(new TextDecoder().decode(buf.subarray(20, 20 + jsonLen)));
  const size = meta.buffers[0].byteLength;
  return URL.createObjectURL(new Blob([buf.subarray(binStart + 8, binStart + 8 + size)]));
}

loadHdrCarrier('assets/forest-hdr.glb', (pct) => { envPct = pct; progress(); }).then((hdrUrl) => new RGBELoader().load(hdrUrl,
  (hdr) => {
    const env = pmrem.fromEquirectangular(hdr).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.80;   // lighting only
    scene.background = null;   // the sky dome draws it instead
    /* pushed out so the mid-ground is crisp; haze now comes from the mist bank
   and the grade, not from fog eating everything past 8 m */
    scene.fog = new THREE.Fog(0x36433b, 14.0, 78.0);
    hdr.dispose(); pmrem.dispose();
    envDone = true; envPct = 100; progress();
  },
  (e) => { if (e.total) { envPct = e.loaded/e.total*100; progress(); } },
  (err) => { console.error('HDR failed', err); envDone = true; envPct = 100; progress(); }
)).catch((err) => { console.error('HDR failed', err); envDone = true; envPct = 100; progress(); });

let model = null, fur = null, trunkFur = null, branchFur = null, groundFur = null, dust = null, flies = null;
let shafts = null, mist = null, motes = null, sky = null;
const gltfLoader = new GLTFLoader();
gltfLoader.setMeshoptDecoder(MeshoptDecoder);   // EXT_meshopt_compression
gltfLoader.load('assets/jungle.glb',
  (gltf) => {
    model = gltf.scene;
    /* the export carries Blender's camera and lights as empty nodes — drop them */
    [...model.children].forEach(o => {
      if (o.isCamera || o.isLight || /^(Camera|Area)/.test(o.name)) model.remove(o);
    });
    model.traverse(o => {
      if (!o.isMesh) return;
      o.frustumCulled = true;
      const m = o.material;
      if (!m) return;
      m.envMapIntensity = 1.0;
      /* every frond, leaflet, vine leaf and litter flake is a single flat quad —
         without DoubleSide roughly half of them render as holes */
      /* Bark at 0.075 was fine against a black backdrop; against the sky it is
         a black stick. Lifted, and warmed, so the branches read as wood. */
      if (/J_Bark/.test(m.name)) { m.color.setRGB(0.225, 0.163, 0.108); m.roughness = 0.86; }
      /* The floor read as pale grey-lilac rather than soil. Dark, warm and
         fully rough is what damp leaf-mould actually is; the pale version was
         the flat export colour surviving a 1.85 exposure untouched. */
      if (/J_Ground/.test(m.name)) { m.color.setRGB(0.052, 0.033, 0.021); m.roughness = 1.0; }
      if (/J_Litter/.test(m.name)) { m.color.setRGB(0.070, 0.046, 0.026); m.roughness = 1.0; }
      if (/J_(Frond|LeafBroad|Vine|Litter|Fungus)/.test(m.name)) {
        m.side = THREE.DoubleSide;
        m.roughness = 0.62;
      }
      /* Wind has to be per-MESH, not per-material: Canopy, BroadLeaves and
         OverhangLeaves all share J_LeafBroad but live at completely different
         heights, and one shared `base` would either freeze the canopy or tear
         the ground plants off their roots. */
      /* One dial for the whole scene — raise WIND_SCALE for more, drop it for less.
         Wood is deliberately absent: Branches and Overhang are NOT in this table,
         because a visibly bending branch is what made it look rubbery. Only soft
         things move, and only just enough to stop the frame looking like a photo. */
      const WIND_SCALE = 0.34;
      const W = {
        Ferns          : { amp: 0.050, freq: 1.35, base: -3.0, span: 1.5 },
        BroadLeaves    : { amp: 0.055, freq: 1.05, base: -3.0, span: 2.0 },
        Vines          : { amp: 0.080, freq: 0.62, base:  9.0, span: -6.0 },
        Canopy         : { amp: 0.070, freq: 0.50, base:  1.5, span: 7.0 },
        OverhangLeaves : { amp: 0.065, freq: 0.58, base:  0.5, span: 3.5 },
      }[o.name.replace(/\.\d+$/, '')];
      if (W){ W.amp *= WIND_SCALE; W.gust = 0; }   // gust off: a steady, quiet sway
      if (W){ o.material = m.clone(); applyWind(o.material, W); }

      /* Surface detail. Everything exported as ONE flat colour per material,
         which is exactly why it reads as a Blender viewport. Two bands of
         world-space noise break that up, and leaves additionally get back-light
         bleed — a leaf with the sun behind it glows, and nothing else in a render
         says "jungle photograph" as fast. */
      const D = {
        J_Frond    : { strength: 0.40, warm: 0.55, translucency: 1.15, highFreq: 3.4, contact: 0.45, contactSpan: 0.8 },
        J_LeafBroad: { strength: 0.38, warm: 0.60, translucency: 1.45, highFreq: 2.2, contact: 0.30, contactSpan: 1.0 },
        J_Vine     : { strength: 0.34, warm: 0.45, translucency: 0.70, highFreq: 3.0 },
        J_Fungus   : { strength: 0.30, warm: 0.30, translucency: 0.55, highFreq: 4.0, contact: 0.40 },
        J_Moss     : { strength: 0.32, warm: 0.28, grain: 0.22, highFreq: 3.2, contact: 0.50, contactSpan: 1.6 },
        J_Bark     : { strength: 0.30, warm: 0.20, grain: 0.42, lowFreq: 0.5, highFreq: 5.0, contact: 0.45, contactSpan: 1.9, translucency: 0.10 },
        J_Ground   : { strength: 0.42, warm: 0.22, grain: 0.85, lowFreq: 0.30, highFreq: 5.5 },
        J_Litter   : { strength: 0.34, warm: 0.40, grain: 0.35, highFreq: 5.0 },
        J_Rock     : { strength: 0.24, warm: 0.08, grain: 0.40, highFreq: 4.0, contact: 0.55, contactSpan: 0.7 },
      }[m.name];
      if (D) addSurfaceDetail(o.material, D);
    });
    scene.add(model);

    /* ---- moss as geometry, not as a tint ----
       A smooth tube with a green vertex colour reads as painted plastic however
       good the ramp is. What makes the reference look real is a fuzzy silhouette:
       tens of thousands of instanced strands standing off the surface, catching a
       rim light. Scatter them over the branch and the rocks. */
    const furHosts = [];
    const near = new THREE.Vector3();
    model.traverse(o => {
      /* by NAME, not material: trunks 8-11 use J_Bark and were being skipped
         entirely, which is why the far trees stayed bare cylinders */
      const mossy = /J_Moss/.test(o.material?.name || '') || /^(Trunk|Buttress)/.test(o.name);
      if (!(o.isMesh && mossy)) return;
      /* the substrate is what shows between strands — it has to read as damp
         shadow, not as a pale pipe */
      o.material.color.setRGB(0.055, 0.085, 0.048);
      o.material.roughness = 0.95;
      /* only fur what the camera can actually resolve. Distant trunks eat the
         strand budget and the fog hides them anyway. */
      /* Measure to the BASE, not the bounding-sphere centre: on a 60 m trunk the
         centre sits 30 m in the air and reads as "far", which silently excluded
         the back five trees from the moss pass entirely. */
      o.geometry.computeBoundingBox();
      const bb = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);
      near.set((bb.min.x + bb.max.x) * 0.5, bb.min.y, (bb.min.z + bb.max.z) * 0.5);
      if (near.distanceTo(CAM_HOME) < 60) furHosts.push(o);
    });
    /* Two passes, not one. A single shared budget meant the log (~87 m2) competed
       with eight trunks (~110 m2 each) and lost — the measured result was 360
       strands/m2 on the hero object, which is a sheen, not moss. Splitting them
       lets the log carry an order of magnitude more without inflating the total. */
    const logHosts   = furHosts.filter(o => /HeroLog|LogLimb|Rock/.test(o.name));
    const trunkHosts = furHosts.filter(o => /Trunk/.test(o.name));

    const MOSS = {
      upBias: 0.42, curl: 0.60, droop: 0.42,
      clump: { freq: 2.3, contrast: 2.6 },
      root: [0.040, 0.098, 0.026], tip: [0.235, 0.430, 0.106], rim: [0.15, 0.24, 0.075],
      fogColor: [0.085,0.140,0.115], fogNear: 8.0, fogFar: 52.0,
    };

    if (logHosts.length){
      /* The log's top faces up and the camera looks down on it, so strands that
         stand straight up are seen end-on and read as nothing. Splaying them
         over presents the leaf FACES to the camera, which is why the vertical
         trunks looked mossy while the horizontal log did not. */
      fur = makeFur(logHosts, { ...MOSS, density: 4200, maxCount: 140000,
        /* 0.95 splayed so far that strands hung past the log's lower edge and
           the rim light turned them into a neon strip. 0.62 still presents the
           leaf faces without the fringe. */
        /* Diagnosed by hiding the log mesh: the moss was there and dense, but
           standing perpendicular to an up-facing surface it projects to almost
           nothing from this camera, so the substrate showed straight through.
           Laying it over is what makes it read. The earlier neon fringe came
           from the RIM light on strands hanging past the silhouette, so that is
           dialled right down rather than the droop. */
        length: 0.125, width: 0.068, droop: 0.30, curl: 0.95, lay: 0.72,
        rim: [0.10, 0.16, 0.05] });
      scene.add(fur);
    }
    if (trunkHosts.length){
      /* Moss on all 12 trunks + the buttress roots. The previous attempt read as
         spiky hair because the strands were long (0.125) and only half laid over
         (lay 0.45), so they stood out sideways from a vertical surface. Moss on
         bark is a SKIN: very short, fine, and laid almost flat against it, so
         lay goes to 0.82 and the length drops by more than half. */
      trunkFur = makeFur(trunkHosts, { ...MOSS, density: 6400, maxCount: 360000,
        /* Thicker coat per the reference: longer and wider so it builds depth
           rather than sitting flat as speckle. lay stays high (0.76) — that is
           what keeps it a coat and not the spiky hair of the earlier attempt,
           which was long AND standing off the bark at lay 0.45. */
        /* bigger tufts to match the reference's chunky cushions; safe to grow
           because lay is high, so length builds depth against the bark rather
           than sticking out from it */
        length: 0.135, width: 0.068, segs: 4,
        droop: 0.26, curl: 0.80, lay: 0.76, upBias: 0.30,
        tip: [0.245, 0.445, 0.112], root: [0.044, 0.104, 0.028],
        focus: { point: new THREE.Vector3(0.6, -0.9, 3.5), radius: 46.0, falloff: 1.25 } });
      scene.add(trunkFur);
    }

    /* Branches: the limbs were bare smooth tubes next to mossy trunks, which is
       what made them read as pipes. Same moss skin, own budget so the trunks keep
       theirs, focused toward the lens because most limbs are far overhead. */
    const branchHosts = [];
    model.traverse(o => { if (o.isMesh && /^(Branches|Overhang|LogLimb)$/.test(o.name.replace(/\d+$/, ''))) branchHosts.push(o); });
    if (branchHosts.length){
      branchFur = makeFur(branchHosts, { ...MOSS, density: 5200, maxCount: 150000,
        length: 0.075, width: 0.042, segs: 3,
        droop: 0.30, curl: 0.80, lay: 0.78, upBias: 0.62,
        tip: [0.245, 0.445, 0.112], root: [0.044, 0.104, 0.028],
        focus: { point: new THREE.Vector3(0.6, 4.0, 3.5), radius: 40.0, falloff: 1.4 } });
      scene.add(branchFur);
    }

    /* Ground cover. The floor was a swept plane with a colour on it — perfectly
       smooth, so it read as a render however good the shading got. The plane is
       46 m across, so the budget is focused into the 15 m the lens can resolve. */
    const groundMesh = [];
    model.traverse(o => { if (o.isMesh && /J_Ground/.test(o.material?.name || '')) groundMesh.push(o); });
    if (groundMesh.length){
      groundFur = makeFur(groundMesh, {
        /* Two rounds of tuning here. 120k sub-pixel strands aliased into grey
           static; the fix was not more of them but FEWER and WIDER, each one
           covering more than a pixel. The second problem was contrast — dark
           blades on lighter soil read as confetti, so the colours now sit close
           to the ground's own value and the rim is nearly off. Blending into the
           surface is the point; it should read as texture, not as objects. */
        /* At this grazing camera angle tall blades mass into a dark band across
           the frame however they are coloured. A forest floor is low anyway —
           moss and litter, not grass — so keep it hugging the ground. */
        density: 130, maxCount: 22000, length: 0.085, width: 0.044, lay: 0.78,
        upBias: 0.95, droop: 0.95, sway: 0.14, curl: 1.10,
        clump: { freq: 0.55, contrast: 2.8, bald: 0.55 },
        focus: { point: new THREE.Vector3(0.4, -2.6, 2.0), radius: 14.0, falloff: 1.7 },
        /* re-tuned after the brightness lift: against a lighter floor the old
           dark roots read as black bristles. These sit just above the soil's
           own value so the cover blends instead of spiking out of it. */
        root: [0.070, 0.082, 0.040], tip: [0.20, 0.30, 0.095], rim: [0.10, 0.15, 0.05],
        fogColor: [0.105,0.135,0.112], fogNear: 14.0, fogFar: 78.0,
      });
      scene.add(groundFur);
    }

    /* airborne dust — cheap, and it does a lot for depth */
    const N = 1100, dp = new Float32Array(N*3);
    for (let i = 0; i < N; i++){
      dp[i*3]   = (Math.random()-0.5) * 34;
      dp[i*3+1] = Math.random() * 11 - 3.0;
      dp[i*3+2] = (Math.random()-0.5) * 40;
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    dust = new THREE.Points(dg, new THREE.PointsMaterial({
      size: 0.028, color: 0xcfe0bb, transparent: true, opacity: 0.5,
      depthWrite: false, blending: THREE.AdditiveBlending, fog: true,
    }));
    scene.add(dust);

    sky    = makeSky({ horizon: [0.30, 0.365, 0.315],
                       zenith:  [0.058, 0.090, 0.082],
                       cloud:   [0.42, 0.475, 0.425],
                       amount: 0.8, cover: 0.16 });
    scene.add(sky);
    shafts = makeShafts();  scene.add(shafts);
    SHAFT_BASE.copy(shafts.material.uniforms.uColor.value);
    /* Mist slabs are horizontal planes; any sitting near the camera's own
       height (-0.68) are seen edge-on and smear a pale band right across the
       floor — which is what was bleaching the soil. Lift the bank above the
       lens so it hazes the trees and leaves the ground alone. */
    mist   = makeMist({ count: 8, y: [0.9, 5.0], area: 36, size: [16, 30],
                        opacity: 0.15, color: [0.62, 0.72, 0.64] });
    scene.add(mist);
    motes  = makeMotes();   scene.add(motes);

    flies = makeButterflies({
      count: 4,
      bounds: { x:[-5.0, 5.0], y:[-0.35, 1.5], z:[-2.5, 3.0] },
      size: [0.11, 0.16],
      palette: [
        [1.00, 0.40, 0.04],   // monarch orange
        [0.06, 0.42, 1.00],   // morpho blue
        [1.00, 0.82, 0.06],   // lemon
        [0.95, 0.16, 0.60],   // magenta
        [0.08, 0.80, 0.42],   // emerald
        [0.92, 0.10, 0.08],   // scarlet
      ],
      speed: 0.55,
      beat:  0.62,
    });
    scene.add(flies);

    pickAnchor();
    window.__app = { post, scene, camera, renderer, model, fur, trunkFur, branchFur, groundFur, flies, sky, shafts, mist, motes };   // handle for inspection
    modelDone = true; modelPct = 100; progress();
  },
  (e) => { if (e.total) { modelPct = e.loaded/e.total*100; progress(); } },
  (err) => {
    console.error('GLB failed', err);
    loader.querySelector('.pct').textContent = 'scene failed to load';
    modelDone = true; modelPct = 100;
  }
);

/* ---------- interaction ---------- */
const pointer = { x:0, y:0, tx:0, ty:0 };
addEventListener('pointermove', (e) => {
  pointer.tx = (e.clientX / innerWidth  - 0.5) * 2;
  pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
}, { passive:true });

let scrollN = 0;
function readScroll(){
  const max = Math.max(1, document.body.scrollHeight - innerHeight);
  scrollN = Math.min(1, scrollY / max);
}
addEventListener('scroll', readScroll, { passive:true });
addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  if (post){ post.composer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
             post.composer.setSize(innerWidth, innerHeight); }
  applyFov();
  readScroll();
});
readScroll();

const specimen = document.getElementById('specimen');
const anchor = new THREE.Vector3(); let hasAnchor = false;
const _p = new THREE.Vector3();
function pickAnchor(){
  /* choose the log vertex that projects closest to a clear patch of screen,
     preferring the TOP of the log so the pin sits on the moss, not underneath */
  let log = null; model.traverse(o => { if (o.isMesh && o.name.startsWith('HeroLog')) log = o; });
  if (!log) return;
  camera.updateMatrixWorld();
  const pos = log.geometry.attributes.position, target = { x: 0.66, y: 0.40 };
  let best = 1e9;
  for (let i = 0; i < pos.count; i += 3){
    _p.fromBufferAttribute(pos, i).applyMatrix4(log.matrixWorld);
    const w = _p.clone(); _p.project(camera);
    if (_p.z > 1) continue;
    const sx = _p.x * 0.5 + 0.5, sy = -_p.y * 0.5 + 0.5;
    const dist = Math.hypot(sx - target.x, sy - target.y) - w.y * 0.004;
    if (dist < best){ best = dist; anchor.copy(w); }
  }
  hasAnchor = true;
}
function updateSpecimen(){
  if (!hasAnchor || innerWidth <= 900){ specimen.classList.add('off'); return; }
  _p.copy(anchor).project(camera);
  const x = (_p.x * 0.5 + 0.5) * innerWidth, y = (-_p.y * 0.5 + 0.5) * innerHeight;
  const visible = _p.z < 1 && x > 60 && x < innerWidth - 60 && y > 160 && y < innerHeight - 60;
  const flip = x > innerWidth - 380;
  specimen.classList.toggle('flip', flip);
  specimen.classList.toggle('off', !visible || !document.body.classList.contains('ready'));
  specimen.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

  /* keep the tag clear of the headline block: if it would overlap, lift it and
     stretch the leader line to match, rather than letting it sit on the copy */
  const tagLeft = flip ? x - 118 - 214 : x + 118, tagRight = tagLeft + 214;
  let lift = 0;
  if (tagLeft < leadBox.right && tagRight > leadBox.left){
    const tagBottom = y - 126 + TAG_H;
    lift = Math.max(0, tagBottom - (leadBox.top - 14));
  }
  lift = Math.round(lift);
  if (lift !== lastLift){
    lastLift = lift;
    specimen.querySelector('.tag').style.top = (-126 - lift) + 'px';
    const h = 96 + lift;
    leadSvg.style.top = (-h) + 'px'; leadSvg.style.height = h + 'px';
    leadSvg.setAttribute('viewBox', `0 0 118 ${h}`);
    leadPath.setAttribute('d', `M0 ${h} L46 30 L118 30`);
  }
}
const leadSvg  = specimen.querySelector('.lead-line');
const leadPath = specimen.querySelector('.lead-line path');
let TAG_H = 110;
let lastLift = -1, leadBox = { left:0, right:0, top:1e9 };
function measureLead(){
  const el = document.querySelector('.lead h1'), eb = document.querySelector('.eyebrow');
  const r1 = el.getBoundingClientRect(), r2 = eb.getBoundingClientRect();
  leadBox = { left: Math.min(r1.left, r2.left), right: Math.max(r1.right, r2.right), top: Math.min(r1.top, r2.top) };
  /* the tag's real height depends on the loaded webfont, so measure it */
  const th = specimen.querySelector('.tag').offsetHeight;
  if (th > 0) TAG_H = th;
  lastLift = -1;
}
addEventListener('resize', measureLead);
document.fonts?.ready.then(measureLead);
measureLead();

/* ---------- frame loop ---------- */
const camPos = CAM_HOME.clone();
const look   = TARGET.clone();
const clock  = new THREE.Clock();
let t = 0;

/* Weather you can only see behind the trees is scenery. What makes overcast read
   as real is the light CHANGING as cloud passes overhead — the forest dims, the
   shafts fade, then it opens up again. Same lazy frequencies as the sky's own
   drift so they belong to one system. */
const SHAFT_BASE = new THREE.Vector3();
const HEMI_BASE  = hemi.intensity;
const KEY_BASE   = key.intensity;
const FILL_BASE  = fill.intensity;
const ENV_BASE   = 0.80;
function cloudCover(time){
  const a = Math.sin(time * 0.043) * 0.5 + 0.5;
  const b = Math.sin(time * 0.017 + 2.1) * 0.5 + 0.5;
  const c = Math.sin(time * 0.089 + 4.7) * 0.5 + 0.5;
  return a * 0.5 + b * 0.35 + c * 0.15;          // 0 = clear, 1 = thick
}

renderer.setAnimationLoop(() => {
  /* getDelta() must come first — getElapsedTime() consumes the delta internally
     and would leave dt at ~0, freezing every eased value below */
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  /* how quickly the camera chases the cursor. Higher base = slower, lazier
     follow. 0.0015 snapped almost instantly and felt twitchy. */
  const ease = 1 - Math.pow(0.34, dt);

  pointer.x += (pointer.tx - pointer.x) * ease;
  pointer.y += (pointer.ty - pointer.y) * ease;

  /* scroll pushes the camera in past the branch and lifts it slightly */
  const dolly = scrollN * 6.2;
  const rise  = scrollN * 1.5;

  /* idle drift so the shot is never completely still */
  const driftX = reduced ? 0 : Math.sin(t * 0.21) * 0.20;
  const driftY = reduced ? 0 : Math.cos(t * 0.17) * 0.12;

  /* pointer.y is +1 at the BOTTOM of the window, so pushing the cursor down
     raises the look target and swings the shot up into the trees. The camera
     itself barely moves — tilting the target is what reads as "looking up". */
  const px   = reduced ? 0 : pointer.x * 0.55;
  const py   = reduced ? 0 : -pointer.y * 0.22;
  const tilt = reduced ? 0 : pointer.y;

  camPos.set(
    CAM_HOME.x + px + driftX,
    CAM_HOME.y + py + driftY + rise,
    CAM_HOME.z - dolly
  );
  /* dt-based so the feel is identical at 60 and 120 Hz */
  camera.position.lerp(camPos, 1 - Math.pow(0.10, dt));

  /* asymmetric on purpose: pushing the cursor DOWN swings a long way up into the
     canopy, but pushing it up only dips slightly — a full downward rotation just
     stares at the litter and throws the log out of frame */
  const eased = tilt * (0.55 + 0.45 * Math.abs(tilt));
  const lift  = eased * (tilt > 0 ? 7.4 : 1.5);
  look.set(
    TARGET.x + (reduced ? 0 : pointer.x * 0.9),
    TARGET.y + rise * 0.55 + lift,
    TARGET.z
  );
  camera.lookAt(look);

  if (fur)       fur.material.uniforms.uTime.value = t;
  if (trunkFur)  trunkFur.material.uniforms.uTime.value = t;
  if (branchFur) branchFur.material.uniforms.uTime.value = t;
  if (groundFur) groundFur.material.uniforms.uTime.value = t;
  if (flies)  flies.material.uniforms.uTime.value  = t;
  /* one cover value drives the sun, the fill, the ambient and the shafts, so
     the whole scene breathes together instead of each part drifting alone */
  const cover = cloudCover(t);
  key.intensity  = KEY_BASE  * (1.30 - cover * 0.85);
  fill.intensity = FILL_BASE * (0.85 + cover * 0.45);   // overcast lifts ambient
  scene.environmentIntensity = ENV_BASE * (0.88 + cover * 0.30);
  hemi.intensity = HEMI_BASE * (0.82 + cover * 0.42);   // cloud = more sky fill
  /* shafts are direct sun: they fade out under cloud and return when it clears */
  if (shafts) shafts.material.uniforms.uColor.value
    .copy(SHAFT_BASE).multiplyScalar(1.35 - cover * 1.15);
  if (sky){ sky.material.uniforms.uTime.value = t; sky.position.copy(camera.position); }
  if (shafts) shafts.material.uniforms.uTime.value = t;
  if (mist)   mist.material.uniforms.uTime.value   = t;
  if (motes)  motes.material.uniforms.uTime.value  = t;
  tickWind(t);
  if (dust) dust.rotation.y = t * 0.012;

  updateSpecimen();
  post ? post.composer.render() : renderer.render(scene, camera);
});

/* a hidden tab already gets no rAF callbacks, so there is nothing to pause;
   never reload here — embedded preview panes report document.hidden and would
   reload in a loop */
</script>
</body>
</html>

```

## `atmosphere.js`

```js
/* Atmosphere — the three things that turn a lit model into a place:
   light shafts falling through the canopy, mist lying in the hollows, and
   glowing motes drifting in the beams. All additive, all shader-driven. */
import * as THREE from 'three';

/* ------------------------------------------------------------------ shafts */
const SHAFT_VERT = /* glsl */`
precision highp float;
attribute vec4 aRoot;     // xyz top of the shaft, w length
attribute vec4 aParam;    // x width, y phase, z tilt, w brightness
varying vec2  vUv;
varying float vBright, vPhase;
uniform vec3  uDir;

void main(){
  vUv = uv; vBright = aParam.w; vPhase = aParam.y;
  vec3 axis = normalize(uDir + vec3(aParam.z, 0.0, aParam.z * 0.6));
  vec3 top   = aRoot.xyz;
  vec3 p     = top + axis * (uv.y * aRoot.w);
  /* billboard the slab around its own axis so it always presents its face */
  vec3 toEye = normalize(cameraPosition - p);
  vec3 wide  = normalize(cross(axis, toEye));
  /* the cone widens as it falls */
  p += wide * (position.x * aParam.x * (0.45 + uv.y * 1.25));
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`;

const SHAFT_FRAG = /* glsl */`
precision highp float;
varying vec2  vUv;
varying float vBright, vPhase;
uniform vec3  uColor;
uniform float uTime;

void main(){
  /* soft across the width, fading in at the canopy and out before the floor */
  float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
  across = pow(smoothstep(0.0, 1.0, across), 1.8);
  float along  = smoothstep(0.0, 0.14, vUv.y) * (1.0 - smoothstep(0.52, 1.0, vUv.y));
  /* leaves moving overhead make the beam breathe */
  float flick = 0.68 + 0.32 * sin(uTime * 0.5 + vPhase) * sin(uTime * 0.23 + vPhase * 2.1);
  gl_FragColor = vec4(uColor * vBright * across * along * flick, 1.0);
}`;

export function makeShafts({
  count = 7,
  from = [-3, 7.5, -5], spread = [17, 2.5, 15],
  dir = [0.30, -1.0, 0.42],
  length = [11, 17], width = [0.75, 2.1], bright = [0.16, 0.34],
  color = [0.78, 0.86, 0.62],
} = {}){
  const quad = new THREE.PlaneGeometry(1, 1, 1, 1);
  quad.translate(0, 0.5, 0);                       // pivot at the top edge
  const g = new THREE.InstancedBufferGeometry();
  g.index = quad.index;
  g.setAttribute('position', quad.attributes.position);
  g.setAttribute('uv',       quad.attributes.uv);

  const root = new Float32Array(count*4), par = new Float32Array(count*4);
  const R = (a,b) => a + Math.random()*(b-a);
  for (let i = 0; i < count; i++){
    root[i*4]   = from[0] + (Math.random()-0.5)*spread[0];
    root[i*4+1] = from[1] + (Math.random()-0.5)*spread[1];
    root[i*4+2] = from[2] + (Math.random()-0.5)*spread[2];
    root[i*4+3] = R(...length);
    par[i*4]    = R(...width);
    par[i*4+1]  = Math.random()*6.283;
    par[i*4+2]  = R(-0.12, 0.12);
    par[i*4+3]  = R(...bright);
  }
  g.setAttribute('aRoot',  new THREE.InstancedBufferAttribute(root, 4));
  g.setAttribute('aParam', new THREE.InstancedBufferAttribute(par, 4));
  g.instanceCount = count;
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 90);

  const m = new THREE.ShaderMaterial({
    vertexShader: SHAFT_VERT, fragmentShader: SHAFT_FRAG,
    uniforms: { uTime:{value:0}, uColor:{value:new THREE.Vector3(...color)},
                uDir:{value:new THREE.Vector3(...dir).normalize()} },
    transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, depthTest: true, side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.frustumCulled = false; mesh.renderOrder = 6;
  return mesh;
}

/* -------------------------------------------------------------------- mist */
const MIST_VERT = /* glsl */`
precision highp float;
attribute vec4 aSlab;      // xyz centre, w size
attribute vec2 aPhase;
varying vec2  vUv;
varying float vPhase, vFade;
uniform float uTime;
void main(){
  vUv = uv; vPhase = aPhase.x;
  vec3 c = aSlab.xyz;
  c.x += sin(uTime * 0.035 + aPhase.x) * 3.2;     // the bank drifts
  c.z += cos(uTime * 0.028 + aPhase.y) * 2.4;
  vec3 p = c + vec3(position.x, 0.0, position.y) * aSlab.w;
  /* nearly edge-on to the camera it would vanish, so fade it out there */
  vFade = 1.0;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`;

const MIST_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv; varying float vPhase, vFade;
uniform float uTime, uOpacity;
uniform vec3  uColor;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n2(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(h(i), h(i+vec2(1,0)), u.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), u.x), u.y);
}
void main(){
  vec2 uv = vUv * 3.0;
  float t = uTime * 0.045 + vPhase;
  float f = n2(uv + vec2(t, t*0.6)) * 0.55
          + n2(uv*2.3 - vec2(t*1.4, t)) * 0.30
          + n2(uv*4.7 + vec2(t*0.7, -t*1.1)) * 0.15;
  /* round the slab off so it has no visible rectangular edge */
  float r = 1.0 - smoothstep(0.30, 0.5, length(vUv - 0.5));
  float a = smoothstep(0.28, 0.80, f) * r * uOpacity * vFade;
  gl_FragColor = vec4(uColor, a);
}`;

export function makeMist({
  count = 11, y = [-2.6, 0.3], area = 28, size = [10, 19],
  color = [0.52, 0.62, 0.55], opacity = 0.26,
} = {}){
  const quad = new THREE.PlaneGeometry(1, 1, 1, 1);
  const g = new THREE.InstancedBufferGeometry();
  g.index = quad.index;
  g.setAttribute('position', quad.attributes.position);
  g.setAttribute('uv',       quad.attributes.uv);
  const slab = new Float32Array(count*4), ph = new Float32Array(count*2);
  const R = (a,b) => a + Math.random()*(b-a);
  for (let i = 0; i < count; i++){
    slab[i*4]   = (Math.random()-0.5)*area;
    slab[i*4+1] = R(...y);
    slab[i*4+2] = (Math.random()-0.5)*area - 2.0;
    slab[i*4+3] = R(...size);
    ph[i*2] = Math.random()*6.283; ph[i*2+1] = Math.random()*6.283;
  }
  g.setAttribute('aSlab',  new THREE.InstancedBufferAttribute(slab, 4));
  g.setAttribute('aPhase', new THREE.InstancedBufferAttribute(ph, 2));
  g.instanceCount = count;
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 90);

  const m = new THREE.ShaderMaterial({
    vertexShader: MIST_VERT, fragmentShader: MIST_FRAG,
    uniforms: { uTime:{value:0}, uOpacity:{value:opacity},
                uColor:{value:new THREE.Vector3(...color)} },
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.frustumCulled = false; mesh.renderOrder = 5;
  return mesh;
}

/* ------------------------------------------------------------------- motes */
const MOTE_VERT = /* glsl */`
precision highp float;
attribute vec3 aHome; attribute vec4 aSeed;
varying float vPulse, vWarm;
uniform float uTime, uSize;
void main(){
  float t = uTime;
  vec3 p = aHome + vec3(
    sin(t * (0.10 + aSeed.x*0.14) + aSeed.y*6.283) * (1.6 + aSeed.z),
    sin(t * (0.07 + aSeed.y*0.10) + aSeed.z*6.283) * (0.9 + aSeed.x*0.7),
    cos(t * (0.09 + aSeed.z*0.12) + aSeed.x*6.283) * (1.8 + aSeed.y)
  );
  /* slow uneven pulse — a steady blink reads as an LED, not an insect */
  float b = sin(t*(0.7+aSeed.w) + aSeed.x*6.283) * sin(t*(0.31+aSeed.y*0.4) + aSeed.z*6.283);
  vPulse = smoothstep(-0.25, 0.95, b);
  vWarm  = aSeed.w;
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.5 + aSeed.z) * (300.0 / max(1.0, -mv.z)) * (0.45 + vPulse);
}`;

const MOTE_FRAG = /* glsl */`
precision highp float;
varying float vPulse, vWarm;
uniform vec3 uCool, uWarm;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float core = pow(1.0 - d*2.0, 2.6);
  vec3 c = mix(uCool, uWarm, vWarm);
  gl_FragColor = vec4(c * core * vPulse, 1.0);
}`;

export function makeMotes({
  count = 90, area = [22, 5.5, 22], yBase = -2.2, size = 0.055,
  cool = [0.55, 0.78, 0.62], warm = [1.0, 0.82, 0.38],
} = {}){
  const g = new THREE.BufferGeometry();
  const home = new Float32Array(count*3), seed = new Float32Array(count*4);
  for (let i = 0; i < count; i++){
    home[i*3]   = (Math.random()-0.5)*area[0];
    home[i*3+1] = yBase + Math.random()*area[1];
    home[i*3+2] = (Math.random()-0.5)*area[2] - 1.0;
    for (let k = 0; k < 4; k++) seed[i*4+k] = Math.random();
  }
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count*3), 3));
  g.setAttribute('aHome', new THREE.BufferAttribute(home, 3));
  g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 90);

  const m = new THREE.ShaderMaterial({
    vertexShader: MOTE_VERT, fragmentShader: MOTE_FRAG,
    uniforms: { uTime:{value:0}, uSize:{value:size},
                uCool:{value:new THREE.Vector3(...cool)},
                uWarm:{value:new THREE.Vector3(...warm)} },
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const pts = new THREE.Points(g, m);
  pts.frustumCulled = false; pts.renderOrder = 7;
  return pts;
}

/* --------------------------------------------------------------------- sky */
/* A flat scene.background reads as a dead black wall wherever the fog does not
   reach. This is an inverted dome carrying a horizon gradient plus slow fbm
   cloud, so the gaps between trunks show luminous overcast instead of a hole.
   Fog is deliberately OFF on it — a sky that fogs into its own fog colour is
   just the flat colour again. */
const SKY_VERT = /* glsl */`
precision highp float;
varying vec3 vDir;
void main(){
  vDir = normalize(position);
  /* translate-only: the dome follows the camera so it never gets "reached" */
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
}`;

const SKY_FRAG = /* glsl */`
precision highp float;
varying vec3 vDir;
uniform float uTime, uCloud, uCover;
uniform vec3  uHorizon, uZenith, uCloudCol;

float sh(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float sn(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(sh(i), sh(i+vec2(1,0)), u.x), mix(sh(i+vec2(0,1)), sh(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * sn(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
  /* bright band at the horizon is what makes a forest read as misty rather than
     merely dark — the trunks then silhouette against it */
  vec3 col = mix(uHorizon, uZenith, pow(h, 0.85));

  /* project onto a plane so cloud does not pinch at the zenith */
  vec2 uv = vDir.xz / max(0.18, abs(vDir.y) + 0.35);
  float t = uTime * 0.01;
  float c = fbm(uv * 1.5 + vec2(t, t * 0.6)) * 0.62
          + fbm(uv * 3.7 - vec2(t * 1.5, t)) * 0.38;
  c = smoothstep(0.42 - uCover, 0.92 - uCover, c);
  /* fade cloud out toward the horizon so it never sits below the treeline */
  c *= smoothstep(0.04, 0.42, h);

  col = mix(col, uCloudCol, c * uCloud);
  gl_FragColor = vec4(col, 1.0);
}`;

export function makeSky({
  radius = 260,
  horizon = [0.52, 0.60, 0.53],
  zenith  = [0.115, 0.170, 0.150],
  cloud   = [0.68, 0.74, 0.68],
  amount = 0.75, cover = 0.14,
} = {}){
  const g = new THREE.SphereGeometry(radius, 32, 20);
  const m = new THREE.ShaderMaterial({
    vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      uTime:{value:0}, uCloud:{value:amount}, uCover:{value:cover},
      uHorizon:{value:new THREE.Vector3(...horizon)},
      uZenith:{value:new THREE.Vector3(...zenith)},
      uCloudCol:{value:new THREE.Vector3(...cloud)},
    },
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;          // behind everything
  return mesh;
}

```

## `butterflies.js`

```js
/* Butterflies — instanced, entirely shader-driven.
   Each one carries its own wandering flight path, wing-beat phase and colour, so
   the CPU does nothing per frame and the whole swarm is a single draw call.
   Wings are real outlines (fore + hind, both sides) hinged on the body axis, and
   the body is a crossed pair of quads so it reads from any angle. */
import * as THREE from 'three';

/* right-side wing outlines, (lateral, fore-aft), body axis at x = 0 */
const FOREWING = [
  [0.02, 0.10], [0.22, 0.34], [0.52, 0.44], [0.82, 0.32],
  [0.98, 0.06], [0.80,-0.14], [0.45,-0.20], [0.15,-0.10],
];
const HINDWING = [
  [0.02,-0.10], [0.24,-0.26], [0.50,-0.46], [0.56,-0.70],
  [0.38,-0.84], [0.16,-0.66], [0.05,-0.34],
];

function butterflyGeometry(){
  const pos = [], span = [], part = [], idx = [];
  const push = (x, y, z, s, p) => { pos.push(x, y, z); span.push(s); part.push(p); return pos.length/3 - 1; };

  /* fan-triangulate an outline from its first point, mirrored for the left wing */
  const wing = (outline, mirror, partId) => {
    const sgn = mirror ? -1 : 1;
    const maxX = Math.max(...outline.map(p => Math.abs(p[0])));
    const ring = outline.map(([x, y]) => push(x*sgn, y, 0, Math.abs(x)/maxX, partId));
    for (let i = 1; i < ring.length-1; i++){
      if (mirror) idx.push(ring[0], ring[i+1], ring[i]);   // keep winding consistent
      else        idx.push(ring[0], ring[i],   ring[i+1]);
    }
  };
  wing(FOREWING, false, 0); wing(FOREWING, true, 0);
  wing(HINDWING, false, 0); wing(HINDWING, true, 0);

  /* body: two crossed quads so it never disappears edge-on */
  const B = 0.055, L0 = 0.42, L1 = -0.52;
  for (const [ax, az] of [[1,0], [0,1]]){
    const a = push(-B*ax, L0, -B*az, 0, 1);
    const b = push( B*ax, L0,  B*az, 0, 1);
    const c = push( B*ax*0.4, L1,  B*az*0.4, 0, 1);
    const d = push(-B*ax*0.4, L1, -B*az*0.4, 0, 1);
    idx.push(a,b,c, a,c,d);
  }

  const g = new THREE.InstancedBufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aSpan',    new THREE.Float32BufferAttribute(span, 1));
  g.setAttribute('aPart',    new THREE.Float32BufferAttribute(part, 1));
  g.setIndex(idx);
  return g;
}

const VERT = /* glsl */`
precision highp float;
attribute float aSpan, aPart;
attribute vec4  aSeed;      // path frequencies + phases
attribute vec4  aOrigin;    // xyz centre, w scale
attribute vec3  aColor;
uniform float uTime, uSpeed, uBeat;
varying vec3  vCol, vWorld;
varying float vSpan, vPart, vFlap, vFore;

void main(){
  vCol = aColor; vSpan = aSpan; vPart = aPart; vFore = position.y;

  float t  = uTime;
  vec3  C  = aOrigin.xyz;
  float sc = aOrigin.w;

  /* a lazy 3D wander — three out-of-phase sinusoids, so it never repeats visibly */
  vec3 R = vec3(2.6, 0.85, 2.2) * (0.6 + aSeed.w);
  vec3 f = vec3(0.34, 0.51, 0.29) * (0.7 + aSeed.w * 0.8) * uSpeed;
  vec3 ph = vec3(aSeed.x, aSeed.y, aSeed.z) * 6.2831853;

  vec3 p = C + vec3(sin(t*f.x + ph.x) * R.x,
                    sin(t*f.y + ph.y) * R.y,
                    cos(t*f.z + ph.z) * R.z);
  /* analytic velocity, so heading is exact instead of a frame-delta guess */
  vec3 v = vec3( cos(t*f.x + ph.x) * f.x * R.x,
                 cos(t*f.y + ph.y) * f.y * R.y,
                -sin(t*f.z + ph.z) * f.z * R.z);

  vec3 fwd = normalize(v + vec3(0.0001));
  vec3 rgt = normalize(cross(fwd, vec3(0.0,1.0,0.0)) + vec3(0.0,0.0,0.0001));
  vec3 upv = cross(rgt, fwd);
  /* bank into the turn, the way a real one does */
  float bank = clamp(dot(rgt, vec3(0.0,1.0,0.0)) + v.x * 0.25, -0.8, 0.8);
  rgt = normalize(rgt + upv * bank * 0.35);
  upv = cross(rgt, fwd);

  /* wing beat: fast, asymmetric — the down-stroke is quicker than the recovery */
  float beat = t * (11.0 + aSeed.x * 7.0) * uBeat + aSeed.y * 6.2831853;
  float s    = sin(beat);
  float flap = (s > 0.0 ? pow(s, 0.6) : -pow(-s, 1.5)) * 1.15;
  vFlap = flap;

  vec3 lp = position;
  if (aPart < 0.5){                       // wings hinge about the body axis
    float c = cos(flap), sn = sin(flap);
    lp = vec3(position.x * c, position.y, -abs(position.x) * sn);
  }
  lp *= sc;

  vec3 world = p + rgt * lp.x + fwd * lp.y + upv * lp.z;
  vWorld = world;
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
}`;

const FRAG = /* glsl */`
precision highp float;
uniform vec3  uFogColor, uLightDir;
uniform float uFogNear, uFogFar;
varying vec3  vCol, vWorld;
varying float vSpan, vPart, vFlap, vFore;

void main(){
  vec3 col;
  if (vPart > 0.5){
    col = vec3(0.045, 0.035, 0.030);                 // body: near black
  } else {
    /* darker at the root, bright toward the tip, with a pale outer margin */
    /* Real butterfly wings are PATTERNED, not a gradient: a dark body-side base,
       a saturated field, a black outer margin, and a row of pale spots inside
       that margin. That margin-and-spots read is what makes them look like
       insects rather than coloured paper at this size. */
    col = mix(vCol * 0.22, vCol * 1.15, smoothstep(0.05, 0.42, vSpan));
    float margin = smoothstep(0.74, 0.84, vSpan);
    col = mix(col, vec3(0.018, 0.014, 0.012), margin);
    float spotRow = smoothstep(0.80, 0.86, vSpan) * (1.0 - smoothstep(0.90, 0.96, vSpan));
    float spot = spotRow * smoothstep(0.30, 0.0, abs(fract(vFore * 7.0) - 0.5));
    col = mix(col, vec3(0.95, 0.93, 0.86), spot);
    /* a thin dark vein line through the field */
    col *= 1.0 - 0.45 * smoothstep(0.035, 0.0, abs(fract(vSpan * 3.0 + vFore * 1.3) - 0.5));
    /* the wing catches light as it turns through the stroke — this flicker is
       most of what makes it read as alive rather than as a moving sprite */
    col *= 0.68 + 0.62 * abs(cos(vFlap));
  }
  float d = length(cameraPosition - vWorld);
  col = mix(col, uFogColor, smoothstep(uFogNear, uFogFar, d));
  gl_FragColor = vec4(col, 1.0);
}`;

export function makeButterflies(opts = {}){
  const {
    count = 26,
    bounds = { x:[-9, 9], y:[-2.1, 1.6], z:[-6, 7] },
    size = [0.16, 0.30],
    speed = 1.0, beat = 1.0,
    fogColor = [0.039,0.078,0.063], fogNear = 6.0, fogFar = 48.0,
    palette = [
      [0.30, 0.55, 0.98],   // morpho blue
      [0.30, 0.55, 0.98],
      [0.94, 0.90, 0.74],   // cream
      [0.94, 0.90, 0.74],
      [0.97, 0.58, 0.17],   // amber
      [0.68, 0.88, 0.55],   // pale green
    ],
  } = opts;

  const g = butterflyGeometry();
  const seed = new Float32Array(count*4);
  const org  = new Float32Array(count*4);
  const col  = new Float32Array(count*3);
  const lerp = (a, b) => a + Math.random()*(b-a);

  for (let i = 0; i < count; i++){
    seed[i*4]   = Math.random(); seed[i*4+1] = Math.random();
    seed[i*4+2] = Math.random(); seed[i*4+3] = Math.random();
    org[i*4]   = lerp(...bounds.x);
    org[i*4+1] = lerp(...bounds.y);
    org[i*4+2] = lerp(...bounds.z);
    org[i*4+3] = lerp(...size);
    const c = palette[(Math.random()*palette.length) | 0];
    col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
  }
  g.setAttribute('aSeed',   new THREE.InstancedBufferAttribute(seed, 4));
  g.setAttribute('aOrigin', new THREE.InstancedBufferAttribute(org, 4));
  g.setAttribute('aColor',  new THREE.InstancedBufferAttribute(col, 3));
  g.instanceCount = count;
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 60);

  const m = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide,
    uniforms: {
      uTime:{value:0},
      uSpeed:{value:speed}, uBeat:{value:beat},
      uFogColor:{value:new THREE.Vector3(...fogColor)},
      uFogNear:{value:fogNear}, uFogFar:{value:fogFar},
      uLightDir:{value:new THREE.Vector3(0.45,0.8,-0.4).normalize()},
    },
  });

  const mesh = new THREE.Mesh(g, m);
  mesh.frustumCulled = false;
  mesh.renderOrder = 3;
  return mesh;
}

```

## `fur.js`

```js
/* Instanced moss "fur" — the thing that separates a tinted tube from a mossy branch.
   Technique matches the ThreeUI reference: thousands of tiny tapered strands scattered
   over the host mesh's surface, each carrying its own surface normal and randoms, all
   in one draw call. Strand ribbons billboard around their own axis so none of them
   ever disappear edge-on. */
import * as THREE from 'three';

/* ---- base strand: a tapered ribbon, `segs` quads long ---- */
function strandGeometry(segs = 5){
  const pos = [], uv = [], idx = [];
  for (let i = 0; i <= segs; i++){
    const t = i / segs;
    pos.push(-0.5, t, 0,  0.5, t, 0);
    uv.push(0, t,  1, t);
  }
  for (let i = 0; i < segs; i++){
    const a = i*2, b = a+1, c = a+2, d = a+3;
    idx.push(a, c, b,  b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv',       new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/* small value noise, used to clump the scatter — a real floor is patchy, and a
   perfectly even scatter is exactly what reads as procedural static */
function jh(x,y,z){ const h = Math.sin(x*127.1 + y*311.7 + z*74.7) * 43758.5453; return h - Math.floor(h); }
function jnoise(x,y,z){
  const xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
  const xf=x-xi, yf=y-yi, zf=z-zi;
  const u=xf*xf*(3-2*xf), v=yf*yf*(3-2*yf), w=zf*zf*(3-2*zf);
  const L=(a,b,t)=>a+(b-a)*t;
  return L(L(L(jh(xi,yi,zi),jh(xi+1,yi,zi),u), L(jh(xi,yi+1,zi),jh(xi+1,yi+1,zi),u), v),
           L(L(jh(xi,yi,zi+1),jh(xi+1,yi,zi+1),u), L(jh(xi,yi+1,zi+1),jh(xi+1,yi+1,zi+1),u), v), w);
}

/* ---- area-weighted surface sampling, biased toward upward faces ---- */
function sampleSurface(mesh, count, upBias, focus, clump){
  mesh.updateWorldMatrix(true, false);
  const mw  = mesh.matrixWorld;
  const nm  = new THREE.Matrix3().getNormalMatrix(mw);
  const g   = mesh.geometry;
  const pA  = g.attributes.position, nA = g.attributes.normal;
  const index = g.index;
  const triCount = index ? index.count/3 : pA.count/3;

  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const na= new THREE.Vector3(), nb= new THREE.Vector3(), nc= new THREE.Vector3();
  const tri = i => index ? [index.getX(i*3), index.getX(i*3+1), index.getX(i*3+2)]
                         : [i*3, i*3+1, i*3+2];

  /* cumulative area, weighted so upward-facing triangles get most of the moss */
  const cdf = new Float32Array(triCount);
  let total = 0;
  for (let i = 0; i < triCount; i++){
    const [i0,i1,i2] = tri(i);
    a.fromBufferAttribute(pA,i0).applyMatrix4(mw);
    b.fromBufferAttribute(pA,i1).applyMatrix4(mw);
    c.fromBufferAttribute(pA,i2).applyMatrix4(mw);
    const area = b.clone().sub(a).cross(c.clone().sub(a)).length() * 0.5;
    na.fromBufferAttribute(nA,i0).applyMatrix3(nm).normalize();
    const up = THREE.MathUtils.clamp((na.y + 1) * 0.5, 0, 1);
    let w = area * (1 - upBias + upBias * Math.pow(up, 1.7));
    if (focus){
      /* fall off with distance and drop everything past the radius, so a huge
         plane spends its whole strand budget in front of the lens */
      const d = a.distanceTo(focus.point);
      w *= d > focus.radius ? 0 : Math.pow(1 - d / focus.radius, focus.falloff ?? 1.6);
    }
    total += w;
    cdf[i] = total;
  }

  const off = new Float32Array(count*3);
  const nrm = new Float32Array(count*3);
  const rnd = new Float32Array(count*4);
  const P = new THREE.Vector3(), N = new THREE.Vector3();

  for (let s = 0; s < count; s++){
    /* binary search the cdf */
    const r = Math.random() * total;
    let lo = 0, hi = triCount-1;
    while (lo < hi){ const mid = (lo+hi)>>1; if (cdf[mid] < r) lo = mid+1; else hi = mid; }
    const [i0,i1,i2] = tri(lo);

    a.fromBufferAttribute(pA,i0).applyMatrix4(mw);
    b.fromBufferAttribute(pA,i1).applyMatrix4(mw);
    c.fromBufferAttribute(pA,i2).applyMatrix4(mw);
    na.fromBufferAttribute(nA,i0).applyMatrix3(nm);
    nb.fromBufferAttribute(nA,i1).applyMatrix3(nm);
    nc.fromBufferAttribute(nA,i2).applyMatrix3(nm);

    /* uniform point in triangle */
    let u = Math.random(), v = Math.random();
    if (u+v > 1){ u = 1-u; v = 1-v; }
    const w = 1-u-v;
    P.set(a.x*w + b.x*u + c.x*v, a.y*w + b.y*u + c.y*v, a.z*w + b.z*u + c.z*v);
    N.set(na.x*w + nb.x*u + nc.x*v, na.y*w + nb.y*u + nc.y*v, na.z*w + nb.z*u + nc.z*v).normalize();

    off[s*3] = P.x; off[s*3+1] = P.y; off[s*3+2] = P.z;
    nrm[s*3] = N.x; nrm[s*3+1] = N.y; nrm[s*3+2] = N.z;
    /* Clumping by length alone still covered every square inch, and uniform
       coverage is exactly what reads as static. Real ground is patchy, so reject
       samples that land in a bare patch and try somewhere else. */
    let cl = 1.0;
    if (clump){
      const f = clump.freq, bald = clump.bald ?? 0;
      for (let attempt = 0; attempt < 7; attempt++){
        cl = jnoise(P.x*f, P.y*f, P.z*f) * 0.7 + jnoise(P.x*f*2.7, P.y*f*2.7, P.z*f*2.7) * 0.3;
        cl = Math.max(0, Math.min(1, (cl - 0.5) * clump.contrast + 0.5));
        if (cl >= bald || attempt === 6) break;
        /* re-roll a point on the same triangle rather than rejecting outright */
        let u2 = Math.random(), v2 = Math.random();
        if (u2+v2 > 1){ u2 = 1-u2; v2 = 1-v2; }
        const w2 = 1-u2-v2;
        P.set(a.x*w2 + b.x*u2 + c.x*v2, a.y*w2 + b.y*u2 + c.y*v2, a.z*w2 + b.z*u2 + c.z*v2);
      }
      off[s*3] = P.x; off[s*3+1] = P.y; off[s*3+2] = P.z;
    }
    rnd[s*4]   = Math.random();                                   // spin around the normal
    rnd[s*4+1] = Math.random() * (clump ? 0.30 + 1.30 * cl : 1);  // length, clumped
    rnd[s*4+2] = Math.random();                                   // sway phase
    rnd[s*4+3] = clump ? cl * 0.75 + Math.random() * 0.25 : Math.random();  // colour follows the clump
  }
  return { off, nrm, rnd, area: total };
}

/* real triangle area, so a long thin branch is not out-budgeted by a fat rock */
function surfaceArea(mesh){
  mesh.updateWorldMatrix(true, false);
  const mw = mesh.matrixWorld, g = mesh.geometry;
  const pA = g.attributes.position, index = g.index;
  const n = index ? index.count/3 : pA.count/3;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  let total = 0;
  for (let i = 0; i < n; i++){
    const i0 = index ? index.getX(i*3)   : i*3;
    const i1 = index ? index.getX(i*3+1) : i*3+1;
    const i2 = index ? index.getX(i*3+2) : i*3+2;
    a.fromBufferAttribute(pA,i0).applyMatrix4(mw);
    b.fromBufferAttribute(pA,i1).applyMatrix4(mw);
    c.fromBufferAttribute(pA,i2).applyMatrix4(mw);
    total += b.clone().sub(a).cross(c.clone().sub(a)).length() * 0.5;
  }
  return total;
}

const VERT = /* glsl */`
precision highp float;
attribute vec3 offset;
attribute vec3 nrm;
attribute vec4 rnd;
uniform float uTime, uLen, uWidth, uDroop, uSway, uCurl, uLay;
varying vec2  vUv;
varying float vRnd, vUp;
varying vec3  vWorld, vNrm;

void main(){
  vUv = uv; vRnd = rnd.w;
  float t = uv.y;

  vec3 N = normalize(nrm);
  /* spin the strand around its own normal so neighbours don't align */
  vec3 ref = abs(N.y) > 0.92 ? vec3(1.0,0.0,0.0) : vec3(0.0,1.0,0.0);
  vec3 T = normalize(cross(ref, N));
  vec3 B = cross(N, T);
  float ang = rnd.x * 6.2831853;
  vec3 dir = normalize(T * cos(ang) + B * sin(ang));

  float len = uLen * (0.45 + rnd.y);
  /* Growing strictly along the surface normal means that on an up-facing surface
     the strands stand straight up — and a thin vertical plate seen from above
     projects to nothing, so the substrate shows through however dense it is.
     Tilting them toward the surface tangent lays the moss ON the surface, which
     is both what real moss does and what the camera can actually see. Drooping
     instead just hangs them off the silhouette edge. */
  vec3 growth = normalize(mix(N, dir, uLay));
  vec3 p = offset + growth * (t * len);

  /* gravity droop, strongest at the tip */
  p.y -= uDroop * len * t * t * (0.4 + rnd.y);
  /* and a sideways arc, so a blade is a curve rather than a spike */
  p += dir * (uCurl * len * t * t * (rnd.x - 0.5) * 2.0);
  /* breeze */
  float phase = rnd.z * 6.2831853;
  p += dir * (sin(uTime * 0.9 + phase) * uSway * len * t * t);

  /* Orientation. Full camera-billboarding was right for thin blades — it stopped
     them vanishing edge-on — but with wide leaflets it makes every one face the
     same way, and they merge into a smooth sheet. Mostly keep each leaf's own
     radial orientation and blend only slightly toward the viewer. */
  vec3 axis = normalize(growth + vec3(0.0, -uDroop * t, 0.0));
  vec3 toEye = normalize(cameraPosition - p);
  vec3 camFace = normalize(cross(axis, toEye));
  vec3 own     = normalize(dir - axis * dot(dir, axis));
  /* 0.28 was too far the other way: half the leaflets sat edge-on and
     disappeared, so coverage collapsed. 0.55 keeps them readable while
     still breaking the uniform camera-facing sheet. */
  vec3 wide    = normalize(mix(own, camFace, 0.55));
  /* leaf silhouette: pinched at the stem, widest around 40% along, pointed tip.
     The old profile was a straight taper, which reads as bristle no matter how
     many you draw. */
  float lw = sin(3.14159265 * pow(t, 0.62));
  lw = pow(lw, 0.75) * 0.94 + 0.06;
  p += wide * (position.x * uWidth * lw * (0.6 + rnd.y * 0.8));

  vUp = N.y;
  vNrm = N;
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`;

const FRAG = /* glsl */`
precision highp float;
uniform vec3  uRoot, uTip, uRim, uFogColor, uLightDir;
uniform float uFogNear, uFogFar, uRimPower;
varying vec2  vUv;
varying float vRnd, vUp;
varying vec3  vWorld, vNrm;

void main(){
  float t = vUv.y;
  /* root is dark and damp, tip catches the light — the Blender ColorRamp, kept */
  vec3 col = mix(uRoot, uTip, t * t * (0.55 + vRnd * 0.95));
  /* each leaflet its own value, or a dense mat averages into flat paint */
  col *= 0.62 + vRnd * 0.78;
  /* ambient occlusion down in the pile */
  col *= mix(0.66, 1.0, t);
  /* directional light on the surface normal — this is what gives the branch a lit
     top and a dark underside instead of one flat wash of green */
  vec3 L = normalize(uLightDir);
  float ndl = max(dot(normalize(vNrm), L), 0.0);
  /* wrapped diffuse: moss scatters, so it never goes fully black on the shadow side */
  float wrap = ndl * 0.72 + 0.28;
  /* 1.85 pushed the lit green past 1.0, and at exposure 1.85 that clipped to
     neon wherever the light caught the moss side-on */
  col *= mix(0.52, 1.42, wrap);
  /* sky light still favours what points up */
  col *= mix(0.82, 1.06, clamp(vUp * 0.5 + 0.5, 0.0, 1.0));
  /* rim: the fuzzy backlit halo that sells moss as moss */
  vec3 V = normalize(cameraPosition - vWorld);
  float rim = pow(1.0 - abs(dot(V, L)), uRimPower);
  col += uRim * rim * t * (0.35 + 0.9 * ndl);

  float d = length(cameraPosition - vWorld);
  float fog = smoothstep(uFogNear, uFogFar, d);
  col = mix(col, uFogColor, fog);

  gl_FragColor = vec4(col, 1.0);
}`;

export function makeFur(hostMeshes, opts = {}){
  const {
    density = 2600, maxCount = 130000, segs = 5,
    length = 0.10, width = 0.0105, droop = 0.5, sway = 0.10, curl = 0.45, lay = 0.0,
    upBias = 0.78, focus = null, clump = null,
    root = [0.014,0.045,0.010], tip = [0.30,0.52,0.13], rim = [0.30,0.42,0.16],
    fogColor = [0.035,0.043,0.033], fogNear = 9.0, fogFar = 30.0,
    lightDir = [0.45, 0.8, -0.4], rimPower = 2.2,
  } = opts;

  /* strands per square unit, so coverage is even whatever the host's shape */
  const areas = hostMeshes.map(surfaceArea);
  const areaSum = areas.reduce((a,b)=>a+b, 0);
  const scale = Math.min(1, maxCount / Math.max(1, density * areaSum));

  const offAll = [], nrmAll = [], rndAll = [];
  hostMeshes.forEach((m, i) => {
    const n = Math.max(600, Math.round(density * areas[i] * scale));
    const s = sampleSurface(m, n, upBias, focus, clump);
    offAll.push(s.off); nrmAll.push(s.nrm); rndAll.push(s.rnd);
  });
  const cat = (arrs, stride) => {
    const total = arrs.reduce((a,x)=>a+x.length, 0);
    const out = new Float32Array(total); let o = 0;
    arrs.forEach(x => { out.set(x, o); o += x.length; });
    return new THREE.InstancedBufferAttribute(out, stride);
  };

  const geo = new THREE.InstancedBufferGeometry();
  const base = strandGeometry(segs);
  geo.index = base.index;
  geo.setAttribute('position', base.attributes.position);
  geo.setAttribute('uv',       base.attributes.uv);
  geo.setAttribute('offset', cat(offAll, 3));
  geo.setAttribute('nrm',    cat(nrmAll, 3));
  geo.setAttribute('rnd',    cat(rndAll, 4));
  geo.instanceCount = geo.attributes.offset.count;
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 60);

  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide,
    uniforms: {
      uTime:{value:0}, uLen:{value:length}, uWidth:{value:width},
      uDroop:{value:droop}, uSway:{value:sway}, uCurl:{value:curl}, uLay:{value:lay},
      uRoot:{value:new THREE.Vector3(...root)},
      uTip:{value:new THREE.Vector3(...tip)},
      uRim:{value:new THREE.Vector3(...rim)},
      uFogColor:{value:new THREE.Vector3(...fogColor)},
      uFogNear:{value:fogNear}, uFogFar:{value:fogFar},
      uLightDir:{value:new THREE.Vector3(...lightDir).normalize()},
      uRimPower:{value:rimPower},
    },
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;
  return mesh;
}

```

## `post.js`

```js
/* Post-processing — the pass that makes a real-time render look photographed
   rather than screenshotted.

   Three stages after the scene render:
     1. bloom, keyed high so only the light shafts and the brightest moss bloom
     2. a grade: contrast, saturation, shadow lift, and aerial-perspective haze
        recovered from depth
     3. vignette

   Kept as a small custom ShaderPass rather than a stack of library passes —
   every one of these is a couple of lines, and one pass is one fullscreen read
   instead of four. */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }     from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass }from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }     from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass }     from 'three/addons/postprocessing/OutputPass.js';

const GradeShader = {
  uniforms: {
    tDiffuse:    { value: null },
    uContrast:   { value: 1.0 },
    uSaturation: { value: 1.0 },
    uLift:       { value: 0.0 },
    uVignette:   { value: 0.0 },
    uWarm:       { value: 0.0 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uContrast, uSaturation, uLift, uVignette, uWarm;
    varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);

      /* shadow lift first, so the contrast curve does not crush what it lifts */
      c.rgb += uLift * (1.0 - smoothstep(0.0, 0.35, c.rgb));

      /* contrast about mid-grey — this is what recovers the "clarity" that a
         hazy, evenly-lit render loses */
      c.rgb = (c.rgb - 0.5) * uContrast + 0.5;

      float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
      c.rgb = mix(vec3(l), c.rgb, uSaturation);

      /* split tone: warm the highlights, cool the shadows, the way a forest
         reads under a canopy gap */
      c.rgb += uWarm * vec3(0.045, 0.020, -0.030) * smoothstep(0.35, 1.0, l);
      c.rgb -= uWarm * vec3(0.020, 0.005, -0.025) * (1.0 - smoothstep(0.0, 0.45, l));

      float d = distance(vUv, vec2(0.5));
      c.rgb *= mix(1.0, smoothstep(1.05, 0.30, d), uVignette);

      gl_FragColor = vec4(max(c.rgb, 0.0), c.a);
    }`,
};

export function makePost(renderer, scene, camera, opts = {}){
  const {
    bloomStrength = 0.42, bloomRadius = 0.55, bloomThreshold = 0.82,
    contrast = 1.16, saturation = 1.14, lift = 0.012, vignette = 0.55, warm = 0.8,
  } = opts;

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(innerWidth, innerHeight), bloomStrength, bloomRadius, bloomThreshold);
  composer.addPass(bloom);

  const grade = new ShaderPass(GradeShader);
  grade.uniforms.uContrast.value   = contrast;
  grade.uniforms.uSaturation.value = saturation;
  grade.uniforms.uLift.value       = lift;
  grade.uniforms.uVignette.value   = vignette;
  grade.uniforms.uWarm.value       = warm;
  composer.addPass(grade);

  /* OutputPass does the tone mapping + colour-space conversion that the renderer
     would normally do on its own; without it a composed scene comes out flat */
  composer.addPass(new OutputPass());

  /* bloom is fill-rate bound and its blur hides the difference, so cap the
     composer lower than the renderer's own ratio */
  composer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  composer.setSize(innerWidth, innerHeight);

  return { composer, bloom, grade };
}

```

## `realism.js`

```js
/* Realism pass — what separates a viewport render from a photograph.

   The jungle exports with one flat baseColorFactor per material, so a whole
   canopy is literally the same RGB triple everywhere. Real foliage never is:
   it varies leaf to leaf and patch to patch, and it GLOWS where light passes
   through it. Both are added here in-shader, so no textures ship.

   Patches the existing MeshStandardMaterial via onBeforeCompile, keeping all of
   three's PBR lighting intact. */
import * as THREE from 'three';

const NOISE = /* glsl */`
float rh_(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float rn_(vec3 p){
  vec3 i = floor(p), f = fract(p);
  vec3 u = f*f*(3.0-2.0*f);
  return mix(mix(mix(rh_(i),               rh_(i+vec3(1,0,0)), u.x),
                 mix(rh_(i+vec3(0,1,0)),   rh_(i+vec3(1,1,0)), u.x), u.y),
             mix(mix(rh_(i+vec3(0,0,1)),   rh_(i+vec3(1,0,1)), u.x),
                 mix(rh_(i+vec3(0,1,1)),   rh_(i+vec3(1,1,1)), u.x), u.y), u.z);
}
`;

/**
 * @param {THREE.MeshStandardMaterial} material
 * @param {object} o
 *   lowFreq / highFreq  world-space frequencies of the two variation bands
 *   strength            how far the tint swings (0.25 = +/-25%)
 *   warm                how much the lit patches shift toward yellow-green
 *   translucency        back-light bleed; 0 for bark and stone, high for leaves
 *   sun                 world-space direction TOWARD the sun
 *   grain               fine per-fragment break-up, for bark and ground
 */
export function addSurfaceDetail(material, {
  lowFreq = 0.22, highFreq = 2.4, strength = 0.30, warm = 0.35,
  translucency = 0.0, sun = [0.45, 0.80, -0.40], grain = 0.0,
  contact = 0.0, contactY = -2.85, contactSpan = 1.1,
} = {}){
  /* A material is shared across every mesh that uses it — J_Bark is on 15 —
     so without this guard the traverse patches the same material once per mesh
     and every varying, uniform and helper gets re-declared N times. */
  if (material.userData.__detailed) return material;
  material.userData.__detailed = true;

  /* wind.js may already have patched this material; chain rather than clobber */
  const prev = material.onBeforeCompile;
  const prevKey = material.customProgramCacheKey;
  material.onBeforeCompile = (shader, renderer) => {
    if (typeof prev === 'function') prev(shader, renderer);

    shader.uniforms.uDetail = { value: new THREE.Vector4(lowFreq, highFreq, strength, warm) };
    shader.uniforms.uTrans  = { value: translucency };
    shader.uniforms.uGrain  = { value: grain };
    shader.uniforms.uContact= { value: new THREE.Vector3(contact, contactY, contactSpan) };
    shader.uniforms.uSunW   = { value: new THREE.Vector3(...sun).normalize() };

    shader.vertexShader = shader.vertexShader
      .replace('void main() {', 'varying vec3 vWPos_; varying vec3 vWNrm_;\nvoid main() {')
      .replace('#include <begin_vertex>',
        `#include <begin_vertex>
         vWPos_ = (modelMatrix * vec4(transformed, 1.0)).xyz;
         vWNrm_ = normalize(mat3(modelMatrix) * objectNormal);`);

    shader.fragmentShader = shader.fragmentShader
      .replace('void main() {',
        `varying vec3 vWPos_; varying vec3 vWNrm_;
         uniform vec4 uDetail; uniform float uTrans, uGrain; uniform vec3 uSunW, uContact;
         ${NOISE}
         void main() {`)
      /* diffuseColor exists by this point — break the flat fill before it lights */
      .replace('#include <color_fragment>',
        `#include <color_fragment>
         {
           float nLow  = rn_(vWPos_ * uDetail.x);
           float nHigh = rn_(vWPos_ * uDetail.y);
           /* two bands: broad patches of light and shade, then leaf-scale scatter */
           float v = (nLow - 0.5) * 1.35 + (nHigh - 0.5) * 0.85;
           float tint = 1.0 + v * uDetail.z;
           diffuseColor.rgb *= tint;
           /* the brighter patches are also the yellower ones — new growth and
              sun-bleached leaves. A pure value change alone still reads plastic. */
           float warmAmt = smoothstep(0.0, 0.55, v) * uDetail.w;
           diffuseColor.rgb = mix(diffuseColor.rgb,
                                  diffuseColor.rgb * vec3(1.45, 1.16, 0.52), warmAmt);
           /* and the darkest patches go cooler and damper */
           diffuseColor.rgb = mix(diffuseColor.rgb,
                                  diffuseColor.rgb * vec3(0.72, 0.92, 0.88),
                                  smoothstep(0.0, -0.5, v) * 0.6);
           /* Everything sat equally lit whatever its height, so nothing looked
              like it was RESTING on the floor. Real contact points are occluded;
              this darkens the bottom of every object as a stand-in for AO. */
           if (uContact.x > 0.0){
             float ao = smoothstep(uContact.y, uContact.y + uContact.z, vWPos_.y);
             diffuseColor.rgb *= mix(1.0 - uContact.x, 1.0, ao);
           }
           if (uGrain > 0.0){
             float g = rn_(vWPos_ * 26.0) * 0.6 + rn_(vWPos_ * 74.0) * 0.4;
             diffuseColor.rgb *= 1.0 + (g - 0.5) * uGrain;
           }
         }`)
      /* translucency: a leaf lit from behind carries light through it. This is the
         single most recognisable thing about jungle photography and no amount of
         front lighting fakes it. */
      .replace('#include <lights_fragment_end>',
        `#include <lights_fragment_end>
         if (uTrans > 0.0){
           /* Use the side of the leaf that FACES THE VIEWER. The stored normal points
              whichever way the blade was built, so for about half the leaves the
              "light coming through" was being measured from the wrong face and came
              out as zero — those leaves, seen from below, rendered flat black. */
           vec3 toCam = normalize(cameraPosition - vWPos_);
           vec3 Nv = normalize(vWNrm_);
           if (dot(Nv, toCam) < 0.0) Nv = -Nv;
           /* light arriving from BEHIND the leaf: the sun, and under overcast the
              whole sky dome — so a leaf seen from below glows even with the sun
              off to one side */
           float sunBack = pow(clamp(dot(-Nv, uSunW) * 0.5 + 0.5, 0.0, 1.0), 2.2);
           float skyBack = clamp(-Nv.y, 0.0, 1.0);
           float back = max(sunBack, skyBack * 0.85);
           float thin = 1.0 - abs(dot(Nv, toCam));
           reflectedLight.indirectDiffuse +=
             diffuseColor.rgb * vec3(1.15, 1.45, 0.62) * uTrans * back * (0.55 + 0.45 * thin);
         }`);

    material.userData.detailShader = shader;
  };
  /* three keys the program cache on onBeforeCompile.toString() when no custom key
     is given. Every chained closure here stringifies identically, so wind-patched
     and detail-only materials would silently share one compiled program. */
  material.customProgramCacheKey = () =>
    'rl:' + [lowFreq, highFreq, strength, warm, translucency, grain, contact].join('_') +
    '|' + (typeof prevKey === 'function' ? prevKey.call(material) : '');

  material.needsUpdate = true;
  return material;
}

```

## `wind.js`

```js
/* Wind — patches the glTF's own MeshStandardMaterials rather than replacing them,
   so the vegetation keeps its PBR shading and just gains motion.

   Two layers, because one sine reads as a machine: a fast local flutter per plant,
   and a slow GUST that travels across the scene along -z. The gust is what sells
   it — a jungle doesn't sway in unison, a wave moves through it. */
import * as THREE from 'three';

const patched = [];

export function applyWind(material, {
  amp = 0.05,        // metres of sway at full height
  freq = 1.1,        // flutter rate
  base = -2.9,       // world y where the plant is rooted (no movement here)
  span = 1.4,        // metres over which sway ramps to full
  gust = 1.0,        // how much the travelling gust modulates it
} = {}){
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime     = { value: 0 };
    shader.uniforms.uWindAmp  = { value: amp };
    shader.uniforms.uWindFreq = { value: freq };
    shader.uniforms.uWindBase = { value: base };
    shader.uniforms.uWindSpan = { value: span };
    shader.uniforms.uWindGust = { value: gust };

    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      `uniform float uTime, uWindAmp, uWindFreq, uWindBase, uWindSpan, uWindGust;
       void main() {`
    ).replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       {
         vec4 wp = modelMatrix * vec4(transformed, 1.0);
         /* rooted at the base, full sway at the tip */
         float h = clamp((wp.y - uWindBase) / uWindSpan, 0.0, 1.0);
         h = h * h;
         /* a very shallow breathing, not a gust front. Kage uses none at all;
            this stays inside 0.86-1.10 so it never reads as a pulse. */
         float g = mix(1.0, 0.86 + 0.24 * (0.5 + 0.5 *
                   sin(uTime * 0.19 - wp.z * 0.045 + wp.x * 0.024)), uWindGust);
         float ph = wp.x * 0.45 + wp.z * 0.33;
         /* normalised: the two sines peak at 1.45 together, so divide through
            or amp silently means 1.45x what it says */
         float s  = (sin(uTime * uWindFreq + ph)
                  + 0.45 * sin(uTime * uWindFreq * 2.37 + ph * 1.8)) / 1.45;
         float a  = uWindAmp * h * g;
         transformed.x += s * a;
         transformed.z += cos(uTime * uWindFreq * 0.87 + ph * 1.2) * a * 0.62;
         /* a bending stem shortens slightly — without this it looks like sliding */
         transformed.y -= abs(s) * a * 0.20;
       }`
    );
    material.userData.shader = shader;
  };
  material.customProgramCacheKey = () => 'wd:' + [amp, freq, base, span, gust].join('_');
  material.needsUpdate = true;
  patched.push(material);
  return material;
}

export function tickWind(t){
  for (const m of patched){
    const sh = m.userData.shader;
    if (sh) sh.uniforms.uTime.value = t;
  }
}

```
