import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, checkAdminPassword, computeAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = body?.password as string | undefined;

  if (!password || !(await checkAdminPassword(password))) {
    return NextResponse.json({ error: "كلمة المرور غير صحيحة." }, { status: 401 });
  }

  const token = await computeAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 heures
  });
  return res;
}
