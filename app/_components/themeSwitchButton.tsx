"use client";

import { useTheme } from "@/hooks/useTheme";
import { combine } from "@/utils/combineClassnames";
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

  return isLoaded && (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      title={`Cambiar al modo ${theme === "light" ? "oscuro" : "claro"}`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={combine("relative flex h-10 w-16 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors p-1", className)}
    >
      <span
        className={`absolute left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? <Moon
          size={18}
          className="text-cake-900"
        /> : <Sun
          size={18}
          className="text-cake-500"
        />}
      </span>
    </button>
  );
}