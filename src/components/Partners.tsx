import { motion } from "framer-motion";
import { Rise, Eyebrow, EASE } from "./motion";

/* Text wordmarks, each styled loosely after the brand's own type. */
const PARTNERS: { name: string; style: React.CSSProperties }[] = [
  { name: "CloudTalk", style: { fontWeight: 700, letterSpacing: "-0.02em" } },
  { name: "Apollo", style: { fontWeight: 600, letterSpacing: "0.01em" } },
  { name: "Instantly", style: { fontWeight: 700, fontStyle: "italic" } },
  { name: "JustCall", style: { fontWeight: 700, letterSpacing: "-0.01em" } },
  { name: "Pipedrive", style: { fontWeight: 600 } },
  { name: "Zoho", style: { fontWeight: 800, letterSpacing: "0.02em" } },
  { name: "Close", style: { fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const } },
];

/* The platforms are a headline moment: the discounts are a core part
   of the offer, so this section states them at full size — and makes
   clear they come with no strings attached. */
export function Partners() {
  return (
    <section id="partners" data-theme-section="light" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="t-hairline border-t pt-10 text-center">
          <Rise>
            <Eyebrow>Partner platforms</Eyebrow>
          </Rise>
          <Rise delay={0.05}>
            <h2 className="font-display t-text mx-auto mt-6 max-w-3xl text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.06]">
              Discounts on the platforms you'd be paying for anyway.
            </h2>
          </Rise>
          <Rise delay={0.1}>
            <p className="t-muted mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              We hold partner and referral relationships with every platform below. Sign up
              through our links and codes and the discounts and partner benefits are yours —
              no implementation required, no strings attached.
            </p>
          </Rise>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.7, ease: EASE }}
              className="t-surface t-hairline flex flex-col items-center justify-center gap-3 rounded-2xl border px-6 py-10 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-terracotta/50"
            >
              <span className="t-text text-[1.5rem] md:text-[1.8rem]" style={partner.style}>
                {partner.name}
              </span>
              <span className="text-terracotta text-[0.66rem] font-semibold uppercase tracking-[0.18em]">
                Discount available
              </span>
            </motion.div>
          ))}
          <motion.a
            href="/blueprint/"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.18, duration: 0.7, ease: EASE }}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-terracotta px-6 py-10 text-center transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="font-display text-cream text-[1.3rem] leading-snug md:text-[1.45rem]">
              Which ones fit <em>your</em> business?
            </span>
            <span className="text-cream/85 text-[0.78rem] font-semibold">
              Get a free recommendation{" "}
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
