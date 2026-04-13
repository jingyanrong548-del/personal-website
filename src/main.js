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
        'nav.briefings': 'Industry Briefings',
        'nav.insights': 'Engineering Insights',
        
        // Hero
        'hero.title': 'Jing Yanrong',
        'hero.badge': '✓ Licensed PE · Verifiable thermodynamics, not hype',
        'hero.headline': '{experienceYears}+ Years of Engineering Judgment, Built into Tools.',
        'hero.subheadline': 'Industrial refrigeration & heat pumps (−100°C to +200°C): electrified cold and heat, measurable decarbonization, and physics-first tools you can audit—bridging thermodynamics and code.',
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
        'about.matrix.2.sub': 'Electrified HP & cold · −100°C ~ +200°C',
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
        'apps.appAswt.title': 'Stratified Water Thermal Storage Calculator',
        'apps.appAswt.description': 'Industrial stratified water storage tank calculator: heat capacity and Richardson number from CoolProp properties',
        'apps.appRcc.title': 'Reciprocating Compressor Calculator (RCC Pro)',
        'apps.appRcc.description': 'Single-stage, cascade, two-stage, ammonia heat pump and gas compression calculation',
        'apps.appSeparator.title': 'Gas-Liquid Separator Sizing Calculator',
        'apps.appSeparator.description': 'Refrigeration vertical/horizontal, Surge Drum and steam vertical separator sizing',
        'apps.app0.title': 'Engineering Toolbox',
        'apps.app0.version': 'V2.1.0',
        'apps.app0.description': 'Unit conversion and engineering calculations',
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
        'apps.appTpc.title': 'Thermophysical Property — CoolProp',
        'apps.appTpc.description': 'CoolProp fluid thermophysical property query tool',
        'apps.appHpStd.title': 'Industrial Heat Pump Standard Quick Reference',
        'apps.appHpStd.description': 'Quick reference manual for industrial heat pump standards by category and status',
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
        'springFestival.greeting': 'Year of the Horse · AI-Powered · Pioneering Thermal Energy',
        'missionStrip.greeting': 'Electrified industrial cold & heat · Measurable decarbonization · Verifiable engineering in the AI era',
        'pillars.kicker': 'Decarbonization · Electrification · Verifiable AI',
        'pillars.title': 'Three themes for the heat-pump transition',
        'pillars.card1.title': 'Electrified process heat & cold',
        'pillars.card1.text': 'Heat pumps displacing fossil boilers and efficient electric-driven refrigeration—turning plant temperature needs into schedulable electrical loads.',
        'pillars.card2.title': 'Measurable decarbonization',
        'pillars.card2.text': 'Waste-heat recovery, system efficiency, and lower-GWP fluids together—stated as engineering metrics, not slogans.',
        'pillars.card3.title': 'AI × open, auditable tools',
        'pillars.card3.text': 'Beyond digital twins and controls, this site emphasizes formulas and reproducible logic—verification beats marketing.',
        'partners.tagline': 'Chemicals & materials · Equipment · Energy services & thermal engineering',
        'apps.zone.open': 'Open Zone',
        'apps.zone.invitation': 'Invitation-Only Zone',
        'apps.invitation.hint': 'Enter password to view the following tools',
        'apps.invitation.passwordPlaceholder': 'Password',
        'apps.invitation.unlock': 'Unlock',
        'apps.invitation.wrongPassword': 'Incorrect password',
        'apps.filter.empty': 'No tools in this category with the current view.',
        
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
        'partners.sectionLabel': 'CAREER FOOTPRINT & INDUSTRY EXPERIENCE',
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
        'footer.introTitle': 'Open tools for decarbonization and electrified thermal systems—physics you can inspect.',
        'footer.copyright': '© {year} Jing Yanrong. Public Engineering Tools.',
        'footer.github': 'GitHub',
        'footer.techStack': 'Built with Python & React by Jing Yanrong',
        'footer.version': 'Version',
        'footer.privacy': 'Uses localStorage to save language preference. No personal data is collected or transmitted.',
        
        // Briefings section
        'briefings.title': 'Refrigeration & Heat Pump Industry Briefings',
        'briefings.description': 'Manually curated, updated weekly',
        'briefings.weekTitle': 'Week {week} {year} Refrigeration & Heat Pump Industry Briefing',
        'briefings.domestic.title': 'Domestic News',
        'briefings.international.title': 'International News',
        'briefings.standards.title': 'Standards Update',
        'briefings.innovation.title': 'Technical Innovation',
        'briefings.standardsInnovation.title': 'Standards & Technical Innovation',
        'briefings.future.title': 'Upcoming Events',
        'briefings.lastUpdate': 'Last updated: ',
        'briefings.readMore': 'Read Full Report',
        'briefings.readLess': 'Collapse',
        'briefings.exhibitionTrends.sectionTitle': 'Recent major trade show trend notes',
        'briefings.exhibitionTrends.heatingTitle': 'China Heating Exhibition forum notes',
        'briefings.exhibitionTrends.source': 'China Heating Exhibition forum · Mar 31, 2026 · Beijing',
        'briefings.exhibitionTrendsCrh2026.title': 'China Refrigeration Expo 2026 (CRH 2026)',
        'briefings.exhibitionTrendsCrh2026.source': '37th China Refrigeration Expo · Apr 8–10, 2026 · Beijing (Capital International Convention & Exhibition Center)',
        'briefings.exhibitionTrendsCrh2026.intro': 'With dual-carbon goals deepening, heat pumps drew the most attention and their application scope widened sharply. Five themes distilled from exhibitors, forums, and industry–academia updates:',
        'briefings.exhibitionTrendsCrh2026.trend1.title': 'Trend 1: Industrial ultra-high-temperature steam heat pumps challenge conventional process heat',
        'briefings.exhibitionTrendsCrh2026.trend1.text': 'Industrial heat pumps are moving to large pressure ratios and 120–200°C steam/hot water, targeting boiler replacements. Beibingyang launched a 140°C centrifugal steam heat pump (high outlet temperature certified); Gree showed 120–200°C large-ratio cascade screw and centrifugal water-vapor compressors; Shenling’s lineup reaches 120–150°C steam, Midea presented 150°C steam-class centrifugal heat pump packages. Moon Environment and others integrate heat pumps with petrochemical distillation, brewing, and district cascade waste heat; the industrial heat & waste-heat recovery forum reinforced “using every joule of waste heat.”',
        'briefings.exhibitionTrendsCrh2026.trend2.title': 'Trend 2: HVAC and traditional thermal (combi boiler / water heater) majors share the stage',
        'briefings.exhibitionTrendsCrh2026.trend2.text': 'Beyond leading HVAC brands, Viessmann, Bosch, Vaillant, A.O. Smith, Rinnai, Vanward and other thermal majors exhibited prominently. A dedicated “heating & hot-water boiler G20 zone” and a northern clean-heating transition forum signaled gas-equipment vendors accelerating adoption of heat pumps and multi-energy mixes—cross-industry competition is heating up.',
        'briefings.exhibitionTrendsCrh2026.trend3.title': 'Trend 3: Hardware–software integration & AI-enabled integrated energy operations',
        'briefings.exhibitionTrendsCrh2026.trend3.text': 'Leaders are shifting from selling boxes to integrated energy and intelligent O&M: Midea Building Technologies ties products to the iBUILDING stack for edge-to-cloud synergy. Forums on green-factory smart energy and hospital energy efficiency, plus USST’s digital-twin smart plant room (AI across operating points, ~10–20% system-wide savings), highlight software and algorithms as differentiators.',
        'briefings.exhibitionTrendsCrh2026.trend4.title': 'Trend 4: Aluminum-for-copper cost relief & natural refrigerants in projects',
        'briefings.exhibitionTrendsCrh2026.trend4.text': 'The industry conference’s aluminum-for-copper track pushes aluminum in heat exchangers to ease material cost. Danfoss and partners showcased mobile CO₂ transcritical training rigs; Tianjin University of Commerce showed a CO₂ heat pump prototype; BJUT presented low-charge R290 finned-tube heat exchangers—accelerating natural refrigerants for safety and efficiency.',
        'briefings.exhibitionTrendsCrh2026.trend5.title': 'Trend 5: Industry–academia scenarios move into field validation',
        'briefings.exhibitionTrendsCrh2026.trend5.text': 'BJUT’s flue-gas deep-cooling cascade heat pump has run in Mentougou for over two years and entered small-batch trials. COLDNOT’s dual-source high-temperature heat pump (PVT / waste heat / air to ~150°C steam) and Beijing University of Civil Engineering’s PV DC-direct module (GaN, ~98–99% conversion) are advancing toward engineering validation.',
        'briefings.exhibitionTrendsCopenhagenHthp.title': '5th Copenhagen High-Temperature Heat Pump (HTHP) Symposium',
        'briefings.exhibitionTrendsCopenhagenHthp.source': '5th Copenhagen HTHP Symposium · Jan 21–22, 2026 · Copenhagen, Denmark',
        'briefings.exhibitionTrendsCopenhagenHthp.intro': 'The symposium distilled a clear industry consensus: the shift to industrial high-temperature heat pumps is underway—and it is unstoppable.',
        'briefings.exhibitionTrendsCopenhagenHthp.trend1.title': 'Trend 1: From “0→1” to “1→100” at scale',
        'briefings.exhibitionTrendsCopenhagenHthp.trend1.text': 'Roughly 37 vendors showcased new equipment ready for industrial deployment. Experts agree the technology side is mature; the next lever is product standardization to cut manufacturing cost and speed replication—aligned with keeping prototypes in R&D while business units drive standardization and volume production.',
        'briefings.exhibitionTrendsCopenhagenHthp.trend2.title': 'Trend 2: “Absolute reliability” is rule one in industry',
        'briefings.exhibitionTrendsCopenhagenHthp.trend2.text': 'Plant lines tolerate almost no fault: once started, the system must run without delay or slip. Equipment delivery and front-end business cases (e.g., seasonal SPF using rigorous methods such as VDI 4645) must be objective, precise, and conservative—trust is built on hard numbers.',
        'briefings.exhibitionTrendsCopenhagenHthp.trend3.title': 'Trend 3: Economics and market trust unlock adoption',
        'briefings.exhibitionTrendsCopenhagenHthp.trend3.text': 'What gets the plant manager’s signature is the business case: all-in electricity cost must beat fossil fuel on merit. Healthy competition as more suppliers enter is also building confidence across the segment.',
        'briefings.exhibitionTrendsCopenhagenHthp.trend4.title': 'Trend 4: Decarbonization is not reversible',
        'briefings.exhibitionTrendsCopenhagenHthp.trend4.text': 'Policy timing may vary by country, but energy security plus binding decarbonization goals mean industry’s turn toward high-temperature heat pumps will not roll back.',
        'briefings.exhibitionTrendsCopenhagenHthp.summary.title': 'In one sentence',
        'briefings.exhibitionTrendsCopenhagenHthp.summary.text': 'Technology is broadly “ready”; the next 1–2 years are decisive. Whoever delivers the most dependable products, standardizes one-off engineering the most, and makes the clearest economic case will win the largest projects in this irreversible market.',
        'briefings.exhibitionTrends.intro': 'Based on the Industrial Heat Pump Technology Innovation & Application Development Forum and the policy briefing held the same day, industry and R&D stakeholders highlighted the following themes.',
        'briefings.exhibitionTrends.trend1.title': 'Trend 1: Ultra-high temperature equipment & domestic core components',
        'briefings.exhibitionTrends.trend1.text': 'Industrial heat pumps are pushing past conventional temperature ceilings: two-stage magnetic levitation steam compressors at around 150°C are entering real projects, while R&D targets extend toward 200°C-class systems. The supply chain is focusing on domestic production and system matching for natural-refrigerant high-temperature compressors and cost-effective, efficient expanders.',
        'briefings.exhibitionTrends.trend2.title': 'Trend 2: Natural refrigerants & low-GWP fluids',
        'briefings.exhibitionTrends.trend2.text': 'Under Kigali and evolving PFAS-related policy expectations, refrigerant transition is a priority. Natural fluids (CO₂, water, ammonia) and low-GWP options such as R1233zd(E) are becoming mainstream directions for compressors and system design.',
        'briefings.exhibitionTrends.trend3.title': 'Trend 3: From stand-alone units to digital & intelligent O&M',
        'briefings.exhibitionTrends.trend3.text': 'Heat pumps are evolving from “static efficiency” to wide-range efficiency and intelligent coordination: digital twins and AI-based predictive maintenance support piping/pressure/temperature monitoring and dynamic efficiency optimization; control shifts from isolated operation to IoT-enabled system synergy. Full life-cycle management and VFD intelligent control are emphasized to address fouling, harsh conditions, and oversizing.',
        'briefings.exhibitionTrends.trend4.title': 'Trend 4: Integrated heating & cooling and multi-energy coupling',
        'briefings.exhibitionTrends.trend4.text': 'To tackle capex and single-service efficiency limits, “same-source” heating–cooling integration is gaining traction—for example CO₂ transcritical systems supplying steam or high-temperature water while recovering cooling duty, with demonstration projects showing major energy savings and emissions cuts. Heat pumps will also couple more deeply with solar and industrial waste heat for plant-wide energy cycling.',
        
        // About section additional
        'about.toggle.expand': 'View Full Resume',
        'about.toggle.collapse': 'Collapse Resume',
        'resume.password.title': 'Enter password to view full resume',
        'resume.password.placeholder': 'Password',
        'resume.password.confirm': 'Confirm',
        'resume.password.cancel': 'Cancel',
        'resume.password.wrong': 'Incorrect password',
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
        'resume.skills.digital.app0': 'Engineering Toolbox (V2.1.0) - Unit conversion and engineering calculations',
        'resume.skills.digital.app2': 'Industrial Heat Pump Matching Calculator (V7.0.0) - Supports MVR mode',
        'resume.skills.digital.app3': 'Heat Pump Benefit Analyzer (V9.0.0) - Comprehensive economic and environmental benefit analysis',
        'resume.skills.digital.appFt': 'Flash Tank Expert (V1.0.0) - Smart flash tank calculation'
    },
    zh: {
        'nav.brand': '荆炎荣 / Jing Yanrong',
        'nav.about': '关于',
        'nav.apps': '工具箱',
        'nav.briefings': '行业简报',
        'nav.insights': '工程洞察',
        'hero.title': '荆炎荣',
        'hero.badge': '✓ 注册公用设备工程师 · 物理可验证，拒绝空泛智能',
        'hero.headline': '<span class="hero-headline-emphasis">{experienceYears} 年</span>工程积淀，沉淀为可计算的<span class="hero-headline-emphasis">决策工具</span>。',
        'hero.subheadline': '工业制冷与热泵（−100°C 至 +200°C）：冷热电气化、可度量的脱碳路径，以及可审计的物理工具——在热力学与代码之间建立可验证闭环。',
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
        'about.matrix.2.sub': '冷热电气化 · −100°C ~ +200°C',
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
        'apps.appAswt.title': '工业级分层水蓄热罐计算应用',
        'apps.appAswt.description': '输入罐体与工况参数，基于 CoolProp 物性计算储热量与里查德森数，评估分层稳定性',
        'apps.appRcc.title': '开启活塞压缩机计算 (RCC Pro)',
        'apps.appRcc.description': '制冷热泵、气体压缩、单级、复叠、单机双级、双机双级、氨热泵等模式',
        'apps.appSeparator.title': '气液分离器选型计算器',
        'apps.appSeparator.description': '制冷立式/卧式、Surge Drum 校验、水蒸汽立式气液分离器选型',
        'apps.app0.title': '工程工具箱',
        'apps.app0.version': 'V2.1.0',
        'apps.app0.description': '单位换算·工程计算',
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
        'apps.appTpc.title': 'Thermophysical Property — CoolProp 物性查询',
        'apps.appTpc.description': '基于 CoolProp 的流体热物性查询工具',
        'apps.appHpStd.title': '工业热泵标准速查手册',
        'apps.appHpStd.description': '按标准分类与实施状态速查工业热泵相关标准',
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
        'springFestival.greeting': '马年奔腾 · AI 赋能 · 开创冷热事业新篇章',
        'missionStrip.greeting': '电气化工业冷热 · 可度量脱碳 · AI 年代的可验证工程',
        'pillars.kicker': '脱碳 · 电气化 · 可验证 AI',
        'pillars.title': '工业热泵时代的三条主线',
        'pillars.card1.title': '电气化供热与冷端',
        'pillars.card1.text': '热泵替代化石锅炉、高效电驱动制冷，把工业温区需求变成可调度、可优化的电力负荷。',
        'pillars.card2.title': '可度量的脱碳路径',
        'pillars.card2.text': '余热回收、系统能效与低 GWP 冷媒协同，用工程指标而非口号描述减排与运行边界。',
        'pillars.card3.title': 'AI × 开源可审计',
        'pillars.card3.text': '数字孪生与智控之外，本站工具强调物理公式与可复现逻辑——验证优先于营销话术。',
        'partners.tagline': '化工与材料 · 高端装备 · 能源服务与冷热工程',
        'apps.zone.open': '开放区',
        'apps.zone.invitation': '邀请开放区',
        'apps.invitation.hint': '输入密码后可查看以下工具',
        'apps.invitation.passwordPlaceholder': '请输入密码',
        'apps.invitation.unlock': '解锁',
        'apps.invitation.wrongPassword': '密码错误',
        'apps.filter.empty': '当前分类下没有可见工具（请切换分类或解锁邀请区）。',
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
        'partners.sectionLabel': '职业足迹与行业经验',
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
        'footer.introTitle': '面向脱碳与电气化热工系统的开源工具——可检视的物理，而非口号。',
        'footer.copyright': '© {year} 荆炎荣. Public Engineering Tools.',
        'footer.github': 'GitHub',
        'footer.techStack': 'Built with Python & React by Jing Yanrong',
        'footer.version': '版本',
        'footer.privacy': '使用本地存储保存语言偏好，不收集或传输任何个人数据。',
        
        // Briefings section
        'briefings.title': '制冷热泵行业简报',
        'briefings.description': '每周更新，手工整理',
        'briefings.weekTitle': '{year}年第{week}周制冷热泵行业简报',
        'briefings.domestic.title': '国内动态',
        'briefings.international.title': '国外动态',
        'briefings.standards.title': '标准动态',
        'briefings.innovation.title': '技术创新',
        'briefings.standardsInnovation.title': '标准动态与技术创新',
        'briefings.future.title': '未来重要事项',
        'briefings.lastUpdate': '最后更新：',
        'briefings.readMore': '阅读全文 (Read Report)',
        'briefings.readLess': '收起',
        'briefings.exhibitionTrends.sectionTitle': '近期重大展会趋势观察',
        'briefings.exhibitionTrends.heatingTitle': '中国供热展论坛观察',
        'briefings.exhibitionTrends.source': '中国供热展论坛 · 2026年3月31日 · 北京',
        'briefings.exhibitionTrendsCrh2026.title': '2026中国制冷展（CRH 2026）',
        'briefings.exhibitionTrendsCrh2026.source': '第三十七届中国制冷展 · 2026年4月8–10日 · 北京首都国际会展中心',
        'briefings.exhibitionTrendsCrh2026.intro': '双碳战略深化背景下，热泵成为全场最受关注的产品线，应用边界明显拓宽。综合展商、论坛与产学研动态，可归纳为五条主线。',
        'briefings.exhibitionTrendsCrh2026.trend1.title': '趋势一：工业超高温蒸汽热泵冲击传统工业用热',
        'briefings.exhibitionTrendsCrh2026.trend1.text': '工业热泵向大压比、120–200℃ 级蒸汽/热水延伸，直指锅炉类存量替代。北冰洋发布 140℃ 高温离心蒸汽热泵（高温出水已获权威认证）；格力展示 120–200℃ 大压比复叠螺杆与离心水蒸气压缩；申菱矩阵覆盖 120–150℃ 出汽，美的公开 150℃ 蒸汽级离心热泵联合机组。冰轮等将热泵耦合石化精馏、酿酒与区域梯级余热；“工业用热及余热回收技术论坛”强化废热吃干榨尽。',
        'briefings.exhibitionTrendsCrh2026.trend2.title': '趋势二：暖通与热能（锅炉/壁挂炉）巨头同台',
        'briefings.exhibitionTrendsCrh2026.trend2.text': '除美的、格力等暖通龙头外，菲斯曼、博世、威能、A.O.史密斯、林内、万和等传统热能品牌悉数参展；展会设“采暖热水炉 G20 专区”，并举办北方清洁供热转型论坛——传统燃气设备商加速拥抱热泵与多能互补，跨界竞争加剧。',
        'briefings.exhibitionTrendsCrh2026.trend3.title': '趋势三：软硬一体与 AI 综合能源运营',
        'briefings.exhibitionTrendsCrh2026.trend3.text': '龙头由卖设备转向综合能源与智控服务：美的以 iBUILDING 贯通产品与边缘—云端协同；绿色工厂智慧能源、医院节能运维论坛及上海理工“数字孪生机房”智慧控制（全工况 AI 驱动，系统综合节能约 10%–20%）凸显软件与算法溢价。',
        'briefings.exhibitionTrendsCrh2026.trend4.title': '趋势四：铝代铜降本与天然冷媒工程化',
        'briefings.exhibitionTrendsCrh2026.trend4.text': '信息大会暨“铝代铜”论坛推动换热器以铝代铜、缓解成本压力；丹佛斯等与高校推出 CO₂ 跨临界移动实训装置，天津商大 CO₂ 热泵样机、北工大 R290 小充注翅片换热器等，加速天然工质应用与安全性、能效提升。',
        'briefings.exhibitionTrendsCrh2026.trend5.title': '趋势五：产学研场景方案进入工程验证',
        'briefings.exhibitionTrendsCrh2026.trend5.text': '北工大烟气深冷梯级回收热泵在北京门头沟示范已逾两年并小批量试产；佧诺双源高温热泵（PVT/余热/空气能协同至 150℃ 蒸汽）、北建大光伏直流直驱模块（GaN，直驱效率约 98%–99%）等迈向工程验证阶段。',
        'briefings.exhibitionTrendsCopenhagenHthp.title': '第五届哥本哈根高温热泵（HTHP）研讨会',
        'briefings.exhibitionTrendsCopenhagenHthp.source': '第五届哥本哈根高温热泵（HTHP）研讨会 · 2026年1月21–22日 · 哥本哈根',
        'briefings.exhibitionTrendsCopenhagenHthp.intro': '核心观点可浓缩为一条行业共识：工业高温热泵的转型已经开始，且势不可挡。',
        'briefings.exhibitionTrendsCopenhagenHthp.trend1.title': '趋势一：从「0→1」到「1→100」的大规模落地',
        'briefings.exhibitionTrendsCopenhagenHthp.trend1.text': '会上约有 37 家企业展出了可直投工业现场的新设备；专家认为设备端技术已就绪，接下来要通过产品标准化显著降本、加速项目复制与推广——与将样机研发留在研究院、由业务部门推进标准化与规模化生产的路径相吻合。',
        'briefings.exhibitionTrendsCopenhagenHthp.trend2.title': '趋势二：「绝对可靠」是工业应用的第一法则',
        'briefings.exhibitionTrendsCopenhagenHthp.trend2.text': '产线对设备容错极低，「按下启动键就必须无延迟、无差池地运转」。交付设备与出具前端经济分析时（如采用 VDI 4645 等高精度方法评估季节性 SPF），须客观、精准、不掺水分，用扎实数据建立客户信任。',
        'briefings.exhibitionTrendsCopenhagenHthp.trend3.title': '趋势三：商业破局靠经济账与市场信任',
        'briefings.exhibitionTrendsCopenhagenHthp.trend3.text': '最终让厂长签字的是经济账：使用侧综合电力成本能否明显低于化石燃料是根本驱动力；同时更多厂商入局带来的良性竞争，正在快速构筑整个赛道的信任度。',
        'briefings.exhibitionTrendsCopenhagenHthp.trend4.title': '趋势四：脱碳大势不可逆转',
        'briefings.exhibitionTrendsCopenhagenHthp.trend4.text': '各国政策或有松紧，但在能源安全与刚性脱碳目标双重压力下，工业界向高温热泵转向的大方向已难回头。',
        'briefings.exhibitionTrendsCopenhagenHthp.summary.title': '一句话结论',
        'briefings.exhibitionTrendsCopenhagenHthp.summary.text': '高温热泵在技术层面已「Ready」；未来 1–2 年是关键期——谁能把产品做得最稳、把非标工程尽量「标准化」、把经济账算得最明白，谁就更有机会在这不可逆的市场里拿下大单。',
        'briefings.exhibitionTrends.intro': '综合《工业热泵技术创新及应用发展论坛》与工业热泵领域政策宣贯会资料，产业与产学研代表释放的主线信号如下。',
        'briefings.exhibitionTrends.trend1.title': '趋势一：超高温化与核心零部件自主化',
        'briefings.exhibitionTrends.trend1.text': '工业热泵正快速突破传统温度上限：150℃ 级超高温双级磁悬浮水蒸汽压缩机等已进入工程视野，前沿研发目标指向 200℃ 级系统。产业链将集中力量攻克自然工质高温压缩机、低成本高效膨胀装置等关键部件的国产化与系统匹配问题。',
        'briefings.exhibitionTrends.trend2.title': '趋势二：天然工质与低 GWP 制冷剂加速切换',
        'briefings.exhibitionTrends.trend2.text': '在《蒙特利尔议定书》基加利修正案与 PFAS 等合成工质监管预期下，制冷剂替代成为焦点。二氧化碳、水、氨等天然工质，以及 R1233zd(e) 等低 GWP 方案，将成为压缩机与系统研发的主流方向。',
        'briefings.exhibitionTrends.trend3.title': '趋势三：从单机设备到数字化与智能运维',
        'briefings.exhibitionTrends.trend3.text': '热泵正从“静态高效”走向宽域高效与智能协同：数字孪生、AI 预测性维护用于管路/压力/温度监测与能效动态优化；控制上由独立运行转向物联网支撑的系统协同。全生命周期管理与变频智能控制亦被强调，以缓解结垢、极端工况与“大马拉小车”等工程痛点。',
        'briefings.exhibitionTrends.trend4.title': '趋势四：冷热一体化与多能耦合',
        'briefings.exhibitionTrends.trend4.text': '针对初投资与单一供热（冷）效率瓶颈，“冷热同源一体化”设计被视作破局路径：例如 CO₂ 跨临界装备在供蒸汽/高温水同时回收冷量，示范项目中可实现显著节能与减排。热泵还将与太阳能及工业余热深度耦合，推动体系内能量循环利用。',
        
        // About section additional
        'about.toggle.expand': '查看完整履历',
        'about.toggle.collapse': '收起履历',
        'resume.password.title': '输入密码查看完整履历',
        'resume.password.placeholder': '请输入密码',
        'resume.password.confirm': '确认',
        'resume.password.cancel': '取消',
        'resume.password.wrong': '密码错误',
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
        'resume.skills.digital.app0': '工程工具箱（V2.1.0）- 单位换算·工程计算',
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
    // Count available apps (all app-card elements in #apps section, including both zones)
    const appCount = document.querySelectorAll('#apps .app-card').length;
    
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
    
    // Update briefing content when language changes
    displayBriefing();
    refreshAppsFilterFromUI();
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
// 8. 在 future 和 futureEn 数组中分别添加或修改"未来重要事项"的中英文条目
//
// 注意：每个数组项是一个字符串，会自动显示为列表项。中英文数组的条目数量应该对应。
const briefingData = {
    year: 2026,
    week: 15,
    updateDate: '2026-04-12',
    subtitle: '制冷展收官与工业脱碳热泵焦点；冷媒 LRM 与无油离心；液冷合规与 AHRI 严寒标定；Q2 交付与大宗成本',
    subtitleEn: 'CRH 2026 wrap & industrial-decarbonization HP focus; refrigerant LRM & oil-free centrifugal; liquid-cooling compliance & AHRI cold-climate ratings; Q2 delivery & commodity cost pressure',
    domestic: [
        '中国制冷展重磅收官：第37届中国制冷展（CRH 2026）于4月8日-10日在北京圆满落幕。今年展会主打“数智塑冷暖 零碳启新程”，展览面积达11.5万平方米。除常规机组外，面向工业脱碳的超高温热泵、大型数智化冷水机组以及全热交换系统成为全场关注焦点。',
        '研发组织架构变革提速：面对技术竞争加剧与海外交期压力，业内正兴起流程优化热潮。部分跨区域实体制造企业加速成立专项“研发创新部门”，理顺从总部研发评审到异地工厂量产的技术闭环，以打通堵点、提升跨部门协作效率。'
    ],
    domesticEn: [
        'China Refrigeration Expo Wraps: The 37th China Refrigeration Expo (CRH 2026) closed Apr 8–10 in Beijing under the theme “Digital intelligence shapes cold & heat; zero carbon opens a new journey,” with 115,000 m² of floorspace. Beyond conventional units, ultra-high-temperature heat pumps for industrial decarbonization, large digital chillers, and total heat-exchange systems drew the most attention.',
        'R&D Org Shifts Accelerate: Facing tougher technology competition and overseas lead-time pressure, many firms are streamlining processes. Some multi-site manufacturers are standing up dedicated “R&D innovation” teams to close the loop from HQ design review to remote-factory ramp—clearing handoff bottlenecks and improving cross-functional collaboration.'
    ],
    international: [
        '冷媒全生命周期管理（LRM）成海外门槛：在本周“臭氧气候技术（O2C）”高级别圆桌会上，联合国相关机构释放明确信号：为落实基加利修正案，海外市场除要求出厂设备采用低 GWP 环保冷媒外，还将对冷媒“全生命周期数字化追踪”与综合能效提出捆绑式硬性考核。',
        '无油离心技术冲击高端商用：面向商用冷水机组与大系统，盖瑞特（Garrett）等外资巨头展示了专为环保冷媒优化的“全无油离心式压缩技术”。取消润滑油系统后设备体积约减半，长期能效与免维护优势突出，正成为角逐欧美高端公建项目的关键卖点。'
    ],
    internationalEn: [
        'Refrigerant LRM as an Export Barrier: At this week’s high-level Ozone2Climate Technology (O2C) roundtable, UN bodies signaled that to implement the Kigali Amendment, overseas markets will tie low-GWP charge at shipment to mandatory digital lifecycle tracking of refrigerant and holistic efficiency performance.',
        'Oil-Free Centrifugal in Premium Commercial: For large chillers and plant-scale systems, Garrett and other majors showcased oil-free centrifugal compression tuned for lower-GWP fluids. Removing the lube circuit cuts footprint roughly in half while lifting long-run efficiency and service intervals—a strong lever in premium public-building bids in Europe and North America.'
    ],
    standards: [
        '算力中心冷却“立规矩”：随 AI 算力带动的液冷市场加速合规化。Intertek 等国际检测机构本周集中解析数据中心风冷、液冷设备的最新安全标准与北美准入要求，对跨界进入高密度机房散热赛道的厂商而言已成为必修课。'
    ],
    standardsEn: [
        'Data-Center Cooling Standards Firm Up: As AI drives liquid cooling, compliance is tightening. Intertek and peers briefed the industry this week on the latest safety standards and North American market entry rules for air- and liquid-cooled data-center equipment—essential homework for newcomers chasing high-density rack cooling.'
    ],
    innovation: [
        '严寒热泵标定规则收紧：针对北美极寒采暖场景，AHRI 进一步细化“热泵低温切入/切出温度”的第三方实测与标定方法。出海热泵在宣称极寒性能（如 -30℃ 运行）时需具备更扎实的数据支撑以应对抽检。'
    ],
    innovationEn: [
        'Cold-Climate HP Ratings Get Stricter: For severe North American heating, AHRI refined third-party test and rating methods for heat-pump low-temperature cut-in/cut-out behavior. Exporters claiming extreme-cold performance (e.g., −30 °C operation) need stronger evidence to survive spot checks.'
    ],
    future: [
        '展后订单转化与产能冲刺：国内开年三大展会（HPE、供热展、制冷展）已收官，行业重心正从“展台展示”转向客户跟进与 Q2 交付抢单。',
        '大宗物料涨价预警：铜等核心原材料价格持续高位震荡，建议研发与采购密切联动，在项目匹配与系统设计中提前落实成本与替代预案。'
    ],
    futureEn: [
        'From Expo Buzz to Q2 Execution: With HPE, ISH China, and CRH 2026 behind us, the focus shifts from booth presence to customer follow-up and Q2 delivery push.',
        'Commodity Cost Alert: Copper and other key materials remain volatile at elevated levels—R&D and procurement should align early on project costing and design substitutions.'
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

    // Update title
    const weekTitle = translations[currentLanguage]['briefings.weekTitle']
        .replace('{year}', briefingData.year)
        .replace('{week}', briefingData.week);
    titleElement.textContent = weekTitle;

    // Update subtitle (optional)
    if (subtitleElement) {
        const subtitle = currentLanguage === 'zh' ? (briefingData.subtitle || '') : (briefingData.subtitleEn || '');
        if (subtitle) {
            subtitleElement.textContent = subtitle;
            subtitleElement.style.display = 'block';
        } else {
            subtitleElement.style.display = 'none';
        }
    }

    // Select content based on current language
    const domesticItems = currentLanguage === 'zh' ? briefingData.domestic : briefingData.domesticEn;
    const internationalItems = currentLanguage === 'zh' ? briefingData.international : briefingData.internationalEn;
    const standardsItems = currentLanguage === 'zh' ? briefingData.standards : briefingData.standardsEn;
    const innovationItems = currentLanguage === 'zh' ? briefingData.innovation : briefingData.innovationEn;
    const futureItems = currentLanguage === 'zh' ? briefingData.future : briefingData.futureEn;
    
    // Build full content HTML
    let fullHtml = '';
    
    // Domestic section
    fullHtml += `<div class="briefing-section">
        <h4 class="briefing-section-title" data-i18n="briefings.domestic.title">${translations[currentLanguage]['briefings.domestic.title']}</h4>
        <ul class="briefing-list">`;
    domesticItems.forEach(item => {
        fullHtml += `<li class="briefing-item">${item}</li>`;
    });
    fullHtml += `</ul></div>`;

    // International section
    fullHtml += `<div class="briefing-section">
        <h4 class="briefing-section-title" data-i18n="briefings.international.title">${translations[currentLanguage]['briefings.international.title']}</h4>
        <ul class="briefing-list">`;
    internationalItems.forEach(item => {
        fullHtml += `<li class="briefing-item">${item}</li>`;
    });
    fullHtml += `</ul></div>`;

    // Standards & Technical Innovation (merged section)
    const standardsInnovationItems = [...standardsItems, ...innovationItems];
    if (standardsInnovationItems.length > 0) {
        fullHtml += `<div class="briefing-section">
            <h4 class="briefing-section-title" data-i18n="briefings.standardsInnovation.title">${translations[currentLanguage]['briefings.standardsInnovation.title']}</h4>
            <ul class="briefing-list">`;
        standardsInnovationItems.forEach(item => {
            fullHtml += `<li class="briefing-item">${item}</li>`;
        });
        fullHtml += `</ul></div>`;
    }

    // Future events section
    fullHtml += `<div class="briefing-section">
        <h4 class="briefing-section-title" data-i18n="briefings.future.title">${translations[currentLanguage]['briefings.future.title']}</h4>
        <ul class="briefing-list">`;
    futureItems.forEach(item => {
        fullHtml += `<li class="briefing-item">${item}</li>`;
    });
    fullHtml += `</ul></div>`;

    contentElement.innerHTML = fullHtml;

    // Build preview content (first 150 characters or first 3 key points)
    let previewHtml = '';
    const allItems = [...domesticItems, ...internationalItems, ...standardsItems, ...innovationItems, ...futureItems];
    
    // Extract first 3 key points
    const keyPoints = allItems.slice(0, 3);
    previewHtml += '<ul class="briefing-preview-list">';
    keyPoints.forEach(item => {
        // Truncate each item to 150 characters if needed
        const truncatedItem = item.length > 150 ? item.substring(0, 150) + '...' : item;
        previewHtml += `<li class="briefing-preview-item">${truncatedItem}</li>`;
    });
    previewHtml += '</ul>';

    previewElement.innerHTML = previewHtml;

    // Format update date
    const updateDate = new Date(briefingData.updateDate);
    const dateStr = updateDate.toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const lastUpdateText = translations[currentLanguage]['briefings.lastUpdate'] || 'Last updated: ';
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
        aboutDetails.style.display = 'block';
        aboutToggleBtn.classList.add('expanded');
        if (toggleTextExpand) toggleTextExpand.style.display = 'none';
        if (toggleTextCollapse) toggleTextCollapse.style.display = 'inline';
    }

    function collapseResumeSection() {
        if (!aboutDetails || !aboutToggleBtn) return;
        aboutDetails.style.display = 'none';
        aboutToggleBtn.classList.remove('expanded');
        if (toggleTextExpand) toggleTextExpand.style.display = 'inline';
        if (toggleTextCollapse) toggleTextCollapse.style.display = 'none';
    }

    function openResumePasswordModal() {
        if (!resumePasswordOverlay || !resumePasswordInput) return;
        resumePasswordOverlay.setAttribute('aria-hidden', 'false');
        resumePasswordOverlay.classList.add('is-open');
        resumePasswordInput.value = '';
        if (resumePasswordError) resumePasswordError.style.display = 'none';
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
                resumePasswordError.style.display = 'block';
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
            const isExpanded = aboutDetails.style.display !== 'none';
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
            const isExpanded = briefingFull.style.display !== 'none';
            
            if (isExpanded) {
                // Collapse
                briefingPreview.style.display = 'block';
                briefingFull.style.display = 'none';
                if (readMoreText) readMoreText.style.display = 'inline';
                if (readLessText) readLessText.style.display = 'none';
                if (readMoreIcon) readMoreIcon.style.transform = 'rotate(0deg)';
                briefingReadMoreBtn.classList.remove('expanded');
            } else {
                // Expand
                briefingPreview.style.display = 'none';
                briefingFull.style.display = 'block';
                if (readMoreText) readMoreText.style.display = 'none';
                if (readLessText) readLessText.style.display = 'inline';
                if (readMoreIcon) readMoreIcon.style.transform = 'rotate(180deg)';
                briefingReadMoreBtn.classList.add('expanded');
            }
        });
    }

    console.log('Personal homepage loaded successfully!');
});