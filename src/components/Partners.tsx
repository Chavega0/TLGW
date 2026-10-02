import { Rise } from "./motion";

/* No names for now: the partnerships stay general. */
export function Partners() {
  return (
    <section id="partners" data-theme-section="light" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <Rise>
          <span className="t-muted text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
            Our partners
          </span>
        </Rise>
        <Rise delay={0.08}>
          <h2 className="font-display t-text mx-auto mt-6 max-w-3xl text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.12]">
            We partner with the leading CRM, calling, outreach, and automation platforms —
            and implement them every day.
          </h2>
        </Rise>
        <Rise delay={0.15}>
          <p className="t-muted mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed">
            So your system is built on tools we know inside out.
          </p>
        </Rise>
      </div>
    </section>
  );
}
