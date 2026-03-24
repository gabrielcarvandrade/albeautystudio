"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  y: number;
}

const PETAL_COLORS = [
  "rgba(196,136,110,0.45)",
  "rgba(232,193,180,0.5)",
  "rgba(201,168,124,0.4)",
  "rgba(196,136,110,0.3)",
  "rgba(229,208,176,0.45)",
];

export default function FloatingPetals({ count = 18 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petals = useRef<Petal[]>([]);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Petal => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 120,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(0.4 + Math.random() * 0.7),
      size: 5 + Math.random() * 8,
      opacity: 0,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    });

    petals.current = Array.from({ length: count }, () => {
      const p = spawn();
      p.y = Math.random() * (canvas.height + 200) - 200;
      p.opacity = Math.random() * 0.6;
      return p;
    });

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Teardrop / petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 0.6, p.size * 0.6, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.6, -p.size * 0.6, -p.size * 0.6, 0, -p.size);
      ctx.fillStyle = p.color;
      ctx.fill();

      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.current.forEach((p, i) => {
        p.x += p.vx + Math.sin(p.y * 0.008) * 0.4;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Fade in/out
        if (p.y > canvas.height * 0.8) {
          p.opacity = Math.min(p.opacity + 0.008, 0.65);
        }
        if (p.y < canvas.height * 0.2) {
          p.opacity = Math.max(p.opacity - 0.006, 0);
        }

        if (p.y < -p.size * 2) {
          petals.current[i] = spawn();
        }

        drawPetal(p);
      });

      rafId.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
