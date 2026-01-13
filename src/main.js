// Language data
const translations = {
    en: {
        // Navigation
        'nav.brand': 'Jing Yanrong',
        'nav.about': 'About',
        'nav.apps': 'Apps',
        
        // Hero
        'hero.title': 'Jing Yanrong',
        'hero.badge': '✓ Licensed PE & Human Verified',
        'hero.headline': '{experienceYears}+ Years of Engineering Judgment, Encoded into Tools.',
        'hero.subheadline': 'Specializing in Industrial Refrigeration & Heat Pumps (-100°C to +200°C). Bridging the gap between physical thermodynamics and digital code.',
        'hero.cta': 'Explore My Tools',
        'hero.secondaryCta': 'Read Engineering Insights',
        
        // About
        'about.title': 'About',
        'about.text1': 'Specializing in industrial energy systems engineering, covering refrigeration, heat pump, thermal energy, compression, energy storage, waste heat recovery, and thermal coupling, focusing on optimizing system performance through innovative design and intelligent applications to advance green low-carbon engineering practices.',
        'about.text2': 'Provides practical applications and tools covering design optimization, energy efficiency analysis, and performance calculation to support engineering applications and optimization in industrial energy systems.',
        
        // Technical Expertise
        'expertise.title': 'Technical Capabilities',
        'expertise.lowMedium.title': '-100°C ~ +85°C',
        'expertise.lowMedium.content': 'Refrigeration & Conventional Heating. Refrigerants: R134a, R515B, R410A. Applications: Lithium Battery Coating, PV Cleaning, HVAC.',
        'expertise.highTemp.title': '+85°C ~ +250°C',
        'expertise.highTemp.content': 'Industrial High-Temp Heat Pumps & Steam. Technologies: Cascade Systems, Steam Compression. Applications: Industrial Drying, Waste Heat Recovery, Steam Replacement.',
        'expertise.highTemp.highlight': 'R&D Target: 200°C (Steam) | Proven Max: 120°C',
        'expertise.highTemp.tempRange': 'Temperature Range: <span class="font-semibold text-orange-600">30°C - 120°C</span> (Industrial Applications).',
        'expertise.highTemp.regions': 'Service Regions: Germany, Netherlands, & Leading Domestic Enterprises.',
        'expertise.highTemp.applications': 'Applications: Food & Beverage, Petrochemical, Consumer Goods, Construction Machinery, New Energy & other industries.',
        'expertise.highTemp.refrigerants': 'Refrigerants: R134a, R410a, R1233zd(E), R245fa, R507A, R717, R744, etc.',
        'expertise.highTemp.lowGrade': 'Low-Grade Energy: ORC & Screw Expander Power Gen (&lt;<span class="font-semibold text-orange-600">250°C</span> source).',
        'expertise.highTemp.capacity': 'Capacity: 30 kW - 10 MW.',
        'expertise.lowTemp.title': '❄️ Ind. Refrigeration & Gas Compression',
        'expertise.lowTemp.highlight': '20 Years Experience: Deep Cold down to -100°C',
        'expertise.lowTemp.tempRange': 'Temperature Range: <span class="font-semibold text-cyan-600">-100°C to +30°C</span> (Industrial Applications).',
        'expertise.lowTemp.clients': 'Clients: Served BASF, Dow Chemical, PetroChina, Sinopec, CAS, etc.',
        'expertise.lowTemp.refrigerants': 'Refrigerants: Ammonia, CO2, Propane, Propylene, R507A, R23, Ethylene, Helium, Methane, etc.',
        'expertise.lowTemp.gas': 'Gas Expertise: Helium (He) Compression & CO2 Capture (CCUS).',
        'expertise.lowTemp.process': 'Process Cooling: Complex cascading systems & Natural Refrigerants (NH3/CO2).',
        'expertise.lowTemp.capacity': 'Capacity: 100 kW - 10,000 kW.',
        
        // Apps
        'apps.title': 'Engineering Toolbox',
        'apps.description': 'Open-source tools with verifiable logic and real physics formulas',
        'apps.app0.title': 'Engineering Unit Converter',
        'apps.app0.version': 'V2.0.0',
        'apps.app0.description': 'Fast and accurate unit conversion tool for engineering calculations',
        'apps.app1.title': 'Expander Performance Calculator',
        'apps.app1.version': '',
        'apps.app1.description': 'Comprehensive performance calculation tool for expander systems',
        'apps.app2.title': 'Industrial Heat Pump Matching Calculator',
        'apps.app2.version': 'V7.0.0',
        'apps.app2.description': 'Matching calculation tool for industrial heat pump systems with MVR support',
        'apps.app3.title': 'Heat Pump Benefit Analyzer',
        'apps.app3.version': 'V9.0.0',
        'apps.app3.description': 'Comprehensive economic and environmental benefit analysis for industrial heat pumps',
        'apps.app4.title': 'Temperature Range Optimizer',
        'apps.app4.version': '',
        'apps.app4.description': 'Optimize temperature ranges for wide-range heat pump systems',
        'apps.app5.title': 'Component Sizing Tool',
        'apps.app5.version': '',
        'apps.app5.description': 'Size compressors, heat exchangers, and other components',
        'apps.tags.converter': 'Converter',
        'apps.tags.unit': 'Unit',
        'apps.tags.calculation': 'Calculation',
        'apps.tags.heatPump': 'Heat Pump',
        'apps.tags.design': 'Design',
        'apps.tags.refrigeration': 'Refrigeration',
        'apps.tags.analysis': 'Analysis',
        'apps.tags.energy': 'Energy',
        'apps.tags.optimization': 'Optimization',
        'apps.tags.temperature': 'Temperature',
        'apps.tags.sizing': 'Sizing',
        'apps.tags.components': 'Components',
        'apps.available': 'Available',
        'apps.comingSoon': 'Coming Soon',
        'apps.moreComing': 'Currently {count} applications available. More tools are in development!',
        'apps.launch': 'Launch App',
        'apps.viewSource': 'View Source / Logic',
        
        // Disclaimer
        'disclaimer.title': 'Disclaimer',
        'disclaimer.text1': 'All applications are provided for personal research, educational, and public benefit purposes only on a non-commercial, open-source basis. For commercial use, please contact me in advance to obtain authorization.',
        'disclaimer.text2': 'Tools are provided "as is" without warranty of any kind. Use at your own risk.',
        
        // Contact
        'contact.title': 'Contact',
        'contact.email': 'Email',
        'contact.wechat': 'WeChat',
        
        // Partners
        'partners.title': 'Trusted Partners',
        
        // Testimonials
        'testimonials.text1': '"Solved a complex compressor vibration issue that AI models couldn\'t predict."',
        'testimonials.author1': '— Industrial Client, Germany',
        'testimonials.text2': '"Exceptional engineering judgment combined with practical digital solutions."',
        'testimonials.author2': '— Partner, Leading International Enterprise',
        
        // Insights
        'insights.title': 'Engineering Insights',
        'insights.article1.title': '5 Site Visits to Solve a "Mystery" Seizure: The -70°C Liquid Trap',
        'insights.article1.tag': 'Critical Troubleshooting',
        'insights.article1.date': 'Oct 2023',
        'insights.article1.excerpt': 'Multiple large compressors seized and were initially blamed on manufacturing defects. After 5 site inspections, I traced the root cause not to the machine, but to the system: incidental liquid slugging caused by a flawed -70°C evaporator design. We fixed the system, saving the compressors.',
        'insights.article1.readMore': 'Read Analysis',
        'insights.article2.title': 'Compression vs. Absorption: Why I Bet on Electric Drive',
        'insights.article2.tag': 'Strategic Decision',
        'insights.article2.date': 'Feb 2025',
        'insights.article2.excerpt': 'Textbooks say "use waste heat for absorption", but reality demands stability. By locking in R1234ze(E) and a COP of 4.44, I proved that electric compression offers lower delivery risk than complex steam-balance absorption systems.',
        'insights.article2.readMore': 'Read Analysis',
        'insights.article3.title': 'Beyond the Hype: The Real Moat is Extreme Testing (-40°C to +200°C)',
        'insights.article3.tag': 'Industry Outlook',
        'insights.article3.date': 'Sep 2025',
        'insights.article3.excerpt': 'Everyone claims 160°C capability, but few can prove it. The future belongs to those who build CNAS-level infrastructure to verify R744/Steam systems under extreme load boundaries. Verification > Specification.',
        'insights.article3.readMore': 'Read Analysis',
        
        // Footer
        'footer.introTitle': 'Open Source Engineering. Connect with my Digital Twin.',
        'footer.copyright': '© {year} Jing Yanrong. Open Source Engineering.',
        'footer.github': 'GitHub',
        'footer.techStack': 'Built with Vite & Vanilla JS',
        'footer.version': 'Version',
        'footer.privacy': 'Uses localStorage to save language preference. No personal data is collected or transmitted.'
    },
    zh: {
        'nav.brand': '荆炎荣 / Jing Yanrong',
        'nav.about': '关于',
        'nav.apps': '应用',
        'hero.title': '荆炎荣',
        'hero.badge': '✓ 注册公用设备工程师 · 真实经验',
        'hero.headline': '将{experienceYears}年+工程判断力编码为工具。',
        'hero.subheadline': '专注于工业制冷与热泵系统（-100°C至+200°C）。连接物理热力学与数字代码的桥梁。',
        'hero.cta': '探索我的工具',
        'hero.secondaryCta': '阅读工程洞察',
        'about.title': '关于',
        'about.text1': '专注于工业能源系统工程，涵盖制冷、热泵、热能、压缩、储能、余热回收及冷热耦合等领域，致力于通过创新设计与智能化应用，优化系统性能，推进绿色低碳技术的工程实践与发展。',
        'about.text2': '提供实用的应用程序和工具，涵盖设计优化、能效分析和系统性能计算等方面，助力工业能源系统的工程应用与优化。',
        'expertise.title': '技术能力',
        'expertise.lowMedium.title': '-100°C ~ +85°C',
        'expertise.lowMedium.content': '冷冻与常规供热。制冷剂: R134a, R515B, R410A。场景: 锂电涂布, 光伏清洗, HVAC。',
        'expertise.highTemp.title': '+85°C ~ +250°C',
        'expertise.highTemp.content': '工业高温热泵与蒸汽。技术: 复叠系统, 蒸汽压缩。场景: 工业烘干, 废热回收, 蒸汽替代。',
        'expertise.highTemp.highlight': '研发目标：200°C（蒸汽）| 已验证最高：120°C',
        'expertise.highTemp.tempRange': '温区范围：<span class="font-semibold text-orange-600">30°C - 120°C</span>（工业应用）。',
        'expertise.highTemp.regions': '服务区域：德国、荷兰及国内头部企业。',
        'expertise.highTemp.applications': '应用领域：食品饮料、石油化工、日化、工程机械、新能源等行业。',
        'expertise.highTemp.refrigerants': '制冷剂：R134a、R410a、R1233zd（E）、R245fa、R507A、R717、R744 等。',
        'expertise.highTemp.lowGrade': '低品位能源：ORC 及螺杆膨胀机发电（&lt;<span class="font-semibold text-orange-600">250°C</span> 热源）。',
        'expertise.highTemp.capacity': '容量范围：30 kW - 10 MW。',
        'expertise.lowTemp.title': '❄️ 工业制冷与气体压缩',
        'expertise.lowTemp.highlight': '20 年经验：深冷技术低至 -100°C',
        'expertise.lowTemp.tempRange': '温区范围：<span class="font-semibold text-cyan-600">-100°C 至 +30°C</span>（工业应用）。',
        'expertise.lowTemp.clients': '服务过巴斯夫、陶氏化学、中石油、中石化、中科院等。',
        'expertise.lowTemp.refrigerants': '制冷剂：氨、二氧化碳、丙烷、丙烯、R507A、R23、乙烯、氦气、甲烷等。',
        'expertise.lowTemp.gas': '气体专长：氦气（He）压缩及 CO2 捕集（CCUS）。',
        'expertise.lowTemp.process': '工艺冷却：复杂级联系统及天然制冷剂（NH3/CO2）。',
        'expertise.lowTemp.capacity': '容量范围：100 kW - 10,000 kW。',
        'apps.title': '工程计算工具箱',
        'apps.description': '开源工具，具有可验证的逻辑和真实的物理公式',
        'apps.app0.title': '工程单位换算器',
        'apps.app0.version': 'V2.0.0',
        'apps.app0.description': '快速、准确的工程计算单位转换工具',
        'apps.app1.title': '膨胀机性能计算器',
        'apps.app1.version': '',
        'apps.app1.description': '膨胀机综合性能计算工具',
        'apps.app2.title': '工业热泵匹配计算器',
        'apps.app2.version': 'V7.0.0',
        'apps.app2.description': '工业热泵系统匹配计算工具，支持MVR模式',
        'apps.app3.title': '热泵效益分析器',
        'apps.app3.version': 'V9.0.0',
        'apps.app3.description': '工业热泵经济效益与环境效益综合分析工具',
        'apps.app4.title': '温度范围优化器',
        'apps.app4.version': '',
        'apps.app4.description': '优化宽温域热泵系统的温度范围',
        'apps.app5.title': '部件选型工具',
        'apps.app5.version': '',
        'apps.app5.description': '压缩机、换热器等部件的选型',
        'apps.tags.converter': '换算器',
        'apps.tags.unit': '单位',
        'apps.tags.calculation': '计算',
        'apps.tags.heatPump': '热泵',
        'apps.tags.design': '设计',
        'apps.tags.refrigeration': '制冷',
        'apps.tags.analysis': '分析',
        'apps.tags.energy': '能源',
        'apps.tags.optimization': '优化',
        'apps.tags.temperature': '温度',
        'apps.tags.sizing': '选型',
        'apps.tags.components': '部件',
        'apps.available': '可用',
        'apps.comingSoon': '即将推出',
        'apps.moreComing': '目前提供 {count} 个应用，更多实用工具正在开发中，敬请期待！',
        'apps.launch': '启动应用',
        'apps.viewSource': '查看源码 / 逻辑',
        'disclaimer.title': '免责声明',
        'disclaimer.text1': '所有应用仅供个人研究、教育和公益目的使用，以非商业、开源方式提供。如用于商业用途，请事先联系获得授权。',
        'disclaimer.text2': '工具按"现状"提供，不提供任何形式的保证，使用风险自负。',
        'contact.title': '联系方式',
        'contact.email': '邮箱',
        'contact.wechat': '微信',
        
        // Partners
        'partners.title': '值得信赖的合作伙伴',
        
        // Testimonials
        'testimonials.text1': '"解决了一个AI模型无法预测的复杂压缩机振动问题。"',
        'testimonials.author1': '— 德国某工业客户',
        'testimonials.text2': '"卓越的工程判断力与实用的数字解决方案相结合。"',
        'testimonials.author2': '— 国际头部企业合作伙伴',
        
        // Insights
        'insights.title': '工程洞察',
        'insights.article1.title': '5次现场排查解决"神秘"抱死：-70°C液压缩陷阱',
        'insights.article1.tag': '关键故障排查',
        'insights.article1.date': '2023年10月',
        'insights.article1.excerpt': '多台大型压缩机抱死，最初被归咎于制造缺陷。经过5次现场检查，我追踪到根本原因不在机器本身，而在系统：由有缺陷的-70°C蒸发器设计引起的偶然液压缩。我们修复了系统，保住了压缩机。',
        'insights.article1.readMore': '阅读分析',
        'insights.article2.title': '压缩式 vs 吸收式：为何我坚持在工业项目中首选"电驱动"',
        'insights.article2.tag': '技术决策',
        'insights.article2.date': '2025年2月',
        'insights.article2.excerpt': '当书本建议"利用废热做吸收式"时，工程直觉告诉我：不要低估蒸汽平衡的复杂性。通过COP 4.44的实测数据与R1234ze(E)的环保优势，证明了在电力充足场景下，压缩式热泵才是交付风险最低、可控性最强的路径。',
        'insights.article2.readMore': '阅读分析',
        'insights.article3.title': '拒绝"PPT造车"：工业热泵的下一个护城河是"极端工况测试"',
        'insights.article3.tag': '行业前瞻',
        'insights.article3.date': '2025年9月',
        'insights.article3.excerpt': '行业都在卷120°C/160°C的指标，但谁能证明它？真正的门槛不是造出样机，而是建立一套能模拟-40°C到+200°C蒸汽热汇的CNAS级验证体系。未来属于"能测、能证、能复现"的企业。',
        'insights.article3.readMore': '阅读分析',
        
        // Footer
        'footer.introTitle': '开源工程。与我的数字孪生连接。',
        'footer.copyright': '© {year} 荆炎荣. Open Source Engineering.',
        'footer.github': 'GitHub',
        'footer.techStack': 'Built with Vite & Vanilla JS',
        'footer.version': '版本',
        'footer.privacy': '使用本地存储保存语言偏好，不收集或传输任何个人数据。'
    }
};

// Language management
let currentLanguage = localStorage.getItem('language') || 'zh';

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    
    // Update all elements with data-i18n attribute
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    // Count available apps (app-card elements in apps-grid)
    const appCount = document.querySelectorAll('.apps-grid > .app-card').length;
    
    // Calculate experience years (starting from July 1, 1998)
    // Each year on July 1st, the experience increases by 1
    const startYear = 1998;
    const startMonth = 6; // July (0-indexed, so 6 = July)
    const startDay = 1;
    
    let experienceYears = currentYear - startYear;
    // If current date is before July 1st of current year, subtract 1
    const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January, 6 = July)
    const currentDay = currentDate.getDate();
    if (currentMonth < startMonth || (currentMonth === startMonth && currentDay < startDay)) {
        experienceYears--;
    }
    
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (!key || !translations[lang] || !translations[lang][key]) {
            // Skip if key not found or translation missing
            return;
        }
        
        let text = translations[lang][key];
        
        // Special handling for app titles: append version number if available
        if (key.startsWith('apps.app') && key.endsWith('.title')) {
            // Handle production apps: apps.app0.title, apps.app1.title, etc.
            const appIndex = key.match(/apps\.app(\d+)\.title$/);
            if (appIndex) {
                const versionKey = `apps.app${appIndex[1]}.version`;
                const version = translations[lang][versionKey];
                if (version && version.trim() !== '') {
                    text = `${text} ${version}`;
                }
            }
        }
        
        // Replace {year} placeholder with current year
        text = text.replace(/{year}/g, currentYear.toString());
        // Replace {count} placeholder with app count
        text = text.replace(/{count}/g, appCount.toString());
        // Replace {experienceYears} placeholder with experience years
        text = text.replace(/{experienceYears}/g, experienceYears.toString());
        
        // Safely set text content
        try {
            // Check if HTML content is allowed
            const allowHtml = element.getAttribute('data-i18n-html') === 'true';
            if (allowHtml) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
            // Hide element if text is empty
            if (!text || text.trim() === '') {
                element.style.display = 'none';
            } else {
                element.style.display = '';
            }
        } catch (error) {
            console.warn('Failed to update element with key:', key, error);
        }
    });
    
    // Handle placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (key && translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Smooth scroll behavior and interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Display version number immediately
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        // @ts-ignore - __APP_VERSION__ is defined by Vite in vite.config.js
        const appVersion = __APP_VERSION__ || '1.0.0';
        versionElement.textContent = appVersion;
    }
    
    // Set initial language
    setLanguage(currentLanguage);
    
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
    
    // Language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Helper function to calculate scroll offset
    function getScrollOffset() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            return navbar.offsetHeight + 20; // Add 20px extra spacing
        }
        return 100; // Fallback
    }

    // Helper function to scroll to section
    function scrollToSection(sectionId) {
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            const offset = getScrollOffset();
            // Use scrollIntoView with block: 'start' and then adjust for navbar offset
            // This is more reliable than scrollTo
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // After scrollIntoView, we need to adjust for navbar height
            // Use requestAnimationFrame to ensure scrollIntoView has started
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                    const adjustedScrollY = currentScrollY - offset;
                    window.scrollTo({
                        top: Math.max(0, adjustedScrollY),
                        behavior: 'smooth'
                    });
                });
            });
            return true;
        }
        return false;
    }

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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

    console.log('Personal homepage loaded successfully!');
});