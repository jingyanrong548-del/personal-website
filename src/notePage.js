import { initLanguageSwitcher } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal } from './contactModal.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({ afterSet: refreshWhatsNewLanguage });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initContactModal();
    initWhatsNew();
});
