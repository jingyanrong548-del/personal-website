import { initLanguageSwitcher, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { initHubDirectoryFromPath } from './hubDirectory.js';

function updateKnowledgeValveMeta(lang) {
    const title = translations[lang]?.['knowledgeValve.seo.title'];
    const desc = translations[lang]?.['knowledgeValve.seo.desc'];
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
    initLanguageSwitcher({
        afterSet: (lang) => {
            updateKnowledgeValveMeta(lang);
            refreshWhatsNewLanguage(lang);
        },
    });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
    initHubDirectoryFromPath();
});
