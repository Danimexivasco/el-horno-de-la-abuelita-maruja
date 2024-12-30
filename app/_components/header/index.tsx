"use client";

import { ROUTES } from "@/routes";
import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";
import { usePathname } from "next/navigation";
import { combine } from "@/app/_utils/combineClassnames";
import { useEffect, useState } from "react";
import { getLoggedUser } from "@/actions/authActions";
import useScrollPosition from "@/app/_hooks/useScrollPosition";
import useHideLayoutElements from "@/app/_hooks/useHideLayoutElements";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  const hideHeader = useHideLayoutElements();

  const { scrollY, scrollDirection } = useScrollPosition();

  useEffect(() => {
    window?.scroll(0, 0);

    const getUser = async () => {
      const user = await getLoggedUser(true);
      if (user && typeof user === "string") {
        setUser(JSON.parse(user));
      }
    };
    getUser();
  }, [pathname]);

  const navRoutes = ROUTES.filter(route => route.isNavRoute && !route.protected);

  return (
    <header
      className={combine(
        "sticky -top-24 lg:-top-36 z-50 lg:py-4 lg:px-8 flex items-center h-24 lg:h-36 dark:bg-cake-950 bg-cake-200 glass !bg-opacity-80 transition-all ease-linear duration-200",
        (scrollDirection === "up" && scrollY > 0) && "!top-0 !bg-opacity-70",
        hideHeader && "hidden")}
    >
      <DesktopHeader
        navRoutes={navRoutes}
        activePathname={pathname}
        user={user}
        className="hidden lg:grid"
      />
      <MobileHeader
        navRoutes={navRoutes}
        activePathname={pathname}
        user={user}
        className="flex lg:hidden"
      />
    </header>
  );
}