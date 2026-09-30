import { motion } from "framer-motion";
import { Rise, Eyebrow, EASE } from "./motion";

const SERVICES = [
  {
    title: "Software selection & system planning",
    body: "We assess your existing setup and evaluate platforms against your actual requirements — features, expected costs, integrations, and how easily your team can use the system. You get a clear recommendation and a practical implementation roadmap.",
    span: "md:col-span-7",
  },
  {
    title: "CRM setup & improvement",
    body: "Contacts, companies, opportunities, and activity — organized around your sales process, giving your team a clearer view of each relationship and its next step.",
    span: "md:col-span-5",
  },
  {
    title: "Business calling & communications",
    body: "A phone system that fits how your team handles calls, connected to your CRM so conversations stay in context.",
    span: "md:col-span-4",
  },
  {
    title: "Outbound sales systems",
    body: "Prospecting, outreach, calling, and CRM workflows connected into one repeatable process with clear ownership.",
    span: "md:col-span-4",
  },
  {
    title: "Integrations & automation",
    body: "Repetitive steps automated with a defined purpose — less manual work, more consistency, faster action.",
    span: "md:col-span-4",
  },
  {
    title: "Practical AI implementation",
    body: "We identify where AI supports a specific need — handling initial inquiries, assisting qualification, summarizing conversations, reducing admin — and assess the tools required, along with where your team should remain involved.",
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
