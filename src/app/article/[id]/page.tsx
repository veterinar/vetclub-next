import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import articlesData from '@/data/index.json';
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
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return articlesData.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const article = await import(`../../data/articles/${id}.json`) as Article;
    return {
      title: article.title,
      description: article.description || article.title,
    };
  } catch {
    return { title: 'Не найдено' };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;

  try {
    const article = await import(`../../data/articles/${id}.json`) as Article;

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
  } catch {
    notFound();
  }
}
