import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);

const OUTPUT_ROOT = process.argv[2] || './static/core';
const FONT_BASE_URL =
    process.env.TYPST_FONT_BASE_URL ||
    'https://raw.githubusercontent.com/TeXlyre/texlyre/main/public/assets/fonts';
const FONT_EXCLUDE =
    process.env.TYPST_FONT_EXCLUDE === undefined ? 'ColorEmoji|CJK' : process.env.TYPST_FONT_EXCLUDE;

async function copyWasmPackage(packageName) {
    const entry = require.resolve(`${packageName}/package.json`);
    const source = path.join(path.dirname(entry), 'pkg');
    const target = path.join(OUTPUT_ROOT, packageName.split('/').pop(), 'pkg');

    await fs.mkdir(target, { recursive: true });
    await fs.cp(source, target, { recursive: true });
    console.log(`Copied ${packageName} to ${target}`);
}

async function fetchFontIndex() {
    const response = await fetch(`${FONT_BASE_URL}/fonts.json`);
    if (!response.ok) {
        throw new Error(`Failed to fetch font index: ${response.status}`);
    }

    const fonts = await response.json();
    if (!FONT_EXCLUDE) return fonts;

    const exclude = new RegExp(FONT_EXCLUDE, 'i');
    return fonts.filter((font) => !exclude.test(font));
}

async function downloadFonts() {
    const fonts = await fetchFontIndex();
    const target = path.join(OUTPUT_ROOT, 'assets', 'fonts');
    await fs.mkdir(target, { recursive: true });

    let downloaded = 0;
    for (const font of fonts) {
        const destination = path.join(target, font);
        try {
            await fs.access(destination);
            continue;
        } catch {}

        const response = await fetch(`${FONT_BASE_URL}/${encodeURIComponent(font)}`);
        if (!response.ok) {
            throw new Error(`Failed to download ${font}: ${response.status}`);
        }
        await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
        downloaded += 1;
    }

    await fs.writeFile(path.join(target, 'fonts.json'), `${JSON.stringify(fonts, null, 2)}\n`);
    console.log(`Staged ${fonts.length} fonts to ${target} (${downloaded} downloaded)`);
}

await copyWasmPackage('@myriaddreamin/typst-ts-web-compiler');
await downloadFonts();
