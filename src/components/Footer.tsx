import { useTranslations } from "next-intl";
import { Scale } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-navy-dark text-white/80 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-gold" />
          <span className="font-bold text-lg text-white">PawnJustice</span>
        </div>
        <p className="text-sm mb-2">{t("tagline")}</p>
        <p className="text-xs text-white/50 mb-4">{t("disclaimer")}</p>
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-white/40">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
