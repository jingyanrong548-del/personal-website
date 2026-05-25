import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf-8');

const aStart = '<div class="featured-insight-card exhibition-trends-card annex68-briefing-card"';
const aEndMarker = '</div>\n                </div>\n            </details>\n\n            <details class="briefing-panel">';
const idx = html.indexOf(aStart);
const idx2 = html.indexOf(aEndMarker);
const annex = html.slice(idx, idx2);

const cStart = '<div class="exhibition-trends-group"';
const cEndMarker = '</div>\n                </div>\n            </details>\n            </div>\n        </div>\n    </section>\n\n    <!-- Insights Section -->';
const idx3 = html.indexOf(cStart);
const idx4 = html.indexOf(cEndMarker);
const conf = html.slice(idx3, idx4);

function shell(slug, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${slug}</title>
<link rel="canonical" href="https://www.jingyanrong.com/briefings/${slug}.html">
<meta property="og:image" content="https://www.jingyanrong.com/portrait.jpg">
<link rel="stylesheet" href="/src/style.css">
<script type="module" src="/src/notePage.js"></script>
</head>
<body>
<a class="skip-link" href="#main-content" data-i18n="ui.skipToMain">Skip to main content</a>
<nav class="navbar"><div class="container">
<a class="nav-brand" href="../" data-i18n="nav.brand">Jing Yanrong</a>
<a href="../articles.html" class="nav-link nav-link--chip" data-i18n="nav.articles">Articles</a>
<div class="language-switcher"><button class="lang-btn" data-lang="zh" type="button">中文</button><button class="lang-btn active" data-lang="en" type="button">EN</button></div>
</div></nav>
<main id="main-content" class="article-page note-page"><div class="container container--narrow">
<nav class="article-breadcrumb"><a href="../" data-i18n="article.breadcrumb.home">Home</a> <span>/</span> <a href="../articles.html" data-i18n="article.breadcrumb.articles">Articles</a></nav>
${body}
</div></main>
<footer class="footer"><div class="container"><div class="site-legal-disclaimer-slot" data-site-disclaimer-slot></div><p data-i18n="footer.copyright">© {year} Jing Yanrong.</p></div></footer>
<div class="contact-modal" id="contact-modal"><div class="contact-modal-overlay" id="contact-modal-overlay"></div><div class="contact-modal-content"><button class="contact-modal-close" id="contact-modal-close" type="button">×</button></div></div>
</body>
</html>`;
}

mkdirSync(join(ROOT, 'briefings'), { recursive: true });
writeFileSync(join(ROOT, 'briefings/annex68-iea-hpt.html'), shell('annex68-iea-hpt', annex));
writeFileSync(join(ROOT, 'briefings/conferences.html'), shell('conferences', conf));
console.log('extracted notes');
