/**
 * Generates article HTML pages, content-index.json, feed.xml, and sitemap.xml
 * from content JSON files before Vite build.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content');
const SITE = 'https://www.jingyanrong.com';
const OG_IMAGE = `${SITE}/portrait.jpg`;

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadJsonFiles(subdir) {
  const dir = join(CONTENT_DIR, subdir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf-8');
      return JSON.parse(raw);
    });
}

function articleHead({ title, description, canonical, type = 'article', published }) {
  const ogType = type === 'briefing' ? 'article' : 'article';
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title.en)}</title>
    <meta name="description" content="${escapeHtml(description.en)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${escapeHtml(title.en)}">
    <meta property="og:description" content="${escapeHtml(description.en)}">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:site_name" content="荆炎荣个人网站">
    <meta property="article:published_time" content="${published}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title.en)}">
    <meta name="twitter:description" content="${escapeHtml(description.en)}">
    <meta name="twitter:image" content="${OG_IMAGE}">
    <link rel="alternate" type="application/rss+xml" title="Jing Yanrong — Articles" href="${SITE}/feed.xml">
    <link rel="stylesheet" href="/src/style.css">
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title.en,
      alternativeHeadline: title.zh,
      datePublished: published,
      author: { '@type': 'Person', name: 'Jing Yanrong', alternateName: '荆炎荣' },
      publisher: { '@type': 'Person', name: 'Jing Yanrong' },
      image: OG_IMAGE,
      url: canonical,
      inLanguage: ['en', 'zh-CN'],
    })}</script>
    <script>
      (function() {
        var gaId = 'G-8FEYKHY4J7';
        if (gaId) {
          var script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
          document.head.appendChild(script);
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', gaId);
        }
      })();
    </script>
    <script type="module" src="/src/articlePage.js"></script>
</head>`;
}

function siteNav(depth = 0) {
  const p = depth === 0 ? './' : '../';
  return `
    <a class="skip-link" href="#main-content" data-i18n="ui.skipToMain">Skip to main content</a>
    <nav class="navbar">
        <div class="container">
            <a class="nav-brand" href="${p}" data-i18n="nav.brand">Jing Yanrong</a>
            <details class="nav-mobile-menu">
                <summary class="nav-mobile-menu-toggle" aria-label="Menu">
                    <span data-i18n="nav.menu">Menu</span>
                </summary>
                <div class="nav-right">
                    <ul class="nav-menu">
                        <li class="nav-menu__group nav-menu__group--chips">
                            <ul class="nav-menu__sublist">
                                <li><a href="${p}articles.html" class="nav-link nav-link--chip" data-i18n="nav.articles">Articles</a></li>
                                <li><a href="${p}knowledge.html" class="nav-link nav-link--chip" data-i18n="nav.knowledge">Heat pump basics</a></li>
                                <li><a href="${p}heat-pump-standards.html" class="nav-link nav-link--chip" data-i18n="nav.hpStandards">Heat pump standards</a></li>
                                <li><a href="${p}heat-pump-policies.html" class="nav-link nav-link--chip" data-i18n="nav.hpPolicies">Industrial heat pump policies</a></li>
                                <li><a href="${p}useful-links.html" class="nav-link nav-link--chip" data-i18n="nav.usefulLinks">Useful links</a></li>
                            </ul>
                        </li>
                        <li class="nav-menu__group nav-menu__group--anchors">
                            <ul class="nav-menu__sublist">
                                <li><a href="${p}#apps" class="nav-link nav-link--anchor" data-i18n="nav.apps">Toolbox</a></li>
                                <li><a href="${p}#briefings" class="nav-link nav-link--anchor" data-i18n="nav.briefings">Industry Briefings</a></li>
                                <li><a href="${p}#insights" class="nav-link nav-link--anchor" data-i18n="nav.insights">Engineering Insights</a></li>
                                <li><a href="${p}#about" class="nav-link nav-link--anchor" data-i18n="nav.about">About</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </details>
            <div class="nav-right nav-right--desktop">
                <ul class="nav-menu">
                    <li class="nav-menu__group nav-menu__group--chips">
                        <ul class="nav-menu__sublist">
                            <li><a href="${p}articles.html" class="nav-link nav-link--chip" data-i18n="nav.articles">Articles</a></li>
                            <li><a href="${p}knowledge.html" class="nav-link nav-link--chip" data-i18n="nav.knowledge">Heat pump basics</a></li>
                            <li><a href="${p}heat-pump-standards.html" class="nav-link nav-link--chip" data-i18n="nav.hpStandards">Heat pump standards</a></li>
                            <li><a href="${p}heat-pump-policies.html" class="nav-link nav-link--chip" data-i18n="nav.hpPolicies">Industrial heat pump policies</a></li>
                            <li><a href="${p}useful-links.html" class="nav-link nav-link--chip" data-i18n="nav.usefulLinks">Useful links</a></li>
                        </ul>
                    </li>
                    <li class="nav-menu__group nav-menu__group--anchors">
                        <ul class="nav-menu__sublist">
                            <li><a href="${p}#apps" class="nav-link nav-link--anchor" data-i18n="nav.apps">Toolbox</a></li>
                            <li><a href="${p}#briefings" class="nav-link nav-link--anchor" data-i18n="nav.briefings">Industry Briefings</a></li>
                            <li><a href="${p}#insights" class="nav-link nav-link--anchor" data-i18n="nav.insights">Engineering Insights</a></li>
                            <li><a href="${p}#about" class="nav-link nav-link--anchor" data-i18n="nav.about">About</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="language-switcher">
                <button class="lang-btn" data-lang="zh" type="button">中文</button>
                <button class="lang-btn active" data-lang="en" type="button">EN</button>
            </div>
        </div>
    </nav>`;
}

function articleFooter(depth = 0) {
  const p = depth === 0 ? './' : '../';
  return `
    <footer class="footer">
        <div class="container">
            <div class="footer-contact">
                <a href="mailto:jingyanrong@126.com" class="footer-link"><span data-i18n="contact.email">Email</span></a>
                <button class="footer-link contact-wechat-btn" id="open-contact-modal" type="button"><span data-i18n="contact.wechat">Contact</span></button>
            </div>
            <div class="site-legal-disclaimer-slot" data-site-disclaimer-slot></div>
            <div class="footer-copyright">
                <p data-i18n="footer.copyright">© {year} Jing Yanrong. Open Source Engineering.</p>
            </div>
        </div>
    </footer>
    <div class="contact-modal" id="contact-modal">
        <div class="contact-modal-overlay" id="contact-modal-overlay"></div>
        <div class="contact-modal-content">
            <button class="contact-modal-close" id="contact-modal-close" type="button" data-i18n-aria-label="ui.closeModal">×</button>
            <div class="contact-modal-tabs">
                <button class="contact-modal-tab active" data-tab="global" type="button"><span data-i18n="contact.tab.saveContact">Save Contact</span></button>
                <button class="contact-modal-tab" data-tab="wechat" type="button"><span data-i18n="contact.tab.wechat">WeChat</span></button>
            </div>
            <div class="contact-modal-body">
                <div class="contact-modal-tab-content active" data-content="global">
                    <div class="contact-modal-qrcode-container">
                        <img id="vcard-qrcode" src="" alt="vCard QR Code" />
                        <a href="/jingyanrong-en.vcf" download id="vcard-download-btn" class="contact-modal-vcard-btn"><span data-i18n="contact.modal.downloadVCard">Download vCard</span></a>
                    </div>
                </div>
                <div class="contact-modal-tab-content" data-content="wechat">
                    <img id="contact-wechat-qr" src="/wechat-qrcode.png" alt="WeChat QR code" />
                </div>
            </div>
        </div>
    </div>`;
}

function buildBriefingPage(item) {
  const canonical = `${SITE}/briefings/${item.slug}.html`;
  const desc = item.subtitle?.en || item.highlights.en[0] || item.title.en;
  const depth = 1;
  const p = '../';

  const body = `${articleHead({
    title: item.title,
    description: { en: desc, zh: item.subtitle?.zh || desc },
    canonical,
    type: 'briefing',
    published: item.published,
  })}
<body data-article-type="briefing">
${siteNav(depth)}
<script type="application/json" id="article-data">${JSON.stringify(item)}</script>
<main id="main-content" class="article-page">
    <div class="container container--narrow">
        <nav class="article-breadcrumb" aria-label="Breadcrumb">
            <a href="${p}" data-i18n="article.breadcrumb.home">Home</a>
            <span aria-hidden="true">/</span>
            <a href="${p}articles.html" data-i18n="article.breadcrumb.articles">Articles</a>
            <span aria-hidden="true">/</span>
            <span data-i18n="article.breadcrumb.briefing">Weekly briefing</span>
        </nav>
        <article class="article-main">
            <header class="article-header">
                <p class="article-kicker" data-i18n="briefings.title">Refrigeration &amp; Heat Pump Briefings</p>
                <h1 class="article-title" id="article-title"></h1>
                <p class="article-subtitle u-hidden" id="article-subtitle"></p>
                <time class="article-date" id="article-date" datetime="${item.published}"></time>
            </header>
            <nav class="article-toc u-hidden" id="article-toc" aria-label="Table of contents"></nav>
            <div class="article-body" id="article-body"></div>
            <footer class="article-footer">
                <div class="article-share" id="article-share"></div>
                <div class="article-cta">
                    <p data-i18n="methodology.cta.text">Industrial heat pump sizing or extreme-duty optimization—book a 15-minute technical diagnostic.</p>
                    <button type="button" class="consultant-cta-btn" id="article-contact-cta" data-i18n="methodology.cta.button">Book diagnostic</button>
                </div>
            </footer>
        </article>
    </div>
</main>
${articleFooter(depth)}
</body>
</html>`;

  const outDir = join(ROOT, 'briefings');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${item.slug}.html`), body);
  return { ...item, url: `/briefings/${item.slug}.html`, canonical };
}

function buildInsightPage(item) {
  const canonical = `${SITE}/insights/${item.slug}.html`;
  const plainDesc = item.excerpt.en.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
  const depth = 1;

  const body = `${articleHead({
    title: item.title,
    description: { en: plainDesc, zh: plainDesc },
    canonical,
    type: 'insight',
    published: item.published,
  })}
<body data-article-type="insight">
${siteNav(depth)}
<script type="application/json" id="article-data">${JSON.stringify(item)}</script>
<main id="main-content" class="article-page">
    <div class="container container--narrow">
        <nav class="article-breadcrumb" aria-label="Breadcrumb">
            <a href="../" data-i18n="article.breadcrumb.home">Home</a>
            <span aria-hidden="true">/</span>
            <a href="../articles.html" data-i18n="article.breadcrumb.articles">Articles</a>
            <span aria-hidden="true">/</span>
            <span data-i18n="article.breadcrumb.insight">Engineering insight</span>
        </nav>
        <article class="article-main">
            <header class="article-header">
                <span class="insight-tag" id="article-tag"></span>
                <h1 class="article-title" id="article-title"></h1>
                <time class="article-date" id="article-date" datetime="${item.published}"></time>
            </header>
            <div class="article-body article-body--insight" id="article-body"></div>
            <footer class="article-footer">
                <div class="article-share" id="article-share"></div>
                <div class="article-cta">
                    <p data-i18n="methodology.cta.text">Industrial heat pump sizing or extreme-duty optimization—book a 15-minute technical diagnostic.</p>
                    <button type="button" class="consultant-cta-btn" id="article-contact-cta" data-i18n="methodology.cta.button">Book diagnostic</button>
                </div>
            </footer>
        </article>
    </div>
</main>
${articleFooter(depth)}
</body>
</html>`;

  const outDir = join(ROOT, 'insights');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${item.slug}.html`), body);
  return { ...item, url: `/insights/${item.slug}.html`, canonical };
}

function buildContentIndex(briefings, insights) {
  const all = [
    ...briefings.map((b) => ({
      id: b.id,
      type: b.type,
      slug: b.slug,
      series: b.series,
      published: b.published,
      title: b.title,
      subtitle: b.subtitle,
      highlights: b.highlights,
      url: `/briefings/${b.slug}.html`,
      year: b.year,
      week: b.week,
    })),
    ...insights.map((i) => ({
      id: i.id,
      type: i.type,
      slug: i.slug,
      series: i.series,
      published: i.published,
      title: i.title,
      tag: i.tag,
      dateLabel: i.dateLabel,
      excerptPlain: {
        en: i.excerpt.en.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200),
        zh: i.excerpt.zh.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200),
      },
      url: `/insights/${i.slug}.html`,
    })),
  ].sort((a, b) => (a.published < b.published ? 1 : -1));

  const latestRaw = briefings.sort((a, b) => (a.published < b.published ? 1 : -1))[0] || null;
  const latestBriefing = latestRaw
    ? {
        id: latestRaw.id,
        slug: latestRaw.slug,
        year: latestRaw.year,
        week: latestRaw.week,
        published: latestRaw.published,
        title: latestRaw.title,
        subtitle: latestRaw.subtitle,
        highlights: latestRaw.highlights,
        url: `/briefings/${latestRaw.slug}.html`,
      }
    : null;

  const index = {
    generatedAt: new Date().toISOString().slice(0, 10),
    latestBriefing,
    items: all,
    briefings: briefings.map((b) => ({ slug: b.slug, published: b.published, title: b.title, url: `/briefings/${b.slug}.html` })),
    insights: insights.map((i) => ({ slug: i.slug, published: i.published, title: i.title, url: `/insights/${i.slug}.html` })),
  };

  writeFileSync(join(ROOT, 'public', 'content-index.json'), JSON.stringify(index, null, 2));
  return index;
}

function buildFeed(items) {
  const entries = items
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .map((item) => {
      const link = `${SITE}${item.url}`;
      const title = `${item.title.en} / ${item.title.zh}`;
      const desc = item.subtitle?.en || item.excerptPlain?.en || item.highlights?.en?.[0] || '';
      return `  <item>
    <title>${escapeHtml(title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${new Date(item.published).toUTCString()}</pubDate>
    <description>${escapeHtml(desc)}</description>
  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jing Yanrong — Industrial Heat Pump Articles</title>
    <link>${SITE}/articles.html</link>
    <description>Weekly industry briefings and engineering insights by Jing Yanrong</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${entries}
  </channel>
</rss>`;
  writeFileSync(join(ROOT, 'public', 'feed.xml'), xml);
}

function buildSitemap(articleUrls) {
  const today = new Date().toISOString().slice(0, 10);
  const staticPages = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE}/articles.html`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE}/knowledge.html`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE}/useful-links.html`, priority: '0.65', changefreq: 'monthly' },
    { loc: `${SITE}/heat-pump-standards.html`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE}/heat-pump-policies.html`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE}/briefings/annex68-iea-hpt.html`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${SITE}/briefings/conferences.html`, priority: '0.6', changefreq: 'monthly' },
  ];

  const urls = [
    ...staticPages.map((p) => ({ ...p, lastmod: today })),
    ...articleUrls.map((a) => ({
      loc: a.canonical,
      lastmod: a.published,
      priority: a.type === 'briefing' ? '0.85' : '0.75',
      changefreq: 'monthly',
    })),
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
  writeFileSync(join(ROOT, 'public', 'sitemap.xml'), xml);
}

function main() {
  const briefings = loadJsonFiles('briefings');
  const insights = loadJsonFiles('insights');

  const articleUrls = [];
  briefings.forEach((b) => articleUrls.push(buildBriefingPage(b)));
  insights.forEach((i) => articleUrls.push(buildInsightPage(i)));

  const index = buildContentIndex(briefings, insights);
  buildFeed(index.items);
  buildSitemap(articleUrls);

  const inputsPath = join(ROOT, 'scripts', 'generated-pages.json');
  writeFileSync(
    inputsPath,
    JSON.stringify(
      {
        articlePages: articleUrls.map((a) => `briefings/${a.slug}.html`.replace(/^briefings\//, a.type === 'briefing' ? `briefings/${a.slug}.html` : `insights/${a.slug}.html`)),
      },
      null,
      2
    )
  );

  console.log(`[build-content] ${briefings.length} briefing(s), ${insights.length} insight(s), feed + sitemap updated.`);
}

main();
