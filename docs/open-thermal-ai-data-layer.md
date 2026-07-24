# Engineering Data Layer (strategic)

Not a top-nav item. Conceptual layer under Open Thermal AI:

```
Open Thermal AI
        │
 Engineering Data Layer
   ├── Knowledge (Technical Articles + Research Insights + Standards)
   ├── Cases (structured engineering records)
   ├── Tools outputs (future explain / I/O JSON)
   └── AI Thermal Engineer (consumes the layer in Phase 2+)
```

## Why it matters

The long-term moat is **industrial heat-pump engineering data**, not page chrome:

- Component knowledge (compressor, HX, refrigerant, …)
- Operating records (source/sink temps, capacity, COP, application)
- Standards references
- Auditable calculator I/O

## Case record shape (Phase 1)

Each `content/cases/*.json` includes an `engineering` object:

| Field | Purpose |
|-------|---------|
| heatSource / heatSink | Text boundaries |
| temperature.sourceC / sinkC | Numeric ranges for RAG filters |
| capacityKw | Duty |
| refrigerant | Working fluid |
| technology | Cycle / machine class |
| cop | Illustrative performance |
| challenge / result | Lessons + outcome |

Narrative fields (`background`, `solution`, …) remain for human reading.

## Next (Phase 2)

Index `engineering.*` into the vector / structured store alongside Knowledge chapter chunks.
