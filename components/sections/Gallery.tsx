"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Instagram, ExternalLink } from "lucide-react";

interface GalleryItem {
  slug: string;
  label: string;
  category: string;
  image?: string | null;
  aspect: string;
}

const placeholderBgs = ["#EDE0D7","#E8D5C8","#DFD0C4","#E5D8CD","#EAD9CE","#DDD0C6","#EDE5DC","#E8D8CC"];

export default function Gallery({
  items,
  instagramUrl = "https://www.instagram.com/albeautystudio.lavras/",
}: {
  items?: GalleryItem[];
  instagramUrl?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const displayItems =
    items && items.length > 0
      ? items
      : [
          { slug: "1", label: "Extensão de Cílios",    category: "Cílios",       image: null, aspect: "portrait" },
          { slug: "2", label: "Lash Lifting",           category: "Cílios",       image: null, aspect: "square"   },
          { slug: "3", label: "Design de Sobrancelha",  category: "Sobrancelhas", image: null, aspect: "square"   },
          { slug: "4", label: "Brow Lamination",        category: "Sobrancelhas", image: null, aspect: "square"   },
          { slug: "5", label: "Nail Design",            category: "Unhas",        image: null, aspect: "portrait" },
          { slug: "6", label: "Nail Art",               category: "Unhas",        image: null, aspect: "square"   },
        ];

  return (
    <section ref={ref} className="py-24 px-5 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,168,124,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
            Portfólio
          </p>
          <h2 className="font-serif font-light text-5xl md:text-6xl section-heading" style={{ color: "var(--text-primary)" }}>
            Nossa{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              Galeria
            </span>
          </h2>
          <p className="mt-6 text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Cada trabalho conta uma história de cuidado, técnica e elegância.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        >
          {displayItems.map((item, i) => (
            <motion.div
              key={item.slug}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`gallery-item relative rounded-2xl overflow-hidden group ${
                item.aspect === "portrait" && (i === 0 || i === 4) ? "row-span-2" : ""
              }`}
              style={{ background: placeholderBgs[i % placeholderBgs.length] }}
            >
              <div className={`w-full relative ${item.aspect === "portrait" ? "aspect-[3/4]" : "aspect-square"}`}>
                {item.image ? (
                  <Image src={item.image} alt={item.label} fill className="object-cover" />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ opacity: 0.35 }}>
                      {[0,45,90,135,180,225,270,315].map((angle, j) => (
                        <ellipse key={j}
                          cx={14 + Math.cos((angle * Math.PI) / 180) * 7}
                          cy={14 + Math.sin((angle * Math.PI) / 180) * 7}
                          rx="3.5" ry="1.4"
                          transform={`rotate(${angle} ${14 + Math.cos((angle * Math.PI) / 180) * 7} ${14 + Math.sin((angle * Math.PI) / 180) * 7})`}
                          fill="rgba(196,136,110,0.9)"
                        />
                      ))}
                      <circle cx="14" cy="14" r="2.5" fill="rgba(196,136,110,0.9)" />
                    </svg>
                    <span className="text-[10px] font-sans" style={{ color: "rgba(42,26,20,0.5)" }}>{item.label}</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(196,136,110,0.15)", backdropFilter: "blur(2px)" }}
                >
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-sans font-medium px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.9)", color: "var(--accent)" }}
                  >
                    <Instagram size={11} />
                    Ver no Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
            style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
          >
            <Instagram size={14} />
            Ver mais no Instagram
            <ExternalLink size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
