"use client";

import { useTheme } from "@/hooks/useTheme";
import { combine } from "@/utils/combineClassnames";
import Button from "./button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeSwitchButtonProps = {
  className?: string
};

export default function ThemeSwitchButton({ className="" }: ThemeSwitchButtonProps) {
  const { theme, setTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!theme) return null;

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={combine("min-w-12 min-h-12 rounded-full p-2 transition-colors dark:bg-cake-400 dark:hover:bg-cake-500 dark:active:bg-cake-600 !text-black bg-cake-500 hover:bg-cake-600 active:bg-cake-700 z-40 shadow-xl", className)}
      ariaLabel="Toggle dark mode"
    >
      {isLoaded ?
        theme === "light" ? <Moon size={32}/> : <Sun size={32}/>
        : null
      }
    </Button>
  );
}