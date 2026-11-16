// Static build for the Stacktik site. No dependencies: `node site/build.mjs` writes site/dist.
// Sources: src/home.html and src/details.html (the designed pages), src/pages/*.json (landing page copy),
// public/ (film, OG images, icons). The build adds the SEO layer: titles, descriptions, canonicals, Open Graph,
// structured data, internal links, sitemap.xml, robots.txt and llms.txt.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "dist");
const ORIGIN = "https://stacktik.com";
const TODAY = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const ORG = {
  name: "Stacktik",
  legalName: "Stacktik Solutions Inc.",
  email: "hello@stacktik.com",
  locality: "Woodbridge",
  region: "ON",
  country: "CA",
  description: "Stacktik is a RevOps consultancy in Woodbridge, Ontario. It chooses, buys, sets up and connects CRM, calling, outreach and reporting tools for sales and customer-facing teams, builds AI agents on Claude and OpenAI, and can source the rest of a company's technology on the same written proposal.",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");
const read = (p) => readFileSync(p, "utf8");
const url = (path) => ORIGIN + path;
function swap(html, from, to, { all = false, min = 1 } = {}) {
  const n = html.split(from).length - 1;
  if (n < min || (!all && n !== 1)) throw new Error(`expected ${all ? "at least " + min : "exactly one"} "${from.slice(0, 60)}", found ${n}`);
  return html.split(from).join(to);
}

/* ---------- content ---------- */
const landing = (existsSync(join(SRC, "pages")) ? readdirSync(join(SRC, "pages")) : []).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(read(join(SRC, "pages", f))));
const ORDER = ["crm-implementation", "hubspot-implementation", "monday-crm-implementation", "business-phone-systems", "ai-receptionist", "ai-agents"];
landing.sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));
const NAV_NAME = {
  "crm-implementation": "CRM implementation",
  "hubspot-implementation": "HubSpot implementation",
  "monday-crm-implementation": "monday CRM implementation",
  "business-phone-systems": "Business phone systems",
  "ai-receptionist": "AI receptionist",
  "ai-agents": "AI agents",
};
const RELATED = {
  "crm-implementation": ["hubspot-implementation", "monday-crm-implementation", "business-phone-systems"],
  "hubspot-implementation": ["crm-implementation", "business-phone-systems", "ai-agents"],
  "monday-crm-implementation": ["crm-implementation", "hubspot-implementation", "ai-agents"],
  "business-phone-systems": ["ai-receptionist", "crm-implementation", "hubspot-implementation"],
  "ai-receptionist": ["business-phone-systems", "ai-agents", "crm-implementation"],
  "ai-agents": ["ai-receptionist", "crm-implementation", "hubspot-implementation"],
};
const services = landing.map((p) => ({ slug: p.slug, path: `/${p.slug}/`, name: NAV_NAME[p.slug] || p.eyebrow, blurb: p.summary?.[0]?.text || p.metaDescription }));

const HOME = {
  path: "/",
  title: "RevOps agency and consulting for sales teams | Stacktik",
  description: "Stacktik is a RevOps consultancy in Ontario. We choose, buy, set up and connect your CRM, calling, outreach and reporting tools, with AI agents built in.",
  og: "home",
};
const DETAILS = {
  path: "/details/",
  title: "Platforms, implementation scope and buying | Stacktik",
  description: "The platforms Stacktik sets up and our relationship with each, what a CRM and sales-tool implementation can include, and how buying software through us works.",
  og: "details",
};
const BOOK = {
  path: "/blueprint/",
  title: "Book a call with a RevOps consultant | Stacktik",
  description: "Book a free call with Stacktik. We look at the tools you use today, what isn't working, and the right next step. No obligation, and a written proposal follows.",
  og: "blueprint",
};

/* ---------- shared pieces ---------- */
const chev = `<span class="disc" aria-hidden="true"><svg><use href="#chev"/></svg></span>`;
const footerHtml = () => `<footer>
  <div class="wrap foot-svc">
    <span class="label">Services</span>
    <nav aria-label="Services">${services.map((s) => `<a href="${s.path}">${esc(s.name)}</a>`).join("")}<a href="/details/">Platforms and scope</a><a href="/blueprint/">Book a call</a></nav>
  </div>
  <div class="wrap">
    <span>© ${TODAY.slice(0, 4)} ${ORG.legalName} · ${ORG.locality}, Ontario</span>
    <span><a href="/">Home</a> · <a href="/details/">Platforms, implementation scope and buying details</a> · <span class="email">${ORG.email}</span></span>
  </div>
</footer>`;

const EXTRA_CSS = `
/* Site-wide additions for the multi-page site: service links, breadcrumbs, key facts, platform chips, the booking form. */
.foot-svc { display: grid !important; gap: 12px; justify-content: start; padding-bottom: 22px; margin-bottom: 22px; border-bottom: 1px solid var(--ln); }
.foot-svc nav { display: flex; flex-wrap: wrap; gap: 8px 22px; }
.foot-svc nav a { text-decoration: none; color: var(--fg); font-weight: 500; }
.foot-svc nav a:hover { color: var(--terracotta-light); }
.svc-links { margin: clamp(28px, 4vw, 44px) 0 0; padding-top: 22px; border-top: 1px solid var(--ln); display: flex; flex-wrap: wrap; gap: 8px 22px; align-items: baseline; font-size: .92rem; }
.svc-links .label { margin-right: 4px; }
.svc-links a { color: var(--fg); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--ln-strong); }
.svc-links a:hover { text-decoration-color: var(--acc); }
.crumbs { display: flex; flex-wrap: wrap; gap: 8px; font-size: .78rem; color: var(--fg-muted); }
.crumbs a { color: var(--fg-muted); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--ln-strong); }
.crumbs a:hover { color: var(--fg); }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 56px; margin: 0; border-top: 1px solid var(--ln); }
.facts div { display: grid; gap: 8px; padding: 24px 0; border-bottom: 1px solid var(--ln); align-content: start; }
.facts dt { font-family: var(--ui); font-size: .68rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--acc); }
.facts dd { margin: 0; color: var(--fg); max-width: 34em; }
@media (max-width: 760px) { .facts { grid-template-columns: 1fr; } }
.ledger-row .n { display: inline-block; }
.chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; list-style: none; }
.chips li { padding: 9px 16px; border: 1px solid var(--ln-strong); border-radius: 999px; font-weight: 600; font-size: .9rem; }
.chips-note { margin-top: 22px; font-size: .88rem; color: var(--fg-muted); }
.chips-note a { color: var(--fg); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--ln-strong); }
.rel { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.rel a { display: grid; gap: 10px; padding: 22px; border: 1px solid var(--ln); border-radius: 14px; background: var(--surface); text-decoration: none; color: var(--fg); align-content: start; transition: border-color .25s ease; }
.rel a:hover { border-color: var(--terracotta-light); }
.rel a strong { font-family: var(--display); font-weight: 500; font-size: 1.3rem; letter-spacing: -0.015em; line-height: 1.2; }
.rel a span { color: var(--fg-muted); font-size: .88rem; }
@media (max-width: 860px) { .rel { grid-template-columns: 1fr; } }
.book { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 72px); align-items: start; }
@media (max-width: 860px) { .book { grid-template-columns: 1fr; } }
.book-form { display: grid; gap: 14px; }
.book-form label { display: grid; gap: 6px; font-size: .8rem; font-weight: 600; color: var(--fg-muted); }
.book-form input, .book-form select, .book-form textarea { font: inherit; font-size: 1rem; font-weight: 400; color: var(--fg); background: var(--surface); border: 1px solid var(--ln-strong); border-radius: 10px; padding: 12px 14px; min-width: 0; width: 100%; box-sizing: border-box; }
.book-form textarea { min-height: 120px; resize: vertical; }
.book-form input:focus-visible, .book-form select:focus-visible, .book-form textarea:focus-visible { outline: 3px solid var(--terracotta-light); outline-offset: 2px; }
.book-form button { justify-self: start; border: 0; cursor: pointer; font-family: inherit; }
.book-note { font-size: .86rem; color: var(--fg-muted); }
.book-note .email { color: var(--fg); font-weight: 600; user-select: all; }
`;

function seoHead(page, { schema = [], type = "website" } = {}) {
  const image = url(`/og/${page.og}.png`);
  const graph = { "@context": "https://schema.org", "@graph": schema };
  return `<title>${esc(page.title)}</title>
<meta name="description" content="${attr(page.description)}">
<link rel="canonical" href="${url(page.path)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#131110">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${ORG.name}">
<meta property="og:locale" content="en_CA">
<meta property="og:title" content="${attr(page.title)}">
<meta property="og:description" content="${attr(page.description)}">
<meta property="og:url" content="${url(page.path)}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(page.ogAlt || page.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(page.title)}">
<meta name="twitter:description" content="${attr(page.description)}">
<meta name="twitter:image" content="${image}">
<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`;
}

const orgNode = () => ({
  "@type": ["Organization", "ProfessionalService"],
  "@id": url("/#organization"),
  name: ORG.name,
  legalName: ORG.legalName,
  url: url("/"),
  logo: { "@type": "ImageObject", url: url("/og/logo.png"), width: 512, height: 512 },
  image: url("/og/home.png"),
  description: ORG.description,
  email: ORG.email,
  address: { "@type": "PostalAddress", addressLocality: ORG.locality, addressRegion: ORG.region, addressCountry: ORG.country },
  areaServed: { "@type": "Country", name: "Canada" },
  knowsAbout: ["Revenue operations", "CRM implementation", "HubSpot", "monday CRM", "Business phone systems", "Contact centre software", "AI agents", "AI receptionist", "Sales automation", "Sales reporting"],
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Services", itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": url(s.path + "#service"), name: s.name, url: url(s.path) } })) },
});
const siteNode = () => ({ "@type": "WebSite", "@id": url("/#website"), url: url("/"), name: ORG.name, inLanguage: "en-CA", publisher: { "@id": url("/#organization") } });
const pageNode = (page, extra = {}) => ({ "@type": "WebPage", "@id": url(page.path + "#webpage"), url: url(page.path), name: page.title, description: page.description, inLanguage: "en-CA", isPartOf: { "@id": url("/#website") }, about: { "@id": url("/#organization") }, primaryImageOfPage: { "@type": "ImageObject", url: url(`/og/${page.og}.png`) }, dateModified: TODAY, ...extra });
const crumbNode = (page, trail) => ({ "@type": "BreadcrumbList", "@id": url(page.path + "#breadcrumb"), itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: url(t.path) })) });
const faqNode = (page, items) => ({ "@type": "FAQPage", "@id": url(page.path + "#faq"), mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
const stripTags = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
function faqFromHtml(html) {
  const sec = html.match(/<section id="faq"[\s\S]*?<\/section>/);
  if (!sec) return [];
  return [...sec[0].matchAll(/<div class="q"><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/div>/g)].map((m) => ({ q: stripTags(m[1]), a: stripTags(m[2]) }));
}

/* ---------- homepage ---------- */
function buildHome() {
  let html = read(join(SRC, "home.html"));
  const bodyStart = html.indexOf('<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="chev"');
  if (bodyStart < 0) throw new Error("home: body start not found");
  let head = html.slice(0, bodyStart), body = html.slice(bodyStart);
  head = swap(head, "<title>Stacktik Homepage Redesign</title>\n", "");
  head = swap(head, '<meta name="claude:viewport-fit-sides" content="cover">\n', "");

  body = swap(body, 'href="details.html#platforms"', 'href="/details/#platforms"');
  body = swap(body, 'href="details.html"', 'href="/details/"', { all: true });
  body = swap(body, 'href="https://stacktik.com/blueprint/"', 'href="/blueprint/"', { all: true });
  body = swap(body, 'poster="media/stacktik-film-poster.jpg"', 'poster="/media/stacktik-film-poster.jpg"');
  body = swap(body, 'src="media/stacktik-film.mp4"', 'src="/media/stacktik-film.mp4"');
  // Search map: the specialty in the first words a visitor and a crawler read.
  body = swap(body, ">For sales and customer-facing teams</span>", ">RevOps consulting for sales and customer-facing teams</span>");
  // Internal links to the service pages, from the section that describes the work.
  const helpEnd = '  </div>\n</section>\n\n<section id="journey"';
  body = swap(body, helpEnd, `    <p class="svc-links"><span class="label">Start from a service</span>${services.map((s) => `<a href="${s.path}">${esc(s.name)}</a>`).join("")}</p>\n` + helpEnd);
  const foot = body.match(/<footer>[\s\S]*?<\/footer>/);
  if (!foot) throw new Error("home: footer not found");
  body = body.replace(foot[0], footerHtml());

  const faq = faqFromHtml(body);
  const video = { "@type": "VideoObject", "@id": url("/#film"), name: "Stacktik: every deal, lead and number in one live system", description: "A 50-second film of the revenue system Stacktik sets up: AI spots a deal going quiet, qualifies a new lead and drafts the reply, and the month's number stays in front of the team. Names and figures in the film are example data.", thumbnailUrl: url("/media/stacktik-film-poster.jpg"), contentUrl: url("/media/stacktik-film.mp4"), uploadDate: "2026-11-01", duration: "PT50S", publisher: { "@id": url("/#organization") } };
  const schema = [orgNode(), siteNode(), pageNode(HOME, { video: { "@id": url("/#film") } }), video, ...(faq.length ? [faqNode(HOME, faq)] : [])];
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:dark;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style>
${seoHead(HOME, { schema })}
${head.trim()}
<style>${EXTRA_CSS}</style>
</head>
<body>
${body.trim()}
</body>
</html>
`;
}

/* ---------- details ---------- */
function partsOfDetails() {
  const html = read(join(SRC, "details.html"));
  const styles = [...html.matchAll(/<style>[\s\S]*?<\/style>/g)].map((m) => m[0]);
  const sprite = html.match(/<svg width="0" height="0"[\s\S]*?<\/svg>/);
  const script = html.match(/<script>[\s\S]*?<\/script>\s*<\/body>/);
  const fonts = html.match(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">[\s\S]*?display=swap">/);
  if (!sprite || !script || !fonts || styles.length < 3) throw new Error("details: template parts not found");
  return { html, css: styles.map((s) => s.replace(/^<style>|<\/style>$/g, "")).join("\n"), sprite: sprite[0], script: script[0].replace(/\s*<\/body>$/, ""), fonts: fonts[0] };
}
function buildDetails() {
  let { html } = partsOfDetails();
  html = swap(html, '<html lang="en">', '<html lang="en-CA">');
  html = swap(html, 'href="index.html"', 'href="/"', { all: true });
  html = swap(html, 'href="https://stacktik.com/blueprint/"', 'href="/blueprint/"', { all: true });
  const faq = faqFromHtml(html);
  const schema = [orgNode(), siteNode(), pageNode(DETAILS, { breadcrumb: { "@id": url(DETAILS.path + "#breadcrumb") } }), crumbNode(DETAILS, [{ name: "Home", path: "/" }, { name: "Platforms and scope", path: DETAILS.path }]), ...(faq.length ? [faqNode(DETAILS, faq)] : [])];
  html = swap(html, "<title>Stacktik · Details</title>", seoHead(DETAILS, { schema }));
  html = swap(html, "</head>", `<style>${EXTRA_CSS}</style>\n</head>`);
  const foot = html.match(/<footer>[\s\S]*?<\/footer>/);
  html = html.replace(foot[0], footerHtml());
  return html;
}

/* ---------- inner page shell (landing pages, booking page) ---------- */
function shell(page, { schema, navLinks, main, type = "website", extraScript = "" }) {
  const t = partsOfDetails();
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${seoHead(page, { schema, type })}
${t.fonts}
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
${t.sprite}

<header class="nav" id="nav">
  <div class="wrap">
    <a href="/" class="logo" aria-label="Stacktik home">
      <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M22 32 L43 46 L80 13" fill="none" stroke="#C4552B" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path><rect x="16" y="56" width="68" height="14" rx="7" fill="#C4552B"></rect><rect x="16" y="78" width="68" height="14" rx="7" fill="#C4552B"></rect></svg>
      <span>stack<span class="tik">tik</span></span>
    </a>
    <nav class="nav-links" aria-label="Main">
      ${navLinks.map((l) => `<a href="${l.href}">${esc(l.text)}</a>`).join("\n      ")}
    </nav>
    <a class="btn btn-sm" href="/blueprint/">Book a call ${chev}</a>
  </div>
</header>

<main id="top">
${main}
</main>

${footerHtml()}

<script src="/assets/site.js" defer></script>${extraScript}
</body>
</html>
`;
}

function buildLanding(p) {
  const page = { path: `/${p.slug}/`, title: p.title, description: p.metaDescription, og: p.slug };
  const name = NAV_NAME[p.slug] || p.eyebrow;
  const steps = p.blocks.find((b) => b.type === "steps");
  const blockHtml = (b) => {
    const rows = b.items.map((it, i) => `      <${b.type === "steps" ? "li" : "div"} class="ledger-row">
        <div class="who">${b.type === "steps" ? `<span class="n">${String(i + 1).padStart(2, "0")}</span>` : ""}${esc(it.title)}</div>
        <p>${esc(it.body)}</p>
      </${b.type === "steps" ? "li" : "div"}>`).join("\n");
    return `<section id="${attr(b.id)}" class="rule" data-tone="dark">
  <div class="wrap">
    <div class="sec-head" data-reveal-group>
      <span class="eyebrow">${esc(b.eyebrow)}</span>
      <h2>${esc(b.h2)}</h2>
      <p class="lede">${esc(b.intro)}</p>
    </div>
    <${b.type === "steps" ? "ol" : "div"} class="ledger" data-reveal-group>
${rows}
    </${b.type === "steps" ? "ol" : "div"}>
  </div>
</section>`;
  };
  const related = (RELATED[p.slug] || []).map((s) => services.find((x) => x.slug === s)).filter(Boolean);
  const main = `
<section class="hero hero-short" data-tone="dark">
  <div class="wrap">
    <div class="hero-copy" style="max-width:46rem">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>
      <span class="eyebrow">${esc(p.eyebrow)}</span>
      <h1>${esc(p.h1)}</h1>
      <p class="lede">${esc(p.lede)}</p>
      <div class="hero-ctas">
        <a class="btn" href="/blueprint/">Book a call ${chev}</a>
        ${steps ? `<a class="btn-text" href="#${attr(steps.id)}">How it works <svg aria-hidden="true"><use href="#chev"/></svg></a>` : ""}
      </div>
    </div>
  </div>
</section>

<section id="in-short" class="rule" data-tone="dark">
  <div class="wrap">
    <div class="sec-head" data-reveal-group>
      <span class="eyebrow">In short</span>
      <h2>${esc(name)}, in four lines.</h2>
    </div>
    <dl class="facts" data-reveal-group>
${p.summary.map((s) => `      <div><dt>${esc(s.label)}</dt><dd>${esc(s.text)}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

${p.blocks.map(blockHtml).join("\n\n")}

<section id="platforms" class="band-light" data-tone="light">
  <div class="wrap">
    <div class="sec-head" data-reveal-group>
      <span class="eyebrow">Platforms</span>
      <h2>${esc(p.platforms.h2)}</h2>
      <p class="lede">${esc(p.platforms.intro)}</p>
    </div>
    <ul class="chips" data-reveal-group>
${p.platforms.names.map((n) => `      <li>${esc(n)}</li>`).join("\n")}
    </ul>
    <p class="chips-note">Our relationship with each platform is stated on the proposal, next to its price. <a href="/details/#platforms">All the platforms we work with, by the job they do.</a></p>
  </div>
</section>

<section id="faq" class="rule" data-tone="dark">
  <div class="wrap">
    <div class="sec-head" data-reveal-group>
      <span class="eyebrow">Questions</span>
      <h2>${esc(name)}: questions we get.</h2>
    </div>
    <div class="faq" data-reveal-group>
${p.faq.map((f) => `      <div class="q"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("\n")}
    </div>
  </div>
</section>

<section id="related" class="rule" data-tone="dark">
  <div class="wrap">
    <div class="sec-head" data-reveal-group>
      <span class="eyebrow">Related</span>
      <h2>Often part of the same project.</h2>
    </div>
    <div class="rel" data-reveal-group>
${related.map((r) => `      <a href="${r.path}"><strong>${esc(r.name)}</strong><span>${esc(r.blurb)}</span></a>`).join("\n")}
    </div>
  </div>
</section>

<section class="close rule" data-tone="dark">
  <div class="wrap">
    <span class="eyebrow">Stacktik</span>
    <h2>${esc(p.closeH2)}</h2>
    <p class="lede">${esc(p.closeLede)}</p>
    <div><a class="btn" href="/blueprint/">Book a call ${chev}</a></div>
  </div>
</section>`;
  const service = { "@type": "Service", "@id": url(page.path + "#service"), name, serviceType: name, description: p.metaDescription, url: url(page.path), provider: { "@id": url("/#organization") }, areaServed: { "@type": "Country", name: "Canada" } };
  const schema = [orgNode(), siteNode(), pageNode(page, { breadcrumb: { "@id": url(page.path + "#breadcrumb") }, mainEntity: { "@id": url(page.path + "#service") } }), crumbNode(page, [{ name: "Home", path: "/" }, { name, path: page.path }]), service, faqNode(page, p.faq)];
  const navLinks = [{ href: "/", text: "Home" }, ...p.blocks.slice(0, 3).map((b) => ({ href: `#${b.id}`, text: b.eyebrow })), { href: "#faq", text: "Questions" }, { href: "/details/", text: "Details" }];
  return { page, html: shell(page, { schema, navLinks, main }) };
}

function buildBook() {
  const main = `
<section class="hero hero-short" data-tone="dark">
  <div class="wrap">
    <div class="hero-copy" style="max-width:46rem">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Book a call</span></nav>
      <span class="eyebrow">Book a call</span>
      <h1>A free call about what you use today.</h1>
      <p class="lede">Tell us what your sales and customer-facing teams run on and what isn't working. We reply to set a time. On the call we look at the right next step, and a written proposal follows. No obligation.</p>
    </div>
  </div>
</section>

<section id="request" class="rule" data-tone="dark">
  <div class="wrap book">
    <div>
      <div class="sec-head">
        <span class="eyebrow">What happens</span>
        <h2>A call, a written proposal, then the work you actually need.</h2>
      </div>
      <ol class="ledger">
        <li class="ledger-row"><div class="who"><span class="n">01</span>The call</div><p>We go through the tools you have, how leads, calls and follow-ups move through your team, and what isn't working.</p></li>
        <li class="ledger-row"><div class="who"><span class="n">02</span>The proposal</div><p>You get it in writing: what to keep, connect or replace, the monthly cost of each tool, and our fee for any work, fixed before it starts.</p></li>
        <li class="ledger-row"><div class="who"><span class="n">03</span>Your choice</div><p>Buy the software, have us set it up, or both. From there one technical RevOps consultant is assigned to your project.</p></li>
      </ol>
    </div>
    <form class="book-form" id="book-form" action="mailto:${ORG.email}" method="post" enctype="text/plain">
      <label>Your name <input name="name" autocomplete="name" required></label>
      <label>Company <input name="company" autocomplete="organization"></label>
      <label>Work email <input name="email" type="email" autocomplete="email" required></label>
      <label>Team size <select name="team"><option value="">Choose one</option><option>1 to 5 people</option><option>6 to 15 people</option><option>16 to 50 people</option><option>More than 50 people</option></select></label>
      <label>Tools you use today <input name="tools" placeholder="CRM, phone, email, reporting"></label>
      <label>What you want to fix or set up <textarea name="goal"></textarea></label>
      <button class="btn" type="submit">Request a call ${chev}</button>
      <p class="book-note">This opens your email app with the details filled in. You can also write to us directly at <span class="email">${ORG.email}</span>.</p>
    </form>
  </div>
</section>`;
  const schema = [orgNode(), siteNode(), { ...pageNode(BOOK, { breadcrumb: { "@id": url(BOOK.path + "#breadcrumb") } }), "@type": ["WebPage", "ContactPage"] }, crumbNode(BOOK, [{ name: "Home", path: "/" }, { name: "Book a call", path: BOOK.path }])];
  const extraScript = `
<script>
(function () {
  var f = document.getElementById('book-form'); if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return (f.elements[n].value || '').trim(); };
    var subject = 'Call request: ' + (v('company') || v('name') || 'my team');
    var body = ['Name: ' + v('name'), 'Company: ' + v('company'), 'Email: ' + v('email'), 'Team size: ' + v('team'), 'Tools today: ' + v('tools'), '', 'What we want to fix or set up:', v('goal')].join('\\n');
    window.location.href = 'mailto:${ORG.email}?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
</script>`;
  const navLinks = [{ href: "/", text: "Home" }, { href: "/#help", text: "What we do" }, { href: "/#how", text: "How it works" }, { href: "/#fees", text: "Fees" }, { href: "/details/", text: "Details" }];
  return shell(BOOK, { schema, navLinks, main, extraScript });
}

/* ---------- write ---------- */
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, "public"), OUT, { recursive: true });
const put = (rel, text) => { const p = join(OUT, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, text); };

const t = partsOfDetails();
put("assets/site.css", t.css + "\n" + EXTRA_CSS);
put("assets/site.js", t.script.replace(/^<script>|<\/script>$/g, "").trim() + "\n");
put("index.html", buildHome());
put("details/index.html", buildDetails());
put("blueprint/index.html", buildBook());
const pages = [HOME, DETAILS, BOOK];
for (const p of landing) { const { page, html } = buildLanding(p); put(`${p.slug}/index.html`, html); pages.push(page); }

put("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${url(p.path)}</loc><lastmod>${TODAY}</lastmod></url>`).join("\n")}
</urlset>
`);

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Amazonbot", "CCBot", "meta-externalagent", "DuckAssistBot", "MistralAI-User"];
put("robots.txt", `# Stacktik: every page is open to search engines and to AI assistants.
User-agent: *
Allow: /

${AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${url("/sitemap.xml")}
`);

put("llms.txt", `# Stacktik

> ${ORG.description}

Stacktik (${ORG.legalName}) is based in ${ORG.locality}, Ontario, Canada. Revenue operations (RevOps) is its specialty: the CRM, calling, outreach and reporting tools a sales or customer-facing team runs on, chosen, bought, set up, connected and taught to the team.

## How Stacktik works

- A free first call about the tools in use today and what isn't working. No obligation.
- A written proposal: what to keep, connect or replace, the monthly cost of each tool, and a fixed fee for any implementation work, quoted before it starts.
- Software is bought on the vendor's own plan and pricing. Buying through Stacktik does not require hiring Stacktik for implementation, and the reverse.
- One technical RevOps consultant is assigned to each project.
- AI agents built on Claude and OpenAI handle routine steps, with a person approving.
- Contact: ${ORG.email}

## Services

${services.map((s) => `- [${s.name}](${url(s.path)}): ${s.blurb}`).join("\n")}

## Pages

- [Home](${url("/")}): what Stacktik does, how it works, fees and common questions.
- [Platforms, implementation scope and buying](${url("/details/")}): the platforms Stacktik works with, what a project can include, and how a purchase works.
- [Book a call](${url("/blueprint/")}): request the free first call.
`);

console.log(`built ${pages.length} pages into site/dist:`, pages.map((p) => p.path).join(" "));
