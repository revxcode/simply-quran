import { create } from "zustand";

interface Surah {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
  favorite: boolean;
}

interface StoreSurahsState {
  surahs: Surah[];
  setSurahs: (surahs: Surah[]) => void;
}

export const useStoreSurahs = create<StoreSurahsState>((set) => {
  return {
    surahs: [],
    setSurahs: (surahs: Surah[]) => set({ surahs }),
  };
});
