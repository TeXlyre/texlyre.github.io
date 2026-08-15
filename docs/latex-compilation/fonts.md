---
sidebar_position: 3
---

# Fonts

TeXlyre can use fonts from the TeX Live distribution without bundling the full font collection in the browser. When a TeX Live font is not available locally, BusyTeX resolves it through prebuilt font metadata and fetches the required font file from the TeX Live server.

## TeX Live Fonts

XeLaTeX and LuaLaTeX can select TeX Live OpenType and TrueType fonts by name with `fontspec`:

```latex engine=xelatex,lualatex pdfheight=450
\documentclass{article}
\usepackage{fontspec}
\setmainfont{Alegreya}

\begin{document}
\section*{A TeX Live font}
This document is typeset with Alegreya. If the font is not already bundled or cached, it is fetched from the TeX Live server on demand.
\end{document}
```

pdfLaTeX uses the traditional TeX font mappings generated from the full TeX Live distribution, with missing font files fetched in the same way when required.

## Project Fonts

Custom fonts can be stored with the project and selected by file path. For example:

```latex
\usepackage{fontspec}
\setmainfont[Path=fonts/]{MyFont-Regular.otf}
```

Project fonts remain part of the project and are not uploaded to the TeX Live server.

Fonts installed only on the host operating system are not visible to the browser-based TeX engines.
