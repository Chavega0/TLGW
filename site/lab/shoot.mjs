// Scroll-state screenshot harness ("eyes"): serves nothing itself, points at a
// local server, walks the page in even steps, waits for the lerp/settle, and
// writes numbered frames plus a contact sheet listing per-frame notes.
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";

const arg = (k, d) => {
  const i = process.argv.indexOf("--" + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const url = arg("url", "http://localhost:4500/index.html");
const out = arg("out", "lab/shots");
const width = +arg("width", 1440);
const height = +arg("height", 900);
const steps = +arg("steps", 14);
const reduced = process.argv.includes("--reduced-motion");

mkdirSync(out, { recursive: true });

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    ...(proxy ? [`--proxy-server=${proxy}`, "--proxy-bypass-list=localhost;127.0.0.1"] : []),
  ],
});
const ctx = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  reducedMotion: reduced ? "reduce" : "no-preference",
  // The egress proxy re-terminates TLS with a private CA that headless
  // chromium does not read from the env; fonts are the only remote asset.
  ignoreHTTPSErrors: true,
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text());
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(900);

const notes = [];
const max = await page.evaluate(
  () => document.documentElement.scrollHeight - innerHeight
);
let lastShot = null;
for (let i = 0; i <= steps; i++) {
  const y = Math.round((max * i) / steps);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(reduced ? 250 : 700);
  const file = `${out}/${String(i).padStart(2, "0")}-y${y}.png`;
  await page.screenshot({ path: file });
  notes.push({ i, y, file });
}

// quick structural report
const report = await page.evaluate(() => {
  const r = { title: document.title, imgs: [], rails: [] };
  document.querySelectorAll("img").forEach((im) => {
    if (!im.complete || im.naturalWidth === 0)
      r.imgs.push("broken: " + (im.getAttribute("src") || "?"));
  });
  document.querySelectorAll(".rail").forEach((el) => {
    r.rails.push({ overflow: el.scrollWidth - innerWidth });
  });
  return r;
});

writeFileSync(
  out + "/report.json",
  JSON.stringify({ url, width, height, max, report, errors, notes }, null, 2)
);
console.log(
  JSON.stringify({ url, frames: notes.length, max, report, errors }, null, 2)
);
await browser.close();
