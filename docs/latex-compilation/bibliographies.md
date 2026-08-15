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

Use `backend=biber` with `biblatex` as in a regular TeX Live installation. In addition to the usual citation and bibliography styles, Biber supports Unicode-aware data processing, configurable sorting, data transformations, and more advanced bibliography layouts.

### Basic usage

Create a bibliography file named `references.bib`:

```bibtex title="references.bib"
@book{knuth1984,
  author    = {Donald E. Knuth},
  title     = {The TeXbook},
  year      = {1984},
  publisher = {Addison-Wesley}
}
```

Then reference it from the LaTeX document:

```latex engine=lualatex pdfheight=500
\documentclass{article}
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{references.bib}

\begin{document}
TeX was created by \textcite{knuth1984}.

\printbibliography
\end{document}
```

In a normal project, keep the `.bib` file separately and reference it with `\addbibresource{references.bib}`.

### Unicode names and sorting

Biber can process UTF-8 bibliography data directly and sort names using Unicode-aware collation. This is useful for bibliographies containing names and titles with characters outside plain ASCII.

```bibtex title="unicode-references.bib"
@book{chatelet1759,
  author   = {du Châtelet, Émilie},
  title    = {Principes mathématiques de la philosophie naturelle},
  date     = {1759},
  location = {Paris}
}

@book{kierkegaard1843,
  author   = {Kierkegaard, Søren},
  title    = {Frygt og Bæven},
  date     = {1843},
  location = {Copenhagen}
}

@book{mahfouz1959,
  author   = {نجيب محفوظ},
  title    = {أولاد حارتنا},
  date     = {1959},
  location = {القاهرة},
  langid   = {arabic}
}
```

Arabic text can stay in the bibliography file as Unicode. The `sorting=nyt` option sorts the multilingual bibliography by name, year, and title. LuaLaTeX only needs an Arabic-capable font and language setup to render it correctly:

```latex engine=lualatex pdfheight=500
\documentclass{article}
\usepackage{fontspec}
\usepackage{polyglossia}
\setdefaultlanguage{english}
\setotherlanguage{arabic}
\newfontfamily\arabicfont[Script=Arabic]{Amiri}
\usepackage[backend=biber,style=authoryear,sorting=nyt,autolang=other]{biblatex}
\addbibresource{unicode-references.bib}

\begin{document}
\nocite{*}
\printbibliography
\end{document}
```


### Reusing fields with `xdata`

Biber can store shared fields in `@xdata` entries and inherit them in several bibliography entries. This is useful when a group of references shares the same language, institution, publisher, or location.

```bibtex title="xdata-references.bib"
@xdata{english,
  langid = {english}
}

@xdata{uni-hamburg,
  institution = {Universität Hamburg},
  location    = {Hamburg}
}

@report{sample2023,
  title  = {Sample Research Report},
  author = {Author, John and Writer, Jane},
  type   = {Research report},
  date   = {2023-05},
  xdata  = {english,uni-hamburg}
}

@thesis{example2022,
  title  = {Example Thesis on Documentation},
  author = {Editor, Alice},
  type   = {Master's thesis},
  date   = {2022},
  xdata  = {english,uni-hamburg}
}
```

The `@xdata` entries are not printed themselves. Their fields are inherited by the entries that reference them:

```latex engine=lualatex pdfheight=500
\documentclass{article}
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{xdata-references.bib}

\begin{document}
\nocite{sample2023,example2022}
\printbibliography
\end{document}
```

### Transforming bibliography data

Biber source maps can adjust bibliography data while it is processed, without changing the original `.bib` file. For example, a long journal title can be abbreviated before it reaches the bibliography style:

```bibtex title="sourcemap-references.bib"
@article{example2026,
  author       = {Ada Example and Benoît Sample},
  title        = {A Demonstration of Bibliography Data Mapping},
  journaltitle = {Journal of Very Long Example Names},
  date         = {2026},
  volume       = {12},
  number       = {3},
  pages        = {1--10}
}
```

```latex engine=lualatex pdfheight=500
\documentclass{article}
\usepackage[backend=biber,style=numeric]{biblatex}

\DeclareSourcemap{
  \maps[datatype=bibtex]{
    \map{
      \step[
        fieldsource=journaltitle,
        match=\regexp{Journal of Very Long Example Names},
        replace={J. Long Example Names}
      ]
    }
  }
}

\addbibresource{sourcemap-references.bib}

\begin{document}
\nocite{example2026}
\printbibliography
\end{document}
```

Source maps can also rename fields, remove unwanted data, or apply transformations selectively to particular entry types.

### Multiple bibliography views

The same bibliography data can be printed more than once with different sorting rules. This can be useful for publication lists, reading lists, or documents that need several views of the same references.

```bibtex title="views-references.bib"
@book{knuth1984views,
  author    = {Donald E. Knuth},
  title     = {The TeXbook},
  date      = {1984},
  publisher = {Addison-Wesley}
}

@book{lamport1994,
  author    = {Leslie Lamport},
  title     = {LaTeX: A Document Preparation System},
  date      = {1994},
  publisher = {Addison-Wesley}
}

@book{mittelbach2004,
  author    = {Frank Mittelbach and Michel Goossens},
  title     = {The LaTeX Companion},
  date      = {2004},
  publisher = {Addison-Wesley}
}
```

Here the first bibliography is sorted by author, while the second shows the newest entries first:

```latex engine=lualatex pdfheight=650
\documentclass{article}
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{views-references.bib}

\begin{document}
\nocite{*}

\begin{refcontext}[sorting=nyt]
\printbibliography[title={By author}]
\end{refcontext}

\begin{refcontext}[sorting=ydnt]
\printbibliography[title={Newest first}]
\end{refcontext}
\end{document}
```
