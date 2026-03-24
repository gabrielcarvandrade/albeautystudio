import { Heart, Sparkles, Award, Users } from "lucide-react";
import { reader } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história do AL Beauty Studio e sua fundadora Ana Laura Fagundes, em Lavras, MG.",
};

const values = [
  { icon: Heart,    title: "Cuidado Personalizado",  description: "Cada atendimento começa com uma consulta completa sobre estilo, rotina e expectativas da cliente." },
  { icon: Sparkles, title: "Resultados Naturais",     description: "Cílios que realçam sem pesar, sobrancelhas que respeitam o contorno natural, unhas que refletem personalidade." },
  { icon: Award,    title: "Excelência Técnica",      description: "Investimento contínuo em cursos, técnicas e produtos premium para resultados duradouros." },
  { icon: Users,    title: "Ambiente Acolhedor",      description: "Um espaço onde você se sente em casa. Segurança, conforto e respeito em cada visita." },
];

export default async function SobrePage() {
  const homepage = await reader.singletons.homepage.read().catch(() => null);

  const t1 = homepage?.aboutText1 ?? "O AL Beauty Studio nasceu da paixão de Ana Laura Fagundes pelo autocuidado e pela transformação pessoal. Aos 20 anos, ela fundou um espaço com um propósito claro: fazer com que cada cliente se sentisse acolhida, segura e valorizada.";
  const t2 = homepage?.aboutText2 ?? "A filosofia do studio vai além dos procedimentos. Cada detalhe é pensado para transmitir cuidado e respeito, desde a escolha dos produtos até a forma como cada cliente é recebida.";
  const t3 = homepage?.aboutText3 ?? "Com investimento constante em técnica e formação, o AL Beauty Studio se mantém na vanguarda das tendências de beleza, sempre sem perder a essência: naturalidade com elegância.";
  const quote = homepage?.founderQuote ?? "Acredito que cada cliente merece se sentir única — não apenas bonita.";

  return (
    <div className="pt-16 min-h-screen" style={{ background: "var(--background)" }}>
      <div className="py-20 px-5 text-center relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(196,136,110,0.07) 0%, transparent 70%)" }} />
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
          Nossa História
        </p>
        <h1 className="font-serif font-light text-6xl md:text-7xl" style={{ color: "var(--text-primary)" }}>
          Sobre o{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>Studio</span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start mb-20">
          {/* Photo placeholder */}
          <div className="aspect-[3/4] rounded-3xl flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #EDE0D7, #E0CFC2)" }}>
            <div className="absolute inset-0"
              style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35) 0%, transparent 55%)" }} />
            <div className="relative text-center">
              <p className="font-serif italic text-2xl" style={{ color: "rgba(42,26,20,0.45)" }}>Ana Laura</p>
              <p className="text-xs font-sans tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(42,26,20,0.35)" }}>Fundadora</p>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-6 pt-4">
            <div>
              <p className="font-serif italic text-xl mb-1" style={{ color: "var(--accent)" }}>Ana Laura Fagundes</p>
              <p className="text-xs font-sans tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
                Fundadora · AL Beauty Studio
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>{t1}</p>
              <p>{t2}</p>
              <p>{t3}</p>
            </div>
            <blockquote className="border-l-2 pl-4 py-1" style={{ borderColor: "var(--accent)" }}>
              <p className="font-serif italic text-base" style={{ color: "var(--accent)" }}>&ldquo;{quote}&rdquo;</p>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>— Ana Laura Fagundes</p>
            </blockquote>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-10">
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--accent)" }}>
              O que nos move
            </p>
            <h2 className="font-serif font-light text-4xl" style={{ color: "var(--text-primary)" }}>
              Nossos <span className="italic" style={{ color: "var(--accent)" }}>Valores</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl border"
                style={{ background: "var(--surface)", borderColor: "var(--border-subtle)" }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(196,136,110,0.1)" }}>
                  <Icon size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
