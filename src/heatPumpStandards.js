import { heatPumpStandardsData } from './data/heatPumpStandards.js';
import { getHpStdEnglishFields } from './data/heatPumpStandardsTranslations.js';
import { getHpStdCategoryLabel, hpStdCategorySearchText } from './heatPumpStandardsCategories.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initLanguageSwitcher, translations, getCurrentLanguage } from './i18n.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function updateHpStdMeta(lang) {
    const title = translations[lang]?.['hpStd.seo.title'];
    const desc = translations[lang]?.['hpStd.seo.desc'];
    if (title) {
        document.title = title;
        document.getElementById('meta-page-title')?.setAttribute('content', title);
        document.getElementById('meta-og-title')?.setAttribute('content', title);
        document.getElementById('meta-twitter-title')?.setAttribute('content', title);
    }
    if (desc) {
        document.getElementById('meta-page-description')?.setAttribute('content', desc);
        document.getElementById('meta-og-description')?.setAttribute('content', desc);
        document.getElementById('meta-twitter-description')?.setAttribute('content', desc);
    }
}

/** Stacked bilingual: primary = UI language, secondary = other language */
function bilingualCell(textZh, textEn, lang) {
    const en = (textEn || '').trim();
    if (!en || en === String(textZh).trim()) {
        return escapeHtml(textZh);
    }
    if (lang === 'en') {
        return `<div class="hp-std-bilingual-primary">${escapeHtml(en)}</div><div class="hp-std-bilingual-secondary">${escapeHtml(textZh)}</div>`;
    }
    return `<div class="hp-std-bilingual-primary">${escapeHtml(textZh)}</div><div class="hp-std-bilingual-secondary">${escapeHtml(en)}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('hpStdSearchInput');
    const categoryFilter = document.getElementById('hpStdCategoryFilter');
    const latestOnlyToggle = document.getElementById('hpStdLatestOnlyToggle');
    const tableBody = document.getElementById('hpStdTableBody');

    if (!searchInput || !categoryFilter || !latestOnlyToggle || !tableBody) {
        return;
    }

    function repopulateCategoryOptions(lang) {
        while (categoryFilter.options.length > 1) {
            categoryFilter.remove(1);
        }
        const categories = [...new Set(heatPumpStandardsData.map((item) => item.category))].sort();
        categories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = getHpStdCategoryLabel(category, lang);
            categoryFilter.appendChild(option);
        });
    }

    function renderTable(data) {
        tableBody.innerHTML = '';
        const lang = getCurrentLanguage();
        const emptyMsg = translations[lang]?.['hpStd.table.empty'] || translations.en?.['hpStd.table.empty'] || 'No matching standards.';

        if (data.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 4;
            cell.className = 'hp-std-table-empty';
            cell.textContent = emptyMsg;
            row.appendChild(cell);
            tableBody.appendChild(row);
            return;
        }

        data.forEach((item) => {
            const row = document.createElement('tr');
            if (item.status === 'latest') {
                row.classList.add('hp-std-row--latest');
            } else if (item.status === 'upcoming') {
                row.classList.add('hp-std-row--upcoming');
            }

            const catEn = getHpStdCategoryLabel(item.category, 'en');
            const catCell = bilingualCell(item.category, catEn, lang);
            const enF = getHpStdEnglishFields(item.stdNumber) || {};
            const titleCell = bilingualCell(item.stdName, enF.stdNameEn, lang);
            const scopeCell = bilingualCell(item.coreContent, enF.coreContentEn, lang);
            const cells = [
                { html: catCell, className: 'hp-std-cell--bilingual' },
                { html: escapeHtml(item.stdNumber), className: 'hp-std-std-number' },
                { html: titleCell, className: 'hp-std-cell--bilingual' },
                { html: scopeCell, className: 'hp-std-cell--bilingual' },
            ];
            cells.forEach(({ html, className }) => {
                const td = document.createElement('td');
                if (className) td.className = className;
                td.innerHTML = html;
                row.appendChild(td);
            });
            tableBody.appendChild(row);
        });
    }

    function filterAndRender() {
        const searchText = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const latestOnly = latestOnlyToggle.checked;
        const lang = getCurrentLanguage();

        let filtered = heatPumpStandardsData;

        if (category !== 'all') {
            filtered = filtered.filter((item) => item.category === category);
        }
        if (latestOnly) {
            filtered = filtered.filter((item) => item.status === 'latest' || item.status === 'upcoming');
        }
        if (searchText) {
            filtered = filtered.filter((item) => {
                const catHay = hpStdCategorySearchText(item.category).toLowerCase();
                const enF = getHpStdEnglishFields(item.stdNumber) || {};
                const enHay = [enF.stdNameEn, enF.coreContentEn].filter(Boolean).join(' ').toLowerCase();
                return (
                    item.stdNumber.toLowerCase().includes(searchText) ||
                    item.stdName.toLowerCase().includes(searchText) ||
                    item.coreContent.toLowerCase().includes(searchText) ||
                    item.category.toLowerCase().includes(searchText) ||
                    catHay.includes(searchText) ||
                    enHay.includes(searchText)
                );
            });
        }

        renderTable(filtered);
    }

    searchInput.addEventListener('input', filterAndRender);
    categoryFilter.addEventListener('change', filterAndRender);
    latestOnlyToggle.addEventListener('change', filterAndRender);

    initSiteLegalDisclaimer();
    initNavChipHighlight();

    initLanguageSwitcher({
        afterSet: (lang) => {
            updateHpStdMeta(lang);
            repopulateCategoryOptions(lang);
            filterAndRender();
            refreshWhatsNewLanguage(lang);
        },
    });
    initWhatsNew();
});
