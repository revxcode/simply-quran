import type { Ayat } from "@/types/Surah";

export function AyatCard({ ayat }: { ayat: Ayat }) {
  return (
    <div>
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between w-full">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex justify-center items-center aspect-square">
            <span className="text-lg text-white font-bold">{ayat.nomor}</span>
          </div>
<<<<<<< HEAD
          <span className="text-4xl text-neutral-800 text-end py-2 px-2">{ayat.ar}</span>
        </div>
        <div className="flex w-full flex-col">
          <span className="text-md text-neutral-500 text-start py-2">{ayat.idn}</span>
=======
          <span className="text-xl md:text-4xl text-neutral-800 text-end py-2 px-2 md:leading-14 font-amiri">{ayat.ar}</span>
        </div>
        <div className="flex w-full flex-col">
          <span className="text-sm md:text-md text-neutral-500 text-start py-2">{ayat.idn}</span>
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
        </div>
        <div className="w-full border-b border-neutral-200 my-4"></div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export function AyatCardSkeleton({ ref }: { ref?: any }) {
  return (
    <div
      ref={ref}
=======
export function AyatCardSkeleton({ ref, hidden }: { ref?: any, hidden?: boolean }) {
  return (
    <div
      ref={ref}
      hidden={hidden}
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
      className="w-full h-40">
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between w-full animate-pulse">
          <div className="w-8 h-8 bg-neutral-300 rounded-full flex justify-center items-center aspect-square">
            <span className="text-lg text-neutral-400 font-bold">0</span>
          </div>
          <span className="w-1/2 h-8 bg-neutral-300 rounded-md"></span>
        </div>
        <div className="flex w-full flex-col animate-pulse">
          <span className="w-3/4 h-6 bg-neutral-300 rounded-md"></span>
        </div>
        <div className="w-full border-b border-neutral-200 my-4 animate-pulse">
          <div className="w-full h-1 bg-neutral-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}