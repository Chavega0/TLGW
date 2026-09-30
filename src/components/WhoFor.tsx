import { Rise, Eyebrow } from "./motion";

export function WhoFor() {
  return (
    <section id="who" data-theme-section="light" className="py-32 md:py-44">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="t-hairline border-t pt-10">
          <Rise>
            <Eyebrow>05 — Who it's for</Eyebrow>
          </Rise>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-8">
            <Rise>
              <div className="t-hairline border-l pl-7 md:pl-9">
                <h2 className="font-display t-text text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.12]">
                  Technical expertise, without building a full internal systems team.
                </h2>
                <p className="t-muted mt-6 max-w-lg text-[1.02rem] leading-relaxed">
                  Our services are designed for growing businesses, sales teams, and
                  customer-facing operations. We work with owners and managers who want clearer
                  processes, more reliable information, and technology their people can use
                  confidently.
                </p>
              </div>
            </Rise>
            <Rise delay={0.1}>
              <div className="t-hairline border-l pl-7 md:pl-9">
                <h2 className="font-display t-text text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.12]">
                  Already set up? Make better use of what you pay for.
                </h2>
                <p className="t-muted mt-6 max-w-lg text-[1.02rem] leading-relaxed">
                  If your business already has suitable software, we look at how to get more from
                  it — simplifying a pipeline, fixing an integration, improving reporting, or
                  removing unnecessary manual steps. Scope, software, costs, and your team's part
                  are clear before work begins.
                </p>
              </div>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
