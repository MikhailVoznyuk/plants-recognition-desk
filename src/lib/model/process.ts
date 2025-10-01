import createReport from '@/lib/dev/createReport';
import type PickedImage from '@/types/PickedImage';

export default async function process(image: PickedImage): Promise<unknown> {
  try {
    const report = await createReport(image);
    await window.electron.reports.save(report);
    console.log('Done')
    return true;
  } catch (err) {
    return err;
  }
}
