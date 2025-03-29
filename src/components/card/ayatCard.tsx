import type { Ayat } from "@/types/Surah";

export function AyatCard({ ayat }: { ayat: Ayat }) {
  return (
    <div className="flex flex-col gap-2 py-4 animate-fade-in">
      <div className="flex justify-between w-full">
        <div className="w-12 h-12 flex justify-center items-center mt-6">
          <span className="text-4xl md:text-6xl font-ayat text-emerald-600">{ayat.nomor}</span>
        </div>
        <span className="text-2xl md:text-4xl text-neutral-800 dark:text-neutral-200 text-end py-2 px-2 font-ayat leading-12 md:leading-24">{ayat.ar}</span>
      </div>
      <div className="flex w-full flex-col">
        <span className="md:text-md text-neutral-500 dark:text-neutral-400 text-start py-2">{ayat.idn}</span>
      </div>
      <div className="w-full border-b border-neutral-200 my-4"></div>
    </div>
  );
}

export function AyatCardSkeleton({ ref, hidden }: { ref?: any, hidden?: boolean }) {
  return (
    <div
      ref={ref}
      hidden={hidden}
      className="w-full h-40">
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between w-full animate-pulse">
          <div className="w-8 h-8 bg-neutral-300 dark:bg-neutral-700 rounded-full flex justify-center items-center aspect-square">
            <span className="text-lg text-neutral-400 font-bold">0</span>
          </div>
          <span className="w-1/2 h-8 bg-neutral-300 dark:bg-neutral-700 rounded-md"></span>
        </div>
        <div className="flex w-full flex-col animate-pulse">
          <span className="w-3/4 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-md"></span>
        </div>
        <div className="w-full border-b border-neutral-200 my-4 animate-pulse">
          <div className="w-full h-1 bg-neutral-300 dark:bg-neutral-700 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}