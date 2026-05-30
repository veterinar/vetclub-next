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
      <div className="pathway mb-4">
        <span className="pathway text-xs">
          <Link href="/" className="hover:underline">Главная</Link>
          <span className="px-1">→</span>
          <span className="text-gray-500">{category.name}</span>
        </span>
      </div>

      <div className="content-box">
        <div className="component-heading mb-4">{category.name}</div>
        
        <p className="text-xs text-gray-600 mb-2">{category.description}</p>
        <div className="text-xs text-gray-500 mb-4">Всего статей: {articles.length}</div>

        <div className="space-y-1">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border-b border-gray-100 pb-2 last:border-0"
            >
              <Link
                href={`/content/view/${article.id}/${category.id.split('/').pop()}/`}
                className="text-sm text-[#1a5da0] hover:underline block"
              >
                {article.title}
              </Link>
              {article.description && (
                <p className="text-xs text-gray-500 mt-0.5">{article.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
