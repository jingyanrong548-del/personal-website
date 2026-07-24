# AI / Copilot API contracts (Phase 1)

Phase 1 ships **mock clients** under [`src/ai/`](../src/ai/). Flip `USE_AI_API` / `AI_API_BASE` in `thermalEngineerClient.js` when a backend exists.

## `POST /v1/thermal-engineer/analyze`

Client: [`thermalEngineerClient.js`](../src/ai/thermalEngineerClient.js)

Request: `sourceTempC`, `targetTempC`, `heatLoadKw`, `refrigerant`, `constraints.maxDischargeC`, `notes`, `locale`, `clientVersion`.

Response: `status`, `disclaimer`, `concept`, `compressor`, `heatExchangers`, `performance.copBand`, `performance.confidence`, `risks[]`, `refs[]`.

## Workspace chat (client orchestration)

Client: [`chatClient.js`](../src/ai/chatClient.js) — parses free-text briefs, calls `analyze`, routes agents via [`agentRegistry.js`](../src/ai/agentRegistry.js), invokes tools via [`toolsOrchestrator.js`](../src/ai/toolsOrchestrator.js).

Future backend (optional): `POST /v1/copilot/chat` streaming turns.

## Tool orchestration

- `POST /v1/tools/orchestrate` — batch tool invoke (mock today)
- `POST /v1/tools/explain` — explain calculator I/O (mock today)

## Future

- `POST /v1/design-assistant/report` — PDF engineering report
- Project Space cloud sync / multi-user (SaaS Phase 4)
- File ingest: Excel / PDF / CAD / P&ID
