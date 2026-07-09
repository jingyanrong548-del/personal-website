/**
 * Phase 3 merges: refrigerant data table → knowledge-refrigerants;
 * Taiyuan/Copenhagen conference cards → hthp-column; slim conferences.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function extractCardById(html, id) {
  const marker = `id="${id}"`;
  const idPos = html.indexOf(marker);
  if (idPos === -1) throw new Error(`card not found: ${id}`);
  const openStart = html.lastIndexOf('<div', idPos);
  let depth = 1;
  let pos = openStart + 4;
  while (pos < html.length) {
    const openDiv = html.indexOf('<div', pos);
    const closeDiv = html.indexOf('</div>', pos);
    if (closeDiv === -1) throw new Error(`unclosed card: ${id}`);
    if (openDiv !== -1 && openDiv < closeDiv) {
      depth++;
      pos = openDiv + 4;
    } else {
      depth--;
      pos = closeDiv + 6;
      if (depth === 0) return html.slice(openStart, pos);
    }
  }
  throw new Error(`card end not found: ${id}`);
}

function extractBetween(html, startMarker, endMarker) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker, s);
  if (s === -1 || e === -1) throw new Error(`markers not found: ${startMarker.slice(0, 40)}`);
  return html.slice(s, e);
}

// 1. Merge refrigerant table into knowledge-refrigerants (skip if already merged)
let kr = readFileSync(join(ROOT, 'knowledge-refrigerants.html'), 'utf-8');
if (!kr.includes('id="refrigerant-data-table"')) {
  const hpRef = readFileSync(join(ROOT, 'heat-pump-refrigerants.html'), 'utf-8');
  const refSection = extractBetween(hpRef, '<section class="hp-std-section"', '</section>')
    .replace(
      '<section class="hp-std-section"',
      '<section id="refrigerant-data-table" class="hp-std-section hp-ref-page tools-std-section-block"'
    );

  kr = kr.replace(
    '<footer class="knowledge-footer">',
    `<hr class="knowledge-chapter-rule" aria-hidden="true" />\n\n        <section class="knowledge-article knowledge-section" aria-labelledby="kr-data-table-kicker">\n            <div class="container">\n                <p class="knowledge-chapter-kicker" id="kr-data-table-kicker" data-i18n="knowledge.hub.refrigerants.title">Refrigerants</p>\n                <h2 class="knowledge-section-title" data-i18n="hpRef.pageTitle">HTHP applicable working fluids</h2>\n                <p class="knowledge-article2-lede" data-i18n="hpRef.lede" data-i18n-html="true">Reproduces Table 2 from the IIR Technical Brief.</p>\n                <div class="hp-std-controls" role="search">\n                    <select id="hpRefTypeFilter" class="hp-std-select" aria-label="Fluid type">\n                        <option value="all" data-i18n="hpRef.filter.allTypes">All types</option>\n                    </select>\n                </div>\n            </div>\n        </section>\n\n        ${refSection}\n\n        <footer class="knowledge-footer">`
  );
}

kr = kr.replaceAll('href="./heat-pump-refrigerants.html"', 'href="#refrigerant-data-table"');
kr = kr.replaceAll('href="./heat-pump-policies.html"', 'href="./heat-pump-standards.html#policies"');

if (!kr.includes('</section>\n\n        <footer class="knowledge-footer">')) {
  kr = kr.replace(
    '\n        <footer class="knowledge-footer">',
    '\n        </section>\n\n        <footer class="knowledge-footer">'
  );
}

writeFileSync(join(ROOT, 'knowledge-refrigerants.html'), kr);

// 2. Move HTHP conference cards to hthp-column
const conf = readFileSync(join(ROOT, 'briefings/conferences.html'), 'utf-8');
let hthp = readFileSync(join(ROOT, 'hthp-column.html'), 'utf-8');

if (!hthp.includes('id="hthp-exhibition-trends"')) {
  const taiyuanCard = extractCardById(conf, 'exhibition-trends-taiyuan-hthp2026');
  const copenhagenCard = extractCardById(conf, 'exhibition-trends-copenhagen-hthp');

  const trendsBlock = `<section id="hthp-exhibition-trends" class="knowledge-section hthp-column-section" aria-labelledby="hthp-exhibition-trends-title">
            <div class="container container--narrow">
                <h2 class="knowledge-section-title" id="hthp-exhibition-trends-title" data-i18n="hthpCol.exhibitionTrends.title">Trade-show trend notes (HTHP)</h2>
                <p class="knowledge-article2-lede" data-i18n="hthpCol.exhibitionTrends.lede">Selected industrial high-temperature heat pump signals from recent conferences.</p>
                <div class="exhibition-trends-group">
                ${taiyuanCard}
                ${copenhagenCard}
                </div>
            </div>
        </section>`;

  hthp = hthp.replace('<section id="hthp-related"', `${trendsBlock}\n\n        <section id="hthp-related"`);
}

hthp = hthp.replaceAll('href="./heat-pump-refrigerants.html"', 'href="./knowledge-refrigerants.html#refrigerant-data-table"');
hthp = hthp.replaceAll('href="./heat-pump-policies.html"', 'href="./heat-pump-standards.html#policies"');
hthp = hthp.replace(
  'href="./briefings/conferences.html#exhibition-trends-taiyuan-hthp2026"',
  'href="#hthp-exhibition-trends"'
);

writeFileSync(join(ROOT, 'hthp-column.html'), hthp);

// 3. Slim conferences — keep CRH + heating forum only
if (conf.includes('exhibition-trends-taiyuan-hthp2026')) {
  const crhCard = extractCardById(conf, 'exhibition-trends-crh2026');
  const heatingCard = extractCardById(conf, 'exhibition-trends');

  const slimConfBody = `<div class="exhibition-trends-group" aria-labelledby="exhibition-trends-section-heading">
                <h3 class="exhibition-trends-section-heading" id="exhibition-trends-section-heading" data-i18n="briefings.exhibitionTrends.sectionTitle">Recent major trade show trend notes</h3>
                ${crhCard}
                ${heatingCard}
                <p class="exhibition-trends-crosslink" data-i18n="briefings.exhibitionTrends.hthpLink" data-i18n-html="true">Industrial HTHP conference notes → <a href="../hthp-column.html#hthp-exhibition-trends">Industrial HTHP</a> in the Knowledge base</p>
            </div>`;

  const slimConf = conf.replace(
    /<div class="exhibition-trends-group"[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/,
    `${slimConfBody}\n</div></main>`
  );

  writeFileSync(join(ROOT, 'briefings/conferences.html'), slimConf);
}

// 4. Redirect stub for heat-pump-refrigerants
writeFileSync(
  join(ROOT, 'heat-pump-refrigerants.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=./knowledge-refrigerants.html#refrigerant-data-table">
<link rel="canonical" href="https://www.jingyanrong.com/knowledge-refrigerants.html#refrigerant-data-table">
<title>Redirect — Refrigerant data table</title>
<script>location.replace('./knowledge-refrigerants.html#refrigerant-data-table');</script>
</head>
<body>
<p><a href="./knowledge-refrigerants.html#refrigerant-data-table">Moved to Knowledge — Refrigerants data table</a></p>
</body>
</html>`
);

console.log('phase 3 knowledge merges done');
