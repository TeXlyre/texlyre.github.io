import React from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import BrowserOnly from '@docusaurus/BrowserOnly';
import LatexCompileBlock from '@site/src/components/LatexCompileBlock';
import TypstCompileBlock from '@site/src/components/TypstCompileBlock';
import { parsePdfVariants } from '@site/src/components/TypstCompileBlock/pdfStandards';
import { registerExampleFile } from '@site/src/components/CompileBlock/exampleFiles';

function parseEngines(metastring) {
    if (typeof metastring !== 'string') return undefined;
    const engine = metastring.match(/\bengine=((?:pdflatex|xelatex|lualatex)(?:,(?:pdflatex|xelatex|lualatex))*)\b/);
    return engine ? Array.from(new Set(engine[1].split(','))) : undefined;
}

function parsePdfHeight(metastring) {
    if (typeof metastring !== 'string') return undefined;
    const height = metastring.match(/\bpdfheight=(\d+)(px)?\b/);
    return height ? parseInt(height[1], 10) : undefined;
}

function parseCompileFlag(metastring) {
    if (typeof metastring !== 'string') return false;
    return /\bcompile\b/.test(metastring);
}

function parsePdfSpec(metastring) {
    if (typeof metastring !== 'string') return undefined;
    const spec = metastring.match(/\bpdf=([\w.+,-]+)/);
    return spec ? spec[1] : undefined;
}

function parsePdfTags(metastring) {
    if (typeof metastring !== 'string') return undefined;
    const tags = metastring.match(/\btags=(true|false)\b/);
    return tags ? tags[1] === 'true' : undefined;
}

function parseTitle(metastring) {
    if (typeof metastring !== 'string') return null;
    const match = metastring.match(/\btitle=(?:"([^"]+)"|'([^']+)'|([^\s]+))/);
    return match ? (match[1] || match[2] || match[3] || null) : null;
}

function hasLanguage(className, language) {
    return typeof className === 'string' && className.split(' ').includes(`language-${language}`);
}

export default function CodeBlock(props) {
    const source = typeof props.children === 'string' ? props.children : null;
    const title = parseTitle(props.metastring);

    if (source && title) registerExampleFile(title, source);

    const pdfHeight = parsePdfHeight(props.metastring);

    if (source != null && hasLanguage(props.className, 'latex')) {
        const engines = parseEngines(props.metastring);
        if (engines && engines.length) {
            return (
                <BrowserOnly fallback={<OriginalCodeBlock {...props} />}>
                    {() => (
                        <LatexCompileBlock
                            {...props}
                            source={source}
                            engines={engines}
                            pdfHeight={pdfHeight}
                        />
                    )}
                </BrowserOnly>
            );
        }
    }

    if (source != null && hasLanguage(props.className, 'typst') && parseCompileFlag(props.metastring)) {
        return (
            <BrowserOnly fallback={<OriginalCodeBlock {...props} />}>
                {() => (
                    <TypstCompileBlock
                        {...props}
                        source={source}
                        pdfVariants={parsePdfVariants(parsePdfSpec(props.metastring))}
                        pdfTags={parsePdfTags(props.metastring)}
                        pdfHeight={pdfHeight}
                    />
                )}
            </BrowserOnly>
        );
    }

    return <OriginalCodeBlock {...props} />;
}
