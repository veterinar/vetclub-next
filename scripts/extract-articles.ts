import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const STATIC_DIR = '/root/.openclaw/workspace/vetclub-static';
const OUTPUT_DIR = './data';

interface Article {
  id: string;
  title: string;
  metaTitle?: string;
  description?: string;
  keywords?: string;
  content: string;
  category?: string;
  date?: string;
  url: string;
}

function extractTextContent(dom: JSDOM): string {
  const body = dom.window.document.body;
  if (!body) return '';
  
  // Remove script and style elements
  const scripts = body.querySelectorAll('script, style, iframe, nav, header, footer, .moduletable, #leftcolumn, #rightcolumn');
  scripts.forEach(s => s.remove());
  
  return body.innerHTML;
}

function parseArticle(filePath: string, relativePath: string): Article | null {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    const title = doc.querySelector('title')?.textContent?.trim() || '';
    const metaTitle = doc.querySelector('meta[name="title"]')?.getAttribute('content') || '';
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    
    // Extract main content - try common Joomla content containers
    let content = '';
    const contentContainer = doc.querySelector('#mainbody, .contentpaneopen, .componentheading, #content, article, .item-page');
    if (contentContainer) {
      content = contentContainer.innerHTML;
    } else {
      // Fallback: try to find the main content area
      const main = doc.querySelector('main, #main, .main, .content');
      if (main) {
        content = main.innerHTML;
      } else {
        // Last resort: body minus obvious template elements
        const body = doc.querySelector('body');
        if (body) {
          // Remove template elements
          const toRemove = body.querySelectorAll('#header, #footer, #leftcolumn, #rightcolumn, .moduletable, nav, aside, .banner, .menu');
          toRemove.forEach(el => el.remove());
          content = body.innerHTML;
        }
      }
    }
    
    if (!content.trim() || content.length < 100) return null;
    
    // Derive ID from path: content/view/100/index.html → 100
    const pathParts = relativePath.split('/');
    const id = pathParts[pathParts.length - 2] || pathParts[pathParts.length - 1].replace('.html', '');
    
    return {
      id,
      title: title.replace(' - Клуб ветеринарных врачей VetClub.ru', '').replace('VetClub.ru', '').trim(),
      metaTitle,
      description,
      keywords,
      content,
      url: relativePath.replace('/index.html', '').replace('.html', ''),
    };
  } catch (e) {
    return null;
  }
}

function scanDirectory(dir: string, basePath: string = ''): Article[] {
  const articles: Article[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    if (entry.isDirectory()) {
      articles.push(...scanDirectory(fullPath, relativePath));
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.php')) {
      const article = parseArticle(fullPath, relativePath);
      if (article) {
        articles.push(article);
      }
    }
  }
  
  return articles;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  console.log('Scanning content/view/...');
  const viewDir = path.join(STATIC_DIR, 'content', 'view');
  let articles: Article[] = [];
  
  if (fs.existsSync(viewDir)) {
    const entries = fs.readdirSync(viewDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const articleDir = path.join(viewDir, entry.name);
        const indexFile = path.join(articleDir, 'index.html');
        if (fs.existsSync(indexFile)) {
          const article = parseArticle(indexFile, path.join('content', 'view', entry.name, 'index.html'));
          if (article) {
            article.id = entry.name;
            articles.push(article);
          }
        }
      }
    }
  }
  
  // Also scan other patterns
  console.log('Scanning component/option,com_content/...');
  const componentDir = path.join(STATIC_DIR, 'component');
  if (fs.existsSync(componentDir)) {
    // Look for com_content patterns
  }
  
  // Remove duplicates by ID
  const seen = new Set<string>();
  articles = articles.filter(a => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });
  
  console.log(`Found ${articles.length} articles`);
  
  // Save as JSON
  fs.writeFileSync(path.join(OUTPUT_DIR, 'articles.json'), JSON.stringify(articles, null, 2));
  
  // Also save as individual files for static generation
  const articlesDir = path.join(OUTPUT_DIR, 'articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  for (const article of articles) {
    fs.writeFileSync(
      path.join(articlesDir, `${article.id}.json`),
      JSON.stringify(article, null, 2)
    );
  }
  
  // Generate index
  const index = articles.map(a => ({
    id: a.id,
    title: a.title,
    description: a.description,
    url: a.url,
  }));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2));
  
  console.log('Done!');
}

main().catch(console.error);
