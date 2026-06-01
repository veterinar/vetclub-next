import Link from 'next/link';
import menuData from '@/data/menu.json';

export default function Sidebar() {
  return (
    <aside className="lg:col-span-3 hidden lg:block">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="text-sm text-gray-500 mb-4 pb-2 border-b border-gray-100">
          121 статья
        </div>
        <nav className="space-y-1">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 px-3">
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
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 mt-4 px-3">
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
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 mt-4 px-3">
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
              <div className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 mt-4 px-3">
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
  );
}
