import React, { useMemo } from 'react';
import CompileBlock from '@site/src/components/CompileBlock';
import { useLatexCompileConfig } from '@site/src/components/CompileBlock/config';
import { useBusyTex } from './useBusyTex';

const CREDIT = {
    href: 'https://github.com/TeXlyre/texlyre-busytex',
    label: 'texlyre-busytex',
    logo: '/img/logo.svg',
};

export default function LatexCompileBlock({ source, engine, engines, pdfHeight, ...codeBlockProps }) {
    const config = useLatexCompileConfig();
    const engineList = useMemo(() => {
        if (Array.isArray(engines) && engines.length) return engines;
        return [engine || config.engine];
    }, [engines, engine, config.engine]);

    const compiler = useBusyTex({
        basePath: config.assetBase,
        collections: config.collections,
        remoteEndpoint: config.remoteEndpoint,
    });

    return (
        <CompileBlock
            {...codeBlockProps}
            source={source}
            compiler={compiler}
            variants={engineList}
            variantLabel={(name) => `Compile with ${name}`}
            pdfHeight={pdfHeight || config.pdfHeight}
            credit={CREDIT}
        />
    );
}
