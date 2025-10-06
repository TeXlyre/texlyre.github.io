---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start Guide

This guide walks you through creating your first complete document in TeXlyre, from initial setup to sharing with collaborators. You'll learn the essential workflow that applies to most TeXlyre projects.

## Creating Your First Document

Start by creating a new project from your dashboard. For this example, we'll create a simple research paper to demonstrate the complete workflow.

Name your project "My First TeXlyre Document" and add a description like "Learning the TeXlyre workflow with a sample research paper." Add tags such as "tutorial" and "sample" to practice project organization.

Once created, TeXlyre opens your empty project. The file explorer on the left is empty, and the main area prompts you to create your first file.

## Setting Up Your Document Structure

<Tabs groupId="tex-engine">
<TabItem value="latex" label="LaTeX" default>

Create your main LaTeX file by clicking the "New File" button in the file explorer. Name it `main.tex` to establish it as your primary document. TeXlyre will automatically detect this as your main compilation target.

Start with a basic LaTeX document structure:

```latex
\documentclass{article}
\usepackage[utf8]{inputenc}
\usepackage{amsmath}
\usepackage{graphicx}

\title{My First TeXlyre Document}
\author{Your Name}
\date{\today}

\begin{document}

\maketitle

\section{Introduction}

This is my first document created in TeXlyre. The local-first approach means this content stays in my browser while still enabling collaboration with others.

\section{Features I'm Learning}

TeXlyre provides several key capabilities that make LaTeX writing more efficient and collaborative.

\subsection{Real-time Editing}

Multiple collaborators can edit the same document simultaneously without conflicts.

\subsection{Instant Compilation}

LaTeX compilation happens directly in the browser using WebAssembly engines.

\section{Conclusion}

TeXlyre successfully combines the power of LaTeX with modern collaborative editing.

\end{document}
```

</TabItem>
<TabItem value="typst" label="Typst">

Create your main Typst file by clicking the "New File" button in the file explorer. Name it `main.typ` to establish it as your primary document. TeXlyre will automatically detect this as your main compilation target.

Start with a basic Typst document structure:

```typst
#set document(title: "My First TeXlyre Document", author: "Your Name")
#set page(numbering: "1")
#set text(font: "Linux Libertine", size: 11pt)

#align(center)[
  #text(size: 17pt, weight: "bold")[My First TeXlyre Document]
  
  Your Name
  
  #datetime.today().display()
]

= Introduction

This is my first document created in TeXlyre. The local-first approach means this content stays in my browser while still enabling collaboration with others.

= Features I'm Learning

TeXlyre provides several key capabilities that make Typst writing more efficient and collaborative.

== Real-time Editing

Multiple collaborators can edit the same document simultaneously without conflicts.

== Instant Compilation

Typst compilation happens directly in the browser using WebAssembly engines.

= Conclusion

TeXlyre successfully combines the power of Typst with modern collaborative editing.
```

</TabItem>
</Tabs>

As you type, TeXlyre provides syntax highlighting and automatically saves your changes. The editor understands LaTeX and Typst commands and structures, highlighting them appropriately to make your code more readable.

## Compiling Your Document

With your content ready, compile it to see the PDF output. Click the play button in the compilation controls, or press F9 to start compilation.

TeXlyre compiles your document using local WebAssembly engines. The first compilation may take a moment as it downloads necessary packages, but subsequent compilations are much faster.

### Viewing the Output

Once compilation completes, switch to the PDF tab to view your generated document. The PDF viewer includes zoom controls, page navigation, and the ability to download the final PDF file.

If compilation errors occur, the Log tab displays detailed error information. TeXlyre's error parser translates common errors into plain English explanations with suggestions for fixes.

### Understanding Compilation Settings

<Tabs groupId="tex-engine">
<TabItem value="latex" label="LaTeX" default>

TeXlyre defaults to pdfTeX for most documents, which handles standard LaTeX content well. For documents requiring Unicode support or advanced typography, switch to XeTeX using the engine selector in the compilation controls.

The platform automatically detects your main file when you have only one `.tex` file. For complex projects with multiple LaTeX files, you can manually specify the main file in the compilation settings.

</TabItem>
<TabItem value="typst" label="Typst">

TeXlyre uses the Typst compiler which provides fast compilation with native Unicode support. The default output format is PDF.

The platform automatically detects your main file when you have only one `.typ` file. For complex projects with multiple Typst files, you can manually specify the main file in the compilation settings.

</TabItem>
</Tabs>

:::tip Compilation Shortcuts
- **F9**: Compile document
- **Shift+F9**: Clear cache and compile (useful for troubleshooting)
- **F8**: Stop compilation (if running)
:::

## Adding Images and Files

Most documents include images or other supporting files. Create an `images` folder in your file explorer to organize visual content.

Upload an image by dragging it from your computer into the `images` folder, or use the upload button in the file explorer. TeXlyre supports common image formats including PNG, JPEG, and PDF.

Reference your uploaded image:

<Tabs groupId="tex-engine">
<TabItem value="latex" label="LaTeX" default>

```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.5\textwidth]{images/your-image.png}
    \caption{Your image caption here}
    \label{fig:example}
\end{figure}
```

</TabItem>
<TabItem value="typst" label="Typst">

```typst
#figure(
  image("images/your-image.png", width: 50%),
  caption: [Your image caption here],
) <fig_example>
```

</TabItem>
</Tabs>

Recompile your document to see the image included in your PDF output.

## Sharing and Collaboration

TeXlyre's collaboration features let others edit your document in real-time. Generate a shareable link by clicking the Share button in the top toolbar.

### Creating a Share Link

The share dialog displays your project's collaboration URL and provides a QR code for easy mobile sharing. Anyone with this link can view and edit your project immediately, without creating an account.

Copy the link and send it to collaborators through email, messaging, or any other communication method. When collaborators open the link, they join your project and can begin editing immediately.

### Collaborative Editing

When multiple people work on the same document, you'll see their cursors and selections in real-time. Each collaborator gets a unique color, making it easy to see who's working where.

Changes appear instantly as others type. TeXlyre's conflict resolution automatically handles situations where multiple people edit the same text, ensuring no work is lost.

### Project Chat

Use the chat panel at the bottom of the screen to communicate with collaborators while working. The chat stays with your project, providing context for ongoing discussions about the document.

## Organizing Your Project

As your project grows, organize files into logical folders. Create folders for different content types like `images`, `data`, `chapters`, or `references`.

### Bibliography Management

<Tabs groupId="tex-engine">
<TabItem value="latex" label="LaTeX" default>

For documents requiring citations, create a `references.bib` file to store your bibliography entries. TeXlyre includes bibliography management tools that help format and organize your references.

Add bibliography support to your main document:

```latex
\usepackage{natbib}
\bibliographystyle{plain}

% At the end of your document, before \end{document}
\bibliography{references}
```

</TabItem>
<TabItem value="typst" label="Typst">

For documents requiring citations, create a `references.bib` or `references.yml` file to store your bibliography entries. TeXlyre includes bibliography management tools that help format and organize your references.

Add bibliography support to your main document:

```typst
#bibliography("references.bib", style: "ieee")
```

</TabItem>
</Tabs>

### Multiple Document Projects

Complex projects often split content across multiple files. Create separate files for each chapter or section, then include them in your main document:

<Tabs groupId="tex-engine">
<TabItem value="latex" label="LaTeX" default>

```latex
\include{chapters/introduction}
\include{chapters/methodology}
\include{chapters/results}
\include{chapters/conclusion}
```

</TabItem>
<TabItem value="typst" label="Typst">

```typst
#include "chapters/introduction.typ"
#include "chapters/methodology.typ"
#include "chapters/results.typ"
#include "chapters/conclusion.typ"
```

</TabItem>
</Tabs>

This approach keeps your main file clean and makes collaboration easier when different people work on different sections.

## Backup and Export

Protect your work by setting up regular backups. TeXlyre provides several options for preserving your projects.

### Project Export

Export individual projects as ZIP files using the export option in the project menu. This creates a complete archive including all files, document history, and collaboration metadata.

### File System Backup

Connect TeXlyre to a local folder on your computer for automatic synchronization. This feature works with cloud storage services to provide seamless backup across devices.

Access backup settings through the backup indicator in the top toolbar. Choose a local folder, and TeXlyre will keep it synchronized with your project files.

## What's Next

You now understand TeXlyre's core workflow from project creation through collaboration and backup. This foundation supports more advanced features like plugin integration, complex project organization, and sophisticated collaboration workflows.

Explore the [Project Management](../projects/creating-projects) section to learn about advanced project organization techniques, or dive into [Real-Time Collaboration](../collaboration/sharing-projects) for detailed collaboration strategies.