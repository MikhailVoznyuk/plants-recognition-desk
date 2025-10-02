export type StoredImageStatus = 'queued' | 'uploading' | 'done' | 'error';

export type StoredImage = {
  id: string;
  path: string;           // абсолютный путь до файла в uploads
  mime: string;           // image/jpeg, image/png …
  status: StoredImageStatus;
  retries: number;        // сколько раз пытались
  nextAttemptAt?: number; // timestamp, когда можно будет ретраить
  createdAt: number;
  updatedAt: number;
  serverResult?: unknown; // что вернёт ваш бэкенд
  lastError?: string;
};
