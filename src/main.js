// Vercel Analytics
import { inject } from '@vercel/analytics';
import { translations, initLanguageSwitcher, getCurrentLanguage } from './i18n.js';
import { initHomepageDisclaimerFooter } from './siteSectionDisclaimer.js';

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
// 3. 更新 subtitle / subtitleEn（可选，本周副标题，留空则不显示）
// 4. 更新 highlights.zh / highlights.en（3–5 条要点，仅用于预览区）
// 5. 在 sections 各板块的 items.zh / items.en 中维护正文（每板块建议 1–3 条）
//    板块 id：policy | market | standards | technology | calendar
//
// 注意：中英文条目数量宜对应；数据请标注公开来源并以原文为准。
const briefingData = {
    year: 2026,
    week: 20,
    updateDate: '2026-05-17',
    subtitle: '国内 5 月空调排产承压、铜价抬升成本；IEA《全球能源回顾 2026》披露 2025 年全球热泵销量区域分化；SKILLSAFE EU 推进 R290 安全实训与 Real Alternatives 平台合作；第 15 届 IEA 热泵大会 5 月 26 日维也纳开幕',
    subtitleEn: 'China May AC production under pressure; IEA Global Energy Review 2026 regional heat-pump splits; SKILLSAFE EU × Real Alternatives on R290 training; 15th IEA Heat Pump Conference opens Vienna 26 May',
    highlights: {
        zh: [
            '5 月家用空调总排产约 -11.7%、内销约 -8.6%，铜价同比约 +18.6% 挤压成本',
            'IEA：2025 年全球热泵销量约 -2%，欧洲 +11%、美国约 -13%、中国大致持平',
            'HCFC-22 多联机禁产路径进入执行准备，衔接 2027-01-01 节点',
            'SKILLSAFE EU 与 Real Alternatives 合作推进 R290 热泵安全实训',
            '第 15 届 IEA 热泵大会 5 月 26–29 日维也纳开幕'
        ],
        en: [
            'May 2026 residential AC production ~-11.7% YoY; domestic schedule ~-8.6%; copper ~+18.6% YoY',
            'IEA: 2025 global heat-pump sales ~-2%; Europe +11%; US ~-13%; China broadly flat',
            'HCFC-22 VRF ban path: execution prep toward 1 Jan 2027 manufacturing cutoff',
            'SKILLSAFE EU × Real Alternatives advancing R290 heat-pump safety training',
            '15th IEA Heat Pump Conference, Vienna, 26–29 May 2026'
        ]
    },
    sections: [
        {
            id: 'policy',
            items: {
                zh: [
                    '生态环境部《关于禁止生产以一氯二氟甲烷（HCFC-22）为制冷剂的多联式空调（热泵）机组产品的公告（征求意见稿）》已于 2026 年 4 月 30 日完成征求意见；进入第 20 周，主机厂与工程商宜按《中国履行〈关于消耗臭氧层物质的蒙特利尔议定书〉国家方案（2025—2030 年）》提出的 2027 年 1 月 1 日起禁止生产以 HCFCs 为制冷剂的多联机路径，梳理在产机型清单、售后充注冷媒、回收处置与存量改造方案，并跟踪正式公告发布——行业替代技术已成熟，HCFC-22 在多联机中的用量占比已极低。',
                    '欧盟 F-gas 条例（EU）2024/573 配套培训取证体系持续落地：Commission Implementing Regulation (EU) 2025/1893（2025 年 9 月 17 日发布）确立含氟气体移动设备等场景下从业人员培训证明的最低要求与互认条件；Commission Implementing Regulation (EU) 2025/1907 规范成员国培训计划通报格式。宜将上述要求与 A2L/R290 附加培训、OEM 现场授权链（MOP）及 IEC 60335-2-40、EN 378 纳入同一 RACI 矩阵，减少 EPC 与审计缺口。'
                ],
                en: [
                    'China MEE’s draft ban on manufacturing VRF/heat-pump units using HCFC-22 closed public comment on 30 Apr 2026. In week 20, OEMs and contractors should prepare for the national Montreal Protocol plan path banning HCFC-based VRF production from 1 Jan 2027: align active model lists, service refrigerants, recovery logistics, and retrofit options, and watch for the final announcement—industry alternatives are already mature with negligible HCFC-22 share in VRF.',
                    'EU F-gas (EU) 2024/573 training attestation continues to roll out: Implementing Regulation (EU) 2025/1893 (17 Sep 2025) sets minimum training-proof requirements and mutual recognition for certain mobile equipment with F-gases; Implementing Regulation (EU) 2025/1907 standardizes Member State programme notifications. Map these alongside A2L/R290 add-on training, OEM method-of-permission chains, IEC 60335-2-40, and EN 378 in one RACI matrix to close audit and EPC gaps.'
                ]
            }
        },
        {
            id: 'market',
            items: {
                zh: [
                    '据产业在线、中国家电网等公开报道，2026 年 5 月中国家用场景空调总排产约 2197.7 万台，同比下滑约 11.7%；其中内销排产同比下滑约 8.6%。铜价同比涨幅约 18.6%（由约 8.6 万元/吨升至约 10.2 万元/吨）直接推高制造成本，叠加房地产竣工疲软、国补退坡与渠道库存压力，终端涨价策略反馈冷淡。住宅热泵、两联供等细分品类排产需单独跟踪，不宜与全品类家用空调数据简单等同。',
                    '国际能源署（IEA）《全球能源回顾 2026》热泵章节：2025 年全球热泵销量同比下滑约 2%。分区域：欧洲全年销量同比增长约 11%（2022 年以来首次增长，德国上半年约 +55%）；美国约 -13%（A2L 制冷剂切换、库存与新房开工放缓）；中国销量大致与 2024 年持平。该年度口径与 EHPA 2026 年一季度欧洲走强等指标存在时间尺度差异，区域分项与因果判断请以 IEA 原文为准。'
                ],
                en: [
                    'Industry outlets (e.g. CHEAA, HVACR press) report May 2026 China residential-scene AC total production schedule at about 21.98 million units, down ~11.7% year-on-year, with domestic schedule down ~8.6%. Copper prices rose ~18.6% YoY (roughly 86k to 102k CNY/t), squeezing margins amid weak property completions, fading subsidies, and channel inventory. Track heat-pump and dual-fuel sub-segments separately—do not equate them with whole-category AC schedules.',
                    'IEA Global Energy Review 2026 (heat pumps chapter): global sales fell about 2% in 2025. Europe rose ~11% (first growth since 2022; Germany H1 ~+55%); the United States fell ~13% (A2L transition, inventories, slower housing); China stayed broadly flat vs 2024. This annual lens differs from EHPA’s strong Q1 2026 Europe bulletin—verify regional splits in the IEA source text.'
                ]
            }
        },
        {
            id: 'standards',
            items: {
                zh: [
                    '国家标准 GB/T 10891-2025《制冷系统及热泵 环境适应性要求》自 2026 年 5 月 1 日施行后进入符合性评价窗口：建议在出厂检验、型式试验与现场调试记录中单列「环境类别—实测工况—合格判据」三联表，并与 GB/T 9237、产品专用安全标准及制冷剂切换机型并列校核，减少内销与出口项目对同一机组引用不同环境假设时的争议。'
                ],
                en: [
                    'With GB/T 10891-2025 in force since 1 May 2026, conformity reviews should document environmental class, measured operating conditions, and pass/fail criteria explicitly in factory tests and commissioning records—alongside GB/T 9237, product safety standards, and refrigerant-transition lines—to avoid disputes when export and domestic projects assume different envelopes for the same unit.'
                ]
            }
        },
        {
            id: 'technology',
            items: {
                zh: [
                    'SKILLSAFE EU 项目（EHPA 牵头、欧盟共同资助）2026 年 4–5 月宣布与 Real Alternatives 培训计划战略合作：将 R290（丙烷）热泵安全教材纳入 Real Alternatives 多语言 e-learning 平台，并在荷兰、西班牙等地 LG 等设施开展安装商试点培训。项目目标是为可燃制冷剂热泵全生命周期提供统一安全指引，缓解欧洲各国培训标准碎片化问题。',
                    'EHPA 2026 年 5 月公开「Heat pumps need people」议题及 SKILLS4HP 技能集群动态，指出安装商、规划师与技术人员短缺仍是热泵普及瓶颈；与 SKILLSAFE 的 R290 实训、各国继续教育体系形成「人力缺口—标准实训」闭环。工业高温热泵技术路线详见 IIR 第 61 号技术简报（第 19 周已报道）。'
                ],
                en: [
                    'SKILLSAFE EU (EHPA-led, EU co-funded) announced a strategic partnership with Real Alternatives in Apr–May 2026: integrate R290 heat-pump safety materials into the multilingual Real Alternatives e-learning platform and run installer pilot trainings at facilities including LG sites in the Netherlands and Spain—addressing fragmented national safety rules for flammable refrigerants.',
                    'EHPA’s May 2026 “Heat pumps need people” messaging and the SKILLS4HP cluster highlight installer, planner, and technician shortages as a key adoption bottleneck—complementing SKILLSAFE R290 pilots and national continuing-education systems. For industrial high-temperature heat pump technology, see the IIR Technical Brief No. 61 (covered in week 19).'
                ]
            }
        },
        {
            id: 'calendar',
            items: {
                zh: [
                    '第 15 届 IEA 热泵大会（15th IEA Heat Pump Conference）：2026 年 5 月 26–29 日，奥地利维也纳 Hofburg，主题「Decarbonisation through Innovation」；含主题演讲、科学报告、工作坊、示范项目参观与政策论坛。常规注册截至 5 月 15 日，议程与签证邀请函见 hpc2026.org。',
                    'ISH Shanghai & CIHE 2026 仍计划 2026 年秋季于上海新国际博览中心举办（常与 IGB 系列展同期）；Chillventa 2026 纽伦堡业界日历多指向约 10 月 13–15 日。行前请分别在 messefrankfurt.com 与 chillventa.de 核对最新日程。'
                ],
                en: [
                    '15th IEA Heat Pump Conference: 26–29 May 2026, Hofburg, Vienna, Austria—theme “Decarbonisation through Innovation”; keynotes, papers, workshops, site visits, and policy forum. Standard registration until 15 May; program and visa letters at hpc2026.org.',
                    'ISH Shanghai & CIHE 2026 remains scheduled for Autumn 2026 at SNIEC (often with IGB co-located shows); Chillventa 2026 Nuremberg is widely penciled for about 13–15 Oct 2026. Re-check dates on messefrankfurt.com and chillventa.de before travel.'
                ]
            }
        }
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
    const isZh = lang === 'zh';
    const tPage = translations[lang] || translations.en;
    const tEn = translations.en;

    const escapeBriefHtml = (s) => {
        if (!s) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    const sectionTitle = (sectionId) =>
        tPage[`briefings.sections.${sectionId}`] || tEn[`briefings.sections.${sectionId}`] || sectionId;

    const getSectionItems = (section) => {
        const items = section.items || {};
        return isZh ? (items.zh || []) : (items.en || []);
    };

    // Update title
    const weekTemplate = tPage['briefings.weekTitle'] || tEn['briefings.weekTitle'];
    titleElement.textContent = String(weekTemplate)
        .replace('{year}', briefingData.year)
        .replace('{week}', briefingData.week);

    // Update subtitle (optional)
    if (subtitleElement) {
        const subtitle = isZh ? (briefingData.subtitle || '') : (briefingData.subtitleEn || '');
        if (subtitle) {
            subtitleElement.textContent = subtitle;
            subtitleElement.classList.remove('u-hidden');
        } else {
            subtitleElement.classList.add('u-hidden');
        }
    }

    const sections = briefingData.sections || [];

    // Build full content HTML (five thematic sections)
    let fullHtml = '';
    sections.forEach((section) => {
        const items = getSectionItems(section);
        if (items.length === 0) return;
        const title = sectionTitle(section.id);
        fullHtml += `<div class="briefing-section briefing-section--${escapeBriefHtml(section.id)}">
        <h4 class="briefing-section-title">${escapeBriefHtml(title)}</h4>
        <ul class="briefing-list">`;
        items.forEach((item) => {
            fullHtml += `<li class="briefing-item">${escapeBriefHtml(item)}</li>`;
        });
        fullHtml += `</ul></div>`;
    });
    contentElement.innerHTML = fullHtml;

    // Preview: highlights only (fallback to first sentence of each section)
    const highlights = isZh
        ? (briefingData.highlights?.zh || [])
        : (briefingData.highlights?.en || []);

    let previewItems = highlights;
    if (previewItems.length === 0) {
        previewItems = sections.flatMap((section) => {
            const items = getSectionItems(section);
            if (items.length === 0) return [];
            const text = items[0];
            const dot = text.indexOf('。');
            const period = text.indexOf('. ');
            let cut = -1;
            if (dot > 0 && period > 0) cut = Math.min(dot, period);
            else if (dot > 0) cut = dot;
            else if (period > 0) cut = period;
            const snippet = cut > 0 ? text.slice(0, cut + 1) : text;
            return [snippet];
        });
    }

    const highlightsTitle =
        tPage['briefings.highlights.title'] || tEn['briefings.highlights.title'] || '';
    const previewNote =
        tPage['briefings.previewNote'] || tEn['briefings.previewNote'] || '';

    let previewHtml = '';
    if (previewNote) {
        previewHtml += `<p class="briefing-preview-note">${escapeBriefHtml(previewNote)}</p>`;
    }
    if (highlightsTitle) {
        previewHtml += `<p class="briefing-preview-heading">${escapeBriefHtml(highlightsTitle)}</p>`;
    }
    previewHtml += '<ul class="briefing-preview-list briefing-preview-list--highlights">';
    previewItems.forEach((text) => {
        previewHtml += `<li class="briefing-preview-item briefing-preview-item--highlight">${escapeBriefHtml(text)}</li>`;
    });
    previewHtml += '</ul>';
    previewElement.innerHTML = previewHtml;

    // Format update date
    const updateDate = new Date(briefingData.updateDate);
    const dateStr = updateDate.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const lastUpdateText = tPage['briefings.lastUpdate'] || tEn['briefings.lastUpdate'] || 'Last updated: ';
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

    initHomepageDisclaimerFooter();

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