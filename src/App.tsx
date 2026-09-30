import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Discovery } from "./components/Discovery";
import { Services } from "./components/Services";
import { Workflow } from "./components/Workflow";
import { WhoFor } from "./components/WhoFor";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  // Damped smooth scroll — smooths the read, never hijacks input.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Cross-section theme morph: flip the page theme when a chapter
  // crosses the viewport center line (IO discrete snap).
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = (entry.target as HTMLElement).dataset.themeSection;
            if (theme) document.documentElement.dataset.theme = theme;
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll<HTMLElement>("[data-theme-section]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Discovery />
        <Services />
        <Workflow />
        <WhoFor />
        <CTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
