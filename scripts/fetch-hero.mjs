// Vendors the generated hero video into public/media/ so the site
// doesn't depend on the Higgsfield CDN at runtime.
import { mkdir, writeFile } from "node:fs/promises";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_205801_55a5418e-fdab-4810-bb76-ad4c2ae5f747.mp4";

const res = await fetch(URL);
if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
await mkdir("public/media", { recursive: true });
await writeFile("public/media/hero.mp4", Buffer.from(await res.arrayBuffer()));
console.log("saved public/media/hero.mp4");
