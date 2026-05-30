import { notFound, redirect } from 'next/navigation';
import categoriesData from '@/data/categories.json';

interface Props {
  params: Promise<{ path: string[] }>;
}

export default async function CatchAllPage({ params }: Props) {
  const { path } = await params;
  const fullPath = '/' + path.join('/');

  // Article redirect: /content/view/:id/:catid/ → /article/:id/
  const articleMatch = fullPath.match(/^\/content\/view\/(\d+)\/\d+\/?$/);
  if (articleMatch) {
    redirect(`/article/${articleMatch[1]}/`);
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
  if (fullPath.startsWith('/component/option,com_myblog')) {
    redirect('/blogs/');
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
  if (fullPath === '/content/view/41/61/' || fullPath === '/content/view/41/61') {
    redirect('/about/');
  }
  if (fullPath === '/content/view/64/76/' || fullPath === '/content/view/64/76') {
    redirect('/clinics/');
  }

  notFound();
}
