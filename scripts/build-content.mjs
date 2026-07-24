/**
 * Generates article HTML pages, content-index.json, search-index.json,
 * feed.xml, and sitemap.xml from content JSON files before Vite build.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { siteNav } from './site-nav.mjs';

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
    <meta property="og:site_name" content="Open Thermal AI">
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
${siteNav({ depth, brand: 'link' })}
<div data-hub-directory="content" data-hub-mode="rail" class="hub-dir-mount"></div>
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
${siteNav({ depth, brand: 'link' })}
<div data-hub-directory="content" data-hub-mode="rail" class="hub-dir-mount"></div>
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
      const desc = plainText(item.subtitle?.en || item.excerptPlain?.en || item.highlights?.en?.[0] || '');
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


function buildCasePage(item) {
  const canonical = `${SITE}/cases/${item.slug}.html`;
  const faqLd = (item.faq || []).map((f) => ({
    '@type': 'Question',
    name: f.q?.en || '',
    acceptedAnswer: { '@type': 'Answer', text: f.a?.en || '' },
  }));
  const head = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(item.title.en)} — Open Thermal AI Cases</title>
    <meta name="description" content="${escapeHtml(item.excerpt?.en || '')}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:site_name" content="Open Thermal AI">
    <meta property="og:title" content="${escapeHtml(item.title.en)}">
    <meta property="og:description" content="${escapeHtml(item.excerpt?.en || '')}">
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: item.title.en,
      datePublished: item.published,
      author: { '@type': 'Organization', name: 'Open Thermal AI' },
      url: canonical,
    })}</script>
    ${faqLd.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqLd })}</script>` : ''}
    <link rel="stylesheet" href="/src/style.css">
    <script type="module" src="/src/casePage.js"></script>
</head>`;
  const body = `
<body class="theme-ota">
${siteNav({ depth: 1, brand: 'link' }).trim()}
<main id="main-content" class="case-detail-page section" data-case-slug="${escapeHtml(item.slug)}">
  <div class="container container--narrow">
    <p><a href="../cases.html" data-i18n="cases.back">← All cases</a></p>
    <p class="section-kicker case-industry" data-industry="${escapeHtml(item.industry)}"></p>
    <h1 data-i18n-case="title">${escapeHtml(item.title.en)}</h1>
    <p class="section-lede-minimal" data-i18n-case="excerpt">${escapeHtml(item.excerpt?.en || '')}</p>
    <section class="case-engineering" id="case-engineering">
      <h2 data-i18n="cases.detail.engineering">Engineering data</h2>
      <dl class="case-eng-dl" id="case-eng-dl"></dl>
    </section>
    <section><h2 data-i18n="cases.detail.background">Project background</h2><p data-i18n-case="background">${escapeHtml(item.background?.en || '')}</p></section>
    <section><h2 data-i18n="cases.detail.inputs">Source / inputs</h2><p data-i18n-case="inputs">${escapeHtml(item.inputs?.en || '')}</p></section>
    <section><h2 data-i18n="cases.detail.solution">Heat pump solution</h2><p data-i18n-case="solution">${escapeHtml(item.solution?.en || '')}</p></section>
    <section><h2 data-i18n="cases.detail.performance">COP &amp; savings</h2><p data-i18n-case="performance">${escapeHtml(item.performance?.en || '')}</p></section>
    <section><h2 data-i18n="cases.detail.roi">Investment / ROI notes</h2><p data-i18n-case="roi">${escapeHtml(item.roi?.en || '')}</p></section>
    <div id="case-faq"></div>
  </div>
</main>
<script type="application/json" id="case-data">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>
<footer class="footer-section"><div class="container"><div class="site-legal-disclaimer-slot" data-site-disclaimer-slot></div></div></footer>
</body>
</html>`;
  const outDir = join(ROOT, 'cases');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${item.slug}.html`), head + body);
  return { ...item, type: 'case', url: `/cases/${item.slug}.html`, canonical };
}

function buildCasesIndex(cases) {
  const items = cases
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      published: c.published,
      industry: c.industry,
      title: c.title,
      excerpt: c.excerpt,
      url: `/cases/${c.slug}.html`,
      capacityKw: c.engineering?.capacityKw ?? null,
      refrigerant: c.engineering?.refrigerant ?? null,
      cop: c.engineering?.cop ?? null,
      technology: c.engineering?.technology ?? null,
    }))
    .sort((a, b) => (a.published < b.published ? 1 : -1));
  writeFileSync(join(ROOT, 'public', 'cases-index.json'), JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), items }, null, 2));
  return items;
}

function buildSitemap(articleUrls) {
  const today = new Date().toISOString().slice(0, 10);
  const staticPages = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE}/articles.html`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE}/knowledge.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-cycles.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-refrigerants.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-compressor.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-exchanger.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-vessels.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-valves.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-electrical.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-lubricants.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-piping.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-enclosure.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/knowledge-shop-test.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/hthp-column.html`, priority: '0.75', changefreq: 'monthly' },
    { loc: `${SITE}/heat-pump-standards.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/tools.html`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE}/ai-engineer.html`, priority: '0.95', changefreq: 'weekly' },
    { loc: `${SITE}/cases.html`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE}/founder.html`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE}/roadmap.html`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/why.html`, priority: '0.75', changefreq: 'monthly' },
    { loc: `${SITE}/ai-workspace.html`, priority: '0.85', changefreq: 'monthly' },
    { loc: `${SITE}/services.html`, priority: '0.85', changefreq: 'monthly' },
    { loc: `${SITE}/services-technologies.html`, priority: '0.75', changefreq: 'monthly' },
    { loc: `${SITE}/services-integration.html`, priority: '0.75', changefreq: 'monthly' },
    { loc: `${SITE}/services-transition.html`, priority: '0.75', changefreq: 'monthly' },
    { loc: `${SITE}/services-specs.html`, priority: '0.75', changefreq: 'monthly' },
    { loc: `${SITE}/services-dissemination.html`, priority: '0.75', changefreq: 'monthly' },
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

function loadManualSiteUpdates() {
  // Hand-maintained entries in content/site-updates.json (see .cursor/rules/site-updates.mdc).
  const path = join(CONTENT_DIR, 'site-updates.json');
  if (!existsSync(path)) return [];
  try {
    const raw = readFileSync(path, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data.manual) ? data.manual : [];
  } catch {
    return [];
  }
}

function briefingToUpdate(b) {
  return {
    id: b.id,
    date: b.published,
    category: 'briefing',
    title: b.title,
    summary: briefingSummary(b),
    url: `/briefings/${b.slug}.html`,
  };
}

function insightToUpdate(i) {
  const plain = (html) =>
    String(html || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);
  return {
    id: i.id,
    date: i.published,
    category: 'insight',
    title: i.title,
    summary: {
      en: plain(i.excerpt?.en),
      zh: plain(i.excerpt?.zh),
    },
    url: `/insights/${i.slug}.html`,
  };
}

function plainText(htmlOrText, maxLen = 0) {
  const text = String(htmlOrText || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (maxLen > 0) return text.slice(0, maxLen);
  return text;
}

/** Prefer subtitle; if falling back to a highlight line, strip inline markup markers. */
function briefingSummary(b) {
  return {
    en: b.subtitle?.en || plainText(b.highlights?.en?.[0] || ''),
    zh: b.subtitle?.zh || plainText(b.highlights?.zh?.[0] || ''),
  };
}

function joinLangLists(value) {
  if (!value) return { en: '', zh: '' };
  if (typeof value === 'string') return { en: value, zh: value };
  const join = (arr) => (Array.isArray(arr) ? arr.map((x) => plainText(x)).filter(Boolean).join(' ') : plainText(arr));
  return {
    en: join(value.en),
    zh: join(value.zh),
  };
}

function briefingBodyText(b) {
  const highlights = joinLangLists(b.highlights);
  const fromSections = { en: [], zh: [] };
  (b.sections || []).forEach((sec) => {
    const items = sec?.items || {};
    (items.en || []).forEach((line) => fromSections.en.push(plainText(line)));
    (items.zh || []).forEach((line) => fromSections.zh.push(plainText(line)));
  });
  return {
    en: [highlights.en, fromSections.en.join(' ')].filter(Boolean).join(' ').slice(0, 2400),
    zh: [highlights.zh, fromSections.zh.join(' ')].filter(Boolean).join(' ').slice(0, 2400),
  };
}

function loadSearchPages() {
  const path = join(CONTENT_DIR, 'search-pages.json');
  if (!existsSync(path)) return [];
  try {
    const data = JSON.parse(readFileSync(path, 'utf-8'));
    return Array.isArray(data.pages) ? data.pages : [];
  } catch {
    return [];
  }
}

function buildSearchIndex(briefings, insights) {
  const pages = loadSearchPages().map((p) => ({
    id: p.id,
    category: p.category || 'page',
    url: p.url,
    title: p.title,
    summary: p.summary || { en: '', zh: '' },
    keywords: p.keywords || { en: [], zh: [] },
    body: p.body || { en: '', zh: '' },
    date: p.date || null,
  }));

  const articles = [
    ...briefings.map((b) => ({
      id: b.id,
      category: 'briefing',
      url: `/briefings/${b.slug}.html`,
      title: b.title,
      summary: briefingSummary(b),
      keywords: { en: [], zh: [] },
      body: briefingBodyText(b),
      date: b.published,
    })),
    ...insights.map((i) => ({
      id: i.id,
      category: 'insight',
      url: `/insights/${i.slug}.html`,
      title: i.title,
      summary: {
        en: plainText(i.excerpt?.en, 220),
        zh: plainText(i.excerpt?.zh, 220),
      },
      keywords: {
        en: i.tag?.en ? [i.tag.en] : [],
        zh: i.tag?.zh ? [i.tag.zh] : [],
      },
      body: {
        en: plainText(i.excerpt?.en, 800),
        zh: plainText(i.excerpt?.zh, 800),
      },
      date: i.published,
    })),
  ];

  const byId = new Map();
  [...pages, ...articles].forEach((item) => {
    if (item?.id) byId.set(item.id, item);
  });

  const items = [...byId.values()].sort((a, b) => {
    const da = a.date || '';
    const db = b.date || '';
    if (da && db && da !== db) return da < db ? 1 : -1;
    if (da && !db) return -1;
    if (!da && db) return 1;
    return String(a.title?.en || '').localeCompare(String(b.title?.en || ''));
  });

  const payload = {
    generatedAt: new Date().toISOString().slice(0, 10),
    count: items.length,
    items,
  };

  writeFileSync(join(ROOT, 'public', 'search-index.json'), JSON.stringify(payload, null, 2));
  return payload;
}

function buildSiteUpdates(briefings, insights) {
  const manual = loadManualSiteUpdates();
  const auto = [];

  const latestBriefing = [...briefings].sort((a, b) => (a.published < b.published ? 1 : -1))[0];
  if (latestBriefing) auto.push(briefingToUpdate(latestBriefing));

  const latestInsight = [...insights].sort((a, b) => (a.published < b.published ? 1 : -1))[0];
  if (latestInsight) auto.push(insightToUpdate(latestInsight));

  const byId = new Map();
  [...manual, ...auto].forEach((item) => {
    if (item?.id) byId.set(item.id, item);
  });

  const items = [...byId.values()]
    .sort((a, b) => {
      if (a.date === b.date) return 0;
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 8);

  const payload = {
    version: items[0]?.id || 'none',
    generatedAt: new Date().toISOString().slice(0, 10),
    items,
  };

  writeFileSync(join(ROOT, 'public', 'site-updates.json'), JSON.stringify(payload, null, 2));
  return payload;
}

function main() {
  const briefings = loadJsonFiles('briefings');
  const insights = loadJsonFiles('insights');
  const cases = loadJsonFiles('cases');

  const articleUrls = [];
  briefings.forEach((b) => articleUrls.push(buildBriefingPage(b)));
  insights.forEach((i) => articleUrls.push(buildInsightPage(i)));
  const caseUrls = cases.map((c) => buildCasePage(c));
  buildCasesIndex(cases);

  const index = buildContentIndex(briefings, insights);
  const searchIndex = buildSearchIndex(briefings, insights);
  buildSiteUpdates(briefings, insights);
  buildFeed(index.items);
  buildSitemap([...articleUrls, ...caseUrls]);

  const inputsPath = join(ROOT, 'scripts', 'generated-pages.json');
  writeFileSync(
    inputsPath,
    JSON.stringify(
      {
        articlePages: [
          ...articleUrls.map((a) => `${a.type === 'briefing' ? 'briefings' : 'insights'}/${a.slug}.html`),
          ...caseUrls.map((c) => `cases/${c.slug}.html`),
        ],
      },
      null,
      2
    )
  );

  console.log(
    `[build-content] ${briefings.length} briefing(s), ${insights.length} insight(s), ${cases.length} case(s), search index ${searchIndex.count} item(s), feed + sitemap updated.`
  );
}

main();
