import { Rise, LineWipe, Eyebrow } from "./motion";

const QUESTIONS = [
  "How do leads reach you?",
  "Who follows up?",
  "Where does customer information live?",
  "Which tasks take too much time?",
  "What can your managers see — and what can't they measure?",
];

export function Discovery() {
  return (
    <section id="how" data-theme-section="olive" className="py-32 md:py-44">
      <div className="mx-auto max-w-[1200px] px-6 md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Rise>
              <Eyebrow>02 — How we start</Eyebrow>
              <h2 className="font-display t-text mt-6 text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.06]">
                We start by understanding your business.
              </h2>
              <p className="t-muted mt-7 max-w-sm text-lg leading-relaxed">
                These questions identify where better systems make a meaningful difference —
                before any software is chosen.
              </p>
            </Rise>
          </div>
        </div>
        <ol className="mt-14 md:col-span-7 md:mt-2">
          {QUESTIONS.map((q, i) => (
            <li key={i} className="t-hairline border-b first:border-t">
              <LineWipe delay={i * 0.06} className="flex items-baseline gap-6 py-7 md:py-8">
                <span className="font-display text-clay text-lg italic leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display t-text text-[clamp(1.25rem,2.2vw,1.7rem)] leading-snug">
                  {q}
                </span>
              </LineWipe>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
