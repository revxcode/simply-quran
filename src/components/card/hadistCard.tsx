"use client";

import useSettings from "@/hooks/useSettings";

export function HadistCard({ hadist }: { hadist: any }) {
  const { setting } = useSettings();
  return (
    <div className="w-full flex flex-col gap-2 py-4 animate-fade-in">
      <div className="flex justify-between w-full">
        <div className="w-12 h-12 flex justify-center items-center mt-4">
          <span className="text-5xl md:text-6xl font-ayat text-emerald-600">{hadist.id}</span>
        </div>
        <div className="flex flex-col w-full">
          <span className="text-md md:text-xl font-ayat text-emerald-600 text-nowrap text-end">{hadist.judul}</span>
          <span
            className="text-neutral-800 dark:text-neutral-200 text-end py-2 px-2 font-ayat tracking-wide leading-12 md:leading-24"
            style={{
              fontSize: setting?.arabicStyle?.fontSize + "px",
              fontFamily: setting?.arabicStyle?.fontFamily,
            }}
          >{hadist.arab}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <span className="md:text-md text-neutral-400 dark:text-neutral-500 text-start py-2"
          style={{
            fontSize: setting?.latinStyle?.fontSize + "px",
            fontFamily: setting?.latinStyle?.fontFamily,
          }}
        >{hadist.latin}</span>
      </div>
      <div className="flex w-full flex-col">
        <span className="md:text-md text-neutral-600 dark:text-neutral-300 text-start py-2"
          style={{
            fontSize: setting?.latinStyle?.fontSize + "px",
            fontFamily: setting?.latinStyle?.fontFamily,
          }}
        >{hadist.terjemah}</span>
      </div>
      <div className="w-full border-b border-neutral-300 dark:border-neutral-700 my-4"></div>
    </div>
  );
}