"use client"

import { ChevronLeft, Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import useSettings from "@/hooks/useSettings"
import { useEffect, useState } from "react"

export default function SettingSurahPage() {
  const { setting: settings, setSetting: setSettings } = useSettings()
  const { resolvedTheme, setTheme } = useTheme()
  const [loading, setLoading] = useState(true)

  const fontFamilyList = [
    { name: "Font Ayat", value: "Ayat Quran, serif" },
    { name: "Font Amiri", value: "Amiri Quran, serif" },
    { name: "Font Sans", value: "sans-serif" },
    { name: "Font Mono", value: "monospace" },
  ]

  useEffect(() => {
    if (settings) {
      setLoading(false)
    }
  }, [settings])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-neutral-900">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Loading...
        </p>
      </div>
    )
  }

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
            <ul className="relative flex flex-col gap-4 py-8">
              <h2>
                <span className="text-neutral-900 dark:text-neutral-100 text-lg font-bold ml-2">
                  Arabic
                </span>
              </h2>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4 z-10">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Size
                </span>
                <input
                  type="range"
                  min="12"
                  max="48"
                  onChange={(e) => setSettings({
                    ...settings,
                    arabicStyle: {
                      ...settings?.arabicStyle,
                      fontSize: parseInt(e.target.value)
                    }
                  })}
                  value={settings?.arabicStyle?.fontSize}
                  className="w-full h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-100">
                  {settings?.arabicStyle?.fontSize}px
                </span>
              </li>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4 z-10">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Style
                </span>
                <select
                  className="w-full h-8 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer px-2 text-black dark:text-white"
                  value={settings?.arabicStyle?.fontFamily}
                  onChange={(e) => setSettings({
                    ...settings,
                    arabicStyle: {
                      ...settings?.arabicStyle,
                      fontFamily: e.target.value
                    }
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
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4 z-10">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Size
                </span>
                <input
                  type="range"
                  min="12"
                  max="48"
                  onChange={(e) => setSettings({
                    ...settings,
                    latinStyle: {
                      ...settings?.latinStyle,
                      fontSize: parseInt(e.target.value)
                    }
                  })}
                  value={settings?.latinStyle?.fontSize}
                  className="w-full h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-100">
                  {settings?.latinStyle?.fontSize}px
                </span>
              </li>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4 z-10">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Font Style
                </span>
                <select
                  className="w-full h-8 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer px-2 text-black dark:text-white"
                  value={settings?.latinStyle?.fontFamily}
                  onChange={(e) => setSettings({
                    ...settings,
                    latinStyle: {
                      ...settings?.latinStyle,
                      fontFamily: e.target.value
                    }
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
                      fontSize: `${settings?.arabicStyle?.fontSize}px`,
                      fontFamily: settings?.arabicStyle?.fontFamily
                    }}>
                    بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: `${settings?.latinStyle?.fontSize}px`,
                      fontFamily: settings?.latinStyle?.fontFamily
                    }}
                  >
                    {"  In the name of Allah, the Most Gracious, the Most Merciful."}
                  </span>
                </span>
              </li>
              <h2 className="text-neutral-900 dark:text-neutral-100 text-lg font-bold ml-2">
                Murottal
              </h2>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4 z-10">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Reciter
                </span>
                <select
                  className="w-full h-8 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer px-2 text-black dark:text-white"
                  value={settings?.murottal?.reciter}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      murottal: {
                        reciter: e.target.value
                      }
                    })
                  }}
                >
                  <option value="AbdulBasit">Abdul Basit</option>
                  <option value="Alafasy">Mishary Rashid Alafasy</option>
                  <option value="AlSudais">Abdul Rahman Al-Sudais</option>
                  <option value="SaadAlGhamdi">Saad Al-Ghamdi</option>
                  <option value="AbuBakrAlShatri">Abu Bakr Al-Shatri</option>
                </select>
              </li>
              <li className="w-full h-14 flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow gap-4 z-10">
                <span className="w-1/4 text-sm text-neutral-900 dark:text-neutral-100 text-nowrap">
                  Theme
                </span>
                {
                  !loading && (
                    <div className="flex items-center justify-between w-full">
                      <button
                        type="button"
                        className={`w-1/3 h-8 rounded-lg flex items-center gap-2 px-2 text-sm text-neutral-900 dark:text-neutral-100
                      ${resolvedTheme === "light" ? "bg-neutral-300 dark:bg-neutral-700 font-bold" : "bg-transparent"}`}
                        onClick={() => setTheme("light")}
                      >
                        <Sun />
                        Light
                      </button>
                      <button
                        type="button"
                        className={`w-1/3 h-8 rounded-lg flex items-center gap-2 px-2 text-sm text-neutral-900 dark:text-neutral-100
                      ${resolvedTheme === "dark" ? "bg-neutral-300 dark:bg-neutral-700 font-bold" : "bg-transparent"}`}
                        onClick={() => setTheme("dark")}
                      >
                        <Moon />
                        Dark
                      </button>
                      <button
                        type="button"
                        className={`w-1/3 h-8 rounded-lg flex items-center gap-2 px-2 text-sm text-neutral-900 dark:text-neutral-100
                      ${resolvedTheme === "system" ? "bg-neutral-300 dark:bg-neutral-700 font-bold" : "bg-transparent"}`}
                        onClick={() => setTheme("system")}
                      >
                        <Monitor />
                        System
                      </button>
                    </div>
                  )
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}