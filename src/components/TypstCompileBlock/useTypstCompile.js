import { useCallback, useRef, useState } from 'react';

import {
    acquireCompileLock,
    releaseCompileLock,
    stopCompile,
} from '@site/src/components/CompileBlock/compileLock';
import { getExampleFiles } from '@site/src/components/CompileBlock/exampleFiles';
import { resolvePdfStandard } from './pdfStandards';

const MAIN_FILE_PATH = '/main.typ';
const DEFAULT_VARIANT = 'typst';

let worker = null;
let nextRequestId = 0;

function getWorker() {
    if (worker) return worker;
    worker = new Worker(new URL('./typst-worker.js', import.meta.url), { type: 'module' });
    return worker;
}

function terminateWorkerNow() {
    if (!worker) return;
    worker.terminate();
    worker = null;
}

function callWorker(type, payload) {
    const id = String(++nextRequestId);
    const active = getWorker();

    return new Promise((resolve, reject) => {
        const onMessage = (e) => {
            if (e.data.id !== id) return;
            active.removeEventListener('message', onMessage);
            if (e.data.type === 'error') reject(new Error(e.data.error || 'Worker error'));
            else resolve(e.data.result);
        };
        active.addEventListener('message', onMessage);
        active.postMessage({ id, type, payload });
    });
}

const STOPPED = Symbol('stopped');

export function useTypstCompile({ assetBase, fontBase, pdfTags } = {}) {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [log, setLog] = useState(null);
    const [progress, setProgress] = useState(null);
    const urlRef = useRef(null);

    const compile = useCallback(
        async (source, variant) => {
            let resolveStop;
            const stopPromise = new Promise((resolve) => {
                resolveStop = () => resolve(STOPPED);
            });

            acquireCompileLock(() => {
                terminateWorkerNow();
                resolveStop();
            });

            try {
                setError(null);
                setLog(null);
                setProgress(null);
                setStatus('compiling');

                const pdfStandard =
                    variant && variant !== DEFAULT_VARIANT ? resolvePdfStandard(variant) : undefined;

                const sources = { [MAIN_FILE_PATH]: source };
                for (const file of getExampleFiles()) {
                    sources[file.path] = file.content;
                }

                const result = await Promise.race([
                    callWorker('compile', {
                        mainFilePath: MAIN_FILE_PATH,
                        sources,
                        assetBase,
                        fontBase,
                        pdfStandard,
                        pdfTags,
                    }),
                    stopPromise,
                ]);

                if (result === STOPPED) {
                    setStatus('idle');
                    return null;
                }

                if (!result.output) {
                    setLog(result.log || null);
                    throw new Error('Compilation failed');
                }

                if (urlRef.current) URL.revokeObjectURL(urlRef.current);
                const url = URL.createObjectURL(new Blob([result.output], { type: 'application/pdf' }));
                urlRef.current = url;
                setLog(result.log || null);
                setStatus('idle');
                return url;
            } catch (e) {
                setStatus('error');
                setError(e && e.message ? e.message : String(e));
                return null;
            } finally {
                releaseCompileLock();
            }
        },
        [assetBase, fontBase, pdfTags]
    );

    return { compile, stop: stopCompile, status, error, log, progress };
}
