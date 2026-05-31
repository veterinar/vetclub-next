/**
 * Admin Layout — Sidebar + Header
 * Server Component (no 'use client')
 */

import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Search,
  LogOut,
  Home,
} from 'lucide-react';

export const metadata = {
  title: 'Админ-панель — VetClub',
};

function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="px-6 py-4 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#2e7d32]">VetClub</span>
          <span className="text-xs bg-[#f0fdf4] text-[#2e7d32] px-2 py-0.5 rounded font-medium">
            Админ
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />}>
          Дашборд
        </SidebarLink>
        <SidebarLink href="/admin/articles" icon={<FileText size={18} />}>
          Все статьи
        </SidebarLink>
        <SidebarLink href="/admin/articles/new" icon={<PlusCircle size={18} />}>
          Новая статья
        </SidebarLink>
        <div className="pt-4 mt-4 border-t border-gray-100">
          <SidebarLink href="/" icon={<Home size={18} />}>
            На сайт
          </SidebarLink>
          <SidebarLink href="/search" icon={<Search size={18} />}>
            Поиск
          </SidebarLink>
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Выйти
          </button>
        </form>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-[#f0fdf4] hover:text-[#2e7d32] transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
