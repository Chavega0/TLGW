import { motion } from "framer-motion";
import { Rise, Eyebrow, EASE } from "./motion";

const SERVICES = [
  {
    title: "Software selection & system planning",
    body: "We weigh platforms against how your team actually works — features, real costs, integrations — and hand you one clear recommendation with a practical roadmap. You stop paying for tools nobody uses.",
    span: "md:col-span-7",
  },
  {
    title: "CRM setup & improvement",
    body: "Pipelines, ownership rules, and follow-ups built around how you sell — so nobody asks \"who's on this lead?\" again, and every deal shows its next step.",
    span: "md:col-span-5",
  },
  {
    title: "Business calling & communications",
    body: "A phone system wired into your CRM — every call starts with the customer's history already on screen.",
    span: "md:col-span-4",
  },
  {
    title: "Outbound sales systems",
    body: "Prospecting, outreach, and calling connected into one repeatable path from new prospect to booked conversation.",
    span: "md:col-span-4",
  },
  {
    title: "Integrations & automation",
    body: "Leads assigned, tasks created, records updated — without anyone having to remember to do it.",
    span: "md:col-span-4",
  },
  {
    title: "Practical AI implementation",
    body: "Inquiries answered, conversations summarized, admin cut — AI applied to a specific job, with your team staying in control of the calls that matter.",
    span: "md:col-span-12",
  },
];

export function Services() {
  return (
    <section id="services" data-theme-section="light" className="py-32 md:py-44">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="t-hairline flex flex-col gap-6 border-t pt-10 md:flex-row md:items-end md:justify-between">
          <Rise>
            <Eyebrow>03 — What we do</Eyebrow>
            <h2 className="font-display t-text mt-6 max-w-xl text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
              The core tools behind your sales and customer communications.
            </h2>
            <p className="t-muted mt-6 max-w-lg text-[1.02rem] leading-relaxed">
              Everything is scoped before work begins: what's delivered, which software, the
              expected costs, and what your team contributes.
            </p>
          </Rise>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-12">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.8, ease: EASE }}
              className={`t-surface t-hairline group rounded-2xl border p-8 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-terracotta/50 md:p-9 ${s.span}`}
            >
              <span className="font-display text-terracotta text-lg italic leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-text mt-5 text-[1.2rem] font-semibold leading-snug">{s.title}</h3>
              <p className="t-muted mt-3 max-w-2xl text-[0.95rem] leading-relaxed">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
