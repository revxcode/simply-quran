"use client"

import type { Surah } from "@/types/Surah";
import AudioPlayer from "@/components/audio/audioPlayer";
import PrevNextSurah from "@/components/button/prevNextSurah";
import MainLayout from "@/components/layouts/mainLayout";
import { useEffect, useRef, useState } from "react";
import { AyatCard, AyatCardSkeleton } from "@/components/card/ayatCard";

const fetchSurah = async (id: number) => {
  const host = process.env.NEXT_PUBLIC_HOST_NAME;
  const response = await fetch(`${host}/api/quran/surah/${id}`);
  const data = await response.json();
  return data;
};

const fetchAyat = async (id: number, s: number, n: number) => {
  const host = process.env.NEXT_PUBLIC_HOST_NAME;
  const response = await fetch(`${host}/api/quran/surah/${id}/ayat?start=${s}&end=${n}`);
  const data = await response.json();
  return data;
};

export default function SurahPage({ params }: {
  params: Promise<{ id: number }>
}) {
  const [data, setData] = useState<Surah>({} as Surah);
  const [loading, setLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    params.then(async ({ id }) => {
      const surah = await fetchSurah(id);
      const ayat = await fetchAyat(id, 1, 10);
      setData({
        ...surah,
        ayat: ayat,
      });
      setLoading(false);
    });

    if (!lastElementRef.current) return;

    const loadMoreData = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading) {
        // Jika elemen terakhir terlihat, ambil data berikutnya
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(loadMoreData, {
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    // Bersihkan observer ketika komponen unmount
    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.disconnect();
      }
    };

  }, [loading]);

  useEffect(() => {
    if (page > 1) {
      fetchAyat(data.nomor, (page - 1) * 10 + 1, page * 10).then((ayat) => {
        setData({
          ...data,
          ayat: [...data.ayat, ...ayat],
        });
      });
    }
  }, [page]);

  if (loading) {
    return <div className="flex w-full min-h-screen items-center justify-center">
      <span className="text-xl font-bold text-neutral-800">
        Loading...
      </span>
    </div>;
  }

  return (
    <MainLayout>
      <div className="w-full h-fit bg-white rounded-2xl p-8">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-emerald-400 bg-emerald-50 px-2 rounded-full">{data.nomor}</span>
          <span className="text-3xl font-bold text-neutral-800">{data.nama}</span>
        </div>
        <div className="flex justify-between items-center py-4">
          <div className="flex flex-col">
            <span className="text-xl text-neutral-600 font-bold">{data.nama_latin}</span>
            <span className="text-sm text-neutral-400">{data.arti}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 text-end">{data.jumlah_ayat} Ayat</span>
            <AudioPlayer audioSrc={data.audio} />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-8 py-8">
          {data.ayat.map((ayat: any) => (
            <AyatCard key={ayat.nomor} ayat={ayat} />
          ))}
        </div>
        <AyatCardSkeleton ref={lastElementRef} />
        <PrevNextSurah
          prev={data.nomor - 1}
          next={data.nomor + 1}
        />
      </div >
    </MainLayout >
  );
}