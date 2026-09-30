import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { WordsPullUp, EASE } from "./motion";

// Local copy first (vendor with scripts/fetch-hero.mjs); falls back to the
// generated film on Higgsfield's CDN when the local file isn't present.
const LOCAL_SRC = "/media/hero.mp4";
const REMOTE_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_203620_b407f171-b8f9-493e-9ad0-e98e870c3c04.mp4";

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

/* Scroll-scrubbed film: the scrollbar is the timeline. The footage is
   shot on the page's own cream background, so it reads as the page
   itself in motion — not a video in a box. */
function ScrubVideo({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState(LOCAL_SRC);
  const raf = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seek = () => {
      if (video.duration) {
        video.currentTime = target.current * Math.max(0, video.duration - 0.08);
      }
      raf.current = 0;
    };
    const onLoaded = () => {
      if (reduced) {
        // Reduced motion: hold the resolved final frame.
        video.currentTime = Math.max(0, video.duration - 0.08);
      } else {
        seek();
      }
    };
    video.addEventListener("loadedmetadata", onLoaded);
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [src]);

  useMotionValueEvent(progress, "change", (p) => {
    target.current = Math.min(1, Math.max(0, p));
    const video = ref.current;
    if (!video || !video.duration) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!raf.current) {
      raf.current = requestAnimationFrame(() => {
        if (video.duration) {
          video.currentTime = target.current * Math.max(0, video.duration - 0.08);
        }
        raf.current = 0;
      });
    }
  });

  return (
    <video
      key={src}
      ref={ref}
      className="h-full w-full object-cover"
      src={src}
      muted
      playsInline
      preload="auto"
      onError={() => {
        if (src !== REMOTE_SRC) setSrc(REMOTE_SRC);
      }}
    />
  );
}

/* One narrative beat, bound continuously (and reversibly) to a
   sub-range of the scene's scroll progress. */
function Beat({
  progress,
  range,
  hold = false,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  range: [number, number];
  hold?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [a, b] = range;
  const fadeIn = 0.07;
  const opacity = useTransform(
    progress,
    hold ? [a, a + fadeIn] : [a, a + fadeIn, b - fadeIn, b],
    hold ? [0, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    hold ? [a, a + fadeIn] : [a, a + fadeIn, b - fadeIn, b],
    hold ? [28, 0] : [28, 0, 0, -22]
  );
  return (
    <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${className}`}>
      <motion.div style={{ opacity, y }}>{children}</motion.div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="top" ref={ref} data-theme-section="light" className="relative h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ScrubVideo progress={scrollYProgress} />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-center px-6">
          {/* The opening headline: present immediately, released mid-scene. */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.3, 0.42], [1, 0]),
              y: useTransform(scrollYProgress, [0.3, 0.42], [0, -30]),
            }}
          >
            <h1 className="font-display t-text text-[clamp(3rem,7.6vw,6.6rem)] leading-[0.98]">
              <WordsPullUp text="Your software" />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.85, ease: EASE }}
              className="t-muted mt-7 max-w-md text-[1.05rem] leading-relaxed"
            >
              CRM. Business phone. Outreach. Automation. Each useful — each pulling in its own
              direction.
            </motion.p>
          </motion.div>

          {/* Beat two: the turn. */}
          <Beat progress={scrollYProgress} range={[0.42, 0.66]}>
            <h2 className="font-display t-text max-w-2xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.04]">
              We connect them around the way you work.
            </h2>
          </Beat>

          {/* Beat three: resolution — holds while the stack completes. */}
          <Beat progress={scrollYProgress} range={[0.7, 1]} hold>
            <h2 className="font-display t-text text-[clamp(2.6rem,6.6vw,5.8rem)] leading-[0.98]">
              working as <span className="text-terracotta">one.</span>
            </h2>
            <p className="t-muted mt-6 max-w-md text-[1.05rem] leading-relaxed">
              Stacktik helps growing businesses choose, implement, and connect the software they
              need to run better — as one system.
            </p>
            <div className="mt-9">
              <ArrowPill href="#blueprint">Get your free systems blueprint</ArrowPill>
            </div>
          </Beat>

          {/* Scroll cue, only at the very start. */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="t-muted text-[0.68rem] uppercase tracking-[0.3em]"
            >
              Scroll
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
