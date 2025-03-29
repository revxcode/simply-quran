"use client"

import { ChevronLeft } from "lucide-react"
import { useState } from "react"

export default function SettingSurahPage() {
  const [arabicStyle, setArabicStyle] = useState({
    fontSize: 36,
    fontFamily: "Ayat Quran, serif",
  })
  const [latinStyle, setLatinStyle] = useState({
    fontSize: 18,
    fontFamily: "Ayat Quran, serif",
  })


  const fontFamilyList = [
    { name: "Font Ayat", value: "Ayat Quran, serif" },
    { name: "Font Amiri", value: "Amiri Quran, serif" },
    { name: "Font Sans", value: "sans-serif" },
    { name: "Font Mono", value: "monospace" },
  ]

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-900">
      <div className="">
        <div className="flex items-center justify-between w-full bg-neutral-100 dark:bg-neutral-800 p-4">
          <button
            className="text-neutral-900 dark:text-neutral-100 cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Settings
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl p-4">
          <p className="text-sm mt-2 text-center text-neutral-600 dark:text-neutral-400">
            Adjust the font size and style to your preference. The changes will
            be applied immediately.
          </p>
          <div className="mt-4 w-full max-w-lg">
            <ul className="flex flex-col gap-4">
              <h2>
                <span className="text-neutral-900 dark:text-neutral-100 text-lg font-bold ml-2">
                  Arabic
                </span>
              </h2>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Size
                </span>
                <input
                  type="range"
                  min="12"
                  max="48"
                  onChange={(e) => setArabicStyle({
                    ...arabicStyle,
                    fontSize: parseInt(e.target.value)
                  })}
                  value={arabicStyle.fontSize}
                  className="w-full h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-100">
                  {arabicStyle.fontSize}px
                </span>
              </li>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Style
                </span>
                <select
                  className="w-full h-8 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer px-2"
                  value={arabicStyle.fontFamily}
                  onChange={(e) => setArabicStyle({
                    ...arabicStyle,
                    fontFamily: e.target.value
                  })}
                >
                  {
                    fontFamilyList.map((font) => (
                      <option
                        key={font.value}
                        value={font.value}
                        className="text-sm"
                      >
                        {font.name}
                      </option>
                    ))
                  }
                </select>
              </li>
              <h2 className="text-neutral-900 dark:text-neutral-100 text-lg font-bold ml-2">
                Latin
              </h2>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Size
                </span>
                <input
                  type="range"
                  min="12"
                  max="48"
                  onChange={(e) => setLatinStyle({
                    ...latinStyle,
                    fontSize: parseInt(e.target.value)
                  })}
                  value={latinStyle.fontSize}
                  className="w-full h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-100">
                  {latinStyle.fontSize}px
                </span>
              </li>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Style
                </span>
                <select
                  className="w-full h-8 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer px-2"
                  value={latinStyle.fontFamily}
                  onChange={(e) => setLatinStyle({
                    ...latinStyle,
                    fontFamily: e.target.value
                  })}
                >
                  {
                    fontFamilyList.map((font) => (
                      <option
                        key={font.value}
                        value={font.value}
                        className="text-sm"
                      >
                        {font.name}
                      </option>
                    ))
                  }
                </select>
              </li>
              <li className="w-full h-48 flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4">
                <span className="text-emerald-600 text-wrap">
                  <span
                    style={{
                      fontSize: `${arabicStyle.fontSize}px`,
                      fontFamily: arabicStyle.fontFamily
                    }}>
                    بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: `${latinStyle.fontSize}px`,
                      fontFamily: latinStyle.fontFamily
                    }}
                  >
                    {"  In the name of Allah, the Most Gracious, the Most Merciful."}
                  </span>
                </span>
              </li>
              <h2 className="text-neutral-900 dark:text-neutral-100 text-lg font-bold ml-2">
                Murottal
              </h2>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Reciter
                </span>
                <select
                  className="w-full h-8 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer px-2"
                  defaultValue="Alafasy"
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                >
                  <option value="AbdulBasit">Abdul Basit</option>
                  <option value="Alafasy">Mishary Rashid Alafasy</option>
                  <option value="AlSudais">Abdul Rahman Al-Sudais</option>
                  <option value="SaadAlGhamdi">Saad Al-Ghamdi</option>
                  <option value="AbuBakrAlShatri">Abu Bakr Al-Shatri</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}