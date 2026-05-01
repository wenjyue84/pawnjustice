import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Shield,
  FileText,
  Phone,
  Scale,
  Building2,
  CheckCircle2,
  ChevronRight,
  Download,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

export default async function RightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RightsContent locale={locale} />;
}

function StepCard({
  number,
  text,
}: {
  number: number;
  text: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <span className="bg-navy text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
        {number}
      </span>
      <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function RightsContent({ locale }: { locale: string }) {
  const t = useTranslations("rights");
  const g = useTranslations("guide");

  const rights = ["r1", "r2", "r3", "r4", "r5", "r6", "r7"] as const;
  const penalties = [
    { offence: "p1Offence", law: "p1Law", penalty: "p1Penalty" },
    { offence: "p2Offence", law: "p2Law", penalty: "p2Penalty" },
    { offence: "p3Offence", law: "p3Law", penalty: "p3Penalty" },
    { offence: "p4Offence", law: "p4Law", penalty: "p4Penalty" },
  ] as const;

  const guideSteps = [
    {
      titleKey: "policeTitle" as const,
      introKey: "policeIntro" as const,
      steps: ["policeStep1", "policeStep2", "policeStep3", "policeStep4", "policeStep5", "policeStep6", "policeStep7"] as const,
      tipKey: "policeTip" as const,
      icon: FileText,
      color: "border-blue-500",
    },
    {
      titleKey: "kpktTitle" as const,
      introKey: "kpktIntro" as const,
      steps: ["kpktStep1", "kpktStep2", "kpktStep3", "kpktStep4", "kpktStep5", "kpktStep6", "kpktStep7"] as const,
      tipKey: null,
      icon: Building2,
      color: "border-green-600",
    },
    {
      titleKey: "demandTitle" as const,
      introKey: "demandIntro" as const,
      steps: ["demandStep1", "demandStep2", "demandStep3", "demandStep4"] as const,
      tipKey: "demandTip" as const,
      icon: Scale,
      color: "border-gold",
    },
    {
      titleKey: "tribunalTitle" as const,
      introKey: "tribunalIntro" as const,
      steps: ["tribunalStep1", "tribunalStep2", "tribunalStep3", "tribunalStep4", "tribunalStep5", "tribunalStep6"] as const,
      tipKey: null,
      icon: Shield,
      color: "border-red-accent",
    },
    {
      titleKey: "ncccTitle" as const,
      introKey: "ncccIntro" as const,
      steps: ["ncccStep1", "ncccStep2", "ncccStep3"] as const,
      tipKey: null,
      icon: Phone,
      color: "border-purple-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-white/80 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      {/* Interest Rate Cap */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">{t("interestTitle")}</h2>
          <p className="text-gray-700 mb-6">{t("interestDesc")}</p>
          <div className="bg-navy text-white text-center py-8 rounded-xl mb-6">
            <p className="text-4xl md:text-5xl font-bold">{t("interestMax")}</p>
            <p className="text-white/60 mt-2">Pawnbrokers Act 1972, Section 17</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-gold p-4 rounded-r-lg">
            <p className="text-gray-700">{t("interestNote")}</p>
          </div>
        </div>
      </section>

      {/* Borrower Rights */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("rightsTitle")}</h2>
          <div className="space-y-3">
            {rights.map((key) => (
              <div
                key={key}
                className="flex gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-gray-700">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penalties Table */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">{t("penaltiesTitle")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="p-3 text-left">{t("offence")}</th>
                  <th className="p-3 text-left">{t("law")}</th>
                  <th className="p-3 text-left">{t("penalty")}</th>
                </tr>
              </thead>
              <tbody>
                {penalties.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3 font-medium">{t(row.offence)}</td>
                    <td className="p-3 text-sm text-gray-600">{t(row.law)}</td>
                    <td className="p-3 text-sm text-red-accent font-medium">
                      {t(row.penalty)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 bg-navy-dark text-white" id="guide">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            {g("title")}
          </h2>
          <p className="text-white/70 text-center mb-12">{g("subtitle")}</p>

          <div className="space-y-8">
            {guideSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.titleKey}
                  className={`bg-white text-foreground rounded-xl p-6 border-l-4 ${step.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-7 h-7 text-navy" />
                    <h3 className="font-bold text-xl text-navy">
                      {g(step.titleKey)}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-5 italic">{g(step.introKey)}</p>

                  <div className="space-y-3">
                    {step.steps.map((stepKey, i) => (
                      <StepCard key={stepKey} number={i + 1} text={g(stepKey)} />
                    ))}
                  </div>

                  {step.tipKey && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
                      <Lightbulb className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{g(step.tipKey)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Template */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Download className="w-12 h-12 text-navy mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">{g("downloadTitle")}</h2>
          <p className="text-gray-600 mb-8">{g("downloadDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/api/template?lang=en`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy hover:bg-navy-light text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {g("downloadBtn")}
            </a>
            <a
              href={`/api/template?lang=ms`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy-light hover:bg-navy text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {g("downloadBtnMs")}
            </a>
            <a
              href={`/api/template?lang=zh`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy-light hover:bg-navy text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {g("downloadBtnZh")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
