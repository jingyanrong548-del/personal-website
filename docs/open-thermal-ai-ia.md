# Open Thermal AI — Information Architecture (Phase 1)

Locked decisions for the platform upgrade. Implementation follows the five milestones in the Phase 1 plan.

## Brand

- **Platform**: Open Thermal AI — Industrial Heat Pump Intelligence Platform
- **Founder**: Jing Yanrong — Founder & Chief Thermal Architect (`/founder.html`)
- **Default language**: English (`en`); Chinese (`zh`) retained

## Navigation

| Item | Route | Notes |
|------|-------|-------|
| Open Thermal AI (brand) | `/` | Replaces person-name brand |
| AI Engineer | `/ai-engineer.html` | Mock analyze in Phase 1 |
| Tools | `/tools.html` | Aggregates calculators + standards |
| Knowledge | `/knowledge.html` | Regrouped hub |
| Cases | `/cases.html` | JSON-driven library |
| Insights | `/articles.html` | Former Content |
| Services | `/services.html` | Annex 58 Tasks 1–5 unchanged |
| Founder | `/founder.html` | Former About |

### Legacy redirects

| Old | New |
|-----|-----|
| `/#apps` | `/tools.html` |
| `/#about` | `/founder.html` |

## Knowledge groups

1. Fundamentals — basics, cycles, refrigerants
2. Advanced Technology — HTHP column + outline cards for cascade / EVI / CO₂ / waste heat
3. Components — compressor, exchanger, vessels, valves, lubricants
4. Systems — electrical, piping, enclosure
5. Engineering Experience — shop-test + insight cross-links

## Tools taxonomy

1. Heat Pump Design
2. Thermodynamics
3. Components
4. Standards & Policy
5. HTHP Configurations A–I (coming soon)

## Cases seed strategy

Phase 1 seeds: 3 illustrative cases derived from engineering themes (food / chemical / manufacturing). Insights remain in Insights; cases are a separate structured library.

## AI contract (Phase 1 = mock only)

- `POST /v1/thermal-engineer/analyze` — request/response shapes in `src/ai/thermalEngineerClient.js`
- `POST /v1/design-assistant/report` — coming (UI placeholder)
- `POST /v1/tools/explain` — button disabled / coming

UI consumes only the JSON shape; `USE_AI_API` flag switches mock → live later.
