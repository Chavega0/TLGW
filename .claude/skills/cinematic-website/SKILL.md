---
name: cinematic-website
description: Build a cinematic, award-grade scroll-experience website for a real brand or product — Apple-product-page-style storytelling with a scroll-scrubbed hero film, an interactive 3D product act, typographic acts, and real catalog data. Use this skill whenever the user asks for a "shocking", "cinematic", "immersive", "awwwards-style", "3D", or "experience" website, a brand landing page or product story page, or wants their store, brand, or product "turned into something amazing" — even if they never say the word "cinematic". Also use it when a user complains an existing marketing page "looks terrible" or "basic" and wants it elevated.
---

# Cinematic brand website

Build a one-page, scroll-driven cinematic experience for a real brand: dark
typographic opening, a pinned scroll-scrubbed hero film, real-catalog retail
sections, an interactive 3D product act, and a finale. The result is a single
self-contained `index.html` that works from any host or even a local file.

Three rules make or break this kind of project. Everything else is technique.

## Rule 1 — Only real brand data. Never invent products.

Users notice fabricated products instantly and lose all trust ("you're making
up products"). Training data about small brands is stale or wrong. Before
designing anything, harvest the live source of truth:

- **Shopify stores**: `https://<store>/products.json` gives every product,
  price, variant, and image URL. `https://<store>/cdn/shop/files/<img>?width=N`
  serves resized images (usually with `Access-Control-Allow-Origin: *`, so a
  published page can hotlink them).
- Fetch the About page for the brand's own voice and taglines; reuse their
  actual copy and message lines rather than writing generic slogans.
- Pull brand colors from their product photography and logo, not from memory.
- Store data can itself be messy (mismatched titles, AI-rendered photos).
  Verify against `products.json` before "fixing" anything that looks wrong.

If your own environment blocks the brand's domain, fetch through whatever
remote executor you have (CI runner, generation-service sandbox) — the data is
non-negotiable.

## Rule 2 — Never claim visual work is done without looking at it.

LLM-authored pages routinely contain visual defects invisible in the code:
shader artifacts, elements hidden behind other elements, oversized 3D objects,
garbled generated textures. Set up a screenshot loop FIRST and check every
change against real renders before reporting it. The user will ask "don't you
have a way to see the UI?" — the answer must already be yes.

Read `references/visual-verification.md` and copy `assets/preview.yml` +
`assets/shot.mjs` into the repo before writing the page. Iterate:
push → CI renders desktop+mobile screenshots to a `shots` branch → fetch →
actually read the images → fix → repeat. Never ship a change you haven't seen.

## Rule 3 — One act, one idea.

Copy fails when a headline repeats words already visible elsewhere on screen,
uses half-facts (a latitude with no longitude), or stacks two ideas in one
beat. Write the acts as a story: problem → product → message → catalog →
craft/3D → close. Each pinned scene carries exactly one idea, and the brand's
own tagline is the payoff, not the opener.

## Workflow

1. **Harvest** the brand (Rule 1). Build a data table: products, prices,
   images, message lines, palette, logo, spec copy.
2. **Set up verification** (Rule 2): repo, preview workflow, shots branch,
   fetch script.
3. **Concept the acts** (Rule 3). Typical arc: dark typographic "problem"
   wall → pinned scroll-scrubbed film → shop-by-message chapters with real
   photography → light catalog grid (all products, live prices, links to
   real product pages) → silhouettes/specs → interactive 3D act → finale.
4. **Generate cinematic assets** in parallel with building: hero film from a
   real product photo, 3D model of the product. Read
   `references/assets-pipeline.md` before generating anything.
5. **Build** the page — stack and techniques in
   `references/page-techniques.md`, 3D act in `references/threejs-3d-act.md`.
6. **Verify** every act on desktop AND phone renders; fix; repeat until every
   act reads correctly at a glance.
7. **Deliver**: commit, push, PR. For a live URL prefer GitHub Pages
   (workflow needs the repo owner to set Pages Source = "GitHub Actions"
   once). Do not rely on raw.githack/statically/jsdelivr to serve repo HTML —
   they interstitial or serve text/plain. Always also hand the user the
   single HTML file; it works standalone because all assets are CDN-hosted.

## Pitfalls that cost real time (all happened; avoid re-learning them)

| Pitfall | What to do instead |
|---|---|
| Fabricated catalog from stale memory | Harvest live `products.json` first (Rule 1) |
| Photogrammetry/generated 3D smears embroidered or printed text into garbage | Edit source photos to a blank product first, rebuild the model, then project the REAL mark (cut from a product photo to transparent PNG) onto the mesh with `DecalGeometry` |
| A flat plane "logo" floats detached off a curved 3D surface | Never use a plane; project with `DecalGeometry` so the mark wraps the actual triangles |
| Guessing a 3D model's orientation/front | Probe it: raycast rings at several heights, read normals; models from photogrammetry often have front/back where you least expect |
| Headless Chromium can't decode H.264, film never plays in CI or some browsers | Encode a VP9-in-MP4 with explicit `codecs="vp09..."` source first, H.264 `avc1` second |
| Scroll-scrub stutters | Re-encode with dense keyframes (`-g 6 -keyint_min 6 -sc_threshold 0`), lerp `currentTime`, guard with `!video.seeking` |
| Loader/intro strands users when a CDN fails | Classic-script failsafe: error listener + timeout that force-hides the loader |
| 3D object scaled for desktop overflows phones | Phone FOV is the binding constraint; scale per `matchMedia`, verify the mobile render specifically |
| Giant background type hidden behind the 3D object | Compose: split lines above/below the object, or shrink the object; verify in renders |
| A CSS variable typo fails silently (`var(--accent)` vs `--sun`) | Grep `:root` for the real token names before using them |

## References

- `references/visual-verification.md` — the CI screenshot loop (read before building)
- `references/assets-pipeline.md` — generating the film and 3D model; remote-sandbox tricks
- `references/page-techniques.md` — stack, scroll-scrub film, acts, shaders, a11y
- `references/threejs-3d-act.md` — GLB normalization, orientation probing, decal branding, drag-spin
- `assets/preview.yml`, `assets/shot.mjs` — drop-in visual-verification CI
