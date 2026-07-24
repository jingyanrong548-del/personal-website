/**
 * Tool orchestration framework — Phase 1 mock.
 * Maps user intents → Engineering Suite tools / knowledge URLs.
 * Future: AI Agent → live calculators → structured results.
 */

import { aiLiveEnabled, apiRoot } from './config.js';

/** @typedef {{ id: string, labelKey: string, kind: 'tool'|'knowledge'|'ai', url?: string, status: 'live'|'mock'|'coming' }} ToolDef */

/** @type {Record<string, ToolDef>} */
export const TOOL_CATALOG = {
  cycle_balance: {
    id: 'cycle_balance',
    labelKey: 'tools.orch.cycleBalance',
    kind: 'knowledge',
    url: '/knowledge-cycles.html',
    status: 'mock',
  },
  cop_estimate: {
    id: 'cop_estimate',
    labelKey: 'tools.orch.copEstimate',
    kind: 'ai',
    status: 'mock',
  },
  cycle_selector: {
    id: 'cycle_selector',
    labelKey: 'tools.orch.cycleSelector',
    kind: 'ai',
    status: 'mock',
  },
  compressor_match: {
    id: 'compressor_match',
    labelKey: 'tools.orch.compressorMatch',
    kind: 'knowledge',
    url: '/knowledge-compressor.html',
    status: 'mock',
  },
  hx_screening: {
    id: 'hx_screening',
    labelKey: 'tools.orch.hxScreening',
    kind: 'knowledge',
    url: '/knowledge-exchanger.html',
    status: 'mock',
  },
  payback_estimate: {
    id: 'payback_estimate',
    labelKey: 'tools.orch.payback',
    kind: 'tool',
    url: 'https://ba.jingyanrong.com',
    status: 'live',
  },
  report_outline: {
    id: 'report_outline',
    labelKey: 'tools.orch.reportOutline',
    kind: 'ai',
    status: 'coming',
  },
  matching_calc: {
    id: 'matching_calc',
    labelKey: 'tools.orch.matching',
    kind: 'tool',
    url: 'https://mc.jingyanrong.com',
    status: 'live',
  },
};

/**
 * @param {string[]} toolIds
 * @returns {Promise<Array<{ toolId: string, status: string, summary: string, url?: string }>>}
 */
export async function invokeTools(toolIds, locale = 'en') {
  if (aiLiveEnabled()) {
    try {
      const res = await fetch(`${apiRoot()}/v1/tools/orchestrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tools: toolIds, locale }),
      });
      if (res.ok) return res.json();
    } catch {
      /* fall through to local mock */
    }
  }

  return toolIds.map((id) => {
    const def = TOOL_CATALOG[id];
    const zh = locale === 'zh';
    if (!def) {
      return {
        toolId: id,
        status: 'missing',
        summary: zh ? `未知工具：${id}` : `Unknown tool: ${id}`,
      };
    }
    return {
      toolId: id,
      status: def.status,
      url: def.url,
      summary:
        def.status === 'live'
          ? zh
            ? `已链接工程套件工具（可在新标签打开）。`
            : `Linked to Engineering Suite tool (open in new tab).`
          : def.status === 'coming'
            ? zh
              ? `占位：报告生成将在 Phase 2 接入。`
              : `Placeholder: report generation lands in Phase 2.`
            : zh
              ? `Mock 调用成功 — 契约已预留，待接真实计算模型。`
              : `Mock invoke OK — contract reserved for live calculators.`,
    };
  });
}

/**
 * Explain a calculator (future Tools Center AI button).
 * @param {{ toolId: string, inputs?: object, locale?: string }} payload
 */
export async function explainTool(payload) {
  if (aiLiveEnabled()) {
    try {
      const res = await fetch(`${apiRoot()}/v1/tools/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return res.json();
    } catch {
      /* fall through */
    }
  }
  const zh = payload.locale === 'zh';
  return {
    status: 'ok',
    toolId: payload.toolId,
    explanation: zh
      ? '工具解释 API 契约已就绪（Phase 1 mock）。后续由 AI 解释输入/输出与边界假设。'
      : 'Tool-explain API contract ready (Phase 1 mock). Future AI will explain I/O and boundary assumptions.',
  };
}
