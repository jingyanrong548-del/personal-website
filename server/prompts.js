export function systemPrompt(locale) {
  const zh = locale === 'zh';
  if (zh) {
    return [
      '你是 Open Thermal AI Copilot，工业热泵 / 制冷系统设计助手。',
      '用户会给出工况与一份「规则引擎」结构化结果（循环建议、示意 COP、风险）。',
      '请基于这些事实用中文回复：简洁、分点、可执行下一步；不要编造精确设备型号或保证 COP。',
      '必须强调：结果为工程辅助示意，不可直接用于采购、盖章或安全认证。',
      '若温升很大或高温工况，优先提示两级/复叠、排气温度与油品风险。',
      '不要输出 JSON；用清晰段落与短列表。',
    ].join('\n');
  }
  return [
    'You are Open Thermal AI Copilot, an industrial heat-pump / refrigeration design assistant.',
    'The user provides a duty brief plus structured results from a rule engine (cycle concept, indicative COP, risks).',
    'Reply in English: concise, actionable bullets; do not invent exact OEM models or guaranteed COP.',
    'Always state: engineering aid only — not for procurement, PE stamp, or safety certification.',
    'For large lift / high sink T, prioritize two-stage/cascade, discharge temperature, and oil risks.',
    'Do not output JSON; use clear paragraphs and short lists.',
  ].join('\n');
}

export function userPrompt({ locale, message, analysis, agents, tools, duty }) {
  const zh = locale === 'zh';
  return [
    zh ? '【用户简报】' : '[User brief]',
    message,
    '',
    zh ? '【解析工况】' : '[Parsed duty]',
    JSON.stringify(duty, null, 2),
    '',
    zh ? '【规则引擎结果】' : '[Rule-engine analysis]',
    JSON.stringify(
      {
        concept: analysis.concept,
        performance: analysis.performance,
        compressor: analysis.compressor,
        risks: analysis.risks,
      },
      null,
      2
    ),
    '',
    zh ? '【Agent 路由】' : '[Agent route]',
    agents.map((a) => a.id).join(' → '),
    '',
    zh ? '【工具编排】' : '[Tools]',
    tools.map((t) => t.toolId).join(', '),
    '',
    zh
      ? '请写一段面向工程师的回复（含：概念建议、示意 COP 解读、主要风险、建议的下一步）。'
      : 'Write an engineer-facing reply (concept, indicative COP reading, key risks, suggested next steps).',
  ].join('\n');
}

export function fallbackReply({ locale, analysis, agents, tools, duty, error }) {
  const zh = locale === 'zh';
  const cop = analysis.performance?.copBand || [];
  const agentLine = agents.map((a) => a.id).join(' → ');
  const toolLine = tools.map((t) => t.toolId).join(', ');
  const errLine = error
    ? zh
      ? `（大模型暂不可用：${error}；以下为规则引擎回退）`
      : `(LLM unavailable: ${error}; rule-engine fallback below)`
    : '';

  if (zh) {
    return [
      `【Open Thermal AI · 规则引擎${error ? '回退' : ''}】${errLine}`,
      `工况：热源 ${duty.sourceTempC}°C → 热汇 ${duty.targetTempC}°C，负荷 ${duty.heatLoadKw} kW，工质 ${duty.refrigerant}。`,
      `Agent 路由：${agentLine}`,
      `工具编排：${toolLine}`,
      '',
      analysis.concept?.summary || '',
      cop.length ? `示意 COP 区间：${cop[0]}–${cop[1]}` : '',
      `风险：${(analysis.risks || []).map((r) => r.text).join('；')}`,
      '',
      '说明：结果为工程辅助示意，不可直接用于采购或盖章。',
    ]
      .filter(Boolean)
      .join('\n');
  }

  return [
    `[Open Thermal AI · rule engine${error ? ' fallback' : ''}]${errLine}`,
    `Duty: source ${duty.sourceTempC}°C → sink ${duty.targetTempC}°C, ${duty.heatLoadKw} kW, refrigerant ${duty.refrigerant}.`,
    `Agent route: ${agentLine}`,
    `Tool orchestration: ${toolLine}`,
    '',
    analysis.concept?.summary || '',
    cop.length ? `Indicative COP band: ${cop[0]}–${cop[1]}` : '',
    `Risks: ${(analysis.risks || []).map((r) => r.text).join('; ')}`,
    '',
    'Note: engineering aid only — not for procurement or PE stamp.',
  ]
    .filter(Boolean)
    .join('\n');
}
