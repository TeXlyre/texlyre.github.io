export type DownloadProduct = 'chelys' | 'texlyre';

export type DownloadChannel = {
  label: string;
  meta?: string;
  icon?: string;
  href?: string;
  action?: string;
  command?: string;
  badge?: {
    src: string;
    alt: string;
  };
};

export type DownloadGroup = {
  platform: string;
  channels: DownloadChannel[];
};

export type DownloadSection = {
  id: DownloadProduct;
  title: string;
  logo?: string;
  description: string;
  groups: DownloadGroup[];
};

export const downloadSections: DownloadSection[] = [
  {
    id: 'texlyre',
    title: 'TeXlyre',
    logo: '/img/logo.svg',
    description:
      'The editor runs in the browser and needs no installation. Use the hosted instance, run it locally, or deploy your own instance.',
    groups: [
      {
        platform: 'Hosted',
        channels: [
          {
            label: 'texlyre.org',
            meta: 'Works offline once loaded, and your data stays in the browser',
            href: 'https://texlyre.org/texlyre',
            action: 'Launch',
          },
        ],
      },
      {
        platform: 'Package managers',
        channels: [
          {
            label: 'nixpkgs',
            meta: 'NixOS and Nix, or add pkgs.texlyre to environment.systemPackages',
            icon: '/img/icons/nix-snowflake.svg',
            command: 'nix run nixpkgs#texlyre',
          },
        ],
      },
      {
        platform: 'Self-host',
        channels: [
          {
            label: 'TeXlyre Infrastructure',
            meta: 'Dockerized deployment of TeXlyre and the supporting servers',
            href: 'https://github.com/texlyre/texlyre-infrastructure',
            action: 'View infrastructure',
          },
          {
            label: 'GitHub Pages',
            meta: 'Fork TeXlyre and deploy the frontend with GitHub Pages',
            href: '/docs/configuration#github-pages-deployment',
            action: 'Deployment guide',
          },
        ],
      },
    ],
  },
  {
    id: 'chelys',
    title: 'Chelys',
    logo: '/img/chelys-logo.svg',
    description:
      'The desktop companion that runs language servers, local typesetters, and distributed storage on your machine. Every channel below installs the same build from the same release.',
    groups: [
      {
        platform: 'Windows',
        channels: [
          {
            label: 'Microsoft Store',
            meta: 'Windows 10 and 11, with automatic updates',
            command: 'winget install --source msstore 9P96Z1WPB4WK',
            href: 'https://apps.microsoft.com/detail/9P96Z1WPB4WK',
            badge: {
              src: '/img/icons/microsoft-store-badge.svg',
              alt: 'Get it from Microsoft',
            },
          },
        ],
      },
      {
        platform: 'All platforms',
        channels: [
          {
            label: 'Latest release',
            meta: 'Builds and checksums for Windows, macOS, and Linux',
            icon: '/img/icons/github.svg',
            href: 'https://github.com/TeXlyre/chelys/releases/latest',
          },
        ],
      },
    ],
  },
];
