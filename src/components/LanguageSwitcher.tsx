"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("lang");

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: e.target.value as "en" | "ms" | "zh" });
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="w-4 h-4 text-gold" />
      <select
        value={locale}
        onChange={onChange}
        className="bg-transparent text-white text-sm border border-navy-light rounded px-2 py-1 cursor-pointer"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} className="text-black">
            {t(l)}
          </option>
        ))}
      </select>
    </div>
  );
}
