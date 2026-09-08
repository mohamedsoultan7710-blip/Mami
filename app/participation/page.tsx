import { getServiceSupabase } from "@/lib/supabase/server";
import { students } from "@/data/students";
import ParticipationBoard from "@/components/participation/ParticipationBoard";

export const metadata = { title: "المشاركة — مراجعة اللغة العربية" };
export const dynamic = "force-dynamic";

export default async function ParticipationPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase.from("participation_scores").select("student_id, score");
  const scoreMap = new Map<string, number>((data ?? []).map((r) => [r.student_id, r.score]));

  const initialStudents = students.map((s) => ({
    id: s.id,
    name: s.name,
    score: scoreMap.get(s.id) ?? 0,
  }));

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-deepsky">⭐ المشاركة</h1>
      </div>
      {error && (
        <p className="max-w-5xl mx-auto text-berry font-bold text-center mb-4">
          ⚠️ تعذّر الاتصال بقاعدة البيانات ({error.message}). تحقّقي من إعدادات Supabase.
        </p>
      )}
      <ParticipationBoard initialStudents={initialStudents} />
    </main>
  );
}
