// Vercel Analytics
import { inject } from '@vercel/analytics';
import { translations, initLanguageSwitcher, getCurrentLanguage } from './i18n.js';

// Initialize Vercel Analytics
inject();

// GitHub version checking removed to eliminate 404 errors (kept disabled)

function isAppCardInView(card) {
    const invitedGrid = card.closest('#apps-invited-grid');
    if (invitedGrid && invitedGrid.hasAttribute('hidden')) {
        return false;
    }
    return true;
}

function applyAppsFilter(filter) {
    const appsFilterEmptyEl = document.getElementById('apps-filter-empty');
    const cards = document.querySelectorAll('#apps .app-card');
    let visibleDisplayed = 0;
    cards.forEach(card => {
        const cat = card.getAttribute('data-category') || 'general';
        const match = filter === 'all' || cat === filter;
        card.classList.toggle('app-card--hidden', !match);
        if (match && isAppCardInView(card)) {
            visibleDisplayed++;
        }
    });
    if (appsFilterEmptyEl) {
        const lang = document.documentElement.lang && document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
        const msg = translations[lang] && translations[lang]['apps.filter.empty'];
        if (msg) {
            appsFilterEmptyEl.textContent = msg;
        }
        appsFilterEmptyEl.hidden = visibleDisplayed > 0;
    }
}

function refreshAppsFilterFromUI() {
    const tab = document.querySelector('.filter-tab.active');
    const f = tab ? (tab.getAttribute('data-filter') || 'all') : 'all';
    applyAppsFilter(f);
}

// Manual Briefings Management
// 手工输入的简报数据
// 
// 更新简报步骤：
// 1. 修改 year（年份）和 week（周数）
// 2. 更新 updateDate（更新日期，格式：YYYY-MM-DD）
// 3. 更新 subtitle 和 subtitleEn（可选，本周副标题/摘要，留空则不显示）
// 4. 在 domestic 和 domesticEn 数组中分别添加或修改"国内动态"的中英文条目
// 5. 在 international 和 internationalEn 数组中分别添加或修改"国外动态"的中英文条目
// 6. 在 standards 和 standardsEn 数组中分别添加或修改"标准动态"的中英文条目
// 7. 在 innovation 和 innovationEn 数组中分别添加或修改"技术创新"的中英文条目
// 8. 在 future 和 futureEn 数组中分别添加或修改「即将来临的重要展会/行业会议」的中英文条目（以名称、时间、地点为主）
//
// 注意：每个数组项是一个字符串，会自动显示为列表项。中英文数组的条目数量应该对应。
const briefingData = {
    year: 2026,
    week: 19,
    updateDate: '2026-05-10',
    subtitle: 'EHPA 通报欧洲十一国一季度热泵销量同比走强；美国 AHRI 三月热泵出货同比约 +9.8%；国内 HCFC-22 多联机淘汰路径征求意见收官；GB/T 10891-2025 施行；IIR 高温热泵技术简报与中意天然工质培训对话同日发酵',
    subtitleEn: 'EHPA Q1 bulletin for 11 countries; AHRI March heat-pump shipments ~+9.8% YoY; China HCFC-22 VRF consultation closes; GB/T 10891-2025 in force; IIR HTHP brief plus Italy–China natural-refrigerant dialogue',
    domestic: [
        '生态环境部《关于禁止生产以一氯二氟甲烷（HCFC-22）为制冷剂的多联式空调（热泵）机组产品的公告（征求意见稿）》征求意见已于 2026 年 4 月 30 日截止；编制说明衔接《中国履行〈关于消耗臭氧层物质的蒙特利尔议定书〉国家方案（2025—2030 年）》提出的工商制冷空调行业自 2027 年 1 月 1 日起禁止生产以 HCFCs 为制冷剂的多联机路径。主机厂与工程商宜跟踪正式公告与标准清单，提前梳理在产机型、售后冷媒与回收处置链条。',
        '国家标准 GB/T 10891-2025《制冷系统及热泵 环境适应性要求》于 2026 年 5 月 1 日起实施，替代 GB/T 10891-1989，由全国冷冻空调设备标准化技术委员会（SAC/TC 238）归口；标准细化温湿度、腐蚀、振动等环境类别及试验方法。整机与关键部件型式试验报告、用户现场运行环境声明与质保条款建议按新版作一致性校核。'
    ],
    domesticEn: [
        'China MEE’s draft announcement to prohibit production of VRF/heat-pump units using HCFC-22 closed its public comment period on 30 Apr 2026; the explanatory note ties to the national Montreal Protocol implementation plan (2025–2030), including a 1 Jan 2027 ban on manufacturing VRF products using HCFCs as refrigerant in the RAC sector. OEMs and contractors should track the final text and standard lists and align production models, service refrigerants, and recovery logistics.',
        'National standard GB/T 10891-2025 “Refrigerating systems and heat pumps—Environmental adaptability requirements” entered into force on 1 May 2026, replacing GB/T 10891-1989 under SAC/TC 238; it refines environmental classes (temperature/humidity, corrosion, vibration, etc.) and test methods. Re-check type-test reports, site environmental declarations, and warranty clauses for consistency with the new revision.'
    ],
    international: [
        '欧洲热泵协会（EHPA）2026 年 5 月 4 日新闻稿：统计口径内的 11 个欧洲国家在 2026 年一季度合计售出约 57.5 万台热泵，较 2025 年同期约 49.4 万台上升约 17%；其中法国、德国、波兰三国住宅热泵销量同比平均约 +25%，奥地利因补贴退坡下滑约 30%。稿中在解释需求驱动时一并提及能源价格与供应担忧等因素，各国分项与因果判断建议以 EHPA 原文及各国官方统计为准。',
        '据 ACHR NEWS 2026 年 3 月 11 日报道转引美国空调供暖与制冷工业协会（AHRI）月度出货数据：2026 年 3 月热泵（不含空调）出货量约 41.99 万台，较 2025 年 3 月约 38.25 万台上升约 9.8%；同期热泵再次高于燃气暖风炉合计销量。文章同时指出经销商与安装商仍在制冷剂切换后库存与培训再平衡过程中，宜结合本地政策与供应链节奏评估短期波动。'
    ],
    internationalEn: [
        'In a 4 May 2026 press release, the European Heat Pump Association (EHPA) reported about 575,000 heat pumps sold in Q1 2026 across 11 European countries in its series, up about 17% from roughly 494,000 in Q1 2025; residential sales in France, Germany, and Poland averaged about +25% year-on-year, while Austria fell about 30% amid weaker subsidies. EHPA also links part of the demand swing to energy-price and supply concerns—verify country splits and causality in the original EHPA text and national statistics.',
        'ACHR NEWS (11 Mar 2026) citing AHRI shipment data: March 2026 heat-pump-only shipments were about 419,917 units, up about 9.8% year-on-year from about 382,470 in March 2025, again outselling combined warm-air gas furnaces. The piece notes distributors and contractors are still normalizing inventories and training after the refrigerant transition—expect regional volatility against policy and supply-chain timing.'
    ],
    standards: [
        '欧盟 F-gas 条例（EU）2024/573 要求欧盟委员会不晚于 2026 年 3 月 12 日以授权立法确立对含氟气体设备从事密封、维修、回收等作业人员的培训与认证最低要求；进入第 19 周后，中英双语作业指导书、可燃气制冷剂附加培训模块与 OEM 现场授权链（MOP）仍是公对公审计与 EPC 合同附件的高频缺口，宜继续与 IEC 60335-2-40、EN 378 及欧盟取证条款在同一责任矩阵中对齐。',
        '国家标准 GB/T 10891-2025 已随 5 月 1 日实施同步进入符合性评价窗口：与 GB/T 9237、产品专用安全标准及即将生效的制冷剂切换机型并列时，建议在出厂检验与现场调试记录中单列「环境类别—实测工况—合格判据」三联表，减少海外项目与内销项目对同一机组引用不同环境假设时的争议。'
    ],
    standardsEn: [
        'EU F-gas (EU) 2024/573 sets a 12 Mar 2026 milestone for Commission implementing acts on minimum training/certification for personnel servicing F-gas equipment; in week 19, bilingual work instructions, add-on training for flammable refrigerants, and OEM method-of-permission chains remain common gaps in audits and EPC schedules—keep these aligned with IEC 60335-2-40, EN 378, and EU attestation clauses in one RACI matrix.',
        'With GB/T 10891-2025 effective 1 May 2026, conformity reviews should treat environmental class, measured operating conditions, and pass/fail criteria explicitly—especially alongside GB/T 9237, product-specific safety standards, and refrigerant-transition model lines—to avoid disputes when export and domestic projects assume different environmental envelopes for the same unit.'
    ],
    innovation: [
        '据国际制冷学会（IIR）及行业媒体报道，IIR 于 2026 年 5 月前后发布《高温热泵》技术简报（Technical Brief），由上海交通大学王如竹教授团队与国际专家共同撰写；内容覆盖压缩式、吸收式及吸收—压缩混合高温热泵路线，并讨论 90–300℃ 商用谱系、储热耦合与电价/碳强度对经济性的影响——关键图表与边界条件请以 IIR Fridoc 发布的 PDF 为准。',
        '据行业媒体 Refindustry 2026 年 5 月 4 日报道，中意机构与企业在罗马举行约三小时的技术与制度交流，议题涵盖天然制冷剂应用、热泵培训体系及中国制冷行业减排路径；意大利制冷技术人员协会（ATF）方面强调天然工质场景下安全能力更新与继续教育的战略意义。此类双边对话为后续认证互认与联合实训课程设计提供线索，具体落地以各自主管部门与行业协会通报为准。'
    ],
    innovationEn: [
        'Industry outlets report that the International Institute of Refrigeration published a Technical Brief on high-temperature heat pumps around early May 2026, led by Prof. Ruzhu Wang (Shanghai Jiao Tong University) with an international author team; it surveys compression, absorption, and hybrid absorption–compression routes, commercial temperature spans up to roughly 300°C, thermal-storage coupling, and economics vs. power prices and grid carbon intensity—verify figures and boundaries in the IIR Fridoc PDF.',
        'Refindustry (4 May 2026) covered a Rome meeting of Italian and Chinese institutions and firms on natural refrigerants, heat-pump training, and China’s RAC decarbonization pathway; Italy’s ATF highlighted upgrading technician competencies for natural-refrigerant systems. Treat outcomes as signals for future mutual recognition and joint curricula until national associations publish formal follow-ups.'
    ],
    future: [
        'ISH Shanghai & CIHE 2026：法兰克福展览仍将档期放在 2026 年秋季、上海新国际博览中心，常与「上海建筑设计博览会」等 IGB 系列展同期；供热空调、热泵两联供与楼宇智控仍是主线，建议行前在 messefrankfurt.com 核对最新日程与展馆分区。',
        'Chillventa 2026：纽伦堡偶数年大展，业界日历多指向约 10 月 13–15 日；除整机与阀件外，天然工质压缩机、工业热泵系统论坛与欧洲服务资质话题通常集中出现，最终以 chillventa.de 公布为准。'
    ],
    futureEn: [
        'ISH Shanghai & CIHE 2026: Messe Frankfurt still targets Autumn 2026 at Shanghai New International Expo Centre, often co-located with IGB shows such as Shanghai Intelligent Building Technology—heating, AC, heat-pump dual-fuel kits, and smart-building stacks remain the main tracks; re-check halls and dates on messefrankfurt.com before travel.',
        'Chillventa 2026, Nuremberg: the biennial flagship is widely penciled for about 13–15 Oct 2026; expect natural-refrigerant compressors, industrial heat pump forums, and EU service-qualification topics alongside components—confirm the program on chillventa.de.'
    ]
};

// Display briefing content
function displayBriefing() {
    const titleElement = document.getElementById('briefing-week-title');
    const subtitleElement = document.getElementById('briefing-subtitle');
    const previewElement = document.getElementById('briefing-preview');
    const contentElement = document.getElementById('briefing-main-content');
    const timeElement = document.getElementById('briefing-update-time');
    
    if (!titleElement || !previewElement || !contentElement || !timeElement) {
        return;
    }

    const lang = getCurrentLanguage();
    const tPage = translations[lang] || translations.en;

    // Update title（zh 若缺键则回退 en，避免 .replace 抛错）
    const weekTemplate = tPage['briefings.weekTitle'] || translations.en['briefings.weekTitle'];
    const weekTitle = String(weekTemplate)
        .replace('{year}', briefingData.year)
        .replace('{week}', briefingData.week);
    titleElement.textContent = weekTitle;

    // Update subtitle (optional)
    if (subtitleElement) {
        const subtitle = getCurrentLanguage() === 'zh' ? (briefingData.subtitle || '') : (briefingData.subtitleEn || '');
        if (subtitle) {
            subtitleElement.textContent = subtitle;
            subtitleElement.classList.remove('u-hidden');
        } else {
            subtitleElement.classList.add('u-hidden');
        }
    }

    // Select content based on current language
    const domesticItems = getCurrentLanguage() === 'zh' ? briefingData.domestic : briefingData.domesticEn;
    const internationalItems = getCurrentLanguage() === 'zh' ? briefingData.international : briefingData.internationalEn;
    const standardsItems = getCurrentLanguage() === 'zh' ? briefingData.standards : briefingData.standardsEn;
    const innovationItems = getCurrentLanguage() === 'zh' ? briefingData.innovation : briefingData.innovationEn;
    const futureItems = getCurrentLanguage() === 'zh' ? briefingData.future : briefingData.futureEn;
    
    // Build full content HTML
    let fullHtml = '';
    
    // Domestic section
    fullHtml += `<div class="briefing-section">
        <h4 class="briefing-section-title" data-i18n="briefings.domestic.title">${tPage['briefings.domestic.title'] || translations.en['briefings.domestic.title']}</h4>
        <ul class="briefing-list">`;
    domesticItems.forEach(item => {
        fullHtml += `<li class="briefing-item">${item}</li>`;
    });
    fullHtml += `</ul></div>`;

    // International section
    fullHtml += `<div class="briefing-section">
        <h4 class="briefing-section-title" data-i18n="briefings.international.title">${tPage['briefings.international.title'] || translations.en['briefings.international.title']}</h4>
        <ul class="briefing-list">`;
    internationalItems.forEach(item => {
        fullHtml += `<li class="briefing-item">${item}</li>`;
    });
    fullHtml += `</ul></div>`;

    // Standards & Innovation: one parent title, two sub-blocks for readability
    const hasStdInv = standardsItems.length > 0 || innovationItems.length > 0;
    if (hasStdInv) {
        fullHtml += `<div class="briefing-section briefing-section--stdinv">
            <h4 class="briefing-section-title" data-i18n="briefings.standardsInnovation.title">${tPage['briefings.standardsInnovation.title'] || translations.en['briefings.standardsInnovation.title']}</h4>`;
        if (standardsItems.length > 0) {
            fullHtml += `<div class="briefing-subsection">
                <h5 class="briefing-subsection-title" data-i18n="briefings.standards.title">${tPage['briefings.standards.title'] || translations.en['briefings.standards.title']}</h5>
                <ul class="briefing-list">`;
            standardsItems.forEach(item => {
                fullHtml += `<li class="briefing-item">${item}</li>`;
            });
            fullHtml += `</ul></div>`;
        }
        if (innovationItems.length > 0) {
            fullHtml += `<div class="briefing-subsection">
                <h5 class="briefing-subsection-title" data-i18n="briefings.innovation.title">${tPage['briefings.innovation.title'] || translations.en['briefings.innovation.title']}</h5>
                <ul class="briefing-list">`;
            innovationItems.forEach(item => {
                fullHtml += `<li class="briefing-item">${item}</li>`;
            });
            fullHtml += `</ul></div>`;
        }
        fullHtml += `</div>`;
    }

    // Future events section
    fullHtml += `<div class="briefing-section">
        <h4 class="briefing-section-title" data-i18n="briefings.future.title">${tPage['briefings.future.title'] || translations.en['briefings.future.title']}</h4>
        <ul class="briefing-list">`;
    futureItems.forEach(item => {
        fullHtml += `<li class="briefing-item">${item}</li>`;
    });
    fullHtml += `</ul></div>`;

    contentElement.innerHTML = fullHtml;

    // Preview: 与全文同口径的完整段落，不做字数截断（避免末尾被「…」裁掉）
    const tBrief = tPage;
    const previewBlocks = [];

    const pushSectionItems = (items, titleKey) => {
        const title = tBrief[titleKey] || translations.en[titleKey];
        items.forEach((text, idx) => {
            const label = items.length > 1 ? `${title}（${idx + 1}/${items.length}）` : title;
            previewBlocks.push({ label, text });
        });
    };

    pushSectionItems(domesticItems, 'briefings.domestic.title');
    pushSectionItems(internationalItems, 'briefings.international.title');
    pushSectionItems(standardsItems, 'briefings.standards.title');
    pushSectionItems(innovationItems, 'briefings.innovation.title');
    pushSectionItems(futureItems, 'briefings.future.title');

    const escapeBriefHtml = (s) => {
        if (!s) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    let previewHtml = '<ul class="briefing-preview-list">';
    previewBlocks.forEach(({ label, text }) => {
        previewHtml += `<li class="briefing-preview-item"><span class="briefing-preview-label">${escapeBriefHtml(label)}</span><span class="briefing-preview-snippet">${escapeBriefHtml(text)}</span></li>`;
    });
    previewHtml += '</ul>';

    previewElement.innerHTML = previewHtml;

    // Format update date
    const updateDate = new Date(briefingData.updateDate);
    const dateStr = updateDate.toLocaleDateString(getCurrentLanguage() === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const lastUpdateText = tPage['briefings.lastUpdate'] || translations.en['briefings.lastUpdate'] || 'Last updated: ';
    timeElement.textContent = lastUpdateText + dateStr;
}

// Initialize briefings
function initializeBriefings() {
    displayBriefing();
}

// Smooth scroll behavior and interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Display version number immediately
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        // @ts-ignore - __APP_VERSION__ is defined by Vite in vite.config.js
        const appVersion = __APP_VERSION__ || '1.0.0';
        versionElement.textContent = `V${appVersion}`;
    }
    
    // Set initial language + bind language switcher
    initLanguageSwitcher({
        afterSet: () => {
            displayBriefing();
            refreshAppsFilterFromUI();
        }
    });
    
    // Version checking from GitHub is disabled to avoid 404 errors
    // Static versions are already defined in translations
    // Uncomment the line below if you want to enable GitHub version checking:
    // updateAppVersions().catch(() => {});
    
    // 保存和恢复滚动位置（用于应用打开/关闭后返回）
    const SCROLL_POSITION_KEY = 'homepage_scroll_position';
    
    // 恢复滚动位置的函数
    function restoreScrollPosition() {
        const savedScrollPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
        if (savedScrollPosition !== null) {
            // 使用 requestAnimationFrame 确保 DOM 完全加载后再滚动
            requestAnimationFrame(() => {
                const scrollTop = parseInt(savedScrollPosition, 10);
                if (!isNaN(scrollTop) && scrollTop >= 0) {
                    window.scrollTo({
                        top: scrollTop,
                        behavior: 'auto' // 使用 'auto' 而不是 'smooth'，避免用户看到滚动动画
                    });
                }
                // 清除已使用的滚动位置
                sessionStorage.removeItem(SCROLL_POSITION_KEY);
            });
        }
    }
    
    // 保存当前滚动位置的函数
    function saveScrollPosition() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
        if (currentScrollPosition > 0) {
            sessionStorage.setItem(SCROLL_POSITION_KEY, currentScrollPosition.toString());
        }
    }
    
    // 页面加载时恢复滚动位置
    restoreScrollPosition();
    
    // 检测是否在PWA模式（standalone模式）
    function isStandaloneMode() {
        // iOS Safari
        if (window.navigator.standalone === true) {
            return true;
        }
        // Android Chrome和其他浏览器
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            return true;
        }
        // 备用检测：检查是否在非浏览器环境中
        if (window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches) {
            return true;
        }
        return false;
    }
    
    // 监听页面可见性变化（当用户从其他标签页返回时）
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // 页面变为可见时，延迟恢复滚动位置，确保页面完全可见
            setTimeout(() => {
                restoreScrollPosition();
            }, 100);
        }
    });
    
    // 监听 pageshow 事件（处理从浏览器缓存恢复页面的情况，包括生产环境）
    window.addEventListener('pageshow', function(event) {
        // event.persisted 为 true 表示页面是从缓存中恢复的
        if (event.persisted) {
            // 从缓存恢复时，延迟恢复滚动位置
            setTimeout(() => {
                restoreScrollPosition();
            }, 50);
        } else {
            // 正常加载时也尝试恢复
            restoreScrollPosition();
        }
    });
    
    // 监听 pagehide 事件，确保在页面隐藏前保存滚动位置
    window.addEventListener('pagehide', function() {
        saveScrollPosition();
    });
    
    // 处理应用链接点击 - 现在应用卡片包含独立的Launch和Source链接
    const appLaunchBtns = document.querySelectorAll('.app-launch-btn');
    const appSourceLinks = document.querySelectorAll('.app-source-link');
    
    // 处理Launch按钮点击
    appLaunchBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('http')) {
                return;
            }
            
            // 检查是否已经在打开
            const openingKey = 'opening_' + btoa(href).substring(0, 10);
            if (sessionStorage.getItem(openingKey) === 'true') {
                e.preventDefault();
                return;
            }
            
            // 设置标志
            sessionStorage.setItem(openingKey, 'true');
            
            // 1秒后清除标志
            setTimeout(() => {
                sessionStorage.removeItem(openingKey);
            }, 1000);
        });
    });
    
    // 处理Source链接点击（GitHub链接）
    appSourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('http')) {
                return;
            }
            
            // GitHub链接直接打开，不需要特殊处理
        });
    });
    
    // Language switcher buttons are handled by initLanguageSwitcher()
    
    // Helper function to calculate scroll offset
    function getScrollOffset() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            return navbar.offsetHeight + 20; // Add 20px extra spacing
        }
        return 100; // Fallback
    }

    // Helper function to scroll to section (centered in viewport)
    function scrollToSection(sectionId) {
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            // Use scrollIntoView with block: 'center' to center the section in viewport
            // This is the most reliable method for centering elements
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            return true;
        }
        return false;
    }

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href') || '';
            if (!targetId.startsWith('#')) {
                // 跨页（如 knowledge.html）或外站链接：不拦截
                return;
            }
            e.preventDefault();
            if (scrollToSection(targetId)) {
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Handle hero CTA button click - 探索我的工具 -> 工程计算工具箱 (#apps)
    const heroCtaBtn = document.querySelector('.hero-cta-btn');
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#apps');
        });
    }

    // Handle hero secondary link click - 阅读工程洞察 -> 工程洞察 (#insights)
    const heroSecondaryLink = document.querySelector('.hero-secondary-link');
    if (heroSecondaryLink) {
        heroSecondaryLink.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#insights');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.app-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active navigation highlighting on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Card hover effects are now handled by CSS for better performance

    // Nav brand click to scroll to top
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Reset active nav state
            navLinks.forEach(link => link.classList.remove('active'));
        });
    }

    // Add active class style for navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: var(--secondary-color);
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

    // Hide partner logos that failed to load
    const partnerLogos = document.querySelectorAll('.partner-logo img');
    partnerLogos.forEach(img => {
        img.addEventListener('error', function() {
            this.parentElement.style.display = 'none';
        });
        
        // Also check if image loaded successfully after a short delay
        const checkImage = new Image();
        checkImage.onerror = () => {
            img.parentElement.style.display = 'none';
        };
        checkImage.onload = () => {
            // Image exists, keep it visible
        };
        checkImage.src = img.src;
    });

    // Contact Modal functionality
    const contactModal = document.getElementById('contact-modal');
    const openContactModalBtn = document.getElementById('open-contact-modal');
    const closeContactModalBtn = document.getElementById('contact-modal-close');
    const contactModalOverlay = document.getElementById('contact-modal-overlay');
    const contactModalTabs = document.querySelectorAll('.contact-modal-tab');
    const contactModalContents = document.querySelectorAll('.contact-modal-tab-content');
    
    // Function to generate vCard QR code URL
    // 改用URL方式指向.vcf文件，而不是直接嵌入vCard内容
    // 这样可以降低二维码密度，提高Android兼容性
    function generateVCardQRCodeURL(lang = getCurrentLanguage()) {
        // 根据语言选择对应的.vcf文件URL
        const baseURL = window.location.origin;
        const vcardURL = lang === 'zh' 
            ? `${baseURL}/jingyanrong-zh.vcf`
            : `${baseURL}/jingyanrong-en.vcf`;
        
        // 使用QR Server API生成二维码，指向.vcf文件URL
        return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(vcardURL)}`;
    }
    
    // Function to update vCard download button and QR code based on language
    function updateVCardForLanguage(lang) {
        // Update download button
        const vcardDownloadBtn = document.getElementById('vcard-download-btn');
        if (vcardDownloadBtn) {
            if (lang === 'zh') {
                vcardDownloadBtn.href = '/jingyanrong-zh.vcf';
                vcardDownloadBtn.download = 'jingyanrong-zh.vcf';
            } else {
                vcardDownloadBtn.href = '/jingyanrong-en.vcf';
                vcardDownloadBtn.download = 'jingyanrong-en.vcf';
            }
        }
        
        // Update QR code - 添加时间戳防止缓存
        const vcardQRCodeImg = document.getElementById('vcard-qrcode');
        if (vcardQRCodeImg) {
            // 先清空 src，强制浏览器重新加载
            vcardQRCodeImg.src = '';
            // 添加时间戳参数防止缓存
            const qrCodeURL = generateVCardQRCodeURL(lang) + '&t=' + Date.now();
            vcardQRCodeImg.src = qrCodeURL;
        }
    }
    
    // Update QR code image source on page load
    updateVCardForLanguage(getCurrentLanguage());
    
    // Function to reset modal to default tab (global)
    function resetModalToDefault() {
        contactModalTabs.forEach(t => {
            if (t.getAttribute('data-tab') === 'global') {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
        contactModalContents.forEach(content => {
            if (content.getAttribute('data-content') === 'global') {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    // Open modal
    if (openContactModalBtn && contactModal) {
        openContactModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            resetModalToDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
            
            // Reset scroll position of modal body to top
            const modalBody = contactModal.querySelector('.contact-modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        });
    }
    
    // Close modal
    function closeContactModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore body scroll
        }
    }
    
    if (closeContactModalBtn) {
        closeContactModalBtn.addEventListener('click', closeContactModal);
    }
    
    if (contactModalOverlay) {
        contactModalOverlay.addEventListener('click', closeContactModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });
    
    // Tab switching
    contactModalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            contactModalTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            contactModalContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-content') === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Handle "Read Analysis" button clicks in Insights section
    const insightReadMoreButtons = document.querySelectorAll('.insight-read-more');
    insightReadMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为，防止跳转到页面顶部
            
            const insightCard = this.closest('.insight-card');
            if (!insightCard) return;
            
            const excerpt = insightCard.querySelector('.insight-excerpt');
            if (!excerpt) return;
            
            // 切换展开/收起状态
            const isExpanded = insightCard.classList.contains('expanded');
            
            if (isExpanded) {
                // 收起
                insightCard.classList.remove('expanded');
                excerpt.style.webkitLineClamp = '8';
                excerpt.style.display = '-webkit-box';
                excerpt.style.overflow = 'hidden';
            } else {
                // 展开
                insightCard.classList.add('expanded');
                excerpt.style.webkitLineClamp = 'none';
                excerpt.style.display = 'block';
                excerpt.style.overflow = 'visible';
            }
        });
    });

    // About section toggle functionality（完整履历需密码 123456!，同会话内解锁后无需重复输入）
    const RESUME_PASSWORD = '123456!';
    const RESUME_UNLOCK_KEY = 'resumeUnlocked';

    const aboutToggleBtn = document.getElementById('about-toggle-btn');
    const aboutDetails = document.getElementById('about-details');
    const toggleTextExpand = aboutToggleBtn?.querySelector('.toggle-text-expand');
    const toggleTextCollapse = aboutToggleBtn?.querySelector('.toggle-text-collapse');
    const resumePasswordOverlay = document.getElementById('resume-password-overlay');
    const resumePasswordInput = document.getElementById('resume-password-input');
    const resumePasswordError = document.getElementById('resume-password-error');
    const resumePasswordConfirm = document.getElementById('resume-password-confirm');
    const resumePasswordCancel = document.getElementById('resume-password-cancel');

    function expandResumeSection() {
        if (!aboutDetails || !aboutToggleBtn) return;
        aboutDetails.classList.remove('u-hidden');
        aboutToggleBtn.classList.add('expanded');
        if (toggleTextExpand) toggleTextExpand.classList.add('u-hidden');
        if (toggleTextCollapse) toggleTextCollapse.classList.remove('u-hidden');
    }

    function collapseResumeSection() {
        if (!aboutDetails || !aboutToggleBtn) return;
        aboutDetails.classList.add('u-hidden');
        aboutToggleBtn.classList.remove('expanded');
        if (toggleTextExpand) toggleTextExpand.classList.remove('u-hidden');
        if (toggleTextCollapse) toggleTextCollapse.classList.add('u-hidden');
    }

    function openResumePasswordModal() {
        if (!resumePasswordOverlay || !resumePasswordInput) return;
        resumePasswordOverlay.setAttribute('aria-hidden', 'false');
        resumePasswordOverlay.classList.add('is-open');
        resumePasswordInput.value = '';
        if (resumePasswordError) resumePasswordError.classList.add('u-hidden');
        resumePasswordInput.focus();
    }

    function closeResumePasswordModal() {
        if (!resumePasswordOverlay) return;
        resumePasswordOverlay.setAttribute('aria-hidden', 'true');
        resumePasswordOverlay.classList.remove('is-open');
    }

    function checkResumePasswordAndExpand() {
        const value = resumePasswordInput?.value?.trim() || '';
        if (value !== RESUME_PASSWORD) {
            if (resumePasswordError) {
                resumePasswordError.classList.remove('u-hidden');
                resumePasswordInput.focus();
            }
            return;
        }
        try { sessionStorage.setItem(RESUME_UNLOCK_KEY, 'true'); } catch (_) {}
        closeResumePasswordModal();
        expandResumeSection();
    }

    if (aboutToggleBtn && aboutDetails) {
        aboutToggleBtn.addEventListener('click', function() {
            const isExpanded = aboutDetails && !aboutDetails.classList.contains('u-hidden');
            if (isExpanded) {
                collapseResumeSection();
            } else {
                const unlocked = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(RESUME_UNLOCK_KEY) === 'true';
                if (unlocked) {
                    expandResumeSection();
                } else {
                    openResumePasswordModal();
                }
            }
        });
    }

    if (resumePasswordConfirm) {
        resumePasswordConfirm.addEventListener('click', checkResumePasswordAndExpand);
    }
    if (resumePasswordCancel) {
        resumePasswordCancel.addEventListener('click', closeResumePasswordModal);
    }
    if (resumePasswordInput) {
        resumePasswordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') checkResumePasswordAndExpand();
        });
    }
    if (resumePasswordOverlay) {
        resumePasswordOverlay.addEventListener('click', function(e) {
            if (e.target === resumePasswordOverlay) closeResumePasswordModal();
        });
    }

    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const f = this.getAttribute('data-filter') || 'all';
            applyAppsFilter(f);
        });
    });
    refreshAppsFilterFromUI();

    // Invitation-only zone: password gate (password: 123456!), persist unlock in session
    const INVITED_STORAGE_KEY = 'appsInvitedUnlock';
    const INVITED_PASSWORD = '123456!';
    const gateEl = document.getElementById('apps-invited-gate');
    const gridEl = document.getElementById('apps-invited-grid');
    const passwordInput = document.getElementById('apps-invited-password');
    const unlockBtn = document.getElementById('apps-invited-unlock-btn');
    const errorEl = document.getElementById('apps-invited-error');

    function setInvitedUnlocked(unlocked) {
        if (unlocked) {
            try { sessionStorage.setItem(INVITED_STORAGE_KEY, '1'); } catch (e) {}
            if (gateEl) gateEl.style.display = 'none';
            if (gridEl) { gridEl.removeAttribute('hidden'); gridEl.style.display = ''; }
        } else {
            try { sessionStorage.removeItem(INVITED_STORAGE_KEY); } catch (e) {}
            if (gateEl) gateEl.style.display = '';
            if (gridEl) { gridEl.setAttribute('hidden', ''); gridEl.style.display = 'none'; }
        }
        refreshAppsFilterFromUI();
    }

    if (sessionStorage.getItem(INVITED_STORAGE_KEY) === '1') {
        setInvitedUnlocked(true);
    }

    if (unlockBtn && passwordInput && errorEl) {
        unlockBtn.addEventListener('click', function() {
            const value = (passwordInput.value || '').trim();
            if (value === INVITED_PASSWORD) {
                errorEl.textContent = '';
                setInvitedUnlocked(true);
            } else {
                const lang = document.documentElement.lang && document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
                const t = translations[lang];
                errorEl.textContent = (t && t['apps.invitation.wrongPassword']) || 'Incorrect password';
            }
        });
        passwordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') unlockBtn.click();
        });
    }

    // Initialize Manual Briefings
    initializeBriefings();

    // Briefing read more/less toggle functionality
    const briefingReadMoreBtn = document.getElementById('briefing-read-more-btn');
    const briefingPreview = document.getElementById('briefing-preview');
    const briefingFull = document.getElementById('briefing-main-content');
    const readMoreText = briefingReadMoreBtn?.querySelector('.read-more-text');
    const readLessText = briefingReadMoreBtn?.querySelector('.read-less-text');
    const readMoreIcon = briefingReadMoreBtn?.querySelector('.read-more-icon');

    if (briefingReadMoreBtn && briefingPreview && briefingFull) {
        briefingReadMoreBtn.addEventListener('click', function() {
            const isExpanded = !briefingFull.classList.contains('u-hidden');
            
            if (isExpanded) {
                // Collapse
                briefingPreview.classList.remove('u-hidden');
                briefingFull.classList.add('u-hidden');
                if (readMoreText) readMoreText.classList.remove('u-hidden');
                if (readLessText) readLessText.classList.add('u-hidden');
                if (readMoreIcon) readMoreIcon.style.transform = 'rotate(0deg)';
                briefingReadMoreBtn.classList.remove('expanded');
            } else {
                // Expand
                briefingPreview.classList.add('u-hidden');
                briefingFull.classList.remove('u-hidden');
                if (readMoreText) readMoreText.classList.add('u-hidden');
                if (readLessText) readLessText.classList.remove('u-hidden');
                if (readMoreIcon) readMoreIcon.style.transform = 'rotate(180deg)';
                briefingReadMoreBtn.classList.add('expanded');
            }
        });
    }

    console.log('Personal homepage loaded successfully!');
});