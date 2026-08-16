import React, { useState, useMemo, useEffect, useRef } from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useCompileLock } from './compileLock';
import styles from './styles.module.css';

function PlayIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    );
}

function StopIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.icon} ${styles.spinner}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M21 12a9 9 0 1 1-6.2-8.55" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
            <polyline points="8 13 12 17 16 13" />
            <line x1="12" y1="7" x2="12" y2="17" />
        </svg>
    );
}


export default function CompileBlock({
    source,
    compiler,
    variants,
    variantLabel,
    pdfHeight,
    credit,
    ...codeBlockProps
}) {
    const variantList = useMemo(
        () => (Array.isArray(variants) && variants.length ? variants : [undefined]),
        [variants]
    );

    const [activeVariant, setActiveVariant] = useState(variantList[0]);
    useEffect(() => {
        if (!variantList.includes(activeVariant)) setActiveVariant(variantList[0]);
    }, [variantList, activeVariant]);

    const logoUrl = useBaseUrl(credit.logo || '/');

    const { compile, stop, status, error, log, progress } = compiler;
    const [pdfUrl, setPdfUrl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const globalBusy = useCompileLock();

    const localBusy = status === 'loading' || status === 'compiling';
    const hasChoice = variantList.length > 1;

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
        const url = await compile(source, activeVariant);
        if (url) setPdfUrl(url);
    };

    const baseClass = localBusy ? 'button button--danger button--sm' : 'button button--primary button--sm';

    const label = localBusy
        ? status === 'loading'
            ? progress != null
                ? `Stop (downloading… ${progress}%)`
                : 'Stop (loading…)'
            : 'Stop compile'
        : variantLabel(activeVariant);

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
                    {hasChoice && (
                        <>
                            <button
                                type="button"
                                className={`${baseClass} ${styles.splitToggle}`}
                                onClick={() => setMenuOpen((v) => !v)}
                                disabled={localBusy || (globalBusy && !localBusy)}
                                aria-haspopup="listbox"
                                aria-expanded={menuOpen}
                                aria-label="Choose engine"
                            >
                                <ChevronIcon />
                            </button>
                            {menuOpen && (
                                <ul className={styles.menu} role="listbox">
                                    {variantList.map((name) => (
                                        <li key={name}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={name === activeVariant}
                                                className={`${styles.menuItem} ${name === activeVariant ? styles.menuItemActive : ''}`}
                                                onClick={() => {
                                                    setActiveVariant(name);
                                                    setMenuOpen(false);
                                                }}
                                            >
                                                {name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
                {pdfUrl && (
                    <>
                        <a className={`${styles.link} ${styles.linkDesktop}`} href={pdfUrl} target="_blank" rel="noreferrer">
                            <span className={styles.linkLabel}>Open in new tab</span>
                            <ExternalLinkIcon />
                        </a>
                        <a className={`${styles.link} ${styles.linkMobile}`} href={pdfUrl} download="document.pdf">
                            <span className={styles.linkLabel}>Download PDF</span>
                            <DownloadIcon />
                        </a>
                    </>
                )}
                <span className={styles.spacer} />
                <a
                    className={styles.credit}
                    href={credit.href}
                    target="_blank"
                    rel="noreferrer"
                    title={`Powered by ${credit.label}`}
                >
                    {credit.logo && <img className={styles.creditLogo} src={logoUrl} alt="" />}
                    <span className={styles.creditLabel}>Powered by {credit.label}</span>
                    <span className={styles.creditShort}>{credit.label}</span>
                </a>
            </div>
            <OriginalCodeBlock {...codeBlockProps}>{source}</OriginalCodeBlock>
            {
                error && (
                    <div className={styles.error}>
                        {error}
                        {log ? `\n\n${log.slice(-2000)}` : ''}
                    </div>
                )
            }
            {
                pdfUrl && (
                    <iframe
                        className={styles.preview}
                        src={pdfUrl}
                        title="Compiled PDF"
                        style={{ height: `${pdfHeight}px` }}
                    />
                )
            }
        </div >
    );
}
