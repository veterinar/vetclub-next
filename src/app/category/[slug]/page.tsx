import categoriesData from '@/data/categories.json';
import allArticles from '@/data/articles.json';
import slugMapData from '@/data/slug-map.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const { slugMap, idMap } = slugMapData as { slugMap: Record<string, string>; idMap: Record<string, string> };

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categoriesData.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categoriesData.find((c) => c.slug === slug);
  
  if (!category) {
    return { title: 'Не найдено' };
  }
  
  return {
    title: `${category.name} — VetClub.ru`,
    description: category.description || `${category.name} — статьи по ветеринарии`,
    openGraph: {
      title: `${category.name} — VetClub.ru`,
      description: category.description || `${category.name} — статьи по ветеринарии`,
      type: 'website',
      locale: 'ru_RU',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categoriesData.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const articles = category.articles.map(id => (allArticles as Record<string, any>)[id]).filter(Boolean);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-600 mt-1">{category.description}</p>
        <div className="text-sm text-gray-500 mt-2">Всего статей: {articles.length}</div>
      </div>

      <div className="grid gap-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${idMap[article.id]}/`}
            className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-[#81c784] hover:shadow-sm transition-all"
          >
            <h2 className="font-semibold text-[#1b5e20]">{article.title}</h2>
            {article.description && (
              <p className="text-sm text-gray-500 mt-1">{article.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
