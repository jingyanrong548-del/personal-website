# AI Thermal Engineer — API contract (Phase 1)

Phase 1 ships a **mock** client at [`src/ai/thermalEngineerClient.js`](../src/ai/thermalEngineerClient.js). Set `USE_AI_API = true` and `AI_API_BASE` when a backend exists.

## `POST /v1/thermal-engineer/analyze`

Request fields: `sourceTempC`, `targetTempC`, `heatLoadKw`, `refrigerant`, `constraints.maxDischargeC`, `notes`, `locale`, `clientVersion`.

Response fields: `status`, `disclaimer`, `concept`, `compressor`, `heatExchangers`, `performance.copBand`, `performance.confidence`, `risks[]`, `refs[]`.

## Future

- `POST /v1/design-assistant/report` — PDF engineering report (UI placeholder only).
- `POST /v1/tools/explain` — explain calculator I/O (Tools button coming).
