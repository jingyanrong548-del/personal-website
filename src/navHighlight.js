/** Highlight the current-page chip in the top nav (resource subpages). */
export function initNavChipHighlight() {
    const current = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link--chip').forEach((link) => {
        const href = link.getAttribute('href') || '';
        let target = href.replace(/^\.\//, '').split('#')[0];
        if (!target || target === '/') {
            target = 'index.html';
        }
        link.classList.toggle('active', target === current);
        if (link.classList.contains('active')) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}
