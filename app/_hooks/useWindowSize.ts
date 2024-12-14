import { useEffect, useState } from "react";

type WindowSize = Record<"width" | "height", number | undefined>;

type useWindowSizeValues = {
  windowSize: WindowSize;
  isMobile: boolean;
};
const MOBILE_BREAKPOINT = 640;

export const useWindowSize = (): useWindowSizeValues => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width:  undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        width:  window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile =
    windowSize.width !== undefined && windowSize.width < MOBILE_BREAKPOINT;

  return {
    windowSize,
    isMobile
  };
};