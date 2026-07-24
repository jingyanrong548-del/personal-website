import { inject } from '@vercel/analytics';
import { initLanguageSwitcher, getCurrentLanguage } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal } from './contactModal.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

inject();

document.addEventListener('DOMContentLoaded', () => {
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        const appVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0';
        versionElement.textContent = `V${appVersion}`;
    }

    initLanguageSwitcher({
        afterSet: () => refreshWhatsNewLanguage(getCurrentLanguage()),
    });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initContactModal([document.getElementById('founder-contact-btn')].filter(Boolean));
    initWhatsNew();

    // Resume toggle (moved from homepage about)
    const RESUME_UNLOCK_KEY = 'resumeUnlocked';
    const RESUME_PASSWORD = '123456!';
    const aboutToggleBtn = document.getElementById('about-toggle-btn');
    const aboutDetails = document.getElementById('about-details');
    const resumePasswordOverlay = document.getElementById('resume-password-overlay');
    const resumePasswordInput = document.getElementById('resume-password-input');
    const resumePasswordConfirm = document.getElementById('resume-password-confirm');
    const resumePasswordCancel = document.getElementById('resume-password-cancel');
    const resumePasswordError = document.getElementById('resume-password-error');

    function expandResumeSection() {
        aboutDetails?.classList.remove('u-hidden');
        aboutToggleBtn?.querySelector('.toggle-text-expand')?.classList.add('u-hidden');
        aboutToggleBtn?.querySelector('.toggle-text-collapse')?.classList.remove('u-hidden');
    }
    function collapseResumeSection() {
        aboutDetails?.classList.add('u-hidden');
        aboutToggleBtn?.querySelector('.toggle-text-expand')?.classList.remove('u-hidden');
        aboutToggleBtn?.querySelector('.toggle-text-collapse')?.classList.add('u-hidden');
    }
    function openResumePasswordModal() {
        if (resumePasswordOverlay) {
            resumePasswordOverlay.classList.remove('u-hidden');
            resumePasswordInput?.focus();
        }
    }
    function closeResumePasswordModal() {
        resumePasswordOverlay?.classList.add('u-hidden');
        if (resumePasswordError) resumePasswordError.textContent = '';
        if (resumePasswordInput) resumePasswordInput.value = '';
    }
    function checkResumePasswordAndExpand() {
        const value = (resumePasswordInput?.value || '').trim();
        if (value === RESUME_PASSWORD) {
            try {
                sessionStorage.setItem(RESUME_UNLOCK_KEY, 'true');
            } catch (_) {}
            closeResumePasswordModal();
            expandResumeSection();
        } else if (resumePasswordError) {
            resumePasswordError.textContent = 'Incorrect password';
        }
    }

    aboutToggleBtn?.addEventListener('click', () => {
        const isExpanded = aboutDetails && !aboutDetails.classList.contains('u-hidden');
        if (isExpanded) {
            collapseResumeSection();
        } else if (sessionStorage.getItem(RESUME_UNLOCK_KEY) === 'true') {
            expandResumeSection();
        } else {
            openResumePasswordModal();
        }
    });
    resumePasswordConfirm?.addEventListener('click', checkResumePasswordAndExpand);
    resumePasswordCancel?.addEventListener('click', closeResumePasswordModal);
    resumePasswordInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkResumePasswordAndExpand();
    });
    resumePasswordOverlay?.addEventListener('click', (e) => {
        if (e.target === resumePasswordOverlay) closeResumePasswordModal();
    });
});
