#!/usr/bin/env node
/**
 * Open Thermal AI — lightweight API proxy (OpenAI-compatible LLM).
 * Keys stay on the server; static site never sees LLM_API_KEY.
 *
 * Endpoints:
 *   GET  /health
 *   POST /v1/copilot/chat
 *   POST /v1/thermal-engineer/analyze
 */

import http from 'node:http';
import { loadEnv } from './env.js';
import { chatHandler } from './handlers/chat.js';
import { analyzeHandler } from './handlers/analyze.js';
import { orchestrateHandler, explainHandler } from './handlers/tools.js';
import { rateLimitOk } from './rateLimit.js';

loadEnv();

const PORT = Number(process.env.PORT || 8787);
const CORS_ORIGIN = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function allowOrigin(reqOrigin) {
  if (!reqOrigin) return CORS_ORIGIN[0] || '*';
  if (CORS_ORIGIN.includes('*')) return '*';
  if (CORS_ORIGIN.includes(reqOrigin)) return reqOrigin;
  return CORS_ORIGIN[0] || 'null';
}

function sendJson(res, status, body, req) {
  const origin = allowOrigin(req.headers.origin);
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
  });
  res.end(payload);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname.replace(/\/+$/, '') || '/';

  if (req.method === 'OPTIONS') {
    const origin = allowOrigin(req.headers.origin);
    res.writeHead(204, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    });
    res.end();
    return;
  }

  try {
    if (req.method === 'GET' && (path === '/health' || path === '/v1/health')) {
      const configured = Boolean(process.env.LLM_API_KEY && process.env.LLM_BASE_URL && process.env.LLM_MODEL);
      sendJson(
        res,
        200,
        {
          status: 'ok',
          service: 'open-thermal-ai-proxy',
          llmConfigured: configured,
          model: process.env.LLM_MODEL || null,
          provider: process.env.LLM_PROVIDER || 'openai-compatible',
        },
        req
      );
      return;
    }

    if (!rateLimitOk(clientIp(req))) {
      sendJson(res, 429, { status: 'error', error: 'rate_limited', message: 'Too many requests. Try again shortly.' }, req);
      return;
    }

    if (req.method === 'POST' && path === '/v1/copilot/chat') {
      const body = await readJson(req);
      const result = await chatHandler(body);
      sendJson(res, result.status === 'ok' ? 200 : 502, result, req);
      return;
    }

    if (req.method === 'POST' && path === '/v1/thermal-engineer/analyze') {
      const body = await readJson(req);
      const result = await analyzeHandler(body);
      sendJson(res, result.status === 'ok' ? 200 : 502, result, req);
      return;
    }

    if (req.method === 'POST' && path === '/v1/tools/orchestrate') {
      const body = await readJson(req);
      sendJson(res, 200, orchestrateHandler(body), req);
      return;
    }

    if (req.method === 'POST' && path === '/v1/tools/explain') {
      const body = await readJson(req);
      sendJson(res, 200, explainHandler(body), req);
      return;
    }

    sendJson(res, 404, { status: 'error', error: 'not_found', path }, req);
  } catch (err) {
    console.error('[proxy]', err);
    sendJson(
      res,
      500,
      {
        status: 'error',
        error: 'internal',
        message: err instanceof Error ? err.message : String(err),
      },
      req
    );
  }
});

server.listen(PORT, () => {
  const configured = Boolean(process.env.LLM_API_KEY && process.env.LLM_BASE_URL && process.env.LLM_MODEL);
  console.log(`[open-thermal-ai-proxy] http://127.0.0.1:${PORT}`);
  console.log(`[open-thermal-ai-proxy] LLM configured: ${configured ? 'yes' : 'no (set LLM_* in server/.env)'}`);
  if (configured) {
    console.log(`[open-thermal-ai-proxy] model=${process.env.LLM_MODEL} base=${process.env.LLM_BASE_URL}`);
  }
});
