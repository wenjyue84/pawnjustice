import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MessageSquarePlus } from "lucide-react";

interface Complaint {
  id: number;
  name: string;
  pawnshop_name: string;
  pawnshop_branch: string | null;
  pawnshop_city: string | null;
  incident_date: string | null;
  loan_amount: number | null;
  amount_charged: number | null;
  correct_amount: number | null;
  description: string;
  created_at: string;
}

async function getComplaints(): Promise<Complaint[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/complaints`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ComplaintsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const complaints = await getComplaints();
  return <ComplaintsContent complaints={complaints} />;
}

function ComplaintsContent({ complaints }: { complaints: Complaint[] }) {
  const t = useTranslations("complaints");

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
        <div className="max-w-4xl mx-auto px-4">
          {complaints.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquarePlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-6">
                {t("noComplaints")}
              </p>
              <Link
                href="/complaints/submit"
                className="bg-red-accent hover:bg-red-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t("submitTitle")}
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {complaints.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-accent"
                >
                  <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-500">
                    <span>
                      <strong>{t("pawnshop")}:</strong> {c.pawnshop_name}
                      {c.pawnshop_branch && ` — ${c.pawnshop_branch}`}
                    </span>
                    {c.pawnshop_city && (
                      <span>
                        <strong>{t("location")}:</strong> {c.pawnshop_city}
                      </span>
                    )}
                    {c.incident_date && (
                      <span>
                        <strong>{t("date")}:</strong> {c.incident_date}
                      </span>
                    )}
                  </div>
                  {(c.loan_amount || c.amount_charged || c.correct_amount) && (
                    <div className="flex flex-wrap gap-4 mb-3 text-sm">
                      {c.loan_amount && (
                        <span>
                          {t("loanAmount")}: <strong>RM {c.loan_amount}</strong>
                        </span>
                      )}
                      {c.amount_charged && (
                        <span className="text-red-accent">
                          {t("amountCharged")}:{" "}
                          <strong>RM {c.amount_charged}</strong>
                        </span>
                      )}
                      {c.correct_amount && (
                        <span className="text-green-600">
                          {t("correctAmount")}:{" "}
                          <strong>RM {c.correct_amount}</strong>
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-gray-700">{c.description}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    — {c.name},{" "}
                    {new Date(c.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
