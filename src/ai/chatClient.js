/**
 * Workspace chat client — Phase 1 mock turns.
 * Reuses thermalEngineerClient.analyze; routes agents + tools for UI transparency.
 */

import { analyze } from './thermalEngineerClient.js';
import { routeAgents, getAgent } from './agentRegistry.js';
import { invokeTools, TOOL_CATALOG } from './toolsOrchestrator.js';

/**
 * Parse free-text engineering brief into structured fields.
 * @param {string} text
 * @returns {{ sourceTempC?: number, targetTempC?: number, heatLoadKw?: number, refrigerant?: string, copMin?: number }}
 */
export function parseEngineeringBrief(text) {
  const out = {};
  if (!text) return out;

  const deg = String.raw`(?:℃|°\s*[Cc]|[Cc])`;
  const source =
    text.match(new RegExp(String.raw`(?:热源|source|waste\s*heat)[^\d]{0,40}(-?\d+(?:\.\d+)?)\s*${deg}`, 'i')) ||
    text.match(new RegExp(String.raw`(-?\d+(?:\.\d+)?)\s*${deg}\s*(?:废热|热水|热源)`, 'i'));
  const target =
    text.match(new RegExp(String.raw`(?:热汇|目标|sink|target|供水)[^\d]{0,40}(-?\d+(?:\.\d+)?)\s*${deg}`, 'i')) ||
    text.match(new RegExp(String.raw`(-?\d+(?:\.\d+)?)\s*${deg}\s*(?:热水|热汇|工艺)`, 'i'));
  const load =
    text.match(/(?:负荷|需求|duty|load|capacity)[^\d]{0,24}(\d+(?:\.\d+)?)\s*kW/i) ||
    text.match(/(\d+(?:\.\d+)?)\s*kW/i);
  const cop = text.match(/COP\s*[>≥>=]+\s*(\d+(?:\.\d+)?)/i);
  const ref =
    text.match(/\b(R\d{3,4}[A-Za-z()]*|CO₂|CO2|R1234ze(?:\(E\))?|R515B|R245fa|R290|R134a)\b/i);

  if (source) out.sourceTempC = Number(source[1]);
  if (target) out.targetTempC = Number(target[1]);
  if (load) out.heatLoadKw = Number(load[1]);
  if (cop) out.copMin = Number(cop[1]);
  if (ref) out.refrigerant = ref[1].replace(/CO2/i, 'CO₂');

  // Fallback: first two temperature numbers as source/target if labels missing
  if (out.sourceTempC == null || out.targetTempC == null) {
    const temps = [...text.matchAll(new RegExp(String.raw`(-?\d+(?:\.\d+)?)\s*${deg}`, 'gi'))].map((m) =>
      Number(m[1])
    );
    if (temps.length >= 2) {
      if (out.sourceTempC == null) out.sourceTempC = temps[0];
      if (out.targetTempC == null) out.targetTempC = temps[1];
    }
  }

  return out;
}

/**
 * @typedef {object} ProjectContext
 * @property {string} [name]
 * @property {number} [sourceTempC]
 * @property {number} [targetTempC]
 * @property {number} [heatLoadKw]
 * @property {string} [refrigerant]
 * @property {string} [compressor]
 * @property {string} [hx]
 * @property {number} [copTarget]
 * @property {string} [budget]
 */

/**
 * @param {{ message: string, context?: ProjectContext, locale?: string }} input
 */
export async function chatTurn(input) {
  const locale = input.locale === 'zh' ? 'zh' : 'en';
  const message = (input.message || '').trim();
  const parsed = parseEngineeringBrief(message);
  const ctx = { ...(input.context || {}), ...parsed };

  const sourceTempC = numOr(ctx.sourceTempC, 80);
  const targetTempC = numOr(ctx.targetTempC, 95);
  const heatLoadKw = numOr(ctx.heatLoadKw, 2000);
  const refrigerant = ctx.refrigerant || 'R1234ze(E)';
  const liftK = targetTempC - sourceTempC;

  const agentIds = routeAgents({
    text: message,
    targetTempC,
    liftK,
    heatLoadKw,
  });

  const toolIds = [];
  agentIds.forEach((id) => {
    const agent = getAgent(id);
    (agent?.tools || []).forEach((t) => {
      if (!toolIds.includes(t)) toolIds.push(t);
    });
  });
  if (heatLoadKw >= 500 && !toolIds.includes('matching_calc')) toolIds.push('matching_calc');

  const [analysis, toolResults] = await Promise.all([
    analyze({
      sourceTempC,
      targetTempC,
      heatLoadKw,
      refrigerant,
      notes: message,
      locale,
      clientVersion: 'ota-workspace-1.0',
    }),
    invokeTools(toolIds.slice(0, 6), locale),
  ]);

  const agents = agentIds.map((id) => {
    const a = getAgent(id);
    return { id, nameKey: a?.nameKey, roleKey: a?.roleKey };
  });

  const reply = buildReply({
    locale,
    message,
    analysis,
    agents,
    toolResults,
    copTarget: ctx.copTarget ?? parsed.copMin,
    sourceTempC,
    targetTempC,
    heatLoadKw,
    refrigerant,
  });

  return {
    status: 'ok',
    mode: 'mock',
    contextPatch: {
      sourceTempC,
      targetTempC,
      heatLoadKw,
      refrigerant,
      copTarget: ctx.copTarget ?? parsed.copMin ?? null,
    },
    agents,
    tools: toolResults.map((t) => ({
      ...t,
      labelKey: TOOL_CATALOG[t.toolId]?.labelKey,
    })),
    analysis,
    reply,
  };
}

function numOr(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function buildReply({
  locale,
  analysis,
  agents,
  toolResults,
  copTarget,
  sourceTempC,
  targetTempC,
  heatLoadKw,
  refrigerant,
}) {
  const zh = locale === 'zh';
  const cop = analysis.performance?.copBand || [];
  const agentLine = agents.map((a) => a.id).join(' → ');
  const toolLine = toolResults.map((t) => t.toolId).join(', ');

  let copNote = '';
  if (copTarget != null && cop.length) {
    const mid = (cop[0] + cop[1]) / 2;
    copNote =
      mid >= copTarget
        ? zh
          ? `示意 COP 区间 ${cop[0]}–${cop[1]}，相对目标 COP>${copTarget} 初步可达（需实测边界复核）。`
          : `Indicative COP band ${cop[0]}–${cop[1]} vs target COP>${copTarget}: tentatively feasible (verify with measured boundaries).`
        : zh
          ? `示意 COP 区间 ${cop[0]}–${cop[1]}，相对目标 COP>${copTarget} 可能偏紧 — 建议降低温升或改两级/复叠。`
          : `Indicative COP band ${cop[0]}–${cop[1]} vs target COP>${copTarget}: may be tight — consider lower lift or two-stage/cascade.`;
  }

  if (zh) {
    return [
      `【Phase 1 Mock · 非真实大模型】`,
      `工况：热源 ${sourceTempC}°C → 热汇 ${targetTempC}°C，负荷 ${heatLoadKw} kW，工质 ${refrigerant}。`,
      `Agent 路由：${agentLine}`,
      `工具编排：${toolLine}`,
      ``,
      analysis.concept?.summary || '',
      copNote,
      `风险提示：${(analysis.risks || []).map((r) => r.text).join('；')}`,
      ``,
      `下一步：在右侧完善项目上下文，或打开 AI Thermal Engineer / Engineering Suite 做可审计计算。工程报告 PDF 为 Phase 2。`,
    ].join('\n');
  }

  return [
    `[Phase 1 Mock · not a live LLM]`,
    `Duty: source ${sourceTempC}°C → sink ${targetTempC}°C, ${heatLoadKw} kW, refrigerant ${refrigerant}.`,
    `Agent route: ${agentLine}`,
    `Tool orchestration: ${toolLine}`,
    ``,
    analysis.concept?.summary || '',
    copNote,
    `Risks: ${(analysis.risks || []).map((r) => r.text).join('; ')}`,
    ``,
    `Next: refine project context on the right, or open AI Thermal Engineer / Engineering Suite for auditable calcs. PDF report is Phase 2.`,
  ].join('\n');
}
