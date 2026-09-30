import { ScrollProse } from "./ScrollProse";
import { Reveal, Eyebrow } from "./Reveal";

export function Manifesto() {
  return (
    <section className="bg-cream py-32 md:py-44">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Eyebrow>Why Stacktik</Eyebrow>
        </Reveal>
        <ScrollProse
          className="mt-8 font-serif text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.35] text-ink"
          text="Every business has a different way of working. Your technology should reflect your goals, your team, your budget, and the way your customers buy. Stacktik turns those requirements into a practical system — with guidance on what to choose and the technical support to put it into use."
        />
        <ScrollProse
          className="mt-10 max-w-3xl text-lg leading-relaxed text-ink-soft"
          text="You might be choosing your first CRM, replacing a phone system, building an outbound sales operation, or trying to make tools you already pay for work together. We help you understand your options, make informed decisions, and move from a collection of subscriptions to a connected way of working."
        />
      </div>
    </section>
  );
}
