import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { students } from "@/data/students";
import { homeworkQuiz } from "@/data/exercises";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const studentId = body?.studentId as string | undefined;
  // `answers` associe chaque id de question à la réponse choisie par l'élève
  // (texte de l'option). Le score n'est JAMAIS pris depuis le navigateur :
  // il est toujours recalculé ci-dessous en comparant à la bonne réponse.
  const answers = body?.answers as Record<string, string | null> | undefined;

  if (!studentId || !students.some((s) => s.id === studentId)) {
    return NextResponse.json({ error: "تلميذ غير معروف." }, { status: 404 });
  }
  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ error: "بيانات الإجابات مفقودة." }, { status: 400 });
  }

  const supabase = getServiceSupabase();

  // Nombre de tentatives déjà enregistrées : calculé côté serveur, jamais
  // fait confiance à une valeur envoyée par le navigateur.
  const { data: existingAttempts, error: readError } = await supabase
    .from("homework_attempts")
    .select("attempt_number")
    .eq("student_id", studentId);

  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 });
  }

  const attemptCount = existingAttempts?.length ?? 0;
  if (attemptCount >= 2) {
    return NextResponse.json({ error: "انتهت المحاولات." }, { status: 409 });
  }

  // Le score est recalculé côté serveur en comparant la réponse choisie par
  // l'élève à la bonne réponse officielle, pour ne jamais faire confiance à
  // un score envoyé par le navigateur.
  const total = homeworkQuiz.length;
  const score = homeworkQuiz.filter((q) => answers[q.id] === q.answer).length;
  const attemptNumber = attemptCount + 1;

  const { error: insertError } = await supabase.from("homework_attempts").insert({
    student_id: studentId,
    attempt_number: attemptNumber,
    score,
    total,
    answers,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ error: "انتهت المحاولات." }, { status: 409 });
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ attemptNumber, score, total });
}
