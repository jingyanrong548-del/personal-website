/** Stub tool orchestration endpoints (contract reserved). */

export function orchestrateHandler(body) {
  const locale = body?.locale === 'zh' ? 'zh' : 'en';
  const zh = locale === 'zh';
  const tools = Array.isArray(body?.tools) ? body.tools : [];
  return tools.map((id) => ({
    toolId: id,
    status: 'proxy-stub',
    summary: zh
      ? `代理已收到工具请求「${id}」；可审计计算仍在 Engineering Suite。`
      : `Proxy acknowledged tool “${id}”; auditable calc remains in Engineering Suite.`,
    url: '/tools.html',
  }));
}

export function explainHandler(body) {
  const locale = body?.locale === 'zh' ? 'zh' : 'en';
  const zh = locale === 'zh';
  return {
    status: 'ok',
    toolId: body?.toolId || 'unknown',
    explanation: zh
      ? '工具解释端点已接通代理。后续可用大模型解释输入/输出与边界假设。'
      : 'Tool-explain endpoint is on the proxy. Future LLM will explain I/O and boundary assumptions.',
  };
}
