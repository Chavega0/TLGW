import { Reveal, Eyebrow } from "./Reveal";

export function WhoFor() {
  return (
    <section id="who" className="bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 grid gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <Eyebrow>Who it's for</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-tight tracking-tight text-ink">
            Technical expertise, without building a full internal systems team.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Our services are designed for growing businesses, sales teams, and customer-facing
            operations. We work with owners and managers who want clearer processes, more
            reliable information, and technology their people can use confidently.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <Eyebrow>Already set up?</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-tight tracking-tight text-ink">
            Make better use of the tools you already pay for.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            If your business already has suitable software, we look at how to get more from it —
            simplifying a pipeline, fixing an integration, improving reporting, or removing
            unnecessary manual steps. Scope, software, costs, and your team's part are clear
            before work begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
