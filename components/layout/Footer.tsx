import Link from "next/link";
import { Instagram, Phone, MapPin, Heart } from "lucide-react";

interface FooterProps {
  whatsapp?: string;
  instagramUrl?: string;
  settings?: {
    instagram?: string | null;
    address?: string | null;
    hours?: string | null;
    tagline?: string | null;
  } | null;
}

const services = [
  { href: "/servicos#extensao-de-cilios",    label: "Extensão de Cílios" },
  { href: "/servicos#lash-lifting",          label: "Lash Lifting" },
  { href: "/servicos#design-de-sobrancelha", label: "Design de Sobrancelha" },
  { href: "/servicos#brow-lamination",       label: "Brow Lamination" },
  { href: "/servicos#nail-design",           label: "Nail Design" },
];

export default function Footer({
  whatsapp = "5535999999999",
  instagramUrl = "https://www.instagram.com/albeautystudio.lavras/",
  settings,
}: FooterProps) {
  const instagram = settings?.instagram ?? "@albeautystudio.lavras";
  const address   = settings?.address   ?? "Lavras, Minas Gerais";
  const tagline   = settings?.tagline   ?? "Naturalidade com Elegância";

  return (
    <footer className="mt-0 border-t" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div>
            <h3 className="font-serif font-light text-2xl tracking-[0.15em]" style={{ color: "var(--text-primary)" }}>
              AL <span style={{ color: "var(--accent)" }}>Beauty</span>
            </h3>
            <p className="text-xs font-sans tracking-[0.2em] uppercase mt-0.5" style={{ color: "var(--text-muted)" }}>
              Studio · Lavras, MG
            </p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Um espaço onde cada cliente se sente acolhida, segura e valorizada.
            {tagline && ` ${tagline} em cada detalhe.`}
          </p>
          <p className="font-serif italic text-sm" style={{ color: "var(--accent)" }}>
            &ldquo;Detalhes pequenos têm o poder de transformar.&rdquo;
          </p>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Serviços
          </h4>
          <ul className="space-y-2">
            {services.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Contato
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)" }}
              >
                <Instagram size={14} />
                {instagram}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)" }}
              >
                <Phone size={14} />
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <MapPin size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
              {address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t px-5 py-5" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} AL Beauty Studio · Todos os direitos reservados
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
            Feito com <Heart size={10} style={{ color: "var(--accent)" }} fill="currentColor" /> para Ana Laura
          </p>
        </div>
      </div>
    </footer>
  );
}
