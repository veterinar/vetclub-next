import articlesData from '../../data/index.json';
import Link from 'next/link';
import SearchBox from './SearchBox';

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
  { name: 'Терапия', count: 22, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
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

export default function HomePage() {
  const articles: ArticleIndex[] = articlesData;

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
          <div className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            >
              Ветеринария для профессионалов
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8"
        >
          {/* Main Content */}
          <div className="flex-1"
          >
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
                    href={`/articles/${article.id}`}
                    className="group block bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0"
                      >
                        <div className="flex items-center gap-2 mb-1"
                        >
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${catStyle}`}
                          >
                            {category}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors"
                        >
                          {article.title}
                        </h2>
                        {article.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2"
                          >{article.description}</p>
                        )}
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24"
            >
              <h3 className="font-semibold text-gray-900 mb-4"
              >Категории</h3>
              <div className="space-y-2"
              >
                {categories.map(cat => (
                  <div key={cat.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-700"
                    >{cat.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"
                    >{cat.count}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-3"
                >О проекте</h3>
                <p className="text-sm text-gray-500 leading-relaxed"
                >
                  VetClub.ru — первая в России социальная сеть ветеринарных врачей. 
                  Сообщество профессионалов с закрытым членством.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
