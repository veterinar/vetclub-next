import categoriesData from '@/data/categories.json';
import articlesData from '@/data/index.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categoriesData.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categoriesData.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const articles = articlesData.filter((a) => category.articles.includes(a.id));

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
            href={`/content/view/${article.id}/${category.id.split('/').pop()}/`}
            className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-#81c784 hover:shadow-sm transition-all"
          >
            <h2 className="font-semibold text-#1b5e20">{article.title}</h2>
            {article.description && (
              <p className="text-sm text-gray-500 mt-1">{article.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
