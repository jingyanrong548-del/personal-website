/**
 * Generate Engineering Services hub chapters aligned with IEA HPT Annex 58 Tasks 1–5.
 * Run: node scripts/generate-services-annex58.mjs
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { siteNav } from './site-nav.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const nav = siteNav({ depth: 0, brand: 'link' });

/** @type {const} */
const CHAPTERS = [
  {
    id: 'technologies',
    file: 'services-technologies.html',
    js: 'servicesTechnologies.js',
    prefix: 'svcT1',
    task: '1',
    svg: 't1',
    en: {
      seoTitle: 'Task 1 · Technologies — Engineering services',
      seoDesc: 'Industrial HTHP technology screening aligned with IEA HPT Annex 58 Task 1: state of the art, components, TRL, and selection filters for process heat above 100 °C.',
      kicker: 'Engineering services · Annex 58 Task 1',
      pageTitle: 'Technologies',
      lede: 'Aligned with <strong>IEA HPT Annex 58 Task 1 — Technologies</strong>: map commercially available and near-market high-temperature heat pumps, components, and working fluids before any purchase narrative. This page turns that state-of-the-art lens into an <strong>independent screening service</strong>.',
      toc: ['Annex 58 lens', 'Technology map', 'What we deliver', 'Checklist', 'Other duties', 'FAQ'],
      figCaption: 'Task 1 flow: inventory → TRL / lift band → shortlist. Schematic only—see official Annex 58 Task 1 report for the technology catalogue.',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 1 lens',
          lede: 'Task 1 documents state-of-the-art systems and components for HTHP process heat—what exists now versus what is still R&D.',
          r1t: 'Supply temperature ambition',
          r1: 'Annex 58 focuses on useful heat <strong>above ~100 °C</strong> toward ~200 °C bands where fossil fuel still dominates. Screening starts with sink temperature and lift—not a brand preference.',
          r2t: 'Systems and components',
          r2: 'Compressors, heat exchangers, lubricants, and working fluids each have temperature ceilings. Task 1-style reviews separate <em>catalogue claims</em> from <em>proven envelopes</em>.',
          r3t: 'Official reading',
          r3: 'Primary source: <a href="https://heatpumpingtechnologies.org/project58/" target="_blank" rel="noopener noreferrer">HPT Project 58</a> Task 1 report. Work continues in spirit under <a href="https://heatpumpingtechnologies.org/project68/" target="_blank" rel="noopener noreferrer">Project 68</a>.',
        },
        map: {
          title: '2 · Technology map for projects',
          lede: 'We translate Task 1 catalogues into a project-specific filter: lift, capacity, refrigerant class, and TRL.',
          r1t: 'Closed HTHP vs steam / MVR',
          r1: 'Closed vapour-compression HTHPs and open steam recompression solve different interfaces—Task 1 inventories both families; we keep them distinct in shortlists.',
          r2t: 'Near-market vs deployable',
          r2: 'Pilot-only architectures stay labelled as such. Capex decisions should not treat a lab prototype as a drop-in skid.',
        },
        deliver: {
          title: '3 · Advisory deliverables',
          lede: 'Independent technology memo—not an OEM brochure collage.',
          r1t: 'Outputs',
          r1: 'Shortlist with rejected options, envelope table, refrigerant / PED flags, and open questions for OEM RFQs.',
        },
        checklist: {
          title: '4 · Screening checklist',
          items: [
            'Sink / source temperatures (min–design–max)',
            'Required lift and capacity band',
            'Working-fluid and site code constraints',
            'TRL / reference plants for each candidate',
            'Component temperature limits (oil, seals, HX)',
            'RFQ questions tied to Task 1 evidence gaps',
          ],
        },
        other: {
          title: '5 · Other heat-pump duties',
          text: 'Comfort and commercial refrigeration technology screens are shorter. Annex 58 depth applies to <strong>industrial process heat</strong>; other duties get a light callout only.',
        },
        faq: [
          ['Is this a copy of Annex 58?', 'No. We cite Annex 58 as the public technology frame; the service is project-specific screening and RFQ hygiene.'],
          ['Do you sell equipment?', 'No. Independent advisory—OEMs remain the suppliers.'],
        ],
      },
      related: 'Next: process integration → <a href="./services-integration.html">Task 2 · Integration</a>. Cycles primer: <a href="./knowledge-cycles.html">Cycles</a>. HTHP column: <a href="./hthp-column.html">Industrial HTHP</a>.',
    },
    zh: {
      seoTitle: 'Task 1 · 技术与部件 — 工程服务',
      seoDesc: '对齐 IEA HPT Annex 58 Task 1 的工业高温热泵技术筛选：现状、部件、TRL 与 100℃以上工艺用热选型过滤。',
      kicker: '工程服务 · Annex 58 Task 1',
      pageTitle: '技术与部件',
      lede: '对齐 <strong>IEA HPT Annex 58 Task 1 — Technologies</strong>：在采购叙事之前，先摸清可商用与近市场高温热泵、部件与工质。本页把该「技术现状」视角落成<strong>独立筛选服务</strong>。',
      toc: ['Annex 58 视角', '技术地图', '服务交付', '检查清单', '其它工况', 'FAQ'],
      figCaption: 'Task 1 流程：盘点 → TRL/抬升带 → 短名单。示意导向——完整技术目录见 Annex 58 Task 1 正式报告。',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 1 视角',
          lede: 'Task 1 梳理高温热泵系统与部件的现状——哪些已可部署，哪些仍在研发。',
          r1t: '供热温度志向',
          r1: 'Annex 58 聚焦约 <strong>100℃以上</strong>、迈向约 200℃ 仍大量依赖化石燃料的区间。筛选从热汇温度与抬升开始——不是品牌偏好。',
          r2t: '系统与部件',
          r2: '压缩机、换热器、润滑油与工质各有温度天花板。Task 1 式审阅区分<em>样本宣称</em>与<em>已验证包络</em>。',
          r3t: '正式读物',
          r3: '主来源：<a href="https://heatpumpingtechnologies.org/project58/" target="_blank" rel="noopener noreferrer">HPT Project 58</a> Task 1 报告。后续工作在精神上延续至 <a href="https://heatpumpingtechnologies.org/project68/" target="_blank" rel="noopener noreferrer">Project 68</a>。',
        },
        map: {
          title: '2 · 项目技术地图',
          lede: '把 Task 1 目录译成项目过滤器：抬升、容量、工质类别与 TRL。',
          r1t: '闭式 HTHP vs 蒸汽/MVR',
          r1: '闭式蒸汽压缩高温热泵与开式蒸汽再压缩解决不同接口——Task 1 两者都盘点；短名单里保持分家。',
          r2t: '近市场 vs 可部署',
          r2: '仅试点架构必须贴标签。投资决策不能把实验室样机当成即插即用撬块。',
        },
        deliver: {
          title: '3 · 顾问交付物',
          lede: '独立技术备忘——不是厂商彩页拼贴。',
          r1t: '产出',
          r1: '含否决项的短名单、包络表、工质/压力容器提示，以及面向 OEM 询价的未决问题。',
        },
        checklist: {
          title: '4 · 筛选清单',
          items: [
            '热汇/热源温度（最低–设计–最高）',
            '所需抬升与容量带',
            '工质与现场规范约束',
            '候选方案的 TRL / 参考业绩',
            '部件温度限值（油、密封、换热器）',
            '绑定 Task 1 证据缺口的询价问题',
          ],
        },
        other: {
          title: '5 · 其它热泵工况',
          text: '舒适与商用制冷技术筛选更短。Annex 58 深度用于<strong>工业工艺用热</strong>；其它工况仅作轻量提示。',
        },
        faq: [
          ['这是照搬 Annex 58 吗？', '不是。Annex 58 是公开技术框架；服务是项目级筛选与询价卫生。'],
          ['卖设备吗？', '不卖。独立顾问——供货仍是 OEM。'],
        ],
      },
      related: '下一步：工艺集成 → <a href="./services-integration.html">Task 2 · 集成概念</a>。循环：<a href="./knowledge-cycles.html">循环导读</a>。高温热泵：<a href="./hthp-column.html">工业高温热泵</a>。',
    },
  },
  {
    id: 'integration',
    file: 'services-integration.html',
    js: 'servicesIntegration.js',
    prefix: 'svcT2',
    task: '2',
    svg: 't2',
    en: {
      seoTitle: 'Task 2 · Integration concepts — Engineering services',
      seoDesc: 'Process integration concepts for industrial HTHPs aligned with IEA HPT Annex 58 Task 2: best-practice coupling to steam, hot water, and selected processes.',
      kicker: 'Engineering services · Annex 58 Task 2',
      pageTitle: 'Integration concepts',
      lede: 'Aligned with <strong>Annex 58 Task 2 — Integration concepts</strong>: best-practice ways to couple heat pumps to process heat sinks (steam, hot water, drying, etc.). The service turns those concepts into <strong>site-specific integration sketches and battery limits</strong>.',
      toc: ['Annex 58 lens', 'Integration patterns', 'What we deliver', 'Checklist', 'Other duties', 'FAQ'],
      figCaption: 'Task 2 idea: process unit ↔ thermal coupling ↔ HTHP skid. Not a P&ID—orientation only.',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 2 lens',
          lede: 'Task 2 develops best-practice integration concepts for promising industrial applications—not generic “put a heat pump somewhere”.',
          r1t: 'Application cases',
          r1: 'Steam generation, hot-water loops, and sector examples (e.g. drying) need different coupling templates. We start from process duty, then pick a pattern.',
          r2t: 'Beyond the box',
          r2: 'Annex 58 stresses process integration: reboilers, dryers, and heat cascades matter as much as unit COP.',
          r3t: 'Official reading',
          r3: 'See Task 2 report on <a href="https://heatpumpingtechnologies.org/project58/about-the-project/" target="_blank" rel="noopener noreferrer">Project 58</a>.',
        },
        map: {
          title: '2 · Integration patterns we use',
          lede: 'Translate Task 2 ideas into drawable battery limits for your plant.',
          r1t: 'Direct sink vs intermediate loop',
          r1: 'Choose direct process coupling or a buffer / intermediate circuit based on fouling, pressure, and control ownership.',
          r2t: 'Heat cascade & surplus heat',
          r2: 'Map available sources against sinks before sizing compressors—Task 2 logic in plant language.',
        },
        deliver: {
          title: '3 · Advisory deliverables',
          lede: 'Concept package ready for EPC / OEM dialogue.',
          r1t: 'Outputs',
          r1: 'Block-flow + battery-limit sketch, interface list, instrumentation gaps, and risks that kill the concept.',
        },
        checklist: {
          title: '4 · Integration checklist',
          items: [
            'Process P&ID snippets for candidate nodes',
            'Source and sink simultaneous availability',
            'Chosen coupling pattern with rejected alternatives',
            'OEM vs site scope (battery limits)',
            'Control / safety ownership',
            'Next gate: survey measurements or Task 3 roadmap',
          ],
        },
        other: {
          title: '5 · Other duties',
          text: 'Building HVAC integration is thinner (hydronic headers, defrost). Annex 58 Task 2 depth stays on <strong>industrial process coupling</strong>.',
        },
        faq: [
          ['Do you replace the EPC?', 'No. We frame concepts and interfaces; EPC owns detailed design and construction.'],
          ['How early should Task 2 thinking start?', 'Before OEM quotes—quotes without a coupling story become change-order machines.'],
        ],
      },
      related: 'Next: conversion strategy → <a href="./services-transition.html">Task 3 · Transition</a>. Piping: <a href="./knowledge-piping.html">Piping</a>.',
    },
    zh: {
      seoTitle: 'Task 2 · 集成概念 — 工程服务',
      seoDesc: '对齐 IEA HPT Annex 58 Task 2 的工业高温热泵集成概念：蒸汽、热水与典型工艺的最佳实践耦合。',
      kicker: '工程服务 · Annex 58 Task 2',
      pageTitle: '集成概念',
      lede: '对齐 <strong>Annex 58 Task 2 — Integration concepts</strong>：把热泵接到蒸汽、热水、干燥等工艺热汇的最佳实践。服务把这些概念落成<strong>现场集成草图与供货边界</strong>。',
      toc: ['Annex 58 视角', '集成模式', '服务交付', '检查清单', '其它工况', 'FAQ'],
      figCaption: 'Task 2 思路：工艺单元 ↔ 热耦合 ↔ 高温热泵撬块。非 P&ID——仅作导向。',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 2 视角',
          lede: 'Task 2 针对有前景的工业应用发展最佳实践集成概念——不是笼统「随便放一台热泵」。',
          r1t: '应用案例',
          r1: '蒸汽发生、热水回路与行业示例（如干燥）需要不同耦合模板。从工艺负荷出发，再选模式。',
          r2t: '超越机箱',
          r2: 'Annex 58 强调过程集成：再沸器、干燥机与热级联，重要性不亚于机组 COP。',
          r3t: '正式读物',
          r3: '见 <a href="https://heatpumpingtechnologies.org/project58/about-the-project/" target="_blank" rel="noopener noreferrer">Project 58</a> Task 2 报告。',
        },
        map: {
          title: '2 · 我们使用的集成模式',
          lede: '把 Task 2 思想译成可画的供货边界。',
          r1t: '直接热汇 vs 中间回路',
          r1: '按结垢、压力与控制权属，选择直接耦合或缓冲/中间回路。',
          r2t: '热级联与余热',
          r2: '在定压缩机之前对齐可用热源与热汇——用工厂语言讲 Task 2 逻辑。',
        },
        deliver: {
          title: '3 · 顾问交付物',
          lede: '可进入 EPC/OEM 对话的概念包。',
          r1t: '产出',
          r1: '方块流 + 供货边界草图、接口清单、测点缺口，以及会杀死概念的风险。',
        },
        checklist: {
          title: '4 · 集成清单',
          items: [
            '候选节点的工艺 P&ID 片段',
            '热源与热汇同时可用时段',
            '已选耦合模式及否决项',
            'OEM vs 现场范围（供货边界）',
            '控制 / 安全权属',
            '下一关：补测或 Task 3 路线图',
          ],
        },
        other: {
          title: '5 · 其它工况',
          text: '建筑暖通集成更薄（水路总管、化霜）。Annex 58 Task 2 深度仍在<strong>工业过程耦合</strong>。',
        },
        faq: [
          ['是否取代 EPC？', '否。我们框定概念与接口；详细设计与施工仍归 EPC。'],
          ['Task 2 思维要多早？', '在 OEM 报价之前——没有耦合故事的报价会变成变更单制造机。'],
        ],
      },
      related: '下一步：转型策略 → <a href="./services-transition.html">Task 3 · 应用与转型</a>。管路：<a href="./knowledge-piping.html">管路系统</a>。',
    },
  },
  {
    id: 'transition',
    file: 'services-transition.html',
    js: 'servicesTransition.js',
    prefix: 'svcT3',
    task: '3',
    svg: 't3',
    en: {
      seoTitle: 'Task 3 · Applications & transition — Engineering services',
      seoDesc: 'Industrial conversion strategies to HTHP-based process heat aligned with IEA HPT Annex 58 Task 3.',
      kicker: 'Engineering services · Annex 58 Task 3',
      pageTitle: 'Applications & transition',
      lede: 'Aligned with <strong>Annex 58 Task 3 — Applications and transition</strong>: strategies that help end-users move from fossil process heat toward heat-pump-based supply. The service is a <strong>phased transition roadmap</strong>, not a single-skid sales pitch.',
      toc: ['Annex 58 lens', 'Roadmap logic', 'What we deliver', 'Checklist', 'Other duties', 'FAQ'],
      figCaption: 'Task 3 idea: baseline → priority processes → pilots → scale. Orientation schematic.',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 3 lens',
          lede: 'Task 3 supports conversion strategies—where HTHPs fit in a site decarbonisation path and in which order.',
          r1t: 'End-user guidance',
          r1: 'Guidelines help owners structure decisions: which processes first, what data to collect, how to stage investment.',
          r2t: 'Beyond one machine',
          r2: 'Transition mixes technology (Task 1), integration (Task 2), and organisation—procurement, metering, and skills.',
          r3t: 'Official reading',
          r3: 'Task 3 report via <a href="https://heatpumpingtechnologies.org/project58/" target="_blank" rel="noopener noreferrer">Project 58</a>.',
        },
        map: {
          title: '2 · Roadmap logic we apply',
          lede: 'Turn Annex 58 strategy language into a dated plan for your plant.',
          r1t: 'Heat-demand segmentation',
          r1: 'Split &lt;100 °C, 100–150 °C, 150–200 °C bands; match to technology readiness from Task 1.',
          r2t: 'Pilot then scale',
          r2: 'Pick one measurable node, prove duty points, then replicate—avoid enterprise-wide guesses.',
        },
        deliver: {
          title: '3 · Advisory deliverables',
          lede: 'Board-readable roadmap with engineering guts.',
          r1t: 'Outputs',
          r1: 'Priority matrix, 3–5 year phases, data gaps, and links to Task 4 specification work for the first pilot.',
        },
        checklist: {
          title: '4 · Transition checklist',
          items: [
            'Site heat & fuel baseline',
            'Process list ranked by temperature / hours / CO₂',
            'Pilot node with success metrics',
            'Organisation owners (energy / process / capex)',
            'Policy / incentive scan (non-legal)',
            'Link to Task 2 concept and Task 4 specs',
          ],
        },
        other: {
          title: '5 · Other duties',
          text: 'Building electrification roadmaps exist, but Annex 58 Task 3 is written for <strong>industrial process heat conversion</strong>.',
        },
        faq: [
          ['Is this a carbon audit?', 'It can use audit data, but the product is a heat-pump transition sequence—not a full GHG inventory.'],
          ['What if fossil boilers must stay?', 'Roadmaps often keep peaking / backup boilers—say so explicitly (Task 3 realism).'],
        ],
      },
      related: 'Next: specs & testing → <a href="./services-specs.html">Task 4 · Specs</a>. Policies: <a href="./heat-pump-standards.html#policies">Policies</a>.',
    },
    zh: {
      seoTitle: 'Task 3 · 应用与转型 — 工程服务',
      seoDesc: '对齐 IEA HPT Annex 58 Task 3：工业向高温热泵工艺供热转型的策略与路线图。',
      kicker: '工程服务 · Annex 58 Task 3',
      pageTitle: '应用与转型',
      lede: '对齐 <strong>Annex 58 Task 3 — Applications and transition</strong>：帮助终端用户从化石工艺热转向热泵供热的策略。服务是<strong>分阶段转型路线图</strong>，不是单撬销售话术。',
      toc: ['Annex 58 视角', '路线图逻辑', '服务交付', '检查清单', '其它工况', 'FAQ'],
      figCaption: 'Task 3 思路：基线 → 优先工艺 → 试点 → 放大。示意导向。',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 3 视角',
          lede: 'Task 3 支持转化策略——高温热泵落在工厂脱碳路径的何处、以何顺序推进。',
          r1t: '终端用户指南',
          r1: '指南帮助业主组织决策：先做哪些工艺、收集什么数据、如何分期投资。',
          r2t: '超越一台机器',
          r2: '转型混合技术（Task 1）、集成（Task 2）与组织——采购、计量与技能。',
          r3t: '正式读物',
          r3: 'Task 3 报告见 <a href="https://heatpumpingtechnologies.org/project58/" target="_blank" rel="noopener noreferrer">Project 58</a>。',
        },
        map: {
          title: '2 · 我们采用的路线图逻辑',
          lede: '把 Annex 58 策略语言变成带日期的工厂计划。',
          r1t: '热需求分段',
          r1: '划分 &lt;100℃、100–150℃、150–200℃ 区间；对照 Task 1 技术成熟度。',
          r2t: '先试点再放大',
          r2: '选一个可测节点，证明工况点，再复制——避免全厂拍脑袋。',
        },
        deliver: {
          title: '3 · 顾问交付物',
          lede: '董事会可读、内里有工程筋骨的路线图。',
          r1t: '产出',
          r1: '优先级矩阵、3–5 年阶段、数据缺口，以及首个试点链到 Task 4 规格工作。',
        },
        checklist: {
          title: '4 · 转型清单',
          items: [
            '工厂热与燃料基线',
            '按温度/小时/CO₂ 排序的工艺清单',
            '带成功指标的试点节点',
            '组织责任人（能源/工艺/投资）',
            '政策/激励扫描（非正式法律意见）',
            '链接 Task 2 概念与 Task 4 规格',
          ],
        },
        other: {
          title: '5 · 其它工况',
          text: '建筑电气化路线图另有语境；Annex 58 Task 3 写的是<strong>工业工艺热转型</strong>。',
        },
        faq: [
          ['这是碳盘查吗？', '可用盘查数据，但产品是热泵转型顺序——不是完整 GHG 清单。'],
          ['若必须保留化石锅炉？', '路线图常保留调峰/备用锅炉——写清楚（Task 3 现实主义）。'],
        ],
      },
      related: '下一步：规格与测试 → <a href="./services-specs.html">Task 4 · 规格</a>。政策：<a href="./heat-pump-standards.html#policies">政策解读</a>。',
    },
  },
  {
    id: 'specs',
    file: 'services-specs.html',
    js: 'servicesSpecs.js',
    prefix: 'svcT4',
    task: '4',
    svg: 't4',
    en: {
      seoTitle: 'Task 4 · Specs & testing — Engineering services',
      seoDesc: 'Defining and testing industrial HTHP specifications aligned with IEA HPT Annex 58 Task 4—for commercial projects.',
      kicker: 'Engineering services · Annex 58 Task 4',
      pageTitle: 'Specs & testing',
      lede: 'Aligned with <strong>Annex 58 Task 4 — Definition and testing of HP specifications</strong>: recommendations for writing and verifying specifications in commercial projects. The service builds <strong>measurable envelopes, acceptance points, and test plans</strong>. <em>Not legal advice.</em>',
      toc: ['Annex 58 lens', 'Spec hygiene', 'What we deliver', 'Checklist', 'Other duties', 'FAQ'],
      figCaption: 'Task 4 idea: written envelope ↔ instruments ↔ FAT/SAT evidence. Orientation only.',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 4 lens',
          lede: 'Task 4 publishes guidelines so buyers and sellers share a common language for HTHP specs and tests.',
          r1t: 'End-user checklists',
          r1: 'National teams contributed checklists for collecting planning data—exactly the hygiene commercial projects need.',
          r2t: 'Test what you wrote',
          r2: 'Specifications without a test method are theatre. Task 4 links definition to verification.',
          r3t: 'Official reading',
          r3: 'Task 4 report on <a href="https://heatpumpingtechnologies.org/project58/about-the-project/" target="_blank" rel="noopener noreferrer">Project 58</a>.',
        },
        map: {
          title: '2 · Spec hygiene for plants',
          lede: 'Translate Task 4 into contract-ready engineering language.',
          r1t: 'Duty points & exclusions',
          r1: '2–3 contractual points with tolerances, fouling allowances, and void conditions.',
          r2t: 'FAT / SAT / field logs',
          r2: 'Decide what is proven in factory vs site; name contractual meters.',
        },
        deliver: {
          title: '3 · Advisory deliverables',
          lede: 'Spec annex + test outline for counsel / procurement to formalise.',
          r1t: 'Outputs',
          r1: 'Envelope table, acceptance procedure outline, instrument hierarchy, and open risks.',
        },
        checklist: {
          title: '4 · Specs & testing checklist',
          items: [
            'Duty table annexed to inquiry / contract',
            'Guarantee conditions and exclusions',
            'Named contractual instruments',
            'FAT / SAT responsibility split',
            'Retest / cure path before damages language',
            'Counsel review for formal wording',
          ],
        },
        other: {
          title: '5 · Other duties',
          text: 'Comfort warranties still need climate-bin language; cold stores need product temperature. Annex 58 Task 4 depth targets <strong>industrial HTHP commercial projects</strong>.',
        },
        faq: [
          ['Is this legal advice?', 'No—engineering risk language for you and your counsel.'],
          ['Most common failure?', 'Guaranteeing catalogue COP at a site temperature nobody measured.'],
        ],
      },
      related: 'Next: dissemination → <a href="./services-dissemination.html">Task 5 · Dissemination</a>. Standards: <a href="./heat-pump-standards.html">Tools &amp; standards</a>.',
    },
    zh: {
      seoTitle: 'Task 4 · 规格与测试 — 工程服务',
      seoDesc: '对齐 IEA HPT Annex 58 Task 4：商业项目中高温热泵规格的定义与测试建议。',
      kicker: '工程服务 · Annex 58 Task 4',
      pageTitle: '规格与测试',
      lede: '对齐 <strong>Annex 58 Task 4 — Definition and testing of HP specifications</strong>：在商业项目中书写并验证规格的建议。服务产出<strong>可测包络、验收点与试验计划</strong>。<em>非正式法律意见。</em>',
      toc: ['Annex 58 视角', '规格卫生', '服务交付', '检查清单', '其它工况', 'FAQ'],
      figCaption: 'Task 4 思路：书面包络 ↔ 仪表 ↔ FAT/SAT 证据。仅作导向。',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 4 视角',
          lede: 'Task 4 发布指南，让买卖双方对高温热泵规格与试验有共同语言。',
          r1t: '终端用户清单',
          r1: '各国团队贡献了收集规划数据的清单——正是商业项目需要的卫生。',
          r2t: '写什么测什么',
          r2: '没有试验方法的规格是表演。Task 4 把定义与验证绑在一起。',
          r3t: '正式读物',
          r3: 'Task 4 报告见 <a href="https://heatpumpingtechnologies.org/project58/about-the-project/" target="_blank" rel="noopener noreferrer">Project 58</a>。',
        },
        map: {
          title: '2 · 工厂规格卫生',
          lede: '把 Task 4 译成可进合同的工程语言。',
          r1t: '工况点与除外',
          r1: '2–3 个合同点带公差、结垢裕量与失效条件。',
          r2t: 'FAT / SAT / 现场记录',
          r2: '分清工厂与现场证明什么；具名合同表计。',
        },
        deliver: {
          title: '3 · 顾问交付物',
          lede: '规格附件 + 试验提纲，供律师/采购形式化。',
          r1t: '产出',
          r1: '包络表、验收程序提纲、表计层级与未闭合风险。',
        },
        checklist: {
          title: '4 · 规格与测试清单',
          items: [
            '负荷表作为询价/合同附件',
            '担保条件与除外',
            '具名合同仪表',
            'FAT / SAT 责任划分',
            '违约金语言前的整改复测路径',
            '正式措辞经律师审阅',
          ],
        },
        other: {
          title: '5 · 其它工况',
          text: '舒适质保仍需气候分区语言；冷库要产品温度。Annex 58 Task 4 深度针对<strong>工业高温热泵商业项目</strong>。',
        },
        faq: [
          ['这是法律意见吗？', '不是——给你和律师用的工程风险语言。'],
          ['最常见失败？', '按从未测到的现场温度去担保样本 COP。'],
        ],
      },
      related: '下一步：传播与赋能 → <a href="./services-dissemination.html">Task 5 · 传播</a>。标准：<a href="./heat-pump-standards.html">工具与标准</a>。',
    },
  },
  {
    id: 'dissemination',
    file: 'services-dissemination.html',
    js: 'servicesDissemination.js',
    prefix: 'svcT5',
    task: '5',
    svg: 't5',
    en: {
      seoTitle: 'Task 5 · Dissemination — Engineering services',
      seoDesc: 'Stakeholder communication and capability building for industrial HTHP projects, aligned with IEA HPT Annex 58 Task 5 Dissemination.',
      kicker: 'Engineering services · Annex 58 Task 5',
      pageTitle: 'Dissemination',
      lede: 'Aligned with <strong>Annex 58 Task 5 — Dissemination</strong>: sharing findings with manufacturers, end-users, consultants, planners, and policy audiences. On this site, the service is <strong>technical exchange, training outlines, and decision briefings</strong> that keep owners, EPC, and OEM aligned.',
      toc: ['Annex 58 lens', 'Stakeholder map', 'What we deliver', 'Checklist', 'Other duties', 'FAQ'],
      figCaption: 'Task 5 idea: evidence → audiences → formats (workshop / brief / review). Orientation schematic.',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 5 lens',
          lede: 'Task 5 packaged webinars, reports, and magazine pieces so HTHP knowledge leaves the Annex and reaches practitioners.',
          r1t: 'Many audiences',
          r1: 'Annex 58 explicitly names manufacturers, end-users, consultants, energy planners, and policy makers—each needs a different cut of the same physics.',
          r2t: 'Continuity',
          r2: 'Annex 58 is complete; dissemination continues via Project 68 and national channels. We point readers to primary sources.',
          r3t: 'Official hub',
          r3: '<a href="https://heatpumpingtechnologies.org/annex58/" target="_blank" rel="noopener noreferrer">Annex 58 homepage</a> · <a href="https://heatpumpingtechnologies.org/project58/" target="_blank" rel="noopener noreferrer">Project 58</a>.',
        },
        map: {
          title: '2 · Stakeholder map for projects',
          lede: 'Use Task 5 thinking inside a live project—not only conferences.',
          r1t: 'Owner · EPC · OEM',
          r1: 'Shared duty table, frozen assumptions, and a short diagnostic agenda beat slide tourism.',
          r2t: 'Internal capability',
          r2: 'Training outlines for operators and energy teams so Task 4 acceptance knowledge survives demobilisation.',
        },
        deliver: {
          title: '3 · Advisory deliverables',
          lede: 'Communication artefacts tied to Tasks 1–4 evidence.',
          r1t: 'Outputs',
          r1: '15-minute diagnostic agenda, workshop outline, one-page board brief, and link list to Annex 58 / 68 materials.',
        },
        checklist: {
          title: '5 · Dissemination checklist',
          items: [
            'Named audiences and decision rights',
            'Single duty-table version ID',
            'Workshop / review date with pre-read',
            'Open questions with owners',
            'Pointers to Annex 58 Task reports',
            'Follow-up gate (Task 2 / 3 / 4)',
          ],
        },
        other: {
          title: '5 · Other duties',
          text: 'Comfort projects still need owner–installer clarity on controls. Annex 58 Task 5 scale is <strong>industrial HTHP stakeholder literacy</strong>.',
        },
        faq: [
          ['Do you run public Annex webinars?', 'No—those are HPT TCP events. We run project-scoped exchanges and point to official recordings/reports.'],
          ['How does this differ from Task 3?', 'Task 3 is the multi-year roadmap; Task 5 is how people stay aligned while executing it.'],
        ],
      },
      related: 'Back to hub: <a href="./services.html">Engineering services</a>. Start screening: <a href="./services-technologies.html">Task 1 · Technologies</a>. Annex 68 notes: <a href="./briefings/annex68-iea-hpt.html">Annex 68</a>.',
    },
    zh: {
      seoTitle: 'Task 5 · 传播与赋能 — 工程服务',
      seoDesc: '对齐 IEA HPT Annex 58 Task 5：工业高温热泵项目的干系人沟通与能力建设。',
      kicker: '工程服务 · Annex 58 Task 5',
      pageTitle: '传播与赋能',
      lede: '对齐 <strong>Annex 58 Task 5 — Dissemination</strong>：向制造商、终端用户、顾问、规划者与政策受众分享成果。在本站，服务落地为<strong>技术交流、培训提纲与决策简报</strong>，让业主、EPC 与主机厂对齐。',
      toc: ['Annex 58 视角', '干系人地图', '服务交付', '检查清单', '其它工况', 'FAQ'],
      figCaption: 'Task 5 思路：证据 → 受众 → 形式（研讨/简报/评审）。示意导向。',
      sections: {
        lens: {
          title: '1 · Annex 58 Task 5 视角',
          lede: 'Task 5 通过网络研讨、报告与杂志文章，让高温热泵知识走出 Annex、抵达从业者。',
          r1t: '多元受众',
          r1: 'Annex 58 明确点名制造商、终端用户、顾问、能源规划者与政策制定者——同一物理，不同切片。',
          r2t: '延续',
          r2: 'Annex 58 已结项；传播经 Project 68 与各国渠道延续。我们指向一手来源。',
          r3t: '官方入口',
          r3: '<a href="https://heatpumpingtechnologies.org/annex58/" target="_blank" rel="noopener noreferrer">Annex 58 主页</a> · <a href="https://heatpumpingtechnologies.org/project58/" target="_blank" rel="noopener noreferrer">Project 58</a>。',
        },
        map: {
          title: '2 · 项目干系人地图',
          lede: '把 Task 5 思维用进活项目——不只是会议。',
          r1t: '业主 · EPC · 主机厂',
          r1: '共享负荷表、冻结假设与短诊断议程，胜过幻灯片巡礼。',
          r2t: '内部能力',
          r2: '面向运行与能源团队的培训提纲，让 Task 4 验收知识在撤场后仍在。',
        },
        deliver: {
          title: '3 · 顾问交付物',
          lede: '绑定 Task 1–4 证据的沟通产物。',
          r1t: '产出',
          r1: '15 分钟诊断议程、研讨提纲、一页董事会简报，以及 Annex 58/68 材料链接表。',
        },
        checklist: {
          title: '4 · 传播清单',
          items: [
            '具名受众与决策权',
            '单一负荷表版本号',
            '带预读材料的研讨/评审日期',
            '未决问题及责任人',
            '指向 Annex 58 Task 报告',
            '后续关口（Task 2/3/4）',
          ],
        },
        other: {
          title: '5 · 其它工况',
          text: '舒适项目仍需业主–安装方控制权清晰。Annex 58 Task 5 尺度是<strong>工业高温热泵干系人识字率</strong>。',
        },
        faq: [
          ['是否承办官方 Annex 研讨？', '否——那是 HPT TCP 活动。我们做项目级交流，并指向官方录像/报告。'],
          ['与 Task 3 有何不同？', 'Task 3 是多年路线图；Task 5 是执行路上如何让人保持对齐。'],
        ],
      },
      related: '返回入口：<a href="./services.html">工程服务</a>。开始筛选：<a href="./services-technologies.html">Task 1 · 技术</a>。Annex 68 笔记：<a href="./briefings/annex68-iea-hpt.html">Annex 68</a>。',
    },
  },
];

function svgFor(kind) {
  const common = `xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" class="services-svg" role="img"`;
  const map = {
    t1: `<svg ${common}><rect width="640" height="200" fill="#f8fafc"/><rect x="24" y="40" width="110" height="70" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="79" y="80" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Inventory</text><text x="150" y="80" fill="#2e7d32" font-size="18">→</text><rect x="170" y="40" width="110" height="70" rx="8" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="225" y="80" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">TRL / lift</text><text x="296" y="80" fill="#2e7d32" font-size="18">→</text><rect x="316" y="40" width="110" height="70" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><text x="371" y="80" text-anchor="middle" font-size="12" fill="#0d47a1" font-family="system-ui">Shortlist</text><text x="442" y="80" fill="#2e7d32" font-size="18">→</text><rect x="462" y="40" width="150" height="70" rx="8" fill="#fff3e0" stroke="#ef6c00" stroke-width="2"/><text x="537" y="80" text-anchor="middle" font-size="12" fill="#e65100" font-family="system-ui">RFQ hygiene</text><text x="320" y="160" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Annex 58 Task 1 · Technologies</text></svg>`,
    t2: `<svg ${common}><rect width="640" height="200" fill="#f8fafc"/><rect x="40" y="50" width="140" height="80" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="110" y="95" text-anchor="middle" font-size="13" fill="#1b5e20" font-family="system-ui">Process</text><path d="M180 90 H250" stroke="#2e7d32" stroke-width="2"/><rect x="250" y="40" width="140" height="100" rx="8" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="320" y="95" text-anchor="middle" font-size="13" fill="#1b5e20" font-family="system-ui">Coupling</text><path d="M390 90 H460" stroke="#2e7d32" stroke-width="2"/><rect x="460" y="50" width="140" height="80" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><text x="530" y="95" text-anchor="middle" font-size="13" fill="#0d47a1" font-family="system-ui">HTHP</text><text x="320" y="170" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Annex 58 Task 2 · Integration</text></svg>`,
    t3: `<svg ${common}><rect width="640" height="200" fill="#f8fafc"/><circle cx="100" cy="90" r="32" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="100" y="95" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Base</text><path d="M132 90 H190" stroke="#2e7d32" stroke-width="2"/><circle cx="230" cy="90" r="32" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="230" y="95" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Rank</text><path d="M262 90 H320" stroke="#2e7d32" stroke-width="2"/><circle cx="360" cy="90" r="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><text x="360" y="95" text-anchor="middle" font-size="11" fill="#0d47a1" font-family="system-ui">Pilot</text><path d="M392 90 H450" stroke="#2e7d32" stroke-width="2"/><circle cx="490" cy="90" r="32" fill="#fff3e0" stroke="#ef6c00" stroke-width="2"/><text x="490" y="95" text-anchor="middle" font-size="11" fill="#e65100" font-family="system-ui">Scale</text><text x="320" y="160" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Annex 58 Task 3 · Transition</text></svg>`,
    t4: `<svg ${common}><rect width="640" height="200" fill="#f8fafc"/><rect x="50" y="35" width="200" height="110" rx="8" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="150" y="75" text-anchor="middle" font-size="13" fill="#1b5e20" font-family="system-ui">Specification</text><text x="150" y="100" text-anchor="middle" font-size="11" fill="#546e7a" font-family="system-ui">Envelope · exclusions</text><rect x="390" y="35" width="200" height="110" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="490" y="75" text-anchor="middle" font-size="13" fill="#1b5e20" font-family="system-ui">Verification</text><text x="490" y="100" text-anchor="middle" font-size="11" fill="#546e7a" font-family="system-ui">FAT · SAT · meters</text><path d="M250 90 H390" stroke="#c62828" stroke-width="2"/><text x="320" y="80" text-anchor="middle" font-size="11" fill="#c62828" font-family="system-ui">must match</text><text x="320" y="175" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Annex 58 Task 4 · Specs &amp; testing</text></svg>`,
    t5: `<svg ${common}><rect width="640" height="200" fill="#f8fafc"/><rect x="40" y="50" width="100" height="60" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="90" y="85" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Evidence</text><text x="155" y="85" fill="#2e7d32" font-size="18">→</text><rect x="175" y="40" width="120" height="80" rx="8" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="235" y="85" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Audiences</text><text x="310" y="85" fill="#2e7d32" font-size="18">→</text><rect x="330" y="50" width="100" height="60" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><text x="380" y="85" text-anchor="middle" font-size="12" fill="#0d47a1" font-family="system-ui">Formats</text><text x="445" y="85" fill="#2e7d32" font-size="18">→</text><rect x="465" y="50" width="130" height="60" rx="8" fill="#fff3e0" stroke="#ef6c00" stroke-width="2"/><text x="530" y="85" text-anchor="middle" font-size="12" fill="#e65100" font-family="system-ui">Alignment</text><text x="320" y="160" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Annex 58 Task 5 · Dissemination</text></svg>`,
  };
  return map[kind] || map.t1;
}

function buildI18n() {
  const en = {};
  const zh = {};
  for (const ch of CHAPTERS) {
    const p = ch.prefix;
    const e = ch.en;
    const z = ch.zh;
    Object.assign(en, {
      [`${p}.seo.title`]: e.seoTitle,
      [`${p}.seo.desc`]: e.seoDesc,
      [`${p}.kicker`]: e.kicker,
      [`${p}.pageTitle`]: e.pageTitle,
      [`${p}.lede`]: e.lede,
      [`${p}.toc.title`]: 'On this page',
      [`${p}.figure.caption`]: e.figCaption,
      [`${p}.related.title`]: 'Related',
      [`${p}.related.text`]: e.related,
      [`${p}.disclaimer`]: 'Independent advisory. Annex 58 materials remain © their authors / HPT TCP. Not a substitute for codes, OEM manuals, or legal counsel.',
      [`${p}.cta`]: 'Book a 15-minute diagnostic',
    });
    Object.assign(zh, {
      [`${p}.seo.title`]: z.seoTitle,
      [`${p}.seo.desc`]: z.seoDesc,
      [`${p}.kicker`]: z.kicker,
      [`${p}.pageTitle`]: z.pageTitle,
      [`${p}.lede`]: z.lede,
      [`${p}.toc.title`]: '本页目录',
      [`${p}.figure.caption`]: z.figCaption,
      [`${p}.related.title`]: '相关',
      [`${p}.related.text`]: z.related,
      [`${p}.disclaimer`]: '独立顾问导读。Annex 58 材料版权归原作者 / HPT TCP。不能替代规范、OEM 手册或法律意见。',
      [`${p}.cta`]: '预约 15 分钟诊断',
    });
    e.toc.forEach((label, i) => {
      en[`${p}.toc.item${i + 1}`] = label;
      zh[`${p}.toc.item${i + 1}`] = z.toc[i];
    });
    const order = ['lens', 'map', 'deliver', 'checklist', 'other', 'faq'];
    order.forEach((k) => {
      const es = e.sections[k];
      const zs = z.sections[k];
      if (k === 'checklist') {
        en[`${p}.checklist.title`] = es.title;
        zh[`${p}.checklist.title`] = zs.title;
        es.items.forEach((item, i) => {
          en[`${p}.checklist.i${i + 1}`] = item;
          zh[`${p}.checklist.i${i + 1}`] = zs.items[i];
        });
        return;
      }
      if (k === 'other') {
        en[`${p}.other.title`] = es.title;
        en[`${p}.other.text`] = es.text;
        zh[`${p}.other.title`] = zs.title;
        zh[`${p}.other.text`] = zs.text;
        return;
      }
      if (k === 'faq') {
        en[`${p}.faq.title`] = '6 · Quick FAQs';
        zh[`${p}.faq.title`] = '6 · 常见问题';
        es.forEach((qa, i) => {
          en[`${p}.faq.q${i + 1}`] = qa[0];
          en[`${p}.faq.a${i + 1}`] = qa[1];
          zh[`${p}.faq.q${i + 1}`] = zs[i][0];
          zh[`${p}.faq.a${i + 1}`] = zs[i][1];
        });
        return;
      }
      en[`${p}.${k}.title`] = es.title;
      en[`${p}.${k}.lede`] = es.lede;
      zh[`${p}.${k}.title`] = zs.title;
      zh[`${p}.${k}.lede`] = zs.lede;
      for (let n = 1; n <= 3; n++) {
        if (es[`r${n}t`]) {
          en[`${p}.${k}.r${n}.title`] = es[`r${n}t`];
          en[`${p}.${k}.r${n}.text`] = es[`r${n}`];
          zh[`${p}.${k}.r${n}.title`] = zs[`r${n}t`];
          zh[`${p}.${k}.r${n}.text`] = zs[`r${n}`];
        }
      }
    });
  }
  return { en, zh };
}

function chapterHtml(ch) {
  const p = ch.prefix;
  const ids = ['lens', 'map', 'deliver', 'checklist', 'other', 'faq'];
  const toc = ids
    .map(
      (id, i) =>
        `<li class="knowledge-toc-item"><a class="knowledge-toc-link" href="#svc-${ch.id}-${id}"><span class="knowledge-toc-kicker">Task ${ch.task}.${i + 1}</span><span class="knowledge-toc-link-title" data-i18n="${p}.toc.item${i + 1}"></span></a></li>`
    )
    .join('\n');

  const reasons = (sec) => {
    let h = `<p class="knowledge-article2-lede" data-i18n="${p}.${sec}.lede" data-i18n-html="true"></p>`;
    if (sec === 'lens') {
      h += `<figure class="knowledge-co2-figure services-figure">${svgFor(ch.svg)}<figcaption class="knowledge-co2-figure-caption" data-i18n="${p}.figure.caption" data-i18n-html="true"></figcaption></figure>`;
    }
    h += `<div class="knowledge-reasons knowledge-reasons--article2">`;
    for (let n = 1; n <= 3; n++) {
      h += `<div class="knowledge-reason" data-svc-reason="${p}.${sec}.r${n}"><h3 class="knowledge-reason-title" data-i18n="${p}.${sec}.r${n}.title"></h3><p class="knowledge-reason-text" data-i18n="${p}.${sec}.r${n}.text" data-i18n-html="true"></p></div>`;
    }
    h += `</div>`;
    return h;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ch.en.seoTitle}</title>
    <meta id="meta-page-title" name="title" content="${ch.en.seoTitle}">
    <meta id="meta-page-description" name="description" content="${ch.en.seoDesc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://www.jingyanrong.com/${ch.file}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.jingyanrong.com/${ch.file}">
    <meta id="meta-og-title" property="og:title" content="${ch.en.seoTitle}">
    <meta id="meta-og-description" property="og:description" content="${ch.en.seoDesc}">
    <meta property="og:site_name" content="荆炎荣个人网站">
    <meta name="twitter:card" content="summary_large_image">
    <meta id="meta-twitter-title" name="twitter:title" content="${ch.en.seoTitle}">
    <meta id="meta-twitter-description" name="twitter:description" content="${ch.en.seoDesc}">
    <link rel="stylesheet" href="/src/style.css">
    <script type="module" src="/src/${ch.js}"></script>
</head>
<body>
${nav}
    <div data-hub-directory="services" data-hub-mode="rail" class="hub-dir-mount"></div>
    <main id="main-content" class="knowledge-page knowledge-ref-page services-page">
        <header class="knowledge-hero">
            <div class="container">
                <div class="knowledge-hero-card">
                    <p class="knowledge-kicker" data-i18n="${p}.kicker"></p>
                    <h1 class="knowledge-title" data-i18n="${p}.pageTitle"></h1>
                    <p class="knowledge-lede" data-i18n="${p}.lede" data-i18n-html="true"></p>
                    <nav class="knowledge-toc" aria-label="Table of contents">
                        <h2 class="knowledge-toc-title" data-i18n="${p}.toc.title"></h2>
                        <ol class="knowledge-toc-list">${toc}</ol>
                    </nav>
                    <div class="knowledge-actions">
                        <a class="knowledge-btn knowledge-btn-primary" href="./services.html" data-i18n="nav.services">Services</a>
                        <button type="button" class="knowledge-btn knowledge-btn-secondary" id="services-contact-cta" data-i18n="${p}.cta"></button>
                    </div>
                </div>
            </div>
        </header>
        <section id="svc-${ch.id}-lens" class="knowledge-article knowledge-section"><div class="container"><h2 class="knowledge-section-title" data-i18n="${p}.lens.title"></h2>${reasons('lens')}</div></section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-map" class="knowledge-article knowledge-section"><div class="container"><h2 class="knowledge-section-title" data-i18n="${p}.map.title"></h2>${reasons('map')}</div></section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-deliver" class="knowledge-article knowledge-section"><div class="container"><h2 class="knowledge-section-title" data-i18n="${p}.deliver.title"></h2>${reasons('deliver')}</div></section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-checklist" class="knowledge-article knowledge-section"><div class="container"><h2 class="knowledge-section-title" data-i18n="${p}.checklist.title"></h2><ul class="knowledge-select-list">${[1, 2, 3, 4, 5, 6].map((n) => `<li data-i18n="${p}.checklist.i${n}"></li>`).join('')}</ul></div></section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-other" class="knowledge-article knowledge-section"><div class="container"><h2 class="knowledge-section-title" data-i18n="${p}.other.title"></h2><p class="knowledge-reason-text services-callout" data-i18n="${p}.other.text" data-i18n-html="true"></p></div></section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-faq" class="knowledge-article knowledge-section"><div class="container"><h2 class="knowledge-section-title" data-i18n="${p}.faq.title"></h2><div class="knowledge-faq"><details class="knowledge-faq-item"><summary class="knowledge-faq-q" data-i18n="${p}.faq.q1"></summary><p class="knowledge-faq-a" data-i18n="${p}.faq.a1" data-i18n-html="true"></p></details><details class="knowledge-faq-item"><summary class="knowledge-faq-q" data-i18n="${p}.faq.q2"></summary><p class="knowledge-faq-a" data-i18n="${p}.faq.a2" data-i18n-html="true"></p></details></div><p class="knowledge-reason-text knowledge-article5-disclaimer" data-i18n="${p}.disclaimer"></p></div></section>
        <footer class="knowledge-footer"><div class="container"><div class="knowledge-footer-card"><p class="knowledge-footer-title" data-i18n="${p}.related.title"></p><p class="knowledge-footer-text" data-i18n="${p}.related.text" data-i18n-html="true"></p></div><div class="site-legal-disclaimer-slot" data-site-disclaimer-slot></div></div></footer>
    </main>
</body>
</html>`;
}

const { en, zh } = buildI18n();
writeFileSync(
  join(ROOT, 'src/i18nServices.js'),
  `export const servicesTranslations = {\n    en: ${JSON.stringify(en, null, 4)},\n    zh: ${JSON.stringify(zh, null, 4)},\n};\n`
);

for (const ch of CHAPTERS) {
  writeFileSync(join(ROOT, ch.file), chapterHtml(ch));
  writeFileSync(join(ROOT, 'src', ch.js), `import { initServicesChapter } from './servicesPageInit.js';\ninitServicesChapter('${ch.prefix}');\n`);
  console.log('wrote', ch.file);
}
console.log('Annex 58 services chapters done');
