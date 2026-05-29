import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  const articles = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  return articles.map((a: { id: string }) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const articlePath = path.join(process.cwd(), 'data', 'articles', `${id}.json`);
  
  if (!fs.existsSync(articlePath)) {
    return { title: 'Не найдено' };
  }
  
  const article: Article = JSON.parse(fs.readFileSync(articlePath, 'utf-8'));
  return {
    title: article.title,
    description: article.description || article.title,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const articlePath = path.join(process.cwd(), 'data', 'articles', `${id}.json`);
  
  if (!fs.existsSync(articlePath)) {
    notFound();
  }
  
  const article: Article = JSON.parse(fs.readFileSync(articlePath, 'utf-8'));

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:text-emerald-700">← Статьи</a>
      </nav>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        {article.title}
      </h1>
      
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-emerald-700"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </main>
  );
}
