import Hero from "@/components/sections/Hero";
import PetalDivider from "@/components/ui/PetalDivider";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import { reader } from "@/lib/content";

export default async function HomePage() {
  const [servicesRaw, testimonialsRaw, galleryRaw, homepage, settings] =
    await Promise.all([
      reader.collections.services.all().catch(() => []),
      reader.collections.testimonials.all().catch(() => []),
      reader.collections.gallery.all().catch(() => []),
      reader.singletons.homepage.read().catch(() => null),
      reader.singletons.settings.read().catch(() => null),
    ]);

  const services = servicesRaw.map((s) => ({
    slug:        s.slug,
    name:        s.entry.name as string,
    subtitle:    s.entry.subtitle,
    description: s.entry.description,
    details:     s.entry.details,
    icon:        s.entry.icon,
    image:       s.entry.image ?? null,
    featured:    s.entry.featured,
  }));

  const testimonials = testimonialsRaw.map((t) => ({
    slug:    t.slug,
    name:    t.entry.name as string,
    service: t.entry.service,
    text:    t.entry.text,
    rating:  t.entry.rating ?? 5,
  }));

  const gallery = galleryRaw.map((g) => ({
    slug:     g.slug,
    label:    g.entry.label as string,
    category: g.entry.category,
    image:    g.entry.image ?? null,
    aspect:   g.entry.aspect,
  }));

  const whatsapp      = settings?.whatsapp      ?? "5535999999999";
  const instagramUrl  = settings?.instagramUrl  ?? "https://www.instagram.com/albeautystudio.lavras/";

  return (
    <>
      <div id="section-hero">
        <Hero />
      </div>

      <PetalDivider color="var(--border)" />

      <div id="section-about">
        <About homepage={homepage} />
      </div>

      <PetalDivider color="var(--border-subtle)" />

      <div id="section-services">
        <Services services={services} whatsapp={whatsapp} />
      </div>

      <PetalDivider color="var(--border)" />

      <div id="section-gallery">
        <Gallery items={gallery} instagramUrl={instagramUrl} />
      </div>

      <PetalDivider color="var(--border-subtle)" />

      <div id="section-testimonials">
        <Testimonials testimonials={testimonials} />
      </div>

      <PetalDivider color="var(--border)" />

      <div id="section-booking">
        <Booking whatsapp={whatsapp} instagramUrl={instagramUrl} />
      </div>
    </>
  );
}
