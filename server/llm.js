/**
 * OpenAI-compatible chat completions client.
 * Works with Groq, OpenRouter, DeepSeek, Ollama, OpenAI, etc.
 */

export function llmConfigured() {
  return Boolean(process.env.LLM_API_KEY && process.env.LLM_BASE_URL && process.env.LLM_MODEL);
}

/**
 * @param {{ messages: Array<{ role: string, content: string }>, temperature?: number, maxTokens?: number }} opts
 * @returns {Promise<string>}
 */
export async function chatCompletion({ messages, temperature = 0.3, maxTokens = 1200 }) {
  if (!llmConfigured()) {
    throw new Error('LLM not configured: set LLM_BASE_URL, LLM_API_KEY, LLM_MODEL in server/.env');
  }

  const base = process.env.LLM_BASE_URL.replace(/\/+$/, '');
  const url = `${base}/chat/completions`;
  const model = process.env.LLM_MODEL;
  const timeoutMs = Number(process.env.LLM_TIMEOUT_MS || 60000);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const detail = data?.error?.message || data?.message || JSON.stringify(data).slice(0, 300);
      throw new Error(`LLM HTTP ${res.status}: ${detail}`);
    }

    const text = data?.choices?.[0]?.message?.content;
    if (!text || typeof text !== 'string') {
      throw new Error('LLM response missing choices[0].message.content');
    }
    return text.trim();
  } finally {
    clearTimeout(timer);
  }
}
