import { initLanguageSwitcher, translations, getCurrentLanguage } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal } from './contactModal.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

function escapeHtml(s) {
    if (!s) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatDate(iso, lang) {
    return new Date(iso).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function renderArchive(index) {
    const lang = getCurrentLanguage();
    const t = translations[lang] || translations.en;
    const listEl = document.getElementById('articles-archive-list');
    const featuredEl = document.getElementById('articles-featured');
    if (!listEl) return;

    const latest = index.latestBriefing;
    if (featuredEl && latest) {
        const title = lang === 'zh' ? latest.title.zh : latest.title.en;
        const highlights = (lang === 'zh' ? latest.highlights?.zh : latest.highlights?.en) || [];
        const briefingEntry = document.getElementById('articles-briefing-entry');
        if (briefingEntry) briefingEntry.href = latest.url;
        featuredEl.innerHTML = `
            <article class="articles-featured-card">
                <p class="articles-featured-kicker">${escapeHtml(t['articles.featured.kicker'] || 'Latest briefing')}</p>
                <h2 class="articles-featured-title"><a href="${escapeHtml(latest.url)}">${escapeHtml(title)}</a></h2>
                <ul class="articles-featured-highlights">
                    ${highlights.slice(0, 3).map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
                </ul>
                <a href="${escapeHtml(latest.url)}" class="articles-featured-cta">${escapeHtml(t['briefings.readMore'] || 'Read full report')}</a>
            </article>`;
    }

    const items = index.items || [];
    listEl.innerHTML = items
        .map((item) => {
            const title = lang === 'zh' ? item.title.zh : item.title.en;
            const seriesLabel =
                item.type === 'briefing'
                    ? t['articles.series.briefing'] || 'Weekly briefing'
                    : t['articles.series.insight'] || 'Engineering insight';
            const summary =
                item.subtitle?.[lang] ||
                item.excerptPlain?.[lang] ||
                (item.highlights?.[lang] || [])[0] ||
                '';
            return `<li class="articles-archive-item articles-archive-item--${item.type}">
                <div class="articles-archive-meta">
                    <span class="articles-archive-series">${escapeHtml(seriesLabel)}</span>
                    <time datetime="${item.published}">${formatDate(item.published, lang)}</time>
                </div>
                <h3 class="articles-archive-title"><a href="${escapeHtml(item.url)}">${escapeHtml(title)}</a></h3>
                <p class="articles-archive-summary">${escapeHtml(summary)}</p>
            </li>`;
        })
        .join('');
}

async function loadArchive() {
    try {
        const res = await fetch('/content-index.json');
        if (!res.ok) return;
        const index = await res.json();
        renderArchive(index);
    } catch (e) {
        console.warn('Could not load content index', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({ afterSet: (lang) => { refreshWhatsNewLanguage(lang); loadArchive().then(() => {}); } });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initContactModal();
    initWhatsNew();
    loadArchive();
});
