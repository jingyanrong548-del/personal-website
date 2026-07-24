/**
 * Shared hub directory tree for Content / Knowledge / Tools & Standards.
 * Hub pages: mode=full. Child pages: mode=rail (collapsible).
 */
import { getCurrentLanguage, translations } from './i18n.js';
import { escapeHtml } from './formatInlineMarkup.js';
import {
    CONTENT_NOTES,
    CONTENT_SERIES_META,
    KNOWLEDGE_GROUPS,
    TOOLS_ITEMS,
    SERVICES_GROUPS,
} from './data/hubDirectory.js';

/** @type {{ mount: HTMLElement, hub: string, mode: string }[]} */
const mounts = [];

let contentIndex = null;
let contentIndexPromise = null;
let langBound = false;

function t(key, fallback = '') {
    const lang = getCurrentLanguage();
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || fallback || key;
}

function normalizePath(pathname) {
    if (!pathname || pathname === '/') return '/';
    let p = pathname;
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    // Treat /index.html as /
    if (p.endsWith('/index.html')) p = p.slice(0, -'/index.html'.length) || '/';
    return p;
}

function currentPath() {
    return normalizePath(location.pathname);
}

function currentHash() {
    return location.hash || '';
}

/**
 * @param {string} url
 * @param {{ matchPath?: string, matchHash?: string | null }} [opts]
 */
function isLeafActive(url, opts = {}) {
    let path;
    let hash = '';
    try {
        const u = new URL(url, location.origin);
        path = normalizePath(u.pathname);
        hash = u.hash || '';
    } catch {
        return false;
    }
    const matchPath = opts.matchPath ? normalizePath(opts.matchPath) : path;
    const curPath = currentPath();
    const curHash = currentHash();

    if (matchPath !== curPath) return false;

    // Explicit matchHash: null means ignore hash; string means must match (empty curHash may match default)
    if (Object.prototype.hasOwnProperty.call(opts, 'matchHash')) {
        if (opts.matchHash == null) return true;
        if (!curHash && opts.matchHash === '#standards' && matchPath.includes('heat-pump-standards')) {
            return true; // tools hub defaults to standards
        }
        if (!curHash && opts.matchHash === '#kp-article-co2') return true;
        return curHash === opts.matchHash;
    }

    if (hash) {
        if (!curHash && (hash === '#kp-article-co2' || hash === '#standards')) return true;
        return curHash === hash || curHash.startsWith(hash);
    }
    return true;
}

function detectHub(pathname = location.pathname) {
    const p = normalizePath(pathname);
    if (
        p.endsWith('/articles.html') ||
        p.includes('/briefings/') ||
        p.includes('/insights/')
    ) {
        return 'content';
    }
    if (
        p.endsWith('/knowledge.html') ||
        /\/knowledge-[^/]+\.html$/.test(p) ||
        p.endsWith('/hthp-column.html')
    ) {
        return 'knowledge';
    }
    if (
        p.endsWith('/heat-pump-standards.html') ||
        p.endsWith('/heat-pump-policies.html') ||
        p.endsWith('/useful-links.html')
    ) {
        return 'tools';
    }
    if (p.endsWith('/services.html') || /\/services-[^/]+\.html$/.test(p)) {
        return 'services';
    }
    return null;
}

function isHubPage(pathname = location.pathname) {
    const p = normalizePath(pathname);
    return (
        p.endsWith('/articles.html') ||
        p.endsWith('/knowledge.html') ||
        p.endsWith('/heat-pump-standards.html') ||
        p.endsWith('/services.html')
    );
}

function hubTitleKey(hub) {
    if (hub === 'content') return 'nav.content';
    if (hub === 'knowledge') return 'nav.knowledgeHub';
    if (hub === 'services') return 'nav.services';
    return 'nav.toolsStandards';
}

function ensureContentIndex() {
    if (contentIndex) return Promise.resolve(contentIndex);
    if (contentIndexPromise) return contentIndexPromise;
    contentIndexPromise = fetch('/content-index.json')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
            contentIndex = data;
            return data;
        })
        .catch(() => {
            contentIndex = { items: [] };
            return contentIndex;
        });
    return contentIndexPromise;
}

function leafLinkHtml(leaf, { showDesc = false } = {}) {
    const title = t(leaf.titleKey, leaf.title || '');
    const active = isLeafActive(leaf.url, leaf);
    const desc =
        showDesc && leaf.descKey
            ? `<span class="hub-dir__desc">${escapeHtml(t(leaf.descKey))}</span>`
            : '';
    const cls = active ? 'hub-dir__link hub-dir__link--active' : 'hub-dir__link';
    const aria = active ? ' aria-current="page"' : '';
    return `<li class="hub-dir__leaf">
        <a class="${cls}" href="${escapeHtml(leaf.url)}"${aria}>
            <span class="hub-dir__name">${escapeHtml(title)}</span>
            ${desc}
        </a>
    </li>`;
}

function buildContentTree({ showDesc = false } = {}) {
    const lang = getCurrentLanguage();
    const items = contentIndex?.items || [];
    const briefings = items
        .filter((i) => i.type === 'briefing')
        .sort((a, b) => (a.published < b.published ? 1 : -1))
        .map((i) => ({
            id: i.id,
            title: lang === 'zh' ? i.title.zh : i.title.en,
            titleKey: '',
            url: i.url,
        }));
    const insights = items
        .filter((i) => i.type === 'insight')
        .sort((a, b) => (a.published < b.published ? 1 : -1))
        .map((i) => ({
            id: i.id,
            title: lang === 'zh' ? i.title.zh : i.title.en,
            titleKey: '',
            url: i.url,
        }));

    const seriesMap = {
        briefing: briefings,
        insight: insights,
        notes: CONTENT_NOTES,
    };

    return CONTENT_SERIES_META.map((series) => {
        const children = seriesMap[series.type] || [];
        const leaves = children
            .map((leaf) => {
                if (leaf.titleKey) return leafLinkHtml(leaf, { showDesc: false });
                const active = isLeafActive(leaf.url);
                const cls = active ? 'hub-dir__link hub-dir__link--active' : 'hub-dir__link';
                const aria = active ? ' aria-current="page"' : '';
                return `<li class="hub-dir__leaf">
                    <a class="${cls}" href="${escapeHtml(leaf.url)}"${aria}>
                        <span class="hub-dir__name">${escapeHtml(leaf.title)}</span>
                    </a>
                </li>`;
            })
            .join('');
        return `<li class="hub-dir__group">
            <span class="hub-dir__group-title">${escapeHtml(t(series.titleKey))}</span>
            <ul class="hub-dir__leaves">${leaves || `<li class="hub-dir__empty">${escapeHtml(t('hubDir.empty', '—'))}</li>`}</ul>
        </li>`;
    }).join('');
}

function buildKnowledgeTree({ showDesc = false } = {}) {
    return KNOWLEDGE_GROUPS.map((group) => {
        const leaves = group.children.map((leaf) => leafLinkHtml(leaf, { showDesc })).join('');
        return `<li class="hub-dir__group">
            <span class="hub-dir__group-title">${escapeHtml(t(group.titleKey))}</span>
            <ul class="hub-dir__leaves">${leaves}</ul>
        </li>`;
    }).join('');
}

function buildServicesTree({ showDesc = false } = {}) {
    return SERVICES_GROUPS.map((group) => {
        const leaves = group.children.map((leaf) => leafLinkHtml(leaf, { showDesc })).join('');
        return `<li class="hub-dir__group">
            <span class="hub-dir__group-title">${escapeHtml(t(group.titleKey))}</span>
            <ul class="hub-dir__leaves">${leaves}</ul>
        </li>`;
    }).join('');
}

function buildToolsTree() {
    return TOOLS_ITEMS.map((leaf) => leafLinkHtml(leaf, { showDesc: false })).join('');
}

function railShouldOpen() {
    return typeof window.matchMedia === 'function' && window.matchMedia('(min-width: 768px)').matches;
}

function bindFilter(root) {
    const input = root.querySelector('.hub-dir__filter');
    if (!input) return;
    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        root.querySelectorAll('.hub-dir__leaf').forEach((li) => {
            const text = (li.textContent || '').toLowerCase();
            li.hidden = q !== '' && !text.includes(q);
        });
        root.querySelectorAll('.hub-dir__group').forEach((group) => {
            const visible = [...group.querySelectorAll('.hub-dir__leaf')].some((li) => !li.hidden);
            group.hidden = q !== '' && !visible;
        });
    });
}

function bindLangRefresh() {
    if (langBound) return;
    langBound = true;
    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            queueMicrotask(() => refreshHubDirectoryLanguage());
        });
    });
    window.addEventListener('hashchange', () => refreshHubDirectoryLanguage());
}

/**
 * @param {{ hub: string, mode?: 'full'|'rail', mount: HTMLElement, showDesc?: boolean }} opts
 */
export async function initHubDirectory(opts) {
    const { hub, mount, mode = 'full' } = opts;
    if (!mount || !hub) return;

    const existing = mounts.find((m) => m.mount === mount);
    if (!existing) mounts.push({ mount, hub, mode });
    else {
        existing.hub = hub;
        existing.mode = mode;
    }

    if (hub === 'content') await ensureContentIndex();
    renderMount(mount, hub, mode);
    bindLangRefresh();
}

function renderMount(mount, hub, mode) {
    const showDesc = mode === 'full' && (hub === 'knowledge' || hub === 'services');
    const showFilter = mode === 'full' && hub === 'knowledge';
    let treeInner = '';
    if (hub === 'content') treeInner = buildContentTree({ showDesc: false });
    else if (hub === 'knowledge') treeInner = buildKnowledgeTree({ showDesc });
    else if (hub === 'services') treeInner = buildServicesTree({ showDesc });
    else treeInner = `<ul class="hub-dir__leaves hub-dir__leaves--flat">${buildToolsTree()}</ul>`;

    const tree =
        hub === 'tools'
            ? treeInner
            : `<ul class="hub-dir__tree">${treeInner}</ul>`;

    const filterHtml = showFilter
        ? `<label class="hub-dir__filter-wrap">
            <span class="u-visually-hidden">${escapeHtml(t('hubDir.filterPlaceholder', 'Filter…'))}</span>
            <input type="search" class="hub-dir__filter" autocomplete="off" placeholder="${escapeHtml(t('hubDir.filterPlaceholder', 'Filter…'))}">
           </label>`
        : '';

    const title = escapeHtml(t(hubTitleKey(hub)));

    if (mode === 'rail') {
        const openAttr = railShouldOpen() ? ' open' : '';
        mount.innerHTML = `
<details class="hub-dir hub-dir--rail"${openAttr}>
  <summary class="hub-dir__summary">${escapeHtml(t('hubDir.railSummary', 'Section directory'))}</summary>
  <div class="hub-dir__body">
    <p class="hub-dir__hub-label">${title}</p>
    ${filterHtml}
    ${tree}
  </div>
</details>`;
    } else {
        mount.innerHTML = `
<nav class="hub-dir hub-dir--full" aria-label="${title}">
  <h2 class="hub-dir__title">${escapeHtml(t('hubDir.title', 'Directory'))}</h2>
  ${filterHtml}
  ${tree}
</nav>`;
    }

    bindFilter(mount);
}

export function refreshHubDirectoryLanguage() {
    mounts.forEach(({ mount, hub, mode }) => {
        if (hub === 'content' && !contentIndex) {
            ensureContentIndex().then(() => renderMount(mount, hub, mode));
        } else {
            renderMount(mount, hub, mode);
        }
    });
}

/**
 * Auto-detect hub from path; use [data-hub-directory] or inject a rail after navbar.
 */
export function initHubDirectoryFromPath() {
    const hub = detectHub();
    if (!hub) return Promise.resolve(null);

    let mount = document.querySelector('[data-hub-directory]');
    let mode = mount?.getAttribute('data-hub-mode') || (isHubPage() ? 'full' : 'rail');

    if (!mount) {
        if (isHubPage()) return Promise.resolve(null);
        mount = document.createElement('div');
        mount.setAttribute('data-hub-directory', hub);
        mount.setAttribute('data-hub-mode', 'rail');
        mount.className = 'hub-dir-mount hub-dir-mount--injected';
        const nav = document.querySelector('nav.navbar');
        if (nav) nav.insertAdjacentElement('afterend', mount);
        else document.body.insertAdjacentElement('afterbegin', mount);
        mode = 'rail';
    } else {
        const attrHub = mount.getAttribute('data-hub-directory');
        if (attrHub && attrHub !== hub) {
            // Prefer explicit attribute on hub pages
        }
        const useHub = attrHub || hub;
        return initHubDirectory({ hub: useHub, mode, mount });
    }

    return initHubDirectory({ hub, mode, mount });
}

export { detectHub, isHubPage };
