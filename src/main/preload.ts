// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import type { Report } from '@/types/Report';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

type SavedFile = { path: string; fileUrl: string; name: string };

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  reports: {
    save: (r: Omit<Report, 'id' | 'date'> & Partial<Pick<Report, 'id' | 'date'>>) =>
      ipcRenderer.invoke('reports.save', r) as Promise<Report>,
    get: (id: string) => ipcRenderer.invoke('reports.get', id) as Promise<Report | null>,
    list: () => ipcRenderer.invoke('reports.list') as Promise<Report[]>,
    delete: (id: string) => ipcRenderer.invoke('reports.delete', id) as Promise<boolean>,
  },

  saveFileToProject(name: string, abOrB64: ArrayBuffer | string): Promise<SavedFile> {
    if (typeof abOrB64 === 'string') {
      return ipcRenderer.invoke('saveFileToProject', { name, base64: abOrB64 });
    }
    return ipcRenderer.invoke('saveFileToProject', { name, buffer: abOrB64 });
  },
  files: {
    readAsDataUrl(absPath: string) {
      return ipcRenderer.invoke(
        'file.readAsDataUrl',
        absPath,
      ) as Promise<string>;
    },
  },
  queue: {
    addFromBuffer: (name: string, buffer: ArrayBuffer, mime?: string) =>
      ipcRenderer.invoke('queue.addFromBuffer', { name, buffer, mime }),
    list: () => ipcRenderer.invoke('queue.list'),
    retry: (id: string) => ipcRenderer.invoke('queue.retry', id),
    clearDone: () => ipcRenderer.invoke('queue.clearDone'),
    triggerSync: () => ipcRenderer.send('queue.triggerSync'),
    onUpdate: (cb: (items: any) => void) => {
      const sub = (_e: any, items: any) => cb(items);
      ipcRenderer.on('queue:update', sub);
      return () => ipcRenderer.removeListener('queue:update', sub);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
