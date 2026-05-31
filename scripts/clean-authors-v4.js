const fs = require('fs');
const cheerio = require('cheerio');

const data = JSON.parse(fs.readFileSync('/root/.openclaw/workspace/vetclub-next/src/data/articles.json', 'utf8'));

function cleanArticle(id, article) {
  if (!article.content) return false;
  const $ = cheerio.load(article.content, { decodeEntities: false });
  let changed = false;

  // Specific fixes by article ID
  if (id === '44' || id === '103') {
    // Remove Литература sections at the end
    $('strong, b, h2, h3, p').each((i, el) => {
      const text = $(el).text();
      if ((text.includes('Литература') || text.includes('Литература:')) && text.length < 50) {
        $(el).remove();
        let next = $(el).next();
        while (next.length) {
          const toRemove = next;
          next = next.next();
          toRemove.remove();
        }
        changed = true;
        console.log('Removed Литература from', id);
        return false;
      }
    });
  }

  if (id === '98') {
    // Remove Сароян author block
    $('p, a, span').each((i, el) => {
      const text = $(el).text();
      if (text.includes('Сароян С. В.') && text.length < 100) {
        $(el).remove();
        changed = true;
        console.log('Removed Сароян from', id);
      }
    });
  }

  if (id === '107' || id === '114') {
    // Remove author affiliation with Великобритания
    $('p, em, strong').each((i, el) => {
      const text = $(el).text();
      if (text.includes('Великобритания') && (text.includes('MRCVS') || text.includes('DVD') || text.includes('PhD') || text.includes('DVM') || text.length < 200)) {
        $(el).remove();
        changed = true;
        console.log('Removed Великобритания author block from', id);
      }
    });
  }

  if (id === '121') {
    // Remove SUMMARY section
    $('p, h2, div').each((i, el) => {
      const text = $(el).text();
      if (text.includes('SUMMARY')) {
        $(el).remove();
        let next = $(el).next();
        while (next.length) {
          const nextText = next.text();
          if (nextText.length > 300 && !nextText.includes('Ключевые слова')) {
            break;
          }
          const toRemove = next;
          next = next.next();
          toRemove.remove();
        }
        changed = true;
        console.log('Removed SUMMARY from', id);
        return false;
      }
    });
    // Remove МГАВМиБ paragraph at beginning
    $('p').each((i, el) => {
      const text = $(el).text();
      if (i < 2 && text.includes('МГАВМиБ') && text.includes('кафедре')) {
        $(el).remove();
        changed = true;
        console.log('Removed МГАВМиБ from', id);
      }
    });
  }

  if (id === '122') {
    // Remove МГАВМиБ paragraph
    $('p').each((i, el) => {
      const text = $(el).text();
      if (text.includes('МГАВМиБ') && text.includes('кафедре') && text.includes('хирургии')) {
        $(el).remove();
        changed = true;
        console.log('Removed МГАВМиБ from', id);
      }
    });
  }

  if (id === '353') {
    // Remove Сотникова affiliation
    $('p, em, strong').each((i, el) => {
      const text = $(el).text();
      if (text.includes('Сотникова') && text.includes('клиника') && text.length < 200) {
        $(el).remove();
        changed = true;
        console.log('Removed Сотникова affiliation from', id);
      }
    });
  }

  if (changed) {
    article.content = $('body').html() || article.content;
  }
  return changed;
}

const targetIds = ['44', '98', '103', '107', '114', '121', '122', '353'];
let modified = 0;

for (const id of targetIds) {
  if (data[id]) {
    if (cleanArticle(id, data[id])) modified++;
  }
}

fs.writeFileSync('/root/.openclaw/workspace/vetclub-next/src/data/articles.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Done. Modified:', modified);
