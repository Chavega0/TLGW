import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { WordsPullUp, EASE } from "./motion";
import { SystemMock } from "./Workflow";

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

/* The hero is ONE continuous shot: the page opens inside the scene,
   the headline sits on the footage, scroll dollies the camera toward
   the laptop on the desk, the view dives into its screen, and the
   product UI grows out of that screen until it IS the page. */
export function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // The film's laptop sits centered, lower third of frame.
  const SCREEN_ORIGIN = "50% 62%";

  // Film: scrubs through the first 80% of the stage, then the zoom
  // carries the rest.
  const filmProgress = useTransform(p, [0, 0.8], [0, 1]);
  const zoom = useTransform(p, [0.34, 0.8], [1, 4.2]);
  const filmOpacity = useTransform(p, [0.74, 0.9], [1, 0]);

  // Headline: lives on the scene, releases as the dolly begins.
  const introOpacity = useTransform(p, [0.14, 0.3], [1, 0]);
  const introY = useTransform(p, [0.14, 0.3], [0, -48]);

  // The screen's content takes over the page.
  const uiScale = useTransform(p, [0.34, 0.8], [0.2, 1]);
  const uiOpacity = useTransform(p, [0.56, 0.75], [0, 1]);
  const uiRadius = useTransform(p, [0.56, 0.88], [12, 0]);

  return (
    <section id="top" ref={stageRef} data-theme-section="light" className="relative h-[420vh] bg-cream">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* The scene — full-bleed, no frame: the page IS the footage. */}
        <motion.div
          style={{ scale: zoom, opacity: filmOpacity, transformOrigin: SCREEN_ORIGIN }}
          className="absolute inset-0 will-change-transform"
          aria-hidden="true"
        >
          <ScrubVideo progress={filmProgress} />
          {/* The page's cream dissolves into the sky at the top edge. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-cream/85 via-cream/30 to-transparent" />
        </motion.div>

        {/* The headline, typeset on the scene itself. */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="relative z-10 mx-auto max-w-[1200px] px-6 pt-28 text-center md:pt-32"
        >
          <h1 className="font-display text-ink text-[clamp(2.7rem,6.4vw,5.6rem)] leading-[1.0] [text-shadow:0_1px_24px_rgba(243,236,220,0.55)]">
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
            className="text-ink-soft mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed [text-shadow:0_1px_18px_rgba(243,236,220,0.6)]"
          >
            Stacktik helps growing businesses choose, implement, and connect the software they
            need to run better — as one system.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.85, ease: EASE }}
            className="mt-9 flex justify-center"
          >
            <ArrowPill href="#blueprint">Get your free systems blueprint</ArrowPill>
          </motion.div>
        </motion.div>

        {/* The laptop screen's content, growing until it owns the page. */}
        <motion.div
          style={{
            scale: uiScale,
            opacity: uiOpacity,
            borderRadius: uiRadius,
            transformOrigin: SCREEN_ORIGIN,
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 bg-cream px-4 will-change-transform md:px-8"
        >
          <div className="w-full max-w-[880px]">
            <SystemMock step={4} />
          </div>
          <p className="t-muted max-w-md text-center text-[0.98rem] leading-relaxed">
            One connected system — leads, calls, tasks, and pipeline, in the place your team
            already works.
          </p>
        </motion.div>

        {/* Scroll cue, first moments only. */}
        <motion.div
          style={{ opacity: useTransform(p, [0, 0.06], [1, 0]) }}
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="text-ink-soft text-[0.68rem] uppercase tracking-[0.3em]"
          >
            Scroll
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
