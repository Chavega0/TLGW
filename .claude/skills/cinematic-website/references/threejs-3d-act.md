# The interactive 3D product act

A pinned act: the reconstructed product floating over a WebGL night sky,
drag-to-spin, giant brand type composed around it, real branding ON the mesh.

## Load and normalize the GLB

```js
new GLTFLoader().load(GLB_URL, g => {
  const obj = g.scene;
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  obj.position.sub(box.getCenter(new THREE.Vector3()));   // center at origin
  const wrap = new THREE.Group(); wrap.add(obj);
  wrap.scale.setScalar((isMobile ? 2.2 : 3.9) / Math.max(size.x, size.y, size.z));
  holder.add(wrap);   // holder.rotation.y = spin
});
```

Phone scale is NOT desktop scale minus a bit — the narrow horizontal FOV is
the binding constraint. Pick per `matchMedia("(max-width:760px)")` and verify
the mobile render.

## Never trust the model's orientation — probe it

Photogrammetry models have arbitrary axes, and heuristics (e.g. "the brim's
low vertices point forward") can be confidently wrong by 180°. Before placing
anything on the surface, probe numerically (in a headless renderer or a page
console):

- Raycast rings: cast inward from 12 azimuths at 2–3 heights; the hit radii
  map the silhouette (long protrusion = brim/handle, tight radius = body).
- Cast from each candidate "front" at several heights and read the hit
  normals: a near-vertical face (|N.y| small) is a panel; N.y ≈ 0.8 is a
  sloping dome; interior walls show up as hits with inward normals — a
  first-hit is not necessarily the outer surface.
- Verify with a rendered pixel-count probe if available: rotate the model,
  count decal pixels per angle, confirm the mark is visible at the resting
  rotation. Set the resting spin so the branded face greets the viewer.

## Branding on the mesh: DecalGeometry, never a plane

A textured plane floats and detaches from a curved surface at most angles.
Project instead:

```js
import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";
// hit = raycast onto the branded face; N = world-space face normal (flip if N·ray > 0)
const aim = new THREE.Object3D();
aim.position.copy(hit.point);
aim.lookAt(hit.point.clone().add(N));       // lookAt keeps text upright & unmirrored
const decal = new THREE.Mesh(
  new DecalGeometry(hit.object, hit.point, aim.rotation,
    new THREE.Vector3(w, w * imgH / imgW, depth)),   // depth ~ w for curvature
  new THREE.MeshBasicMaterial({ map: markTexture, transparent: true,
    depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }));
wrap.add(decal);
```

- The mark texture is the REAL logo/print cut from a product photo
  (see assets-pipeline.md), loaded with `crossOrigin = "anonymous"`.
- Do NOT use `quaternion.setFromUnitVectors(+Z, N)` for orientation — its
  arbitrary roll flips or mirrors the text. `Object3D.lookAt` builds the
  basis against world-up.
- Do all this before adding `wrap` to the scene, with
  `obj.updateMatrixWorld(true)` called first, so decal geometry lands in the
  wrap's local space and spins with the product.

## Interaction

- Drag-to-spin: pointer capture on the canvas, `touch-action: pan-y` so
  vertical scroll still works on phones; handle `pointercancel` /
  `lostpointercapture` or a scroll mid-drag wedges the rotation.
- Idle auto-spin (tiny velocity, lerped back after drag); gentle float on Y;
  camera sways with mouse.
- Compose the giant background type around the product (one line above, one
  below) rather than centered behind it, or the model hides the words.
