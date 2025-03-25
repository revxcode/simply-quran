import fs from 'fs';
import path from 'path';

interface Ayat {
  id: number;
  surah: number;
  nomor: number;
  ar: string;
  tr: string;
  idn: string;
}

interface SuratSelanjutnya {
  id: number;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

interface SuratSebelumnya {
  id: number;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

interface Surah {
  id: number;
  nomor: number;
  nama: string;
  jumlah_ayat: number;
  nama_latin: string;
  arti: string;
  tempat_turun: string;
  deskripsi: string;
  audio: string;
  ayat: Ayat[];
  surat_selanjutnya: SuratSelanjutnya;
  surat_sebelumnya: SuratSebelumnya;
}

async function fetchSurah(surahNumber: number): Promise<Surah | undefined> {
  try {
    const response = await fetch('https://quran-api.santrikoding.com/api/surah/' + surahNumber);
    const data = await response.json();
    return {
      id: data.data.id,
      nomor: data.data.nomor,
      nama: data.data.nama,
      jumlah_ayat: data.data.jumlah_ayat,
      nama_latin: data.data.nama_latin,
      arti: data.data.arti,
      tempat_turun: data.data.tempat_turun,
      deskripsi: data.data.deskripsi,
      audio: data.data.audio,
      ayat: data.data.ayat,
      surat_selanjutnya: data.data.surat_selanjutnya,
      surat_sebelumnya: data.data.surat_sebelumnya,
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

for (let index = 1; index <= 114; index++) {
  const surah = await fetchSurah(index);

  fs.writeFileSync(path.join(__dirname, `../data/surahs/surah-${index}.json`), JSON.stringify(surah));
  console.log(`Surah ${index} has been saved to data/surahs/surah-${index}.json`);
}
