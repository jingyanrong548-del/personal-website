import { initLanguageSwitcher } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal } from './contactModal.js';

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initContactModal();
});
