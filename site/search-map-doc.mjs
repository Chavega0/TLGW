// Writes docs/search-map.md from site/src/search-map.json: `node site/search-map-doc.mjs`.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = dirname(fileURLToPath(import.meta.url));
const m = JSON.parse(readFileSync(join(ROOT, "src", "search-map.json"), "utf8"));
const n = (v) => (v == null ? "" : v.toLocaleString("en-CA"));
const L = ["# Stacktik search map", "",
  "Which page targets which search terms. Every term has measured monthly Google search volume from Semrush (Canada and United States databases, pulled 2026-11-16). One page owns each term, so no two pages compete for the same search.", "",
  "How to read it: **CA** and **US** are average monthly searches. **KD** is Semrush keyword difficulty (0 to 100, lower is easier), for Canada where Semrush has a score and otherwise for the US. A blank means the term was not pulled for that country or has no score.", "",
  "## Pages by demand", "", "| Page | URL | Primary term | Terms | CA searches / month | US searches / month |", "|---|---|---|---:|---:|---:|"];
for (const p of [...m.pages].sort((a, b) => b.us_total - a.us_total)) L.push(`| ${p.name} | \`${p.path}\` | ${p.primary} | ${p.keywords.length} | ${n(p.ca_total)} | ${n(p.us_total)} |`);
L.push("", "Totals add the mapped terms together. The same person often searches several of them, so read them as relative size, not as a traffic forecast.", "");
for (const p of m.pages) {
  L.push(`## ${p.name} (\`${p.path}\`)`, "", `${p.role}. Primary term: **${p.primary}**.`, "", "| Term | CA | US | KD |", "|---|---:|---:|---:|");
  for (const k of [...p.keywords].sort((a, b) => (b.us || b.ca || 0) - (a.us || a.ca || 0))) L.push(`| ${k.keyword} | ${n(k.ca)} | ${n(k.us)} | ${n(k.kd_ca ?? k.kd_us)} |`);
  L.push("");
}
L.push("## Next pages to build", "", "Researched and worth building next.", "", "| Page | Primary term | CA searches / month | US searches / month |", "|---|---|---:|---:|");
for (const p of m.next) L.push(`| ${p.name} | ${p.primary} | ${n(p.ca_total)} | ${n(p.us_total)} |`);
L.push("", "## Terms left out on purpose", "",
  "- **Vendor names on their own** (hubspot pricing, gohighlevel, lemlist, cloudtalk, databox): the vendor owns these results.",
  "- **Salesforce and Pipedrive implementation**: real volume, but not platforms Stacktik sets up. Salesforce migrations are not usually in scope.",
  "- **Cold email agency**: real volume, but running outbound for a client is not in scope. A cold email setup page is on the next list.",
  "- **Managed IT, cybersecurity and business internet in Toronto**: real volume, but Stacktik only helps choose and buy these, so a page would overpromise.",
  "- **HubSpot with Slack, QuickBooks, Gmail or WhatsApp**: real volume, but not platforms on Stacktik's list.", "");
writeFileSync(join(ROOT, "..", "docs", "search-map.md"), L.join("\n"));
console.log("docs/search-map.md written:", m.pages.length, "pages");
