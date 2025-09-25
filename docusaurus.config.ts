import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'TeXlyre',
  tagline: 'Local-first real-time LaTeX collaboration platform',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://texlyre.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'texlyre', // Usually your GitHub org/user name.
  projectName: 'texlyre.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/texlyre/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/texlyre/docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/texlyre-social-card.jpg',
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
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/texlyre/texlyre',
          label: 'GitHub',
          position: 'left',
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
            // {
            //   label: 'User Guide',
            //   to: '/docs/user-guide',
            // },
            // {
            //   label: 'API Reference',
            //   to: '/docs/api',
            // },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Reddit Community',
              href: 'https://reddit.com/r/TeXlyre',
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
                  <svg style="margin-right: 0.5rem; vertical-align: middle;" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              `,
            },
            {
              html: `
                <a href="https://www.npmjs.com/org/texlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <svg style="margin-right: 0.5rem; vertical-align: middle;" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
                  </svg>
                  npm
                </a>
              `,
            },
            {
              html: `
                <a href="https://huggingface.co/texlyre" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <svg style="margin-right: 0.5rem; vertical-align: middle;" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Hugging Face
                </a>
              `,
            },
          ],
        },
        {
          title: 'More',
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
              label: 'TeXlyre LaTeX Templates',
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
              href: 'https://filepizza.emaily.re',
            },
            {
              label: 'Fork: BibEditor (BibTeX Tidy)',
              href: 'https://texlyre.github.io/bib-editor',
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TeXlyre Project.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['latex', 'bash', 'javascript', 'typescript', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
