// Visual check of the built site (needs the preview server running): `node site/shots.mjs <outDir> [path ...]`.
import { createRequire } from "node:module";
const require = createRequire("/opt/node-tools/node_modules/");
const { chromium } = require("playwright");
const [, , outDir, ...paths] = process.argv;
const base = "http://localhost:4321";
const browser = await chromium.launch();
for (const p of paths) {
  for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const errs = []; page.on("pageerror", (e) => errs.push(String(e))); page.on("requestfailed", (r) => { if (!/fonts\.g/.test(r.url())) errs.push("failed " + r.url()); });
    await page.goto(base + p, { waitUntil: "load" });
    await page.waitForTimeout(700);
    // Scroll through once so sections that reveal on scroll are visible in the capture.
    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
    await page.waitForTimeout(900);
    const info = await page.evaluate(() => ({ h1: document.querySelectorAll("h1").length, overflow: document.documentElement.scrollWidth > innerWidth, height: document.documentElement.scrollHeight, font: getComputedStyle(document.querySelector("h1")).fontFamily.split(",")[0] }));
    const slug = (p.replace(/\//g, "") || "home");
    await page.screenshot({ path: `${outDir}/${slug}-${name}.png`, fullPage: true });
    console.log(p, name, JSON.stringify(info), errs.length ? errs.slice(0, 4) : "no errors");
    await page.close();
  }
}
await browser.close();
