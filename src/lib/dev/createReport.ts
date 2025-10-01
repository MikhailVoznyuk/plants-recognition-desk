import type Report from '@/types/Report';
import type { ReportObject } from '@/types/Report';
import type PickedImage from '@/types/PickedImage';

const objects: ReportObject[] = [
  {
    plantType: 'tree',
    species: 'Betula',
    healthScore: 1,
    cavityScore: 2,
    crackScore: 1,
    mechDamageScore: 2,
    fungusScore: 1,
    description:
      'Дерево является здоровым по большинству показателей. Присутствуют полости, не представляющие опасности для жизни дерева. Показатели гнили в норме. ',
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

  return {
    id: Math.floor(Math.random() * 1000),
    date: strDate,
    imageFile: image.path,
    objects,
  };
}
