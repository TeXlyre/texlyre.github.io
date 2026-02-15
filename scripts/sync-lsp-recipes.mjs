import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("external/texlyre-lsp-recipes");
const DOCS = path.resolve("docs");

// clean outputs
fs.rmSync(path.join(DOCS, "supported-lsp"), { recursive: true, force: true });
fs.rmSync(path.join(DOCS, "lsp-with-texlyre.md"), { force: true });

// YAML-safe quoting
const yamlQuote = (s) =>
    `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const writeDoc = (outPath, title, sourceMd) => {
    const fm = [
        "---",
        `title: ${yamlQuote(title)}`,
        "---",
        "",
        "",
    ].join("\n");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, fm + sourceMd, "utf8");
};

/**
 * Top-level conceptual doc
 * docs/lsp-with-texlyre.md
 */
writeDoc(
    path.join(DOCS, "lsp-with-texlyre.md"),
    "LSP with TeXlyre",
    fs.readFileSync(path.join(SRC, "README.md"), "utf8"),
);

/**
 * Supported LSP category (generated index)
 */
const OUT = path.join(DOCS, "supported-lsp");

fs.mkdirSync(OUT, { recursive: true });

fs.writeFileSync(
    path.join(OUT, "_category_.json"),
    JSON.stringify(
        {
            label: "Supported LSP",
            link: {
                type: "generated-index",
                title: "Supported LSP",
                description:
                    "Language Server Protocol implementations supported by TeXlyre.",
            },
        },
        null,
        2
    ),
    "utf8"
);

/**
 * docs/supported-lsp/<recipe>/index.md
 */
const recipesDir = path.join(SRC, "recipes");

for (const entry of fs.readdirSync(recipesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;
    const readmePath = path.join(recipesDir, name, "README.md");
    if (!fs.existsSync(readmePath)) continue;

    writeDoc(
        path.join(OUT, name, "index.md"),
        `Recipe: ${name}`,
        fs.readFileSync(readmePath, "utf8"),
    );
}

console.log("Synced LSP docs");
