// Vendors the generated hero video into public/media/ so the site
// doesn't depend on the Higgsfield CDN at runtime.
import { mkdir, writeFile } from "node:fs/promises";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_212446_8525749e-2a12-406e-ad39-a40186c09ca7.mp4";

const res = await fetch(URL);
if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
await mkdir("public/media", { recursive: true });
await writeFile("public/media/hero.mp4", Buffer.from(await res.arrayBuffer()));
console.log("saved public/media/hero.mp4");
