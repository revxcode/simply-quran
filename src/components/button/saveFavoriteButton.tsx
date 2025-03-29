import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import useStoreFavoriteSurah from "@/stores/storeFavoriteSurah";

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

const saveFavoriteSurah = (surah: Surah) => {
  const checkLocalStorage = localStorage.getItem("favoriteSurah");

  if (!checkLocalStorage) {
    localStorage.setItem("favoriteSurah", JSON.stringify([{ ...surah, favorite: true }]));
  } else {
    const surahFavorite = JSON.parse(checkLocalStorage) as Surah[];
    const checkSurah = surahFavorite.find((s) => s.nomor === surah.nomor);

    if (checkSurah) {
      const updatedSurah = surahFavorite.map((s) => {
        if (s.nomor === surah.nomor) {
          return { ...s, favorite: !s.favorite };
        }
        return s;
      });
      localStorage.setItem("favoriteSurah", JSON.stringify(updatedSurah));
    } else {
      localStorage.setItem("favoriteSurah", JSON.stringify([...surahFavorite, { ...surah, favorite: true }]));
    }
  }
}

export default function SaveFavoriteButton(surah: Surah) {
  const { favoriteSurah, setFavoriteSurah } = useStoreFavoriteSurah();
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const checkLocalStorage = localStorage.getItem("favoriteSurah");
    if (checkLocalStorage) {
      const surahFavorite = JSON.parse(checkLocalStorage) as Surah[];
      const checkSurah = surahFavorite.find((s) => s.nomor === surah.nomor);
      if (checkSurah) {
        setFavorite(checkSurah.favorite);
      } else {
        setFavorite(false);
      }
    }
  }, [favoriteSurah]);

  return (
    <button type="button"
      onClick={() => {
        setFavorite(!favorite)
        saveFavoriteSurah(surah);
      }}
      className="cursor-pointer absolute top-4 right-4 z-10"
    >
      <Heart className={"cursor-pointer hover:scale-105 " + (favorite ? "fill-emerald-400 stroke-emerald-300" : "stroke-neutral-300")} />
    </button >
  );
}