import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

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
  // update surahs favorite true to false, false to true
  const checkLocalStorage = localStorage.getItem("surahs");
  if (checkLocalStorage) {
    const surahs = JSON.parse(checkLocalStorage);
    const updatedSurahs = surahs.map((item: Surah) => {
      if (item.nomor === surah.nomor) {
        return { ...item, favorite: !item.favorite };
      }
      return item;
    });
    localStorage.setItem("surahs", JSON.stringify(updatedSurahs));
  }

}

export default function SaveFavoriteButton(surah: Surah) {
  const [favorite, setFavorite] = useState(surah.favorite);

  useEffect(() => {
    setFavorite(surah.favorite);
  }, [surah.favorite]);

  return (
    <button type="button"
      onClick={() => {
        saveFavoriteSurah(surah);
        setFavorite(!favorite);
      }}
      className="cursor-pointer absolute top-4 right-4 z-10"
    >
      <Heart className={"cursor-pointer hover:scale-105 " + (favorite ? "fill-emerald-400 stroke-emerald-300" : "stroke-neutral-300")} />
    </button>
  );
}