// Vendors the generated hero video into public/media/ so the site
// doesn't depend on the Higgsfield CDN at runtime.
import { mkdir, writeFile } from "node:fs/promises";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_195348_ab23c3e8-aa68-4ec6-8f1e-41c1b6e1e271.mp4";

const res = await fetch(URL);
if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
await mkdir("public/media", { recursive: true });
await writeFile("public/media/hero.mp4", Buffer.from(await res.arrayBuffer()));
console.log("saved public/media/hero.mp4");
