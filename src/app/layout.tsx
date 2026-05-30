import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import menuData from "@/data/menu.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Клуб ветеринарных врачей VetClub.ru",
  description: "Социальная сеть для ветеринарных врачей. Справочная информация, обмен опытом, форум, вакансии, блоги.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900 min-h-screen`}
      >
        <div className="max-w-6xl mx-auto bg-white min-h-screen shadow-sm">
          {/* Header / Logo */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="p-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-emerald-800">VetClub.ru</h1>
                  <p className="text-xs text-gray-500">Клуб ветеринарных врачей</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Top Navigation */}
          <nav className="bg-emerald-700 text-white">
            <div className="flex flex-wrap">
              {menuData.top.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="px-4 py-2 text-sm hover:bg-emerald-800 transition-colors border-r border-emerald-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
              <div className="p-3">
                {/* Menu Module */}
                <div className="mb-4">
                  <h3 className="bg-gray-200 text-gray-700 text-sm font-bold px-2 py-1 rounded mb-1">Меню</h3>
                  <div className="space-y-0">
                    {menuData.left.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-emerald-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Materials Module */}
                <div className="mb-4">
                  <h3 className="bg-gray-200 text-gray-700 text-sm font-bold px-2 py-1 rounded mb-1">Материалы для врачей</h3>
                  <div className="space-y-0">
                    {menuData.materials.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-emerald-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Reference Module */}
                <div className="mb-4">
                  <h3 className="bg-gray-200 text-gray-700 text-sm font-bold px-2 py-1 rounded mb-1">Справочная информация</h3>
                  <div className="space-y-0">
                    {menuData.reference.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-emerald-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Guides Module */}
                <div className="mb-4">
                  <h3 className="bg-gray-200 text-gray-700 text-sm font-bold px-2 py-1 rounded mb-1">Справочники</h3>
                  <div className="space-y-0">
                    {menuData.guides.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-emerald-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>

          {/* Footer */}
          <footer className="bg-gray-100 border-t border-gray-200 p-4 text-center text-sm text-gray-500">
            <p>© 2008–2026 VetClub.ru — Клуб ветеринарных врачей</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
