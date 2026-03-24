"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Heart, Award } from "lucide-react";

interface HomepageData {
  aboutText1?: string | null;
  aboutText2?: string | null;
  aboutText3?: string | null;
  founderQuote?: string | null;
}

const values = [
  {
    icon: Heart,
    title: "Atendimento Humanizado",
    description:
      "Cada cliente recebe atenção individual, consultoria de estilo e um cuidado que vai além do procedimento.",
  },
  {
    icon: Sparkles,
    title: "Naturalidade com Elegância",
    description:
      "Realçamos a sua beleza natural sem exageros — cílios leves, sobrancelhas harmoniosas, unhas com personalidade.",
  },
  {
    icon: Award,
    title: "Qualidade Contínua",
    description:
      "Investimento constante em cursos e técnicas para garantir os melhores resultados do mercado de beleza.",
  },
];

const defaultTexts = {
  aboutText1:
    "O AL Beauty Studio nasceu da paixão de Ana Laura Fagundes pelo autocuidado e pela transformação pessoal. Aos 20 anos, Ana Laura fundou um espaço com um propósito claro: fazer com que cada cliente se sentisse acolhida, segura e valorizada.",
  aboutText2:
    "A filosofia do studio vai além dos procedimentos. Acreditamos que detalhes pequenos têm o poder de transformar a forma como cada mulher se enxerga.",
  aboutText3:
    "Nossa especialidade está em resultados que parecem naturais — cílios que realçam sem pesar, sobrancelhas que seguem o contorno natural, e unhas que contam a sua história.",
  founderQuote: "Acredito que cada cliente merece se sentir única — não apenas bonita.",
};

export default function About({ homepage }: { homepage?: HomepageData | null }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const t1    = homepage?.aboutText1    ?? defaultTexts.aboutText1;
  const t2    = homepage?.aboutText2    ?? defaultTexts.aboutText2;
  const t3    = homepage?.aboutText3    ?? defaultTexts.aboutText3;
  const quote = homepage?.founderQuote  ?? defaultTexts.founderQuote;

  return (
    <section ref={ref} className="py-24 px-5 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(196,136,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--accent)" }}>
              Nossa História
            </p>
            <h2 className="font-serif font-light text-5xl md:text-6xl leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
              Sobre o{" "}
              <span style={{ color: "var(--accent)" }} className="italic">
                Studio
              </span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>{t1}</p>
              <p>{t2}</p>
              <p>{t3}</p>
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="font-serif italic text-lg" style={{ color: "var(--accent)" }}>
                &ldquo;{quote}&rdquo;
              </p>
              <p className="font-serif italic text-base mt-2" style={{ color: "var(--accent)" }}>
                Ana Laura Fagundes
              </p>
              <p className="text-xs font-sans tracking-[0.15em] uppercase mt-1" style={{ color: "var(--text-muted)" }}>
                Fundadora · AL Beauty Studio
              </p>
            </div>
          </motion.div>

          {/* Right — values cards */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
            }}
          >
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="flex gap-4 p-5 rounded-2xl border"
                style={{ background: "var(--surface)", borderColor: "var(--border-subtle)" }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(196,136,110,0.12)" }}
                >
                  <Icon size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
