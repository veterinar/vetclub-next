import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VetClub.ru — Ветеринария для профессионалов",
  description: "Справочная информация для ветврача. Обмен опытом лечения животных, форум ветеринарных врачей, вакансии для ветеринаров.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-emerald-700">
              VetClub.ru
            </a>
            <nav className="flex gap-4 text-sm">
              <a href="/" className="text-gray-600 hover:text-emerald-700">Статьи</a>
              <span className="text-gray-400">Форум</span>
              <span className="text-gray-400">Вакансии</span>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-500">
          <p>© VetClub.ru — Клуб ветеринарных врачей</p>
        </footer>
      </body>
    </html>
  );
}
