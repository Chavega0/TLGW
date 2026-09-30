import { motion } from "framer-motion";
import { Mark } from "./Logo";
import { ArrowPill } from "./Hero";
import { EASE } from "./motion";

export function CTA() {
  return (
    <section id="blueprint" data-theme-section="light" className="px-6 pb-32 md:pb-40">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.95, ease: EASE }}
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[1.4rem] bg-terracotta px-8 py-20 md:py-28"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 opacity-[0.12]">
          <Mark color="#F6EFE0" size={380} />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-cream text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05]">
            Start with a free personalized systems blueprint.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-cream/85">
            Tell us what you want to achieve and show us how you work today. We'll map the main
            gaps, recommend a suitable setup, and outline the steps to get there — a clear
            starting point for a business that runs more smoothly.
          </p>
          <div className="mt-10 flex justify-center">
            <ArrowPill href="mailto:hello@stacktik.com" tone="cream">
              Request your blueprint
            </ArrowPill>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
