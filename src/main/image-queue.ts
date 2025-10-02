import { app, ipcMain, webContents } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import Store from 'electron-store'; // v8 (CJS). Если v9, делай dynamic import
import { randomUUID } from 'crypto';
import type { Report } from '../types/Report'
import type { StoredImage } from '../types/stored-image';



// ================== НАСТРОЙКА API ==================
const API_BASE = 'http://81.17.154.25:8000';
const UPLOAD_URL = `${API_BASE}/process`;
const HEALTH_URL = `${API_BASE}/process`;
const CONCURRENCY = 1;

// ================== STORE ==================
type Schema = { queue: StoredImage[] };
const store = new Store<Schema>({ name: 'offline', defaults: { queue: [] } });

const getQueue = () => store.get('queue')!;
const setQueue = (q: StoredImage[]) => store.set('queue', q);

function broadcastQueue() {
  for (const wc of webContents.getAllWebContents()) {
    wc.send('queue:update', getQueue());
  }
}

function b64ToArrayBuffer(b64: string) {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8.buffer;
}

function upsert(item: StoredImage) {
  const q = getQueue();
  const idx = q.findIndex((x) => x.id === item.id);
  if (idx >= 0) q[idx] = item;
  else q.push(item);
  setQueue(q);
  broadcastQueue();
}

// ================== УТИЛИТЫ ==================
function now() {
  return Date.now();
}
function ms(n: number) {
  return n;
}
function backoff(retries: number) {
  const base = 2 ** Math.min(retries, 5); // 1,2,4,8,16,32
  const jitter = 0.25 + Math.random() * 0.5; // 0.25..0.75
  return ms(1000 * base * jitter);
}

async function isOnline(timeoutMs = 2000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs).unref?.();
  try {
    const res = await fetch(HEALTH_URL, {
      method: 'HEAD',
      signal: ctrl.signal,
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(t as any);
  }
}

// ================== СОХРАНЕНИЕ ФАЙЛА И ДОБАВЛЕНИЕ В ОЧЕРЕДЬ ==================
async function saveIncomingFile(name: string, buffer: ArrayBuffer) {
  const root = app.isPackaged ? app.getPath('userData') : process.cwd();
  const dir = path.join(root, 'uploads');
  await fs.mkdir(dir, { recursive: true });
  // небольшая санитация
  const safe = name.replace(/[/\\?%*:|"<>]/g, '_');
  const dst = path.join(dir, safe);
  await fs.writeFile(dst, Buffer.from(buffer));
  return dst;
}

function guessMime(p: string) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

// ================== ОТПРАВКА ОДНОГО ЭЛЕМЕНТА ==================
async function uploadOne(item: StoredImage) {
  const qItem: StoredImage = { ...item, status: 'uploading', updatedAt: now() };
  upsert(qItem);

  try {
    const buf = await fs.readFile(qItem.path); // для 1-4 фото норм
    const blob = new Blob([buf], { type: qItem.mime || guessMime(qItem.path) });
    const fd = new FormData();
    fd.append('file', blob, path.basename(qItem.path));

    const res = await fetch(UPLOAD_URL, { method: 'POST', body: fd });

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      throw new Error(`HTTP ${res.status} ${text}`);
    }
    console.log('GOT RES');
    const json = await res.json();

    const { report, image } = json;


    const ext = image.mime === 'image/png' ? '.png' : '.jpg';

    const dst = await window.electron.saveFileToProject(
      `processed-${report.id}${ext}`,
      image.buffer,
    );

    const final: Report = { ...report, imageFile: dst };

    await window.electron.reports.save(final);
    upsert({
      ...qItem,
      status: 'done',
      serverResult: json,
      updatedAt: now(),
      lastError: undefined,
    });
  } catch (err: any) {
    const retries = (qItem.retries ?? 0) + 1;
    upsert({
      ...qItem,
      status: 'error',
      retries,
      nextAttemptAt: now() + backoff(retries),
      updatedAt: now(),
      lastError: String(err?.message ?? err),
    });
  }
}

// ================== ДВИГАТЕЛЬ ОЧЕРЕДИ ==================
let running = 0;
let ticking = false;

async function tick() {
  if (ticking) return;
  ticking = true;
  try {

    while (running < CONCURRENCY) {
      const q = getQueue();
      const next = q.find(
        (x) =>
          (x.status === 'queued' || x.status === 'error') &&
          (!x.nextAttemptAt || x.nextAttemptAt <= now()),
      );
      if (!next) break;
      running++;
      // не жрать стек
      void uploadOne(next).finally(() => {
        running--;
        setImmediate(() => tick());
      });
    }
  } finally {
    ticking = false;
  }
}

// периодически пытаться
setInterval(() => {
  tick();
}, 4000).unref?.();

// ================== IPC ==================
// Добавить картинку из рендера: сохраняем файл и ставим в очередь
ipcMain.handle(
  'queue.addFromBuffer',
  async (_e, payload: { name: string; buffer: ArrayBuffer; mime?: string }) => {
    const abs = await saveIncomingFile(payload.name, payload.buffer);
    console.log('Added file')
    const item: StoredImage = {
      id: randomUUID(),
      path: abs,
      mime: payload.mime || guessMime(abs),
      status: 'queued',
      retries: 0,
      createdAt: now(),
      updatedAt: now(),
    };
    upsert(item);
    // сдвинем двигатель
    void tick();
    return item;
  },
);

// Список, повтор, очистки
ipcMain.handle('queue.list', () => getQueue());
ipcMain.handle('queue.retry', (_e, id: string) => {
  const q = getQueue();
  const it = q.find((x) => x.id === id);
  if (!it) return false;
  it.status = 'queued';
  it.nextAttemptAt = undefined;
  it.updatedAt = now();
  setQueue(q);
  broadcastQueue();
  void tick();
  return true;
});
ipcMain.handle('queue.clearDone', () => {
  const q = getQueue().filter((x) => x.status !== 'done');
  setQueue(q);
  broadcastQueue();
  return true;
});
ipcMain.on('queue.triggerSync', () => {
  tick();
});
