import { translations, getCurrentLanguage } from './i18n.js';
import { escapeHtml, formatInlineMarkup } from './formatInlineMarkup.js';

export function displayPortalBriefing(briefingData) {
    const titleElement = document.getElementById('briefing-week-title');
    const subtitleElement = document.getElementById('briefing-subtitle');
    const previewElement = document.getElementById('briefing-preview');
    const timeElement = document.getElementById('briefing-update-time');
    const fullLink = document.getElementById('portal-briefing-full-link');

    if (!titleElement || !previewElement || !briefingData) return;

    const lang = getCurrentLanguage();
    const isZh = lang === 'zh';
    const tPage = translations[lang] || translations.en;
    const tEn = translations.en;

    const weekTemplate = tPage['briefings.weekTitle'] || tEn['briefings.weekTitle'];
    titleElement.textContent = String(weekTemplate)
        .replace('{year}', briefingData.year)
        .replace('{week}', briefingData.week);

    const subtitle = isZh ? (briefingData.subtitle?.zh || '') : (briefingData.subtitle?.en || '');
    if (subtitleElement) {
        if (subtitle) {
            subtitleElement.textContent = subtitle;
            subtitleElement.classList.remove('u-hidden');
        } else {
            subtitleElement.classList.add('u-hidden');
        }
    }

    const highlights = isZh
        ? (briefingData.highlights?.zh || [])
        : (briefingData.highlights?.en || []);

    const highlightsTitle =
        tPage['briefings.highlights.title'] || tEn['briefings.highlights.title'] || '';
    const previewNote =
        tPage['briefings.previewNote'] || tEn['briefings.previewNote'] || '';

    let previewHtml = '';
    if (previewNote) {
        previewHtml += `<p class="briefing-preview-note">${escapeHtml(previewNote)}</p>`;
    }
    if (highlightsTitle) {
        previewHtml += `<p class="briefing-preview-heading">${escapeHtml(highlightsTitle)}</p>`;
    }
    previewHtml += '<ul class="briefing-preview-list briefing-preview-list--highlights">';
    highlights.slice(0, 5).forEach((text) => {
        previewHtml += `<li class="briefing-preview-item briefing-preview-item--highlight">${formatInlineMarkup(text)}</li>`;
    });
    previewHtml += '</ul>';
    previewElement.innerHTML = previewHtml;

    if (timeElement && briefingData.published) {
        const updateDate = new Date(briefingData.published);
        const dateStr = updateDate.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const lastUpdateText = tPage['briefings.lastUpdate'] || tEn['briefings.lastUpdate'] || 'Last updated: ';
        timeElement.textContent = lastUpdateText + dateStr;
    }

    if (fullLink && briefingData.url) {
        fullLink.href = briefingData.url.startsWith('/') ? '.' + briefingData.url : briefingData.url;
    }
}

export async function loadLatestBriefing() {
    try {
        const res = await fetch('/content-index.json');
        if (!res.ok) return null;
        const index = await res.json();
        return index.latestBriefing;
    } catch (_) {
        return null;
    }
}
