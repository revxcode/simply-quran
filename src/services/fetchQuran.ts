import fs from 'fs';

async function fetchQuran() {
  try {
    // https://quran-api.santrikoding.com/api/surah
    const response = await fetch('https://quran-api.santrikoding.com/api/surah');
    const data = await response.json();
    fs.writeFileSync('quran.json', JSON.stringify(data));
    console.log('Quran data fetched successfully');
  } catch (error) {
    console.log(error);
  }
}

fetchQuran();