import { initLanguageSwitcher, getCurrentLanguage, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { listProjects, createProject, deleteProject } from './ai/projectStore.js';

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.en?.[key] || key;
}

function updateProjectsMeta(lang) {
    const title = translations[lang]?.['projects.seo.title'] || 'Project Space — Open Thermal AI';
    const desc = translations[lang]?.['projects.seo.desc'] || '';
    document.title = title;
    document.getElementById('meta-page-title')?.setAttribute('content', title);
    document.getElementById('meta-og-title')?.setAttribute('content', title);
    document.getElementById('meta-twitter-title')?.setAttribute('content', title);
    if (desc) {
        document.getElementById('meta-page-description')?.setAttribute('content', desc);
        document.getElementById('meta-og-description')?.setAttribute('content', desc);
        document.getElementById('meta-twitter-description')?.setAttribute('content', desc);
    }
}

function renderList() {
    const listEl = document.getElementById('projects-list');
    const emptyEl = document.getElementById('projects-empty');
    if (!listEl || !emptyEl) return;
    const projects = listProjects();
    emptyEl.hidden = projects.length > 0;
    listEl.innerHTML = projects
        .map((p) => {
            const updated = p.updatedAt ? new Date(p.updatedAt).toLocaleString() : '';
            const msgs = Array.isArray(p.messages) ? p.messages.length : 0;
            return `<li class="projects-item">
        <div>
          <h2>${escapeHtml(p.name || t('workspace.context.defaultName'))}</h2>
          <p class="projects-meta">${escapeHtml(updated)} · ${msgs} ${t('projects.messages')}</p>
        </div>
        <div class="projects-item-actions">
          <a class="hero-cta-btn hero-cta-secondary" href="./ai-workspace.html?project=${encodeURIComponent(p.id)}" data-i18n-skip>${t('projects.open')}</a>
          <button type="button" class="projects-delete" data-id="${p.id}">${t('projects.delete')}</button>
        </div>
      </li>`;
        })
        .join('');

    listEl.querySelectorAll('.projects-delete').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (!id) return;
            if (window.confirm(t('projects.deleteConfirm'))) {
                deleteProject(id);
                renderList();
            }
        });
    });
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({
        afterSet: (lang) => {
            updateProjectsMeta(lang);
            refreshWhatsNewLanguage(lang);
            renderList();
        },
    });
    updateProjectsMeta(getCurrentLanguage());
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
    renderList();

    document.getElementById('projects-create')?.addEventListener('click', () => {
        const p = createProject({ name: t('workspace.context.defaultName') });
        location.href = `./ai-workspace.html?project=${encodeURIComponent(p.id)}`;
    });
});
