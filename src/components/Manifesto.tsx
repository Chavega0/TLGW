import { ScrollProse } from "./ScrollProse";
import { Rise, Eyebrow } from "./motion";

export function Manifesto() {
  return (
    <section data-theme-section="light" className="pt-20 pb-32 md:pt-24 md:pb-44">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="t-hairline border-t pt-10 md:grid md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-3">
            <Eyebrow>01 — Why Stacktik</Eyebrow>
          </Rise>
          <div className="mt-8 md:col-span-9 md:mt-0">
            <ScrollProse
              className="font-display t-text text-[clamp(1.8rem,3.8vw,3.1rem)] leading-[1.28]"
              text="Stacktik chooses, sets up, and connects the software your sales and support teams run on — CRM, calling, outreach, automation. Built around your goals, your budget, and the way your customers buy, with the technical support to put it into use."
            />
            <ScrollProse
              className="t-muted mt-10 max-w-2xl text-lg leading-relaxed"
              text="You might be choosing your first CRM, replacing a phone system, building an outbound sales operation, or trying to make tools you already pay for work together. We help you understand your options, make informed decisions, and move from a collection of subscriptions to a connected way of working."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
