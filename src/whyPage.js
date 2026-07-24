import { initLanguageSwitcher, getCurrentLanguage, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

function updateWhyMeta(lang) {
    const title = translations[lang]?.['why.seo.title'] || 'Why Open Thermal AI';
    const desc = translations[lang]?.['why.seo.desc'] || '';
    document.title = title;
    document.getElementById('meta-page-title')?.setAttribute('content', title);
    document.getElementById('meta-og-title')?.setAttribute('content', title);
    document.getElementById('meta-twitter-title')?.setAttribute('content', title);
    if (desc) {
        document.getElementById('meta-page-description')?.setAttribute('content', desc);
        document.getElementById('meta-og-description')?.setAttribute('content', desc);
        document.getElementById('meta-twitter-description')?.setAttribute('content', desc);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({
        afterSet: (lang) => {
            updateWhyMeta(lang);
            refreshWhatsNewLanguage(lang);
        },
    });
    updateWhyMeta(getCurrentLanguage());
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
});
