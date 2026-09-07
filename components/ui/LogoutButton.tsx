"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={logout} className="text-sm font-bold text-deepsky/60 hover:text-berry underline">
      تسجيل الخروج
    </button>
  );
}
