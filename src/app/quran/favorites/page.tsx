"use client";

import MainLayout from "@/components/layouts/mainLayout";
import { useEffect } from "react";
import useStoreFavoriteSurah from "@/stores/storeFavoriteSurah";
import SurahCard from "@/components/card/surahCard";

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

const getSurahFavoriteOnly = async (): Promise<Surah[]> => {
  const checkLocalStorage = localStorage.getItem("favoriteSurah");

  if (!checkLocalStorage) {
    return [];
  } else {
    const surahs = JSON.parse(checkLocalStorage) as Surah[];
    const surahFavorite = surahs.filter((surah) => surah.favorite === true);
    return surahFavorite;
  }
}

export default function QuranPage() {
  const { favoriteSurah, setFavoriteSurah } = useStoreFavoriteSurah();

  useEffect(() => {
    const fetchSurah = async () => {
      const surahFavorite = await getSurahFavoriteOnly();
      setFavoriteSurah(surahFavorite);
    }

    fetchSurah();
  }, [setFavoriteSurah]);

  if (favoriteSurah.length === 0) {
    return (
      <MainLayout>
        <div className="w-full h-full p-4 flex justify-center items-center">
          <h1 className="text-center text-2xl text-neutral-500">
            Favorite Surah is empty
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid md:grid-cols-3 w-full h-fit gap-4 p-4">
        {favoriteSurah.map((surah) => (
          <SurahCard
            key={surah.nomor}
            surah={surah}
            hidden={!surah.favorite}
          />
        ))}
      </div>
    </MainLayout >
  );
}
