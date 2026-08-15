---
sidebar_position: 3
---

# Fonts

TeXlyre can use fonts from the TeX Live distribution without bundling the full font collection in the browser. When a TeX Live font is not available locally, BusyTeX resolves it through prebuilt font metadata and fetches the required font file from the TeX Live server.

## TeX Live Fonts

XeLaTeX and LuaLaTeX can select TeX Live OpenType and TrueType fonts by name with `fontspec`. A document can combine serif, sans-serif, and monospaced faces from the same family:

```latex engine=xelatex,lualatex pdfheight=500
\documentclass{article}
\usepackage{fontspec}

\setmainfont{Libertinus Serif}
\setsansfont{Libertinus Sans}
\setmonofont{Libertinus Mono}

\begin{document}
{\sffamily\LARGE\bfseries A small typographic system}\par
\bigskip

The main text uses Libertinus Serif. It works well for longer passages where a quiet, readable texture is useful.

\medskip
{\sffamily\bfseries Sans-serif headings} can provide contrast without changing the overall character of the document.

\medskip
A monospaced face can mark files such as \texttt{notes.tex} and short commands such as \texttt{lualatex}.
\end{document}
```

OpenType features can be selected directly. For example, Alegreya includes small capitals and several number styles:

```latex engine=xelatex,lualatex pdfheight=450
\documentclass{article}
\usepackage{fontspec}

\setmainfont{Alegreya}[
  Ligatures=TeX,
  Numbers=OldStyle
]
\setsansfont{Alegreya Sans}

\begin{document}
{\sffamily\Large\bfseries Field Notes}\par
\smallskip
{\small 15 August 2026 \textbullet\ Observatory Room 4}\par
\bigskip

The afternoon record contains 128 measurements gathered across 7 short sessions. Old-style figures blend into running text, while \textsc{small capitals} can add quiet emphasis.

\medskip
\textit{A restrained italic is useful for annotations that should remain part of the reading flow.}
\end{document}
```

pdfLaTeX uses the traditional TeX font mappings generated from the full TeX Live distribution, with missing font files fetched in the same way when required.

## Multilingual Typesetting

Unicode engines can combine different scripts in one document. Packages such as `polyglossia` select language conventions and can associate a suitable font with a particular script:

```latex engine=xelatex,lualatex pdfheight=600
\documentclass{article}
\usepackage{fontspec}
\usepackage{polyglossia}

\setdefaultlanguage{english}
\setotherlanguage{german}
\setotherlanguage{arabic}

\setmainfont{Libertinus Serif}
\newfontfamily\arabicfont[Script=Arabic]{Amiri}

\begin{document}
\section*{One page, several languages}

The garden path becomes quieter after sunset, and the lamps make small circles of light between the trees.

\begin{german}
Am frühen Morgen öffnet sich der Lesesaal zum Innenhof, während leise Gespräche zwischen den hohen Fenstern beginnen.
\end{german}

\begin{Arabic}
في المساء يهدأ المكان، وتصبح الممرات مساحة للقراءة والتأمل تحت ضوء هادئ.
\end{Arabic}
\end{document}
```

The Arabic paragraph uses Amiri from TeX Live, while the Latin-script paragraphs use Libertinus Serif. Language packages also select conventions such as captions, punctuation, and hyphenation rules for the active language.

## Hyphenation and Line Breaking

Hyphenation patterns depend on the active language. The same document can therefore switch between English and German patterns automatically:

```latex engine=xelatex,lualatex pdfheight=520
\documentclass{article}
\usepackage{fontspec}
\usepackage[english,ngerman]{babel}
\setmainfont{Libertinus Serif}

\begin{document}
\section*{Language-aware hyphenation}

\begin{minipage}[t]{0.43\linewidth}
\selectlanguage{english}
\textbf{English}\par\smallskip
A documentation environment can remain comfortable to read even when interoperability, configuration, and reproducibility appear close to a narrow margin.
\end{minipage}
\hfill
\begin{minipage}[t]{0.43\linewidth}
\selectlanguage{ngerman}
\textbf{Deutsch}\par\smallskip
Eine Dokumentationsumgebung bleibt gut lesbar, auch wenn Datenverarbeitungssysteme und Konfigurationsmöglichkeiten an schmalen Rändern stehen.
\end{minipage}
\end{document}
```

Line breaking can also be tuned independently of the language. For example, `ragged2e` provides a ragged-right style that still permits hyphenation, while penalties can be used when hyphenation should be avoided:

```latex engine=xelatex,lualatex pdfheight=540
\documentclass{article}
\usepackage{fontspec}
\usepackage{ragged2e}
\setmainfont{Libertinus Serif}

\newcommand{\sampletext}{%
A flexible documentation system benefits from predictable typography, especially when unusually long technical terms appear inside narrow columns.}

\begin{document}
\section*{Three line-breaking styles}

\begin{minipage}[t]{0.29\linewidth}
\textbf{Justified}\par\smallskip
\sampletext
\end{minipage}
\hfill
\begin{minipage}[t]{0.29\linewidth}
\textbf{Ragged right}\par\smallskip
\RaggedRight
\sampletext
\end{minipage}
\hfill
\begin{minipage}[t]{0.29\linewidth}
\textbf{No hyphenation}\par\smallskip
\RaggedRight
\hyphenpenalty=10000
\exhyphenpenalty=10000
\sampletext
\end{minipage}
\end{document}
```

These controls are ordinary TeX and LaTeX features; TeXlyre supplies the engine, packages, fonts, and language data needed to use them in the browser.

## Project Fonts

Custom fonts can be stored with the project and selected by file path. For example:

```latex
\usepackage{fontspec}
\setmainfont[Path=fonts/]{MyFont-Regular.otf}
```

Project fonts remain part of the project and are not uploaded to the TeX Live server.

Fonts installed only on the host operating system are not visible to the browser-based TeX engines.
