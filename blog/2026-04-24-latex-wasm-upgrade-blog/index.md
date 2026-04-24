---
slug: latex-wasm-engine-upgrade
title: LaTeX WebAssembly Engine Modernization
authors: [slorber]
tags: [texlyre, latex, busytex, luatex, pdftex, xetex, texlive2026, synctex, nlnet]
---

:::info Part of the NGI0 Core roadmap

This post reports on Task 1 of TeXlyre's NGI0 Commons grant. For the full project roadmap, see [TeXlyre joins NGI0 Commons](/blog/nlnet-ngi0-funding-overview).

:::

TeXlyre's in-browser LaTeX compilation has been upgraded from TeX Live 2020 to TeX Live 2026. LuaLaTeX now works alongside pdfLaTeX and XeLaTeX, and SyncTeX provides bidirectional navigation between source and PDF.

## Background

TeXlyre originally used SwiftLaTeX, whose WebAssembly build was frozen at TeX Live 2020. This meant any LaTeX package released after 2020 would fail to compile in the browser, and LuaLaTeX was unavailable at all. Bundling a full TeX Live installation into the browser wasn't practical due to size, so we took inspiration from SwiftLaTeX's approach: a dedicated package server that serves individual packages on demand, paired with a modernized BusyTeX WebAssembly engine.

The work spans three repositories that together form the engine stack. Each link below goes to the full diff for that repository's contribution to this task.

- [texlyre-busytex-build](https://github.com/TeXlyre/texlyre-busytex-build/compare/2e52146^...nlnet_032026_T1-luatex__synctex__tl_on_demand): the WebAssembly build system and on-demand package server.
- [texlyre-busytex](https://github.com/TeXlyre/texlyre-busytex/compare/37d32e0^...nlnet_032026_T1-tl_on_demand): TypeScript API wrapper for the engine.
- [texlyre](https://github.com/TeXlyre/texlyre/compare/c23b811^...nlnet_032026_T1-synctex): main application integration.

## Milestone 1a: Dynamic package downloading

Rather than bundling TeX Live collections into the WASM image as was previously done in [BusyTeX](https://github.com/busytex/busytex), packages are now fetched from a dedicated TeX Live package server (see the [texlyre-busytex-build diff](https://github.com/TeXlyre/texlyre-busytex-build/compare/2e52146^...nlnet_032026_T1-luatex__synctex__tl_on_demand) for the server and kpse resolver implementation). A remote `kpse` resolver bridges the WebAssembly filesystem to the server, so when the engine requests a package during compilation, it's fetched, cached client-side, and served locally on subsequent runs. Cache misses are tracked explicitly to avoid redundant downloads, and ZIP-packaged collections are supported for environments where bulk loading makes sense.

Integration with the application layer (engine selection, lazy loading, cache handling) is in the [texlyre](https://github.com/TeXlyre/texlyre/compare/c23b811^...nlnet_032026_T1-synctex) and [texlyre-busytex](https://github.com/TeXlyre/texlyre-busytex/compare/37d32e0^...nlnet_032026_T1-tl_on_demand) diffs.

Packages outside the bundled core are now fetched on demand, making any CTAN package available without rebuilding the engine.

## Milestone 1b: LuaLaTeX and modern package compatibility

BusyTeX now builds against TeX Live 2026, with LuaTeX (LuaHBTeX) supported alongside pdfTeX and XeTeX. Multi-engine hyphenation generation and WASM format file rebuilding were both needed to make the new engines work properly. The build system changes are in the [texlyre-busytex-build diff](https://github.com/TeXlyre/texlyre-busytex-build/compare/2e52146^...nlnet_032026_T1-luatex__synctex__tl_on_demand); the engine selection and multi-tool wiring is in the [texlyre-busytex diff](https://github.com/TeXlyre/texlyre-busytex/compare/37d32e0^...nlnet_032026_T1-tl_on_demand).

Each of the three examples below targets a different capability introduced after TeX Live 2020: modern cross-referencing, accessibility tagging, and key-value table syntax

### Cross-referencing with `zref-clever`

`zref-clever` is a cross-referencing package released on CTAN in 2022 and was not yet available in TeX Live 2020.

```latex
\documentclass{article}
\usepackage{zref-clever}
\usepackage{amsmath}

\begin{document}
\section{Introduction}\label{sec:intro}
\section{Equations}\label{sec:eq}
\begin{equation}\label{eq:pythagoras} a^2 + b^2 = c^2 \end{equation}
\begin{equation}\label{eq:euler} e^{i\pi} + 1 = 0 \end{equation}

\section{References}
See \zcref{sec:intro}.
See \zcref{eq:pythagoras,eq:euler}.
See \zcref{sec:intro,eq:pythagoras,sec:eq}.
\end{document}
```

Output, identical across pdflatex, lualatex, and xelatex:

> See section 1. See equations (1) and (2). See sections 1 and 2 and equation (1).

`zref-clever` correctly groups the two section references together, separates the equation, and joins them with "and". 

### Accessibility and math tagging with `ltx-talk`

`ltx-talk` is a presentation class that uses LaTeX's `\DocumentMetadata` interface and the tagging pipeline to produce a structurally tagged PDF, including math content. This only compiles with full tagging capability under LuaLaTeX, which is itself the reason Milestone 1b was necessary, since prior to this upgrade, TeXlyre had no LuaLaTeX engine support.

```latex
\DocumentMetadata{tagging = on}
\documentclass{ltx-talk}

\IfFontExistsTF{Pennstander-Regular.otf}{
  \setmainfont{Pennstander-Regular.otf}
  \setmathfont{PennstanderMath-Regular.otf}
}{}

\begin{document}
\begin{frame}
\frametitle{Tagged math in the browser}
\[
  \int_0^1 x^2 \, dx = \frac{1}{3}
\]
\end{frame}
\end{document}
```

The resulting PDF carries structural tags for both text and math, readable by screen readers and other assistive tooling. Authoring accessible documents is now possible directly from the browser instead of requiring a local TeX installation.

### Modern tables with `tabularray`

`tabularray` (first CTAN release in 2021) replaces `tabular`'s positional column specifiers with a key-value syntax. It compiles under all three engines.

```latex
\documentclass{article}
\usepackage{xcolor}
\usepackage{tabularray}

\begin{document}
\begin{tblr}{
  colspec = {Q[c] Q[c] Q[r]},
  row{1} = {bg=gray!20, font=\bfseries},
  hlines
}
Engine & Year & Status \\
pdfTeX & 2026 & Supported \\
LuaTeX & 2026 & Supported \\
XeTeX  & 2026 & Supported \\
\end{tblr}
\end{document}
```

All dependencies (`tabularray`, `xcolor`, `ninecolors`, and their transitive requirements) are resolved at compile time via the on-demand package server.

## Milestone 1c: SyncTeX bidirectional navigation

SyncTeX is implemented across three layers, with one diff per layer:

- Engine layer ([texlyre-busytex-build diff](https://github.com/TeXlyre/texlyre-busytex-build/compare/2e52146^...nlnet_032026_T1-luatex__synctex__tl_on_demand)): SyncTeX generation enabled in the BusyTeX build, producing `.synctex.gz` output alongside the PDF.
- API layer ([texlyre-busytex diff](https://github.com/TeXlyre/texlyre-busytex/compare/37d32e0^...nlnet_032026_T1-tl_on_demand)): a SyncTeX parser and source map service that decode the SyncTeX data into coordinates usable by the editor.
- UI layer ([texlyre diff](https://github.com/TeXlyre/texlyre/compare/c23b811^...nlnet_032026_T1-synctex)): forward navigation (click in source, highlight in PDF) and reverse navigation (click in PDF, cursor jumps to source), integrated with both the PDF.js renderer and the canvas renderer.

![SyncTeX source-to-PDF highlighting](./showcase/synctex_highlight_zoomed.svg)

*SyncTeX forward navigation (only supported with BusyTeX engines): clicking the target button or double clicking in the source editor highlights the corresponding region in the rendered PDF.*

## Acknowledgements

This work was funded by [NLnet Foundation](https://nlnet.nl/project/TeXlyre/) as part of the TeXlyre project.

