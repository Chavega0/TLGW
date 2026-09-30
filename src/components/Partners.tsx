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

export function Partners() {
  return (
    <section id="partners" data-theme-section="light" className="py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="t-hairline border-t pt-10 text-center">
          <Rise>
            <Eyebrow>05 — Our partners</Eyebrow>
            <p className="t-muted mx-auto mt-6 max-w-xl text-lg leading-relaxed">
              Implement through us and you get partner discounts on the platforms you choose.
            </p>
          </Rise>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-7">
            {PARTNERS.map((partner, i) => (
              <motion.span
                key={partner.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: EASE }}
                className="t-text text-[1.35rem] opacity-55 transition-opacity hover:opacity-90 md:text-[1.6rem]"
                style={partner.style}
              >
                {partner.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
