import { parseEngineeringBrief, numOr } from '../parseBrief.js';
import { ruleAnalyze } from '../ruleAnalyze.js';
import { routeAgents, pickTools, describeTools } from '../routing.js';
import { chatCompletion, llmConfigured } from '../llm.js';
import { systemPrompt, userPrompt, fallbackReply } from '../prompts.js';

/**
 * POST /v1/copilot/chat
 * @param {{ message?: string, context?: object, locale?: string }} body
 */
export async function chatHandler(body) {
  const locale = body?.locale === 'zh' ? 'zh' : 'en';
  const message = String(body?.message || '').trim();
  if (!message) {
    return { status: 'error', error: 'empty_message', message: 'message is required' };
  }

  const parsed = parseEngineeringBrief(message);
  const ctx = { ...(body.context || {}), ...parsed };

  const sourceTempC = numOr(ctx.sourceTempC, 80);
  const targetTempC = numOr(ctx.targetTempC, 95);
  const heatLoadKw = numOr(ctx.heatLoadKw, 2000);
  const refrigerant = ctx.refrigerant || 'R1234ze(E)';
  const liftK = targetTempC - sourceTempC;
  const copTarget = ctx.copTarget ?? parsed.copMin ?? null;

  const duty = { sourceTempC, targetTempC, heatLoadKw, refrigerant, liftK, copTarget };

  const agentIds = routeAgents({ text: message, targetTempC, liftK, heatLoadKw });
  const toolIds = pickTools(agentIds, heatLoadKw);
  const tools = describeTools(toolIds, locale);
  const agents = agentIds.map((id) => ({ id, nameKey: null, roleKey: null }));

  const analysis = ruleAnalyze({
    sourceTempC,
    targetTempC,
    heatLoadKw,
    refrigerant,
    notes: message,
    locale,
    clientVersion: 'ota-proxy-1.0',
  });

  let reply;
  let mode = 'live';
  let model = process.env.LLM_MODEL || null;
  let llmError = null;

  if (llmConfigured()) {
    try {
      reply = await chatCompletion({
        messages: [
          { role: 'system', content: systemPrompt(locale) },
          {
            role: 'user',
            content: userPrompt({ locale, message, analysis, agents, tools, duty }),
          },
        ],
        temperature: Number(process.env.LLM_TEMPERATURE || 0.3),
        maxTokens: Number(process.env.LLM_MAX_TOKENS || 1200),
      });
      const banner =
        locale === 'zh'
          ? `【Live · ${process.env.LLM_PROVIDER || 'openai-compatible'} / ${model}】\n`
          : `[Live · ${process.env.LLM_PROVIDER || 'openai-compatible'} / ${model}]\n`;
      reply = banner + reply;
    } catch (err) {
      llmError = err instanceof Error ? err.message : String(err);
      console.warn('[chat] LLM failed, falling back:', llmError);
      mode = 'fallback';
      reply = fallbackReply({ locale, analysis, agents, tools, duty, error: llmError });
    }
  } else {
    mode = 'rules-only';
    model = null;
    reply = fallbackReply({ locale, analysis, agents, tools, duty, error: null });
  }

  return {
    status: 'ok',
    mode,
    model,
    provider: process.env.LLM_PROVIDER || 'openai-compatible',
    llmError,
    contextPatch: {
      sourceTempC,
      targetTempC,
      heatLoadKw,
      refrigerant,
      copTarget,
    },
    agents,
    tools,
    analysis,
    reply,
  };
}
