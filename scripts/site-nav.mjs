/**
 * Shared site navigation HTML (3 chips + 2 anchors).
 * Used by build-content.mjs and scripts/sync-nav.mjs.
 * Note: Engineering Services chip is deferred until the section is ready to open.
 */

function chipLinks(p) {
  return `<li><a href="${p}articles.html" class="nav-link nav-link--chip" data-i18n="nav.content">Content</a></li>
                                <li><a href="${p}knowledge.html" class="nav-link nav-link--chip" data-i18n="nav.knowledgeHub">Knowledge</a></li>
                                <li><a href="${p}heat-pump-standards.html" class="nav-link nav-link--chip" data-i18n="nav.toolsStandards">Tools &amp; Standards</a></li>`;
}

function anchorLinks(homePrefix) {
  const hp = homePrefix;
  return `<li><a href="${hp}#apps" class="nav-link nav-link--anchor" data-i18n="nav.apps">Toolbox</a></li>
                                <li><a href="${hp}#about" class="nav-link nav-link--anchor" data-i18n="nav.about">About</a></li>`;
}

/**
 * @param {object} opts
 * @param {0|1} [opts.depth=0] 0 = site root pages, 1 = briefings/insights
 * @param {'link'|'text'} [opts.brand='link'] index uses text-only brand
 */
export function siteNav({ depth = 0, brand = 'link' } = {}) {
  const p = depth === 0 ? './' : '../';
  const hp = depth === 0 ? './' : '../';
  const brandEl =
    brand === 'text'
      ? `<div class="nav-brand" data-i18n="nav.brand">Jing Yanrong</div>`
      : `<a class="nav-brand" href="${p}" data-i18n="nav.brand">Jing Yanrong</a>`;

  const menuBlock = `<ul class="nav-menu">
                        <li class="nav-menu__group nav-menu__group--chips">
                            <ul class="nav-menu__sublist">
                                ${chipLinks(p)}
                            </ul>
                        </li>
                        <li class="nav-menu__group nav-menu__group--anchors">
                            <ul class="nav-menu__sublist">
                                ${anchorLinks(hp)}
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
<a class="nav-brand" href="${p}" data-i18n="nav.brand">Jing Yanrong</a>
<a href="${p}articles.html" class="nav-link nav-link--chip" data-i18n="nav.content">Content</a>
<a href="${p}knowledge.html" class="nav-link nav-link--chip" data-i18n="nav.knowledgeHub">Knowledge</a>
<a href="${p}heat-pump-standards.html" class="nav-link nav-link--chip" data-i18n="nav.toolsStandards">Tools &amp; Standards</a>
<div class="language-switcher"><button class="lang-btn" data-lang="zh" type="button">中文</button><button class="lang-btn active" data-lang="en" type="button">EN</button></div>
</div></nav>`;
}
