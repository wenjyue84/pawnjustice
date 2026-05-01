import { setRequestLocale } from "next-intl/server";
import ComplaintForm from "@/components/ComplaintForm";
import { useTranslations } from "next-intl";

export default async function SubmitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SubmitContent />;
}

function SubmitContent() {
  const t = useTranslations("complaints");

  return (
    <div>
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("submitTitle")}
          </h1>
          <p className="text-white/80 text-lg">{t("submitSubtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <ComplaintForm />
        </div>
      </section>
    </div>
  );
}
