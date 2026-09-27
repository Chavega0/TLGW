# Stamina11 — immersive scroll rebuild
Self-authored under explicit creative delegation ("make it amazing, use best ranked design and cinematic skills").
Built with the scroll-craft method + Emil Kowalski's design-engineering floor.

## The brand (evidence vs. assumption)
Evidence (public sources: stamina11.com search listings, Google Play, Time Out Dubai, LinkedIn):
- Boutique youth sports academy in Dubai (Dubai Studio City), ages 3 to 18, adult programs too.
- Programs: Artistic Gymnastics, Rhythmic Gymnastics, Toddler Gym, Trampoline, Swimming,
  Reformer Pilates, Kickboxing, Jiu-Jitsu; adult gymnastics, calisthenics, strength & conditioning.
- Olympic-level coaches. Motto/email: "make it happen" (makeithappen@stamina11.com).
- Phone +971 4 577 6711. Existing pages: home, book-assessment, careers, blog.
Assumption (site itself blocked from this environment): exact palette and photography style.
Authored decision: cinematic charcoal + bone + signal red, photographic world.

## The eight topics (authored)
1. **Vibe**: disciplined, airborne, cinematic, warm. References: an Olympic broadcast super-slow-mo
   replay; a dance stage under a single followspot; the quiet of a gym at night before a meet.
2. **Journey**: parents land on flight (their kid, airborne) → the honest tension (screens, energy
   with nowhere to go) → the turn (a place built for it) → the range (8 programs) → the proof
   (method + coaches) → the held breath (peak) → one action (Book an assessment).
3. **Energy curve**: calm-open → tightening → release → busy/bright → quiet → SILENT PEAK → resolve.
4. **Feeling curve** (one line per act, emotion then cause):
   - A1 Lift          a child mid-leap between depth planes, the headline passing behind her
   - A2 Recognition   pinned lines naming the parent's actual evening, one at a time
   - A3 Relief        a wipe: the hall, lit, open, waiting
   - A4 Appetite      eight programs travelling sideways, each landing whole
   - A5 Trust         the method in plain type, real coach credentials, real facts only
   - A6 Held breath   THE PEAK: near-empty dark viewport, then a child at the top of a bounce,
                      tiny in one cone of light, and the page holds her there
   - A7 Resolve       everything stops; one line, one red button, the ribbon ties into "11"
5. **The one moment**: "the page went dark, and then a kid just… hung there in a spotlight,
   and it held her in the air as long as I kept my hand still." Lives in A6.
6. **Range from premium-minimal**: premium-cinematic with one loud red thread. Not brutalist,
   not maximalist: parents are the reader.
7. **Structure**: distinct scenes with one connective tissue (the ribbon), NOT one unbroken world.
8. **Assets**: none supplied; fully generated (Higgsfield, one style preamble, 12 shots).

## Grammar: filmic one-shot (burden of proof)
Registry is empty (first build), gate clears trivially. Why the other seven lost:
- Chaptered editorial: parents skim; this brief is an emotional argument, not long-form reading.
- Live surface: there is no software to demo.
- Continuous world: no literal geography; a gym is scenes, not a journey through terrain.
- Typographic poster: the product is visibly physical children flying; hiding the imagery wastes it.
- Gallery/catalog: right for the PROGRAMS page (and used there), wrong for the emotional home.
- Split stage: there is no two-sided argument; nobody is against their kid doing gymnastics.
- Rhythmic cutlist: bans pin and dwell, which kills the held-breath peak this brand earns.

## Signature move: the ribbon
A fixed SVG rhythmic-gymnastics ribbon, drawn by scroll (stroke-dashoffset from page progress),
travelling down the right side of the page, changing hue with the acts, and at the close curling
into the "11" of the wordmark. It is the trace of where you have been and it double-serves as
scroll progress. Coded in the page (site JS reading scroll), engine untouched.

## Tell-someone sentence
"It's the site where a red ribbon follows you all the way down, and at the end it ties itself
into the logo."  (Peak and signature both live on the scroll spine; the peak is the held jump,
the ribbon is what carries you to it.)

## Authored silence
The viewport ~one screen before A6's subject appears is intentionally near-empty (dark, faint
haze, the ribbon dimming). It is the silence in front of the peak, not dead scroll.

## Score
| Act | Beat | Device | Why |
|---|---|---|---|
| A1 | Lift | pin + layered parallax hero + kinetic lines | dimensional layering baseline; headline passes behind the subject |
| A2 | Recognition | pin + crossfading cues | the argument, one line at a time, frame held |
| A3 | Relief | flow + reveal(left) | a wipe is a change of state: the hall opens |
| A4 | Appetite | pan rail (8 programs) + staggered settle | lateral = breadth; the range is the point |
| A5 | Trust | flow + in, tight stagger + count (real figures only) | administrative info compressed |
| A6 | Held breath | pin, LARGEST span, image scale/settle from --sc-p | the peak: most scroll room on the page |
| A7 | Resolve | pin + spotlight + magnet CTA, footer in stage | close holds; ribbon ties into the mark |
Device families: pin, parallax, kinetic, flow/in, reveal, pan, count, spotlight/magnet ( >4, none twice in a row ).

## Pages (useful, all navigable)
- index.html: the experience above.
- programs.html: gallery-grammar catalog; every program with ages, what kids learn, schema labels.
- admissions.html: how joining works (assessment → placement → train), contact CTA.
- about.html: story, method, facility, careers pointer.
- contact.html: location, phone, email, hours, app links.
CTA label everywhere: "Book an assessment".

## Palette + type
canvas #0B0B0E, surface #15151A, ink #F2EFE9, ink-soft #A09E97, accent #E8442E (signal red),
accent-ink #160907. Display: Archivo (800/expanded feel), text: Outfit. No cream-and-brass, no AI purple.
