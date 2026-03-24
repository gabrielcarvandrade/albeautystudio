import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AL Beauty Studio — Naturalidade com Elegância",
    template: "%s — AL Beauty Studio",
  },
  description:
    "Studio de beleza em Lavras, MG. Especialistas em extensão de cílios, lash lifting, design de sobrancelhas, brow lamination e nail design. Atendimento humanizado e personalizado.",
  keywords: [
    "beauty studio lavras",
    "extensão de cílios lavras",
    "lash lifting lavras",
    "design sobrancelha lavras",
    "nail design lavras",
    "AL Beauty Studio",
    "Ana Laura Fagundes",
  ],
  openGraph: {
    title: "AL Beauty Studio — Naturalidade com Elegância",
    description:
      "Studio de beleza em Lavras, MG. Extensão de cílios, sobrancelhas, lash lifting e nail design com atendimento personalizado.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
