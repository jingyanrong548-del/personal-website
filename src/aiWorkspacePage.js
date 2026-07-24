import { initLanguageSwitcher, getCurrentLanguage, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

function updateWorkspaceMeta(lang) {
    const title = translations[lang]?.['workspace.seo.title'] || 'AI Workspace — Open Thermal AI';
    const desc = translations[lang]?.['workspace.seo.desc'] || '';
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
            updateWorkspaceMeta(lang);
            refreshWhatsNewLanguage(lang);
        },
    });
    updateWorkspaceMeta(getCurrentLanguage());
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
});
