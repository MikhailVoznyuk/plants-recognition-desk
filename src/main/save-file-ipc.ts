// src/main/save-file-ipc.ts
import { app, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

function sanitize(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, '_');
}

type SavedFile = { path: string; fileUrl: string; name: string };
type Payload =
  | { name: string; buffer: ArrayBuffer; base64?: never }
  | { name: string; base64: string; buffer?: never };

ipcMain.handle('saveFileToProject', async (_e, payload: Payload): Promise<SavedFile> => {
  let nodeBuf: Buffer;

  if ('base64' in payload) {
    // поддержим и чистый base64, и data URL
    const raw = payload.base64.includes(',')
      ? payload.base64.split(',')[1]
      : payload.base64;
    nodeBuf = Buffer.from(raw.replace(/\s+/g, ''), 'base64');
  } else if ('buffer' in payload) {
    // нормализуем ArrayBuffer в Buffer
    const u8 = new Uint8Array(payload.buffer);
    nodeBuf = Buffer.from(u8);
  } else {
    throw new Error('No data provided');
  }

  const root = app.getPath('userData');
  const dir = path.join(root, 'uploads');
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, sanitize(payload.name));
  await fs.writeFile(filePath, nodeBuf);

  return {
    path: filePath,
    fileUrl: String(pathToFileURL(filePath)),
    name: payload.name,
  };
});
