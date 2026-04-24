# LaTeX Compile Button for Docusaurus

Adds a compile button to LaTeX code fences in Docusaurus docs and blog posts. Compilation runs in the browser via [`texlyre-busytex`](https://github.com/TeXlyre/texlyre-busytex) (TeX Live 2026, WASM) with optional on-demand package fetching.

- Opt-in per block: only `latex` fences with `engine=pdflatex|xelatex|lualatex` get a button.
- Per-block PDF preview height: `pdfheight=<pixels>`.
- Global cross-block lock: while one block compiles, others are disabled.
- Stop button: terminates the WASM worker mid-compile.
- Fully themable via Infima tokens (light/dark mode aware).

## Requirements

- Docusaurus 3.x (classic theme).
- Node.js 18+.
- ~200 MB browser cache available on first compile (TeX Live Recommended collection).

## Installation

```bash
npm install texlyre-busytex
npx texlyre-busytex download-assets ./static/core
```

The second command downloads WASM assets to `static/core/busytex/`. Docusaurus serves them at `/core/busytex/` at runtime.

Swizzle the `CodeBlock` component (non-interactive):

```bash
npm run swizzle @docusaurus/theme-classic CodeBlock -- --wrap --danger --typescript=false
```

The flags:
- `--wrap`: wrap the original component instead of ejecting.
- `--danger`: skip the interactive safety prompt.
- `--typescript=false`: scaffold JavaScript files.

Drop in the source files below.

## File layout

```
src/
  theme/
    CodeBlock/
      index.js
  components/
    LatexCompileBlock/
      index.js
      useBusyTex.js
      compileLock.js
      collections.js
      config.js
      styles.module.css
```

(File contents live in this repository and copy them into your Docusaurus project.)

## Configuration

All runtime values read from `siteConfig.customFields.latexCompile`. Defaults:

| Key              | Default                               | Meaning                                          |
| ---------------- | ------------------------------------- | ------------------------------------------------ |
| `assetPath`      | `/core/busytex`                       | Where the WASM assets are served (baseUrl-aware).|
| `remoteEndpoint` | `https://texlive2026.texlyre.org`     | On-demand TeX Live package server.               |
| `collections`    | `['recommended']`                     | Preloaded collections: `basic`, `recommended`, `extra`. |
| `pdfHeight`      | `600`                                 | Default PDF preview height in pixels.            |
| `engine`         | `pdflatex`                            | Fallback engine when fence metastring omits it.  |

### Via `docusaurus.config.js`

Any of these fields can be overridden statically:

```js
module.exports = {
  customFields: {
    latexCompile: {
      remoteEndpoint: 'https://texlive2026.texlyre.org',
      collections: ['basic'],
      pdfHeight: 700,
    },
  },
};
```

### Via environment variables

Read env vars inside `docusaurus.config.js` and feed them into `customFields`. Docusaurus evaluates the config file at build time (or dev-server start), so any `process.env.*` reference is resolved then. Example:

```js
const collections = process.env.LATEX_COLLECTIONS
  ? process.env.LATEX_COLLECTIONS.split(',')
  : undefined;

module.exports = {
  customFields: {
    latexCompile: {
      assetPath: process.env.LATEX_ASSET_PATH,
      remoteEndpoint: process.env.LATEX_REMOTE_ENDPOINT,
      collections,
      pdfHeight: process.env.LATEX_PDF_HEIGHT
        ? parseInt(process.env.LATEX_PDF_HEIGHT, 10)
        : undefined,
      engine: process.env.LATEX_ENGINE,
    },
  },
};
```

Supported variables (all optional since unset falls through to the defaults above):

| Variable                  | Example                                 |
| ------------------------- | --------------------------------------- |
| `LATEX_ASSET_PATH`        | `/core/busytex`                         |
| `LATEX_REMOTE_ENDPOINT`   | `https://texlive2026.texlyre.org`       |
| `LATEX_COLLECTIONS`       | `basic,recommended` (comma-separated)   |
| `LATEX_PDF_HEIGHT`        | `700`                                   |
| `LATEX_ENGINE`            | `lualatex`                              |

Usage:

```bash
LATEX_COLLECTIONS=basic LATEX_PDF_HEIGHT=800 npm run start
LATEX_ENGINE=lualatex npm run build
```

For a `.env` file, use any standard loader (e.g. `dotenv` at the top of `docusaurus.config.js`) since Docusaurus doesn't include one by default.

## Usage in Markdown

Add `engine=` to any `latex` fence to enable the compile button:

````markdown
```latex engine=pdflatex
\documentclass{article}
\begin{document}
Hello, world!
\end{document}
```
````

With custom preview height:

````markdown
```latex engine=lualatex pdfheight=800
\DocumentMetadata{tagging = on}
\documentclass{ltx-talk}
...
```
````

Fences without `engine=` render as plain code blocks.

Supported engines: `pdflatex`, `xelatex`, `lualatex`.

## How it works

- **Swizzle** (`src/theme/CodeBlock/index.js`): intercepts `className="language-latex"` fences, parses `engine=` and `pdfheight=` from the metastring, routes matching blocks to `LatexCompileBlock`.
- **Config hook** (`config.js`): reads `customFields.latexCompile`, exposes resolved defaults.
- **Runner hook** (`useBusyTex.js`): module-level singleton `BusyTexRunner`; one WASM worker shared across all blocks on the page. On stop, terminates the worker and clears the cache so the next compile rebuilds fresh.
- **Shared lock** (`compileLock.js`): tiny pub-sub that disables sibling buttons during a compile and routes the stop action to the active block.
- **`BrowserOnly`** wrapping: WASM can't run during SSR; the server render falls back to a plain code block with no layout shift at hydration.

## Costs and caveats

- **First compile downloads a collection** (~200 MB for `recommended`). The browser caches it; subsequent compiles reuse the cache.
- **On-demand packages** are fetched per compile from `remoteEndpoint` for anything outside the preloaded collection. This is cached client-side too.
- **Stop = terminate.** There's no graceful cancel API in `texlyre-busytex`; stopping kills the worker. The next compile re-initializes the engine.
- **`shell-escape` is unavailable**, and custom fonts must be provided inline via `additionalFiles`. See the `texlyre-busytex` README for details.

## License

Same as your Docusaurus site. `texlyre-busytex` is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).