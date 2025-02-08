"use client";

import { ROUTES } from "@/routes";
import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";
import { usePathname } from "next/navigation";
import { combine } from "@/app/_utils/combineClassnames";
import useScrollPosition from "@/app/_hooks/useScrollPosition";
import useHideLayoutElements from "@/app/_hooks/useHideLayoutElements";

type HeaderProps = {
  user: string
};

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const parsedUser = JSON.parse(user);

  const hideHeader = useHideLayoutElements();

  const { scrollY, scrollDirection } = useScrollPosition();

  const navRoutes = ROUTES.filter(route => route.isNavRoute && !route.protected);

  return (
    <header
      className={combine(
        "sticky -top-24 lg:-top-36 z-50 lg:py-4 lg:px-8 flex items-center min-h-16 lg:h-36 dark:bg-cake-950 bg-cake-200 lg:glass lg:!bg-opacity-90 transition-all ease-linear duration-200",
        (scrollDirection === "up" && scrollY > 0) && "!top-0 lg:!bg-opacity-70",
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
      />
    </header>
  );
}