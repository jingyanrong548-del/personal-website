/**
 * Shared site navigation — Open Thermal AI (aligned transformation plan).
 * Top nav: AI | Tools | Knowledge | Cases | Services | Founder
 * Insights live under Knowledge → Research Insights (not a top chip).
 */

function chipLinks(p) {
  return `<li><a href="${p}ai-engineer.html" class="nav-link nav-link--chip" data-i18n="nav.aiEngineer">AI Engineer</a></li>
                                <li><a href="${p}tools.html" class="nav-link nav-link--chip" data-i18n="nav.tools">Tools</a></li>
                                <li><a href="${p}knowledge.html" class="nav-link nav-link--chip" data-i18n="nav.knowledgeHub">Knowledge</a></li>
                                <li><a href="${p}cases.html" class="nav-link nav-link--chip" data-i18n="nav.cases">Cases</a></li>
                                <li><a href="${p}services.html" class="nav-link nav-link--chip" data-i18n="nav.services">Services</a></li>
                                <li><a href="${p}founder.html" class="nav-link nav-link--chip" data-i18n="nav.founder">Founder</a></li>`;
}

/**
 * @param {object} opts
 * @param {0|1} [opts.depth=0]
 * @param {'link'|'text'} [opts.brand='link']
 */
export function siteNav({ depth = 0, brand = 'link' } = {}) {
  const p = depth === 0 ? './' : '../';
  const brandEl =
    brand === 'text'
      ? `<div class="nav-brand" data-i18n="nav.brand">Open Thermal AI</div>`
      : `<a class="nav-brand" href="${p}" data-i18n="nav.brand">Open Thermal AI</a>`;

  const menuBlock = `<ul class="nav-menu">
                        <li class="nav-menu__group nav-menu__group--chips">
                            <ul class="nav-menu__sublist">
                                ${chipLinks(p)}
                            </ul>
                        </li>
                    </ul>`;

  return `
    <a class="skip-link" href="#main-content" data-i18n="ui.skipToMain">Skip to main content</a>
    <nav class="navbar">
        <div class="container">
            ${brandEl}
            <details class="nav-mobile-menu">
                <summary class="nav-mobile-menu-toggle" aria-label="Menu">
                    <span data-i18n="nav.menu">Menu</span>
                </summary>
                <div class="nav-right">
                    ${menuBlock}
                </div>
            </details>
            <div class="nav-right nav-right--desktop">
                ${menuBlock}
            </div>
            <div class="language-switcher">
                <button class="lang-btn" data-lang="zh" type="button">中文</button>
                <button class="lang-btn active" data-lang="en" type="button">EN</button>
            </div>
        </div>
    </nav>`;
}

/** Minimal nav for note pages (annex68, conferences). */
export function notePageNav(depth = 1) {
  const p = depth === 0 ? './' : '../';
  return `<a class="skip-link" href="#main-content" data-i18n="ui.skipToMain">Skip to main content</a>
<nav class="navbar"><div class="container">
<a class="nav-brand" href="${p}" data-i18n="nav.brand">Open Thermal AI</a>
<a href="${p}ai-engineer.html" class="nav-link nav-link--chip" data-i18n="nav.aiEngineer">AI Engineer</a>
<a href="${p}tools.html" class="nav-link nav-link--chip" data-i18n="nav.tools">Tools</a>
<a href="${p}knowledge.html" class="nav-link nav-link--chip" data-i18n="nav.knowledgeHub">Knowledge</a>
<a href="${p}cases.html" class="nav-link nav-link--chip" data-i18n="nav.cases">Cases</a>
<a href="${p}services.html" class="nav-link nav-link--chip" data-i18n="nav.services">Services</a>
<a href="${p}founder.html" class="nav-link nav-link--chip" data-i18n="nav.founder">Founder</a>
<div class="language-switcher"><button class="lang-btn" data-lang="zh" type="button">中文</button><button class="lang-btn active" data-lang="en" type="button">EN</button></div>
</div></nav>`;
}
