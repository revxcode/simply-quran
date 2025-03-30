"use client"

import type { Surah } from "@/types/Surah";
import AudioPlayer from "@/components/audio/audioPlayer";
import PrevNextSurah from "@/components/button/prevNextSurah";
import MainLayout from "@/components/layouts/mainLayout";
import { useEffect, useRef, useState } from "react";
import { AyatCard, AyatCardSkeleton } from "@/components/card/ayatCard";

const fetchSurah = async (id: number) => {
  const response = await fetch(`/api/quran/surah/${id}`);
  const data = await response.json();
  return data;
};

const fetchAyat = async (id: number, s: number, n: number) => {
  const response = await fetch(`/api/quran/surah/${id}/ayat?start=${s}&end=${n}`);
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
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
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

  return (
    <MainLayout>
      <div className="w-full h-fit bg-white dark:bg-inherit rounded-2xl md:p-8 md:w-3/4 mx-auto">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-emerald-400 bg-emerald-50 dark:bg-neutral-800 px-2 rounded-full">{data.nomor}</span>
          <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-amiri">{data.nama}</span>
        </div>
        <div className="flex flex-col justify-between items-center py-4">
          <div className="flex flex-col text-center gap-2">
            <span className="text-4xl text-neutral-600 dark:text-neutral-200 font-bold">{data.nama_latin}</span>
            <span className="text-md text-neutral-400 dark:text-neutral-400">{data.arti}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-200 text-end">{data.jumlah_ayat} Ayat</span>
            <AudioPlayer audioSrc={data.audio} />
          </div>
          <div className="flex justify-center items-center pt-16 tracking-wider"
            hidden={data.nomor === 1 || data.nomor === 9}
          >
            <span className="text-neutral-800 dark:text-neutral-200 font-ayat text-4xl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 mt-8 py-8">
          {
            loading ? (
              Array.from({ length: 10 }, (_, index) => (
                <AyatCardSkeleton
                  key={index}
                />
              ))
            ) : data.ayat.map((ayat, index) => (
              <AyatCard
                key={index}
                ayat={ayat}
              />
            ))
          }
          <div
            ref={lastElementRef}
            className="absolute bottom-[35rem] w-full h-[300vh] bg-transparent"
            hidden={data.jumlah_ayat === data?.ayat?.length || data?.ayat?.length < 10}
          >
          </div>
        </div>
        <PrevNextSurah
          prev={data.nomor - 1}
          next={data.nomor + 1}
        />
      </div >
    </MainLayout >
  );
}