import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import articlesData from '../../../data/index.json';

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
  return articlesData.map((a: { id: string }) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const article = await import(`../../../data/articles/${id}.json`) as Article;
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
    const article = await import(`../../../data/articles/${id}.json`) as Article;

    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-#2e7d32 flex items-center gap-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Статьи
          </a>
        </nav>
        
        <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 leading-tight">
            {article.title}
          </h1>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-#2e7d32 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}
