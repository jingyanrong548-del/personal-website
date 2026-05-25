// Vercel Analytics
import { inject } from '@vercel/analytics';
import { translations, initLanguageSwitcher, getCurrentLanguage } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';

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
    week: 21,
    updateDate: '2026-05-24',
    subtitle: '欧盟 IF25 工业用热拍卖公布约 4 亿欧元中标、EHPA 通报欧洲 Q1 热泵销量回暖；国内能效标识 2026 版目录 6 月起实施；维也纳 IEA 热泵大会即将开幕；本站工业热泵标准速查 5/22 更新',
    subtitleEn: 'EU IF25 Heat Auction ~€400M awards; EHPA Q1 2026 Europe heat-pump rebound; China energy-label catalog 2026 from 1 Jun; Vienna IEA HPC opens 26 May; site standards quick reference updated 22 May',
    highlights: {
        zh: [
            '欧盟 IF25 工业用热拍卖：5/22 公布 65 个项目、约 3.96 亿欧元、10 国中标',
            '欧委会 5/19 确认年内将举办第二轮工业用热拍卖',
            'EHPA：欧洲 11 国 2026 Q1 热泵销量约 57.5 万台、同比约 +17%',
            '发改环资规〔2026〕550 号：能效标识目录（2026 版）多项 6/1 起施行',
            '第 15 届 IEA 热泵大会 5/26–29 维也纳开幕（约 380 篇投稿）'
        ],
        en: [
            'EU IF25 Heat Auction: 22 May — 65 projects, ~€396M, 10 Member States',
            'Commission confirms second industrial heat auction later in 2026 (19 May)',
            'EHPA: ~575k residential units in 11 EU countries in Q1 2026, ~+17% YoY',
            'NDRC/FAS 2026/550: revised energy-label catalog; key rules from 1 Jun 2026',
            '15th IEA Heat Pump Conference, Vienna, 26–29 May (~380 submissions)'
        ]
    },
    sections: [
        {
            id: 'policy',
            items: {
                zh: [
                    '国家发展改革委、市场监管总局印发《中华人民共和国实行能源效率标识的产品目录（2026年版）》及相关实施规则（发改环资规〔2026〕550号，2026年4月30日发布）：修订道路和隧道照明用LED灯具、家用电冰箱、电动洗衣机、室内照明用LED产品、投影机、家用太阳能热水系统、吸油烟机和换气扇等七类产品能效标识实施规则，其中多项自2026年6月1日起施行；2026年6月1日前出厂或进口的产品，可按公告允许延迟至2028年6月1日前加施新版标识。制冷空调与热泵企业宜同步评估家电能效门槛抬升对终端价格沟通、渠道库存与「一级能效」重评的影响，并以国家发改委官网原文为准。',
                    '欧洲热泵协会（EHPA）等组织2026年5月13日发布联名信《能源安全与可负担性：新地缘政治时代的选择》，强调俄乌冲突与中东局势加剧化石燃料依赖风险，2030年后能源框架将决定欧洲长期能源安全；信函呼应欧盟能源危机应对路径中对热泵的VAT/税收减免与社会租赁等支持，并呼吁成员国加快落地。5月12日另有《加速欧盟灵活电气化需求》联名信，将建筑、交通与工业电气化与清洁、可调度能源系统挂钩——与热泵作为需求侧灵活性资源的定位相互印证。'
                ],
                en: [
                    'China’s NDRC and SAMR issued the 2026 catalogue of products subject to energy-efficiency labelling and revised implementation rules (FAS 2026/550, published 30 Apr 2026), covering seven groups including domestic refrigerators, washing machines, indoor and road/tunnel LED lighting, projectors, solar water heaters, range hoods, and ventilation fans—many effective from 1 Jun 2026, with transitional labelling for goods placed on the market before that date as set out in the notice. HVAC and heat-pump firms should assess knock-on effects on retail messaging, channel inventory, and “Grade 1” efficiency claims; verify all dates and product scopes on the NDRC website.',
                    'EHPA and partners published a joint letter on 13 May 2026 on energy security and affordability in a new geopolitical era, stressing fossil-fuel exposure and urging rapid delivery of EU crisis-plan tools for heat pumps (VAT/tax relief, social leasing). A 12 May letter on accelerating flexible electrification demand links buildings, transport, and industry to clean, dispatchable systems—aligning with heat pumps as flexible demand resources.'
                ]
            }
        },
        {
            id: 'market',
            items: {
                zh: [
                    'EHPA 2026年5月4日通报：2026年一季度欧洲11国住宅热泵销量合计约57.5万台，较2025年同期约49.4万台增长约17%；法国、德国、波兰三国平均增速约25%，数据亦覆盖3月霍尔木兹海峡局势升级后能源价格上行阶段。奥地利因补贴缺位销量同比下滑约30%，拉低整体均值。EHPA 秘书长 Paul Kenny 指出，气价与供应波动正推动消费者转向热泵；该季度口径与 IEA《全球能源回顾 2026》披露的2025年全年全球约-2%形成时间尺度差异，不宜混用。媒体同期报道：德国2025年热泵约占新采暖系统销量48%、燃气锅炉降至约44%（Euronews，援引 EHPA 初步数据）。',
                    '欧盟创新基金2025工业用热拍卖（IF25 Heat Auction）2026年5月22日公布中标结果：65个项目将获得近4亿欧元资助，覆盖奥地利、比利时、捷克、丹麦、法国、德国、匈牙利、葡萄牙、斯洛文尼亚和西班牙共10国；行业涵盖造纸、玻璃、陶瓷、建材、钢铁及食品、纺织、制药等，高温与中温主题预算分别约6210万与约3344万欧元。5月19日欧委会确认年内将举办第二轮工业用热拍卖；EHPA 欢迎该信号，并呼吁提前公布时间表、降低现行约3 MW最低门槛、简化申请流程，以扩大食品等中小用热项目参与。'
                ],
                en: [
                    'EHPA reported on 4 May 2026 that residential heat-pump sales in 11 European countries reached about 575,000 units in Q1 2026, up ~17% from ~494,000 in Q1 2025; France, Germany, and Poland averaged ~25% growth, including the period after March Strait of Hormuz tensions lifted gas and oil prices. Austria fell ~30% amid weak subsidies. This quarterly lens differs from IEA’s 2025 full-year global ~-2% figure—do not conflate. Press coverage (e.g. Euronews, 13 May) notes heat pumps reached ~48% of new heating systems sold in Germany in 2025 vs ~44% for gas boilers, citing EHPA preliminary data.',
                    'The European Commission announced IF25 Heat Auction results on 22 May 2026: 65 projects awarded nearly €400 million across ten Member States, spanning pulp & paper, glass, ceramics, construction materials, steel, food, textiles, and pharmaceuticals, with high- and medium-temperature topics funded at roughly €62.1M and €334.4M respectively. On 19 May the Commission confirmed a second industrial heat auction later in 2026; EHPA welcomed the signal and called for earlier timelines, thresholds below the current ~3 MW minimum, and simpler applications to widen participation (e.g. food sector).'
                ]
            }
        },
        {
            id: 'standards',
            items: {
                zh: [
                    '围绕550号文实施，企业宜在6月1日前完成在库产品能效标识换版策划、检测与标签印制排期，并关注家用电冰箱等品类在新标准下「一级能效」门槛显著抬升（部分媒体测算同容量日耗电需进一步下降方可维持一级）——对外宣传与招投标技术响应须与备案型号及实测报告一致，避免新旧标准混标争议。',
                    '本站「工业热泵标准速查」页面（heat-pump-standards.html）已于2026年5月22日按公开信息核对更新数据集，并自5月11日起增补全国冷冻空调标准化技术委员会（SAC/TC238）热泵标准化体系图摘录条目；表中 GB/T 10891-2025 等条目与第20周所述符合性评价窗口一致。项目适用性、采标关系及强制性条文请以现行有效标准文本为准。'
                ],
                en: [
                    'Ahead of FAS 2026/550, manufacturers should plan relabelling, testing, and print runs for inventory before 1 Jun 2026, noting tighter Grade-1 thresholds for products such as domestic refrigerators under the revised rules—marketing and tender responses must match registered models and test reports to avoid mixed-standard disputes.',
                    'This site’s Industrial Heat Pump Standards quick reference (heat-pump-standards.html) was refreshed on 22 May 2026 against public sources, including SAC/TC238 system-map excerpts added from 11 May; GB/T 10891-2025 entries align with the week-20 conformity window. Project applicability and mandatory clauses remain subject to the current official standard text.'
                ]
            }
        },
        {
            id: 'technology',
            items: {
                zh: [
                    'EHPA 2026年5月18日议题聚焦人工智能与能源系统数字化：在风光装机与负荷波动加剧背景下，热泵及综合能源系统的多模态预测、多源寻优与全栈控制正与「能源大脑」类物理—数据双驱动方法交汇；与第20周 SKILLSAFE / SKILLS4HP 人力实训线形成「软控升级—硬技能供给」互补。工业高温热泵路线与示范案例详见本站简报区「2026第二届中国高温及工业热泵创新发展大会」趋势观察及 IIR 第61号技术简报（第19周已报道）。'
                ],
                en: [
                    'EHPA’s 18 May 2026 focus on AI and energy-system digitalisation highlights multimodal forecasting, multi-source optimisation, and stack-wide control for heat pumps and integrated energy systems amid rising variable renewables—complementing week-20 SKILLSAFE / SKILLS4HP workforce tracks. For industrial high-temperature heat pumps, see this site’s Taiyuan HTHP 2026 trend panel and IIR Technical Brief No. 61 (week 19).'
                ]
            }
        },
        {
            id: 'calendar',
            items: {
                zh: [
                    '第15届IEA热泵大会（15th IEA Heat Pump Conference）：2026年5月26–29日奥地利维也纳Hofburg，主题「Decarbonisation through Innovation」；据官网，约380篇科学投稿，5月26日举办IEA HPT TCP Annex系列工作坊及技术参观，5月27日起主会含能源气候政策与产业转型主题演讲、分会与展览，28日政策论坛。常规注册已于5月15日截止，议程、签证邀请函与现场信息见 hpc2026.org。',
                    'ISH Shanghai & CIHE 2026仍计划2026年秋季于上海新国际博览中心举办（常与IGB系列展同期）；Chillventa 2026纽伦堡业界日历多指向约10月13–15日。行前请分别在 messefrankfurt.com 与 chillventa.de 核对最新日程。'
                ],
                en: [
                    '15th IEA Heat Pump Conference: 26–29 May 2026, Hofburg, Vienna—theme “Decarbonisation through Innovation”; ~380 scientific submissions per the official site; 26 May IEA HPT Annex workshops and site visits, main programme from 27 May with policy and industry plenaries, exhibition, and a policy forum on 28 May. Standard registration closed 15 May; program and visa letters at hpc2026.org.',
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

    setBriefingExpanded(briefingExpanded);
}

let briefingExpanded = true;

function setBriefingExpanded(expanded) {
    briefingExpanded = expanded;
    const btn = document.getElementById('briefing-read-more-btn');
    const preview = document.getElementById('briefing-preview');
    const full = document.getElementById('briefing-main-content');
    if (!btn || !preview || !full) return;

    const readMoreText = btn.querySelector('.read-more-text');
    const readLessText = btn.querySelector('.read-less-text');
    const readMoreIcon = btn.querySelector('.read-more-icon');

    preview.classList.remove('u-hidden');

    if (expanded) {
        full.classList.remove('u-hidden');
        if (readMoreText) readMoreText.classList.add('u-hidden');
        if (readLessText) readLessText.classList.remove('u-hidden');
        if (readMoreIcon) readMoreIcon.style.transform = 'rotate(180deg)';
        btn.classList.add('expanded');
    } else {
        full.classList.add('u-hidden');
        if (readMoreText) readMoreText.classList.remove('u-hidden');
        if (readLessText) readLessText.classList.add('u-hidden');
        if (readMoreIcon) readMoreIcon.style.transform = 'rotate(0deg)';
        btn.classList.remove('expanded');
    }
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

    initSiteLegalDisclaimer();

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

    initNavChipHighlight();

    const navAnchorLinks = document.querySelectorAll('.nav-link--anchor');

    navAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) {
                return;
            }
            const targetId = href.slice(hashIndex);
            e.preventDefault();
            if (scrollToSection(targetId)) {
                navAnchorLinks.forEach((l) => l.classList.remove('active'));
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

        navAnchorLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (href === '#' + current || href.endsWith('#' + current)) {
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
            
            navAnchorLinks.forEach((link) => link.classList.remove('active'));
        });
    }

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
    
    function openContactModal(e) {
        if (!contactModal) return;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        resetModalToDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const modalBody = contactModal.querySelector('.contact-modal-body');
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
    }

    [openContactModalBtn, document.getElementById('hero-cta-diagnostic'), document.getElementById('methodology-cta-btn')]
        .filter(Boolean)
        .forEach((btn) => btn.addEventListener('click', openContactModal));
    
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

    if (briefingReadMoreBtn && briefingPreview && briefingFull) {
        briefingReadMoreBtn.addEventListener('click', function() {
            setBriefingExpanded(!briefingExpanded);
        });
    }

    console.log('Personal homepage loaded successfully!');
});