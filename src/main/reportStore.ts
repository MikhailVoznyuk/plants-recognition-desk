import { ipcMain } from 'electron';
import Store from 'electron-store';
import { randomUUID } from 'node:crypto';
import type { Report } from '@/types/Report';

type Schema = Record<string, unknown>; // electron-store не требует строгой схемы
const store = new Store<Schema>({ name: 'reports' }); // файл reports.json

const KEY = (id: string) => `report:${id}`;

function saveReport(
  input: Omit<Report, 'id' | 'date'> & Partial<Pick<Report, 'id' | 'date'>>,
): Report {
  const id = input.id || randomUUID();
  const date = input.date || new Date().toISOString();
  const report: Report = { ...input, id, date } as Report;
  store.set(KEY(id), report);
  return report;
}

function getReport(id: string): Report | null {
  return (store.get(KEY(id)) as Report) || null;
}

function deleteReport(id: string): boolean {
  if (!store.has(KEY(id))) return false;
  store.delete(KEY(id));
  return true;
}

function listReports(): Report[] {
  const all = store.store; // весь объект
  const reports: Report[] = [];
  for (const [k, v] of Object.entries(all)) {
    if (k.startsWith('report:')) reports.push(v as Report);
  }
  // новые сверху
  reports.sort((a, b) => b.date.localeCompare(a.date));
  return reports;
}

// IPC
ipcMain.handle(
  'reports.save',
  (
    _e,
    payload: Omit<Report, 'id' | 'date'> & Partial<Pick<Report, 'id' | 'date'>>,
  ) => {
  return saveReport(payload);
});

ipcMain.handle('reports.get', (_e, id: string) => {
  return getReport(id);
});

ipcMain.handle('reports.list', () => {
  return listReports();
});

ipcMain.handle('reports.delete', (_e, id: string) => {
  return deleteReport(id);
});
