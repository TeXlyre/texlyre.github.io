---
sidebar_position: 1
---

# Creating Projects

Projects in TeXlyre organize your LaTeX documents, files, and collaboration settings into manageable workspaces. Each project provides an isolated environment for specific writing tasks, whether you're crafting academic papers, books, presentations, or technical documentation.

## Starting a New Project

### Creating from Scratch

Click the "New Project" button in the project dashboard to create an empty project. The project creation dialog requests basic information that helps organize and identify your work.

Enter a descriptive project name that clearly indicates its purpose. Good project names help you locate specific work quickly and provide context for collaborators who join your project. Consider including version numbers or dates for projects that might have multiple iterations.

Project descriptions provide additional context about the project's goals, scope, or current status. While optional, descriptions become valuable when managing many projects or when collaborating with others who need to understand the project's purpose.

### Project Templates

The template gallery provides professionally designed starting points for common document types. Templates include pre-configured document structures, styling, and example content that you can customize for your specific needs.

Browse templates by category to find formats suitable for your project type. Academic templates include thesis structures, journal article formats, and conference paper layouts. Professional templates cover business reports, presentations, and technical documentation.

Select a template to preview its structure and styling before creation. Template previews show the document layout and included components, helping you choose formats that match your intended output.

### Importing Existing Work

Import projects from other TeXlyre instances or migrate work from external LaTeX environments. The import process supports TeXlyre export files and can extract projects from ZIP archives containing LaTeX source files.

Import workflows preserve project structure and file relationships when possible. Complex projects with custom configurations may require manual adjustment after import to ensure all components function correctly.

Consider organizing your files before import to ensure the resulting TeXlyre project maintains a logical structure. Well-organized imports integrate more smoothly and require less post-import cleanup.

## Project Metadata

### Essential Information

Project names serve as the primary identifier in your project list and appear in shared project URLs. Choose names that remain meaningful over time and avoid generic labels that might cause confusion with similar projects.

Descriptions help you remember project details and provide context for collaborators. Include information about the project's purpose, current status, deadlines, or special requirements that affect how others should approach the work.

Tags create flexible categorization systems for your projects. Use tags to group related work, indicate project status, or mark projects with specific characteristics. Tags become especially useful as your project collection grows.

### Organizational Tags

Develop consistent tagging strategies that reflect your work patterns and organizational needs. Common tag categories include project type, subject area, collaboration status, and completion stage.

Subject-based tags help group projects by topic or field of study. Status tags can indicate whether projects are active, completed, or archived. Collaboration tags might identify solo work versus team projects.

Consider your long-term organizational needs when establishing tag conventions. Consistent tagging makes project discovery more efficient and enables better filtering of large project collections.

### Collaboration Settings

New projects default to collaborative mode, enabling real-time editing and sharing capabilities. Projects receive unique URLs that you can share with collaborators to grant immediate access to the workspace.

Project sharing URLs provide full access to all project contents including documents, files, and compilation settings. Share these URLs carefully since anyone with access can modify project content and settings.

Consider creating test projects for experimenting with new features or sharing examples with others. Test projects help you understand collaboration dynamics without risking important work.

## Initial Project Setup

### Document Structure

Start new projects by creating your main LaTeX document and organizing supporting files. Establish a logical file structure early in the project to maintain organization as content grows.

Create folders for different content types such as chapters, figures, data files, and bibliography sources. Clear organization makes collaboration easier and helps you locate specific files quickly.

Consider your project's final structure when organizing initial files. Academic papers might separate sections into individual files, while books might organize content by chapters or parts.

### Main File Configuration

Identify your project's main LaTeX file that serves as the compilation entry point. TeXlyre can auto-detect main files in simple projects, but complex projects benefit from explicit main file specification.

The main file typically contains your document preamble, package imports, and high-level structure while including content from other files. This approach enables efficient collaboration by allowing team members to work on different sections simultaneously.

Configure your main file early in the project to ensure compilation works correctly from the beginning. Test compilation frequently as you add content to catch configuration issues early.

### Engine Selection

Choose the appropriate LaTeX engine for your project's requirements. pdfTeX works well for most standard documents, while XeTeX provides better support for complex typography and font requirements.

Consider your project's specific needs when selecting engines. Documents requiring Unicode text, custom fonts, or complex mathematical notation might benefit from XeTeX's advanced capabilities.

Engine selection affects compilation behavior and available features. Test your chosen engine with representative content early in the project to ensure it meets your formatting and output requirements.

## Project Templates in Detail

### Academic Templates

Academic templates provide structured starting points for scholarly writing including journal articles, conference papers, thesis chapters, and dissertation formats. These templates include proper sectioning, citation styles, and formatting conventions.

Research paper templates typically include abstract sections, literature review structures, methodology frameworks, and result presentation formats. Customize these elements to match your specific research approach and target publication requirements.

Thesis templates provide comprehensive document structures with front matter, chapter organization, appendix handling, and bibliography management. These templates save significant setup time for long-form academic writing.

### Professional Templates

Business and technical templates support professional documentation needs including reports, proposals, manuals, and presentations. These templates emphasize clear communication and professional appearance.

Report templates include executive summary structures, section organization, and formatting styles appropriate for business audiences. Customize headers, footers, and styling to match organizational branding requirements.

Technical documentation templates provide structures for user manuals, API documentation, and specification documents. These templates include code formatting, diagram integration, and cross-referencing capabilities.

### Custom Template Creation

Advanced users can create custom templates by exporting well-structured projects for reuse. Custom templates preserve your preferred organization patterns, styling choices, and configuration settings.

Document your template structure and usage instructions to help collaborators understand the intended workflow. Clear documentation makes custom templates more valuable for team use.

Consider contributing useful templates to the community template gallery. Sharing templates helps other users while demonstrating expertise in specific document types or formatting approaches.

:::tip Template Customization
Don't feel constrained by template structures. Templates provide starting points that you can modify extensively to meet your specific needs. Remove unnecessary sections, add custom elements, and adjust formatting to create documents that serve your exact requirements.
:::