import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS complaints (
      id              SERIAL PRIMARY KEY,
      name            VARCHAR(255) NOT NULL,
      phone           VARCHAR(30) NOT NULL,
      email           VARCHAR(255),
      pawnshop_name   VARCHAR(255) NOT NULL,
      pawnshop_branch VARCHAR(255),
      pawnshop_city   VARCHAR(100),
      incident_date   DATE,
      loan_amount     NUMERIC(10,2),
      amount_charged  NUMERIC(10,2),
      correct_amount  NUMERIC(10,2),
      description     TEXT NOT NULL,
      locale          VARCHAR(5) NOT NULL DEFAULT 'en',
      status          VARCHAR(20) NOT NULL DEFAULT 'pending',
      is_public       BOOLEAN NOT NULL DEFAULT FALSE,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_address      VARCHAR(45)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS evidence_files (
      id              SERIAL PRIMARY KEY,
      complaint_id    INTEGER NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
      original_name   VARCHAR(255) NOT NULL,
      blob_url        TEXT NOT NULL,
      mime_type       VARCHAR(100) NOT NULL,
      size_bytes      INTEGER,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  return NextResponse.json({ ok: true, message: "Migration complete" });
}
