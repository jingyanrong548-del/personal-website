import { heatPumpStandardsData } from './data/heatPumpStandards.js';
import { initLanguageSwitcher, translations, getCurrentLanguage } from './i18n.js';

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

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('hpStdSearchInput');
    const categoryFilter = document.getElementById('hpStdCategoryFilter');
    const latestOnlyToggle = document.getElementById('hpStdLatestOnlyToggle');
    const tableBody = document.getElementById('hpStdTableBody');

    if (!searchInput || !categoryFilter || !latestOnlyToggle || !tableBody) {
        return;
    }

    function populateCategories() {
        const categories = [...new Set(heatPumpStandardsData.map((item) => item.category))].sort();
        categories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
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

            ['category', 'stdNumber', 'stdName', 'coreContent'].forEach((key) => {
                const td = document.createElement('td');
                if (key === 'stdNumber') {
                    td.className = 'hp-std-std-number';
                }
                td.innerHTML = escapeHtml(item[key]);
                row.appendChild(td);
            });
            tableBody.appendChild(row);
        });
    }

    function filterAndRender() {
        const searchText = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const latestOnly = latestOnlyToggle.checked;

        let filtered = heatPumpStandardsData;

        if (category !== 'all') {
            filtered = filtered.filter((item) => item.category === category);
        }
        if (latestOnly) {
            filtered = filtered.filter((item) => item.status === 'latest' || item.status === 'upcoming');
        }
        if (searchText) {
            filtered = filtered.filter(
                (item) =>
                    item.stdNumber.toLowerCase().includes(searchText) ||
                    item.stdName.toLowerCase().includes(searchText) ||
                    item.coreContent.toLowerCase().includes(searchText) ||
                    item.category.toLowerCase().includes(searchText)
            );
        }

        renderTable(filtered);
    }

    populateCategories();
    renderTable(heatPumpStandardsData);

    searchInput.addEventListener('input', filterAndRender);
    categoryFilter.addEventListener('change', filterAndRender);
    latestOnlyToggle.addEventListener('change', filterAndRender);

    initLanguageSwitcher({
        afterSet: (lang) => {
            updateHpStdMeta(lang);
            filterAndRender();
        },
    });
});
