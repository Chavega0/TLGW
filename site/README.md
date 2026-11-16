# Stacktik website

The live site: the dark homepage, the details page, the booking page and the service landing pages, built as plain
static HTML with no dependencies.

```
node site/build.mjs     # writes site/dist
node site/check.mjs     # SEO checks on the build; fails on any broken rule
node site/lint-pages.mjs # copy rules and word limits for src/pages/*.json
node site/serve.mjs     # preview at http://localhost:4321 with production-style URLs
node site/og.mjs        # re-render share images and icons (needs Playwright; run when a headline changes)
```

## What is where

- `src/home.html`, `src/details.html`: the two designed pages. Edit copy and layout here.
- `src/pages/*.json`: one file per landing page (title, description, headline, sections, FAQ). The build renders
  them with the shared template in `build.mjs`.
- `src/search-map.json`: which page targets which search terms, with measured volume. Readable version in
  `docs/search-map.md`.
- `visuals.mjs`: the visual layer of the landing pages. An animated product scene in each hero (pipeline, call,
  AI receptionist, AI agent, connections, migration or audit, chosen per page in `SCENES`), the moving band of
  vendor tiles under the hero (`TILES`, picked by topic in `TOPICS`), the logo tiles in the platforms section, and
  an illustration on each step and service card. All HTML, CSS and inline SVG: no image files, and reduced motion
  shows each scene finished. Vendor marks come from the homepage source; a vendor without a mark there is shown
  as its name.
- `src/illos.json`: the small looping illustrations, taken from the homepage and details page.
- `public/`: the film, share images (`og/`), icons. Copied to the build as is.
- `../vercel.json`: hosting rules (clean URLs, HTTPS header, caching, redirects, no indexing on the vercel.app
  address so only stacktik.com is indexed).

## What the build adds to every page

Title, meta description, canonical URL, Open Graph and X card tags, structured data (Organization, WebSite, WebPage,
BreadcrumbList, Service, FAQPage, VideoObject), footer links to every service page, plus `sitemap.xml`, `robots.txt`
(open to search engines and AI assistants) and `llms.txt`.

## Rules for copy

Keep it short: `lint-pages.mjs` holds each field to a word limit. RevOps is the specialty, and Stacktik serves
Canada and the United States. No invented numbers, results, prices or timelines. No discount language. The technology
distributor is never named. No claims of certified or official partner status. `check.mjs` enforces the mechanical
ones (one H1 per page, unique titles and descriptions, working links, valid structured data).

## Adding a landing page

1. Add the terms to `src/search-map.json` so no two pages target the same search.
2. Add `src/pages/<slug>.json` in the same shape as the others, and a name for it in `NAV_NAME` in `build.mjs`.
3. Run `og.mjs`, `build.mjs` and `check.mjs`.
