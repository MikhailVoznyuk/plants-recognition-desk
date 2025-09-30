import { app, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';

function sanitize(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, '_');
}

ipcMain.handle(
  'saveFileToProject',
  async (_e, payload: { name: string; buffer: ArrayBuffer }) => {
    const root = app.getPath('userData');
    const dir = path.join(root, 'uploads');
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, sanitize(payload.name));
    await fs.writeFile(filePath, Buffer.from(payload.buffer));
    return filePath;
  },
);
