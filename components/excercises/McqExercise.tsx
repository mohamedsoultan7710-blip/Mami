"use client";

import { useEffect, useState } from "react";

type SolvedInfo = { correct: boolean; selected: string | null };

type Props = {
  sentence: string;
  options: string[];
  answer: string;
  explanation: string;
  forceReveal?: boolean;
  onSolved?: (info: SolvedInfo) => void;
  big?: boolean;
};

export default function McqExercise({
  sentence,
  options,
  answer,
  explanation,
  forceReveal = false,
  onSolved,
  big = true,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (forceReveal && !revealed) {
      setRevealed(true);
      if (!reported) {
        setReported(true);
        onSolved?.({ correct: false, selected });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceReveal]);

  function handleClick(option: string) {
    if (revealed) return;
    const isCorrect = option === answer;
    setSelected(option);

    if (isCorrect) {
      setCorrect(true);
      setRevealed(true);
      if (!reported) {
        setReported(true);
        onSolved?.({ correct: true, selected: option });
      }
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setCorrect(false);

    if (nextAttempts >= 2) {
      setRevealed(true);
      if (!reported) {
        setReported(true);
        onSolved?.({ correct: false, selected: option });
      }
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
      <p
        dir="rtl"
        className={`text-center font-bold text-deepsky bg-white/80 rounded-3xl px-8 py-10 card-shadow w-full ${
          big ? "projector-text" : "text-2xl"
        }`}
      >
        {sentence}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt) => {
          const isSelected = selected === opt;
          const isAnswer = opt === answer;
          let style = "bg-white border-2 border-sky text-deepsky hover:bg-sky/10";
          if (revealed && isAnswer) style = "bg-leaf text-white border-2 border-leaf";
          else if (revealed && isSelected && !isAnswer) style = "bg-berry text-white border-2 border-berry";
          else if (isSelected && !revealed && correct === false) style = "bg-berry/20 border-2 border-berry text-berry";

          return (
            <button
              key={opt}
              onClick={() => handleClick(opt)}
              disabled={revealed}
              className={`rounded-2xl px-6 py-5 text-xl md:text-2xl font-extrabold transition-all active:scale-95 disabled:pointer-events-none ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {correct === true && (
        <div className="text-center animate-pop-in">
          <p className="text-3xl font-extrabold text-leaf">🎉 أحسنت!</p>
          <p className="text-lg text-deepsky/80 mt-2">{explanation}</p>
        </div>
      )}

      {correct === false && !revealed && (
        <p className="text-2xl font-bold text-berry animate-pop-in">حاول مرة أخرى 😊</p>
      )}

      {revealed && correct !== true && (
        <div className="text-center animate-pop-in">
          <p className="text-2xl font-extrabold text-berry">الإجابة الصحيحة هي: {answer}</p>
          <p className="text-lg text-deepsky/80 mt-2">{explanation}</p>
        </div>
      )}
    </div>
  );
}
