import createReport from '@/lib/dev/createReport';
import type PickedImage from '@/types/PickedImage';

export default async function process(image: PickedImage): Promise<unknown> {
  try {
    await window.electron.queue.addFromBuffer(image.filename, image.fileBuffer);

    window.electron.queue.triggerSync();
    return true;
  } catch (err) {
    return err;
  }
}
