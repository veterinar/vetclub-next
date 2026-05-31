import articlesData from '@/data/index.json';
import slugMapData from '@/data/slug-map.json';
import Link from 'next/link';
import SearchBox from './SearchBox';
import { Metadata } from 'next';

const { slugMap, idMap } = slugMapData as { slugMap: Record<string, string>; idMap: Record<string, string> };

interface ArticleIndex {
  id: string;
  title: string;
  description?: string;
  url: string;
}

const categories = [
  { name: 'Нормативы', count: 15, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Дерматология', count: 12, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Хирургия', count: 8, color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Терапия', count: 22, color: 'bg-[#f1f8e9] text-[#2e7d32] border-[#2e7d32]/20' },
  { name: 'Диагностика', count: 14, color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { name: 'Фармакология', count: 6, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { name: 'Офтальмология', count: 5, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { name: 'Стоматология', count: 4, color: 'bg-pink-50 text-pink-700 border-pink-200' },
];

function getCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('правил') || t.includes('закон') || t.includes('сп') || t.includes('норм') || t.includes('инструкц')) return 'Нормативы';
  if (t.includes('дермат') || t.includes('кож') || t.includes('аллерг') || t.includes('пиодерм') || t.includes('зуд')) return 'Дерматология';
  if (t.includes('хирург') || t.includes('операц') || t.includes('шов') || t.includes('травм') || t.includes('кист')) return 'Хирургия';
  if (t.includes('узи') || t.includes('рентген') || t.includes('диагност') || t.includes('лаборатор') || t.includes('ока')) return 'Диагностика';
  if (t.includes('глаз') || t.includes('uveit') || t.includes('uveit') || t.includes('глауком')) return 'Офтальмология';
  if (t.includes('зуб') || t.includes('стомат') || t.includes('пародонт')) return 'Стоматология';
  if (t.includes('препарат') || t.includes('лекарств') || t.includes('вакцин') || t.includes('моксидектин')) return 'Фармакология';
  return 'Терапия';
}

export const metadata: Metadata = {
  title: 'VetClub.ru — Ветеринария для профессионалов',
  description: 'Справочная информация для ветврача. 118 статей по ветеринарной терапии, хирургии, дерматологии, офтальмологии, диагностике.',
  openGraph: {
    title: 'VetClub.ru — Ветеринария для профессионалов',
    description: 'Справочная информация для ветврача. 118 статей по ветеринарии.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function HomePage() {
  const articles: ArticleIndex[] = articlesData;

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white rounded-2xl mb-8"
      >
        <div className="px-4 sm:px-6 py-12 md:py-16"
        >
          <div className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            >
              Ветеринария для профессионалов
            </h1>
            <p className="text-lg md:text-xl text-[#e8f5e9] mb-6 leading-relaxed"
            >
              Справочная информация для ветврача. Обмен опытом лечения животных, 
              форум ветеринарных врачей, профессиональное сообщество.
            </p>
            <div className="flex flex-wrap gap-3"
            >
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium"
              >
                {articles.length} статей
              </span>
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium"
              >
                Нормативные документы
              </span>
              <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium"
              >
                Клинические случаи
              </span>
            </div>
          </div>
        </div>
      </section>

      <SearchBox />

      {/* Articles Grid */}
      <div className="grid gap-4"
      >
        {articles.map((article) => {
          const category = getCategory(article.title);
          const catStyle = categories.find(c => c.name === category)?.color || 'bg-gray-50 text-gray-700 border-gray-200';
          
          return (
            <Link
              key={article.id}
              href={`/articles/${idMap[article.id]}/`}
              className="group block bg-white p-5 rounded-xl border border-gray-200 hover:border-[#81c784] hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f1f8e9] flex items-center justify-center flex-shrink-0 group-hover:bg-[#e8f5e9] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#2e7d32]" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0"
                >
                  <div className="flex items-center gap-2 mb-1"
                  >
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${catStyle}`}
                    >
                      {category}
                    </span>
                  </div>
                  <h2 className="font-semibold text-gray-900 group-hover:text-[#2e7d32] transition-colors"
                  >
                    {article.title}
                  </h2>
                  {article.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2"
                    >
                      {article.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
