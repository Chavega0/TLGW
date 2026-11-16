// Renders the social share images and icons into site/public (needs Playwright and network access to Google Fonts):
// `node site/og.mjs`. Run it when a page headline changes; the PNGs are committed.
import { createRequire } from "node:module";
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire("/opt/node-tools/node_modules/");
const { chromium } = require("playwright");
const ROOT = dirname(fileURLToPath(import.meta.url));
const PUB = join(ROOT, "public");
mkdirSync(join(PUB, "og"), { recursive: true });
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const cards = [
  { slug: "home", eyebrow: "RevOps consulting for sales and customer-facing teams", head: "We set up the software and technology that grow your revenue." },
  { slug: "details", eyebrow: "Details", head: "The platforms, the scope, and how buying works." },
  { slug: "blueprint", eyebrow: "Book a call", head: "A free call about what you use today." },
  { slug: "services", eyebrow: "Services", head: "RevOps services and integrations." },
  ...(existsSync(join(ROOT, "src", "pages")) ? readdirSync(join(ROOT, "src", "pages")) : []).filter((f) => f.endsWith(".json")).map((f) => { const p = JSON.parse(readFileSync(join(ROOT, "src", "pages", f), "utf8")); return { slug: p.slug, eyebrow: p.eyebrow, head: p.h1 }; }),
];
const mark = (stroke, w) => `<svg viewBox="0 0 100 100" width="${w}" height="${w}"><path d="M22 32 L43 46 L80 13" fill="none" stroke="${stroke}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><rect x="16" y="56" width="68" height="14" rx="7" fill="${stroke}"/><rect x="16" y="78" width="68" height="14" rx="7" fill="${stroke}"/></svg>`;
const fonts = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap">`;
const card = (c) => `<!doctype html><meta charset="utf-8">${fonts}<style>
html,body{margin:0}body{width:1200px;height:630px;background:#131110;color:#F3ECDC;font-family:Sora,sans-serif;position:relative;overflow:hidden}
.glow{position:absolute;right:-220px;top:-260px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,71,.34),rgba(217,119,71,.10) 45%,transparent 70%)}
.frame{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.logo{display:flex;align-items:center;gap:14px;font-weight:600;font-size:34px;letter-spacing:-.02em}.logo b{font-weight:600;color:#D97747}
.eyebrow{font-size:17px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:rgba(243,236,220,.62);margin-bottom:22px}
h1{font-family:Newsreader,serif;font-weight:500;font-variation-settings:"opsz" 72;letter-spacing:-.02em;line-height:1.06;margin:0;max-width:980px;text-wrap:balance}
.foot{display:flex;justify-content:space-between;align-items:center;font-size:19px;color:rgba(243,236,220,.62);border-top:1px solid rgba(243,236,220,.16);padding-top:22px}.foot b{color:#F3ECDC;font-weight:600}
</style><div class="glow"></div><div class="frame"><div class="logo">${mark("#C4552B", 44)}<span>stack<b>tik</b></span></div><div><div class="eyebrow">${esc(c.eyebrow)}</div><h1 id="h">${esc(c.head)}</h1></div><div class="foot"><span>RevOps consultancy · Woodbridge, Ontario · Serving Canada and the US</span><b>stacktik.com</b></div></div>
<script>var h=document.getElementById('h'),s=86;h.style.fontSize=s+'px';while(h.getBoundingClientRect().height>290&&s>44){s-=2;h.style.fontSize=s+'px';}</script>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const c of cards) {
  await page.setContent(card(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(PUB, "og", c.slug + ".png") });
  console.log("og/" + c.slug + ".png");
}
const icon = (size, file) => page.setViewportSize({ width: size, height: size }).then(() => page.setContent(`<!doctype html><style>html,body{margin:0}</style><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}"><rect width="100" height="100" fill="#C4552B"/><path d="M28 38 L43 48 L72 24" fill="none" stroke="#F6EFE0" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><rect x="24" y="56" width="52" height="11" rx="5.5" fill="#F6EFE0"/><rect x="24" y="74" width="52" height="11" rx="5.5" fill="#F6EFE0"/></svg>`)).then(() => page.screenshot({ path: join(PUB, file) }));
await icon(180, "apple-touch-icon.png");
await icon(512, "og/logo.png");
await browser.close();
console.log("icons written");
