/**
 * Bilingual (ZH + EN) legal / AI notices: short visible summary + optional <details> full text.
 * Not switched by UI language — both languages always present.
 */

const DATA_ROOT = 'data-site-disclaimer-root';
const DATA_SLOT = 'data-site-disclaimer-slot';

/** Visible by default — one line per language. */
const SUMMARY_ZH =
    '本站仅供一般参考，不构成法律或任何专业意见；内容可能含人工智能（AI）辅助、按「现状」提供不作担保，重要决策请咨询持证专家并以官方文本为准。不代表雇主或第三方立场。';
const SUMMARY_EN =
    'General reference on a personal site only — not legal or other professional advice. May include AI-assisted material, provided as-is without warranty; consult qualified professionals and official sources for important decisions. Not the views of employers or third parties.';

/** Inside <details> — fuller notice (legacy long-form, consolidated). */
const DETAIL_ZH_1 =
    '本网站内容仅供一般性信息参考、个人学习与行业交流，不构成任何司法辖区下的法律意见、监管解释、税务或证券建议、工程设计签认、产品合格/认证结论或投资建议；亦不代表本人现任或过往雇主、客户及任何政府机构、行业协会或第三方的立场。';
const DETAIL_ZH_2 =
    '部分内容可能由人工智能（AI）辅助起草、摘录、翻译或排版；尽管编者已合理核对，不对准确性、完整性、时效性及对特定场景的适用性作任何明示或默示担保。您因信赖本站信息作出的决策或行动，风险与责任由您自行承担。';
const DETAIL_ZH_3 =
    '本网站由个人维护并公开发布；访问本站不形成律师—客户关系或其他受监管的专业服务关系；不保证站内链接、工具、脚本与第三方服务的持续可用或安全；未经许可不得以商业目的复制或再传播本站实质性内容。若您认为内容涉嫌侵权、错误或可能误导公众，欢迎通过页面联系方式指出，编者将在合理范围内予以核查与更正。';

const DETAIL_EN_1 =
    'Content is for general information, personal learning and industry exchange only. It does not constitute legal advice, regulatory interpretation, tax or securities advice, engineering sign-off, product conformity or certification, or investment advice in any jurisdiction, nor the views of my employers, clients, government bodies, trade associations or any third party.';
const DETAIL_EN_2 =
    'Some content may be drafted, excerpted, translated or laid out with AI assistance; despite reasonable care, no express or implied warranty is given as to accuracy, completeness, currency or fitness for your situation. You bear sole risk for decisions or actions taken in reliance on this site.';
const DETAIL_EN_3 =
    'No attorney–client or other regulated professional relationship is created. Availability or security of links, tools, scripts and third-party services is not guaranteed. Substantial commercial republication is not permitted without permission. If you believe any item is infringing, incorrect or misleading, please contact the editor via the site; reasonable verification and correction will be attempted where appropriate.';

function p(lang, cls, text) {
    const el = document.createElement('p');
    el.setAttribute('lang', lang);
    el.className = cls;
    el.textContent = text;
    return el;
}

/** @returns {HTMLElement} */
export function createBilingualSiteDisclaimerCompact() {
    const aside = document.createElement('aside');
    aside.className = 'site-legal-disclaimer site-legal-disclaimer--footer';
    aside.setAttribute(DATA_ROOT, '');
    aside.setAttribute('role', 'note');
    aside.setAttribute('aria-label', '法律与人工智能说明 / Legal and AI notice');

    const sumWrap = document.createElement('div');
    sumWrap.className = 'site-legal-disclaimer__summary';
    sumWrap.appendChild(p('zh-CN', 'site-legal-disclaimer__zh', SUMMARY_ZH));
    sumWrap.appendChild(p('en', 'site-legal-disclaimer__en', SUMMARY_EN));
    aside.appendChild(sumWrap);

    const details = document.createElement('details');
    details.className = 'site-legal-disclaimer__details';

    const summary = document.createElement('summary');
    summary.className = 'site-legal-disclaimer__summary-trigger';
    summary.textContent = '详细说明（中英） / Full notice (EN & ZH)';
    details.appendChild(summary);

    const expanded = document.createElement('div');
    expanded.className = 'site-legal-disclaimer__expanded';
    expanded.appendChild(p('zh-CN', 'site-legal-disclaimer__zh site-legal-disclaimer__zh--detail', DETAIL_ZH_1));
    expanded.appendChild(p('en', 'site-legal-disclaimer__en site-legal-disclaimer__en--detail', DETAIL_EN_1));
    expanded.appendChild(p('zh-CN', 'site-legal-disclaimer__zh site-legal-disclaimer__zh--detail', DETAIL_ZH_2));
    expanded.appendChild(p('en', 'site-legal-disclaimer__en site-legal-disclaimer__en--detail', DETAIL_EN_2));
    expanded.appendChild(p('zh-CN', 'site-legal-disclaimer__zh site-legal-disclaimer__zh--detail', DETAIL_ZH_3));
    expanded.appendChild(p('en', 'site-legal-disclaimer__en site-legal-disclaimer__en--detail', DETAIL_EN_3));
    details.appendChild(expanded);

    aside.appendChild(details);
    return aside;
}

function hasDisclaimerRoot() {
    return Boolean(document.querySelector(`[${DATA_ROOT}]`));
}

/** Mount unified legal notice into every page's `[data-site-disclaimer-slot]`. */
export function initSiteLegalDisclaimer() {
    if (hasDisclaimerRoot()) return;

    const slots = document.querySelectorAll(`[${DATA_SLOT}]`);
    if (slots.length === 0) return;

    const block = createBilingualSiteDisclaimerCompact();
    slots.forEach((slot) => {
        if (!slot.querySelector(`[${DATA_ROOT}]`)) {
            slot.appendChild(block.cloneNode(true));
        }
    });
}
