import { translations, getCurrentLanguage } from './i18n.js';

let searchIndex = null;
let uiInjected = false;
let lastQuery = '';
let activeIndex = -1;

function escapeHtml(s) {
    if (!s) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getPathDepth() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return 0;
    const last = parts[parts.length - 1];
    if (last === 'index.html' || (last.endsWith('.html') && parts.length === 1)) return 0;
    return parts.length - 1;
}

function resolveSiteUrl(url) {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const path = url.startsWith('/') ? url.slice(1) : url;
    const depth = getPathDepth();
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    return prefix + path;
}

function t(lang, key) {
    return translations[lang]?.[key] ?? translations.en?.[key] ?? '';
}

function normalize(str) {
    return String(str || '')
        .toLowerCase()
        .normalize('NFKC')
        .replace(/\s+/g, ' ')
        .trim();
}

function tokenize(query) {
    return normalize(query)
        .split(/[\s,，、;；|/]+/)
        .filter(Boolean);
}

function itemSearchBlob(item, lang) {
    const isZh = lang === 'zh';
    const title = isZh ? item.title?.zh : item.title?.en;
    const summary = isZh ? item.summary?.zh : item.summary?.en;
    const body = isZh ? item.body?.zh : item.body?.en;
    const keywords = isZh ? item.keywords?.zh : item.keywords?.en;
    const kw = Array.isArray(keywords) ? keywords.join(' ') : '';
    // Search both languages so English product names still match in Chinese UI.
    return normalize(
        [
            item.title?.en,
            item.title?.zh,
            item.summary?.en,
            item.summary?.zh,
            item.body?.en,
            item.body?.zh,
            kw,
            Array.isArray(item.keywords?.en) ? item.keywords.en.join(' ') : '',
            Array.isArray(item.keywords?.zh) ? item.keywords.zh.join(' ') : '',
            title,
            summary,
            body,
        ]
            .filter(Boolean)
            .join(' ')
    );
}

function scoreItem(item, terms, lang) {
    if (!terms.length) return 0;
    const isZh = lang === 'zh';
    const title = normalize((isZh ? item.title?.zh : item.title?.en) || '');
    const titleBoth = normalize(`${item.title?.en || ''} ${item.title?.zh || ''}`);
    const summary = normalize(`${item.summary?.en || ''} ${item.summary?.zh || ''}`);
    const keywords = normalize(
        [...(item.keywords?.en || []), ...(item.keywords?.zh || [])].join(' ')
    );
    const blob = itemSearchBlob(item, lang);

    let score = 0;
    for (const term of terms) {
        if (!blob.includes(term)) return 0;
        if (title.includes(term) || titleBoth.includes(term)) score += 40;
        else if (keywords.includes(term)) score += 24;
        else if (summary.includes(term)) score += 16;
        else score += 6;
        if (title.startsWith(term) || titleBoth.startsWith(term)) score += 10;
    }
    return score;
}

function searchItems(query, lang = getCurrentLanguage()) {
    const terms = tokenize(query);
    if (!terms.length || !searchIndex?.items?.length) return [];

    return searchIndex.items
        .map((item) => ({ item, score: scoreItem(item, terms, lang) }))
        .filter((row) => row.score > 0)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            const da = a.item.date || '';
            const db = b.item.date || '';
            if (da !== db) return da < db ? 1 : -1;
            return 0;
        })
        .slice(0, 12)
        .map((row) => row.item);
}

function injectSiteSearchUI() {
    if (uiInjected) return;
    uiInjected = true;

    const langSwitcher = document.querySelector('.navbar .language-switcher');
    if (langSwitcher && !document.getElementById('site-search-trigger')) {
        let actions = langSwitcher.closest('.nav-actions');
        if (!actions) {
            actions = document.createElement('div');
            actions.className = 'nav-actions';
            langSwitcher.parentNode.insertBefore(actions, langSwitcher);
            actions.appendChild(langSwitcher);
        }
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.id = 'site-search-trigger';
        trigger.className = 'site-search-trigger';
        trigger.setAttribute('aria-label', t(getCurrentLanguage(), 'search.title'));
        trigger.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;

        const bell = document.getElementById('whats-new-trigger');
        if (bell) actions.insertBefore(trigger, bell);
        else actions.insertBefore(trigger, langSwitcher);
    }

    if (!document.getElementById('site-search-modal')) {
        const modal = document.createElement('div');
        modal.id = 'site-search-modal';
        modal.className = 'site-search-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'site-search-title');
        modal.innerHTML = `
            <div class="site-search-modal-overlay" id="site-search-modal-overlay"></div>
            <div class="site-search-modal-content">
                <button type="button" class="site-search-modal-close" id="site-search-modal-close" aria-label="${escapeHtml(t(getCurrentLanguage(), 'ui.closeModal'))}">×</button>
                <header class="site-search-modal-header">
                    <svg class="site-search-modal-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <h2 class="site-search-modal-title" id="site-search-title"></h2>
                </header>
                <div class="site-search-input-wrap">
                    <input type="search" id="site-search-input" class="site-search-input" autocomplete="off" spellcheck="false" enterkeyhint="search" />
                    <kbd class="site-search-kbd" id="site-search-kbd">Esc</kbd>
                </div>
                <div class="site-search-modal-body" id="site-search-results" role="listbox"></div>
                <footer class="site-search-modal-footer">
                    <span class="site-search-hint" id="site-search-hint"></span>
                </footer>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function renderSearchChrome(lang = getCurrentLanguage()) {
    const titleEl = document.getElementById('site-search-title');
    const input = document.getElementById('site-search-input');
    const hint = document.getElementById('site-search-hint');
    const trigger = document.getElementById('site-search-trigger');
    const closeBtn = document.getElementById('site-search-modal-close');

    if (titleEl) titleEl.textContent = t(lang, 'search.title');
    if (input) input.placeholder = t(lang, 'search.placeholder');
    if (hint) {
        const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || '') || navigator.userAgent.includes('Mac');
        hint.textContent = t(lang, isMac ? 'search.hintMac' : 'search.hintWin');
    }
    if (trigger) trigger.setAttribute('aria-label', t(lang, 'search.title'));
    if (closeBtn) closeBtn.setAttribute('aria-label', t(lang, 'ui.closeModal'));
}

function renderResults(query, lang = getCurrentLanguage()) {
    const listEl = document.getElementById('site-search-results');
    if (!listEl) return;

    lastQuery = query;
    activeIndex = -1;
    const trimmed = query.trim();

    if (!trimmed) {
        listEl.innerHTML = `<p class="site-search-empty">${escapeHtml(t(lang, 'search.idle'))}</p>`;
        return;
    }

    if (!searchIndex?.items?.length) {
        listEl.innerHTML = `<p class="site-search-empty">${escapeHtml(t(lang, 'search.unavailable'))}</p>`;
        return;
    }

    const results = searchItems(trimmed, lang);
    if (results.length === 0) {
        listEl.innerHTML = `<p class="site-search-empty">${escapeHtml(t(lang, 'search.noResults'))}</p>`;
        return;
    }

    const isZh = lang === 'zh';
    let html = '<ul class="site-search-list">';
    results.forEach((item, idx) => {
        const title = isZh ? item.title?.zh : item.title?.en;
        const summary = isZh ? item.summary?.zh : item.summary?.en;
        const categoryKey = `whatsNew.category.${item.category || 'site'}`;
        const categoryLabel = t(lang, categoryKey) || item.category || '';
        const href = resolveSiteUrl(item.url);
        const external = /^https?:\/\//i.test(item.url || '');
        html += `<li class="site-search-item" role="option" data-index="${idx}">
            <a class="site-search-item-link" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''} data-search-result="${idx}">
                <div class="site-search-item-meta">
                    <span class="whats-new-category whats-new-category--${escapeHtml(item.category || 'site')}">${escapeHtml(categoryLabel)}</span>
                    ${external ? `<span class="site-search-external">${escapeHtml(t(lang, 'search.external'))}</span>` : ''}
                </div>
                <span class="site-search-item-title">${escapeHtml(title)}</span>
                ${summary ? `<span class="site-search-item-summary">${escapeHtml(summary)}</span>` : ''}
            </a>
        </li>`;
    });
    html += '</ul>';
    listEl.innerHTML = html;
}

function setActiveResult(index) {
    const items = document.querySelectorAll('.site-search-item');
    if (!items.length) {
        activeIndex = -1;
        return;
    }
    activeIndex = ((index % items.length) + items.length) % items.length;
    items.forEach((el, i) => {
        el.classList.toggle('site-search-item--active', i === activeIndex);
    });
    items[activeIndex]?.scrollIntoView({ block: 'nearest' });
}

function openActiveResult() {
    if (activeIndex < 0) return;
    const link = document.querySelector(`.site-search-item-link[data-search-result="${activeIndex}"]`);
    if (link) link.click();
}

function openSiteSearch() {
    const modal = document.getElementById('site-search-modal');
    const input = document.getElementById('site-search-input');
    if (!modal) return;
    const whatsNew = document.getElementById('whats-new-modal');
    if (whatsNew?.classList.contains('active')) {
        whatsNew.classList.remove('active');
    }
    renderSearchChrome();
    renderResults(input?.value || lastQuery || '');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        input?.focus();
        input?.select();
    });
    if (typeof gtag === 'function') {
        gtag('event', 'site_search_open', { page_path: window.location.pathname });
    }
}

function closeSiteSearch() {
    const modal = document.getElementById('site-search-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    activeIndex = -1;
}

export function refreshSiteSearchLanguage(lang) {
    if (!uiInjected) return;
    renderSearchChrome(lang);
    const input = document.getElementById('site-search-input');
    const modal = document.getElementById('site-search-modal');
    if (modal?.classList.contains('active')) {
        renderResults(input?.value || lastQuery || '', lang);
    }
}

export async function initSiteSearch() {
    injectSiteSearchUI();
    renderSearchChrome();

    try {
        const res = await fetch('/search-index.json');
        if (res.ok) searchIndex = await res.json();
    } catch {
        searchIndex = null;
    }

    const trigger = document.getElementById('site-search-trigger');
    const overlay = document.getElementById('site-search-modal-overlay');
    const closeBtn = document.getElementById('site-search-modal-close');
    const input = document.getElementById('site-search-input');

    trigger?.addEventListener('click', () => openSiteSearch());
    overlay?.addEventListener('click', closeSiteSearch);
    closeBtn?.addEventListener('click', closeSiteSearch);

    let debounceTimer = null;
    input?.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            renderResults(input.value);
        }, 80);
    });

    input?.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveResult(activeIndex + 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveResult(activeIndex < 0 ? 0 : activeIndex - 1);
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0) {
                e.preventDefault();
                openActiveResult();
            } else {
                const first = document.querySelector('.site-search-item-link');
                if (first) {
                    e.preventDefault();
                    first.click();
                }
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('site-search-modal');
        const isOpen = modal?.classList.contains('active');

        if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            if (isOpen) closeSiteSearch();
            else openSiteSearch();
            return;
        }

        if (e.key === 'Escape' && isOpen) {
            closeSiteSearch();
        }
    });
}
