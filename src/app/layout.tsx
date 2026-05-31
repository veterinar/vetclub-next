import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import menuData from "@/data/menu.json";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "VetClub.ru — Ветеринария для профессионалов",
  description: "Справочная информация для ветврача. Статьи по ветеринарной терапии, хирургии, дерматологии, офтальмологии, диагностике. Нормативные документы, клинические случаи.",
  keywords: "ветеринария, ветврач, ветеринарные статьи, терапия животных, ветеринарная хирургия, дерматология, офтальмология, диагностика, нормативы",
  openGraph: {
    title: "VetClub.ru — Ветеринария для профессионалов",
    description: "Справочная информация для ветврача. 118 статей по ветеринарии.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#fafafa]">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2e7d32] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-[#1b5e20] tracking-tight">VetClub.ru</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  {menuData.top.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-[#2e7d32] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <aside className="lg:col-span-3 hidden lg:block">
                <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)]">
                  <div className="text-sm text-gray-500 mb-4 pb-2 border-b border-gray-100">
                    121 статья
                  </div>
                  <nav className="space-y-1">
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">
                      Навигация
                    </div>
                    {menuData.left.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-[#f1f8e9] hover:text-[#1b5e20] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-3">
                      Материалы
                    </div>
                    {menuData.materials.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-[#f1f8e9] hover:text-[#1b5e20] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-3">
                      Справочник
                    </div>
                    {menuData.reference.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-[#f1f8e9] hover:text-[#1b5e20] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    {menuData.guides.length > 0 && (
                      <>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-3">
                          Руководства
                        </div>
                        {menuData.guides.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-[#f1f8e9] hover:text-[#1b5e20] transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </nav>
                </div>
              </aside>

              <main className="lg:col-span-9">
                {children}
              </main>
            </div>
          </div>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2e7d32] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-700">VetClub.ru</span>
                </div>
                <p className="text-sm text-gray-500">
                  VetClub — статьи и справочная информация.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
