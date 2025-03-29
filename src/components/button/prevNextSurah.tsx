import Link from "next/link";

export default function PrevNextSurah({ prev, next }: { prev: number, next: number }) {

  return (
    <div className="flex justify-between items-center px-8">
      <Link
        href={`/quran/surah/${prev < 1 ? 1 : prev}`}
        className={"flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg " +
          (prev < 1 ? "cursor-not-allowed bg-neutral-300 dark:bg-neutral-700" : "")}>
        <span className="text-2xl">←</span>
        <span className="text-lg hidden md:block">Sebelumnya</span>
      </Link>
      <Link
        href={`/quran/surah/${next > 114 ? 114 : next}`}
        className={"flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg " +
          (next > 114 ? "cursor-not-allowed bg-neutral-300 dark:bg-neutral-700" : "")}>
        <span className="text-lg hidden md:block">Selanjutnya</span>
        <span className="text-2xl">→</span>
      </Link>
    </div>
  );
}