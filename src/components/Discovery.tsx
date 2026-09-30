import { motion } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";

const QUESTIONS = [
  "How do leads reach you?",
  "Who follows up?",
  "Where does customer information live?",
  "Which tasks take too much time?",
  "What can your managers see — and what are they struggling to measure?",
];

export function Discovery() {
  return (
    <section id="how" className="bg-olive text-cream py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 md:gap-20 items-start">
        <div className="md:sticky md:top-32">
          <Reveal>
            <Eyebrow>How we start</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-tight tracking-tight">
              We start by understanding your business.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75 max-w-md">
              These questions help us identify where better systems can make a meaningful
              difference — before any software is chosen.
            </p>
          </Reveal>
        </div>
        <ol className="space-y-4">
          {QUESTIONS.map((q, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-5 rounded-2xl bg-cream/[0.07] border border-cream/10 px-7 py-6"
            >
              <span className="font-serif italic text-clay text-xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg md:text-xl font-medium leading-snug">{q}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
