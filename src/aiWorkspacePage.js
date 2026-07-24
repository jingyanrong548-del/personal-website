import { initLanguageSwitcher, getCurrentLanguage, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { AGENTS } from './ai/agentRegistry.js';
import { chatTurn } from './ai/chatClient.js';
import { createProject, updateProject, getProject } from './ai/projectStore.js';

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.en?.[key] || key;
}

function updateWorkspaceMeta(lang) {
    const title = translations[lang]?.['workspace.seo.title'] || 'AI Engineering Workspace — Open Thermal AI';
    const desc = translations[lang]?.['workspace.seo.desc'] || '';
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

function renderAgentList(activeIds = []) {
    const ul = document.getElementById('workspace-agent-list');
    if (!ul) return;
    ul.innerHTML = AGENTS.map((a) => {
        const active = activeIds.includes(a.id) ? ' is-active' : '';
        return `<li class="workspace-agent-item${active}" data-agent="${a.id}">
      <strong>${t(a.nameKey)}</strong>
      <span>${t(a.roleKey)}</span>
    </li>`;
    }).join('');
}

function readContext() {
    const form = document.getElementById('workspace-context-form');
    if (!form) return {};
    const fd = new FormData(form);
    const num = (k) => {
        const v = fd.get(k);
        if (v === '' || v == null) return undefined;
        const n = Number(v);
        return Number.isFinite(n) ? n : undefined;
    };
    return {
        name: String(fd.get('name') || '').trim(),
        sourceTempC: num('sourceTempC'),
        targetTempC: num('targetTempC'),
        heatLoadKw: num('heatLoadKw'),
        refrigerant: String(fd.get('refrigerant') || '').trim() || undefined,
        compressor: String(fd.get('compressor') || '').trim() || undefined,
        hx: String(fd.get('hx') || '').trim() || undefined,
        copTarget: num('copTarget'),
        budget: String(fd.get('budget') || '').trim() || undefined,
    };
}

function patchContextForm(patch) {
    if (!patch) return;
    const set = (id, v) => {
        const el = document.getElementById(id);
        if (el && v != null && v !== '') el.value = v;
    };
    set('ctx-name', patch.name);
    set('ctx-source', patch.sourceTempC);
    set('ctx-target', patch.targetTempC);
    set('ctx-load', patch.heatLoadKw);
    set('ctx-ref', patch.refrigerant);
    set('ctx-comp', patch.compressor);
    set('ctx-hx', patch.hx);
    set('ctx-cop', patch.copTarget);
    set('ctx-budget', patch.budget);
}

function appendMessage(role, content) {
    const log = document.getElementById('workspace-chat-log');
    if (!log) return;
    const div = document.createElement('div');
    div.className = `workspace-msg workspace-msg--${role}`;
    const label = role === 'user' ? t('workspace.chat.you') : t('workspace.chat.assistant');
    div.innerHTML = `<p class="workspace-msg-role">${label}</p><pre class="workspace-msg-body"></pre>`;
    div.querySelector('.workspace-msg-body').textContent = content;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function renderTools(tools) {
    const wrap = document.getElementById('workspace-tools-used');
    const list = document.getElementById('workspace-tools-list');
    if (!wrap || !list) return;
    if (!tools?.length) {
        wrap.hidden = true;
        return;
    }
    wrap.hidden = false;
    list.innerHTML = tools
        .map((tool) => {
            const label = tool.labelKey ? t(tool.labelKey) : tool.toolId;
            const link = tool.url
                ? ` <a href="${tool.url}" ${tool.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>↗</a>`
                : '';
            return `<li><strong>${label}</strong> <span class="workspace-tool-status">${tool.status}</span>${link}<br><span class="workspace-tool-summary">${tool.summary || ''}</span></li>`;
        })
        .join('');
}

function welcomeMessage() {
    appendMessage('assistant', t('workspace.chat.welcome'));
}

let currentProjectId = null;
/** @type {Array<{ role: string, content: string, at: string }>} */
let sessionMessages = [];

async function runTurn(message) {
    const sendBtn = document.getElementById('workspace-send');
    if (sendBtn) sendBtn.disabled = true;
    appendMessage('user', message);
    sessionMessages.push({ role: 'user', content: message, at: new Date().toISOString() });

    try {
        const result = await chatTurn({
            message,
            context: readContext(),
            locale: getCurrentLanguage(),
        });
        patchContextForm(result.contextPatch);
        renderAgentList(result.agents.map((a) => a.id));
        renderTools(result.tools);
        appendMessage('assistant', result.reply);
        sessionMessages.push({ role: 'assistant', content: result.reply, at: new Date().toISOString() });
    } catch (err) {
        appendMessage('assistant', t('workspace.chat.error'));
        console.error(err);
    } finally {
        if (sendBtn) sendBtn.disabled = false;
    }
}

function saveSessionToProject() {
    const ctx = readContext();
    const name = ctx.name || t('workspace.context.defaultName');
    if (currentProjectId && getProject(currentProjectId)) {
        updateProject(currentProjectId, {
            name,
            context: ctx,
            messages: sessionMessages,
        });
    } else {
        const p = createProject({ name, context: ctx, messages: sessionMessages });
        currentProjectId = p.id;
        patchContextForm({ name: p.name });
    }
    const hint = document.getElementById('workspace-upload-hint');
    // reuse a transient toast via alert-free status on save button
    const btn = document.getElementById('workspace-save-project');
    if (btn) {
        const prev = btn.textContent;
        btn.textContent = t('workspace.chat.saved');
        setTimeout(() => {
            btn.textContent = prev;
        }, 1600);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({
        afterSet: (lang) => {
            updateWorkspaceMeta(lang);
            refreshWhatsNewLanguage(lang);
            renderAgentList(
                [...document.querySelectorAll('.workspace-agent-item.is-active')].map((el) =>
                    el.getAttribute('data-agent')
                )
            );
        },
    });
    updateWorkspaceMeta(getCurrentLanguage());
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initWhatsNew();
    renderAgentList();
    welcomeMessage();

    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const projectId = params.get('project');
    if (projectId) {
        const p = getProject(projectId);
        if (p) {
            currentProjectId = p.id;
            patchContextForm({ name: p.name, ...p.context });
            sessionMessages = Array.isArray(p.messages) ? [...p.messages] : [];
            const log = document.getElementById('workspace-chat-log');
            if (log) log.innerHTML = '';
            sessionMessages.forEach((m) => appendMessage(m.role === 'user' ? 'user' : 'assistant', m.content));
            if (!sessionMessages.length) welcomeMessage();
        }
    }

    const input = document.getElementById('workspace-chat-input');
    if (q && input) {
        input.value = q;
        runTurn(q);
        history.replaceState({}, '', location.pathname);
    }

    document.getElementById('workspace-chat-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = (input?.value || '').trim();
        if (!text) return;
        input.value = '';
        runTurn(text);
    });

    document.getElementById('workspace-save-project')?.addEventListener('click', () => {
        saveSessionToProject();
    });

    document.getElementById('workspace-file-input')?.addEventListener('click', (e) => {
        e.preventDefault();
        const hint = document.getElementById('workspace-upload-hint');
        if (hint) hint.hidden = false;
    });
});
