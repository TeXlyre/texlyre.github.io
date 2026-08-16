import { createTypstCompiler } from '@myriaddreamin/typst.ts/compiler';
import { withAccessModel, withPackageRegistry } from '@myriaddreamin/typst.ts/options.init';
import { MemoryAccessModel } from '@myriaddreamin/typst.ts/fs/memory';
import { FetchPackageRegistry } from '@myriaddreamin/typst.ts/fs/package';

let compiler = null;
let initialized = false;

function mergeDiagnostics(...groups) {
    const seen = new Set();
    const out = [];
    for (const group of groups) {
        for (const diag of group) {
            const key = `${diag.severity}|${diag.path ?? ''}|${diag.range ?? ''}|${diag.message}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push(diag);
        }
    }
    return out;
}

function formatDiagnostics(diagnostics) {
    return diagnostics
        .map((diag) => {
            const where = diag.path ? `${diag.path}${diag.range ? `:${diag.range}` : ''}: ` : '';
            return `${where}${diag.severity || 'error'}: ${diag.message}`;
        })
        .join('\n');
}

async function loadFonts(baseUrl) {
    const indexResponse = await fetch(`${baseUrl}/fonts.json`);
    if (!indexResponse.ok) {
        throw new Error(`Font index not found at ${baseUrl}/fonts.json`);
    }

    const fontList = await indexResponse.json();
    const fonts = await Promise.all(
        fontList.map(async (font) => {
            try {
                const response = await fetch(`${baseUrl}/${encodeURIComponent(font)}`);
                if (!response.ok) return null;
                return new Uint8Array(await response.arrayBuffer());
            } catch {
                return null;
            }
        })
    );

    return fonts.filter((font) => font !== null);
}

async function ensureInit(assetBase, fontBase) {
    if (initialized) return;

    const fonts = await loadFonts(fontBase);
    const accessModel = new MemoryAccessModel();

    compiler = createTypstCompiler();
    await compiler.init({
        getModule: () => `${assetBase}/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm`,
        beforeBuild: [
            withAccessModel(accessModel),
            withPackageRegistry(new FetchPackageRegistry(accessModel)),
            async (_, { builder }) => {
                for (const font of fonts) {
                    await builder.add_raw_font(font);
                }
            },
        ],
    });

    initialized = true;
}

self.addEventListener('message', async (e) => {
    const { id, type, payload } = e.data;

    try {
        if (type === 'ping') {
            self.postMessage({ id, type: 'pong' });
            return;
        }

        const { mainFilePath, sources, fontBase, assetBase, pdfStandard, pdfTags } = payload;
        await ensureInit(assetBase, fontBase);

        compiler.resetShadow();
        for (const [path, content] of Object.entries(sources)) {
            compiler.addSource(path.startsWith('/') ? path : `/${path}`, content);
        }

        const absoluteMainPath = mainFilePath.startsWith('/') ? mainFilePath : `/${mainFilePath}`;
        const compiled = await compiler.runWithWorld({ mainFilePath: absoluteMainPath }, async (world) => {
            world.setPdfOpts({
                pdf_standard: pdfStandard || '"1.7"',
                pdf_tags: pdfTags !== false,
                creation_timestamp: Math.floor(Date.now() / 1000),
            });
            const paged = await world.compile({ diagnostics: 'full' });
            const res = await world.pdf({ diagnostics: 'full' });
            return {
                result: res.result,
                diagnostics: mergeDiagnostics(paged.diagnostics ?? [], res.diagnostics ?? []),
            };
        });

        const log = formatDiagnostics(compiled.diagnostics);
        const output = compiled.result;

        if (!output || output.byteLength === 0) {
            self.postMessage({ id, type: 'done', result: { output: null, log } });
            return;
        }

        self.postMessage({ id, type: 'done', result: { output, log } }, [output.buffer]);
    } catch (err) {
        const message = err && err.message ? String(err.message) : String(err);
        self.postMessage({ id, type: 'error', error: message });
    }
});
