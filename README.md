# Stamina11 — immersive scroll site

A cinematic, scroll-driven rebuild of stamina11.com (boutique youth sports academy, Dubai
Studio City), built on the scroll-craft engine with Emil Kowalski's design-engineering floor.

## Run it

    cd site
    node lab/serve.mjs --root . --port 4500
    # open http://localhost:4500/index.html

## Pages

- `index.html` — the immersive scroll experience (7 acts, scroll-drawn ribbon signature move)
- `programs.html` — full program catalog (8 programs, museum-label schema)
- `admissions.html` — how joining works + booking channels
- `about.html` — the academy, method and careers
- `contact.html` — location, phone, email, app and social links

## Verify (screenshot harness)

    cd site && npm i playwright-core
    node lab/shoot.mjs --url http://localhost:4500/index.html --out lab/shots
    node lab/shoot.mjs --url http://localhost:4500/index.html --out lab/mobile --width 390 --height 844
    node lab/shoot.mjs --url http://localhost:4500/index.html --out lab/reduced --reduced-motion

Design brief and creative decisions: `site/BRIEF.md`. Build registry: `scrollcraft/FINGERPRINTS.md`.
Imagery was generated with Higgsfield (one shared cinematic style preamble) and fetched/optimized
to WebP by `.github/workflows/fetch-assets.yml`.
