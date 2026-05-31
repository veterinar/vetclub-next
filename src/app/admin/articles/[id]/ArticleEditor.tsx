'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  X,
  Eye,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  Code,
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  metaTitle?: string;
  description?: string;
  keywords?: string;
  content: string;
  category?: string;
  slug?: string;
}

interface Props {
  id: string;
  isNew: boolean;
  initialData?: Article;
}

export default function ArticleEditor({ id, isNew, initialData }: Props) {
  const router = useRouter();

  const [article, setArticle] = useState<Article>({
    id: isNew ? '' : id,
    title: initialData?.title || '',
    metaTitle: initialData?.metaTitle || '',
    description: initialData?.description || '',
    keywords: initialData?.keywords || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    slug: initialData?.slug || '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  const handleSave = useCallback(async () => {
    if (!article.id.trim()) {
      setError('ID статьи обязателен');
      return;
    }
    if (!article.title.trim()) {
      setError('Название обязательно');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });

      if (res.ok) {
        router.push('/admin/articles');
        router.refresh();
      } else {
        setError('Ошибка сохранения');
      }
    } catch {
      setError('Ошибка сохранения');
    }
    setSaving(false);
  }, [article, router]);

  const insertTag = useCallback(
    (openTag: string, closeTag: string = '') => {
      const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = article.content;
      const selected = text.substring(start, end);

      const newContent =
        text.substring(0, start) +
        openTag +
        selected +
        (closeTag || openTag) +
        text.substring(end);

      setArticle(prev => ({ ...prev, content: newContent }));

      setTimeout(() => {
        textarea.focus();
        const newCursor = start + openTag.length + selected.length;
        textarea.setSelectionRange(newCursor, newCursor);
      }, 0);
    },
    [article.content]
  );

  const updateField = useCallback(
    (field: keyof Article, value: string) => {
      setArticle(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Новая статья' : 'Редактирование статьи'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isNew ? 'Создайте новую статью' : `ID: ${id}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            <Eye size={18} />
            {preview ? 'Редактор' : 'Превью'}
          </button>
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            <X size={18} />
            Отмена
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] disabled:opacity-50 font-medium transition-colors"
          >
            <Save size={18} />
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Editor / Preview */}
      {preview ? (
        <Preview article={article} />
      ) : (
        <Editor
          article={article}
          updateField={updateField}
          insertTag={insertTag}
          isNew={isNew}
        />
      )}
    </div>
  );
}

function Editor({
  article,
  updateField,
  insertTag,
  isNew,
}: {
  article: Article;
  updateField: (field: keyof Article, value: string) => void;
  insertTag: (open: string, close?: string) => void;
  isNew: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Basic fields */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Основные поля
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={article.id}
              onChange={e => updateField('id', e.target.value)}
              disabled={!isNew}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] disabled:bg-gray-100 disabled:text-gray-500 text-sm"
              placeholder="101"
            />
            <p className="text-xs text-gray-400 mt-1">
              Уникальный идентификатор (не меняется)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={article.slug}
              onChange={e => updateField('slug', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-sm"
              placeholder="/articles/my-article"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={article.title}
            onChange={e => updateField('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-sm"
            placeholder="Название статьи"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            value={article.metaTitle}
            onChange={e => updateField('metaTitle', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-sm"
            placeholder="SEO заголовок"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Категория
            </label>
            <input
              type="text"
              value={article.category}
              onChange={e => updateField('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-sm"
              placeholder="therapy, surgery..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ключевые слова
            </label>
            <input
              type="text"
              value={article.keywords}
              onChange={e => updateField('keywords', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-sm"
              placeholder="ветеринария, терапия..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание
          </label>
          <input
            type="text"
            value={article.description}
            onChange={e => updateField('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-sm"
            placeholder="Краткое описание статьи"
          />
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-100 bg-gray-50 flex-wrap">
          <ToolbarButton
            onClick={() => insertTag('<strong>', '</strong>')}
            icon={<Bold size={16} />}
            label="Жирный"
          />
          <ToolbarButton
            onClick={() => insertTag('<em>', '</em>')}
            icon={<Italic size={16} />}
            label="Курсив"
          />
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={() => insertTag('<h1>', '</h1>')}
            icon={<Heading1 size={16} />}
            label="H1"
          />
          <ToolbarButton
            onClick={() => insertTag('<h2>', '</h2>')}
            icon={<Heading2 size={16} />}
            label="H2"
          />
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={() => insertTag('<ul>\n<li>', '</li>\n</ul>')}
            icon={<List size={16} />}
            label="Список"
          />
          <ToolbarButton
            onClick={() => insertTag('<ol>\n<li>', '</li>\n</ol>')}
            icon={<ListOrdered size={16} />}
            label="Нумерация"
          />
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={() => insertTag('<a href="">', '</a>')}
            icon={<LinkIcon size={16} />}
            label="Ссылка"
          />
          <ToolbarButton
            onClick={() => insertTag('<img src="" alt="" />')}
            icon={<Image size={16} />}
            label="Изображение"
          />
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={() => insertTag('<code>', '</code>')}
            icon={<Code size={16} />}
            label="Код"
          />
        </div>

        <textarea
          id="content-editor"
          value={article.content}
          onChange={e => updateField('content', e.target.value)}
          rows={24}
          className="w-full px-4 py-3 font-mono text-sm focus:outline-none resize-none"
          placeholder="HTML контент статьи..."
        />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1.5 text-gray-600 hover:text-[#2e7d32] hover:bg-[#f0fdf4] rounded transition-colors"
      title={label}
    >
      {icon}
    </button>
  );
}

function Preview({ article }: { article: Article }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          {article.title || 'Без названия'}
        </h1>
        {article.description && (
          <p className="text-gray-600 mt-2">{article.description}</p>
        )}
        {article.category && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#2e7d32] mt-3">
            {article.category}
          </span>
        )}
      </div>
      <div
        className="p-6 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
