---
sidebar_position: 1
---

# Typst Compilation

TeXlyre compiles Typst documents in the browser using a fork of [typst.ts](https://github.com/Myriad-Dreamin/typst.ts). The compiler runs as WebAssembly inside a worker; nothing is sent to a build server. Packages from the Typst package registry are fetched individually when a document imports them.

## Supported Features

| Feature | Support |
|---|---|
| Typst compiler (WebAssembly) | ✅ |
| PDF output | ✅ |
| SVG and canvas preview | ✅ |
| `@preview` packages | ✅ On demand |
| PDF versions 1.4 to 2.0 | ✅ |
| PDF/A archival standards | ✅ |
| PDF/UA accessibility standard | ✅ |
| Tagged PDF output | ✅ |
| Bibliographies (Hayagriva and BibTeX) | ✅ |
| Multi-file projects | ✅ |
| Bundled fonts | ✅ |
| Source maps for SVG output | ✅ |
| Project fonts | ❌ |
| Host system fonts | ❌ |
| Native shell commands | ❌ |

## A First Document

Typst uses set rules to configure document-wide behaviour and markup for content. A short document needs no preamble:

```typst compile pdfheight=500
#set document(title: "Station Notes", author: "A. Researcher")
#set page(paper: "a4", margin: 24mm, numbering: "1")
#set text(font: "Libertinus Serif", size: 11pt)
#set heading(numbering: "1.1")

#align(center)[
  #text(size: 20pt, weight: "bold")[Station Notes]

  A. Researcher
]

= Introduction

Set rules apply from the point they appear until the end of the enclosing
block, so placing them at the top of the file configures the whole document.

= Observations

Content can be marked up inline: *bold*, _italic_, and `raw text` need no
commands. Lists are written directly:

- Temperature rose through the afternoon
- Humidity fell after the shower passed
- The instrument log recorded no gaps

= Results

Mathematics has its own syntax, entered with dollar signs:

$ integral_0^1 x^2 dif x = 1/3 $

Numbered headings, page numbers, and cross-reference labels all come from the
set rules above.
```

## Compilation Model

Typst recompiles the whole document on each run. There is no multi-pass loop, no auxiliary files, and no separate bibliography program, so references, the outline, and citations all resolve in a single compilation. This is why Typst projects compile faster than comparable LaTeX projects, and why there is no engine selector: Typst has one compiler.

Compilation is incremental across runs within a session. The compiler keeps its parsed state, so editing one file in a multi-file project leaves the rest parsed.

## Fonts

The fonts available to Typst are the ones bundled with TeXlyre. They cover Latin, Greek, Cyrillic, Arabic, Hebrew, Thai, Devanagari, and CJK scripts, along with several math fonts including New Computer Modern Math, Libertinus Math, STIX Two Math, and Fira Math.

Font files stored in a project are not registered with the compiler, and fonts installed on the host operating system are not visible to the browser. Selecting a font outside the bundled set produces a warning and falls back to the default family.

## Browser Sandbox

Typst has no equivalent of `\write18`, so the sandbox imposes the same restrictions a local Typst installation would. The one practical difference is network access: remote images and other remote content are fetched by the browser and can be disabled in Settings, and package downloads require a connection the first time a package version is used.

For importing packages, see [Packages](./packages). For choosing between PDF, canvas, and SVG output, see [Output Formats](./output-formats). For tagged and standards-conformant PDFs, see [Accessibility](./accessibility).
