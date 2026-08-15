---
sidebar_position: 2
---

# Bibliographies

TeXlyre supports both traditional BibTeX workflows and BibLaTeX with Biber. Bibliography processing runs in the browser as part of the compilation pipeline.

## BibTeX

BibTeX is suitable for documents using packages such as `natbib`:

```latex
\usepackage{natbib}
\bibliographystyle{plain}
\bibliography{references}
```

Store the entries in a project file such as `references.bib`.

## BibLaTeX and Biber

Use `backend=biber` with `biblatex` as in a regular TeX Live installation. Biber is a separate WebAssembly module and is loaded on demand when the compilation produces a `.bcf` file.

The example below creates its bibliography file inside the document so it can be compiled directly on this page:

```latex engine=lualatex pdfheight=500
\begin{filecontents*}{references.bib}
@book{knuth1984,
  author    = {Donald E. Knuth},
  title     = {The TeXbook},
  year      = {1984},
  publisher = {Addison-Wesley}
}
\end{filecontents*}

\documentclass{article}
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{references.bib}

\begin{document}
TeX was created by \textcite{knuth1984}.

\printbibliography
\end{document}
```

In a normal project, keep the `.bib` file separately and reference it with `\addbibresource{references.bib}`.
