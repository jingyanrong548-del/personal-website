import { hthpRefrigerantsData } from './data/hthpRefrigerants.js';
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

/** Stacked bilingual: primary = UI language, secondary = other language */
function bilingualChemNameCell(row, lang) {
    const en = (row.chemNameEn || '').trim();
    const zh = (row.chemNameZh || '').trim();
    if (!en && !zh) return '';
    if (!en || en === zh) {
        return escapeHtml(zh || en);
    }
    if (!zh) {
        return escapeHtml(en);
    }
    if (lang === 'en') {
        return `<div class="hp-std-bilingual-primary">${escapeHtml(en)}</div><div class="hp-std-bilingual-secondary">${escapeHtml(zh)}</div>`;
    }
    return `<div class="hp-std-bilingual-primary">${escapeHtml(zh)}</div><div class="hp-std-bilingual-secondary">${escapeHtml(en)}</div>`;
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

    const embedded = Boolean(document.getElementById('refrigerant-data-table'));
    const types = [...new Set(hthpRefrigerantsData.map((r) => r.type))];
    types.forEach((type) => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });

    function renderTable(filterType, lang = getCurrentLanguage()) {
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
                    typeTd.className = 'hp-ref-type-cell hp-ref-col-left';
                    typeTd.rowSpan = rowspan;
                    typeTd.textContent = row.type;
                    tr.appendChild(typeTd);
                }

                const refTd = document.createElement('td');
                refTd.className = 'hp-ref-refrigerant-cell hp-ref-col-left';
                const refLabel = row.refrigerantRef || row.dataRef;
                refTd.innerHTML = cellWithRef(row.refrigerant, refLabel);
                tr.appendChild(refTd);

                const nameTd = document.createElement('td');
                nameTd.className = 'hp-ref-chem-name-cell hp-ref-col-left hp-ref-cell--bilingual';
                nameTd.innerHTML = bilingualChemNameCell(row, lang);
                tr.appendChild(nameTd);

                const formulaTd = document.createElement('td');
                formulaTd.className = 'hp-ref-formula-cell hp-ref-col-left';
                formulaTd.textContent = row.formula || '—';
                tr.appendChild(formulaTd);

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
        renderTable(typeFilter.value, getCurrentLanguage());
    });

    if (!embedded) {
        initLanguageSwitcher({
            afterSet: (lang) => {
                updateHpRefMeta(lang);
                renderTable(typeFilter.value, lang);
                refreshWhatsNewLanguage(lang);
            },
        });
        updateHpRefMeta(getCurrentLanguage());
        initNavChipHighlight();
        initSiteLegalDisclaimer();
        initWhatsNew();
    }

    renderTable('all', getCurrentLanguage());
});
