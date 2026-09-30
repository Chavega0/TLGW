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
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JCTza2MGAYDg9eWeuWorQ0PdNR/hf_20260930_212446_8525749e-2a12-406e-ad39-a40186c09ca7.mp4";

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

/* Scroll-scrubbed film: scroll position drives video.currentTime.
   Seeks are chased via the 'seeked' event — a new seek is issued only
   when the previous one lands, always toward the LATEST target — so
   the film converges in both directions and scrolling back up cleanly
   rewinds to the intro instead of sticking on a late frame. */
function ScrubVideo({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState(LOCAL_SRC);
  const target = useRef(0);
  const pending = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seekToTarget = () => {
      if (!video.duration) return;
      const t = reduced
        ? Math.max(0, video.duration - 0.08)
        : target.current * Math.max(0, video.duration - 0.08);
      if (Math.abs(video.currentTime - t) < 0.034) {
        pending.current = false;
        return;
      }
      pending.current = true;
      video.currentTime = t;
    };
    const onSeeked = () => seekToTarget();
    const onLoaded = () => seekToTarget();
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("seeked", onSeeked);
    (video as unknown as { __seek?: () => void }).__seek = seekToTarget;
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [src]);

  useMotionValueEvent(progress, "change", (p) => {
    target.current = Math.min(1, Math.max(0, p));
    const video = ref.current as
      | (HTMLVideoElement & { __seek?: () => void })
      | null;
    if (!video || !video.duration || !video.__seek) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!pending.current) video.__seek();
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

  // The film ends with the laptop screen centered, nearly filling the
  // frame — the REAL camera does the dive. CSS only finishes the move.
  const SCREEN_ORIGIN = "50% 50%";

  // Film: the dolly-in scrubs across most of the stage.
  const filmProgress = useTransform(p, [0, 0.78], [0, 1]);
  // Final push: carry the screen's edges past the viewport…
  const zoom = useTransform(p, [0.66, 0.9], [1, 1.9]);
  // …and the footage dissolves only once the UI already covers it.
  const filmOpacity = useTransform(p, [0.84, 0.94], [1, 0]);

  // Headline: lives on the scene, releases as the dolly begins.
  const introOpacity = useTransform(p, [0.14, 0.26], [1, 0]);
  const introY = useTransform(p, [0.14, 0.26], [0, -48]);

  // The dashboard is ON the laptop screen for the whole approach:
  // it appears tiny at the screen's position as the headline releases
  // and grows with the camera (accelerating, like the dolly), so the
  // takeover is continuous — never a visible cut.
  const uiScale = useTransform(p, [0.24, 0.55, 0.88], [0.1, 0.3, 1]);
  const uiOpacity = useTransform(p, [0.24, 0.34], [0, 1]);
  // Track the screen: in the wide shot the laptop sits below center and
  // drifts up as the camera pushes in — the overlay rides that drift so
  // it stays ON the screen, never floating beside it.
  const uiY = useTransform(p, [0.24, 0.85], ["20%", "0%"]);
  // The page's cream arrives as a full-viewport layer BEHIND the
  // dashboard (never inside the scaled layer), so no edge is visible.
  const pageBgOpacity = useTransform(p, [0.82, 0.93], [0, 1]);
  // Lit-screen bloom while the UI is small; gone once it owns the page.
  const screenGlow = useTransform(
    p,
    [0.28, 0.8],
    ["0 0 70px 26px rgba(249,244,232,0.95)", "0 0 0px 0px rgba(249,244,232,0)"]
  );
  // The caption belongs to the page, not the laptop: it arrives last.
  const captionOpacity = useTransform(p, [0.86, 0.95], [0, 1]);

  return (
    <section id="top" ref={stageRef} data-theme-section="light" className="relative h-[280vh] bg-cream md:h-[420vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
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
            We build and connect the CRM, calling, outreach, and automation behind sales and
            support teams — chosen for your budget, implemented for the way you work.
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

        {/* Full-viewport page background: fades in beneath the dashboard
            as the takeover completes — its edges can never show. */}
        <motion.div
          style={{ opacity: pageBgOpacity }}
          className="absolute inset-0 z-[15] bg-cream"
          aria-hidden="true"
        />

        {/* The laptop screen's content, growing until it owns the page. */}
        <motion.div
          style={{
            scale: uiScale,
            y: uiY,
            opacity: uiOpacity,
            transformOrigin: SCREEN_ORIGIN,
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-4 will-change-transform md:gap-8 md:px-8"
        >
          <motion.div style={{ boxShadow: screenGlow }} className="w-full max-w-[880px] rounded-xl">
            <SystemMock step={4} />
          </motion.div>
          <motion.p
            style={{ opacity: captionOpacity }}
            className="t-muted max-w-md text-center text-[0.88rem] leading-relaxed md:text-[0.98rem]"
          >
            Leads answered, calls in context, nothing falling through — one system your team
            actually uses.
          </motion.p>
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
