import { initLanguageSwitcher, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { initHubDirectoryFromPath } from './hubDirectory.js';
import { initContactModal } from './contactModal.js';

function updateServicesHubMeta(lang) {
    const title =
        translations[lang]?.['services.hub.title'] ||
        (lang === 'zh' ? 'Open Core + 专业服务' : 'Open Core + Professional Services');
    const desc = translations[lang]?.['services.hub.lede']?.replace(/<[^>]+>/g, '') || '';
    const fullTitle = `${title} — Open Thermal AI`;
    document.title = fullTitle;
    document.getElementById('meta-page-title')?.setAttribute('content', fullTitle);
    document.getElementById('meta-og-title')?.setAttribute('content', fullTitle);
    document.getElementById('meta-twitter-title')?.setAttribute('content', fullTitle);
    if (desc) {
        document.getElementById('meta-page-description')?.setAttribute('content', desc);
        document.getElementById('meta-og-description')?.setAttribute('content', desc);
        document.getElementById('meta-twitter-description')?.setAttribute('content', desc);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({
        afterSet: (lang) => {
            updateServicesHubMeta(lang);
            refreshWhatsNewLanguage(lang);
        },
    });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
    initHubDirectoryFromPath();
    initContactModal([document.getElementById('services-hub-cta-btn')].filter(Boolean));
});
