import { useEffect } from "react";
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
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
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

  return (
    <>
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
    </>
  );
}
