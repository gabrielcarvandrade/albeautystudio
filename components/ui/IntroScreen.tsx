"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"loading" | "reveal" | "exit">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 800);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(() => setVisible(false), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "var(--background)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Soft radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,136,110,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative text-center px-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={phase !== "loading" ? { opacity: 1, letterSpacing: "0.35em" } : {}}
              transition={{ duration: 0.8 }}
              className="text-[10px] font-sans font-semibold uppercase tracking-[0.35em] mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Beauty Studio · Lavras
            </motion.p>

            {/* Studio name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase !== "loading" ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <h1
                className="font-serif font-light text-5xl md:text-6xl tracking-widest"
                style={{ color: "var(--text-primary)", letterSpacing: "0.18em" }}
              >
                AL
                <span style={{ color: "var(--accent)" }}> Beauty</span>
              </h1>
            </motion.div>

            {/* Studio subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase !== "loading" ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-sans text-xs tracking-[0.3em] uppercase mt-3"
              style={{ color: "var(--text-muted)" }}
            >
              Studio
            </motion.p>

            {/* Elegant line loader */}
            <motion.div
              className="mt-8 mx-auto h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase !== "loading" ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 font-serif italic text-base"
              style={{ color: "var(--accent)" }}
            >
              Naturalidade com Elegância
            </motion.p>
          </div>

          {/* Exit curtain */}
          <AnimatePresence>
            {phase === "exit" && (
              <motion.div
                className="absolute inset-0 origin-bottom"
                style={{ background: "var(--background)" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
