import { useCallback, useRef, useState } from 'react';

import { resolvePreload } from './collections';
import {
    acquireCompileLock,
    releaseCompileLock,
    stopCompile,
} from '@site/src/components/CompileBlock/compileLock';
import { getExampleFiles } from '@site/src/components/CompileBlock/exampleFiles';

let runnerPromise = null;
let runnerKey = null;
let activeProgressListener = null;

function notifyDownloadProgress(progress) {
    if (activeProgressListener) activeProgressListener(progress);
}


async function getRunner(basePath, collections) {
    const key = `${basePath}::${collections.join(',')}`;
    if (runnerPromise && runnerKey === key) return runnerPromise;
    runnerKey = key;
    runnerPromise = (async () => {
        const { BusyTexRunner } = await import('texlyre-busytex');
        const r = new BusyTexRunner({
            busytexBasePath: basePath,
            verbose: false,
            engineMode: 'combined',
            preloadDataPackages: resolvePreload(basePath, collections),
            catalogDataPackages: [],
            onDownloadProgress: notifyDownloadProgress,
        });
        await r.initialize(true);
        return r;
    })();
    return runnerPromise;
}

function terminateRunnerNow() {
    if (!runnerPromise) return;
    const p = runnerPromise;
    runnerPromise = null;
    runnerKey = null;
    p.then((r) => {
        try {
            r.terminate();
        } catch { }
    }).catch(() => { });
}

const STOPPED = Symbol('stopped');

export function useBusyTex({ basePath = '/core/busytex', collections = ['recommended'], remoteEndpoint } = {}) {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [log, setLog] = useState(null);
    const [progress, setProgress] = useState(null);
    const urlRef = useRef(null);

    const compile = useCallback(
        async (source, engine = 'pdflatex') => {
            let resolveStop;
            const stopPromise = new Promise((resolve) => {
                resolveStop = () => resolve(STOPPED);
            });

            acquireCompileLock(() => {
                terminateRunnerNow();
                resolveStop();
            });

            activeProgressListener = (p) => setProgress(Math.min(100, p.percent));

            try {
                setError(null);
                setLog(null);
                setProgress(null);
                setStatus('loading');

                const runner = await Promise.race([getRunner(basePath, collections), stopPromise]);
                if (runner === STOPPED) {
                    setStatus('idle');
                    return null;
                }

                const mod = await Promise.race([import('texlyre-busytex'), stopPromise]);
                if (mod === STOPPED) {
                    setStatus('idle');
                    return null;
                }

                const EngineCtor =
                    engine === 'xelatex' ? mod.XeLatex : engine === 'lualatex' ? mod.LuaLatex : mod.PdfLatex;
                const tex = new EngineCtor(runner);
                const additionalFiles = getExampleFiles();

                setStatus('compiling');
                const result = await Promise.race([
                    tex.compile({
                        input: source,
                        bibtex: true,
                        biber: null,
                        makeindex: true,
                        additionalFiles: additionalFiles.length ? additionalFiles : undefined,
                        remoteEndpoint,
                    }),
                    stopPromise,
                ]);

                if (result === STOPPED) {
                    setStatus('idle');
                    return null;
                }

                if (!result.success || !result.pdf) {
                    setLog(result.log || null);
                    throw new Error('Compilation failed');
                }
                if (urlRef.current) URL.revokeObjectURL(urlRef.current);
                const url = URL.createObjectURL(new Blob([result.pdf], { type: 'application/pdf' }));
                urlRef.current = url;
                setLog(result.log || null);
                setStatus('idle');
                return url;
            } catch (e) {
                setStatus('error');
                setError(e && e.message ? e.message : String(e));
                return null;
            } finally {
                activeProgressListener = null;
                releaseCompileLock();
            }
        },
        [basePath, collections.join(','), remoteEndpoint]
    );

    return { compile, stop: stopCompile, status, error, log, progress };
}
