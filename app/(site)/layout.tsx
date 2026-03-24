import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import IntroScreen from "@/components/ui/IntroScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ClickRipple from "@/components/ui/ClickRipple";
import { reader } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await reader.singletons.settings.read().catch(() => null);
  const gaId = settings?.googleAnalyticsId ?? process.env.NEXT_PUBLIC_GA_ID ?? "";
  const whatsapp = settings?.whatsapp ?? "5535999999999";
  const instagramUrl = settings?.instagramUrl ?? "https://www.instagram.com/albeautystudio.lavras/";

  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)] relative">
      <IntroScreen />
      <ScrollProgress />
      <ClickRipple />
      <CustomCursor />
      <Header whatsapp={whatsapp} instagramUrl={instagramUrl} />
      <main className="relative">{children}</main>
      <Footer whatsapp={whatsapp} instagramUrl={instagramUrl} settings={settings} />
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </div>
  );
}
