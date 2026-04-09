import { access, copyFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const indexOutputPath = resolve(projectRoot, 'dist', 'index.html');
const notFoundOutputPath = resolve(projectRoot, 'dist', '404.html');

await access(indexOutputPath, constants.R_OK);
await copyFile(indexOutputPath, notFoundOutputPath);

console.log('Generated dist/404.html from dist/index.html');
