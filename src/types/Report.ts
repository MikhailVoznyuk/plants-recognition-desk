type Score = 1 | 2 | 3

export type ReportObject = {
    plantType: 'tree' | 'shrub', // Можно 0 или 1
    species: string,
    healthScore: Score,
    cavityScore: Score,
    crackScore: Score,
    mechDamageScore: Score,
    fungusScore: Score,
    description: string,
}

export type Report = {
    id: string;
    date: string;
    imageFile: string;
    objects: ReportObject[];
}

export type LoadedReport = {
  id: string;
  date: string;
  objects: ReportObject[];
  image: {
    mime: string;
    base64: string;
  }
}

