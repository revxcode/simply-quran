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

export type {
  Ayat,
  SuratSelanjutnya,
  SuratSebelumnya,
  Surah
}