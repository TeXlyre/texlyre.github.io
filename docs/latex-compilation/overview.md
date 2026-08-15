---
sidebar_position: 1
---

# LaTeX Compilation

TeXlyre uses [TeXlyre-BusyTeX](https://github.com/TeXlyre/texlyre-busytex) to run TeX Live 2026 directly in the browser. Documents are compiled locally; TeX Live files that are not bundled can be fetched from the configured package server when needed.

## Supported Features

| Feature | Support |
|---|---|
| pdfLaTeX | ✅ |
| XeLaTeX | ✅ |
| LuaLaTeX | ✅ |
| TeX Live 2026 packages | ✅ On demand |
| BibTeX / bibtex8 | ✅ |
| Biber / BibLaTeX | ✅ |
| MakeIndex | ✅ |
| SyncTeX | ✅ |
| Multilingual hyphenation | ✅ |
| Multi-file projects | ✅ |
| TeX Live fonts | ✅ On demand |
| Project fonts | ✅ |
| Host system fonts | ❌ |
| Arbitrary native shell commands | ❌ |

## TeX Live Files on Demand

The recommended TeX Live collection is preloaded by default. Missing packages, configuration files, and fonts are requested individually from the TeX Live server and cached locally for later compilations.

A network connection is therefore required the first time an uncached remote file is needed. Files already bundled or cached remain available without another download.

For bibliography workflows, see [Bibliographies](./bibliographies). For font loading and custom fonts, see [Fonts](./fonts).

## Browser Sandbox

Compilation runs inside WebAssembly and cannot execute arbitrary programs installed on your computer. Packages that depend on unsupported native tools may therefore not work as they would in a local TeX installation.

TeXlyre-BusyTeX also provides controlled browser-side shell handlers for integrations that explicitly implement them. These emulate registered commands in JavaScript and do not provide native shell access.
