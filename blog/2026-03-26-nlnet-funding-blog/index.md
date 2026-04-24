---
slug: nlnet-ngi0-funding-overview
title: "TeXlyre joins NGI0 Commons: Project roadmap and milestones"
authors: [fabawi]
tags: [nlnet, ngi0, funding, roadmap, chelys]
---

TeXlyre is now funded by the [NLnet Foundation](https://nlnet.nl/project/TeXlyre/) through the [NGI0 Commons](https://nlnet.nl/commonsfund/) fund. This post lays out the project roadmap and the tasks that will be delivered over the course of the grant.

![Sponsors](./showcase/sponsors_banner.svg)

{/* truncate */}

:::info[About NGI0 Commons]

NGI0 Commons is part of the European Commission's Next Generation Internet initiative, run by NLnet. It supports projects building the free, open, trustworthy internet of the future. The full list of funded projects is available at [nlnet.nl/project](https://nlnet.nl/project).

:::

## Roadmap

The grant covers 11 tasks, broken into milestones. Each task below links to its completion report when available. Checked items are completed and reported.

### Task 1: WebAssembly engine modernization

Upgrade TeXlyre's WASM-based LaTeX compilation from TeX Live 2020 to contemporary tooling, and add SyncTeX for bidirectional source/PDF navigation.

- [x] **1a.** On-demand TeX Live package server with browser-side package fetching
- [x] **1b.** LuaLaTeX support via modernized BusyTeX, with compatibility verified against contemporary packages
- [x] **1c.** SyncTeX bidirectional jump-to-source and jump-to-PDF navigation

:::tip[Completed]

Full report: [WebAssembly engine upgrade](/blog/latex-wasm-engine-upgrade)

:::

### Task 2: Chelys proof-of-concept, local LSP bridge

Introduce Chelys as a local companion application that relays Language Server Protocol messages between TeXlyre and local LSP providers (JabRef, Zotero Better BibTeX, Tinymist, and others).

- [ ] **2a.** Local Chelys application with WebSocket-based LSP communication
- [ ] **2b.** Chelys running both as standalone background service and as a Tauri desktop extension

### Task 3: Peer-to-peer LSP modulation

Modulate LSP messages over TeXlyre's existing Yjs peer-to-peer network, so one collaborator's local language server can serve the whole session.

- [ ] **3a.** LSP message serialization and transport over the Yjs sync layer
- [ ] **3b.** WebRTC-based relay for secure remote LSP access

### Task 4: Chelys plugin system

Graduate Chelys from proof-of-concept to a production-ready plugin system for managing local service providers.

- [ ] **4a.** Plugin mechanism with install, update, remove, and dependency management
- [ ] **4b.** Access control, usage logging, and rate limiting for plugin operations

### Task 5: Local typesetting engine support

Extend Chelys to run local typesetting engines (LuaTeX, optionally LuaMetaTeX, PreTeXt, SILE) using the same peer-to-peer modulation layer built for LSP.

- [ ] **5a.** Compile dispatch, file transfer, and PDF retrieval between TeXlyre and Chelys
- [ ] **5b.** Typesetting engine lifecycle integrated into the Chelys plugin system

### Task 6: Chelys distributed storage, local foundation

Add encrypted local storage to Chelys, accessible remotely through TeXlyre but scoped strictly to project files.

- [ ] **6a.** Secure end-to-end encrypted local storage, restricted to TeXlyre-managed projects
- [ ] **6b.** Evaluate and optionally integrate a decentralized storage backend (Solid Pods, Garage, or similar)

### Task 7: Chelys distributed storage, multi-endpoint redundancy

Enable replication of encrypted project data across multiple Chelys instances, with decryption only at the user's end.

- [ ] **7a.** Encrypted replication across multiple Chelys endpoints
- [ ] **7b.** Sync and conflict resolution for redundant storage

### Task 8: Document diff and review system

Implement version comparison and change review inside TeXlyre.

- [ ] **8a.** Diff engine with inline visual highlighting of additions, deletions, and modifications
- [ ] **8b.** Review interface for accepting and rejecting individual changes, integrated with collaboration and version history

## Following Updates

Each completed task will get a dedicated report post here on the blog, linked from the roadmap above. Development happens in the open across the [TeXlyre organization on GitHub](https://github.com/TeXlyre), with one repository per component (`texlyre`, `texlyre-busytex`, `texlyre-busytex-build`, and later `chelys`).
