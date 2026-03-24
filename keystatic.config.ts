import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: { kind: "local" },

  ui: {
    brand: { name: "AL Beauty Studio" },
    navigation: {
      Conteúdo: ["services", "testimonials", "gallery"],
      Studio: ["settings", "homepage"],
    },
  },

  collections: {
    /* ─── Serviços ─────────────────────────────────────────────── */
    services: collection({
      label: "Serviços",
      slugField: "name",
      path: "content/services/*",
      format: { data: "yaml" },
      columns: ["name", "subtitle"],
      schema: {
        name: fields.slug({
          name: { label: "Nome do Serviço" },
        }),
        subtitle: fields.text({
          label: "Subtítulo",
          description: "Frase curta. Ex: Volume & Naturalidade",
        }),
        description: fields.text({
          label: "Descrição",
          multiline: true,
          description: "Texto explicativo que aparece no card do serviço",
        }),
        details: fields.array(
          fields.text({ label: "Item" }),
          {
            label: "Detalhes",
            description: "Características ou informações do serviço",
            itemLabel: (props) => props.value || "Novo item",
          }
        ),
        icon: fields.select({
          label: "Ícone",
          description: "Ícone que identifica o serviço visualmente",
          options: [
            { value: "eye",           label: "👁  Olho — Extensão de Cílios" },
            { value: "sparkles",      label: "✨ Estrelas — Lash Lifting" },
            { value: "pen-line",      label: "✏️  Caneta — Design de Sobrancelha" },
            { value: "wand-sparkles", label: "🪄 Varinha — Brow Lamination" },
            { value: "palette",       label: "🎨 Paleta — Nail Design" },
          ],
          defaultValue: "sparkles",
        }),
        image: fields.image({
          label: "Foto do Serviço",
          description: "Imagem representativa. Recomendado: 800×600 px",
          directory: "public/images/services",
          publicPath: "/images/services/",
        }),
        featured: fields.checkbox({
          label: "Destacar na página inicial",
          defaultValue: true,
        }),
      },
    }),

    /* ─── Depoimentos ──────────────────────────────────────────── */
    testimonials: collection({
      label: "Depoimentos",
      slugField: "name",
      path: "content/testimonials/*",
      format: { data: "yaml" },
      columns: ["name", "service"],
      schema: {
        name: fields.slug({
          name: { label: "Nome da Cliente" },
        }),
        service: fields.text({
          label: "Serviço Realizado",
          description: "Qual serviço essa cliente fez?",
        }),
        text: fields.text({
          label: "Depoimento",
          multiline: true,
          description: "O que a cliente disse sobre o atendimento",
        }),
        rating: fields.number({
          label: "Avaliação (1–5 estrelas)",
          defaultValue: 5,
        }),
      },
    }),

    /* ─── Galeria ──────────────────────────────────────────────── */
    gallery: collection({
      label: "Galeria de Fotos",
      slugField: "label",
      path: "content/gallery/*",
      format: { data: "yaml" },
      columns: ["label", "category"],
      schema: {
        label: fields.slug({
          name: { label: "Título da Foto" },
        }),
        category: fields.select({
          label: "Categoria",
          options: [
            { value: "Cílios",        label: "💫 Cílios" },
            { value: "Sobrancelhas",  label: "✏️  Sobrancelhas" },
            { value: "Unhas",         label: "💅 Unhas" },
          ],
          defaultValue: "Cílios",
        }),
        image: fields.image({
          label: "Foto",
          description: "Foto do trabalho realizado",
          directory: "public/images/gallery",
          publicPath: "/images/gallery/",
        }),
        aspect: fields.select({
          label: "Formato da Foto",
          options: [
            { value: "square",   label: "⬛ Quadrado" },
            { value: "portrait", label: "📱 Retrato (vertical)" },
          ],
          defaultValue: "square",
        }),
      },
    }),
  },

  singletons: {
    /* ─── Configurações do Studio ──────────────────────────────── */
    settings: singleton({
      label: "⚙️  Configurações do Studio",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        studioName: fields.text({
          label: "Nome do Studio",
          defaultValue: "AL Beauty Studio",
        }),
        tagline: fields.text({
          label: "Slogan",
          description: "Aparece no rodapé e em alguns títulos",
          defaultValue: "Naturalidade com Elegância",
        }),
        whatsapp: fields.text({
          label: "📱 Número do WhatsApp",
          description: "Apenas números com código do país. Ex: 5535912345678",
        }),
        instagram: fields.text({
          label: "📸 Instagram (@usuario)",
          description: "Apenas o @usuario, sem o link",
        }),
        instagramUrl: fields.url({
          label: "Link completo do Instagram",
        }),
        address: fields.text({
          label: "📍 Endereço",
        }),
        hours: fields.text({
          label: "🕐 Horário de Funcionamento",
          description: "Ex: Segunda a Sábado · 9h–18h",
        }),
        googleAnalyticsId: fields.text({
          label: "📊 ID do Google Analytics",
          description: "Ex: G-XXXXXXXXXX (deixe vazio para desativar)",
        }),
      },
    }),

    /* ─── Página Inicial ───────────────────────────────────────── */
    homepage: singleton({
      label: "🏠 Página Inicial",
      path: "content/homepage",
      format: { data: "yaml" },
      schema: {
        aboutText1: fields.text({
          label: "Sobre — 1º parágrafo",
          multiline: true,
        }),
        aboutText2: fields.text({
          label: "Sobre — 2º parágrafo",
          multiline: true,
        }),
        aboutText3: fields.text({
          label: "Sobre — 3º parágrafo",
          multiline: true,
        }),
        founderQuote: fields.text({
          label: "Citação da Fundadora",
          description: "Aparece com destaque na seção Sobre",
        }),
      },
    }),
  },
});
