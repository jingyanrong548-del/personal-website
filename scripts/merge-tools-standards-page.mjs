/**
 * Merges policies + useful-links sections into heat-pump-standards.html
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function extractBetween(html, startMarker, endMarker) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker, s);
  if (s === -1 || e === -1) throw new Error(`markers not found: ${startMarker}`);
  return html.slice(s, e);
}

const policies = readFileSync(join(ROOT, 'heat-pump-policies.html'), 'utf-8');
const links = readFileSync(join(ROOT, 'useful-links.html'), 'utf-8');
let standards = readFileSync(join(ROOT, 'heat-pump-standards.html'), 'utf-8');

const policiesBody = extractBetween(
  policies,
  '<section id="hp-policy-table"',
  '<footer class="knowledge-footer">'
);

const linksBody = extractBetween(
  links,
  '<section class="knowledge-section useful-links-section"',
  '<footer class="knowledge-footer">'
).replace(
  'class="knowledge-section useful-links-section"',
  'id="links" class="knowledge-section useful-links-section tools-std-section-block"'
);

const policiesWrapped = `<div id="policies" class="tools-std-section-block knowledge-page hp-policy-page">\n${policiesBody}\n</div>`;

const newHero = `    <main id="main-content" class="hp-std-page tools-std-page">
        <header class="hp-std-hero">
            <div class="container">
                <div class="hp-std-hero-card">
                    <p class="hp-std-kicker" data-i18n="toolsStd.nav.standards">Standards</p>
                    <h1 class="hp-std-title" data-i18n="toolsStd.pageTitle">Tools & standards</h1>
                    <p class="hp-std-lede" data-i18n="toolsStd.lede">Standards quick reference, industrial heat-pump policies, curated external links, and links to engineering calculators.</p>
                    <nav class="tools-std-subnav" aria-label="Page sections">
                        <a href="#standards" data-i18n="toolsStd.nav.standards">Standards</a>
                        <a href="#policies" data-i18n="toolsStd.nav.policies">Policies</a>
                        <a href="#links" data-i18n="toolsStd.nav.links">Links</a>
                        <a href="./#apps" data-i18n="toolsStd.cta.tools">Engineering calculators</a>
                    </nav>
                </div>
            </div>
        </header>

        <section id="standards" class="hp-std-section tools-std-section-block" aria-labelledby="hp-std-table-heading">`;

standards = standards.replace(
  /<main class="hp-std-page">[\s\S]*?<section class="hp-std-section"/,
  newHero
);

standards = standards.replace(
  /<\/section>\s*<\/main>/,
  `</section>\n\n${policiesWrapped}\n\n${linksBody}\n\n        <div class="site-legal-disclaimer-slot" data-site-disclaimer-slot></div>\n    </main>`
);

standards = standards.replace(
  /<title>[^<]+<\/title>/,
  '<title>Tools &amp; standards — Jing Yanrong</title>'
);
standards = standards.replace(
  /content="Industrial heat pump standards[^"]*"/g,
  (m, i) => {
    if (standards.indexOf(m) === standards.lastIndexOf(m)) return m;
    return m;
  }
);

writeFileSync(join(ROOT, 'heat-pump-standards.html'), standards);
console.log('merged tools & standards page');
