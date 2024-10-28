"use client"

import { useTheme } from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "@/icons/index";
import { combine } from "@/utils/combineClassnames";
import Button from "./button";

type ThemeSwitchButtonProps = {
  className?: string
}

export default function ThemeSwitchButton({ className="" }: ThemeSwitchButtonProps) {
  const { theme, handleTheme } = useTheme()
  
  return (
    <Button
      onClick={() => handleTheme(theme === "light" ? "dark" : "light")}
      className={combine("rounded-full p-2 transition-colors dark:bg-cake-100 dark:hover:bg-cake-200 dark:active:bg-cake-300 bg-cake-800 hover:bg-cake-900 active:bg-cake-950", className)}
    >
      {theme === "light" ? <MoonIcon className="text-cake-200"/> : <SunIcon className="text-cake-950"/>}
    </Button>
  )
}