# Generating the cinematic assets

Two hero assets carry the "shocking" factor: a product film for the pinned
scrub act, and a 3D model of the product. Generate both from the brand's REAL
product photos (never from a text prompt alone — it will drift off-product).

## Hero film (for the scroll-scrub act)

1. Pick the flagship product's cleanest studio photo from the harvested data.
2. Image-to-video generation (e.g. Higgsfield `generate_video`): a single
   continuous ~6s take. Brief it cinematically: the product lifting out of the
   studio shot into the brand's world (clouds, streets, whatever fits), god
   rays, no cuts, no camera shake, no text.
3. Re-encode for scrubbing — a normal encode stutters when driven by
   `video.currentTime`:

```bash
# scrub master: keyframe every 6 frames, no scene-cut keyframes
ffmpeg -i in.mp4 -c:v libx264 -profile:v high -crf 20 \
  -g 6 -keyint_min 6 -sc_threshold 0 -pix_fmt yuv420p -an h264.mp4
# VP9-in-MP4 for Chromium builds without H.264 (also headless CI)
ffmpeg -i in.mp4 -c:v libvpx-vp9 -b:v 4M -g 6 -an vp9.mp4
```

4. Also export a poster JPEG (first frame).

## 3D product model

- `generate_3d` / multi-image-to-3D from the product's front + side + back
  photos gives a usable mesh — but **any printed/embroidered text will come
  out smeared and illegible, at any view count**. Do not fight this.
- The fix: image-edit the source photos to remove the text/logo first (a
  "blank" product), reconstruct from those, then apply the real mark in the
  page as a decal (see `threejs-3d-act.md`). Extract the mark from the
  product photo: crop the dark-stitch/print region, set alpha from darkness
  (`alpha = clamp((185 - luminance) * 2.4)`), trim to the dense bounding box.
  This yields the genuine mark with real thread/print texture.

## Hosting generated assets

Serve film/GLB/decal from the generation service's CDN (verify it sends
`Access-Control-Allow-Origin: *` — required for WebGL textures and canvas).
Upload flow when needed: request a presigned URL, `curl -X PUT` the bytes
from wherever they already are, confirm, then HEAD-check the CDN object.

## When your own egress is blocked

Common in cloud agent containers: the brand's domain or the generation CDN is
unreachable locally. Do all fetching/encoding/extraction inside a remote
executor with open internet (generation-service sandbox, CI runner). Sandbox
gotchas that repeat:

- Ephemeral filesystem — chain a full pipeline into ONE command; verify
  uploads afterward with a HEAD request, not by trusting the PUT.
- stdout truncation corrupts base64 relays — never move binaries through the
  conversation; move them CDN-to-CDN or repo-to-repo.
- ESM `node` ignores `NODE_PATH` — symlink the global modules:
  `ln -sfn /usr/local/lib/node_modules node_modules`.
- To "see" an image you can't view, print an ASCII downsample of its alpha or
  luminance grid — enough to verify a crop or mask before committing to it.
