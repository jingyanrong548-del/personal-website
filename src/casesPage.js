import { initLanguageSwitcher, getCurrentLanguage, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { initContactModal } from './contactModal.js';

const INDUSTRIES = [
    'all',
    'food',
    'chemical',
    'pharma',
    'textile',
    'steel',
    'manufacturing',
    'drying',
    'districtHeating',
    'wasteHeat',
];

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.en?.[key] || key;
}

function pick(obj) {
    const lang = getCurrentLanguage();
    if (!obj) return '';
    return obj[lang] || obj.en || '';
}

async function loadCases() {
    const res = await fetch('/cases-index.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('cases-index unavailable');
    const data = await res.json();
    return data.items || [];
}

function renderFilters(active) {
    const el = document.getElementById('cases-filters');
    if (!el) return;
    el.innerHTML = INDUSTRIES.map((id) => {
        const label = id === 'all' ? t('cases.filter.all') : t(`cases.filter.${id}`);
        const cls = id === active ? 'filter-tab active' : 'filter-tab';
        return `<button type="button" class="${cls}" data-filter="${id}">${label}</button>`;
    }).join('');
}

function renderGrid(items, filter) {
    const grid = document.getElementById('cases-grid');
    const empty = document.getElementById('cases-empty');
    if (!grid) return;
    const filtered = filter === 'all' ? items : items.filter((c) => c.industry === filter);
    if (empty) empty.hidden = filtered.length > 0;
    grid.innerHTML = filtered
        .map((c) => {
            const href = c.url?.startsWith('/') ? `.${c.url}` : c.url;
            return `<article class="case-card" data-industry="${c.industry}">
        <p class="case-card-industry">${t(`cases.filter.${c.industry}`)}</p>
        <h2 class="case-card-title"><a href="${href}">${pick(c.title)}</a></h2>
        <p class="case-card-excerpt">${pick(c.excerpt)}</p>
        ${
          c.capacityKw || c.cop || c.refrigerant
            ? `<p class="case-card-meta">${[c.capacityKw != null ? `${c.capacityKw} kW` : '', c.refrigerant || '', c.cop != null ? `COP ${c.cop}` : ''].filter(Boolean).join(' · ')}</p>`
            : ''
        }
      </article>`;
        })
        .join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    let items = [];
    let filter = 'all';

    async function refresh() {
        renderFilters(filter);
        renderGrid(items, filter);
        document.querySelectorAll('#cases-filters .filter-tab').forEach((btn) => {
            btn.addEventListener('click', () => {
                filter = btn.getAttribute('data-filter') || 'all';
                refresh();
            });
        });
    }

    initLanguageSwitcher({
        afterSet: () => {
            refreshWhatsNewLanguage(getCurrentLanguage());
            refresh();
        },
    });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
    initContactModal();

    try {
        items = await loadCases();
    } catch (_) {
        items = [];
    }
    refresh();
});
