# Page stack and techniques

## Stack (single self-contained index.html)

- GSAP + ScrollTrigger (cdnjs) for choreography; Lenis (jsdelivr) for smooth
  scroll; three.js via importmap (jsdelivr) for the 3D act.
- Two display-grade Google Fonts max (e.g. a tight grotesk + a mono for
  eyebrows/specs). One brand accent color, used sparingly; define every color
  as a `:root` token and grep the real token names before using them.
- All media hotlinked from CDNs → the file works standalone, from any host,
  from a double-click.

## The scroll-scrubbed film act (the centerpiece)

- Pinned section ~500vh: `position: sticky` inner viewport, section height
  provides the scrub runway.
- Drive `video.currentTime = progress * duration` from the scroll progress,
  lerped for smoothness; skip writes while `video.seeking` and when the delta
  is under one frame (~0.033s).
- Dual sources with explicit codec hints — order matters:

```html
<video muted playsinline preload="auto">
  <source src="vp9.mp4"  type='video/mp4; codecs="vp09.00.41.08"'>
  <source src="h264.mp4" type='video/mp4; codecs="avc1.640028"'>
</video>
```

- Gate the act on `loadeddata`/`readyState >= 2` with a ~4s timeout fallback;
  show the poster until ready. Overlay 3–4 copy beats (`data-a`/`data-b`
  progress ranges), a progress bar, a timecode — each beat one idea.

## Other acts

- **Typographic wall**: marquee rows of anxiety/context words (duplicate row
  content for a seamless wrap), center statement over a radial scrim,
  scatter/blur out on scroll. Avoid `text-shadow` on huge type (banding
  boxes) — use `filter: drop-shadow` or nothing.
- **Shop by message**: full-screen chapters, clip-path wipes, the brand's real
  model photography, product chips with live prices, CTAs to real product
  URLs.
- **Catalog**: light section, every product from the harvest, sticky filters,
  product-shot → model-shot hover swap.
- **Finale**: dark, brand words, marquee footer.

## Robustness (all bit us once)

- Boot failsafe as a classic (non-module) script: window `error` listener +
  7s timeout that hides the loader — a CDN failure must never strand the
  user behind an intro.
- Nav needs a solid/scrim state over light sections (measure the light zone,
  toggle a class from a ticker).
- `prefers-reduced-motion`: kill marquees/lightning/auto-spin, show film copy
  statically.
- Custom WebGL background shaders: hash on UV * resolution, not
  `gl_FragCoord`, or you get grid artifacts at some sizes.
- Mobile: real menu sheet under ~900px, 16px gutters, verify every act in the
  phone renders — desktop-only verification WILL hide mobile disasters.
