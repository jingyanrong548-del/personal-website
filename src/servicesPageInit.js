import { initLanguageSwitcher, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { initHubDirectoryFromPath } from './hubDirectory.js';
import { initContactModal } from './contactModal.js';

export function initServicesChapter(prefix) {
    function updateMeta(lang) {
        const title = translations[lang]?.[`${prefix}.seo.title`];
        const desc = translations[lang]?.[`${prefix}.seo.desc`];
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
        // Hide reason cards / checklist rows whose title key is missing
        document.querySelectorAll('[data-svc-reason]').forEach((el) => {
            const key = el.getAttribute('data-svc-reason') + '.title';
            const has = Boolean(translations[lang]?.[key] || translations.en?.[key]);
            el.hidden = !has;
        });
        document.querySelectorAll('.knowledge-select-list [data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            const has = Boolean(translations[lang]?.[key] || translations.en?.[key]);
            el.hidden = !has;
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initLanguageSwitcher({
            afterSet: (lang) => {
                updateMeta(lang);
                refreshWhatsNewLanguage(lang);
            },
        });
        initSiteLegalDisclaimer();
        initNavChipHighlight();
        initWhatsNew();
        initHubDirectoryFromPath();
        initContactModal([document.getElementById('services-contact-cta')].filter(Boolean));
    });
}
