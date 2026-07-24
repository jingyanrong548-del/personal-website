/**
 * AI Thermal Engineer client — Phase 1 mock; flip USE_AI_API for live FastAPI.
 * Contract: POST /v1/thermal-engineer/analyze
 */

export const USE_AI_API = false;
export const AI_API_BASE = '';

/**
 * @typedef {object} AnalyzeRequest
 * @property {number} sourceTempC
 * @property {number} targetTempC
 * @property {number} heatLoadKw
 * @property {string} [refrigerant]
 * @property {{ maxDischargeC?: number }} [constraints]
 * @property {string} [notes]
 * @property {string} [locale]
 * @property {string} [clientVersion]
 */

/**
 * @typedef {object} AnalyzeResponse
 * @property {'ok'|'error'} status
 * @property {string} disclaimer
 * @property {{ cycle: string, summary: string }} concept
 * @property {{ type: string, notes: string[] }} compressor
 * @property {{ evaporator: object, condenser: object }} heatExchangers
 * @property {{ copBand: [number, number], confidence: string }} performance
 * @property {Array<{ id: string, severity: string, text: string }>} risks
 * @property {Array<{ type: string, url: string }>} refs
 */

/**
 * @param {AnalyzeRequest} payload
 * @returns {Promise<AnalyzeResponse>}
 */
export async function analyze(payload) {
  if (USE_AI_API && AI_API_BASE) {
    const res = await fetch(`${AI_API_BASE}/v1/thermal-engineer/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, clientVersion: 'ota-web-1.0' }),
    });
    if (!res.ok) throw new Error(`AI API ${res.status}`);
    return res.json();
  }
  return mockAnalyze(payload);
}

/**
 * @param {AnalyzeRequest} req
 * @returns {AnalyzeResponse}
 */
export function mockAnalyze(req) {
  const lift = (req.targetTempC ?? 0) - (req.sourceTempC ?? 0);
  const load = req.heatLoadKw ?? 0;
  const refrigerant = req.refrigerant || 'R1234ze(E)';
  const locale = req.locale === 'zh' ? 'zh' : 'en';

  let cycle = 'single_stage_vchp';
  let cycleLabel = locale === 'zh' ? '单级蒸汽压缩热泵' : 'Single-stage vapor-compression heat pump';
  if (lift > 70) {
    cycle = 'two_stage_or_cascade';
    cycleLabel = locale === 'zh' ? '两级压缩或复叠循环' : 'Two-stage or cascade cycle';
  }
  if (req.targetTempC >= 100 && lift > 50) {
    cycle = 'hthp_cascade_candidate';
    cycleLabel = locale === 'zh' ? '高温热泵 / 复叠候选' : 'HTHP / cascade candidate';
  }

  const copLow = Math.max(1.4, 3.8 - lift / 55);
  const copHigh = copLow + 0.45;

  const summary =
    locale === 'zh'
      ? `热源 ${req.sourceTempC}°C → 目标 ${req.targetTempC}°C（温升约 ${lift.toFixed(0)} K），负荷 ${load} kW，工质 ${refrigerant}。建议按「${cycleLabel}」做概念设计；结果仅为示意，不可直接用于采购或盖章。`
      : `Source ${req.sourceTempC}°C → sink ${req.targetTempC}°C (lift ~${lift.toFixed(0)} K), duty ${load} kW, refrigerant ${refrigerant}. Concept: ${cycleLabel}. Illustrative only — not for procurement or PE stamp.`;

  const compressorType = lift > 60 ? 'screw_or_multi_stage' : 'screw_or_scroll';
  const compressorNotes =
    locale === 'zh'
      ? [
          '核对排气温度与润滑油耐温',
          '温升较大时评估喷气增焓 / 中间冷却',
          '确认电机与变频器在目标冷凝压力下的裕度',
        ]
      : [
          'Check discharge temperature vs oil rating',
          'For large lift, evaluate economizer / intercooling',
          'Confirm VFD and motor margin at target condensing pressure',
        ];

  const risks = [];
  if (lift > 80) {
    risks.push({
      id: 'lift',
      severity: 'high',
      text:
        locale === 'zh'
          ? '温升偏大：单级可能不可行，优先两级/复叠并复核压缩比。'
          : 'Large temperature lift: single-stage may be infeasible; prefer two-stage/cascade and verify compression ratio.',
    });
  }
  if (req.targetTempC >= 120) {
    risks.push({
      id: 'oil',
      severity: 'high',
      text:
        locale === 'zh'
          ? '高温工况：润滑油与密封材料选型是常见失效点。'
          : 'High sink temperature: oil and elastomer selection are common failure points.',
    });
  }
  if (load > 1000) {
    risks.push({
      id: 'capacity',
      severity: 'medium',
      text:
        locale === 'zh'
          ? '大负荷：考虑并联机组与部分负荷效率，而非单机极限点。'
          : 'Large duty: consider parallel machines and part-load efficiency, not a single peak point.',
    });
  }
  if (!risks.length) {
    risks.push({
      id: 'boundary',
      severity: 'low',
      text:
        locale === 'zh'
          ? '请用实测热源波动与工艺回水温度复核边界，再进入设备选型。'
          : 'Re-check boundaries with measured source swing and process return temperatures before equipment selection.',
    });
  }

  return {
    status: 'ok',
    disclaimer: 'engineering_aid_not_stamp',
    concept: { cycle, summary },
    compressor: { type: compressorType, notes: compressorNotes },
    heatExchangers: {
      evaporator: {
        note:
          locale === 'zh'
            ? '按热源侧温差与结垢裕度选型；余热水质需明确。'
            : 'Size for source-side approach and fouling; clarify waste-heat fluid quality.',
      },
      condenser: {
        note:
          locale === 'zh'
            ? '冷凝器按工艺热媒温升与最小传热温差校核。'
            : 'Condenser: verify process-fluid rise and minimum approach.',
      },
    },
    performance: {
      copBand: [Number(copLow.toFixed(2)), Number(copHigh.toFixed(2))],
      confidence: lift > 70 ? 'low' : 'medium',
    },
    risks,
    refs: [
      { type: 'knowledge', url: '/knowledge-cycles.html' },
      { type: 'knowledge', url: '/knowledge-exchanger.html' },
      { type: 'tool', url: '/tools.html' },
      { type: 'case', url: '/cases.html' },
    ],
  };
}
