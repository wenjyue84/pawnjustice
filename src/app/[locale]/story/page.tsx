import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import RedactedImage from "@/components/RedactedImage";
import { AlertTriangle } from "lucide-react";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StoryContent />;
}

const evidenceImages = [
  {
    src: "/evidence/evidence-03-pawn-receipt.jpeg",
    titleKey: "ev3Title" as const,
    descKey: "ev3Desc" as const,
    redactions: [
      { top: "3%", left: "60%", width: "35%", height: "4%" },
    ],
  },
  {
    src: "/evidence/evidence-04-pawn-receipt.jpeg",
    titleKey: "ev4Title" as const,
    descKey: "ev4Desc" as const,
    redactions: [
      { top: "5%", left: "55%", width: "40%", height: "4%" },
    ],
  },
  {
    src: "/evidence/evidence-05-pawn-document.jpeg",
    titleKey: "ev5Title" as const,
    descKey: "ev5Desc" as const,
    redactions: [
      { top: "12%", left: "15%", width: "70%", height: "3%" },
      { top: "18%", left: "15%", width: "50%", height: "3%" },
    ],
  },
];

function StoryContent() {
  const t = useTranslations("story");

  const timeline = [
    { dateKey: "t1Date", titleKey: "t1Title", descKey: "t1Desc", type: "neutral" },
    { dateKey: "t2Date", titleKey: "t2Title", descKey: "t2Desc", type: "danger" },
    { dateKey: "t3Date", titleKey: "t3Title", descKey: "t3Desc", type: "neutral" },
    { dateKey: "t4Date", titleKey: "t4Title", descKey: "t4Desc", type: "neutral" },
    { dateKey: "t5Date", titleKey: "t5Title", descKey: "t5Desc", type: "danger" },
    { dateKey: "t6Date", titleKey: "t6Title", descKey: "t6Desc", type: "success" },
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

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("timelineTitle")}</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full shrink-0 ${
                      item.type === "danger"
                        ? "bg-red-accent"
                        : item.type === "success"
                        ? "bg-green-600"
                        : "bg-navy"
                    }`}
                  />
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 min-h-[60px]" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-sm text-gray-500 font-medium">
                    {t(item.dateKey)}
                  </p>
                  <h3
                    className={`font-bold text-lg ${
                      item.type === "danger" ? "text-red-accent" : ""
                    }`}
                  >
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-gray-600 mt-1">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overcharge Breakdown Table */}
      <section className="py-12 bg-gray-warm">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">{t("overchargeBreakdown")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="p-3 text-left">{t("month")}</th>
                  <th className="p-3 text-left">{t("dateCol")}</th>
                  <th className="p-3 text-right">{t("charged")}</th>
                  <th className="p-3 text-right">{t("correct")}</th>
                  <th className="p-3 text-right">{t("overcharge")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50 font-semibold">
                  <td className="p-3">2</td>
                  <td className="p-3">06/02/2026</td>
                  <td className="p-3 text-right text-red-accent">RM 100.50</td>
                  <td className="p-3 text-right">RM 40.50</td>
                  <td className="p-3 text-right text-red-accent">RM 60.00</td>
                </tr>
                <tr>
                  <td className="p-3">3</td>
                  <td className="p-3">01/03/2026</td>
                  <td className="p-3 text-right">RM 40.50</td>
                  <td className="p-3 text-right">RM 40.50</td>
                  <td className="p-3 text-right text-green-600">—</td>
                </tr>
                <tr>
                  <td className="p-3">4</td>
                  <td className="p-3">30/03/2026</td>
                  <td className="p-3 text-right">RM 40.50</td>
                  <td className="p-3 text-right">RM 40.50</td>
                  <td className="p-3 text-right text-green-600">—</td>
                </tr>
                <tr className="bg-red-50 font-semibold">
                  <td className="p-3">4 (redeem)</td>
                  <td className="p-3">01/05/2026</td>
                  <td className="p-3 text-right text-red-accent">RM 100.00</td>
                  <td className="p-3 text-right">RM 40.50</td>
                  <td className="p-3 text-right text-red-accent">RM 59.50</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-navy-dark text-white font-bold">
                  <td className="p-3" colSpan={4}>
                    Total
                  </td>
                  <td className="p-3 text-right">RM 119.50</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* Evidence Gallery */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">{t("evidenceTitle")}</h2>
          <p className="text-gray-500 mb-8">{t("evidenceSubtitle")}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {evidenceImages.map((img, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <RedactedImage
                  src={img.src}
                  alt={t(img.titleKey)}
                  redactions={img.redactions}
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">{t(img.titleKey)}</h3>
                  <p className="text-sm text-gray-500">{t(img.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Violations */}
      <section className="py-16 bg-gray-warm">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">{t("violationsTitle")}</h2>
          <div className="space-y-4">
            {(["v1", "v2", "v3", "v4"] as const).map((key) => (
              <div
                key={key}
                className="flex gap-3 bg-white p-4 rounded-lg shadow"
              >
                <AlertTriangle className="w-6 h-6 text-red-accent shrink-0 mt-0.5" />
                <p className="text-gray-700">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
