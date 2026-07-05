import React, { useEffect, useMemo, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLatexCompileConfig } from './config';
import { useBusyTex } from './useBusyTex';
import { useCompileLock } from './compileLock';
import styles from './styles.module.css';

function SpinnerIcon() {
    return <span className={styles.spinner} aria-hidden="true" />;
}

function StopIcon() {
    return (
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <rect x="2" y="2" width="12" height="12" rx="1" fill="currentColor" />
        </svg>
    );
}

function PlayIcon() {
    return (
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path d="M3 2l11 6-11 6V2z" fill="currentColor" />
        </svg>
    );
}

export default function LatexCompileBlock({ source, engine, engines, pdfHeight, ...codeBlockProps }) {
    const config = useLatexCompileConfig();
    const engineList = useMemo(() => {
        if (Array.isArray(engines) && engines.length) return engines;
        return [engine || config.engine];
    }, [engines, engine, config.engine]);

    const [activeEngine, setActiveEngine] = useState(engineList[0]);
    useEffect(() => {
        if (!engineList.includes(activeEngine)) setActiveEngine(engineList[0]);
    }, [engineList, activeEngine]);

    const activeHeight = pdfHeight || config.pdfHeight;
    const logoUrl = useBaseUrl('/img/logo.svg');

    const { compile, stop, status, error, log, progress } = useBusyTex({
        basePath: config.assetBase,
        collections: config.collections,
        remoteEndpoint: config.remoteEndpoint,
    });
    const [pdfUrl, setPdfUrl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const globalBusy = useCompileLock();

    const localBusy = status === 'loading' || status === 'compiling';
    const hasChoice = engineList.length > 1;

    useEffect(() => {
        if (!menuOpen) return;
        const onDocClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [menuOpen]);

    const onClick = async () => {
        if (localBusy) {
            stop();
            return;
        }
        const url = await compile(source, activeEngine);
        if (url) setPdfUrl(url);
    };

    const baseClass = localBusy ? 'button button--danger button--sm' : 'button button--primary button--sm';

    const label = localBusy
        ? status === 'loading'
            ? progress != null
                ? `Stop (downloading… ${progress}%)`
                : 'Stop (loading…)'
            : 'Stop compile'
        : `Compile with ${activeEngine}`;

    const icon = localBusy ? (
        <>
            <SpinnerIcon />
            <StopIcon />
        </>
    ) : (
        <PlayIcon />
    );

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={hasChoice ? styles.split : undefined} ref={menuRef}>
                    <button
                        type="button"
                        className={`${baseClass} ${styles.button} ${hasChoice ? styles.splitMain : ''}`}
                        onClick={onClick}
                        disabled={globalBusy && !localBusy}
                    >
                        {icon}
                        {label}
                    </button>
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {log && <pre className={styles.log}>{log}</pre>}
            {pdfUrl && (
                <iframe src={pdfUrl} title="Compiled PDF" style={{ width: '100%', height: activeHeight, border: 'none' }} />
            )}
        </div>
    );
}