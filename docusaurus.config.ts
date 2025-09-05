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
              label: 'GitHub Organization',
              href: 'https://github.com/texlyre',
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
