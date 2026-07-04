import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const prismIncludeLanguages = (PrismObject) => {
    if (ExecutionEnvironment.canUseDOM) {
        const {
            themeConfig: { prism = {} },
        } = siteConfig;
        const { additionalLanguages = [] } = prism;

        window.Prism = PrismObject;

        additionalLanguages.forEach((lang) => {
            if (lang === 'typst' || lang === 'typ') {
                require('./prism-typst');
            } else if (lang === 'bibtex' || lang === 'bib') {
                require('prismjs-bibtex');
            } else {
                require(`prismjs/components/prism-${lang}`);
            }
        });

        delete window.Prism;
    }
};

export default prismIncludeLanguages;