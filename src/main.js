// Vercel Analytics
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

// Language data
const translations = {
    en: {
        // Navigation
        'nav.brand': 'Jing Yanrong',
        'nav.about': 'About',
        'nav.apps': 'Toolbox',
        'nav.insights': 'Engineering Insights',
        
        // Hero
        'hero.title': 'Jing Yanrong',
        'hero.badge': '✓ Licensed PE & Human Verified',
        'hero.headline': '{experienceYears}+ Years of Engineering Judgment, Encoded into Tools.',
        'hero.subheadline': 'Specializing in Industrial Refrigeration & Heat Pumps (-100°C to +200°C). Bridging the gap between physical thermodynamics and digital code.',
        'hero.cta': 'Explore My Tools',
        'hero.secondaryCta': 'Read Engineering Insights',
        
        // About
        'about.title': 'About',
        'about.headline': 'My Philosophy',
        'about.text1': 'Throughout my career at <strong class="company-name">Bingshan</strong>, <strong class="company-name">Snowman</strong>, and <strong class="company-name">Devotion</strong>, I\'ve witnessed the evolution of industrial refrigeration and the transition from coal-fired to heat pump systems.',
        'about.text2': 'I discovered that the ultimate path to solving complex engineering problems is not through memory, but through <strong>reusable algorithms</strong>.',
        'about.text3': 'I build this website not to showcase, but to <strong>deliver</strong>. I encapsulate my physical thermodynamics experience into Python and React, only to <em class="highlight-quote">eliminate that 1% of uncertainty on the engineering site</em>.',
        'about.matrix.1.label': 'Industry Experience',
        'about.matrix.1.value': 'Long-term',
        'about.matrix.1.sub': 'Leading Enterprises',
        'about.matrix.2.label': 'Core Domain',
        'about.matrix.2.value': 'Full Range',
        'about.matrix.2.sub': '-100°C ~ +200°C',
        'about.matrix.3.label': 'Delivery Tools',
        'about.matrix.3.value': 'Python / React',
        'about.matrix.3.sub': 'Algorithm Encapsulation',
        'about.matrix.4.label': 'Engineering Goal',
        'about.matrix.4.value': 'Eliminate Uncertainty',
        'about.matrix.4.sub': 'Digital Delivery',
        
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
        'apps.description': 'Publicly available tools with verifiable logic and real physics formulas',
        'apps.appOfc.title': 'Oil-Free Compressor Performance Calculator',
        'apps.appOfc.version': 'V9.0',
        'apps.appOfc.description': 'Comprehensive performance calculation tool for oil-free compressors with refrigeration, heat pump, gas compression, and MVR support',
        'apps.appOc.title': 'Oil-injected Compressor Calculator',
        'apps.appOc.version': 'V7.2.23',
        'apps.appOc.description': 'Performance calculation tool for oil-injected compressors with refrigeration, heat pump, gas compression, single-stage, two-stage, and ammonia heat pump support',
        'apps.appExp.title': 'Expander Performance Calculator',
        'apps.appExp.version': 'V7.2.0',
        'apps.appExp.description': 'Comprehensive performance calculation tool for expanders with ORC, steam, and gas expansion support',
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
        'apps.appFt.title': 'Flash Tank Expert',
        'apps.appFt.version': 'V1.0.0',
        'apps.appFt.description': 'Smart flash tank calculator for industrial refrigeration and heat pump systems',
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
        'apps.filter.all': 'All',
        'apps.filter.refrigeration': 'Refrigeration',
        'apps.filter.heatpump': 'Heat Pump',
        'apps.filter.general': 'General',
        
        // Disclaimer
        'disclaimer.title': 'Disclaimer',
        'disclaimer.text1': 'All applications are provided for personal research, educational, and public benefit purposes only on a non-commercial, free-to-use basis. For commercial use, please contact me in advance to obtain authorization.',
        'disclaimer.text2': 'Tools are provided "as is" without warranty of any kind. Use at your own risk.',
        
        // Contact
        'contact.title': 'Contact',
        'contact.email': 'Email',
        'contact.wechat': 'Contact',
        'contact.tab.saveContact': 'Save Contact',
        'contact.tab.wechat': 'WeChat',
        'contact.modal.headline': "Let's Connect",
        'contact.modal.scanToDownload': 'Save Full Contact Info (Bilingual & Verified).',
        'contact.modal.downloadVCard': 'Download vCard',
        'contact.modal.emailLabel': 'Email:',
        'contact.modal.companyBadge': '🏢 Guangzhou Devotion Thermal Technology (Stock: 300335)',
        'contact.modal.wechatHeadline': '微信扫一扫',
        
        // Partners
        'partners.title': 'Trusted Partners',
        
        // Testimonials
        'testimonials.text1': '"Solved a complex compressor vibration issue that AI models couldn\'t predict."',
        'testimonials.author1': '— Industrial Client, Germany',
        'testimonials.text2': '"Exceptional engineering judgment combined with practical digital solutions."',
        'testimonials.author2': '— Partner, Leading International Enterprise',
        
        // Insights
        'insights.title': 'Engineering Insights',
        'insights.article1.title': '5 Site Visits to Solve a "Mystery" Seizure: The -45°C Liquid Trap',
        'insights.article1.tag': 'Critical Troubleshooting',
        'insights.article1.date': 'Oct 2023',
        'insights.article1.excerpt': '<strong>Initial Diagnosis:</strong> Multiple large compressors seized and were initially blamed on manufacturing defects.<br/><br/><strong>Root Cause:</strong> After 5 site inspections, I traced the root cause not to the machine, but to the system: incidental liquid slugging caused by a flawed -45°C evaporator design.<br/><br/><strong>Resolution:</strong> We fixed the system, saving the compressors.',
        'insights.article1.readMore': 'Read Analysis',
        'insights.article2.title': 'Large Screw Compressor Seizure: Not "Oil Starvation", but "Deadly Stacking of Tolerance & Thermal Deformation"',
        'insights.article2.tag': 'Deep Failure Review',
        'insights.article2.date': 'Jun 2024',
        'insights.article2.excerpt': '<strong>Misconception:</strong> Normal oil level (60%+) ≠ effective lubrication. Simply replacing bearings cannot solve "critical friction".<br/><br/><strong>Truth:</strong> Deep disassembly revealed that <strong>a certain series of heavy-duty models</strong> under maximum tolerance combination, the male rotor engages the female rotor by approximately <strong>35μm</strong>. Combined with asymmetric oil supply at the suction end and thermal deformation, the sealing line collapses without an oil film.<br/><br/><strong>Conclusion:</strong> True repair must address both "reconstructing the tolerance chain from the manufacturing side" and "adding critical protection on the operational side".',
        'insights.article2.readMore': 'Read Analysis',
        'insights.article3.title': 'Beyond the Hype: The Real Moat is Extreme Testing (-40°C to +200°C)',
        'insights.article3.tag': 'Industry Outlook',
        'insights.article3.date': 'Sep 2025',
        'insights.article3.excerpt': '<strong>Claim:</strong> Everyone claims 160°C capability, but few can prove it.<br/><br/><strong>Reality:</strong> The future belongs to those who build CNAS-level infrastructure to verify R744/Steam systems under extreme load boundaries.<br/><br/><strong>Principle:</strong> Verification > Specification.',
        'insights.article3.readMore': 'Read Analysis',
        
        // Footer
        'footer.introTitle': 'Open Source Engineering. Connect with my Digital Twin.',
        'footer.copyright': '© {year} Jing Yanrong. Public Engineering Tools.',
        'footer.github': 'GitHub',
        'footer.techStack': 'Built with Vite & Vanilla JS',
        'footer.version': 'Version',
        'footer.privacy': 'Uses localStorage to save language preference. No personal data is collected or transmitted.',
        
        // Briefings section
        'briefings.title': 'AI Refrigeration & Heat Pump Briefings',
        'briefings.description': 'Auto-generated by Google Gemini, updated weekly',
        'briefings.domestic.title': 'AI Domestic Briefing',
        'briefings.international.title': 'AI International Briefing',
        'briefings.loading': 'Loading...',
        'briefings.error': 'Failed to load briefing. Please try again later.',
        'briefings.lastUpdate': 'Last updated: ',
        'briefings.refresh': 'Refresh',
        
        // About section additional
        'about.toggle.expand': 'View Full Resume',
        'about.toggle.collapse': 'Collapse Resume',
        'about.skills.title': 'Technical Skills',
        'about.skills.category.digital': 'Digital Tools',
        'about.skills.category.thermal': 'Thermal Engineering',
        'about.skills.industrialHeatPump': 'Industrial Heat Pump Design',
        'about.skills.refrigerationOptimization': 'Refrigeration System Optimization',
        'about.skills.gasCompression': 'Gas Compression Engineering',
        'about.skills.efficiencyAnalysis': 'Efficiency Analysis',
        
        // Resume sections
        'resume.education.title': 'Education & Qualifications',
        'resume.education.degree': 'Huazhong University of Science and Technology, Power Engineering Department | Refrigeration & Cryogenic Technology | Graduated 1998',
        'resume.education.pe': 'Registered Public Utility Equipment Engineer (Power) | 2014',
        'resume.education.senior': 'Senior Engineer (Refrigeration)',
        'resume.education.pressure': 'Pressure Vessel Review Certificate (Class D)',
        'resume.education.training': 'Sulzer (Winterthur, Switzerland) Centrifugal Compressor & Unit Training | March 2005',
        'resume.experience.title': 'Work Experience (Reverse Chronological)',
        'resume.experience.devotion': 'Guangzhou Devotion Thermal Technology Co., Ltd. | Technical Expert | June 2025 - Present',
        'resume.experience.devotion.desc1': 'Leading high-temperature heat pump R&D',
        'resume.experience.devotion.desc2': 'Leading high-temperature heat pump test center construction',
        'resume.experience.bingshan': 'Bingshan Cold & Heat Technology Co., Ltd. | Deputy Director of R&D Department & R&D Director, Pressure Vessel Technical Lead | Oct 2000 - May 2015; Mar 2021 - Apr 2025',
        'resume.experience.bingshan.desc1': 'CCUS compression unit design',
        'resume.experience.bingshan.desc2': 'Cascade and open ammonia heat pump design',
        'resume.experience.bingshan.desc3': 'Refrigeration unit design for clients including Dow Chemical, BASF',
        'resume.experience.bingshan.desc4': 'Series refrigeration unit planning and design',
        'resume.experience.bingshan.desc5': 'Falling film evaporator industry-academia collaboration',
        'resume.experience.bingshan.desc6': 'Wide temperature range industrial heat pump unit (30-200°C) R&D',
        'resume.experience.snowman': 'Fujian Snowman Co., Ltd. | Technical Deputy Director, Senior Engineer | May 2015 - Mar 2021',
        'resume.experience.snowman.desc1': 'Helium compression unit design and testing (lead)',
        'resume.experience.snowman.desc2': 'Eel farming heat pump design and promotion',
        'resume.experience.snowman.desc3': 'Ammonia heat pump domestic and international project applications',
        'resume.experience.snowman.desc4': 'CO₂ heat pump R&D',
        'resume.experience.snowman.desc5': 'ORC / WST expander generator applications and promotion',
        'resume.experience.wuhan': 'Wuhan New World Refrigeration Industry Co., Ltd. | Assistant Engineer | June 1998 - Oct 2000',
        'resume.experience.wuhan.desc1': 'Screw compressor unit design',
        'resume.skills.title': 'Skills',
        'resume.skills.software.title': 'Software Tools',
        'resume.skills.software.content': 'HTRI, ASPEN (chemical refrigeration heat exchanger calculations)',
        'resume.skills.systems.title': 'Systems & Equipment',
        'resume.skills.systems.content': 'Industrial refrigeration, industrial heat pump systems; Refrigeration gas-liquid separator calculations; Natural refrigerant (ammonia, CO₂) refrigeration/heating equipment design',
        'resume.skills.compressor.title': 'Compressors & Pressure Vessels',
        'resume.skills.compressor.content': 'Screw compressor profile, structure, capacity regulation understanding; Pressure vessel review (Class D)',
        'resume.skills.standards.title': 'Standards & Codes',
        'resume.skills.standards.content': 'ASHRAE 15, IIAR 2, GB/T 9237 and other refrigeration and heat pump related standards',
        'resume.skills.digital.title': 'Digital Tool Development (Python / React)',
        'resume.skills.digital.desc': 'Engineering calculation tool development, encapsulating physical thermodynamics experience into reusable algorithms',
        'resume.skills.digital.appOfc': 'Oil-Free Compressor Performance Calculator (V9.0) - Supports refrigeration, heat pump, gas compression, MVR',
        'resume.skills.digital.appOc': 'Oil-injected Compressor Calculator (V7.2.23) - Supports single-stage, cascade, two-stage, ammonia heat pump',
        'resume.skills.digital.appExp': 'Expander Performance Calculator (V7.2.0) - Supports ORC, steam, gas expansion',
        'resume.skills.digital.app0': 'Engineering Unit Converter (V2.0.0) - Fast and accurate unit conversion',
        'resume.skills.digital.app2': 'Industrial Heat Pump Matching Calculator (V7.0.0) - Supports MVR mode',
        'resume.skills.digital.app3': 'Heat Pump Benefit Analyzer (V9.0.0) - Comprehensive economic and environmental benefit analysis',
        'resume.skills.digital.appFt': 'Flash Tank Expert (V1.0.0) - Smart flash tank calculation'
    },
    zh: {
        'nav.brand': '荆炎荣 / Jing Yanrong',
        'nav.about': '关于',
        'nav.apps': '工具箱',
        'nav.insights': '工程洞察',
        'hero.title': '荆炎荣',
        'hero.badge': '✓ 注册公用设备工程师 · 真实经验',
        'hero.headline': '<span class="hero-headline-emphasis">{experienceYears} 年</span>工程积淀，封装为可计算的<span class="hero-headline-emphasis">决策工具</span>。',
        'hero.subheadline': '深耕工业制冷与热泵 (-100°C 至 +200°C)，用代码重构物理热力学，让经验数据化。',
        'hero.cta': '探索工具',
        'hero.secondaryCta': '阅读工程洞察',
        'about.title': '关于',
        'about.headline': '工程哲学',
        'about.text1': '在 <strong class="company-name">冰山冷热</strong>、<strong class="company-name">雪人股份</strong>、<strong class="company-name">迪森股份</strong> 的职业生涯中，见证了工业冷冻的发展历程，以及工业热能从燃煤到热泵的每一次迭代。',
        'about.text2': '实践证明，解决复杂工程问题的终极路径，不是靠记忆，而是靠<strong>可复用的算法</strong>。',
        'about.text3': '构建这个网站，不是为了展示，而是为了<strong>交付</strong>。将物理热力学的经验封装进 Python 和 React，只为<em class="highlight-quote">消除工程现场的那 1% 的不确定性</em>。',
        'about.matrix.1.label': '行业积淀',
        'about.matrix.1.value': '长期深耕',
        'about.matrix.1.sub': '头部企业',
        'about.matrix.2.label': '核心领域',
        'about.matrix.2.value': '全温域',
        'about.matrix.2.sub': '-100°C ~ +200°C',
        'about.matrix.3.label': '交付工具',
        'about.matrix.3.value': 'Python / React',
        'about.matrix.3.sub': '算法封装经验',
        'about.matrix.4.label': '工程目标',
        'about.matrix.4.value': '消除不确定性',
        'about.matrix.4.sub': '数字化交付',
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
        'apps.description': '公开可用的工具，具有可验证的逻辑和真实的物理公式',
        'apps.appOfc.title': '无油压缩机性能计算器',
        'apps.appOfc.version': 'V9.0',
        'apps.appOfc.description': '无油压缩机性能计算工具，支持制冷热泵、气体压缩、MVR等多种模式',
        'apps.appOc.title': '喷油螺杆压缩机计算器',
        'apps.appOc.version': 'V7.2.23',
        'apps.appOc.description': '喷油螺杆压缩机性能计算工具，支持制冷热泵、气体压缩、单级、复叠、单机双级、双机双级、氨热泵等模式',
        'apps.appExp.title': '膨胀机性能计算器',
        'apps.appExp.version': 'V7.2.0',
        'apps.appExp.description': '膨胀机综合性能计算工具，支持ORC、水蒸汽、气体膨胀等模式',
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
        'apps.appFt.title': '闪蒸罐计算专家',
        'apps.appFt.version': 'V1.0.0',
        'apps.appFt.description': '智能闪蒸罐计算工具，适用于工业制冷与热泵系统',
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
        'apps.filter.all': '全部',
        'apps.filter.refrigeration': '制冷类',
        'apps.filter.heatpump': '热泵类',
        'apps.filter.general': '通用类',
        'disclaimer.title': '免责声明',
        'disclaimer.text1': '所有应用仅供个人研究、教育和公益目的使用，以非商业、免费方式提供。如用于商业用途，请事先联系获得授权。',
        'disclaimer.text2': '工具按"现状"提供，不提供任何形式的保证，使用风险自负。',
        'contact.title': '联系方式',
        'contact.email': '邮箱',
        'contact.wechat': '联系方式',
        'contact.tab.saveContact': '保存联系人',
        'contact.tab.wechat': '微信',
        'contact.modal.headline': '让我们联系',
        'contact.modal.scanToDownload': '保存完整联系信息（双语 & 已验证）。',
        'contact.modal.downloadVCard': '下载 vCard',
        'contact.modal.emailLabel': '邮箱：',
        'contact.modal.companyBadge': '🏢 广州迪森热能技术股份有限公司（股票代码：300335）',
        'contact.modal.wechatHeadline': '微信扫一扫',
        
        // Partners
        'partners.title': '值得信赖的合作伙伴',
        
        // Testimonials
        'testimonials.text1': '"解决了一个AI模型无法预测的复杂压缩机振动问题。"',
        'testimonials.author1': '— 德国某工业客户',
        'testimonials.text2': '"卓越的工程判断力与实用的数字解决方案相结合。"',
        'testimonials.author2': '— 国际头部企业合作伙伴',
        
        // Insights
        'insights.title': '工程洞察',
        'insights.article1.title': '5次现场排查：终结 -45°C 液击"悬案"',
        'insights.article1.tag': '关键故障排查',
        'insights.article1.date': '2023年10月',
        'insights.article1.excerpt': '<strong>初步诊断：</strong>多台大型压缩机抱死，最初被归咎于制造缺陷。<br/><br/><strong>根因分析：</strong>经过 5 次现场检查，根因并非机器本身，而是系统：由有缺陷的 -45°C 蒸发器设计导致的偶发性液击。<br/><br/><strong>解决方案：</strong>修复系统后，压缩机得以保全。',
        'insights.article1.readMore': '阅读分析',
        'insights.article2.title': '大型螺杆机抱死真相：不是"缺油"，是"公差与热变形的死亡叠加"',
        'insights.article2.tag': '深度故障复盘',
        'insights.article2.date': '2024年6月',
        'insights.article2.excerpt': '<strong>误区：</strong>油位正常 (60%+) ≠ 有效润滑。单纯换轴承无法解决"临界摩擦"。<br/><br/><strong>真相：</strong>深度拆解发现，<strong>某系列重载机型</strong>在最大公差组合下，阳转子咬合阴转子约 <strong>35μm</strong>。叠加吸气端供油不对称与热变形，导致密封线在无油膜状态下崩塌。<br/><br/><strong>结论：</strong>真正的修复必须从"制造侧重构公差链"与"运行侧增加临界保护"双向入手。',
        'insights.article2.readMore': '阅读分析',
        'insights.article3.title': '超越炒作：真正的护城河是极端测试 (-40°C 至 +200°C)',
        'insights.article3.tag': '行业前瞻',
        'insights.article3.date': '2025年9月',
        'insights.article3.excerpt': '<strong>行业宣称：</strong>行业都在宣称 160°C 能力，但鲜有能证明者。<br/><br/><strong>现实情况：</strong>未来属于那些构建 CNAS 级基础设施以验证 R744/蒸汽系统在极端负载边界下的性能的团队。<br/><br/><strong>核心原则：</strong>验证 > 规格。',
        'insights.article3.readMore': '阅读分析',
        
        // Footer
        'footer.introTitle': '开源工程。连接数字孪生。',
        'footer.copyright': '© {year} 荆炎荣. Public Engineering Tools.',
        'footer.github': 'GitHub',
        'footer.techStack': 'Built with Vite & Vanilla JS',
        'footer.version': '版本',
        'footer.privacy': '使用本地存储保存语言偏好，不收集或传输任何个人数据。',
        
        // Briefings section
        'briefings.title': 'AI制冷热泵简报',
        'briefings.description': '由Google Gemini自动生成，每周更新',
        'briefings.domestic.title': 'AI国内制冷热泵简报',
        'briefings.international.title': 'AI国际制冷热泵简报',
        'briefings.loading': '加载中...',
        'briefings.error': '加载失败，请稍后重试。',
        'briefings.lastUpdate': '最后更新：',
        'briefings.refresh': '刷新',
        
        // About section additional
        'about.toggle.expand': '查看完整履历',
        'about.toggle.collapse': '收起履历',
        'about.skills.title': '专业技能',
        'about.skills.category.digital': '数字化工具',
        'about.skills.category.thermal': '热能工程',
        'about.skills.industrialHeatPump': '工业热泵设计',
        'about.skills.refrigerationOptimization': '制冷系统优化',
        'about.skills.gasCompression': '气体压缩工程',
        'about.skills.efficiencyAnalysis': '能效分析',
        
        // Resume sections
        'resume.education.title': '教育背景 / 资质',
        'resume.education.degree': '华中科技大学 动力系｜制冷与低温技术专业｜1998年毕业',
        'resume.education.pe': '注册公用设备工程师（动力）｜2014年',
        'resume.education.senior': '高级工程师（制冷专业）',
        'resume.education.pressure': '压力容器审核资格证书（D类）',
        'resume.education.training': '苏尔寿（瑞士温特图）离心压缩机及机组培训｜2005年3月',
        'resume.experience.title': '工作经历（倒序）',
        'resume.experience.devotion': '广州迪森热能技术股份有限公司｜技术专家｜2025.06–至今',
        'resume.experience.devotion.desc1': '主导高温热泵研发',
        'resume.experience.devotion.desc2': '主导高温热泵测试中心建设',
        'resume.experience.bingshan': '冰山冷热科技股份有限公司｜研发统括部副统括部长兼研发部长、压力容器技术负责人｜2000.10–2015.05；2021.03–2025.04',
        'resume.experience.bingshan.desc1': 'CCUS 增压机组设计',
        'resume.experience.bingshan.desc2': '复叠、开式氨热泵设计',
        'resume.experience.bingshan.desc3': '陶氏化学、巴斯夫等客户制冷机组设计',
        'resume.experience.bingshan.desc4': '系列制冷机组规划设计',
        'resume.experience.bingshan.desc5': '降膜蒸发器产学研',
        'resume.experience.bingshan.desc6': '宽温域工业热泵机组（30–200℃）研发',
        'resume.experience.snowman': '福建雪人股份有限公司｜技术副总监、高级工程师｜2015.05–2021.03',
        'resume.experience.snowman.desc1': '氦气压缩机组设计与测试（主导）',
        'resume.experience.snowman.desc2': '鳗鱼养殖热泵设计与推广',
        'resume.experience.snowman.desc3': '氨热泵国内外项目应用',
        'resume.experience.snowman.desc4': 'CO₂ 热泵研发',
        'resume.experience.snowman.desc5': 'ORC / WST 膨胀发电机应用与推广',
        'resume.experience.wuhan': '武汉新世界制冷工业有限公司｜助理工程师｜1998.06–2000.10',
        'resume.experience.wuhan.desc1': '螺杆压缩机组设计',
        'resume.skills.title': '技能',
        'resume.skills.software.title': '软件工具',
        'resume.skills.software.content': 'HTRI、ASPEN（化工制冷换热器计算）',
        'resume.skills.systems.title': '系统与设备',
        'resume.skills.systems.content': '工业制冷、工业热泵系统；制冷用气液分离器计算；天然工质（氨、CO₂）制冷/制热设备设计',
        'resume.skills.compressor.title': '压缩机与压力容器',
        'resume.skills.compressor.content': '螺杆压缩机型线、结构、能量调节理解；压力容器审核（D类）',
        'resume.skills.standards.title': '标准规范',
        'resume.skills.standards.content': 'ASHRAE 15、IIAR 2、GB/T 9237 等制冷与热泵相关标准',
        'resume.skills.digital.title': '数字化工具开发（Python / React）',
        'resume.skills.digital.desc': '工程计算工具开发，将物理热力学经验封装为可复用算法',
        'resume.skills.digital.appOfc': '无油压缩机性能计算器（V9.0）- 支持制冷、热泵、气体压缩、MVR',
        'resume.skills.digital.appOc': '喷油螺杆压缩机计算器（V7.2.23）- 支持单级、复叠、双级、氨热泵',
        'resume.skills.digital.appExp': '膨胀机性能计算器（V7.2.0）- 支持ORC、蒸汽、气体膨胀',
        'resume.skills.digital.app0': '工程单位换算器（V2.0.0）- 快速准确的单位转换',
        'resume.skills.digital.app2': '工业热泵匹配计算器（V7.0.0）- 支持MVR模式',
        'resume.skills.digital.app3': '热泵效益分析器（V9.0.0）- 经济与环境效益综合分析',
        'resume.skills.digital.appFt': '闪蒸罐计算专家（V1.0.0）- 智能闪蒸罐计算'
    }
};

// GitHub version checking removed to eliminate 404 errors
// Static versions are already defined in translations and will be used instead
// If you need dynamic version checking in the future, uncomment and configure the code below:
/*
// App repository configuration for version fetching
const appRepositories = {
    'app0': {
        repo: 'Engineering-Unit-Converter',
        owner: 'jingyanrong548-del'
    },
    'app2': {
        repo: 'Industrial-Heat-Pump-Matching-Calculator',
        owner: 'jingyanrong548-del'
    },
    'app3': {
        repo: 'heat-pump-analyzer-pro',
        owner: 'jingyanrong548-del'
    }
};

// Function to fetch version from GitHub API
async function fetchAppVersion(appKey) {
    // ... implementation ...
}

// Function to update app versions
async function updateAppVersions() {
    // ... implementation ...
}
*/

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
            // Handle production apps: apps.app0.title, apps.app1.title, apps.appOfc.title, etc.
            const appMatch = key.match(/apps\.app(.+?)\.title$/);
            if (appMatch) {
                const appKey = appMatch[1];
                const versionKey = `apps.app${appKey}.version`;
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
    
    // Update vCard download button and QR code based on language
    // 直接在这里更新，避免作用域问题
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
    
    // Update QR code - 使用URL方式指向.vcf文件，提高Android兼容性
    const vcardQRCodeImg = document.getElementById('vcard-qrcode');
    if (vcardQRCodeImg) {
        // 根据语言选择对应的.vcf文件URL
        const baseURL = window.location.origin;
        const vcardURL = lang === 'zh' 
            ? `${baseURL}/jingyanrong-zh.vcf`
            : `${baseURL}/jingyanrong-en.vcf`;
        
        // 先清空 src，强制浏览器重新加载
        vcardQRCodeImg.src = '';
        // 使用URL方式生成二维码，而不是直接嵌入vCard内容
        // 这样可以降低二维码密度，提高Android兼容性
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(vcardURL)}&t=${Date.now()}`;
        vcardQRCodeImg.src = qrCodeURL;
    }
}

// AI Briefings Management
const BRIEFINGS_STORAGE_KEY = 'ai_briefings_data';
const UPDATE_INTERVAL_DAYS = 7; // 每周更新
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Try different API endpoints and models (free tier compatible)
const GEMINI_API_ENDPOINTS = [
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
];

let currentApiEndpointIndex = 0;

// Prompt templates (optimized for token efficiency)
const PROMPTS = {
    domestic: `生成中国制冷热泵行业简报，300字，包含：
1.政策动态
2.技术创新
3.市场趋势
4.重点项目

要求：300字，专业，完整。`,
    international: `生成国际制冷热泵行业简报，300字，包含：
1.国际标准更新
2.全球技术趋势
3.国际市场动态
4.国际会议展会

要求：300字，专业，完整。`
};

// Generate briefing using Google Gemini API
async function generateBriefing(type) {
    if (!GEMINI_API_KEY) {
        console.error('Gemini API key is not configured');
        return null;
    }

    // Try each endpoint until one works
    let lastError = null;
    for (let i = currentApiEndpointIndex; i < GEMINI_API_ENDPOINTS.length; i++) {
        const apiUrl = GEMINI_API_ENDPOINTS[i];
        try {
            const prompt = PROMPTS[type];
            const response = await fetch(`${apiUrl}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        maxOutputTokens: 4000,
                        temperature: 0.7,
                        topP: 0.8,
                        topK: 40
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    errorData = { error: { message: errorText } };
                }
                const errorMessage = errorData.error?.message || `API error: ${response.status} ${response.statusText}`;
                
                // If this endpoint doesn't work, try the next one
                if (response.status === 404 && i < GEMINI_API_ENDPOINTS.length - 1) {
                    lastError = new Error(errorMessage);
                    continue;
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            // Check if response was truncated
            let finishReason = null;
            if (data.candidates && data.candidates[0]) {
                finishReason = data.candidates[0].finishReason;
                
                // Only log warnings for actual issues in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    if (finishReason === 'MAX_TOKENS') {
                        console.warn(`⚠️ Response was truncated due to MAX_TOKENS limit.`);
                    } else if (finishReason === 'SAFETY') {
                        console.warn(`⚠️ Response was blocked due to safety filters.`);
                    }
                }
            }
            
            // Try different possible response structures
            let content = null;
            if (data.candidates && data.candidates[0]) {
                if (data.candidates[0].content && data.candidates[0].content.parts) {
                    // Handle multiple parts (in case content is split)
                    const parts = data.candidates[0].content.parts;
                    content = parts.map(part => part.text || '').join('');
                } else if (data.candidates[0].content && data.candidates[0].content.text) {
                    content = data.candidates[0].content.text;
                }
            }
            
            // Fallback: try alternative response structure
            if (!content && data.text) {
                content = data.text;
            }
            
            if (!content || content.trim().length === 0) {
                throw new Error('No content received from API');
            }

            // Success! Save this endpoint for future use
            currentApiEndpointIndex = i;
            const trimmedContent = content.trim();
            
            return trimmedContent;
        } catch (error) {
            lastError = error;
            // If this is the last endpoint, throw the error
            if (i === GEMINI_API_ENDPOINTS.length - 1) {
                throw error;
            }
            // Otherwise, continue to next endpoint
            continue;
        }
    }
    
    // If we get here, all endpoints failed
    throw lastError || new Error('All API endpoints failed');
}

// Get stored briefings data
function getStoredBriefings() {
    try {
        const stored = localStorage.getItem(BRIEFINGS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error reading briefings from localStorage:', error);
        return null;
    }
}

// Save briefings data
function saveBriefings(data) {
    try {
        localStorage.setItem(BRIEFINGS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving briefings to localStorage:', error);
    }
}

// Check if briefing needs update
function needsUpdate(type, storedData) {
    if (!storedData || !storedData[type]) {
        return true;
    }

    const lastUpdate = storedData[type].timestamp;
    const daysSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24);
    
    return daysSinceUpdate >= UPDATE_INTERVAL_DAYS;
}

// Update briefing content
async function updateBriefing(type, force = false) {
    const contentElement = document.getElementById(`briefing-${type}-content`);
    const timeElement = document.getElementById(`briefing-${type}-time`);
    
    if (!contentElement || !timeElement) {
        return;
    }

    // Show loading state
    contentElement.innerHTML = `<div class="briefing-loading">${translations[currentLanguage]['briefings.loading'] || 'Loading...'}</div>`;

    const storedData = getStoredBriefings();
    
    // Check if update is needed
    if (!force && !needsUpdate(type, storedData)) {
        // Use cached data
        displayBriefing(type, storedData[type].content, storedData[type].timestamp);
        return;
    }

    try {
        // Generate new briefing
        const content = await generateBriefing(type);
        
        if (!content) {
            throw new Error('Failed to generate briefing');
        }

        // Save to storage
        const newData = {
            ...storedData,
            [type]: {
                content: content,
                timestamp: Date.now(),
                lastUpdate: new Date().toLocaleDateString()
            }
        };
        
        saveBriefings(newData);

        // Display briefing
        displayBriefing(type, content, Date.now());
    } catch (error) {
        console.error(`Error updating ${type} briefing:`, error);
        
        // Try to use cached data if available
        if (storedData && storedData[type] && storedData[type].content) {
            displayBriefing(type, storedData[type].content, storedData[type].timestamp);
            contentElement.innerHTML += `<div class="briefing-error" style="margin-top: 1rem; color: #EF4444; font-size: 0.875rem;">${translations[currentLanguage]['briefings.error'] || 'Failed to update'}</div>`;
        } else {
            contentElement.innerHTML = `<div class="briefing-error">${translations[currentLanguage]['briefings.error'] || 'Failed to load briefing'}</div>`;
            timeElement.textContent = '';
        }
    }
}

// Display briefing content
function displayBriefing(type, content, timestamp) {
    const contentElement = document.getElementById(`briefing-${type}-content`);
    const timeElement = document.getElementById(`briefing-${type}-time`);
    
    if (!contentElement || !timeElement) {
        return;
    }

    // Format content (preserve line breaks and structure)
    // Split by newlines, trim each line, but keep empty lines for spacing
    const lines = content.split('\n').map(line => line.trim());
    // Join with <br/>, but preserve paragraph breaks (double newlines)
    const formattedContent = lines
        .map((line, index) => {
            // If line is empty and previous line was also empty, it's a paragraph break
            if (line === '' && index > 0 && lines[index - 1] === '') {
                return '<br/><br/>';
            }
            // Convert markdown-style bold (**text**) to HTML
            const boldText = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            return boldText || '<br/>';
        })
        .filter((line, index) => {
            // Don't remove single empty lines (they create spacing)
            // Only remove consecutive empty lines beyond the first
            if (line === '<br/>' && index > 0 && lines[index - 1] === '') {
                return false;
            }
            return true;
        })
        .join('');
    
    contentElement.innerHTML = `<div class="briefing-text">${formattedContent}</div>`;

    // Format timestamp
    const date = new Date(timestamp);
    const dateStr = date.toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const lastUpdateText = translations[currentLanguage]['briefings.lastUpdate'] || 'Last updated: ';
    timeElement.textContent = lastUpdateText + dateStr;
}

// Initialize briefings
function initializeBriefings() {
    const storedData = getStoredBriefings();
    
    // Load cached data immediately if available
    if (storedData) {
        if (storedData.domestic) {
            displayBriefing('domestic', storedData.domestic.content, storedData.domestic.timestamp);
        }
        if (storedData.international) {
            displayBriefing('international', storedData.international.content, storedData.international.timestamp);
        }
    }

    // Check and update if needed
    updateBriefing('domestic');
    updateBriefing('international');
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
    
    // Set initial language
    setLanguage(currentLanguage);
    
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
    function generateVCardQRCodeURL(lang = currentLanguage) {
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
    updateVCardForLanguage(currentLanguage);
    
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

    // About section toggle functionality
    const aboutToggleBtn = document.getElementById('about-toggle-btn');
    const aboutDetails = document.getElementById('about-details');
    const toggleTextExpand = aboutToggleBtn?.querySelector('.toggle-text-expand');
    const toggleTextCollapse = aboutToggleBtn?.querySelector('.toggle-text-collapse');
    
    if (aboutToggleBtn && aboutDetails) {
        aboutToggleBtn.addEventListener('click', function() {
            const isExpanded = aboutDetails.style.display !== 'none';
            
            if (isExpanded) {
                aboutDetails.style.display = 'none';
                aboutToggleBtn.classList.remove('expanded');
                if (toggleTextExpand) toggleTextExpand.style.display = 'inline';
                if (toggleTextCollapse) toggleTextCollapse.style.display = 'none';
            } else {
                aboutDetails.style.display = 'block';
                aboutToggleBtn.classList.add('expanded');
                if (toggleTextExpand) toggleTextExpand.style.display = 'none';
                if (toggleTextCollapse) toggleTextCollapse.style.display = 'inline';
            }
        });
    }

    // Filter tabs functionality (placeholder for future filtering)
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Future: Add filtering logic here
        });
    });

    // Initialize AI Briefings
    initializeBriefings();

    // Refresh button handlers
    const refreshDomesticBtn = document.getElementById('refresh-domestic');
    const refreshInternationalBtn = document.getElementById('refresh-international');
    
    if (refreshDomesticBtn) {
        refreshDomesticBtn.addEventListener('click', function() {
            updateBriefing('domestic', true);
        });
    }
    
    if (refreshInternationalBtn) {
        refreshInternationalBtn.addEventListener('click', function() {
            updateBriefing('international', true);
        });
    }

    console.log('Personal homepage loaded successfully!');
});