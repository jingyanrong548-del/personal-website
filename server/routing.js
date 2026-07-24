/** Minimal agent + tool routing for server-side chat (mirrors frontend registry). */

const AGENTS = [
  { id: 'thermodynamic', tools: ['carnot_cop'] },
  { id: 'cycle', tools: ['matching_calc'] },
  { id: 'compressor', tools: ['matching_calc'] },
  { id: 'hx', tools: ['lmtd_calc'] },
  { id: 'economic', tools: ['lcoe_calc'] },
  { id: 'report', tools: [] },
];

const TOOL_LABELS = {
  carnot_cop: { en: 'Carnot COP ceiling', zh: '卡诺 COP 上限' },
  matching_calc: { en: 'Duty matching', zh: '负荷匹配' },
  lmtd_calc: { en: 'LMTD / HX sizing aid', zh: 'LMTD / 换热器辅助' },
  lcoe_calc: { en: 'LCOE sketch', zh: 'LCOE 示意' },
};

export function routeAgents({ text = '', targetTempC, liftK, heatLoadKw }) {
  const ids = ['thermodynamic', 'cycle'];
  if (liftK > 50 || /compress|压缩机|排气/i.test(text)) ids.push('compressor');
  if (/hx|换热器|蒸发|冷凝|LMTD/i.test(text)) ids.push('hx');
  if (targetTempC >= 100 || /HTHP|高温/i.test(text)) {
    if (!ids.includes('compressor')) ids.push('compressor');
  }
  if (heatLoadKw >= 500 || /cost|经济|LCOE|payback/i.test(text)) ids.push('economic');
  ids.push('report');
  return [...new Set(ids)];
}

export function pickTools(agentIds, heatLoadKw) {
  const toolIds = [];
  for (const id of agentIds) {
    const a = AGENTS.find((x) => x.id === id);
    for (const t of a?.tools || []) {
      if (!toolIds.includes(t)) toolIds.push(t);
    }
  }
  if (heatLoadKw >= 500 && !toolIds.includes('matching_calc')) toolIds.push('matching_calc');
  return toolIds.slice(0, 6);
}

export function describeTools(toolIds, locale) {
  const zh = locale === 'zh';
  return toolIds.map((toolId) => ({
    toolId,
    status: 'live-proxy',
    summary: zh
      ? `${TOOL_LABELS[toolId]?.zh || toolId}（代理侧路由；详细计算仍在 Engineering Suite）`
      : `${TOOL_LABELS[toolId]?.en || toolId} (routed by proxy; auditable calc remains in Engineering Suite)`,
    url: '/tools.html',
    labelKey: null,
  }));
}
