import React, { useMemo } from 'react';
import CompileBlock from '@site/src/components/CompileBlock';
import { useTypstCompileConfig } from '@site/src/components/CompileBlock/config';
import { formatPdfVariant } from './pdfStandards';
import { useTypstCompile } from './useTypstCompile';

const CREDIT = {
    href: 'https://github.com/Myriad-Dreamin/typst.ts',
    label: 'typst.ts',
};

const DEFAULT_VARIANT = 'typst';

export default function TypstCompileBlock({ source, pdfVariants, pdfTags, pdfHeight, ...codeBlockProps }) {
    const config = useTypstCompileConfig();

    const variants = useMemo(
        () => (Array.isArray(pdfVariants) && pdfVariants.length ? pdfVariants : [DEFAULT_VARIANT]),
        [pdfVariants]
    );

    const compiler = useTypstCompile({
        assetBase: config.assetBase,
        fontBase: config.fontBase,
        pdfTags,
    });

    return (
        <CompileBlock
            {...codeBlockProps}
            source={source}
            compiler={compiler}
            variants={variants}
            variantLabel={(variant) =>
                variant === DEFAULT_VARIANT
                    ? 'Compile with typst'
                    : `Compile as ${formatPdfVariant(variant)}`
            }
            pdfHeight={pdfHeight || config.pdfHeight}
            credit={CREDIT}
        />
    );
}
