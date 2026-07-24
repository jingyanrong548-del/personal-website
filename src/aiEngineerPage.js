import { inject } from '@vercel/analytics';
import { initLanguageSwitcher, getCurrentLanguage, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal } from './contactModal.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { analyze } from './ai/thermalEngineerClient.js';

inject();

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.en?.[key] || key;
}

function renderOutput(result, locale) {
    const out = document.getElementById('ai-output');
    if (!out) return;

    const risksHtml = (result.risks || [])
        .map(
            (r) =>
                `<li class="ai-risk ai-risk--${r.severity}"><strong>${r.severity}</strong> — ${r.text}</li>`
        )
        .join('');

    const refsHtml = (result.refs || [])
        .map((r) => `<li><a href="${r.url}">${r.type}: ${r.url}</a></li>`)
        .join('');

    const notes = (result.compressor?.notes || []).map((n) => `<li>${n}</li>`).join('');

    out.innerHTML = `
      <p class="ai-disclaimer" role="note">${t('ai.disclaimer')}</p>
      <section class="ai-panel">
        <h3>${t('ai.out.concept')}</h3>
        <p>${result.concept?.summary || ''}</p>
        <p class="ai-meta"><code>${result.concept?.cycle || ''}</code></p>
      </section>
      <section class="ai-panel">
        <h3>${t('ai.out.compressor')}</h3>
        <p><strong>${result.compressor?.type || ''}</strong></p>
        <ul>${notes}</ul>
      </section>
      <section class="ai-panel">
        <h3>${t('ai.out.hx')}</h3>
        <p><strong>Evaporator:</strong> ${result.heatExchangers?.evaporator?.note || ''}</p>
        <p><strong>Condenser:</strong> ${result.heatExchangers?.condenser?.note || ''}</p>
      </section>
      <section class="ai-panel">
        <h3>${t('ai.out.cop')}</h3>
        <p class="ai-cop">${(result.performance?.copBand || []).join(' – ')}
          <span class="ai-meta">(${result.performance?.confidence || ''} ${t('ai.out.confidence')})</span>
        </p>
      </section>
      <section class="ai-panel">
        <h3>${t('ai.out.risks')}</h3>
        <ul>${risksHtml}</ul>
      </section>
      <section class="ai-panel">
        <h3>${t('ai.out.refs')}</h3>
        <ul>${refsHtml}</ul>
      </section>
      <div class="ai-actions">
        <button type="button" class="hero-cta-btn hero-cta-secondary" id="ai-copy-json">${t('ai.copyJson')}</button>
        <button type="button" class="hero-cta-btn hero-cta-secondary" id="ai-export-json">${t('ai.exportJson')}</button>
      </div>
    `;

    out.dataset.json = JSON.stringify(result, null, 2);

    document.getElementById('ai-copy-json')?.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(out.dataset.json || '');
        } catch (_) {}
    });
    document.getElementById('ai-export-json')?.addEventListener('click', () => {
        const blob = new Blob([out.dataset.json || '{}'], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'thermal-engineer-analyze.json';
        a.click();
        URL.revokeObjectURL(a.href);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher({
        afterSet: () => refreshWhatsNewLanguage(getCurrentLanguage()),
    });
    initSiteLegalDisclaimer();
    initNavChipHighlight();
    initContactModal();
    initWhatsNew();

    const form = document.getElementById('ai-engineer-form');
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const payload = {
            sourceTempC: Number(fd.get('sourceTempC')),
            targetTempC: Number(fd.get('targetTempC')),
            heatLoadKw: Number(fd.get('heatLoadKw')),
            refrigerant: String(fd.get('refrigerant') || ''),
            constraints: { maxDischargeC: Number(fd.get('maxDischargeC')) || undefined },
            notes: [String(fd.get('problem') || ''), String(fd.get('notes') || '')].filter(Boolean).join('\n'),
            locale: getCurrentLanguage(),
        };
        const out = document.getElementById('ai-output');
        if (out) out.innerHTML = `<p class="ai-loading">${t('ai.running')}</p>`;
        try {
            const result = await analyze(payload);
            renderOutput(result, payload.locale);
        } catch (err) {
            if (out) out.innerHTML = `<p class="ai-error">${String(err)}</p>`;
        }
    });
});
