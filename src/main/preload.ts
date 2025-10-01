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

  saveFileToProject(name: string, buf: ArrayBuffer): Promise<SavedFile> {
    return ipcRenderer.invoke('saveFileToProject', { name, buffer: buf });
  },
  files: {
    readAsDataUrl(absPath: string) {
      return ipcRenderer.invoke(
        'file.readAsDataUrl',
        absPath,
      ) as Promise<string>;
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
