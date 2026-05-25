import { getCurrentLanguage } from './i18n.js';

export function generateVCardQRCodeURL(lang = getCurrentLanguage()) {
    const baseURL = window.location.origin;
    const vcardURL = lang === 'zh'
        ? `${baseURL}/jingyanrong-zh.vcf`
        : `${baseURL}/jingyanrong-en.vcf`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(vcardURL)}`;
}

export function updateVCardForLanguage(lang) {
    const vcardDownloadBtn = document.getElementById('vcard-download-btn');
    if (vcardDownloadBtn) {
        if (lang === 'zh') {
            vcardDownloadBtn.href = '/jingyanrong-zh.vcf';
            vcardDownloadBtn.download = 'jingyanrong-zh.vcf';
        } else {
            vcardDownloadBtn.href = '/jingyanrong-en.vcf';
            vcardDownloadBtn.download = 'jingyanrong-en.vcf';
        }
    }
    const vcardQRCodeImg = document.getElementById('vcard-qrcode');
    if (vcardQRCodeImg) {
        vcardQRCodeImg.src = '';
        vcardQRCodeImg.src = generateVCardQRCodeURL(lang) + '&t=' + Date.now();
    }
}

export function initContactModal(extraOpenButtons = []) {
    const contactModal = document.getElementById('contact-modal');
    const openContactModalBtn = document.getElementById('open-contact-modal');
    const closeContactModalBtn = document.getElementById('contact-modal-close');
    const contactModalOverlay = document.getElementById('contact-modal-overlay');
    const contactModalTabs = document.querySelectorAll('.contact-modal-tab');
    const contactModalContents = document.querySelectorAll('.contact-modal-tab-content');

    if (!contactModal) return;

    function resetModalToDefault() {
        contactModalTabs.forEach((t) => {
            t.classList.toggle('active', t.getAttribute('data-tab') === 'global');
        });
        contactModalContents.forEach((content) => {
            content.classList.toggle('active', content.getAttribute('data-content') === 'global');
        });
    }

    function openContactModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        resetModalToDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const modalBody = contactModal.querySelector('.contact-modal-body');
        if (modalBody) modalBody.scrollTop = 0;
        if (typeof gtag === 'function') {
            gtag('event', 'contact_modal_open', { page_path: window.location.pathname });
        }
    }

    function closeContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    [openContactModalBtn, ...extraOpenButtons].filter(Boolean).forEach((btn) => {
        btn.addEventListener('click', openContactModal);
    });

    closeContactModalBtn?.addEventListener('click', closeContactModal);
    contactModalOverlay?.addEventListener('click', closeContactModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });

    contactModalTabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');
            contactModalTabs.forEach((t) => t.classList.remove('active'));
            this.classList.add('active');
            contactModalContents.forEach((content) => {
                content.classList.toggle('active', content.getAttribute('data-content') === targetTab);
            });
        });
    });

    updateVCardForLanguage(getCurrentLanguage());
}
