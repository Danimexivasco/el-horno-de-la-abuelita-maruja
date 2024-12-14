import { useState, useEffect, useCallback } from "react";

export interface ScrollState {
  lastScrollTop: number
  scrollY: number
  scrollDirection: "down" | "up" | ""
}

export const useScrollPosition = () => {
  const isClient = typeof window === "object";

  const [state, setState] = useState<ScrollState>({
    lastScrollTop:   0,
    scrollY:         isClient ? document.body.getBoundingClientRect().top : 0,
    scrollDirection: isClient ? "" : "down"
  });

  const handleScrollEvent = useCallback(() => {
    setState((prevState) => {
      const prevLastScrollTop = prevState.lastScrollTop;
      const bodyOffset = document.body.getBoundingClientRect();

      return {
        scrollY:         -bodyOffset.top,
        scrollDirection: prevLastScrollTop > -bodyOffset.top ? "up" : "down",
        lastScrollTop:   -bodyOffset.top
      };
    });
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      handleScrollEvent();
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [handleScrollEvent]);

  return {
    scrollY:         state.scrollY,
    scrollDirection: state.scrollDirection
  };
};

export default useScrollPosition;
