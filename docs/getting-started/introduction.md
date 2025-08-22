---
sidebar_position: 1
---

# Introduction to TeXlyre

TeXlyre represents a new approach to LaTeX editing that puts you in control of your documents while enabling powerful collaboration features. Understanding how TeXlyre works will help you make the most of its unique capabilities.

## The Local-First Philosophy

Traditional online LaTeX editors store your documents on their servers. TeXlyre takes a different approach by keeping your work in your browser's local storage. This means your documents are immediately available, even without an internet connection, and you maintain complete ownership of your data.

When you work offline, TeXlyre continues to function normally. Once you reconnect to the internet, any collaborative features automatically resume where they left off.

## How Collaboration Works

TeXlyre enables real-time collaboration without storing your documents on external servers. When you share a project, collaborators connect directly to your browser through WebRTC technology. This peer-to-peer approach ensures your content never passes through intermediate servers.

Each collaborator sees live cursors and text changes as they happen. The underlying technology uses conflict-free replicated data types to automatically resolve any editing conflicts, so multiple people can work on the same paragraph without issues.

## LaTeX Compilation in the Browser

TeXlyre includes full LaTeX engines that run entirely in your browser using WebAssembly. This eliminates the typical upload-and-wait cycle of traditional online editors. Your documents compile locally, providing immediate feedback on errors and generating PDFs without network delays.

The platform supports both pdfTeX and XeTeX engines, covering the vast majority of LaTeX use cases. Package management happens automatically, downloading only the packages your document actually uses.

## Data Storage and Backup

Your projects live in your browser's IndexedDB storage, which persists between sessions but remains on your device. This storage is separate for each browser profile, so switching browsers or computers requires exporting and importing your projects.

TeXlyre provides several backup options to protect your work. You can export individual projects or your entire account as ZIP files. The file system backup feature connects to local folders, enabling automatic synchronization with cloud storage services like Dropbox or Google Drive.

## Browser Requirements

TeXlyre works in all modern browsers but performs best in Chrome and Edge, which support the full range of features including file system access. Firefox provides core functionality but with some limitations around file system integration. Safari offers basic compatibility but may not support all advanced features.

:::info Storage Considerations
Browser storage has practical limits, typically around 50-100GB depending on available disk space. For very large projects with many images or datasets, consider using the file system backup feature to offload files to your computer's storage.
:::

## Security and Privacy

TeXlyre implements several security measures to protect your work. Account passwords are hashed using industry-standard algorithms, and any API keys or tokens you store are encrypted before being saved to local storage.

The peer-to-peer collaboration uses encrypted connections, ensuring that even during collaborative sessions, your content remains protected. The platform never transmits your documents to external servers for compilation or storage.

## Getting Help

TeXlyre includes contextual help throughout the interface. Look for information icons next to features for quick explanations. The integrated error parser helps decode LaTeX compilation errors into plain English explanations.

The project's open-source nature means community-driven documentation and support continue to grow. Check the GitHub repository for the latest information and to report any issues you encounter.

Ready to create your first project? Continue to [First Steps](./first-steps) to set up your TeXlyre workspace.