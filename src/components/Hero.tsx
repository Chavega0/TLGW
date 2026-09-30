import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordsPullUp, EASE } from "./motion";

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

export function ArrowPill({
  href,
  children,
  tone = "terracotta",
}: {
  href: string;
  children: string;
  tone?: "terracotta" | "cream";
}) {
  const solid =
    tone === "terracotta"
      ? "bg-terracotta text-cream"
      : "bg-cream text-terracotta-deep";
  const circle = tone === "terracotta" ? "bg-cream text-terracotta-deep" : "bg-terracotta text-cream";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold transition-all hover:gap-4 ${solid}`}
    >
      {children}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${circle}`}
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export function Hero() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  // Continuous scroll-progress transforms (damped upstream by Lenis):
  // the panel settles to full size as it enters, drifts as it leaves,
  // and its lower edge dissolves into the page background so the video
  // hands off to the content instead of ending at a hard frame.
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.955, 1]);
  const y = useTransform(scrollYProgress, [0.4, 1], ["0%", "6%"]);
  const melt = useTransform(scrollYProgress, [0.52, 0.82], [0, 1]);
  const overlayFade = useTransform(scrollYProgress, [0.5, 0.75], [1, 0]);

  return (
    <section id="top" data-theme-section="light" className="pt-32 md:pt-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <h1 className="font-display t-text text-[clamp(3.1rem,8.2vw,7.2rem)] leading-[0.98]">
          <WordsPullUp text="Your software," />
          <br />
          <WordsPullUp text="working as one." />
        </h1>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.85, ease: EASE }}
            className="t-muted max-w-md text-[1.05rem] leading-relaxed"
          >
            Stacktik helps growing businesses choose, implement, and connect the software they
            need to run better — CRM, business phone, sales tools, and automation, as one system.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.85, ease: EASE }}
            className="shrink-0"
          >
            <ArrowPill href="#blueprint">Get your free systems blueprint</ArrowPill>
          </motion.div>
        </div>

        <motion.div
          ref={panelRef}
          style={{ scale, y }}
          className="mt-16 will-change-transform md:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1, ease: EASE }}
          >
            <div className="ambient-float relative aspect-[16/9] overflow-hidden rounded-[1.4rem] bg-[#35281f] shadow-[0_32px_80px_rgba(120,62,30,0.24)]">
              <HeroVideo />
              {/* Brand color grade: keeps the footage in Stacktik's palette. */}
              <div className="pointer-events-none absolute inset-0 bg-terracotta opacity-[0.12] mix-blend-color" aria-hidden="true" />
              <div className="grain pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden="true" />
              {/* Content lives in the video (bottom-anchored). */}
              <motion.div
                style={{ opacity: overlayFade }}
                className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-10"
              >
                <p className="font-display max-w-md text-[clamp(1.2rem,2.4vw,1.9rem)] leading-[1.2] text-cream">
                  Built around the way you work — not the other way around.
                </p>
                <div className="hidden shrink-0 items-center gap-2.5 pb-1 md:flex" aria-hidden="true">
                  <svg viewBox="0 0 100 100" width="26" height="26">
                    <path d="M22 32 L43 46 L80 13" fill="none" stroke="#F6EFE0" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="16" y="56" width="68" height="14" rx="7" fill="#F6EFE0" />
                    <rect x="16" y="78" width="68" height="14" rx="7" fill="#F6EFE0" />
                  </svg>
                </div>
              </motion.div>
              {/* Scroll-driven melt: the video dissolves into the page
                  background as the content arrives. */}
              <motion.div
                style={{ opacity: melt, background: "linear-gradient(to top, var(--page-bg) 8%, transparent 60%)" }}
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
