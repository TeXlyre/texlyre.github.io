import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("external/texlyre-lsp-recipes");
const OUT = path.resolve("docs/lsp-recipes");

// Clean output directory
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// YAML-safe quoting
const yamlQuote = (s) =>
    `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

// Write a single Docusaurus doc
const writeDoc = (outPath, title, sourceMd) => {
    const frontMatter = [
        "---",
        `title: ${yamlQuote(title)}`,
        "---",
        "",
        "",
    ].join("\n");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, frontMatter + sourceMd, "utf8");
};

/**
 * docs/lsp-recipes/lsp-in-texlyre.md
 * Overall README as a normal page under the category
 */
writeDoc(
    path.join(OUT, "lsp-in-texlyre.md"),
    "LSP in TeXlyre",
    fs.readFileSync(path.join(SRC, "README.md"), "utf8"),
);

/**
 * (Optional) Category landing page
 * You may delete this block entirely if you don't want it.
 */
writeDoc(
    path.join(OUT, "index.md"),
    "LSP Recipes",
    "Language Server Protocol recipes supported by TeXlyre.\n",
);

/**
 * docs/lsp-recipes/<recipe>/index.md
 * One page per recipe
 */
const recipesDir = path.join(SRC, "recipes");

for (const entry of fs.readdirSync(recipesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;
    const readmePath = path.join(recipesDir, name, "README.md");
    if (!fs.existsSync(readmePath)) continue;

    const md = fs.readFileSync(readmePath, "utf8");
    writeDoc(
        path.join(OUT, name, "index.md"),
        `Recipe: ${name}`,
        md,
    );
}

console.log("Synced LSP recipe docs ->", OUT);
