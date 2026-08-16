const PDF_STANDARDS = {
    '1.4': 'PDF 1.4',
    '1.5': 'PDF 1.5',
    '1.6': 'PDF 1.6',
    '1.7': 'PDF 1.7',
    '2.0': 'PDF 2.0',
    'a-1b': 'PDF/A-1b',
    'a-1a': 'PDF/A-1a',
    'a-2b': 'PDF/A-2b',
    'a-2u': 'PDF/A-2u',
    'a-2a': 'PDF/A-2a',
    'a-3b': 'PDF/A-3b',
    'a-3u': 'PDF/A-3u',
    'a-3a': 'PDF/A-3a',
    'a-4': 'PDF/A-4',
    'a-4f': 'PDF/A-4f',
    'a-4e': 'PDF/A-4e',
    'ua-1': 'PDF/UA-1',
};

function splitVariant(variant) {
    return variant
        .split('+')
        .map((part) => part.trim())
        .filter(Boolean);
}

export function parsePdfVariants(spec) {
    if (typeof spec !== 'string') return [];
    return spec
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
}

export function formatPdfVariant(variant) {
    return splitVariant(variant)
        .map((part) => PDF_STANDARDS[part] || part)
        .join(' + ');
}

export function resolvePdfStandard(variant) {
    const parts = splitVariant(variant);
    const unknown = parts.filter((part) => !(part in PDF_STANDARDS));
    if (unknown.length) {
        throw new Error(`Unknown PDF standard: ${unknown.join(', ')}`);
    }
    return parts.map((part) => `"${part}"`).join(', ');
}
