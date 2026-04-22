---
sidebar_position: 1
---

# Introduction to TeXlyre

TeXlyre is a local-first editor for LaTeX and Typst that keeps you in control of your documents while enabling powerful collaboration features.

## Local-First Philosophy

Traditional online editors store your documents on their servers. TeXlyre keeps your work in your browser's local storage, giving you immediate access without an internet connection and complete ownership of your data.

Offline work continues normally. When you reconnect, collaborative features resume automatically.

## Real-Time Collaboration

TeXlyre enables real-time collaboration without storing documents on external servers. When you share a project, collaborators connect directly to your browser through WebRTC. This peer-to-peer approach ensures your content never passes through intermediate servers.

Live cursors and text changes appear instantly. Conflict-free replicated data types automatically resolve editing conflicts when multiple people work on the same paragraph.

## Browser-Based Compilation

TeXlyre includes full LaTeX engines (pdfTeX, XeTeX, and LuaTeX) and the Typst compiler running entirely in your browser using WebAssembly. Documents compile locally, providing immediate feedback without network delays.

Running in the browser sandbox means shell-escape is unavailable, so packages that invoke external tools (such as `minted` for syntax highlighting or `svg` for on-the-fly conversion) will not work, and some precompiled fonts and system dependencies are not bundled. Initial compilation can also be slower than a native installation, especially on the first run while engines and packages are fetched and cached.

:::warning[Biber not yet available]
Biber is not supported at this time, so bibliographies should be processed with BibTeX for now. Support may be expanded in the future.
:::

To keep compilation fast and lightweight, package management happens automatically in the background, downloading only what your document requires rather than bundling a full distribution upfront.

## Data Storage and Backup

Projects live in your browser's IndexedDB storage, persisting between sessions on your device. Storage is separate for each browser profile.

Export individual projects or your entire account as ZIP files. The file system backup feature connects to local folders, enabling automatic synchronization with cloud storage services like Dropbox or Google Drive.

## Browser Requirements

TeXlyre works in all modern browsers but performs best in Chrome and Edge, which support the full range of features including file system access. Firefox provides core functionality with some limitations around file system integration. Safari offers basic compatibility.

:::info[Storage Considerations]
Browser storage typically ranges from 50-100GB depending on available disk space. For large projects with many images or datasets, use file system backup to offload files to your computer's storage.
:::

## Security and Privacy

Account passwords are hashed using industry-standard algorithms. API keys and tokens are encrypted before being saved to local storage.

Peer-to-peer collaboration uses encrypted connections. The platform never transmits your documents to external servers for compilation or storage.

## Getting Help

Contextual help appears throughout the interface. Look for information icons next to features for quick explanations. The integrated error parser translates compilation errors into plain English.

The open-source project includes community-driven documentation and support. Check the GitHub repository for the latest information and to report issues.

Ready to create your first project? Continue to [First Steps](./first-steps) to set up your TeXlyre workspace.