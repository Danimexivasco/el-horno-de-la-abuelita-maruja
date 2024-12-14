"use client";

import { Squash as Hamburger } from "hamburger-react";
import { HOME_PATH, Route } from "@/routes";
import Container from "../container";
import { User } from "@/types";
import { combine } from "@/app/_utils/combineClassnames";
import { LogoIcon } from "@/app/_icons";
import { useEffect, useState } from "react";
import Link from "../link";

type MobileHeaderProps = {
    navRoutes: Route[]
    activePathname?: string
    user: User | null
    className?: string
};

export default function MobileHeader({ navRoutes=[], activePathname, user, className }: MobileHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (showMenu && document) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [showMenu]);
  return (
    <>
      <Container className={combine("flex items-center justify-between !p-4 relative", className)}>
        <div className="absolute left-4 dark:text-cake-400 text-cake-600 transition-colors">
          <Hamburger
            rounded
            toggled={showMenu}
            onToggle={() => setShowMenu(!showMenu)}
          />
        </div>
        <Link
          href={HOME_PATH}
          className="mx-auto"
          onClick={() => setShowMenu(false)}
        >
          <LogoIcon className="w-16 h-16 "/>
        </Link>
      </Container>
      <div className={combine("absolute top-full right-full w-full min-h-[calc(100vh-96px)] dark:bg-cake-950 bg-cake-200 transition-all ease-linear duration-200", showMenu && "!right-0")}>
        <Container>
          <ul className="grid gap-8">
            {navRoutes?.map((route: Route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  onClick={() => setShowMenu(false)}
                  className={combine(
                    "w-fit text-3xl font-bold no-underline dark:active:text-cake-600 active:text-cake-700",
                    activePathname === route.path && "dark:text-cake-600 text-cake-700"
                  )}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}