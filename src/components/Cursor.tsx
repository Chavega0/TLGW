import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* Trailing cursor ring (adapted from 21st.dev soralabs/custom-cursor):
   spring-follows the pointer and swells over interactive elements.
   Desktop fine-pointer only; native cursor stays visible. */
export function Cursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 24, stiffness: 220, mass: 0.7 });
  const springY = useSpring(y, { damping: 24, stiffness: 220, mass: 0.7 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || prefersReduced) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled, prefersReduced, x, y]);

  if (!enabled || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 52 : 26,
        height: hovering ? 52 : 26,
        borderColor: "#C4552B",
        borderWidth: 1.5,
        backgroundColor: hovering ? "rgba(196,85,43,0.12)" : "rgba(196,85,43,0)",
      }}
      transition={{ duration: 0.35, ease: [0.625, 0.05, 0, 1] }}
    />
  );
}
