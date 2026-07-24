/** Highlight the current-page chip in the top nav (hub + chapter pages). */
export function initNavChipHighlight() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const path = window.location.pathname;

    document.querySelectorAll('.nav-link--chip').forEach((link) => {
        const href = link.getAttribute('href') || '';
        let target = href.replace(/^\.\//, '').replace(/^\.\.\//, '').split('#')[0];
        if (!target || target === '/') {
            target = 'index.html';
        }

        let active = target === current;
        if (!active) {
            if (
                target === 'knowledge.html' &&
                (current === 'knowledge.html' ||
                    current.startsWith('knowledge-') ||
                    current === 'hthp-column.html' ||
                    current === 'articles.html' ||
                    path.includes('/briefings/') ||
                    path.includes('/insights/'))
            ) {
                active = true;
            } else if (target === 'services.html' && (current === 'services.html' || current.startsWith('services-'))) {
                active = true;
            } else if (
                target === 'tools.html' &&
                (current === 'tools.html' ||
                    current === 'heat-pump-standards.html' ||
                    current === 'heat-pump-policies.html' ||
                    current === 'useful-links.html')
            ) {
                active = true;
            } else if (target === 'cases.html' && (current === 'cases.html' || path.includes('/cases/'))) {
                active = true;
            } else if (target === 'ai-engineer.html' && current === 'ai-engineer.html') {
                active = true;
            } else if (target === 'founder.html' && current === 'founder.html') {
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
