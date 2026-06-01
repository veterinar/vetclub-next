import { notFound, redirect } from 'next/navigation';
import categoriesData from '@/data/categories.json';
import slugMapData from '@/data/slug-map.json';

const { slugMap, idMap } = slugMapData as { slugMap: Record<string, string>; idMap: Record<string, string> };

interface Props {
  params: Promise<{ path: string[] }>;
}

export default async function CatchAllPage({ params }: Props) {
  const { path } = await params;
  const fullPath = '/' + path.join('/');

  // Don't intercept admin routes — let App Router handle them
  if (fullPath.startsWith('/admin')) {
    redirect('/admin');
  }

  // Legacy article redirect: /content/view/:id/:catid/ → /articles/:slug/
  const articleMatch = fullPath.match(/^\/content\/view\/(\d+)\/\d+\/?$/);
  if (articleMatch) {
    const id = articleMatch[1];
    const slug = idMap[id];
    if (slug) {
      redirect(`/articles/${slug}/`);
    }
  }

  // Legacy article redirect: /article/:id/ → /articles/:slug/
  const oldArticleMatch = fullPath.match(/^\/article\/(\d+)\/?$/);
  if (oldArticleMatch) {
    const id = oldArticleMatch[1];
    const slug = idMap[id];
    if (slug) {
      redirect(`/articles/${slug}/`);
    }
  }

  // Category redirect: /content/category/:any/:any/:catid/ → /category/:slug/
  const categoryMatch = fullPath.match(/^\/content\/category\/\d+\/\d+\/(\d+)\/?$/);
  if (categoryMatch) {
    const catNumId = categoryMatch[1];
    const category = categoriesData.find((c) => {
      const parts = c.id.split('/');
      return parts[parts.length - 1] === catNumId;
    });
    if (category) {
      redirect(`/category/${category.slug}/`);
    }
  }

  // Component redirects
  if (fullPath.startsWith('/component/option,com_fireboard')) {
    redirect('/forum/');
  }
  if (fullPath.startsWith('/component/option,com_neorecruit')) {
    redirect('/jobs/');
  }
  if (fullPath.startsWith('/component/option,com_classifieds')) {
    redirect('/classifieds/');
  }
  if (fullPath.startsWith('/component/option,com_sobi2')) {
    redirect('/directory/');
  }
  if (fullPath.startsWith('/component/option,com_search')) {
    redirect('/search/');
  }
  if (fullPath.startsWith('/component/option,com_contact')) {
    redirect('/contact/');
  }

  // Static page redirects
  if (fullPath === '/content/view/64/76/' || fullPath === '/content/view/64/76') {
    redirect('/clinics/');
  }

  notFound();
}
