"use client";

import { useState } from "react";
import { students } from "@/data/students";
import { homeworkQuiz } from "@/data/exercises";
import McqExercise from "@/components/exercises/McqExercise";
import ProgressBar from "@/components/ui/ProgressBar";
import BigButton from "@/components/ui/BigButton";
import Confetti from "@/components/ui/Confetti";

type Attempt = { attempt_number: number; score: number; total: number };
type Step = "select" | "loading" | "intro" | "quiz" | "result" | "locked" | "error";

export default function DevoirApp() {
  const [step, setStep] = useState<Step>("select");
  const [student, setStudent] = useState<{ id: string; name: string } | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [quizIndex, setQuizIndex] = useState(0);
  // Stocke la réponse choisie par l'élève pour chaque question (texte de
  // l'option, ou null si la question a été révélée sans réponse). Le score
  // final est toujours recalculé par le serveur à partir de ces réponses,
  // jamais fait confiance à un score envoyé par le navigateur.
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | null>>({});
  const [lastResult, setLastResult] = useState<{ attemptNumber: number; score: number; total: number } | null>(null);

  async function selectStudent(s: { id: string; name: string }) {
    setStudent(s);
    setStep("loading");
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/devoir/status?studentId=${s.id}`);
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "خطأ غير متوقع.");
        setStep("error");
        return;
      }
      setAttempts(data.attempts ?? []);
      setStep((data.attempts ?? []).length >= 2 ? "locked" : "intro");
    } catch {
      setErrorMsg("تعذّر الاتصال بالخادم.");
      setStep("error");
    }
  }

  function startQuiz() {
    setQuizIndex(0);
    setQuizAnswers({});
    setStep("quiz");
  }

  function reportAnswer(id: string, selected: string | null) {
    setQuizAnswers((prev) => (id in prev ? prev : { ...prev, [id]: selected }));
  }

  async function submitQuiz() {
    if (!student) return;
    try {
      const res = await fetch("/api/devoir/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, answers: quizAnswers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "تعذّر إرسال الواجب.");
        setStep("error");
        return;
      }
      setLastResult(data);
      setAttempts((prev) => [...prev, { attempt_number: data.attemptNumber, score: data.score, total: data.total }]);
      setStep("result");
    } catch {
      setErrorMsg("تعذّر الاتصال بالخادم.");
      setStep("error");
    }
  }

  function changeStudent() {
    setStudent(null);
    setAttempts([]);
    setLastResult(null);
    setStep("select");
  }

  const currentQuestion = homeworkQuiz[quizIndex];
  const currentAnswered = currentQuestion.id in quizAnswers;

  return (
    <main className="min-h-screen px-4 py-10">
      {step === "select" && (
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-6xl mb-2">🏠</p>
          <h1 className="text-3xl font-extrabold text-deepsky mb-1">واجباتي المنزلية</h1>
          <p className="text-xl font-bold text-sky mb-8">اختر اسمك</p>
          <div dir="rtl" className="grid sm:grid-cols-2 gap-3">
            {students.map((s) => (
              <button
                key={s.id}
                onClick={() => selectStudent(s)}
                className="bg-white rounded-2xl px-5 py-4 font-bold text-deepsky card-shadow border-2 border-transparent hover:border-sky text-lg"
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-2xl font-bold text-deepsky/60">جارٍ التحميل...</p>
        </div>
      )}

      {step === "error" && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
          <p className="text-2xl font-bold text-berry">{errorMsg}</p>
          <BigButton onClick={changeStudent}>⬅ العودة لاختيار الاسم</BigButton>
        </div>
      )}

      {step === "intro" && student && (
        <div className="max-w-xl mx-auto text-center bg-white rounded-3xl card-shadow p-8">
          <p className="text-xl font-bold text-deepsky mb-2">مرحبًا {student.name} 👋</p>
          {attempts.length === 1 && (
            <p className="text-lg text-coral font-bold mb-4">
              محاولتك الأولى: ⭐ {attempts[0].score} / {attempts[0].total} — لديك محاولة ثانية.
            </p>
          )}
          <BigButton onClick={startQuiz} className="w-full">
            {attempts.length === 0 ? "🚀 ابدأ الواجب" : "🚀 ابدأ المحاولة الثانية"}
          </BigButton>
          <button onClick={changeStudent} className="block mx-auto mt-4 text-sm text-deepsky/50 underline">
            تغيير الاسم
          </button>
        </div>
      )}

      {step === "quiz" && (
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <ProgressBar current={quizIndex + 1} total={homeworkQuiz.length} />
          <McqExercise
            key={currentQuestion.id}
            sentence={currentQuestion.sentence}
            options={currentQuestion.options}
            answer={currentQuestion.answer}
            explanation={currentQuestion.explanation}
            big={false}
            onSolved={({ selected }) => reportAnswer(currentQuestion.id, selected)}
          />
          <div className="flex justify-center">
            <BigButton
              disabled={!currentAnswered}
              onClick={() => {
                if (quizIndex < homeworkQuiz.length - 1) setQuizIndex((i) => i + 1);
                else submitQuiz();
              }}
            >
              {quizIndex < homeworkQuiz.length - 1 ? "التالي ⏭" : "✅ إنهاء وإرسال"}
            </BigButton>
          </div>
        </div>
      )}

      {step === "result" && lastResult && student && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center relative">
          <Confetti count={35} />
          <p className="text-6xl">🎉</p>
          <p className="text-2xl font-bold text-deepsky">أحسنت يا {student.name}!</p>
          <p className="text-4xl font-extrabold text-coral">
            ⭐ نتيجتك: {lastResult.score} / {lastResult.total}
          </p>
          {lastResult.attemptNumber === 1 ? (
            <>
              <p className="text-lg font-bold text-sky">لديك محاولة ثانية إن أردت تحسين نتيجتك.</p>
              <BigButton onClick={() => setStep("intro")}>العودة</BigButton>
            </>
          ) : (
            <p className="text-lg font-bold text-berry">🔒 انتهت المحاولات. أحسنت على مجهودك!</p>
          )}
          <button onClick={changeStudent} className="text-sm text-deepsky/50 underline">
            تغيير الاسم
          </button>
        </div>
      )}

      {step === "locked" && student && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <p className="text-5xl">🔒</p>
          <p className="text-2xl font-bold text-deepsky">مرحبًا {student.name}</p>
          <p className="text-xl font-bold text-berry">انتهت المحاولات لهذا الواجب.</p>
          <div className="flex flex-col gap-2">
            {attempts.map((a) => (
              <p key={a.attempt_number} className="font-bold text-deepsky/70">
                المحاولة {a.attempt_number}: ⭐ {a.score} / {a.total}
              </p>
            ))}
          </div>
          <button onClick={changeStudent} className="text-sm text-deepsky/50 underline mt-2">
            تغيير الاسم
          </button>
        </div>
      )}
    </main>
  );
}
