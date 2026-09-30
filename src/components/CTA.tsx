import { motion } from "framer-motion";
import { Mark } from "./Logo";

export function CTA() {
  return (
    <section id="blueprint" className="bg-cream pb-28 md:pb-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-terracotta px-8 py-20 text-center md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 opacity-[0.14]"
        >
          <Mark color="#F6EFE0" size={420} />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 -bottom-32 opacity-[0.10]"
        >
          <Mark color="#2B2723" size={380} />
        </div>
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-tight text-cream">
            Start with a free personalized systems blueprint.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">
            Tell us what you want to achieve and show us how you work today. We'll map the main
            gaps, recommend a suitable setup, and outline the steps to get there — a clear
            starting point for a business that runs more smoothly.
          </p>
          <a
            href="mailto:hello@stacktik.com"
            className="mt-10 inline-block rounded-full bg-cream px-8 py-4 text-base font-semibold text-terracotta-deep shadow-xl shadow-ink/20 hover:bg-cream-soft transition-colors"
          >
            Request your blueprint
          </a>
        </div>
      </motion.div>
    </section>
  );
}
