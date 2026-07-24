/**
 * Static IA for the three hub directories (content / knowledge / tools).
 * URLs are site-root absolute paths so they work from any depth.
 */

/** @typedef {{ id: string, titleKey: string, url: string, descKey?: string, matchPath?: string, matchHash?: string | null }} HubLeaf */
/** @typedef {{ id: string, titleKey: string, children: HubLeaf[] }} HubGroup */

/** Content center: industry notes (static). Briefings/insights filled from content-index.json. */
export const CONTENT_NOTES = [
    {
        id: 'annex68',
        titleKey: 'briefings.panel.annex68',
        url: '/briefings/annex68-iea-hpt.html',
    },
    {
        id: 'conferences',
        titleKey: 'briefings.panel.conferences',
        url: '/briefings/conferences.html',
    },
];

export const CONTENT_SERIES_META = [
    { id: 'briefings', titleKey: 'articles.section.briefings', type: 'briefing' },
    { id: 'insights', titleKey: 'articles.section.insights', type: 'insight' },
    { id: 'notes', titleKey: 'articles.section.notes', type: 'notes' },
];

/** @type {HubGroup[]} */
export const KNOWLEDGE_GROUPS = [
    {
        id: 'fundamentals',
        titleKey: 'hubDir.knowledge.group.fundamentals',
        children: [
            {
                id: 'basics',
                titleKey: 'knowledge.hub.basics.title',
                descKey: 'knowledge.hub.basics.desc',
                url: '/knowledge.html#kp-article-co2',
                matchPath: '/knowledge.html',
                matchHash: null,
            },
            {
                id: 'cycles',
                titleKey: 'knowledge.hub.cycles.title',
                descKey: 'knowledge.hub.cycles.desc',
                url: '/knowledge-cycles.html',
            },
            {
                id: 'refrigerants',
                titleKey: 'knowledge.hub.refrigerants.title',
                descKey: 'knowledge.hub.refrigerants.desc',
                url: '/knowledge-refrigerants.html',
            },
        ],
    },
    {
        id: 'components',
        titleKey: 'hubDir.knowledge.group.components',
        children: [
            {
                id: 'compressor',
                titleKey: 'knowledge.hub.compressor.title',
                descKey: 'knowledge.hub.compressor.desc',
                url: '/knowledge-compressor.html',
            },
            {
                id: 'exchanger',
                titleKey: 'knowledge.hub.exchanger.title',
                descKey: 'knowledge.hub.exchanger.desc',
                url: '/knowledge-exchanger.html',
            },
            {
                id: 'vessels',
                titleKey: 'knowledge.hub.vessels.title',
                descKey: 'knowledge.hub.vessels.desc',
                url: '/knowledge-vessels.html',
            },
            {
                id: 'valves',
                titleKey: 'knowledge.hub.valves.title',
                descKey: 'knowledge.hub.valves.desc',
                url: '/knowledge-valves.html',
            },
            {
                id: 'lubricants',
                titleKey: 'knowledge.hub.lubricants.title',
                descKey: 'knowledge.hub.lubricants.desc',
                url: '/knowledge-lubricants.html',
            },
        ],
    },
    {
        id: 'systems',
        titleKey: 'hubDir.knowledge.group.systems',
        children: [
            {
                id: 'electrical',
                titleKey: 'knowledge.hub.electrical.title',
                descKey: 'knowledge.hub.electrical.desc',
                url: '/knowledge-electrical.html',
            },
            {
                id: 'piping',
                titleKey: 'knowledge.hub.piping.title',
                descKey: 'knowledge.hub.piping.desc',
                url: '/knowledge-piping.html',
            },
            {
                id: 'enclosure',
                titleKey: 'knowledge.hub.enclosure.title',
                descKey: 'knowledge.hub.enclosure.desc',
                url: '/knowledge-enclosure.html',
            },
        ],
    },
    {
        id: 'special',
        titleKey: 'hubDir.knowledge.group.special',
        children: [
            {
                id: 'shopTest',
                titleKey: 'knowledge.hub.shopTest.title',
                descKey: 'knowledge.hub.shopTest.desc',
                url: '/knowledge-shop-test.html',
            },
            {
                id: 'hthp',
                titleKey: 'knowledge.hub.hthp.title',
                descKey: 'knowledge.hub.hthp.desc',
                url: '/hthp-column.html',
            },
        ],
    },
];

/** @type {HubLeaf[]} */
export const TOOLS_ITEMS = [
    {
        id: 'standards',
        titleKey: 'toolsStd.nav.standards',
        url: '/heat-pump-standards.html#standards',
        matchPath: '/heat-pump-standards.html',
        matchHash: '#standards',
    },
    {
        id: 'policies',
        titleKey: 'toolsStd.nav.policies',
        url: '/heat-pump-standards.html#policies',
        matchPath: '/heat-pump-standards.html',
        matchHash: '#policies',
    },
    {
        id: 'links',
        titleKey: 'toolsStd.nav.links',
        url: '/heat-pump-standards.html#links',
        matchPath: '/heat-pump-standards.html',
        matchHash: '#links',
    },
    {
        id: 'calculators',
        titleKey: 'toolsStd.cta.tools',
        url: '/#apps',
        matchPath: '/',
        matchHash: '#apps',
    },
];
