"use client";

import MainLayout from "@/components/layouts/mainLayout";
import { cache, useEffect } from "react";
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

const saveAllOnLocalStorage = (key: string, data: Surah[]) => {
  localStorage
    .setItem(key, JSON.stringify(data));
}

const fetchSurahs = cache(async (): Promise<Surah[]> => {
  const checkLocalStorage = localStorage.getItem("surahs");

  if (!checkLocalStorage) {
    const response = await fetch("/api/quran");
    const data = await response.json();

    // Save to localStorage
    saveAllOnLocalStorage("surahs",
      [...data].map((surah: any) => ({ ...surah, favorite: false }))
    );

    return [...data].map((surah: any) => ({ ...surah, favorite: false }));
  } else {
    return JSON.parse(checkLocalStorage);
  }
});

export default function QuranPage() {
  const { surahs, setSurahs } = useStoreSurahs();
  useEffect(() => {
    fetchSurahs().then((data) => {
      setSurahs(data);
    });
  }, []);

  return (
    <MainLayout>
      <div className="grid md:grid-cols-3 w-full h-fit gap-4 p-4">
        {surahs.map((surah) => (
          <SurahCard key={surah.nomor} surah={surah} />
        ))}
      </div>
    </MainLayout >
  );
}
