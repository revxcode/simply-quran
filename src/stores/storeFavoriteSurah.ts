import { create } from 'zustand';

interface SurahFavorite {
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

interface FavoriteSurahState {
  favoriteSurah: SurahFavorite[];
  setFavoriteSurah: (surah: SurahFavorite[]) => void;
}

const useStoreFavoriteSurah = create<FavoriteSurahState>((set) => ({
  favoriteSurah: [],
  setFavoriteSurah: (surah: SurahFavorite[]) => set(() => ({ favoriteSurah: surah })),
}));

export default useStoreFavoriteSurah;