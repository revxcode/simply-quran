"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  // State to keep track of theme after the first render
  const [mounted, setMounted] = React.useState(false)

  // This will run after the first render
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // If the component is not mounted yet, don't render the theme toggle
  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <button
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-colors duration-200 dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
      onClick={toggleTheme}
    >
      <Sun className={"absolute text-yellow-500 duration-700 ease-in-out " + (resolvedTheme === "dark" ? "rotate-0 opacity-0" : "rotate-[360deg]")} />
      <Moon className={"absolute text-blue-500 duration-700 ease-in-out " + (resolvedTheme === "dark" ? "rotate-[360deg]" : "rotate-0 opacity-0")} />
    </button>
  )
}
