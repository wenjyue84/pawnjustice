import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Shield,
  FileText,
  Phone,
  Scale,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default async function RightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RightsContent />;
}

function RightsContent() {
  const t = useTranslations("rights");

  const rights = ["r1", "r2", "r3", "r4", "r5", "r6", "r7"] as const;
  const penalties = [
    { offence: "p1Offence", law: "p1Law", penalty: "p1Penalty" },
    { offence: "p2Offence", law: "p2Law", penalty: "p2Penalty" },
    { offence: "p3Offence", law: "p3Law", penalty: "p3Penalty" },
    { offence: "p4Offence", law: "p4Law", penalty: "p4Penalty" },
  ] as const;

  const channels = [
    { titleKey: "channel1Title", descKey: "channel1Desc", icon: FileText },
    { titleKey: "channel2Title", descKey: "channel2Desc", icon: Building2 },
    { titleKey: "channel3Title", descKey: "channel3Desc", icon: Scale },
    { titleKey: "channel4Title", descKey: "channel4Desc", icon: Phone },
  ] as const;

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

      {/* How to Complain */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("complainTitle")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.titleKey}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-8 h-8 text-navy" />
                    <h3 className="font-bold text-lg">{t(ch.titleKey)}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(ch.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
