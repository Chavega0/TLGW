import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Logo } from "./Logo";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > window.innerHeight * 0.7);
  });

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md transition-[background-color,box-shadow] duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(243,236,220,0.88)" : "rgba(43,39,35,0.0)",
        boxShadow: scrolled ? "0 8px 32px rgba(43,39,35,0.08)" : "none",
      }}
    >
      <nav className="mx-auto max-w-6xl px-5 md:px-6 h-16 flex items-center justify-between gap-3">
        <a href="#top" aria-label="Stacktik home" className="flex items-center shrink-0">
          <Logo dark={!scrolled} />
        </a>
        <div
          className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-500 ${
            scrolled ? "text-ink-soft" : "text-cream/80"
          }`}
        >
          <a href="#services" className="hover:text-terracotta transition-colors">
            Services
          </a>
          <a href="#how" className="hover:text-terracotta transition-colors">
            How we work
          </a>
          <a href="#who" className="hover:text-terracotta transition-colors">
            Who it's for
          </a>
        </div>
        <a
          href="#blueprint"
          className="rounded-full bg-terracotta text-cream px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm font-semibold whitespace-nowrap hover:bg-terracotta-deep transition-colors"
        >
          <span className="md:hidden">Free blueprint</span>
          <span className="hidden md:inline">Get your free blueprint</span>
        </a>
      </nav>
    </motion.header>
  );
}
