import React from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import BrowserOnly from '@docusaurus/BrowserOnly';
import LatexCompileBlock from '@site/src/components/LatexCompileBlock';
import { registerExampleFile } from '@site/src/components/LatexCompileBlock/exampleFiles';

function parseMeta(metastring) {
    if (typeof metastring !== 'string') return {};
    const engine = metastring.match(/\bengine=((?:pdflatex|xelatex|lualatex)(?:,(?:pdflatex|xelatex|lualatex))*)\b/);
    const height = metastring.match(/\bpdfheight=(\d+)(px)?\b/);
    const engines = engine ? Array.from(new Set(engine[1].split(','))) : undefined;
    return {
        engines,
        pdfHeight: height ? parseInt(height[1], 10) : undefined,
    };
}

function parseTitle(metastring) {
    if (typeof metastring !== 'string') return null;
    const match = metastring.match(/\btitle=(?:"([^"]+)"|'([^']+)'|([^\s]+))/);
    return match ? (match[1] || match[2] || match[3] || null) : null;
}

export default function CodeBlock(props) {
    const source = typeof props.children === 'string' ? props.children : null;
    const title = parseTitle(props.metastring);

    if (source && title) registerExampleFile(title, source);

    const isLatex =
        typeof props.className === 'string' &&
        props.className.split(' ').includes('language-latex');
    const meta = isLatex ? parseMeta(props.metastring) : {};

    if (!isLatex || !meta.engines || !meta.engines.length || source == null) {
        return <OriginalCodeBlock {...props} />;
    }

    return (
        <BrowserOnly fallback={<OriginalCodeBlock {...props} />}>
            {() => (
                <LatexCompileBlock
                    {...props}
                    source={source}
                    engines={meta.engines}
                    pdfHeight={meta.pdfHeight}
                />
            )}
        </BrowserOnly>
    );
}
