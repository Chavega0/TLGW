import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Mark } from "./Logo";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--page-bg) 72%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
        transition: "background-color .5s ease, border-color .5s ease",
      }}
    >
      <nav className="mx-auto flex h-12 max-w-[1200px] items-center justify-between gap-3 px-6">
        <a href="#top" aria-label="Stacktik home" className="flex items-center gap-2 select-none">
          <Mark color="#C4552B" size={20} />
          <span className="t-text text-[1.05rem] font-semibold tracking-tight leading-none">
            stack<span className="text-terracotta">tik</span>
          </span>
        </a>
        <div className="t-muted hidden items-center gap-7 text-[0.82rem] font-medium md:flex">
          <a href="#services" className="hover:text-terracotta transition-colors">Services</a>
          <a href="#how" className="hover:text-terracotta transition-colors">How we work</a>
          <a href="#system" className="hover:text-terracotta transition-colors">The system</a>
          <a href="#partners" className="hover:text-terracotta transition-colors">Partners</a>
          <a href="#who" className="hover:text-terracotta transition-colors">Who it's for</a>
        </div>
        <a
          href="#blueprint"
          className="rounded-full bg-terracotta px-4 py-1.5 text-[0.78rem] font-semibold text-cream whitespace-nowrap hover:bg-terracotta-deep transition-colors"
        >
          Free blueprint
        </a>
      </nav>
    </motion.header>
  );
}
