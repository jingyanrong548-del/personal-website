import { initLanguageSwitcher, getCurrentLanguage, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.en?.[key] || key;
}

function pick(obj) {
    const lang = getCurrentLanguage();
    if (!obj) return '';
    if (typeof obj === 'string' || typeof obj === 'number') return String(obj);
    return obj[lang] || obj.en || '';
}

function formatTemperature(temp) {
    if (!temp) return '';
    const src = Array.isArray(temp.sourceC) ? temp.sourceC.join('–') : temp.sourceC;
    const sink = Array.isArray(temp.sinkC) ? temp.sinkC.join('–') : temp.sinkC;
    return `Source ${src}°C → Sink ${sink}°C`;
}

function renderEngineering(item) {
    const eng = item.engineering;
    const dl = document.getElementById('case-eng-dl');
    if (!dl || !eng) return;

    const rows = [
        ['cases.detail.industry', t(`cases.filter.${item.industry}`)],
        ['cases.detail.heatSource', pick(eng.heatSource)],
        ['cases.detail.heatSink', pick(eng.heatSink)],
        ['cases.detail.temperature', formatTemperature(eng.temperature)],
        ['cases.detail.capacity', eng.capacityKw != null ? `${eng.capacityKw} kW` : ''],
        ['cases.detail.refrigerant', eng.refrigerant || ''],
        ['cases.detail.technology', pick(eng.technology)],
        ['cases.detail.cop', eng.cop != null ? String(eng.cop) : ''],
        ['cases.detail.challenge', pick(eng.challenge)],
        ['cases.detail.result', pick(eng.result)],
    ];

    dl.innerHTML = rows
        .filter(([, v]) => v)
        .map(([labelKey, value]) => `<div class="case-eng-row"><dt>${t(labelKey)}</dt><dd>${value}</dd></div>`)
        .join('');
}

function applyCaseLanguage() {
    const raw = document.getElementById('case-data')?.textContent;
    if (!raw) return;
    let item;
    try {
        item = JSON.parse(raw);
    } catch {
        return;
    }
    document.querySelectorAll('[data-i18n-case]').forEach((el) => {
        const key = el.getAttribute('data-i18n-case');
        if (key && item[key]) el.textContent = pick(item[key]);
    });
    const ind = document.querySelector('.case-industry');
    if (ind) {
        const industry = ind.getAttribute('data-industry');
        ind.textContent = t(`cases.filter.${industry}`);
    }
    renderEngineering(item);
    const faqMount = document.getElementById('case-faq');
    if (faqMount && Array.isArray(item.faq) && item.faq.length) {
        faqMount.innerHTML = `<h2>FAQ</h2>${item.faq
            .map(
                (f) => `<details class="case-faq-item"><summary>${pick(f.q)}</summary><p>${pick(f.a)}</p></details>`
            )
            .join('')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({
        afterSet: () => {
            refreshWhatsNewLanguage(getCurrentLanguage());
            applyCaseLanguage();
        },
    });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
    applyCaseLanguage();
});
