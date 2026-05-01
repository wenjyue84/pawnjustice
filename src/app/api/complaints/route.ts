import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { z } from "zod";

const complaintSchema = z.object({
  name: z.string().min(1).max(255),
  phone: z.string().min(1).max(30),
  email: z.string().email().nullable().optional(),
  pawnshop_name: z.string().min(1).max(255),
  pawnshop_branch: z.string().max(255).nullable().optional(),
  pawnshop_city: z.string().max(100).nullable().optional(),
  incident_date: z.string().nullable().optional(),
  loan_amount: z.number().positive().nullable().optional(),
  amount_charged: z.number().positive().nullable().optional(),
  correct_amount: z.number().positive().nullable().optional(),
  description: z.string().min(10),
  locale: z.enum(["en", "ms", "zh"]).default("en"),
  evidence_urls: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, name, pawnshop_name, pawnshop_branch, pawnshop_city,
             incident_date, loan_amount, amount_charged, correct_amount,
             description, created_at
      FROM complaints
      WHERE is_public = TRUE
      ORDER BY created_at DESC
      LIMIT 50
    `;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = complaintSchema.parse(body);

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;

    const sql = getDb();
    const rows = await sql`
      INSERT INTO complaints (
        name, phone, email, pawnshop_name, pawnshop_branch, pawnshop_city,
        incident_date, loan_amount, amount_charged, correct_amount,
        description, locale, ip_address
      ) VALUES (
        ${data.name}, ${data.phone}, ${data.email ?? null},
        ${data.pawnshop_name}, ${data.pawnshop_branch ?? null},
        ${data.pawnshop_city ?? null}, ${data.incident_date ?? null},
        ${data.loan_amount ?? null}, ${data.amount_charged ?? null},
        ${data.correct_amount ?? null}, ${data.description},
        ${data.locale}, ${ip}
      )
      RETURNING id
    `;

    const complaintId = rows[0].id;

    // Link evidence files if any
    if (data.evidence_urls?.length) {
      for (const url of data.evidence_urls) {
        await sql`
          INSERT INTO evidence_files (complaint_id, original_name, blob_url, mime_type)
          VALUES (${complaintId}, 'evidence', ${url}, 'image/jpeg')
        `;
      }
    }

    return NextResponse.json({ ok: true, id: complaintId }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 400 }
      );
    }
    console.error("POST /api/complaints error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
