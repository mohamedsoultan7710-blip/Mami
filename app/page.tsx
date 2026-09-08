import Link from "next/link";

const links = [
  {
    href: "/classe",
    emoji: "🖥️",
    title: "وضع الصف",
    subtitle: "للعرض على السبورة أو جهاز العرض",
    color: "from-sky to-deepsky",
  },
  {
    href: "/participation",
    emoji: "⭐",
    title: "المشاركة",
    subtitle: "متابعة نقاط التلاميذ",
    color: "from-sun to-coral",
  },
  {
    href: "/devoir",
    emoji: "🏠",
    title: "الواجب المنزلي",
    subtitle: "للتلميذ من البيت",
    color: "from-leaf to-sky",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 py-16">
      <div className="text-center space-y-3">
        <p className="text-6xl">🌟</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-deepsky">مراجعة اللغة العربية</h1>
        <p className="text-xl text-sky font-bold">الصف الخامس — القسم الثنائي اللغة</p>
        <p className="text-base text-deepsky/70">واو الحال • واو العطف • لكن • عندما</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 w-full max-w-4xl">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`group rounded-3xl p-8 text-white bg-gradient-to-br ${l.color} card-shadow hover:scale-105 transition-transform flex flex-col items-center text-center gap-3`}
          >
            <span className="text-5xl">{l.emoji}</span>
            <span className="text-2xl font-extrabold">{l.title}</span>
            <span className="text-sm opacity-90">{l.subtitle}</span>
          </Link>
        ))}
      </div>

      <Link href="/resultats" className="text-sm text-deepsky/50 underline hover:text-deepsky">
        📋 نتائج الواجبات (للمعلّمة)
      </Link>
    </main>
  );
}
