import { app, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

function sanitize(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, '_');
}

type SavedFile = { path: string; fileUrl: string; name: string };

ipcMain.handle(
  'saveFileToProject',
  async (_e, payload: { name: string; buffer: ArrayBuffer }): Promise<SavedFile> => {
    const root = app.getPath('userData');
    const dir = path.join(root, 'uploads');
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, sanitize(payload.name));
    await fs.writeFile(filePath, Buffer.from(payload.buffer));
    return {
      path: filePath,
      fileUrl: String(pathToFileURL(filePath)), // безопасно для пробелов и обратных слешей
      name: payload.name,
    };
  },
);
