/** Highlight the current-page chip in the top nav (hub + chapter pages). */
export function initNavChipHighlight() {
    const current = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link--chip').forEach((link) => {
        const href = link.getAttribute('href') || '';
        let target = href.replace(/^\.\//, '').replace(/^\.\.\//, '').split('#')[0];
        if (!target || target === '/') {
            target = 'index.html';
        }

        let active = target === current;
        // Prefix match: knowledge chapters, services chapters, tools stubs
        if (!active) {
            if (target === 'knowledge.html' && (current === 'knowledge.html' || current.startsWith('knowledge-') || current === 'hthp-column.html')) {
                active = true;
            } else if (target === 'services.html' && (current === 'services.html' || current.startsWith('services-'))) {
                active = true;
            } else if (
                target === 'heat-pump-standards.html' &&
                (current === 'heat-pump-standards.html' ||
                    current === 'heat-pump-policies.html' ||
                    current === 'useful-links.html')
            ) {
                active = true;
            } else if (
                target === 'articles.html' &&
                (current === 'articles.html' ||
                    window.location.pathname.includes('/briefings/') ||
                    window.location.pathname.includes('/insights/'))
            ) {
                active = true;
            }
        }

        link.classList.toggle('active', active);
        if (active) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}
