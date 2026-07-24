/**
 * Multi-agent registry — Phase 1 planning shell.
 * Agents are routed for UI transparency; live LLM orchestration comes later.
 */

/** @typedef {{ id: string, nameKey: string, roleKey: string, tools: string[] }} AgentDef */

/** @type {AgentDef[]} */
export const AGENTS = [
  {
    id: 'thermodynamic',
    nameKey: 'agents.thermo.name',
    roleKey: 'agents.thermo.role',
    tools: ['cycle_balance', 'cop_estimate'],
  },
  {
    id: 'cycle',
    nameKey: 'agents.cycle.name',
    roleKey: 'agents.cycle.role',
    tools: ['cycle_selector'],
  },
  {
    id: 'compressor',
    nameKey: 'agents.compressor.name',
    roleKey: 'agents.compressor.role',
    tools: ['compressor_match'],
  },
  {
    id: 'hx',
    nameKey: 'agents.hx.name',
    roleKey: 'agents.hx.role',
    tools: ['hx_screening'],
  },
  {
    id: 'economic',
    nameKey: 'agents.economic.name',
    roleKey: 'agents.economic.role',
    tools: ['payback_estimate'],
  },
  {
    id: 'report',
    nameKey: 'agents.report.name',
    roleKey: 'agents.report.role',
    tools: ['report_outline'],
  },
];

/**
 * Heuristic agent routing from free-text + structured context.
 * @param {{ text?: string, targetTempC?: number, liftK?: number, heatLoadKw?: number }} ctx
 * @returns {string[]} agent ids in suggested order
 */
export function routeAgents(ctx = {}) {
  const text = (ctx.text || '').toLowerCase();
  const ordered = ['thermodynamic', 'cycle'];

  if (ctx.liftK != null && ctx.liftK > 50) ordered.push('compressor');
  if (ctx.targetTempC != null && ctx.targetTempC >= 100) ordered.push('hx');
  if (ctx.heatLoadKw != null && ctx.heatLoadKw >= 500) ordered.push('economic');
  if (/cop|经济|payback|capex|opex|roi|回收|投资|cost/.test(text)) {
    if (!ordered.includes('economic')) ordered.push('economic');
  }
  if (/报告|report|pdf|方案/.test(text)) ordered.push('report');
  if (!ordered.includes('compressor')) ordered.push('compressor');
  if (!ordered.includes('hx')) ordered.push('hx');
  if (!ordered.includes('economic')) ordered.push('economic');
  if (!ordered.includes('report')) ordered.push('report');

  return [...new Set(ordered)];
}

export function getAgent(id) {
  return AGENTS.find((a) => a.id === id) || null;
}
