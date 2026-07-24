/** Shared brief parsing (aligned with src/ai/chatClient.js). */

export function parseEngineeringBrief(text) {
  const out = {};
  if (!text) return out;

  const deg = String.raw`(?:℃|°\s*[Cc]|[Cc])`;
  const source =
    text.match(new RegExp(String.raw`(?:热源|source|waste\s*heat)[^\d]{0,40}(-?\d+(?:\.\d+)?)\s*${deg}`, 'i')) ||
    text.match(new RegExp(String.raw`(-?\d+(?:\.\d+)?)\s*${deg}\s*(?:废热|热水|热源)`, 'i'));
  const target =
    text.match(new RegExp(String.raw`(?:热汇|目标|sink|target|供水)[^\d]{0,40}(-?\d+(?:\.\d+)?)\s*${deg}`, 'i')) ||
    text.match(new RegExp(String.raw`(-?\d+(?:\.\d+)?)\s*${deg}\s*(?:热水|热汇|工艺)`, 'i'));
  const load =
    text.match(/(?:负荷|需求|duty|load|capacity)[^\d]{0,24}(\d+(?:\.\d+)?)\s*kW/i) ||
    text.match(/(\d+(?:\.\d+)?)\s*kW/i);
  const cop = text.match(/COP\s*[>≥>=]+\s*(\d+(?:\.\d+)?)/i);
  const ref = text.match(/\b(R\d{3,4}[A-Za-z()]*|CO₂|CO2|R1234ze(?:\(E\))?|R515B|R245fa|R290|R134a)\b/i);

  if (source) out.sourceTempC = Number(source[1]);
  if (target) out.targetTempC = Number(target[1]);
  if (load) out.heatLoadKw = Number(load[1]);
  if (cop) out.copMin = Number(cop[1]);
  if (ref) out.refrigerant = ref[1].replace(/CO2/i, 'CO₂');

  if (out.sourceTempC == null || out.targetTempC == null) {
    const temps = [...text.matchAll(new RegExp(String.raw`(-?\d+(?:\.\d+)?)\s*${deg}`, 'gi'))].map((m) =>
      Number(m[1])
    );
    if (temps.length >= 2) {
      if (out.sourceTempC == null) out.sourceTempC = temps[0];
      if (out.targetTempC == null) out.targetTempC = temps[1];
    }
  }

  return out;
}

export function numOr(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
