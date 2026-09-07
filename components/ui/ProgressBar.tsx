export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between mb-1 text-sm font-bold text-deepsky/70">
        <span>
          السؤال {current} / {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-4 bg-white/70 rounded-full overflow-hidden border border-deepsky/10">
        <div
          className="h-full bg-gradient-to-l from-sky to-leaf transition-all duration-500 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
