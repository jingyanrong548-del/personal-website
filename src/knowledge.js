import { initLanguageSwitcher, translations } from './i18n.js';

document.addEventListener('DOMContentLoaded', function () {
    function updateKnowledgeMeta(lang) {
        const title = translations[lang]?.['knowledge.seo.title'];
        const desc = translations[lang]?.['knowledge.seo.desc'];
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

    initLanguageSwitcher({ afterSet: updateKnowledgeMeta });
});

