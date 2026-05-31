import categoriesData from '@/data/categories.json';
import allArticles from '@/data/articles.json';
import slugMapData from '@/data/slug-map.json';
import Link from 'next/link';
import { Metadata } from 'next';

const { idMap } = slugMapData as { idMap: Record<string, string> };

export const metadata: Metadata = {
  title: 'Ветеринарные материалы — VetClub.ru',
  description: 'Статьи по ветеринарной терапии, хирургии, дерматологии, офтальмологии, диагностике и другим разделам.',
  openGraph: {
    title: 'Ветеринарные материалы — VetClub.ru',
    description: 'Статьи по ветеринарной терапии, хирургии, дерматологии, офтальмологии, диагностике.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function MaterialsPage() {
  // Exclude news, homeopathy-ref, and other non-material categories
  const materialCategories = categoriesData.filter(c => 
    c.slug !== 'news' && c.slug !== 'homeopathy-ref'
  );
  
  const referenceCategories = categoriesData.filter(c => 
    c.slug === 'homeopathy-ref'
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ветеринарные материалы</h1>
        <p className="text-gray-600">Статьи по различным разделам ветеринарии</p>
      </div>

      <div className="grid gap-6">
        {materialCategories.map((category) => {
          const articles = category.articles
            .map(id => (allArticles as Record<string, any>)[id])
            .filter(Boolean);
          
          return (
            <div key={category.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-gray-900">{category.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                  </div>
                  <Link 
                    href={`/category/${category.slug}/`}
                    className="text-sm text-[#2e7d32] hover:underline whitespace-nowrap ml-4"
                  >
                    Все статьи →
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-2">
                  {articles.slice(0, 5).map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${idMap[article.id]}/`}
                      className="block p-3 rounded-lg hover:bg-[#f1f8e9] transition-colors"
                    >
                      <span className="text-sm text-gray-700 hover:text-[#1b5e20]">{article.title}</span>
                    </Link>
                  ))}
                  {articles.length > 5 && (
                    <div className="text-sm text-gray-500 px-3 py-2">
                      ...и ещё {articles.length - 5} стать{articles.length - 5 === 1 ? 'я' : articles.length - 5 < 5 ? 'и' : 'ей'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {referenceCategories.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Справочники</h2>
          <div className="grid gap-4">
            {referenceCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}/`}
                className="block bg-white p-5 rounded-xl border border-gray-200 hover:border-[#81c784] hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
