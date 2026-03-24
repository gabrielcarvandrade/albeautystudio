"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX  = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const ringY  = useSpring(cursorY, { stiffness: 120, damping: 20 });
  const isHovering = useRef(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    document.documentElement.classList.add("hide-cursor");

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };

    const interactives = "a, button, [role='button'], input, textarea, select, label";
    const addListeners = () => {
      document.querySelectorAll<HTMLElement>(interactives).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", move);
    addListeners();

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: "var(--accent)",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid var(--accent)",
          opacity: 0.6,
        }}
      />
    </>
  );
}
