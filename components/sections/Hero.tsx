"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Sparkles, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import FloatingPetals from "@/components/ui/FloatingPetals";

const taglines = [
  { text: "Naturalidade com Elegância", color: "var(--accent)" },
  { text: "Realçando a sua beleza única.", color: "var(--text-secondary)" },
  { text: "Lavras · Minas Gerais", color: "var(--text-muted)" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollY = useMotionValue(0);
  const contentY = useTransform(scrollY, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      scrollY.set(Math.max(0, Math.min(1, -rect.top / rect.height)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  // Mouse parallax on glow blobs
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const blobX1 = useSpring(useTransform(rawX, [-0.5, 0.5], [-24, 24]), { stiffness: 50, damping: 22 });
  const blobY1 = useSpring(useTransform(rawY, [-0.5, 0.5], [-16, 16]), { stiffness: 50, damping: 22 });
  const blobX2 = useSpring(useTransform(rawX, [-0.5, 0.5], [20, -20]), { stiffness: 35, damping: 28 });
  const blobY2 = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), { stiffness: 35, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Warm ivory base */}
      <div className="absolute inset-0" style={{ background: "var(--background)" }} />

      {/* Floating petals canvas */}
      <FloatingPetals count={20} />

      {/* Glow blobs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "15%", left: "10%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(196,136,110,0.13) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 1,
          x: blobX1,
          y: blobY1,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "10%", right: "8%",
          width: 450, height: 450,
          background: "radial-gradient(circle, rgba(201,168,124,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 1,
          x: blobX2,
          y: blobY2,
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "50%", right: "20%",
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(232,193,180,0.1) 0%, transparent 70%)",
          filter: "blur(35px)",
          zIndex: 1,
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,136,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,136,110,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative text-center px-5 max-w-4xl mx-auto"
        style={{ zIndex: 10, y: contentY }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Beauty Studio · Lavras, MG
        </motion.p>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-serif font-light leading-none mb-2 select-none"
            style={{
              fontSize: "clamp(4rem, 12vw, 9rem)",
              color: "var(--text-primary)",
              letterSpacing: "0.08em",
            }}
          >
            AL
          </h1>
          <h2
            className="font-serif font-light leading-none mb-8 select-none"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              color: "var(--accent)",
              letterSpacing: "0.18em",
            }}
          >
            Beauty Studio
          </h2>
        </motion.div>

        {/* Taglines */}
        <motion.div
          className="flex flex-col items-center gap-1.5 mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.35, delayChildren: 0.9 } },
          }}
        >
          {taglines.map(({ text, color }, i) => (
            <motion.p
              key={text}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className={`font-${i === 0 ? "serif italic" : "sans"} tracking-wide`}
              style={{ color, fontSize: i === 0 ? "1.1rem" : "0.8rem" }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2 }}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <Link href="/servicos">
            <Button variant="primary" size="lg">
              <Sparkles size={15} />
              Nossos Serviços
            </Button>
          </Link>
          <a
            href="https://wa.me/5535999999999"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              <Calendar size={15} />
              Agendar Horário
            </Button>
          </a>
        </motion.div>

        {/* Decorative line + social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <div className="h-px w-12" style={{ background: "var(--border)" }} />
          <a
            href="https://www.instagram.com/albeautystudio.lavras/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans tracking-[0.18em] uppercase transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}
          >
            @albeautystudio.lavras
          </a>
          <div className="h-px w-12" style={{ background: "var(--border)" }} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        style={{ zIndex: 10, color: "var(--text-muted)" }}
      >
        <span className="text-[10px] tracking-widest uppercase font-sans">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
