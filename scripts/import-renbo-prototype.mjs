import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
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
const files = ['index.html', 'styles.css', 'app.js'];
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
const hashes = {};
for (const file of files.sort()) {
  const data = await readFile(path.join(source, file));
  const destination = path.join(target, 'vendor', file);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, data);
  hashes[file] = createHash('sha256').update(data).digest('hex');
}
// Embedded previews already resize with their viewport. Re-focusing the iframe must
// not cancel a power-button press through the original display-calibration listener.
const script = await readFile(path.join(source, 'app.js'), 'utf8');
const minimumHeight = 'Math.max(240,window.innerHeight-28)';
if (!script.includes(minimumHeight))
  throw new Error(
    'Review the upstream fit sizing before importing this version.',
  );
const focusResize = "  window.addEventListener('focus',resize);";
if (script.split(focusResize).length !== 2)
  throw new Error(
    'Review the upstream focus/resize adapter before importing this version.',
  );
await writeFile(
  path.join(target, 'runtime.js'),
  script
    .replace(focusResize, '')
    .replace(minimumHeight, 'Math.max(1,window.innerHeight-28)'),
);
const html = (await readFile(path.join(source, 'index.html'), 'utf8'))
  .replace('<head>', '<head>\n  <base href="./vendor/">')
  .replace(
    '</head>',
    '  <link rel="stylesheet" href="../portfolio.css">\n</head>',
  )
  .replace(/src="app\.js[^"]*"/, 'src="../runtime.js"')
  .replace('</body>', '  <script src="../portfolio.js"></script>\n</body>');
await writeFile(path.join(target, 'index.html'), html);
await writeFile(
  path.join(target, 'snapshot.json'),
  JSON.stringify(
    {
      project: path.basename(path.resolve(sourceRoot)),
      revision: execFileSync('git', ['-C', sourceRoot, 'rev-parse', 'HEAD'], {
        encoding: 'utf8',
      }).trim(),
      dirty: Boolean(
        execFileSync(
          'git',
          ['-C', sourceRoot, 'status', '--porcelain', '--', 'prototype'],
          { encoding: 'utf8' },
        ).trim(),
      ),
      sha256: hashes,
    },
    null,
    2,
  ) + '\n',
);
console.log(`Imported ${files.length} files to ${target}`);
