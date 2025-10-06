---
sidebar_position: 2
---

# First Steps

## Choosing Your Account Type

TeXlyre offers two ways to get started, each suited to different needs and situations.

### Guest Sessions

Guest sessions provide immediate access to TeXlyre's full feature set without any registration process. Click "Try as Guest" to begin editing immediately. Guest accounts include all core functionality: document editing, LaTeX/Typst compilation, real-time collaboration, and file management.

The trade-off with guest sessions is persistence. Your projects exist only for the current browser session and disappear when you close the browser or after 24 hours, whichever comes first. Guest sessions also cannot access file system backup features.

Guest sessions work well for trying TeXlyre, collaborating on someone else's project, or working on temporary documents that don't need long-term storage.

### Full Accounts

Full accounts store your projects permanently in your browser's local storage. Create an account by providing a username and password. Email addresses are optional and used only for account recovery purposes.

Full accounts unlock all TeXlyre features, including file system backup, persistent settings, and the ability to upgrade your workspace over time. Your account data remains local to your browser and device.

:::tip Upgrading from Guest
You can convert a guest session to a full account at any time without losing your current work. Look for the upgrade prompt in the interface or click the upgrade button in the user menu.
:::

## Understanding the Interface

TeXlyre's interface adapts to your current activity. The main areas include the project dashboard, file explorer, document editor, and PDF/SVG/HTML output viewer.

### Project Dashboard

The project dashboard appears when you first log in and serves as your home base. Here you'll see all your projects, create new ones, and import existing work. Projects display as cards showing their name, description, last modified date, and any tags you've assigned.

Use the search bar to quickly find specific projects. Filter by tags to organize related work. The star icon marks projects as favorites, moving them to the top of your project list.

### Navigation Between Projects and Files

TeXlyre organizes content at two levels: projects and files within projects. Projects represent complete LaTeX/Typst documents or related sets of documents, like a research paper or book chapter. Within each project, you'll work with individual files including LaTeX/Typst sources, images, data files, and generated outputs.

The interface provides clear navigation between these levels. Use the "Projects" button to return to your project dashboard. Within a project, the file explorer shows your project's file structure.

## Creating Your First Project

New projects start from the project dashboard. Click the "New Project" button to open the project creation form.

**Project Name**: Choose descriptive names that will help you find the project later. Names can include spaces and special characters, making "My Research Paper" preferable to "research_paper_v2".

**Description**: Add details about the project's purpose, content, or status. Descriptions appear in project cards and help differentiate similar projects.

**Tags**: Tags help organize related projects. Common tag categories include project type (paper, thesis, presentation), subject area (physics, mathematics, history), or status (draft, submitted, published).

### Starting from Templates

TeXlyre includes a template gallery with pre-built projects covering common document types. Templates provide properly structured starting points with example content you can replace with your own work.

Access templates through the "Import Projects" button, then select "From Template Gallery". Browse by category or search for specific document types. Templates include academic papers, theses, presentations, and more specialized formats.

## Basic Navigation

Once inside a project, TeXlyre's split-pane interface shows your file explorer on the left and the main work area on the right. The work area switches between document editing and LaTeX/Typst output viewing.

### File Explorer

The file explorer displays your project's files and folders in a tree structure. Click folder icons to expand or collapse directories. File icons indicate content type and link status.

Create new files and folders using the plus icons in the file explorer header. Upload files by dragging them from your computer directly into the file explorer, or use the upload button for traditional file selection.

### Document Editor

The document editor provides syntax highlighting for typesetting and other text formats. The editor understands LaTeX and Typst commands, and highlights them appropriately, making it easier to spot syntax errors and structure your content.

Switch between files by clicking them in the file explorer. The editor remembers your cursor position in each file, allowing quick context switching between related documents.

:::info Auto-Save
TeXlyre automatically saves your changes as you type. You'll see a brief "Saved" indicator when changes are written to storage. Manual save actions aren't necessary, but you can force a save using Ctrl+S.
:::

## Understanding Documents vs Files

TeXlyre distinguishes between collaborative documents and regular files, though both appear in your project structure.

**Documents** support real-time collaboration. When multiple people work on the same document, everyone sees live changes, cursors, and selections. Documents work best for LaTeX/Typst source files that benefit from collaborative editing.

**Files** store content that doesn't require real-time collaboration, such as images, data files, or generated outputs. Files can be shared between collaborators but don't support live editing.

**Linked Documents** combine collaborative editing with file persistence. When you link a document to a file, changes to the document automatically update the corresponding file, enabling both collaboration and file-based workflows.

## Next Steps

With your first project created and the interface understood, you're ready to start writing LaTeX or Typst content. The [Quick Start Guide](./quick-start-guide) walks through creating a complete document from start to finish, including compilation and sharing with collaborators.