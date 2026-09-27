import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:4500/index.html", { waitUntil: "networkidle" });
await p.evaluate(() => scrollTo(0, 11303));
await p.waitForTimeout(1200);
const info = await p.evaluate(() => {
  const f = document.querySelector(".peak-frame");
  const img = document.querySelector(".peak-img");
  const cs = getComputedStyle(f), ci = getComputedStyle(img);
  const act = f.closest("[data-sc-act]");
  return {
    frame: { opacity: cs.opacity, display: cs.display, pos: cs.position, w: f.getBoundingClientRect().width, h: f.getBoundingClientRect().height },
    img: { opacity: ci.opacity, w: img.getBoundingClientRect().width, h: img.getBoundingClientRect().height, complete: img.complete, nw: img.naturalWidth, transform: ci.transform },
    actP: getComputedStyle(act).getPropertyValue("--sc-p"),
  };
});
console.log(JSON.stringify(info, null, 2));
await b.close();
