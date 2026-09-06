---
sidebar_position: 4
---

# Local Files and Folders

TeXlyre can reach files on your device in three ways: mirroring a project into a folder, opening a file that you double-click in your file manager, and receiving files from your operating system's share sheet. All three depend on browser capabilities that only Chromium-based browsers implement, and all three are separate from [file system backup and account export](./data-management), which copy data rather than link it.

## Folder Sync

Folder Sync mirrors the whole project into a folder on your disk and keeps both sides in step. Edits in TeXlyre are written to the folder, and changes made on disk are pulled back in when the tab regains focus.

Open a project and click **Open Folder from Disk** in the file explorer toolbar, then choose a folder. An empty folder receives the current project files. A folder that already holds project files is reconciled against TeXlyre, with additions, deletions, and renames applied in both directions.

`.git`, `.svn`, `node_modules`, and `.texlyre` are never mirrored, and temporary build artefacts are skipped.

Once connected, the folder indicator in the editor header opens the **Folder Sync** dialog, which shows the linked folder, how many files are mirrored, when the last sync ran, and a log of recent activity. From there you can change the folder or disconnect it.

:::note[Re-granting access]
Browsers do not keep folder permission indefinitely. TeXlyre remembers which folder a project uses, but on returning to a project you may see a prompt to reconnect; click **Grant Access** in the Folder Sync dialog to restore it. Nothing is lost while permission is missing, and mirroring resumes once it is granted.
:::

This requires the File System Access API, so **Open Folder from Disk** is disabled in Firefox and Safari.

## Installing TeXlyre as an App

The two features below only work once TeXlyre is installed as an application, because the operating system needs something to list in its file and share menus. In Chrome or Edge, use the install icon in the address bar or the browser menu. On Android, use **Add to home screen**.

Installed windows reuse an existing session rather than opening a second copy, so files opened or shared while TeXlyre is already running arrive in the window you are working in.

## Opening Files with TeXlyre

After installation, TeXlyre appears in the **Open with** menu of your desktop file manager for the file types it registers:

| Type | Extensions |
|---|---|
| LaTeX | `.tex`, `.latex`, `.cls`, `.sty`, `.bst` |
| Typst | `.typ`, `.typst` |
| BibTeX | `.bib` |

A file opened this way stays connected to the original on disk. It is marked with a disk indicator in the file tree, edits in TeXlyre are written back to the file, and changes made by another editor are picked up. Click the indicator to disconnect the file, after which it becomes an ordinary project file and the copy on disk is left alone.

Unlike Folder Sync, this links individual files rather than the whole project, so the two can be used together or independently.

## Sharing Files to TeXlyre

An installed TeXlyre also registers as a share target, so it appears in the system share sheet alongside messaging and mail apps. This works on Android and on Windows, and generally wherever an installed Chromium app can be a share target; Firefox and Safari do not implement it.

Share one or more files to TeXlyre and the **Open Shared Files** dialog offers two destinations:

- **Add to existing project** — search your projects and add the files to one of them.
- **Create new project** — name the project, choose LaTeX or Typst, and TeXlyre creates it around the shared files.

Shared documents, bibliographies, images, PDFs, diagrams, and ZIP archives are all accepted. Files wait until you next open TeXlyre and sign in, and a share that is never claimed is discarded after 24 hours.

## Choosing an Approach

| You want to | Use |
|---|---|
| Edit a project with local tools while TeXlyre stays current | Folder Sync |
| Work on one file that lives elsewhere on disk | Open with TeXlyre |
| Move files into TeXlyre from another app or your phone | Share to TeXlyre |
| Keep a copy of your projects against data loss | [File system backup](./data-management) |
| Track history and collaborate through a repository | [Git synchronization](../git-synchronization) |
