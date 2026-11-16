// SEO checks on the built site: `node site/check.mjs`. Exits non-zero when a check fails.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "dist");
const ORIGIN = "https://stacktik.com";
const fails = [], warns = [];
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(OUT);
const pages = files.filter((f) => f.endsWith(".html")).map((f) => ({ file: f, path: "/" + f.slice(OUT.length + 1).replace(/index\.html$/, "").replace(/\\/g, "/"), html: readFileSync(f, "utf8") }));
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim();
const one = (h, re) => (h.match(re) || [])[1];
const ids = Object.fromEntries(pages.map((p) => [p.path, new Set([...p.html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const titles = new Map(), descs = new Map();
for (const p of pages) {
  const F = (m) => fails.push(`${p.path}: ${m}`), W = (m) => warns.push(`${p.path}: ${m}`);
  const title = one(p.html, /<title>([^<]*)<\/title>/), desc = one(p.html, /<meta name="description" content="([^"]*)"/);
  if (!title) F("no title"); else { if (title.length > 60) W(`title is ${title.length} characters`); if (titles.has(title)) F("duplicate title with " + titles.get(title)); titles.set(title, p.path); }
  if (!desc) F("no meta description"); else { if (desc.length < 110 || desc.length > 160) W(`meta description is ${desc.length} characters`); if (descs.has(desc)) F("duplicate description with " + descs.get(desc)); descs.set(desc, p.path); }
  const h1 = (p.html.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) F(`${h1} h1 elements`);
  if (!/<html lang="en">/.test(p.html)) F("html lang missing");
  if (!/<meta name="viewport"/.test(p.html)) F("viewport missing");
  if (one(p.html, /<link rel="canonical" href="([^"]*)"/) !== ORIGIN + p.path) F("canonical is not " + ORIGIN + p.path);
  for (const k of ["og:title", "og:description", "og:url", "og:image", "og:type", "og:site_name"]) if (!new RegExp(`<meta property="${k}" content="[^"]+"`).test(p.html)) F("missing " + k);
  if (!/<meta name="twitter:card" content="summary_large_image">/.test(p.html)) F("missing twitter card");
  const og = one(p.html, /<meta property="og:image" content="([^"]*)"/); if (og && !existsSync(join(OUT, og.replace(ORIGIN, "")))) F("og image file missing: " + og);
  for (const icon of ["/favicon.svg", "/apple-touch-icon.png"]) if (!existsSync(join(OUT, icon))) F("missing " + icon);
  const ld = [...p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch (e) { F("JSON-LD does not parse"); return null; } }).filter(Boolean);
  const types = ld.flatMap((d) => (d["@graph"] || [d]).flatMap((n) => [].concat(n["@type"])));
  for (const t of ["Organization", "WebSite", "WebPage"]) if (!types.includes(t)) F("structured data has no " + t);
  const faqCount = (p.html.match(/<details class="q">/g) || []).length;
  const faqLd = ld.flatMap((d) => d["@graph"] || [d]).find((n) => n["@type"] === "FAQPage");
  if (faqCount && (!faqLd || faqLd.mainEntity.length !== faqCount)) F(`FAQ schema has ${faqLd ? faqLd.mainEntity.length : 0} questions, page shows ${faqCount}`);
  if (p.path !== "/" && !types.includes("BreadcrumbList")) F("no breadcrumb schema");
  const levels = [...p.html.replace(/<svg[\s\S]*?<\/svg>/g, "").matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  levels.reduce((prev, l) => { if (l > prev + 1) W(`heading level jumps from h${prev} to h${l}`); return l; }, 0);
  for (const m of p.html.matchAll(/<(a|link)\b[^>]*?\shref="([^"]+)"[^>]*>/g)) {
    const href = m[2];
    if (m[1] === "link" && /rel="(canonical|preconnect)"/.test(m[0])) continue;
    if (/^(https?:|mailto:|tel:)/.test(href)) { if (/stacktik\.com\/blueprint|localhost/.test(href)) F("absolute link left: " + href); continue; }
    if (/\.html($|#)/.test(href)) F("link to .html file: " + href);
    const [path, hash] = href.split("#"); const target = path === "" ? p.path : path;
    if (!target.startsWith("/")) { F("relative link: " + href); continue; }
    if (/\.(css|svg|png|jpg|xml|txt|js|mp4)$/.test(target)) { if (!existsSync(join(OUT, target))) F("missing file " + target); continue; }
    if (!ids[target]) { F("link to missing page " + href); continue; }
    if (hash && !ids[target].has(hash)) F("link to missing anchor " + href);
  }
  for (const m of p.html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) F("img without alt");
  for (const m of p.html.matchAll(/<(?:video|source)\b[^>]*\ssrc="([^"]+)"/g)) if (!existsSync(join(OUT, m[1]))) F("missing media " + m[1]);
  const words = text(p.html).split(" ").length; if (words < 250) W(`only ${words} words`);
  p.words = words; p.title = title; p.desc = desc;
}
for (const f of files.filter((f) => /\.(html|txt|xml|css|js)$/.test(f))) if (/telarus/i.test(readFileSync(f, "utf8"))) fails.push(f.slice(OUT.length) + ": names the distributor");
const sm = existsSync(join(OUT, "sitemap.xml")) ? [...readFileSync(join(OUT, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : [];
const want = pages.map((p) => ORIGIN + p.path).sort();
if (JSON.stringify(sm.slice().sort()) !== JSON.stringify(want)) fails.push("sitemap does not match the built pages");
const robots = existsSync(join(OUT, "robots.txt")) ? readFileSync(join(OUT, "robots.txt"), "utf8") : "";
if (!/Sitemap: https:\/\/stacktik\.com\/sitemap\.xml/.test(robots)) fails.push("robots.txt has no sitemap line");
if (/Disallow: \/\s*$/m.test(robots)) fails.push("robots.txt blocks the site");
if (!existsSync(join(OUT, "llms.txt"))) fails.push("llms.txt missing");
for (const p of pages) console.log(`${p.path.padEnd(30)} ${String(p.words).padStart(5)} words | title ${String((p.title || "").length).padStart(2)} | description ${String((p.desc || "").length).padStart(3)}`);
console.log(`\n${pages.length} pages, ${sm.length} sitemap URLs`);
if (warns.length) console.log("\nWARNINGS\n" + warns.map((w) => "  " + w).join("\n"));
if (fails.length) { console.log("\nFAILED\n" + fails.map((w) => "  " + w).join("\n")); process.exit(1); }
console.log("\nAll checks passed.");
