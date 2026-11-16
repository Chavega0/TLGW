// Visual design check: serves dist/, screenshots key scroll positions
// at desktop and phone widths into shots/.
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  const url = req.url.split("?")[0];
  const path = join("dist", url === "/" ? "index.html" : url);
  try {
    const data = await readFile(path);
    res.writeHead(200, { "content-type": MIME[extname(path)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});
await new Promise((r) => server.listen(4173, r));

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  args: ["--no-sandbox"],
});

const targets = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "phone", width: 390, height: 844 },
];

for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: t.width, height: t.height } });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `shots/${t.name}-hero.png` });
  const total = await page.evaluate(() => document.body.scrollHeight);
  const stops = [0.18, 0.36, 0.55, 0.75, 0.92];
  for (let i = 0; i < stops.length; i++) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), total * stops[i]);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `shots/${t.name}-s${i + 1}.png` });
  }
  await page.close();
}

await browser.close();
server.close();
console.log("done");
