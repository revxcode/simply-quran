import { BookOpen, Heart } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../button/themeModeToggle";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-900">
      <div className="flex w-full h-20 items-center px-4">
        <ModeToggle />
      </div>
      <div className="flex w-full h-[87vh] p-4">
        <div className="flex flex-col md:w-24 h-full items-center py-5 gap-4">
          <Link
            href="/quran"
            className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex justify-center items-center hover:bg-gray-100 dark:hover:bg-neutral-700">
            <BookOpen className="w-6 h-6 stroke-green-600" />
          </Link>
          <Link
            href="/quran/favorites"
            className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex justify-center items-center hover:bg-gray-100 dark:hover:bg-neutral-700">
            <Heart className="w-6 h-6 stroke-green-600" />
          </Link>
        </div>
        <div className="flex w-full h-[80vh] rounded-2xl overflow-y-auto">
          {children}
        </div>
        <div className="w-52 h-[80vh] hidden md:block">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-emerald-400 text-sm">Last Reading</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-400">surah</span>
                <span className="text-xs text-gray-500">ayah</span>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}