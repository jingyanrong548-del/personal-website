import { ruleAnalyze } from '../ruleAnalyze.js';
import { chatCompletion, llmConfigured } from '../llm.js';

/**
 * POST /v1/thermal-engineer/analyze
 * Structured numbers stay rule-based; optional LLM polish of concept.summary.
 */
export async function analyzeHandler(body) {
  const analysis = ruleAnalyze(body || {});
  analysis.mode = 'rules';
  analysis.model = null;

  if (!llmConfigured() || process.env.LLM_ENHANCE_ANALYZE === 'false') {
    return analysis;
  }

  const locale = body?.locale === 'zh' ? 'zh' : 'en';
  try {
    const polished = await chatCompletion({
      messages: [
        {
          role: 'system',
          content:
            locale === 'zh'
              ? '你是工业热泵概念设计助手。根据给定结构化结果，用 2–4 句中文改写 concept 摘要：保留数字与循环建议，强调示意性、不可盖章。只输出摘要正文，不要标题。'
              : 'You are an industrial heat-pump concept assistant. Rewrite the concept summary in 2–4 English sentences from the structured result: keep numbers and cycle advice; stress illustrative / not for PE stamp. Output summary text only.',
        },
        {
          role: 'user',
          content: JSON.stringify(
            {
              concept: analysis.concept,
              performance: analysis.performance,
              risks: analysis.risks,
              notes: body?.notes || '',
            },
            null,
            2
          ),
        },
      ],
      temperature: 0.2,
      maxTokens: 400,
    });
    if (polished) {
      analysis.concept = { ...analysis.concept, summary: polished };
      analysis.mode = 'rules+llm';
      analysis.model = process.env.LLM_MODEL || null;
    }
  } catch (err) {
    console.warn('[analyze] LLM enhance skipped:', err instanceof Error ? err.message : err);
  }

  return analysis;
}
