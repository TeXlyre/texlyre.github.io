import React from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import BrowserOnly from '@docusaurus/BrowserOnly';
import LatexCompileBlock from '@site/src/components/LatexCompileBlock';

function parseMeta(metastring) {
    if (typeof metastring !== 'string') return {};
    const engine = metastring.match(/\bengine=(pdflatex|xelatex|lualatex)\b/);
    const height = metastring.match(/\bpdfheight=(\d+)(px)?\b/);
    return {
        engine: engine ? engine[1] : undefined,
        pdfHeight: height ? parseInt(height[1], 10) : undefined,
    };
}

export default function CodeBlock(props) {
    const isLatex =
        typeof props.className === 'string' &&
        props.className.split(' ').includes('language-latex');
    const meta = isLatex ? parseMeta(props.metastring) : {};

    if (!isLatex || !meta.engine || typeof props.children !== 'string') {
        return <OriginalCodeBlock {...props} />;
    }

    return (
        <BrowserOnly fallback={<OriginalCodeBlock {...props} />}>
            {() => (
                <LatexCompileBlock
                    {...props}
                    source={props.children}
                    engine={meta.engine}
                    pdfHeight={meta.pdfHeight}
                />
            )}
        </BrowserOnly>
    );
}