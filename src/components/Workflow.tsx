import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "./Reveal";

const STEPS = [
  { label: "New inquiry", detail: "enters your CRM" },
  { label: "Routed", detail: "to the right salesperson" },
  { label: "Follow-up task", detail: "created automatically" },
  { label: "Pipeline view", detail: "visible to your manager" },
  { label: "The call", detail: "with customer context at hand" },
];

export function Workflow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="bg-ink text-cream py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>Connected, not collected</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-tight tracking-tight">
            The value comes from how the pieces work together.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/70">
            One inquiry, one connected path — designed around your business and the capabilities
            of the platforms you choose.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-[27px] top-3 bottom-3 w-px bg-cream/15 md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-px md:w-auto" />
          <motion.div
            style={{ scaleY: lineScale, scaleX: lineScale }}
            className="absolute left-[27px] top-3 bottom-3 w-px origin-top bg-terracotta md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-px md:w-auto md:origin-left"
          />
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-5 md:block pl-1 md:pl-0"
              >
                <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-terracotta/60 bg-ink text-clay font-serif italic text-lg">
                  {i + 1}
                </span>
                <span className="md:mt-5 block">
                  <span className="block text-lg font-semibold">{step.label}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-cream/60">
                    {step.detail}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>

        <p className="mt-20 max-w-3xl text-lg leading-relaxed text-cream/70">
          Stacktik designs and implements that connection between your tools and your daily
          operations. We configure the agreed systems, test the workflows, and help your team
          understand how to use the setup — and where a software provider needs to be involved,
          we coordinate the technical requirements and next steps.
        </p>
      </div>
    </section>
  );
}
