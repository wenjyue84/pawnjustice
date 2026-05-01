import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Shield, Building2, AlertTriangle, ArrowRight } from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/story"
              className="bg-red-accent hover:bg-red-light text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              {t("heroCta")}
            </Link>
            <Link
              href="/complaints/submit"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-navy px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              {t("heroCtaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Case Summary */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {t("caseTitle")}
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t("caseSummary")}
            </p>
            <div className="bg-red-50 border-l-4 border-red-accent p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-red-accent text-lg">
                {t("caseOvercharge")}{" "}
                <span className="text-2xl">{t("caseOverchargeAmount")}</span>
              </p>
            </div>
            <p className="text-gray-700 mb-4 italic">
              &ldquo;{t("caseAdmission")}&rdquo;
            </p>
            <p className="text-gray-600 text-sm mb-6">
              {t("casePoliceReport")}
            </p>
            <Link
              href="/story"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-red-accent transition-colors"
            >
              {t("readMore")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t("whyTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Building2 className="w-12 h-12 text-navy mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("why1Title")}</h3>
              <p className="text-gray-600">{t("why1Desc")}</p>
            </div>
            <div className="text-center p-6">
              <AlertTriangle className="w-12 h-12 text-red-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("why2Title")}</h3>
              <p className="text-gray-600">{t("why2Desc")}</p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("why3Title")}</h3>
              <p className="text-gray-600">{t("why3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("complaintsTitle")}
          </h2>
          <p className="text-white/80 mb-8">{t("complaintsDesc")}</p>
          <Link
            href="/complaints/submit"
            className="bg-red-accent hover:bg-red-light text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            {t("complaintsButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
