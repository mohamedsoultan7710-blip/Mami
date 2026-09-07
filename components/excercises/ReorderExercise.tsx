"use client";

import { useEffect, useMemo, useState } from "react";

type Token = { key: number; text: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Props = {
  words: string[];
  forceReveal?: boolean;
  onSolved?: (correct: boolean) => void;
};

export default function ReorderExercise({ words, forceReveal = false, onSolved }: Props) {
  const initialPool = useMemo<Token[]>(
    () => shuffle(words.map((text, key) => ({ key, text }))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [words.join("|")]
  );

  const [pool, setPool] = useState<Token[]>(initialPool);
  const [slots, setSlots] = useState<Token[]>([]);
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (forceReveal && !revealed) {
      setRevealed(true);
      setSlots(words.map((text, key) => ({ key: 1000 + key, text })));
      setPool([]);
      if (!reported) {
        setReported(true);
        onSolved?.(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceReveal]);

  function addToSlots(token: Token) {
    if (solved || revealed) return;
    setPool((p) => p.filter((t) => t.key !== token.key));
    setSlots((s) => [...s, token]);
    setWrongFlash(false);
  }

  function removeFromSlots(token: Token) {
    if (solved || revealed) return;
    setSlots((s) => s.filter((t) => t.key !== token.key));
    setPool((p) => [...p, token]);
  }

  function reset() {
    if (revealed) return;
    setPool(shuffle(words.map((text, key) => ({ key, text }))));
    setSlots([]);
    setWrongFlash(false);
  }

  function check() {
    if (slots.length !== words.length) return;
    const isCorrect = slots.map((t) => t.text).join(" ") === words.join(" ");
    if (isCorrect) {
      setSolved(true);
      if (!reported) {
        setReported(true);
        onSolved?.(true);
      }
    } else {
      setWrongFlash(true);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      <p className="text-lg font-bold text-deepsky/70">رتّب الكلمات لتكوين جملة صحيحة</p>

      <div
        dir="rtl"
        className={`min-h-[6rem] w-full rounded-3xl border-4 border-dashed ${
          wrongFlash ? "border-berry" : solved ? "border-leaf" : "border-sky/40"
        } bg-white/80 flex flex-wrap items-center justify-center gap-3 p-6 projector-text`}
      >
        {slots.length === 0 && <span className="text-deepsky/30 text-xl">... اضغط على الكلمات في الأسفل</span>}
        {slots.map((t) => (
          <button
            key={t.key}
            onClick={() => removeFromSlots(t)}
            disabled={solved || revealed}
            className="bg-sky text-white rounded-xl px-4 py-2 font-extrabold disabled:opacity-90"
          >
            {t.text}
          </button>
        ))}
      </div>

      <div dir="rtl" className="flex flex-wrap items-center justify-center gap-3">
        {pool.map((t) => (
          <button
            key={t.key}
            onClick={() => addToSlots(t)}
            className="bg-white border-2 border-coral text-coral rounded-xl px-4 py-2 font-extrabold text-lg hover:bg-coral/10 active:scale-95"
          >
            {t.text}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={check}
          disabled={solved || revealed || slots.length !== words.length}
          className="bg-leaf text-white rounded-2xl px-6 py-3 font-extrabold disabled:opacity-40"
        >
          ✅ تحقّق
        </button>
        <button
          onClick={reset}
          disabled={solved || revealed}
          className="bg-white border-2 border-deepsky/30 rounded-2xl px-6 py-3 font-extrabold disabled:opacity-40"
        >
          🔄 إعادة
        </button>
      </div>

      {wrongFlash && !solved && <p className="text-2xl font-bold text-berry animate-pop-in">حاول مرة أخرى 😊</p>}

      {solved && (
        <div className="text-center animate-pop-in">
          <p className="text-3xl font-extrabold text-leaf">🎉 أحسنت!</p>
        </div>
      )}

      {revealed && !solved && (
        <div className="text-center animate-pop-in">
          <p className="text-xl font-extrabold text-berry">الترتيب الصحيح معروض في الأعلى</p>
        </div>
      )}
    </div>
  );
}
