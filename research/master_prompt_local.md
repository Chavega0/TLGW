# MASTER PROMPT — run in a LOCAL Claude Code session (desktop + Chrome)

Paste everything below into a local session to redo the TLGW client research from zero with real Instagram inspection via Agent Reach.

---

# MASTER PROMPT — The Last Goal Wins: client research for Jaime "Magnet" Bruno

CONTEXT
I run The Last Goal Wins (TLGW), a football/soccer influencer-marketing agency in Toronto.
Our offer: Instagram creator collaborations. First client: Jaime "Magnet" Bruno
(@magnetfreestyle) — Toronto-based pro soccer freestyler, 6x Canadian champion, former
Red Bull Street Style Canada winner, ~21K IG followers, performs at corporate/brand events.
Goal: find his first brand clients in Canada and the US (keep the two markets separate).

STEP 0 — ENVIRONMENT CHECK (hard gate, do this before any research)
This must run on my local computer with Chrome, because Agent Reach reads Instagram
through OpenCLI, which reuses my logged-in Chrome session. Verify, in order:
1. Confirm you are in a LOCAL session (you can see my real filesystem, e.g. my home
   folder — not a cloud container). If not, STOP and tell me.
2. Install Agent Reach from GitHub (NOT the same-named PyPI package):
   `pipx install https://github.com/Panniantong/agent-reach/archive/main.zip`
   (install pipx first if missing; ask me before any --system changes)
3. `agent-reach install --env=auto --system --channels=opencli,instagram`
   Walk me through adding the OpenCLI Chrome extension; confirm with: `opencli doctor`
4. I'll log into instagram.com in Chrome. NOTE: the Agent Reach repo recommends a
   secondary account (automated reading can trigger restrictions) — advise me, my call.
5. Verify: `agent-reach doctor` shows Instagram usable, then test:
   `opencli instagram profile magnetfreestyle -f yaml`
If any step fails, STOP and explain exactly what's needed. NEVER quietly substitute
web-search snippets for actual Instagram inspection; if I explicitly approve a partial
fallback, label every non-inspected claim clearly.

INSTAGRAM HYGIENE (applies to the whole task)
Read-only: never like, follow, comment, message, or buy anything. Low request rate,
back off immediately on 429/login errors. Research only — no outreach of any kind,
no Instantly campaigns.

STEP 1 — MAGNET BASELINE
Inspect @magnetfreestyle: current followers, bio (confirm or refute the "Puma ambassador"
line — this gates whether we can pitch Adidas/Nike), last ~20 posts (dates, brand tags,
paid-partnership labels, content formats, engagement pattern).

STEP 2 — COMPARABLE CREATORS (20–30 total, Canada and US separately)
Football/soccer freestylers, skills/trick-shot creators, trainer-creators with
performance-style content, roughly comparable reach (≈5K–1M; wider in the US).
For each: handle, verified base city (bio/press — never assume their location equals
their audience's location; do NOT invent audience demographics), current followers
(read live), content type. Verify every profile by actually opening it.

STEP 3 — BRAND COLLABORATIONS (last 6 months prioritized)
For each creator, scan roughly the last 6 months of posts/Reels for brand activity.
For every collab record: brand, EXACT post URL, post date, and disclosure type —
"Paid partnership" label vs #ad vs gifted vs affiliate code vs ambassador claim vs
plain mention vs event performance. A disclosure never proves a cash fee — record what
the post shows. Prioritize repeat sponsors and clear commercial partnerships; event
sponsorship alone is a weaker signal. Older evidence allowed only if clearly dated.

STEP 4 — RANKED BRAND LIST (up to 30, quality over quantity)
Qualified brands with campaigns relevant to Canada or the US, ranked within each market.
Per brand: target market, evidence creator(s), exact post link(s) + dates, sponsorship
evidence + strength label (strong/medium/weak), what the content shows, why Magnet fits,
the agency behind the campaign if identifiable (only if a source names it), and one
specific campaign idea for Magnet. Prefer fewer verified prospects over weak filler.

STEP 5 — BUYER CONTACTS
For each ranked brand, use LinkedIn and official company sites to find the relevant
influencer-marketing / creator-partnerships / brand-marketing buyer: name, exact title,
LinkedIn profile URL (only if actually verified — never constructed), evidence source,
recency note ("may be stale" if >18 months). NEVER guess email addresses. If no
individual is verifiable, name the team + official partnership channel instead.

STEP 6 — DELIVERABLES
1. A CSV spreadsheet with all ranked prospects (one row per brand; columns for
   everything in steps 4–5 plus an uncertainties column and verification_date).
2. A short summary: top 5 prospects with reasoning, method notes, and clear labels for
   uncertainties, older evidence, and anything you could not inspect.
Optional cross-check: my repo github.com/chavega0/tlgw, branch
`claude/amazing-davinci-nglraf`, has an earlier web-sourced version in `research/` —
compare at the end and note where live Instagram data contradicts it, but build your
list independently first. Commit your deliverables to that same branch if you have
repo access; otherwise save them locally and tell me where.
