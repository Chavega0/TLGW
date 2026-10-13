# Post-World Cup brand list — v2 summary (TLGW × Magnet)

**Date:** 2026-10-13 · **File:** `research/brands_post_wc_v2.csv` · **Window:** evidence dated **2026-07-20 or later only** (the day after the World Cup final)

## What's in the file

- **233 brands** with sourced soccer-marketing activity after the World Cup. The best-fitting **200 are marked `core 200`**; the 33 lowest-fit rows (B2B firms, hospitals, utilities, non–North American campaigns) are marked `reserve`.
- **Markets kept separate:** Canada 43 · US + Canada 13 · US 171 · Global with a weak North American tie 6. Ranked within each market (`rank_in_market`).
- **Tiers:**
  - **A** (16): a creator or athlete-influencer was part of the deal.
  - **B** (193): league, club or event sponsorship.
  - **C** (24): soccer-specific product brands.
- **Specific posts:**
  - **40 rows** carry the URL of the post that evidences the sponsorship. Each URL appeared verbatim in indexed search results; none were constructed. The posts are on X, Threads, TikTok and YouTube.
  - **The rest are marked `not indexed - verify locally with Agent Reach`.** Their posts can only be confirmed by opening Instagram itself, which this cloud environment blocks.
  - **No post media was opened.** Every link is labelled "media not opened".
- **Buyer contacts** on 32 rows: named people with title and evidence source. Rows marked "may be stale" use sources older than about 18 months. No emails were guessed; LinkedIn URLs appear only where one actually surfaced.
- Every row also carries a **suggested pitch angle** for Magnet, based on how the brand currently uses soccer.

## The key finding

After July 20, brands largely stopped paying soccer *creators* and went back to paying *properties*: matchday "presented by" nights, kit deals, awards and broadcasts. Searches on the best-known US soccer creators (Brittany Wilson, Matty Farias, Caitlyn Schrepfer, Nick Seyda) found no brand deals dated after July 20. In Canada, no creator campaign at all was found in the window.

For Magnet, that means most of these 233 brands are already spending on soccer but get only a logo out of it. The pitch is to **turn an existing matchday sponsorship into social content**: a Magnet freestyle act at the sponsor's next presented match, plus a branded Instagram Reel. That is far easier to sell than asking a brand to start soccer marketing from scratch.

## Top 5 — Canada

1. **Sport Chek.**
   - **Evidence:** the only Canadian brand with a 2026 soccer *creator* program ("Voice of Soccer" with @increasefootball, June). Canadian Tire's August earnings credit its soccer activations with an 8% sales lift.
   - **Contact:** Scott Dowding, President. No current VP Marketing was found.
   - **Idea:** Magnet as the face of a freestyle "first touch" series at Sport Chek's Toronto stores and its Harbourfront futsal pitch.
2. **TELUS.**
   - **Evidence:** title sponsor of the Canadian Championship (final Oct 21, CF Montréal v Forge). It also presented Whitecaps, Pacific FC and Vancouver Rise nights in Aug–Sep. Post linked: the Whitecaps' semifinal post on X.
   - **Contact:** Jill Schnarr (2023, may be stale). Also the TELUS sports-sponsorship channel.
   - **Idea:** a 2027 Canadian Championship creator layer. Magnet freestyles in each host city with "TELUS Cup Tricks" Reels.
3. **EB Games Canada.**
   - **Evidence:** presented the CPL Nickelodeon matchdays (Aug–Sep) and is FC Supra's front-of-kit sponsor.
   - **Contact:** Jim Tyo, President (May 2025). No marketing lead was found.
   - **Idea:** recreate EA FC 27 skill moves in real life ("FC 27 IRL") as in-store and in-stadium content. It fits gaming retail exactly.
4. **Canadian Tire.**
   - **Evidence:** presented AFC Toronto's Back to Class match at BMO Field (Sep 6) and is a founding Northern Super League partner.
   - **Contact:** Kim Saunders, VP Partnerships (Dec 2024, may be stale).
   - **Idea:** a back-to-school / youth freestyle clinic series at NSL matches.
5. **RBC.**
   - **Evidence:** Wrexham back-of-kit sponsor since Aug 17. A Toronto bank spending on a club that appeals to North American fans.
   - **Contact:** Shannon Cole, Chief Brand Officer (current).
   - **Idea:** a "Toronto to Wrexham" creator bridge. Magnet content for RBC's Canadian audience around the Wrexham deal.

## Top 5 — US / North America

1. **EA SPORTS FC 27.**
   - **Evidence:** creator-led livestream (Sep 15) and launch (Sep 25). Post linked: @EASPORTSFC on X.
   - **Contact:** the Manager, Global Creator & Talent Partnerships role is confirmed; no name found. Apply through the EA Creator Network as well.
   - **Idea:** "FC 27 IRL", where Magnet performs each new skill move in real life.
2. **Red Bull (Wings Cup US).**
   - **Evidence:** an EA FC 27 competition (Sep–Nov) mixing in-game play with physical soccer challenges; World Final in Miami. Video linked.
   - **Contact:** Director, Team Sports Marketing (role only), plus Red Bull Canada's creator-marketing roles. Magnet is a former Red Bull Street Style Canada champion.
   - **Idea:** host or judge the physical-challenge layer of the Wings Cup.
3. **P&G: Old Spice, Gillette and Dawn.**
   - **Evidence:** each presented a skills event at the MLS All-Star Skills Challenge (Jul 28): Goalie Wars, Crossbar Challenge and Passing Challenge. Posts linked on @MLS on X and YouTube.
   - **Contact:** Stacey Reherman, Senior Director of Sports Marketing, P&G North America; covers MLS (undated bio, verify).
   - **Idea:** a year-round "Skills Challenge" Reel series between All-Star weeks. Magnet's core format already matches what they sponsor.
4. **AT&T.**
   - **Evidence:** presented the MLS All-Star Skills Challenge featuring creators FaZe Rug and Céline Dept. Posts linked on @MLS on X and TikTok.
   - **Contact:** none verified yet.
   - **Idea:** a creator-vs-creator freestyle challenge for AT&T's MLS content.
5. **On (On Football).**
   - **Evidence:** entered football on Sep 18 with Mbappé and Thierry Henry.
   - **Contacts:** Alice Delahunt (Chief Customer Officer) and Thierry Henry (Director of Football).
   - **Idea:** a new football brand needs creator credibility in North America. Magnet as a seeded launch creator for On's first boots.

Honourable mentions: Dr. Squatch (IShowSpeed campaign, Aug 31 – Oct 31, with Walmart as its retail hub; paid creator post linked), Gerber (new NWSL partner, Aug 5; post linked), Chick-fil-A, DICK'S, GEICO (Leagues Cup Man of the Match; posts linked), KNOX Hydration (US launch via Wrexham).

## Caveats, labelled in the file

- **Instagram not inspected.** No post media was opened. Use `research/instagram_inspection_queue.csv` in a local session with Agent Reach to confirm posts and capture the Instagram permalinks.
- **Estimated dates.** Some post dates are worked out from X, TikTok and Threads post IDs, or from the order of OurSports Central press releases. The `notes` column says so where this applies.
- **Partial matches.** These posts show the event but don't name the brand; they're marked `match=partial`.
- **Ownership check.** Milk2Go may be owned by Saputo, not Agropur.
- **Audience geography.** Magnet's audience-by-country data was not supplied, so geographic fit is still provisional.
- **Disclosures.** A disclosure or "presented by" credit does not prove a cash fee.
