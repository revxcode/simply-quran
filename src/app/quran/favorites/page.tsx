"use client";

import MainLayout from "@/components/layouts/mainLayout";
import { useEffect } from "react";
import { useStoreSurahs } from "@/stores/storeSurahs";
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

const fetchSurahFavoriteOnly = async (): Promise<Surah[]> => {
  const checkLocalStorage = localStorage.getItem("surahs");

  if (!checkLocalStorage) {
    return [];
  } else {
    return JSON.parse(checkLocalStorage);
  }
}

export default function QuranPage() {
  const { surahs, setSurahs } = useStoreSurahs();

  useEffect(() => {
    fetchSurahFavoriteOnly().then((data) => {
      setSurahs(data);
    });
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-3 w-full h-fit gap-4">
        {surahs.map((surah) => (
          <SurahCard key={surah.nomor} surah={surah} hidden={!surah.favorite} />
        ))}
      </div>
    </MainLayout >
  );
}
