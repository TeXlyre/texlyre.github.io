export const COLLECTIONS = {
    basic: { id: 'basic', label: 'TeX Live Basic (~90 MB)', jsFile: 'texlive-basic.js', contains: [] },
    recommended: { id: 'recommended', label: 'TeX Live Recommended (~200 MB)', jsFile: 'texlive-recommended.js', contains: ['basic'] },
    extra: { id: 'extra', label: 'TeX Live Extra (~340 MB)', jsFile: 'texlive-extra.js', contains: ['recommended'] },
};

export function listCollections() {
    return Object.values(COLLECTIONS);
}

function expandTransitive(ids) {
    const result = new Set();
    const visit = (id) => {
        if (result.has(id)) return;
        result.add(id);
        COLLECTIONS[id].contains.forEach(visit);
    };
    ids.forEach(visit);
    return result;
}

export function subsume(ids) {
    const selected = new Set(ids);
    return Array.from(selected).filter(
        (id) => !Array.from(selected).some((other) => other !== id && expandTransitive([other]).has(id))
    );
}

export function collectionJsUrl(basePath, id) {
    return `${basePath}/${COLLECTIONS[id].jsFile}`;
}

export function resolvePreload(basePath, ids) {
    return subsume(ids).map((id) => collectionJsUrl(basePath, id));
}