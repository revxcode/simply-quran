"use client"

import { BookOpen, Heart, ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../button/themeModeToggle";
import { useState, useRef, useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleScroll = () => {
    // Memeriksa apakah scroll sudah lebih dari 100vh
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      console.log(scrollTop);
      setShowButton(scrollTop > 100);
    }
  };

  const scrollToTop = () => {
    // Menggunakan ref untuk scroll ke atas dengan smooth scroll
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef]);


  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-900">
      <div className="flex w-full h-20 items-center px-4">
        <ModeToggle />
      </div>
      <div className="flex w-full h-[87vh] p-4">
        {/* left sidebar */}
        <div className="relative">
          <button type="button"
            onClick={toggleSidebar}
            className={`absolute -left-6 top-1/3 cursor-pointer duration-200 ${open ? "rotate-180" : ""}`}>
            <ChevronRight className="w-8 h-8 stroke-emerald-600" />
          </button>
          <div className={"flex flex-col h-full items-center py-5 gap-4 duration-200 overflow-hidden " + (open ? "w-16" : "w-0")}>
            <Link
              href="/quran"
              className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex justify-center items-center hover:bg-gray-100 dark:hover:bg-neutral-700">
              <BookOpen className="w-6 h-6 stroke-emerald-600" />
            </Link>
            <Link
              href="/quran/favorites"
              className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex justify-center items-center hover:bg-gray-100 dark:hover:bg-neutral-700">
              <Heart className="w-6 h-6 stroke-emerald-600" />
            </Link>
          </div>
        </div>
        {/* main content */}
        <div ref={containerRef} className="flex w-full h-[80vh] rounded-2xl overflow-y-auto">
          {children}
          <button
            type="button"
            onClick={scrollToTop}
            className={"fixed right-6 cursor-pointer bg-neutral-100 rounded-full aspect-square shadow-lg flex justify-center items-center hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-2 " + (showButton ? "bottom-6 duration-500" : "-bottom-20 duration-500")}>
            <ChevronUp className="w-8 h-8 stroke-emerald-600" />
          </button>
        </div>
        {/* right sidebar */}
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