import { useEffect, useState } from "react";

type WindowSize = Record<"width" | "height", number | undefined>;

type useWindowSizeValues = {
    windowSize: WindowSize,
    isMobile: boolean
};
const MOBILE_BREAKPOINT = 640;

export const useWindowSize = (): useWindowSizeValues => {
  const initSize: WindowSize = {
    width:  window.innerWidth ?? undefined,
    height: window.innerHeight ?? undefined
  };

  const [windowSize, setWindowSize] = useState<WindowSize>(initSize);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        width:  window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    windowSize,
    isMobile: windowSize.width !== undefined && windowSize.width < MOBILE_BREAKPOINT
  };
};