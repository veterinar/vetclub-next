import { notFound } from 'next/navigation';
import articlesData from '@/data/index.json';
import categoriesData from '@/data/categories.json';
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
  params: Promise<{ path: string[] }>;
}

export default async function CatchAllPage({ params }: Props) {
  const { path } = await params;
  const fullPath = '/' + path.join('/');

  // Check for article: /content/view/:id/:catid/
  const articleMatch = fullPath.match(/^\/content\/view\/(\d+)\/(\d+)\/?$/);
  if (articleMatch) {
    const articleId = articleMatch[1];
    try {
      const article = await import(`../../data/articles/${articleId}.json`) as Article;
      return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-emerald-700">← Главная</Link>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      );
    } catch {
      notFound();
    }
  }

  // Check for category: /content/category/:secid/:catid/:itemid/
  const categoryMatch = fullPath.match(/^\/content\/category\/(\d+)\/(\d+)\/(\d+)\/?$/);
  if (categoryMatch) {
    const catId = `${categoryMatch[1]}/${categoryMatch[2]}/${categoryMatch[3]}`;
    const category = categoriesData.find((c) => c.id === catId);
    if (category) {
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
                href={`/content/view/${article.id}/${categoryMatch[3]}/`}
                className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <h2 className="font-semibold text-emerald-800">{article.title}</h2>
                {article.description && <p className="text-sm text-gray-500 mt-1">{article.description}</p>}
              </Link>
            ))}
          </div>
        </div>
      );
    }
  }

  // Check for component pages
  if (fullPath.startsWith('/component/option,com_fireboard')) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Форум ветврачей</h1>
        <p className="text-gray-600 mb-4">Профессиональное сообщество ветеринарных врачей</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-amber-700">Форум временно недоступен. Идёт миграция данных.</p>
        </div>
      </div>
    );
  }

  if (fullPath.startsWith('/component/option,com_myblog')) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Блоги</h1>
        <p className="text-gray-600 mb-4">Персональные блоги ветеринарных врачей</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-amber-700">Блоги временно недоступны. Идёт миграция данных.</p>
        </div>
      </div>
    );
  }

  if (fullPath.startsWith('/component/option,com_neorecruit')) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Работа для ветврачей</h1>
        <p className="text-gray-600 mb-4">Вакансии для ветеринарных врачей</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-amber-700">Раздел вакансий временно недоступен. Идёт миграция данных.</p>
        </div>
      </div>
    );
  }

  if (fullPath.startsWith('/component/option,com_classifieds')) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Доска объявлений</h1>
        <p className="text-gray-600 mb-4">Объявления о продаже оборудования, препаратов</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-amber-700">Доска объявлений временно недоступна. Идёт миграция данных.</p>
        </div>
      </div>
    );
  }

  if (fullPath.startsWith('/component/option,com_sobi2')) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Справочник организаций</h1>
        <p className="text-gray-600 mb-4">Ветеринарные клиники, аптеки, лаборатории</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-amber-700">Справочник временно недоступен. Идёт миграция данных.</p>
        </div>
      </div>
    );
  }

  if (fullPath.startsWith('/component/option,com_search')) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Поиск по сайту</h1>
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Введите запрос..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button type="submit" className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800">
            Поиск
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-2">Поиск по статьям и материалам сайта</p>
      </div>
    );
  }

  if (fullPath.startsWith('/component/option,com_contact')) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Связаться с администратором</h1>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
            <textarea rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
          </div>
          <button type="submit" className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800">
            Отправить
          </button>
        </form>
      </div>
    );
  }

  // Check for specific static pages
  if (fullPath === '/content/view/41/61/' || fullPath === '/content/view/41/61') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">О проекте</h1>
        <div className="prose prose-lg max-w-none">
          <p>VetClub.ru — первая в России социальная сеть ветеринарных врачей.</p>
          <p>Сообщество профессионалов с закрытым членством.</p>
        </div>
      </div>
    );
  }

  if (fullPath === '/content/view/64/76/' || fullPath === '/content/view/64/76') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Ветеринарные клиники и врачи</h1>
        <div className="prose prose-lg max-w-none">
          <p>Каталог ветеринарных клиник и врачей.</p>
        </div>
      </div>
    );
  }

  if (fullPath === '/partners/' || fullPath === '/partners') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Ссылки. Обмен ссылками</h1>
        <p className="text-gray-600 mb-4">Обмен ссылками с ветеринарными сайтами и организациями.</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-700">Раздел временно недоступен. Идёт обновление.</p>
        </div>
      </div>
    );
  }

  notFound();
}
