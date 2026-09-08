"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState("/admin/devoir");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = params.get("next");
    if (n) setNext(n);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "خطأ غير متوقع.");
        setLoading(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("تعذّر الاتصال بالخادم.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        dir="rtl"
        className="bg-white rounded-3xl card-shadow p-8 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-extrabold text-deepsky text-center mb-2">🔐 دخول المعلّمة</h1>
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-sky/30 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-sky"
          autoFocus
        />
        {error && <p className="text-berry font-bold text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="bg-sky text-white font-extrabold rounded-xl px-4 py-3 hover:bg-deepsky disabled:opacity-50"
        >
          {loading ? "..." : "دخول"}
        </button>
      </form>
    </main>
  );
}
