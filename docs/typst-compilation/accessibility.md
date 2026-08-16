---
## sidebar_position: 4
---
# Accessibility

Typst can produce tagged PDFs that include document structure, so assistive software can announce headings, lists, tables, and figures as the distinct elements they are. TeXlyre exposes the PDF version, conformance standards, and tagging as compile options.

## PDF Standards

The compile and export menus offer PDF versions, PDF/A archival standards, and the PDF/UA accessibility standard. More than one can apply at once, since a document can conform to a version, an archival standard, and an accessibility standard simultaneously.

| Group         | Values                                                              |
| ------------- | ------------------------------------------------------------------- |
| Versions      | PDF 1.4, 1.5, 1.6, 1.7, 2.0                                         |
| Archival      | PDF/A-1b, A-1a, A-2b, A-2u, A-2a, A-3b, A-3u, A-3a, A-4, A-4f, A-4e |
| Accessibility | PDF/UA-1                                                            |

The combinations are constrained by the standards themselves: PDF/A-1 requires PDF 1.4, PDF/A-2 and A-3 allow 1.4 through 1.7, PDF/A-4 requires PDF 2.0, and PDF/UA-1 applies up to PDF 1.7. Incompatible selections are disabled in the menu before they reach the compiler.

PDF/UA-1 is the accessibility conformance level. Selecting it declares the intent and turns on the checks; the structure still has to come from the document.

## Tagging

Tagging is on by default and can be switched off per compilation. With tagging enabled, the structure Typst already knows about is written into the PDF: heading levels, list nesting, table cells and their header relationships, figure captions, and paragraph boundaries.

Typst derives tags from the document model, so well-structured markup produces a well-tagged PDF as a side effect. Most of the effort goes into writing good structure.

## Writing Structured Documents

Set document metadata, use real headings, and mark table header rows explicitly. A title is required for PDF/UA-1 conformance:

```typst compile pdf=1.7+ua-1 tags=true pdfheight=560
#set document(
  title: "Dynamic Scanpath Prediction",
  author: "A. Researcher",
  keywords: ("gaze", "saliency", "scanpath", "accessibility"),
)
#set page(paper: "a4", margin: 24mm, numbering: "1")
#set text(font: "Libertinus Serif", size: 11pt, lang: "en")
#set heading(numbering: "1.1")

#align(center)[
  #text(size: 18pt, weight: "bold")[Dynamic Scanpath Prediction]
]

= Model

A multimodal attention model predicts sequential gaze behaviour by combining
visual saliency, social cues, and information about previous fixations.

== Input Representations

Gaze direction, facial expression, audiovisual saliency, and fixation history
are represented as spatial feature maps before neural integration.

= Modalities

The model combines complementary signals that contribute to the predicted
priority map for the next fixation.

#figure(
  table(
    columns: 3,
    table.header([Input], [Representation], [Role]),
    [Gaze], [Direction map], [Social attention],
    [Saliency], [Fixation density], [Scene attention],
    [History], [Priority map], [Previous fixations],
  ),
  caption: [Inputs used for dynamic scanpath prediction.],
)

= Prediction

The integrated representation is decoded into a priority map from which the
next fixation location can be selected:

+ Encode social and audiovisual cues
+ Integrate fixation history
+ Predict the next-fixation priority map
```

The `lang` parameter on `set text` sets the document language, which assistive software uses to select pronunciation. It is a small change with a disproportionate effect on how the document is read aloud.

## Alternative Text for Equations

Every equation in a PDF/UA-1 document needs an alternative description. Compiling without one produces a hard error:

```text
PDF/UA-1 error: missing alt text
hint: make sure your images and equations have alt text
```

The description is supplied through the `alt` parameter of `math.equation`, written in natural language as the formula would be read aloud. The function form of an equation accepts this parameter, so equations needing alternative text are written with `#math.equation(...)` in place of the plain `$...$` syntax:

```typst compile pdf=1.7+ua-1 pdfheight=440
#set document(title: "Gaze Target Prediction")
#set page(paper: "a4", margin: 24mm)
#set text(font: "Libertinus Serif", size: 11pt, lang: "en")

= Gaze Target Prediction

The next fixation is selected from the predicted priority map by taking the
location with maximum response:

#math.equation(
  block: true,
  alt: "x star comma y star equals arg max over x and y of m hat of x comma y",
  $ (x^*, y^*) = arg max_(x,y) hat(m)(x,y) $,
)

The coordinate
#math.equation(alt: "x star", $x^*$)
gives the horizontal fixation position, and
#math.equation(alt: "y star", $y^*$)
gives the vertical fixation position. The surrounding sentence carries the
meaning, and the equation states it precisely.
```

Inline math needs the same treatment, which is why the two symbols above use the function form as well. Annotating a document with many inline symbols becomes tedious, so a common approach is to name quantities in prose and reserve mathematical notation for displayed equations.

Describe the formula as it would be spoken. A reader who hears "d of r equals alpha times r plus beta" can follow the argument; a reader who hears "equation" learns nothing.

## Images

Images take alternative text through the `alt` parameter:

```typst
#figure(
  image(
    "figures/gaze-priority-map.png",
    width: 70%,
    alt: "Predicted gaze priority map with the strongest response centred on a person's face",
  ),
  caption: [Predicted priority map for the next fixation.],
)
```

The caption and the alternative text do different jobs. The caption names the figure for every reader; the alternative text describes what the image shows for readers who cannot see it. Repeating the caption as alternative text adds nothing.

Decorative images that carry no information should be marked as such, so assistive software skips them during reading.

## PDF 2.0

PDF 2.0 is the current version of the format and the basis for the PDF/A-4 archival family. Selecting it changes the version declared in the file and the feature set available to the writer:

```typst compile pdf=2.0 tags=true pdfheight=440
#set document(
  title: "Robot Gaze Control",
  author: "A. Researcher",
)
#set page(paper: "a4", margin: 24mm, numbering: "1")
#set text(font: "Libertinus Serif", size: 11pt, lang: "en")
#set heading(numbering: "1.1")

= Robot Gaze Control

A predicted priority map provides the target for a robot gaze controller.
The strongest response determines the image location toward which the eyes
and head should orient.

== Saliency-Guided Attention

Dynamic saliency and social-cue representations are integrated before the
predicted fixation target is converted into a robot gaze command.
```

Two constraints are worth knowing before choosing PDF 2.0.

PDF/UA-1 applies to PDF 1.7 and earlier, so the accessibility standard available in TeXlyre cannot be combined with PDF 2.0. Documents that need a declared accessibility conformance level should target PDF 1.7 together with PDF/UA-1. Documents that need PDF 2.0 can still enable tagging, which writes the same structural information without the conformance declaration.

PDF/A-4 requires PDF 2.0, so archival output at the current version uses `2.0+a-4`, `2.0+a-4f` for files with embedded attachments, or `2.0+a-4e` for engineering documents.

## Checking the Result

Selecting PDF/UA-1 enables conformance checks during compilation, and problems appear in the compile log with the source position that caused them. A file that passes those checks is structurally well-formed. Whether headings appear in a sensible order, whether alternative text is informative, and whether colour alone carries meaning remain editorial questions regardless of the conformance checks.

For the equivalent workflow in LaTeX, see [LaTeX Accessibility](../latex-compilation/accessibility).
