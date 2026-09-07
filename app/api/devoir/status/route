import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { students } from "@/data/students";

export async function GET(request: NextRequest) {
  const studentId = request.nextUrl.searchParams.get("studentId");

  if (!studentId || !students.some((s) => s.id === studentId)) {
    return NextResponse.json({ error: "تلميذ غير معروف." }, { status: 404 });
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("homework_attempts")
    .select("attempt_number, score, total, created_at")
    .eq("student_id", studentId)
    .order("attempt_number", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ attempts: data ?? [] });
}
