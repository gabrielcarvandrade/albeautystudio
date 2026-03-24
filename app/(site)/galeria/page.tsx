import { Instagram, ExternalLink } from "lucide-react";
import Image from "next/image";
import { reader } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Portfólio de trabalhos do AL Beauty Studio: cílios, sobrancelhas e nail design em Lavras, MG.",
};

const categories = ["Todos", "Cílios", "Sobrancelhas", "Unhas"];
const placeholderBgs = ["#EDE0D7","#E8D5C8","#DFD0C4","#E5D8CD","#EAD9CE","#E0D0C6","#EDE5DC","#E8D8CC","#DDD0C6","#EAD9CE","#E5D5C8","#E0D5CC"];

export default async function GaleriaPage() {
  const [galleryRaw, settings] = await Promise.all([
    reader.collections.gallery.all().catch(() => []),
    reader.singletons.settings.read().catch(() => null),
  ]);

  const items = galleryRaw.map((g) => ({
    slug:     g.slug,
    label:    g.entry.label as string,
    category: g.entry.category,
    image:    g.entry.image ?? null,
    aspect:   g.entry.aspect,
  }));

  const instagramUrl = settings?.instagramUrl ?? "https://www.instagram.com/albeautystudio.lavras/";

  const displayItems = items.length > 0 ? items : [
    { slug:"1", label:"Volume Russo",         category:"Cílios",       image:null, aspect:"portrait" },
    { slug:"2", label:"Design Natural",       category:"Sobrancelhas", image:null, aspect:"square"   },
    { slug:"3", label:"Clássico",             category:"Cílios",       image:null, aspect:"square"   },
    { slug:"4", label:"Nail Art Minimalista", category:"Unhas",        image:null, aspect:"square"   },
    { slug:"5", label:"Brow Lamination",      category:"Sobrancelhas", image:null, aspect:"portrait" },
    { slug:"6", label:"Híbrido",              category:"Cílios",       image:null, aspect:"square"   },
    { slug:"7", label:"Gel Nude",             category:"Unhas",        image:null, aspect:"square"   },
    { slug:"8", label:"Henna + Design",       category:"Sobrancelhas", image:null, aspect:"square"   },
    { slug:"9", label:"Lash Lifting",         category:"Cílios",       image:null, aspect:"portrait" },
    { slug:"10",label:"Nail Design Delicado", category:"Unhas",        image:null, aspect:"square"   },
    { slug:"11",label:"Mega Volume",          category:"Cílios",       image:null, aspect:"square"   },
    { slug:"12",label:"Micropigmentação",     category:"Sobrancelhas", image:null, aspect:"square"   },
  ];

  return (
    <div className="pt-16 min-h-screen" style={{ background: "var(--background)" }}>
      <div className="py-20 px-5 text-center relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,168,124,0.07) 0%, transparent 70%)" }} />
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
          Portfólio
        </p>
        <h1 className="font-serif font-light text-6xl md:text-7xl" style={{ color: "var(--text-primary)" }}>
          Nossa <span className="italic" style={{ color: "var(--accent)" }}>Galeria</span>
        </h1>
        <p className="mt-5 text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Cada trabalho é uma expressão de cuidado, técnica e elegância.
        </p>
        <div className="mt-6">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}>
            <Instagram size={14} />
            @albeautystudio.lavras
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 pt-10">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat, i) => (
            <span key={cat} className="px-4 py-1.5 rounded-full text-xs font-medium cursor-default"
              style={{
                background: i === 0 ? "var(--accent)" : "var(--surface)",
                color: i === 0 ? "#fff" : "var(--text-muted)",
                border: `1px solid ${i === 0 ? "var(--accent)" : "var(--border-subtle)"}`,
              }}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {displayItems.map((item, i) => (
            <div key={item.slug}
              className="gallery-item break-inside-avoid rounded-2xl overflow-hidden group relative"
              style={{ background: placeholderBgs[i % placeholderBgs.length] }}>
              <div className={`w-full relative ${item.aspect === "portrait" ? "aspect-[3/4]" : "aspect-square"}`}>
                {item.image ? (
                  <Image src={item.image} alt={item.label} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-40"
                    style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)" }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      {[0,45,90,135,180,225,270,315].map((angle, j) => (
                        <ellipse key={j}
                          cx={11 + Math.cos((angle * Math.PI) / 180) * 5.5}
                          cy={11 + Math.sin((angle * Math.PI) / 180) * 5.5}
                          rx="2.8" ry="1.1"
                          transform={`rotate(${angle} ${11 + Math.cos((angle * Math.PI) / 180) * 5.5} ${11 + Math.sin((angle * Math.PI) / 180) * 5.5})`}
                          fill="rgba(196,136,110,0.9)" />
                      ))}
                      <circle cx="11" cy="11" r="2" fill="rgba(196,136,110,0.9)" />
                    </svg>
                    <span className="text-[9px] font-sans" style={{ color: "rgba(42,26,20,0.55)" }}>{item.label}</span>
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(196,136,110,0.12)", backdropFilter: "blur(2px)" }}>
                  <span className="text-xs font-sans font-medium px-2 py-1 rounded"
                    style={{ background: "rgba(255,255,255,0.9)", color: "var(--accent)" }}>{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Quer ver mais trabalhos? Nos siga no Instagram!</p>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{ background: "var(--accent)", color: "#fff" }}>
            <Instagram size={14} />
            Ver Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
