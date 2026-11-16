import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

/* Shared easing (adapted from 21st.dev PrismaHero): a long ease-out
   that reads calm rather than springy — scroll motion is never bouncy. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Staggered word pull-up for display headlines. */
export function WordsPullUp({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex" style={{ paddingBottom: "0.08em", marginRight: i < words.length - 1 ? "0.24em" : 0 }}>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.85, delay: i * 0.07, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Single-shot rise reveal for supporting content. */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay, duration: 0.85, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Clip-path line wipe — reads as purposeful revelation, not a fade. */
export function LineWipe({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)", y: 14 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-terracotta">
      {children}
    </div>
  );
}
