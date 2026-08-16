---
sidebar_position: 2
---

# Packages

Typst packages are imported by name and version from the Typst package registry. TeXlyre resolves them at compile time through a fetching package registry and caches each downloaded package for later compilations.

## Importing

An import names the namespace, the package, and an exact version:

```typst
#import "@preview/cetz:0.5.2"
```

Only the `@preview` namespace is published centrally. The version is mandatory and resolves exactly, so a document pins the package version it was written against and keeps compiling the same way later.

A trailing list of names pulls specific symbols into scope:

```typst
#import "@preview/cetz:0.5.2": canvas, draw
```

## Resolution and Caching

The first compilation that needs a package downloads it. Subsequent compilations reuse the cached copy, so a project stays compilable offline once every package it imports has been fetched at least once.

A missing network connection on first use produces a compilation error naming the package and version. Import a package once while online before working offline.

Because resolution happens per version string, changing the version in an import triggers a fresh download.

## Package Import

CeTZ is a drawing library with an API drawn from TikZ and Processing. The example below imports it and draws a feedforward network, with the layer sizes held in an array so the diagram follows from the data. Compiling this block for the first time downloads the package; every compilation after that uses the cached copy.

```typst compile pdfheight=480
#import "@preview/cetz:0.5.2"

#set page(paper: "a4", margin: 24mm)
#set text(font: "Libertinus Serif", size: 11pt)

= A Gaze Prediction Network

#cetz.canvas({
  import cetz.draw: *

  let layers = (4, 5, 3, 2)
  let names = ("features", "hidden", "hidden", "gaze")
  let spacing = 2.0
  let node(l, i, n) = (l * spacing, (n - 1) / 2 - i)

  for l in range(layers.len() - 1) {
    for i in range(layers.at(l)) {
      for j in range(layers.at(l + 1)) {
        line(
          node(l, i, layers.at(l)),
          node(l + 1, j, layers.at(l + 1)),
          stroke: 0.35pt + gray,
        )
      }
    }
  }

  for l in range(layers.len()) {
    for i in range(layers.at(l)) {
      circle(
        node(l, i, layers.at(l)),
        radius: 0.26,
        fill: white,
        stroke: 0.8pt,
      )
    }
    content((l * spacing, 2.6), text(size: 9pt)[#names.at(l)])
  }

  content((3 * spacing, -1.9), text(size: 9pt)[$x$, $y$])
})

The network maps four gaze features onto a predicted screen coordinate. Layer
sizes are read from the `layers` array, so changing one number redraws the
diagram with the edges recomputed.
```

The canvas has no width or height parameters; it grows to fit the graphic it contains, and one coordinate unit is one centimetre by default. Draw functions are imported inside the canvas body, which keeps names such as `line` and `circle` scoped to the drawing.

Because the drawing is ordinary Typst code, the same loops and arrays used elsewhere in a document work here. A figure that follows from a data structure stays correct when the data changes.

CeTZ has companion packages that build on it, including `cetz-plot` for charts and `cetz-venn` for set diagrams. Each carries its own version and downloads separately.

## Local Modules

A multi-file project can split content across files with no involvement from the registry. Paths are relative to the importing file:

```typst
#import "styles/theme.typ": accent, heading-style
#include "chapters/introduction.typ"
```

`#import` brings definitions into scope. `#include` inserts the content of another file at that point. Both work with any file in the project, and the compiler tracks them so editing an included file recompiles the document that includes it.

## Bibliographies

The built-in `#bibliography` function reads Hayagriva YAML or BibTeX `.bib` files stored in the project:

```typst
#bibliography("references.bib", style: "ieee")
```

Citation styles are selected by name and cover the common CSL styles.
