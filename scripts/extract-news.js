const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const vetclubStatic = '/root/.openclaw/workspace/vetclub-static';
const articlesFile = '/root/.openclaw/workspace/vetclub-next/src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesFile, 'utf8'));

// Find all news articles (category 57)
const newsFiles = require('child_process')
  .execSync(`find ${vetclubStatic}/content/view/ -path "*/57/index.html"`)
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

let added = 0;

for (const file of newsFiles) {
  const match = file.match(/content\/view\/(\d+)\/57\/index\.html/);
  if (!match) continue;
  const id = match[1];
  
  if (articles[id]) continue; // Already extracted
  
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  
  const title = $('title').text().trim() || $('h1.componentheading').text().trim() || $('h2.contentheading').text().trim();
  if (!title || title === 'VetClub.ru' || title.includes('Offline')) continue;
  
  // Extract content from article
  let content = '';
  const article = $('table.contentpaneopen, td.componentheading').closest('table').find('tr:last-child td').html() ||
                  $('div#content').html() ||
                  $('article').html() ||
                  $('td.contentheading').closest('table').next().html();
  
  if (article) {
    content = article;
  } else {
    // Fallback: extract from body
    const body = $('body').html() || '';
    content = body;
  }
  
  // Clean content
  content = content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<!--.*?-->/g, '')
    .trim();
  
  if (!content || content.length < 50) continue;
  
  articles[id] = {
    id,
    title,
    content,
    url: `/content/view/${id}/57/`,
  };
  
  added++;
  console.log(`Added: ${id} - ${title}`);
}

fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2), 'utf8');
console.log(`\nAdded ${added} news articles. Total: ${Object.keys(articles).length}`);
