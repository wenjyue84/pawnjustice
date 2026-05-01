import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Target, Eye, Mail, CheckCircle2 } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  const missions = ["mission1", "mission2", "mission3", "mission4"] as const;

  return (
    <div>
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-white/80 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          {/* Who */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-navy" />
              {t("whoTitle")}
            </h2>
            <p className="text-gray-700 leading-relaxed">{t("whoDesc")}</p>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-navy" />
              {t("missionTitle")}
            </h2>
            <ul className="space-y-3">
              {missions.map((key) => (
                <li key={key} className="flex gap-3 items-start">
                  <span className="w-2 h-2 bg-red-accent rounded-full mt-2 shrink-0" />
                  <span className="text-gray-700">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-navy" />
              {t("transparencyTitle")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("transparencyDesc")}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-navy" />
              {t("contactTitle")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("contactDesc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
