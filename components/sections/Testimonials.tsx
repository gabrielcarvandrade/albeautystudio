"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  slug: string;
  name: string;
  service: string;
  text: string;
  rating: number;
}

const fallback: Testimonial[] = [
  { slug: "1", name: "Mariana S.", service: "Extensão de Cílios", text: "Amei o resultado! A Ana Laura é super cuidadosa e atenciosa. Meus cílios ficaram perfeitos e duradouros. Com certeza voltarei!", rating: 5 },
  { slug: "2", name: "Juliana R.",  service: "Brow Lamination",    text: "Nunca tinha feito laminação de sobrancelhas e fiquei encantada. O resultado ficou muito natural e as minhas sobrancelhas ficaram impecáveis.", rating: 5 },
  { slug: "3", name: "Fernanda L.", service: "Nail Design",         text: "A Dalath é incrível! Fez exatamente o que eu queria — unhas delicadas e com personalidade. O atendimento é muito acolhedor.", rating: 5 },
];

export default function Testimonials({ testimonials }: { testimonials?: Testimonial[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const items = testimonials?.length ? testimonials : fallback;

  return (
    <section ref={ref} className="py-24 px-5 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(196,136,110,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
            Avaliações
          </p>
          <h2 className="font-serif font-light text-5xl md:text-6xl section-heading" style={{ color: "var(--text-primary)" }}>
            O que dizem{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              nossas clientes
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        >
          {items.map((t) => (
            <motion.div
              key={t.slug}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="p-6 rounded-2xl border flex flex-col gap-4"
              style={{ background: "var(--background)", borderColor: "var(--border-subtle)" }}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                <p className="font-sans font-medium text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.service}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
