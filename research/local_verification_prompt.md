# Prompt for a LOCAL Claude Code session (desktop, Chrome available)

Paste the following into a local session to run the Instagram verification pass that the cloud session could not perform:

---

I'm on my computer with Chrome. Use Agent Reach to verify the Instagram claims in my agency's prospect research.

SETUP (ask me before system changes):
1. Install Agent Reach from GitHub (NOT the same-named PyPI package):
   `pipx install https://github.com/Panniantong/agent-reach/archive/main.zip`
   (install pipx first if missing)
2. Run: `agent-reach install --env=auto --system --channels=opencli,instagram`
   and walk me through adding the OpenCLI Chrome extension.
3. I'll log into instagram.com in Chrome (possibly a secondary account — advise me on risk).
   Confirm readiness: `agent-reach doctor`, then: `opencli instagram profile [client Instagram] -f yaml`
   Keep request rates low; back off immediately on 429/login errors.

THEN pull the research: clone github.com/chavega0/tlgw, check out branch
`claude/amazing-davinci-nglraf`, and read `research/prospects.csv`,
`research/evidence_notes.md` and `research/summary.md`.

VERIFY (read-only on Instagram — do NOT like, follow, comment or message):
1. [client Instagram] — current follower count, full bio (does it actually say Puma
   ambassador?), last 10 posts: dates, brand tags, any "Paid partnership" labels.
2. Every creator handle in the CSV — handle exists, current followers, base city per bio.
3. For every row whose instagram_post_link says "Not found": scan that creator's last
   6 months of posts for the named brand; record the exact post URL, date, and the
   disclosure type ("Paid partnership" label vs #ad vs gifted vs plain mention).
   A disclosure is not proof of a cash fee — label it as what it shows.
4. Update the CSV (fill links, correct follower counts, add a `verification_date`
   column), flag anything that doesn't check out instead of deleting it, then commit
   to the same branch: "Verify prospects via Agent Reach Instagram inspection" and push.
