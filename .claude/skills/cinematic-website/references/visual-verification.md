# Visual verification loop

The core discipline: every visual change is verified against real rendered
screenshots before it is reported as done. This is what turns "why is it
terrible" feedback loops into convergence.

## Setup (do this before writing the page)

1. Copy `assets/preview.yml` to `.github/workflows/preview.yml` and
   `assets/shot.mjs` to `.github/preview/shot.mjs` in the repo.
2. The workflow triggers on push to your working branch (`claude/**` by
   default — adjust the branch glob). `workflow_dispatch` does NOT register
   for workflows that only exist off the default branch, so push-trigger is
   the reliable mechanism.
3. Each run renders the page in headless Chromium at ~16 desktop and ~9
   mobile scroll positions and force-pushes JPEGs plus a `meta.txt` (page
   errors, HTTP>=400s) to an orphan `shots` branch.

## Fetching shots locally at zero token cost

```bash
git fetch -q origin shots
rm -rf /tmp/shots && mkdir -p /tmp/shots
GIT_INDEX_FILE=/tmp/shots.index git --work-tree=/tmp/shots checkout -q origin/shots -- .
rm -f /tmp/shots.index
```

The `GIT_INDEX_FILE` isolation matters: a plain checkout pollutes the main
index and later looks like uncommitted changes.

Then READ the images (multimodal read of the .jpg files). Look at the acts
the change touched, on desktop AND mobile. Check `meta.txt` for page errors.

## Iteration protocol

- Confirm which commit the shots came from (`git log -1 origin/shots` — the
  workflow writes the SHA into the commit message). Shots from a previous
  commit tell you nothing about your fix.
- Watch for the shots branch to advance with a background until-loop keyed to
  the expected SHA, not a sleep.
- One validated push beats three speculative ones — but for placement of
  things on 3D surfaces, numeric probes (see threejs-3d-act.md) converge
  faster than screenshot roundtrips; use screenshots as the final gate.

## Local variant

`node .github/preview/shot.mjs` runs the same capture locally when a browser
is available (`BASE_URL` env skips spawning the built-in static server).
