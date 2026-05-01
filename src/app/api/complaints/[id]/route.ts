import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { env } from "@/lib/env";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (token !== env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status, is_public } = body as {
    status?: string;
    is_public?: boolean;
  };

  const sql = getDb();

  if (status && is_public !== undefined) {
    await sql`
      UPDATE complaints
      SET status = ${status}, is_public = ${is_public}
      WHERE id = ${Number(id)}
    `;
  } else if (status) {
    await sql`
      UPDATE complaints SET status = ${status} WHERE id = ${Number(id)}
    `;
  } else if (is_public !== undefined) {
    await sql`
      UPDATE complaints SET is_public = ${is_public} WHERE id = ${Number(id)}
    `;
  }

  return NextResponse.json({ ok: true });
}
