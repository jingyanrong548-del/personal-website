import { hthpRefrigerantsData } from './data/hthpRefrigerants.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initLanguageSwitcher, translations, getCurrentLanguage } from './i18n.js';
import { initNavChipHighlight } from './navHighlight.js';

function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function cellWithRef(value, ref) {
    const v = escapeHtml(value);
    if (!ref) return v;
    return `${v}<sup class="hp-ref-sup">${escapeHtml(ref)}</sup>`;
}

function updateHpRefMeta(lang) {
    const title = translations[lang]?.['hpRef.seo.title'];
    const desc = translations[lang]?.['hpRef.seo.desc'];
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

function groupByType(rows) {
    const groups = [];
    let current = null;
    rows.forEach((row) => {
        if (!current || current.type !== row.type) {
            current = { type: row.type, rows: [] };
            groups.push(current);
        }
        current.rows.push(row);
    });
    return groups;
}

document.addEventListener('DOMContentLoaded', () => {
    const typeFilter = document.getElementById('hpRefTypeFilter');
    const tableBody = document.getElementById('hpRefTableBody');

    if (!typeFilter || !tableBody) {
        return;
    }

    const types = [...new Set(hthpRefrigerantsData.map((r) => r.type))];
    types.forEach((type) => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });

    function renderTable(filterType) {
        tableBody.innerHTML = '';
        const rows =
            filterType === 'all'
                ? hthpRefrigerantsData
                : hthpRefrigerantsData.filter((r) => r.type === filterType);

        groupByType(rows).forEach((group) => {
            const rowspan = group.rows.length;
            group.rows.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.dataset.type = row.type;

                if (index === 0) {
                    const typeTd = document.createElement('td');
                    typeTd.className = 'hp-ref-type-cell';
                    typeTd.rowSpan = rowspan;
                    typeTd.textContent = row.type;
                    tr.appendChild(typeTd);
                }

                const refTd = document.createElement('td');
                refTd.className = 'hp-ref-refrigerant-cell';
                const refLabel = row.refrigerantRef || row.dataRef;
                refTd.innerHTML = cellWithRef(row.refrigerant, refLabel);
                tr.appendChild(refTd);

                const columnDefs = [
                    ['tCr', null, 'hp-ref-col-tcr'],
                    ['pCr', 'pCrRef', null],
                    ['nbp', null, null],
                    ['odp', 'odpRef', null],
                    ['gwp', 'gwpRef', null],
                    ['safety', 'safetyRef', null],
                ];
                columnDefs.forEach(([key, refKey, colClass]) => {
                    const td = document.createElement('td');
                    if (colClass) td.className = colClass;
                    td.innerHTML = cellWithRef(row[key], refKey ? row[refKey] : null);
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        });
    }

    typeFilter.addEventListener('change', () => {
        renderTable(typeFilter.value);
    });

    initLanguageSwitcher((lang) => {
        updateHpRefMeta(lang);
    });
    updateHpRefMeta(getCurrentLanguage());
    initNavChipHighlight();
    initSiteLegalDisclaimer();
    renderTable('all');
});
