import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("external/texlyre-lsp-recipes");
const OUT = path.resolve("docs/lsp-recipes");

// clean output
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const yamlQuote = (s) =>
    `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const writeDoc = (outPath, title, sourceMd, extraFrontMatter = {}) => {
    const fmLines = ["---", `title: ${yamlQuote(title)}`];
    for (const [k, v] of Object.entries(extraFrontMatter)) {
        const value = typeof v === "string" ? yamlQuote(v) : String(v);
        fmLines.push(`${k}: ${value}`);
    }
    fmLines.push("---", "", "");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, fmLines.join("\n") + sourceMd, "utf8");
};

// Collect recipe names first
const recipesDir = path.join(SRC, "recipes");
const recipeNames = fs
    .readdirSync(recipesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => fs.existsSync(path.join(recipesDir, name, "README.md")))
    .sort((a, b) => a.localeCompare(b));

// Category config: clicking "LSP Recipes" goes to All Recipes
fs.writeFileSync(
    path.join(OUT, "_category_.json"),
    JSON.stringify(
        {
            label: "LSP Recipes",
            link: { type: "doc", id: "lsp-recipes/all-recipes" },
        },
        null,
        2
    ),
    "utf8"
);

// Optional lightweight landing page (keeps /docs/lsp-recipes)
writeDoc(
    path.join(OUT, "index.md"),
    "LSP Recipes",
    "See **All Recipes** for the full list.\n"
);

// Build All Recipes = upstream README + generated list
const rootReadme = fs.readFileSync(path.join(SRC, "README.md"), "utf8");

const generatedIndex =
    `\n\n## Recipes\n\n` +
    recipeNames.map((name) => `- [${name}](./${name}/)`).join("\n") +
    `\n`;

writeDoc(
    path.join(OUT, "all-recipes.md"),
    "All Recipes",
    rootReadme + generatedIndex,
    { sidebar_position: 1 }
);

// Write each recipe README
for (const name of recipeNames) {
    const readmePath = path.join(recipesDir, name, "README.md");
    const md = fs.readFileSync(readmePath, "utf8");
    writeDoc(path.join(OUT, name, "index.md"), `Recipe: ${name}`, md);
}

console.log("Synced LSP recipe docs ->", OUT);
