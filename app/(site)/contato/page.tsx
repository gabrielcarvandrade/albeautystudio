import { MessageCircle, Instagram, MapPin, Clock, Phone } from "lucide-react";
import { reader } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o AL Beauty Studio. Agende pelo WhatsApp ou Instagram. Lavras, MG.",
};

export default async function ContatoPage() {
  const settings = await reader.singletons.settings.read().catch(() => null);

  const whatsapp      = settings?.whatsapp      ?? "5535999999999";
  const instagramUrl  = settings?.instagramUrl  ?? "https://www.instagram.com/albeautystudio.lavras/";
  const instagram     = settings?.instagram     ?? "@albeautystudio.lavras";
  const address       = settings?.address       ?? "Lavras, Minas Gerais";
  const hours         = settings?.hours         ?? "Segunda a Sábado · 9h–18h";

  return (
    <div className="pt-16 min-h-screen" style={{ background: "var(--background)" }}>
      {/* Hero */}
      <div className="py-20 px-5 text-center relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(196,136,110,0.07) 0%, transparent 70%)" }} />
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
          Fale conosco
        </p>
        <h1 className="font-serif font-light text-6xl md:text-7xl" style={{ color: "var(--text-primary)" }}>
          Entre em <span className="italic" style={{ color: "var(--accent)" }}>Contato</span>
        </h1>
        <p className="mt-5 text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Agende seu horário, tire suas dúvidas ou simplesmente venha nos conhecer.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Contact methods */}
          <div className="space-y-5">
            <h2 className="font-serif font-light text-3xl mb-6" style={{ color: "var(--text-primary)" }}>
              Como falar <span className="italic" style={{ color: "var(--accent)" }}>conosco</span>
            </h2>

            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex gap-4 p-5 rounded-2xl border transition-all duration-300 hover:shadow-md"
              style={{ background: "var(--accent)", borderColor: "var(--accent)" }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                <MessageCircle size={16} color="#fff" />
              </div>
              <div>
                <p className="font-sans font-medium text-sm mb-0.5 text-white">WhatsApp</p>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                  A forma mais rápida de agendar. Resposta em até 2h.
                </p>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  Enviar mensagem →
                </p>
              </div>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
              className="flex gap-4 p-5 rounded-2xl border transition-all duration-300 hover:shadow-md"
              style={{ background: "var(--surface)", borderColor: "var(--border-subtle)" }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(196,136,110,0.1)" }}>
                <Instagram size={16} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="font-sans font-medium text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>Instagram</p>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
                  Acompanhe nosso trabalho, novidades e promoções.
                </p>
                <p className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                  {instagram} →
                </p>
              </div>
            </a>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h2 className="font-serif font-light text-3xl mb-6" style={{ color: "var(--text-primary)" }}>
              Informações
            </h2>
            <ul className="space-y-4">
              {[
                { icon: MapPin,  label: "Endereço",  value: address },
                { icon: Clock,   label: "Horário",   value: hours },
                { icon: Phone,   label: "WhatsApp",  value: `+${whatsapp}` },
                { icon: Instagram, label: "Instagram", value: instagram },
              ].map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(196,136,110,0.1)" }}>
                    <Icon size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-sans tracking-[0.12em] uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
