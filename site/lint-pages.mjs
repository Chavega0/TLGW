// Copy rules for landing pages: `node site/lint-pages.mjs [dir]`. Hard failures exit non-zero; "review" lines need a human look.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const dir = process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), "src", "pages");
const HYPE = /\b(seamless(ly)?|robust|cutting-edge|unlock|leverage[sd]?|game-chang\w+|world-class|best-in-class|powerful|effortless(ly)?|revolutionary|supercharge|skyrocket|turbocharge|next-level|state-of-the-art)\b/i;
const DEAL = /\b(discount(s|ed)?|cheap(er|est)?|save (money|up)|savings|lowest|free trial|deal(s)? on|bargain|% off)\b/i;
const STATUS = /\b(certified|certification|award(-winning|s)?|official partner|gold partner|platinum|diamond|elite partner|authorized|accredited|#1|number one|leading provider|top-rated)\b/i;
const TIME = /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|few|couple of)\s+(business\s+)?(minute|hour|day|week|month|year)s?\b|\bwithin (a|one|two|\d+) (day|week|month)s?\b|\bovernight\b/i;
const OKNUM = /\b(8x8|Five9|4G|5G|365|11:11|G12|B2B|24\/7)\b/g;
let hard = 0;
for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const p = JSON.parse(readFileSync(join(dir, f), "utf8"));
  const H = [], R = [];
  const texts = [];
  const add = (where, t) => { if (typeof t === "string") texts.push([where, t]); };
  for (const k of ["title", "metaDescription", "eyebrow", "h1", "lede", "closeH2", "closeLede"]) add(k, p[k]);
  (p.summary || []).forEach((s, i) => add(`summary[${i}]`, s.text));
  (p.blocks || []).forEach((b, i) => { add(`block ${b.id} eyebrow`, b.eyebrow); add(`block ${b.id} h2`, b.h2); add(`block ${b.id} intro`, b.intro); (b.items || []).forEach((it, j) => { add(`block ${b.id} item ${j + 1} title`, it.title); add(`block ${b.id} item ${j + 1}`, it.body); }); });
  add("platforms h2", p.platforms?.h2); add("platforms intro", p.platforms?.intro);
  (p.faq || []).forEach((q, i) => { add(`faq ${i + 1} q`, q.q); add(`faq ${i + 1} a`, q.a); });
  const words = (t) => t.trim().split(/\s+/).length;
  if (!p.slug || f !== p.slug + ".json") H.push("slug does not match file name");
  if (!p.title || p.title.length > 60 || !p.title.endsWith(" | Stacktik")) H.push(`title ${p.title?.length} chars or wrong ending`);
  if (!p.metaDescription || p.metaDescription.length < 110 || p.metaDescription.length > 160) H.push(`metaDescription ${p.metaDescription?.length} chars`);
  if (!p.eyebrow || p.eyebrow.length > 40) H.push("eyebrow too long");
  if (!p.h1 || p.h1.length > 75) H.push(`h1 ${p.h1?.length} chars`);
  // Word budgets. The pages were cut by about half after the owner found them too wordy; these keep them that way.
  const budget = (where, t, max) => { if (words(t || "") > max) H.push(`${where}: ${words(t || "")} words, limit ${max}`); };
  if (words(p.lede || "") < 15) H.push(`lede ${words(p.lede || "")} words`);
  budget("lede", p.lede, 40);
  (p.summary || []).forEach((s, i) => budget(`summary ${i + 1}`, s.text, 27));
  (p.blocks || []).forEach((b) => { budget(`${b.id} intro`, b.intro, 24); b.items.forEach((it, i) => budget(`${b.id} item ${i + 1}`, it.body, 27)); });
  budget("platforms intro", p.platforms?.intro, 24);
  (p.faq || []).forEach((q, i) => budget(`faq ${i + 1}`, q.a, 55));
  budget("closeLede", p.closeLede, 24);
  const labels = (p.summary || []).map((s) => s.label).join("|");
  if (labels !== "What it is|Who it is for|What you get|How it is priced") H.push("summary labels: " + labels);
  if ((p.blocks || []).length < 3 || (p.blocks || []).length > 4) H.push(`${(p.blocks || []).length} blocks`);
  if ((p.blocks || []).filter((b) => b.type === "steps").length !== 1) H.push("needs exactly one steps block");
  const ids = new Set(); for (const b of p.blocks || []) { if (!/^[a-z][a-z0-9-]*$/.test(b.id) || ids.has(b.id) || ["faq", "platforms", "related", "in-short", "top", "nav"].includes(b.id)) H.push("bad block id " + b.id); ids.add(b.id); if (b.h2.length > 75) H.push(`h2 too long: ${b.h2}`); if (b.eyebrow.length > 40) H.push("block eyebrow too long: " + b.eyebrow); if (b.items.length < 3 || b.items.length > 7) H.push(`block ${b.id} has ${b.items.length} items`); for (const it of b.items) if (it.title.length > 50) H.push("item title too long: " + it.title); }
  if ((p.faq || []).length !== 6) H.push(`${(p.faq || []).length} FAQ items`);
  if (!p.platforms?.names?.length) H.push("no platform names");
  for (const [where, t] of texts) {
    if (/telarus/i.test(t)) H.push(`${where}: names the distributor`);
    if (/!/.test(t)) H.push(`${where}: exclamation mark`);
    if (/—|–/.test(t)) H.push(`${where}: dash character`);
    if (/<[a-z/]|\[[^\]]+\]\(/i.test(t)) H.push(`${where}: markup`);
    for (const [re, label] of [[HYPE, "hype word"], [DEAL, "deal language"], [STATUS, "status claim"], [TIME, "duration"]]) { const m = t.match(re); if (m) R.push(`${where}: ${label} "${m[0]}" in: ${t.slice(Math.max(0, m.index - 60), m.index + 70)}`); }
    const d = t.replace(OKNUM, "").match(/[$€£]\s?\d|\d+\s?%|\b\d{2,}\b/); if (d) R.push(`${where}: number "${d[0]}" in: ${t.slice(Math.max(0, d.index - 50), d.index + 60)}`);
  }
  const total = texts.reduce((a, [, t]) => a + words(t), 0);
  console.log(`${p.slug.padEnd(34)} ${String(total).padStart(5)} words | title ${p.title.length} | desc ${p.metaDescription.length} | h1 ${p.h1.length} | ${H.length ? "FAIL" : "ok"}${R.length ? ` | ${R.length} to review` : ""}`);
  H.forEach((h) => console.log("    FAIL   " + h)); R.forEach((r) => console.log("    review " + r));
  hard += H.length;
}
process.exit(hard ? 1 : 0);
