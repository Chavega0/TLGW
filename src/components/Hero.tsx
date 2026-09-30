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
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_205801_55a5418e-fdab-4810-bb76-ad4c2ae5f747.mp4";

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

/* Scroll-scrubbed film: scroll position drives video.currentTime, so
   the footage advances exactly in step with the user's scrolling. */
function ScrubVideo({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState(LOCAL_SRC);
  const raf = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onLoaded = () => {
      if (video.duration) {
        video.currentTime = reduced
          ? Math.max(0, video.duration - 0.08)
          : target.current * Math.max(0, video.duration - 0.08);
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

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  // Tilt: resolves as the panel travels up into place.
  const { scrollYProgress: approach } = useScroll({
    target: stageRef,
    offset: ["start 0.92", "start 0.08"],
  });
  // Scrub: the film plays across the stage's full scroll budget.
  const { scrollYProgress: scrub } = useScroll({
    target: stageRef,
    offset: ["start 0.92", "end end"],
  });

  const rotateX = useTransform(approach, [0, 1], [18, 0]);
  const scale = useTransform(approach, [0, 1], [0.9, 1]);
  const shadow = useTransform(
    approach,
    [0, 1],
    ["0 60px 120px rgba(33,29,25,0.18)", "0 32px 90px rgba(33,29,25,0.3)"]
  );

  return (
    <section id="top" data-theme-section="light">
      {/* Mercury-style centered intro. */}
      <div className="mx-auto max-w-[1200px] px-6 pt-36 pb-14 text-center md:pt-44">
        <h1 className="font-display t-text text-[clamp(2.9rem,7vw,6.2rem)] leading-[1.0]">
          <WordsPullUp text="Your software," className="justify-center" />
          <br />
          <span className="inline-flex flex-wrap justify-center">
            <WordsPullUp text="working as" className="justify-center" />
            <span className="inline-block" style={{ width: "0.24em" }} />
            <motion.span
              className="inline-block text-terracotta"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.85, ease: EASE }}
            >
              one.
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.85, ease: EASE }}
          className="t-muted mx-auto mt-8 max-w-xl text-[1.08rem] leading-relaxed"
        >
          Stacktik helps growing businesses choose, implement, and connect the software they need
          to run better — CRM, business phone, sales tools, and automation, as one system.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.85, ease: EASE }}
          className="mt-10 flex justify-center"
        >
          <ArrowPill href="#blueprint">Get your free systems blueprint</ArrowPill>
        </motion.div>
      </div>

      {/* The demo panel: tilted in perspective, it straightens as you
          scroll into it, then pins while the film scrubs with scroll. */}
      <div ref={stageRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div style={{ perspective: "1300px" }} className="w-full px-4 md:px-8">
            <motion.div
              style={{ rotateX, scale, boxShadow: shadow, transformOrigin: "center 20%" }}
              className="mx-auto aspect-[16/9] w-full max-w-[1160px] overflow-hidden rounded-[1.2rem] bg-[#2c3a2e] will-change-transform"
            >
              <ScrubVideo progress={scrub} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
