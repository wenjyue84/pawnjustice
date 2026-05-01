"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, Scale } from "lucide-react";

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/story", label: t("story") },
    { href: "/rights", label: t("rights") },
    { href: "/complaints", label: t("complaints") },
    { href: "/about", label: t("about") },
  ] as const;

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Scale className="w-6 h-6 text-gold" />
          <span>PawnJustice</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-gold transition-colors text-sm ${
                pathname === l.href ? "text-gold font-semibold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/complaints/submit"
            className="bg-red-accent hover:bg-red-light text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
          >
            {t("submit")}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-dark border-t border-navy-light px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block py-3 border-b border-navy-light/30 hover:text-gold ${
                pathname === l.href ? "text-gold font-semibold" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/complaints/submit"
            className="block mt-3 bg-red-accent hover:bg-red-light text-white px-4 py-2 rounded text-center font-semibold"
            onClick={() => setOpen(false)}
          >
            {t("submit")}
          </Link>
          <div className="mt-3">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
