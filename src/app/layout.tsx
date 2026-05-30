import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import menuData from "@/data/menu.json";
import Link from "next/link";

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
        <header className="bg-white border-b border-[#e8f5e9] shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2e7d32] rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-[#1b5e20] tracking-tight">VetClub.ru</span>
              </a>
              
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                {menuData.top.slice(0, 5).map((item) => (
                  <Link key={item.href} href={item.href} className="text-gray-600 hover:text-[#2e7d32] transition-colors">
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#2e7d32] bg-[#f1f8e9] px-3 py-1 rounded-full font-medium">118 статей</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Меню</h3>
                <div className="space-y-1">
                  {menuData.left.map((item) => (
                    <Link key={item.href} href={item.href} className="block text-sm text-gray-600 hover:text-[#2e7d32] py-1">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Материалы</h3>
                <div className="space-y-1">
                  {menuData.materials.map((item) => (
                    <Link key={item.href} href={item.href} className="block text-sm text-gray-600 hover:text-[#2e7d32] py-1">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Справочная информация</h3>
                <div className="space-y-1">
                  {menuData.reference.map((item) => (
                    <Link key={item.href} href={item.href} className="block text-sm text-gray-600 hover:text-[#2e7d32] py-1">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>

        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#2e7d32] rounded flex items-center justify-center">
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
