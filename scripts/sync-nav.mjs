/**
 * Replaces navbar in static HTML with shared siteNav from site-nav.mjs.
 * Run after editing scripts/site-nav.mjs: node scripts/sync-nav.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { siteNav, notePageNav } from './site-nav.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const NAV_START = /<a class="skip-link"|<nav class="navbar"/;
const NAV_END = /<\/nav>\s*\n/;

function replaceNav(html, newNav) {
  const startMatch = html.match(/<a class="skip-link"/);
  const navOnlyMatch = !startMatch && html.match(/<nav class="navbar"/);
  if (!startMatch && !navOnlyMatch) return null;

  const startIdx = startMatch ? html.indexOf('<a class="skip-link"') : html.indexOf('<nav class="navbar"');
  const endIdx = html.indexOf('</nav>', startIdx);
  if (endIdx === -1) return null;
  const afterNav = endIdx + '</nav>'.length;
  return html.slice(0, startIdx) + newNav.trim() + '\n\n' + html.slice(afterNav).replace(/^\s*\n/, '');
}

function processFile(relPath, navHtml) {
  const full = join(ROOT, relPath);
  let html = readFileSync(full, 'utf-8');
  const updated = replaceNav(html, navHtml);
  if (!updated) {
    console.warn('skip (no nav):', relPath);
    return;
  }
  writeFileSync(full, updated);
  console.log('synced:', relPath);
}

const rootPages = [
  'articles.html',
  'knowledge.html',
  'knowledge-refrigerants.html',
  'hthp-column.html',
  'heat-pump-standards.html',
  'heat-pump-refrigerants.html',
  'heat-pump-policies.html',
  'useful-links.html',
];

rootPages.forEach((f) => processFile(f, siteNav({ depth: 0, brand: 'link' })));

// index.html: text brand, anchors without ./
let indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf-8');
const indexNav = siteNav({ depth: 0, brand: 'text' }).replace(/\.\/#/g, '#');
const idxStart = indexHtml.indexOf('<a class="skip-link"');
const idxEnd = indexHtml.indexOf('</nav>', idxStart) + '</nav>'.length;
indexHtml = indexHtml.slice(0, idxStart) + indexNav.trim() + '\n\n' + indexHtml.slice(idxEnd).replace(/^\s*\n/, '');
writeFileSync(join(ROOT, 'index.html'), indexHtml);
console.log('synced: index.html');

['briefings', 'insights'].forEach((dir) => {
  const folder = join(ROOT, dir);
  readdirSync(folder)
    .filter((f) => f.endsWith('.html'))
    .forEach((f) => {
      const rel = `${dir}/${f}`;
      if (f === 'annex68-iea-hpt.html' || f === 'conferences.html') {
        let html = readFileSync(join(ROOT, rel), 'utf-8');
        const start = html.indexOf('<a class="skip-link"');
        const end = html.indexOf('</nav>', start) + '</nav>'.length;
        html = html.slice(0, start) + notePageNav(1).trim() + '\n' + html.slice(end).replace(/^\s*\n/, '');
        writeFileSync(join(ROOT, rel), html);
        console.log('synced note:', rel);
        return;
      }
      processFile(rel, siteNav({ depth: 1, brand: 'link' }));
    });
});

console.log('nav sync done');
