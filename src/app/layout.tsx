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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}
      >
        <header className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-emerald-800 tracking-tight">VetClub.ru</span>
              </a>
              
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <a href="/" className="text-gray-600 hover:text-emerald-700 transition-colors">Статьи</a>
                <a href="/forum" className="text-gray-600 hover:text-emerald-700 transition-colors">Форум</a>
                <span className="text-gray-400">Вакансии</span>
                <span className="text-gray-400">Блоги</span>
              </nav>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium">118 статей</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">VetClub.ru</span>
              </div>
              <p className="text-sm text-gray-500">
                Клуб ветеринарных врачей — справочная информация, обмен опытом, профессиональное сообщество
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>© 2008–2026</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
