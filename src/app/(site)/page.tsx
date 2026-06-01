import articlesData from '@/data/index.json';
import categoriesData from '@/data/categories.json';
import slugMapData from '@/data/slug-map.json';
import Link from 'next/link';
import { SearchBox } from '@/components/features';
import { Metadata } from 'next';

const { idMap } = slugMapData as { idMap: Record<string, string> };

interface ArticleIndex {
  id: string;
  title: string;
  description?: string;
  url: string;
}

export const metadata: Metadata = {
  title: 'VetClub.ru — Новости ветеринарии',
  description: 'Новости и события в ветеринарии. Справочная информация для ветврача.',
  openGraph: {
    title: 'VetClub.ru — Новости ветеринарии',
    description: 'Новости и события в ветеринарии.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function HomePage() {
  const articles: ArticleIndex[] = articlesData;
  const newsCategory = categoriesData.find(c => c.slug === 'news');
  const newsArticles = newsCategory?.articles
    .map(id => articles.find(a => a.id === id))
    .filter(Boolean) || [];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white rounded-2xl mb-8">
        <div className="px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Ветеринария для профессионалов
            </h1>
            <p className="text-lg md:text-xl text-[#e8f5e9] mb-6 leading-relaxed">
              Новости ветеринарии, справочная информация для ветврача,
              профессиональное сообщество.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium">
                {newsArticles.length} новостей
              </span>
              <Link href="/materials/" className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                Ветеринарные материалы →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SearchBox />

      {/* News Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Новости ветеринарии</h2>
          <Link href="/category/news/" className="text-sm text-[#2e7d32] hover:underline">
            Все новости →
          </Link>
        </div>
        
        <div className="grid gap-4">
          {newsArticles.map((article) => (
            <Link
              key={article!.id}
              href={`/articles/${idMap[article!.id]}/`}
              className="group block bg-white p-5 rounded-xl border border-gray-200 hover:border-[#81c784] hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#2e7d32] transition-colors">
                    {article!.title}
                  </h3>
                  {article!.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {article!.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Materials Link */}
      <div className="bg-[#f1f8e9] rounded-xl p-6 border border-[#2e7d32]/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1b5e20] mb-1">Ветеринарные материалы</h2>
            <p className="text-sm text-gray-600">Статьи по терапии, хирургии, дерматологии, офтальмологии, диагностике и другим разделам</p>
          </div>
          <Link 
            href="/materials/" 
            className="px-5 py-2.5 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] transition-colors text-sm font-medium whitespace-nowrap"
          >
            Перейти →
          </Link>
        </div>
      </div>
    </main>
  );
}
