import { getServiceSupabase } from "@/lib/supabase/server";
import { students } from "@/data/students";

export const metadata = { title: "متابعة الواجبات — مراجعة اللغة العربية" };
export const dynamic = "force-dynamic";

type Attempt = { student_id: string; attempt_number: number; score: number; total: number };

export default async function ResultatsPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("homework_attempts")
    .select("student_id, attempt_number, score, total")
    .order("attempt_number", { ascending: true });

  const attempts: Attempt[] = data ?? [];

  const byStudent = new Map<string, Attempt[]>();
  attempts.forEach((a) => {
    const list = byStudent.get(a.student_id) ?? [];
    list.push(a);
    byStudent.set(a.student_id, list);
  });

  const rows = students.map((s) => {
    const list = byStudent.get(s.id) ?? [];
    const a1 = list.find((a) => a.attempt_number === 1);
    const a2 = list.find((a) => a.attempt_number === 2);
    const best = list.length ? Math.max(...list.map((a) => a.score)) : null;
    const total = list[0]?.total ?? 10;
    return { student: s, a1, a2, best, total };
  });

  const doneCount = rows.filter((r) => r.a1).length;

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-deepsky">📋 متابعة الواجبات</h1>
      </div>

      {error && <p className="text-berry font-bold text-center mb-4">{error.message}</p>}

      <p className="max-w-5xl mx-auto text-deepsky/70 font-bold mb-4">
        {doneCount} / {students.length} أنجزوا الواجب على الأقل مرة واحدة
      </p>

      <div dir="rtl" className="max-w-5xl mx-auto overflow-x-auto bg-white rounded-3xl card-shadow">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-deepsky text-white">
              <th className="px-4 py-3">التلميذ</th>
              <th className="px-4 py-3">المحاولة ١</th>
              <th className="px-4 py-3">المحاولة ٢</th>
              <th className="px-4 py-3">أفضل نتيجة</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.student.id} className={idx % 2 === 0 ? "bg-white" : "bg-sky/5"}>
                <td className="px-4 py-3 font-bold text-deepsky">{r.student.name}</td>
                <td className="px-4 py-3">
                  {r.a1 ? (
                    <span className="text-leaf font-bold">
                      ✅ {r.a1.score}/{r.a1.total}
                    </span>
                  ) : (
                    <span className="text-deepsky/40">❌ لم يُنجَز</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {r.a2 ? (
                    <span className="text-leaf font-bold">
                      ✅ {r.a2.score}/{r.a2.total}
                    </span>
                  ) : r.a1 ? (
                    <span className="text-coral font-bold">⏳ متاحة</span>
                  ) : (
                    <span className="text-deepsky/40">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-extrabold text-berry">
                  {r.best !== null ? `🏆 ${r.best}/${r.total}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

