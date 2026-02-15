import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("external/texlyre-lsp-recipes");
const OUT = path.resolve("docs/lsp-recipes");

// clean output
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// helper
const writeDoc = (outPath, title, sourceMd) => {
    const yamlQuote = (s) =>
        `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

    const frontMatter = `---\nid: index\ntitle: ${yamlQuote(title)}\n---\n\n`;
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, frontMatter + sourceMd, "utf8");
};

// root README -> docs/lsp-recipes/index.md
writeDoc(
    path.join(OUT, "index.md"),
    "LSP Recipes",
    fs.readFileSync(path.join(SRC, "README.md"), "utf8"),
);

// recipes/*/README.md -> docs/lsp-recipes/<name>/index.md
const recipesDir = path.join(SRC, "recipes");
for (const entry of fs.readdirSync(recipesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;
    const readmePath = path.join(recipesDir, name, "README.md");
    if (!fs.existsSync(readmePath)) continue;

    const md = fs.readFileSync(readmePath, "utf8");
    writeDoc(path.join(OUT, name, "index.md"), `Recipe: ${name}`, md);
}

console.log("Synced LSP recipe docs ->", OUT);
