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
    week: 18,
    updateDate: '2026-05-03',
    subtitle: '园区节能降碳「施工图」细化；甘宁将空气热能/热泵写入清洁供热路径；欧元市场 R290 认证占比与化工基地巨型热泵并进；F-gas 人员取证细则对接服务合同；Copeland 推动 ThermBooster 北美供应与 Vilter 整合',
    subtitleEn: 'Park retrofit playbooks sharpen; Gansu–Ningxia clean heat paths lift air-energy HPs; EU R290 certification share plus BASF mega-IHP; F-gas personnel certification in service contracts; Copeland scales ThermBooster in NA under Vilter roadmap',
    domestic: [
        '4 月底至 5 月初，中央《关于更高水平更高质量做好节能降碳工作的意见》在地方与园区层面的「施工图」讨论继续走深：焦点落在工业园区「供热、制冷等基础设施共建共享」与「企业间能量交换与梯级利用」如何与存量锅炉替代、分时电价及绿电直连试点衔接；部分招标文件已要求单列热泵子系统边界条件与可核查节能量/降碳量测算附件，推动主机、自控与计量分包在同一技术条款下闭环。',
        '甘肃省《「新源行动」实施方案》等将空气热能、太阳能、地热能等纳入城镇供热制冷清洁替代组合；宁夏回族自治区「十五五」规划纲要提出到 2030 年实现城区和县城清洁供热全覆盖并推广空气源热泵等分户清洁取暖——省级规划与中央表述同向，利好中温余热热泵与空气源调峰耦合、区域能源站与政策性资金拼盘（具体指标与适用范围以政府公报为准）。'
    ],
    domesticEn: [
        'From late April into early May, implementation talk on the Central Committee–State Council Opinion on higher-level energy saving and carbon reduction deepens for parks and local governments: shared heating–cooling infrastructure and inter-firm cascade energy exchange are being tied to boiler replacements, time-of-use tariffs, and green-power direct-supply pilots; some tenders now require explicit heat-pump boundary conditions plus auditable savings/carbon worksheets—pushing OEM, BMS, and metering scopes under one technical envelope.',
        'Gansu’s “New Source Action” plan bundles air thermal, solar, and geothermal options for cleaner urban heating and cooling; Ningxia’s draft 15th Five-Year Plan targets full clean heating in urban built-up areas and counties by 2030 and promotes household air-source heat pumps—provincial plans align with central language and support mid-temperature waste-heat heat pumps paired with air-source peaking, district energy hubs, and blended public funding (verify metrics in official gazettes).'
    ],
    international: [
        '独立机构 Heat Pumps Watch 据 2026 年 4 月 15 日报道，基于欧盟新认证数据的统计显示丙烷（R290）在 2024 年欧洲住宅热泵新增认证中约占 38%；文章将走势置于修订版 F-gas 与 PFAS/HFO 大气降解物（如 TFA）监管预期之下，并提到 Copeland 与 Daikin 计划在 2026 年扩大既有合资、向欧洲户式热泵市场导入 R290 变频摆动转子压缩机——可燃工质整机安规、充注量与安装培训链同步承压。',
        'Innomotics 于 2026 年 4 月 21 日披露，已获 Piller Blowers & Compressors 大额订单，为德国巴斯夫（BASF）路德维希港基地「全球最大级别工业热泵」之一配套交付多台水冷高压电机与中压变频器——凸显化工园区深度脱碳场景中电驱—压缩机—工艺热的长周期耦合，以及对部件交付窗口与谐波/电能质量条款的刚性要求。'
    ],
    internationalEn: [
        'On 15 Apr 2026, Heat Pumps Watch reported that EU certificate data show propane (R290) captured about 38% of new residential heat pump certifications in 2024; the piece links the shift to revised F-gas rules and PFAS/HFO concerns (e.g., atmospheric TFA), and notes Copeland and Daikin plan to expand their joint venture in 2026 to bring R290 inverter swing-rotary compressors to the European residential market—raising the bar for A3 safety, charge limits, and installer training.',
        'On 21 Apr 2026, Innomotics announced a major order from Piller Blowers & Compressors to supply water-cooled HV motors and medium-voltage drives for one of the world’s largest industrial heat pumps at BASF Ludwigshafen—underscoring long-horizon coupling of electrified drives, compressors, and process heat in chemical-site decarbonization, plus tight delivery windows and power-quality clauses.'
    ],
    standards: [
        '欧盟 F-gas 条例（EU）2024/573 要求欧盟委员会不晚于 2026 年 3 月 12 日以授权立法确立对含氟气体设备从事密封、维修、回收等作业人员的培训与认证最低要求；进入第 18 周后，跨国安装维保分包、多国证书互认与现场作业授权边界成为主机厂与服务商的合规盘点项，宜将 IEC 60335-2-40、EN 378 等与欧盟取证条款一并写入技术服务附件及责任矩阵。'
    ],
    standardsEn: [
        'EU F-gas Regulation (EU) 2024/573 sets a 12 Mar 2026 deadline for Commission implementing acts on minimum training and certification requirements for personnel servicing F-gas equipment; from week 18 onward, cross-border maintenance packages are revisiting mutual recognition of certificates and on-site authorizations—map EU attestation rules alongside IEC 60335-2-40 and EN 378 in technical schedules and RACI matrices.'
    ],
    innovation: [
        'Copeland 在 IIAR 2026 相关传播中宣布已将 SPH 的 ThermBooster 高温热泵推向北美市场供应，名义供热容量约 0.4–1.5MW、蒸汽温度可达约 180°C，工质路线覆盖烃类与其他低 GWP；公司计划在未来数季将 SPH 并入 Vilter 品牌线，与现有氨（R717）与二氧化碳（R744）工业热泵形成温度阶梯互补——全球头部压缩机企业正通过并购补齐非氨系中高温蒸汽段产品矩阵，并为现场「先 HFO、后烃类」的渐进切换保留压缩机设计裕度。'
    ],
    innovationEn: [
        'Around IIAR 2026, Copeland announced North American availability of SPH’s ThermBooster high-temperature heat pump, with nominal heating duty about 0.4–1.5MW and steam up to roughly 180°C using hydrocarbons or other low-GWP fluids; SPH is slated to fold into the Vilter brand over the next few quarters alongside existing R717 and R744 industrial lines—top-tier compressor houses are filling the mid–ultra-high temperature steam portfolio via M&A and compressor headroom for staged HFO-to-hydrocarbon transitions.'
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