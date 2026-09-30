import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HEADLINE = ["Your", "software,", "working", "as", "one."];

// Local copy first (vendor with scripts/fetch-hero.mjs); falls back to the
// generated video on Higgsfield's CDN when the local file isn't present.
const LOCAL_SRC = "/media/hero.mp4";
const REMOTE_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_195348_ab23c3e8-aa68-4ec6-8f1e-41c1b6e1e271.mp4";

function HeroVideo() {
  const [src, setSrc] = useState(LOCAL_SRC);
  return (
    <video
      key={src}
      className="h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      onError={() => {
        if (src !== REMOTE_SRC) setSrc(REMOTE_SRC);
      }}
    />
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y: videoY, scale: videoScale }} className="absolute inset-0">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/30" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-tight text-cream">
          {HEADLINE.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block will-change-transform"
              initial={{ y: "110%", opacity: 0, rotate: 2 }}
              animate={{ y: "0%", opacity: 1, rotate: 0 }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {i < HEADLINE.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-cream/85"
        >
          Stacktik helps growing businesses choose, implement, and connect the software they need
          to run better — CRM, business phone, sales tools, and automation, as one system.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#blueprint"
            className="rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-cream shadow-lg shadow-ink/30 hover:bg-clay transition-colors"
          >
            Get your free systems blueprint
          </a>
          <a
            href="#services"
            className="rounded-full border border-cream/40 px-7 py-3.5 text-base font-semibold text-cream hover:bg-cream/10 transition-colors"
          >
            See what we do
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/70"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-xs tracking-[0.25em] uppercase"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}
