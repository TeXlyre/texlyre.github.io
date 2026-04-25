import React, { useState } from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useBusyTex } from './useBusyTex';
import { useCompileLock } from './compileLock';
import { useLatexCompileConfig } from './config';
import styles from './styles.module.css';

function PlayIcon() {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function StopIcon() {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" rx="1" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg
            className={`${styles.icon} ${styles.spinner}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <path d="M21 12a9 9 0 1 1-6.2-8.55" />
        </svg>
    );
}

export default function LatexCompileBlock({ source, engine, pdfHeight, ...codeBlockProps }) {
    const config = useLatexCompileConfig();
    const activeEngine = engine || config.engine;
    const activeHeight = pdfHeight || config.pdfHeight;
    const logoUrl = useBaseUrl('/img/logo.svg');

    const { compile, stop, status, error, log } = useBusyTex({
        basePath: config.assetBase,
        collections: config.collections,
        remoteEndpoint: config.remoteEndpoint,
    });
    const [pdfUrl, setPdfUrl] = useState(null);
    const globalBusy = useCompileLock();

    const localBusy = status === 'loading' || status === 'compiling';

    const onClick = async () => {
        if (localBusy) {
            stop();
            return;
        }
        const url = await compile(source, activeEngine);
        if (url) setPdfUrl(url);
    };

    const buttonClass = localBusy
        ? `button button--danger button--sm ${styles.button}`
        : `button button--primary button--sm ${styles.button}`;

    const label = localBusy
        ? status === 'loading'
            ? 'Stop (loading…)'
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
                <button
                    type="button"
                    className={buttonClass}
                    onClick={onClick}
                    disabled={globalBusy && !localBusy}
                >
                    {icon}
                    {label}
                </button>
                {pdfUrl && (
                    <a className={styles.link}
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>Open in new tab ↗</span>
                    </a>
                )}
                <span className={styles.spacer} />
                <a
                    className={styles.credit}
                    href="https://github.com/TeXlyre/texlyre-busytex"
                    target="_blank"
                    rel="noreferrer"
                    title="Powered by texlyre-busytex"
                >
                    <img className={styles.creditLogo} src={logoUrl} alt="" />
                    <span>Powered by texlyre-busytex</span>
                </a>
            </div>
            <OriginalCodeBlock {...codeBlockProps}>{source}</OriginalCodeBlock>
            {error && (
                <div className={styles.error}>
                    {error}
                    {log ? `\n\n${log.slice(-2000)}` : ''}
                </div>
            )}
            {pdfUrl && (
                <iframe
                    className={styles.preview}
                    src={pdfUrl}
                    title="Compiled PDF"
                    style={{ height: `${activeHeight}px` }}
                />
            )}
        </div>
    );
}