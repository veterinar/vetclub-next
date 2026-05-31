const fs = require('fs');

const data = JSON.parse(fs.readFileSync('/root/.openclaw/workspace/vetclub-next/src/data/articles.json', 'utf8'));

// Fix article 121 - remove SUMMARY section and МГАВМиБ
if (data['121']) {
  let c = data['121'].content;
  // Remove everything from SUMMARY onwards
  const summaryIdx = c.indexOf('SUMMARY');
  if (summaryIdx !== -1) {
    c = c.substring(0, summaryIdx);
    // Clean up trailing <br/> tags
    c = c.replace(/<br\/>\s*<br\/>\s*<br\/>\s*$/i, '');
    c = c.replace(/<br\/>\s*<br\/>\s*$/i, '');
    data['121'].content = c;
    console.log('Removed SUMMARY from 121');
  }
  // Remove МГАВМиБ paragraph at beginning
  const mgIdx = c.indexOf('МГАВМиБ');
  if (mgIdx !== -1 && mgIdx < 200) {
    // Find start of paragraph
    let start = c.lastIndexOf('<p', mgIdx);
    if (start === -1) start = c.lastIndexOf('<P', mgIdx);
    if (start === -1) start = 0;
    // Find end of paragraph
    let end = c.indexOf('</p>', mgIdx);
    if (end === -1) end = c.indexOf('</P>', mgIdx);
    if (end !== -1) {
      end += 4;
      c = c.substring(0, start) + c.substring(end);
      data['121'].content = c;
      console.log('Removed МГАВМиБ from 121');
    }
  }
}

// Fix article 122 - remove МГАВМиБ paragraph
if (data['122']) {
  let c = data['122'].content;
  const mgIdx = c.indexOf('МГАВМиБ');
  if (mgIdx !== -1) {
    let start = c.lastIndexOf('<p', mgIdx);
    if (start === -1) start = c.lastIndexOf('<P', mgIdx);
    if (start === -1) start = Math.max(0, mgIdx - 50);
    let end = c.indexOf('</p>', mgIdx);
    if (end === -1) end = c.indexOf('</P>', mgIdx);
    if (end !== -1) {
      end += 4;
      c = c.substring(0, start) + c.substring(end);
      data['122'].content = c;
      console.log('Removed МГАВМиБ from 122');
    }
  }
}

fs.writeFileSync('/root/.openclaw/workspace/vetclub-next/src/data/articles.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Done');
