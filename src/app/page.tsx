import articlesData from '../../data/index.json';
import Link from 'next/link';
import SearchBox from './SearchBox';

interface ArticleIndex {
  id: string;
  title: string;
  description?: string;
  url: string;
}

export default function HomePage() {
  const articles: ArticleIndex[] = articlesData;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Статьи</h1>
      <p className="text-gray-600 mb-6">Справочная информация для ветеринарных врачей</p>

      <SearchBox />

      <div className="grid gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-sm transition-all"
          >
            <h2 className="text-lg font-semibold text-emerald-800 mb-1">
              {article.title}
            </h2>
            {article.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
