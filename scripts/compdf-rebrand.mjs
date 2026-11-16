// ComPDF: cambia el nombre visible "BentoPDF" por "ComPDF" en la salida de build (dist/).
// No toca: URLs/dominios (bentopdf.com, x.com/BentoPDF), identificadores en minúscula
// (bentopdf-*, @bentopdf/*), avisos de copyright ("© 2026 BentoPDF"), la atribución
// "BentoPDF (AGPL-3.0)" ni los módulos de terceros en dist/wasm.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve(process.argv[2] || 'dist');
const NEW_NAME = process.env.VITE_BRAND_NAME || 'ComPDF';
const EXTENSIONS = new Set(['.html', '.json', '.js', '.mjs', '.webmanifest', '.xml', '.txt']);
const SKIP_DIRS = new Set([path.join(DIST, 'wasm')]);

// "BentoPDF" como palabra suelta, sin formar parte de una URL, dominio, ruta o copyright.
const PATTERN = /(?<![\w/@.:-])(?<!©\s?\d{4}\s)BentoPDF(?![\w/-]|\.[a-zA-Z]| \(AGPL)/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(full)) yield* walk(full);
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      yield full;
    }
  }
}

let files = 0;
let replacements = 0;
for await (const file of walk(DIST)) {
  const text = await readFile(file, 'utf8');
  let count = 0;
  const updated = text.replace(PATTERN, () => {
    count++;
    return NEW_NAME;
  });
  if (count) {
    await writeFile(file, updated, 'utf8');
    files++;
    replacements += count;
  }
}
console.log(`[compdf-rebrand] ${replacements} reemplazos en ${files} archivos (${DIST})`);
