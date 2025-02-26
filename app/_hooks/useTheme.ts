import { useEffect } from "react";
import { DEFAULT_THEME } from "@/constants";
import { Theme } from "@/types";
import { useLocalStorage } from "usehooks-ts";
import Cookies from "js-cookie";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", DEFAULT_THEME);

  useEffect(() => {
    if (theme === "dark") {
      Cookies.set("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      Cookies.set("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return {
    theme,
    setTheme
  };
}