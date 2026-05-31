const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('/root/.openclaw/workspace/vetclub-next/src/data/articles.json', 'utf8'));
const index = Object.entries(articles).map(([id, article]) => ({
  id,
  title: article.title,
  description: article.description,
  url: article.url || `/content/view/${id}/`
}));
fs.writeFileSync('/root/.openclaw/workspace/vetclub-next/src/data/index.json', JSON.stringify(index, null, 2), 'utf8');
console.log('Regenerated index.json with', index.length, 'articles');
