import fs from 'fs';
import path from 'path';

async function fetchSurah(surahNumber: number) {
  try {
    const response = await fetch('https://quran-api.santrikoding.com/api/surah/' + surahNumber);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

for (let index = 1; index <= 114; index++) {
  const surah = await fetchSurah(index);

  fs.writeFileSync(path.join(__dirname, `../data/surahs/surah-${index}.json`), JSON.stringify(surah));
  console.log(`Surah ${index} has been saved to data/surahs/surah-${index}.json`);
}
