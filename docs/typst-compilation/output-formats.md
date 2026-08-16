---
sidebar_position: 3
---

# Output Formats

Typst compilation produces one of three previews. The default is set in Settings ⚙️ → Typst → Default output format and can be changed per compilation from the compile menu.

## PDF

PDF is the format to use when the output will be shared, printed, archived, or checked against a standard. It is the only format that carries document metadata, tagging, and PDF version or conformance settings. See [Accessibility](./accessibility) for those options.

PDF output renders in the built-in viewer and downloads unchanged.

## Canvas (PDF)

Canvas mode paints the compiled PDF onto a canvas. The result looks identical and scrolls and zooms as a continuous surface, which suits reading long documents while editing.

The underlying artifact is still a PDF, so nothing is lost when switching between this and plain PDF output.

## Canvas (SVG)

SVG output renders pages directly as vector graphics. Text stays selectable, the output scales without rasterising, and pages appear as they are produced.

SVG is the format that supports source maps.

## Source Maps

With source maps enabled, positions in the SVG output are linked back to the source that produced them, so clicking in the preview moves the cursor to the corresponding place in the document and moving the cursor scrolls the preview. This is the Typst equivalent of SyncTeX.

Source maps require SVG output. They are enabled in Settings ⚙️ → Typst → Enable source map (SVG only) and have no effect on PDF or canvas-PDF output, where no such mapping is produced.

## Remote Content

Documents can reference remote images and other remote resources. Fetching them requires a network connection and reveals the request to the remote host, so the behaviour is controlled by Settings ⚙️ → Typst → Allow remote content in Typst output.

With remote content disabled, the reference is dropped and compilation continues. Local project files are unaffected by this setting.

## Choosing a Format

| Situation | Format |
|---|---|
| Sharing, printing, or archiving | PDF |
| Checking a PDF standard or tagging | PDF |
| Reading a long document while editing | Canvas (PDF) |
| Click-to-source navigation | Canvas (SVG) |
| Selecting text from the preview | Canvas (SVG) |

Switching formats recompiles the document while reusing the loaded compiler and fonts, so the change is inexpensive.
