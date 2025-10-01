import { ipcMain } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function mimeByExt(p: string) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

ipcMain.handle('file.readAsDataUrl', async (_e, input: string) => {
  const absPath = input.startsWith('file:')
    ? fileURLToPath(input)
    : input;
  const buf = await fs.readFile(absPath);

  return `data:${mimeByExt(absPath)};base64,${buf.toString('base64')}`;
});
