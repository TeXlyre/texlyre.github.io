---
sidebar_position: 1
---

# Welcome to TeXlyre

TeXlyre is a local-first real-time LaTeX collaboration platform that runs entirely in your browser. Unlike traditional cloud-based editors, TeXlyre keeps your documents on your device while enabling seamless collaboration with others.

## What Makes TeXlyre Different

TeXlyre prioritizes your data ownership and privacy. Your documents live in your browser's local storage, not on remote servers. When you collaborate, connections happen directly between you and your collaborators through peer-to-peer networking.

The platform compiles LaTeX documents using WebAssembly engines directly in your browser, eliminating the need for external compilation servers. This approach ensures your work remains private while providing the full power of LaTeX typesetting.

## Core Features

**Real-time Collaboration**: Multiple people can edit the same document simultaneously, with live cursors and instant synchronization powered by conflict-free replicated data types (CRDTs).

**Local-first Architecture**: All your data stays in your browser unless you explicitly choose to share specific projects. No account creation is required to start using TeXlyre.

**Integrated LaTeX Compilation**: Built-in pdfTeX and XeTeX engines compile your documents without external dependencies. View PDFs side-by-side with your source code.

**File System Integration**: Connect TeXlyre to local folders on your computer for seamless backup and synchronization with cloud storage providers.

**Advanced Editor Features**: Syntax highlighting, code completion, comment threads, and integrated bibliography management streamline your writing workflow.

## Getting Started

Choose your path based on your needs:

**For Quick Exploration**: Start with a guest session to try TeXlyre immediately without any setup. Guest sessions provide full functionality but don't persist after you close your browser.

**For Regular Use**: Create a full account to save your projects permanently in your browser. You can upgrade from a guest session at any time.

**For Collaboration**: Share project links with others to begin real-time collaborative editing. No accounts are required for collaborators to join.

:::tip Browser Compatibility
TeXlyre works best in Chrome, Edge, and Firefox. Some advanced features like file system backup require Chrome or Edge for full functionality.
:::

## Privacy by Design

TeXlyre was built with privacy as a core principle. Your documents never touch external servers unless you explicitly share them with collaborators. Even then, the sharing happens through direct peer-to-peer connections.

The platform uses local browser storage for all your projects. You can export your entire workspace at any time and import it into another TeXlyre instance or browser.

## Open Source and Community

TeXlyre is released under the AGPL-3.0 license. The source code is available on GitHub, and the project welcomes contributions from the community. The local-first approach means you're never locked into a specific service provider.

Ready to start? Head to the [Getting Started](./getting-started/introduction) section to begin your TeXlyre journey.