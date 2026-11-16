import { Rise } from "./motion";
import { AREAS, SUPPLIER_COUNT } from "../data/partners";

export function Partners() {
  return (
    <section id="partners" data-theme-section="light" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <Rise>
            <span className="t-muted text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
              Our partners
            </span>
          </Rise>
          <Rise delay={0.08}>
            <h2 className="font-display t-text mx-auto mt-6 max-w-3xl text-balance text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.12]">
              We specialize in RevOps. We deliver every technology around it.
            </h2>
          </Rise>
          <Rise delay={0.15}>
            <p className="t-muted mx-auto mt-6 max-w-2xl text-[1.02rem] leading-relaxed">
              Revenue operations is our craft — the CRM, calling, outreach, and automation your
              sales and support teams run on. Through our partnership with Telarus, we also
              source and implement solutions from {SUPPLIER_COUNT} vetted suppliers across
              every category of business technology.
            </p>
          </Rise>
        </div>

        <div className="mt-14 md:mt-20">
          {AREAS.map((area, i) => (
            <Rise key={area.id} delay={i * 0.05}>
              <div className="t-hairline grid gap-5 border-t py-8 md:grid-cols-[250px_1fr] md:gap-10 md:py-10">
                <div>
                  <h3 className="t-text text-[1.05rem] font-semibold leading-snug">
                    {area.title}
                  </h3>
                  {area.specialty && (
                    <span className="text-terracotta mt-2 inline-block text-[0.66rem] font-semibold uppercase tracking-[0.22em]">
                      Our specialty · RevOps
                    </span>
                  )}
                </div>
                <div>
                  <p className="t-muted max-w-2xl text-[0.95rem] leading-relaxed">
                    {area.covers}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
                    {area.featured.map((name) => (
                      <li
                        key={name}
                        className="font-display t-text text-[1.15rem] leading-none md:text-[1.3rem]"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Rise>
          ))}
          <Rise>
            <div className="t-hairline border-t pt-9 text-center">
              <a
                href="/partners/"
                className="text-terracotta text-[0.98rem] font-semibold underline-offset-4 transition-colors hover:underline"
              >
                See the full partner network →
              </a>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
