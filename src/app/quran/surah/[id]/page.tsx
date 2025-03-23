import AudioPlayer from "@/components/audio/audioPlayer";
import PrevNextSurah from "@/components/button/prevNextSurah";
import MainLayout from "@/components/layouts/mainLayout";
import { cache } from "react";

const fetchSurah = cache(async (id: number) => {
  const host = process.env.NEXT_PUBLIC_HOST_NAME;
  console.log(host);
  const response = await fetch(`${host}/api/quran/surah/${id}`);
  const data = await response.json();
  return data;
});

export default async function SurahPage({ params }: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params;
  const data = await fetchSurah(id);

  return (
    <MainLayout>
      <div className="w-full h-full bg-white rounded-2xl p-8">
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
            <div key={ayat.nomor}>
              <div className="flex flex-col gap-2 py-4">
                <div className="flex justify-between w-full">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex justify-center items-center aspect-square">
                    <span className="text-lg text-white font-bold">{ayat.nomor}</span>
                  </div>
                  <span className="text-4xl text-neutral-800 text-end py-2 px-2">{ayat.ar}</span>
                </div>
                <div className="flex w-full flex-col">
                  <span className="text-md text-neutral-500 text-start py-2">{ayat.idn}</span>
                </div>
                <div className="w-full border-b border-neutral-200 my-4"></div>
              </div>
            </div>
          ))}
          <PrevNextSurah
            prev={data.nomor - 1}
            next={data.nomor + 1}
          />
        </div>
      </div >
    </MainLayout >
  );
}