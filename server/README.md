# Open Thermal AI proxy

Zero-dependency Node 20+ HTTP proxy that keeps LLM API keys off the static site.

## Quick start (local)

```bash
# 1) Configure a free / trial OpenAI-compatible model
cp server/.env.example server/.env
# edit LLM_API_KEY, LLM_BASE_URL, LLM_MODEL

# 2) Start proxy
npm run server

# 3) Enable frontend live mode (second terminal)
cp .env.example .env.local
# ensure VITE_AI_USE_PROXY=true
npm run dev
```

Open `http://localhost:3000/ai-workspace.html` and ask a duty question. Replies should start with `【Live · …】` when the LLM is configured.

Health check: `curl http://127.0.0.1:8787/health`

## Endpoints

| Method | Path | Role |
|--------|------|------|
| GET | `/health` | Liveness + whether LLM env is set |
| POST | `/v1/copilot/chat` | Copilot turn (rules + LLM narrative) |
| POST | `/v1/thermal-engineer/analyze` | Structured analyze (rules; optional LLM polish) |
| POST | `/v1/tools/orchestrate` | Stub tool batch |
| POST | `/v1/tools/explain` | Stub tool explain |

## Providers (swap anytime)

Only change `LLM_*` in `server/.env`:

- **Groq** — `https://api.groq.com/openai/v1` + free-tier models
- **OpenRouter** — free model suffixes like `:free`
- **DeepSeek** — `https://api.deepseek.com`
- **Ollama** — `http://127.0.0.1:11434/v1` + `LLM_API_KEY=ollama`

Paid models later: same interface, new key + model id.

## Production (Aliyun)

1. Run `node server/index.js` under systemd / pm2 on the light server (port 8787 internal).
2. Nginx reverse-proxy `https://www.jingyanrong.com/v1/` → `http://127.0.0.1:8787/v1/`.
3. Build the site with `VITE_AI_USE_PROXY=true` (same-origin `/v1`) **or** `VITE_AI_API_BASE=https://www.jingyanrong.com`.
4. Set `CORS_ORIGIN` to your public origins if the API is on a different host.

GitHub Pages stays mock-only unless you point `VITE_AI_API_BASE` at a public HTTPS proxy with CORS.

## Safety

- Never put `LLM_API_KEY` in Vite env or client JS.
- Numbers / COP bands stay **rule-engine**; LLM only narrates.
- Rate limit: `RATE_LIMIT_PER_MIN` (default 30).
