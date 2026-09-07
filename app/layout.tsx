import type { Metadata } from "next";
import "./globals.css";

// Police chargée via une balise <link> classique (et non next/font/google) :
// ainsi la compilation du site ne dépend jamais d'un accès réseau à Google
// Fonts au moment du build (plus fiable pour un déploiement Vercel).
export const metadata: Metadata = {
  title: "مراجعة اللغة العربية — الصف الخامس",
  description: "منصة مراجعة اللغة العربية للصف الخامس — القسم الثنائي اللغة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-arabic text-deepsky antialiased">{children}</body>
    </html>
  );
}
