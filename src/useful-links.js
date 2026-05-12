import { initLanguageSwitcher, translations } from './i18n.js';
import { initKnowledgePageDisclaimers } from './siteSectionDisclaimer.js';

function updateUsefulLinksMeta(lang) {
    const title = translations[lang]?.['usefulLinks.seo.title'];
    const desc = translations[lang]?.['usefulLinks.seo.desc'];
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
    initLanguageSwitcher({ afterSet: updateUsefulLinksMeta });
    initKnowledgePageDisclaimers();
});
