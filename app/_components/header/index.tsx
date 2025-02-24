"use client";

import { ROUTES } from "@/routes";
import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";
import { usePathname } from "next/navigation";
import { combine } from "@/app/_utils/combineClassnames";
import useScrollPosition from "@/app/_hooks/useScrollPosition";
import useHideLayoutElements from "@/app/_hooks/useHideLayoutElements";
import { useEffect, useState } from "react";

type HeaderProps = {
  user: string
};

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const parsedUser = JSON.parse(user);
  const [glassyHeader, setGlassyHeader] = useState(false);

  const hideHeader = useHideLayoutElements();

  const { scrollY } = useScrollPosition();

  const navRoutes = ROUTES.filter(route => route.isNavRoute && !route.protected);

  useEffect(() => {
    if (scrollY > 0 && !glassyHeader) {
      setGlassyHeader(true);
    } else if (scrollY <= 0) {
      setGlassyHeader(false);
    }
  }, [scrollY]);

  return (
    <>
      <header
        className={combine(
          "fixed w-full top-0 left-0 z-50 lg:py-4 lg:px-8 flex items-center min-h-16 lg:h-36 bg-opacity-98 dark:bg-cake-950 bg-cake-200 transition-all ease-linear duration-200",
          (glassyHeader) && "glass !bg-opacity-80 shadow-md shadow-black/10",
          hideHeader && "hidden"
        )}
      >
        <DesktopHeader
          navRoutes={navRoutes}
          activePathname={pathname}
          user={parsedUser}
          className="hidden lg:grid"
        />
        <MobileHeader
          navRoutes={navRoutes}
          activePathname={pathname}
          user={parsedUser}
          className="flex lg:hidden"
          glassyHeader={glassyHeader}
          setGlassyHeader={setGlassyHeader}
        />
      </header>
      {
        !hideHeader ? (
          <div className="mt-16 lg:mt-36"></div>
        ) : null
      }
    </>
  );
}