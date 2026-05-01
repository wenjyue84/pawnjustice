"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

export default function ComplaintForm() {
  const t = useTranslations("complaints");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);

    // Upload evidence files first
    const evidenceUrls: string[] = [];
    for (const file of files) {
      try {
        const uploadForm = new FormData();
        uploadForm.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: uploadForm });
        if (res.ok) {
          const data = await res.json();
          evidenceUrls.push(data.url);
        }
      } catch {
        // Continue even if upload fails
      }
    }

    const body = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email") || null,
      pawnshop_name: form.get("pawnshop_name"),
      pawnshop_branch: form.get("pawnshop_branch") || null,
      pawnshop_city: form.get("pawnshop_city") || null,
      incident_date: form.get("incident_date") || null,
      loan_amount: form.get("loan_amount") ? Number(form.get("loan_amount")) : null,
      amount_charged: form.get("amount_charged") ? Number(form.get("amount_charged")) : null,
      correct_amount: form.get("correct_amount") ? Number(form.get("correct_amount")) : null,
      description: form.get("description"),
      locale,
      evidence_urls: evidenceUrls,
    };

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        setFiles([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <p className="text-lg font-semibold text-green-700">{t("formSuccess")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-navy focus:border-navy outline-none transition-shadow";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{t("formError")}</p>
        </div>
      )}

      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("formName")} *</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("formPhone")} *</label>
          <input name="phone" type="tel" required className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t("formEmail")}</label>
        <input name="email" type="email" className={inputClass} />
      </div>

      {/* Pawnshop Info */}
      <div>
        <label className="block text-sm font-medium mb-1">{t("formPawnshopName")} *</label>
        <input name="pawnshop_name" required className={inputClass} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("formPawnshopBranch")}</label>
          <input name="pawnshop_branch" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("formPawnshopCity")}</label>
          <input name="pawnshop_city" className={inputClass} />
        </div>
      </div>

      {/* Incident Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("formIncidentDate")}</label>
          <input name="incident_date" type="date" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("formLoanAmount")}</label>
          <input name="loan_amount" type="number" step="0.01" className={inputClass} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("formAmountCharged")}</label>
          <input name="amount_charged" type="number" step="0.01" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("formCorrectAmount")}</label>
          <input name="correct_amount" type="number" step="0.01" className={inputClass} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">{t("formDescription")} *</label>
        <p className="text-xs text-gray-500 mb-2">{t("formDescriptionHint")}</p>
        <textarea
          name="description"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">{t("formEvidence")}</label>
        <p className="text-xs text-gray-500 mb-2">{t("formEvidenceHint")}</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-navy-light file:cursor-pointer"
          />
          {files.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              {files.length} file(s) selected
            </p>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        {t("formPrivacy")}
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-red-accent hover:bg-red-light disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
      >
        {status === "submitting" ? t("formSubmitting") : t("formSubmit")}
      </button>
    </form>
  );
}
