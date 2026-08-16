import { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const LATEX_DEFAULTS = {
    assetPath: '/core/busytex',
    remoteEndpoint: 'https://texlive2026.texlyre.org',
    collections: ['basic'],
    pdfHeight: 600,
    engine: 'pdflatex',
};

const TYPST_DEFAULTS = {
    assetPath: '/core',
    fontPath: '/core/assets/fonts',
    pdfHeight: 600,
};

export function useLatexCompileConfig() {
    const { siteConfig } = useDocusaurusContext();
    const raw = (siteConfig.customFields && siteConfig.customFields.latexCompile) || {};
    const assetBase = useBaseUrl(raw.assetPath || LATEX_DEFAULTS.assetPath);

    return useMemo(
        () => ({
            assetBase,
            remoteEndpoint: raw.remoteEndpoint || LATEX_DEFAULTS.remoteEndpoint,
            collections: raw.collections || LATEX_DEFAULTS.collections,
            pdfHeight: raw.pdfHeight || LATEX_DEFAULTS.pdfHeight,
            engine: raw.engine || LATEX_DEFAULTS.engine,
        }),
        [assetBase, raw.remoteEndpoint, raw.collections, raw.pdfHeight, raw.engine]
    );
}

export function useTypstCompileConfig() {
    const { siteConfig } = useDocusaurusContext();
    const raw = (siteConfig.customFields && siteConfig.customFields.typstCompile) || {};
    const assetBase = useBaseUrl(raw.assetPath || TYPST_DEFAULTS.assetPath);
    const fontBase = useBaseUrl(raw.fontPath || TYPST_DEFAULTS.fontPath);

    return useMemo(
        () => ({
            assetBase,
            fontBase,
            pdfHeight: raw.pdfHeight || TYPST_DEFAULTS.pdfHeight,
        }),
        [assetBase, fontBase, raw.pdfHeight]
    );
}
