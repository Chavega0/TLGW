// Renders site/index.html in headless Chromium at desktop + phone sizes and
// saves scroll-step screenshots to out/ (published to the `shots` branch).
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { spawn } from 'child_process';

mkdirSync('out', { recursive: true });
const server = spawn('python3', ['-m', 'http.server', '8123', '-d', 'site']);
await new Promise(r => setTimeout(r, 1500));

const errs = [];
const browser = await chromium.launch();
async function run(width, height, fracs, prefix) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on('pageerror', e => errs.push('JS ' + e.message.slice(0, 300)));
  page.on('response', r => { if (r.status() >= 400) errs.push('HTTP' + r.status() + ' ' + r.url().slice(0, 140)); });
  await page.goto('http://localhost:8123/index.html', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(9000);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i < fracs.length; i++) {
    await page.evaluate(y => window.scrollTo(0, y), Math.round(H * fracs[i]));
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `out/${prefix}${String(i).padStart(2, '0')}.jpg`, quality: 55, type: 'jpeg' });
  }
  await page.close();
  return H;
}
const dFracs = Array.from({ length: 16 }, (_, i) => i / 15 * .97);
const H = await run(1440, 900, dFracs, 'd');
await run(390, 844, [0, .12, .25, .38, .5, .62, .75, .88, .97], 'm');
writeFileSync('out/meta.txt', 'H=' + H + '\n' + [...new Set(errs)].join('\n'));
await browser.close();
server.kill();
