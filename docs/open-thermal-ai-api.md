# AI / Copilot API contracts

Phase 1 ships **mock clients** under [`src/ai/`](../src/ai/). Live mode uses the Node proxy in [`server/`](../server/) (OpenAI-compatible LLM; keys stay server-side).

## Enable live mode

1. Copy [`server/.env.example`](../server/.env.example) → `server/.env` and set `LLM_BASE_URL` / `LLM_API_KEY` / `LLM_MODEL`.
2. `npm run server`
3. Copy [`.env.example`](../.env.example) → `.env.local` with `VITE_AI_USE_PROXY=true` (Vite proxies `/v1` → `:8787`).
4. `npm run dev` → open `/ai-workspace.html`.

Details: [`server/README.md`](../server/README.md).

## `POST /v1/thermal-engineer/analyze`

Client: [`thermalEngineerClient.js`](../src/ai/thermalEngineerClient.js)

Request: `sourceTempC`, `targetTempC`, `heatLoadKw`, `refrigerant`, `constraints.maxDischargeC`, `notes`, `locale`, `clientVersion`.

Response: `status`, `disclaimer`, `concept`, `compressor`, `heatExchangers`, `performance.copBand`, `performance.confidence`, `risks[]`, `refs[]`.

Live proxy: rule-engine structure + optional LLM polish of `concept.summary` (`LLM_ENHANCE_ANALYZE`).

## Workspace chat

Client: [`chatClient.js`](../src/ai/chatClient.js)

- **Mock:** parses brief → local `analyze` + tool mocks → template reply.
- **Live:** `POST /v1/copilot/chat` → server parse + rules + LLM narrative (fallback to rules if LLM fails).

Future (optional streaming): `POST /v1/copilot/chat` SSE turns.

## Tool orchestration

- `POST /v1/tools/orchestrate` — batch tool invoke (proxy stub today)
- `POST /v1/tools/explain` — explain calculator I/O (proxy stub today)

## Future

- `POST /v1/design-assistant/report` — PDF engineering report
- Project Space cloud sync / multi-user (SaaS Phase 4)
- File ingest: Excel / PDF / CAD / P&ID
- Paid frontier models via same `LLM_*` env swap
