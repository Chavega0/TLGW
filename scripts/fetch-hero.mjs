// Vendors the generated hero video into public/media/ so the site
// doesn't depend on the Higgsfield CDN at runtime.
import { mkdir, writeFile } from "node:fs/promises";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_203620_b407f171-b8f9-493e-9ad0-e98e870c3c04.mp4";

const res = await fetch(URL);
if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
await mkdir("public/media", { recursive: true });
await writeFile("public/media/hero.mp4", Buffer.from(await res.arrayBuffer()));
console.log("saved public/media/hero.mp4");
