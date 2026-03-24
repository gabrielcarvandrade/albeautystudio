"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Eye, Sparkles, PenLine, Wand2, Palette, ArrowRight } from "lucide-react";

interface Service {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  details: readonly string[];
  icon: string;
  image?: string | null;
  featured: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  eye: Eye,
  sparkles: Sparkles,
  "pen-line": PenLine,
  "wand-sparkles": Wand2,
  palette: Palette,
};

export default function Services({
  services,
  whatsapp = "5535999999999",
}: {
  services: Service[];
  whatsapp?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-5 relative" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
            O que oferecemos
          </p>
          <h2 className="font-serif font-light text-5xl md:text-6xl section-heading" style={{ color: "var(--text-primary)" }}>
            Nossos{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              Serviços
            </span>
          </h2>
          <p className="mt-6 text-sm max-w-md mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Cada procedimento é pensado para realçar a sua beleza natural com técnica, cuidado e personalidade.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            return (
              <motion.div
                key={service.slug}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="service-card group p-6 rounded-2xl border bg-[var(--background)] flex flex-col gap-4"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(196,136,110,0.1)" }}
                >
                  <Icon size={18} style={{ color: "var(--accent)" }} />
                </div>

                <div className="flex-1">
                  <p className="text-[10px] font-sans tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    {service.subtitle}
                  </p>
                  <h3 className="font-serif font-medium text-xl mb-2.5" style={{ color: "var(--text-primary)" }}>
                    {service.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-1.5 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                  {service.details.slice(0, 3).map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      {detail}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/servicos#${service.slug}`}
                  className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: "var(--accent)" }}
                >
                  Saiba mais
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg"
            style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px rgba(196,136,110,0.2)" }}
          >
            <Sparkles size={14} />
            Agendar pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
