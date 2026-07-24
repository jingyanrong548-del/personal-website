/**
 * One-shot generator for Engineering Services hub + 8 chapters.
 * Run: node scripts/generate-services-pages.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { siteNav } from './site-nav.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const nav = siteNav({ depth: 0, brand: 'link' });

const CHAPTERS = [
  {
    id: 'survey',
    file: 'services-survey.html',
    js: 'servicesSurvey.js',
    prefix: 'servicesSurvey',
    en: {
      seoTitle: 'Site survey — Engineering services',
      seoDesc: 'Industrial heat-pump site survey: source/sink boundaries, instrumentation gaps, electrical and civil interfaces, risk grading. Independent advisory checklist.',
      kicker: 'Engineering services · Pre-sales',
      pageTitle: 'Site survey',
      lede: 'Before any compressor line-up, freeze <strong>source, sink, duty swings, and measurement truth</strong>. Industrial heat pumps fail more often from fuzzy boundaries than from wrong catalogue COP.',
      toc: ['Boundaries', 'Measurement map', 'Interfaces', 'Risk grading', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · Boundary conditions first',
          lede: 'Industrial HTHP success starts with temperatures, flows, and availability—not with a brand preference.',
          r1t: 'Source & sink envelopes',
          r1: 'Record min / design / max for source and sink (fluid, pressure, fouling). Note simultaneous vs sequential loads. A “120 °C steam” label without condensate return and non-condensables is not a duty.',
          r2t: 'Availability & turndown',
          r2: 'Waste-heat profiles often collapse on weekends or batch cycles. Map hours-at-load; oversized continuous machines hunting at 20% load are a survey miss, not a compressor defect.',
          r3t: 'Working-fluid & code constraints',
          r3: 'Capture site rules on ammonia, CO₂, hydrocarbons, and pressure equipment early—they reshape architecture more than a 5% COP tweak.',
        },
        measure: {
          title: '2 · Measurement & process map',
          lede: 'If you cannot measure it, you cannot guarantee it. Survey where sensors already exist and where they must be added.',
          r1t: 'Thermal nodes',
          r1: 'Mark process exchangers, tanks, and headers that will couple to the heat pump. Prefer P&IDs over verbal “hot water somewhere”.',
          r2t: 'Data gaps',
          r2: 'Grade each critical parameter: measured / estimated / assumed. Assumptions must appear in the proposal risk register.',
        },
        interfaces: {
          title: '3 · Electrical, civil, and noise',
          lede: 'Industrial plants are full of soft constraints that kill schedules: transformer headroom, floor loads, and neighbour noise limits.',
          r1t: 'Power & controls',
          r1: 'Available kVA, harmonic limits, DCS/PLC ownership, and remote access policy.',
          r2t: 'Plant room & routing',
          r2: 'Access for largest component, pipe stress routes, drainage for defrost/condensate, ATEX/zoning if any.',
        },
        risk: {
          title: '4 · Risk grading',
          lede: 'Translate gaps into traffic-light risk before sales pressure invents a number.',
          r1t: 'Red / amber / green',
          r1: 'Red = cannot size or guarantee without new data or process change. Amber = size with explicit contingency. Green = measured and stable.',
        },
        checklist: {
          title: '5 · Survey deliverables checklist',
          items: [
            'Source/sink temperature–flow–pressure tables (min/design/max)',
            'Hours-at-load / batch calendar',
            'Existing instruments and proposed additions',
            'Electrical capacity and control ownership',
            'Civil / access / noise / zoning notes',
            'Open assumptions list with owners',
          ],
        },
        other: {
          title: '6 · Other heat-pump & refrigeration duties',
          text: 'Comfort and commercial refrigeration surveys are shorter but the same rule applies: <strong>freeze the climate bin or product temperature profile</strong> before comparing nameplates. Industrial detail above still dominates this site’s focus.',
        },
        faq: [
          ['Do we always need a site visit?', 'Remote P&ID reviews can start the file; high-lift industrial duties almost always need walk-down for routing, access, and “tribal” operating habits.'],
          ['Who owns missing meters?', 'Whoever will sign the performance clause should own funding sensors—or accept that guarantees shrink to the measured envelope.'],
        ],
      },
      related: 'Next: turn survey truth into architecture → <a href="./services-proposal.html">Proposal &amp; architecture</a>. Cycles primer: <a href="./knowledge-cycles.html">Cycles</a>. HTHP context: <a href="./hthp-column.html">Industrial HTHP</a>.',
    },
    zh: {
      seoTitle: '现场勘察 — 工程服务',
      seoDesc: '工业热泵现场勘察：热源/热汇边界、测点缺口、电气与土建接口、风险分级。独立顾问检查清单。',
      kicker: '工程服务 · 售前',
      pageTitle: '现场勘察',
      lede: '在任何压缩机选型之前，先冻结<strong>热源、热汇、负荷波动与测量真相</strong>。工业热泵失败，更多来自边界含糊，而不是样本 COP 选错。',
      toc: ['边界条件', '测点与工艺图', '接口', '风险分级', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 先冻结边界条件',
          lede: '工业高温热泵的成败，从温度、流量与可用时段开始——不是从品牌偏好开始。',
          r1t: '热源与热汇包络',
          r1: '记录热源/热汇的最低/设计/最高（介质、压力、结垢）。区分同时负荷与时序负荷。「120℃ 蒸汽」若没有凝水回流与不凝气说明，还不算工况。',
          r2t: '可用时段与调节比',
          r2: '余热曲线常在周末或间歇批次塌缩。画清负荷小时数；连续机在 20% 负荷来回猎振，是勘察遗漏，不是压缩机本身坏了。',
          r3t: '工质与规范约束',
          r3: '尽早记录现场对氨、CO₂、碳氢与压力容器的规则——它们改架构的力度远大于把 COP 抠 5%。',
        },
        measure: {
          title: '2 · 测点与工艺映射',
          lede: '测不到，就保不了。勘察要分清已有仪表与必须补点的位置。',
          r1t: '热力节点',
          r1: '标出将与热泵耦合的工艺换热器、储罐与总管。优先用 P&ID，而不是口头「那边有点热水」。',
          r2t: '数据缺口',
          r2: '对关键参数分级：已测 / 估算 / 假设。假设必须进入方案风险台账。',
        },
        interfaces: {
          title: '3 · 电气、土建与噪声',
          lede: '工厂里充满「软约束」：变压器裕量、楼面荷载、厂界噪声——它们比 COP 更能杀死工期。',
          r1t: '电源与控制',
          r1: '可用 kVA、谐波限制、DCS/PLC 归属与远程访问政策。',
          r2t: '机房与路由',
          r2: '最大件吊装通道、管道应力路径、除霜/凝水排放、若有则标注防爆分区。',
        },
        risk: {
          title: '4 · 风险分级',
          lede: '在销售压力发明数字之前，把缺口译成红黄绿灯。',
          r1t: '红 / 黄 / 绿',
          r1: '红＝缺数据或工艺未改则无法选型/担保。黄＝可带明确裕量选型。绿＝已测且稳定。',
        },
        checklist: {
          title: '5 · 勘察交付物清单',
          items: [
            '热源/热汇温–流–压表（最低/设计/最高）',
            '负荷小时数 / 批次日历',
            '已有仪表与拟增测点',
            '电力容量与控制权属',
            '土建 / 通道 / 噪声 / 分区备注',
            '未闭合假设清单及责任人',
          ],
        },
        other: {
          title: '6 · 其它热泵与制冷工况',
          text: '舒适与商用制冷勘察更短，但规则相同：比较铭牌之前先<strong>冻结气候分区或产品温度曲线</strong>。本站仍以工业细节为主线。',
        },
        faq: [
          ['是否必须到现场？', '远程 P&ID 评审可以开档；高抬升工业工况几乎都需要踏勘，才能看清路由、通道与「口口相传」的运行习惯。'],
          ['缺表谁买单？', '谁签性能条款，谁就该推动仪表投资——否则担保范围只能收缩到已测包络。'],
        ],
      },
      related: '下一步：把勘察真相写成架构 → <a href="./services-proposal.html">方案制定</a>。循环导读：<a href="./knowledge-cycles.html">循环</a>。高温热泵：<a href="./hthp-column.html">工业高温热泵</a>。',
    },
    svg: 'survey',
  },
  {
    id: 'proposal',
    file: 'services-proposal.html',
    js: 'servicesProposal.js',
    prefix: 'servicesProposal',
    en: {
      seoTitle: 'Proposal & architecture — Engineering services',
      seoDesc: 'Industrial heat-pump proposal: duty profile to cycle architecture, equipment boundaries, TCO and verifiable delivery packages.',
      kicker: 'Engineering services · Pre-sales',
      pageTitle: 'Proposal & architecture',
      lede: 'A proposal is a <strong>physics story with interfaces</strong>: how heat moves, who owns each flange, and what can be verified at handover—not a brochure collage.',
      toc: ['Duty → architecture', 'System block', 'Delivery package', 'TCO & risk', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · From duty profile to architecture',
          lede: 'Match lift and turndown to cycle families before naming compressors.',
          r1t: 'Single-stage vs cascade / economizer',
          r1: 'High sink temperatures with cold sources push cascade, two-stage, or working-fluid changes. Catalogue “one box” claims need the survey envelope printed beside them.',
          r2t: 'Steam / MVR vs closed HP',
          r2: 'Open steam recompression and closed heat pumps solve different interface problems—do not treat them as interchangeable SKUs.',
          r3t: 'Integration first',
          r3: 'Reboilers, dryers, and dyeing machines need thermal coupling concepts, not only unit COP.',
        },
        measure: {
          title: '2 · System block & ownership',
          lede: 'Draw the battery limits: OEM skid vs site piping vs process units.',
          r1t: 'Battery limits',
          r1: 'Every proposal figure should mark who supplies vessels, pumps, valves, and controls outside the skid.',
          r2t: 'Controls narrative',
          r2: 'State set-point authority and fail-safe behaviour in plain language.',
        },
        interfaces: {
          title: '3 · Verifiable delivery package',
          lede: 'List documents and tests that prove the story—FAT, SAT, duty-point logs.',
          r1t: 'Acceptance points',
          r1: 'Define 2–3 contractual duty points with tolerances tied to measured instruments.',
          r2t: 'Open tools',
          r2: 'Where helpful, point to calculators on this site so owners can inspect the arithmetic.',
        },
        risk: {
          title: '4 · TCO and risk language',
          lede: 'Separate energy, maintenance, refrigerant, and downtime risk. Avoid single “payback years” without sensitivity.',
          r1t: 'Sensitivities',
          r1: 'Show COP and energy-price bands; industrial tariffs and part-load kill naive paybacks.',
        },
        checklist: {
          title: '5 · Proposal checklist',
          items: [
            'Duty table copied from survey (not reinvented)',
            'Architecture rationale with rejected options',
            'Battery-limit drawing',
            'Acceptance duty points & instruments',
            'TCO with sensitivities',
            'Risk register with owners',
          ],
        },
        other: {
          title: '6 · Other duties',
          text: 'Comfort VRF or cold-store proposals still need climate bins and defrost energy—just with thinner industrial coupling. Keep the same “verify at handover” discipline.',
        },
        faq: [
          ['Can we skip architecture and jump to OEM quotes?', 'Quotes without a duty envelope become change-order machines. Freeze architecture light, then invite OEMs inside that fence.'],
          ['How detailed should the first proposal be?', 'Enough to reject unsafe options and price interfaces—not a full detailed design.'],
        ],
      },
      related: 'Align stakeholders in <a href="./services-exchange.html">Technical exchange</a>. Cycle families: <a href="./knowledge-cycles.html">Cycles</a>. Calculators: <a href="./#apps">Toolbox</a>.',
    },
    zh: {
      seoTitle: '方案制定 — 工程服务',
      seoDesc: '工业热泵方案：负荷剖面到循环架构、设备边界、TCO 与可验证交付包。',
      kicker: '工程服务 · 售前',
      pageTitle: '方案制定',
      lede: '方案是一份带接口的<strong>物理叙事</strong>：热怎么走、法兰归谁、移交时如何验证——不是彩页拼贴。',
      toc: ['负荷→架构', '系统框图', '交付包', 'TCO与风险', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 从负荷剖面到架构',
          lede: '先按抬升与调节比匹配循环家族，再点压缩机名。',
          r1t: '单级 vs 复叠 / 经济器',
          r1: '冷源配高温汇推动复叠、双级或换工质。样本「一台搞定」必须把勘察包络印在旁边。',
          r2t: '蒸汽/MVR vs 闭式热泵',
          r2: '开式蒸汽再压缩与闭式热泵解决不同接口问题——不要当成可互换 SKU。',
          r3t: '集成优先',
          r3: '再沸器、干燥机、染缸需要热耦合概念，而不只是机组 COP。',
        },
        measure: {
          title: '2 · 系统框图与权属',
          lede: '画出供货边界：OEM 撬块 / 现场管道 / 工艺单元。',
          r1t: '供货边界',
          r1: '方案图应标明撬外容器、泵、阀与控制由谁供货。',
          r2t: '控制叙事',
          r2: '用白话写清设定权与故障安全行为。',
        },
        interfaces: {
          title: '3 · 可验证交付包',
          lede: '列出能证明叙事的文件与试验——FAT、SAT、工况点记录。',
          r1t: '验收点',
          r1: '定义 2–3 个合同工况点，公差绑定已约定仪表。',
          r2t: '开放工具',
          r2: '必要时指向本站计算器，让业主能检视算术。',
        },
        risk: {
          title: '4 · TCO 与风险表述',
          lede: '分开能源、维护、工质与停机风险。避免没有灵敏度的单一「几年回本」。',
          r1t: '灵敏度',
          r1: '给出 COP 与电价带宽；工业电价与部分负荷会杀死天真回本。',
        },
        checklist: {
          title: '5 · 方案检查清单',
          items: [
            '负荷表来自勘察（不另起炉灶）',
            '架构理由与已否决选项',
            '供货边界图',
            '验收工况点与仪表',
            '带灵敏度的 TCO',
            '风险台账及责任人',
          ],
        },
        other: {
          title: '6 · 其它工况',
          text: '舒适多联或冷库方案仍需气候分区与化霜能耗——只是工业耦合更薄。保持同样的「移交可验证」纪律。',
        },
        faq: [
          ['能否跳过架构直接询价？', '没有负荷包络的报价会变成变更单制造机。先轻量冻结架构，再请 OEM 进入围栏。'],
          ['首版方案要多细？', '足以否决不安全选项并给接口定价——不必到详细设计深度。'],
        ],
      },
      related: '对齐干系人见 <a href="./services-exchange.html">技术交流</a>。循环家族：<a href="./knowledge-cycles.html">循环</a>。计算器：<a href="./#apps">工具箱</a>。',
    },
    svg: 'proposal',
  },
  {
    id: 'exchange',
    file: 'services-exchange.html',
    js: 'servicesExchange.js',
    prefix: 'servicesExchange',
    en: {
      seoTitle: 'Technical exchange — Engineering services',
      seoDesc: 'Owner, EPC, and OEM roles for industrial heat-pump projects; 15-minute diagnostic agenda; design review and assumption freeze.',
      kicker: 'Engineering services · Pre-sales',
      pageTitle: 'Technical exchange',
      lede: 'Most industrial heat-pump delays are <strong>role collisions</strong>, not thermodynamics. Name who decides, who calculates, and what gets frozen.',
      toc: ['Roles', 'Diagnostic agenda', 'Design review', 'Freeze rules', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · Owner · EPC · OEM',
          lede: 'Three seats, three incentives—draw the RACI before arguing COP.',
          r1t: 'Owner',
          r1: 'Owns process outcomes, energy meters, and acceptance politics.',
          r2t: 'EPC / integrator',
          r2: 'Owns site interfaces, schedule, and often the battery limits drawing.',
          r3t: 'OEM',
          r3: 'Owns skid performance inside stated envelopes—not the whole factory.',
        },
        measure: {
          title: '2 · 15-minute diagnostic agenda',
          lede: 'A short structured call beats a two-hour slide tour.',
          r1t: 'Suggested flow',
          r1: 'Duty pain (5′) → envelope & data gaps (5′) → next artefact (survey / proposal / test) (5′).',
          r2t: 'Bring',
          r2: 'One P&ID snippet, one energy bill or logger sample, one failed assumption.',
        },
        interfaces: {
          title: '3 · Design review focus',
          lede: 'Review interfaces and failure modes before polishing renderings.',
          r1t: 'Ask',
          r1: 'What fails first if source drops 10 K? Who resets after trip? Where is oil return proven?',
        },
        risk: {
          title: '4 · Freezing assumptions',
          lede: 'Unfrozen assumptions reappear as liquidated damages arguments.',
          r1t: 'Change control',
          r1: 'Any change to temperatures, hours, or refrigerant class reopens architecture—not just price.',
        },
        checklist: {
          title: '5 · Exchange checklist',
          items: [
            'Named roles and decision rights',
            'Shared duty table version ID',
            'Open questions with due dates',
            'Next gate (survey / proposal / FAT)',
            'Communication channel for trips & changes',
          ],
        },
        other: {
          title: '6 · Other duties',
          text: 'Comfort projects still need owner vs installer clarity on controls passwords and seasonal set-points—lighter RACI, same habit.',
        },
        faq: [
          ['Who should host the diagnostic?', 'Whoever can change process set-points or fund meters—usually the owner’s energy or process lead.'],
          ['What if OEM and EPC disagree?', 'Return to the written envelope. Disagreement without a duty table is theatre.'],
        ],
      },
      related: 'Contract language: <a href="./services-contract.html">Contract pitfalls</a>. Book via site contact / diagnostic CTA.',
    },
    zh: {
      seoTitle: '技术交流 — 工程服务',
      seoDesc: '工业热泵项目中业主、EPC 与主机厂角色；15 分钟诊断议程；设计评审与假设冻结。',
      kicker: '工程服务 · 售前',
      pageTitle: '技术交流',
      lede: '工业热泵工期拖延，多半是<strong>角色碰撞</strong>，不是热力学。先写清谁决策、谁计算、什么被冻结。',
      toc: ['角色', '诊断议程', '设计评审', '冻结规则', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 业主 · EPC · 主机厂',
          lede: '三个座位、三种激励——先画 RACI，再吵 COP。',
          r1t: '业主',
          r1: '对工艺结果、能源表计与验收政治负责。',
          r2t: 'EPC / 集成商',
          r2: '对现场接口、工期，以及常常对供货边界图负责。',
          r3t: '主机厂',
          r3: '对声明包络内的撬块性能负责——不是整座工厂。',
        },
        measure: {
          title: '2 · 15 分钟诊断议程',
          lede: '结构化短会胜过两小时幻灯片巡礼。',
          r1t: '建议流程',
          r1: '痛点工况（5′）→ 包络与数据缺口（5′）→ 下一产物（勘察/方案/试验）（5′）。',
          r2t: '请携带',
          r2: '一张 P&ID 片段、一份电费或录波样本、一个已失败的假设。',
        },
        interfaces: {
          title: '3 · 设计评审焦点',
          lede: '先审接口与失效模式，再打磨效果图。',
          r1t: '要问',
          r1: '热源掉 10 K 时谁先挂？跳闸后谁复位？回油在哪里被证明？',
        },
        risk: {
          title: '4 · 冻结假设',
          lede: '未冻结的假设会在违约金争论里复活。',
          r1t: '变更控制',
          r1: '温度、小时数或工质类别一变，重开的是架构——不只是价格。',
        },
        checklist: {
          title: '5 · 交流检查清单',
          items: [
            '具名角色与决策权',
            '共享负荷表版本号',
            '未决问题与截止日期',
            '下一关口（勘察/方案/FAT）',
            '跳闸与变更的沟通渠道',
          ],
        },
        other: {
          title: '6 · 其它工况',
          text: '舒适项目仍需明确业主与安装方对控制密码与季节设定的权属——RACI 更轻，习惯相同。',
        },
        faq: [
          ['诊断会谁主持？', '谁能改工艺设定或出资加表——通常是业主能源或工艺负责人。'],
          ['OEM 与 EPC 争执怎么办？', '回到书面包络。没有负荷表的争执是表演。'],
        ],
      },
      related: '合同表述见 <a href="./services-contract.html">合同避坑</a>。可通过站内联系/诊断 CTA 预约。',
    },
    svg: 'exchange',
  },
  {
    id: 'contract',
    file: 'services-contract.html',
    js: 'servicesContract.js',
    prefix: 'servicesContract',
    en: {
      seoTitle: 'Contract pitfalls — Engineering services',
      seoDesc: 'Industrial heat-pump contract pitfalls: performance envelopes, refrigerant and standards references, interfaces, acceptance. Not legal advice.',
      kicker: 'Engineering services · Pre-sales',
      pageTitle: 'Contract pitfalls',
      lede: 'Contracts cannot repeal the second law. Write <strong>measurable envelopes</strong>, honest interfaces, and acceptance tied to instruments—then let counsel formalise. <em>Not legal advice.</em>',
      toc: ['Physics vs paper', 'Performance clauses', 'Interfaces & schedule', 'Acceptance', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · Physics vs paper',
          lede: 'If the contract duty cannot be measured, it cannot be enforced fairly.',
          r1t: 'Print the envelope',
          r1: 'Attach the survey duty table. “About 120 °C” is not a clause.',
          r2t: 'Standards as pointers',
          r2: 'Cite standards for method, not as magic performance numbers detached from site conditions.',
        },
        measure: {
          title: '2 · Performance clauses',
          lede: 'COP / capacity guarantees need ambient or source conditions, fouling allowances, and part-load rules.',
          r1t: 'Exclusions',
          r1: 'List what voids the guarantee: wrong glycol, closed valves, missing sensors, process upsets outside envelope.',
        },
        interfaces: {
          title: '3 · Interfaces and schedule',
          lede: 'Late civil or power is not an OEM thermodynamics failure.',
          r1t: 'Dependency register',
          r1: 'Name predecessor works (foundations, transformers, process tie-ins) with owners.',
        },
        risk: {
          title: '4 · Acceptance & remedies',
          lede: 'Prefer cure and retest over instant liquidated damages when instruments disagree.',
          r1t: 'Meter hierarchy',
          r1: 'State which meters are contractual and how they are calibrated.',
        },
        checklist: {
          title: '5 · Contract review checklist',
          items: [
            'Duty table annexed',
            'Guarantee conditions & exclusions',
            'Battery limits matched to drawings',
            'Acceptance test procedure referenced',
            'Refrigerant / PED / safety responsibilities named',
            'Counsel review for formal language',
          ],
        },
        other: {
          title: '6 · Other duties',
          text: 'Comfort warranties still need climate-bin language; cold stores need product temperature—not only room air. Same discipline, smaller envelopes.',
        },
        faq: [
          ['Is this legal advice?', 'No. It is engineering risk language for you and your counsel.'],
          ['What is the most common trap?', 'Guaranteeing catalogue COP at a site temperature the survey never measured.'],
        ],
      },
      related: 'Standards lookup: <a href="./heat-pump-standards.html">Tools &amp; standards</a>. Next lifecycle stage: <a href="./services-install.html">Installation</a>.',
    },
    zh: {
      seoTitle: '合同避坑 — 工程服务',
      seoDesc: '工业热泵合同避坑：性能包络、工质与标准引用、接口与验收。非正式法律意见。',
      kicker: '工程服务 · 售前',
      pageTitle: '合同避坑',
      lede: '合同废除不了第二定律。先写<strong>可测包络</strong>、诚实接口与绑定仪表的验收——再交给律师形式化。<em>非正式法律意见。</em>',
      toc: ['物理与纸面', '性能条款', '接口与工期', '验收', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 物理与纸面',
          lede: '合同工况若测不到，就无法公平执行。',
          r1t: '把包络印上去',
          r1: '附件附上勘察负荷表。「大约 120℃」不是条款。',
          r2t: '标准是方法指针',
          r2: '引用标准用于方法，而不是当作脱离现场的魔法性能数字。',
        },
        measure: {
          title: '2 · 性能条款',
          lede: 'COP/能力担保需要源汇条件、结垢裕量与部分负荷规则。',
          r1t: '除外',
          r1: '列明使担保失效的情形：错误乙二醇、阀门关闭、缺表、包络外工艺扰动。',
        },
        interfaces: {
          title: '3 · 接口与工期',
          lede: '土建或电力滞后，不是 OEM 热力学失败。',
          r1t: '依赖台账',
          r1: '写明前置工作（基础、变压器、工艺接管）及责任人。',
        },
        risk: {
          title: '4 · 验收与救济',
          lede: '仪表不一致时，优先整改复测，而不是立刻违约金。',
          r1t: '表计层级',
          r1: '写明哪些表是合同表及如何溯源校准。',
        },
        checklist: {
          title: '5 · 合同审阅清单',
          items: [
            '负荷表作为附件',
            '担保条件与除外',
            '供货边界与图纸一致',
            '引用验收试验程序',
            '工质 / 压力容器 / 安全责任具名',
            '正式措辞经律师审阅',
          ],
        },
        other: {
          title: '6 · 其它工况',
          text: '舒适质保仍需气候分区语言；冷库要产品温度——不只是库温。纪律相同，包络更小。',
        },
        faq: [
          ['这是法律意见吗？', '不是。这是给你和律师用的工程风险语言。'],
          ['最常见陷阱？', '按勘察从未测到的现场温度，去担保样本 COP。'],
        ],
      },
      related: '标准速查：<a href="./heat-pump-standards.html">工具与标准</a>。下一阶段：<a href="./services-install.html">现场安装</a>。',
    },
    svg: 'contract',
  },
  {
    id: 'install',
    file: 'services-install.html',
    js: 'servicesInstall.js',
    prefix: 'servicesInstall',
    en: {
      seoTitle: 'Installation — Engineering services',
      seoDesc: 'Industrial heat-pump installation: plant-room layout, piping stress, electrics, charging, and quality gates.',
      kicker: 'Engineering services · After-sales',
      pageTitle: 'Installation',
      lede: 'Installation is where beautiful P&IDs meet gravity. Protect oil return, access, and electrical cleanliness—or commissioning will only invent new myths.',
      toc: ['Layout', 'Piping & stress', 'Electrics', 'Charge & gates', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · Plant-room layout',
          lede: 'Leave pull space for compressors and exchangers; keep service aisles real.',
          r1t: 'Access',
          r1: 'Largest replaceable component must exit without cutting structural steel.',
          r2t: 'Noise & vibration',
          r2: 'Isolators and inertia bases per OEM—field improvisation shows up as bolt fatigue.',
        },
        measure: {
          title: '2 · Piping and stress',
          lede: 'Industrial headers move; heat pumps do not like pipe loads on nozzles.',
          r1t: 'Supports & expansion',
          r1: 'Design for thermal growth on hot sinks; avoid using the unit as an anchor.',
          r2t: 'Oil return geometry',
          r2: 'Risers, traps, and velocities follow the oil story—not only water pressure drop.',
        },
        interfaces: {
          title: '3 · Electrical & controls',
          lede: 'Segregate power and signal; land shields once; document IO as-built.',
          r1t: 'As-built IO',
          r1: 'Commissioning dies when the cabinet map disagrees with the PLC tags.',
        },
        risk: {
          title: '4 · Charge, pressure test, quality gates',
          lede: 'Hold points before insulation hides leaks.',
          r1t: 'Gates',
          r1: 'Pressure test → dry → charge → functional IO check → insulation.',
        },
        checklist: {
          title: '5 · Installation checklist',
          items: [
            'Layout vs access drawing signed',
            'Nozzle loads within OEM limits',
            'Earthing / EMC reviewed',
            'Pressure test records',
            'Charge mass logged',
            'Punch list before commissioning',
          ],
        },
        other: {
          title: '6 · Other duties',
          text: 'Rooftop comfort units still need condensate routes and crane plans—same gates, shorter punch lists.',
        },
        faq: [
          ['Who leads the quality gate?', 'Integrator typically; OEM witnesses critical holds on large industrial skids.'],
          ['Can we insulate early?', 'Only after leak tests—insulation is expensive archaeology.'],
        ],
      },
      related: 'Next: <a href="./services-commission.html">Commissioning</a>. Piping guide: <a href="./knowledge-piping.html">Piping</a>.',
    },
    zh: {
      seoTitle: '现场安装 — 工程服务',
      seoDesc: '工业热泵安装：机房布置、管道应力、电气、充注与质量门。',
      kicker: '工程服务 · 售后',
      pageTitle: '现场安装',
      lede: '安装是漂亮 P&ID 遇见重力的地方。保护回油、通道与电气清洁——否则调试只会发明新神话。',
      toc: ['布置', '管道与应力', '电气', '充注与质量门', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 机房布置',
          lede: '给压缩机与换热器留足抽芯空间；检修通道要真能走人。',
          r1t: '通道',
          r1: '最大可更换件应能运出，而不必切割结构钢。',
          r2t: '噪声与振动',
          r2: '隔振与惰性座按 OEM——现场即兴会变成螺栓疲劳。',
        },
        measure: {
          title: '2 · 管道与应力',
          lede: '工业总管会动；热泵不喜欢接管承受管载。',
          r1t: '支架与膨胀',
          r1: '为高温汇的热胀设计；别把机组当锚点。',
          r2t: '回油几何',
          r2: '立管、存油弯与流速服从回油故事——不只是水路压降。',
        },
        interfaces: {
          title: '3 · 电气与控制',
          lede: '强弱电分离；屏蔽单点接地；IO 竣工图要真。',
          r1t: '竣工 IO',
          r1: '柜图与 PLC 标签不一致时，调试会先死。',
        },
        risk: {
          title: '4 · 充注、试压与质量门',
          lede: '保温盖住泄漏之前设停检点。',
          r1t: '门禁',
          r1: '试压 → 干燥 → 充注 → IO 功能检查 → 保温。',
        },
        checklist: {
          title: '5 · 安装检查清单',
          items: [
            '布置对照通道图已签',
            '接管载荷在 OEM 限值内',
            '接地 / EMC 已审',
            '试压记录',
            '充注量入账',
            '调试前尾项清单',
          ],
        },
        other: {
          title: '6 · 其它工况',
          text: '屋顶舒适机组仍需凝水路由与吊装计划——门禁相同，尾项更短。',
        },
        faq: [
          ['质量门谁主持？', '通常集成商；大型工业撬块关键停检由 OEM 见证。'],
          ['能否早保温？', '泄漏试验之后——保温是昂贵的考古。'],
        ],
      },
      related: '下一步：<a href="./services-commission.html">调试</a>。管路导读：<a href="./knowledge-piping.html">管路系统</a>。',
    },
    svg: 'install',
  },
  {
    id: 'commission',
    file: 'services-commission.html',
    js: 'servicesCommission.js',
    prefix: 'servicesCommission',
    en: {
      seoTitle: 'Commissioning — Engineering services',
      seoDesc: 'Industrial heat-pump commissioning: cold/hot tests, duty-point verification, interlocks, handover pack.',
      kicker: 'Engineering services · After-sales',
      pageTitle: 'Commissioning',
      lede: 'Commissioning closes the loop between contract envelopes and living plant. Log duty points; do not “feel” COP.',
      toc: ['Cold / hot', 'Duty points', 'Interlocks', 'Handover', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · Cold then hot',
          lede: 'Prove rotation, valves, and safeties before chasing temperature.',
          r1t: 'Cold checks',
          r1: 'IO, interlocks, leak tightness, oil levels, correct rotation.',
          r2t: 'Hot ramp',
          r2: 'Step toward contractual points; watch discharge temperature and oil return.',
        },
        measure: {
          title: '2 · Duty-point verification',
          lede: 'Use contractual meters; record steady-state windows.',
          r1t: 'Stability',
          r1: 'Define minutes of stable readings before stamping a point.',
        },
        interfaces: {
          title: '3 · Protections & interlocks',
          lede: 'Trip tests are not optional theatre—document each.',
          r1t: 'Evidence',
          r1: 'Screenshot or logger file per trip cause.',
        },
        risk: {
          title: '4 · Handover pack',
          lede: 'As-builts, charge mass, set-point list, open snags, training attendance.',
          r1t: 'Owner readiness',
          r1: 'Who changes set-points after demob? Write the name.',
        },
        checklist: {
          title: '5 · Commissioning checklist',
          items: [
            'Cold functional complete',
            'Contract duty points logged',
            'Trip tests signed',
            'As-built + charge recorded',
            'Training done',
            'Snag list with dates',
          ],
        },
        other: {
          title: '6 · Other duties',
          text: 'Comfort commissioning still needs seasonal modes and defrost observation—shorter, same evidence habit.',
        },
        faq: [
          ['What if a duty point fails?', 'Cure, retest, or renegotiate envelope—do not silently widen tolerances.'],
          ['How long should logs be kept?', 'At least through the warranty window; industrial owners often archive longer.'],
        ],
      },
      related: 'Keep honesty in operation: <a href="./services-maintain.html">Maintenance</a>. Insights: <a href="./articles.html">Content</a>.',
    },
    zh: {
      seoTitle: '调试 — 工程服务',
      seoDesc: '工业热泵调试：冷态/热态、工况点核对、联锁、移交包。',
      kicker: '工程服务 · 售后',
      pageTitle: '调试',
      lede: '调试把合同包络与活着的工厂闭合。记录工况点；不要「凭感觉」谈 COP。',
      toc: ['冷态/热态', '工况点', '联锁', '移交', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 先冷后热',
          lede: '先证明转向、阀门与安全，再追温度。',
          r1t: '冷态检查',
          r1: 'IO、联锁、气密、油位、转向正确。',
          r2t: '热态爬升',
          r2: '步进逼近合同点；盯排气温度与回油。',
        },
        measure: {
          title: '2 · 工况点核对',
          lede: '用合同表计；记录稳态窗口。',
          r1t: '稳定性',
          r1: '盖章前约定稳定读数的分钟数。',
        },
        interfaces: {
          title: '3 · 保护与联锁',
          lede: '跳闸试验不是可选表演——逐项留证。',
          r1t: '证据',
          r1: '每个跳闸原因保留截图或录波。',
        },
        risk: {
          title: '4 · 移交包',
          lede: '竣工图、充注量、设定清单、未闭环尾项、培训签到。',
          r1t: '业主就绪',
          r1: '撤场后谁改设定？写下名字。',
        },
        checklist: {
          title: '5 · 调试检查清单',
          items: [
            '冷态功能完成',
            '合同工况点已记录',
            '跳闸试验已签',
            '竣工图 + 充注量归档',
            '培训完成',
            '尾项带日期',
          ],
        },
        other: {
          title: '6 · 其它工况',
          text: '舒适调试仍需季节模式与化霜观察——更短，证据习惯相同。',
        },
        faq: [
          ['工况点不合格？', '整改、复测或重谈包络——不要悄悄放宽容差。'],
          ['记录保留多久？', '至少覆盖质保期；工业业主常更长归档。'],
        ],
      },
      related: '运行诚实：<a href="./services-maintain.html">维护</a>。洞察：<a href="./articles.html">内容中心</a>。',
    },
    svg: 'commission',
  },
  {
    id: 'maintain',
    file: 'services-maintain.html',
    js: 'servicesMaintain.js',
    prefix: 'servicesMaintain',
    en: {
      seoTitle: 'Maintenance — Engineering services',
      seoDesc: 'Industrial heat-pump maintenance: inspection cadence, oil/refrigerant/HX care, seasonal and part-load operation.',
      kicker: 'Engineering services · After-sales',
      pageTitle: 'Maintenance',
      lede: 'Maintenance keeps the commissioning truth alive. Industrial HTHPs punish neglected oil, fouling, and ignored part-load behaviour.',
      toc: ['Cadence', 'Oil & fluid', 'Heat exchangers', 'Part-load', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · Inspection cadence',
          lede: 'Tie rounds to hours and seasons, not only calendar months.',
          r1t: 'Daily / weekly / outage',
          r1: 'Vibration & temps daily; oil and filters on OEM hours; deep inspection on planned outages.',
        },
        measure: {
          title: '2 · Oil and refrigerant',
          lede: 'Sample oil; track charge trends; never top up blindly.',
          r1t: 'Trends',
          r1: 'Slow charge loss is a leak story—find it before the next guarantee argument.',
        },
        interfaces: {
          title: '3 · Heat exchangers & process side',
          lede: 'Fouling on the process water/steam side looks like “bad COP”.',
          r1t: 'Approach temperature',
          r1: 'Trend approach; clean when economics say so—not when the unit trips.',
        },
        risk: {
          title: '4 · Seasonal and part-load',
          lede: 'Hunting, short cycling, and wrong staging destroy bearings faster than nameplate hours suggest.',
          r1t: 'Controls hygiene',
          r1: 'Review set-points after process changes; link faults to <a href="./articles.html">engineering insights</a> where relevant.',
        },
        checklist: {
          title: '5 · Maintenance checklist',
          items: [
            'Logged operating hours & trips',
            'Oil sample schedule',
            'Charge / leak log',
            'HX approach trends',
            'Seasonal set-point review',
            'Spare critical list updated',
          ],
        },
        other: {
          title: '6 · Other duties',
          text: 'Comfort: filters and outdoor coils dominate. Cold stores: defrost energy and door discipline. Still log—do not guess.',
        },
        faq: [
          ['Can we skip oil samples?', 'On industrial high-lift machines, skipping samples is buying a surprise seizure.'],
          ['When to call for redesign?', 'When process temperatures permanently left the original envelope—maintenance cannot invent lift.'],
        ],
      },
      related: 'Endgame: <a href="./services-eol.html">End of life</a>. Compressors: <a href="./knowledge-compressor.html">Compressor guide</a>.',
    },
    zh: {
      seoTitle: '维护 — 工程服务',
      seoDesc: '工业热泵维护：巡检节奏、油/工质/换热器、季节与变负荷运行。',
      kicker: '工程服务 · 售后',
      pageTitle: '维护',
      lede: '维护让调试时的真相继续活着。工业高温热泵惩罚被忽视的油、结垢与变负荷行为。',
      toc: ['节奏', '油与工质', '换热器', '变负荷', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 巡检节奏',
          lede: '按小时数与季节绑定，而不只是日历月。',
          r1t: '日 / 周 / 大修',
          r1: '振动与温度每日；油与过滤器按 OEM 小时；深度检查放在计划停车。',
        },
        measure: {
          title: '2 · 油与工质',
          lede: '抽检润滑油；跟踪充注趋势；禁止盲目补液。',
          r1t: '趋势',
          r1: '缓慢失充是泄漏故事——在下一次担保争论前找到它。',
        },
        interfaces: {
          title: '3 · 换热器与工艺侧',
          lede: '工艺水/蒸汽侧结垢看起来像「COP 变差」。',
          r1t: '接近温度',
          r1: '趋势接近温；按经济性清洗——不要等跳闸。',
        },
        risk: {
          title: '4 · 季节与变负荷',
          lede: '猎振、短循环与错误分级毁掉轴承的速度，比铭牌小时更快。',
          r1t: '控制卫生',
          r1: '工艺变更后复盘设定；相关故障链到 <a href="./articles.html">工程洞察</a>。',
        },
        checklist: {
          title: '5 · 维护检查清单',
          items: [
            '运行小时与跳闸已记',
            '油样计划',
            '充注 / 泄漏台账',
            '换热器接近温趋势',
            '季节设定复盘',
            '关键备件清单更新',
          ],
        },
        other: {
          title: '6 · 其它工况',
          text: '舒适：过滤网与室外换热器为主。冷库：化霜能耗与门禁纪律。仍要记录——不要猜。',
        },
        faq: [
          ['能否不做油样？', '工业高抬升机组不做油样，等于采购意外咬死。'],
          ['何时该谈改造？', '当工艺温度永久离开原包络——维护变不出抬升。'],
        ],
      },
      related: '终局：<a href="./services-eol.html">寿命终了</a>。压缩机：<a href="./knowledge-compressor.html">压缩机导读</a>。',
    },
    svg: 'maintain',
  },
  {
    id: 'eol',
    file: 'services-eol.html',
    js: 'servicesEol.js',
    prefix: 'servicesEol',
    en: {
      seoTitle: 'End of life — Engineering services',
      seoDesc: 'Industrial heat-pump end of life: rebuild vs replace, refrigerant recovery, reuse and disposal paths. Compliance-minded notes—not legal advice.',
      kicker: 'Engineering services · After-sales',
      pageTitle: 'End of life',
      lede: 'Decide with data: remaining life, refrigerant class, and process need. Recovery and paperwork matter as much as the new machine. <em>Not legal advice.</em>',
      toc: ['Rebuild vs replace', 'Recovery', 'Reuse paths', 'Compliance', 'Checklist', 'Other duties', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · Rebuild vs replace',
          lede: 'Compare compressor hours, exchanger fouling economics, and whether the duty still matches the original envelope.',
          r1t: 'Duty drift',
          r1: 'If the plant now needs higher sink temperatures, a rebuild of the old lift class is nostalgia.',
        },
        measure: {
          title: '2 · Refrigerant recovery',
          lede: 'Plan recovery mass, cylinders, and certified handlers before cutting pipe.',
          r1t: 'Inventory',
          r1: 'As-built charge vs recovered mass—document the delta.',
        },
        interfaces: {
          title: '3 · Reuse and disposal paths',
          lede: 'Skids, metals, and oils follow different streams; keep manifests.',
          r1t: 'Donor parts',
          r1: 'Only reuse parts with traceable history inside a maintained QA system.',
        },
        risk: {
          title: '4 · Compliance prompts',
          lede: 'ODS/HFC rules, pressure-equipment retirement, and local waste codes vary—engage qualified parties.',
          r1t: 'Advisor role',
          r1: 'Independent advice can frame options; licensed contractors execute regulated work.',
        },
        checklist: {
          title: '5 · End-of-life checklist',
          items: [
            'Duty vs remaining life decision record',
            'Recovery plan & certificates',
            'Disposal / reuse manifests',
            'Updated site refrigerant inventory',
            'Lessons learned into next survey',
          ],
        },
        other: {
          title: '6 · Other duties',
          text: 'Comfort replacements still need recovery discipline and electrical isolation permits—smaller scale, same paperwork habit.',
        },
        faq: [
          ['Can we vent “a little”?', 'No. Plan recovery—full stop.'],
          ['When is retrofit better than replace?', 'When the envelope still fits and major pressure parts are healthy; otherwise replace and redesign.'],
        ],
      },
      related: 'Restart the cycle with <a href="./services-survey.html">Site survey</a>. Refrigerants: <a href="./knowledge-refrigerants.html">Refrigerant guide</a>. Policies: <a href="./heat-pump-standards.html#policies">Policies</a>.',
    },
    zh: {
      seoTitle: '寿命终了 — 工程服务',
      seoDesc: '工业热泵寿命终了：改造 vs 更换、工质回收、再利用与报废路径。合规提示——非正式法律意见。',
      kicker: '工程服务 · 售后',
      pageTitle: '寿命终了',
      lede: '用数据决策：剩余寿命、工质类别与工艺需求。回收与票据和换新机同等重要。<em>非正式法律意见。</em>',
      toc: ['改造vs更换', '回收', '再利用路径', '合规', '检查清单', '其它工况', 'FAQ'],
      sections: {
        boundaries: {
          title: '1 · 改造 vs 更换',
          lede: '比较压缩机小时、换热器结垢经济性，以及工况是否仍匹配原包络。',
          r1t: '工况漂移',
          r1: '若工厂现在需要更高汇温，硬改旧抬升等级是怀旧。',
        },
        measure: {
          title: '2 · 工质回收',
          lede: '割管之前规划回收量、钢瓶与有资质人员。',
          r1t: '台账',
          r1: '竣工充注 vs 回收量——记录差额。',
        },
        interfaces: {
          title: '3 · 再利用与报废路径',
          lede: '撬块、金属与油品走不同物流；保留联单。',
          r1t: '供体零件',
          r1: '仅在可追溯与受控质量体系内回用零件。',
        },
        risk: {
          title: '4 · 合规提示',
          lede: 'ODS/HFC 规则、压力容器退役与属地危废要求各异——请合格方执行。',
          r1t: '顾问角色',
          r1: '独立顾问可框定选项；持证承包商执行受监管作业。',
        },
        checklist: {
          title: '5 · 寿命终了清单',
          items: [
            '工况 vs 剩余寿命决策记录',
            '回收计划与证书',
            '处置 / 再利用联单',
            '更新现场工质台账',
            '经验反馈到下一次勘察',
          ],
        },
        other: {
          title: '6 · 其它工况',
          text: '舒适更换仍需回收纪律与电气隔离许可——规模更小，票据习惯相同。',
        },
        faq: [
          ['能否「放一点」？', '不能。规划回收——句号。'],
          ['何时改造优于更换？', '当包络仍匹配且承压件健康；否则更换并重做设计。'],
        ],
      },
      related: '重新开始：<a href="./services-survey.html">现场勘察</a>。制冷剂：<a href="./knowledge-refrigerants.html">制冷剂百科</a>。政策：<a href="./heat-pump-standards.html#policies">政策解读</a>。',
    },
    svg: 'eol',
  },
];

function svgFor(kind) {
  const common = `xmlns="http://www.w3.org" viewBox="0 0 640 220" class="services-svg" role="img"`;
  const svgs = {
    survey: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><rect x="40" y="50" width="140" height="80" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="110" y="95" text-anchor="middle" fill="#1b5e20" font-size="14" font-family="system-ui">Source</text><path d="M180 90 H260" stroke="#2e7d32" stroke-width="2" marker-end="url(#a)"/><rect x="260" y="40" width="120" height="100" rx="8" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="320" y="95" text-anchor="middle" fill="#1b5e20" font-size="13" font-family="system-ui">HTHP</text><path d="M380 90 H460" stroke="#2e7d32" stroke-width="2"/><rect x="460" y="50" width="140" height="80" rx="8" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><text x="530" y="95" text-anchor="middle" fill="#0d47a1" font-size="14" font-family="system-ui">Sink</text><text x="320" y="180" text-anchor="middle" fill="#546e7a" font-size="12" font-family="system-ui">Measure · grade · freeze</text><defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#2e7d32"/></marker></defs></svg>`,
    proposal: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><rect x="30" y="70" width="100" height="50" rx="6" fill="#e8f5e9" stroke="#2e7d32"/><text x="80" y="100" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Duty</text><text x="150" y="100" fill="#2e7d32" font-size="18">→</text><rect x="170" y="55" width="120" height="80" rx="6" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="230" y="100" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Architecture</text><text x="310" y="100" fill="#2e7d32" font-size="18">→</text><rect x="330" y="55" width="120" height="80" rx="6" fill="#fff" stroke="#1565c0" stroke-width="2"/><text x="390" y="100" text-anchor="middle" font-size="12" fill="#0d47a1" font-family="system-ui">Battery limits</text><text x="470" y="100" fill="#2e7d32" font-size="18">→</text><rect x="490" y="70" width="120" height="50" rx="6" fill="#e3f2fd" stroke="#1565c0"/><text x="550" y="100" text-anchor="middle" font-size="12" fill="#0d47a1" font-family="system-ui">Verify</text></svg>`,
    exchange: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><circle cx="160" cy="100" r="48" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="160" y="105" text-anchor="middle" font-size="13" fill="#1b5e20" font-family="system-ui">Owner</text><circle cx="320" cy="100" r="48" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="320" y="105" text-anchor="middle" font-size="13" fill="#1b5e20" font-family="system-ui">EPC</text><circle cx="480" cy="100" r="48" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><text x="480" y="105" text-anchor="middle" font-size="13" fill="#0d47a1" font-family="system-ui">OEM</text><path d="M208 100 H272 M368 100 H432" stroke="#90a4ae" stroke-width="2"/><text x="320" y="180" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">RACI · freeze · next gate</text></svg>`,
    contract: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><rect x="60" y="40" width="240" height="140" rx="8" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="180" y="75" text-anchor="middle" font-size="14" fill="#1b5e20" font-family="system-ui">Contract duty</text><text x="180" y="110" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Paper envelope</text><rect x="340" y="40" width="240" height="140" rx="8" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="460" y="75" text-anchor="middle" font-size="14" fill="#1b5e20" font-family="system-ui">Measured plant</text><text x="460" y="110" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Instruments · truth</text><text x="320" y="200" text-anchor="middle" font-size="12" fill="#c62828" font-family="system-ui">Must overlap</text></svg>`,
    install: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><rect x="40" y="60" width="90" height="40" rx="4" fill="#e8f5e9" stroke="#2e7d32"/><text x="85" y="85" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Layout</text><text x="145" y="85" fill="#2e7d32">→</text><rect x="160" y="60" width="90" height="40" rx="4" fill="#e8f5e9" stroke="#2e7d32"/><text x="205" y="85" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Pipe</text><text x="265" y="85" fill="#2e7d32">→</text><rect x="280" y="60" width="90" height="40" rx="4" fill="#e8f5e9" stroke="#2e7d32"/><text x="325" y="85" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Electrics</text><text x="385" y="85" fill="#2e7d32">→</text><rect x="400" y="60" width="90" height="40" rx="4" fill="#fff" stroke="#1565c0"/><text x="445" y="85" text-anchor="middle" font-size="11" fill="#0d47a1" font-family="system-ui">Test</text><text x="505" y="85" fill="#2e7d32">→</text><rect x="520" y="60" width="90" height="40" rx="4" fill="#e3f2fd" stroke="#1565c0"/><text x="565" y="85" text-anchor="middle" font-size="11" fill="#0d47a1" font-family="system-ui">Charge</text><text x="320" y="150" text-anchor="middle" font-size="12" fill="#546e7a" font-family="system-ui">Quality gates before insulation</text></svg>`,
    commission: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><circle cx="120" cy="110" r="36" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="120" y="115" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Cold</text><path d="M156 110 H220" stroke="#2e7d32" stroke-width="2"/><circle cx="260" cy="110" r="36" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="260" y="115" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Hot</text><path d="M296 110 H360" stroke="#2e7d32" stroke-width="2"/><circle cx="400" cy="110" r="36" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><text x="400" y="115" text-anchor="middle" font-size="11" fill="#0d47a1" font-family="system-ui">Duty</text><path d="M436 110 H500" stroke="#2e7d32" stroke-width="2"/><circle cx="540" cy="110" r="36" fill="#fff3e0" stroke="#ef6c00" stroke-width="2"/><text x="540" y="115" text-anchor="middle" font-size="11" fill="#e65100" font-family="system-ui">Hand</text></svg>`,
    maintain: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><rect x="80" y="40" width="480" height="24" rx="4" fill="#e8f5e9" stroke="#2e7d32"/><text x="320" y="57" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Operating year</text><rect x="100" y="90" width="60" height="70" rx="4" fill="#fff" stroke="#2e7d32"/><text x="130" y="130" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Daily</text><rect x="200" y="90" width="60" height="70" rx="4" fill="#fff" stroke="#2e7d32"/><text x="230" y="130" text-anchor="middle" font-size="11" fill="#1b5e20" font-family="system-ui">Oil</text><rect x="300" y="90" width="60" height="70" rx="4" fill="#fff" stroke="#1565c0"/><text x="330" y="130" text-anchor="middle" font-size="11" fill="#0d47a1" font-family="system-ui">HX</text><rect x="400" y="90" width="60" height="70" rx="4" fill="#fff" stroke="#1565c0"/><text x="430" y="130" text-anchor="middle" font-size="11" fill="#0d47a1" font-family="system-ui">Season</text><rect x="500" y="90" width="60" height="70" rx="4" fill="#fff3e0" stroke="#ef6c00"/><text x="530" y="130" text-anchor="middle" font-size="11" fill="#e65100" font-family="system-ui">Outage</text></svg>`,
    eol: `<svg ${common}><rect width="640" height="220" fill="#f8fafc"/><rect x="240" y="30" width="160" height="40" rx="6" fill="#e8f5e9" stroke="#2e7d32"/><text x="320" y="55" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Decision</text><path d="M320 70 V100" stroke="#2e7d32" stroke-width="2"/><path d="M200 100 H440" stroke="#2e7d32" stroke-width="2"/><path d="M200 100 V120 M440 100 V120" stroke="#2e7d32" stroke-width="2"/><rect x="120" y="120" width="160" height="50" rx="6" fill="#fff" stroke="#2e7d32"/><text x="200" y="150" text-anchor="middle" font-size="12" fill="#1b5e20" font-family="system-ui">Rebuild</text><rect x="360" y="120" width="160" height="50" rx="6" fill="#e3f2fd" stroke="#1565c0"/><text x="440" y="150" text-anchor="middle" font-size="12" fill="#0d47a1" font-family="system-ui">Replace</text><text x="320" y="200" text-anchor="middle" font-size="11" fill="#546e7a" font-family="system-ui">Recover · document · learn</text></svg>`,
  };
  return svgs[kind] || svgs.survey;
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
      [`${p}.figure.caption`]: 'Schematic for orientation—not a design drawing.',
      [`${p}.related.title`]: 'Related on this site',
      [`${p}.related.text`]: e.related,
      [`${p}.disclaimer`]: 'Independent advisory orientation. Not a substitute for codes, OEM manuals, or legal counsel.',
      [`${p}.cta`]: 'Book a 15-minute diagnostic',
    });
    Object.assign(zh, {
      [`${p}.seo.title`]: z.seoTitle,
      [`${p}.seo.desc`]: z.seoDesc,
      [`${p}.kicker`]: z.kicker,
      [`${p}.pageTitle`]: z.pageTitle,
      [`${p}.lede`]: z.lede,
      [`${p}.toc.title`]: '本页目录',
      [`${p}.figure.caption`]: '示意导向——不是施工图。',
      [`${p}.related.title`]: '站内相关',
      [`${p}.related.text`]: z.related,
      [`${p}.disclaimer`]: '独立顾问导向。不能替代规范、OEM 手册或法律意见。',
      [`${p}.cta`]: '预约 15 分钟诊断',
    });
    e.toc.forEach((label, i) => {
      en[`${p}.toc.item${i + 1}`] = label;
      zh[`${p}.toc.item${i + 1}`] = z.toc[i];
    });
    const keys = ['boundaries', 'measure', 'interfaces', 'risk', 'checklist', 'other', 'faq'];
    keys.forEach((k) => {
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
        en[`${p}.faq.title`] = '7 · Quick FAQs';
        zh[`${p}.faq.title`] = '7 · 常见问题';
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
      if (es.r1t) {
        en[`${p}.${k}.r1.title`] = es.r1t;
        en[`${p}.${k}.r1.text`] = es.r1;
        zh[`${p}.${k}.r1.title`] = zs.r1t;
        zh[`${p}.${k}.r1.text`] = zs.r1;
      }
      if (es.r2t) {
        en[`${p}.${k}.r2.title`] = es.r2t;
        en[`${p}.${k}.r2.text`] = es.r2;
        zh[`${p}.${k}.r2.title`] = zs.r2t;
        zh[`${p}.${k}.r2.text`] = zs.r2;
      }
      if (es.r3t) {
        en[`${p}.${k}.r3.title`] = es.r3t;
        en[`${p}.${k}.r3.text`] = es.r3;
        zh[`${p}.${k}.r3.title`] = zs.r3t;
        zh[`${p}.${k}.r3.text`] = zs.r3;
      }
    });
  }
  return { en, zh };
}

function chapterHtml(ch) {
  const p = ch.prefix;
  const ids = ['boundaries', 'measure', 'interfaces', 'risk', 'checklist', 'other', 'faq'];
  const tocItems = ids
    .map(
      (id, i) =>
        `<li class="knowledge-toc-item"><a class="knowledge-toc-link" href="#svc-${ch.id}-${id}"><span class="knowledge-toc-kicker">Ch. ${i + 1}</span><span class="knowledge-toc-link-title" data-i18n="${p}.toc.item${i + 1}"></span></a></li>`
    )
    .join('\n');

  const reasonBlock = (sec) => {
    let html = `<p class="knowledge-article2-lede" data-i18n="${p}.${sec}.lede" data-i18n-html="true"></p>`;
    if (sec === 'boundaries') {
      html += `<figure class="knowledge-co2-figure services-figure">${svgFor(ch.svg)}<figcaption class="knowledge-co2-figure-caption" data-i18n="${p}.figure.caption"></figcaption></figure>`;
    }
    html += `<div class="knowledge-reasons knowledge-reasons--article2">`;
    for (let n = 1; n <= 3; n++) {
      html += `<div class="knowledge-reason" data-svc-reason="${p}.${sec}.r${n}"><h3 class="knowledge-reason-title" data-i18n="${p}.${sec}.r${n}.title"></h3><p class="knowledge-reason-text" data-i18n="${p}.${sec}.r${n}.text" data-i18n-html="true"></p></div>`;
    }
    html += `</div>`;
    return html;
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
                        <ol class="knowledge-toc-list">${tocItems}</ol>
                    </nav>
                    <div class="knowledge-actions">
                        <a class="knowledge-btn knowledge-btn-primary" href="./services.html" data-i18n="nav.services">Services</a>
                        <button type="button" class="knowledge-btn knowledge-btn-secondary" id="services-contact-cta" data-i18n="${p}.cta"></button>
                    </div>
                </div>
            </div>
        </header>

        <section id="svc-${ch.id}-boundaries" class="knowledge-article knowledge-section" aria-labelledby="svc-${ch.id}-boundaries-title">
            <div class="container">
                <h2 class="knowledge-section-title" id="svc-${ch.id}-boundaries-title" data-i18n="${p}.boundaries.title"></h2>
                ${reasonBlock('boundaries')}
            </div>
        </section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-measure" class="knowledge-article knowledge-section" aria-labelledby="svc-${ch.id}-measure-title">
            <div class="container">
                <h2 class="knowledge-section-title" id="svc-${ch.id}-measure-title" data-i18n="${p}.measure.title"></h2>
                ${reasonBlock('measure')}
            </div>
        </section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-interfaces" class="knowledge-article knowledge-section" aria-labelledby="svc-${ch.id}-interfaces-title">
            <div class="container">
                <h2 class="knowledge-section-title" id="svc-${ch.id}-interfaces-title" data-i18n="${p}.interfaces.title"></h2>
                ${reasonBlock('interfaces')}
            </div>
        </section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-risk" class="knowledge-article knowledge-section" aria-labelledby="svc-${ch.id}-risk-title">
            <div class="container">
                <h2 class="knowledge-section-title" id="svc-${ch.id}-risk-title" data-i18n="${p}.risk.title"></h2>
                ${reasonBlock('risk')}
            </div>
        </section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-checklist" class="knowledge-article knowledge-section" aria-labelledby="svc-${ch.id}-checklist-title">
            <div class="container">
                <h2 class="knowledge-section-title" id="svc-${ch.id}-checklist-title" data-i18n="${p}.checklist.title"></h2>
                <ul class="knowledge-select-list">
                    ${[1, 2, 3, 4, 5, 6].map((n) => `<li data-i18n="${p}.checklist.i${n}"></li>`).join('\n')}
                </ul>
            </div>
        </section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-other" class="knowledge-article knowledge-section" aria-labelledby="svc-${ch.id}-other-title">
            <div class="container">
                <h2 class="knowledge-section-title" id="svc-${ch.id}-other-title" data-i18n="${p}.other.title"></h2>
                <p class="knowledge-reason-text services-callout" data-i18n="${p}.other.text" data-i18n-html="true"></p>
            </div>
        </section>
        <hr class="knowledge-chapter-rule" aria-hidden="true" />
        <section id="svc-${ch.id}-faq" class="knowledge-article knowledge-section" aria-labelledby="svc-${ch.id}-faq-title">
            <div class="container">
                <h2 class="knowledge-section-title" id="svc-${ch.id}-faq-title" data-i18n="${p}.faq.title"></h2>
                <div class="knowledge-faq">
                    <details class="knowledge-faq-item"><summary class="knowledge-faq-q" data-i18n="${p}.faq.q1"></summary><p class="knowledge-faq-a" data-i18n="${p}.faq.a1" data-i18n-html="true"></p></details>
                    <details class="knowledge-faq-item"><summary class="knowledge-faq-q" data-i18n="${p}.faq.q2"></summary><p class="knowledge-faq-a" data-i18n="${p}.faq.a2" data-i18n-html="true"></p></details>
                </div>
                <p class="knowledge-reason-text knowledge-article5-disclaimer" data-i18n="${p}.disclaimer"></p>
            </div>
        </section>
        <footer class="knowledge-footer">
            <div class="container">
                <div class="knowledge-footer-card">
                    <p class="knowledge-footer-title" data-i18n="${p}.related.title"></p>
                    <p class="knowledge-footer-text" data-i18n="${p}.related.text" data-i18n-html="true"></p>
                </div>
                <div class="site-legal-disclaimer-slot" data-site-disclaimer-slot></div>
            </div>
        </footer>
    </main>
</body>
</html>`;
}

function jsFile(ch) {
  return `import { initServicesChapter } from './servicesPageInit.js';
initServicesChapter('${ch.prefix}');
`;
}

// Write i18n
const { en, zh } = buildI18n();
const i18nBody = `export const servicesTranslations = {
    en: ${JSON.stringify(en, null, 4)},
    zh: ${JSON.stringify(zh, null, 4)},
};
`;
writeFileSync(join(ROOT, 'src/i18nServices.js'), i18nBody);

writeFileSync(
  join(ROOT, 'src/servicesPageInit.js'),
  `import { initLanguageSwitcher, translations } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';
import { initHubDirectoryFromPath } from './hubDirectory.js';
import { initContactModal } from './contactModal.js';

export function initServicesChapter(prefix) {
    function updateMeta(lang) {
        const title = translations[lang]?.[\`\${prefix}.seo.title\`];
        const desc = translations[lang]?.[\`\${prefix}.seo.desc\`];
        if (title) {
            document.title = title;
            document.getElementById('meta-page-title')?.setAttribute('content', title);
            document.getElementById('meta-og-title')?.setAttribute('content', title);
            document.getElementById('meta-twitter-title')?.setAttribute('content', title);
        }
        if (desc) {
            document.getElementById('meta-page-description')?.setAttribute('content', desc);
            document.getElementById('meta-og-description')?.setAttribute('content', desc);
            document.getElementById('meta-twitter-description')?.setAttribute('content', desc);
        }
        // Hide reason cards whose title key is missing
        document.querySelectorAll('[data-svc-reason]').forEach((el) => {
            const key = el.getAttribute('data-svc-reason') + '.title';
            const has = Boolean(translations[lang]?.[key] || translations.en?.[key]);
            el.hidden = !has;
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initLanguageSwitcher({
            afterSet: (lang) => {
                updateMeta(lang);
                refreshWhatsNewLanguage(lang);
            },
        });
        initSiteLegalDisclaimer();
        initNavChipHighlight();
        initWhatsNew();
        initHubDirectoryFromPath();
        initContactModal([document.getElementById('services-contact-cta')].filter(Boolean));
    });
}
`
);

for (const ch of CHAPTERS) {
  writeFileSync(join(ROOT, ch.file), chapterHtml(ch));
  writeFileSync(join(ROOT, 'src', ch.js), jsFile(ch));
  console.log('wrote', ch.file, ch.js);
}

console.log('services chapters generated');
