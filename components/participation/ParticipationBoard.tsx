"use client";

import { useMemo, useState } from "react";
import Confetti from "@/components/ui/Confetti";

type StudentScore = { id: string; name: string; score: number };

export default function ParticipationBoard({ initialStudents }: { initialStudents: StudentScore[] }) {
  const [list, setList] = useState<StudentScore[]>(initialStudents);
  const [showResults, setShowResults] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [syncError, setSyncError] = useState(false);

  async function changeScore(id: string, delta: 1 | -1) {
    setBusyId(id);
    const previousList = list;
    setList((prev) => prev.map((s) => (s.id === id ? { ...s, score: Math.max(0, s.score + delta) } : s)));
    try {
      const res = await fetch("/api/participation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: id, delta }),
      });
      if (res.ok) {
        const data = await res.json();
        setList((prev) => prev.map((s) => (s.id === id ? { ...s, score: data.score } : s)));
        setSyncError(false);
      } else {
        // La sauvegarde a échoué : on annule le changement affiché pour
        // rester cohérent avec la base de données.
        setList(previousList);
        setSyncError(true);
      }
    } catch {
      setList(previousList);
      setSyncError(true);
    } finally {
      setBusyId(null);
    }
  }

  async function resetSession() {
    if (!confirm("هل تريدين إعادة تصفير كل النقاط لبدء جلسة جديدة؟")) return;
    setResetting(true);
    try {
      await fetch("/api/participation/reset", { method: "POST" });
      setList((prev) => prev.map((s) => ({ ...s, score: 0 })));
    } finally {
      setResetting(false);
    }
  }

  const ranked = useMemo(() => {
    const sorted = [...list].sort((a, b) => b.score - a.score);
    let rank = 0;
    let lastScore: number | null = null;
    return sorted.map((s) => {
      if (s.score !== lastScore) {
        rank += 1;
        lastScore = s.score;
      }
      return { ...s, rank };
    });
  }, [list]);

  const medal = (rank: number) => (rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}.`);

  return (
    <div className="max-w-5xl mx-auto">
      {syncError && (
        <p className="text-center text-berry font-bold mb-4">⚠️ تعذّر حفظ آخر تغيير. تحقّقي من الاتصال بالإنترنت.</p>
      )}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => setShowResults((v) => !v)}
          className="bg-gradient-to-br from-sun to-coral text-white font-extrabold rounded-2xl px-6 py-3 shadow-md hover:brightness-105"
        >
          🏆 النتائج
        </button>
        <button
          onClick={resetSession}
          disabled={resetting}
          className="bg-white border-2 border-berry text-berry font-extrabold rounded-2xl px-6 py-3 shadow-md hover:bg-berry/10 disabled:opacity-50"
        >
          🔄 بداية جلسة جديدة (تصفير النقاط)
        </button>
      </div>

      {showResults && (
        <div className="relative bg-white/80 rounded-3xl card-shadow p-6 mb-8">
          <Confetti count={30} />
          <h2 className="text-2xl font-extrabold text-center text-deepsky mb-4">🏆 الترتيب</h2>
          <div dir="rtl" className="flex flex-col gap-2 max-w-xl mx-auto">
            {ranked.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between bg-white rounded-xl px-4 py-2 border border-deepsky/10"
              >
                <span className="font-bold text-deepsky">
                  {medal(s.rank)} {s.name}
                </span>
                <span className="font-extrabold text-coral">{s.score} ⭐</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div dir="rtl" className="grid sm:grid-cols-2 gap-3">
        {list.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 card-shadow border border-deepsky/5"
          >
            <span className="font-bold text-deepsky text-lg">{s.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeScore(s.id, -1)}
                disabled={busyId === s.id || s.score === 0}
                className="w-10 h-10 rounded-full bg-berry/10 text-berry font-extrabold text-xl hover:bg-berry/20 disabled:opacity-30"
              >
                −
              </button>
              <span className="min-w-[3.5rem] text-center font-extrabold text-xl text-coral">⭐ {s.score}</span>
              <button
                onClick={() => changeScore(s.id, 1)}
                disabled={busyId === s.id}
                className="w-10 h-10 rounded-full bg-leaf/10 text-leaf font-extrabold text-xl hover:bg-leaf/20 disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
