---
sidebar_position: 4
---

# Accessibility

LaTeX gained a tagging pipeline in recent releases, driven by the `\DocumentMetadata` interface. TeX Live 2026 includes it, so TeXlyre can produce structurally tagged PDFs in the browser without a local TeX installation.

The pipeline supports pdfLaTeX and LuaLaTeX. LuaLaTeX is the engine recommended for new documents and is the only one that tags mathematics without manual work. XeLaTeX falls outside the supported route; see [Engine Support](#engine-support) below.

## Enabling Tagging

`\DocumentMetadata` must come before `\documentclass`. It is the only declaration that does:

```latex
\DocumentMetadata{
  lang        = en,
  pdfstandard = ua-2,
  tagging     = on
}
\documentclass{article}
```

With tagging enabled, the document structure LaTeX already tracks is written into the PDF: sectioning levels, paragraphs, lists, tables, and float captions. Assistive software can then move through the document by heading and announce table cells together with their headers.

`\DocumentMetadata` also carries the document language and the standards the document should conform to. The `pdfstandard` key can be given more than once, so an accessibility standard and an archival standard can apply together:

```latex
\DocumentMetadata{
  lang        = en,
  pdfstandard = ua-2,
  pdfstandard = a-4f,
  tagging     = on
}
\documentclass{article}
```

The PDF version defaults to 2.0 once `\DocumentMetadata` is used; the `pdfversion` key overrides it.

Setting `lang` is the smallest change with the largest effect: it tells assistive software which pronunciation rules to apply to the whole document.

## A Tagged Article

Structure has to be expressed through sectioning commands and environments. Text that is merely formatted to look like a heading produces no heading tag.

Tables need one addition. Every cell is treated as a data cell by default, so header rows have to be declared with `\tagpdfsetup{table/header-rows={...}}`, either in the preamble or immediately before the table:

```latex engine=lualatex pdfheight=620
\DocumentMetadata{
  lang        = en,
  pdfstandard = ua-2,
  pdfstandard = a-4f,
  tagging     = on
}
\documentclass[10pt,twocolumn,a4paper]{article}
\usepackage[a4paper,margin=18mm,columnsep=6mm]{geometry}
\usepackage{fontspec}
\usepackage{booktabs}
\usepackage{lipsum}

\setmainfont{TeX Gyre Termes}
\setsansfont{TeX Gyre Heros}

\renewcommand{\thesection}{\Roman{section}}
\renewcommand{\thesubsection}{\thesection.\Alph{subsection}}

\newcommand{\authorblock}[3]{%
  \parbox[t]{0.31\textwidth}{%
    \centering
    \normalsize #1\\[2pt]
    \small\itshape #2\\
    \small\ttfamily #3
  }%
}

\title{\bfseries Sequential Scanpath Prediction}

\author{
  \authorblock{Fares Abawi}{Department of Informatics\\University of Hamburg\\Hamburg, Germany}{abawi@uni-hamburg.de}%
  \hspace{0.02\textwidth}%
  \authorblock{John Smith}{Institut für Kognitive Systeme\\Universität Musterstadt\\Musterstadt, Germany}{smith@musterstadt.edu}%
  \hspace{0.02\textwidth}%
  \authorblock{Max Mustermann}{Institut für Kognitive Systeme\\Universität Musterstadt\\Musterstadt, Germany}{mustermann@musterstadt.edu}%
}
\date{}

\begin{document}
\maketitle

\begin{abstract}
\noindent
The model predicts sequential gaze behaviour in dynamic social scenes by
combining audiovisual saliency, social cues, and the observer's previous
fixations. Modality representations are integrated recurrently, producing a
priority map for each timestep from which the next fixation is sampled.
\end{abstract}

\section{Multimodal Input}

Sectioning commands become real heading elements in the tagged output, so a
screen reader can move between sections and report the nesting level. The
numbering style below is cosmetic; the underlying structure stays stock, which
keeps the generated tags reliable. Gated integration of social cues was
introduced in earlier work on saliency prediction \cite{abawi2021gasp}.
\lipsum[1][1-6]

\subsection{Fixation History}

Previous fixation points are blurred with a Gaussian filter and supplied as an
additional sequence of priority maps. The fixation history distinguishes the
gaze trajectories of different observers viewing the same scene, so two
observers with different histories receive different predictions
\cite{smith2024observer}. \lipsum[2][1-7]

\section{Representations}

Each input contributes a representation with the spatial layout of the scene
preserved, so the encoders can be applied without resampling
\cite{mustermann2023priority}. \lipsum[3][1-5]

\tagpdfsetup{table/header-rows={1}}

\begin{table}[!t]
\centering
\caption{Inputs to the dynamic scanpath prediction model.}
\label{tab:inputs}
\small
\begin{tabular}{lll}
\toprule
Input & Source & Representation \\
\midrule
SP      & DAVE               & Fixation density map \\
GE      & Gaze360            & Gaze-direction features \\
FER     & Facial expression  & Affective features \\
History & Previous fixations & Priority maps \\
\bottomrule
\end{tabular}
\end{table}

Declaring the header row lets a cell be announced together with the column it
belongs to, as shown in Table~\ref{tab:inputs}. Every cell is treated as a data
cell until the header rows are named. \lipsum[4][1-6]

\section{Integration}

The representations pass through modality encoders, directed attention,
sequential attention, and gated multimodal integration. Each stage keeps the
spatial layout of the priority map intact, so the output can be compared
directly against recorded fixation densities.

\begin{enumerate}
  \item Encode audiovisual and social-cue representations
  \item Apply directed attention to the modality features
  \item Integrate fixation history with the current scene
  \item Perform recurrent multimodal integration
  \item Predict the next fixation priority map
\end{enumerate}

Gate weights vary per timestep, so the model can rely on social cues in one
frame and on audiovisual saliency in the next. Embodied evaluation of the
predicted maps can be carried out in simulation, avoiding large-scale
participant recruitment \cite{abawi2025hrifree}. \lipsum[5][1-7]

\section{Evaluation}

Predicted scanpaths are compared against recorded fixation sequences using
sequence-level similarity measures \cite{smith2022scanmetrics}. \lipsum[6][1-6]

\small
\begin{thebibliography}{9}

\bibitem{abawi2021gasp}
F.~Abawi, T.~Weber, and S.~Wermter,
``GASP: Gated attention for saliency prediction,''
in \emph{Proc. Int. Joint Conf. Artificial Intelligence (IJCAI)}, 2021.

\bibitem{abawi2025hrifree}
F.~Abawi and D.~Fu,
``HRI-Free: Cognitive robotic simulation for evaluating embodied social
attention models,''
in \emph{Proc. IEEE Int. Conf. Robotics and Automation (ICRA)}, 2025,
pp.~11249--11255.

\bibitem{smith2024observer}
J.~Smith and M.~Mustermann,
``Observer-conditioned priority maps for dynamic scene viewing,''
\emph{J. Musterstadt Cognitive Systems}, vol.~12, no.~3, pp.~211--228, 2024.

\bibitem{smith2022scanmetrics}
J.~Smith,
``A comparison of sequence similarity measures for scanpath evaluation,''
\emph{J. Musterstadt Cognitive Systems}, vol.~10, no.~1, pp.~44--61, 2022.

\bibitem{mustermann2023priority}
M.~Mustermann and J.~Smith,
``Spatial consistency in recurrent priority map estimation,''
in \emph{Proc. Musterstadt Symp. Cognitive Modelling}, 2023, pp.~89--97.

\end{thebibliography}

\end{document}
```

## Tagged Mathematics

Mathematics is tagged by embedding a MathML representation of each formula. There are two mechanisms: an associated file holding the MathML as an embedded stream, and MathML namespace structure element tagging, a PDF 2.0 feature that extends the document tags with elements corresponding to MathML.

LuaLaTeX loads the `luamml` package automatically and converts TeX to MathML itself, so it can produce either form with no author intervention. Other engines can use only the associated file mechanism, and the MathML has to be supplied: LaTeX writes a dummy file with an entry per formula when `math/mathml/write-dummy` is set, the entries are filled in by hand, and the file is renamed to `<file>-mathml.html` for the next run.

In practice this means LuaLaTeX for any document with mathematics. The `ltx-talk` presentation class builds on `\DocumentMetadata` and the tagging pipeline to produce structurally tagged output including mathematical content:

```latex engine=lualatex pdfheight=650
\DocumentMetadata{
  lang        = en,
  pdfstandard = ua-2,
  pdfstandard = a-4f,
  tagging     = on
}
\documentclass{ltx-talk}
\usepackage{amsmath}

\begin{document}
\begin{frame}
\frametitle{Attentive convolutional LSTM}

\begin{align}
\mathbf{i}^{\langle t\rangle}
  &= \sigma\left(
    \mathbf{W}_i * \mathbf{s}^{\langle t\rangle}
    + \mathbf{U}_i * \mathbf{h}^{\langle t-1\rangle}
    + \mathbf{b}_i
  \right), \\
\mathbf{f}^{\langle t\rangle}
  &= \sigma\left(
    \mathbf{W}_f * \mathbf{s}^{\langle t\rangle}
    + \mathbf{U}_f * \mathbf{h}^{\langle t-1\rangle}
    + \mathbf{b}_f
  \right), \\
\mathbf{o}^{\langle t\rangle}
  &= \sigma\left(
    \mathbf{W}_o * \mathbf{s}^{\langle t\rangle}
    + \mathbf{U}_o * \mathbf{h}^{\langle t-1\rangle}
    + \mathbf{b}_o
  \right), \\
\mathbf{g}^{\langle t\rangle}
  &= \tanh\left(
    \mathbf{W}_c * \mathbf{s}^{\langle t\rangle}
    + \mathbf{U}_c * \mathbf{h}^{\langle t-1\rangle}
    + \mathbf{b}_c
  \right), \\
\mathbf{c}^{\langle t\rangle}
  &= \mathbf{f}^{\langle t\rangle}
     \odot \mathbf{c}^{\langle t-1\rangle}
     + \mathbf{i}^{\langle t\rangle}
     \odot \mathbf{g}^{\langle t\rangle}, \\
\mathbf{h}^{\langle t\rangle}
  &= \mathbf{o}^{\langle t\rangle}
     \odot \tanh\left(\mathbf{c}^{\langle t\rangle}\right).
\end{align}

\end{frame}
\end{document}
```


Structure element tagging is selected through `tagging-setup`, which accepts the same keys as `\tagpdfsetup`:

```latex
\DocumentMetadata{
  lang          = en,
  tagging       = on,
  tagging-setup = {math/setup=mathml-SE},
  pdfstandard   = ua-2,
  pdfstandard   = a-4f
}
```

How well an expression is announced still varies between assistive tools, so where an equation carries meaning its symbols alone do not convey, state that meaning in the surrounding text as well.

## Presentations with ltx-talk

The class used in the example above is written for this purpose. `ltx-talk` takes its ideas from beamer, with tagging and accessible structure as design aims from the start, and it targets on-screen presentations along with handouts and speaker notes.

Content lives in a `frame` environment, and each frame can produce several slides. Overlay specifications in angle brackets control which material appears on which slide; text carrying no specification appears on every slide of the frame. A `+` in a specification stands for one more than the current value of the `pauses` counter, which resets at the start of each frame, so a list can be revealed one item at a time without numbering each step by hand:

```latex engine=lualatex pdfheight=540
\DocumentMetadata{
  lang        = en,
  pdfstandard = ua-2,
  pdfstandard = a-4f,
  tagging     = on
}
\documentclass{ltx-talk}
\usepackage{amsmath}

\title{Gaze Prediction in Dynamic Social Scenes}
\author{Fares Abawi}
\date{}

\begin{document}

\maketitle

\begin{frame}
\frametitle{Modality representations}

\begin{itemize}
  \item<+-> Audiovisual saliency from the video and audio streams
  \item<+-> Gaze direction estimated for each visible face
  \item<+-> Facial expression as an affective representation
  \item<+-> Fixation history from the observer's previous gaze points
\end{itemize}

\end{frame}

\begin{frame}
\frametitle{Gated integration}

Each modality contributes through a learned gate:

\[
  \mathbf{h}_t = \sum_{m=1}^{M}
    \mathbf{z}^{(m)}_t \odot \mathbf{h}^{(m)}_t
\]

The gate weights vary per timestep, so the model can rely on social cues in
one frame and on audiovisual saliency in the next.

\end{frame}

\end{document}
```

`\maketitle` produces a title frame carrying the title, subtitle, authors, affiliation, and date. `\item` is overlay-aware, and `\pause` works inside a frame for simpler cases.

Tagging is generated automatically wherever the class can determine the structure, and it works best with predictable frame layouts such as the stepwise list above. Validators require the targeted standards to be stated explicitly, so a presentation intended for validation adds `pdfstandard` keys alongside `tagging = on`.

Handout mode flattens the overlays into single pages per frame, which suits printing and annotation.

Three constraints are worth knowing before starting a deck:

- The class is experimental. Interfaces may change, only a subset of beamer functionality exists, and some commands are present as stubs that accept beamer syntax while doing nothing.
- It requires LaTeX 2025-11-01 or newer, which TeX Live 2026 satisfies.
- Frame contents may not contain `\verb` or verbatim environments. Code listings need a different approach, and `listings` remains incompatible with tagging in any case.

Porting an existing beamer deck involves editing the source. Presentations tend to be revised for each use, so the editing cost is usually acceptable where accessible output matters.

## Alternative Text for Figures

Every graphic in a tagged document must be marked either as an artifact or given alternative text describing its meaning in context. Both are keys on `\includegraphics`:

```latex
\includegraphics[
  width=\linewidth,
  alt={Architecture for dynamic scanpath prediction with audiovisual saliency,
       gaze direction, facial expression, and fixation-history inputs connected
       to modality encoders, directed attention, recurrent integration, and a
       predicted priority map}
]{scanpath-model.png}

\includegraphics[
  width=\linewidth,
  alt={iCub humanoid robot head facing a display while a GASP saliency map
       directs the robot's gaze toward a predicted target}
]{icub-social-attention.png}

\includegraphics[
  width=\linewidth,
  artifact
]{decorative-network.png}
```

The same keys work with `\tikz`, the `tikzpicture` environment, and the `picture` environment.

The caption and the alternative text do different jobs. The caption names the figure for every reader; the alternative text describes what the image shows for readers who cannot see it. Copying the caption into the alternative text adds nothing.

`artifact` is the correct marking for purely decorative images. An `actualtext` key is also available for images that stand in for characters.

## PDF 2.0

`\DocumentMetadata` sets the PDF version to 2.0 by default, so a document that uses the tagging interface already targets the current version of the format. The `pdfversion` key overrides this where an older version is required.

PDF 2.0 is the basis for the PDF/UA-2 accessibility standard and the PDF/A-4 archival family, and both can be declared together:

```latex engine=lualatex pdfheight=660
\DocumentMetadata{
  lang        = en,
  pdfversion  = 2.0,
  pdfstandard = ua-2,
  pdfstandard = a-4f,
  tagging     = on
}
\documentclass{article}
\usepackage[a4paper,margin=25mm]{geometry}
\usepackage{fontspec}
\usepackage{amsmath}

\setmainfont{Libertinus Serif}

\title{Gated Attention for Saliency Prediction Model}
\author{Fares Abawi}
\date{}

\begin{document}
\maketitle

\section{Recurrent Multimodal Integration}

For modality \(m\) at timestep \(t\),

\begin{align}
\mathbf{h}^{(m)}_t
  &=
  \tanh\left(
    \mathbf{W}^{(m)}_x * \mathbf{x}^{(m)}_t
    +
    \mathbf{U}^{(m)}_h * \mathbf{h}^{(m)}_{t-1}
    +
    \mathbf{b}^{(m)}_h
  \right), \\
\mathbf{z}^{(m)}_t
  &=
  \sigma\left(
    \mathbf{W}^{(m)}_z *
    [\mathbf{x}^{(1)}_t,\ldots,\mathbf{x}^{(M)}_t]
    +
    \mathbf{U}^{(m)}_z * \mathbf{z}^{(m)}_{t-1}
    +
    \mathbf{b}^{(m)}_z
  \right), \\
\mathbf{h}_t
  &=
  \sum_{m=1}^{M}
  \mathbf{z}^{(m)}_t
  \odot
  \mathbf{h}^{(m)}_t .
\end{align}

\section{Social Attention}

The recurrent model integrates representations derived from audiovisual
saliency, gaze direction, gaze following, facial expressions, and visual
scene information.

\begin{itemize}
  \item Gaze-following representation
  \item Gaze-direction representation
  \item Facial-expression representation
  \item Audiovisual saliency representation
  \item Predicted fixation density map
\end{itemize}

\end{document}
```

PDF/UA-2 is the accessibility conformance level defined against PDF 2.0, and it supersedes PDF/UA-1 for newer documents. A document that has to be validated against PDF/UA-1 should set `pdfversion = 1.7` and `pdfstandard = ua-1`.

## Engine Support

| Capability                            | pdfLaTeX | XeLaTeX     | LuaLaTeX |
| ------------------------------------- | -------- | ----------- | -------- |
| Supported by the tagging project      | ✅        | ❌           | ✅        |
| Text and structure tagging            | ✅        | ❌           | ✅        |
| Real space glyphs                     | ✅        | ❌           | ✅        |
| Automatic MathML generation           | ❌        | ❌           | ✅        |
| Math via author-supplied MathML       | ✅        | ❌           | ✅        |
| MathML structure element tagging      | ❌        | ❌           | ✅        |
| PDF version and standard declarations | ✅        | ✅           | ✅        |

XeLaTeX is not part of the supported route. The `tagpdf` documentation describes the XeLaTeX and dvips paths as essentially untested and does not recommend them, and neither supports real space glyphs, which affects how reliably word boundaries survive text extraction. Use pdfLaTeX or LuaLaTeX for documents that need to be tagged.

pdfLaTeX generally needs more compilation passes than LuaLaTeX to resolve the cross references tagging depends on.

## Current Limitations

The LaTeX tagging project is under active development, and coverage depends on individual packages cooperating with the pipeline. Classes and packages that predate the interface may produce untagged or incorrectly tagged output, especially for custom float types and heavily customised list or table environments. `listings` is a known example that is not currently compatible with tagging. Testing the compiled PDF against a [PDF/A validation checker](https://verapdf.org/home/) is useful whenever a document depends on a package outside the core set.

For the equivalent workflow in Typst, see [Typst Accessibility](../typst-compilation/accessibility).
