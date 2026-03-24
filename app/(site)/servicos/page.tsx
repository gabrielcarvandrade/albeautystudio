import { Eye, Sparkles, PenLine, Wand2, Palette, Check, MessageCircle } from "lucide-react";
import Image from "next/image";
import { reader } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Extensão de cílios, lash lifting, design de sobrancelhas, brow lamination e nail design em Lavras, MG.",
};

const iconMap: Record<string, React.ElementType> = {
  eye: Eye,
  sparkles: Sparkles,
  "pen-line": PenLine,
  "wand-sparkles": Wand2,
  palette: Palette,
};

const fallbackBgs = ["#EDE0D7","#E8D5C8","#DFD0C4","#E5D8CD","#EAD9CE"];

export default async function ServicosPage() {
  const [raw, settings] = await Promise.all([
    reader.collections.services.all().catch(() => []),
    reader.singletons.settings.read().catch(() => null),
  ]);

  const services = raw.map((s) => ({
    slug:        s.slug,
    name:        s.entry.name as string,
    subtitle:    s.entry.subtitle,
    description: s.entry.description,
    details:     s.entry.details as string[],
    icon:        s.entry.icon,
    image:       s.entry.image ?? null,
  }));

  const whatsapp = settings?.whatsapp ?? "5535999999999";

  return (
    <div className="pt-16 min-h-screen" style={{ background: "var(--background)" }}>
      <div className="py-20 px-5 text-center relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(196,136,110,0.08) 0%, transparent 70%)" }} />
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
          O que oferecemos
        </p>
        <h1 className="font-serif font-light text-6xl md:text-7xl" style={{ color: "var(--text-primary)" }}>
          Nossos{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>Serviços</span>
        </h1>
        <p className="mt-5 text-sm max-w-md mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Cada procedimento é realizado com técnica apurada, produtos de qualidade e atenção aos mínimos detalhes.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-16 space-y-20">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Sparkles;
          return (
            <div
              key={service.slug}
              id={service.slug}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Visual */}
              <div
                className="aspect-[4/3] rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${fallbackBgs[i]}, ${fallbackBgs[(i+1) % fallbackBgs.length]})` }}
              >
                <div className="absolute inset-0"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, transparent 55%)" }} />
                {service.image ? (
                  <Image src={service.image} alt={service.name} fill className="object-cover" />
                ) : (
                  <div className="relative flex flex-col items-center gap-3">
                    <Icon size={52} style={{ color: "rgba(196,136,110,0.45)" }} />
                    <span className="text-sm font-sans font-medium" style={{ color: "rgba(42,26,20,0.4)" }}>
                      {service.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-sans tracking-[0.25em] uppercase mb-2" style={{ color: "var(--accent)" }}>
                    {service.subtitle}
                  </p>
                  <h2 className="font-serif font-light text-4xl" style={{ color: "var(--text-primary)" }}>
                    {service.name}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {service.description}
                </p>
                <ul className="space-y-2.5">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                      {detail}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  <MessageCircle size={14} />
                  Agendar {service.name}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
