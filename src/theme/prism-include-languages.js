import siteConfig from '@generated/docusaurus.config';

const prismIncludeLanguages = (PrismObject) => {
    const {
        themeConfig: { prism = {} },
    } = siteConfig;

    const { additionalLanguages = [] } = prism;

    const previousPrism = globalThis.Prism;
    globalThis.Prism = PrismObject;

    additionalLanguages.forEach((lang) => {
        if (lang === 'typst' || lang === 'typ') {
            require('./prism-typst');
        } else if (lang === 'bibtex' || lang === 'bib') {
            require('prismjs-bibtex');
        } else {
            require(`prismjs/components/prism-${lang}`);
        }
    });

    if (previousPrism) {
        globalThis.Prism = previousPrism;
    } else {
        delete globalThis.Prism;
    }
};

export default prismIncludeLanguages;