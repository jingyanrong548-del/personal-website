import { translations, getCurrentLanguage } from './i18n.js';

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.en?.[key] || '';
}

export function initHthpDiagramLightbox() {
    const lightbox = document.getElementById('hthp-diagram-lightbox');
    if (!lightbox) return;

    const overlay = lightbox.querySelector('.hthp-diagram-lightbox-overlay');
    const closeBtn = lightbox.querySelector('.hthp-diagram-lightbox-close');
    const titleEl = lightbox.querySelector('.hthp-diagram-lightbox-title');
    const imgEl = lightbox.querySelector('.hthp-diagram-lightbox-img');
    const hintEl = lightbox.querySelector('.hthp-diagram-lightbox-hint');
    let lastFocus = null;

    function syncHint() {
        if (hintEl) {
            hintEl.textContent = t('apps.hthpDiagram.hint');
        }
        if (closeBtn) {
            closeBtn.setAttribute('aria-label', t('apps.hthpDiagram.close'));
        }
    }

    function openLightbox(src, alt) {
        if (!src) return;
        lastFocus = document.activeElement;
        imgEl.src = src;
        imgEl.alt = alt || '';
        titleEl.textContent = alt || '';
        titleEl.hidden = !alt;
        syncHint();
        lightbox.hidden = false;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightbox.setAttribute('aria-hidden', 'true');
        imgEl.removeAttribute('src');
        document.body.style.overflow = '';
        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
    }

    document.querySelectorAll('#apps-hthp-zone .app-diagram-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const img = btn.querySelector('.app-diagram');
            if (!img) return;
            const card = btn.closest('.app-card');
            const title = card?.querySelector('.app-title')?.textContent?.trim();
            openLightbox(img.currentSrc || img.src, title || img.alt || '');
        });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    overlay?.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.hidden) {
            closeLightbox();
        }
    });

    syncHint();
}
