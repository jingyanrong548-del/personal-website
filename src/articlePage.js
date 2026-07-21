import { initLanguageSwitcher, translations, getCurrentLanguage } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal, updateVCardForLanguage } from './contactModal.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { escapeHtml, formatInlineMarkup } from './formatInlineMarkup.js';

const SECTION_IDS = ['policy', 'market', 'standards', 'technology', 'calendar'];

function renderShare(container) {
    const lang = getCurrentLanguage();
    const t = translations[lang] || translations.en;
    const url = window.location.href;
    container.innerHTML = `
        <p class="article-share-label">${escapeHtml(t['article.share'] || 'Share')}</p>
        <div class="article-share-actions">
            <button type="button" class="article-share-btn" id="article-copy-link">${escapeHtml(t['article.copyLink'] || 'Copy link')}</button>
            <a class="article-share-btn article-share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p class="article-share-copied u-hidden" id="article-share-copied">${escapeHtml(t['article.linkCopied'] || 'Link copied')}</p>`;

    document.getElementById('article-copy-link')?.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(url);
            document.getElementById('article-share-copied')?.classList.remove('u-hidden');
        } catch (_) {
            /* ignore */
        }
    });
}

function renderBriefing(data, lang) {
    const isZh = lang === 'zh';
    const t = translations[lang] || translations.en;
    const tEn = translations.en;

    const titleEl = document.getElementById('article-title');
    const subtitleEl = document.getElementById('article-subtitle');
    const dateEl = document.getElementById('article-date');
    const bodyEl = document.getElementById('article-body');
    const tocEl = document.getElementById('article-toc');

    if (titleEl) {
        const weekTemplate = t['briefings.weekTitle'] || tEn['briefings.weekTitle'];
        titleEl.textContent = String(weekTemplate)
            .replace('{year}', data.year)
            .replace('{week}', data.week);
    }

    const subtitle = isZh ? data.subtitle?.zh : data.subtitle?.en;
    if (subtitleEl) {
        if (subtitle) {
            subtitleEl.textContent = subtitle;
            subtitleEl.classList.remove('u-hidden');
        } else {
            subtitleEl.classList.add('u-hidden');
        }
    }

    if (dateEl) {
        const d = new Date(data.published);
        dateEl.textContent = d.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    if (tocEl && data.sections?.length) {
        tocEl.classList.remove('u-hidden');
        let tocHtml = `<p class="article-toc-title">${escapeHtml(t['article.toc'] || 'On this page')}</p><ul class="article-toc-list">`;
        data.sections.forEach((section) => {
            const items = isZh ? section.items?.zh : section.items?.en;
            if (!items?.length) return;
            const label = t[`briefings.sections.${section.id}`] || tEn[`briefings.sections.${section.id}`] || section.id;
            tocHtml += `<li><a href="#section-${section.id}">${escapeHtml(label)}</a></li>`;
        });
        tocHtml += '</ul>';
        tocEl.innerHTML = tocHtml;
    }

    let html = '';
    (data.sections || []).forEach((section) => {
        const items = isZh ? section.items?.zh : section.items?.en;
        if (!items?.length) return;
        const label = t[`briefings.sections.${section.id}`] || tEn[`briefings.sections.${section.id}`] || section.id;
        html += `<section class="briefing-section briefing-section--${escapeHtml(section.id)}" id="section-${escapeHtml(section.id)}">
            <h2 class="briefing-section-title">${escapeHtml(label)}</h2>
            <ul class="briefing-list">`;
        items.forEach((item) => {
            html += `<li class="briefing-item">${formatInlineMarkup(item)}</li>`;
        });
        html += '</ul></section>';
    });
    if (bodyEl) bodyEl.innerHTML = html;

    document.title = isZh ? data.title.zh : data.title.en;
}

function renderInsight(data, lang) {
    const isZh = lang === 'zh';
    const titleEl = document.getElementById('article-title');
    const tagEl = document.getElementById('article-tag');
    const dateEl = document.getElementById('article-date');
    const bodyEl = document.getElementById('article-body');

    if (titleEl) titleEl.textContent = isZh ? data.title.zh : data.title.en;
    if (tagEl) tagEl.textContent = isZh ? data.tag.zh : data.tag.en;
    if (dateEl) dateEl.textContent = isZh ? data.dateLabel.zh : data.dateLabel.en;
    if (bodyEl) {
        bodyEl.innerHTML = isZh ? data.excerpt.zh : data.excerpt.en;
    }
    document.title = isZh ? data.title.zh : data.title.en;
}

function renderArticle() {
    const raw = document.getElementById('article-data')?.textContent;
    if (!raw) return;
    const data = JSON.parse(raw);
    const lang = getCurrentLanguage();
    const type = document.body.getAttribute('data-article-type');

    if (type === 'briefing') {
        renderBriefing(data, lang);
        if (typeof gtag === 'function') {
            gtag('event', 'briefing_read_full', { briefing_slug: data.slug, page_path: window.location.pathname });
        }
    } else {
        renderInsight(data, lang);
        if (typeof gtag === 'function') {
            gtag('event', 'article_view', { article_slug: data.slug, page_path: window.location.pathname });
        }
    }

    const shareEl = document.getElementById('article-share');
    if (shareEl) renderShare(shareEl);

    document.querySelectorAll('.nav-brand').forEach((el) => {
        if (!el.hasAttribute('data-i18n')) el.setAttribute('data-i18n', 'nav.brand');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const dataRaw = document.getElementById('article-data')?.textContent;
    let metaTitle = null;
    if (dataRaw) {
        try {
            const data = JSON.parse(dataRaw);
            metaTitle = { en: data.title?.en, zh: data.title?.zh };
        } catch (_) {}
    }

    initLanguageSwitcher({
        afterSet: (lang) => {
            renderArticle();
            updateVCardForLanguage(lang);
            refreshWhatsNewLanguage(lang);
            if (metaTitle) {
                document.title = lang === 'zh' ? metaTitle.zh : metaTitle.en;
            }
        },
    });

    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initContactModal([
        document.getElementById('article-contact-cta'),
    ].filter(Boolean));
    initWhatsNew();

    renderArticle();
});
