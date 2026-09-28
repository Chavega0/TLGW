# weartheclouds — The Ascent

A one-page cinematic concept experience for [weartheclouds](https://www.weartheclouds.com),
the Dubai statement-cap brand. Everything on the page — products, prices, copy,
photography — comes from the live store.

## View it

- Live render of this branch: https://raw.githack.com/Chavega0/TLGW/claude/ecstatic-hamilton-lrrpz6/site/index.html
- Local: `npm run dev` (or `python3 -m http.server 8080 -d site`) then open http://localhost:8080

## Visual preview CI

Every push to `claude/**` runs `.github/workflows/preview.yml`, which renders the
page in headless Chromium at desktop + phone sizes across 25 scroll positions and
publishes the screenshots to the [`shots`](../../tree/shots) branch. Run the same
capture locally with `npm i playwright && npx playwright install chromium && npm run shots`
(serves `site/` itself; screenshots land in `out/`).
