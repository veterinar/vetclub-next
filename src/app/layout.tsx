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
  title: "VetClub.ru - Ветеринария для профессионалов",
  description: "Первая в России социальная сеть ветеринарных врачей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <div className="wrapper" style={{ maxWidth: 950, margin: '0 auto' }}>
          {/* Top Header */}
          <div id="top-head" style={{ border: '0 6px solid #bec1c7', background: '#f9fbff', height: 92 }}>
            <div className="relative">
              <span id="logo" style={{ position: 'absolute', top: 16, left: 21, width: 317, height: 68 }}>
                <Link href="/" className="text-2xl font-bold" style={{ color: '#1a5da0' }}>
                  VetClub.ru
                </Link>
                <span className="block text-sm" style={{ color: '#666' }}>Ветеринария для профессионалов</span>
              </span>
              <div id="top-mod" style={{ margin: '10px 5px 10px 470px', height: 47, overflow: 'hidden' }}>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Статьи</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">Форум</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">Вакансии</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Menu */}
          <div id="horiz-menu" style={{ border: '6px 6px 0 6px solid #bec1c7', background: '#488dd3', height: 22 }}>
            <nav className="flex items-center px-2 h-full">
              {menuData.top.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white text-xs px-3 py-1 hover:bg-[#3f7cb9]"
                  style={{ borderRight: '1px solid #3f7cb9' }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div id="outer-border" style={{ border: '0 6px 6px 6px solid #e0e0e0' }}>
            <table className="outer w-full" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr className="align-top">
                  {/* Left Sidebar */}
                  <td className="left" style={{ width: '22%', border: '6px 6px 0 6px solid #cdd1d7', background: '#f9fbff', padding: 6 }}>
                    <div className="sidepad">
                      <div className="sidebar-box">
                        <div className="module-heading">Меню</div>
                        {menuData.left.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="nav-link text-xs"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <div className="sidebar-box">
                        <div className="module-heading">Материалы</div>
                        {menuData.materials.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="nav-link text-xs"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <div className="sidebar-box">
                        <div className="module-heading">Справочная информация</div>
                        {menuData.reference.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="nav-link text-xs"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <div className="sidebar-box">
                        <div className="module-heading">Справочники</div>
                        {menuData.guides.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="nav-link text-xs"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Middle Content */}
                  <td className="middle" style={{ border: '6px 6px 0 6px solid #e0e0e0', background: '#fff', padding: '6px 10px' }}>
                    <div className="padding">
                      <div className="pathway">
                        <span className="pathway text-xs">
                          <Link href="/" className="hover:underline">Главная</Link>
                        </span>
                      </div>
                      {children}
                    </div>
                  </td>

                  {/* Right Sidebar */}
                  <td className="right" style={{ width: '22%', border: '6px 6px 0 6px solid #cdd1d7', background: '#f9fbff', padding: 6 }}>
                    <div className="sidepad">
                      <div className="sidebar-box">
                        <div className="module-heading">Поиск</div>
                        <form className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Поиск..."
                            className="w-full px-2 py-1 text-xs border border-gray-300"
                          />
                          <button type="submit" className="text-xs bg-[#488dd3] text-white px-2 py-1">
                            Искать
                          </button>
                        </form>
                      </div>

                      <div className="sidebar-box">
                        <div className="module-heading">Рекомендуем</div>
                        <div className="text-xs space-y-2">
                          <Link href="/content/view/58/63/" className="block hover:underline">
                            Диагностика мочекаменной болезни
                          </Link>
                          <Link href="/content/view/385/73/" className="block hover:underline">
                            Гериатрия в ветеринарии
                          </Link>
                          <Link href="/content/view/387/57/" className="block hover:underline">
                            Национальная конференция 2013
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div id="bot-footer" style={{ border: '6px 6px 0 6px solid #cdd1d7', background: '#babfc7', height: 38, textAlign: 'center', lineHeight: '38px', color: '#74777c' }}>
            <span className="text-xs">
              © 2008-2014 VetClub.ru - Ветеринария для профессионалов
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
