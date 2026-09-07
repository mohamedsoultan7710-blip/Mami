"use client";

import { useMemo } from "react";

const COLORS = ["#FFB703", "#219EBC", "#FB8500", "#8AC926", "#FF006E", "#023047"];

/**
 * Confettis légers en CSS pur (aucune dépendance externe).
 * `count` reste volontairement modeste pour ne pas ralentir un PC scolaire.
 */
export default function Confetti({ count = 40 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.4,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: "-10vh",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
