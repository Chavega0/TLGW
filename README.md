# Stacktik — marketing site

Cinematic single-page marketing site for Stacktik: software selection,
implementation, and integration for growing businesses.

## Stack

- [Vite](https://vitejs.dev) + React 18 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) — scroll-driven reveals,
  word-by-word prose scrubbing, parallax hero
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- AI-generated hero video (Seedance via Higgsfield), served from
  `public/media/hero.mp4`

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # type-checks then bundles to dist/
```

## Visual design check

Screenshots the built site at desktop and phone widths across the full
scroll range into `shots/` (requires the Playwright Chromium binary):

```sh
npm run build
node scripts/design-check.mjs
```

## Brand

- Cream `#F3ECDC` · Terracotta `#C4552B` · Clay `#D97747` · Olive `#575E40` · Ink `#2B2723`
- Type: Sora (sans), Newsreader (serif accents)
- Logo: "stack + tick" mark — a checkmark over two stacked bars
