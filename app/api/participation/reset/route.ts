import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { students } from "@/data/students";

// Remet tous les points de participation à zéro (nouvelle séance).
export async function POST() {
  const supabase = getServiceSupabase();

  const rows = students.map((s) => ({ student_id: s.id, score: 0, updated_at: new Date().toISOString() }));
  const { error } = await supabase.from("participation_scores").upsert(rows);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
