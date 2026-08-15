---
sidebar_position: 3
---

# Fonts

TeXlyre can use fonts from the TeX Live distribution without bundling the full font collection in the browser. When a TeX Live font is not available locally, BusyTeX resolves it through prebuilt font metadata and fetches the required font file from the TeX Live server.

## TeX Live Fonts

XeLaTeX and LuaLaTeX can select TeX Live OpenType and TrueType fonts by name with `fontspec`. Different families can be combined for display text, body copy, interface-like labels, and monospaced details:

```latex engine=lualatex pdfheight=520
\documentclass{article}
\usepackage[a4paper,margin=28mm]{geometry}
\usepackage{fontspec}
\usepackage{xcolor}

\setmainfont{Libertinus Serif}
\setsansfont{Fira Sans}
\setmonofont{Fira Mono}
\newfontfamily\displayfont{Alegreya}

\definecolor{midnight}{HTML}{24344D}
\definecolor{coral}{HTML}{C75B4B}
\definecolor{teal}{HTML}{337C7A}
\definecolor{gold}{HTML}{B48732}

\setlength{\parindent}{0pt}
\begin{document}
{\sffamily\bfseries\small\addfontfeatures{LetterSpace=8}\color{coral}
FIELD NOTES / SERIES 04}\par
\smallskip
{\displayfont\fontsize{30}{31}\selectfont\color{midnight}
Signals after rain}\par
\medskip
{\color{teal}\rule{\linewidth}{1.2pt}}\par
\medskip

The instruments were quiet until the afternoon shower passed. Then the glass roof brightened, the humidity trace rose, and a sequence of small observations began to form a readable pattern.

\medskip
{\sffamily\bfseries\color{gold}DETAIL}\quad
\textsc{Small capitals} can label categories, \textit{italic} can carry a softer note, and \textbf{bold text} can mark a conclusion without changing the main typeface.

\medskip
{\ttfamily\color{coral}station/reading-042.tex}\par
{\sffamily\small\color{midnight}
Serif for reading \quad Sans for navigation \quad Mono for technical details}
\end{document}
```

The fonts in this example come from TeX Live. `xcolor` is independent of the font choice, so type families, weights, styles, and color can be combined like ordinary LaTeX formatting.

OpenType features can also be selected globally or changed for a small part of the document. For example, Alegreya provides old-style figures and small capitals, while lining and tabular figures are useful when numbers need to align:

```latex engine=lualatex pdfheight=500
\documentclass{article}
\usepackage[a4paper,margin=30mm]{geometry}
\usepackage{fontspec}
\usepackage{xcolor}

\setmainfont{Alegreya}[
  Ligatures=TeX,
  Numbers={OldStyle,Proportional}
]
\setsansfont{Alegreya Sans}
\newfontfamily\uifont{Fira Sans}

\definecolor{plum}{HTML}{6D4168}
\definecolor{leaf}{HTML}{4C7755}
\definecolor{orange}{HTML}{C7763C}
\definecolor{slate}{HTML}{34495E}

\setlength{\parindent}{0pt}
\begin{document}
{\uifont\bfseries\small\addfontfeatures{LetterSpace=10}\color{leaf}
TYPE SPECIMEN}\par
\smallskip
{\fontsize{27}{29}\selectfont\bfseries\color{plum}
A cabinet of numbers}\par
\medskip

Old-style figures sit comfortably in prose: the archive contains 128 sketches from 7 sessions recorded during 2026. Small capitals can turn a short label such as \textsc{field record} into quiet structure.

\bigskip
{\sffamily\bfseries\color{orange}LINING + TABULAR}\par
{\addfontfeatures{Numbers={Lining,Tabular}}\Large
08:15\quad 128.40\quad 2026\par
08:45\quad 129.05\quad 2027}

\bigskip
{\color{slate}\itshape
Italic text can soften an annotation, while}\par
{\sffamily\bfseries\color{plum}\addfontfeatures{LetterSpace=5}
a tracked sans-serif label can sharpen the hierarchy.}
\end{document}
```

pdfLaTeX uses the traditional TeX font mappings generated from the full TeX Live distribution, with missing font files fetched in the same way when required.

## Multilingual Typesetting

Unicode engines can combine many languages and scripts in one document. Packages such as `polyglossia` select language conventions and hyphenation patterns, while `fontspec` can associate a suitable font with a particular script.

The example below deliberately uses wide margins to create a narrow text measure. Each paragraph is long enough for language-specific line breaking and hyphenation to become visible:

```latex engine=lualatex pdfheight=1050
\documentclass{article}
\usepackage[
  a4paper,
  left=46mm,
  right=46mm,
  top=24mm,
  bottom=24mm
]{geometry}
\usepackage{fontspec}
\usepackage{xcolor}
\usepackage{polyglossia}

\setdefaultlanguage{english}
\setotherlanguage{german}
\setotherlanguage{french}
\setotherlanguage{spanish}
\setotherlanguage{polish}
\setotherlanguage{finnish}
\setotherlanguage{russian}
\setotherlanguage{greek}
\setotherlanguage{arabic}

\setmainfont{Libertinus Serif}
\setsansfont{Fira Sans}
\newfontfamily\greekfont[Script=Greek]{GFS Didot}
\newfontfamily\russianfont[Script=Cyrillic]{Noto Serif}
\newfontfamily\arabicfont[Script=Arabic]{Amiri}
\newfontfamily\arabicfontsf[Script=Arabic]{Amiri}

\definecolor{ocean}{HTML}{356C88}
\definecolor{berry}{HTML}{8B4A63}
\definecolor{moss}{HTML}{4E7554}
\definecolor{amber}{HTML}{A66A2C}

\newcommand{\langtitle}[2]{%
  \par\medskip
  {\sffamily\bfseries\color{#1}#2}\par\nobreak\smallskip}

\setlength{\parindent}{0pt}
\setlength{\parskip}{0.35em}
\hyphenpenalty=50
\exhyphenpenalty=50

\begin{document}
{\sffamily\bfseries\Large\color{ocean}
One document, many languages}\par

\langtitle{berry}{English}
The workshop notebook follows a small weather station beside the river, where changing temperatures, interchangeable instruments, and carefully documented calibration procedures create enough detail to test ordinary English hyphenation in a deliberately narrow column.

\begin{german}
\langtitle{moss}{Deutsch}
Im Werkstatttagebuch wird eine kleine Messstation am Fluss beschrieben, deren Temperaturbeobachtungen, wiederverwendbare Messinstrumente und ausführliche Kalibrierungsverfahren genügend zusammengesetzte Wörter enthalten, um die deutsche Silbentrennung in einer schmalen Textspalte sichtbar zu machen.
\end{german}

\begin{french}
\langtitle{amber}{Français}
Le carnet décrit un petit observatoire installé près de la rivière, où des instruments interchangeables, des vérifications méthodiques et une documentation soigneusement rédigée offrent suffisamment de mots pour montrer la coupure française dans une colonne volontairement étroite.
\end{french}

\begin{spanish}
\langtitle{ocean}{Español}
El cuaderno describe una estación experimental junto al río, donde las observaciones meteorológicas, los instrumentos intercambiables y los procedimientos de calibración cuidadosamente documentados permiten apreciar la separación silábica del español en una columna estrecha.
\end{spanish}

\begin{polish}
\langtitle{berry}{Polski}
Notatnik opisuje niewielką stację badawczą nad rzeką, w której systematyczne obserwacje temperatury, wymienne przyrządy pomiarowe oraz szczegółowo udokumentowane procedury kalibracyjne pozwalają zobaczyć polskie reguły dzielenia wyrazów w wąskiej kolumnie tekstu.
\end{polish}

\begin{finnish}
\langtitle{moss}{Suomi}
Työpajapäiväkirja kuvaa joen rannalla toimivaa pientä havaintoasemaa, jossa lämpötilamittaukset, vaihdettavat tutkimusvälineet ja huolellisesti dokumentoidut kalibrointimenetelmät muodostavat riittävän pitkiä sanoja suomenkielisen tavutuksen havainnollistamiseen kapeassa palstassa.
\end{finnish}

\begin{russian}
\langtitle{amber}{Русский}
В рабочем журнале описана небольшая наблюдательная станция у реки, где регулярные измерения температуры, взаимозаменяемые приборы и подробно записанные процедуры калибровки создают достаточно длинный текст, чтобы показать переносы слов в узкой колонке.
\end{russian}

\begin{greek}
\langtitle{ocean}{Ελληνικά}
Το ημερολόγιο του εργαστηρίου περιγράφει έναν μικρό σταθμό παρατήρησης δίπλα στο ποτάμι, όπου οι συστηματικές μετρήσεις θερμοκρασίας, τα εναλλάξιμα όργανα και οι προσεκτικά καταγεγραμμένες διαδικασίες βαθμονόμησης δημιουργούν αρκετό κείμενο για να φαίνεται ο ελληνικός συλλαβισμός σε στενή στήλη.
\end{greek}

\begin{Arabic}
\langtitle{berry}{العربية}
يصف دفتر الورشة محطة رصد صغيرة قرب النهر، حيث تجمع القياسات المنتظمة لدرجة الحرارة والأدوات القابلة للتبديل وإجراءات المعايرة الموثقة بعناية نصاً طويلاً بما يكفي لإظهار كيفية توزيع الكلمات والأسطر العربية داخل عمود ضيق.
\end{Arabic}
\end{document}
```

The Latin-script paragraphs use Libertinus Serif, the Greek paragraph uses GFS Didot, Russian uses Noto Serif, and Arabic uses Amiri. Languages with hyphenation patterns use the rules selected for that language; scripts such as Arabic use their own shaping and line-breaking conventions.

## Hyphenation and Line Breaking

Line breaking can be tuned independently of the selected language. For example, `ragged2e` provides a ragged-right style that still permits hyphenation, while penalties can be used when hyphenation should be avoided:

```latex engine=lualatex pdfheight=580
\documentclass{article}
\usepackage[a4paper,margin=25mm]{geometry}
\usepackage{fontspec}
\usepackage{xcolor}
\usepackage{ragged2e}

\setmainfont{Libertinus Serif}
\setsansfont{Fira Sans}
\newfontfamily\displayfont{Alegreya}

\definecolor{blue}{HTML}{356C88}
\definecolor{green}{HTML}{4E7554}
\definecolor{red}{HTML}{A34E4E}

\newcommand{\sampletext}{%
A flexible documentation system benefits from predictable typography, especially when interoperability requirements, configuration details, and unusually long technical terminology must remain readable inside narrow columns.}

\begin{document}
{\displayfont\LARGE\bfseries Three line-breaking styles}\par
\medskip

\begin{minipage}[t]{0.29\linewidth}
{\sffamily\bfseries\color{blue}Justified}\par\smallskip
\sampletext
\end{minipage}
\hfill
\begin{minipage}[t]{0.29\linewidth}
{\sffamily\bfseries\color{green}Ragged + hyphenation}\par\smallskip
\RaggedRight
\sampletext
\end{minipage}
\hfill
\begin{minipage}[t]{0.29\linewidth}
{\sffamily\bfseries\color{red}No hyphenation}\par\smallskip
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
