"use client";

import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_NEW_PRODUCT_PATH,
  ADMIN_PRODUCT_DETAIL_PATH,
  ADMIN_PRODUCTS_PATH,
  ROUTES,
  SIGN_IN_PATH,
  SIGN_UP_PATH
} from "@/routes";
import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";
import { usePathname } from "next/navigation";
import { combine } from "@/app/_utils/combineClassnames";
import { useEffect, useState } from "react";
import { getLoggedUser } from "@/actions/authActions";
import useScrollPosition from "@/app/_hooks/useScrollPosition";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

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
  const pathsWithoutHeader = [
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    ADMIN_DASHBOARD_PATH,
    ADMIN_PRODUCTS_PATH,
    ADMIN_NEW_PRODUCT_PATH,
    ADMIN_PRODUCT_DETAIL_PATH
  ];
  const hideHeader = pathsWithoutHeader.includes(pathname);

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