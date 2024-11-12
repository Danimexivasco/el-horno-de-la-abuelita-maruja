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
  
  if (!theme) return null
  return (
    <Button
      onClick={() => handleTheme(theme === "light" ? "dark" : "light")}
      className={combine("rounded-full p-2 transition-colors dark:bg-cake-400 dark:hover:bg-cake-500 dark:active:bg-cake-600 !text-black bg-cake-500 hover:bg-cake-600 active:bg-cake-700", className)}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}