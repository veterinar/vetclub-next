import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import allArticles from '@/data/articles.json';
import slugMapData from '@/data/slug-map.json';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  metaTitle?: string;
  description?: string;
  keywords?: string;
  content: string;
  url: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

const { slugMap, idMap } = slugMapData as { slugMap: Record<string, string>; idMap: Record<string, string> };

export async function generateStaticParams() {
  return Object.values(slugMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = idMap[slug];
  const article = id ? (allArticles as Record<string, Article>)[id] : null;
  
  if (!article) {
    return { title: 'Не найдено' };
  }
  
  return {
    title: article.title,
    description: article.description || article.title,
    keywords: article.keywords || '',
    openGraph: {
      title: article.title,
      description: article.description || article.title,
      type: 'article',
      locale: 'ru_RU',
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const id = idMap[slug];
  const article = id ? (allArticles as Record<string, Article>)[id] : null;

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#2e7d32] flex items-center gap-1">
          ← Главная
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h1>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
