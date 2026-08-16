# Compile Buttons for Docusaurus

Adds a compile button to LaTeX and Typst code fences in Docusaurus docs and blog posts. LaTeX compiles in the browser via [`texlyre-busytex`](https://github.com/TeXlyre/texlyre-busytex) (TeX Live 2026, WASM) with on-demand package and TeX Live font fetching. Typst compiles in the browser via [`typst.ts`](https://github.com/Myriad-Dreamin/typst.ts) (WASM) with locally served fonts.

`CompileBlock` is the shared shell: toolbar, engine picker, global lock, error pane, and PDF preview. `LatexCompileBlock` and `TypstCompileBlock` bind an engine to it.

- Opt-in per block: `latex` fences need `engine=pdflatex|xelatex|lualatex`, `typst` fences need `compile`.
- Per-block PDF preview height: `pdfheight=<pixels>`.
- Global cross-block lock: while one block compiles, others are disabled, across both languages.
- Stop button: terminates the WASM worker mid-compile.
- Fully themable via Infima tokens (light/dark mode aware).

## Requirements

- Docusaurus 3.x (classic theme).
- Node.js 18+.
- ~90 MB browser cache available on first LaTeX compile (TeX Live Basic collection).
- ~30 MB served WASM plus ~37 MB fonts for Typst (~77 MB with emoji and CJK included).

## Installation

```bash
npm install texlyre-busytex @myriaddreamin/typst.ts @myriaddreamin/typst-ts-web-compiler
npx texlyre-busytex download-assets ./static/core
npm run typst-assets
```

The second command downloads BusyTeX WASM assets to `static/core/busytex/`. The third copies the Typst compiler WASM to `static/core/typst-ts-web-compiler/pkg/` and mirrors TeXlyre's font set into `static/core/assets/fonts/`, writing a `fonts.json` listing exactly what it staged. Docusaurus serves both under `/core/` at runtime.

Swizzle the `CodeBlock` component (non-interactive):

```bash
npm run swizzle @docusaurus/theme-classic CodeBlock -- --wrap --danger --typescript=false
```

Flags:
- `--wrap`: wrap the original component instead of ejecting.
- `--danger`: skip the interactive safety prompt.
- `--typescript=false`: scaffold JavaScript files.

## Configuration

Runtime values read from `siteConfig.customFields.latexCompile` and `siteConfig.customFields.typstCompile`. Defaults:

| Key                             | Default                           | Meaning                                                 |
| ------------------------------- | --------------------------------- | ------------------------------------------------------- |
| `latexCompile.assetPath`        | `/core/busytex`                   | Where the BusyTeX WASM assets are served (baseUrl-aware).|
| `latexCompile.remoteEndpoint`   | `https://texlive2026.texlyre.org` | On-demand TeX Live package and font server.             |
| `latexCompile.collections`      | `['basic']`                       | Preloaded collections: `basic`, `recommended`, `extra`. |
| `latexCompile.pdfHeight`        | `600`                             | Default PDF preview height in pixels.                   |
| `latexCompile.engine`           | `pdflatex`                        | Fallback engine when fence metastring omits it.         |
| `typstCompile.assetPath`        | `/core`                           | Root the Typst WASM package is served from.             |
| `typstCompile.fontPath`         | `/core/assets/fonts`              | Directory holding `fonts.json` and the font files.      |
| `typstCompile.pdfHeight`        | `600`                             | Default PDF preview height in pixels.                   |

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
    typstCompile: {
      pdfHeight: 700,
    },
  },
};
```

### Via environment variables

Read env vars inside `docusaurus.config.js` and feed them into `customFields`. Docusaurus evaluates the config file at build time (or dev-server start), so any `process.env.*` reference is resolved then.

Supported variables (all optional since unset falls through to the defaults above):

| Variable                  | Example                                 |
| ------------------------- | --------------------------------------- |
| `LATEX_ASSET_PATH`        | `/core/busytex`                         |
| `LATEX_REMOTE_ENDPOINT`   | `https://texlive2026.texlyre.org`       |
| `LATEX_COLLECTIONS`       | `basic,recommended` (comma-separated)   |
| `LATEX_PDF_HEIGHT`        | `700`                                   |
| `LATEX_ENGINE`            | `lualatex`                              |
| `TYPST_ASSET_PATH`        | `/core`                                 |
| `TYPST_FONT_PATH`         | `/core/assets/fonts`                    |
| `TYPST_PDF_HEIGHT`        | `700`                                   |

`scripts/download-typst-assets.mjs` reads two more variables at build time:

| Variable              | Default                    | Meaning                                                        |
| --------------------- | -------------------------- | -------------------------------------------------------------- |
| `TYPST_FONT_BASE_URL` | TeXlyre `public/assets/fonts` | Where the font index and files are mirrored from.            |
| `TYPST_FONT_EXCLUDE`  | `ColorEmoji\|CJK`          | Case-insensitive regex dropping fonts from the upstream index. |

Set `TYPST_FONT_EXCLUDE=` (empty) to stage TeXlyre's full set.

Usage:

```bash
LATEX_COLLECTIONS=basic LATEX_PDF_HEIGHT=800 npm run start
TYPST_PDF_HEIGHT=800 npm run build
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

Add `compile` to any `typst` fence:

````markdown
```typst compile pdfheight=500
#set page(numbering: "1")
= Hello, world!
```
````

Typst fences accept `pdf=` to pick the PDF standard and `tags=` to toggle tagged (accessible) output:

````markdown
```typst compile pdf=1.7,a-3b tags=true
= Hello, world!
```
````

Commas separate dropdown variants, exactly like `engine=`. A `+` combines standards within one variant, since a document can conform to a version, an archival standard, and an accessibility standard at once:

````markdown
```typst compile pdf=2.0+ua-1
= An accessible document
```
````

Accepted values: `1.4`, `1.5`, `1.6`, `1.7`, `2.0`, `a-1b`, `a-1a`, `a-2b`, `a-2u`, `a-2a`, `a-3b`, `a-3u`, `a-3a`, `a-4`, `a-4f`, `a-4e`, `ua-1`. Omitting `pdf=` compiles as PDF 1.7; omitting `tags=` leaves tagging on.

With custom preview height:

````markdown
```latex engine=lualatex pdfheight=800
\DocumentMetadata{tagging = on}
\documentclass{ltx-talk}
...
```
````

Fences without `engine=` or `compile` render as plain code blocks. Comma-separated engines e.g., `engine=pdflatex,xelatex` will render a dropdown next to the compile button. Typst has a single engine, so its dropdown appears only when `pdf=` lists more than one variant.

Supported LaTeX engines: `pdflatex`, `xelatex`, `lualatex`.

## How it works

- **Swizzle** (`src/theme/CodeBlock/index.js`): intercepts `language-latex` and `language-typst` fences, parses `engine=`, `compile`, and `pdfheight=` from the metastring, routes matching blocks to the right compile block.
- **Shared shell** (`CompileBlock/index.js`): renders the toolbar, optional variant dropdown, error pane, and PDF preview. Takes a `compiler` object (`{ compile, stop, status, error, log, progress }`) and calls `compile(source, variant)`. The `credit` prop carries `{ href, label, logo? }`; `logo` is omitted for engines that are not TeXlyre projects, leaving a text-only credit.
- **Config hook** (`CompileBlock/config.js`): reads `customFields`, exposes resolved defaults per language.
- **Runner hooks** (`useBusyTex.js`, `useTypstCompile.js`): module-level singleton workers; one worker per engine shared across all blocks on the page. On stop, terminates the worker so the next compile rebuilds fresh.
- **Shared lock** (`CompileBlock/compileLock.js`): tiny pub-sub that disables sibling buttons during a compile and routes the stop action to the active block. Shared across languages, so a LaTeX compile disables Typst buttons and vice versa.
- **`BrowserOnly`** wrapping: WASM can't run during SSR; the server render falls back to a plain code block with no layout shift at hydration.

## Costs and caveats

- **First LaTeX compile downloads a collection** (~90 MB for `basic`). The browser caches it; subsequent compiles reuse the cache.
- **On-demand TeX Live files** outside the preloaded collection are fetched from `remoteEndpoint`. This includes packages and supported TeX Live fonts.
- **Biber** is loaded as a separate WebAssembly module only when a BibLaTeX compilation produces a `.bcf` file.
- **Stop = terminate.** There's no graceful cancel API in either engine; stopping kills the worker. The next compile re-initializes it.
- **Shell escape is not enabled by this component.** `texlyre-busytex` supports explicitly registered browser-side handlers, but not arbitrary native commands.
- **Typst fonts are loaded eagerly.** Every entry in the served `fonts.json` is fetched and registered before the first compile, so the staged set is a direct per-visitor download cost. The default excludes the emoji and CJK faces, which are 40 MB of TeXlyre's 77 MB.
- **Custom fonts** are not supplied by the code-block component. For LaTeX, the remote font resolver covers fonts from the configured TeX Live tree. For Typst, only the fonts staged under `fontPath` are available.
- **Invalid `pdf=` values** surface in the error pane on compile rather than at build time; the fence still renders. Combinations the standards themselves forbid (e.g. `a-1b+a-3b`) are rejected by Typst, not by the parser.
- **Typst previews PDF only.** SVG output is available in TeXlyre itself, where it feeds source mapping and outline navigation; neither applies on a docs page.
- **Typst `@preview` packages** are fetched at compile time through `FetchPackageRegistry`, so a block that imports one needs network access on first use. The worker deliberately avoids `TypstSnippet`, whose lazy renderer import would pull `@myriaddreamin/typst-ts-renderer` and its 1.2 MB WASM into the bundle for no runtime benefit.

## License

Same as your Docusaurus site. `texlyre-busytex` is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). `typst.ts` is licensed under Apache-2.0.
