import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { students } from "@/data/students";

export async function GET() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from("participation_scores").select("student_id, score");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const scoreMap = new Map<string, number>((data ?? []).map((r) => [r.student_id, r.score]));

  const result = students.map((s) => ({
    id: s.id,
    name: s.name,
    score: scoreMap.get(s.id) ?? 0,
  }));

  return NextResponse.json({ students: result });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const studentId = body?.studentId as string | undefined;
  const delta = Number(body?.delta);

  if (!studentId || ![1, -1].includes(delta)) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!students.some((s) => s.id === studentId)) {
    return NextResponse.json({ error: "Élève introuvable." }, { status: 404 });
  }

  const supabase = getServiceSupabase();

  const { data: existing, error: readError } = await supabase
    .from("participation_scores")
    .select("score")
    .eq("student_id", studentId)
    .maybeSingle();

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 });
  }

  const currentScore = existing?.score ?? 0;
  const nextScore = Math.max(0, currentScore + delta);

  const { error: writeError } = await supabase
    .from("participation_scores")
    .upsert({ student_id: studentId, score: nextScore, updated_at: new Date().toISOString() });

  if (writeError) {
    return NextResponse.json({ error: writeError.message }, { status: 500 });
  }

  return NextResponse.json({ id: studentId, score: nextScore });
}
