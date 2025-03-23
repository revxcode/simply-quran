"use client";

import { useRouter } from "next/navigation";

export default function PrevNextSurah({ prev, next }: { prev: number, next: number }) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-8">
      <button
        type="button"
        onClick={() => router.push(`/quran/${prev}`)}
        disabled={prev === 0}
        className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg cursor-pointer">
        <span className="text-2xl">←</span>
        <span className="text-lg">Sebelumnya</span>
      </button>
      <button
        type="button"
        onClick={() => router.push(`/quran/${next}`)}
        disabled={next === 114}
        className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg cursor-pointer">
        <span className="text-lg">Selanjutnya</span>
        <span className="text-2xl">→</span>
      </button>
    </div>
  );
}