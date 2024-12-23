import { useEffect, useState } from "react";
import { DEFAULT_THEME } from "@/constants";
import { Theme } from "@/types";

export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const initialTheme: Theme = localStorage.getItem("theme") as Theme ?? DEFAULT_THEME;
    handleTheme(initialTheme);
  }, []);

  const handleTheme = (theme: Theme) => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      return document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
      return document.documentElement.classList.remove("dark");
    }
  };

  return {
    theme,
    handleTheme
  };
}