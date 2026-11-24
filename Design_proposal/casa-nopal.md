# MASTER PROMPT: Casa Nopal static website design

## Casa Nopal | Mexican Restaurant &amp; Mezcalería, West Village
### Plain HTML, CSS and JavaScript. No WordPress, no page builder, no framework, no build step.

## HOW TO USE THIS PROMPT

**Paste this whole document into Claude. Nothing to attach.** It carries the complete source of the site plus the address of every image, so Claude can assemble a folder that owns its own assets and hand it back as a zip.

**INSTRUCTION TO CLAUDE : BUILD IT, DO NOT ASK.** Every decision is already made in this document. Do not stop to ask the user questions, do not offer options, and do not ask for confirmation before starting. Write the files, zip them, hand over the archive, then report what you built.

1. Create a folder named `casa-nopal` and write out every file in the appendix below **exactly as written** : do not reformat, rename, shorten, reorder or "improve" anything.
2. **Download the 48 images and 3 fonts into `assets/`.** The code already points at `assets/…` : rendering assets are local (external navigation and schema/canonical URLs remain). Run this from inside the folder; it reads the ASSET MANIFEST at the end of this document:

   ```bash
   mkdir -p assets
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/archivo-normal.woff2' -o 'assets/archivo-normal.woff2'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/fraunces-italic.woff2' -o 'assets/fraunces-italic.woff2'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/fraunces-normal.woff2' -o 'assets/fraunces-normal.woff2'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-about-facade-lg.webp' -o 'assets/about-facade-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-about-facade-sm.webp' -o 'assets/about-facade-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-bar-mezcal-lg.webp' -o 'assets/bar-mezcal-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-bar-mezcal-sm.webp' -o 'assets/bar-mezcal-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-masa-lg.webp' -o 'assets/blog-masa-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-masa-sm.webp' -o 'assets/blog-masa-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-mezcal-lg.webp' -o 'assets/blog-mezcal-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-mezcal-sm.webp' -o 'assets/blog-mezcal-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-ofrenda-lg.webp' -o 'assets/blog-ofrenda-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-ofrenda-sm.webp' -o 'assets/blog-ofrenda-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-catering-spread-lg.webp' -o 'assets/catering-spread-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-catering-spread-sm.webp' -o 'assets/catering-spread-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-chef-plating-lg.webp' -o 'assets/chef-plating-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-chef-plating-sm.webp' -o 'assets/chef-plating-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-aguachile.webp' -o 'assets/dish-aguachile-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-aguachile-sm.webp' -o 'assets/dish-aguachile-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-al-pastor.webp' -o 'assets/dish-al-pastor-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-al-pastor-sm.webp' -o 'assets/dish-al-pastor-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-baja-fish.webp' -o 'assets/dish-baja-fish-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-baja-fish-sm.webp' -o 'assets/dish-baja-fish-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-carne-asada.webp' -o 'assets/dish-carne-asada-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-carne-asada-sm.webp' -o 'assets/dish-carne-asada-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-carnitas.webp' -o 'assets/dish-carnitas-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-carnitas-sm.webp' -o 'assets/dish-carnitas-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-churros.webp' -o 'assets/dish-churros-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-churros-sm.webp' -o 'assets/dish-churros-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-elote.webp' -o 'assets/dish-elote-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-elote-sm.webp' -o 'assets/dish-elote-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-flan.webp' -o 'assets/dish-flan-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-flan-sm.webp' -o 'assets/dish-flan-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-guacamole.webp' -o 'assets/dish-guacamole-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-guacamole-sm.webp' -o 'assets/dish-guacamole-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-margarita.webp' -o 'assets/dish-margarita-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-margarita-sm.webp' -o 'assets/dish-margarita-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-mezcal-flight.webp' -o 'assets/dish-mezcal-flight-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-mezcal-flight-sm.webp' -o 'assets/dish-mezcal-flight-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-mole-negro.webp' -o 'assets/dish-mole-negro-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-mole-negro-sm.webp' -o 'assets/dish-mole-negro-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-queso-fundido.webp' -o 'assets/dish-queso-fundido-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-queso-fundido-sm.webp' -o 'assets/dish-queso-fundido-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-zarandeado.webp' -o 'assets/dish-zarandeado-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-zarandeado-sm.webp' -o 'assets/dish-zarandeado-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-hero-dining-lg.webp' -o 'assets/hero-dining-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-hero-dining-sm.webp' -o 'assets/hero-dining-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-private-dining-lg.webp' -o 'assets/private-dining-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-private-dining-sm.webp' -o 'assets/private-dining-sm.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-story-comal-lg.webp' -o 'assets/story-comal-lg.webp'
   curl -fsSL 'https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-story-comal-sm.webp' -o 'assets/story-comal-sm.webp'
   ```

   Then check every file arrived and none is empty or an HTML error page (inspect file signatures, not an arbitrary minimum size):

   ```bash
   ls assets | wc -l             # expect 51 files
   find assets -type f -size 0   # expect no output
   ```

   If any download fails, retry it : the host is occasionally slow. Do **not** fall back to hotlinking the remote URL: the whole point is a folder that works offline.

3. **Zip that folder and give the user the archive.** Its contents:

   ```
   casa-nopal/
     index.html
     404.html
     README.txt
     about/index.html
     assets/css/site.css
     assets/fonts/fonts.css
     assets/js/booking.js
     assets/js/lenis.min.js
     assets/js/site.js
     blog/beginners-guide-to-mezcal/index.html
     blog/dia-de-muertos-ofrenda/index.html
     blog/holiday-private-dining/index.html
     blog/index.html
     blog/why-we-make-our-own-masa/index.html
     catering/index.html
     menu/aguachile-verde/index.html
     menu/carne-asada/index.html
     menu/churros-con-chocolate/index.html
     menu/elote-asado/index.html
     menu/flan-de-cajeta/index.html
     menu/guacamole-de-molcajete/index.html
     menu/index.html
     menu/margarita-de-la-casa/index.html
     menu/mezcal-flight/index.html
     menu/mole-negro/index.html
     menu/pescado-zarandeado/index.html
     menu/queso-fundido/index.html
     menu/tacos-al-pastor/index.html
     menu/tacos-baja/index.html
     menu/tacos-de-carnitas/index.html
     reservations/index.html
     robots.txt
     sitemap.xml
     assets/
       archivo-normal.woff2
       fraunces-italic.woff2
       fraunces-normal.woff2
       about-facade-lg.webp
       … 47 more images
   ```

   ```bash
   zip -r casa-nopal.zip casa-nopal -x '*.DS_Store'
   ```

   Then hand over `casa-nopal.zip` as a file the user can download, not as text in the chat.
4. Before handing it over, serve the folder and confirm it runs:

   ```bash
   cd casa-nopal && python3 -m http.server 8000     # then open http://localhost:8000
   ```

   Check the page renders, the images load from `assets/` with the network throttled or offline, and scrolling drives the animations.

The finished folder needs no network for its images, fonts or motion code: they are local. The optional map iframe and outbound links require internet only when clicked.
Do not rebuild the design from the description below. The description is there so a person can understand and edit the code. The appendix is the deliverable.

## Scope: frontend website design only

Reproduce the supplied visual website, not a WordPress installation. Include Home, Menu, Reservations, Catering, Journal, About, fourteen dish detail pages, four journal articles and the 404 page. Preserve the supplied cream/red/sage palette, Fraunces and Archivo fonts, shared header/footer, animations, filters, cookie-preferences UI and responsive layouts.

Do not create WordPress users, CPTs, modules, dashboards, Kitchen Display, operational booking/order APIs, sales records, payments, SMTP or databases. Form, booking and table-order interactions are local frontend demonstrations only; never claim that an enquiry was actually sent or a restaurant booking/order actually exists. Do not submit to external services while testing.

Serve the folder as the HTTP site root because navigation URLs start with `/`. Media paths are relative to each page/stylesheet; keep the nested file layout exactly. The code does not require React, npm, WordPress or a build step. The map loads externally only after an explicit click; do not click it during offline checks.

Check all 25 HTML pages at desktop and mobile sizes. Verify the menu overlay, filters, sliders and scroll motion with normal motion enabled, plus reduced-motion behaviour. No remote image/font/CDN/script requests are allowed during the offline test. Local forms can be tested with fictional data only. Do not publish or contact anyone.

---

## WHAT YOU GET

Mexican kitchen and mezcalería in the West Village, NYC. Hand-pressed heirloom-corn tortillas, Oaxacan mole negro, oak-grilled meats and 80 mezcales.

**33 code files plus an `assets/` folder holding 48 images and 3 fonts, delivered as `casa-nopal.zip`.**

| File | What it is |
|---|---|
| `index.html` | a page, 38 KB |
| `404.html` | a page, 10 KB |
| `README.txt` | a file, 0 KB |
| `about/index.html` | a page, 18 KB |
| `assets/css/site.css` | the stylesheet, 57 KB |
| `assets/fonts/fonts.css` | the stylesheet, 1 KB |
| `assets/js/booking.js` | the script, 8 KB |
| `assets/js/lenis.min.js` | the script, 13 KB |
| `assets/js/site.js` | the script, 19 KB |
| `blog/beginners-guide-to-mezcal/index.html` | a page, 18 KB |
| `blog/dia-de-muertos-ofrenda/index.html` | a page, 18 KB |
| `blog/holiday-private-dining/index.html` | a page, 17 KB |
| `blog/index.html` | a page, 14 KB |
| `blog/why-we-make-our-own-masa/index.html` | a page, 18 KB |
| `catering/index.html` | a page, 20 KB |
| `menu/aguachile-verde/index.html` | a page, 22 KB |
| `menu/carne-asada/index.html` | a page, 22 KB |
| `menu/churros-con-chocolate/index.html` | a page, 22 KB |
| `menu/elote-asado/index.html` | a page, 22 KB |
| `menu/flan-de-cajeta/index.html` | a page, 22 KB |
| `menu/guacamole-de-molcajete/index.html` | a page, 23 KB |
| `menu/index.html` | a page, 30 KB |
| `menu/margarita-de-la-casa/index.html` | a page, 22 KB |
| `menu/mezcal-flight/index.html` | a page, 22 KB |
| `menu/mole-negro/index.html` | a page, 23 KB |
| `menu/pescado-zarandeado/index.html` | a page, 23 KB |
| `menu/queso-fundido/index.html` | a page, 22 KB |
| `menu/tacos-al-pastor/index.html` | a page, 22 KB |
| `menu/tacos-baja/index.html` | a page, 22 KB |
| `menu/tacos-de-carnitas/index.html` | a page, 22 KB |
| `reservations/index.html` | a page, 17 KB |
| `robots.txt` | a file, 0 KB |
| `sitemap.xml` | a file, 2 KB |
| `assets/` | 48 images and 3 fonts, downloaded at build time |

---

## WHERE THE MEDIA COMES FROM

All 51 files (48 images and 3 fonts) live in `assets/` inside the folder, and every reference in the markup, the CSS and the script is a relative `assets/…` path. Once the folder is assembled it owns its own media: no CDN, no media library, no external image host. Open it on a laptop with the wifi off and it still renders.

They are fetched **once, at build time**, from the WordPress media library on `demo.uichemy.com` : the byte-identical photo/font assets referenced by the companion WordPress prompt. That is only how they travel into the folder; nothing in the delivered code points back at that host. Replacing an image means dropping a new file into `assets/` under the same name.

The manifest at the end of this document lists every source URL against the filename it is saved as, so the download step is reproducible and checkable.

---

## DESIGN TOKENS

Everything is driven from custom properties at the top of the stylesheet:

`--cream` `--cream-2` `--paper` `--ink` `--ink-2` `--mute` `--red` `--red-deep` `--sage` `--sage-deep` `--marigold` `--rosa` `--line` `--serif` `--sans` `--wrap` `--ease` `--ease-io`

---

## WHAT THIS PROMPT DELIBERATELY DOES NOT CONTAIN

- No WordPress, no page builder, and none of the wrapper classes or compatibility CSS a builder needs. The WordPress build is a separate prompt.
- No framework, no TypeScript, no bundler, no `package.json`.
- No backend. Any form here validates and replies in place; it posts nowhere.
- No CMS. The content lives in the files.
- No external image host. The images ship inside the zip; nothing in the code calls out to a media library at runtime.

---

## ASSET MANIFEST : download these into `assets/`

Source is the media library on `demo.uichemy.com`. Save each one under the name in the second column; the code already refers to it by that name.

| Download from | Save as |
|---|---|
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/archivo-normal.woff2` | `assets/archivo-normal.woff2` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/fraunces-italic.woff2` | `assets/fraunces-italic.woff2` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/fraunces-normal.woff2` | `assets/fraunces-normal.woff2` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-about-facade-lg.webp` | `assets/about-facade-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-about-facade-sm.webp` | `assets/about-facade-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-bar-mezcal-lg.webp` | `assets/bar-mezcal-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-bar-mezcal-sm.webp` | `assets/bar-mezcal-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-masa-lg.webp` | `assets/blog-masa-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-masa-sm.webp` | `assets/blog-masa-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-mezcal-lg.webp` | `assets/blog-mezcal-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-mezcal-sm.webp` | `assets/blog-mezcal-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-ofrenda-lg.webp` | `assets/blog-ofrenda-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-blog-ofrenda-sm.webp` | `assets/blog-ofrenda-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-catering-spread-lg.webp` | `assets/catering-spread-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-catering-spread-sm.webp` | `assets/catering-spread-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-chef-plating-lg.webp` | `assets/chef-plating-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-chef-plating-sm.webp` | `assets/chef-plating-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-aguachile.webp` | `assets/dish-aguachile-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-aguachile-sm.webp` | `assets/dish-aguachile-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-al-pastor.webp` | `assets/dish-al-pastor-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-al-pastor-sm.webp` | `assets/dish-al-pastor-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-baja-fish.webp` | `assets/dish-baja-fish-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-baja-fish-sm.webp` | `assets/dish-baja-fish-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-carne-asada.webp` | `assets/dish-carne-asada-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-carne-asada-sm.webp` | `assets/dish-carne-asada-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-carnitas.webp` | `assets/dish-carnitas-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-carnitas-sm.webp` | `assets/dish-carnitas-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-churros.webp` | `assets/dish-churros-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-churros-sm.webp` | `assets/dish-churros-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-elote.webp` | `assets/dish-elote-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-elote-sm.webp` | `assets/dish-elote-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-flan.webp` | `assets/dish-flan-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-flan-sm.webp` | `assets/dish-flan-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-guacamole.webp` | `assets/dish-guacamole-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-guacamole-sm.webp` | `assets/dish-guacamole-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-margarita.webp` | `assets/dish-margarita-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-margarita-sm.webp` | `assets/dish-margarita-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-mezcal-flight.webp` | `assets/dish-mezcal-flight-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-mezcal-flight-sm.webp` | `assets/dish-mezcal-flight-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-mole-negro.webp` | `assets/dish-mole-negro-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-mole-negro-sm.webp` | `assets/dish-mole-negro-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-queso-fundido.webp` | `assets/dish-queso-fundido-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-queso-fundido-sm.webp` | `assets/dish-queso-fundido-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/dish-zarandeado.webp` | `assets/dish-zarandeado-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-dish-zarandeado-sm.webp` | `assets/dish-zarandeado-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-hero-dining-lg.webp` | `assets/hero-dining-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-hero-dining-sm.webp` | `assets/hero-dining-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-private-dining-lg.webp` | `assets/private-dining-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-private-dining-sm.webp` | `assets/private-dining-sm.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-story-comal-lg.webp` | `assets/story-comal-lg.webp` |
| `https://demo.uichemy.com/casa-nopal/wp-content/uploads/sites/20/2026/10/cn-story-comal-sm.webp` | `assets/story-comal-sm.webp` |


---

# APPENDIX · VERBATIM SOURCE

The complete source of every file. **Write them out exactly** — do not change a value, a comment, a class name, or the order of a declaration. Recreate this file layout:

```
index.html
404.html
README.txt
about/index.html
assets/css/site.css
assets/fonts/fonts.css
assets/js/booking.js
assets/js/lenis.min.js
assets/js/site.js
blog/beginners-guide-to-mezcal/index.html
blog/dia-de-muertos-ofrenda/index.html
blog/holiday-private-dining/index.html
blog/index.html
blog/why-we-make-our-own-masa/index.html
catering/index.html
menu/aguachile-verde/index.html
menu/carne-asada/index.html
menu/churros-con-chocolate/index.html
menu/elote-asado/index.html
menu/flan-de-cajeta/index.html
menu/guacamole-de-molcajete/index.html
menu/index.html
menu/margarita-de-la-casa/index.html
menu/mezcal-flight/index.html
menu/mole-negro/index.html
menu/pescado-zarandeado/index.html
menu/queso-fundido/index.html
menu/tacos-al-pastor/index.html
menu/tacos-baja/index.html
menu/tacos-de-carnitas/index.html
reservations/index.html
robots.txt
sitemap.xml
```

## `index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Casa Nopal | Mexican Restaurant &amp; Mezcalería, West Village</title>
<meta name="description" content="Mexican kitchen and mezcalería in the West Village, NYC. Hand-pressed heirloom-corn tortillas, Oaxacan mole negro, oak-grilled meats and 80 mezcales.">
<link rel="canonical" href="https://casanopal.nyc/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Casa Nopal | Mexican Restaurant &amp; Mezcalería, West Village">
<meta property="og:description" content="Mexican kitchen and mezcalería in the West Village, NYC. Hand-pressed heirloom-corn tortillas, Oaxacan mole negro, oak-grilled meats and 80 mezcales.">
<meta property="og:url" content="https://casanopal.nyc/">
<meta property="og:image" content="assets/hero-dining-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Casa Nopal | Mexican Restaurant &amp; Mezcalería, West Village">
<meta name="twitter:description" content="Mexican kitchen and mezcalería in the West Village, NYC. Hand-pressed heirloom-corn tortillas, Oaxacan mole negro, oak-grilled meats and 80 mezcales.">
<meta name="twitter:image" content="assets/hero-dining-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(true&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Restaurant","@id":"https://casanopal.nyc/#restaurant","name":"Casa Nopal","description":"Mexican kitchen and mezcalería in New York's West Village. Heirloom-corn tortillas, Oaxacan mole, wood-grilled meats and over 80 mezcales.","url":"https://casanopal.nyc/","telephone":"(212) 555-0147","email":"hola@casanopal.nyc","image":"assets/hero-dining-lg.webp","servesCuisine":["Mexican","Oaxacan"],"priceRange":"$$$","acceptsReservations":true,"hasMenu":"https://casanopal.nyc/menu/","address":{"@type":"PostalAddress","streetAddress":"214 Bleecker Street","addressLocality":"New York","addressRegion":"NY","postalCode":"10012","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":40.7303,"longitude":-74.0021},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"11:00","closes":"22:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Tuesday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Wednesday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Thursday","opens":"17:00","closes":"23:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"17:00","closes":"23:59"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"11:00","closes":"23:59"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"Casa Nopal","url":"https://casanopal.nyc/"}</script>
</head>
<body class="home">
<a class="skip" href="#main">Skip to content</a>
<div class="loader" aria-hidden="true"><div class="loader-inner"><span class="loader-stamp"><span class="wordmark">Casa<i>✦</i>Nopal</span></span><span class="loader-sub">Mexican kitchen &amp; mezcalería · West Village</span></div></div>
<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="assets/hero-dining-sm.webp?v=4" aria-current="page" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">

<section class="hero" data-trail data-trail-imgs="assets/dish-guacamole-sm.webp?v=4,assets/dish-aguachile-sm.webp?v=4,assets/dish-al-pastor-sm.webp?v=4,assets/dish-mole-negro-sm.webp?v=4,assets/dish-carne-asada-sm.webp?v=4,assets/dish-churros-sm.webp?v=4,assets/dish-elote-sm.webp?v=4,assets/dish-queso-fundido-sm.webp?v=4,assets/dish-carnitas-sm.webp?v=4,assets/dish-baja-fish-sm.webp?v=4">
  <div class="picado picado--hero" data-picado aria-hidden="true"></div>
  <div class="hero-inner wrap">
    <p class="label hero-label">Mexican kitchen &amp; mezcalería <i>✦</i> West Village <i>✦</i> Est. 2019</p>
    <h1 class="hero-title"><span class="dot" aria-hidden="true"></span><span class="ln"><span>Oaxaca in</span></span> <span class="ln"><span>the kitchen,</span></span> <span class="ln"><span>the Village</span></span> <span class="ln"><span>at the table.</span></span><span class="dot" aria-hidden="true"></span></h1>
    <span class="stamp hero-stamp" aria-hidden="true">¡Buen provecho!</span>
    <span class="sticker hero-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Hecho<br>a mano</span></span>
    <div class="hero-cta"><a class="btn" href="/reservations/" data-magnetic>Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/">See the menu <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
  </div>
  <div class="ticker ticker--hero" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
</section>

<section class="expand" data-expand aria-label="Inside Casa Nopal">
  <div class="expand-sticky">
    <div class="expand-media"><img src="assets/hero-dining-lg.webp?v=4" srcset="assets/hero-dining-sm.webp?v=4 800w, assets/hero-dining-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="The sunlit Casa Nopal dining room with limewash walls, rattan chairs and agave plants" loading="lazy" decoding="async"></div>
    <div class="expand-copy"><p class="label">Bleecker Street <i>✦</i> since 2019</p><p class="expand-big">Pull up a chair.</p></div>
  </div>
</section>

<section class="rail wrap">
  <p class="label rail-label" data-reveal>Nuestra historia</p>
  <div class="rail-body">
    <h2 class="wide scrub" data-scrub>A grandmother's mole, a Village townhouse, and heirloom corn we grind every single morning.</h2>
    <div class="rail-foot" data-reveal>
      <p>Chef Ximena Ortega grew up in Oaxaca, in a kitchen that smelled of toasted chiles and wood smoke. In 2019 she brought those recipes to a narrow brick townhouse on Bleecker Street. We still nixtamalize our own corn, press every tortilla by hand and simmer the mole for three days.</p>
      <a class="link-arr" href="/about/">Read our story <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a>
    </div>
  </div>
</section>

<section class="split">
  <div class="split-media" data-reveal><img src="assets/story-comal-lg.webp?v=4" srcset="assets/story-comal-sm.webp?v=4 560w, assets/story-comal-lg.webp?v=4 1120w" sizes="(max-width: 900px) 100vw, 50vw" width="1120" height="1400" alt="Hands pressing fresh blue-corn tortillas onto a hot comal" loading="lazy" decoding="async"></div>
  <div class="split-block split-block--red">
    <p class="label">La cocina</p>
    <p class="split-quote" data-split>“A tortilla is not a plate. It is the dish.”</p>
    <p>Fourteen dishes, from antojitos to a whole grilled snapper for two. Everything cooked over oak, everything wrapped in masa we made that morning.</p>
    <a class="link-arr" href="/menu/">View full menu <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a>
  </div>
</section>

<section class="carta-scene" aria-labelledby="carta-title">
  <div class="carta-bg" data-parallax="0.12"><img src="assets/catering-spread-lg.webp?v=4" srcset="assets/catering-spread-sm.webp?v=4 800w, assets/catering-spread-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="" loading="lazy" decoding="async"></div>
  <div class="carta" data-carta>
    <div class="carta-frame">
      <div class="carta-head"><p class="carta-kicker">La carta</p><span class="carta-num">No. 05</span></div>
      <h2 id="carta-title" class="carta-title">Plates people<br><em>cross town for</em></h2>
      <ul class="carta-list"><li><a href="/menu/guacamole-de-molcajete/" data-preview="assets/dish-guacamole-sm.webp?v=4"><span class="carta-name">Guacamole de Molcajete</span><span class="carta-course">Antojitos</span><span class="carta-price">$19</span><span class="carta-go"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></span></a></li><li><a href="/menu/aguachile-verde/" data-preview="assets/dish-aguachile-sm.webp?v=4"><span class="carta-name">Aguachile Verde</span><span class="carta-course">Antojitos</span><span class="carta-price">$24</span><span class="carta-go"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></span></a></li><li><a href="/menu/tacos-al-pastor/" data-preview="assets/dish-al-pastor-sm.webp?v=4"><span class="carta-name">Tacos al Pastor</span><span class="carta-course">Tacos</span><span class="carta-price">$18</span><span class="carta-go"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></span></a></li><li><a href="/menu/mole-negro/" data-preview="assets/dish-mole-negro-sm.webp?v=4"><span class="carta-name">Mole Negro</span><span class="carta-course">Platos Fuertes</span><span class="carta-price">$34</span><span class="carta-go"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></span></a></li><li><a href="/menu/carne-asada/" data-preview="assets/dish-carne-asada-sm.webp?v=4"><span class="carta-name">Carne Asada</span><span class="carta-course">Platos Fuertes</span><span class="carta-price">$42</span><span class="carta-go"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></span></a></li><li><a href="/menu/churros-con-chocolate/" data-preview="assets/dish-churros-sm.webp?v=4"><span class="carta-name">Churros con Chocolate</span><span class="carta-course">Postres</span><span class="carta-price">$13</span><span class="carta-go"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></span></a></li></ul>
      <a class="carta-all" href="/menu/">See all 14 dishes</a>
      <span class="stamp carta-stamp" aria-hidden="true">¡Delicioso!</span>
    </div>
  </div>
</section>

<section class="green" aria-labelledby="green-title">
  <span class="sticker green-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Cocina<br>oaxaqueña</span></span>
  <div class="wrap green-head">
    <h2 id="green-title" class="mega mega--light" data-split><span class="dot" aria-hidden="true"></span>Smoky, bright &amp; made to share<span class="dot" aria-hidden="true"></span></h2>
    <span class="stamp green-stamp" aria-hidden="true">¡Qué rico!</span>
    <p data-reveal>Tortillas off the comal, salsas ground in the molcajete, mezcal poured by the copita. Bring friends, order everything, pass it around.</p>
  </div>
  <div class="polaroids" data-drift>
    <div class="polaroids-track"><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-4deg"><img src="assets/dish-guacamole-lg.webp?v=4" srcset="assets/dish-guacamole-sm.webp?v=4 600w, assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete</span></a><a class="polaroid" href="/menu/elote-asado/" style="--r:3deg"><img src="assets/dish-elote-lg.webp?v=4" srcset="assets/dish-elote-sm.webp?v=4 600w, assets/dish-elote-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Elote Asado" loading="lazy" decoding="async"><span>Elote Asado</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:-2deg"><img src="assets/dish-aguachile-lg.webp?v=4" srcset="assets/dish-aguachile-sm.webp?v=4 600w, assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde</span></a><a class="polaroid" href="/menu/queso-fundido/" style="--r:5deg"><img src="assets/dish-queso-fundido-lg.webp?v=4" srcset="assets/dish-queso-fundido-sm.webp?v=4 600w, assets/dish-queso-fundido-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Queso Fundido" loading="lazy" decoding="async"><span>Queso Fundido</span></a><a class="polaroid" href="/menu/tacos-al-pastor/" style="--r:-5deg"><img src="assets/dish-al-pastor-lg.webp?v=4" srcset="assets/dish-al-pastor-sm.webp?v=4 600w, assets/dish-al-pastor-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos al Pastor" loading="lazy" decoding="async"><span>Tacos al Pastor</span></a><a class="polaroid" href="/menu/tacos-de-carnitas/" style="--r:2deg"><img src="assets/dish-carnitas-lg.webp?v=4" srcset="assets/dish-carnitas-sm.webp?v=4 600w, assets/dish-carnitas-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos de Carnitas" loading="lazy" decoding="async"><span>Tacos de Carnitas</span></a><a class="polaroid" href="/menu/tacos-baja/" style="--r:-3deg"><img src="assets/dish-baja-fish-lg.webp?v=4" srcset="assets/dish-baja-fish-sm.webp?v=4 600w, assets/dish-baja-fish-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos Baja" loading="lazy" decoding="async"><span>Tacos Baja</span></a><a class="polaroid" href="/menu/mole-negro/" style="--r:-4deg"><img src="assets/dish-mole-negro-lg.webp?v=4" srcset="assets/dish-mole-negro-sm.webp?v=4 600w, assets/dish-mole-negro-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Mole Negro" loading="lazy" decoding="async"><span>Mole Negro</span></a><a class="polaroid" href="/menu/carne-asada/" style="--r:3deg"><img src="assets/dish-carne-asada-lg.webp?v=4" srcset="assets/dish-carne-asada-sm.webp?v=4 600w, assets/dish-carne-asada-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Carne Asada" loading="lazy" decoding="async"><span>Carne Asada</span></a><a class="polaroid" href="/menu/pescado-zarandeado/" style="--r:-2deg"><img src="assets/dish-zarandeado-lg.webp?v=4" srcset="assets/dish-zarandeado-sm.webp?v=4 600w, assets/dish-zarandeado-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Pescado Zarandeado" loading="lazy" decoding="async"><span>Pescado Zarandeado</span></a><a class="polaroid" href="/menu/churros-con-chocolate/" style="--r:5deg"><img src="assets/dish-churros-lg.webp?v=4" srcset="assets/dish-churros-sm.webp?v=4 600w, assets/dish-churros-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Churros con Chocolate" loading="lazy" decoding="async"><span>Churros con Chocolate</span></a><a class="polaroid" href="/menu/flan-de-cajeta/" style="--r:-5deg"><img src="assets/dish-flan-lg.webp?v=4" srcset="assets/dish-flan-sm.webp?v=4 600w, assets/dish-flan-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Flan de Cajeta" loading="lazy" decoding="async"><span>Flan de Cajeta</span></a><a class="polaroid" href="/menu/margarita-de-la-casa/" style="--r:2deg"><img src="assets/dish-margarita-lg.webp?v=4" srcset="assets/dish-margarita-sm.webp?v=4 600w, assets/dish-margarita-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Margarita de la Casa" loading="lazy" decoding="async"><span>Margarita de la Casa</span></a><a class="polaroid" href="/menu/mezcal-flight/" style="--r:-3deg"><img src="assets/dish-mezcal-flight-lg.webp?v=4" srcset="assets/dish-mezcal-flight-sm.webp?v=4 600w, assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Mezcal Flight" loading="lazy" decoding="async"><span>Mezcal Flight</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-4deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-guacamole-lg.webp?v=4" srcset="assets/dish-guacamole-sm.webp?v=4 600w, assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Guacamole de Molcajete</span></a><a class="polaroid" href="/menu/elote-asado/" style="--r:3deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-elote-lg.webp?v=4" srcset="assets/dish-elote-sm.webp?v=4 600w, assets/dish-elote-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Elote Asado</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:-2deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-aguachile-lg.webp?v=4" srcset="assets/dish-aguachile-sm.webp?v=4 600w, assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Aguachile Verde</span></a><a class="polaroid" href="/menu/queso-fundido/" style="--r:5deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-queso-fundido-lg.webp?v=4" srcset="assets/dish-queso-fundido-sm.webp?v=4 600w, assets/dish-queso-fundido-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Queso Fundido</span></a><a class="polaroid" href="/menu/tacos-al-pastor/" style="--r:-5deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-al-pastor-lg.webp?v=4" srcset="assets/dish-al-pastor-sm.webp?v=4 600w, assets/dish-al-pastor-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Tacos al Pastor</span></a><a class="polaroid" href="/menu/tacos-de-carnitas/" style="--r:2deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-carnitas-lg.webp?v=4" srcset="assets/dish-carnitas-sm.webp?v=4 600w, assets/dish-carnitas-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Tacos de Carnitas</span></a><a class="polaroid" href="/menu/tacos-baja/" style="--r:-3deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-baja-fish-lg.webp?v=4" srcset="assets/dish-baja-fish-sm.webp?v=4 600w, assets/dish-baja-fish-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Tacos Baja</span></a><a class="polaroid" href="/menu/mole-negro/" style="--r:-4deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-mole-negro-lg.webp?v=4" srcset="assets/dish-mole-negro-sm.webp?v=4 600w, assets/dish-mole-negro-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Mole Negro</span></a><a class="polaroid" href="/menu/carne-asada/" style="--r:3deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-carne-asada-lg.webp?v=4" srcset="assets/dish-carne-asada-sm.webp?v=4 600w, assets/dish-carne-asada-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Carne Asada</span></a><a class="polaroid" href="/menu/pescado-zarandeado/" style="--r:-2deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-zarandeado-lg.webp?v=4" srcset="assets/dish-zarandeado-sm.webp?v=4 600w, assets/dish-zarandeado-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Pescado Zarandeado</span></a><a class="polaroid" href="/menu/churros-con-chocolate/" style="--r:5deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-churros-lg.webp?v=4" srcset="assets/dish-churros-sm.webp?v=4 600w, assets/dish-churros-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Churros con Chocolate</span></a><a class="polaroid" href="/menu/flan-de-cajeta/" style="--r:-5deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-flan-lg.webp?v=4" srcset="assets/dish-flan-sm.webp?v=4 600w, assets/dish-flan-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Flan de Cajeta</span></a><a class="polaroid" href="/menu/margarita-de-la-casa/" style="--r:2deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-margarita-lg.webp?v=4" srcset="assets/dish-margarita-sm.webp?v=4 600w, assets/dish-margarita-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Margarita de la Casa</span></a><a class="polaroid" href="/menu/mezcal-flight/" style="--r:-3deg" aria-hidden="true" tabindex="-1"><img src="assets/dish-mezcal-flight-lg.webp?v=4" srcset="assets/dish-mezcal-flight-sm.webp?v=4 600w, assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="" loading="lazy" decoding="async"><span>Mezcal Flight</span></a></div>
  </div>
</section>

<section class="split split--rev">
  <div class="split-media split-media--bw" data-reveal><img src="assets/bar-mezcal-lg.webp?v=4" srcset="assets/bar-mezcal-sm.webp?v=4 560w, assets/bar-mezcal-lg.webp?v=4 1120w" sizes="(max-width: 900px) 100vw, 50vw" width="1120" height="1400" alt="Mezcal being poured into a clay copita at the bar" loading="lazy" decoding="async"></div>
  <div class="split-block split-block--sage">
    <p class="label">La mezcalería</p>
    <p class="split-big" data-split>80 mezcales.<br>One long bar.</p>
    <p>Wild Tobalá, smoky Espadín, rare Tepeztate. Our bar team pours by the copita, walks you through every agave, and keeps the margaritas cold.</p>
    <a class="link-arr" href="/menu/#bebidas">See the bar list <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a>
  </div>
</section>

<section class="exp wrap" aria-labelledby="exp-title">
  <div class="rail rail--tight">
    <p class="label rail-label" data-reveal>Experiencias</p>
    <h2 id="exp-title" class="wide" data-split>Ways to gather beyond the table</h2>
  </div>
  <div class="exp-track" data-slider><a class="exp-card is-bw" href="/menu/#bebidas" data-reveal style="--i:0"><img src="assets/bar-mezcal-lg.webp?v=4" srcset="assets/bar-mezcal-sm.webp?v=4 560w, assets/bar-mezcal-lg.webp?v=4 1120w" sizes="(max-width: 900px) 80vw, 31vw" width="1120" height="1400" alt="" loading="lazy" decoding="async"><span class="exp-cap"><strong>The mezcalería</strong><span>Copitas, flights and a bar full of wild agaves</span><em>Explore more <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></em></span></a><a class="exp-card" href="/catering/#sala" data-reveal style="--i:1"><img src="assets/private-dining-lg.webp?v=4" srcset="assets/private-dining-sm.webp?v=4 750w, assets/private-dining-lg.webp?v=4 1500w" sizes="(max-width: 900px) 80vw, 31vw" width="1500" height="1000" alt="" loading="lazy" decoding="async"><span class="exp-cap"><strong>La Sala</strong><span>A candlelit private room for up to twenty-four</span><em>Explore more <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></em></span></a><a class="exp-card" href="/catering/" data-reveal style="--i:2"><img src="assets/catering-spread-lg.webp?v=4" srcset="assets/catering-spread-sm.webp?v=4 800w, assets/catering-spread-lg.webp?v=4 1600w" sizes="(max-width: 900px) 80vw, 31vw" width="1600" height="900" alt="" loading="lazy" decoding="async"><span class="exp-cap"><strong>Fiesta catering</strong><span>Family-style feasts, delivered or staffed</span><em>Explore more <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></em></span></a><a class="exp-card" href="/blog/dia-de-muertos-ofrenda/" data-reveal style="--i:3"><img src="assets/blog-ofrenda-lg.webp?v=4" srcset="assets/blog-ofrenda-sm.webp?v=4 750w, assets/blog-ofrenda-lg.webp?v=4 1500w" sizes="(max-width: 900px) 80vw, 31vw" width="1500" height="1000" alt="" loading="lazy" decoding="async"><span class="exp-cap"><strong>Día de Muertos</strong><span>Our ofrenda is up until November 2</span><em>Explore more <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></em></span></a></div>
  <div class="exp-nav"><button type="button" data-slide="-1" aria-label="Previous">←</button><span class="exp-bar"><i data-slide-bar></i></span><button type="button" data-slide="1" aria-label="Next">→</button></div>
</section>

<section class="book-scene">
  <div class="book-bg" data-parallax="0.1"><img src="assets/private-dining-lg.webp?v=4" srcset="assets/private-dining-sm.webp?v=4 750w, assets/private-dining-lg.webp?v=4 1500w" sizes="100vw" width="1500" height="1000" alt="" loading="lazy" decoding="async"></div>
  <form class="ticket ticket--home" action="/reservations/" method="get" data-reveal>
  <div class="ticket-edge" aria-hidden="true"></div>
  <p class="ticket-kicker">Casa Nopal</p>
  <h2 class="ticket-title">Su reservación</h2>
  <span class="stamp ticket-stamp" aria-hidden="true">¡Te esperamos!</span>
  <div class="ticket-rows">
    <label><span><i>01</i> Guests</span><select name="guests"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7 guests</option><option value="8">8 guests</option></select></label>
    <label><span><i>02</i> Date</span><input type="date" name="date" data-min-today required></label>
    <label><span><i>03</i> Time</span><select name="time"><option value="17:30">5:30 pm</option><option value="18:00">6:00 pm</option><option value="18:30">6:30 pm</option><option value="19:00">7:00 pm</option><option value="19:30" selected>7:30 pm</option><option value="20:00">8:00 pm</option><option value="20:30">8:30 pm</option><option value="21:00">9:00 pm</option><option value="21:30">9:30 pm</option></select></label>
  </div>
  <button class="btn btn-block" type="submit">Find a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
  <p class="ticket-note">Parties of 9 or more, see <a href="/catering/">Event Catering</a>.</p>
</form>
</section>

<section class="journal wrap" aria-labelledby="journal-title">
  <div class="rail rail--tight">
    <p class="label rail-label" data-reveal>Diario</p>
    <div class="rail-row"><h2 id="journal-title" class="wide" data-split>Notes from the kitchen</h2><a class="link-arr" href="/blog/">All stories <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
  </div>
  <div class="pgrid"><article class="pcard" data-cat="Agave" data-reveal style="--i:0">
    <a href="/blog/beginners-guide-to-mezcal/" class="pcard-img"><img src="assets/blog-mezcal-lg.webp?v=4" srcset="assets/blog-mezcal-sm.webp?v=4 750w, assets/blog-mezcal-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="A beginner's guide to mezcal" loading="lazy" decoding="async"><span class="pcard-cat">Agave</span></a>
    <p class="pcard-meta"><time datetime="2026-10-24">October 24, 2026</time> · 5 min read</p>
    <h3><a href="/blog/beginners-guide-to-mezcal/">A beginner's guide to mezcal</a></h3>
    <p>Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.</p>
  </article><article class="pcard" data-cat="Culture" data-reveal style="--i:1">
    <a href="/blog/dia-de-muertos-ofrenda/" class="pcard-img"><img src="assets/blog-ofrenda-lg.webp?v=4" srcset="assets/blog-ofrenda-sm.webp?v=4 750w, assets/blog-ofrenda-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Our Día de Muertos ofrenda is up" loading="lazy" decoding="async"><span class="pcard-cat">Culture</span></a>
    <p class="pcard-meta"><time datetime="2026-10-12">October 12, 2026</time> · 4 min read</p>
    <h3><a href="/blog/dia-de-muertos-ofrenda/">Our Día de Muertos ofrenda is up</a></h3>
    <p>From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.</p>
  </article><article class="pcard" data-cat="Kitchen" data-reveal style="--i:2">
    <a href="/blog/why-we-make-our-own-masa/" class="pcard-img"><img src="assets/blog-masa-lg.webp?v=4" srcset="assets/blog-masa-sm.webp?v=4 750w, assets/blog-masa-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Why we nixtamalize our own masa" loading="lazy" decoding="async"><span class="pcard-cat">Kitchen</span></a>
    <p class="pcard-meta"><time datetime="2026-09-28">September 28, 2026</time> · 6 min read</p>
    <h3><a href="/blog/why-we-make-our-own-masa/">Why we nixtamalize our own masa</a></h3>
    <p>Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.</p>
  </article></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `404.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | Casa Nopal, NYC</title>
<meta name="description" content="This page is not on the menu.">
<link rel="canonical" href="https://casanopal.nyc/404.html">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Page not found">
<meta property="og:description" content="This page is not on the menu.">
<meta property="og:url" content="https://casanopal.nyc/404.html">
<meta property="og:image" content="assets/hero-dining-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page not found">
<meta name="twitter:description" content="This page is not on the menu.">
<meta name="twitter:image" content="assets/hero-dining-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>

</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<section class="phead">
  <div class="picado " data-picado aria-hidden="true"></div>
  <div class="wrap phead-inner">
    
    <p class="label" data-reveal>Error 404</p>
    <h1 class="mega" data-split><span class="dot" aria-hidden="true"></span>Not on the menu<span class="dot" aria-hidden="true"></span></h1>
    <span class="stamp phead-stamp" aria-hidden="true">¡Ay, no!</span>
    <p class="phead-lead" data-reveal>The page you are looking for has moved or never existed.</p>
  </div>
</section><p class="wrap notfound-cta"><a class="btn" href="/menu/">See the menu <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a> <a class="link-arr" href="/">Back home <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `README.txt`

```text
# Casa Nopal static website design

Serve this folder as the site root: python3 -m http.server 8000
Open http://localhost:8000, not index.html via file://.

This is the frontend design only. Booking, table-order, contact, catering and newsletter interactions are browser-only demonstrations. They do not create real reservations, send emails, reach a kitchen or take payment. Stored demo data stays in this browser. The WordPress prompt provides the operational backend separately.

All images, fonts and motion code are local. Assembly downloads need internet once. External navigation links (map, social, mail and telephone) need the appropriate service; the optional map iframe needs internet only after Load map is clicked. The rest of the site renders offline when served locally.

Fictional restaurant details and AI-generated photography. Preserve 25 HTML pages and all included styles/scripts. CSS and JS are shared, and each dish and article has its own URL.

```

## `about/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>About &amp; Contact | Casa Nopal, NYC</title>
<meta name="description" content="Chef Ximena Ortega's Oaxacan kitchen at 214 Bleecker Street, West Village. Our story, opening hours, map, directions and contact details.">
<link rel="canonical" href="https://casanopal.nyc/about/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="About &amp; Contact">
<meta property="og:description" content="Chef Ximena Ortega's Oaxacan kitchen at 214 Bleecker Street, West Village. Our story, opening hours, map, directions and contact details.">
<meta property="og:url" content="https://casanopal.nyc/about/">
<meta property="og:image" content="../assets/about-facade-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="About &amp; Contact">
<meta name="twitter:description" content="Chef Ximena Ortega's Oaxacan kitchen at 214 Bleecker Street, West Village. Our story, opening hours, map, directions and contact details.">
<meta name="twitter:image" content="../assets/about-facade-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"About & Contact","item":"https://casanopal.nyc/about/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Restaurant","@id":"https://casanopal.nyc/#restaurant","name":"Casa Nopal","description":"Mexican kitchen and mezcalería in New York's West Village. Heirloom-corn tortillas, Oaxacan mole, wood-grilled meats and over 80 mezcales.","url":"https://casanopal.nyc/","telephone":"(212) 555-0147","email":"hola@casanopal.nyc","image":"../assets/hero-dining-lg.webp","servesCuisine":["Mexican","Oaxacan"],"priceRange":"$$$","acceptsReservations":true,"hasMenu":"https://casanopal.nyc/menu/","address":{"@type":"PostalAddress","streetAddress":"214 Bleecker Street","addressLocality":"New York","addressRegion":"NY","postalCode":"10012","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":40.7303,"longitude":-74.0021},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"11:00","closes":"22:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Tuesday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Wednesday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Thursday","opens":"17:00","closes":"23:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"17:00","closes":"23:59"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"11:00","closes":"23:59"}],"founder":{"@type":"Person","name":"Ximena Ortega","jobTitle":"Chef and owner"},"foundingDate":"2019"}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"AboutPage","name":"About Casa Nopal","url":"https://casanopal.nyc/about/"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../assets/about-facade-sm.webp?v=4" aria-current="page" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<section class="phead">
  <div class="picado " data-picado aria-hidden="true"></div>
  <div class="wrap phead-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><span aria-current="page">About & Contact</span></nav>
    <p class="label" data-reveal>Nuestra historia</p>
    <h1 class="mega" data-split><span class="dot" aria-hidden="true"></span>A small house, a big kitchen<span class="dot" aria-hidden="true"></span></h1>
    <span class="stamp phead-stamp" aria-hidden="true">¡Bienvenidos!</span>
    
  </div>
</section>
<section class="expand expand--short" data-expand aria-label="Casa Nopal on Bleecker Street"><div class="expand-sticky"><div class="expand-media"><img src="../assets/about-facade-lg.webp?v=4" srcset="../assets/about-facade-sm.webp?v=4 750w, ../assets/about-facade-lg.webp?v=4 1500w" sizes="100vw" width="1500" height="1000" alt="The Casa Nopal townhouse on Bleecker Street on a bright autumn morning" loading="lazy" decoding="async"></div><div class="expand-copy"><p class="label">214 Bleecker Street</p><p class="expand-big">Casa Nopal.</p></div></div></section>
<section class="rail wrap">
  <p class="label rail-label" data-reveal>The name</p>
  <div class="rail-body"><h2 class="wide scrub" data-scrub>Named for the nopal that grows in every Oaxacan garden: humble, resilient and quietly generous. That is how we try to cook.</h2></div>
</section>
<section class="split split--rev">
  <div class="split-media split-media--bw" data-reveal><img src="../assets/chef-plating-lg.webp?v=4" srcset="../assets/chef-plating-sm.webp?v=4 560w, ../assets/chef-plating-lg.webp?v=4 1120w" sizes="(max-width: 900px) 100vw, 50vw" width="1120" height="1400" alt="Chef Ximena Ortega plating at the pass" loading="lazy" decoding="async"></div>
  <div class="split-block split-block--red"><p class="label">La chef</p><p class="split-quote" data-split>“I cook the food I grew up with. I just finally have enough tables for everyone I want to feed.”</p><p>Ximena Ortega, chef and owner</p></div>
</section>
<section class="lot wrap" aria-labelledby="lot-title">
  <div class="rail rail--tight"><p class="label rail-label" data-reveal>Cronología</p><h2 id="lot-title" class="wide" data-split>How we got here</h2></div>
  <ol class="lot-grid"><li class="lot-card" data-reveal style="--i:0;--r:-2deg"><span class="lot-no">No. 1</span><span class="lot-year">1998</span><h3>La abuela</h3><p>Ximena learns mole negro at her grandmother's side in Oaxaca, grinding chiles on a stone metate.</p></li><li class="lot-card" data-reveal style="--i:1;--r:1.5deg"><span class="lot-no">No. 2</span><span class="lot-year">2011</span><h3>La ciudad</h3><p>She cooks her way through Mexico City, from street stalls to tasting menus.</p></li><li class="lot-card" data-reveal style="--i:2;--r:-1deg"><span class="lot-no">No. 3</span><span class="lot-year">2019</span><h3>La casa</h3><p>Casa Nopal opens on Bleecker Street with 38 seats and a six-stool bar.</p></li><li class="lot-card" data-reveal style="--i:3;--r:2deg"><span class="lot-no">No. 4</span><span class="lot-year">2022</span><h3>La Sala</h3><p>The basement becomes our private room and the bar grows past 80 mezcales.</p></li><li class="lot-card" data-reveal style="--i:4;--r:-1.5deg"><span class="lot-no">No. 5</span><span class="lot-year">2026</span><h3>El maíz</h3><p>We begin buying whole heirloom corn directly from six farming families in Oaxaca.</p></li></ol>
</section>
<section class="contact" id="contact" aria-labelledby="contact-title">
  <div class="wrap contact-grid">
    <div class="contact-info">
      <p class="label" data-reveal>Visit &amp; contact</p>
      <h2 id="contact-title" class="mega mega--light mega--left" data-split>Find us on Bleecker</h2>
      <p class="open-badge" data-open-status data-reveal>Hours</p>
      <address data-reveal>Casa Nopal<br>214 Bleecker Street<br>New York, NY 10012</address>
      <p data-reveal><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p>
      <ul class="hours" data-reveal><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul>
      <p class="getting" data-reveal>West 4th Street station (A C E B D F M) is a four-minute walk. Christopher Street (1) is five.</p>
    </div>
    <div class="contact-side">
      <div class="map" data-map data-reveal>
        <div class="map-art" aria-hidden="true"><svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice"><rect width="600" height="420" fill="#efe3cf"/><g stroke="#e2d2b8" stroke-width="16" fill="none"><path d="M-20 120 L640 40"/><path d="M-20 300 L640 190"/><path d="M120 -20 L220 460"/><path d="M360 -20 L430 460"/><path d="M-20 420 L300 -20"/></g><g stroke="#e8dac3" stroke-width="7"><path d="M-20 210 L640 120"/><path d="M250 -20 L330 460"/><path d="M500 -20 L560 460"/></g><rect x="380" y="250" width="120" height="80" rx="10" fill="#c9d3c2"/><text x="40" y="98" fill="#9a8a72" font-size="13" letter-spacing="3" font-family="sans-serif" transform="rotate(-7 40 98)">BLEECKER ST</text><text x="430" y="300" fill="#7d8f78" font-size="11" letter-spacing="2" font-family="sans-serif">PARK</text></svg><span class="map-pin"><span class="stamp map-stamp" aria-hidden="true">Casa Nopal</span></span></div>
        <button type="button" class="btn btn-sm map-load" data-map-load data-src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0081%2C40.7268%2C-73.9961%2C40.7338&amp;layer=mapnik&amp;marker=40.7303%2C-74.0021">Interactive map</button>
        <a class="map-link" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Open in Google Maps</a>
      </div>
      <form class="paper-form" data-form="contact" novalidate data-reveal>
        <div class="ticket-edge" aria-hidden="true"></div>
        <h3 class="paper-title">Send us a note</h3>
        <div class="grid-2"><div class="field"><label class="label" for="ct-name">Name</label><input id="ct-name" name="name" autocomplete="name" required></div><div class="field"><label class="label" for="ct-email">Email</label><input id="ct-email" type="email" name="email" autocomplete="email" required></div></div>
        <div class="field"><label class="label" for="ct-topic">Topic</label><select id="ct-topic" name="topic"><option>General question</option><option>Feedback</option><option>Press</option><option>Careers</option></select></div>
        <div class="field"><label class="label" for="ct-msg">Message</label><textarea id="ct-msg" name="message" rows="4" required></textarea></div>
        <input type="text" name="company_website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn" type="submit">Send message <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
        <p class="form-msg" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `assets/css/site.css`

```css
@import url(../fonts/fonts.css);
/* =========================================================
   Casa Nopal v2: cream, cochineal, sage. Printed ephemera.
   ========================================================= */
:root{
  --cream:#f5ecdd; --cream-2:#ede1cb; --paper:#fbf7ee;
  --ink:#1e1611; --ink-2:#4a3b30; --mute:#7a6857;
  --red:#9b2c1f; --red-deep:#7e2116; --sage:#5f7563; --sage-deep:#4c5f50;
  --marigold:#e3a13b; --rosa:#efa3bf;
  --line:rgba(30,22,17,.18);
  --serif:'Fraunces',ui-serif,Georgia,serif; --sans:'Archivo',ui-sans-serif,system-ui,sans-serif;
  --wrap:min(1360px,100% - clamp(32px,6vw,96px));
  --ease:cubic-bezier(.22,1,.36,1); --ease-io:cubic-bezier(.65,0,.35,1);
}
@view-transition{navigation:auto}
::view-transition-old(root),::view-transition-new(root){animation-duration:.5s;animation-timing-function:var(--ease)}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
html{-webkit-text-size-adjust:100%;overflow-x:clip}
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
body{margin:0;background:var(--cream);color:var(--ink);font:400 clamp(.98rem,.95rem + .15vw,1.06rem)/1.6 var(--sans);font-stretch:100%;-webkit-font-smoothing:antialiased;overflow-x:clip}
img{display:block;max-width:100%;height:auto}
a{color:inherit;text-underline-offset:.2em;text-decoration-thickness:1px}
button,input,select,textarea{font:inherit;color:inherit}
h1,h2,h3,p{margin:0}
p+p{margin-top:1em}
.sr,.skip:not(:focus){position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip:focus{position:fixed;z-index:300;top:12px;left:12px;background:var(--ink);color:var(--cream);padding:10px 16px}
:focus-visible{outline:2px solid var(--red);outline-offset:3px}
.wrap{width:var(--wrap);margin-inline:auto}
.hp{position:absolute;left:-9999px}

/* ---------- Type ---------- */
.label{font:500 .74rem/1.3 var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase}
.label i{font-style:normal;color:var(--red);margin-inline:.5em;font-size:.8em}
.mega,.hero-title,.carta-title,.split-big,.dish-title,.expand-big{font-family:var(--serif);font-variation-settings:"SOFT" 100,"WONK" 0,"opsz" 144;font-weight:380;text-transform:uppercase;letter-spacing:-.01em;line-height:.92}
.mega{font-size:clamp(2.8rem,1rem + 7.4vw,8.6rem);color:var(--red);text-align:center;position:relative;display:inline-block}
.mega--light{color:var(--cream)}
.mega--sm{font-size:clamp(2.2rem,1rem + 4.4vw,5.2rem)}
.mega--left{text-align:left}
.mega--post{font-size:clamp(2.4rem,1rem + 5vw,6rem)}
.dot{display:inline-block;width:.09em;height:.09em;border-radius:50%;background:currentColor;vertical-align:middle;margin-inline:.35em;position:relative;top:-.08em}
.wide{font:400 clamp(1.6rem,.9rem + 2.9vw,3.9rem)/1.02 var(--sans);font-stretch:125%;text-transform:uppercase;letter-spacing:.03em}
.scrub .w>span{opacity:.16;transition:opacity .25s}
.scrub .w>span.on{opacity:1}

/* ---------- Buttons & links ---------- */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.8em;min-height:54px;padding:0 1.7em;border:1px solid var(--red);background:var(--red);color:var(--cream);font:500 .78rem/1 var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;cursor:pointer;border-radius:0;position:relative;overflow:hidden;isolation:isolate;transition:color .4s var(--ease),border-color .4s,transform .4s var(--ease)}
.btn::before{content:"";position:absolute;inset:0;background:var(--ink);z-index:-1;transform:translateY(101%);transition:transform .5s var(--ease)}
.btn:hover::before{transform:none}
.btn:hover{border-color:var(--ink)}
.btn-sm{min-height:44px;padding:0 1.2em;font-size:.72rem}
.btn-block{width:100%}
.btn-ghost{background:transparent;color:var(--ink);border-color:var(--ink)}
.btn-ghost:hover{color:var(--cream)}
.btn:disabled{opacity:.35;cursor:not-allowed}
.btn:disabled::before{display:none}
.arr{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:currentColor;flex-shrink:0;transition:transform .45s var(--ease)}
.arr svg{width:12px;height:12px;color:var(--cream);mix-blend-mode:normal}
.btn .arr{background:var(--cream)} .btn .arr svg{color:var(--red)} .btn:hover .arr svg{color:var(--ink)}
.btn-ghost .arr{background:var(--ink)} .btn-ghost .arr svg{color:var(--cream)} .btn-ghost:hover .arr{background:var(--cream)} .btn-ghost:hover .arr svg{color:var(--ink)}
.link-arr{display:inline-flex;align-items:center;gap:.7em;font:500 .76rem/1 var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;text-decoration:none}
.link-arr .arr svg{color:var(--cream)}
.split-block--red .link-arr .arr svg,.split-block--sage .link-arr .arr svg,.green .link-arr .arr svg{color:var(--ink)}
.link-arr:hover .arr,.btn:hover .arr{transform:translateX(4px) rotate(-45deg)}
.linklike{background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;text-underline-offset:.2em;font-size:inherit}

/* ---------- Ephemera ---------- */
.stamp{position:absolute;display:inline-grid;place-items:center;padding:.6em 1.4em;border:1.5px solid currentColor;border-radius:50%;font:italic 700 clamp(.9rem,.7rem + .5vw,1.25rem)/1 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;text-transform:uppercase;letter-spacing:.02em;color:var(--ink);background:var(--cream);transform:rotate(-12deg);white-space:nowrap;z-index:3;pointer-events:none}
.stamp::before,.stamp::after{content:"";position:absolute;top:50%;width:4px;height:4px;border-radius:50%;background:currentColor}
.stamp::before{left:.55em}.stamp::after{right:.55em}
.sticker{position:absolute;width:clamp(96px,9vw,132px);aspect-ratio:1;display:grid;place-items:center;z-index:3;pointer-events:none;animation:spin 22s linear infinite}
.sticker svg{position:absolute;inset:0;width:100%;height:100%}
.sticker path{fill:var(--rosa);stroke:var(--red-deep);stroke-width:1.2}
.sticker>span{position:relative;font:italic 800 clamp(.8rem,.6rem + .4vw,1.05rem)/1 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;text-transform:uppercase;text-align:center;color:var(--red-deep);transform:rotate(-14deg);animation:spin 22s linear infinite reverse}
@keyframes spin{to{transform:rotate(360deg)}}
.badge-spin{position:absolute;width:120px;aspect-ratio:1;animation:spin 18s linear infinite}
.badge-spin svg{width:100%;height:100%;fill:currentColor;font:600 10.5px var(--sans);letter-spacing:3px;text-transform:uppercase}
.badge-spin i{position:absolute;inset:0;display:grid;place-items:center;font-style:normal;color:var(--red)}
.picado{position:relative;display:flex;justify-content:center;height:72px;overflow:hidden;pointer-events:none}
.picado::before{content:"";position:absolute;left:0;right:0;top:6px;height:1px;background:var(--ink);opacity:.5}
.picado .flag{flex:0 0 58px;height:68px;margin-inline:-1px;transform-origin:50% 6px;animation:sway 3.2s var(--ease-io) infinite alternate;animation-delay:calc(var(--i)*-.27s)}
.picado .flag svg{width:100%;height:100%;display:block}
.picado .flag path{fill:var(--c)}
@keyframes sway{from{transform:rotate(-3.5deg)}to{transform:rotate(3.5deg)}}
.ticker{overflow:hidden;border-block:1px solid var(--line);padding:16px 0;font:500 .74rem/1 var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase}
.ticker-track{display:flex;align-items:center;gap:28px;width:max-content;animation:tick 48s linear infinite}
.ticker-track i{font-style:normal;color:var(--red);font-size:.8em}
@keyframes tick{to{transform:translateX(-50%)}}

/* ---------- Pill header ---------- */
.pill{position:fixed;z-index:100;top:14px;left:50%;transform:translateX(-50%);width:min(920px,calc(100% - 24px));height:64px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 8px;background:rgba(30,22,17,.96);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);color:var(--cream);border-radius:4px;transition:transform .6s var(--ease),background .4s}
.pill.is-hidden{transform:translate(-50%,-130%)}
.pill-book{justify-self:start;display:inline-flex;align-items:center;height:48px;padding:0 18px;border:1px solid rgba(245,236,221,.5);font:500 .7rem/1 var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;transition:background .3s,color .3s}
.pill-book:hover{background:var(--cream);color:var(--ink)}
.pill-logo{text-decoration:none}
.wordmark{display:inline-flex;align-items:center;gap:.35em;font:400 1.55rem/1 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 0,"opsz" 144;text-transform:uppercase;letter-spacing:.06em;white-space:nowrap}
.wordmark i{font-style:normal;font-size:.5em;color:var(--marigold)}
.pill-menu{justify-self:end;display:inline-flex;align-items:center;gap:14px;height:48px;padding:0 14px;background:none;border:0;cursor:pointer}
.pill-menu-label{font:500 .7rem/1 var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase}
.burger{position:relative;width:34px;height:12px}
.burger i{position:absolute;left:0;right:0;height:1.5px;background:currentColor;transition:transform .5s var(--ease),top .5s var(--ease)}
.burger i:first-child{top:0}.burger i:last-child{top:10px}
.pill-menu[aria-expanded=true] .burger i:first-child{top:5px;transform:rotate(20deg)}
.pill-menu[aria-expanded=true] .burger i:last-child{top:5px;transform:rotate(-20deg)}
@media (max-width:640px){.pill-book{padding:0 10px;font-size:.6rem;letter-spacing:.1em}.pill-menu-label{display:none}.wordmark{font-size:1.2rem}}

/* ---------- Overlay menu ---------- */
.overlay{position:fixed;inset:0;z-index:95;background:var(--red);color:var(--cream);clip-path:inset(0 0 100% 0);transition:clip-path .9s var(--ease-io);overflow:auto}
.overlay.is-open{clip-path:inset(0)}
.overlay .picado{position:absolute;top:84px;left:0;right:0}
.overlay .picado::before{background:var(--cream)}
.overlay-inner{width:var(--wrap);margin:0 auto;min-height:100%;display:grid;grid-template-columns:1.4fr 1fr;gap:40px;align-items:center;padding:clamp(130px,19svh,170px) 0 40px}
.overlay-nav{display:flex;flex-direction:column}
.overlay-nav a{display:grid;grid-template-columns:42px 1fr auto;align-items:baseline;gap:10px;padding:6px 0;border-bottom:1px solid rgba(245,236,221,.22);text-decoration:none;opacity:0;transform:translateY(40px);transition:opacity .6s,transform .9s var(--ease);transition-delay:calc(.25s + var(--i)*.06s)}
.overlay.is-open .overlay-nav a{opacity:1;transform:none}
.overlay-nav small{font:500 .7rem var(--sans);font-stretch:125%;letter-spacing:.14em;opacity:.7}
.overlay-nav span{font:380 min(clamp(2.2rem,1rem + 4.2vw,5.2rem),8.6svh)/1 var(--serif);font-variation-settings:"SOFT" 100,"opsz" 144;text-transform:uppercase;transition:transform .5s var(--ease),color .3s}
.overlay-nav em{font:italic 400 clamp(1rem,.8rem + .6vw,1.5rem) var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;opacity:.75}
.overlay-nav a:hover span,.overlay-nav a[aria-current] span{transform:translateX(14px);color:var(--marigold)}
.overlay-side{display:grid;gap:26px}
.overlay-img{aspect-ratio:4/3;overflow:hidden;background:var(--red-deep);transform:rotate(2deg);border:10px solid var(--cream);box-shadow:0 30px 60px rgba(0,0,0,.25)}
.overlay-img img{width:100%;height:100%;object-fit:cover;transition:opacity .35s}
.overlay-info{display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:.92rem}
.overlay-info a{text-decoration:none}
.overlay-info .open-status{grid-column:1/-1}
body.menu-open{overflow:hidden}
@media (max-width:900px){.overlay-inner{grid-template-columns:1fr;padding-top:150px}.overlay-side{display:none}}

/* ---------- Loader ---------- */
.loader{display:none}
.intro .loader{display:grid;place-items:center;position:fixed;inset:0;z-index:200;background:var(--red);color:var(--cream);clip-path:inset(0);transition:clip-path 1.1s var(--ease-io)}
.loader-inner{display:grid;justify-items:center;gap:18px}
.loader-stamp{padding:.7em 1.8em;border:2px solid var(--cream);border-radius:50%;transform:rotate(-8deg) scale(1.6);opacity:0;animation:stampin .7s .25s cubic-bezier(.3,1.6,.5,1) forwards}
.loader-stamp .wordmark{font-size:clamp(1.8rem,1rem + 3vw,3.4rem)}
.loader-sub{font:500 .72rem var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase;opacity:0;animation:fade .6s .9s forwards}
@keyframes stampin{to{opacity:1;transform:rotate(-8deg) scale(1)}}
@keyframes fade{to{opacity:.85}}
.intro.intro-out .loader{clip-path:inset(0 0 100% 0)}

/* ---------- Hero ---------- */
.hero{position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;padding-top:92px;overflow:hidden;cursor:crosshair}
.hero-inner{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;padding-block:30px 40px;z-index:50;pointer-events:none}
.hero-inner a{pointer-events:auto}
.hero-label{color:var(--ink-2);margin-bottom:clamp(22px,4vh,40px);opacity:0;transition:opacity 1s .2s}
.hero-title{font-size:min(clamp(3rem,.6rem + 7.6vw,8.4rem),13svh);color:var(--red);max-width:12.5ch;line-height:.9}
.hero-title .ln{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.04em}
.hero-title .ln>span{display:inline-block;transform:translateY(110%);transition:transform 1.3s var(--ease)}
.hero-title .ln:nth-of-type(2)>span{transition-delay:.08s}.hero-title .ln:nth-of-type(3)>span{transition-delay:.16s}.hero-title .ln:nth-of-type(4)>span{transition-delay:.24s}
.hero-stamp{position:relative;margin:clamp(14px,2.4vh,26px) 0 0 clamp(0px,22vw,380px);transform:rotate(-8deg) scale(0);transition:transform .6s 1.2s cubic-bezier(.3,1.6,.5,1)}
.hero-sticker{left:clamp(4%,10vw,16%);top:clamp(120px,24vh,240px);opacity:0;transition:opacity .6s 1.3s}
.hero-cta{display:flex;align-items:center;gap:28px;margin-top:clamp(20px,3.4vh,40px);opacity:0;transform:translateY(16px);transition:opacity .8s .9s,transform 1s .9s var(--ease)}
.is-ready .hero-title .ln>span{transform:none}
.is-ready .hero-label,.is-ready .hero-sticker{opacity:1}
.is-ready .hero-stamp{transform:rotate(-8deg) scale(1)}
.is-ready .hero-cta{opacity:1;transform:none}
.trail-img{position:absolute;z-index:1;width:clamp(150px,14vw,230px);aspect-ratio:1;object-fit:cover;pointer-events:none;border:7px solid var(--paper);box-shadow:0 18px 40px rgba(30,22,17,.22);transform:translate(-50%,-50%) scale(.6) rotate(var(--r));opacity:0;animation:trail 1.3s var(--ease) forwards}
@keyframes trail{12%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(var(--r))}70%{opacity:1}100%{opacity:0;transform:translate(-50%,-30%) scale(.92) rotate(var(--r))}}

/* ---------- Scroll-expanding photo ---------- */
.expand{position:relative;height:220vh}
.expand--short{height:180vh}
.expand-sticky{position:sticky;top:0;height:100svh;overflow:hidden;display:grid;place-items:center}
.expand-media{position:absolute;inset:0;clip-path:inset(var(--iy,22%) var(--ix,30%) round var(--rr,6px));will-change:clip-path}
.expand-media img{width:100%;height:100%;object-fit:cover;transform:scale(var(--s,1.25));will-change:transform}
.expand-copy{position:relative;z-index:2;color:var(--cream);text-align:center;opacity:var(--o,0);transform:translateY(calc((1 - var(--o,0))*30px))}
.expand-copy .label{margin-bottom:18px}
.expand-big{font-size:clamp(3rem,1rem + 8vw,10rem);text-shadow:0 4px 40px rgba(0,0,0,.45)}
.expand-sticky::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,14,10,calc(var(--o,0)*.35)),rgba(20,14,10,calc(var(--o,0)*.55)));pointer-events:none}
.expand-copy .label{text-shadow:0 1px 14px rgba(0,0,0,.55)}

/* ---------- Label rail (Ballena) ---------- */
.rail{display:grid;grid-template-columns:minmax(160px,1fr) 3fr;gap:clamp(20px,4vw,60px);padding-block:clamp(90px,13vw,190px)}
.rail--tight{padding-block:0 clamp(36px,5vw,60px)}
.rail-label{padding-top:.6em}
.rail-body .wide{max-width:22ch}
.rail-foot{display:grid;grid-template-columns:minmax(0,34ch) auto;gap:30px 60px;align-items:end;margin-top:clamp(36px,5vw,64px);color:var(--ink-2)}
.rail-row{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap}
.rail-note{max-width:36ch;color:var(--ink-2);font-size:.92rem}

/* ---------- Split blocks ---------- */
.split{display:grid;grid-template-columns:1fr 1fr;min-height:92svh}
.split--rev .split-media{order:2}
.split-media{overflow:hidden;position:relative}
.split-media img{width:100%;height:100%;object-fit:cover;transform:scale(1.08);transition:transform 1.6s var(--ease)}
.split-media.is-in img{transform:none}
.split-media--bw img{filter:grayscale(1) contrast(1.05)}
.split-block{display:flex;flex-direction:column;justify-content:flex-end;gap:22px;padding:clamp(32px,5vw,80px);color:var(--cream)}
.split-block p:not(.label):not(.split-quote):not(.split-big){max-width:44ch;opacity:.92}
.split-block--red{background:var(--red)}
.split-block--sage{background:var(--sage)}
.split-quote{font:italic 360 clamp(1.8rem,1rem + 2.6vw,3.6rem)/1.08 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144;max-width:16ch;margin-bottom:auto;padding-top:clamp(20px,6vw,90px)}
.split-big{font-size:clamp(2.6rem,1rem + 5vw,6.4rem);margin-bottom:auto;padding-top:clamp(20px,6vw,90px)}
.facts{list-style:none;padding:0;margin:10px 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.facts li{border-top:1px solid rgba(245,236,221,.35);padding-top:12px}
.facts strong{display:block;font:380 2.3rem/1 var(--serif);font-variation-settings:"SOFT" 100}
.facts span{font-size:.8rem;opacity:.8}

/* ---------- Carta scene (tilted paper menu) ---------- */
.carta-scene{position:relative;min-height:115svh;display:grid;place-items:center;overflow:hidden;padding:120px 20px}
.carta-bg{position:absolute;inset:-10% 0}
.carta-bg img{width:100%;height:100%;object-fit:cover}
.carta-scene::before{content:"";position:absolute;inset:0;background:rgba(30,22,17,.18);z-index:1}
.carta{position:relative;z-index:2;width:min(640px,100%);background:var(--paper);padding:14px;box-shadow:0 40px 90px rgba(30,22,17,.4);transform:rotate(var(--rot,-5deg)) translateY(var(--ty,0));will-change:transform}
.carta-frame{position:relative;border:1.5px solid var(--red);outline:1px solid var(--red);outline-offset:-7px;padding:clamp(26px,4vw,48px)}
.carta-head{display:flex;justify-content:space-between;align-items:center;color:var(--red);margin-bottom:12px}
.carta-kicker{font:600 .74rem/1.2 var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase;color:var(--red)}
.carta-num{font:italic 700 1.1rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1}
.carta-title{font-size:clamp(2rem,1.2rem + 2.6vw,3.4rem);color:var(--red);margin-bottom:22px}
.carta-title em{font-style:italic;font-weight:360;text-transform:none;font-variation-settings:"SOFT" 100,"WONK" 1}
.carta-list{list-style:none;padding:0;margin:0;border-top:1px solid var(--red)}
.carta-list a{display:grid;grid-template-columns:1fr auto 54px;grid-template-rows:auto auto;align-items:center;column-gap:16px;padding:14px 0;border-bottom:1px solid var(--red);text-decoration:none;color:var(--red);position:relative}
.carta-name{font:italic 400 clamp(1.3rem,1rem + 1vw,1.8rem)/1.1 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;transition:transform .45s var(--ease)}
.carta-course{grid-column:1;grid-row:2;font:500 .66rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.carta-price{grid-column:2;grid-row:1/3;font:400 1.2rem var(--serif)}
.carta-go{grid-column:3;grid-row:1/3;align-self:stretch;display:grid;place-items:center;border-left:1px solid var(--red)}
.carta-go .arr{background:var(--red)}
.carta-list a:hover .carta-name{transform:translateX(10px)}
.carta-all{display:inline-block;margin-top:22px;font:500 .74rem var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase;color:var(--red)}
.carta-stamp{right:-30px;top:-26px;color:var(--red);background:var(--paper)}

/* ---------- Green band + polaroids ---------- */
.green{position:relative;background:var(--sage);color:var(--cream);padding-block:clamp(90px,12vw,170px) clamp(80px,10vw,140px);overflow:hidden}
.green--short{padding-block:clamp(70px,9vw,120px)}
.green-head{text-align:center;position:relative}
.green-head>p{max-width:52ch;margin:28px auto 0;opacity:.9}
.green-stamp{left:50%;margin-left:clamp(120px,22vw,380px);top:62%;color:var(--cream);background:var(--sage);transform:rotate(-10deg)}
.green-sticker{right:6%;bottom:22%}
.polaroids{margin-top:clamp(50px,7vw,90px);overflow:hidden}
.polaroids-track{display:flex;gap:clamp(18px,2.6vw,40px);width:max-content;padding:30px 0;animation:tick 80s linear infinite}
.polaroids:hover .polaroids-track{animation-play-state:paused}
.polaroids--static .polaroids-track{animation:none;width:auto;justify-content:center;flex-wrap:wrap;padding-inline:20px}
.polaroid{flex:0 0 clamp(210px,19vw,290px);background:var(--paper);padding:12px 12px 16px;color:var(--ink);text-decoration:none;transform:rotate(var(--r));box-shadow:0 18px 40px rgba(20,30,20,.25);transition:transform .5s var(--ease)}
.polaroid:hover{transform:rotate(0) translateY(-10px) scale(1.03)}
.polaroid img{width:100%;aspect-ratio:1;object-fit:cover}
.polaroid span{display:block;margin-top:12px;font:italic 400 1.05rem/1.2 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;text-align:center}

/* ---------- Experiences slider ---------- */
.exp{padding-block:clamp(90px,12vw,170px) 0}
.exp-track{display:grid;grid-auto-flow:column;grid-auto-columns:clamp(260px,31%,460px);gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:4px}
.exp-track::-webkit-scrollbar{display:none}
.exp-card{position:relative;aspect-ratio:3/4.1;overflow:hidden;scroll-snap-align:start;color:var(--cream);text-decoration:none;border-radius:6px}
.exp-card img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease)}
.exp-card.is-bw img{filter:grayscale(1)}
.exp-card:hover img{transform:scale(1.06)}
.exp-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(20,14,10,.7))}
.exp-cap{position:absolute;z-index:1;left:0;right:0;bottom:0;padding:26px;display:grid;justify-items:center;gap:6px;text-align:center}
.exp-cap strong{font:380 clamp(1.6rem,1.1rem + 1.2vw,2.3rem)/1 var(--serif);font-variation-settings:"SOFT" 100;text-transform:uppercase}
.exp-cap span{font-size:.92rem;opacity:.9;max-width:26ch}
.exp-cap em{font:500 .72rem var(--sans);font-style:normal;font-stretch:125%;letter-spacing:.16em;text-transform:uppercase;display:inline-flex;align-items:center;gap:.6em;margin-top:10px}
.exp-cap .arr{background:var(--cream)} .exp-cap .arr svg{color:var(--ink)}
.exp-nav{display:flex;align-items:center;gap:20px;width:max-content;margin:32px auto 0;border:1px solid var(--line);border-radius:999px;padding:8px 14px}
.exp-nav button{background:none;border:0;font-size:1.3rem;cursor:pointer;padding:4px 10px}
.exp-bar{width:120px;height:1px;background:var(--line);position:relative}
.exp-bar i{position:absolute;left:0;top:-.5px;height:2px;width:30%;background:var(--ink);transition:transform .3s}

/* ---------- Book scene + ticket ---------- */
.book-scene{position:relative;min-height:110svh;display:grid;place-items:center;overflow:hidden;padding:140px 20px;margin-top:clamp(90px,12vw,170px)}
.book-scene--short{min-height:auto;padding:110px 20px;margin-top:0}
.book-bg{position:absolute;inset:-10% 0}
.book-bg img{width:100%;height:100%;object-fit:cover}
.ticket{position:relative;z-index:2;width:min(520px,100%);background:var(--paper);padding:clamp(28px,4vw,44px);padding-top:clamp(40px,5vw,56px);text-align:center;transform:rotate(-3deg);box-shadow:0 40px 90px rgba(30,22,17,.35);color:var(--red)}
.ticket-edge{position:absolute;left:0;right:0;top:0;height:14px;background:conic-gradient(var(--red) 25%,transparent 0 50%,var(--red) 0 75%,transparent 0) 0 0/14px 14px;opacity:.95}
.ticket-kicker{font:italic 600 1rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:.2em;text-transform:uppercase}
.ticket-title{font:380 clamp(2.4rem,1.4rem + 3vw,4rem)/.92 var(--serif);font-variation-settings:"SOFT" 100,"opsz" 144;text-transform:uppercase;margin:8px 0 24px}
.ticket-stamp{right:-22px;top:-26px;color:var(--red);background:var(--paper)}
.ticket-rows{text-align:left;border-top:1px solid var(--red);margin-bottom:26px}
.ticket-rows label{display:grid;grid-template-columns:130px 1fr;align-items:center;border-bottom:1px solid var(--red)}
.ticket-rows label>span{font:500 .68rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;padding:16px 0;border-right:1px solid var(--red)}
.ticket-rows i{font:italic 400 .9rem var(--serif);margin-right:8px}
.ticket-rows select,.ticket-rows input{border:0;background:transparent;min-height:54px;padding:0 14px;color:var(--ink);font:italic 400 1.15rem var(--serif);font-variation-settings:"SOFT" 100;width:100%;color-scheme:light}
.ticket-note{margin-top:16px;font-size:.84rem;color:var(--ink-2)}
.ticket--home{transform:rotate(-3deg) translateY(var(--ty,0))}

/* ---------- Journal ---------- */
.journal{padding-block:clamp(90px,12vw,170px)}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,2.4vw,34px)}
.pcard h3{font:380 clamp(1.4rem,1.1rem + .9vw,1.9rem)/1.08 var(--serif);font-variation-settings:"SOFT" 100;margin:8px 0 10px}
.pcard h3 a{text-decoration:none}
.pcard>p:last-child{color:var(--ink-2);font-size:.94rem}
.pcard-img{display:block;position:relative;aspect-ratio:4/3;overflow:hidden;margin-bottom:16px;border-radius:4px}
.pcard-img img{width:100%;height:100%;object-fit:cover;filter:grayscale(1);transition:filter .8s,transform 1.4s var(--ease)}
.pcard:hover .pcard-img img,.feature:hover .feature-img img{filter:none;transform:scale(1.04)}
.pcard-cat{position:absolute;left:14px;top:14px;background:var(--cream);color:var(--red);font:italic 700 .9rem/1 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;text-transform:uppercase;padding:.55em 1em;border-radius:50%;border:1.5px solid var(--red);transform:rotate(-8deg)}
.pcard-meta{font:500 .68rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}

/* ---------- Page head ---------- */
.phead{position:relative;padding-top:88px;text-align:center}
.phead-inner{position:relative;padding-block:clamp(30px,5vw,70px) clamp(50px,7vw,100px);display:flex;flex-direction:column;align-items:center}
.phead .label{color:var(--ink-2);margin-bottom:clamp(18px,3vw,34px)}
.phead .mega{max-width:14ch}
.phead-stamp{position:relative;margin-top:18px;margin-left:clamp(0px,24vw,420px);transform:rotate(-8deg);color:var(--red)}
.phead-lead{max-width:56ch;margin-top:clamp(24px,3vw,40px);color:var(--ink-2);font-size:clamp(1rem,.95rem + .3vw,1.18rem)}
.crumbs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;font:500 .68rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin-bottom:22px}
.crumbs a{text-decoration:none}.crumbs a:hover{color:var(--red)}
.crumbs span:not([aria-current]){color:var(--red)}
.crumbs [aria-current]{color:var(--ink)}

/* ---------- Menu sheet ---------- */
.mbar{position:sticky;top:86px;z-index:20;display:flex;justify-content:space-between;align-items:center;gap:16px;width:min(1180px,calc(100% - 24px));margin:0 auto 40px;padding:8px;background:var(--ink);color:var(--cream);border-radius:4px;overflow-x:auto;scrollbar-width:none}
.mbar-tabs,.mbar-filter,.cat-filter{display:flex;gap:4px;flex-shrink:0}
.mbar a,.mbar button,.cat-filter button{font:500 .66rem/1 var(--sans);font-stretch:125%;letter-spacing:.12em;text-transform:uppercase;padding:12px 12px;text-decoration:none;white-space:nowrap;background:transparent;border:0;cursor:pointer;color:inherit;border-radius:3px;transition:background .3s,color .3s}
.mbar a.is-active{background:var(--cream);color:var(--ink)}
.mbar button[aria-pressed=true]{background:var(--red)}
.cat-filter{justify-content:center;flex-wrap:wrap;margin-bottom:40px}
.cat-filter button{border:1px solid var(--line);padding:12px 16px}
.cat-filter button[aria-pressed=true]{background:var(--red);color:var(--cream);border-color:var(--red)}
.sheet{padding-bottom:clamp(90px,11vw,150px)}
.sheet-frame{position:relative;background:var(--paper);padding:clamp(22px,5vw,80px);border:1.5px solid var(--red);outline:1px solid var(--red);outline-offset:-10px;box-shadow:0 30px 80px rgba(30,22,17,.08)}
.msec{display:grid;grid-template-columns:minmax(200px,.8fr) 2fr;gap:clamp(20px,5vw,80px);padding-block:clamp(36px,5vw,70px);border-bottom:1px dashed var(--line)}
.msec:last-of-type{border-bottom:0}
.msec-head{position:sticky;top:170px;align-self:start}
.msec-num{font:italic 700 1rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;color:var(--red)}
.msec-title{font:380 clamp(2.2rem,1.4rem + 2.4vw,4rem)/.95 var(--serif);font-variation-settings:"SOFT" 100,"opsz" 144;text-transform:uppercase;color:var(--red);margin:6px 0 12px}
.msec-head p{color:var(--ink-2);font-size:.92rem;max-width:28ch}
.mrows{list-style:none;margin:0;padding:0}
.mrows li[hidden]{display:none}
.mrow{display:grid;grid-template-columns:auto 1fr;column-gap:18px;padding:20px 0;border-bottom:1px solid var(--line);text-decoration:none}
.mrow-thumb{grid-row:1/3;width:68px;height:68px;overflow:hidden;border-radius:3px}
.mrow-thumb img{width:100%;height:100%;object-fit:cover}
.mrow-top{display:flex;align-items:baseline;gap:12px}
.mrow-name{font:italic 400 clamp(1.3rem,1.1rem + .7vw,1.75rem)/1.15 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;transition:color .3s,transform .45s var(--ease)}
.mrow-dots{flex:1;border-bottom:1.5px dotted var(--mute);transform:translateY(-.3em);min-width:30px}
.mrow-price{font:400 1.25rem var(--serif);color:var(--red)}
.mrow-desc{color:var(--ink-2);font-size:.92rem;margin-top:4px;max-width:60ch}
.mrow:hover .mrow-name{color:var(--red);transform:translateX(8px)}
.tags{display:inline-flex;gap:4px;vertical-align:middle;margin-left:4px}
.diet{font:600 .58rem/1 var(--sans);text-decoration:none;border:1px solid var(--sage);color:var(--sage-deep);border-radius:50%;padding:5px 4px;cursor:help}
.spice{color:var(--red);font-size:.7rem;letter-spacing:1px}
.sheet-note{margin-top:30px;font-size:.84rem;color:var(--mute);text-align:center}
.sheet-sticker{right:-30px;top:-40px}
.menu-empty{text-align:center;padding:40px;color:var(--mute)}
@media (hover:hover) and (min-width:901px){.mrow-thumb{display:none}.mrow{grid-template-columns:1fr}}
.cursor-preview{position:fixed;top:0;left:0;z-index:70;width:240px;aspect-ratio:1;pointer-events:none;opacity:0;background:var(--paper);padding:8px;box-shadow:0 30px 60px rgba(30,22,17,.3);transform:translate3d(-50%,-50%,0) scale(.6);transition:opacity .3s}
.cursor-preview.is-on{opacity:1}
.cursor-preview img{width:100%;height:100%;object-fit:cover}
@media (hover:none),(max-width:900px){.cursor-preview{display:none}}

/* ---------- Dish single ---------- */
.picado--top{margin-top:84px}
.dish{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,6vw,100px);padding-block:clamp(20px,3vw,40px) clamp(80px,10vw,140px)}
.dish-media{position:relative}
.dish-photo{position:sticky;top:110px;background:var(--paper);padding:14px 14px 50px;transform:rotate(-2deg);box-shadow:0 30px 70px rgba(30,22,17,.18)}
.dish-photo img{width:100%;aspect-ratio:1;object-fit:cover}
.dish-photo-cap{position:absolute;left:0;right:0;bottom:14px;text-align:center;font:italic 400 1.2rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;color:var(--red)}
.dish-sticker{right:-20px;top:-30px}
.dish-info .crumbs{justify-content:flex-start}
.dish-title{font-size:clamp(2.8rem,1rem + 5.4vw,6.6rem);color:var(--red);margin-bottom:24px}
.dish-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding-bottom:24px;margin-bottom:26px;border-bottom:1px solid var(--line)}
.dish-price{font:380 2.6rem/1 var(--serif);font-variation-settings:"SOFT" 100;color:var(--red);margin-right:10px}
.tag{border:1px solid var(--ink);border-radius:999px;padding:7px 13px;font:500 .66rem var(--sans);font-stretch:125%;letter-spacing:.12em;text-transform:uppercase}
.tag-spice{border-color:var(--red);color:var(--red)} .tag-spice b{opacity:.25;font-weight:400}
.dish-lead{font-size:clamp(1.05rem,1rem + .35vw,1.25rem);line-height:1.65;color:var(--ink-2)}
.dish-block{margin-block:32px}
.dish-block .label{margin-bottom:14px;color:var(--red)}
.ingredients{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:8px}
.ingredients li{background:var(--cream-2);padding:9px 14px;font-size:.88rem;border-radius:999px}
.pairing{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;padding:14px;background:var(--paper);border:1px solid var(--line);text-decoration:none;transition:border-color .3s}
.pairing:hover{border-color:var(--red)}
.pairing-img{width:62px;height:62px;overflow:hidden}.pairing-img img{width:100%;height:100%;object-fit:cover}
.pairing small{display:block;font:500 .64rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}
.pairing strong{font:italic 400 1.3rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1}
.pairing-price{font:400 1.2rem var(--serif);color:var(--red)}
.qr-ticket{display:grid;grid-template-columns:140px 1fr;gap:24px;align-items:center;margin-block:32px;padding:22px;background:var(--ink);color:var(--cream);position:relative;-webkit-mask:radial-gradient(circle 10px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 10px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat;mask:radial-gradient(circle 10px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 10px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat}
.qr-code{width:140px;height:140px;background:var(--cream);color:var(--ink);padding:10px}
.qr-code svg{width:100%;height:100%;display:block}
.qr-body .label{color:var(--marigold);margin-bottom:8px}
.qr-body p:not(.label){font-size:.9rem;opacity:.85;margin-bottom:14px}
.qr-body .btn{background:var(--cream);color:var(--ink);border-color:var(--cream)}
.qr-body .btn::before{background:var(--marigold)}
.qr-body .form-msg{margin-top:10px;font-size:.86rem}
.dish-actions{display:flex;flex-wrap:wrap;align-items:center;gap:24px;margin-top:8px}
.dish-pager{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:44px;padding-top:24px;border-top:1px solid var(--line)}
.dish-pager a{text-decoration:none;font:italic 400 1.2rem/1.2 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1}
.dish-pager a[rel=next]{text-align:right}
.dish-pager small{display:block;font:500 .64rem/2 var(--sans);font-style:normal;font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}

/* ---------- Forms ---------- */
.field{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.field .label{font-size:.66rem;color:var(--ink-2)}
.label small{text-transform:none;letter-spacing:0;font-stretch:100%;opacity:.8}
input:not([type=checkbox]):not([type=radio]),select,textarea{width:100%;min-height:52px;padding:12px 14px;border:1px solid var(--line);border-radius:0;background:var(--paper);transition:border-color .3s;color-scheme:light}
textarea{resize:vertical;min-height:110px}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--red)}
.is-invalid{border-color:var(--red)!important;background:#f8e3dc!important}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:0 14px}
.check{display:flex;gap:10px;align-items:center;font-size:.9rem;margin-bottom:20px;cursor:pointer}
.check input{width:18px;height:18px;accent-color:var(--red)}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chips button{min-width:48px;height:48px;padding:0 14px;border:1px solid var(--line);background:var(--paper);cursor:pointer;font:italic 400 1.15rem var(--serif);font-variation-settings:"SOFT" 100;transition:all .25s}
.chips-wide button{font:500 .7rem var(--sans);font-stretch:125%;letter-spacing:.1em;text-transform:uppercase}
.chips button:hover{border-color:var(--red)}
.chips button[aria-checked=true]{background:var(--red);color:var(--cream);border-color:var(--red)}
.form-msg{font-size:.9rem;margin-top:12px;min-height:1.4em}
.form-msg.ok{color:var(--sage-deep)}.form-msg.err{color:var(--red)}
.qr-body .form-msg.ok{color:var(--marigold)}
.paper-form{position:relative;background:var(--paper);padding:clamp(28px,4vw,48px);padding-top:clamp(40px,5vw,60px);box-shadow:0 30px 70px rgba(30,22,17,.12)}
.paper-title{font:380 clamp(2rem,1.4rem + 2vw,3rem)/1 var(--serif);font-variation-settings:"SOFT" 100;text-transform:uppercase;color:var(--red);margin:6px 0 26px}
.form-sent{text-align:center;padding:30px 10px}
.form-sent h3{font:380 2.4rem/1 var(--serif);font-variation-settings:"SOFT" 100;text-transform:uppercase;color:var(--red);margin:20px 0 12px}
.form-sent .stamp{position:relative;transform:rotate(-8deg)}

/* ---------- Booking ---------- */
.book{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(30px,5vw,80px);align-items:start;padding-bottom:clamp(90px,11vw,150px)}
.book>*{min-width:0}
.book-photo{aspect-ratio:4/5;overflow:hidden;background:var(--paper);padding:12px;transform:rotate(-2deg);box-shadow:0 30px 70px rgba(30,22,17,.15)}
.book-photo img{width:100%;height:100%;object-fit:cover}
.book-notes{list-style:none;padding:0;margin:44px 0 0;display:grid;gap:16px}
.book-notes li{display:grid;grid-template-columns:36px 1fr;gap:8px;font-size:.92rem;color:var(--ink-2);padding-top:14px;border-top:1px solid var(--line)}
.book-notes i{font:italic 700 1rem var(--serif);color:var(--red)}
.book-notes strong{color:var(--ink)}
.booking{position:relative;background:var(--paper);padding:clamp(24px,3.4vw,46px);padding-top:clamp(40px,5vw,60px);box-shadow:0 30px 80px rgba(30,22,17,.12)}
.booking-steps{display:flex;gap:6px;list-style:none;padding:0;margin:0 0 30px;counter-reset:s}
.booking-steps li{flex:1;font:500 .64rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);padding-top:12px;border-top:2px solid var(--line);counter-increment:s;transition:all .4s}
.booking-steps li::before{content:"0" counter(s) "  ";font:italic 700 .9rem var(--serif);margin-right:6px}
.booking-steps li.is-active,.booking-steps li.is-done{color:var(--red);border-color:var(--red)}
.booking-pane{border:0;padding:0;margin:0;min-width:0;animation:pane .6s var(--ease)}
@keyframes pane{from{opacity:0;transform:translateX(24px)}}
.date-strip{display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;scroll-snap-type:x proximity;scrollbar-width:thin}
.date-strip button{flex:0 0 64px;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 0;border:1px solid var(--line);background:var(--cream);cursor:pointer;scroll-snap-align:start;transition:all .25s}
.date-strip small{font:500 .58rem var(--sans);font-stretch:125%;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.date-strip strong{font:380 1.6rem/1.1 var(--serif);font-variation-settings:"SOFT" 100}
.date-strip button:hover{border-color:var(--red)}
.date-strip button[aria-checked=true]{background:var(--red);border-color:var(--red);color:var(--cream)}
.date-strip button[aria-checked=true] small{color:var(--cream)}
.slots{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:6px}
.slots button{height:46px;border:1px solid var(--line);background:var(--cream);cursor:pointer;font:italic 400 1.05rem var(--serif);font-variation-settings:"SOFT" 100;transition:all .25s}
.slots button:hover:not(:disabled){border-color:var(--red)}
.slots button[aria-checked=true]{background:var(--ink);color:var(--cream);border-color:var(--ink)}
.slots button:disabled{opacity:.3;text-decoration:line-through;cursor:not-allowed}
.slots-empty{grid-column:1/-1;color:var(--mute);font-size:.9rem}
.booking-summary{background:var(--cream-2);padding:14px 16px;font-size:.92rem;margin-bottom:22px}
.booking-summary strong{color:var(--red)}
.booking-nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
.booking-nav .btn{flex:1}
.booking-done{text-align:center;padding-top:20px}
.done-stamp{position:relative;transform:rotate(-10deg);color:var(--red);font-size:1.4rem;animation:stampin2 .7s cubic-bezier(.3,1.6,.5,1)}
@keyframes stampin2{from{transform:rotate(-10deg) scale(2);opacity:0}}
.done-title{font:380 clamp(2.4rem,1.6rem + 2.4vw,3.8rem)/1 var(--serif);font-variation-settings:"SOFT" 100;text-transform:uppercase;color:var(--red);margin:26px 0 12px}
.booking-done>p{color:var(--ink-2)}
.done-list{display:grid;grid-template-columns:auto 1fr;gap:10px 20px;text-align:left;border-top:1px solid var(--red);border-bottom:1px solid var(--red);padding:18px 4px;margin:22px 0}
.done-list dt{font:500 .64rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);padding-top:4px}
.done-list dd{margin:0;font:italic 400 1.15rem var(--serif);font-variation-settings:"SOFT" 100}
.booking-done .linklike{margin-top:18px;font-size:.86rem;color:var(--mute)}

/* ---------- Catering ---------- */
.pk{padding-block:clamp(90px,12vw,170px)}
.pk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2.4vw,34px);align-items:start}
.pk-card{position:relative;background:var(--paper);padding:clamp(26px,3vw,40px);border:1.5px solid var(--red);outline:1px solid var(--red);outline-offset:-8px;transform:rotate(var(--r));transition:transform .6s var(--ease);color:var(--ink)}
.pk-card:hover{transform:rotate(0) translateY(-8px)}
.pk-card.is-featured{background:var(--red);color:var(--cream);outline-color:var(--cream);border-color:var(--red)}
.pk-card.is-featured .carta-kicker{color:var(--marigold)}
.pk-card h3{font:380 clamp(2.2rem,1.6rem + 1.6vw,3.2rem)/1 var(--serif);font-variation-settings:"SOFT" 100;text-transform:uppercase;margin:8px 0 14px}
.pk-price strong{font:380 2.2rem var(--serif);font-variation-settings:"SOFT" 100}
.pk-min{font:500 .66rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;margin:6px 0 14px;opacity:.75}
.pk-desc{font-style:italic;font-family:var(--serif);font-size:1.1rem;margin-bottom:16px}
.pk-card ul{list-style:none;padding:0;margin:0 0 26px;display:grid;gap:10px;font-size:.92rem}
.pk-card li{padding-left:22px;position:relative}
.pk-card li::before{content:"✦";position:absolute;left:0;top:.2em;font-size:.7rem;color:var(--red)}
.pk-card.is-featured li::before{color:var(--marigold)}
.pk-card.is-featured .btn{background:var(--cream);color:var(--red);border-color:var(--cream)}
.pk-card.is-featured .btn .arr{background:var(--red)} .pk-card.is-featured .btn .arr svg{color:var(--cream)}
.pk-stamp{right:-18px;top:-22px;color:var(--red);background:var(--cream)}
.steps{padding-bottom:clamp(90px,12vw,170px)}
.steps-list{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.steps-list li{border-top:1px solid var(--ink);padding-top:22px}
.step-n{font:italic 400 3rem/1 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;color:var(--red)}
.steps-list h3{font:500 .9rem var(--sans);font-stretch:125%;letter-spacing:.08em;text-transform:uppercase;margin:16px 0 10px}
.steps-list p{color:var(--ink-2);font-size:.92rem}
.enquire{display:grid;grid-template-columns:1fr 1.15fr;gap:clamp(30px,6vw,90px);padding-block:clamp(90px,12vw,170px);align-items:start}
.enquire-intro .wide{margin:16px 0 24px}
.enquire-intro>p{color:var(--ink-2)}
.faq{margin-top:40px;border-top:1px solid var(--ink)}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{cursor:pointer;list-style:none;padding:20px 34px 20px 0;position:relative;font:italic 400 1.25rem/1.2 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";position:absolute;right:4px;top:16px;font:300 1.6rem var(--sans);color:var(--red);transition:transform .4s var(--ease)}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq details p{color:var(--ink-2);padding-bottom:20px}

/* ---------- Blog ---------- */
.blog{padding-bottom:clamp(90px,11vw,150px)}
.feature{display:grid;grid-template-columns:1.4fr 1fr;gap:clamp(24px,4vw,60px);align-items:center;text-decoration:none;margin-bottom:clamp(60px,7vw,100px)}
.feature-img{display:block;aspect-ratio:16/11;overflow:hidden;border-radius:4px}
.feature-img img{width:100%;height:100%;object-fit:cover;filter:grayscale(1);transition:filter .8s,transform 1.4s var(--ease)}
.feature-body{display:grid;gap:18px;justify-items:start}
.feature-body .pcard-cat{position:relative;left:auto;top:auto}
.feature-title{font:380 clamp(2.2rem,1.4rem + 2.6vw,4rem)/.98 var(--serif);font-variation-settings:"SOFT" 100;text-transform:uppercase;color:var(--red)}
.feature-ex{color:var(--ink-2)}
.post-head{text-align:center;padding-block:clamp(10px,2vw,30px) clamp(40px,5vw,70px);display:flex;flex-direction:column;align-items:center}
.post-head .label{color:var(--ink-2);margin-bottom:24px}
.post-head .mega{max-width:16ch}
.post-hero{margin:0 auto clamp(50px,7vw,100px);width:min(1360px,calc(100% - 32px));aspect-ratio:16/8;overflow:hidden;border-radius:4px}
.post-hero img{width:100%;height:100%;object-fit:cover}
.post-body{width:min(720px,calc(100% - 40px));margin:0 auto;font-size:clamp(1.05rem,1rem + .25vw,1.18rem);line-height:1.8;color:var(--ink-2)}
.post-body p{margin-bottom:1.1em}
.post-body h2{font:380 clamp(1.8rem,1.3rem + 1.4vw,2.6rem)/1.05 var(--serif);font-variation-settings:"SOFT" 100;text-transform:uppercase;color:var(--red);margin:1.8em 0 .6em}
.post-body>p:first-child::first-letter{float:left;font:380 4.8em/.78 var(--serif);font-variation-settings:"SOFT" 100;margin:.06em .1em 0 0;color:var(--red)}
.post-body blockquote{margin:2em 0;padding:30px 0;border-block:1.5px solid var(--red);text-align:center}
.post-body blockquote p{font:italic 360 clamp(1.7rem,1.2rem + 1.6vw,2.6rem)/1.15 var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;color:var(--red);margin:0}
.post-foot{margin-top:60px;padding-top:30px;border-top:1px solid var(--line);display:grid;gap:26px}
.share{display:flex;flex-wrap:wrap;gap:10px 20px;align-items:center;font-size:.9rem}
.author{display:flex;gap:18px;align-items:center;background:var(--paper);padding:18px}
.author-stamp{padding:.6em 1.1em;border:1.5px solid var(--red);border-radius:50%;color:var(--red);transform:rotate(-8deg)}
.author-stamp .wordmark{font-size:.9rem}
.author p{margin:0;font-size:.88rem}

/* ---------- About ---------- */
.lot{padding-block:clamp(90px,12vw,170px)}
.lot-grid{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.lot-card{position:relative;background:var(--paper);border:1.5px solid var(--red);outline:1px solid var(--red);outline-offset:-7px;padding:26px 20px 24px;transform:rotate(var(--r));transition:transform .5s var(--ease);min-height:330px;display:flex;flex-direction:column}
.lot-card:hover{transform:rotate(0) translateY(-8px)}
.lot-no{font:italic 700 .9rem var(--serif);color:var(--red)}
.lot-year{font:380 3rem/1 var(--serif);font-variation-settings:"SOFT" 100;color:var(--red);margin:18px 0 auto}
.lot-card h3{font:italic 400 1.5rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;margin:20px 0 8px;text-transform:uppercase;font-style:normal;font-size:1.2rem;letter-spacing:.04em}
.lot-card p{font-size:.88rem;color:var(--ink-2)}
.contact{background:var(--sage);color:var(--cream);padding-block:clamp(90px,12vw,170px)}
.contact-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:clamp(30px,6vw,90px)}
.contact-info .mega{font-size:clamp(2.6rem,1.2rem + 4vw,5.6rem);margin:18px 0 26px}
.open-badge{display:inline-block;background:var(--cream);color:var(--ink);border-radius:999px;padding:9px 18px;font:500 .7rem var(--sans);font-stretch:125%;letter-spacing:.12em;text-transform:uppercase;margin-bottom:22px}
.contact address{font-style:normal;margin-bottom:16px;font:italic 400 1.3rem/1.35 var(--serif);font-variation-settings:"SOFT" 100}
.contact a{text-decoration-color:rgba(245,236,221,.5)}
.hours{list-style:none;padding:0;margin:22px 0}
.hours li{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid rgba(245,236,221,.25);font-size:.92rem}
.hours li span:last-child{text-align:right}
.hours small{display:block;opacity:.75;font-size:.78rem}
.hours li.is-today{font-weight:600}
.hours li.is-today span:first-child::after{content:" ✦ today";color:var(--marigold)}
.getting{font-size:.9rem;opacity:.85}
.contact-side{display:grid;gap:24px;align-content:start}
.contact .paper-form{color:var(--ink)}
.map{position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--cream-2);border:10px solid var(--paper)}
.map-art,.map iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.map-art svg{width:100%;height:100%}
.map-pin{position:absolute;left:52%;top:42%}
.map-stamp{position:relative;color:var(--red);background:var(--paper);animation:bob 2.4s var(--ease-io) infinite alternate}
@keyframes bob{to{translate:0 -8px}}
.map-load{position:absolute;left:50%;bottom:16px;transform:translateX(-50%)}
.map-link{position:absolute;right:12px;top:12px;font:500 .62rem var(--sans);font-stretch:125%;letter-spacing:.1em;text-transform:uppercase;background:var(--ink);color:var(--cream)!important;padding:8px 10px;text-decoration:none}
.map.is-live .map-art,.map.is-live .map-load{display:none}

/* ---------- Status ---------- */
.open-status::before,.open-badge::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--mute);margin-right:10px;vertical-align:middle}
.is-open.open-status::before,.is-open.open-badge::before{background:#6fbf73;box-shadow:0 0 0 4px rgba(111,191,115,.25)}

/* ---------- Footer ---------- */
.foot{padding:clamp(20px,3vw,40px) 0 20px;position:relative}
.ticker--foot{margin-bottom:clamp(40px,5vw,70px)}
.foot-frame{width:var(--wrap);margin:0 auto;background:var(--paper);border:1.5px solid var(--red);outline:1px solid var(--red);outline-offset:-9px;color:var(--red)}
.foot-stamps{position:relative;height:clamp(300px,32vw,440px);overflow:hidden;cursor:pointer;border-bottom:1px solid var(--red)}
.foot-stamp{position:absolute;left:var(--x);top:var(--y);transform:translate(-50%,-50%) rotate(var(--r));padding:.5em 1em;border:3px solid currentColor;color:var(--red);opacity:.22;user-select:none}
.foot-stamp .wordmark{font-size:clamp(1.6rem,1rem + 2.4vw,3.4rem)}
.foot-stamp.is-main{opacity:.9}
.foot-stamp.is-new{animation:stampin3 .5s cubic-bezier(.3,1.6,.5,1)}
@keyframes stampin3{from{transform:translate(-50%,-50%) rotate(var(--r)) scale(1.8);opacity:0}}
.foot-clic{position:absolute;right:6%;top:8%;width:90px;height:90px;border-radius:50%;border:1.5px solid var(--red);display:grid;place-items:center;font:italic 700 1.1rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;transform:rotate(-14deg);pointer-events:none}
.foot-cta{position:absolute;left:0;right:0;bottom:24px;display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;font:italic 400 1.2rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;color:var(--ink);pointer-events:none}
.foot-cta a{pointer-events:auto}
.foot-grid{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--red)}
.foot-grid>div{padding:28px;border-right:1px solid var(--red);color:var(--ink);font-size:.9rem}
.foot-grid>div:last-child{border-right:0}
.foot-grid h3{font:500 .66rem var(--sans);font-stretch:125%;letter-spacing:.16em;text-transform:uppercase;color:var(--red);margin-bottom:14px}
.foot-grid a{text-decoration:none}.foot-grid a:hover{color:var(--red)}
.foot-grid .link-arr{margin-top:14px;color:var(--red)}
.foot-grid .link-arr .arr{background:var(--red)}
.hours-compact{margin:0}
.hours-compact li{padding:3px 0;border:0;font-size:.82rem}
.hours-compact small{display:none}
.hours-compact li.is-today span:first-child::after{color:var(--red)}
.newsletter{display:grid;grid-template-columns:1fr auto;border-bottom:1px solid var(--red)}
.newsletter input:not([type=checkbox]){border:0;background:transparent;padding:10px 0;min-height:44px}
.newsletter button{background:none;border:0;cursor:pointer;color:var(--red)}
.newsletter button .arr{background:var(--red)}
.newsletter .form-msg{grid-column:1/-1;margin:8px 0 0;font-size:.82rem}
.foot-links{display:grid;grid-template-columns:repeat(6,1fr);border-bottom:1px solid var(--red)}
.foot-links a{padding:18px 10px;text-align:center;font:500 .7rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;border-right:1px solid var(--red);transition:background .3s,color .3s}
.foot-links a:last-child{border-right:0}
.foot-links a:hover{background:var(--red);color:var(--cream)}
.foot-legal{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:16px 24px;font-size:.78rem;color:var(--ink-2)}
.foot-legal span:last-child{display:flex;gap:18px}
.foot-legal a{text-decoration:none}

/* ---------- Cookie (Amici-style paper) ---------- */
.cookie{position:fixed;z-index:96;left:16px;bottom:16px;width:min(400px,calc(100% - 32px));background:var(--paper);color:var(--ink);padding:22px 24px;border:1.5px solid var(--red);outline:1px solid var(--red);outline-offset:-7px;box-shadow:0 20px 50px rgba(30,22,17,.2);transform:translateY(20px) rotate(-1deg);opacity:0;transition:transform .7s var(--ease),opacity .5s}
.cookie.is-in{transform:rotate(-1deg);opacity:1}
.cookie-title{font:italic 700 1.3rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;color:var(--red);text-transform:uppercase;margin-bottom:8px}
.cookie>p:not(.cookie-title){font-size:.86rem;color:var(--ink-2)}
.cookie-actions{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center;margin-top:16px}
.cookie-actions button{background:none;border:0;padding:6px 0;cursor:pointer;font:500 .68rem var(--sans);font-stretch:125%;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}
.cookie-actions .cookie-yes{font:italic 700 1.1rem var(--serif);font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:0;color:var(--red)}
.cookie-prefs{display:grid;gap:12px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line)}
.switch{display:grid;grid-template-columns:auto 1fr;column-gap:12px;align-items:center;font-weight:600;font-size:.88rem;cursor:pointer}
.switch small{grid-column:2;font-weight:400;color:var(--mute);font-size:.76rem}
.switch input{position:absolute;opacity:0}
.switch span{grid-row:1/3;width:40px;height:24px;border-radius:999px;background:var(--cream-2);border:1px solid var(--line);position:relative;transition:background .3s}
.switch span::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:var(--paper);box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .35s var(--ease)}
.switch input:checked+span{background:var(--sage)}
.switch input:checked+span::after{transform:translateX(16px)}
.switch input:focus-visible+span{outline:2px solid var(--red);outline-offset:2px}

/* ---------- Reveal ---------- */
.js [data-reveal]{opacity:0;transform:translateY(32px);transition:opacity 1s var(--ease),transform 1.2s var(--ease);transition-delay:calc(var(--i,0)*.09s)}
.js [data-reveal].is-in{opacity:1;transform:none}
.js .pk-card[data-reveal].is-in,.js .lot-card[data-reveal].is-in{transform:rotate(var(--r))}
.js [data-split]:not(.scrub) .w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.06em;margin-bottom:-.06em}
.js [data-split]:not(.scrub) .w>span{display:inline-block;transform:translateY(108%);transition:transform 1.1s var(--ease);transition-delay:calc(var(--d,0)*.04s)}
.js [data-split].is-in .w>span{transform:none}
[data-parallax]{will-change:transform}
.notfound-cta{display:flex;justify-content:center;align-items:center;gap:24px;padding-bottom:100px}

/* ---------- Responsive ---------- */
@media (max-width:1100px){.lot-grid{grid-template-columns:repeat(3,1fr)}.steps-list{grid-template-columns:repeat(2,1fr)}.foot-grid{grid-template-columns:repeat(2,1fr)}.foot-grid>div:nth-child(2){border-right:0}.foot-grid>div:nth-child(-n+2){border-bottom:1px solid var(--red)}.foot-links{grid-template-columns:repeat(3,1fr)}.foot-links a:nth-child(3){border-right:0}.foot-links a:nth-child(-n+3){border-bottom:1px solid var(--red)}}
@media (max-width:900px){
  .rail{grid-template-columns:1fr;gap:16px}
  .rail-foot{grid-template-columns:1fr}
  .split{grid-template-columns:1fr;min-height:0}
  .split-media{aspect-ratio:4/4.4}.split--rev .split-media{order:0}
  .split-block{min-height:70svh}
  .pgrid,.pk-grid{grid-template-columns:1fr}
  .exp-track{grid-auto-columns:78%}
  .msec{grid-template-columns:1fr;gap:10px}.msec-head{position:static}
  .mbar{top:84px}
  .dish,.book,.enquire,.contact-grid,.feature{grid-template-columns:1fr}
  .dish-photo{position:relative;top:0}
  .lot-grid{grid-template-columns:repeat(2,1fr)}
  .carta-stamp{right:-6px}
  .green-stamp{position:relative;left:auto;margin:18px 0 0;display:inline-grid}
  .sheet-sticker{right:-10px}
}
@media (max-width:560px){
  .grid-2,.facts{grid-template-columns:1fr}
  .lot-grid,.steps-list,.foot-grid{grid-template-columns:1fr}.foot-grid>div{border-right:0;border-bottom:1px solid var(--red)}
  .foot-links{grid-template-columns:repeat(2,1fr)}.foot-links a{border-bottom:1px solid var(--red)}
  .qr-ticket{grid-template-columns:1fr}
  .ticket-rows label{grid-template-columns:100px 1fr}
  .hero-cta{flex-direction:column;gap:18px}
  .cookie{left:8px;bottom:8px;width:calc(100% - 16px)}
  .phead-stamp{margin-left:30vw}
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  .js [data-reveal],.js [data-split] .w>span{opacity:1!important;transform:none!important}
  .hero-title .ln>span{transform:none!important}.hero-label,.hero-cta,.hero-sticker{opacity:1!important;transform:none!important}
  .expand{height:auto}.expand-sticky{position:relative;height:80svh}.expand-media{clip-path:none}.expand-copy{opacity:1}
}

/* ---------- QA fixes (28 Oct) ---------- */
.pb-s{display:none}
@media (min-width:901px){.overlay-nav span{white-space:nowrap}}
@media (max-width:900px){
  .hero-sticker{display:none}
  .hero-stamp{margin-left:0}
  .hero-cta{margin-top:28px}
  .overlay-inner{align-items:start;padding-top:150px}
  .overlay-nav a{grid-template-columns:30px 1fr;padding:10px 0}
  .overlay-nav span{font-size:clamp(1.9rem,8.4vw,3rem);line-height:1.05}
  .overlay-nav em{display:none}
  .mbar{flex-direction:column;align-items:stretch;gap:4px;overflow:visible}
  .mbar-tabs,.mbar-filter{overflow-x:auto;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}
  .mbar-tabs::-webkit-scrollbar,.mbar-filter::-webkit-scrollbar{display:none}
  .mbar-filter{border-top:1px solid rgba(245,236,221,.15);padding-top:4px}
  .ticket-stamp{right:-6px;top:-24px}
}
@media (min-width:561px) and (max-width:900px){.pgrid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:640px){.pb-l{display:none}.pb-s{display:inline}.pill-book{padding:0 14px;font-size:.66rem}.phead-stamp{margin-left:0}}

```

## `assets/fonts/fonts.css`

```css
@font-face {
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 300 700;
  font-stretch: 62% 125%;
  font-display: swap;
  src: url(../archivo-normal.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Fraunces';
  font-style: italic;
  font-weight: 300 700;
  font-display: swap;
  src: url(../fraunces-italic.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Fraunces';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url(../fraunces-normal.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

## `assets/js/booking.js`

```js
/* Casa Nopal: reservation module */
(() => {
  const root = document.querySelector('[data-booking]'); if (!root) return;
  const $ = (s, c = root) => c.querySelector(s), $$ = (s, c = root) => [...c.querySelectorAll(s)];
  const form = $('form'), steps = $$('.booking-steps li');
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const HOURS = [['11:00', '22:00'], ['17:00', '23:00'], ['17:00', '23:00'], ['17:00', '23:00'], ['17:00', '23:30'], ['17:00', '24:00'], ['11:00', '24:00']];
  const q = new URLSearchParams(location.search);
  const state = { guests: Math.min(8, Math.max(1, +q.get('guests') || 2)), date: q.get('date') || '', time: q.get('time') || '', seating: 'Dining room' };
  const pad = n => String(n).padStart(2, '0');
  const isoOf = dt => `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
  const fmtTime = t => { const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? 'am' : 'pm'}`; };
  const fmtDate = iso => new Date(iso + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const hash = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; };
  const ny = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value])); return { iso: `${p.year}-${p.month}-${p.day}`, min: +p.hour * 60 + +p.minute }; };

  /* Party size */
  const setGuests = n => { state.guests = n; $$('[data-guests] [role=radio]').forEach(b => b.setAttribute('aria-checked', +b.dataset.value === n)); renderSlots(); };
  $$('[data-guests] [role=radio]').forEach(b => b.addEventListener('click', () => setGuests(+b.dataset.value)));

  /* Seating */
  $$('[data-seating] [role=radio]').forEach(b => b.addEventListener('click', () => { state.seating = b.dataset.value; $$('[data-seating] [role=radio]').forEach(x => x.setAttribute('aria-checked', x === b)); }));

  /* Dates: next 30 days */
  const strip = $('[data-dates]'); const now = ny(); const start = new Date(now.iso + 'T12:00');
  const dates = Array.from({ length: 30 }, (_, i) => { const dt = new Date(start); dt.setDate(dt.getDate() + i); return dt; });
  if (!dates.some(dt => isoOf(dt) === state.date)) state.date = isoOf(dates[0]);
  strip.innerHTML = dates.map((dt, i) => `<button type="button" role="radio" aria-checked="false" data-value="${isoOf(dt)}" aria-label="${fmtDate(isoOf(dt))}"><small>${i === 0 ? 'Today' : i === 1 ? 'Tmrw' : DAYS[dt.getDay()]}</small><strong>${dt.getDate()}</strong><small>${dt.toLocaleDateString('en-US', { month: 'short' })}</small></button>`).join('');
  const setDate = iso => { state.date = iso; $$('button', strip).forEach(b => b.setAttribute('aria-checked', b.dataset.value === iso)); renderSlots(); };
  strip.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setDate(b.dataset.value); });

  /* Time slots */
  const slotsEl = $('[data-slots]'), countEl = $('[data-slot-count]'), next = $('[data-next]');
  function slotsFor(iso) {
    const day = new Date(iso + 'T12:00').getDay(); const [o, c] = HOURS[day].map(t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; });
    const out = [];
    for (let m = o; m <= c - 75; m += 30) { if (o === 660 && m >= 900 && m < 1020) continue; out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`); }
    return out;
  }
  function renderSlots() {
    const n = ny(); const list = slotsFor(state.date);
    let open = 0;
    slotsEl.innerHTML = list.map(t => {
      const [h, m] = t.split(':').map(Number); const mins = h * 60 + m;
      const past = state.date === n.iso && mins < n.min + 30;
      const prime = mins >= 1140 && mins <= 1230 ? .28 : 0; const big = state.guests >= 6 ? .25 : state.guests >= 4 ? .1 : 0;
      const full = !past && hash(state.date + t + state.guests) < .18 + prime + big;
      const ok = !past && !full; if (ok) open++;
      return `<button type="button" role="radio" aria-checked="${ok && t === state.time}" data-value="${t}"${ok ? '' : ' disabled'} aria-label="${fmtTime(t)}${full ? ', fully booked' : past ? ', unavailable' : ''}">${fmtTime(t).replace(':00', '')}</button>`;
    }).join('') || '';
    if (!open) slotsEl.insertAdjacentHTML('beforeend', `<p class="slots-empty">No tables left for ${state.guests} on this date. Try another day, or walk in: the bar is always first come, first served.</p>`);
    countEl.textContent = open ? `· ${open} available` : '';
    if (!$$('[aria-checked=true]', slotsEl).length) state.time = '';
    next.disabled = !state.time;
  }
  slotsEl.addEventListener('click', e => { const b = e.target.closest('button:not(:disabled)'); if (!b) return; state.time = b.dataset.value; $$('button', slotsEl).forEach(x => x.setAttribute('aria-checked', x === b)); next.disabled = false; });

  /* Steps */
  const go = n => {
    $$('[data-pane]').forEach(p => { p.hidden = +p.dataset.pane !== n; });
    steps.forEach((s, i) => { s.classList.toggle('is-active', i === n - 1); s.classList.toggle('is-done', i < n - 1); });
    const top = root.getBoundingClientRect().top + scrollY - 100; if (scrollY > top) scrollTo({ top, behavior: 'smooth' });
  };
  next.addEventListener('click', () => {
    $('[data-summary]').innerHTML = `Table for <strong>${state.guests}</strong> on <strong>${fmtDate(state.date)}</strong> at <strong>${fmtTime(state.time)}</strong>, ${state.seating.toLowerCase()}.`;
    go(2); $('#b-name').focus({ preventScroll: true });
  });
  $('[data-back]').addEventListener('click', () => go(1));
  $('[data-restart]').addEventListener('click', () => { form.reset(); go(1); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = $('[data-pane="2"] .form-msg'); let ok = true;
    $$('[data-pane="2"] [required]').forEach(i => { const bad = !i.value.trim() || (i.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) || (i.type === 'tel' && i.value.replace(/\D/g, '').length < 7); i.classList.toggle('is-invalid', bad); i.setAttribute('aria-invalid', bad); if (bad && ok) { i.focus(); ok = false; } });
    if (!ok) { msg.textContent = 'Please check the highlighted fields.'; msg.className = 'form-msg err'; return; }
    msg.textContent = '';
    const data = Object.fromEntries(new FormData(form));
    const ref = 'CN-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    const booking = { ref, ...state, name: data.name, email: data.email, phone: data.phone, occasion: data.occasion, notes: data.notes, sms: !!data.sms, at: new Date().toISOString() };
    try { const l = JSON.parse(localStorage.getItem('cn-bookings') || '[]'); l.push(booking); localStorage.setItem('cn-bookings', JSON.stringify(l)); } catch {}
    $('[data-done-text]').textContent = `Thanks, ${data.name.split(' ')[0]}. This demo booking is saved in your browser only. No real table is reserved and no email was sent.`;
    $('[data-done-list]').innerHTML = [['Reference', ref], ['Date', fmtDate(state.date)], ['Time', fmtTime(state.time)], ['Guests', state.guests], ['Seating', state.seating], ...(data.occasion ? [['Occasion', data.occasion]] : [])].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    const [h, m] = state.time.split(':').map(Number); const dt = state.date.replace(/-/g, '');
    const end = `${pad(h + 2)}${pad(m)}00`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Casa Nopal//Reservations//EN', 'BEGIN:VEVENT', `UID:${ref}@casanopal.nyc`, `DTSTART;TZID=America/New_York:${dt}T${pad(h)}${pad(m)}00`, `DTEND;TZID=America/New_York:${dt}T${end}`, `SUMMARY:Dinner at Casa Nopal (${state.guests})`, 'LOCATION:214 Bleecker Street\\, New York\\, NY 10012', `DESCRIPTION:Reservation ${ref}. Table for ${state.guests}. Call (212) 555-0147 to change.`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    $('[data-ics]').href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
    go(3); $('[data-pane="3"]').focus({ preventScroll: true });
  });

  setGuests(state.guests); setDate(state.date);
  if (state.time) { const b = $(`[data-value="${state.time}"]:not(:disabled)`, slotsEl); if (b) b.click(); }
})();

```

## `assets/js/lenis.min.js`

```js
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t="undefined"!=typeof globalThis?globalThis:t||self).Lenis=i()}(this,(function(){"use strict";function clamp(t,i,e){return Math.max(t,Math.min(i,e))}class Animate{constructor(){this.isRunning=!1,this.value=0,this.from=0,this.to=0,this.currentTime=0}advance(t){var i;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;const i=clamp(0,this.currentTime/this.duration,1);e=i>=1;const s=e?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=function damp(t,i,e,s){return function lerp(t,i,e){return(1-e)*t+e*i}(t,i,1-Math.exp(-e*s))}(this.value,this.to,60*this.lerp,t),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),null===(i=this.onUpdate)||void 0===i||i.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(t,i,{lerp:e,duration:s,easing:o,onStart:n,onUpdate:l}){this.from=this.value=t,this.to=i,this.lerp=e,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,null==n||n(),this.onUpdate=l}}class Dimensions{constructor(t,i,{autoResize:e=!0,debounce:s=250}={}){this.wrapper=t,this.content=i,this.width=0,this.height=0,this.scrollHeight=0,this.scrollWidth=0,this.resize=()=>{this.onWrapperResize(),this.onContentResize()},this.onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)},this.onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)},e&&(this.debouncedResize=function debounce(t,i){let e;return function(...s){let o=this;clearTimeout(e),e=setTimeout((()=>{e=void 0,t.apply(o,s)}),i)}}(this.resize,s),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var t,i;null===(t=this.wrapperResizeObserver)||void 0===t||t.disconnect(),null===(i=this.contentResizeObserver)||void 0===i||i.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Emitter{constructor(){this.events={}}emit(t,...i){var e;let s=this.events[t]||[];for(let t=0,o=s.length;t<o;t++)null===(e=s[t])||void 0===e||e.call(s,...i)}on(t,i){var e;return(null===(e=this.events[t])||void 0===e?void 0:e.push(i))||(this.events[t]=[i]),()=>{var e;this.events[t]=null===(e=this.events[t])||void 0===e?void 0:e.filter((t=>i!==t))}}off(t,i){var e;this.events[t]=null===(e=this.events[t])||void 0===e?void 0:e.filter((t=>i!==t))}destroy(){this.events={}}}const t=100/6,i={passive:!1};class VirtualScroll{constructor(e,s={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=s,this.touchStart={x:0,y:0},this.lastDelta={x:0,y:0},this.window={width:0,height:0},this.emitter=new Emitter,this.onTouchStart=t=>{const{clientX:i,clientY:e}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=i,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})},this.onTouchMove=t=>{const{clientX:i,clientY:e}=t.targetTouches?t.targetTouches[0]:t,s=-(i-this.touchStart.x)*this.options.touchMultiplier,o=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=i,this.touchStart.y=e,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})},this.onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})},this.onWheel=i=>{let{deltaX:e,deltaY:s,deltaMode:o}=i;e*=1===o?t:2===o?this.window.width:1,s*=1===o?t:2===o?this.window.height:1,e*=this.options.wheelMultiplier,s*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:s,event:i})},this.onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}},window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,i),this.element.addEventListener("touchstart",this.onTouchStart,i),this.element.addEventListener("touchmove",this.onTouchMove,i),this.element.addEventListener("touchend",this.onTouchEnd,i)}on(t,i){return this.emitter.on(t,i)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,i),this.element.removeEventListener("touchstart",this.onTouchStart,i),this.element.removeEventListener("touchmove",this.onTouchMove,i),this.element.removeEventListener("touchend",this.onTouchEnd,i)}}return class Lenis{constructor({wrapper:t=window,content:i=document.documentElement,eventsTarget:e=t,smoothWheel:s=!0,syncTouch:o=!1,syncTouchLerp:n=.075,touchInertiaMultiplier:l=35,duration:r,easing:h=(t=>Math.min(1,1.001-Math.pow(2,-10*t))),lerp:a=.1,infinite:c=!1,orientation:u="vertical",gestureOrientation:d="vertical",touchMultiplier:p=1,wheelMultiplier:m=1,autoResize:v=!0,prevent:g,virtualScroll:S,__experimental__naiveDimensions:w=!1}={}){this._isScrolling=!1,this._isStopped=!1,this._isLocked=!1,this._preventNextNativeScrollEvent=!1,this._resetVelocityTimeout=null,this.time=0,this.userData={},this.lastVelocity=0,this.velocity=0,this.direction=0,this.animate=new Animate,this.emitter=new Emitter,this.onPointerDown=t=>{1===t.button&&this.reset()},this.onVirtualScroll=t=>{if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(t))return;const{deltaX:i,deltaY:e,event:s}=t;if(this.emitter.emit("virtual-scroll",{deltaX:i,deltaY:e,event:s}),s.ctrlKey)return;const o=s.type.includes("touch"),n=s.type.includes("wheel");this.isTouching="touchstart"===s.type||"touchmove"===s.type;if(this.options.syncTouch&&o&&"touchstart"===s.type&&!this.isStopped&&!this.isLocked)return void this.reset();const l=0===i&&0===e,r="vertical"===this.options.gestureOrientation&&0===e||"horizontal"===this.options.gestureOrientation&&0===i;if(l||r)return;let h=s.composedPath();h=h.slice(0,h.indexOf(this.rootElement));const a=this.options.prevent;if(h.find((t=>{var i,e,s,l,r;return t instanceof HTMLElement&&("function"==typeof a&&(null==a?void 0:a(t))||(null===(i=t.hasAttribute)||void 0===i?void 0:i.call(t,"data-lenis-prevent"))||o&&(null===(e=t.hasAttribute)||void 0===e?void 0:e.call(t,"data-lenis-prevent-touch"))||n&&(null===(s=t.hasAttribute)||void 0===s?void 0:s.call(t,"data-lenis-prevent-wheel"))||(null===(l=t.classList)||void 0===l?void 0:l.contains("lenis"))&&!(null===(r=t.classList)||void 0===r?void 0:r.contains("lenis-stopped")))})))return;if(this.isStopped||this.isLocked)return void s.preventDefault();if(!(this.options.syncTouch&&o||this.options.smoothWheel&&n))return this.isScrolling="native",void this.animate.stop();s.preventDefault();let c=e;"both"===this.options.gestureOrientation?c=Math.abs(e)>Math.abs(i)?e:i:"horizontal"===this.options.gestureOrientation&&(c=i);const u=o&&this.options.syncTouch,d=o&&"touchend"===s.type&&Math.abs(c)>5;d&&(c=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+c,Object.assign({programmatic:!1},u?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(null!==this._resetVelocityTimeout&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent)this._preventNextNativeScrollEvent=!1;else if(!1===this.isScrolling||"native"===this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isScrolling="native",this.emit(),0!==this.velocity&&(this._resetVelocityTimeout=setTimeout((()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()}),400))}},window.lenisVersion="1.1.13",t&&t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:i,eventsTarget:e,smoothWheel:s,syncTouch:o,syncTouchLerp:n,touchInertiaMultiplier:l,duration:r,easing:h,lerp:a,infinite:c,gestureOrientation:d,orientation:u,touchMultiplier:p,wheelMultiplier:m,autoResize:v,prevent:g,virtualScroll:S,__experimental__naiveDimensions:w},this.dimensions=new Dimensions(t,i,{autoResize:v}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new VirtualScroll(e,{touchMultiplier:p,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName()}on(t,i){return this.emitter.on(t,i)}off(t,i){return this.emitter.off(t,i)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){const i=t-(this.time||t);this.time=t,this.animate.advance(.001*i)}scrollTo(t,{offset:i=0,immediate:e=!1,lock:s=!1,duration:o=this.options.duration,easing:n=this.options.easing,lerp:l=this.options.lerp,onStart:r,onComplete:h,force:a=!1,programmatic:c=!0,userData:u}={}){if(!this.isStopped&&!this.isLocked||a){if("string"==typeof t&&["top","left","start"].includes(t))t=0;else if("string"==typeof t&&["bottom","right","end"].includes(t))t=this.limit;else{let e;if("string"==typeof t?e=document.querySelector(t):t instanceof HTMLElement&&(null==t?void 0:t.nodeType)&&(e=t),e){if(this.options.wrapper!==window){const t=this.rootElement.getBoundingClientRect();i-=this.isHorizontal?t.left:t.top}const s=e.getBoundingClientRect();t=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof t){if(t+=i,t=Math.round(t),this.options.infinite?c&&(this.targetScroll=this.animatedScroll=this.scroll):t=clamp(0,t,this.limit),t===this.targetScroll)return null==r||r(this),void(null==h||h(this));if(this.userData=null!=u?u:{},e)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),null==h||h(this),void(this.userData={});c||(this.targetScroll=t),this.animate.fromTo(this.animatedScroll,t,{duration:o,easing:n,lerp:l,onStart:()=>{s&&(this.isLocked=!0),this.isScrolling="smooth",null==r||r(this)},onUpdate:(t,i)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),c&&(this.targetScroll=t),i||this.emit(),i&&(this.reset(),this.emit(),null==h||h(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame((()=>{this._preventNextNativeScrollEvent=!1}))}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function modulo(t,i){return(t%i+i)%i}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return"smooth"===this.isScrolling}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),"smooth"===this.isScrolling&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}}}));
//# sourceMappingURL=lenis.min.js.map

```

## `assets/js/site.js`

```js
/* Casa Nopal v2: interactions. Lenis for smooth scroll, everything else hand-written. */
(() => {
  const d = document, root = d.documentElement, $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const store = { get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  /* Smooth scroll */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: .1, anchors: { offset: -110 } });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
  }

  /* Intro */
  const ready = () => d.body.classList.add('is-ready');
  if (root.classList.contains('intro')) {
    lenis?.stop();
    setTimeout(() => { root.classList.add('intro-out'); setTimeout(ready, 200); }, 1700);
    setTimeout(() => { root.classList.remove('intro', 'intro-out'); lenis?.start(); try { sessionStorage.setItem('cn-intro', '1'); } catch {} }, 2900);
  } else requestAnimationFrame(() => requestAnimationFrame(ready));

  /* Papel picado */
  const circ = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
  const dia = (x, y, s) => `M${x} ${y - s}L${x + s} ${y}L${x} ${y + s}L${x - s} ${y}Z`;
  const flagPaths = [
    () => { let p = 'M2 6H56V54'; for (let x = 56; x > 2; x -= 6) p += `L${x - 3} 62L${x - 6} 54`; p += 'Z'; return p + circ(29, 28, 7) + circ(29, 14, 3) + circ(29, 42, 3) + circ(15, 28, 3) + circ(43, 28, 3) + dia(12, 14, 3) + dia(46, 14, 3) + dia(12, 44, 3) + dia(46, 44, 3); },
    () => { let p = 'M2 6H56V56'; for (let x = 56; x > 2; x -= 9) p += `Q${x - 4.5} 66 ${x - 9} 56`; p += 'Z'; return p + dia(29, 30, 10) + dia(29, 30, 4).replace('M', 'M') + circ(13, 16, 2.5) + circ(45, 16, 2.5) + circ(13, 46, 2.5) + circ(45, 46, 2.5) + circ(29, 12, 2) + circ(29, 50, 2); },
    () => { let p = 'M2 6H56V54'; for (let x = 56; x > 2; x -= 6) p += `L${x - 3} 62L${x - 6} 54`; p += 'Z'; let h = ''; for (let a = 0; a < 8; a++) { const r = a * Math.PI / 4; h += circ(29 + Math.cos(r) * 11, 30 + Math.sin(r) * 11, 3); } return p + h + circ(29, 30, 4) + dia(10, 12, 2.5) + dia(48, 12, 2.5); },
  ];
  const colors = ['#9b2c1f', '#e3a13b', '#efa3bf', '#5f7563', '#1e1611'];
  $$('[data-picado]').forEach(el => {
    const n = Math.ceil(innerWidth / 56) + 2; let h = '';
    const pal = el.classList.contains('picado--overlay') ? ['#f5ecdd', '#e3a13b', '#efa3bf', '#f5ecdd'] : colors;
    for (let i = 0; i < n; i++) h += `<span class="flag" style="--i:${i};--c:${pal[i % pal.length]}"><svg viewBox="0 0 58 68"><path fill-rule="evenodd" d="${flagPaths[i % 3]()}"/></svg></span>`;
    el.innerHTML = h;
  });

  /* Word split */
  let wi = 0;
  const splitNode = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = d.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return; if (/^\s+$/.test(part)) { frag.append(' '); return; }
        const w = d.createElement('span'); w.className = 'w'; const i = d.createElement('span'); i.textContent = part; i.style.setProperty('--d', wi++); w.append(i); frag.append(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== 'BR' && !n.classList.contains('dot')) splitNode(n);
  });
  $$('[data-split],[data-scrub]').forEach(el => { wi = 0; el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim()); splitNode(el); $$('.w', el).forEach(w => w.setAttribute('aria-hidden', 'true')); });

  /* Reveal */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: .1 });
  $$('[data-reveal],[data-split]').forEach(el => io.observe(el));

  /* Pill header */
  const pill = $('[data-header]'); let lastY = scrollY;
  const onPill = y => { if (d.body.classList.contains('menu-open')) return; if (y > 300 && y > lastY + 3) pill.classList.add('is-hidden'); else if (y < lastY - 3) pill.classList.remove('is-hidden'); lastY = y; };

  /* Overlay menu */
  const mBtn = $('.pill-menu'), ov = $('#overlay'), ovImg = $('.overlay-img img');
  const setMenu = open => {
    mBtn.setAttribute('aria-expanded', open); $('.pill-menu-label').textContent = open ? 'Close' : 'Menu';
    $$('main, footer, .cookie').forEach(el => { el.inert = open; });
    if (open) { ov.hidden = false; requestAnimationFrame(() => ov.classList.add('is-open')); lenis?.stop(); pill.classList.remove('is-hidden'); setTimeout(() => $('.overlay-nav a')?.focus({ preventScroll: true }), 350); }
    else { ov.classList.remove('is-open'); setTimeout(() => { ov.hidden = true; }, 900); lenis?.start(); mBtn.focus({ preventScroll: true }); }
    d.body.classList.toggle('menu-open', open);
  };
  mBtn?.addEventListener('click', () => setMenu(mBtn.getAttribute('aria-expanded') !== 'true'));
  d.addEventListener('keydown', e => {
    if (mBtn.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { setMenu(false); return; }
    if (e.key === 'Tab') { const f = [...$$('.pill a, .pill button'), ...$$('.overlay a')]; const i = f.indexOf(d.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
  });
  $$('.overlay-nav a').forEach(a => a.addEventListener('mouseenter', () => { if (ovImg.src.endsWith(a.dataset.img)) return; ovImg.style.opacity = 0; setTimeout(() => { ovImg.src = a.dataset.img; ovImg.style.opacity = 1; }, 180); }));

  /* Hero image trail */
  const trail = $('[data-trail]');
  if (trail && fine && !reduce) {
    const imgs = trail.dataset.trailImgs.split(','); let k = 0, lx = -999, ly = -999, z = 1;
    const spawn = (x, y) => { const im = d.createElement('img'); im.src = imgs[k++ % imgs.length]; im.alt = ''; im.className = 'trail-img'; im.style.left = x + 'px'; im.style.top = y + 'px'; im.style.zIndex = 1 + (z++ % 40); im.style.setProperty('--r', (Math.random() * 16 - 8).toFixed(1) + 'deg'); trail.append(im); setTimeout(() => im.remove(), 1350); };
    trail.addEventListener('mouseenter', () => imgs.forEach(s => { const p = new Image(); p.src = s; }), { once: true });
    trail.addEventListener('mousemove', e => { const r = trail.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; if (Math.hypot(x - lx, y - ly) > 110) { spawn(x, y); lx = x; ly = y; } });
  }

  /* Scroll scenes */
  const expands = $$('[data-expand]'), scrubs = $$('[data-scrub]'), carta = $('[data-carta]'), tHome = $('.ticket--home');
  const par = reduce ? [] : $$('[data-parallax]');
  const frame = () => {
    const vh = innerHeight;
    if (!reduce) expands.forEach(s => {
      const r = s.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const p = clamp(-r.top / (r.height - vh)); const e = easeOut(clamp(p / .6));
      const m = s.querySelector('.expand-media'), c = s.querySelector('.expand-sticky');
      m.style.setProperty('--ix', (30 * (1 - e)).toFixed(2) + '%'); m.style.setProperty('--iy', (22 * (1 - e)).toFixed(2) + '%'); m.style.setProperty('--rr', (8 * (1 - e)).toFixed(1) + 'px'); m.style.setProperty('--s', (1.25 - .25 * e).toFixed(3));
      c.style.setProperty('--o', clamp((p - .5) / .3).toFixed(3));
    });
    scrubs.forEach(s => {
      const r = s.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
      const ws = s._ws || (s._ws = $$('.w>span', s)); const p = clamp((vh * .85 - r.top) / (r.height + vh * .35));
      const lit = Math.round(p * ws.length); ws.forEach((w, i) => w.classList.toggle('on', i < lit || reduce));
    });
    par.forEach(el => { const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; const k = parseFloat(el.dataset.parallax) || .1; el.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px,0)`; });
    if (carta && !reduce) { const r = carta.getBoundingClientRect(); const c = clamp((r.top + r.height / 2) / vh, -.5, 1.5); carta.style.setProperty('--rot', (-2 - c * 5).toFixed(2) + 'deg'); carta.style.setProperty('--ty', ((c - .5) * 60).toFixed(1) + 'px'); }
    if (tHome && !reduce) { const r = tHome.getBoundingClientRect(); tHome.style.setProperty('--ty', (((r.top + r.height / 2) / vh - .5) * 50).toFixed(1) + 'px'); }
  };
  let ticking = false;
  const onScroll = () => { onPill(scrollY); if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; frame(); }); } };
  if (lenis) lenis.on('scroll', onScroll); else addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll); frame();

  /* Magnetic */
  if (fine && !reduce) $$('[data-magnetic]').forEach(b => { b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; }); b.addEventListener('mouseleave', () => { b.style.transform = ''; }); });

  /* Hover preview for dish lists */
  const prev = $('.cursor-preview'), prevImg = prev && $('img', prev);
  if (prev && fine) {
    let x = 0, y = 0, cx = 0, cy = 0, raf, on = false;
    const loop = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; prev.style.transform = `translate3d(${cx + 34}px,${cy - 140}px,0) rotate(${((x - cx) * .06).toFixed(2)}deg)`; if (on || Math.abs(x - cx) > .5) raf = requestAnimationFrame(loop); };
    $$('[data-preview]').forEach(a => {
      if (!a.dataset.preview) return;
      a.addEventListener('mouseenter', e => { prevImg.src = a.dataset.preview; if (!on) { x = cx = e.clientX; y = cy = e.clientY; } on = true; prev.classList.add('is-on'); cancelAnimationFrame(raf); loop(); });
      a.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
      a.addEventListener('mouseleave', () => { on = false; prev.classList.remove('is-on'); });
    });
  }

  /* Menu tabs + filter */
  const tabs = $$('.mbar-tabs a');
  if (tabs.length) {
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) tabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
    tabs.forEach(t => { const s = $(t.getAttribute('href')); if (s) spy.observe(s); });
    $$('.mbar-filter button').forEach(b => b.addEventListener('click', () => {
      $$('.mbar-filter button').forEach(x => x.setAttribute('aria-pressed', x === b));
      const f = b.dataset.filter; let shown = 0;
      $$('.mrows li').forEach(li => { const t = li.dataset.tags.split('|'); const ok = f === 'All' || t.includes(f) || (f === 'Vegetarian' && t.includes('Vegan')); li.hidden = !ok; if (ok) { shown++; li.classList.add('is-in'); } });
      $$('.msec').forEach(s => { s.hidden = !$$('.mrows li:not([hidden])', s).length; });
      $('.menu-empty').hidden = shown > 0; lenis?.resize();
    }));
  }

  /* Journal filter */
  $$('.cat-filter button').forEach(b => b.addEventListener('click', () => {
    $$('.cat-filter button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('.blog .pcard, .blog .feature').forEach(c => { c.hidden = b.dataset.cat !== 'All' && c.dataset.cat !== b.dataset.cat; c.classList.add('is-in'); });
  }));

  /* Experiences slider */
  const track = $('[data-slider]'), bar = $('[data-slide-bar]');
  if (track) {
    const upd = () => { const max = track.scrollWidth - track.clientWidth; const w = track.clientWidth / track.scrollWidth; bar.style.width = (w * 100) + '%'; bar.style.transform = `translateX(${max ? (track.scrollLeft / max) * ((1 - w) / w) * 100 : 0}%)`; };
    track.addEventListener('scroll', upd, { passive: true }); upd();
    $$('[data-slide]').forEach(b => b.addEventListener('click', () => { const c = track.firstElementChild; track.scrollBy({ left: (+b.dataset.slide) * (c.offsetWidth + 18), behavior: 'smooth' }); }));
  }

  /* Footer stamps */
  const sz = $('[data-stamps]');
  sz?.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    const r = sz.getBoundingClientRect(); const s = d.createElement('span'); s.className = 'foot-stamp is-new'; s.innerHTML = $('.foot-stamp').innerHTML;
    s.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); s.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%'); s.style.setProperty('--r', (Math.random() * 30 - 15).toFixed(1) + 'deg'); s.style.opacity = (.35 + Math.random() * .5).toFixed(2);
    sz.append(s); const all = $$('.foot-stamp.is-new', sz); if (all.length > 14) all[0].remove();
  });

  /* Open status (New York time) */
  const HOURS = [['11:00', '22:00'], ['17:00', '23:00'], ['17:00', '23:00'], ['17:00', '23:00'], ['17:00', '23:30'], ['17:00', '24:00'], ['11:00', '24:00']];
  const P = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value]));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(P.weekday), min = +P.hour * 60 + +P.minute;
  const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const fmt = m => { const h = Math.floor(m / 60) % 24, mm = m % 60; return h === 0 ? 'midnight' : `${((h + 11) % 12) + 1}${mm ? ':' + String(mm).padStart(2, '0') : ''} ${h < 12 ? 'am' : 'pm'}`; };
  const [o, c] = HOURS[day].map(toMin); const open = min >= o && min < c;
  const txt = open ? `Open now · until ${fmt(c)}` : min < o ? `Closed · opens today at ${fmt(o)}` : `Closed · opens ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(day + 1) % 7]} at ${fmt(toMin(HOURS[(day + 1) % 7][0]))}`;
  $$('[data-open-status]').forEach(el => { el.textContent = txt; el.classList.toggle('is-open', open); });
  $$(`.hours li[data-day="${day}"]`).forEach(li => li.classList.add('is-today'));

  /* Dates */
  const t = new Date(); const iso = new Date(t - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  $$('[data-min-today]').forEach(i => { i.min = iso; if (!i.value && i.closest('.ticket')) i.value = iso; });

  /* Radio chips */
  d.addEventListener('click', e => { const b = e.target.closest('[role=radio]'); if (!b || b.closest('[data-booking]')) return; const g = b.closest('[role=radiogroup]'); $$('[role=radio]', g).forEach(x => x.setAttribute('aria-checked', x === b)); });
  $$('[data-pick-package]').forEach(a => a.addEventListener('click', () => { const s = $('#c-package'); if (s) s.value = a.dataset.pickPackage; }));

  /* Forms */
  const validate = f => { let ok = true; $$('[required]', f).forEach(i => { const bad = !i.value.trim() || (i.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) || (i.type === 'number' && i.min && +i.value < +i.min); i.classList.toggle('is-invalid', bad); i.setAttribute('aria-invalid', bad); if (bad && ok) { i.focus(); ok = false; } }); return ok; };
  $$('[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault(); const msg = $('.form-msg', f); msg.className = 'form-msg';
    if (!validate(f)) { msg.textContent = 'Please check the highlighted fields.'; msg.classList.add('err'); return; }
    if (f.company_website?.value) return;
    const data = Object.fromEntries(new FormData(f)); delete data.company_website;
    $$('[data-radio]', f).forEach(g => { data[g.dataset.radio] = $('[aria-checked=true]', g)?.dataset.value; });
    const kind = f.dataset.form; const log = store.get('cn-submissions') || []; log.push({ kind, at: new Date().toISOString(), ...data }); store.set('cn-submissions', log);
    if (kind === 'newsletter') { msg.textContent = '¡Gracias! Demo signup saved in this browser only. No email sent.'; msg.classList.add('ok'); f.reset(); return; }
    const first = (data.name || '').split(' ')[0];
    const body = kind === 'catering'
      ? `<span class="stamp">¡Recibido!</span><h3>Gracias, ${first}</h3><p>We have your ${(data.eventType || 'event').toLowerCase()} enquiry for ${data.guests} guests on ${new Date(data.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}. This is a local demo enquiry only. No message or email was sent.</p><p><strong>Reference CN-E${Math.random().toString(36).slice(2, 6).toUpperCase()}</strong></p>`
      : `<span class="stamp">¡Enviado!</span><h3>Demo saved</h3><p>Thanks, ${first}. This message is saved in your browser only. No email was sent.</p>`;
    const edge = $('.ticket-edge', f)?.outerHTML || '';
    f.innerHTML = `${edge}<div class="form-sent" tabindex="-1">${body}</div>`; $('.form-sent', f).focus();
  }));
  d.addEventListener('input', e => { if (e.target.classList?.contains('is-invalid')) { e.target.classList.remove('is-invalid'); e.target.removeAttribute('aria-invalid'); } });

  /* Table order (QR) */
  $$('[data-add-order]').forEach(b => b.addEventListener('click', () => { const o = store.get('cn-table-order') || []; o.push({ name: b.dataset.name, price: +b.dataset.price }); store.set('cn-table-order', o); const m = b.nextElementSibling; m.textContent = `Added. ${o.length} item${o.length > 1 ? 's' : ''} on your table's order, $${o.reduce((s, x) => s + x.price, 0)}.`; m.className = 'form-msg ok'; }));

  /* Copy, map */
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => { try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Link copied'; } catch { b.textContent = b.dataset.copy; } }));
  $$('[data-map-load]').forEach(b => b.addEventListener('click', () => { const m = b.closest('[data-map]'); const f = d.createElement('iframe'); f.src = b.dataset.src; f.title = 'Map showing Casa Nopal on Bleecker Street'; f.loading = 'lazy'; m.prepend(f); m.classList.add('is-live'); }));

  /* Cookie consent */
  const ck = $('[data-cookie]');
  if (ck) {
    const prefs = $('[data-cookie-prefs]', ck), save = $('[data-cookie-save]', ck);
    const show = () => { ck.hidden = false; requestAnimationFrame(() => ck.classList.add('is-in')); };
    const hide = () => { ck.classList.remove('is-in'); setTimeout(() => { ck.hidden = true; }, 600); };
    const set = (analytics, marketing) => { store.set('cn-consent', { essential: true, analytics, marketing, at: new Date().toISOString() }); d.dispatchEvent(new CustomEvent('consent', { detail: { analytics, marketing } })); hide(); };
    if (!store.get('cn-consent')) setTimeout(show, root.classList.contains('intro') ? 3400 : 1000);
    $('[data-cookie-accept]', ck).addEventListener('click', () => set(true, true));
    $('[data-cookie-reject]', ck).addEventListener('click', () => set(false, false));
    $('[data-cookie-custom]', ck).addEventListener('click', e => { prefs.hidden = !prefs.hidden; save.hidden = prefs.hidden; e.target.textContent = prefs.hidden ? 'Preferences' : 'Hide'; });
    save.addEventListener('click', () => set($('[name=analytics]', ck).checked, $('[name=marketing]', ck).checked));
    $$('[data-cookie-open]').forEach(b => b.addEventListener('click', () => { const c = store.get('cn-consent'); if (c) { $('[name=analytics]', ck).checked = c.analytics; $('[name=marketing]', ck).checked = c.marketing; } prefs.hidden = false; save.hidden = false; show(); }));
  }
})();

```

## `blog/beginners-guide-to-mezcal/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A beginner's guide to mezcal | Casa Nopal, NYC</title>
<meta name="description" content="Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.">
<link rel="canonical" href="https://casanopal.nyc/blog/beginners-guide-to-mezcal/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="A beginner's guide to mezcal">
<meta property="og:description" content="Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.">
<meta property="og:url" content="https://casanopal.nyc/blog/beginners-guide-to-mezcal/">
<meta property="og:image" content="../../assets/blog-mezcal-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="A beginner's guide to mezcal">
<meta name="twitter:description" content="Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.">
<meta name="twitter:image" content="../../assets/blog-mezcal-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Journal","item":"https://casanopal.nyc/blog/"},{"@type":"ListItem","position":3,"name":"A beginner's guide to mezcal","item":"https://casanopal.nyc/blog/beginners-guide-to-mezcal/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":"A beginner's guide to mezcal","description":"Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.","image":"../../assets/blog-mezcal-lg.webp","datePublished":"2026-10-24","dateModified":"2026-10-24","author":{"@type":"Organization","name":"Casa Nopal"},"publisher":{"@id":"https://casanopal.nyc/#restaurant"},"mainEntityOfPage":"https://casanopal.nyc/blog/beginners-guide-to-mezcal/","articleSection":"Agave","wordCount":218}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" aria-current="page" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="post">
  <header class="post-head wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/blog/">Journal</a><span>✦</span><span aria-current="page">Agave</span></nav>
    <p class="label">Agave <i>✦</i> <time datetime="2026-10-24">October 24, 2026</time> <i>✦</i> 5 min read</p>
    <h1 class="mega mega--post" data-split>A beginner's guide to mezcal</h1>
    <p class="phead-lead" data-reveal>Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.</p>
  </header>
  <figure class="post-hero" data-expand-lite><img src="../../assets/blog-mezcal-lg.webp?v=4" srcset="../../assets/blog-mezcal-sm.webp?v=4 750w, ../../assets/blog-mezcal-lg.webp?v=4 1500w" sizes="100vw" width="1500" height="1000" alt="A beginner's guide to mezcal" fetchpriority="high" decoding="async"></figure>
  <div class="post-body">
    <p data-reveal>Mezcal is often described as tequila's smoky cousin. That is a fair start, but it undersells a spirit that can taste of green pepper, wet stone, tropical fruit or wildflowers, depending on the agave and the hands that made it.</p>
    <h2 data-reveal>Sip, never shoot</h2>
    <p data-reveal>We serve mezcal in a small clay copita for a reason. Its wide mouth lets the aroma open up. Take a small sip, hold it on your tongue for a moment, and let it coat your mouth. The second sip always tastes better than the first.</p>
    <blockquote data-reveal><p>Para todo mal, mezcal. Para todo bien, también.</p></blockquote>
    <h2 data-reveal>Start with Espadín</h2>
    <p data-reveal>About nine in ten mezcales are made from Espadín, a cultivated agave that is balanced and approachable. Once you know what you like, move on to wild agaves such as Tobalá, which takes up to fifteen years to mature and tastes softer and more floral.</p>
    <h2 data-reveal>What the orange is for</h2>
    <p data-reveal>The orange slices and sal de gusano that come with a pour are there to refresh your palate between sips. Try a taste of orange dipped in the salt, then go back to your mezcal and notice how the flavour changes.</p>
    <p data-reveal>If you want to explore, our Mezcal Flight is the easiest way in: three pours, three agaves, and a server who will talk you through each one.</p>
    <footer class="post-foot">
      <div class="share"><span class="label">Share</span><a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fbeginners-guide-to-mezcal%2F&amp;text=A%20beginner's%20guide%20to%20mezcal" target="_blank" rel="noopener">X</a><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fbeginners-guide-to-mezcal%2F" target="_blank" rel="noopener">Facebook</a><a href="mailto:?subject=A%20beginner's%20guide%20to%20mezcal&amp;body=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fbeginners-guide-to-mezcal%2F">Email</a><button type="button" class="linklike" data-copy="https://casanopal.nyc/blog/beginners-guide-to-mezcal/">Copy link</button></div>
      <div class="author"><span class="author-stamp"><span class="wordmark">Casa<i>✦</i>Nopal</span></span><div><strong>The Casa Nopal team</strong><p>Written by our kitchen and bar team in the West Village.</p></div></div>
    </footer>
  </div>
</article>
<section class="journal wrap"><div class="rail rail--tight"><p class="label rail-label">Diario</p><div class="rail-row"><h2 class="wide" data-split>Keep reading</h2><a class="link-arr" href="/blog/">All stories <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div></div><div class="pgrid"><article class="pcard" data-cat="Culture" data-reveal style="--i:0">
    <a href="/blog/dia-de-muertos-ofrenda/" class="pcard-img"><img src="../../assets/blog-ofrenda-lg.webp?v=4" srcset="../../assets/blog-ofrenda-sm.webp?v=4 750w, ../../assets/blog-ofrenda-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Our Día de Muertos ofrenda is up" loading="lazy" decoding="async"><span class="pcard-cat">Culture</span></a>
    <p class="pcard-meta"><time datetime="2026-10-12">October 12, 2026</time> · 4 min read</p>
    <h3><a href="/blog/dia-de-muertos-ofrenda/">Our Día de Muertos ofrenda is up</a></h3>
    <p>From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.</p>
  </article><article class="pcard" data-cat="Kitchen" data-reveal style="--i:1">
    <a href="/blog/why-we-make-our-own-masa/" class="pcard-img"><img src="../../assets/blog-masa-lg.webp?v=4" srcset="../../assets/blog-masa-sm.webp?v=4 750w, ../../assets/blog-masa-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Why we nixtamalize our own masa" loading="lazy" decoding="async"><span class="pcard-cat">Kitchen</span></a>
    <p class="pcard-meta"><time datetime="2026-09-28">September 28, 2026</time> · 6 min read</p>
    <h3><a href="/blog/why-we-make-our-own-masa/">Why we nixtamalize our own masa</a></h3>
    <p>Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.</p>
  </article><article class="pcard" data-cat="Events" data-reveal style="--i:2">
    <a href="/blog/holiday-private-dining/" class="pcard-img"><img src="../../assets/private-dining-lg.webp?v=4" srcset="../../assets/private-dining-sm.webp?v=4 750w, ../../assets/private-dining-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Book the holidays in our private room" loading="lazy" decoding="async"><span class="pcard-cat">Events</span></a>
    <p class="pcard-meta"><time datetime="2026-09-10">September 10, 2026</time> · 3 min read</p>
    <h3><a href="/blog/holiday-private-dining/">Book the holidays in our private room</a></h3>
    <p>La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.</p>
  </article></div></section>
<section class="book-scene book-scene--short"><div class="book-bg" data-parallax="0.1"><img src="../../assets/hero-dining-lg.webp?v=4" srcset="../../assets/hero-dining-sm.webp?v=4 800w, ../../assets/hero-dining-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="" loading="lazy" decoding="async"></div><form class="ticket " action="/reservations/" method="get" data-reveal>
  <div class="ticket-edge" aria-hidden="true"></div>
  <p class="ticket-kicker">Casa Nopal</p>
  <h2 class="ticket-title">Su reservación</h2>
  <span class="stamp ticket-stamp" aria-hidden="true">¡Te esperamos!</span>
  <div class="ticket-rows">
    <label><span><i>01</i> Guests</span><select name="guests"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7 guests</option><option value="8">8 guests</option></select></label>
    <label><span><i>02</i> Date</span><input type="date" name="date" data-min-today required></label>
    <label><span><i>03</i> Time</span><select name="time"><option value="17:30">5:30 pm</option><option value="18:00">6:00 pm</option><option value="18:30">6:30 pm</option><option value="19:00">7:00 pm</option><option value="19:30" selected>7:30 pm</option><option value="20:00">8:00 pm</option><option value="20:30">8:30 pm</option><option value="21:00">9:00 pm</option><option value="21:30">9:30 pm</option></select></label>
  </div>
  <button class="btn btn-block" type="submit">Find a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
  <p class="ticket-note">Parties of 9 or more, see <a href="/catering/">Event Catering</a>.</p>
</form></section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `blog/dia-de-muertos-ofrenda/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Our Día de Muertos ofrenda is up | Casa Nopal, NYC</title>
<meta name="description" content="From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.">
<link rel="canonical" href="https://casanopal.nyc/blog/dia-de-muertos-ofrenda/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Our Día de Muertos ofrenda is up">
<meta property="og:description" content="From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.">
<meta property="og:url" content="https://casanopal.nyc/blog/dia-de-muertos-ofrenda/">
<meta property="og:image" content="../../assets/blog-ofrenda-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Our Día de Muertos ofrenda is up">
<meta name="twitter:description" content="From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.">
<meta name="twitter:image" content="../../assets/blog-ofrenda-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Journal","item":"https://casanopal.nyc/blog/"},{"@type":"ListItem","position":3,"name":"Our Día de Muertos ofrenda is up","item":"https://casanopal.nyc/blog/dia-de-muertos-ofrenda/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":"Our Día de Muertos ofrenda is up","description":"From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.","image":"../../assets/blog-ofrenda-lg.webp","datePublished":"2026-10-12","dateModified":"2026-10-12","author":{"@type":"Organization","name":"Casa Nopal"},"publisher":{"@id":"https://casanopal.nyc/#restaurant"},"mainEntityOfPage":"https://casanopal.nyc/blog/dia-de-muertos-ofrenda/","articleSection":"Culture","wordCount":156}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" aria-current="page" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="post">
  <header class="post-head wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/blog/">Journal</a><span>✦</span><span aria-current="page">Culture</span></nav>
    <p class="label">Culture <i>✦</i> <time datetime="2026-10-12">October 12, 2026</time> <i>✦</i> 4 min read</p>
    <h1 class="mega mega--post" data-split>Our Día de Muertos ofrenda is up</h1>
    <p class="phead-lead" data-reveal>From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.</p>
  </header>
  <figure class="post-hero" data-expand-lite><img src="../../assets/blog-ofrenda-lg.webp?v=4" srcset="../../assets/blog-ofrenda-sm.webp?v=4 750w, ../../assets/blog-ofrenda-lg.webp?v=4 1500w" sizes="100vw" width="1500" height="1000" alt="Our Día de Muertos ofrenda is up" fetchpriority="high" decoding="async"></figure>
  <div class="post-body">
    <p data-reveal>Every year at the end of October, the front of our dining room becomes an ofrenda: an altar to remember the people we have lost. It is one of the most important traditions in Mexico, and one we are proud to share with New York.</p>
    <h2 data-reveal>What you will see</h2>
    <p data-reveal>Cempasúchil marigolds, whose colour and scent are said to guide spirits home. Candles, papel picado, pan de muerto, and the favourite foods and drinks of the people we remember. This year that includes a plate of mole negro for Chef Ximena's grandmother, whose recipe we still cook every day.</p>
    <blockquote data-reveal><p>Death is not the end of the story. It is the night we set the table for everyone.</p></blockquote>
    <h2 data-reveal>Join us</h2>
    <p data-reveal>Guests are welcome to bring a photo of someone they would like to remember and add it to the ofrenda. On November 1 and 2 we serve a special pan de muerto with hot chocolate after 9 pm.</p>
    <footer class="post-foot">
      <div class="share"><span class="label">Share</span><a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fdia-de-muertos-ofrenda%2F&amp;text=Our%20D%C3%ADa%20de%20Muertos%20ofrenda%20is%20up" target="_blank" rel="noopener">X</a><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fdia-de-muertos-ofrenda%2F" target="_blank" rel="noopener">Facebook</a><a href="mailto:?subject=Our%20D%C3%ADa%20de%20Muertos%20ofrenda%20is%20up&amp;body=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fdia-de-muertos-ofrenda%2F">Email</a><button type="button" class="linklike" data-copy="https://casanopal.nyc/blog/dia-de-muertos-ofrenda/">Copy link</button></div>
      <div class="author"><span class="author-stamp"><span class="wordmark">Casa<i>✦</i>Nopal</span></span><div><strong>The Casa Nopal team</strong><p>Written by our kitchen and bar team in the West Village.</p></div></div>
    </footer>
  </div>
</article>
<section class="journal wrap"><div class="rail rail--tight"><p class="label rail-label">Diario</p><div class="rail-row"><h2 class="wide" data-split>Keep reading</h2><a class="link-arr" href="/blog/">All stories <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div></div><div class="pgrid"><article class="pcard" data-cat="Agave" data-reveal style="--i:0">
    <a href="/blog/beginners-guide-to-mezcal/" class="pcard-img"><img src="../../assets/blog-mezcal-lg.webp?v=4" srcset="../../assets/blog-mezcal-sm.webp?v=4 750w, ../../assets/blog-mezcal-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="A beginner's guide to mezcal" loading="lazy" decoding="async"><span class="pcard-cat">Agave</span></a>
    <p class="pcard-meta"><time datetime="2026-10-24">October 24, 2026</time> · 5 min read</p>
    <h3><a href="/blog/beginners-guide-to-mezcal/">A beginner's guide to mezcal</a></h3>
    <p>Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.</p>
  </article><article class="pcard" data-cat="Kitchen" data-reveal style="--i:1">
    <a href="/blog/why-we-make-our-own-masa/" class="pcard-img"><img src="../../assets/blog-masa-lg.webp?v=4" srcset="../../assets/blog-masa-sm.webp?v=4 750w, ../../assets/blog-masa-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Why we nixtamalize our own masa" loading="lazy" decoding="async"><span class="pcard-cat">Kitchen</span></a>
    <p class="pcard-meta"><time datetime="2026-09-28">September 28, 2026</time> · 6 min read</p>
    <h3><a href="/blog/why-we-make-our-own-masa/">Why we nixtamalize our own masa</a></h3>
    <p>Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.</p>
  </article><article class="pcard" data-cat="Events" data-reveal style="--i:2">
    <a href="/blog/holiday-private-dining/" class="pcard-img"><img src="../../assets/private-dining-lg.webp?v=4" srcset="../../assets/private-dining-sm.webp?v=4 750w, ../../assets/private-dining-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Book the holidays in our private room" loading="lazy" decoding="async"><span class="pcard-cat">Events</span></a>
    <p class="pcard-meta"><time datetime="2026-09-10">September 10, 2026</time> · 3 min read</p>
    <h3><a href="/blog/holiday-private-dining/">Book the holidays in our private room</a></h3>
    <p>La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.</p>
  </article></div></section>
<section class="book-scene book-scene--short"><div class="book-bg" data-parallax="0.1"><img src="../../assets/hero-dining-lg.webp?v=4" srcset="../../assets/hero-dining-sm.webp?v=4 800w, ../../assets/hero-dining-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="" loading="lazy" decoding="async"></div><form class="ticket " action="/reservations/" method="get" data-reveal>
  <div class="ticket-edge" aria-hidden="true"></div>
  <p class="ticket-kicker">Casa Nopal</p>
  <h2 class="ticket-title">Su reservación</h2>
  <span class="stamp ticket-stamp" aria-hidden="true">¡Te esperamos!</span>
  <div class="ticket-rows">
    <label><span><i>01</i> Guests</span><select name="guests"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7 guests</option><option value="8">8 guests</option></select></label>
    <label><span><i>02</i> Date</span><input type="date" name="date" data-min-today required></label>
    <label><span><i>03</i> Time</span><select name="time"><option value="17:30">5:30 pm</option><option value="18:00">6:00 pm</option><option value="18:30">6:30 pm</option><option value="19:00">7:00 pm</option><option value="19:30" selected>7:30 pm</option><option value="20:00">8:00 pm</option><option value="20:30">8:30 pm</option><option value="21:00">9:00 pm</option><option value="21:30">9:30 pm</option></select></label>
  </div>
  <button class="btn btn-block" type="submit">Find a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
  <p class="ticket-note">Parties of 9 or more, see <a href="/catering/">Event Catering</a>.</p>
</form></section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `blog/holiday-private-dining/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Book the holidays in our private room | Casa Nopal, NYC</title>
<meta name="description" content="La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.">
<link rel="canonical" href="https://casanopal.nyc/blog/holiday-private-dining/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Book the holidays in our private room">
<meta property="og:description" content="La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.">
<meta property="og:url" content="https://casanopal.nyc/blog/holiday-private-dining/">
<meta property="og:image" content="../../assets/private-dining-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Book the holidays in our private room">
<meta name="twitter:description" content="La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.">
<meta name="twitter:image" content="../../assets/private-dining-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Journal","item":"https://casanopal.nyc/blog/"},{"@type":"ListItem","position":3,"name":"Book the holidays in our private room","item":"https://casanopal.nyc/blog/holiday-private-dining/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":"Book the holidays in our private room","description":"La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.","image":"../../assets/private-dining-lg.webp","datePublished":"2026-09-10","dateModified":"2026-09-10","author":{"@type":"Organization","name":"Casa Nopal"},"publisher":{"@id":"https://casanopal.nyc/#restaurant"},"mainEntityOfPage":"https://casanopal.nyc/blog/holiday-private-dining/","articleSection":"Events","wordCount":110}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" aria-current="page" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="post">
  <header class="post-head wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/blog/">Journal</a><span>✦</span><span aria-current="page">Events</span></nav>
    <p class="label">Events <i>✦</i> <time datetime="2026-09-10">September 10, 2026</time> <i>✦</i> 3 min read</p>
    <h1 class="mega mega--post" data-split>Book the holidays in our private room</h1>
    <p class="phead-lead" data-reveal>La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.</p>
  </header>
  <figure class="post-hero" data-expand-lite><img src="../../assets/private-dining-lg.webp?v=4" srcset="../../assets/private-dining-sm.webp?v=4 750w, ../../assets/private-dining-lg.webp?v=4 1500w" sizes="100vw" width="1500" height="1000" alt="Book the holidays in our private room" fetchpriority="high" decoding="async"></figure>
  <div class="post-body">
    <p data-reveal>Downstairs, behind the bar, is La Sala: a candlelit room with its own sound system and a single long table that seats up to twenty-four. It is where we host birthdays, rehearsal dinners and, from late November, a lot of holiday parties.</p>
    <h2 data-reveal>How it works</h2>
    <p data-reveal>Choose one of our family-style menus, or work with Chef Ximena on something of your own. Add a guided mezcal tasting led by our bar team, and we take care of the rest.</p>
    <h2 data-reveal>Dates go quickly</h2>
    <p data-reveal>December Fridays and Saturdays are usually reserved by early November. Send us an enquiry through our Event Catering page and our events team will reply within one business day.</p>
    <footer class="post-foot">
      <div class="share"><span class="label">Share</span><a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fholiday-private-dining%2F&amp;text=Book%20the%20holidays%20in%20our%20private%20room" target="_blank" rel="noopener">X</a><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fholiday-private-dining%2F" target="_blank" rel="noopener">Facebook</a><a href="mailto:?subject=Book%20the%20holidays%20in%20our%20private%20room&amp;body=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fholiday-private-dining%2F">Email</a><button type="button" class="linklike" data-copy="https://casanopal.nyc/blog/holiday-private-dining/">Copy link</button></div>
      <div class="author"><span class="author-stamp"><span class="wordmark">Casa<i>✦</i>Nopal</span></span><div><strong>The Casa Nopal team</strong><p>Written by our kitchen and bar team in the West Village.</p></div></div>
    </footer>
  </div>
</article>
<section class="journal wrap"><div class="rail rail--tight"><p class="label rail-label">Diario</p><div class="rail-row"><h2 class="wide" data-split>Keep reading</h2><a class="link-arr" href="/blog/">All stories <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div></div><div class="pgrid"><article class="pcard" data-cat="Agave" data-reveal style="--i:0">
    <a href="/blog/beginners-guide-to-mezcal/" class="pcard-img"><img src="../../assets/blog-mezcal-lg.webp?v=4" srcset="../../assets/blog-mezcal-sm.webp?v=4 750w, ../../assets/blog-mezcal-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="A beginner's guide to mezcal" loading="lazy" decoding="async"><span class="pcard-cat">Agave</span></a>
    <p class="pcard-meta"><time datetime="2026-10-24">October 24, 2026</time> · 5 min read</p>
    <h3><a href="/blog/beginners-guide-to-mezcal/">A beginner's guide to mezcal</a></h3>
    <p>Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.</p>
  </article><article class="pcard" data-cat="Culture" data-reveal style="--i:1">
    <a href="/blog/dia-de-muertos-ofrenda/" class="pcard-img"><img src="../../assets/blog-ofrenda-lg.webp?v=4" srcset="../../assets/blog-ofrenda-sm.webp?v=4 750w, ../../assets/blog-ofrenda-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Our Día de Muertos ofrenda is up" loading="lazy" decoding="async"><span class="pcard-cat">Culture</span></a>
    <p class="pcard-meta"><time datetime="2026-10-12">October 12, 2026</time> · 4 min read</p>
    <h3><a href="/blog/dia-de-muertos-ofrenda/">Our Día de Muertos ofrenda is up</a></h3>
    <p>From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.</p>
  </article><article class="pcard" data-cat="Kitchen" data-reveal style="--i:2">
    <a href="/blog/why-we-make-our-own-masa/" class="pcard-img"><img src="../../assets/blog-masa-lg.webp?v=4" srcset="../../assets/blog-masa-sm.webp?v=4 750w, ../../assets/blog-masa-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Why we nixtamalize our own masa" loading="lazy" decoding="async"><span class="pcard-cat">Kitchen</span></a>
    <p class="pcard-meta"><time datetime="2026-09-28">September 28, 2026</time> · 6 min read</p>
    <h3><a href="/blog/why-we-make-our-own-masa/">Why we nixtamalize our own masa</a></h3>
    <p>Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.</p>
  </article></div></section>
<section class="book-scene book-scene--short"><div class="book-bg" data-parallax="0.1"><img src="../../assets/hero-dining-lg.webp?v=4" srcset="../../assets/hero-dining-sm.webp?v=4 800w, ../../assets/hero-dining-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="" loading="lazy" decoding="async"></div><form class="ticket " action="/reservations/" method="get" data-reveal>
  <div class="ticket-edge" aria-hidden="true"></div>
  <p class="ticket-kicker">Casa Nopal</p>
  <h2 class="ticket-title">Su reservación</h2>
  <span class="stamp ticket-stamp" aria-hidden="true">¡Te esperamos!</span>
  <div class="ticket-rows">
    <label><span><i>01</i> Guests</span><select name="guests"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7 guests</option><option value="8">8 guests</option></select></label>
    <label><span><i>02</i> Date</span><input type="date" name="date" data-min-today required></label>
    <label><span><i>03</i> Time</span><select name="time"><option value="17:30">5:30 pm</option><option value="18:00">6:00 pm</option><option value="18:30">6:30 pm</option><option value="19:00">7:00 pm</option><option value="19:30" selected>7:30 pm</option><option value="20:00">8:00 pm</option><option value="20:30">8:30 pm</option><option value="21:00">9:00 pm</option><option value="21:30">9:30 pm</option></select></label>
  </div>
  <button class="btn btn-block" type="submit">Find a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
  <p class="ticket-note">Parties of 9 or more, see <a href="/catering/">Event Catering</a>.</p>
</form></section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `blog/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Journal | Casa Nopal, NYC</title>
<meta name="description" content="Stories from the Casa Nopal kitchen and bar: mezcal guides, how we make masa, Día de Muertos, recipes and events in the West Village.">
<link rel="canonical" href="https://casanopal.nyc/blog/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Journal">
<meta property="og:description" content="Stories from the Casa Nopal kitchen and bar: mezcal guides, how we make masa, Día de Muertos, recipes and events in the West Village.">
<meta property="og:url" content="https://casanopal.nyc/blog/">
<meta property="og:image" content="../assets/blog-mezcal-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Journal">
<meta name="twitter:description" content="Stories from the Casa Nopal kitchen and bar: mezcal guides, how we make masa, Día de Muertos, recipes and events in the West Village.">
<meta name="twitter:image" content="../assets/blog-mezcal-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Journal","item":"https://casanopal.nyc/blog/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Blog","name":"Casa Nopal Journal","url":"https://casanopal.nyc/blog/","blogPost":[{"@type":"BlogPosting","headline":"A beginner's guide to mezcal","url":"https://casanopal.nyc/blog/beginners-guide-to-mezcal/","datePublished":"2026-10-24"},{"@type":"BlogPosting","headline":"Our Día de Muertos ofrenda is up","url":"https://casanopal.nyc/blog/dia-de-muertos-ofrenda/","datePublished":"2026-10-12"},{"@type":"BlogPosting","headline":"Why we nixtamalize our own masa","url":"https://casanopal.nyc/blog/why-we-make-our-own-masa/","datePublished":"2026-09-28"},{"@type":"BlogPosting","headline":"Book the holidays in our private room","url":"https://casanopal.nyc/blog/holiday-private-dining/","datePublished":"2026-09-10"}]}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../assets/blog-masa-sm.webp?v=4" aria-current="page" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<section class="phead">
  <div class="picado " data-picado aria-hidden="true"></div>
  <div class="wrap phead-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><span aria-current="page">Journal</span></nav>
    <p class="label" data-reveal>Diario</p>
    <h1 class="mega" data-split><span class="dot" aria-hidden="true"></span>Notes from the kitchen<span class="dot" aria-hidden="true"></span></h1>
    <span class="stamp phead-stamp" aria-hidden="true">¡Salud!</span>
    <p class="phead-lead" data-reveal>Mezcal, masa, holidays and the people behind the plates.</p>
  </div>
</section>
<section class="wrap blog">
  <div class="cat-filter" role="group" aria-label="Filter by category"><button type="button" data-cat="All" aria-pressed="true">All</button><button type="button" data-cat="Agave" aria-pressed="false">Agave</button><button type="button" data-cat="Culture" aria-pressed="false">Culture</button><button type="button" data-cat="Kitchen" aria-pressed="false">Kitchen</button><button type="button" data-cat="Events" aria-pressed="false">Events</button></div>
  <a class="feature" href="/blog/beginners-guide-to-mezcal/" data-cat="Agave" data-reveal>
    <span class="feature-img"><img src="../assets/blog-mezcal-lg.webp?v=4" srcset="../assets/blog-mezcal-sm.webp?v=4 750w, ../assets/blog-mezcal-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 60vw" width="1500" height="1000" alt="A beginner's guide to mezcal" loading="lazy" decoding="async"></span>
    <span class="feature-body"><span class="pcard-cat">Agave</span><span class="feature-title">A beginner's guide to mezcal</span><span class="feature-ex">Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.</span><span class="link-arr">Read the story <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></span></span>
  </a>
  <div class="pgrid"><article class="pcard" data-cat="Culture" data-reveal style="--i:0">
    <a href="/blog/dia-de-muertos-ofrenda/" class="pcard-img"><img src="../assets/blog-ofrenda-lg.webp?v=4" srcset="../assets/blog-ofrenda-sm.webp?v=4 750w, ../assets/blog-ofrenda-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Our Día de Muertos ofrenda is up" loading="lazy" decoding="async"><span class="pcard-cat">Culture</span></a>
    <p class="pcard-meta"><time datetime="2026-10-12">October 12, 2026</time> · 4 min read</p>
    <h3><a href="/blog/dia-de-muertos-ofrenda/">Our Día de Muertos ofrenda is up</a></h3>
    <p>From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.</p>
  </article><article class="pcard" data-cat="Kitchen" data-reveal style="--i:1">
    <a href="/blog/why-we-make-our-own-masa/" class="pcard-img"><img src="../assets/blog-masa-lg.webp?v=4" srcset="../assets/blog-masa-sm.webp?v=4 750w, ../assets/blog-masa-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Why we nixtamalize our own masa" loading="lazy" decoding="async"><span class="pcard-cat">Kitchen</span></a>
    <p class="pcard-meta"><time datetime="2026-09-28">September 28, 2026</time> · 6 min read</p>
    <h3><a href="/blog/why-we-make-our-own-masa/">Why we nixtamalize our own masa</a></h3>
    <p>Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.</p>
  </article><article class="pcard" data-cat="Events" data-reveal style="--i:2">
    <a href="/blog/holiday-private-dining/" class="pcard-img"><img src="../assets/private-dining-lg.webp?v=4" srcset="../assets/private-dining-sm.webp?v=4 750w, ../assets/private-dining-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Book the holidays in our private room" loading="lazy" decoding="async"><span class="pcard-cat">Events</span></a>
    <p class="pcard-meta"><time datetime="2026-09-10">September 10, 2026</time> · 3 min read</p>
    <h3><a href="/blog/holiday-private-dining/">Book the holidays in our private room</a></h3>
    <p>La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.</p>
  </article></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `blog/why-we-make-our-own-masa/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Why we nixtamalize our own masa | Casa Nopal, NYC</title>
<meta name="description" content="Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.">
<link rel="canonical" href="https://casanopal.nyc/blog/why-we-make-our-own-masa/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Why we nixtamalize our own masa">
<meta property="og:description" content="Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.">
<meta property="og:url" content="https://casanopal.nyc/blog/why-we-make-our-own-masa/">
<meta property="og:image" content="../../assets/blog-masa-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Why we nixtamalize our own masa">
<meta name="twitter:description" content="Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.">
<meta name="twitter:image" content="../../assets/blog-masa-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Journal","item":"https://casanopal.nyc/blog/"},{"@type":"ListItem","position":3,"name":"Why we nixtamalize our own masa","item":"https://casanopal.nyc/blog/why-we-make-our-own-masa/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":"Why we nixtamalize our own masa","description":"Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.","image":"../../assets/blog-masa-lg.webp","datePublished":"2026-09-28","dateModified":"2026-09-28","author":{"@type":"Organization","name":"Casa Nopal"},"publisher":{"@id":"https://casanopal.nyc/#restaurant"},"mainEntityOfPage":"https://casanopal.nyc/blog/why-we-make-our-own-masa/","articleSection":"Kitchen","wordCount":163}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" aria-current="page" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="post">
  <header class="post-head wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/blog/">Journal</a><span>✦</span><span aria-current="page">Kitchen</span></nav>
    <p class="label">Kitchen <i>✦</i> <time datetime="2026-09-28">September 28, 2026</time> <i>✦</i> 6 min read</p>
    <h1 class="mega mega--post" data-split>Why we nixtamalize our own masa</h1>
    <p class="phead-lead" data-reveal>Every tortilla we serve starts as dried heirloom corn from Oaxaca. It is slow, it is messy, and it is the whole point.</p>
  </header>
  <figure class="post-hero" data-expand-lite><img src="../../assets/blog-masa-lg.webp?v=4" srcset="../../assets/blog-masa-sm.webp?v=4 750w, ../../assets/blog-masa-lg.webp?v=4 1500w" sizes="100vw" width="1500" height="1000" alt="Why we nixtamalize our own masa" fetchpriority="high" decoding="async"></figure>
  <div class="post-body">
    <p data-reveal>Most tortillas in New York start as a bag of powdered masa harina. Ours start as whole dried corn, grown by small farmers in Oaxaca and the State of Mexico, in shades of blue, red and gold.</p>
    <h2 data-reveal>The process</h2>
    <p data-reveal>Nixtamalization is an ancient technique. The corn is simmered in water with cal, or slaked lime, then left to steep overnight. This loosens the skins, unlocks nutrients, and gives masa its unmistakable flavour. The next morning we rinse it and grind it on a volcanic stone mill.</p>
    <blockquote data-reveal><p>A tortilla is not a plate. It is the dish.</p></blockquote>
    <h2 data-reveal>Why it matters</h2>
    <p data-reveal>Fresh masa tastes of corn in a way packaged flour never can. It is sweeter, more aromatic and more tender. It also means we can buy directly from farmers who keep heirloom varieties alive.</p>
    <p data-reveal>Sit at the counter on a weekend afternoon and you can watch our cooks pressing tortillas by hand and laying them on the comal, a few hundred times a night.</p>
    <footer class="post-foot">
      <div class="share"><span class="label">Share</span><a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fwhy-we-make-our-own-masa%2F&amp;text=Why%20we%20nixtamalize%20our%20own%20masa" target="_blank" rel="noopener">X</a><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fwhy-we-make-our-own-masa%2F" target="_blank" rel="noopener">Facebook</a><a href="mailto:?subject=Why%20we%20nixtamalize%20our%20own%20masa&amp;body=https%3A%2F%2Fcasanopal.nyc%2Fblog%2Fwhy-we-make-our-own-masa%2F">Email</a><button type="button" class="linklike" data-copy="https://casanopal.nyc/blog/why-we-make-our-own-masa/">Copy link</button></div>
      <div class="author"><span class="author-stamp"><span class="wordmark">Casa<i>✦</i>Nopal</span></span><div><strong>The Casa Nopal team</strong><p>Written by our kitchen and bar team in the West Village.</p></div></div>
    </footer>
  </div>
</article>
<section class="journal wrap"><div class="rail rail--tight"><p class="label rail-label">Diario</p><div class="rail-row"><h2 class="wide" data-split>Keep reading</h2><a class="link-arr" href="/blog/">All stories <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div></div><div class="pgrid"><article class="pcard" data-cat="Agave" data-reveal style="--i:0">
    <a href="/blog/beginners-guide-to-mezcal/" class="pcard-img"><img src="../../assets/blog-mezcal-lg.webp?v=4" srcset="../../assets/blog-mezcal-sm.webp?v=4 750w, ../../assets/blog-mezcal-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="A beginner's guide to mezcal" loading="lazy" decoding="async"><span class="pcard-cat">Agave</span></a>
    <p class="pcard-meta"><time datetime="2026-10-24">October 24, 2026</time> · 5 min read</p>
    <h3><a href="/blog/beginners-guide-to-mezcal/">A beginner's guide to mezcal</a></h3>
    <p>Smoky, floral, earthy. Our bar team explains how to taste mezcal, and which of our 80 bottles to start with.</p>
  </article><article class="pcard" data-cat="Culture" data-reveal style="--i:1">
    <a href="/blog/dia-de-muertos-ofrenda/" class="pcard-img"><img src="../../assets/blog-ofrenda-lg.webp?v=4" srcset="../../assets/blog-ofrenda-sm.webp?v=4 750w, ../../assets/blog-ofrenda-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Our Día de Muertos ofrenda is up" loading="lazy" decoding="async"><span class="pcard-cat">Culture</span></a>
    <p class="pcard-meta"><time datetime="2026-10-12">October 12, 2026</time> · 4 min read</p>
    <h3><a href="/blog/dia-de-muertos-ofrenda/">Our Día de Muertos ofrenda is up</a></h3>
    <p>From October 28 to November 2 our dining room holds an ofrenda for the people who shaped our kitchen. Here is what it means.</p>
  </article><article class="pcard" data-cat="Events" data-reveal style="--i:2">
    <a href="/blog/holiday-private-dining/" class="pcard-img"><img src="../../assets/private-dining-lg.webp?v=4" srcset="../../assets/private-dining-sm.webp?v=4 750w, ../../assets/private-dining-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 33vw" width="1500" height="1000" alt="Book the holidays in our private room" loading="lazy" decoding="async"><span class="pcard-cat">Events</span></a>
    <p class="pcard-meta"><time datetime="2026-09-10">September 10, 2026</time> · 3 min read</p>
    <h3><a href="/blog/holiday-private-dining/">Book the holidays in our private room</a></h3>
    <p>La Sala seats up to twenty-four for family-style feasts, mezcal tastings and long December dinners.</p>
  </article></div></section>
<section class="book-scene book-scene--short"><div class="book-bg" data-parallax="0.1"><img src="../../assets/hero-dining-lg.webp?v=4" srcset="../../assets/hero-dining-sm.webp?v=4 800w, ../../assets/hero-dining-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="" loading="lazy" decoding="async"></div><form class="ticket " action="/reservations/" method="get" data-reveal>
  <div class="ticket-edge" aria-hidden="true"></div>
  <p class="ticket-kicker">Casa Nopal</p>
  <h2 class="ticket-title">Su reservación</h2>
  <span class="stamp ticket-stamp" aria-hidden="true">¡Te esperamos!</span>
  <div class="ticket-rows">
    <label><span><i>01</i> Guests</span><select name="guests"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7 guests</option><option value="8">8 guests</option></select></label>
    <label><span><i>02</i> Date</span><input type="date" name="date" data-min-today required></label>
    <label><span><i>03</i> Time</span><select name="time"><option value="17:30">5:30 pm</option><option value="18:00">6:00 pm</option><option value="18:30">6:30 pm</option><option value="19:00">7:00 pm</option><option value="19:30" selected>7:30 pm</option><option value="20:00">8:00 pm</option><option value="20:30">8:30 pm</option><option value="21:00">9:00 pm</option><option value="21:30">9:30 pm</option></select></label>
  </div>
  <button class="btn btn-block" type="submit">Find a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
  <p class="ticket-note">Parties of 9 or more, see <a href="/catering/">Event Catering</a>.</p>
</form></section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `catering/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Event Catering &amp; Private Dining | Casa Nopal, NYC</title>
<meta name="description" content="Mexican catering in NYC by Casa Nopal: taco bars, family-style feasts and mezcal parties, delivered, staffed or in La Sala, our private room for up to 24.">
<link rel="canonical" href="https://casanopal.nyc/catering/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Event Catering &amp; Private Dining">
<meta property="og:description" content="Mexican catering in NYC by Casa Nopal: taco bars, family-style feasts and mezcal parties, delivered, staffed or in La Sala, our private room for up to 24.">
<meta property="og:url" content="https://casanopal.nyc/catering/">
<meta property="og:image" content="../assets/catering-spread-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Event Catering &amp; Private Dining">
<meta name="twitter:description" content="Mexican catering in NYC by Casa Nopal: taco bars, family-style feasts and mezcal parties, delivered, staffed or in La Sala, our private room for up to 24.">
<meta name="twitter:image" content="../assets/catering-spread-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Event Catering","item":"https://casanopal.nyc/catering/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","serviceType":"Event catering","name":"Casa Nopal Event Catering","provider":{"@id":"https://casanopal.nyc/#restaurant"},"areaServed":"New York City","offers":[{"@type":"Offer","name":"Taquiza","description":"A build-your-own taco bar, served hot from our kitchen.","price":38,"priceCurrency":"USD","unitText":"per guest"},{"@type":"Offer","name":"Fiesta","description":"Our most popular menu: a long family-style feast.","price":62,"priceCurrency":"USD","unitText":"per guest"},{"@type":"Offer","name":"Mezcal & Botanas","description":"A standing cocktail party with passed bites and a guided tasting.","price":48,"priceCurrency":"USD","unitText":"per guest"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How far ahead should we book?","acceptedAnswer":{"@type":"Answer","text":"Two to three weeks is ideal for most events. December weekends usually book up by early November."}},{"@type":"Question","name":"Can you cater dietary needs?","acceptedAnswer":{"@type":"Answer","text":"Yes. Every menu can be adapted for vegetarian, vegan, gluten-free and dairy-free guests, and we label everything on the table."}},{"@type":"Question","name":"Do you deliver outside Manhattan?","acceptedAnswer":{"@type":"Answer","text":"We deliver across Manhattan and to Brooklyn and Queens for orders of 30 guests or more. Staffed events can travel further."}},{"@type":"Question","name":"Is there a deposit?","acceptedAnswer":{"@type":"Answer","text":"We ask for a 25% deposit to hold your date. It is fully refundable up to 14 days before the event."}}]}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../assets/catering-spread-sm.webp?v=4" aria-current="page" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<section class="phead">
  <div class="picado " data-picado aria-hidden="true"></div>
  <div class="wrap phead-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><span aria-current="page">Event Catering</span></nav>
    <p class="label" data-reveal>Eventos <i>✦</i> Catering <i>✦</i> Private dining</p>
    <h1 class="mega" data-split><span class="dot" aria-hidden="true"></span>Bring the fiesta<span class="dot" aria-hidden="true"></span></h1>
    <span class="stamp phead-stamp" aria-hidden="true">¡A comer!</span>
    <p class="phead-lead" data-reveal>Office lunches, weddings, birthdays and holiday parties. We cook, we deliver, and if you like, we stay and pour the mezcal.</p>
  </div>
</section>
<section class="expand expand--short" data-expand aria-label="Catering spread"><div class="expand-sticky"><div class="expand-media"><img src="../assets/catering-spread-lg.webp?v=4" srcset="../assets/catering-spread-sm.webp?v=4 800w, ../assets/catering-spread-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="A family-style Mexican catering spread on a long oak table" loading="lazy" decoding="async"></div><div class="expand-copy"><p class="label">From 12 to 400 guests</p><p class="expand-big">Family style.</p></div></div></section>
<section class="pk wrap">
  <div class="rail rail--tight"><p class="label rail-label" data-reveal>Menús</p><div class="rail-row"><h2 class="wide" data-split>Three ways to feast</h2><p class="rail-note" data-reveal>Prices before tax and service. Every menu adapts to dietary needs.</p></div></div>
  <div class="pk-grid"><article class="pk-card" data-reveal style="--i:0;--r:-2deg">
    <p class="carta-kicker">Menú 01</p><h3>Taquiza</h3><p class="pk-price"><strong>$38</strong> per guest</p><p class="pk-min">From 20 guests</p><p class="pk-desc">A build-your-own taco bar, served hot from our kitchen.</p>
    <ul><li>Three taco fillings: al pastor, carnitas, rajas con crema</li><li>Hand-pressed corn tortillas</li><li>Guacamole, salsas and pickles</li><li>Arroz rojo and frijoles de la olla</li></ul><a class="btn btn-ghost btn-block" href="#enquire" data-pick-package="Taquiza">Choose this menu</a></article><article class="pk-card is-featured" data-reveal style="--i:1;--r:1deg">
    <span class="stamp pk-stamp" aria-hidden="true">Most booked</span><p class="carta-kicker">Menú 02</p><h3>Fiesta</h3><p class="pk-price"><strong>$62</strong> per guest</p><p class="pk-min">From 15 guests</p><p class="pk-desc">Our most popular menu: a long family-style feast.</p>
    <ul><li>Guacamole de molcajete and elote asado</li><li>Aguachile verde</li><li>Mole negro and carne asada</li><li>Churros con chocolate</li><li>Optional margarita and mezcal bar</li></ul><a class="btn  btn-block" href="#enquire" data-pick-package="Fiesta">Choose this menu</a></article><article class="pk-card" data-reveal style="--i:2;--r:2.5deg">
    <p class="carta-kicker">Menú 03</p><h3>Mezcal & Botanas</h3><p class="pk-price"><strong>$48</strong> per guest</p><p class="pk-min">From 12 guests</p><p class="pk-desc">A standing cocktail party with passed bites and a guided tasting.</p>
    <ul><li>Six passed botanas</li><li>Guided tasting of three mezcales</li><li>Margaritas and palomas</li><li>Bar staff included</li></ul><a class="btn btn-ghost btn-block" href="#enquire" data-pick-package="Mezcal & Botanas">Choose this menu</a></article></div>
</section>
<section class="steps wrap"><div class="rail rail--tight"><p class="label rail-label" data-reveal>Así funciona</p><h2 class="wide" data-split>How it works</h2></div>
  <ol class="steps-list"><li data-reveal style="--i:0"><span class="step-n">01</span><h3>Tell us about it</h3><p>Send the enquiry below with your date, guest count and the kind of party you have in mind.</p></li><li data-reveal style="--i:1"><span class="step-n">02</span><h3>Shape the menu</h3><p>Our events team replies within one business day with a tailored menu and quote.</p></li><li data-reveal style="--i:2"><span class="step-n">03</span><h3>Lock the date</h3><p>A 25% refundable deposit holds your date. We handle rentals and staff if you need them.</p></li><li data-reveal style="--i:3"><span class="step-n">04</span><h3>Enjoy it</h3><p>We arrive, set up, serve and clear. You get to be a guest at your own party.</p></li></ol></section>
<section class="split" id="sala">
  <div class="split-media" data-reveal><img src="../assets/private-dining-lg.webp?v=4" srcset="../assets/private-dining-sm.webp?v=4 750w, ../assets/private-dining-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 50vw" width="1500" height="1000" alt="La Sala private dining room with a long table set for twelve" loading="lazy" decoding="async"></div>
  <div class="split-block split-block--sage"><p class="label">Private dining</p><p class="split-big" data-split>La Sala, downstairs.</p>
  <p>A room behind the bar with its own sound system and a single long table. Seated dinners for up to 24, standing receptions for up to 40.</p>
  <ul class="facts"><li><strong>24</strong><span>seated</span></li><li><strong>40</strong><span>standing</span></li><li><strong>$1,800</strong><span>minimum, Sun to Thu</span></li></ul></div>
</section>
<section class="enquire wrap" id="enquire">
  <div class="enquire-intro"><p class="label" data-reveal>Enquiry</p><h2 class="wide" data-split>Let's plan your event</h2><p data-reveal>Our events team replies within one business day. Prefer to talk? Call <a href="tel:+12125550147">(212) 555-0147</a> or email <a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a>.</p>
    <div class="faq" data-reveal><details><summary>How far ahead should we book?</summary><p>Two to three weeks is ideal for most events. December weekends usually book up by early November.</p></details><details><summary>Can you cater dietary needs?</summary><p>Yes. Every menu can be adapted for vegetarian, vegan, gluten-free and dairy-free guests, and we label everything on the table.</p></details><details><summary>Do you deliver outside Manhattan?</summary><p>We deliver across Manhattan and to Brooklyn and Queens for orders of 30 guests or more. Staffed events can travel further.</p></details><details><summary>Is there a deposit?</summary><p>We ask for a 25% deposit to hold your date. It is fully refundable up to 14 days before the event.</p></details></div></div>
  <form class="paper-form" data-form="catering" novalidate>
    <div class="ticket-edge" aria-hidden="true"></div>
    <p class="carta-kicker">Casa Nopal eventos</p><h3 class="paper-title">Your event</h3>
    <div class="field"><span class="label" id="lbl-type">Type of event</span><div class="chips chips-wide" role="radiogroup" aria-labelledby="lbl-type" data-radio="eventType"><button type="button" role="radio" aria-checked="true" data-value="Office lunch">Office lunch</button><button type="button" role="radio" aria-checked="false" data-value="Wedding">Wedding</button><button type="button" role="radio" aria-checked="false" data-value="Birthday">Birthday</button><button type="button" role="radio" aria-checked="false" data-value="Holiday party">Holiday party</button><button type="button" role="radio" aria-checked="false" data-value="Other">Other</button></div></div>
    <div class="grid-2"><div class="field"><label class="label" for="c-date">Event date</label><input id="c-date" type="date" name="date" data-min-today required></div><div class="field"><label class="label" for="c-guests">Guests</label><input id="c-guests" type="number" name="guests" min="10" max="400" placeholder="40" required></div></div>
    <div class="grid-2"><div class="field"><label class="label" for="c-package">Menu</label><select id="c-package" name="package"><option>Taquiza</option><option selected>Fiesta</option><option>Mezcal & Botanas</option><option>Not sure yet</option></select></div><div class="field"><label class="label" for="c-service">Service</label><select id="c-service" name="service"><option>Drop-off delivery</option><option selected>Staffed at your venue</option><option>In La Sala, our private room</option></select></div></div>
    <div class="grid-2"><div class="field"><label class="label" for="c-name">Your name</label><input id="c-name" name="name" autocomplete="name" required></div><div class="field"><label class="label" for="c-company">Company <small>optional</small></label><input id="c-company" name="company" autocomplete="organization"></div></div>
    <div class="grid-2"><div class="field"><label class="label" for="c-email">Email</label><input id="c-email" type="email" name="email" autocomplete="email" required></div><div class="field"><label class="label" for="c-phone">Phone</label><input id="c-phone" type="tel" name="phone" autocomplete="tel"></div></div>
    <div class="field"><label class="label" for="c-msg">Tell us more</label><textarea id="c-msg" name="message" rows="4" placeholder="Venue, timing, dietary needs, the vibe you're going for"></textarea></div>
    <input type="text" name="company_website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button class="btn btn-block" type="submit">Send enquiry <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
    <p class="form-msg" role="status" aria-live="polite"></p>
  </form>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/aguachile-verde/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Aguachile Verde | Casa Nopal, NYC</title>
<meta name="description" content="Aguachile Verde at Casa Nopal, West Village: Wild shrimp cured in green chile and lime, cucumber, red onion, avocado. $24.">
<link rel="canonical" href="https://casanopal.nyc/menu/aguachile-verde/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Aguachile Verde">
<meta property="og:description" content="Aguachile Verde at Casa Nopal, West Village: Wild shrimp cured in green chile and lime, cucumber, red onion, avocado. $24.">
<meta property="og:url" content="https://casanopal.nyc/menu/aguachile-verde/">
<meta property="og:image" content="../../assets/dish-aguachile-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Aguachile Verde">
<meta name="twitter:description" content="Aguachile Verde at Casa Nopal, West Village: Wild shrimp cured in green chile and lime, cucumber, red onion, avocado. $24.">
<meta name="twitter:image" content="../../assets/dish-aguachile-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Aguachile Verde","item":"https://casanopal.nyc/menu/aguachile-verde/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Aguachile Verde","description":"A dish from the Sinaloa coast. Wild Gulf shrimp are butterflied and cured to order in a bright broth of serrano, cilantro, cucumber and lime, then layered with shaved red onion and avocado. Eat it fast, while it is cold and sharp.","image":"../../assets/dish-aguachile-lg.webp","url":"https://casanopal.nyc/menu/aguachile-verde/","offers":{"@type":"Offer","price":24,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/GlutenFreeDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Aguachile Verde: Wild shrimp cured in green chile and lime, cucumber, red onion, avocado." fetchpriority="high" decoding="async" style="view-transition-name:dish-aguachile-verde"><span class="dish-photo-cap">Sinaloa style</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Antojitos<br>No. 03</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#antojitos">Antojitos</a></nav>
    <h1 class="dish-title" data-split>Aguachile Verde</h1>
    <div class="dish-meta"><span class="dish-price">$24</span><span class="tag">Gluten free</span><span class="tag">Dairy free</span><span class="tag tag-spice">Spice ✺✺✺<b></b></span></div>
    <p class="dish-lead" data-reveal>A dish from the Sinaloa coast. Wild Gulf shrimp are butterflied and cured to order in a bright broth of serrano, cilantro, cucumber and lime, then layered with shaved red onion and avocado. Eat it fast, while it is cold and sharp.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Wild Gulf shrimp</li><li>Serrano</li><li>Cucumber</li><li>Red onion</li><li>Lime</li><li>Avocado</li></ul></div>
    <a class="pairing" href="/menu/mezcal-flight/" data-reveal><span class="pairing-img"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Mezcal Flight</strong></span><span class="pairing-price">$32</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Aguachile Verde from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM10 0h1v1h-1zM12 0h1v1h-1zM13 0h1v1h-1zM17 0h1v1h-1zM18 0h1v1h-1zM20 0h1v1h-1zM22 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM12 1h1v1h-1zM13 1h1v1h-1zM14 1h1v1h-1zM16 1h1v1h-1zM18 1h1v1h-1zM19 1h1v1h-1zM21 1h1v1h-1zM22 1h1v1h-1zM24 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM8 2h1v1h-1zM10 2h1v1h-1zM13 2h1v1h-1zM14 2h1v1h-1zM21 2h1v1h-1zM23 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM10 3h1v1h-1zM14 3h1v1h-1zM16 3h1v1h-1zM18 3h1v1h-1zM20 3h1v1h-1zM21 3h1v1h-1zM23 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM8 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM15 4h1v1h-1zM16 4h1v1h-1zM22 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1zM16 5h1v1h-1zM19 5h1v1h-1zM21 5h1v1h-1zM23 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM12 7h1v1h-1zM13 7h1v1h-1zM15 7h1v1h-1zM16 7h1v1h-1zM22 7h1v1h-1zM23 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM4 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM8 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM17 8h1v1h-1zM23 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM28 8h1v1h-1zM30 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM2 9h1v1h-1zM3 9h1v1h-1zM4 9h1v1h-1zM10 9h1v1h-1zM11 9h1v1h-1zM13 9h1v1h-1zM14 9h1v1h-1zM15 9h1v1h-1zM17 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM23 9h1v1h-1zM28 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM1 10h1v1h-1zM4 10h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM10 10h1v1h-1zM12 10h1v1h-1zM13 10h1v1h-1zM15 10h1v1h-1zM16 10h1v1h-1zM23 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM30 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM1 11h1v1h-1zM3 11h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM8 11h1v1h-1zM11 11h1v1h-1zM12 11h1v1h-1zM13 11h1v1h-1zM16 11h1v1h-1zM18 11h1v1h-1zM22 11h1v1h-1zM23 11h1v1h-1zM24 11h1v1h-1zM25 11h1v1h-1zM27 11h1v1h-1zM30 11h1v1h-1zM2 12h1v1h-1zM6 12h1v1h-1zM8 12h1v1h-1zM11 12h1v1h-1zM13 12h1v1h-1zM15 12h1v1h-1zM17 12h1v1h-1zM20 12h1v1h-1zM23 12h1v1h-1zM26 12h1v1h-1zM27 12h1v1h-1zM31 12h1v1h-1zM0 13h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM12 13h1v1h-1zM14 13h1v1h-1zM17 13h1v1h-1zM18 13h1v1h-1zM19 13h1v1h-1zM20 13h1v1h-1zM23 13h1v1h-1zM24 13h1v1h-1zM27 13h1v1h-1zM0 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM6 14h1v1h-1zM7 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM15 14h1v1h-1zM19 14h1v1h-1zM20 14h1v1h-1zM21 14h1v1h-1zM22 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM29 14h1v1h-1zM30 14h1v1h-1zM2 15h1v1h-1zM4 15h1v1h-1zM5 15h1v1h-1zM10 15h1v1h-1zM11 15h1v1h-1zM16 15h1v1h-1zM20 15h1v1h-1zM22 15h1v1h-1zM23 15h1v1h-1zM25 15h1v1h-1zM27 15h1v1h-1zM28 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM32 15h1v1h-1zM0 16h1v1h-1zM1 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM8 16h1v1h-1zM12 16h1v1h-1zM15 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM27 16h1v1h-1zM28 16h1v1h-1zM29 16h1v1h-1zM1 17h1v1h-1zM2 17h1v1h-1zM5 17h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM12 17h1v1h-1zM13 17h1v1h-1zM15 17h1v1h-1zM17 17h1v1h-1zM18 17h1v1h-1zM19 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM30 17h1v1h-1zM32 17h1v1h-1zM0 18h1v1h-1zM1 18h1v1h-1zM2 18h1v1h-1zM4 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM7 18h1v1h-1zM9 18h1v1h-1zM10 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM15 18h1v1h-1zM17 18h1v1h-1zM18 18h1v1h-1zM19 18h1v1h-1zM20 18h1v1h-1zM21 18h1v1h-1zM23 18h1v1h-1zM25 18h1v1h-1zM26 18h1v1h-1zM27 18h1v1h-1zM29 18h1v1h-1zM30 18h1v1h-1zM32 18h1v1h-1zM1 19h1v1h-1zM2 19h1v1h-1zM3 19h1v1h-1zM4 19h1v1h-1zM5 19h1v1h-1zM7 19h1v1h-1zM12 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM23 19h1v1h-1zM24 19h1v1h-1zM25 19h1v1h-1zM28 19h1v1h-1zM29 19h1v1h-1zM30 19h1v1h-1zM0 20h1v1h-1zM6 20h1v1h-1zM8 20h1v1h-1zM10 20h1v1h-1zM14 20h1v1h-1zM16 20h1v1h-1zM18 20h1v1h-1zM20 20h1v1h-1zM24 20h1v1h-1zM29 20h1v1h-1zM31 20h1v1h-1zM0 21h1v1h-1zM2 21h1v1h-1zM4 21h1v1h-1zM5 21h1v1h-1zM7 21h1v1h-1zM8 21h1v1h-1zM11 21h1v1h-1zM19 21h1v1h-1zM20 21h1v1h-1zM22 21h1v1h-1zM23 21h1v1h-1zM24 21h1v1h-1zM27 21h1v1h-1zM28 21h1v1h-1zM29 21h1v1h-1zM0 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM7 22h1v1h-1zM14 22h1v1h-1zM17 22h1v1h-1zM21 22h1v1h-1zM23 22h1v1h-1zM26 22h1v1h-1zM29 22h1v1h-1zM30 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM0 23h1v1h-1zM3 23h1v1h-1zM7 23h1v1h-1zM9 23h1v1h-1zM10 23h1v1h-1zM12 23h1v1h-1zM13 23h1v1h-1zM14 23h1v1h-1zM15 23h1v1h-1zM17 23h1v1h-1zM20 23h1v1h-1zM23 23h1v1h-1zM25 23h1v1h-1zM26 23h1v1h-1zM27 23h1v1h-1zM30 23h1v1h-1zM31 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM1 24h1v1h-1zM2 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM8 24h1v1h-1zM10 24h1v1h-1zM16 24h1v1h-1zM20 24h1v1h-1zM23 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM29 24h1v1h-1zM31 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM14 25h1v1h-1zM15 25h1v1h-1zM17 25h1v1h-1zM18 25h1v1h-1zM23 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM30 25h1v1h-1zM31 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM10 26h1v1h-1zM11 26h1v1h-1zM12 26h1v1h-1zM13 26h1v1h-1zM15 26h1v1h-1zM17 26h1v1h-1zM19 26h1v1h-1zM21 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM30 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM10 27h1v1h-1zM11 27h1v1h-1zM13 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM19 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM8 28h1v1h-1zM9 28h1v1h-1zM15 28h1v1h-1zM16 28h1v1h-1zM17 28h1v1h-1zM19 28h1v1h-1zM22 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM9 29h1v1h-1zM11 29h1v1h-1zM12 29h1v1h-1zM14 29h1v1h-1zM16 29h1v1h-1zM18 29h1v1h-1zM19 29h1v1h-1zM21 29h1v1h-1zM24 29h1v1h-1zM25 29h1v1h-1zM27 29h1v1h-1zM30 29h1v1h-1zM31 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM10 30h1v1h-1zM12 30h1v1h-1zM14 30h1v1h-1zM15 30h1v1h-1zM19 30h1v1h-1zM20 30h1v1h-1zM21 30h1v1h-1zM23 30h1v1h-1zM24 30h1v1h-1zM25 30h1v1h-1zM27 30h1v1h-1zM28 30h1v1h-1zM30 30h1v1h-1zM31 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM18 31h1v1h-1zM20 31h1v1h-1zM26 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM30 31h1v1h-1zM31 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM10 32h1v1h-1zM12 32h1v1h-1zM13 32h1v1h-1zM14 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM19 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM24 32h1v1h-1zM25 32h1v1h-1zM27 32h1v1h-1zM28 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Aguachile Verde to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Aguachile Verde" data-price="24">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#antojitos">Back to Antojitos <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/elote-asado/" rel="prev"><small>← Previous</small>Elote Asado</a><a href="/menu/queso-fundido/" rel="next"><small>Next →</small>Queso Fundido</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-3deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a><a class="polaroid" href="/menu/elote-asado/" style="--r:2deg"><img src="../../assets/dish-elote-lg.webp?v=4" srcset="../../assets/dish-elote-sm.webp?v=4 600w, ../../assets/dish-elote-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Elote Asado" loading="lazy" decoding="async"><span>Elote Asado · $14</span></a><a class="polaroid" href="/menu/queso-fundido/" style="--r:-2deg"><img src="../../assets/dish-queso-fundido-lg.webp?v=4" srcset="../../assets/dish-queso-fundido-sm.webp?v=4 600w, ../../assets/dish-queso-fundido-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Queso Fundido" loading="lazy" decoding="async"><span>Queso Fundido · $18</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/carne-asada/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Carne Asada | Casa Nopal, NYC</title>
<meta name="description" content="Carne Asada at Casa Nopal, West Village: Prime skirt steak, charred cebollitas, roasted jalapeño, salsa tatemada, tortillas. $42.">
<link rel="canonical" href="https://casanopal.nyc/menu/carne-asada/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Carne Asada">
<meta property="og:description" content="Carne Asada at Casa Nopal, West Village: Prime skirt steak, charred cebollitas, roasted jalapeño, salsa tatemada, tortillas. $42.">
<meta property="og:url" content="https://casanopal.nyc/menu/carne-asada/">
<meta property="og:image" content="../../assets/dish-carne-asada-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Carne Asada">
<meta name="twitter:description" content="Carne Asada at Casa Nopal, West Village: Prime skirt steak, charred cebollitas, roasted jalapeño, salsa tatemada, tortillas. $42.">
<meta name="twitter:image" content="../../assets/dish-carne-asada-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Carne Asada","item":"https://casanopal.nyc/menu/carne-asada/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Carne Asada","description":"Prime skirt steak marinated in lime, garlic and Mexican lager, grilled hard over oak and sliced at the pass. It comes with charred spring onions, a blistered jalapeño, salsa tatemada and a basket of warm tortillas for building your own tacos.","image":"../../assets/dish-carne-asada-lg.webp","url":"https://casanopal.nyc/menu/carne-asada/","offers":{"@type":"Offer","price":42,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/GlutenFreeDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-carne-asada-lg.webp?v=4" srcset="../../assets/dish-carne-asada-sm.webp?v=4 600w, ../../assets/dish-carne-asada-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Carne Asada: Prime skirt steak, charred cebollitas, roasted jalapeño, salsa tatemada, tortillas." fetchpriority="high" decoding="async" style="view-transition-name:dish-carne-asada"><span class="dish-photo-cap">Oak-grilled skirt steak</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Platos<br>No. 09</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#platos">Platos Fuertes</a></nav>
    <h1 class="dish-title" data-split>Carne Asada</h1>
    <div class="dish-meta"><span class="dish-price">$42</span><span class="tag">Gluten free</span><span class="tag">Dairy free</span><span class="tag tag-spice">Spice ✺✺<b>✺</b></span></div>
    <p class="dish-lead" data-reveal>Prime skirt steak marinated in lime, garlic and Mexican lager, grilled hard over oak and sliced at the pass. It comes with charred spring onions, a blistered jalapeño, salsa tatemada and a basket of warm tortillas for building your own tacos.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Prime skirt steak</li><li>Spring onions</li><li>Jalapeño</li><li>Salsa tatemada</li><li>Corn tortillas</li></ul></div>
    <a class="pairing" href="/menu/mezcal-flight/" data-reveal><span class="pairing-img"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Mezcal Flight</strong></span><span class="pairing-price">$32</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Carne Asada from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM12 0h1v1h-1zM15 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM20 0h1v1h-1zM22 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM15 1h1v1h-1zM17 1h1v1h-1zM20 1h1v1h-1zM22 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM12 2h1v1h-1zM14 2h1v1h-1zM16 2h1v1h-1zM17 2h1v1h-1zM19 2h1v1h-1zM22 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM13 3h1v1h-1zM15 3h1v1h-1zM17 3h1v1h-1zM19 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM16 4h1v1h-1zM17 4h1v1h-1zM19 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM23 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM20 5h1v1h-1zM22 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM12 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM19 7h1v1h-1zM20 7h1v1h-1zM21 7h1v1h-1zM23 7h1v1h-1zM24 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM12 8h1v1h-1zM13 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM16 8h1v1h-1zM19 8h1v1h-1zM21 8h1v1h-1zM23 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM27 8h1v1h-1zM3 9h1v1h-1zM7 9h1v1h-1zM9 9h1v1h-1zM10 9h1v1h-1zM12 9h1v1h-1zM16 9h1v1h-1zM20 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM25 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM31 9h1v1h-1zM32 9h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM16 10h1v1h-1zM17 10h1v1h-1zM19 10h1v1h-1zM22 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM30 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM9 11h1v1h-1zM11 11h1v1h-1zM14 11h1v1h-1zM17 11h1v1h-1zM19 11h1v1h-1zM20 11h1v1h-1zM21 11h1v1h-1zM22 11h1v1h-1zM28 11h1v1h-1zM29 11h1v1h-1zM32 11h1v1h-1zM0 12h1v1h-1zM1 12h1v1h-1zM2 12h1v1h-1zM3 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM10 12h1v1h-1zM19 12h1v1h-1zM21 12h1v1h-1zM22 12h1v1h-1zM24 12h1v1h-1zM26 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM1 13h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM13 13h1v1h-1zM15 13h1v1h-1zM16 13h1v1h-1zM21 13h1v1h-1zM24 13h1v1h-1zM25 13h1v1h-1zM26 13h1v1h-1zM27 13h1v1h-1zM28 13h1v1h-1zM29 13h1v1h-1zM31 13h1v1h-1zM32 13h1v1h-1zM0 14h1v1h-1zM1 14h1v1h-1zM3 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM12 14h1v1h-1zM14 14h1v1h-1zM17 14h1v1h-1zM20 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM24 14h1v1h-1zM25 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM28 14h1v1h-1zM30 14h1v1h-1zM31 14h1v1h-1zM0 15h1v1h-1zM2 15h1v1h-1zM3 15h1v1h-1zM4 15h1v1h-1zM5 15h1v1h-1zM8 15h1v1h-1zM9 15h1v1h-1zM12 15h1v1h-1zM14 15h1v1h-1zM15 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM19 15h1v1h-1zM21 15h1v1h-1zM23 15h1v1h-1zM24 15h1v1h-1zM26 15h1v1h-1zM27 15h1v1h-1zM31 15h1v1h-1zM1 16h1v1h-1zM2 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM17 16h1v1h-1zM19 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM29 16h1v1h-1zM31 16h1v1h-1zM1 17h1v1h-1zM3 17h1v1h-1zM4 17h1v1h-1zM8 17h1v1h-1zM11 17h1v1h-1zM14 17h1v1h-1zM16 17h1v1h-1zM21 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM27 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM1 18h1v1h-1zM3 18h1v1h-1zM6 18h1v1h-1zM10 18h1v1h-1zM12 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM22 18h1v1h-1zM25 18h1v1h-1zM30 18h1v1h-1zM32 18h1v1h-1zM1 19h1v1h-1zM3 19h1v1h-1zM4 19h1v1h-1zM5 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM17 19h1v1h-1zM18 19h1v1h-1zM19 19h1v1h-1zM20 19h1v1h-1zM21 19h1v1h-1zM25 19h1v1h-1zM26 19h1v1h-1zM27 19h1v1h-1zM31 19h1v1h-1zM1 20h1v1h-1zM2 20h1v1h-1zM3 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM9 20h1v1h-1zM10 20h1v1h-1zM11 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM17 20h1v1h-1zM18 20h1v1h-1zM19 20h1v1h-1zM22 20h1v1h-1zM23 20h1v1h-1zM24 20h1v1h-1zM25 20h1v1h-1zM31 20h1v1h-1zM4 21h1v1h-1zM5 21h1v1h-1zM7 21h1v1h-1zM10 21h1v1h-1zM11 21h1v1h-1zM12 21h1v1h-1zM14 21h1v1h-1zM15 21h1v1h-1zM16 21h1v1h-1zM17 21h1v1h-1zM18 21h1v1h-1zM19 21h1v1h-1zM20 21h1v1h-1zM21 21h1v1h-1zM24 21h1v1h-1zM25 21h1v1h-1zM26 21h1v1h-1zM29 21h1v1h-1zM31 21h1v1h-1zM32 21h1v1h-1zM0 22h1v1h-1zM1 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM10 22h1v1h-1zM12 22h1v1h-1zM14 22h1v1h-1zM15 22h1v1h-1zM20 22h1v1h-1zM24 22h1v1h-1zM25 22h1v1h-1zM26 22h1v1h-1zM29 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM3 23h1v1h-1zM4 23h1v1h-1zM7 23h1v1h-1zM9 23h1v1h-1zM11 23h1v1h-1zM13 23h1v1h-1zM14 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM21 23h1v1h-1zM22 23h1v1h-1zM23 23h1v1h-1zM29 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM10 24h1v1h-1zM11 24h1v1h-1zM14 24h1v1h-1zM15 24h1v1h-1zM16 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM20 24h1v1h-1zM21 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM31 24h1v1h-1zM8 25h1v1h-1zM9 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM16 25h1v1h-1zM19 25h1v1h-1zM20 25h1v1h-1zM22 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM32 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM9 26h1v1h-1zM10 26h1v1h-1zM12 26h1v1h-1zM21 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM29 26h1v1h-1zM30 26h1v1h-1zM31 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM10 27h1v1h-1zM11 27h1v1h-1zM13 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM20 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM10 28h1v1h-1zM11 28h1v1h-1zM13 28h1v1h-1zM14 28h1v1h-1zM16 28h1v1h-1zM22 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM29 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM9 29h1v1h-1zM10 29h1v1h-1zM15 29h1v1h-1zM17 29h1v1h-1zM19 29h1v1h-1zM20 29h1v1h-1zM23 29h1v1h-1zM26 29h1v1h-1zM28 29h1v1h-1zM31 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM9 30h1v1h-1zM11 30h1v1h-1zM12 30h1v1h-1zM13 30h1v1h-1zM17 30h1v1h-1zM24 30h1v1h-1zM28 30h1v1h-1zM29 30h1v1h-1zM30 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM10 31h1v1h-1zM14 31h1v1h-1zM15 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM21 31h1v1h-1zM22 31h1v1h-1zM24 31h1v1h-1zM25 31h1v1h-1zM26 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM13 32h1v1h-1zM14 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM24 32h1v1h-1zM25 32h1v1h-1zM26 32h1v1h-1zM28 32h1v1h-1zM29 32h1v1h-1zM31 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Carne Asada to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Carne Asada" data-price="42">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#platos">Back to Platos Fuertes <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/mole-negro/" rel="prev"><small>← Previous</small>Mole Negro</a><a href="/menu/pescado-zarandeado/" rel="next"><small>Next →</small>Pescado Zarandeado</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/mole-negro/" style="--r:-3deg"><img src="../../assets/dish-mole-negro-lg.webp?v=4" srcset="../../assets/dish-mole-negro-sm.webp?v=4 600w, ../../assets/dish-mole-negro-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Mole Negro" loading="lazy" decoding="async"><span>Mole Negro · $34</span></a><a class="polaroid" href="/menu/pescado-zarandeado/" style="--r:2deg"><img src="../../assets/dish-zarandeado-lg.webp?v=4" srcset="../../assets/dish-zarandeado-sm.webp?v=4 600w, ../../assets/dish-zarandeado-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Pescado Zarandeado" loading="lazy" decoding="async"><span>Pescado Zarandeado · $48</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/churros-con-chocolate/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Churros con Chocolate | Casa Nopal, NYC</title>
<meta name="description" content="Churros con Chocolate at Casa Nopal, West Village: Cinnamon-sugar churros, thick Oaxacan drinking chocolate. $13.">
<link rel="canonical" href="https://casanopal.nyc/menu/churros-con-chocolate/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Churros con Chocolate">
<meta property="og:description" content="Churros con Chocolate at Casa Nopal, West Village: Cinnamon-sugar churros, thick Oaxacan drinking chocolate. $13.">
<meta property="og:url" content="https://casanopal.nyc/menu/churros-con-chocolate/">
<meta property="og:image" content="../../assets/dish-churros-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Churros con Chocolate">
<meta name="twitter:description" content="Churros con Chocolate at Casa Nopal, West Village: Cinnamon-sugar churros, thick Oaxacan drinking chocolate. $13.">
<meta name="twitter:image" content="../../assets/dish-churros-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Churros con Chocolate","item":"https://casanopal.nyc/menu/churros-con-chocolate/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Churros con Chocolate","description":"Piped and fried to order so they reach you crisp, then tossed in canela sugar. Dip them in a thick, barely sweet drinking chocolate made with Oaxacan cacao and a pinch of chile.","image":"../../assets/dish-churros-lg.webp","url":"https://casanopal.nyc/menu/churros-con-chocolate/","offers":{"@type":"Offer","price":13,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/VegetarianDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-churros-lg.webp?v=4" srcset="../../assets/dish-churros-sm.webp?v=4 600w, ../../assets/dish-churros-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Churros con Chocolate: Cinnamon-sugar churros, thick Oaxacan drinking chocolate." fetchpriority="high" decoding="async" style="view-transition-name:dish-churros-con-chocolate"><span class="dish-photo-cap">Made to order</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Postres<br>No. 11</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#postres">Postres</a></nav>
    <h1 class="dish-title" data-split>Churros con Chocolate</h1>
    <div class="dish-meta"><span class="dish-price">$13</span><span class="tag">Vegetarian</span></div>
    <p class="dish-lead" data-reveal>Piped and fried to order so they reach you crisp, then tossed in canela sugar. Dip them in a thick, barely sweet drinking chocolate made with Oaxacan cacao and a pinch of chile.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Churro dough</li><li>Canela sugar</li><li>Oaxacan chocolate</li><li>Whole milk</li></ul></div>
    <a class="pairing" href="/menu/mezcal-flight/" data-reveal><span class="pairing-img"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Mezcal Flight</strong></span><span class="pairing-price">$32</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Churros con Chocolate from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM12 0h1v1h-1zM15 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM20 0h1v1h-1zM21 0h1v1h-1zM22 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM15 1h1v1h-1zM16 1h1v1h-1zM17 1h1v1h-1zM18 1h1v1h-1zM20 1h1v1h-1zM21 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM14 2h1v1h-1zM16 2h1v1h-1zM17 2h1v1h-1zM18 2h1v1h-1zM19 2h1v1h-1zM22 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM12 3h1v1h-1zM13 3h1v1h-1zM18 3h1v1h-1zM19 3h1v1h-1zM22 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM13 4h1v1h-1zM16 4h1v1h-1zM17 4h1v1h-1zM18 4h1v1h-1zM21 4h1v1h-1zM23 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM11 5h1v1h-1zM13 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM20 5h1v1h-1zM22 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM11 7h1v1h-1zM14 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM19 7h1v1h-1zM21 7h1v1h-1zM24 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM8 8h1v1h-1zM10 8h1v1h-1zM12 8h1v1h-1zM13 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM16 8h1v1h-1zM21 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM27 8h1v1h-1zM0 9h1v1h-1zM1 9h1v1h-1zM2 9h1v1h-1zM3 9h1v1h-1zM7 9h1v1h-1zM9 9h1v1h-1zM10 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM14 9h1v1h-1zM16 9h1v1h-1zM17 9h1v1h-1zM20 9h1v1h-1zM21 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM25 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM32 9h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM10 10h1v1h-1zM16 10h1v1h-1zM19 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM30 10h1v1h-1zM32 10h1v1h-1zM1 11h1v1h-1zM4 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM12 11h1v1h-1zM14 11h1v1h-1zM18 11h1v1h-1zM19 11h1v1h-1zM20 11h1v1h-1zM21 11h1v1h-1zM22 11h1v1h-1zM26 11h1v1h-1zM28 11h1v1h-1zM29 11h1v1h-1zM2 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM11 12h1v1h-1zM17 12h1v1h-1zM19 12h1v1h-1zM21 12h1v1h-1zM24 12h1v1h-1zM25 12h1v1h-1zM26 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM3 13h1v1h-1zM4 13h1v1h-1zM5 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM11 13h1v1h-1zM13 13h1v1h-1zM15 13h1v1h-1zM16 13h1v1h-1zM18 13h1v1h-1zM19 13h1v1h-1zM20 13h1v1h-1zM21 13h1v1h-1zM24 13h1v1h-1zM26 13h1v1h-1zM27 13h1v1h-1zM28 13h1v1h-1zM29 13h1v1h-1zM31 13h1v1h-1zM32 13h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM4 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1zM17 14h1v1h-1zM20 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM25 14h1v1h-1zM26 14h1v1h-1zM31 14h1v1h-1zM0 15h1v1h-1zM1 15h1v1h-1zM4 15h1v1h-1zM5 15h1v1h-1zM9 15h1v1h-1zM10 15h1v1h-1zM11 15h1v1h-1zM12 15h1v1h-1zM13 15h1v1h-1zM14 15h1v1h-1zM15 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM20 15h1v1h-1zM21 15h1v1h-1zM26 15h1v1h-1zM28 15h1v1h-1zM29 15h1v1h-1zM31 15h1v1h-1zM1 16h1v1h-1zM3 16h1v1h-1zM4 16h1v1h-1zM6 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM12 16h1v1h-1zM17 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM31 16h1v1h-1zM0 17h1v1h-1zM1 17h1v1h-1zM5 17h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM11 17h1v1h-1zM12 17h1v1h-1zM16 17h1v1h-1zM21 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM27 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM4 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM7 18h1v1h-1zM10 18h1v1h-1zM13 18h1v1h-1zM14 18h1v1h-1zM17 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM26 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM32 18h1v1h-1zM1 19h1v1h-1zM2 19h1v1h-1zM4 19h1v1h-1zM5 19h1v1h-1zM7 19h1v1h-1zM10 19h1v1h-1zM11 19h1v1h-1zM13 19h1v1h-1zM17 19h1v1h-1zM19 19h1v1h-1zM20 19h1v1h-1zM21 19h1v1h-1zM22 19h1v1h-1zM25 19h1v1h-1zM26 19h1v1h-1zM27 19h1v1h-1zM32 19h1v1h-1zM0 20h1v1h-1zM1 20h1v1h-1zM2 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM8 20h1v1h-1zM10 20h1v1h-1zM12 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM18 20h1v1h-1zM19 20h1v1h-1zM21 20h1v1h-1zM23 20h1v1h-1zM24 20h1v1h-1zM25 20h1v1h-1zM1 21h1v1h-1zM4 21h1v1h-1zM5 21h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM13 21h1v1h-1zM14 21h1v1h-1zM15 21h1v1h-1zM16 21h1v1h-1zM17 21h1v1h-1zM18 21h1v1h-1zM20 21h1v1h-1zM21 21h1v1h-1zM24 21h1v1h-1zM25 21h1v1h-1zM26 21h1v1h-1zM30 21h1v1h-1zM31 21h1v1h-1zM32 21h1v1h-1zM0 22h1v1h-1zM1 22h1v1h-1zM3 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM8 22h1v1h-1zM9 22h1v1h-1zM13 22h1v1h-1zM14 22h1v1h-1zM15 22h1v1h-1zM19 22h1v1h-1zM25 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM28 22h1v1h-1zM29 22h1v1h-1zM30 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM3 23h1v1h-1zM4 23h1v1h-1zM5 23h1v1h-1zM7 23h1v1h-1zM9 23h1v1h-1zM12 23h1v1h-1zM13 23h1v1h-1zM14 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM21 23h1v1h-1zM22 23h1v1h-1zM23 23h1v1h-1zM24 23h1v1h-1zM28 23h1v1h-1zM29 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM3 24h1v1h-1zM4 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM11 24h1v1h-1zM13 24h1v1h-1zM14 24h1v1h-1zM15 24h1v1h-1zM16 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM20 24h1v1h-1zM21 24h1v1h-1zM23 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM8 25h1v1h-1zM9 25h1v1h-1zM10 25h1v1h-1zM11 25h1v1h-1zM13 25h1v1h-1zM16 25h1v1h-1zM19 25h1v1h-1zM20 25h1v1h-1zM21 25h1v1h-1zM22 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM31 25h1v1h-1zM32 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM11 26h1v1h-1zM13 26h1v1h-1zM14 26h1v1h-1zM17 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM29 26h1v1h-1zM30 26h1v1h-1zM31 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM11 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM22 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM11 28h1v1h-1zM12 28h1v1h-1zM13 28h1v1h-1zM14 28h1v1h-1zM17 28h1v1h-1zM18 28h1v1h-1zM21 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM29 28h1v1h-1zM31 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM9 29h1v1h-1zM10 29h1v1h-1zM11 29h1v1h-1zM14 29h1v1h-1zM15 29h1v1h-1zM17 29h1v1h-1zM18 29h1v1h-1zM20 29h1v1h-1zM23 29h1v1h-1zM26 29h1v1h-1zM28 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM9 30h1v1h-1zM10 30h1v1h-1zM11 30h1v1h-1zM13 30h1v1h-1zM14 30h1v1h-1zM17 30h1v1h-1zM24 30h1v1h-1zM28 30h1v1h-1zM29 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM10 31h1v1h-1zM11 31h1v1h-1zM12 31h1v1h-1zM13 31h1v1h-1zM15 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM19 31h1v1h-1zM20 31h1v1h-1zM21 31h1v1h-1zM22 31h1v1h-1zM23 31h1v1h-1zM24 31h1v1h-1zM26 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM13 32h1v1h-1zM19 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM24 32h1v1h-1zM28 32h1v1h-1zM29 32h1v1h-1zM31 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Churros con Chocolate to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Churros con Chocolate" data-price="13">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#postres">Back to Postres <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/pescado-zarandeado/" rel="prev"><small>← Previous</small>Pescado Zarandeado</a><a href="/menu/flan-de-cajeta/" rel="next"><small>Next →</small>Flan de Cajeta</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/flan-de-cajeta/" style="--r:-3deg"><img src="../../assets/dish-flan-lg.webp?v=4" srcset="../../assets/dish-flan-sm.webp?v=4 600w, ../../assets/dish-flan-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Flan de Cajeta" loading="lazy" decoding="async"><span>Flan de Cajeta · $12</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:-2deg"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde · $24</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/elote-asado/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Elote Asado | Casa Nopal, NYC</title>
<meta name="description" content="Elote Asado at Casa Nopal, West Village: Charred sweet corn, lime crema, cotija, chile piquín. $14.">
<link rel="canonical" href="https://casanopal.nyc/menu/elote-asado/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Elote Asado">
<meta property="og:description" content="Elote Asado at Casa Nopal, West Village: Charred sweet corn, lime crema, cotija, chile piquín. $14.">
<meta property="og:url" content="https://casanopal.nyc/menu/elote-asado/">
<meta property="og:image" content="../../assets/dish-elote-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Elote Asado">
<meta name="twitter:description" content="Elote Asado at Casa Nopal, West Village: Charred sweet corn, lime crema, cotija, chile piquín. $14.">
<meta name="twitter:image" content="../../assets/dish-elote-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Elote Asado","item":"https://casanopal.nyc/menu/elote-asado/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Elote Asado","description":"Sweet corn is charred over oak until the kernels blister, brushed with lime crema and rolled through crumbled cotija. A dusting of chile piquín brings a slow, gentle heat.","image":"../../assets/dish-elote-lg.webp","url":"https://casanopal.nyc/menu/elote-asado/","offers":{"@type":"Offer","price":14,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/VegetarianDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-elote-lg.webp?v=4" srcset="../../assets/dish-elote-sm.webp?v=4 600w, ../../assets/dish-elote-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Elote Asado: Charred sweet corn, lime crema, cotija, chile piquín." fetchpriority="high" decoding="async" style="view-transition-name:dish-elote-asado"><span class="dish-photo-cap">Street corn from the grill</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Antojitos<br>No. 02</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#antojitos">Antojitos</a></nav>
    <h1 class="dish-title" data-split>Elote Asado</h1>
    <div class="dish-meta"><span class="dish-price">$14</span><span class="tag">Vegetarian</span><span class="tag">Gluten free</span><span class="tag tag-spice">Spice ✺<b>✺✺</b></span></div>
    <p class="dish-lead" data-reveal>Sweet corn is charred over oak until the kernels blister, brushed with lime crema and rolled through crumbled cotija. A dusting of chile piquín brings a slow, gentle heat.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Sweet corn</li><li>Lime crema</li><li>Cotija</li><li>Chile piquín</li><li>Lime</li></ul></div>
    <a class="pairing" href="/menu/margarita-de-la-casa/" data-reveal><span class="pairing-img"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Margarita de la Casa</strong></span><span class="pairing-price">$17</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Elote Asado from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM12 0h1v1h-1zM16 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM21 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM11 1h1v1h-1zM14 1h1v1h-1zM17 1h1v1h-1zM21 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM13 2h1v1h-1zM14 2h1v1h-1zM18 2h1v1h-1zM22 2h1v1h-1zM23 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM18 3h1v1h-1zM23 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM11 4h1v1h-1zM13 4h1v1h-1zM16 4h1v1h-1zM18 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1zM16 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM21 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM15 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM19 7h1v1h-1zM22 7h1v1h-1zM23 7h1v1h-1zM24 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM16 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM21 8h1v1h-1zM26 8h1v1h-1zM29 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM0 9h1v1h-1zM1 9h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM14 9h1v1h-1zM16 9h1v1h-1zM17 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM20 9h1v1h-1zM22 9h1v1h-1zM23 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM32 9h1v1h-1zM0 10h1v1h-1zM2 10h1v1h-1zM3 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM12 10h1v1h-1zM13 10h1v1h-1zM16 10h1v1h-1zM18 10h1v1h-1zM22 10h1v1h-1zM23 10h1v1h-1zM24 10h1v1h-1zM25 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM2 11h1v1h-1zM3 11h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM17 11h1v1h-1zM19 11h1v1h-1zM26 11h1v1h-1zM27 11h1v1h-1zM29 11h1v1h-1zM0 12h1v1h-1zM1 12h1v1h-1zM2 12h1v1h-1zM4 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM8 12h1v1h-1zM10 12h1v1h-1zM14 12h1v1h-1zM15 12h1v1h-1zM16 12h1v1h-1zM19 12h1v1h-1zM20 12h1v1h-1zM24 12h1v1h-1zM27 12h1v1h-1zM28 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM32 12h1v1h-1zM0 13h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM4 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM12 13h1v1h-1zM13 13h1v1h-1zM14 13h1v1h-1zM20 13h1v1h-1zM22 13h1v1h-1zM24 13h1v1h-1zM25 13h1v1h-1zM29 13h1v1h-1zM31 13h1v1h-1zM0 14h1v1h-1zM3 14h1v1h-1zM4 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM10 14h1v1h-1zM11 14h1v1h-1zM12 14h1v1h-1zM14 14h1v1h-1zM18 14h1v1h-1zM19 14h1v1h-1zM20 14h1v1h-1zM22 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM29 14h1v1h-1zM0 15h1v1h-1zM2 15h1v1h-1zM4 15h1v1h-1zM5 15h1v1h-1zM7 15h1v1h-1zM9 15h1v1h-1zM10 15h1v1h-1zM11 15h1v1h-1zM12 15h1v1h-1zM13 15h1v1h-1zM14 15h1v1h-1zM15 15h1v1h-1zM21 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM28 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM1 16h1v1h-1zM3 16h1v1h-1zM4 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM11 16h1v1h-1zM18 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM23 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM30 16h1v1h-1zM2 17h1v1h-1zM4 17h1v1h-1zM5 17h1v1h-1zM11 17h1v1h-1zM12 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM32 17h1v1h-1zM0 18h1v1h-1zM1 18h1v1h-1zM3 18h1v1h-1zM4 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM10 18h1v1h-1zM11 18h1v1h-1zM13 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1zM18 18h1v1h-1zM21 18h1v1h-1zM25 18h1v1h-1zM26 18h1v1h-1zM27 18h1v1h-1zM28 18h1v1h-1zM30 18h1v1h-1zM1 19h1v1h-1zM2 19h1v1h-1zM4 19h1v1h-1zM7 19h1v1h-1zM12 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM17 19h1v1h-1zM18 19h1v1h-1zM19 19h1v1h-1zM22 19h1v1h-1zM25 19h1v1h-1zM28 19h1v1h-1zM31 19h1v1h-1zM32 19h1v1h-1zM0 20h1v1h-1zM1 20h1v1h-1zM2 20h1v1h-1zM4 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM7 20h1v1h-1zM10 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM22 20h1v1h-1zM29 20h1v1h-1zM30 20h1v1h-1zM0 21h1v1h-1zM1 21h1v1h-1zM5 21h1v1h-1zM7 21h1v1h-1zM10 21h1v1h-1zM15 21h1v1h-1zM16 21h1v1h-1zM20 21h1v1h-1zM21 21h1v1h-1zM23 21h1v1h-1zM26 21h1v1h-1zM30 21h1v1h-1zM32 21h1v1h-1zM3 22h1v1h-1zM6 22h1v1h-1zM7 22h1v1h-1zM8 22h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM12 22h1v1h-1zM15 22h1v1h-1zM17 22h1v1h-1zM18 22h1v1h-1zM19 22h1v1h-1zM20 22h1v1h-1zM23 22h1v1h-1zM26 22h1v1h-1zM30 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM4 23h1v1h-1zM5 23h1v1h-1zM7 23h1v1h-1zM8 23h1v1h-1zM10 23h1v1h-1zM13 23h1v1h-1zM15 23h1v1h-1zM18 23h1v1h-1zM20 23h1v1h-1zM23 23h1v1h-1zM26 23h1v1h-1zM27 23h1v1h-1zM28 23h1v1h-1zM29 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM13 24h1v1h-1zM14 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM22 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM31 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM11 25h1v1h-1zM12 25h1v1h-1zM15 25h1v1h-1zM19 25h1v1h-1zM21 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM9 26h1v1h-1zM10 26h1v1h-1zM14 26h1v1h-1zM17 26h1v1h-1zM18 26h1v1h-1zM19 26h1v1h-1zM21 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM11 27h1v1h-1zM13 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM19 27h1v1h-1zM20 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM9 28h1v1h-1zM10 28h1v1h-1zM14 28h1v1h-1zM16 28h1v1h-1zM17 28h1v1h-1zM18 28h1v1h-1zM19 28h1v1h-1zM22 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM30 28h1v1h-1zM31 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM9 29h1v1h-1zM10 29h1v1h-1zM11 29h1v1h-1zM13 29h1v1h-1zM16 29h1v1h-1zM17 29h1v1h-1zM19 29h1v1h-1zM21 29h1v1h-1zM22 29h1v1h-1zM23 29h1v1h-1zM27 29h1v1h-1zM31 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM8 30h1v1h-1zM9 30h1v1h-1zM10 30h1v1h-1zM11 30h1v1h-1zM12 30h1v1h-1zM15 30h1v1h-1zM16 30h1v1h-1zM17 30h1v1h-1zM20 30h1v1h-1zM21 30h1v1h-1zM22 30h1v1h-1zM24 30h1v1h-1zM26 30h1v1h-1zM27 30h1v1h-1zM29 30h1v1h-1zM30 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM13 31h1v1h-1zM17 31h1v1h-1zM20 31h1v1h-1zM24 31h1v1h-1zM25 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM10 32h1v1h-1zM17 32h1v1h-1zM18 32h1v1h-1zM19 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM26 32h1v1h-1zM28 32h1v1h-1zM30 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Elote Asado to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Elote Asado" data-price="14">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#antojitos">Back to Antojitos <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/guacamole-de-molcajete/" rel="prev"><small>← Previous</small>Guacamole de Molcajete</a><a href="/menu/aguachile-verde/" rel="next"><small>Next →</small>Aguachile Verde</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-3deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:2deg"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde · $24</span></a><a class="polaroid" href="/menu/queso-fundido/" style="--r:-2deg"><img src="../../assets/dish-queso-fundido-lg.webp?v=4" srcset="../../assets/dish-queso-fundido-sm.webp?v=4 600w, ../../assets/dish-queso-fundido-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Queso Fundido" loading="lazy" decoding="async"><span>Queso Fundido · $18</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/flan-de-cajeta/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flan de Cajeta | Casa Nopal, NYC</title>
<meta name="description" content="Flan de Cajeta at Casa Nopal, West Village: Silky vanilla flan, goat milk cajeta, flaky salt. $12.">
<link rel="canonical" href="https://casanopal.nyc/menu/flan-de-cajeta/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Flan de Cajeta">
<meta property="og:description" content="Flan de Cajeta at Casa Nopal, West Village: Silky vanilla flan, goat milk cajeta, flaky salt. $12.">
<meta property="og:url" content="https://casanopal.nyc/menu/flan-de-cajeta/">
<meta property="og:image" content="../../assets/dish-flan-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Flan de Cajeta">
<meta name="twitter:description" content="Flan de Cajeta at Casa Nopal, West Village: Silky vanilla flan, goat milk cajeta, flaky salt. $12.">
<meta name="twitter:image" content="../../assets/dish-flan-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Flan de Cajeta","item":"https://casanopal.nyc/menu/flan-de-cajeta/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Flan de Cajeta","description":"A dense, silky flan perfumed with Papantla vanilla, set in a caramel of slow-cooked goat milk cajeta and finished with a few flakes of sea salt.","image":"../../assets/dish-flan-lg.webp","url":"https://casanopal.nyc/menu/flan-de-cajeta/","offers":{"@type":"Offer","price":12,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/VegetarianDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-flan-lg.webp?v=4" srcset="../../assets/dish-flan-sm.webp?v=4 600w, ../../assets/dish-flan-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Flan de Cajeta: Silky vanilla flan, goat milk cajeta, flaky salt." fetchpriority="high" decoding="async" style="view-transition-name:dish-flan-de-cajeta"><span class="dish-photo-cap">Goat milk caramel</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Postres<br>No. 12</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#postres">Postres</a></nav>
    <h1 class="dish-title" data-split>Flan de Cajeta</h1>
    <div class="dish-meta"><span class="dish-price">$12</span><span class="tag">Vegetarian</span><span class="tag">Gluten free</span></div>
    <p class="dish-lead" data-reveal>A dense, silky flan perfumed with Papantla vanilla, set in a caramel of slow-cooked goat milk cajeta and finished with a few flakes of sea salt.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Free-range eggs</li><li>Papantla vanilla</li><li>Goat milk cajeta</li><li>Sea salt</li></ul></div>
    <a class="pairing" href="/menu/mezcal-flight/" data-reveal><span class="pairing-img"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Mezcal Flight</strong></span><span class="pairing-price">$32</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Flan de Cajeta from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM11 0h1v1h-1zM12 0h1v1h-1zM13 0h1v1h-1zM16 0h1v1h-1zM17 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM21 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM10 1h1v1h-1zM13 1h1v1h-1zM18 1h1v1h-1zM21 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM17 2h1v1h-1zM22 2h1v1h-1zM23 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM11 3h1v1h-1zM14 3h1v1h-1zM16 3h1v1h-1zM20 3h1v1h-1zM22 3h1v1h-1zM23 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM14 4h1v1h-1zM20 4h1v1h-1zM21 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM10 5h1v1h-1zM13 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM20 5h1v1h-1zM21 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM20 7h1v1h-1zM22 7h1v1h-1zM24 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM10 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM19 8h1v1h-1zM21 8h1v1h-1zM23 8h1v1h-1zM26 8h1v1h-1zM29 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM2 9h1v1h-1zM5 9h1v1h-1zM8 9h1v1h-1zM16 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM20 9h1v1h-1zM21 9h1v1h-1zM22 9h1v1h-1zM23 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM32 9h1v1h-1zM0 10h1v1h-1zM2 10h1v1h-1zM3 10h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM14 10h1v1h-1zM17 10h1v1h-1zM22 10h1v1h-1zM23 10h1v1h-1zM24 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM4 11h1v1h-1zM11 11h1v1h-1zM13 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM18 11h1v1h-1zM19 11h1v1h-1zM22 11h1v1h-1zM27 11h1v1h-1zM29 11h1v1h-1zM31 11h1v1h-1zM0 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM15 12h1v1h-1zM18 12h1v1h-1zM19 12h1v1h-1zM22 12h1v1h-1zM24 12h1v1h-1zM25 12h1v1h-1zM27 12h1v1h-1zM28 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM16 13h1v1h-1zM18 13h1v1h-1zM24 13h1v1h-1zM25 13h1v1h-1zM27 13h1v1h-1zM31 13h1v1h-1zM4 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM11 14h1v1h-1zM12 14h1v1h-1zM15 14h1v1h-1zM16 14h1v1h-1zM18 14h1v1h-1zM22 14h1v1h-1zM24 14h1v1h-1zM26 14h1v1h-1zM29 14h1v1h-1zM3 15h1v1h-1zM8 15h1v1h-1zM9 15h1v1h-1zM11 15h1v1h-1zM16 15h1v1h-1zM19 15h1v1h-1zM20 15h1v1h-1zM21 15h1v1h-1zM23 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM27 15h1v1h-1zM28 15h1v1h-1zM30 15h1v1h-1zM0 16h1v1h-1zM2 16h1v1h-1zM3 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM15 16h1v1h-1zM18 16h1v1h-1zM19 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM29 16h1v1h-1zM30 16h1v1h-1zM1 17h1v1h-1zM2 17h1v1h-1zM5 17h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM12 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1zM17 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM32 17h1v1h-1zM1 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1zM17 18h1v1h-1zM21 18h1v1h-1zM22 18h1v1h-1zM25 18h1v1h-1zM27 18h1v1h-1zM28 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM0 19h1v1h-1zM2 19h1v1h-1zM3 19h1v1h-1zM5 19h1v1h-1zM7 19h1v1h-1zM8 19h1v1h-1zM9 19h1v1h-1zM10 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM19 19h1v1h-1zM22 19h1v1h-1zM26 19h1v1h-1zM28 19h1v1h-1zM31 19h1v1h-1zM32 19h1v1h-1zM0 20h1v1h-1zM3 20h1v1h-1zM4 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM8 20h1v1h-1zM9 20h1v1h-1zM13 20h1v1h-1zM15 20h1v1h-1zM18 20h1v1h-1zM21 20h1v1h-1zM24 20h1v1h-1zM29 20h1v1h-1zM30 20h1v1h-1zM32 20h1v1h-1zM0 21h1v1h-1zM2 21h1v1h-1zM3 21h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM12 21h1v1h-1zM14 21h1v1h-1zM15 21h1v1h-1zM18 21h1v1h-1zM21 21h1v1h-1zM22 21h1v1h-1zM23 21h1v1h-1zM24 21h1v1h-1zM26 21h1v1h-1zM29 21h1v1h-1zM32 21h1v1h-1zM2 22h1v1h-1zM3 22h1v1h-1zM6 22h1v1h-1zM8 22h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM11 22h1v1h-1zM12 22h1v1h-1zM13 22h1v1h-1zM16 22h1v1h-1zM17 22h1v1h-1zM18 22h1v1h-1zM23 22h1v1h-1zM24 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM3 23h1v1h-1zM4 23h1v1h-1zM5 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM19 23h1v1h-1zM23 23h1v1h-1zM24 23h1v1h-1zM26 23h1v1h-1zM28 23h1v1h-1zM29 23h1v1h-1zM31 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM3 24h1v1h-1zM4 24h1v1h-1zM6 24h1v1h-1zM10 24h1v1h-1zM11 24h1v1h-1zM14 24h1v1h-1zM15 24h1v1h-1zM17 24h1v1h-1zM22 24h1v1h-1zM23 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM11 25h1v1h-1zM12 25h1v1h-1zM14 25h1v1h-1zM15 25h1v1h-1zM17 25h1v1h-1zM19 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM10 26h1v1h-1zM11 26h1v1h-1zM12 26h1v1h-1zM13 26h1v1h-1zM19 26h1v1h-1zM21 26h1v1h-1zM22 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM31 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM9 27h1v1h-1zM11 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM19 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM10 28h1v1h-1zM14 28h1v1h-1zM17 28h1v1h-1zM19 28h1v1h-1zM21 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM30 28h1v1h-1zM31 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM9 29h1v1h-1zM11 29h1v1h-1zM13 29h1v1h-1zM14 29h1v1h-1zM17 29h1v1h-1zM18 29h1v1h-1zM21 29h1v1h-1zM23 29h1v1h-1zM27 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM8 30h1v1h-1zM9 30h1v1h-1zM11 30h1v1h-1zM12 30h1v1h-1zM14 30h1v1h-1zM17 30h1v1h-1zM20 30h1v1h-1zM21 30h1v1h-1zM22 30h1v1h-1zM24 30h1v1h-1zM26 30h1v1h-1zM27 30h1v1h-1zM29 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM10 31h1v1h-1zM11 31h1v1h-1zM15 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM23 31h1v1h-1zM24 31h1v1h-1zM26 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM12 32h1v1h-1zM13 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM18 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM28 32h1v1h-1zM30 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Flan de Cajeta to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Flan de Cajeta" data-price="12">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#postres">Back to Postres <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/churros-con-chocolate/" rel="prev"><small>← Previous</small>Churros con Chocolate</a><a href="/menu/margarita-de-la-casa/" rel="next"><small>Next →</small>Margarita de la Casa</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/churros-con-chocolate/" style="--r:-3deg"><img src="../../assets/dish-churros-lg.webp?v=4" srcset="../../assets/dish-churros-sm.webp?v=4 600w, ../../assets/dish-churros-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Churros con Chocolate" loading="lazy" decoding="async"><span>Churros con Chocolate · $13</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:-2deg"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde · $24</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/guacamole-de-molcajete/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Guacamole de Molcajete | Casa Nopal, NYC</title>
<meta name="description" content="Guacamole de Molcajete at Casa Nopal, West Village: Hass avocado crushed in volcanic stone with serrano, white onion and lime, finished with pomegranate and t">
<link rel="canonical" href="https://casanopal.nyc/menu/guacamole-de-molcajete/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Guacamole de Molcajete">
<meta property="og:description" content="Guacamole de Molcajete at Casa Nopal, West Village: Hass avocado crushed in volcanic stone with serrano, white onion and lime, finished with pomegranate and t">
<meta property="og:url" content="https://casanopal.nyc/menu/guacamole-de-molcajete/">
<meta property="og:image" content="../../assets/dish-guacamole-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Guacamole de Molcajete">
<meta name="twitter:description" content="Guacamole de Molcajete at Casa Nopal, West Village: Hass avocado crushed in volcanic stone with serrano, white onion and lime, finished with pomegranate and t">
<meta name="twitter:image" content="../../assets/dish-guacamole-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Guacamole de Molcajete","item":"https://casanopal.nyc/menu/guacamole-de-molcajete/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Guacamole de Molcajete","description":"We make it the slow way, at the moment you order it. Avocado, serrano, white onion and cilantro are worked together in a basalt molcajete from Puebla, seasoned with lime and sea salt, then topped with pomegranate seeds and pepitas toasted on the comal. It arrives with warm totopos cut from our blue-corn tortillas.","image":"../../assets/dish-guacamole-lg.webp","url":"https://casanopal.nyc/menu/guacamole-de-molcajete/","offers":{"@type":"Offer","price":19,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/VeganDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Guacamole de Molcajete: Hass avocado crushed in volcanic stone with serrano, white onion and lime, finished with pomegranate and toasted pepitas." fetchpriority="high" decoding="async" style="view-transition-name:dish-guacamole-de-molcajete"><span class="dish-photo-cap">Pounded to order</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Antojitos<br>No. 01</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#antojitos">Antojitos</a></nav>
    <h1 class="dish-title" data-split>Guacamole de Molcajete</h1>
    <div class="dish-meta"><span class="dish-price">$19</span><span class="tag">Vegan</span><span class="tag">Gluten free</span><span class="tag tag-spice">Spice ✺<b>✺✺</b></span></div>
    <p class="dish-lead" data-reveal>We make it the slow way, at the moment you order it. Avocado, serrano, white onion and cilantro are worked together in a basalt molcajete from Puebla, seasoned with lime and sea salt, then topped with pomegranate seeds and pepitas toasted on the comal. It arrives with warm totopos cut from our blue-corn tortillas.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Hass avocado</li><li>Serrano chile</li><li>White onion</li><li>Cilantro</li><li>Pomegranate</li><li>Toasted pepitas</li><li>Blue-corn totopos</li></ul></div>
    <a class="pairing" href="/menu/margarita-de-la-casa/" data-reveal><span class="pairing-img"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Margarita de la Casa</strong></span><span class="pairing-price">$17</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Guacamole de Molcajete from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM11 0h1v1h-1zM13 0h1v1h-1zM16 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM21 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM13 1h1v1h-1zM16 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM12 2h1v1h-1zM23 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM14 3h1v1h-1zM15 3h1v1h-1zM16 3h1v1h-1zM17 3h1v1h-1zM20 3h1v1h-1zM22 3h1v1h-1zM23 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM14 4h1v1h-1zM19 4h1v1h-1zM21 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM9 5h1v1h-1zM12 5h1v1h-1zM13 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM20 5h1v1h-1zM21 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM8 7h1v1h-1zM10 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM19 7h1v1h-1zM22 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM9 8h1v1h-1zM10 8h1v1h-1zM14 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM21 8h1v1h-1zM26 8h1v1h-1zM29 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM2 9h1v1h-1zM3 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM16 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM20 9h1v1h-1zM22 9h1v1h-1zM23 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM32 9h1v1h-1zM0 10h1v1h-1zM2 10h1v1h-1zM4 10h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM14 10h1v1h-1zM16 10h1v1h-1zM17 10h1v1h-1zM18 10h1v1h-1zM21 10h1v1h-1zM23 10h1v1h-1zM24 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM2 11h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM11 11h1v1h-1zM13 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM19 11h1v1h-1zM22 11h1v1h-1zM27 11h1v1h-1zM29 11h1v1h-1zM0 12h1v1h-1zM2 12h1v1h-1zM3 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM10 12h1v1h-1zM15 12h1v1h-1zM17 12h1v1h-1zM19 12h1v1h-1zM22 12h1v1h-1zM24 12h1v1h-1zM27 12h1v1h-1zM28 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM32 12h1v1h-1zM1 13h1v1h-1zM5 13h1v1h-1zM8 13h1v1h-1zM11 13h1v1h-1zM13 13h1v1h-1zM16 13h1v1h-1zM19 13h1v1h-1zM24 13h1v1h-1zM27 13h1v1h-1zM30 13h1v1h-1zM31 13h1v1h-1zM0 14h1v1h-1zM3 14h1v1h-1zM4 14h1v1h-1zM6 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM11 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1zM15 14h1v1h-1zM16 14h1v1h-1zM18 14h1v1h-1zM19 14h1v1h-1zM20 14h1v1h-1zM22 14h1v1h-1zM26 14h1v1h-1zM28 14h1v1h-1zM29 14h1v1h-1zM30 14h1v1h-1zM0 15h1v1h-1zM1 15h1v1h-1zM2 15h1v1h-1zM3 15h1v1h-1zM5 15h1v1h-1zM7 15h1v1h-1zM10 15h1v1h-1zM16 15h1v1h-1zM19 15h1v1h-1zM20 15h1v1h-1zM21 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM2 16h1v1h-1zM4 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM10 16h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM14 16h1v1h-1zM15 16h1v1h-1zM18 16h1v1h-1zM19 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM29 16h1v1h-1zM30 16h1v1h-1zM0 17h1v1h-1zM1 17h1v1h-1zM2 17h1v1h-1zM3 17h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM32 17h1v1h-1zM1 18h1v1h-1zM2 18h1v1h-1zM3 18h1v1h-1zM4 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1zM21 18h1v1h-1zM22 18h1v1h-1zM25 18h1v1h-1zM26 18h1v1h-1zM27 18h1v1h-1zM28 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM1 19h1v1h-1zM7 19h1v1h-1zM9 19h1v1h-1zM10 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM17 19h1v1h-1zM18 19h1v1h-1zM19 19h1v1h-1zM22 19h1v1h-1zM25 19h1v1h-1zM26 19h1v1h-1zM28 19h1v1h-1zM31 19h1v1h-1zM32 19h1v1h-1zM0 20h1v1h-1zM1 20h1v1h-1zM2 20h1v1h-1zM3 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM9 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM17 20h1v1h-1zM18 20h1v1h-1zM20 20h1v1h-1zM21 20h1v1h-1zM29 20h1v1h-1zM30 20h1v1h-1zM31 20h1v1h-1zM0 21h1v1h-1zM4 21h1v1h-1zM5 21h1v1h-1zM7 21h1v1h-1zM8 21h1v1h-1zM11 21h1v1h-1zM12 21h1v1h-1zM13 21h1v1h-1zM14 21h1v1h-1zM15 21h1v1h-1zM19 21h1v1h-1zM21 21h1v1h-1zM22 21h1v1h-1zM23 21h1v1h-1zM26 21h1v1h-1zM29 21h1v1h-1zM32 21h1v1h-1zM3 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM11 22h1v1h-1zM16 22h1v1h-1zM17 22h1v1h-1zM18 22h1v1h-1zM23 22h1v1h-1zM24 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM29 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM7 23h1v1h-1zM9 23h1v1h-1zM11 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM20 23h1v1h-1zM23 23h1v1h-1zM24 23h1v1h-1zM26 23h1v1h-1zM27 23h1v1h-1zM29 23h1v1h-1zM31 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM4 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM11 24h1v1h-1zM12 24h1v1h-1zM13 24h1v1h-1zM15 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM22 24h1v1h-1zM23 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM11 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM15 25h1v1h-1zM17 25h1v1h-1zM19 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM10 26h1v1h-1zM11 26h1v1h-1zM12 26h1v1h-1zM17 26h1v1h-1zM19 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM10 27h1v1h-1zM11 27h1v1h-1zM12 27h1v1h-1zM13 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM18 27h1v1h-1zM19 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM9 28h1v1h-1zM11 28h1v1h-1zM16 28h1v1h-1zM19 28h1v1h-1zM20 28h1v1h-1zM21 28h1v1h-1zM22 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM30 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM10 29h1v1h-1zM11 29h1v1h-1zM13 29h1v1h-1zM15 29h1v1h-1zM16 29h1v1h-1zM17 29h1v1h-1zM18 29h1v1h-1zM21 29h1v1h-1zM22 29h1v1h-1zM23 29h1v1h-1zM27 29h1v1h-1zM29 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM8 30h1v1h-1zM13 30h1v1h-1zM15 30h1v1h-1zM16 30h1v1h-1zM17 30h1v1h-1zM20 30h1v1h-1zM21 30h1v1h-1zM22 30h1v1h-1zM24 30h1v1h-1zM26 30h1v1h-1zM27 30h1v1h-1zM29 30h1v1h-1zM30 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM12 31h1v1h-1zM13 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM23 31h1v1h-1zM24 31h1v1h-1zM25 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM29 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM11 32h1v1h-1zM13 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM18 32h1v1h-1zM19 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM28 32h1v1h-1zM30 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Guacamole de Molcajete to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Guacamole de Molcajete" data-price="19">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#antojitos">Back to Antojitos <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/mezcal-flight/" rel="prev"><small>← Previous</small>Mezcal Flight</a><a href="/menu/elote-asado/" rel="next"><small>Next →</small>Elote Asado</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/elote-asado/" style="--r:-3deg"><img src="../../assets/dish-elote-lg.webp?v=4" srcset="../../assets/dish-elote-sm.webp?v=4 600w, ../../assets/dish-elote-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Elote Asado" loading="lazy" decoding="async"><span>Elote Asado · $14</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:2deg"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde · $24</span></a><a class="polaroid" href="/menu/queso-fundido/" style="--r:-2deg"><img src="../../assets/dish-queso-fundido-lg.webp?v=4" srcset="../../assets/dish-queso-fundido-sm.webp?v=4 600w, ../../assets/dish-queso-fundido-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Queso Fundido" loading="lazy" decoding="async"><span>Queso Fundido · $18</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Menu | Casa Nopal, NYC</title>
<meta name="description" content="The Casa Nopal menu: 14 dishes from antojitos and tacos al pastor to Oaxacan mole negro, oak-grilled carne asada, churros and a mezcal flight.">
<link rel="canonical" href="https://casanopal.nyc/menu/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Menu">
<meta property="og:description" content="The Casa Nopal menu: 14 dishes from antojitos and tacos al pastor to Oaxacan mole negro, oak-grilled carne asada, churros and a mezcal flight.">
<meta property="og:url" content="https://casanopal.nyc/menu/">
<meta property="og:image" content="../assets/dish-al-pastor-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Menu">
<meta name="twitter:description" content="The Casa Nopal menu: 14 dishes from antojitos and tacos al pastor to Oaxacan mole negro, oak-grilled carne asada, churros and a mezcal flight.">
<meta name="twitter:image" content="../assets/dish-al-pastor-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Menu","name":"Casa Nopal dinner menu","url":"https://casanopal.nyc/menu/","inLanguage":"en","hasMenuSection":[{"@type":"MenuSection","name":"Antojitos","description":"Small plates to share while the mezcal is poured.","hasMenuItem":[{"@type":"MenuItem","name":"Guacamole de Molcajete","description":"Hass avocado crushed in volcanic stone with serrano, white onion and lime, finished with pomegranate and toasted pepitas.","url":"https://casanopal.nyc/menu/guacamole-de-molcajete/","offers":{"@type":"Offer","price":19,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Elote Asado","description":"Charred sweet corn, lime crema, cotija, chile piquín.","url":"https://casanopal.nyc/menu/elote-asado/","offers":{"@type":"Offer","price":14,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Aguachile Verde","description":"Wild shrimp cured in green chile and lime, cucumber, red onion, avocado.","url":"https://casanopal.nyc/menu/aguachile-verde/","offers":{"@type":"Offer","price":24,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Queso Fundido","description":"Melted Oaxaca and Chihuahua cheese, house chorizo, rajas, flour tortillas.","url":"https://casanopal.nyc/menu/queso-fundido/","offers":{"@type":"Offer","price":18,"priceCurrency":"USD"}}]},{"@type":"MenuSection","name":"Tacos","description":"Three to an order, on tortillas pressed by hand every hour.","hasMenuItem":[{"@type":"MenuItem","name":"Tacos al Pastor","description":"Achiote-marinated pork shaved from the trompo, charred pineapple, onion, cilantro, salsa roja.","url":"https://casanopal.nyc/menu/tacos-al-pastor/","offers":{"@type":"Offer","price":18,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Tacos de Carnitas","description":"Pork confit in its own fat until crisp, pickled red onion, salsa verde cruda.","url":"https://casanopal.nyc/menu/tacos-de-carnitas/","offers":{"@type":"Offer","price":17,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Tacos Baja","description":"Beer-battered cod, cabbage slaw, chipotle crema, lime.","url":"https://casanopal.nyc/menu/tacos-baja/","offers":{"@type":"Offer","price":19,"priceCurrency":"USD"}}]},{"@type":"MenuSection","name":"Platos Fuertes","description":"Larger plates from the wood grill and the mole pot.","hasMenuItem":[{"@type":"MenuItem","name":"Mole Negro","description":"Braised chicken in a mole of 28 ingredients, sesame, arroz blanco, tortillas.","url":"https://casanopal.nyc/menu/mole-negro/","offers":{"@type":"Offer","price":34,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Carne Asada","description":"Prime skirt steak, charred cebollitas, roasted jalapeño, salsa tatemada, tortillas.","url":"https://casanopal.nyc/menu/carne-asada/","offers":{"@type":"Offer","price":42,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Pescado Zarandeado","description":"Whole red snapper in a red chile adobo, grilled in a basket, lime and herbs. Serves two.","url":"https://casanopal.nyc/menu/pescado-zarandeado/","offers":{"@type":"Offer","price":48,"priceCurrency":"USD"}}]},{"@type":"MenuSection","name":"Postres","description":"Something sweet to close the night.","hasMenuItem":[{"@type":"MenuItem","name":"Churros con Chocolate","description":"Cinnamon-sugar churros, thick Oaxacan drinking chocolate.","url":"https://casanopal.nyc/menu/churros-con-chocolate/","offers":{"@type":"Offer","price":13,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Flan de Cajeta","description":"Silky vanilla flan, goat milk cajeta, flaky salt.","url":"https://casanopal.nyc/menu/flan-de-cajeta/","offers":{"@type":"Offer","price":12,"priceCurrency":"USD"}}]},{"@type":"MenuSection","name":"Bebidas","description":"Agave first. Over 80 mezcales and tequilas behind the bar.","hasMenuItem":[{"@type":"MenuItem","name":"Margarita de la Casa","description":"Blanco tequila, fresh lime, agave, a whisper of mezcal, sal de gusano rim.","url":"https://casanopal.nyc/menu/margarita-de-la-casa/","offers":{"@type":"Offer","price":17,"priceCurrency":"USD"}},{"@type":"MenuItem","name":"Mezcal Flight","description":"Espadín, Tobalá and a rotating wild agave, with orange and sal de gusano.","url":"https://casanopal.nyc/menu/mezcal-flight/","offers":{"@type":"Offer","price":32,"priceCurrency":"USD"}}]}]}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<section class="phead">
  <div class="picado " data-picado aria-hidden="true"></div>
  <div class="wrap phead-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><span aria-current="page">Menu</span></nav>
    <p class="label" data-reveal>La carta <i>✦</i> Dinner & bar</p>
    <h1 class="mega" data-split><span class="dot" aria-hidden="true"></span>The menu<span class="dot" aria-hidden="true"></span></h1>
    <span class="stamp phead-stamp" aria-hidden="true">¡Provecho!</span>
    <p class="phead-lead" data-reveal>Rooted in Oaxaca and Mexico City, cooked over oak, wrapped in masa we grind every morning. Tap any dish for its story.</p>
  </div>
</section>
<div class="mbar" data-menu-bar>
  <nav class="mbar-tabs" aria-label="Menu sections"><a href="#antojitos">Antojitos</a><a href="#tacos">Tacos</a><a href="#platos">Platos Fuertes</a><a href="#postres">Postres</a><a href="#bebidas">Bebidas</a></nav>
  <div class="mbar-filter" role="group" aria-label="Dietary filter"><button type="button" data-filter="All" aria-pressed="true">All</button><button type="button" data-filter="Vegetarian" aria-pressed="false">Vegetarian</button><button type="button" data-filter="Vegan" aria-pressed="false">Vegan</button><button type="button" data-filter="Gluten free" aria-pressed="false">Gluten free</button></div>
</div>
<div class="sheet wrap">
  <div class="sheet-frame">
<section class="msec" id="antojitos" aria-labelledby="h-antojitos">
    <header class="msec-head"><span class="msec-num">01</span><h2 id="h-antojitos" class="msec-title" data-split>Antojitos</h2><p>Small plates to share while the mezcal is poured.</p></header>
    <ul class="mrows"><li data-tags="Vegan|Gluten free" data-reveal>
      <a class="mrow" href="/menu/guacamole-de-molcajete/" data-preview="../assets/dish-guacamole-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-guacamole-lg.webp?v=4" srcset="../assets/dish-guacamole-sm.webp?v=4 600w, ../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Guacamole de Molcajete</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$19</span></span>
        <span class="mrow-desc">Hass avocado crushed in volcanic stone with serrano, white onion and lime, finished with pomegranate and toasted pepitas. <span class="tags"><abbr class="diet" title="Vegan">VG</abbr><abbr class="diet" title="Gluten free">GF</abbr></span></span>
      </a></li><li data-tags="Vegetarian|Gluten free" data-reveal>
      <a class="mrow" href="/menu/elote-asado/" data-preview="../assets/dish-elote-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-elote-lg.webp?v=4" srcset="../assets/dish-elote-sm.webp?v=4 600w, ../assets/dish-elote-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Elote Asado</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$14</span></span>
        <span class="mrow-desc">Charred sweet corn, lime crema, cotija, chile piquín. <span class="tags"><abbr class="diet" title="Vegetarian">V</abbr><abbr class="diet" title="Gluten free">GF</abbr></span></span>
      </a></li><li data-tags="Gluten free|Dairy free" data-reveal>
      <a class="mrow" href="/menu/aguachile-verde/" data-preview="../assets/dish-aguachile-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-aguachile-lg.webp?v=4" srcset="../assets/dish-aguachile-sm.webp?v=4 600w, ../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Aguachile Verde</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$24</span></span>
        <span class="mrow-desc">Wild shrimp cured in green chile and lime, cucumber, red onion, avocado. <span class="tags"><abbr class="diet" title="Gluten free">GF</abbr><abbr class="diet" title="Dairy free">DF</abbr><span class="spice" aria-label="Spice level 3 of 3">✺✺✺</span></span></span>
      </a></li><li data-tags="" data-reveal>
      <a class="mrow" href="/menu/queso-fundido/" data-preview="../assets/dish-queso-fundido-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-queso-fundido-lg.webp?v=4" srcset="../assets/dish-queso-fundido-sm.webp?v=4 600w, ../assets/dish-queso-fundido-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Queso Fundido</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$18</span></span>
        <span class="mrow-desc">Melted Oaxaca and Chihuahua cheese, house chorizo, rajas, flour tortillas. <span class="tags"></span></span>
      </a></li></ul>
  </section>
<section class="msec" id="tacos" aria-labelledby="h-tacos">
    <header class="msec-head"><span class="msec-num">02</span><h2 id="h-tacos" class="msec-title" data-split>Tacos</h2><p>Three to an order, on tortillas pressed by hand every hour.</p></header>
    <ul class="mrows"><li data-tags="Gluten free" data-reveal>
      <a class="mrow" href="/menu/tacos-al-pastor/" data-preview="../assets/dish-al-pastor-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-al-pastor-lg.webp?v=4" srcset="../assets/dish-al-pastor-sm.webp?v=4 600w, ../assets/dish-al-pastor-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Tacos al Pastor</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$18</span></span>
        <span class="mrow-desc">Achiote-marinated pork shaved from the trompo, charred pineapple, onion, cilantro, salsa roja. <span class="tags"><abbr class="diet" title="Gluten free">GF</abbr><span class="spice" aria-label="Spice level 2 of 3">✺✺</span></span></span>
      </a></li><li data-tags="Gluten free|Dairy free" data-reveal>
      <a class="mrow" href="/menu/tacos-de-carnitas/" data-preview="../assets/dish-carnitas-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-carnitas-lg.webp?v=4" srcset="../assets/dish-carnitas-sm.webp?v=4 600w, ../assets/dish-carnitas-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Tacos de Carnitas</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$17</span></span>
        <span class="mrow-desc">Pork confit in its own fat until crisp, pickled red onion, salsa verde cruda. <span class="tags"><abbr class="diet" title="Gluten free">GF</abbr><abbr class="diet" title="Dairy free">DF</abbr><span class="spice" aria-label="Spice level 2 of 3">✺✺</span></span></span>
      </a></li><li data-tags="" data-reveal>
      <a class="mrow" href="/menu/tacos-baja/" data-preview="../assets/dish-baja-fish-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-baja-fish-lg.webp?v=4" srcset="../assets/dish-baja-fish-sm.webp?v=4 600w, ../assets/dish-baja-fish-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Tacos Baja</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$19</span></span>
        <span class="mrow-desc">Beer-battered cod, cabbage slaw, chipotle crema, lime. <span class="tags"></span></span>
      </a></li></ul>
  </section>
<section class="msec" id="platos" aria-labelledby="h-platos">
    <header class="msec-head"><span class="msec-num">03</span><h2 id="h-platos" class="msec-title" data-split>Platos Fuertes</h2><p>Larger plates from the wood grill and the mole pot.</p></header>
    <ul class="mrows"><li data-tags="Gluten free" data-reveal>
      <a class="mrow" href="/menu/mole-negro/" data-preview="../assets/dish-mole-negro-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-mole-negro-lg.webp?v=4" srcset="../assets/dish-mole-negro-sm.webp?v=4 600w, ../assets/dish-mole-negro-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Mole Negro</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$34</span></span>
        <span class="mrow-desc">Braised chicken in a mole of 28 ingredients, sesame, arroz blanco, tortillas. <span class="tags"><abbr class="diet" title="Gluten free">GF</abbr><span class="spice" aria-label="Spice level 2 of 3">✺✺</span></span></span>
      </a></li><li data-tags="Gluten free|Dairy free" data-reveal>
      <a class="mrow" href="/menu/carne-asada/" data-preview="../assets/dish-carne-asada-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-carne-asada-lg.webp?v=4" srcset="../assets/dish-carne-asada-sm.webp?v=4 600w, ../assets/dish-carne-asada-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Carne Asada</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$42</span></span>
        <span class="mrow-desc">Prime skirt steak, charred cebollitas, roasted jalapeño, salsa tatemada, tortillas. <span class="tags"><abbr class="diet" title="Gluten free">GF</abbr><abbr class="diet" title="Dairy free">DF</abbr><span class="spice" aria-label="Spice level 2 of 3">✺✺</span></span></span>
      </a></li><li data-tags="Gluten free|Dairy free" data-reveal>
      <a class="mrow" href="/menu/pescado-zarandeado/" data-preview="../assets/dish-zarandeado-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-zarandeado-lg.webp?v=4" srcset="../assets/dish-zarandeado-sm.webp?v=4 600w, ../assets/dish-zarandeado-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Pescado Zarandeado</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$48</span></span>
        <span class="mrow-desc">Whole red snapper in a red chile adobo, grilled in a basket, lime and herbs. Serves two. <span class="tags"><abbr class="diet" title="Gluten free">GF</abbr><abbr class="diet" title="Dairy free">DF</abbr><span class="spice" aria-label="Spice level 2 of 3">✺✺</span></span></span>
      </a></li></ul>
  </section>
<section class="msec" id="postres" aria-labelledby="h-postres">
    <header class="msec-head"><span class="msec-num">04</span><h2 id="h-postres" class="msec-title" data-split>Postres</h2><p>Something sweet to close the night.</p></header>
    <ul class="mrows"><li data-tags="Vegetarian" data-reveal>
      <a class="mrow" href="/menu/churros-con-chocolate/" data-preview="../assets/dish-churros-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-churros-lg.webp?v=4" srcset="../assets/dish-churros-sm.webp?v=4 600w, ../assets/dish-churros-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Churros con Chocolate</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$13</span></span>
        <span class="mrow-desc">Cinnamon-sugar churros, thick Oaxacan drinking chocolate. <span class="tags"><abbr class="diet" title="Vegetarian">V</abbr></span></span>
      </a></li><li data-tags="Vegetarian|Gluten free" data-reveal>
      <a class="mrow" href="/menu/flan-de-cajeta/" data-preview="../assets/dish-flan-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-flan-lg.webp?v=4" srcset="../assets/dish-flan-sm.webp?v=4 600w, ../assets/dish-flan-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Flan de Cajeta</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$12</span></span>
        <span class="mrow-desc">Silky vanilla flan, goat milk cajeta, flaky salt. <span class="tags"><abbr class="diet" title="Vegetarian">V</abbr><abbr class="diet" title="Gluten free">GF</abbr></span></span>
      </a></li></ul>
  </section>
<section class="msec" id="bebidas" aria-labelledby="h-bebidas">
    <header class="msec-head"><span class="msec-num">05</span><h2 id="h-bebidas" class="msec-title" data-split>Bebidas</h2><p>Agave first. Over 80 mezcales and tequilas behind the bar.</p></header>
    <ul class="mrows"><li data-tags="Contains alcohol" data-reveal>
      <a class="mrow" href="/menu/margarita-de-la-casa/" data-preview="../assets/dish-margarita-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-margarita-lg.webp?v=4" srcset="../assets/dish-margarita-sm.webp?v=4 600w, ../assets/dish-margarita-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Margarita de la Casa</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$17</span></span>
        <span class="mrow-desc">Blanco tequila, fresh lime, agave, a whisper of mezcal, sal de gusano rim. <span class="tags"></span></span>
      </a></li><li data-tags="Contains alcohol" data-reveal>
      <a class="mrow" href="/menu/mezcal-flight/" data-preview="../assets/dish-mezcal-flight-sm.webp?v=4">
        <span class="mrow-thumb"><img src="../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span>
        <span class="mrow-top"><span class="mrow-name">Mezcal Flight</span><span class="mrow-dots" aria-hidden="true"></span><span class="mrow-price">$32</span></span>
        <span class="mrow-desc">Espadín, Tobalá and a rotating wild agave, with orange and sal de gusano. <span class="tags"></span></span>
      </a></li></ul>
  </section>
    <p class="menu-empty" hidden>No dishes match that filter.</p>
    <p class="sheet-note">VG vegan · V vegetarian · GF gluten free · DF dairy free · ✺ spice. Please tell your server about allergies. Gratuity is at your discretion.</p>
    <span class="sticker sheet-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Tortillas<br>a mano</span></span>
  </div>
</div>
<section class="book-scene book-scene--short"><div class="book-bg" data-parallax="0.1"><img src="../assets/hero-dining-lg.webp?v=4" srcset="../assets/hero-dining-sm.webp?v=4 800w, ../assets/hero-dining-lg.webp?v=4 1600w" sizes="100vw" width="1600" height="900" alt="" loading="lazy" decoding="async"></div><form class="ticket " action="/reservations/" method="get" data-reveal>
  <div class="ticket-edge" aria-hidden="true"></div>
  <p class="ticket-kicker">Casa Nopal</p>
  <h2 class="ticket-title">Su reservación</h2>
  <span class="stamp ticket-stamp" aria-hidden="true">¡Te esperamos!</span>
  <div class="ticket-rows">
    <label><span><i>01</i> Guests</span><select name="guests"><option value="1">1 guest</option><option value="2" selected>2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="7">7 guests</option><option value="8">8 guests</option></select></label>
    <label><span><i>02</i> Date</span><input type="date" name="date" data-min-today required></label>
    <label><span><i>03</i> Time</span><select name="time"><option value="17:30">5:30 pm</option><option value="18:00">6:00 pm</option><option value="18:30">6:30 pm</option><option value="19:00">7:00 pm</option><option value="19:30" selected>7:30 pm</option><option value="20:00">8:00 pm</option><option value="20:30">8:30 pm</option><option value="21:00">9:00 pm</option><option value="21:30">9:30 pm</option></select></label>
  </div>
  <button class="btn btn-block" type="submit">Find a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
  <p class="ticket-note">Parties of 9 or more, see <a href="/catering/">Event Catering</a>.</p>
</form></section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/margarita-de-la-casa/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Margarita de la Casa | Casa Nopal, NYC</title>
<meta name="description" content="Margarita de la Casa at Casa Nopal, West Village: Blanco tequila, fresh lime, agave, a whisper of mezcal, sal de gusano rim. $17.">
<link rel="canonical" href="https://casanopal.nyc/menu/margarita-de-la-casa/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Margarita de la Casa">
<meta property="og:description" content="Margarita de la Casa at Casa Nopal, West Village: Blanco tequila, fresh lime, agave, a whisper of mezcal, sal de gusano rim. $17.">
<meta property="og:url" content="https://casanopal.nyc/menu/margarita-de-la-casa/">
<meta property="og:image" content="../../assets/dish-margarita-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Margarita de la Casa">
<meta name="twitter:description" content="Margarita de la Casa at Casa Nopal, West Village: Blanco tequila, fresh lime, agave, a whisper of mezcal, sal de gusano rim. $17.">
<meta name="twitter:image" content="../../assets/dish-margarita-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Margarita de la Casa","item":"https://casanopal.nyc/menu/margarita-de-la-casa/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Margarita de la Casa","description":"The drink most tables start with. Highland blanco tequila, lime squeezed to order and organic agave, shaken hard and rounded off with a few drops of Espadín mezcal. Served on the rocks with a sal de gusano rim.","image":"../../assets/dish-margarita-lg.webp","url":"https://casanopal.nyc/menu/margarita-de-la-casa/","offers":{"@type":"Offer","price":17,"priceCurrency":"USD","availability":"https://schema.org/InStock"}}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Margarita de la Casa: Blanco tequila, fresh lime, agave, a whisper of mezcal, sal de gusano rim." fetchpriority="high" decoding="async" style="view-transition-name:dish-margarita-de-la-casa"><span class="dish-photo-cap">Our house margarita</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Bebidas<br>No. 13</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#bebidas">Bebidas</a></nav>
    <h1 class="dish-title" data-split>Margarita de la Casa</h1>
    <div class="dish-meta"><span class="dish-price">$17</span><span class="tag">Contains alcohol</span></div>
    <p class="dish-lead" data-reveal>The drink most tables start with. Highland blanco tequila, lime squeezed to order and organic agave, shaken hard and rounded off with a few drops of Espadín mezcal. Served on the rocks with a sal de gusano rim.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Blanco tequila</li><li>Fresh lime</li><li>Agave</li><li>Espadín mezcal</li><li>Sal de gusano</li></ul></div>
    <a class="pairing" href="/menu/tacos-al-pastor/" data-reveal><span class="pairing-img"><img src="../../assets/dish-al-pastor-lg.webp?v=4" srcset="../../assets/dish-al-pastor-sm.webp?v=4 600w, ../../assets/dish-al-pastor-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Tacos al Pastor</strong></span><span class="pairing-price">$18</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Margarita de la Casa from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM10 0h1v1h-1zM12 0h1v1h-1zM13 0h1v1h-1zM14 0h1v1h-1zM16 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM21 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM13 1h1v1h-1zM16 1h1v1h-1zM17 1h1v1h-1zM18 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM16 2h1v1h-1zM18 2h1v1h-1zM23 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM12 3h1v1h-1zM14 3h1v1h-1zM15 3h1v1h-1zM16 3h1v1h-1zM17 3h1v1h-1zM22 3h1v1h-1zM23 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM14 4h1v1h-1zM18 4h1v1h-1zM19 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM11 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM21 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM12 7h1v1h-1zM14 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM22 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM10 8h1v1h-1zM11 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM19 8h1v1h-1zM21 8h1v1h-1zM26 8h1v1h-1zM29 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM1 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM16 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM20 9h1v1h-1zM21 9h1v1h-1zM22 9h1v1h-1zM23 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM32 9h1v1h-1zM2 10h1v1h-1zM3 10h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM14 10h1v1h-1zM16 10h1v1h-1zM21 10h1v1h-1zM23 10h1v1h-1zM24 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM3 11h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM13 11h1v1h-1zM14 11h1v1h-1zM19 11h1v1h-1zM27 11h1v1h-1zM29 11h1v1h-1zM31 11h1v1h-1zM32 11h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM17 12h1v1h-1zM18 12h1v1h-1zM19 12h1v1h-1zM22 12h1v1h-1zM24 12h1v1h-1zM27 12h1v1h-1zM28 12h1v1h-1zM29 12h1v1h-1zM0 13h1v1h-1zM1 13h1v1h-1zM3 13h1v1h-1zM4 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM10 13h1v1h-1zM11 13h1v1h-1zM12 13h1v1h-1zM13 13h1v1h-1zM16 13h1v1h-1zM18 13h1v1h-1zM19 13h1v1h-1zM24 13h1v1h-1zM27 13h1v1h-1zM29 13h1v1h-1zM30 13h1v1h-1zM31 13h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM4 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM12 14h1v1h-1zM15 14h1v1h-1zM16 14h1v1h-1zM18 14h1v1h-1zM19 14h1v1h-1zM22 14h1v1h-1zM24 14h1v1h-1zM26 14h1v1h-1zM28 14h1v1h-1zM29 14h1v1h-1zM3 15h1v1h-1zM5 15h1v1h-1zM7 15h1v1h-1zM10 15h1v1h-1zM11 15h1v1h-1zM14 15h1v1h-1zM16 15h1v1h-1zM19 15h1v1h-1zM21 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM3 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM9 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM15 16h1v1h-1zM18 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM30 16h1v1h-1zM0 17h1v1h-1zM3 17h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1zM17 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM29 17h1v1h-1zM32 17h1v1h-1zM2 18h1v1h-1zM4 18h1v1h-1zM6 18h1v1h-1zM8 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1zM21 18h1v1h-1zM25 18h1v1h-1zM26 18h1v1h-1zM27 18h1v1h-1zM28 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM1 19h1v1h-1zM2 19h1v1h-1zM5 19h1v1h-1zM7 19h1v1h-1zM10 19h1v1h-1zM13 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM17 19h1v1h-1zM18 19h1v1h-1zM19 19h1v1h-1zM22 19h1v1h-1zM25 19h1v1h-1zM26 19h1v1h-1zM28 19h1v1h-1zM31 19h1v1h-1zM32 19h1v1h-1zM1 20h1v1h-1zM3 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM7 20h1v1h-1zM9 20h1v1h-1zM10 20h1v1h-1zM12 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM17 20h1v1h-1zM20 20h1v1h-1zM21 20h1v1h-1zM22 20h1v1h-1zM29 20h1v1h-1zM30 20h1v1h-1zM31 20h1v1h-1zM0 21h1v1h-1zM1 21h1v1h-1zM2 21h1v1h-1zM4 21h1v1h-1zM5 21h1v1h-1zM8 21h1v1h-1zM9 21h1v1h-1zM10 21h1v1h-1zM12 21h1v1h-1zM13 21h1v1h-1zM15 21h1v1h-1zM19 21h1v1h-1zM20 21h1v1h-1zM21 21h1v1h-1zM23 21h1v1h-1zM24 21h1v1h-1zM26 21h1v1h-1zM29 21h1v1h-1zM30 21h1v1h-1zM32 21h1v1h-1zM2 22h1v1h-1zM4 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM8 22h1v1h-1zM12 22h1v1h-1zM14 22h1v1h-1zM16 22h1v1h-1zM17 22h1v1h-1zM18 22h1v1h-1zM23 22h1v1h-1zM24 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM29 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM5 23h1v1h-1zM7 23h1v1h-1zM8 23h1v1h-1zM9 23h1v1h-1zM12 23h1v1h-1zM13 23h1v1h-1zM14 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM20 23h1v1h-1zM26 23h1v1h-1zM27 23h1v1h-1zM29 23h1v1h-1zM31 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM4 24h1v1h-1zM6 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM15 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM22 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM9 25h1v1h-1zM10 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM15 25h1v1h-1zM17 25h1v1h-1zM19 25h1v1h-1zM21 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM9 26h1v1h-1zM11 26h1v1h-1zM12 26h1v1h-1zM14 26h1v1h-1zM19 26h1v1h-1zM21 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM11 27h1v1h-1zM12 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM19 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM22 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM9 28h1v1h-1zM10 28h1v1h-1zM11 28h1v1h-1zM17 28h1v1h-1zM19 28h1v1h-1zM20 28h1v1h-1zM21 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM30 28h1v1h-1zM31 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM10 29h1v1h-1zM12 29h1v1h-1zM13 29h1v1h-1zM17 29h1v1h-1zM20 29h1v1h-1zM21 29h1v1h-1zM23 29h1v1h-1zM27 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM8 30h1v1h-1zM9 30h1v1h-1zM10 30h1v1h-1zM11 30h1v1h-1zM12 30h1v1h-1zM17 30h1v1h-1zM20 30h1v1h-1zM21 30h1v1h-1zM22 30h1v1h-1zM24 30h1v1h-1zM26 30h1v1h-1zM27 30h1v1h-1zM29 30h1v1h-1zM30 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM12 31h1v1h-1zM14 31h1v1h-1zM15 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM19 31h1v1h-1zM23 31h1v1h-1zM24 31h1v1h-1zM25 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM29 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM18 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM25 32h1v1h-1zM28 32h1v1h-1zM30 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Margarita de la Casa to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Margarita de la Casa" data-price="17">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#bebidas">Back to Bebidas <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/flan-de-cajeta/" rel="prev"><small>← Previous</small>Flan de Cajeta</a><a href="/menu/mezcal-flight/" rel="next"><small>Next →</small>Mezcal Flight</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/mezcal-flight/" style="--r:-3deg"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Mezcal Flight" loading="lazy" decoding="async"><span>Mezcal Flight · $32</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:-2deg"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde · $24</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/mezcal-flight/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mezcal Flight | Casa Nopal, NYC</title>
<meta name="description" content="Mezcal Flight at Casa Nopal, West Village: Espadín, Tobalá and a rotating wild agave, with orange and sal de gusano. $32.">
<link rel="canonical" href="https://casanopal.nyc/menu/mezcal-flight/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Mezcal Flight">
<meta property="og:description" content="Mezcal Flight at Casa Nopal, West Village: Espadín, Tobalá and a rotating wild agave, with orange and sal de gusano. $32.">
<meta property="og:url" content="https://casanopal.nyc/menu/mezcal-flight/">
<meta property="og:image" content="../../assets/dish-mezcal-flight-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Mezcal Flight">
<meta name="twitter:description" content="Mezcal Flight at Casa Nopal, West Village: Espadín, Tobalá and a rotating wild agave, with orange and sal de gusano. $32.">
<meta name="twitter:image" content="../../assets/dish-mezcal-flight-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Mezcal Flight","item":"https://casanopal.nyc/menu/mezcal-flight/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Mezcal Flight","description":"A guided tasting of three one-ounce pours in clay copitas: a bright Espadín, a floral wild Tobalá and a rare agave chosen by our bar team each month. Your server will walk you through each one.","image":"../../assets/dish-mezcal-flight-lg.webp","url":"https://casanopal.nyc/menu/mezcal-flight/","offers":{"@type":"Offer","price":32,"priceCurrency":"USD","availability":"https://schema.org/InStock"}}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Mezcal Flight: Espadín, Tobalá and a rotating wild agave, with orange and sal de gusano." fetchpriority="high" decoding="async" style="view-transition-name:dish-mezcal-flight"><span class="dish-photo-cap">Three pours, three agaves</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Bebidas<br>No. 14</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#bebidas">Bebidas</a></nav>
    <h1 class="dish-title" data-split>Mezcal Flight</h1>
    <div class="dish-meta"><span class="dish-price">$32</span><span class="tag">Contains alcohol</span></div>
    <p class="dish-lead" data-reveal>A guided tasting of three one-ounce pours in clay copitas: a bright Espadín, a floral wild Tobalá and a rare agave chosen by our bar team each month. Your server will walk you through each one.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Espadín</li><li>Tobalá</li><li>Rotating wild agave</li><li>Orange</li><li>Sal de gusano</li></ul></div>
    <a class="pairing" href="/menu/mole-negro/" data-reveal><span class="pairing-img"><img src="../../assets/dish-mole-negro-lg.webp?v=4" srcset="../../assets/dish-mole-negro-sm.webp?v=4 600w, ../../assets/dish-mole-negro-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Mole Negro</strong></span><span class="pairing-price">$34</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Mezcal Flight from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM12 0h1v1h-1zM15 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM20 0h1v1h-1zM22 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM15 1h1v1h-1zM17 1h1v1h-1zM20 1h1v1h-1zM21 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM14 2h1v1h-1zM17 2h1v1h-1zM19 2h1v1h-1zM22 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM10 3h1v1h-1zM12 3h1v1h-1zM13 3h1v1h-1zM15 3h1v1h-1zM17 3h1v1h-1zM19 3h1v1h-1zM22 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM16 4h1v1h-1zM17 4h1v1h-1zM19 4h1v1h-1zM21 4h1v1h-1zM23 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM10 5h1v1h-1zM11 5h1v1h-1zM14 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM20 5h1v1h-1zM22 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM10 7h1v1h-1zM11 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM19 7h1v1h-1zM20 7h1v1h-1zM21 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM11 8h1v1h-1zM13 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM16 8h1v1h-1zM19 8h1v1h-1zM21 8h1v1h-1zM23 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM27 8h1v1h-1zM0 9h1v1h-1zM1 9h1v1h-1zM3 9h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM9 9h1v1h-1zM11 9h1v1h-1zM16 9h1v1h-1zM20 9h1v1h-1zM21 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM25 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM31 9h1v1h-1zM32 9h1v1h-1zM0 10h1v1h-1zM1 10h1v1h-1zM2 10h1v1h-1zM3 10h1v1h-1zM6 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM16 10h1v1h-1zM17 10h1v1h-1zM19 10h1v1h-1zM22 10h1v1h-1zM25 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM30 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM2 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM16 11h1v1h-1zM17 11h1v1h-1zM19 11h1v1h-1zM20 11h1v1h-1zM21 11h1v1h-1zM22 11h1v1h-1zM25 11h1v1h-1zM26 11h1v1h-1zM28 11h1v1h-1zM29 11h1v1h-1zM31 11h1v1h-1zM32 11h1v1h-1zM2 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM12 12h1v1h-1zM15 12h1v1h-1zM19 12h1v1h-1zM21 12h1v1h-1zM25 12h1v1h-1zM26 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM4 13h1v1h-1zM8 13h1v1h-1zM10 13h1v1h-1zM12 13h1v1h-1zM13 13h1v1h-1zM15 13h1v1h-1zM16 13h1v1h-1zM21 13h1v1h-1zM24 13h1v1h-1zM25 13h1v1h-1zM26 13h1v1h-1zM28 13h1v1h-1zM30 13h1v1h-1zM31 13h1v1h-1zM32 13h1v1h-1zM1 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM17 14h1v1h-1zM20 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM25 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM30 14h1v1h-1zM31 14h1v1h-1zM0 15h1v1h-1zM1 15h1v1h-1zM2 15h1v1h-1zM3 15h1v1h-1zM8 15h1v1h-1zM12 15h1v1h-1zM14 15h1v1h-1zM15 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM19 15h1v1h-1zM21 15h1v1h-1zM24 15h1v1h-1zM26 15h1v1h-1zM31 15h1v1h-1zM6 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM17 16h1v1h-1zM19 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM23 16h1v1h-1zM24 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM31 16h1v1h-1zM0 17h1v1h-1zM3 17h1v1h-1zM4 17h1v1h-1zM5 17h1v1h-1zM7 17h1v1h-1zM10 17h1v1h-1zM11 17h1v1h-1zM14 17h1v1h-1zM16 17h1v1h-1zM21 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM27 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM0 18h1v1h-1zM1 18h1v1h-1zM3 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM7 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM21 18h1v1h-1zM22 18h1v1h-1zM25 18h1v1h-1zM26 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM32 18h1v1h-1zM0 19h1v1h-1zM1 19h1v1h-1zM4 19h1v1h-1zM7 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM17 19h1v1h-1zM18 19h1v1h-1zM19 19h1v1h-1zM20 19h1v1h-1zM21 19h1v1h-1zM22 19h1v1h-1zM27 19h1v1h-1zM31 19h1v1h-1zM0 20h1v1h-1zM1 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM7 20h1v1h-1zM8 20h1v1h-1zM11 20h1v1h-1zM12 20h1v1h-1zM13 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM17 20h1v1h-1zM18 20h1v1h-1zM19 20h1v1h-1zM21 20h1v1h-1zM22 20h1v1h-1zM23 20h1v1h-1zM24 20h1v1h-1zM1 21h1v1h-1zM4 21h1v1h-1zM7 21h1v1h-1zM8 21h1v1h-1zM9 21h1v1h-1zM13 21h1v1h-1zM14 21h1v1h-1zM15 21h1v1h-1zM16 21h1v1h-1zM17 21h1v1h-1zM18 21h1v1h-1zM19 21h1v1h-1zM20 21h1v1h-1zM21 21h1v1h-1zM22 21h1v1h-1zM24 21h1v1h-1zM25 21h1v1h-1zM26 21h1v1h-1zM31 21h1v1h-1zM32 21h1v1h-1zM0 22h1v1h-1zM1 22h1v1h-1zM3 22h1v1h-1zM4 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM8 22h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM13 22h1v1h-1zM15 22h1v1h-1zM20 22h1v1h-1zM25 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM3 23h1v1h-1zM4 23h1v1h-1zM7 23h1v1h-1zM8 23h1v1h-1zM11 23h1v1h-1zM12 23h1v1h-1zM13 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM21 23h1v1h-1zM22 23h1v1h-1zM23 23h1v1h-1zM24 23h1v1h-1zM27 23h1v1h-1zM28 23h1v1h-1zM29 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM11 24h1v1h-1zM13 24h1v1h-1zM14 24h1v1h-1zM15 24h1v1h-1zM16 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM20 24h1v1h-1zM21 24h1v1h-1zM23 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM13 25h1v1h-1zM16 25h1v1h-1zM19 25h1v1h-1zM20 25h1v1h-1zM22 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM32 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM10 26h1v1h-1zM12 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM29 26h1v1h-1zM30 26h1v1h-1zM31 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM9 27h1v1h-1zM11 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM22 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM9 28h1v1h-1zM10 28h1v1h-1zM13 28h1v1h-1zM16 28h1v1h-1zM20 28h1v1h-1zM21 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM29 28h1v1h-1zM31 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM10 29h1v1h-1zM13 29h1v1h-1zM14 29h1v1h-1zM15 29h1v1h-1zM17 29h1v1h-1zM19 29h1v1h-1zM20 29h1v1h-1zM22 29h1v1h-1zM23 29h1v1h-1zM26 29h1v1h-1zM28 29h1v1h-1zM29 29h1v1h-1zM30 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM9 30h1v1h-1zM10 30h1v1h-1zM13 30h1v1h-1zM14 30h1v1h-1zM17 30h1v1h-1zM24 30h1v1h-1zM28 30h1v1h-1zM30 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM10 31h1v1h-1zM11 31h1v1h-1zM12 31h1v1h-1zM13 31h1v1h-1zM14 31h1v1h-1zM15 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM21 31h1v1h-1zM22 31h1v1h-1zM24 31h1v1h-1zM25 31h1v1h-1zM26 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM10 32h1v1h-1zM14 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM24 32h1v1h-1zM25 32h1v1h-1zM26 32h1v1h-1zM28 32h1v1h-1zM29 32h1v1h-1zM31 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Mezcal Flight to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Mezcal Flight" data-price="32">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#bebidas">Back to Bebidas <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/margarita-de-la-casa/" rel="prev"><small>← Previous</small>Margarita de la Casa</a><a href="/menu/guacamole-de-molcajete/" rel="next"><small>Next →</small>Guacamole de Molcajete</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/margarita-de-la-casa/" style="--r:-3deg"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Margarita de la Casa" loading="lazy" decoding="async"><span>Margarita de la Casa · $17</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:-2deg"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde · $24</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/mole-negro/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mole Negro | Casa Nopal, NYC</title>
<meta name="description" content="Mole Negro at Casa Nopal, West Village: Braised chicken in a mole of 28 ingredients, sesame, arroz blanco, tortillas. $34.">
<link rel="canonical" href="https://casanopal.nyc/menu/mole-negro/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Mole Negro">
<meta property="og:description" content="Mole Negro at Casa Nopal, West Village: Braised chicken in a mole of 28 ingredients, sesame, arroz blanco, tortillas. $34.">
<meta property="og:url" content="https://casanopal.nyc/menu/mole-negro/">
<meta property="og:image" content="../../assets/dish-mole-negro-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Mole Negro">
<meta name="twitter:description" content="Mole Negro at Casa Nopal, West Village: Braised chicken in a mole of 28 ingredients, sesame, arroz blanco, tortillas. $34.">
<meta name="twitter:image" content="../../assets/dish-mole-negro-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Mole Negro","item":"https://casanopal.nyc/menu/mole-negro/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Mole Negro","description":"Our signature, and the recipe Chef Ximena Ortega brought from her grandmother's kitchen in Oaxaca. Chilhuacle, mulato and pasilla chiles are toasted almost to black, then ground with chocolate, plantain, nuts and spices into a mole that takes three days to make. Served over braised chicken with sesame, white rice and fresh tortillas.","image":"../../assets/dish-mole-negro-lg.webp","url":"https://casanopal.nyc/menu/mole-negro/","offers":{"@type":"Offer","price":34,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/GlutenFreeDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-mole-negro-lg.webp?v=4" srcset="../../assets/dish-mole-negro-sm.webp?v=4 600w, ../../assets/dish-mole-negro-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Mole Negro: Braised chicken in a mole of 28 ingredients, sesame, arroz blanco, tortillas." fetchpriority="high" decoding="async" style="view-transition-name:dish-mole-negro"><span class="dish-photo-cap">The Oaxacan recipe</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Platos<br>No. 08</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#platos">Platos Fuertes</a></nav>
    <h1 class="dish-title" data-split>Mole Negro</h1>
    <div class="dish-meta"><span class="dish-price">$34</span><span class="tag">Gluten free</span><span class="tag tag-spice">Spice ✺✺<b>✺</b></span></div>
    <p class="dish-lead" data-reveal>Our signature, and the recipe Chef Ximena Ortega brought from her grandmother's kitchen in Oaxaca. Chilhuacle, mulato and pasilla chiles are toasted almost to black, then ground with chocolate, plantain, nuts and spices into a mole that takes three days to make. Served over braised chicken with sesame, white rice and fresh tortillas.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Free-range chicken</li><li>Chilhuacle negro</li><li>Mulato and pasilla chiles</li><li>Oaxacan chocolate</li><li>Plantain</li><li>Sesame</li></ul></div>
    <a class="pairing" href="/menu/mezcal-flight/" data-reveal><span class="pairing-img"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Mezcal Flight</strong></span><span class="pairing-price">$32</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Mole Negro from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM12 0h1v1h-1zM14 0h1v1h-1zM15 0h1v1h-1zM16 0h1v1h-1zM17 0h1v1h-1zM18 0h1v1h-1zM20 0h1v1h-1zM21 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM16 1h1v1h-1zM17 1h1v1h-1zM19 1h1v1h-1zM22 1h1v1h-1zM24 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM19 2h1v1h-1zM21 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM14 3h1v1h-1zM17 3h1v1h-1zM18 3h1v1h-1zM20 3h1v1h-1zM22 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM8 4h1v1h-1zM9 4h1v1h-1zM10 4h1v1h-1zM14 4h1v1h-1zM17 4h1v1h-1zM18 4h1v1h-1zM19 4h1v1h-1zM20 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM23 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM13 5h1v1h-1zM16 5h1v1h-1zM17 5h1v1h-1zM19 5h1v1h-1zM21 5h1v1h-1zM22 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM11 7h1v1h-1zM12 7h1v1h-1zM15 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM21 7h1v1h-1zM0 8h1v1h-1zM4 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM10 8h1v1h-1zM11 8h1v1h-1zM17 8h1v1h-1zM19 8h1v1h-1zM20 8h1v1h-1zM21 8h1v1h-1zM22 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM26 8h1v1h-1zM27 8h1v1h-1zM28 8h1v1h-1zM29 8h1v1h-1zM32 8h1v1h-1zM0 9h1v1h-1zM1 9h1v1h-1zM2 9h1v1h-1zM9 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM14 9h1v1h-1zM15 9h1v1h-1zM16 9h1v1h-1zM18 9h1v1h-1zM22 9h1v1h-1zM23 9h1v1h-1zM25 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM31 9h1v1h-1zM0 10h1v1h-1zM3 10h1v1h-1zM4 10h1v1h-1zM6 10h1v1h-1zM8 10h1v1h-1zM12 10h1v1h-1zM15 10h1v1h-1zM17 10h1v1h-1zM20 10h1v1h-1zM21 10h1v1h-1zM22 10h1v1h-1zM23 10h1v1h-1zM24 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM29 10h1v1h-1zM31 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM12 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM17 11h1v1h-1zM18 11h1v1h-1zM21 11h1v1h-1zM23 11h1v1h-1zM25 11h1v1h-1zM26 11h1v1h-1zM32 11h1v1h-1zM0 12h1v1h-1zM1 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM9 12h1v1h-1zM13 12h1v1h-1zM14 12h1v1h-1zM15 12h1v1h-1zM18 12h1v1h-1zM20 12h1v1h-1zM26 12h1v1h-1zM27 12h1v1h-1zM28 12h1v1h-1zM29 12h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM4 13h1v1h-1zM5 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM11 13h1v1h-1zM13 13h1v1h-1zM16 13h1v1h-1zM17 13h1v1h-1zM19 13h1v1h-1zM23 13h1v1h-1zM25 13h1v1h-1zM29 13h1v1h-1zM30 13h1v1h-1zM0 14h1v1h-1zM3 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM11 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1zM16 14h1v1h-1zM17 14h1v1h-1zM18 14h1v1h-1zM19 14h1v1h-1zM21 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM24 14h1v1h-1zM25 14h1v1h-1zM26 14h1v1h-1zM31 14h1v1h-1zM0 15h1v1h-1zM1 15h1v1h-1zM2 15h1v1h-1zM3 15h1v1h-1zM4 15h1v1h-1zM5 15h1v1h-1zM8 15h1v1h-1zM11 15h1v1h-1zM12 15h1v1h-1zM14 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM19 15h1v1h-1zM20 15h1v1h-1zM21 15h1v1h-1zM22 15h1v1h-1zM23 15h1v1h-1zM24 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM2 16h1v1h-1zM4 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM15 16h1v1h-1zM17 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM31 16h1v1h-1zM0 17h1v1h-1zM1 17h1v1h-1zM4 17h1v1h-1zM5 17h1v1h-1zM7 17h1v1h-1zM9 17h1v1h-1zM10 17h1v1h-1zM11 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1zM16 17h1v1h-1zM17 17h1v1h-1zM18 17h1v1h-1zM21 17h1v1h-1zM23 17h1v1h-1zM25 17h1v1h-1zM29 17h1v1h-1zM30 17h1v1h-1zM31 17h1v1h-1zM0 18h1v1h-1zM1 18h1v1h-1zM4 18h1v1h-1zM6 18h1v1h-1zM9 18h1v1h-1zM10 18h1v1h-1zM11 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM18 18h1v1h-1zM23 18h1v1h-1zM24 18h1v1h-1zM25 18h1v1h-1zM26 18h1v1h-1zM27 18h1v1h-1zM29 18h1v1h-1zM31 18h1v1h-1zM1 19h1v1h-1zM3 19h1v1h-1zM7 19h1v1h-1zM8 19h1v1h-1zM9 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM14 19h1v1h-1zM19 19h1v1h-1zM20 19h1v1h-1zM22 19h1v1h-1zM25 19h1v1h-1zM26 19h1v1h-1zM27 19h1v1h-1zM31 19h1v1h-1zM0 20h1v1h-1zM1 20h1v1h-1zM4 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM8 20h1v1h-1zM9 20h1v1h-1zM10 20h1v1h-1zM11 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM22 20h1v1h-1zM24 20h1v1h-1zM26 20h1v1h-1zM28 20h1v1h-1zM29 20h1v1h-1zM0 21h1v1h-1zM1 21h1v1h-1zM2 21h1v1h-1zM3 21h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM12 21h1v1h-1zM13 21h1v1h-1zM18 21h1v1h-1zM19 21h1v1h-1zM20 21h1v1h-1zM23 21h1v1h-1zM29 21h1v1h-1zM30 21h1v1h-1zM31 21h1v1h-1zM2 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM8 22h1v1h-1zM9 22h1v1h-1zM11 22h1v1h-1zM12 22h1v1h-1zM15 22h1v1h-1zM17 22h1v1h-1zM18 22h1v1h-1zM20 22h1v1h-1zM21 22h1v1h-1zM22 22h1v1h-1zM23 22h1v1h-1zM30 22h1v1h-1zM31 22h1v1h-1zM2 23h1v1h-1zM3 23h1v1h-1zM5 23h1v1h-1zM8 23h1v1h-1zM9 23h1v1h-1zM10 23h1v1h-1zM14 23h1v1h-1zM15 23h1v1h-1zM16 23h1v1h-1zM17 23h1v1h-1zM18 23h1v1h-1zM21 23h1v1h-1zM23 23h1v1h-1zM24 23h1v1h-1zM25 23h1v1h-1zM26 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM1 24h1v1h-1zM3 24h1v1h-1zM4 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM12 24h1v1h-1zM13 24h1v1h-1zM14 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM20 24h1v1h-1zM21 24h1v1h-1zM22 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM29 24h1v1h-1zM8 25h1v1h-1zM9 25h1v1h-1zM11 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM15 25h1v1h-1zM18 25h1v1h-1zM23 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM30 25h1v1h-1zM31 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM9 26h1v1h-1zM10 26h1v1h-1zM13 26h1v1h-1zM15 26h1v1h-1zM17 26h1v1h-1zM21 26h1v1h-1zM22 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM29 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM9 27h1v1h-1zM13 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM19 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM31 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM8 28h1v1h-1zM11 28h1v1h-1zM12 28h1v1h-1zM13 28h1v1h-1zM14 28h1v1h-1zM18 28h1v1h-1zM20 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM29 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM11 29h1v1h-1zM13 29h1v1h-1zM14 29h1v1h-1zM16 29h1v1h-1zM17 29h1v1h-1zM19 29h1v1h-1zM21 29h1v1h-1zM22 29h1v1h-1zM23 29h1v1h-1zM24 29h1v1h-1zM26 29h1v1h-1zM27 29h1v1h-1zM28 29h1v1h-1zM30 29h1v1h-1zM31 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM10 30h1v1h-1zM16 30h1v1h-1zM18 30h1v1h-1zM19 30h1v1h-1zM21 30h1v1h-1zM23 30h1v1h-1zM26 30h1v1h-1zM27 30h1v1h-1zM28 30h1v1h-1zM29 30h1v1h-1zM30 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM11 31h1v1h-1zM12 31h1v1h-1zM13 31h1v1h-1zM14 31h1v1h-1zM17 31h1v1h-1zM19 31h1v1h-1zM20 31h1v1h-1zM21 31h1v1h-1zM22 31h1v1h-1zM23 31h1v1h-1zM24 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM14 32h1v1h-1zM15 32h1v1h-1zM16 32h1v1h-1zM17 32h1v1h-1zM20 32h1v1h-1zM21 32h1v1h-1zM23 32h1v1h-1zM24 32h1v1h-1zM25 32h1v1h-1zM32 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Mole Negro to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Mole Negro" data-price="34">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#platos">Back to Platos Fuertes <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/tacos-baja/" rel="prev"><small>← Previous</small>Tacos Baja</a><a href="/menu/carne-asada/" rel="next"><small>Next →</small>Carne Asada</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/carne-asada/" style="--r:-3deg"><img src="../../assets/dish-carne-asada-lg.webp?v=4" srcset="../../assets/dish-carne-asada-sm.webp?v=4 600w, ../../assets/dish-carne-asada-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Carne Asada" loading="lazy" decoding="async"><span>Carne Asada · $42</span></a><a class="polaroid" href="/menu/pescado-zarandeado/" style="--r:2deg"><img src="../../assets/dish-zarandeado-lg.webp?v=4" srcset="../../assets/dish-zarandeado-sm.webp?v=4 600w, ../../assets/dish-zarandeado-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Pescado Zarandeado" loading="lazy" decoding="async"><span>Pescado Zarandeado · $48</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/pescado-zarandeado/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pescado Zarandeado | Casa Nopal, NYC</title>
<meta name="description" content="Pescado Zarandeado at Casa Nopal, West Village: Whole red snapper in a red chile adobo, grilled in a basket, lime and herbs. Serves two. $48.">
<link rel="canonical" href="https://casanopal.nyc/menu/pescado-zarandeado/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Pescado Zarandeado">
<meta property="og:description" content="Pescado Zarandeado at Casa Nopal, West Village: Whole red snapper in a red chile adobo, grilled in a basket, lime and herbs. Serves two. $48.">
<meta property="og:url" content="https://casanopal.nyc/menu/pescado-zarandeado/">
<meta property="og:image" content="../../assets/dish-zarandeado-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Pescado Zarandeado">
<meta name="twitter:description" content="Pescado Zarandeado at Casa Nopal, West Village: Whole red snapper in a red chile adobo, grilled in a basket, lime and herbs. Serves two. $48.">
<meta name="twitter:image" content="../../assets/dish-zarandeado-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Pescado Zarandeado","item":"https://casanopal.nyc/menu/pescado-zarandeado/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Pescado Zarandeado","description":"From the coast of Nayarit. A whole red snapper is butterflied, brushed with guajillo and garlic adobo and grilled in a wire basket over the coals until the skin is lacquered and smoky. Built for sharing, with tortillas, lime and a crunchy cucumber salad.","image":"../../assets/dish-zarandeado-lg.webp","url":"https://casanopal.nyc/menu/pescado-zarandeado/","offers":{"@type":"Offer","price":48,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/GlutenFreeDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-zarandeado-lg.webp?v=4" srcset="../../assets/dish-zarandeado-sm.webp?v=4 600w, ../../assets/dish-zarandeado-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Pescado Zarandeado: Whole red snapper in a red chile adobo, grilled in a basket, lime and herbs. Serves two." fetchpriority="high" decoding="async" style="view-transition-name:dish-pescado-zarandeado"><span class="dish-photo-cap">Whole grilled snapper</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Platos<br>No. 10</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#platos">Platos Fuertes</a></nav>
    <h1 class="dish-title" data-split>Pescado Zarandeado</h1>
    <div class="dish-meta"><span class="dish-price">$48</span><span class="tag">Gluten free</span><span class="tag">Dairy free</span><span class="tag tag-spice">Spice ✺✺<b>✺</b></span></div>
    <p class="dish-lead" data-reveal>From the coast of Nayarit. A whole red snapper is butterflied, brushed with guajillo and garlic adobo and grilled in a wire basket over the coals until the skin is lacquered and smoky. Built for sharing, with tortillas, lime and a crunchy cucumber salad.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Whole red snapper</li><li>Guajillo adobo</li><li>Garlic</li><li>Lime</li><li>Cucumber salad</li></ul></div>
    <a class="pairing" href="/menu/margarita-de-la-casa/" data-reveal><span class="pairing-img"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Margarita de la Casa</strong></span><span class="pairing-price">$17</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Pescado Zarandeado from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM13 0h1v1h-1zM15 0h1v1h-1zM17 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM20 0h1v1h-1zM21 0h1v1h-1zM22 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM13 1h1v1h-1zM14 1h1v1h-1zM15 1h1v1h-1zM17 1h1v1h-1zM18 1h1v1h-1zM20 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM17 2h1v1h-1zM19 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM13 3h1v1h-1zM14 3h1v1h-1zM15 3h1v1h-1zM16 3h1v1h-1zM19 3h1v1h-1zM20 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM14 4h1v1h-1zM17 4h1v1h-1zM20 4h1v1h-1zM21 4h1v1h-1zM23 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM11 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1zM16 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM20 5h1v1h-1zM22 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM14 7h1v1h-1zM15 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM19 7h1v1h-1zM21 7h1v1h-1zM23 7h1v1h-1zM24 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM8 8h1v1h-1zM13 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM21 8h1v1h-1zM23 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM27 8h1v1h-1zM0 9h1v1h-1zM5 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM16 9h1v1h-1zM17 9h1v1h-1zM20 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM25 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM31 9h1v1h-1zM32 9h1v1h-1zM3 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM11 10h1v1h-1zM13 10h1v1h-1zM14 10h1v1h-1zM18 10h1v1h-1zM19 10h1v1h-1zM21 10h1v1h-1zM22 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM30 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM3 11h1v1h-1zM5 11h1v1h-1zM8 11h1v1h-1zM10 11h1v1h-1zM13 11h1v1h-1zM15 11h1v1h-1zM18 11h1v1h-1zM19 11h1v1h-1zM20 11h1v1h-1zM21 11h1v1h-1zM22 11h1v1h-1zM26 11h1v1h-1zM28 11h1v1h-1zM29 11h1v1h-1zM31 11h1v1h-1zM32 11h1v1h-1zM0 12h1v1h-1zM1 12h1v1h-1zM2 12h1v1h-1zM3 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM8 12h1v1h-1zM10 12h1v1h-1zM14 12h1v1h-1zM16 12h1v1h-1zM18 12h1v1h-1zM19 12h1v1h-1zM21 12h1v1h-1zM22 12h1v1h-1zM24 12h1v1h-1zM25 12h1v1h-1zM26 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM32 12h1v1h-1zM0 13h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM3 13h1v1h-1zM4 13h1v1h-1zM5 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM11 13h1v1h-1zM12 13h1v1h-1zM14 13h1v1h-1zM15 13h1v1h-1zM19 13h1v1h-1zM20 13h1v1h-1zM21 13h1v1h-1zM24 13h1v1h-1zM26 13h1v1h-1zM28 13h1v1h-1zM30 13h1v1h-1zM31 13h1v1h-1zM32 13h1v1h-1zM0 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM6 14h1v1h-1zM7 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM15 14h1v1h-1zM16 14h1v1h-1zM17 14h1v1h-1zM20 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM25 14h1v1h-1zM26 14h1v1h-1zM31 14h1v1h-1zM1 15h1v1h-1zM3 15h1v1h-1zM5 15h1v1h-1zM9 15h1v1h-1zM10 15h1v1h-1zM12 15h1v1h-1zM16 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM19 15h1v1h-1zM20 15h1v1h-1zM21 15h1v1h-1zM23 15h1v1h-1zM26 15h1v1h-1zM27 15h1v1h-1zM29 15h1v1h-1zM31 15h1v1h-1zM0 16h1v1h-1zM1 16h1v1h-1zM2 16h1v1h-1zM3 16h1v1h-1zM4 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM11 16h1v1h-1zM15 16h1v1h-1zM16 16h1v1h-1zM17 16h1v1h-1zM19 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM31 16h1v1h-1zM0 17h1v1h-1zM5 17h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM9 17h1v1h-1zM10 17h1v1h-1zM12 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM16 17h1v1h-1zM17 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM27 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM0 18h1v1h-1zM2 18h1v1h-1zM3 18h1v1h-1zM6 18h1v1h-1zM7 18h1v1h-1zM8 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM17 18h1v1h-1zM20 18h1v1h-1zM21 18h1v1h-1zM25 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM32 18h1v1h-1zM2 19h1v1h-1zM3 19h1v1h-1zM4 19h1v1h-1zM7 19h1v1h-1zM10 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM19 19h1v1h-1zM20 19h1v1h-1zM21 19h1v1h-1zM26 19h1v1h-1zM27 19h1v1h-1zM31 19h1v1h-1zM1 20h1v1h-1zM2 20h1v1h-1zM4 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM9 20h1v1h-1zM10 20h1v1h-1zM13 20h1v1h-1zM15 20h1v1h-1zM17 20h1v1h-1zM19 20h1v1h-1zM21 20h1v1h-1zM23 20h1v1h-1zM24 20h1v1h-1zM25 20h1v1h-1zM27 20h1v1h-1zM1 21h1v1h-1zM2 21h1v1h-1zM4 21h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM13 21h1v1h-1zM15 21h1v1h-1zM17 21h1v1h-1zM20 21h1v1h-1zM21 21h1v1h-1zM24 21h1v1h-1zM25 21h1v1h-1zM26 21h1v1h-1zM30 21h1v1h-1zM31 21h1v1h-1zM32 21h1v1h-1zM0 22h1v1h-1zM1 22h1v1h-1zM3 22h1v1h-1zM4 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM7 22h1v1h-1zM11 22h1v1h-1zM16 22h1v1h-1zM19 22h1v1h-1zM20 22h1v1h-1zM25 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM29 22h1v1h-1zM30 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM5 23h1v1h-1zM8 23h1v1h-1zM11 23h1v1h-1zM12 23h1v1h-1zM13 23h1v1h-1zM14 23h1v1h-1zM15 23h1v1h-1zM18 23h1v1h-1zM19 23h1v1h-1zM21 23h1v1h-1zM22 23h1v1h-1zM24 23h1v1h-1zM27 23h1v1h-1zM29 23h1v1h-1zM31 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM3 24h1v1h-1zM4 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM9 24h1v1h-1zM16 24h1v1h-1zM17 24h1v1h-1zM20 24h1v1h-1zM21 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM29 24h1v1h-1zM31 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM11 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM16 25h1v1h-1zM17 25h1v1h-1zM19 25h1v1h-1zM20 25h1v1h-1zM22 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM32 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM12 26h1v1h-1zM17 26h1v1h-1zM18 26h1v1h-1zM21 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM29 26h1v1h-1zM30 26h1v1h-1zM31 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM9 27h1v1h-1zM10 27h1v1h-1zM11 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM22 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM9 28h1v1h-1zM11 28h1v1h-1zM12 28h1v1h-1zM13 28h1v1h-1zM18 28h1v1h-1zM20 28h1v1h-1zM21 28h1v1h-1zM22 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM29 28h1v1h-1zM31 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM11 29h1v1h-1zM12 29h1v1h-1zM13 29h1v1h-1zM14 29h1v1h-1zM15 29h1v1h-1zM16 29h1v1h-1zM17 29h1v1h-1zM18 29h1v1h-1zM22 29h1v1h-1zM23 29h1v1h-1zM26 29h1v1h-1zM28 29h1v1h-1zM30 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM9 30h1v1h-1zM11 30h1v1h-1zM15 30h1v1h-1zM16 30h1v1h-1zM17 30h1v1h-1zM20 30h1v1h-1zM24 30h1v1h-1zM28 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM10 31h1v1h-1zM11 31h1v1h-1zM12 31h1v1h-1zM13 31h1v1h-1zM14 31h1v1h-1zM17 31h1v1h-1zM19 31h1v1h-1zM21 31h1v1h-1zM22 31h1v1h-1zM23 31h1v1h-1zM24 31h1v1h-1zM25 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM10 32h1v1h-1zM12 32h1v1h-1zM14 32h1v1h-1zM15 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM24 32h1v1h-1zM28 32h1v1h-1zM29 32h1v1h-1zM31 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Pescado Zarandeado to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Pescado Zarandeado" data-price="48">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#platos">Back to Platos Fuertes <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/carne-asada/" rel="prev"><small>← Previous</small>Carne Asada</a><a href="/menu/churros-con-chocolate/" rel="next"><small>Next →</small>Churros con Chocolate</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/mole-negro/" style="--r:-3deg"><img src="../../assets/dish-mole-negro-lg.webp?v=4" srcset="../../assets/dish-mole-negro-sm.webp?v=4 600w, ../../assets/dish-mole-negro-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Mole Negro" loading="lazy" decoding="async"><span>Mole Negro · $34</span></a><a class="polaroid" href="/menu/carne-asada/" style="--r:2deg"><img src="../../assets/dish-carne-asada-lg.webp?v=4" srcset="../../assets/dish-carne-asada-sm.webp?v=4 600w, ../../assets/dish-carne-asada-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Carne Asada" loading="lazy" decoding="async"><span>Carne Asada · $42</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/queso-fundido/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Queso Fundido | Casa Nopal, NYC</title>
<meta name="description" content="Queso Fundido at Casa Nopal, West Village: Melted Oaxaca and Chihuahua cheese, house chorizo, rajas, flour tortillas. $18.">
<link rel="canonical" href="https://casanopal.nyc/menu/queso-fundido/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Queso Fundido">
<meta property="og:description" content="Queso Fundido at Casa Nopal, West Village: Melted Oaxaca and Chihuahua cheese, house chorizo, rajas, flour tortillas. $18.">
<meta property="og:url" content="https://casanopal.nyc/menu/queso-fundido/">
<meta property="og:image" content="../../assets/dish-queso-fundido-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Queso Fundido">
<meta name="twitter:description" content="Queso Fundido at Casa Nopal, West Village: Melted Oaxaca and Chihuahua cheese, house chorizo, rajas, flour tortillas. $18.">
<meta name="twitter:image" content="../../assets/dish-queso-fundido-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Queso Fundido","item":"https://casanopal.nyc/menu/queso-fundido/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Queso Fundido","description":"Oaxaca and Chihuahua cheeses melted in cast iron with our own pork chorizo and strips of roasted poblano. It comes bubbling to the table with warm flour tortillas from Sonora.","image":"../../assets/dish-queso-fundido-lg.webp","url":"https://casanopal.nyc/menu/queso-fundido/","offers":{"@type":"Offer","price":18,"priceCurrency":"USD","availability":"https://schema.org/InStock"}}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-queso-fundido-lg.webp?v=4" srcset="../../assets/dish-queso-fundido-sm.webp?v=4 600w, ../../assets/dish-queso-fundido-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Queso Fundido: Melted Oaxaca and Chihuahua cheese, house chorizo, rajas, flour tortillas." fetchpriority="high" decoding="async" style="view-transition-name:dish-queso-fundido"><span class="dish-photo-cap">With house chorizo</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Antojitos<br>No. 04</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#antojitos">Antojitos</a></nav>
    <h1 class="dish-title" data-split>Queso Fundido</h1>
    <div class="dish-meta"><span class="dish-price">$18</span><span class="tag tag-spice">Spice ✺<b>✺✺</b></span></div>
    <p class="dish-lead" data-reveal>Oaxaca and Chihuahua cheeses melted in cast iron with our own pork chorizo and strips of roasted poblano. It comes bubbling to the table with warm flour tortillas from Sonora.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Oaxaca cheese</li><li>Chihuahua cheese</li><li>House chorizo</li><li>Poblano rajas</li><li>Flour tortillas</li></ul></div>
    <a class="pairing" href="/menu/margarita-de-la-casa/" data-reveal><span class="pairing-img"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Margarita de la Casa</strong></span><span class="pairing-price">$17</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Queso Fundido from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM11 0h1v1h-1zM13 0h1v1h-1zM14 0h1v1h-1zM17 0h1v1h-1zM18 0h1v1h-1zM20 0h1v1h-1zM21 0h1v1h-1zM22 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM13 1h1v1h-1zM14 1h1v1h-1zM16 1h1v1h-1zM18 1h1v1h-1zM19 1h1v1h-1zM22 1h1v1h-1zM24 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM14 2h1v1h-1zM15 2h1v1h-1zM21 2h1v1h-1zM22 2h1v1h-1zM23 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM9 3h1v1h-1zM12 3h1v1h-1zM14 3h1v1h-1zM16 3h1v1h-1zM18 3h1v1h-1zM20 3h1v1h-1zM21 3h1v1h-1zM23 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM8 4h1v1h-1zM9 4h1v1h-1zM15 4h1v1h-1zM16 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1zM16 5h1v1h-1zM19 5h1v1h-1zM21 5h1v1h-1zM23 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM13 7h1v1h-1zM15 7h1v1h-1zM16 7h1v1h-1zM22 7h1v1h-1zM23 7h1v1h-1zM24 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM4 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM8 8h1v1h-1zM14 8h1v1h-1zM17 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM28 8h1v1h-1zM30 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM1 9h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM15 9h1v1h-1zM17 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM23 9h1v1h-1zM28 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM1 10h1v1h-1zM2 10h1v1h-1zM4 10h1v1h-1zM6 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM12 10h1v1h-1zM13 10h1v1h-1zM15 10h1v1h-1zM16 10h1v1h-1zM21 10h1v1h-1zM22 10h1v1h-1zM23 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM30 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM3 11h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM13 11h1v1h-1zM16 11h1v1h-1zM18 11h1v1h-1zM23 11h1v1h-1zM24 11h1v1h-1zM27 11h1v1h-1zM30 11h1v1h-1zM31 11h1v1h-1zM0 12h1v1h-1zM1 12h1v1h-1zM2 12h1v1h-1zM3 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM11 12h1v1h-1zM13 12h1v1h-1zM15 12h1v1h-1zM17 12h1v1h-1zM23 12h1v1h-1zM26 12h1v1h-1zM27 12h1v1h-1zM0 13h1v1h-1zM1 13h1v1h-1zM2 13h1v1h-1zM3 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM12 13h1v1h-1zM13 13h1v1h-1zM14 13h1v1h-1zM17 13h1v1h-1zM18 13h1v1h-1zM19 13h1v1h-1zM20 13h1v1h-1zM22 13h1v1h-1zM23 13h1v1h-1zM25 13h1v1h-1zM27 13h1v1h-1zM29 13h1v1h-1zM30 13h1v1h-1zM4 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM11 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1zM15 14h1v1h-1zM19 14h1v1h-1zM20 14h1v1h-1zM21 14h1v1h-1zM22 14h1v1h-1zM26 14h1v1h-1zM28 14h1v1h-1zM0 15h1v1h-1zM1 15h1v1h-1zM7 15h1v1h-1zM8 15h1v1h-1zM9 15h1v1h-1zM11 15h1v1h-1zM13 15h1v1h-1zM14 15h1v1h-1zM16 15h1v1h-1zM20 15h1v1h-1zM22 15h1v1h-1zM23 15h1v1h-1zM25 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM32 15h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM10 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM15 16h1v1h-1zM16 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM27 16h1v1h-1zM28 16h1v1h-1zM0 17h1v1h-1zM1 17h1v1h-1zM2 17h1v1h-1zM3 17h1v1h-1zM4 17h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM9 17h1v1h-1zM10 17h1v1h-1zM15 17h1v1h-1zM17 17h1v1h-1zM18 17h1v1h-1zM19 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM30 17h1v1h-1zM32 17h1v1h-1zM2 18h1v1h-1zM6 18h1v1h-1zM8 18h1v1h-1zM9 18h1v1h-1zM11 18h1v1h-1zM15 18h1v1h-1zM17 18h1v1h-1zM18 18h1v1h-1zM19 18h1v1h-1zM20 18h1v1h-1zM22 18h1v1h-1zM23 18h1v1h-1zM27 18h1v1h-1zM29 18h1v1h-1zM30 18h1v1h-1zM31 18h1v1h-1zM32 18h1v1h-1zM1 19h1v1h-1zM4 19h1v1h-1zM7 19h1v1h-1zM8 19h1v1h-1zM10 19h1v1h-1zM12 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM23 19h1v1h-1zM24 19h1v1h-1zM28 19h1v1h-1zM29 19h1v1h-1zM30 19h1v1h-1zM1 20h1v1h-1zM2 20h1v1h-1zM4 20h1v1h-1zM6 20h1v1h-1zM9 20h1v1h-1zM10 20h1v1h-1zM16 20h1v1h-1zM18 20h1v1h-1zM22 20h1v1h-1zM24 20h1v1h-1zM25 20h1v1h-1zM27 20h1v1h-1zM29 20h1v1h-1zM32 20h1v1h-1zM0 21h1v1h-1zM1 21h1v1h-1zM3 21h1v1h-1zM7 21h1v1h-1zM8 21h1v1h-1zM11 21h1v1h-1zM13 21h1v1h-1zM14 21h1v1h-1zM23 21h1v1h-1zM27 21h1v1h-1zM28 21h1v1h-1zM29 21h1v1h-1zM30 21h1v1h-1zM0 22h1v1h-1zM2 22h1v1h-1zM4 22h1v1h-1zM6 22h1v1h-1zM7 22h1v1h-1zM8 22h1v1h-1zM9 22h1v1h-1zM10 22h1v1h-1zM12 22h1v1h-1zM13 22h1v1h-1zM17 22h1v1h-1zM19 22h1v1h-1zM20 22h1v1h-1zM21 22h1v1h-1zM23 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM30 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM0 23h1v1h-1zM2 23h1v1h-1zM3 23h1v1h-1zM8 23h1v1h-1zM15 23h1v1h-1zM17 23h1v1h-1zM19 23h1v1h-1zM20 23h1v1h-1zM25 23h1v1h-1zM26 23h1v1h-1zM27 23h1v1h-1zM28 23h1v1h-1zM30 23h1v1h-1zM31 23h1v1h-1zM0 24h1v1h-1zM1 24h1v1h-1zM2 24h1v1h-1zM3 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM13 24h1v1h-1zM14 24h1v1h-1zM16 24h1v1h-1zM20 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM29 24h1v1h-1zM31 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM15 25h1v1h-1zM17 25h1v1h-1zM18 25h1v1h-1zM21 25h1v1h-1zM23 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM30 25h1v1h-1zM31 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM10 26h1v1h-1zM12 26h1v1h-1zM14 26h1v1h-1zM15 26h1v1h-1zM17 26h1v1h-1zM19 26h1v1h-1zM21 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM30 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM11 27h1v1h-1zM14 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM19 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM31 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM8 28h1v1h-1zM9 28h1v1h-1zM10 28h1v1h-1zM12 28h1v1h-1zM13 28h1v1h-1zM14 28h1v1h-1zM15 28h1v1h-1zM16 28h1v1h-1zM17 28h1v1h-1zM19 28h1v1h-1zM20 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM32 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM9 29h1v1h-1zM10 29h1v1h-1zM11 29h1v1h-1zM12 29h1v1h-1zM13 29h1v1h-1zM14 29h1v1h-1zM16 29h1v1h-1zM18 29h1v1h-1zM21 29h1v1h-1zM24 29h1v1h-1zM25 29h1v1h-1zM27 29h1v1h-1zM31 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM10 30h1v1h-1zM13 30h1v1h-1zM15 30h1v1h-1zM19 30h1v1h-1zM21 30h1v1h-1zM23 30h1v1h-1zM24 30h1v1h-1zM25 30h1v1h-1zM27 30h1v1h-1zM28 30h1v1h-1zM29 30h1v1h-1zM31 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM10 31h1v1h-1zM14 31h1v1h-1zM18 31h1v1h-1zM19 31h1v1h-1zM20 31h1v1h-1zM23 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM29 31h1v1h-1zM30 31h1v1h-1zM31 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM11 32h1v1h-1zM13 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM19 32h1v1h-1zM22 32h1v1h-1zM24 32h1v1h-1zM26 32h1v1h-1zM27 32h1v1h-1zM28 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Queso Fundido to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Queso Fundido" data-price="18">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#antojitos">Back to Antojitos <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/aguachile-verde/" rel="prev"><small>← Previous</small>Aguachile Verde</a><a href="/menu/tacos-al-pastor/" rel="next"><small>Next →</small>Tacos al Pastor</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-3deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a><a class="polaroid" href="/menu/elote-asado/" style="--r:2deg"><img src="../../assets/dish-elote-lg.webp?v=4" srcset="../../assets/dish-elote-sm.webp?v=4 600w, ../../assets/dish-elote-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Elote Asado" loading="lazy" decoding="async"><span>Elote Asado · $14</span></a><a class="polaroid" href="/menu/aguachile-verde/" style="--r:-2deg"><img src="../../assets/dish-aguachile-lg.webp?v=4" srcset="../../assets/dish-aguachile-sm.webp?v=4 600w, ../../assets/dish-aguachile-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Aguachile Verde" loading="lazy" decoding="async"><span>Aguachile Verde · $24</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/tacos-al-pastor/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tacos al Pastor | Casa Nopal, NYC</title>
<meta name="description" content="Tacos al Pastor at Casa Nopal, West Village: Achiote-marinated pork shaved from the trompo, charred pineapple, onion, cilantro, salsa roja. $18.">
<link rel="canonical" href="https://casanopal.nyc/menu/tacos-al-pastor/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Tacos al Pastor">
<meta property="og:description" content="Tacos al Pastor at Casa Nopal, West Village: Achiote-marinated pork shaved from the trompo, charred pineapple, onion, cilantro, salsa roja. $18.">
<meta property="og:url" content="https://casanopal.nyc/menu/tacos-al-pastor/">
<meta property="og:image" content="../../assets/dish-al-pastor-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tacos al Pastor">
<meta name="twitter:description" content="Tacos al Pastor at Casa Nopal, West Village: Achiote-marinated pork shaved from the trompo, charred pineapple, onion, cilantro, salsa roja. $18.">
<meta name="twitter:image" content="../../assets/dish-al-pastor-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Tacos al Pastor","item":"https://casanopal.nyc/menu/tacos-al-pastor/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Tacos al Pastor","description":"Pork shoulder marinated overnight in achiote, guajillo and orange, stacked on the trompo and shaved to order the way it is done in Mexico City. Served on corn tortillas with charred pineapple, white onion, cilantro and a smoky salsa roja.","image":"../../assets/dish-al-pastor-lg.webp","url":"https://casanopal.nyc/menu/tacos-al-pastor/","offers":{"@type":"Offer","price":18,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/GlutenFreeDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-al-pastor-lg.webp?v=4" srcset="../../assets/dish-al-pastor-sm.webp?v=4 600w, ../../assets/dish-al-pastor-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Tacos al Pastor: Achiote-marinated pork shaved from the trompo, charred pineapple, onion, cilantro, salsa roja." fetchpriority="high" decoding="async" style="view-transition-name:dish-tacos-al-pastor"><span class="dish-photo-cap">From the trompo</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Tacos<br>No. 05</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#tacos">Tacos</a></nav>
    <h1 class="dish-title" data-split>Tacos al Pastor</h1>
    <div class="dish-meta"><span class="dish-price">$18</span><span class="tag">Gluten free</span><span class="tag tag-spice">Spice ✺✺<b>✺</b></span></div>
    <p class="dish-lead" data-reveal>Pork shoulder marinated overnight in achiote, guajillo and orange, stacked on the trompo and shaved to order the way it is done in Mexico City. Served on corn tortillas with charred pineapple, white onion, cilantro and a smoky salsa roja.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Pork shoulder</li><li>Achiote</li><li>Guajillo chile</li><li>Pineapple</li><li>White onion</li><li>Cilantro</li><li>Corn tortillas</li></ul></div>
    <a class="pairing" href="/menu/margarita-de-la-casa/" data-reveal><span class="pairing-img"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Margarita de la Casa</strong></span><span class="pairing-price">$17</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Tacos al Pastor from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM11 0h1v1h-1zM12 0h1v1h-1zM16 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM10 1h1v1h-1zM12 1h1v1h-1zM14 1h1v1h-1zM16 1h1v1h-1zM17 1h1v1h-1zM21 1h1v1h-1zM22 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM14 2h1v1h-1zM16 2h1v1h-1zM18 2h1v1h-1zM23 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM15 3h1v1h-1zM18 3h1v1h-1zM22 3h1v1h-1zM23 3h1v1h-1zM24 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM11 4h1v1h-1zM16 4h1v1h-1zM18 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM15 5h1v1h-1zM16 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM21 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM15 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM19 7h1v1h-1zM22 7h1v1h-1zM24 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM16 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM21 8h1v1h-1zM23 8h1v1h-1zM26 8h1v1h-1zM29 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM2 9h1v1h-1zM4 9h1v1h-1zM5 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM10 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM16 9h1v1h-1zM17 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM20 9h1v1h-1zM21 9h1v1h-1zM22 9h1v1h-1zM23 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM32 9h1v1h-1zM3 10h1v1h-1zM6 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM12 10h1v1h-1zM13 10h1v1h-1zM18 10h1v1h-1zM21 10h1v1h-1zM23 10h1v1h-1zM24 10h1v1h-1zM26 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM2 11h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM11 11h1v1h-1zM17 11h1v1h-1zM19 11h1v1h-1zM22 11h1v1h-1zM26 11h1v1h-1zM27 11h1v1h-1zM29 11h1v1h-1zM2 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM14 12h1v1h-1zM15 12h1v1h-1zM16 12h1v1h-1zM19 12h1v1h-1zM22 12h1v1h-1zM25 12h1v1h-1zM28 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM32 12h1v1h-1zM2 13h1v1h-1zM3 13h1v1h-1zM5 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM12 13h1v1h-1zM13 13h1v1h-1zM14 13h1v1h-1zM20 13h1v1h-1zM25 13h1v1h-1zM27 13h1v1h-1zM29 13h1v1h-1zM31 13h1v1h-1zM1 14h1v1h-1zM4 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM11 14h1v1h-1zM18 14h1v1h-1zM19 14h1v1h-1zM20 14h1v1h-1zM22 14h1v1h-1zM24 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM28 14h1v1h-1zM29 14h1v1h-1zM1 15h1v1h-1zM8 15h1v1h-1zM9 15h1v1h-1zM10 15h1v1h-1zM11 15h1v1h-1zM12 15h1v1h-1zM14 15h1v1h-1zM15 15h1v1h-1zM21 15h1v1h-1zM23 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM27 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM0 16h1v1h-1zM2 16h1v1h-1zM3 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM16 16h1v1h-1zM18 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM29 16h1v1h-1zM30 16h1v1h-1zM1 17h1v1h-1zM2 17h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM13 17h1v1h-1zM15 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM32 17h1v1h-1zM2 18h1v1h-1zM3 18h1v1h-1zM4 18h1v1h-1zM6 18h1v1h-1zM8 18h1v1h-1zM9 18h1v1h-1zM11 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1zM18 18h1v1h-1zM21 18h1v1h-1zM22 18h1v1h-1zM25 18h1v1h-1zM27 18h1v1h-1zM28 18h1v1h-1zM30 18h1v1h-1zM5 19h1v1h-1zM8 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM17 19h1v1h-1zM18 19h1v1h-1zM19 19h1v1h-1zM26 19h1v1h-1zM28 19h1v1h-1zM31 19h1v1h-1zM0 20h1v1h-1zM1 20h1v1h-1zM2 20h1v1h-1zM4 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM7 20h1v1h-1zM8 20h1v1h-1zM9 20h1v1h-1zM10 20h1v1h-1zM12 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM20 20h1v1h-1zM21 20h1v1h-1zM29 20h1v1h-1zM30 20h1v1h-1zM31 20h1v1h-1zM0 21h1v1h-1zM1 21h1v1h-1zM3 21h1v1h-1zM8 21h1v1h-1zM9 21h1v1h-1zM12 21h1v1h-1zM15 21h1v1h-1zM16 21h1v1h-1zM19 21h1v1h-1zM21 21h1v1h-1zM23 21h1v1h-1zM24 21h1v1h-1zM26 21h1v1h-1zM29 21h1v1h-1zM32 21h1v1h-1zM2 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM7 22h1v1h-1zM11 22h1v1h-1zM13 22h1v1h-1zM14 22h1v1h-1zM15 22h1v1h-1zM17 22h1v1h-1zM18 22h1v1h-1zM23 22h1v1h-1zM26 22h1v1h-1zM29 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM4 23h1v1h-1zM8 23h1v1h-1zM10 23h1v1h-1zM11 23h1v1h-1zM13 23h1v1h-1zM15 23h1v1h-1zM18 23h1v1h-1zM19 23h1v1h-1zM20 23h1v1h-1zM23 23h1v1h-1zM26 23h1v1h-1zM28 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM4 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM11 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM22 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM11 25h1v1h-1zM12 25h1v1h-1zM13 25h1v1h-1zM14 25h1v1h-1zM15 25h1v1h-1zM19 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM31 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM10 26h1v1h-1zM12 26h1v1h-1zM13 26h1v1h-1zM17 26h1v1h-1zM18 26h1v1h-1zM19 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM10 27h1v1h-1zM12 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM17 27h1v1h-1zM18 27h1v1h-1zM19 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM22 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM9 28h1v1h-1zM10 28h1v1h-1zM11 28h1v1h-1zM13 28h1v1h-1zM14 28h1v1h-1zM16 28h1v1h-1zM17 28h1v1h-1zM18 28h1v1h-1zM19 28h1v1h-1zM21 28h1v1h-1zM22 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM30 28h1v1h-1zM31 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM11 29h1v1h-1zM12 29h1v1h-1zM16 29h1v1h-1zM17 29h1v1h-1zM21 29h1v1h-1zM23 29h1v1h-1zM27 29h1v1h-1zM29 29h1v1h-1zM30 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM8 30h1v1h-1zM12 30h1v1h-1zM13 30h1v1h-1zM14 30h1v1h-1zM15 30h1v1h-1zM16 30h1v1h-1zM17 30h1v1h-1zM21 30h1v1h-1zM22 30h1v1h-1zM24 30h1v1h-1zM26 30h1v1h-1zM27 30h1v1h-1zM29 30h1v1h-1zM30 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM11 31h1v1h-1zM12 31h1v1h-1zM13 31h1v1h-1zM14 31h1v1h-1zM17 31h1v1h-1zM19 31h1v1h-1zM20 31h1v1h-1zM24 31h1v1h-1zM25 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM12 32h1v1h-1zM13 32h1v1h-1zM14 32h1v1h-1zM17 32h1v1h-1zM18 32h1v1h-1zM19 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM26 32h1v1h-1zM28 32h1v1h-1zM29 32h1v1h-1zM30 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Tacos al Pastor to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Tacos al Pastor" data-price="18">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#tacos">Back to Tacos <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/queso-fundido/" rel="prev"><small>← Previous</small>Queso Fundido</a><a href="/menu/tacos-de-carnitas/" rel="next"><small>Next →</small>Tacos de Carnitas</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/tacos-de-carnitas/" style="--r:-3deg"><img src="../../assets/dish-carnitas-lg.webp?v=4" srcset="../../assets/dish-carnitas-sm.webp?v=4 600w, ../../assets/dish-carnitas-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos de Carnitas" loading="lazy" decoding="async"><span>Tacos de Carnitas · $17</span></a><a class="polaroid" href="/menu/tacos-baja/" style="--r:2deg"><img src="../../assets/dish-baja-fish-lg.webp?v=4" srcset="../../assets/dish-baja-fish-sm.webp?v=4 600w, ../../assets/dish-baja-fish-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos Baja" loading="lazy" decoding="async"><span>Tacos Baja · $19</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/tacos-baja/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tacos Baja | Casa Nopal, NYC</title>
<meta name="description" content="Tacos Baja at Casa Nopal, West Village: Beer-battered cod, cabbage slaw, chipotle crema, lime. $19.">
<link rel="canonical" href="https://casanopal.nyc/menu/tacos-baja/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Tacos Baja">
<meta property="og:description" content="Tacos Baja at Casa Nopal, West Village: Beer-battered cod, cabbage slaw, chipotle crema, lime. $19.">
<meta property="og:url" content="https://casanopal.nyc/menu/tacos-baja/">
<meta property="og:image" content="../../assets/dish-baja-fish-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tacos Baja">
<meta name="twitter:description" content="Tacos Baja at Casa Nopal, West Village: Beer-battered cod, cabbage slaw, chipotle crema, lime. $19.">
<meta name="twitter:image" content="../../assets/dish-baja-fish-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Tacos Baja","item":"https://casanopal.nyc/menu/tacos-baja/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Tacos Baja","description":"Atlantic cod in a crisp Mexican-lager batter, tucked into corn tortillas with lime-dressed cabbage, chipotle crema and pico de gallo. The way they serve them from the carts in Ensenada.","image":"../../assets/dish-baja-fish-lg.webp","url":"https://casanopal.nyc/menu/tacos-baja/","offers":{"@type":"Offer","price":19,"priceCurrency":"USD","availability":"https://schema.org/InStock"}}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-baja-fish-lg.webp?v=4" srcset="../../assets/dish-baja-fish-sm.webp?v=4 600w, ../../assets/dish-baja-fish-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Tacos Baja: Beer-battered cod, cabbage slaw, chipotle crema, lime." fetchpriority="high" decoding="async" style="view-transition-name:dish-tacos-baja"><span class="dish-photo-cap">Ensenada fish tacos</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Tacos<br>No. 07</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#tacos">Tacos</a></nav>
    <h1 class="dish-title" data-split>Tacos Baja</h1>
    <div class="dish-meta"><span class="dish-price">$19</span><span class="tag tag-spice">Spice ✺<b>✺✺</b></span></div>
    <p class="dish-lead" data-reveal>Atlantic cod in a crisp Mexican-lager batter, tucked into corn tortillas with lime-dressed cabbage, chipotle crema and pico de gallo. The way they serve them from the carts in Ensenada.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Atlantic cod</li><li>Lager batter</li><li>Cabbage</li><li>Chipotle crema</li><li>Pico de gallo</li></ul></div>
    <a class="pairing" href="/menu/margarita-de-la-casa/" data-reveal><span class="pairing-img"><img src="../../assets/dish-margarita-lg.webp?v=4" srcset="../../assets/dish-margarita-sm.webp?v=4 600w, ../../assets/dish-margarita-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Margarita de la Casa</strong></span><span class="pairing-price">$17</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Tacos Baja from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM10 0h1v1h-1zM12 0h1v1h-1zM13 0h1v1h-1zM16 0h1v1h-1zM17 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM13 1h1v1h-1zM16 1h1v1h-1zM18 1h1v1h-1zM22 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM11 2h1v1h-1zM16 2h1v1h-1zM17 2h1v1h-1zM23 2h1v1h-1zM24 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM14 3h1v1h-1zM15 3h1v1h-1zM16 3h1v1h-1zM20 3h1v1h-1zM23 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM14 4h1v1h-1zM20 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM11 5h1v1h-1zM12 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM20 5h1v1h-1zM21 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM11 7h1v1h-1zM12 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM20 7h1v1h-1zM22 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM9 8h1v1h-1zM11 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM19 8h1v1h-1zM21 8h1v1h-1zM26 8h1v1h-1zM29 8h1v1h-1zM31 8h1v1h-1zM32 8h1v1h-1zM0 9h1v1h-1zM4 9h1v1h-1zM5 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM12 9h1v1h-1zM16 9h1v1h-1zM18 9h1v1h-1zM19 9h1v1h-1zM20 9h1v1h-1zM21 9h1v1h-1zM22 9h1v1h-1zM23 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM29 9h1v1h-1zM30 9h1v1h-1zM32 9h1v1h-1zM0 10h1v1h-1zM1 10h1v1h-1zM4 10h1v1h-1zM6 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM12 10h1v1h-1zM14 10h1v1h-1zM17 10h1v1h-1zM23 10h1v1h-1zM24 10h1v1h-1zM25 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM29 10h1v1h-1zM31 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM13 11h1v1h-1zM14 11h1v1h-1zM18 11h1v1h-1zM19 11h1v1h-1zM26 11h1v1h-1zM27 11h1v1h-1zM29 11h1v1h-1zM0 12h1v1h-1zM1 12h1v1h-1zM2 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM15 12h1v1h-1zM18 12h1v1h-1zM19 12h1v1h-1zM21 12h1v1h-1zM25 12h1v1h-1zM28 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM32 12h1v1h-1zM0 13h1v1h-1zM4 13h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM13 13h1v1h-1zM16 13h1v1h-1zM18 13h1v1h-1zM24 13h1v1h-1zM29 13h1v1h-1zM31 13h1v1h-1zM1 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM14 14h1v1h-1zM15 14h1v1h-1zM16 14h1v1h-1zM18 14h1v1h-1zM22 14h1v1h-1zM24 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM30 14h1v1h-1zM0 15h1v1h-1zM1 15h1v1h-1zM2 15h1v1h-1zM3 15h1v1h-1zM4 15h1v1h-1zM5 15h1v1h-1zM13 15h1v1h-1zM14 15h1v1h-1zM16 15h1v1h-1zM19 15h1v1h-1zM20 15h1v1h-1zM21 15h1v1h-1zM25 15h1v1h-1zM26 15h1v1h-1zM28 15h1v1h-1zM29 15h1v1h-1zM30 15h1v1h-1zM4 16h1v1h-1zM6 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM11 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM15 16h1v1h-1zM16 16h1v1h-1zM18 16h1v1h-1zM19 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM23 16h1v1h-1zM25 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM29 16h1v1h-1zM30 16h1v1h-1zM0 17h1v1h-1zM1 17h1v1h-1zM3 17h1v1h-1zM7 17h1v1h-1zM9 17h1v1h-1zM13 17h1v1h-1zM15 17h1v1h-1zM17 17h1v1h-1zM20 17h1v1h-1zM21 17h1v1h-1zM22 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM32 17h1v1h-1zM0 18h1v1h-1zM1 18h1v1h-1zM3 18h1v1h-1zM4 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM7 18h1v1h-1zM8 18h1v1h-1zM9 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1zM17 18h1v1h-1zM22 18h1v1h-1zM25 18h1v1h-1zM26 18h1v1h-1zM27 18h1v1h-1zM28 18h1v1h-1zM30 18h1v1h-1zM0 19h1v1h-1zM2 19h1v1h-1zM5 19h1v1h-1zM8 19h1v1h-1zM9 19h1v1h-1zM11 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM19 19h1v1h-1zM21 19h1v1h-1zM25 19h1v1h-1zM28 19h1v1h-1zM31 19h1v1h-1zM1 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM7 20h1v1h-1zM12 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM18 20h1v1h-1zM20 20h1v1h-1zM29 20h1v1h-1zM30 20h1v1h-1zM31 20h1v1h-1zM0 21h1v1h-1zM5 21h1v1h-1zM10 21h1v1h-1zM14 21h1v1h-1zM15 21h1v1h-1zM18 21h1v1h-1zM21 21h1v1h-1zM23 21h1v1h-1zM25 21h1v1h-1zM26 21h1v1h-1zM27 21h1v1h-1zM30 21h1v1h-1zM32 21h1v1h-1zM3 22h1v1h-1zM5 22h1v1h-1zM6 22h1v1h-1zM7 22h1v1h-1zM8 22h1v1h-1zM11 22h1v1h-1zM12 22h1v1h-1zM14 22h1v1h-1zM16 22h1v1h-1zM17 22h1v1h-1zM18 22h1v1h-1zM23 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM31 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM2 23h1v1h-1zM5 23h1v1h-1zM10 23h1v1h-1zM11 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM19 23h1v1h-1zM24 23h1v1h-1zM26 23h1v1h-1zM28 23h1v1h-1zM29 23h1v1h-1zM31 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM3 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM8 24h1v1h-1zM9 24h1v1h-1zM10 24h1v1h-1zM11 24h1v1h-1zM12 24h1v1h-1zM13 24h1v1h-1zM15 24h1v1h-1zM17 24h1v1h-1zM22 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM31 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM9 25h1v1h-1zM10 25h1v1h-1zM13 25h1v1h-1zM14 25h1v1h-1zM15 25h1v1h-1zM17 25h1v1h-1zM19 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM31 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM8 26h1v1h-1zM11 26h1v1h-1zM13 26h1v1h-1zM19 26h1v1h-1zM22 26h1v1h-1zM23 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM9 27h1v1h-1zM10 27h1v1h-1zM11 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM19 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM22 27h1v1h-1zM23 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM29 27h1v1h-1zM30 27h1v1h-1zM31 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM9 28h1v1h-1zM11 28h1v1h-1zM13 28h1v1h-1zM17 28h1v1h-1zM19 28h1v1h-1zM20 28h1v1h-1zM23 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM30 28h1v1h-1zM31 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM10 29h1v1h-1zM13 29h1v1h-1zM14 29h1v1h-1zM17 29h1v1h-1zM18 29h1v1h-1zM19 29h1v1h-1zM20 29h1v1h-1zM21 29h1v1h-1zM23 29h1v1h-1zM27 29h1v1h-1zM30 29h1v1h-1zM31 29h1v1h-1zM32 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM8 30h1v1h-1zM10 30h1v1h-1zM11 30h1v1h-1zM12 30h1v1h-1zM13 30h1v1h-1zM17 30h1v1h-1zM19 30h1v1h-1zM21 30h1v1h-1zM22 30h1v1h-1zM24 30h1v1h-1zM26 30h1v1h-1zM27 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h1v1h-1zM10 31h1v1h-1zM13 31h1v1h-1zM15 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM19 31h1v1h-1zM23 31h1v1h-1zM24 31h1v1h-1zM26 31h1v1h-1zM27 31h1v1h-1zM28 31h1v1h-1zM32 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM12 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM18 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM23 32h1v1h-1zM25 32h1v1h-1zM26 32h1v1h-1zM28 32h1v1h-1zM30 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Tacos Baja to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Tacos Baja" data-price="19">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#tacos">Back to Tacos <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/tacos-de-carnitas/" rel="prev"><small>← Previous</small>Tacos de Carnitas</a><a href="/menu/mole-negro/" rel="next"><small>Next →</small>Mole Negro</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/tacos-al-pastor/" style="--r:-3deg"><img src="../../assets/dish-al-pastor-lg.webp?v=4" srcset="../../assets/dish-al-pastor-sm.webp?v=4 600w, ../../assets/dish-al-pastor-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos al Pastor" loading="lazy" decoding="async"><span>Tacos al Pastor · $18</span></a><a class="polaroid" href="/menu/tacos-de-carnitas/" style="--r:2deg"><img src="../../assets/dish-carnitas-lg.webp?v=4" srcset="../../assets/dish-carnitas-sm.webp?v=4 600w, ../../assets/dish-carnitas-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos de Carnitas" loading="lazy" decoding="async"><span>Tacos de Carnitas · $17</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `menu/tacos-de-carnitas/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tacos de Carnitas | Casa Nopal, NYC</title>
<meta name="description" content="Tacos de Carnitas at Casa Nopal, West Village: Pork confit in its own fat until crisp, pickled red onion, salsa verde cruda. $17.">
<link rel="canonical" href="https://casanopal.nyc/menu/tacos-de-carnitas/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Tacos de Carnitas">
<meta property="og:description" content="Tacos de Carnitas at Casa Nopal, West Village: Pork confit in its own fat until crisp, pickled red onion, salsa verde cruda. $17.">
<meta property="og:url" content="https://casanopal.nyc/menu/tacos-de-carnitas/">
<meta property="og:image" content="../../assets/dish-carnitas-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tacos de Carnitas">
<meta name="twitter:description" content="Tacos de Carnitas at Casa Nopal, West Village: Pork confit in its own fat until crisp, pickled red onion, salsa verde cruda. $17.">
<meta name="twitter:image" content="../../assets/dish-carnitas-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Menu","item":"https://casanopal.nyc/menu/"},{"@type":"ListItem","position":3,"name":"Tacos de Carnitas","item":"https://casanopal.nyc/menu/tacos-de-carnitas/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"MenuItem","name":"Tacos de Carnitas","description":"Following the cazo tradition of Michoacán, pork is confit slowly in its own fat with orange and bay until the edges turn crisp and the centre stays soft. Finished with pickled red onion and a raw tomatillo salsa.","image":"../../assets/dish-carnitas-lg.webp","url":"https://casanopal.nyc/menu/tacos-de-carnitas/","offers":{"@type":"Offer","price":17,"priceCurrency":"USD","availability":"https://schema.org/InStock"},"suitableForDiet":"https://schema.org/GlutenFreeDiet"}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../../assets/dish-al-pastor-sm.webp?v=4" aria-current="page" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../../assets/private-dining-sm.webp?v=4" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<div class="picado picado--top" data-picado aria-hidden="true"></div>
<article class="dish wrap">
  <div class="dish-media"><div class="dish-photo"><img src="../../assets/dish-carnitas-lg.webp?v=4" srcset="../../assets/dish-carnitas-sm.webp?v=4 600w, ../../assets/dish-carnitas-lg.webp?v=4 1200w" sizes="(max-width: 900px) 100vw, 50vw" width="1200" height="1200" alt="Tacos de Carnitas: Pork confit in its own fat until crisp, pickled red onion, salsa verde cruda." fetchpriority="high" decoding="async" style="view-transition-name:dish-tacos-de-carnitas"><span class="dish-photo-cap">Michoacán style</span></div><span class="sticker dish-sticker" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M116.0 60.0 Q123.0 71.1 112.6 79.2 Q115.4 92.0 102.9 96.0 Q101.1 109.0 88.0 108.5 Q81.9 120.1 69.7 115.1 Q60.0 124.0 50.3 115.1 Q38.1 120.1 32.0 108.5 Q18.9 109.0 17.1 96.0 Q4.6 92.0 7.4 79.2 Q-3.0 71.1 4.0 60.0 Q-3.0 48.9 7.4 40.8 Q4.6 28.0 17.1 24.0 Q18.9 11.0 32.0 11.5 Q38.1 -0.1 50.3 4.9 Q60.0 -4.0 69.7 4.9 Q81.9 -0.1 88.0 11.5 Q101.1 11.0 102.9 24.0 Q115.4 28.0 112.6 40.8 Q123.0 48.9 116.0 60.0Z"/></svg><span>Tacos<br>No. 06</span></span></div>
  <div class="dish-info">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><a href="/menu/">Menu</a><span>✦</span><a href="/menu/#tacos">Tacos</a></nav>
    <h1 class="dish-title" data-split>Tacos de Carnitas</h1>
    <div class="dish-meta"><span class="dish-price">$17</span><span class="tag">Gluten free</span><span class="tag">Dairy free</span><span class="tag tag-spice">Spice ✺✺<b>✺</b></span></div>
    <p class="dish-lead" data-reveal>Following the cazo tradition of Michoacán, pork is confit slowly in its own fat with orange and bay until the edges turn crisp and the centre stays soft. Finished with pickled red onion and a raw tomatillo salsa.</p>
    <div class="dish-block" data-reveal><p class="label">What's in it</p><ul class="ingredients"><li>Heritage pork</li><li>Orange</li><li>Bay leaf</li><li>Pickled red onion</li><li>Tomatillo salsa</li></ul></div>
    <a class="pairing" href="/menu/mezcal-flight/" data-reveal><span class="pairing-img"><img src="../../assets/dish-mezcal-flight-lg.webp?v=4" srcset="../../assets/dish-mezcal-flight-sm.webp?v=4 600w, ../../assets/dish-mezcal-flight-lg.webp?v=4 1200w" sizes="80px" width="1200" height="1200" alt="" loading="lazy" decoding="async"></span><span><small>Pairs well with</small><strong>Mezcal Flight</strong></span><span class="pairing-price">$32</span></a>
    <div class="qr-ticket" data-reveal>
      <div class="qr-code" role="img" aria-label="QR code to order Tacos de Carnitas from your table"><svg viewBox="0 0 33 33" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM10 0h1v1h-1zM12 0h1v1h-1zM14 0h1v1h-1zM15 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM20 0h1v1h-1zM21 0h1v1h-1zM22 0h1v1h-1zM23 0h1v1h-1zM26 0h1v1h-1zM27 0h1v1h-1zM28 0h1v1h-1zM29 0h1v1h-1zM30 0h1v1h-1zM31 0h1v1h-1zM32 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM15 1h1v1h-1zM17 1h1v1h-1zM20 1h1v1h-1zM23 1h1v1h-1zM26 1h1v1h-1zM32 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM11 2h1v1h-1zM14 2h1v1h-1zM16 2h1v1h-1zM17 2h1v1h-1zM19 2h1v1h-1zM26 2h1v1h-1zM28 2h1v1h-1zM29 2h1v1h-1zM30 2h1v1h-1zM32 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM9 3h1v1h-1zM13 3h1v1h-1zM15 3h1v1h-1zM17 3h1v1h-1zM19 3h1v1h-1zM20 3h1v1h-1zM26 3h1v1h-1zM28 3h1v1h-1zM29 3h1v1h-1zM30 3h1v1h-1zM32 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM9 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM16 4h1v1h-1zM17 4h1v1h-1zM18 4h1v1h-1zM20 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM23 4h1v1h-1zM24 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM29 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h1v1h-1zM17 5h1v1h-1zM18 5h1v1h-1zM19 5h1v1h-1zM22 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM32 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM27 6h1v1h-1zM28 6h1v1h-1zM29 6h1v1h-1zM30 6h1v1h-1zM31 6h1v1h-1zM32 6h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM11 7h1v1h-1zM14 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1zM20 7h1v1h-1zM21 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM11 8h1v1h-1zM12 8h1v1h-1zM13 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM16 8h1v1h-1zM19 8h1v1h-1zM21 8h1v1h-1zM23 8h1v1h-1zM24 8h1v1h-1zM25 8h1v1h-1zM27 8h1v1h-1zM0 9h1v1h-1zM2 9h1v1h-1zM9 9h1v1h-1zM10 9h1v1h-1zM11 9h1v1h-1zM16 9h1v1h-1zM20 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM25 9h1v1h-1zM26 9h1v1h-1zM27 9h1v1h-1zM31 9h1v1h-1zM32 9h1v1h-1zM1 10h1v1h-1zM3 10h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM9 10h1v1h-1zM11 10h1v1h-1zM17 10h1v1h-1zM19 10h1v1h-1zM21 10h1v1h-1zM22 10h1v1h-1zM25 10h1v1h-1zM26 10h1v1h-1zM27 10h1v1h-1zM28 10h1v1h-1zM30 10h1v1h-1zM32 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM2 11h1v1h-1zM3 11h1v1h-1zM4 11h1v1h-1zM10 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM16 11h1v1h-1zM17 11h1v1h-1zM19 11h1v1h-1zM20 11h1v1h-1zM21 11h1v1h-1zM22 11h1v1h-1zM25 11h1v1h-1zM28 11h1v1h-1zM29 11h1v1h-1zM32 11h1v1h-1zM0 12h1v1h-1zM1 12h1v1h-1zM2 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM9 12h1v1h-1zM12 12h1v1h-1zM19 12h1v1h-1zM21 12h1v1h-1zM25 12h1v1h-1zM26 12h1v1h-1zM27 12h1v1h-1zM29 12h1v1h-1zM31 12h1v1h-1zM0 13h1v1h-1zM1 13h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM13 13h1v1h-1zM15 13h1v1h-1zM16 13h1v1h-1zM19 13h1v1h-1zM21 13h1v1h-1zM22 13h1v1h-1zM24 13h1v1h-1zM26 13h1v1h-1zM28 13h1v1h-1zM31 13h1v1h-1zM32 13h1v1h-1zM0 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM6 14h1v1h-1zM9 14h1v1h-1zM12 14h1v1h-1zM14 14h1v1h-1zM17 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM25 14h1v1h-1zM26 14h1v1h-1zM27 14h1v1h-1zM28 14h1v1h-1zM29 14h1v1h-1zM30 14h1v1h-1zM31 14h1v1h-1zM0 15h1v1h-1zM5 15h1v1h-1zM7 15h1v1h-1zM9 15h1v1h-1zM11 15h1v1h-1zM13 15h1v1h-1zM14 15h1v1h-1zM15 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM21 15h1v1h-1zM23 15h1v1h-1zM26 15h1v1h-1zM27 15h1v1h-1zM31 15h1v1h-1zM2 16h1v1h-1zM3 16h1v1h-1zM5 16h1v1h-1zM6 16h1v1h-1zM8 16h1v1h-1zM16 16h1v1h-1zM17 16h1v1h-1zM19 16h1v1h-1zM21 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM31 16h1v1h-1zM1 17h1v1h-1zM4 17h1v1h-1zM5 17h1v1h-1zM7 17h1v1h-1zM9 17h1v1h-1zM10 17h1v1h-1zM12 17h1v1h-1zM14 17h1v1h-1zM16 17h1v1h-1zM23 17h1v1h-1zM24 17h1v1h-1zM25 17h1v1h-1zM27 17h1v1h-1zM29 17h1v1h-1zM31 17h1v1h-1zM1 18h1v1h-1zM3 18h1v1h-1zM6 18h1v1h-1zM12 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM21 18h1v1h-1zM25 18h1v1h-1zM30 18h1v1h-1zM32 18h1v1h-1zM0 19h1v1h-1zM1 19h1v1h-1zM3 19h1v1h-1zM5 19h1v1h-1zM9 19h1v1h-1zM10 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM17 19h1v1h-1zM18 19h1v1h-1zM19 19h1v1h-1zM20 19h1v1h-1zM21 19h1v1h-1zM26 19h1v1h-1zM27 19h1v1h-1zM31 19h1v1h-1zM32 19h1v1h-1zM0 20h1v1h-1zM2 20h1v1h-1zM3 20h1v1h-1zM4 20h1v1h-1zM5 20h1v1h-1zM6 20h1v1h-1zM8 20h1v1h-1zM12 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1zM17 20h1v1h-1zM18 20h1v1h-1zM19 20h1v1h-1zM20 20h1v1h-1zM21 20h1v1h-1zM23 20h1v1h-1zM24 20h1v1h-1zM25 20h1v1h-1zM4 21h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM11 21h1v1h-1zM12 21h1v1h-1zM13 21h1v1h-1zM15 21h1v1h-1zM16 21h1v1h-1zM17 21h1v1h-1zM18 21h1v1h-1zM20 21h1v1h-1zM21 21h1v1h-1zM22 21h1v1h-1zM24 21h1v1h-1zM25 21h1v1h-1zM26 21h1v1h-1zM31 21h1v1h-1zM32 21h1v1h-1zM0 22h1v1h-1zM1 22h1v1h-1zM3 22h1v1h-1zM6 22h1v1h-1zM8 22h1v1h-1zM11 22h1v1h-1zM13 22h1v1h-1zM14 22h1v1h-1zM15 22h1v1h-1zM19 22h1v1h-1zM24 22h1v1h-1zM25 22h1v1h-1zM26 22h1v1h-1zM27 22h1v1h-1zM28 22h1v1h-1zM29 22h1v1h-1zM30 22h1v1h-1zM32 22h1v1h-1zM1 23h1v1h-1zM3 23h1v1h-1zM7 23h1v1h-1zM9 23h1v1h-1zM10 23h1v1h-1zM12 23h1v1h-1zM13 23h1v1h-1zM16 23h1v1h-1zM18 23h1v1h-1zM19 23h1v1h-1zM21 23h1v1h-1zM22 23h1v1h-1zM24 23h1v1h-1zM27 23h1v1h-1zM32 23h1v1h-1zM0 24h1v1h-1zM2 24h1v1h-1zM3 24h1v1h-1zM6 24h1v1h-1zM7 24h1v1h-1zM8 24h1v1h-1zM11 24h1v1h-1zM12 24h1v1h-1zM13 24h1v1h-1zM15 24h1v1h-1zM16 24h1v1h-1zM17 24h1v1h-1zM20 24h1v1h-1zM21 24h1v1h-1zM24 24h1v1h-1zM25 24h1v1h-1zM26 24h1v1h-1zM27 24h1v1h-1zM28 24h1v1h-1zM31 24h1v1h-1zM32 24h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM11 25h1v1h-1zM12 25h1v1h-1zM16 25h1v1h-1zM19 25h1v1h-1zM20 25h1v1h-1zM21 25h1v1h-1zM22 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM29 25h1v1h-1zM31 25h1v1h-1zM32 25h1v1h-1zM0 26h1v1h-1zM1 26h1v1h-1zM2 26h1v1h-1zM3 26h1v1h-1zM4 26h1v1h-1zM5 26h1v1h-1zM6 26h1v1h-1zM10 26h1v1h-1zM13 26h1v1h-1zM14 26h1v1h-1zM21 26h1v1h-1zM22 26h1v1h-1zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM29 26h1v1h-1zM30 26h1v1h-1zM31 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM9 27h1v1h-1zM10 27h1v1h-1zM12 27h1v1h-1zM13 27h1v1h-1zM14 27h1v1h-1zM15 27h1v1h-1zM16 27h1v1h-1zM20 27h1v1h-1zM21 27h1v1h-1zM24 27h1v1h-1zM28 27h1v1h-1zM32 27h1v1h-1zM0 28h1v1h-1zM2 28h1v1h-1zM3 28h1v1h-1zM4 28h1v1h-1zM6 28h1v1h-1zM10 28h1v1h-1zM13 28h1v1h-1zM14 28h1v1h-1zM16 28h1v1h-1zM20 28h1v1h-1zM21 28h1v1h-1zM22 28h1v1h-1zM24 28h1v1h-1zM25 28h1v1h-1zM26 28h1v1h-1zM27 28h1v1h-1zM28 28h1v1h-1zM29 28h1v1h-1zM0 29h1v1h-1zM2 29h1v1h-1zM3 29h1v1h-1zM4 29h1v1h-1zM6 29h1v1h-1zM8 29h1v1h-1zM9 29h1v1h-1zM12 29h1v1h-1zM13 29h1v1h-1zM14 29h1v1h-1zM15 29h1v1h-1zM17 29h1v1h-1zM23 29h1v1h-1zM26 29h1v1h-1zM28 29h1v1h-1zM29 29h1v1h-1zM30 29h1v1h-1zM0 30h1v1h-1zM2 30h1v1h-1zM3 30h1v1h-1zM4 30h1v1h-1zM6 30h1v1h-1zM10 30h1v1h-1zM13 30h1v1h-1zM14 30h1v1h-1zM17 30h1v1h-1zM20 30h1v1h-1zM24 30h1v1h-1zM28 30h1v1h-1zM29 30h1v1h-1zM30 30h1v1h-1zM32 30h1v1h-1zM0 31h1v1h-1zM6 31h1v1h-1zM10 31h1v1h-1zM11 31h1v1h-1zM15 31h1v1h-1zM16 31h1v1h-1zM17 31h1v1h-1zM20 31h1v1h-1zM21 31h1v1h-1zM22 31h1v1h-1zM24 31h1v1h-1zM26 31h1v1h-1zM0 32h1v1h-1zM1 32h1v1h-1zM2 32h1v1h-1zM3 32h1v1h-1zM4 32h1v1h-1zM5 32h1v1h-1zM6 32h1v1h-1zM8 32h1v1h-1zM9 32h1v1h-1zM10 32h1v1h-1zM13 32h1v1h-1zM21 32h1v1h-1zM22 32h1v1h-1zM24 32h1v1h-1zM25 32h1v1h-1zM28 32h1v1h-1zM29 32h1v1h-1zM31 32h1v1h-1z"/></svg></div>
      <div class="qr-body"><p class="label">Order from your table</p><p>Scan with your phone camera to add Tacos de Carnitas to your table's order. No app needed.</p>
      <button type="button" class="btn btn-sm" data-add-order data-name="Tacos de Carnitas" data-price="17">Add to table order</button><p class="form-msg" role="status" aria-live="polite"></p></div>
    </div>
    <div class="dish-actions"><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a><a class="link-arr" href="/menu/#tacos">Back to Tacos <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
    <nav class="dish-pager" aria-label="More dishes"><a href="/menu/tacos-al-pastor/" rel="prev"><small>← Previous</small>Tacos al Pastor</a><a href="/menu/tacos-baja/" rel="next"><small>Next →</small>Tacos Baja</a></nav>
  </div>
</article>
<section class="green green--short" aria-labelledby="rel-title"><div class="wrap green-head"><h2 id="rel-title" class="mega mega--light mega--sm" data-split>You might also like</h2></div>
  <div class="polaroids polaroids--static"><div class="polaroids-track"><a class="polaroid" href="/menu/tacos-al-pastor/" style="--r:-3deg"><img src="../../assets/dish-al-pastor-lg.webp?v=4" srcset="../../assets/dish-al-pastor-sm.webp?v=4 600w, ../../assets/dish-al-pastor-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos al Pastor" loading="lazy" decoding="async"><span>Tacos al Pastor · $18</span></a><a class="polaroid" href="/menu/tacos-baja/" style="--r:2deg"><img src="../../assets/dish-baja-fish-lg.webp?v=4" srcset="../../assets/dish-baja-fish-sm.webp?v=4 600w, ../../assets/dish-baja-fish-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Tacos Baja" loading="lazy" decoding="async"><span>Tacos Baja · $19</span></a><a class="polaroid" href="/menu/guacamole-de-molcajete/" style="--r:-2deg"><img src="../../assets/dish-guacamole-lg.webp?v=4" srcset="../../assets/dish-guacamole-sm.webp?v=4 600w, ../../assets/dish-guacamole-lg.webp?v=4 1200w" sizes="300px" width="1200" height="1200" alt="Guacamole de Molcajete" loading="lazy" decoding="async"><span>Guacamole de Molcajete · $19</span></a></div></div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>

</body>
</html>
```

## `reservations/index.html`

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Reservations | Casa Nopal, NYC</title>
<meta name="description" content="Book a table at Casa Nopal in the West Village. Choose your party size, date and time, and get instant confirmation. Parties of 9 or more, see Event Catering.">
<link rel="canonical" href="https://casanopal.nyc/reservations/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5ecdd">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Casa Nopal">
<meta property="og:title" content="Reservations">
<meta property="og:description" content="Book a table at Casa Nopal in the West Village. Choose your party size, date and time, and get instant confirmation. Parties of 9 or more, see Event Catering.">
<meta property="og:url" content="https://casanopal.nyc/reservations/">
<meta property="og:image" content="../assets/private-dining-lg.webp">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Reservations">
<meta name="twitter:description" content="Book a table at Casa Nopal in the West Village. Choose your party size, date and time, and get instant confirmation. Parties of 9 or more, see Event Catering.">
<meta name="twitter:image" content="../assets/private-dining-lg.webp">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2214%22%20fill%3D%22%239b2c1f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f5ecdd%22%3ECN%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml">
<link rel="preload" href="../assets/fraunces-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/archivo-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=mvrxj556">
<script>document.documentElement.classList.add('js');try{if(false&&!sessionStorage.getItem('cn-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://casanopal.nyc/"},{"@type":"ListItem","position":2,"name":"Reservations","item":"https://casanopal.nyc/reservations/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Restaurant","@id":"https://casanopal.nyc/#restaurant","name":"Casa Nopal","description":"Mexican kitchen and mezcalería in New York's West Village. Heirloom-corn tortillas, Oaxacan mole, wood-grilled meats and over 80 mezcales.","url":"https://casanopal.nyc/","telephone":"(212) 555-0147","email":"hola@casanopal.nyc","image":"../assets/hero-dining-lg.webp","servesCuisine":["Mexican","Oaxacan"],"priceRange":"$$$","acceptsReservations":true,"hasMenu":"https://casanopal.nyc/menu/","address":{"@type":"PostalAddress","streetAddress":"214 Bleecker Street","addressLocality":"New York","addressRegion":"NY","postalCode":"10012","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":40.7303,"longitude":-74.0021},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"11:00","closes":"22:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Tuesday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Wednesday","opens":"17:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Thursday","opens":"17:00","closes":"23:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"17:00","closes":"23:59"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"11:00","closes":"23:59"}],"potentialAction":{"@type":"ReserveAction","target":{"@type":"EntryPoint","urlTemplate":"https://casanopal.nyc/reservations/","actionPlatform":["http://schema.org/DesktopWebPlatform","http://schema.org/MobileWebPlatform"]},"result":{"@type":"FoodEstablishmentReservation","name":"Table at Casa Nopal"}}}</script>
</head>
<body class="">
<a class="skip" href="#main">Skip to content</a>

<header class="pill" data-header>
  <a class="pill-book" href="/reservations/"><span class="pb-l">Book a table</span><span class="pb-s">Book</span></a>
  <a class="pill-logo" href="/" aria-label="Casa Nopal home"><span class="wordmark">Casa<i>✦</i>Nopal</span></a>
  <button class="pill-menu" type="button" aria-expanded="false" aria-controls="overlay"><span class="pill-menu-label">Menu</span><span class="burger"><i></i><i></i></span></button>
</header>
<div class="overlay" id="overlay" hidden>
  <div class="picado picado--overlay" data-picado aria-hidden="true"></div>
  <div class="overlay-inner">
    <nav class="overlay-nav" aria-label="Main"><a href="/" data-img="../assets/hero-dining-sm.webp?v=4" style="--i:0"><small>01</small><span>Home</span><em>Inicio</em></a><a href="/menu/" data-img="../assets/dish-al-pastor-sm.webp?v=4" style="--i:1"><small>02</small><span>Menu</span><em>La carta</em></a><a href="/reservations/" data-img="../assets/private-dining-sm.webp?v=4" aria-current="page" style="--i:2"><small>03</small><span>Reservations</span><em>Reservar</em></a><a href="/catering/" data-img="../assets/catering-spread-sm.webp?v=4" style="--i:3"><small>04</small><span>Event Catering</span><em>Eventos</em></a><a href="/blog/" data-img="../assets/blog-masa-sm.webp?v=4" style="--i:4"><small>05</small><span>Journal</span><em>Diario</em></a><a href="/about/" data-img="../assets/about-facade-sm.webp?v=4" style="--i:5"><small>06</small><span>About & Contact</span><em>Nosotros</em></a></nav>
    <div class="overlay-side">
      <div class="overlay-img"><img alt="" src="../assets/hero-dining-sm.webp?v=4" width="836" height="470"></div>
      <div class="overlay-info"><p>214 Bleecker Street<br>New York, NY 10012</p><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a></p><p class="open-status" data-open-status>Hours</p></div>
    </div>
  </div>
</div>
<main id="main">
<section class="phead">
  <div class="picado " data-picado aria-hidden="true"></div>
  <div class="wrap phead-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>✦</span><span aria-current="page">Reservations</span></nav>
    <p class="label" data-reveal>Reservaciones</p>
    <h1 class="mega" data-split><span class="dot" aria-hidden="true"></span>Book a table<span class="dot" aria-hidden="true"></span></h1>
    <span class="stamp phead-stamp" aria-hidden="true">¡Te esperamos!</span>
    
  </div>
</section>
<section class="book wrap">
  <aside class="book-side">
    <div class="book-photo" data-reveal><img src="../assets/private-dining-lg.webp?v=4" srcset="../assets/private-dining-sm.webp?v=4 750w, ../assets/private-dining-lg.webp?v=4 1500w" sizes="(max-width: 900px) 100vw, 38vw" width="1500" height="1000" alt="Long candlelit table in La Sala, the private dining room" loading="lazy" decoding="async"></div>
    <ul class="book-notes" data-reveal>
      <li><i>01</i><span><strong>Walk-ins welcome.</strong> The bar and half the room are kept for walk-ins every night.</span></li>
      <li><i>02</i><span><strong>We hold tables 15 minutes.</strong> Running late? Call <a href="tel:+12125550147">(212) 555-0147</a>.</span></li>
      <li><i>03</i><span><strong>Nine or more?</strong> See <a href="/catering/">Event Catering</a> and La Sala.</span></li>
    </ul>
  </aside>
  <div class="booking" data-booking aria-live="polite">
    <div class="ticket-edge" aria-hidden="true"></div>
    <ol class="booking-steps" aria-label="Booking progress"><li class="is-active">Table</li><li>Details</li><li>Confirmed</li></ol>
    <form class="booking-form" novalidate>
      <fieldset class="booking-pane" data-pane="1">
        <legend class="sr">Choose your table</legend>
        <div class="field"><span class="label" id="lbl-guests">Party size</span><div class="chips" role="radiogroup" aria-labelledby="lbl-guests" data-guests><button type="button" role="radio" aria-checked="false" data-value="1">1</button><button type="button" role="radio" aria-checked="true" data-value="2">2</button><button type="button" role="radio" aria-checked="false" data-value="3">3</button><button type="button" role="radio" aria-checked="false" data-value="4">4</button><button type="button" role="radio" aria-checked="false" data-value="5">5</button><button type="button" role="radio" aria-checked="false" data-value="6">6</button><button type="button" role="radio" aria-checked="false" data-value="7">7</button><button type="button" role="radio" aria-checked="false" data-value="8">8</button></div></div>
        <div class="field"><span class="label" id="lbl-date">Date</span><div class="date-strip" role="radiogroup" aria-labelledby="lbl-date" data-dates></div></div>
        <div class="field"><span class="label" id="lbl-time">Time <small data-slot-count></small></span><div class="slots" role="radiogroup" aria-labelledby="lbl-time" data-slots></div></div>
        <div class="field"><span class="label">Seating</span><div class="chips chips-wide" role="radiogroup" data-seating><button type="button" role="radio" aria-checked="true" data-value="Dining room">Dining room</button><button type="button" role="radio" aria-checked="false" data-value="Bar counter">Bar counter</button><button type="button" role="radio" aria-checked="false" data-value="Garden patio">Garden patio</button></div></div>
        <button type="button" class="btn btn-block" data-next disabled>Continue <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button>
      </fieldset>
      <fieldset class="booking-pane" data-pane="2" hidden>
        <legend class="sr">Your details</legend>
        <p class="booking-summary" data-summary></p>
        <div class="grid-2">
          <div class="field"><label for="b-name" class="label">Full name</label><input id="b-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="b-phone" class="label">Mobile</label><input id="b-phone" name="phone" type="tel" autocomplete="tel" required></div>
        </div>
        <div class="field"><label for="b-email" class="label">Email</label><input id="b-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="b-occasion" class="label">Occasion <small>optional</small></label><select id="b-occasion" name="occasion"><option value="">None</option><option>Birthday</option><option>Anniversary</option><option>Date night</option><option>Business</option><option>Celebration</option></select></div>
        <div class="field"><label for="b-notes" class="label">Notes for the kitchen <small>allergies, high chair, accessibility</small></label><textarea id="b-notes" name="notes" rows="3"></textarea></div>
        <label class="check"><input type="checkbox" name="sms" checked> Text me a reminder the day before</label>
        <div class="booking-nav"><button type="button" class="btn btn-ghost" data-back>Back</button><button type="submit" class="btn">Confirm booking <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button></div>
        <p class="form-msg" role="alert"></p>
      </fieldset>
      <div class="booking-pane booking-done" data-pane="3" hidden tabindex="-1">
        <span class="stamp done-stamp" aria-hidden="true">¡Confirmado!</span>
        <h2 class="done-title">Nos vemos pronto</h2>
        <p data-done-text></p>
        <dl class="done-list" data-done-list></dl>
        <div class="booking-nav"><a class="btn" href="#" data-ics download="casa-nopal-reservation.ics">Add to calendar</a><a class="btn btn-ghost" href="/menu/">Browse the menu</a></div>
        <button type="button" class="linklike" data-restart>Make another booking</button>
      </div>
    </form>
  </div>
</section>
</main>
<footer class="foot">
  <div class="ticker ticker--foot" aria-hidden="true"><div class="ticker-track"><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i><span>Tacos al pastor</span><i>✦</i><span>Mole negro</span><i>✦</i><span>Mezcalería</span><i>✦</i><span>Tortillas a mano</span><i>✦</i><span>La Sala</span><i>✦</i><span>Brunch</span><i>✦</i><span>Día de Muertos</span><i>✦</i><span>Aguachile</span><i>✦</i><span>Churros</span><i>✦</i><span>Catering</span><i>✦</i><span>Mezcal flight</span><i>✦</i><span>West Village</span><i>✦</i></div></div>
  <div class="foot-frame">
    <div class="foot-stamps" data-stamps aria-label="Click to stamp">
      <span class="foot-stamp" style="--x:18%;--y:38%;--r:-8deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp is-main" style="--x:50%;--y:52%;--r:3deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-stamp" style="--x:82%;--y:34%;--r:9deg"><span class="wordmark">Casa<i>✦</i>Nopal</span></span>
      <span class="foot-clic" aria-hidden="true">¡Clic!</span>
      <p class="foot-cta"><span>Come hungry. Stay for the mezcal.</span><a class="btn" href="/reservations/">Book a table <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></p>
    </div>
    <div class="foot-grid">
      <div><h3>Visit</h3><p>214 Bleecker Street<br>New York, NY 10012</p><a class="link-arr" href="https://maps.google.com/?q=214%20Bleecker%20Street%2C%20New%20York%2C%20NY%2010012" target="_blank" rel="noopener">Directions <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></a></div>
      <div><h3>Hours</h3><ul class="hours hours-compact"><li data-day="1"><span>Monday</span><span>5 pm to 11 pm</span></li><li data-day="2"><span>Tuesday</span><span>5 pm to 11 pm</span></li><li data-day="3"><span>Wednesday</span><span>5 pm to 11 pm</span></li><li data-day="4"><span>Thursday</span><span>5 pm to 11:30 pm</span></li><li data-day="5"><span>Friday</span><span>5 pm to Midnight</span></li><li data-day="6"><span>Saturday</span><span>11 am to Midnight<small>Brunch 11 to 3</small></span></li><li data-day="0"><span>Sunday</span><span>11 am to 10 pm<small>Brunch 11 to 3</small></span></li></ul></div>
      <div><h3>Contact</h3><p><a href="tel:+12125550147">(212) 555-0147</a><br><a href="mailto:hola@casanopal.nyc">hola@casanopal.nyc</a><br><a href="mailto:eventos@casanopal.nyc">eventos@casanopal.nyc</a></p></div>
      <div><h3>Letters from the kitchen</h3>
        <form class="newsletter" data-form="newsletter" novalidate><label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email" autocomplete="email" required><button type="submit" aria-label="Subscribe"><span class="arr" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></button><p class="form-msg" role="status" aria-live="polite"></p></form></div>
    </div>
    <nav class="foot-links" aria-label="Footer"><a href="/menu/">Menu</a><a href="/reservations/">Reservations</a><a href="/catering/">Event Catering</a><a href="/blog/">Journal</a><a href="/about/">About & Contact</a><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></nav>
    <div class="foot-legal"><span>© 2026 Casa Nopal. All rights reserved.</span><span><a href="/about/#contact">Accessibility</a><a href="/about/#contact">Privacy</a><button type="button" class="linklike" data-cookie-open>Cookie settings</button></span></div>
  </div>
</footer>
<div class="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden data-cookie>
  <p id="cookie-title" class="cookie-title">Una galletita?</p>
  <p>We use essential cookies to run this site, and optional ones to understand visits. You choose.</p>
  <div class="cookie-prefs" hidden data-cookie-prefs>
    <label class="switch"><input type="checkbox" checked disabled><span></span>Essential <small>Always on</small></label>
    <label class="switch"><input type="checkbox" name="analytics"><span></span>Analytics <small>Anonymous visit stats</small></label>
    <label class="switch"><input type="checkbox" name="marketing"><span></span>Marketing <small>Personalised offers</small></label>
  </div>
  <div class="cookie-actions">
    <button type="button" class="cookie-yes" data-cookie-accept>Accept</button>
    <button type="button" data-cookie-reject>Essential only</button>
    <button type="button" data-cookie-custom>Preferences</button>
    <button type="button" class="cookie-yes" data-cookie-save hidden>Save</button>
  </div>
</div>
<div class="cursor-preview" aria-hidden="true"><img alt=""></div>
<script src="/assets/js/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=mvrxj556" defer></script>
<script src="/assets/js/booking.js?v=mvrxj556" defer></script>
</body>
</html>
```

## `robots.txt`

```text
User-agent: *
Allow: /

Sitemap: https://casanopal.nyc/sitemap.xml

```

## `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://casanopal.nyc/</loc><lastmod>2026-10-28</lastmod><priority>1.0</priority></url>
  <url><loc>https://casanopal.nyc/menu/</loc><lastmod>2026-10-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://casanopal.nyc/menu/guacamole-de-molcajete/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/elote-asado/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/aguachile-verde/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/queso-fundido/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/tacos-al-pastor/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/tacos-de-carnitas/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/tacos-baja/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/mole-negro/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/carne-asada/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/pescado-zarandeado/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/churros-con-chocolate/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/flan-de-cajeta/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/margarita-de-la-casa/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/menu/mezcal-flight/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/reservations/</loc><lastmod>2026-10-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://casanopal.nyc/catering/</loc><lastmod>2026-10-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://casanopal.nyc/blog/</loc><lastmod>2026-10-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://casanopal.nyc/blog/beginners-guide-to-mezcal/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/blog/dia-de-muertos-ofrenda/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/blog/why-we-make-our-own-masa/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/blog/holiday-private-dining/</loc><lastmod>2026-10-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://casanopal.nyc/about/</loc><lastmod>2026-10-28</lastmod><priority>0.8</priority></url>
</urlset>

```
