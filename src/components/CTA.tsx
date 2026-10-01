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
            Free at minimum: your blueprint and partner discounts.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-cream/85">
            A personalized systems blueprint — where leads leak, the tools we'd pick for your
            budget, and the order to set them up — plus partner discounts on the platforms when
            you implement through us.
          </p>
          {/* The plan, numbered: people buy paths they can see. */}
          <ol className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
            {[
              "Show us how you work — one call.",
              "Get your blueprint. Free either way.",
              "We implement, connect, and train.",
            ].map((step, i) => (
              <li key={i} className="rounded-xl bg-cream/10 px-5 py-4">
                <span className="font-display text-lg italic leading-none text-cream/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-[0.94rem] leading-snug text-cream">{step}</p>
              </li>
            ))}
          </ol>
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
