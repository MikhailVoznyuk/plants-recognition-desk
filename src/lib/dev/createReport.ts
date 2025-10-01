import type { Report, ReportObject } from '@/types/Report';
import type PickedImage from '@/types/PickedImage';


const objects: ReportObject[] = [
  {
    plantType: 'tree',
    species: 'Quercus robur',
    healthScore: 2,
    cavityScore: 1,
    crackScore: 1,
    mechDamageScore: 2,
    fungusScore: 1,
    description: 'Небольшие трещины на коре',
  },
  {
    plantType: 'shrub',
    species: 'Cust',
    healthScore: 3,
    cavityScore: 1,
    crackScore: 3,
    mechDamageScore: 3,
    fungusScore: 1,
    description:
      'Дерево является здоровым по большинству показателей. Присутствуют полости, не представляющие опасности для жизни дерева. Показатели гнили в норме. ',
  },
  {
    plantType: 'tree',
    species: 'Dub',
    healthScore: 2,
    cavityScore: 1,
    crackScore: 2,
    mechDamageScore: 1,
    fungusScore: 3,
    description:
      'Дерево является здоровым по большинству показателей. Присутствуют полости, не представляющие опасности для жизни дерева. Показатели гнили в норме. ',
  },
];
export default async function createReport(
  image: PickedImage,
): Promise<Report> {

  const currentDate = new Date();
  const strDate = `${currentDate.getDate()}.${currentDate.getMonth()}. ${currentDate.getFullYear()}`;
  const timeout = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 5000);
  });
  const loadedFile = await window.electron.saveFileToProject(image.filename, image.fileBuffer);

  return {
    id: crypto.randomUUID(),
    date: strDate,
    imageFile: loadedFile.fileUrl,
    objects,
  };
}
