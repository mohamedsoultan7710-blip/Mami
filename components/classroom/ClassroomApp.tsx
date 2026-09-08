"use client";

import { useEffect, useMemo, useState } from "react";
import {
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  finalChallenge,
  notionLabels,
  MatchItem,
  ReorderItem,
} from "@/data/exercises";
import McqExercise from "@/components/exercises/McqExercise";
import ReorderExercise from "@/components/exercises/ReorderExercise";
import MatchExercise from "@/components/exercises/MatchExercise";
import ProgressBar from "@/components/ui/ProgressBar";
import BigButton from "@/components/ui/BigButton";
import Confetti from "@/components/ui/Confetti";

type McqItem = { id: string; sentence: string; options: string[]; answer: string; explanation: string };

type LevelDef =
  | { key: string; title: string; short: string; kind: "mcq"; items: McqItem[]; isFinal?: boolean }
  | { key: string; title: string; short: string; kind: "reorder"; items: ReorderItem[]; isFinal?: boolean }
  | { key: string; title: string; short: string; kind: "match"; items: MatchItem[][]; isFinal?: boolean };

function fromRecognition(item: { id: string; sentence: string; answer: "حال" | "عطف"; explanation: string }): McqItem {
  return {
    id: item.id,
    sentence: item.sentence,
    options: [notionLabels.حال, notionLabels.عطف],
    answer: notionLabels[item.answer],
    explanation: item.explanation,
  };
}

const LEVELS: LevelDef[] = [
  { key: "l1", title: "🟢 المستوى ١ — أتعرّف", short: "أتعرّف", kind: "mcq", items: level1.map(fromRecognition) },
  { key: "l2", title: "🟢 المستوى ٢ — أُفرّق", short: "أُفرّق", kind: "mcq", items: level2.map(fromRecognition) },
  {
    key: "l3",
    title: "🟡 المستوى ٣ — لكن أم عندما؟",
    short: "لكن أم عندما",
    kind: "mcq",
    items: level3.map((i) => ({ id: i.id, sentence: i.sentence, options: i.options, answer: i.answer, explanation: i.explanation })),
  },
  {
    key: "l4",
    title: "🟡 المستوى ٤ — أُكمل",
    short: "أُكمل",
    kind: "mcq",
    items: level4.map((i) => ({ id: i.id, sentence: i.sentence, options: i.options, answer: i.answer, explanation: i.explanation })),
  },
  { key: "l5", title: "🟠 المستوى ٥ — أُرتّب", short: "أُرتّب", kind: "reorder", items: level5 },
  { key: "l6", title: "🟠 المستوى ٦ — أُوصّل", short: "أُوصّل", kind: "match", items: [level6] },
  {
    key: "l7",
    title: "🔴 المستوى ٧ — التحدي",
    short: "التحدي",
    kind: "mcq",
    items: level7.map((i) => ({
      id: i.id,
      sentence: i.sentence,
      options: i.options.map((n) => notionLabels[n]),
      answer: notionLabels[i.answer],
      explanation: i.explanation,
    })),
  },
  {
    key: "final",
    title: "🏆 التحدي الكبير",
    short: "التحدي الكبير",
    kind: "mcq",
    isFinal: true,
    items: finalChallenge.map((i) => ({
      id: i.id,
      sentence: i.sentence,
      options: i.options,
      answer: i.answer,
      explanation: i.explanation,
    })),
  },
];

type Screen = "intro" | "menu" | "level" | "finalResult";

export default function ClassroomApp() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [levelIdx, setLevelIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [manualReveal, setManualReveal] = useState(false);
  const [scored, setScored] = useState<Record<string, boolean>>({});

  const level = LEVELS[levelIdx];
  const totalItems = level.kind === "match" ? level.items.length : level.items.length;
  const currentId = useMemo(() => {
    if (level.kind === "match") return `${level.key}-board`;
    return (level.items as { id: string }[])[itemIdx]?.id ?? "";
  }, [level, itemIdx]);

  useEffect(() => {
    setManualReveal(false);
  }, [levelIdx, itemIdx]);

  function reportSolved(itemId: string, correct: boolean) {
    setScored((prev) => (itemId in prev ? prev : { ...prev, [itemId]: correct }));
  }

  function openLevel(idx: number) {
    setLevelIdx(idx);
    setItemIdx(0);
    setManualReveal(false);
    setScreen("level");
  }

  function goNext() {
    if (itemIdx < totalItems - 1) {
      setItemIdx((i) => i + 1);
    } else if (level.isFinal) {
      setScreen("finalResult");
    } else {
      setScreen("menu");
    }
  }

  function goPrev() {
    if (itemIdx > 0) setItemIdx((i) => i - 1);
  }

  function restartLevel() {
    const ids =
      level.kind === "match"
        ? [`${level.key}-board`]
        : (level.items as { id: string }[]).map((i) => i.id);
    setScored((prev) => {
      const next = { ...prev };
      ids.forEach((id) => delete next[id]);
      return next;
    });
    setItemIdx(0);
    setManualReveal(false);
  }

  const finalScore = finalChallenge.filter((i) => scored[i.id]).length;

  return (
    <div className="min-h-screen flex flex-col">
      {screen === "intro" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center px-6">
          <p className="text-7xl">🌟</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-deepsky">مراجعة اللغة العربية</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-sky">الصف الخامس — القسم الثنائي اللغة</h2>
          <p className="text-xl md:text-2xl font-bold text-coral">واو الحال • واو العطف • لكن • عندما</p>
          <BigButton onClick={() => setScreen("menu")} className="mt-6 text-2xl px-10 py-6">
            🚀 ابدأ المراجعة
          </BigButton>
        </div>
      )}

      {screen === "menu" && (
        <div className="flex-1 px-6 py-10">
          <h2 className="text-3xl font-extrabold text-center text-deepsky mb-8">اختاري المستوى</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {LEVELS.map((lvl, idx) => {
              const ids = lvl.kind === "match" ? [`${lvl.key}-board`] : (lvl.items as { id: string }[]).map((i) => i.id);
              const done = ids.filter((id) => id in scored).length;
              return (
                <button
                  key={lvl.key}
                  onClick={() => openLevel(idx)}
                  className={`rounded-3xl p-6 text-right card-shadow transition-transform hover:scale-105 ${
                    lvl.isFinal ? "bg-gradient-to-br from-sun to-berry text-white" : "bg-white border-2 border-sky/20"
                  }`}
                >
                  <p className={`text-xl font-extrabold ${lvl.isFinal ? "text-white" : "text-deepsky"}`}>{lvl.title}</p>
                  <p className={`text-sm mt-2 ${lvl.isFinal ? "text-white/90" : "text-deepsky/60"}`}>
                    {done}/{ids.length} مكتمل
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {screen === "level" && (
        <div className="flex-1 flex flex-col px-4 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto w-full mb-4">
            <button onClick={() => setScreen("menu")} className="text-deepsky/60 font-bold hover:text-deepsky">
              🏠 القائمة
            </button>
            <h2 className="text-xl md:text-2xl font-extrabold text-deepsky">{level.title}</h2>
            <span />
          </div>

          <div className="mb-6">
            <ProgressBar current={itemIdx + 1} total={totalItems} />
          </div>

          <div className="flex-1 flex items-center justify-center">
            {level.kind === "mcq" && (
              <McqExercise
                key={currentId}
                sentence={(level.items as McqItem[])[itemIdx].sentence}
                options={(level.items as McqItem[])[itemIdx].options}
                answer={(level.items as McqItem[])[itemIdx].answer}
                explanation={(level.items as McqItem[])[itemIdx].explanation}
                forceReveal={manualReveal || currentId in scored}
                onSolved={({ correct }) => reportSolved(currentId, correct)}
              />
            )}
            {level.kind === "reorder" && (
              <ReorderExercise
                key={currentId}
                words={(level.items as ReorderItem[])[itemIdx].words}
                forceReveal={manualReveal || currentId in scored}
                onSolved={(c) => reportSolved(currentId, c)}
              />
            )}
            {level.kind === "match" && (
              <MatchExercise
                key={currentId}
                pairs={(level.items as MatchItem[][])[itemIdx]}
                forceReveal={manualReveal || currentId in scored}
                onSolved={(c) => reportSolved(currentId, c)}
              />
            )}
          </div>

          <div className="sticky bottom-0 mt-6 bg-white/90 backdrop-blur rounded-3xl card-shadow p-4 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto w-full">
            <BigButton variant="secondary" onClick={goPrev} disabled={itemIdx === 0} className="text-base px-4 py-3">
              ⏮ السابق
            </BigButton>
            <BigButton variant="ghost" onClick={() => setManualReveal(true)} className="text-base px-4 py-3">
              ✅ عرض التصحيح
            </BigButton>
            <BigButton variant="danger" onClick={restartLevel} className="text-base px-4 py-3">
              🔄 إعادة المستوى
            </BigButton>
            <BigButton variant="primary" onClick={goNext} className="text-base px-4 py-3">
              {itemIdx < totalItems - 1 ? "التالي ⏭" : "🏁 إنهاء"}
            </BigButton>
          </div>
        </div>
      )}

      {screen === "finalResult" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
          <Confetti />
          <p className="text-6xl">🎉</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-deepsky">أحسنت!</h2>
          <p className="text-2xl font-bold text-deepsky/70">نتيجتك</p>
          <p className="text-5xl font-extrabold text-coral">
            ⭐ {finalScore} / {finalChallenge.length}
          </p>
          <div className="flex gap-4 mt-6">
            <BigButton
              variant="secondary"
              onClick={() => {
                restartLevel();
                setScreen("level");
              }}
            >
              🔄 إعادة التحدي
            </BigButton>
            <BigButton variant="primary" onClick={() => setScreen("menu")}>
              🏠 القائمة
            </BigButton>
          </div>
        </div>
      )}
    </div>
  );
}
