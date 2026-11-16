import { motion } from "framer-motion";
import { Mark } from "./Logo";
import { Rise, EASE } from "./motion";
import { AREAS, SUPPLIER_COUNT } from "../data/partners";

export function PartnersPage() {
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
        <section className="pt-16 text-center md:pt-24">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="t-muted text-[0.7rem] font-semibold uppercase tracking-[0.32em]"
          >
            Our partner network
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: EASE }}
            className="font-display t-text mx-auto mt-6 max-w-3xl text-balance text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.05]"
          >
            RevOps specialists. <span className="text-terracotta">Every technology</span>{" "}
            covered.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85, ease: EASE }}
            className="t-muted mx-auto mt-7 max-w-2xl text-[1.08rem] leading-relaxed"
          >
            Revenue operations is our craft. Through our partnership with Telarus, we also
            source and implement solutions from {SUPPLIER_COUNT} vetted suppliers — so whatever
            your business needs next, you get it from one team you already trust.
          </motion.p>
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
            aria-label="Solution areas"
            className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {AREAS.map((area) => (
              <a
                key={area.id}
                href={`#${area.id}`}
                className="t-hairline t-surface t-text rounded-full border px-4 py-2 text-[0.84rem] font-medium transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {area.title}
              </a>
            ))}
          </motion.nav>
        </section>

        {AREAS.map((area) => (
          <section key={area.id} id={area.id} className="mt-20 scroll-mt-10 md:mt-28">
            <Rise>
              <div className="t-hairline border-t pt-10">
                {area.specialty && (
                  <span className="text-terracotta text-[0.68rem] font-semibold uppercase tracking-[0.24em]">
                    Our specialty · RevOps
                  </span>
                )}
                <h2 className="font-display t-text mt-2 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.1]">
                  {area.title}
                </h2>
                <p className="t-muted mt-4 max-w-2xl text-[1rem] leading-relaxed">{area.covers}</p>
              </div>
            </Rise>
            {area.groups.map((group) => (
              <Rise key={group.label}>
                <div className="mt-10">
                  <h3 className="t-muted text-[0.7rem] font-semibold uppercase tracking-[0.24em]">
                    {group.label}
                  </h3>
                  <ul className="mt-5 columns-2 gap-x-8 sm:columns-3 lg:columns-4">
                    {group.names.map((name) => (
                      <li
                        key={name}
                        className="t-text mb-2.5 break-inside-avoid text-[0.95rem] leading-snug [overflow-wrap:anywhere]"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>
            ))}
          </section>
        ))}

        <section className="mt-24 text-center md:mt-32">
          <Rise>
            <h2 className="font-display t-text mx-auto max-w-2xl text-balance text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.1]">
              Not sure which of these fits? That's the free part.
            </h2>
            <p className="t-muted mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed">
              Tell us how your business works and we'll recommend the right platforms for your
              goals and budget — yours to keep either way.
            </p>
            <a
              href="/blueprint/"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-terracotta py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-cream transition-all hover:gap-4"
            >
              Get your free recommendation
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-terracotta-deep transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
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
