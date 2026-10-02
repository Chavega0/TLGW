import { motion } from "framer-motion";
import { Rise, EASE } from "./motion";

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

/* The platforms carry the credibility, so they sit high on the page
   at display size — a quiet strip, no program attached. */
export function Partners() {
  return (
    <section id="partners" data-theme-section="light" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <Rise>
          <span className="t-muted text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
            We implement &amp; partner with
          </span>
        </Rise>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-14 gap-y-7">
          {PARTNERS.map((partner, i) => (
            <motion.span
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.7, ease: EASE }}
              className="t-text text-[1.7rem] opacity-70 transition-opacity hover:opacity-100 md:text-[2.1rem]"
              style={partner.style}
            >
              {partner.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
