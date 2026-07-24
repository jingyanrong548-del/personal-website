import { inject } from '@vercel/analytics';
import { translations, initLanguageSwitcher, getCurrentLanguage } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal } from './contactModal.js';
import { initHthpDiagramLightbox } from './hthpDiagramLightbox.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

inject();

function isAppCardInView(card) {
    const invitedGrid = card.closest('#apps-invited-grid');
    if (invitedGrid && invitedGrid.hasAttribute('hidden')) {
        return false;
    }
    return true;
}

function applyAppsFilter(filter) {
    const appsFilterEmptyEl = document.getElementById('apps-filter-empty');
    const cards = document.querySelectorAll('#apps .app-card');
    let visibleDisplayed = 0;
    cards.forEach((card) => {
        const cat = card.getAttribute('data-category') || 'general';
        const match = filter === 'all' || cat === filter;
        card.classList.toggle('app-card--hidden', !match);
        if (match && isAppCardInView(card)) {
            visibleDisplayed++;
        }
    });
    if (appsFilterEmptyEl) {
        const lang = document.documentElement.lang?.startsWith('zh') ? 'zh' : 'en';
        const msg = translations[lang]?.['apps.filter.empty'];
        if (msg) appsFilterEmptyEl.textContent = msg;
        appsFilterEmptyEl.hidden = visibleDisplayed > 0;
    }
}

function refreshAppsFilterFromUI() {
    const tab = document.querySelector('.filter-tab.active');
    const f = tab ? tab.getAttribute('data-filter') || 'all' : 'all';
    applyAppsFilter(f);
}

document.addEventListener('DOMContentLoaded', () => {
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        const appVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0';
        versionElement.textContent = `V${appVersion}`;
    }

    initLanguageSwitcher({
        afterSet: () => {
            refreshWhatsNewLanguage(getCurrentLanguage());
            refreshAppsFilterFromUI();
        },
    });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initContactModal();
    initHthpDiagramLightbox();
    initWhatsNew();

    document.querySelectorAll('.filter-tab').forEach((tab) => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
            this.classList.add('active');
            applyAppsFilter(this.getAttribute('data-filter') || 'all');
        });
    });
    refreshAppsFilterFromUI();

    const INVITED_STORAGE_KEY = 'appsInvitedUnlock';
    const INVITED_PASSWORD = '123456!';
    const gateEl = document.getElementById('apps-invited-gate');
    const gridEl = document.getElementById('apps-invited-grid');
    const passwordInput = document.getElementById('apps-invited-password');
    const unlockBtn = document.getElementById('apps-invited-unlock-btn');
    const errorEl = document.getElementById('apps-invited-error');

    function setInvitedUnlocked(unlocked) {
        if (unlocked) {
            try {
                sessionStorage.setItem(INVITED_STORAGE_KEY, '1');
            } catch (_) {}
            if (gateEl) gateEl.style.display = 'none';
            if (gridEl) {
                gridEl.removeAttribute('hidden');
                gridEl.style.display = '';
            }
        } else {
            try {
                sessionStorage.removeItem(INVITED_STORAGE_KEY);
            } catch (_) {}
            if (gateEl) gateEl.style.display = '';
            if (gridEl) {
                gridEl.setAttribute('hidden', '');
                gridEl.style.display = 'none';
            }
        }
        refreshAppsFilterFromUI();
    }

    if (sessionStorage.getItem(INVITED_STORAGE_KEY) === '1') {
        setInvitedUnlocked(true);
    }

    if (unlockBtn && passwordInput && errorEl) {
        unlockBtn.addEventListener('click', () => {
            const value = (passwordInput.value || '').trim();
            if (value === INVITED_PASSWORD) {
                errorEl.textContent = '';
                setInvitedUnlocked(true);
            } else {
                const lang = document.documentElement.lang?.startsWith('zh') ? 'zh' : 'en';
                errorEl.textContent =
                    translations[lang]?.['apps.invitation.wrongPassword'] || 'Incorrect password';
            }
        });
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') unlockBtn.click();
        });
    }
});
