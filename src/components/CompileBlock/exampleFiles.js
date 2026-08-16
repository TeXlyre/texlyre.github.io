const registeredExampleFiles = new Map();

function normalizePath(path) {
    return String(path || '')
        .trim()
        .replace(/\\/g, '/')
        .replace(/^\.\//, '');
}

function pageScope() {
    if (typeof window === 'undefined') return null;
    return window.location.pathname;
}

export function registerExampleFile(path, content) {
    const scope = pageScope();
    const normalizedPath = normalizePath(path);
    if (!scope || !normalizedPath || typeof content !== 'string') return;

    let files = registeredExampleFiles.get(scope);
    if (!files) {
        files = new Map();
        registeredExampleFiles.set(scope, files);
    }
    files.set(normalizedPath, content);
}

export function getExampleFiles() {
    const scope = pageScope();
    const files = scope ? registeredExampleFiles.get(scope) : null;
    if (!files) return [];

    return Array.from(files, ([path, content]) => ({ path, content }));
}
