const fs = require('fs');
const cheerio = require('cheerio');

const authors = ['Копенкин', 'Сароян', 'Сотникова', 'Комаров', 'Позябин', 'Тимофеев', 'Fisher', 'МГАВМиБ', 'SUMMARY', 'Литература', 'На кафедре'];

const data = JSON.parse(fs.readFileSync('/root/.openclaw/workspace/vetclub-next/src/data/articles.json', 'utf8'));

let modified = 0;
let removed = 0;

for (const [id, article] of Object.entries(data)) {
  if (!article.content) continue;
  
  // Remove trash articles
  if (article.title && article.title.includes('Offline')) {
    delete data[id];
    removed++;
    console.log('Removed trash article:', id, article.title);
    continue;
  }
  
  const $ = cheerio.load(article.content, { decodeEntities: false });
  let changed = false;
  
  // Remove author blocks at the beginning
  $('p, h1, h2, h3, div').each((i, el) => {
    const text = $(el).text();
    const html = $.html(el);
    
    // Check if it's an author block (early in document, contains author names)
    if (i < 5 && (text.includes('Копенкин') || text.includes('Сароян') || text.includes('Сотникова') || text.includes('Комаров') || text.includes('Позябин') || text.includes('Тимофеев'))) {
      $(el).remove();
      changed = true;
      console.log('Removed author block from', id, ':', text.substring(0, 60));
      return;
    }
    
    // Remove SUMMARY section
    if (text.includes('SUMMARY') && text.length < 200) {
      $(el).remove();
      // Remove everything after SUMMARY
      let next = $(el).next();
      while (next.length) {
        const nextText = next.text();
        if (nextText.includes('Литература') || nextText.includes('Ключевые слова') || nextText.length > 500) {
          // Stop if we hit literature or a large text block (likely main content resume)
          if (nextText.includes('Ключевые слова') || nextText.includes('Литература')) {
            next.remove();
          }
          break;
        }
        const toRemove = next;
        next = next.next();
        toRemove.remove();
      }
      changed = true;
      console.log('Removed SUMMARY from', id);
      return;
    }
    
    // Remove Литература section
    if ((text.includes('Литература') || text.toLowerCase().includes('литература')) && text.length < 100) {
      $(el).remove();
      let next = $(el).next();
      while (next.length) {
        const toRemove = next;
        next = next.next();
        toRemove.remove();
      }
      changed = true;
      console.log('Removed Литература from', id);
      return;
    }
    
    // Remove МГАВМиБ affiliation paragraphs
    if (text.includes('МГАВМиБ') && (text.includes('кафедра') || text.includes('кафедре') || text.includes('ФГОУ') || text.includes('ВПО'))) {
      $(el).remove();
      changed = true;
      console.log('Removed МГАВМиБ block from', id, ':', text.substring(0, 60));
      return;
    }
    
    // Remove "На кафедре" paragraphs at the beginning
    if (i < 3 && text.includes('На кафедре') && text.includes('проводились')) {
      $(el).remove();
      changed = true;
      console.log('Removed На кафедре block from', id);
      return;
    }
  });
  
  if (changed) {
    article.content = $('body').html() || article.content;
    modified++;
  }
}

fs.writeFileSync('/root/.openclaw/workspace/vetclub-next/src/data/articles.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Done. Modified:', modified, 'Removed:', removed);
