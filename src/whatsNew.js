import { translations, getCurrentLanguage } from './i18n.js';

const STORAGE_KEY = 'jingyanrong.whatsNew.seen';

let siteUpdatesData = null;
let uiInjected = false;

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

function resolveArticlesUrl() {
    const depth = getPathDepth();
    return depth > 0 ? '../articles.html' : './articles.html';
}

function t(lang, key) {
    return translations[lang]?.[key] ?? translations.en?.[key] ?? '';
}

function isUnread() {
    if (!siteUpdatesData?.version) return false;
    try {
        return localStorage.getItem(STORAGE_KEY) !== siteUpdatesData.version;
    } catch {
        return false;
    }
}

function markSeen() {
    if (!siteUpdatesData?.version) return;
    try {
        localStorage.setItem(STORAGE_KEY, siteUpdatesData.version);
    } catch {
        /* ignore */
    }
    updateUnreadBadge();
}

function updateUnreadBadge() {
    const trigger = document.getElementById('whats-new-trigger');
    if (!trigger) return;
    trigger.classList.toggle('whats-new-trigger--unread', isUnread());
}

function formatDate(dateStr, lang) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function injectWhatsNewUI() {
    if (uiInjected) return;
    uiInjected = true;

    const langSwitcher = document.querySelector('.navbar .language-switcher');
    if (langSwitcher && !document.getElementById('whats-new-trigger')) {
        let actions = langSwitcher.closest('.nav-actions');
        if (!actions) {
            actions = document.createElement('div');
            actions.className = 'nav-actions';
            langSwitcher.parentNode.insertBefore(actions, langSwitcher);
            actions.appendChild(langSwitcher);
        }
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.id = 'whats-new-trigger';
        trigger.className = 'whats-new-trigger';
        trigger.setAttribute('aria-label', t(getCurrentLanguage(), 'whatsNew.title'));
        trigger.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`;
        actions.insertBefore(trigger, langSwitcher);
    }

    if (!document.getElementById('whats-new-modal')) {
        const modal = document.createElement('div');
        modal.id = 'whats-new-modal';
        modal.className = 'whats-new-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'whats-new-title');
        modal.innerHTML = `
            <div class="whats-new-modal-overlay" id="whats-new-modal-overlay"></div>
            <div class="whats-new-modal-content">
                <button type="button" class="whats-new-modal-close" id="whats-new-modal-close" aria-label="${escapeHtml(t(getCurrentLanguage(), 'ui.closeModal'))}">×</button>
                <header class="whats-new-modal-header">
                    <svg class="whats-new-modal-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>
                    <h2 class="whats-new-modal-title" id="whats-new-title"></h2>
                </header>
                <div class="whats-new-modal-body" id="whats-new-list"></div>
                <footer class="whats-new-modal-footer">
                    <a href="${escapeHtml(resolveArticlesUrl())}" class="whats-new-view-all" id="whats-new-view-all"></a>
                    <button type="button" class="whats-new-got-it" id="whats-new-got-it"></button>
                </footer>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function renderWhatsNewList(lang = getCurrentLanguage()) {
    const titleEl = document.getElementById('whats-new-title');
    const listEl = document.getElementById('whats-new-list');
    const gotItBtn = document.getElementById('whats-new-got-it');
    const viewAllLink = document.getElementById('whats-new-view-all');
    const trigger = document.getElementById('whats-new-trigger');
    const closeBtn = document.getElementById('whats-new-modal-close');

    if (!listEl) return;

    const isZh = lang === 'zh';

    if (titleEl) titleEl.textContent = t(lang, 'whatsNew.title');
    if (gotItBtn) gotItBtn.textContent = t(lang, 'whatsNew.gotIt');
    if (viewAllLink) {
        viewAllLink.textContent = t(lang, 'whatsNew.viewAll');
        viewAllLink.href = resolveArticlesUrl();
    }
    if (trigger) trigger.setAttribute('aria-label', t(lang, 'whatsNew.title'));
    if (closeBtn) closeBtn.setAttribute('aria-label', t(lang, 'ui.closeModal'));

    const items = siteUpdatesData?.items || [];
    if (items.length === 0) {
        listEl.innerHTML = `<p class="whats-new-empty">${escapeHtml(t(lang, 'whatsNew.empty'))}</p>`;
        return;
    }

    let html = '<ul class="whats-new-list">';
    items.forEach((item) => {
        const title = isZh ? item.title?.zh : item.title?.en;
        const summary = isZh ? item.summary?.zh : item.summary?.en;
        const categoryKey = `whatsNew.category.${item.category || 'site'}`;
        const categoryLabel = t(lang, categoryKey) || item.category || '';
        const href = resolveSiteUrl(item.url);
        html += `<li class="whats-new-item">
            <div class="whats-new-item-meta">
                <span class="whats-new-category whats-new-category--${escapeHtml(item.category || 'site')}">${escapeHtml(categoryLabel)}</span>
                <time class="whats-new-date" datetime="${escapeHtml(item.date)}">${escapeHtml(formatDate(item.date, lang))}</time>
            </div>
            <a class="whats-new-item-title" href="${escapeHtml(href)}">${escapeHtml(title)}</a>
            ${summary ? `<p class="whats-new-item-summary">${escapeHtml(summary)}</p>` : ''}
        </li>`;
    });
    html += '</ul>';
    listEl.innerHTML = html;
}

function openWhatsNew() {
    const modal = document.getElementById('whats-new-modal');
    if (!modal) return;
    renderWhatsNewList();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const body = modal.querySelector('.whats-new-modal-body');
    if (body) body.scrollTop = 0;
    if (typeof gtag === 'function') {
        gtag('event', 'whats_new_open', { page_path: window.location.pathname });
    }
}

function closeWhatsNew() {
    const modal = document.getElementById('whats-new-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

export function refreshWhatsNewLanguage(lang) {
    if (!uiInjected) return;
    renderWhatsNewList(lang);
}

export async function initWhatsNew() {
    injectWhatsNewUI();

    try {
        const res = await fetch('/site-updates.json');
        if (!res.ok) return;
        siteUpdatesData = await res.json();
    } catch {
        return;
    }

    renderWhatsNewList();
    updateUnreadBadge();

    const trigger = document.getElementById('whats-new-trigger');
    const overlay = document.getElementById('whats-new-modal-overlay');
    const closeBtn = document.getElementById('whats-new-modal-close');
    const gotItBtn = document.getElementById('whats-new-got-it');

    trigger?.addEventListener('click', () => openWhatsNew());
    overlay?.addEventListener('click', closeWhatsNew);
    closeBtn?.addEventListener('click', closeWhatsNew);
    gotItBtn?.addEventListener('click', () => {
        markSeen();
        closeWhatsNew();
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('whats-new-modal');
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeWhatsNew();
        }
    });

    if (isUnread()) {
        setTimeout(() => openWhatsNew(), 400);
    }
}
