"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scissors, Image, User, Phone } from "lucide-react";

interface HeaderProps {
  whatsapp?: string;
  instagramUrl?: string;
}

const navLinks = [
  { href: "/servicos",  label: "Serviços",  icon: Scissors },
  { href: "/galeria",   label: "Galeria",   icon: Image },
  { href: "/sobre",     label: "Sobre",     icon: User },
  { href: "/contato",   label: "Contato",   icon: Phone },
];

export default function Header({ whatsapp = "5535999999999" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled || menuOpen || !isHome
          ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="font-serif font-light text-xl tracking-[0.15em] transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            AL
          </span>
          <span
            className="font-serif font-light text-xl tracking-[0.15em] group-hover:opacity-80 transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Beauty
          </span>
          <span
            className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase self-end mb-0.5 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-underline px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === href
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 2px 12px rgba(196,136,110,0.2)",
            }}
          >
            Agendar
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: "var(--text-muted)" }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t backdrop-blur-md"
          style={{ background: "rgba(254,250,247,0.97)", borderColor: "var(--border)" }}
        >
          <nav className="flex flex-col px-5 py-4 gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-[var(--accent)] bg-[var(--surface)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Agendar Horário
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
