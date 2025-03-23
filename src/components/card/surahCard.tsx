import Link from "next/link";
import SaveFavoriteButton from "../button/saveFavoriteButton";

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

export default function SurahCard({
  surah,
  hidden,
}: {
  surah: Surah;
  hidden?: boolean;
}) {
  return (
    <div
      key={surah.nomor}
      hidden={hidden}
      className="relative flex flex-col w-full h-32 bg-white rounded-2xl gap-4 hover:shadow-lg duration-150 outline-2 hover:outline-emerald-300 z-0"
    >
      <div className="absolute top-4 left-4 flex justify-center items-center w-8 h-8 bg-emerald-50 rounded-full aspect-square z-10">
        <span className="text-lg font-bold text-emerald-400 z-10">{surah.nomor}</span>
      </div>
      <SaveFavoriteButton {...surah} />
      <Link
        href={`/quran/surah/${surah.nomor}`}
        className="absolute rounded-lg duration-200 p-4 pt-16 w-full h-full z-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 font-bold">{surah.nama_latin}</span>
            <span className="text-sm text-neutral-400">{surah.arti}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-neutral-600 font-bold text-end">{surah.nama}</span>
            <span className="text-sm text-neutral-400">{surah.jumlah_ayat} Ayat</span>
          </div>
        </div>
      </Link>
    </div>
  );
}