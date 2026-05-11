/**
 * Category labels for the heat-pump standards page (Chinese `category` value → display string).
 * English strings follow common SAC/TC238 / GB-style terminology where applicable.
 */
const CATEGORY_LABELS_EN = {
    '安全与环保 (基础)':
        'Safety and environmental requirements (fundamentals)',
    '压缩式热泵 - 基础与中低温 (≤ 95°C)':
        'Vapour-compression heat pumps — Fundamentals and low/medium temperature (≤ 95 °C)',
    '评价与准入标准': 'Energy-efficiency limits, grades and market conformity',
    '热风与烘干': 'Hot-air drying and dehumidification equipment',
    '吸收式热泵 (余热驱动)': 'Absorption heat pumps (waste-heat driven)',
    'CO₂(R744) 热泵 (专用)': 'CO₂ (R-744) heat pumps (dedicated applications)',
    '蒸汽 (高温突破)': 'Steam and high-temperature heat-pump applications',
    '工程施工与验收':
        'Construction, installation and acceptance (HVAC, piping and electrical)',
    '铁路企业标准 (国铁集团 Q/CR)': 'China Railway enterprise standards (Q/CR)',
    '工业热泵 - 烘干与石化应用（SAC/TC238 摘录）':
        'Industrial heat pumps — Drying and petrochemical applications (SAC/TC238 excerpt)',
    '工业热泵 - 高温与蒸汽（循环式，SAC/TC238 摘录）':
        'Industrial heat pumps — High-temperature and steam, recirculating (SAC/TC238 excerpt)',
    '冷水(热泵)机组 - 工业型式（SAC/TC238 摘录）':
        'Water chilling (heat pump) packages — Industrial configurations (SAC/TC238 excerpt)',
    '国际前瞻性标准': 'International prospective standards',
};

/**
 * @param {string} categoryZh - exact `category` field from data
 * @param {'zh'|'en'} lang
 * @returns {string}
 */
export function getHpStdCategoryLabel(categoryZh, lang) {
    if (!categoryZh) return '';
    if (lang !== 'en') return categoryZh;
    return CATEGORY_LABELS_EN[categoryZh] ?? categoryZh;
}

/** For search: match both Chinese key and English label */
export function hpStdCategorySearchText(categoryZh) {
    const en = CATEGORY_LABELS_EN[categoryZh];
    return en ? `${categoryZh} ${en}` : categoryZh;
}
