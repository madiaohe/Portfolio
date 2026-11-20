import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Explicitly import only the self-contained prototype, never customer source documents.
const sourceRoot = process.argv[2];
if (!sourceRoot)
  throw new Error(
    'Usage: node scripts/import-renbo-prototype.mjs <project-directory>',
  );
const source = path.resolve(sourceRoot, 'prototype');
const target = fileURLToPath(
  new URL('../public/prototypes/renbo-oil-mist/', import.meta.url),
);
const originalHtml = await readFile(path.join(source, 'index.html'), 'utf8');
const files = ['index.html', 'styles.css', 'app.js'];
if (originalHtml.includes('href="colors.css')) files.push('colors.css');

async function assets(directory) {
  for (const entry of await readdir(path.join(source, directory), {
    withFileTypes: true,
  })) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) await assets(relative);
    else if (/\.(svg|png|txt)$/.test(entry.name)) files.push(relative);
  }
}
await assets('assets');
const sources = new Map(
  await Promise.all(
    files
      .sort()
      .map(async (file) => [file, await readFile(path.join(source, file))]),
  ),
);
const script = sources.get('app.js').toString('utf8');
const minimumHeight = 'Math.max(240,window.innerHeight-28)';
if (!script.includes(minimumHeight))
  throw new Error(
    'Review the upstream fit sizing before importing this version.',
  );
// Older branches resize on focus, which can cancel the initial power-button press.
const runtime = script
  .replace("  window.addEventListener('focus',resize);", '')
  .replace(minimumHeight, 'Math.max(1,window.innerHeight-28)');
const html = originalHtml
  .replace('<head>', '<head>\n  <base href="./vendor/">')
  .replace(
    '</head>',
    '  <link rel="stylesheet" href="../portfolio.css">\n</head>',
  )
  .replace(/src="app\.js[^"]*"/, 'src="../runtime.js"')
  .replace('</body>', '  <script src="../portfolio.js"></script>\n</body>');
const git = (...args) =>
  execFileSync('git', ['-C', sourceRoot, ...args], { encoding: 'utf8' }).trim();
const snapshot = {
  project: path.basename(path.resolve(sourceRoot)),
  branch: git('branch', '--show-current') || null,
  revision: git('rev-parse', 'HEAD'),
  dirty: Boolean(git('status', '--porcelain', '--', 'prototype')),
  sha256: Object.fromEntries(
    Array.from(sources, ([file, data]) => [
      file,
      createHash('sha256').update(data).digest('hex'),
    ]),
  ),
};

const vendor = path.join(target, 'vendor');
await rm(vendor, { recursive: true, force: true });
for (const [file, data] of sources) {
  const destination = path.join(vendor, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, data);
}
await writeFile(path.join(target, 'runtime.js'), runtime);
await writeFile(path.join(target, 'index.html'), html);
await writeFile(
  path.join(target, 'snapshot.json'),
  JSON.stringify(snapshot, null, 2) + '\n',
);
console.log(`Imported ${files.length} files to ${target}`);
