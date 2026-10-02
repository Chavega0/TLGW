import { useState } from "react";
import { motion } from "framer-motion";
import { Mark } from "./Logo";
import { Rise, EASE } from "./motion";

/* Dedicated landing page: one job — request the free recommendation.
   No film, no scenes: the offer, the proof of no-catch, the form. */

const PARTNER_NAMES = ["CloudTalk", "Apollo", "Instantly", "JustCall", "Pipedrive", "Zoho", "Close"];

const GETS = [
  {
    title: "Free software consulting",
    body: "A real working session about how your sales and support teams operate — what leaks, what's slow, what's missing. No fee, no obligation.",
  },
  {
    title: "A personalized recommendation",
    body: "The exact platforms we'd pick for your business and budget, how they connect, and the order to set them up. Written down, yours to keep.",
  },
  {
    title: "Optional implementation",
    body: "If you want the system built, connected, and your team trained, we do that too. It's the only part you ever pay for — and it's entirely your call.",
  },
];

function Pill({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="group inline-flex items-center gap-3 rounded-full bg-terracotta py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-cream transition-all hover:gap-4"
    >
      {children}
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-terracotta-deep transition-transform group-hover:scale-110"
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

const FIELD =
  "t-hairline t-surface w-full rounded-xl border px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-terracotta";

export function BlueprintPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", team: "", tools: "", goal: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Free systems recommendation — ${form.company || form.name || "my business"}`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Team size: ${form.team}`,
      `Current tools: ${form.tools}`,
      "",
      "What we're trying to fix:",
      form.goal,
    ].join("\n");
    window.location.href = `mailto:hello@stacktik.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-svh">
      <header className="t-hairline border-b">
        <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
          <a href="/" aria-label="Stacktik home" className="flex items-center gap-2 select-none">
            <Mark color="#C4552B" size={20} />
            <span className="t-text text-[1.05rem] font-semibold tracking-tight leading-none">
              stack<span className="text-terracotta">tik</span>
            </span>
          </a>
          <a href="/" className="t-muted text-[0.84rem] font-medium transition-colors hover:text-terracotta">
            ← Back to site
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 pb-28">
        {/* The offer, stated whole. */}
        <section className="pt-16 text-center md:pt-24">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="t-muted text-[0.7rem] font-semibold uppercase tracking-[0.32em]"
          >
            Free consulting · Personalized blueprint · Optional build
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
            className="font-display t-text mx-auto mt-6 max-w-3xl text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.04]"
          >
            Your software recommendation is <span className="text-terracotta">free.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85, ease: EASE }}
            className="t-muted mx-auto mt-7 max-w-2xl text-[1.08rem] leading-relaxed"
          >
            Tell us how your sales and support teams work. We recommend the exact platforms for
            your business and how they connect — free. You only ever pay if you separately
            decide you want us to build the system for you.
          </motion.p>
        </section>

        {/* What you get. */}
        <section className="mt-16 grid gap-4 md:mt-24 md:grid-cols-2">
          {GETS.map((item, i) => (
            <Rise key={item.title} delay={i * 0.06}>
              <article className="t-surface t-hairline h-full rounded-2xl border p-8">
                <span className="font-display text-terracotta text-lg italic leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="t-text mt-4 text-[1.15rem] font-semibold">{item.title}</h2>
                <p className="t-muted mt-3 text-[0.95rem] leading-relaxed">{item.body}</p>
              </article>
            </Rise>
          ))}
        </section>

        {/* The platforms we implement. */}
        <section className="mt-16 text-center md:mt-24">
          <Rise>
            <p className="t-muted text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
              We implement &amp; partner with
            </p>
          </Rise>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {PARTNER_NAMES.map((name, i) => (
              <Rise key={name} delay={i * 0.04}>
                <span className="t-text text-[1.25rem] font-semibold opacity-70">{name}</span>
              </Rise>
            ))}
          </div>
        </section>

        {/* The ask. */}
        <section className="mx-auto mt-16 max-w-xl md:mt-24">
          <Rise>
            <h2 className="font-display t-text text-center text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.1]">
              Request your free recommendation
            </h2>
            <p className="t-muted mt-4 text-center text-[0.95rem] leading-relaxed">
              A few details, one call, and you'll have your recommendation within days. Free
              either way.
            </p>
          </Rise>
          <Rise delay={0.08}>
            <form onSubmit={submit} className="mt-9 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={FIELD} placeholder="Your name" value={form.name} onChange={set("name")} required />
                <input className={FIELD} placeholder="Company" value={form.company} onChange={set("company")} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={FIELD} type="email" placeholder="Email" value={form.email} onChange={set("email")} required />
                <select className={FIELD} value={form.team} onChange={set("team")}>
                  <option value="">Sales &amp; support team size</option>
                  <option>1–5 people</option>
                  <option>6–15 people</option>
                  <option>16–50 people</option>
                  <option>50+ people</option>
                </select>
              </div>
              <input
                className={FIELD}
                placeholder="Tools you use today (CRM, phone, email…)"
                value={form.tools}
                onChange={set("tools")}
              />
              <textarea
                className={`${FIELD} min-h-28 resize-y`}
                placeholder="What are you trying to fix or set up?"
                value={form.goal}
                onChange={set("goal")}
              />
              <div className="mt-3 flex flex-col items-center gap-4">
                <Pill type="submit">Request my free recommendation</Pill>
                <p className="t-muted text-[0.82rem]">
                  Opens your email app — or write us directly at{" "}
                  <a href="mailto:hello@stacktik.com" className="text-terracotta underline-offset-2 hover:underline">
                    hello@stacktik.com
                  </a>
                </p>
              </div>
            </form>
          </Rise>
        </section>
      </main>

      <footer className="t-hairline border-t py-10 text-center">
        <p className="t-muted text-[0.82rem]">
          © {new Date().getFullYear()} Stacktik — software implementation for sales &amp; support teams.
        </p>
      </footer>
    </div>
  );
}
