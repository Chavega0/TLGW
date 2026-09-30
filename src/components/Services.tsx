import { motion } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";

const SERVICES = [
  {
    title: "Software selection & system planning",
    body: "We assess your existing setup and evaluate platforms against your actual requirements — features, expected costs, integrations, and how easily your team can use the system. You get a clear recommendation and a practical implementation roadmap.",
  },
  {
    title: "CRM setup & improvement",
    body: "Contacts, companies, opportunities, and activity — organized around your sales process. Pipelines, ownership rules, follow-up tasks, and reporting give your team a clearer view of each relationship and its next step.",
  },
  {
    title: "Business calling & communications",
    body: "A phone system that fits how your team handles inbound and outbound calls, connected to your CRM so conversations and sales activity stay accessible in the context where your team needs them.",
  },
  {
    title: "Outbound sales systems",
    body: "Prospecting tools, outreach platforms, calling, and CRM workflows connected into a repeatable process — from new prospect to active conversation, with clear ownership and visibility into what happens next.",
  },
  {
    title: "Integrations & workflow automation",
    body: "We connect systems and automate repetitive steps: assigning leads, creating tasks, updating records, triggering follow-ups. Each workflow has a defined purpose — less manual work, more consistency, faster action.",
  },
  {
    title: "Practical AI implementation",
    body: "We identify where AI supports a specific need — handling initial inquiries, assisting qualification, summarizing conversations, reducing admin — and assess the tools required, along with where your team should remain involved.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-tight tracking-tight text-ink">
            The core tools behind your sales and customer communications.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-cream-soft border border-ink/8 p-8 shadow-[0_2px_20px_rgba(43,39,35,0.04)] hover:shadow-[0_18px_44px_rgba(43,39,35,0.10)] transition-shadow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/10 group-hover:bg-terracotta transition-colors">
                <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true">
                  <path
                    d="M22 32 L43 46 L80 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={14}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-terracotta group-hover:text-cream transition-colors"
                  />
                  <rect x="16" y="56" width="68" height="14" rx="7" fill="currentColor" className="text-terracotta group-hover:text-cream transition-colors" />
                  <rect x="16" y="78" width="68" height="14" rx="7" fill="currentColor" className="text-terracotta group-hover:text-cream transition-colors" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-ink leading-snug">{s.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
