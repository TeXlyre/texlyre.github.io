import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'TeXlyre',
  tagline: 'The Free, Open-source, & Local-First LaTeX & Typst Collaborative Web Editor',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://texlyre.github.io',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'texlyre',
  projectName: 'texlyre.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://texlyre.github.io',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: 'TeXlyre',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:logo',
        content: 'https://texlyre.github.io/img/logo.svg',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/texlyre/docs/tree/main/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/texlyre/docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/main_showcase_dark.png',
    metadata: [
      {name: 'keywords', content: 'LaTeX editor, Typst editor, collaborative editor, local-first, open-source, web editor, LaTeX online, Typst online'},
      {name: 'description', content: 'TeXlyre is a local-first LaTeX and Typst collaborative web editor. Write, compile, and collaborate on LaTeX and Typst documents directly in your browser.'},
    ],
    navbar: {
      title: 'TeXlyre',
      logo: {
        alt: 'TeXlyre Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/texlyre/texlyre',
          label: 'GitHub',
          position: 'left',
        },
        {
          href: 'https://github.com/sponsors/texlyre',
          label: 'Sponsor',
          position: 'left',
          className: 'header-sponsor-link',
        },
        {
          href: 'https://texlyre.github.io/texlyre',
          label: 'Login to TeXlyre',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'Configuring TeXlyre',
              to: '/docs/configuration#configuration-files',
            },
            {
              label: 'Deploying a GitHub Fork',
              to: '/docs/configuration#github-pages-deployment',
            },
          ],
        },
        {
          title: 'Quick Links',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Launch TeXlyre',
              href: 'https://texlyre.github.io/texlyre',
            },
            {
              label: 'Self-Host TeXlyre',
              href: 'https://github.com/texlyre/texlyre-infrastructure',
            },
            {
              label: 'TeXlyre Templates',
              href: 'https://texlyre.github.io/texlyre-templates',
            },
          ],
        },
        {
          title: 'TeXlyre Tools',
          items: [
            {
              label: 'Codemirror LaTeX Language',
              href: 'https://texlyre.github.io/codemirror-lang-latex',
            },
            {
              label: 'Codemirror BibTeX Language',
              href: 'https://texlyre.github.io/codemirror-lang-bib',
            },
            {
              label: 'WASM LaTeX Tools',
              href: 'https://texlyre.github.io/wasm-latex-tools',
            },
            {
              label: 'TeXlyre BusyTeX (TexLive 2025)',
              href: 'https://texlyre.github.io/texlyre-busytex',
            },
            {
              label: 'LaTeX WYSIWYM Editor',
              href: 'https://texlyre.github.io/codemirror-latex-visual',
            },
            {
              label: 'Vector to PDF Converter',
              href: 'https://texlyre.github.io/vector-pdf-converter',
            },
            {
              label: 'FilePizza API',
              href: 'https://texlyre.github.io/filepizza-client',
            },
            {
              label: 'Fork: FilePizza',
              href: 'https://filepizza.texlyre.org',
            },
            {
              label: 'Fork: BibEditor (BibTeX Tidy)',
              href: 'https://texlyre.github.io/bib-editor',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contact Us',
              href: 'mailto:contact@texlyre.org?subject=[texlyre.org]',
            },
            {
              label: 'Matrix Chat',
              href: 'https://matrix.to/#/#texlyre:matrix.org',
            },
            {
              label: 'Reddit Community',
              href: 'https://reddit.com/r/TeXlyre',
            },
            {
              label: 'Lemmy Community',
              href: 'https://lemmy.world/c/TeXlyre',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/texlyre/texlyre/discussions',
            },
            {
              label: 'Issues & Support',
              href: 'https://github.com/texlyre/texlyre/issues',
            },
          ],
        },
        {
          title: 'Platforms',
          items: [
            {
              html: `
                <a href="https://github.com/texlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <img src="/img/icons/github.svg" alt="GitHub" style="margin-right: 0.5rem; vertical-align: middle; width: 16px; height: 16px; transform: scale(1.4);" />
                  GitHub
                </a>
              `,
            },
            {
              html: `
                <a href="https://codeberg.org/texlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <img src="/img/icons/codeberg.svg" alt="Codeberg" style="margin-right: 0.5rem; vertical-align: middle; width: 16px; height: 16px; filter: brightness(0) invert(1);" />
                  Codeberg (Mirror of GitHub)
                </a>
              `,
            },
            {
              html: `
                <a href="https://gitlab.com/TeXlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <img src="/img/icons/gitlab.svg" alt="GitLab" style="margin-right: 0.5rem; vertical-align: middle; width: 16px; height: 16px; transform: scale(1.7);" />
                  GitLab (Mirror of GitHub)
                </a>
              `,
            },
            {
              html: `
                <a href="https://www.npmjs.com/org/texlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <img src="/img/icons/npm.svg" alt="npm" style="margin-right: 0.5rem; vertical-align: middle; width: 16px; height: 16px;" />
                  npm
                </a>
              `,
            },
            {
              html: `
                <a href="https://huggingface.co/texlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <img src="/img/icons/huggingface.svg" alt="Hugging Face" style="margin-right: 0.5rem; vertical-align: middle; width: 16px; height: 16px;" />
                  Hugging Face
                </a>
              `,
            },
            {
              html: `
                <a href="https://crowdin.com/project/texlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <img src="/img/icons/crowdin.svg" alt="Crowdin" style="margin-right: 0.5rem; vertical-align: middle; width: 16px; height: 16px;" />
                  Crowdin
                </a>
              `,
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy Policy',
              href: 'https://texlyre.github.io/texlyre/#privacy-policy',
            },
            {
              label: 'AGPL 3.0 License',
              href: 'https://github.com/TeXlyre/texlyre/blob/main/LICENSE',
            },
            {
              label: 'Attributions',
              to: '/docs/attributions',
            },
          ],
        },
        {
          title: 'Socials',
          items: [
            {
              html: `
        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
          <a href="https://reddit.com/r/TeXlyre" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
            <img src="/img/icons/reddit.svg" alt="Reddit" style="width: 32px; height: 32px;" />
          </a>
          <a href="https://lemmy.world/c/TeXlyre" target="_blank" rel="noopener noreferrer" aria-label="Lemmy">
            <img src="/img/icons/lemmy.svg" alt="Lemmy" style="width: 32px; height: 32px;" />
          </a>
          <a href="https://youtube.com/@TeXlyre" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src="/img/icons/youtube.svg" alt="YouTube" style="width: 32px; height: 32px;" />
          </a>
          <a href="https://makertube.net/c/texlyre" target="_blank" rel="noopener noreferrer" aria-label="PeerTube">
            <img src="/img/icons/peertube.svg" alt="PeerTube" style="width: 32px; height: 32px;" />
          </a>
        </div>
      `,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TeXlyre Project.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['latex', 'typst', 'bash', 'javascript', 'typescript', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
