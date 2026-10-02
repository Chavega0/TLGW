import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Eyebrow, EASE } from "./motion";

const STEPS = [
  {
    label: "A new inquiry enters your CRM",
    detail: "Captured from your website form with source, company, and contact details intact.",
  },
  {
    label: "It reaches the right salesperson",
    detail: "Ownership rules route the lead — no spreadsheet triage, no dropped handoffs.",
  },
  {
    label: "A follow-up task is created",
    detail: "The next step exists before anyone has to remember it.",
  },
  {
    label: "It appears in your manager's pipeline",
    detail: "Deal stage, value, and activity — visible without asking anyone.",
  },
  {
    label: "The call happens with context",
    detail: "When your salesperson dials, the relationship's history is already on screen.",
  },
];

/* A faithful mock of the connected system inside a browser frame —
   each scroll chapter lights up the element the step describes.
   Also used by the hero takeover, fully lit (step 4). */
export function SystemMock({ step }: { step: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-cream/15 bg-[#2b2620] shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 border-b border-cream/10 bg-[#332d26] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#5a5147]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5a5147]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5a5147]" />
        <span className="ml-3 rounded-md bg-[#211d19] px-3 py-1 text-[0.68rem] tracking-wide text-cream/50">
          app.stacktik.com/pipeline
        </span>
      </div>
      <div className="grid grid-cols-5 gap-3 p-4 text-left md:p-5">
        {/* Pipeline column */}
        <div className="col-span-3 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream/45">
              New leads
            </span>
            <motion.span
              animate={{ opacity: step >= 3 ? 1 : 0.35 }}
              className="rounded-full bg-clay/20 px-2 py-0.5 text-[0.65rem] font-semibold text-clay"
            >
              €47.5k pipeline
            </motion.span>
          </div>

          <motion.div
            initial={false}
            animate={{
              opacity: step >= 0 ? 1 : 0,
              y: step >= 0 ? 0 : 14,
              borderColor: step === 0 ? "rgba(217,119,71,0.65)" : "rgba(243,236,220,0.12)",
            }}
            transition={{ duration: 0.55, ease: EASE }}
            className="rounded-lg border bg-[#211d19] p-3.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.82rem] font-semibold text-cream">Arla Logistics</span>
              <span className="rounded bg-clay/15 px-1.5 py-0.5 text-[0.62rem] font-semibold text-clay">
                NEW
              </span>
            </div>
            <div className="mt-1 text-[0.7rem] text-cream/50">Website form · Fleet of 40 · Berlin</div>
            <motion.div
              initial={false}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 6 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-2.5 flex items-center gap-2"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-olive text-[0.58rem] font-bold text-cream">
                MJ
              </span>
              <span className="text-[0.7rem] text-cream/65">Assigned to Maya Jensen</span>
            </motion.div>
          </motion.div>

          <div className="rounded-lg border border-cream/10 bg-[#211d19] p-3.5 opacity-55">
            <div className="flex items-center justify-between">
              <span className="text-[0.82rem] font-semibold text-cream">Verde Interiors</span>
              <span className="text-[0.62rem] text-cream/40">Qualifying</span>
            </div>
            <div className="mt-1 text-[0.7rem] text-cream/50">Referral · Showroom chain · Lyon</div>
          </div>

          <motion.div
            initial={false}
            animate={{
              opacity: step >= 2 ? 1 : 0,
              y: step >= 2 ? 0 : 10,
              borderColor: step === 2 ? "rgba(217,119,71,0.65)" : "rgba(243,236,220,0.12)",
            }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2.5 rounded-lg border bg-[#211d19] p-3"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 8.5 6 12l7.5-8" stroke="#D97747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[0.72rem] text-cream/75">Task · Call Arla tomorrow, 9:00</span>
          </motion.div>
        </div>

        {/* Right rail: manager view + call context */}
        <div className="col-span-2 space-y-2.5">
          <motion.div
            initial={false}
            animate={{
              opacity: step >= 3 ? 1 : 0.35,
              borderColor: step === 3 ? "rgba(217,119,71,0.65)" : "rgba(243,236,220,0.12)",
            }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-lg border bg-[#211d19] p-3.5"
          >
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream/45">
              Pipeline view
            </div>
            <div className="mt-2.5 space-y-1.5">
              {[64, 42, 28].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full bg-cream/10">
                  <motion.div
                    initial={false}
                    animate={{ width: step >= 3 ? `${w}%` : "12%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                    className="h-full rounded-full bg-clay"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: step >= 4 ? 1 : 0.35,
              y: step >= 4 ? 0 : 8,
              borderColor: step === 4 ? "rgba(217,119,71,0.65)" : "rgba(243,236,220,0.12)",
            }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-lg border bg-[#211d19] p-3.5"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-clay ${step >= 4 ? "animate-ping" : ""}`} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
              </span>
              <span className="text-[0.72rem] font-semibold text-cream">Calling Arla Logistics…</span>
            </div>
            <div className="mt-2 space-y-1 text-[0.66rem] leading-relaxed text-cream/55">
              <div>Last touch: form submitted Tue</div>
              <div>Interest: fleet dispatch CRM</div>
              <div>Owner: Maya · Task due 9:00</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Workflow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section id="system" ref={ref} data-theme-section="dark" className="relative h-[380vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="t-hairline border-t pt-8">
            <Eyebrow>04 — Connected, not collected</Eyebrow>
          </div>
          <div className="mt-8 grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="font-display t-text text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
                The value comes from how the pieces work together.
              </h2>
              <div className="relative mt-10 min-h-[9.5rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <div className="font-display text-clay text-lg italic">
                      {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                    </div>
                    <h3 className="t-text mt-3 text-[1.35rem] font-semibold leading-snug">
                      {STEPS[step].label}
                    </h3>
                    <p className="t-muted mt-2.5 max-w-sm text-[0.98rem] leading-relaxed">
                      {STEPS[step].detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-8 flex gap-1.5" aria-hidden="true">
                {STEPS.map((_, i) => (
                  <div key={i} className="h-[3px] w-10 overflow-hidden rounded-full bg-cream/15">
                    <motion.div
                      animate={{ scaleX: i <= step ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="h-full w-full origin-left bg-terracotta"
                    />
                  </div>
                ))}
              </div>
            </div>
            <motion.div style={{ y: mockY }} className="md:col-span-7">
              <SystemMock step={step} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
