import { motion } from "framer-motion";
import { Mark } from "./Logo";
import { Rise, EASE } from "./motion";

/* Dedicated partners page: every platform we hold a partner or
   referral relationship with — what it does, what it costs, and the
   benefits of signing up through Stacktik. The discounts never depend
   on buying implementation; that stays explicit on this page. */

type Partner = {
  name: string;
  style: React.CSSProperties;
  category: string;
  blurb: string;
  pricing: string;
  pricingNote: string;
};

const PARTNERS: Partner[] = [
  {
    name: "CloudTalk",
    style: { fontWeight: 700, letterSpacing: "-0.02em" },
    category: "Business calling",
    blurb: "Cloud phone system for sales and support teams — smart routing, call recording, dialers, and deep CRM integrations.",
    pricing: "From $25/user/mo",
    pricingNote: "Starter · Essential $29 · Expert $49 (annual billing)",
  },
  {
    name: "Apollo",
    style: { fontWeight: 600, letterSpacing: "0.01em" },
    category: "Prospecting & outreach",
    blurb: "B2B contact database and sales engagement — find the right buyers, then sequence emails and calls from one place.",
    pricing: "Free plan · paid from $49/user/mo",
    pricingNote: "Basic $49 · Professional $79 (annual billing)",
  },
  {
    name: "Instantly",
    style: { fontWeight: 700, fontStyle: "italic" },
    category: "Cold email at scale",
    blurb: "Outbound email infrastructure — unlimited sending accounts, warm-up, and deliverability tooling for serious volume.",
    pricing: "From $37/mo",
    pricingNote: "Growth · Hypergrowth $78/mo (annual billing, per workspace)",
  },
  {
    name: "JustCall",
    style: { fontWeight: 700, letterSpacing: "-0.01em" },
    category: "Calling & SMS",
    blurb: "Phone, SMS, and AI call intelligence for customer-facing teams, wired into your CRM and helpdesk.",
    pricing: "From $29/user/mo",
    pricingNote: "Team · Pro $49 · Pro Plus $89 (annual billing)",
  },
  {
    name: "Pipedrive",
    style: { fontWeight: 600 },
    category: "Sales CRM",
    blurb: "Pipeline-first CRM that salespeople actually keep updated — visual deals, automations, and clean reporting.",
    pricing: "From $14/seat/mo",
    pricingNote: "Lite · Growth $39 · Premium $59 (annual billing)",
  },
  {
    name: "Zoho",
    style: { fontWeight: 800, letterSpacing: "0.02em" },
    category: "CRM & business suite",
    blurb: "CRM plus a full suite — desk, campaigns, books — when you want one vendor behind the whole operation.",
    pricing: "From $14/user/mo",
    pricingNote: "Standard · Professional $23 · Enterprise $40 (annual billing)",
  },
  {
    name: "Close",
    style: { fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const },
    category: "CRM with built-in calling",
    blurb: "CRM made for inside sales — calling, SMS, and email live inside the pipeline, built for high-outreach teams.",
    pricing: "From $9/user/mo",
    pricingNote: "Solo · Essentials $35 · Growth $99 (annual billing)",
  },
];

const BENEFITS = [
  "Partner discount through our referral link or code",
  "Preferred-partner benefits negotiated for Stacktik clients",
  "The right plan for your team size — so you never overbuy",
];

function PillLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-full bg-terracotta py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-cream transition-all hover:gap-4"
    >
      {children}
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-terracotta-deep transition-transform group-hover:scale-110"
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export function PartnersPage() {
  return (
    <div className="min-h-svh">
      <header className="t-hairline border-b">
        <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
          <a href="/" aria-label="Stacktik home" className="flex items-center gap-2 select-none">
            <Mark color="#C4552B" size={20} />
            <span className="t-text text-[1.05rem] font-semibold tracking-tight leading-none">
              stack<span className="text-terracotta">tik</span>
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="t-muted hidden text-[0.84rem] font-medium transition-colors hover:text-terracotta sm:block">
              ← Back to site
            </a>
            <a
              href="/blueprint/"
              className="rounded-full bg-terracotta px-4 py-1.5 text-[0.78rem] font-semibold text-cream whitespace-nowrap hover:bg-terracotta-deep transition-colors"
            >
              Free recommendation
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 pb-28">
        {/* The promise of this page. */}
        <section className="pt-16 text-center md:pt-24">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="t-muted text-[0.7rem] font-semibold uppercase tracking-[0.32em]"
          >
            Partner platforms · Benefits · Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
            className="font-display t-text mx-auto mt-6 max-w-3xl text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.04]"
          >
            The platforms we partner with — and what you <span className="text-terracotta">save.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85, ease: EASE }}
            className="t-muted mx-auto mt-7 max-w-2xl text-[1.08rem] leading-relaxed"
          >
            We hold partner and referral relationships with every platform on this page. Sign up
            through our links and codes and the discounts and preferred-partner benefits are
            yours — no implementation required. Your free recommendation tells you which of these
            fit your business, and comes with the links.
          </motion.p>
        </section>

        {/* What signing up through Stacktik gets you, on every platform. */}
        <section className="mx-auto mt-14 max-w-3xl md:mt-20">
          <Rise>
            <div className="t-surface t-hairline rounded-2xl border p-7 md:p-9">
              <h2 className="t-text text-[1.05rem] font-semibold">
                On every platform below, going through Stacktik means:
              </h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="text-terracotta mt-0.5" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path d="M2.5 8.5 6 12l7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="t-muted text-[0.92rem] leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        </section>

        {/* The platforms. */}
        <section className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {PARTNERS.map((p, i) => (
            <Rise key={p.name} delay={(i % 2) * 0.06}>
              <article className="t-surface t-hairline flex h-full flex-col rounded-2xl border p-8 transition-[border-color] duration-300 hover:border-terracotta/50">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="t-text text-[1.6rem]" style={p.style}>
                    {p.name}
                  </span>
                  <span className="t-muted text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-right">
                    {p.category}
                  </span>
                </div>
                <p className="t-muted mt-4 text-[0.95rem] leading-relaxed">{p.blurb}</p>
                <div className="t-hairline mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t pt-5">
                  <div>
                    <div className="t-text text-[1.05rem] font-semibold">{p.pricing}</div>
                    <div className="t-muted mt-1 text-[0.78rem]">{p.pricingNote}</div>
                  </div>
                  <span className="rounded-full bg-terracotta/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
                    Discount via Stacktik
                  </span>
                </div>
              </article>
            </Rise>
          ))}
        </section>

        <Rise>
          <p className="t-muted mx-auto mt-8 max-w-2xl text-center text-[0.82rem] leading-relaxed">
            List prices are each platform's published annual-billing rates and can change. Your
            exact discount and benefits are confirmed with your referral links — they vary by
            platform and plan, and they never depend on buying implementation from us.
          </p>
        </Rise>

        {/* The ask. */}
        <section className="mt-16 text-center md:mt-24">
          <Rise>
            <h2 className="font-display t-text mx-auto max-w-2xl text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.08]">
              Not sure which of these you need?
            </h2>
            <p className="t-muted mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed">
              That's the free part. Tell us how your team works and we'll recommend the exact
              platforms — with your discount links included.
            </p>
            <div className="mt-8 flex justify-center">
              <PillLink href="/blueprint/">Get your free recommendation</PillLink>
            </div>
          </Rise>
        </section>
      </main>

      <footer className="t-hairline border-t py-10 text-center">
        <p className="t-muted text-[0.82rem]">
          © {new Date().getFullYear()} Stacktik — software implementation for sales &amp; support teams.
        </p>
      </footer>
    </div>
  );
}
