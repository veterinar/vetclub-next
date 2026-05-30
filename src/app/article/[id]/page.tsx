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
      <div>
        <div className="pathway mb-4">
          <span className="pathway text-xs">
            <Link href="/" className="hover:underline">Главная</Link>
            <span className="px-1">→</span>
            <span className="text-gray-500">{article.title}</span>
          </span>
        </div>

        <div className="content-box">
          <div className="content-heading mb-4">{article.title}</div>
          
          {article.description && (
            <div className="text-xs text-gray-500 mb-4 italic">
              {article.description}
            </div>
          )}

          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
