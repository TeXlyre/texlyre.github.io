import { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const DEFAULTS = {
    assetPath: '/core/busytex',
    remoteEndpoint: 'https://texlive2026.texlyre.org',
    collections: ['recommended'],
    pdfHeight: 600,
    engine: 'pdflatex',
};

export function useLatexCompileConfig() {
    const { siteConfig } = useDocusaurusContext();
    const raw = (siteConfig.customFields && siteConfig.customFields.latexCompile) || {};
    const assetBase = useBaseUrl(raw.assetPath || DEFAULTS.assetPath);

    return useMemo(
        () => ({
            assetBase,
            remoteEndpoint: raw.remoteEndpoint || DEFAULTS.remoteEndpoint,
            collections: raw.collections || DEFAULTS.collections,
            pdfHeight: raw.pdfHeight || DEFAULTS.pdfHeight,
            engine: raw.engine || DEFAULTS.engine,
        }),
        [assetBase, raw.remoteEndpoint, raw.collections, raw.pdfHeight, raw.engine]
    );
}