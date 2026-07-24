/**
 * AI API endpoint config.
 * - Empty VITE_AI_API_BASE → mock / local rules (default for GitHub Pages static).
 * - Set VITE_AI_API_BASE to proxy origin (e.g. http://127.0.0.1:8787) for live LLM.
 * - Or set VITE_AI_USE_PROXY=true and rely on Vite / nginx `/v1` reverse proxy.
 */

const envBase = typeof import.meta !== 'undefined' && import.meta.env?.VITE_AI_API_BASE;
const raw = String(envBase || '')
  .trim()
  .replace(/\/+$/, '');

export const AI_API_BASE = raw;

export function apiRoot() {
  if (AI_API_BASE) return AI_API_BASE;
  if (import.meta.env?.VITE_AI_USE_PROXY === 'true') return '';
  return '';
}

export function aiLiveEnabled() {
  return Boolean(AI_API_BASE) || import.meta.env?.VITE_AI_USE_PROXY === 'true';
}

/** @deprecated prefer aiLiveEnabled() */
export const USE_AI_API = aiLiveEnabled();
