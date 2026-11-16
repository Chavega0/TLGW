// Visual layer for the landing pages: an animated product scene in each hero, a moving band of vendor tiles,
// logo tiles for the platforms, and a small looping illustration on every step and service card.
// Everything is HTML, CSS and inline SVG: no image requests, crisp at any size, and reduced motion shows each
// scene in its finished state. Vendor marks are the ones already on the homepage; a vendor without a mark there
// is shown as its name, never as a drawn logo.

import { readFileSync } from "node:fs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------- vendor marks ---------- */

const BRAND_KEY = {
  "HubSpot": "hubspot", "monday.com CRM": "monday", "monday.com": "monday", "CloudTalk": "cloudtalk", "Dialpad": "dialpad",
  "Zoom": "zoom", "Cisco": "cisco", "Zapier": "zapier", "Databox": "databox", "AT&T": "att", "Akamai": "akamai",
  "Aircall": "aircall", "Vonage": "vonage", "Claude": "claude",
};

export function loadMarks(homeHtml) {
  const marks = {};
  for (const m of homeHtml.matchAll(/<svg class="lg lg-([a-z]+)"[\s\S]*?<\/svg>/g)) if (!marks[m[1]]) marks[m[1]] = m[0];
  const extra = homeHtml.match(/var extraMarks = (\{[\s\S]*?\});\n/);
  if (extra) for (const [k, v] of Object.entries(JSON.parse(extra[1]))) if (!marks[k]) marks[k] = v;
  for (const k of Object.keys(marks)) {
    marks[k] = marks[k].replace(/\s(?:role|aria-label)="[^"]*"/g, "").replace("<svg ", '<svg aria-hidden="true" ');
  }
  return marks;
}

let MARKS = {};
const hasMark = (name) => !!MARKS[BRAND_KEY[name]];
// A vendor's mark, or its name set as a wordmark when the site has no mark for it.
function mark(name) {
  const key = BRAND_KEY[name];
  if (key === "monday" && MARKS.monday) return `<span class="mk">${MARKS.monday}<span class="wm">monday.com</span></span>`;
  if (key && MARKS[key]) return MARKS[key];
  return `<span class="wm">${esc(name)}</span>`;
}

/* ---------- small icons ---------- */

const ico = (d) => `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  phone: ico('<path d="M5.6 2.5H3.7a1.2 1.2 0 0 0-1.2 1.3c.5 5.4 4.3 9.2 9.7 9.7a1.2 1.2 0 0 0 1.3-1.2v-1.9l-2.6-1-1.4 1.3a7.6 7.6 0 0 1-3.8-3.8L7 5.5z"/>'),
  user: ico('<circle cx="8" cy="5.5" r="2.5"/><path d="M3 13.5c.8-2.6 2.7-4 5-4s4.2 1.4 5 4"/>'),
  task: ico('<rect x="2.5" y="2.5" width="11" height="11" rx="2.5"/><path d="M5.5 8.2l1.8 1.8 3.4-3.8"/>'),
  mail: ico('<rect x="2" y="3.5" width="12" height="9" rx="2"/><path d="M2.5 4.5L8 8.5l5.5-4"/>'),
  spark: ico('<path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M12 4l-2 2M6 10l-2 2"/>'),
  lock: ico('<rect x="3" y="7" width="10" height="7" rx="2"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/>'),
  doc: ico('<path d="M4 2h5l3 3v9H4z"/><path d="M9 2v3h3M6 9h4M6 11.5h3"/>'),
  cal: ico('<rect x="2.5" y="3.5" width="11" height="10" rx="2"/><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3"/>'),
  merge: ico('<path d="M3 3l5 5 5-5M8 8v6"/>'),
  fields: ico('<path d="M2.5 4h4M2.5 8h4M2.5 12h4M9.5 4h4M9.5 8h4M9.5 12h4M6.5 4h3M6.5 8h3"/>'),
  chart: ico('<path d="M3 13.5h10M4.5 11V8M8 11V4.5M11.5 11V7"/>'),
  route: ico('<circle cx="4" cy="4" r="1.6"/><circle cx="12" cy="12" r="1.6"/><path d="M5.6 4h3.4a2.5 2.5 0 0 1 0 5H7a2.5 2.5 0 0 0 0 5h3.4"/>'),
  form: ico('<rect x="3" y="2.5" width="10" height="11" rx="2"/><path d="M5.5 6h5M5.5 8.5h5M5.5 11h3"/>'),
};
const OK = `<svg class="ok" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>`;
const sk = (w) => `<i class="sk" style="width:${w}%"></i>`;

// One line of activity that appears at step `s` of the scene's loop.
const row = (icon, text, s, tail = OK) => `<div class="sc-row sq s${s}"><span class="ic">${I[icon]}</span><span class="tx">${esc(text)}</span>${tail}</div>`;

/* ---------- hero scenes ---------- */

function pipeline(cfg) {
  const crm = cfg.crm ? mark(cfg.crm) : "";
  const deal = `<div class="sc-deal">${sk(80)}${sk(50)}</div>`;
  const col = (label, n) => `<div class="sc-col"><span class="h">${label}</span><span class="slot"></span>${deal.repeat(n)}</div>`;
  return `<div class="sc-card back">
    <div class="sc-head"><span class="sc-title">${crm}<span>${cfg.crm ? "Pipeline" : "Your CRM pipeline"}</span></span><span class="sc-chip live">Live</span></div>
    <div class="sc-board">${col("New", 2)}${col("Qualified", 1)}${col("Proposal", 2)}${col("Won", 1)}<div class="sc-mover"><i class="sk" style="width:76%"></i><i class="sk" style="width:46%"></i></div></div>
    <div class="sc-toast"><span class="dot"></span>Deal moved to Won</div>
  </div>
  <div class="sc-card front">
    <div class="sc-head"><span class="sc-title"><span class="av">${I.user}</span><span>Contact record</span></span><span class="sc-sub">Today</span></div>
    <div class="sc-rows">${row("route", "Owner assigned, in turn", 1)}${row("phone", "Call logged with the recording", 3)}${row("mail", "Sequence stopped on reply", 5)}${row("task", "Follow-up task set", 7)}</div>
  </div>`;
}

function call(cfg) {
  const phone = mark(cfg.phone);
  const crm = cfg.crm ? mark(cfg.crm) : "";
  return `<div class="sc-card back sc-call">
    <div class="sc-head"><span class="sc-title">${phone}</span><span class="sc-sub">Main line</span></div>
    <div class="sc-states">
      <div class="st st1"><span class="ring">${I.phone}<i></i><i></i></span><span><b>Incoming call</b><span class="sc-sub">Known contact</span></span><span class="pills"><span class="p a">Answer</span></span></div>
      <div class="st st2"><span class="ring on">${I.phone}</span><span><b>On the call</b><span class="sc-sub">Recording</span></span><span class="wave">${"<i></i>".repeat(9)}</span></div>
      <div class="st st3"><span class="ring done">${OK}</span><span><b>Call ended</b><span class="sc-sub">Sent to the CRM</span></span></div>
    </div>
  </div>
  <div class="sc-card front">
    <div class="sc-head"><span class="sc-title">${crm}<span>Contact record</span></span><span class="sc-chip live">Synced</span></div>
    <div class="sc-rows">${row("user", "Caller matched to the contact", 1)}${row("phone", "Call logged on the contact", 5)}${row("doc", "Recording attached", 6)}${row("task", "Missed calls become callback tasks", 7)}</div>
  </div>`;
}

function receptionist() {
  return `<div class="sc-card back">
    <div class="sc-head"><span class="sc-title"><span class="av">${I.phone}</span><span>AI receptionist</span></span><span class="wave sm">${"<i></i>".repeat(7)}</span></div>
    <div class="sc-chat">
      <p class="b ai sq s1">Thanks for calling. How can I help?</p>
      <p class="b you sq s2">I'd like to book a visit next week.</p>
      <p class="b ai sq s3">Tuesday morning is open. Shall I book it?</p>
      <p class="b you sq s4">Yes, please.</p>
    </div>
  </div>
  <div class="sc-card front">
    <div class="sc-head"><span class="sc-title"><span>After the call</span></span><span class="sc-sub">Rules you set</span></div>
    <div class="sc-rows">${row("cal", "Appointment booked", 5)}${row("doc", "Summary on the CRM record", 6)}${row("task", "Callback task for the owner", 7)}</div>
  </div>`;
}

function agent(cfg) {
  const crm = mark(cfg.crm || "HubSpot");
  return `<div class="sc-card back">
    <div class="sc-head"><span class="sc-title"><span class="av">${I.form}</span><span>New message</span></span><span class="sc-sub">Site form</span></div>
    <p class="sc-quote">We need our phones connected to the CRM, and someone to set it up.</p>
  </div>
  <div class="sc-card front">
    <div class="sc-head"><span class="sc-title"><span class="av sp">${I.spark}</span><span>AI agent</span></span><span class="sc-models">${mark("Claude")}<span class="wm">OpenAI</span></span></div>
    <div class="sc-rows">${row("route", "Read against your fit rules", 1)}<div class="sc-row sq s3"><span class="ic">${I.user}</span><span class="tx">Record created in</span><span class="inl">${crm}</span>${OK}</div><div class="sc-row sq s5 draft"><span class="ic">${I.mail}</span><span class="tx">Reply drafted<span class="typing">${sk(92)}${sk(70)}</span></span></div></div>
    <div class="sc-approve sq s7"><span class="sc-sub">A rep approves before it is sent</span><span class="pills"><span class="p b">Edit</span><span class="p a">Approve</span></span></div>
  </div>`;
}

function connect(cfg) {
  const pos = [[16, 20], [84, 20], [50, 10], [15, 82], [85, 82]];
  const spokes = cfg.spokes.slice(0, 5);
  const lines = spokes.map((_, i) => `<line x1="${pos[i][0]}" y1="${pos[i][1]}" x2="50" y2="50" vector-effect="non-scaling-stroke"/>`).join("");
  const nodes = spokes.map(([name, label], i) => `<span class="nd" style="left:${pos[i][0]}%;top:${pos[i][1]}%">${hasMark(name) ? mark(name) : `<span class="wm">${esc(name)}</span>`}<em>${esc(label)}</em></span>`).join("");
  return `<div class="sc-card back sc-net">
    <div class="sc-diagram"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>${nodes}<span class="nd hub" style="left:50%;top:50%">${mark(cfg.hub)}</span></div>
  </div>
  <div class="sc-card front">
    <div class="sc-head"><span class="sc-title"><span>Runs on its own</span></span><span class="sc-chip live">Documented</span></div>
    <div class="sc-rows">${cfg.events.map(([icon, text], i) => row(icon, text, 1 + i * 2)).join("")}</div>
  </div>`;
}

function migration() {
  const lines = (n) => Array.from({ length: n }, (_, i) => `<span class="ln${i === 1 || i === 2 ? " dup" : ""}">${sk(70 - (i % 3) * 12)}</span>`).join("");
  const target = ["HubSpot", "monday.com", "Close"].map(mark).join("");
  return `<div class="sc-card back sc-move">
    <div class="sc-pair">
      <div class="side"><span class="sc-sub">Old CRM and spreadsheets</span><div class="lns">${lines(5)}</div></div>
      <span class="flow" aria-hidden="true"><i></i></span>
      <div class="side new"><span class="sc-sub">New CRM</span><div class="lns">${Array.from({ length: 4 }, (_, i) => `<span class="ln sq s${2 + i}">${sk(70 - (i % 3) * 12)}</span>`).join("")}</div></div>
    </div>
    <div class="sc-targets">${target}</div>
  </div>
  <div class="sc-card front">
    <div class="sc-rows">${row("fields", "Fields mapped in writing", 1)}${row("merge", "Duplicates merged", 3)}${row("task", "Test import checked", 5)}${row("lock", "Old system read-only", 7)}</div>
  </div>`;
}

function audit() {
  const areas = [["Pipeline stages", "Fix", "fx"], ["Lead routing", "Fix", "fx"], ["Workflows", "Rebuild", "rb"], ["Reports", "Keep", "kp"], ["Connected tools", "Keep", "kp"]];
  return `<div class="sc-card back sc-audit">
    <div class="sc-head"><span class="sc-title">${mark("HubSpot")}<span>Account review</span></span><span class="sc-chip">Read only</span></div>
    <div class="sc-list"><span class="scan" aria-hidden="true"></span>${areas.map(([a, s, c], i) => `<div class="it"><span>${a}</span><span class="tag ${c} sq s${1 + i * 2}">${s}</span></div>`).join("")}</div>
  </div>
  <div class="sc-card front">
    <div class="sc-rows">${row("doc", "Written findings", 7)}${row("lock", "Nothing changes until you choose", 8)}</div>
  </div>`;
}

const SCENES = {
  "crm-implementation": { kind: "pipeline", label: "A CRM pipeline with a deal moving through to won, and a contact record where the owner is assigned, the call is logged with its recording, the sequence stops on a reply and a follow-up task is set." },
  "hubspot-implementation": { kind: "pipeline", crm: "HubSpot" },
  "monday-crm-implementation": { kind: "pipeline", crm: "monday.com" },
  "close-crm-implementation": { kind: "pipeline", crm: "Close" },
  "gohighlevel-setup": { kind: "pipeline", crm: "HighLevel" },
  "crm-migration": { kind: "migration", label: "Records moving from an old CRM and spreadsheets into a new CRM, with fields mapped, duplicates merged, a test import checked and the old system set to read-only." },
  "hubspot-audit": { kind: "audit", label: "A HubSpot account review marking pipeline stages and lead routing to fix, workflows to rebuild, and reports and connected tools to keep, with written findings and nothing changed until you choose." },
  "zapier-consultant": { kind: "connect", hub: "Zapier", spokes: [["Web form", "Forms"], ["HubSpot", "CRM"], ["Dialpad", "Calls"], ["lemlist", "Outreach"], ["Databox", "Reporting"]], events: [["form", "Form submitted, record created"], ["mail", "Reply received, sequence stopped"], ["chart", "Deal won, dashboard updated"]] },
  "crm-integration": { kind: "connect", hub: "HubSpot", spokes: [["Dialpad", "Calls"], ["lemlist", "Outreach"], ["Web form", "Forms"], ["Claude", "AI agent"], ["Databox", "Reporting"]], events: [["phone", "Call ended, logged on the record"], ["mail", "Reply received, sequence stopped"], ["form", "Form submitted, owner assigned"]] },
  "business-phone-systems": { kind: "call", phone: "Dialpad" },
  "hubspot-phone-integration": { kind: "call", phone: "CloudTalk", crm: "HubSpot" },
  "ringcentral-hubspot-integration": { kind: "call", phone: "RingCentral", crm: "HubSpot" },
  "aircall-hubspot-integration": { kind: "call", phone: "Aircall", crm: "HubSpot" },
  "ai-receptionist": { kind: "receptionist", label: "An AI receptionist answering a call and booking an appointment, then the appointment booked, a summary on the CRM record and a callback task for the owner." },
  "ai-agents": { kind: "agent", crm: "HubSpot" },
  "hubspot-ai-integration": { kind: "agent", crm: "HubSpot" },
};

const KIND = { pipeline, call, receptionist, agent, connect, migration, audit };

function sceneLabel(cfg) {
  if (cfg.label) return cfg.label;
  if (cfg.kind === "pipeline") return `A ${cfg.crm} pipeline with a deal moving through to won, and a contact record where the owner is assigned, the call is logged with its recording, the sequence stops on a reply and a follow-up task is set.`;
  if (cfg.kind === "call") return `An incoming call on ${cfg.phone}, answered and recorded, then logged on the ${cfg.crm || "CRM"} contact record with the recording attached.`;
  if (cfg.kind === "agent") return `A message from the site form read by an AI agent against your fit rules, a record created in ${cfg.crm}, and a reply drafted for a rep to approve before it is sent.`;
  if (cfg.kind === "connect") return `${cfg.hub} connected to ${cfg.spokes.map((s) => s[0]).join(", ")}, with activity passing between them on its own.`;
  return "";
}

export function heroScene(slug, group) {
  const cfg = SCENES[slug] || { kind: group === "integration" ? "connect" : "pipeline", crm: "HubSpot", hub: "HubSpot", spokes: SCENES["crm-integration"].spokes, events: SCENES["crm-integration"].events };
  return `<div class="hero-scene" data-hero style="--i:4" role="img" aria-label="Illustration: ${esc(sceneLabel(cfg))}">
  <div class="scene sc-${cfg.kind}" aria-hidden="true">
  ${KIND[cfg.kind](cfg)}
  </div>
</div>`;
}

/* ---------- moving band of vendor tiles ---------- */

const TILES = [
  { n: "HubSpot", t: "Set up", main: "Pipeline stages with written rules", sub: "When a deal moves, and why", k: ["crm"] },
  { n: "monday.com", t: "Set up", main: "Form to record to rep", sub: "Assigned in turn", k: ["crm", "automation"] },
  { n: "Close", t: "Set up", main: "Sequences that stop on a reply", sub: "Sent from the rep's own inbox", k: ["crm", "outreach"] },
  { n: "HighLevel", t: "Set up", main: "Calendar booking on the record", sub: "The owner gets the task", k: ["crm"] },
  { n: "Dialpad", t: "Connect", main: "Call logged with the recording", sub: "Nobody typed it", k: ["phone", "crm"] },
  { n: "CloudTalk", t: "Connect", main: "Missed call becomes a callback task", sub: "Owner set on the record", k: ["phone"] },
  { n: "Aircall", t: "Connect", main: "Caller matched to the CRM record", sub: "The rep sees who is calling", k: ["phone"] },
  { n: "RingCentral", t: "Connect", main: "Dialled from the CRM record", sub: "No copying numbers across", k: ["phone"] },
  { n: "Kixie", t: "Connect", main: "Call list dialled from the CRM", sub: "Every call on the record", k: ["phone", "outreach"] },
  { n: "Zoom", t: "Buy", main: "Phone system quoted and ordered", sub: "On the supplier's own terms", k: ["phone"] },
  { n: "Vonage", t: "Choose", main: "Phone system checked for CRM fit", sub: "Before anything is signed", k: ["phone"] },
  { n: "Cisco", t: "Choose", main: "Contact centre options compared", sub: "Fit and cost, side by side", k: ["phone"] },
  { n: "lemlist", t: "Connect", main: "Sequence stops when they reply", sub: "Reply lands on the record", k: ["outreach", "automation"] },
  { n: "Instantly", t: "Connect", main: "Replies routed to the right rep", sub: "Logged on the contact", k: ["outreach"] },
  { n: "Zapier", t: "Connect", main: "Signed contract moves the deal", sub: "Stage updated on its own", k: ["automation"] },
  { n: "Zapier", t: "Connect", main: "Web form becomes a CRM record", sub: "With an owner from the start", k: ["automation", "crm"] },
  { n: "Claude", t: "Connect", main: "Follow-up drafted after the call", sub: "A rep approves and sends", k: ["ai"] },
  { n: "OpenAI", t: "Connect", main: "Handover note drafted for support", sub: "A person checks it first", k: ["ai"] },
  { n: "Claude", t: "Connect", main: "Inbound lead read against your rules", sub: "Qualified, or answered politely", k: ["ai"] },
  { n: "Fireflies.ai", t: "Connect", main: "Call notes written to the record", sub: "Next step set as a task", k: ["ai", "crm", "phone"] },
  { n: "Databox", t: "Connect", main: "The week on one screen", sub: "Pulled from the CRM and phones", k: ["reporting"] },
  { n: "HubSpot", t: "Review", main: "Leads with no owner, found", sub: "Fix proposed in writing", k: ["audit"] },
  { n: "HubSpot", t: "Review", main: "Workflows that conflict, listed", sub: "Keep, fix or rebuild", k: ["audit"] },
  { n: "HubSpot", t: "Review", main: "Reports rebuilt around real questions", sub: "The ones the owner reads", k: ["audit", "reporting"] },
  { n: "Spreadsheets", t: "Move", main: "Duplicates merged on the way in", sub: "Checked against the source", k: ["migration"] },
  { n: "HubSpot", t: "Move", main: "Test import checked first", sub: "Old system stays read-only", k: ["migration"] },
  { n: "monday.com", t: "Move", main: "Fields mapped in writing", sub: "Before anything is imported", k: ["migration"] },
  { n: "Tidio", t: "Connect", main: "Site chat answers the first question", sub: "Hands the rest to a person", k: ["ai", "receptionist"] },
  { n: "Freshdesk", t: "Connect", main: "Support ticket beside the deal", sub: "One record per customer", k: ["automation", "crm"] },
  { n: "PolyAI", t: "Choose", main: "Voice agents compared on real calls", sub: "Handover rules in writing", k: ["receptionist"] },
  { n: "CloudTalk", t: "Route", main: "Caller sent to the right queue", sub: "By rules you set", k: ["receptionist", "phone"] },
  { n: "Calendar", t: "Book", main: "Appointment booked from the call", sub: "In the calendar you connect", k: ["receptionist"] },
  { n: "Genesys", t: "Choose", main: "Contact centre must-haves listed", sub: "Channels, hours, reporting", k: ["phone"] },
];

const TOPICS = {
  "crm-implementation": ["crm", "phone", "outreach", "reporting", "ai"],
  "hubspot-implementation": ["crm", "phone", "outreach", "reporting", "automation"],
  "monday-crm-implementation": ["crm", "automation", "phone", "reporting"],
  "close-crm-implementation": ["crm", "outreach", "phone"],
  "gohighlevel-setup": ["crm", "automation", "outreach"],
  "crm-migration": ["migration", "crm"],
  "hubspot-audit": ["audit", "crm", "automation", "reporting"],
  "zapier-consultant": ["automation", "crm", "outreach", "reporting"],
  "business-phone-systems": ["phone"],
  "ai-receptionist": ["receptionist", "phone", "ai"],
  "ai-agents": ["ai", "automation", "crm"],
  "crm-integration": ["automation", "phone", "outreach", "reporting", "ai"],
  "hubspot-phone-integration": ["phone", "crm"],
  "ringcentral-hubspot-integration": ["phone", "crm"],
  "aircall-hubspot-integration": ["phone", "crm"],
  "hubspot-ai-integration": ["ai", "crm"],
};

// The band is drawn in the browser from a small JSON block, like the homepage band, so its decorative text is
// not read as page copy. Each tile's mark is sent once; the script doubles each row for a seamless loop.
export function tileBand(slug, platformNames = []) {
  const topics = TOPICS[slug] || ["crm", "automation", "phone"];
  const named = new Set(platformNames.map((n) => n.replace(" CRM", "")));
  const score = (t) => topics.reduce((a, k, i) => a + (t.k.includes(k) ? 10 - i : 0), 0) + (named.has(t.n) ? 6 : 0);
  const pick = TILES.map((t, i) => ({ t, i, s: score(t) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.t).slice(0, 16);
  for (const t of TILES) { if (pick.length >= 12) break; if (!pick.includes(t)) pick.push(t); }
  const marks = {};
  for (const t of pick) if (!marks[t.n]) marks[t.n] = mark(t.n);
  const data = { marks, rows: [pick.filter((_, i) => i % 2 === 0), pick.filter((_, i) => i % 2 === 1)].map((r) => r.map((t) => [t.n, t.t, t.main, t.sub])) };
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return `<section class="rows-band lp-band" aria-hidden="true">
  <div class="rows"><div class="row row-l"></div><div class="row row-r"></div></div>
  <script type="application/json" class="band-data">${json}</script>
  <script>
  (function () {
    var band = document.currentScript.parentNode, d = JSON.parse(band.querySelector(".band-data").textContent);
    var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); };
    var tile = function (t) { return '<div class="tile"><div class="tile-top">' + d.marks[t[0]] + '<span class="tile-time">' + esc(t[1]) + '</span></div><div class="tile-main">' + esc(t[2]) + '</div><div class="tile-sub"><span class="dot"></span>' + esc(t[3]) + '</div></div>'; };
    band.querySelectorAll(".row").forEach(function (row, i) { var h = d.rows[i].map(tile).join(""); row.innerHTML = h + h; });
  })();
  </script>
</section>`;
}

/* ---------- platform logo tiles ---------- */

export function logoWall(names) {
  return `<ul class="logo-wall" data-reveal-group>
${names.map((n) => `      <li>${hasMark(n) ? `<span class="lw" aria-hidden="true">${mark(n)}</span><span class="vh">${esc(n)}</span>` : `<span class="wm">${esc(n)}</span>`}</li>`).join("\n")}
    </ul>`;
}

/* ---------- illustrations for steps and cards ---------- */

let ILLOS = {};
const STEP = [
  [/free (first )?call/i, "call"], [/shortlist/i, "fill"], [/proposal|scope in writing/i, "proposal"], [/purchase/i, "software"],
  [/approval|rules/i, "lock"], [/^map/i, "map"], [/review/i, "search"], [/findings/i, "disclose"], [/fixes/i, "checklist"],
  [/connect and test|connected|^connect/i, "link"], [/set ?up|build|built/i, "work"], [/test/i, "checklist"],
  [/data|switch|clean|moved/i, "movein"], [/hand(ed)? ?over|handover/i, "key"], [/train/i, "chat"], [/support/i, "support"],
];
export function stepIllo(title) {
  const hit = STEP.find(([re]) => re.test(title));
  return ILLOS[hit ? hit[1] : "checklist"];
}

const CARD = {
  "crm-implementation": "crm", "hubspot-implementation": "crm", "monday-crm-implementation": "map", "close-crm-implementation": "email",
  "gohighlevel-setup": "calendar", "crm-migration": "movein", "hubspot-audit": "search", "zapier-consultant": "hub",
  "business-phone-systems": "call", "ai-receptionist": "voice", "ai-agents": "ai", "crm-integration": "link",
  "hubspot-phone-integration": "inbound", "ringcentral-hubspot-integration": "call", "aircall-hubspot-integration": "inbound", "hubspot-ai-integration": "ai",
};
export const cardIllo = (slug) => ILLOS[CARD[slug] || "checklist"];

export function initVisuals(homeHtml, illoFile) {
  MARKS = loadMarks(homeHtml);
  ILLOS = JSON.parse(readFileSync(illoFile, "utf8"));
}

/* ---------- styles ---------- */

const seq = Array.from({ length: 9 }, (_, i) => {
  const s = i + 1, a = 2 + s * 8, b = a + 4;
  return `.scene .s${s} { animation-name: sc-s${s}; }\n@keyframes sc-s${s} { 0%, ${a}% { opacity: 0; transform: translateY(6px); } ${b}%, 93% { opacity: 1; transform: none; } 99%, 100% { opacity: 0; transform: none; } }`;
}).join("\n");

export const VISUAL_CSS = `
/* ---- Landing page visuals (site/visuals.mjs) ---- */
.vh { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.hero-lp .wrap { grid-template-columns: minmax(0, 1fr) minmax(0, .9fr); align-items: center; }
.hero-lp .hero-copy { max-width: 36rem !important; }
.hero-lp h1 { font-size: clamp(2.3rem, 4vw, 3.4rem); }
@media (max-width: 1000px) { .hero-lp .wrap { grid-template-columns: 1fr; } .hero-scene { max-width: 560px; } }
.hero-scene { min-width: 0; }
.scene { position: relative; display: grid; gap: 0; font-family: var(--ui); font-size: .8rem; color: var(--fg); min-width: 0; }
.scene .sk { display: block; height: 6px; border-radius: 3px; background: rgba(243, 236, 220, .13); }
.sc-card { position: relative; background: linear-gradient(180deg, #26211C, #1B1815); border: 1px solid var(--ln); border-radius: 14px; padding: 16px; display: grid; gap: 12px; align-content: start; min-width: 0; box-shadow: inset 0 1px 0 rgba(243, 236, 220, .06), 0 30px 70px -36px rgba(0, 0, 0, .95); --knock: #211C18; }
.sc-card.back { margin-right: 14%; padding-bottom: 42px; }
.sc-card.front { margin-left: 14%; margin-top: -28px; z-index: 1; background: linear-gradient(180deg, #2B2520, #201B17); }
.sc-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-width: 0; }
.sc-title { display: inline-flex; align-items: center; gap: 9px; font-weight: 600; font-size: .86rem; min-width: 0; }
.scene .lg { height: 15px; width: auto; color: rgba(243, 236, 220, .9); }
.scene .lg-cloudtalk { height: 11px; } .scene .lg-zoom { height: 10px; } .scene .lg-cisco { height: 18px; } .scene .lg-dialpad, .scene .lg-databox { height: 17px; } .scene .lg-hubspot { height: 15px; } .scene .lg-zapier { height: 14px; }
.scene .mk { display: inline-flex; align-items: center; gap: 6px; } .scene .mk .lg { height: 15px; }
.scene .wm { font-weight: 700; letter-spacing: -0.01em; color: rgba(243, 236, 220, .92); white-space: nowrap; }
.sc-sub { color: var(--fg-soft); font-size: .7rem; display: block; }
.sc-chip { font-size: .64rem; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--ln); color: var(--fg-muted); white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; }
.sc-chip.live::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--green-light); animation: sc-blink 1.6s ease-in-out infinite; }
.av { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: rgba(243, 236, 220, .08); color: var(--fg-muted); flex: none; }
.av svg { width: 14px; height: 14px; } .av.sp { background: rgba(217, 119, 71, .16); color: var(--terracotta-light); }
.sc-rows { display: grid; gap: 7px; }
.sc-row { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 9px; background: rgba(243, 236, 220, .04); border: 1px solid var(--ln); min-width: 0; }
.sc-row .ic { width: 24px; height: 24px; border-radius: 7px; display: grid; place-items: center; background: rgba(217, 119, 71, .15); color: var(--terracotta-light); flex: none; }
.sc-row .ic svg { width: 13px; height: 13px; }
.sc-row .tx { flex: 1; min-width: 0; }
.sc-row .inl { display: inline-flex; align-items: center; }
.scene .ok { width: 16px; height: 16px; color: var(--green-light); flex: none; }
.scene .sq { animation-duration: 10s; animation-timing-function: ease-out; animation-iteration-count: infinite; animation-fill-mode: both; }
${seq}
@keyframes sc-blink { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
.pills { display: inline-flex; gap: 6px; flex: none; }
.pills .p { padding: 6px 12px; border-radius: 999px; font-size: .72rem; font-weight: 600; white-space: nowrap; }
.pills .a { background: var(--terracotta); color: var(--cream); } .pills .b { border: 1px solid var(--ln-strong); color: var(--fg-muted); }

/* pipeline */
.sc-board { position: relative; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.sc-col { display: grid; gap: 6px; align-content: start; min-height: 128px; padding: 8px 6px; border-radius: 9px; background: rgba(243, 236, 220, .035); min-width: 0; }
.sc-col .h { height: 12px; line-height: 12px; font-size: .62rem; color: var(--fg-soft); font-weight: 600; letter-spacing: .04em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sc-col .slot { height: 34px; border-radius: 7px; border: 1px dashed rgba(243, 236, 220, .14); }
.sc-deal { height: 34px; border-radius: 7px; background: rgba(243, 236, 220, .06); border: 1px solid var(--ln); padding: 8px 7px; display: grid; gap: 6px; align-content: start; }
.sc-mover { position: absolute; left: 6px; top: 26px; height: 34px; width: calc((100% - 24px) / 4 - 12px); border-radius: 7px; padding: 8px 7px; display: grid; gap: 6px; align-content: start; border: 1px solid var(--green-light); background: rgba(127, 169, 139, .24); box-shadow: 0 10px 24px -12px rgba(0, 0, 0, .9); transform: translateX(calc(300% + 60px)); animation: sc-move 10s cubic-bezier(.6, 0, .25, 1) infinite, sc-won 10s linear infinite; }
.sc-mover .sk { background: rgba(243, 236, 220, .4); }
@keyframes sc-move { 0%, 12% { transform: translateX(0); opacity: 1; } 18%, 30% { transform: translateX(calc(100% + 20px)); } 36%, 48% { transform: translateX(calc(200% + 40px)); } 54%, 93% { transform: translateX(calc(300% + 60px)); opacity: 1; } 98% { transform: translateX(calc(300% + 60px)); opacity: 0; } 99% { transform: translateX(0); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
@keyframes sc-won { 0%, 53% { border-color: var(--terracotta-light); background: rgba(217, 119, 71, .22); } 56%, 100% { border-color: var(--green-light); background: rgba(127, 169, 139, .24); } }
.sc-toast { justify-self: end; display: inline-flex; align-items: center; gap: 8px; font-size: .72rem; color: var(--fg-muted); animation: sc-toast 10s ease-out infinite both; }
.sc-toast .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-light); }
@keyframes sc-toast { 0%, 55% { opacity: 0; transform: translateY(5px); } 59%, 93% { opacity: 1; transform: none; } 99%, 100% { opacity: 0; } }

/* call */
.sc-states { display: grid; }
.sc-states .st { grid-area: 1 / 1; display: flex; align-items: center; gap: 12px; padding: 4px 0 2px; opacity: 0; }
.sc-states .st b { display: block; font-weight: 600; font-size: .92rem; }
.sc-states .st > span:nth-child(2) { flex: 1; min-width: 0; }
.sc-states .st1 { animation: sc-st1 10s linear infinite both; } .sc-states .st2 { animation: sc-st2 10s linear infinite both; } .sc-states .st3 { opacity: 1; animation: sc-st3 10s linear infinite both; }
@keyframes sc-st1 { 0%, 18% { opacity: 1; } 21%, 100% { opacity: 0; } }
@keyframes sc-st2 { 0%, 19% { opacity: 0; } 22%, 38% { opacity: 1; } 41%, 100% { opacity: 0; } }
@keyframes sc-st3 { 0%, 39% { opacity: 0; } 42%, 95% { opacity: 1; } 99%, 100% { opacity: 0; } }
.ring { position: relative; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--terracotta); color: var(--cream); flex: none; }
.ring svg { width: 18px; height: 18px; } .ring.on { background: rgba(127, 169, 139, .3); color: var(--green-light); } .ring.done { background: rgba(127, 169, 139, .18); }
.ring.done .ok { width: 20px; height: 20px; }
.ring i { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--terracotta-light); opacity: 0; animation: sc-ripple 1.6s ease-out infinite; }
.ring i + i { animation-delay: .5s; }
@keyframes sc-ripple { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.9); opacity: 0; } }
.wave { display: inline-flex; align-items: center; gap: 3px; height: 26px; flex: none; }
.wave i { width: 3px; height: 100%; border-radius: 2px; background: var(--green-light); transform-origin: center; animation: sc-wave 1.1s ease-in-out infinite alternate; }
.wave.sm { height: 18px; } .wave.sm i { background: var(--terracotta-light); }
.wave i:nth-child(2n) { animation-delay: .2s; } .wave i:nth-child(3n) { animation-delay: .45s; } .wave i:nth-child(4n) { animation-delay: .1s; } .wave i:nth-child(5n) { animation-delay: .65s; }
@keyframes sc-wave { from { transform: scaleY(.25); } to { transform: scaleY(1); } }

/* receptionist */
.sc-chat { display: grid; gap: 8px; }
.sc-chat .b { margin: 0; padding: 8px 12px; border-radius: 12px; max-width: 82%; line-height: 1.4; font-size: .8rem; }
.sc-chat .ai { background: rgba(243, 236, 220, .07); border: 1px solid var(--ln); border-bottom-left-radius: 4px; justify-self: start; }
.sc-chat .you { background: rgba(217, 119, 71, .2); border-bottom-right-radius: 4px; justify-self: end; }

/* agent */
.sc-quote { margin: 0; padding: 10px 12px; border-radius: 10px; background: rgba(243, 236, 220, .05); border-left: 2px solid var(--terracotta-light); color: var(--fg-muted); font-size: .82rem; line-height: 1.45; }
.sc-models { display: inline-flex; align-items: center; gap: 10px; } .sc-models .wm { font-size: .76rem; }
.sc-row.draft { align-items: flex-start; } .sc-row .typing { display: grid; gap: 6px; margin-top: 7px; }
.sc-row .typing .sk { transform-origin: left; animation: sc-type 10s ease-out infinite both; }
.sc-row .typing .sk + .sk { animation-name: sc-type2; }
@keyframes sc-type { 0%, 46% { transform: scaleX(0); } 54%, 95% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes sc-type2 { 0%, 52% { transform: scaleX(0); } 58%, 95% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
.sc-approve { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-top: 10px; border-top: 1px solid var(--ln); }
.sc-approve .p.a { animation: sc-press 10s ease-in-out infinite; }
@keyframes sc-press { 0%, 80% { box-shadow: 0 0 0 0 rgba(217, 119, 71, 0); } 84% { box-shadow: 0 0 0 6px rgba(217, 119, 71, .25); } 88%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 71, 0); } }

/* connect */
.sc-net { padding: 20px 12px 46px; }
.sc-diagram { position: relative; aspect-ratio: 16 / 10; }
.sc-diagram > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.sc-diagram line { stroke: var(--terracotta-light); stroke-width: 1.5; stroke-linecap: round; stroke-dasharray: 2 7; opacity: .75; animation: sc-flow 1.2s linear infinite; }
@keyframes sc-flow { to { stroke-dashoffset: -9; } }
.sc-diagram .nd { position: absolute; width: max-content; transform: translate(-50%, -50%); display: grid; justify-items: center; gap: 4px; padding: 8px 12px; border-radius: 12px; background: #231E1A; border: 1px solid var(--ln-strong); white-space: nowrap; --knock: #231E1A; }
.sc-diagram .nd em { font-style: normal; font-size: .6rem; color: var(--fg-soft); letter-spacing: .04em; }
.sc-diagram .nd .wm { font-size: .78rem; }
.sc-diagram .hub { padding: 14px 18px; border-color: var(--terracotta-light); background: #2A221C; --knock: #2A221C; animation: sc-glow 2.4s ease-in-out infinite; }
.sc-diagram .hub .lg { height: 20px; } .sc-diagram .hub .wm { font-size: 1rem; }
@keyframes sc-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 71, .0); } 50% { box-shadow: 0 0 0 8px rgba(217, 119, 71, .14); } }

/* migration */
.sc-pair { display: grid; grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr); align-items: center; gap: 6px; }
.sc-pair .side { display: grid; gap: 8px; padding: 10px; border-radius: 10px; background: rgba(243, 236, 220, .035); border: 1px solid var(--ln); min-width: 0; }
.sc-pair .side.new { border-color: rgba(127, 169, 139, .45); }
.sc-pair .lns { display: grid; gap: 6px; }
.sc-pair .ln { display: block; padding: 6px; border-radius: 6px; background: rgba(243, 236, 220, .05); }
.sc-pair .ln.dup { outline: 1px solid rgba(217, 119, 71, .7); background: rgba(217, 119, 71, .12); }
.sc-pair .flow { height: 2px; position: relative; background: repeating-linear-gradient(90deg, var(--terracotta-light) 0 4px, transparent 4px 10px); background-size: 20px 2px; animation: sc-belt .8s linear infinite; }
.sc-pair .flow i { position: absolute; right: -2px; top: -4px; width: 0; height: 0; border-left: 7px solid var(--terracotta-light); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
@keyframes sc-belt { to { background-position: 20px 0; } }
.sc-targets { display: flex; align-items: center; justify-content: flex-end; gap: 16px; padding-top: 2px; }
.sc-targets .lg, .sc-targets .mk .lg { height: 13px; } .sc-targets .wm { font-size: .78rem; }

/* audit */
.sc-list { position: relative; display: grid; border-top: 1px solid var(--ln); overflow: hidden; }
.sc-list .it { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 10px 2px; border-bottom: 1px solid var(--ln); font-size: .82rem; }
.sc-list .tag { font-size: .66rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; }
.tag.fx { background: rgba(217, 119, 71, .2); color: var(--terracotta-light); } .tag.rb { border: 1px solid var(--ln-strong); color: var(--fg); } .tag.kp { background: rgba(127, 169, 139, .2); color: var(--green-light); }
.sc-list .scan { position: absolute; left: 0; right: 0; top: 0; height: 36px; background: linear-gradient(180deg, transparent, rgba(217, 119, 71, .14), transparent); animation: sc-scan 10s ease-in-out infinite; opacity: 0; pointer-events: none; }
@keyframes sc-scan { 0%, 6% { transform: translateY(-36px); opacity: 0; } 10% { opacity: 1; } 52% { transform: translateY(210px); opacity: 1; } 56%, 100% { transform: translateY(210px); opacity: 0; } }

/* moving tile band */
.lp-band .tile { width: 256px; }
.lp-band .tile .lg { height: 15px; } .lp-band .tile .lg-cloudtalk { height: 11px; } .lp-band .tile .lg-zoom { height: 11px; } .lp-band .tile .lg-cisco { height: 20px; }
.lp-band .tile .mk { display: inline-flex; align-items: center; gap: 7px; } .lp-band .tile .mk .lg { height: 15px; }
.lp-band .tile .wm { font-weight: 700; font-size: .88rem; letter-spacing: -0.01em; }

/* platform logo tiles */
.logo-wall { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.logo-wall li { position: relative; height: 76px; display: grid; place-items: center; padding: 0 14px; border-radius: 14px; background: rgba(33, 29, 25, .04); border: 1px solid var(--ln); color: var(--ink); --knock: var(--cream); transition: transform .25s ease, border-color .25s ease, background-color .25s ease; }
.logo-wall li:hover { transform: translateY(-3px); border-color: var(--terracotta); background: rgba(196, 85, 43, .06); }
.logo-wall .lg { height: 22px; max-width: 100%; } .logo-wall .lg-cloudtalk { height: 15px; } .logo-wall .lg-zoom { height: 15px; } .logo-wall .lg-cisco { height: 28px; } .logo-wall .lg-dialpad, .logo-wall .lg-databox { height: 24px; }
.logo-wall .mk { display: inline-flex; align-items: center; gap: 7px; } .logo-wall .mk .lg { height: 22px; }
.logo-wall .wm { font-weight: 700; font-size: 1.05rem; letter-spacing: -0.015em; text-align: center; line-height: 1.15; }
@media (max-width: 520px) { .logo-wall { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

/* illustrations on steps and cards */
.ledger-row.has-illo .illo { width: 64px; height: 50px; }
.ledger-row .who .t { flex: 1 1 0; min-width: 0; }
.ledger-row.has-illo .who { flex-wrap: nowrap; align-items: baseline; }
.rel a .illo { width: 60px; height: 46px; margin-bottom: 4px; }
.rel a { transition: border-color .25s ease, transform .25s ease; } .rel a:hover { transform: translateY(-3px); }

@media (max-width: 560px) {
  .sc-card.back { margin-right: 6%; } .sc-card.front { margin-left: 6%; }
  .scene { font-size: .76rem; } .sc-card { padding: 13px; }
  .sc-col { min-height: 116px; padding: 7px 4px; } .sc-col .h { font-size: .56rem; }
  .sc-mover { left: 4px; width: calc((100% - 24px) / 4 - 8px); transform: translateX(calc(300% + 48px)); }
  @keyframes sc-move { 0%, 12% { transform: translateX(0); opacity: 1; } 18%, 30% { transform: translateX(calc(100% + 16px)); } 36%, 48% { transform: translateX(calc(200% + 32px)); } 54%, 93% { transform: translateX(calc(300% + 48px)); opacity: 1; } 98% { transform: translateX(calc(300% + 48px)); opacity: 0; } 99% { transform: translateX(0); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
  .sc-diagram .nd { padding: 6px 8px; } .sc-diagram .nd em { display: none; } .sc-diagram .hub { padding: 10px 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .scene *, .scene *::before, .scene *::after { animation: none !important; }
  .sc-states .st1, .sc-states .st2 { opacity: 0; }
}
`;
