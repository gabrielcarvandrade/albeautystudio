"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, MapPin, Clock } from "lucide-react";

interface BookingProps {
  whatsapp?: string;
  instagramUrl?: string;
}

export default function Booking({
  whatsapp     = "5535999999999",
  instagramUrl = "https://www.instagram.com/albeautystudio.lavras/",
}: BookingProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-5 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,136,110,0.08) 0%, transparent 65%)" }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative motif */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-14" style={{ background: "linear-gradient(90deg, transparent, var(--accent))" }} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {[0,45,90,135,180,225,270,315].map((angle, i) => (
                <ellipse key={i}
                  cx={10 + Math.cos((angle * Math.PI) / 180) * 6}
                  cy={10 + Math.sin((angle * Math.PI) / 180) * 6}
                  rx="2.5" ry="1"
                  transform={`rotate(${angle} ${10 + Math.cos((angle * Math.PI) / 180) * 6} ${10 + Math.sin((angle * Math.PI) / 180) * 6})`}
                  fill="var(--accent)" opacity="0.7"
                />
              ))}
              <circle cx="10" cy="10" r="2" fill="var(--accent)" />
            </svg>
            <div className="h-px w-14" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />
          </div>

          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--accent)" }}>
            Agende seu horário
          </p>
          <h2 className="font-serif font-light text-5xl md:text-7xl mb-4" style={{ color: "var(--text-primary)" }}>
            Vem ser{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>você</span>
          </h2>
          <p className="font-serif italic text-lg mb-3" style={{ color: "var(--text-secondary)" }}>
            no seu melhor.
          </p>
          <p className="text-sm max-w-md mx-auto leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
            Agende seu horário pelo WhatsApp ou nos acompanhe no Instagram para ficar por dentro das novidades.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-14">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 6px 28px rgba(196,136,110,0.25)" }}
            >
              <MessageCircle size={16} />
              Agendar pelo WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium border transition-all duration-300 hover:bg-[var(--surface)]"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
            >
              <Instagram size={16} />
              Seguir no Instagram
            </a>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <div className="flex items-center gap-2">
              <MapPin size={13} style={{ color: "var(--accent)" }} />
              Lavras, Minas Gerais
            </div>
            <div className="h-3 w-px" style={{ background: "var(--border)" }} />
            <div className="flex items-center gap-2">
              <Clock size={13} style={{ color: "var(--accent)" }} />
              Seg – Sáb, 9h às 18h
            </div>
            <div className="h-3 w-px" style={{ background: "var(--border)" }} />
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
            >
              <Instagram size={13} style={{ color: "var(--accent)" }} />
              @albeautystudio.lavras
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
