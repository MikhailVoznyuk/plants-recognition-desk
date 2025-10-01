import type { Report } from '@/types/Report';

type ReportUpsert = Omit<Report, 'id' | 'date'> & {
  id?: Report['id'];
  date?: Report['date'];
};

type Channels = 'ipc-example';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, ...args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): () => void; // отписка
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
      reports: {
        save(r: ReportUpsert): Promise<Report>;
        get(id: string): Promise<Report | null>;
        list(): Promise<Report[]>;
        delete(id: string): Promise<boolean>;
      };
      saveFileToProject: (name: string, buf: ArrayBuffer) => Promise<{ path: string; fileUrl: string; name: string }>;
      files: {
        readAsDataUrl(absPath: string): Promise<string>;
      };
    };
  }
}

export {};

/* import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
  }
}

export {};


 */
