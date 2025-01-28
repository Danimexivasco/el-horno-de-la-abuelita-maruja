"use client";

import { Squash as Hamburger } from "hamburger-react";
import { HOME_PATH, Route, SIGN_IN_PATH } from "@/routes";
import Container from "../container";
import { User } from "@/types";
import { combine } from "@/app/_utils/combineClassnames";
import { LogoIcon, SignOutIcon } from "@/app/_icons";
import { useEffect, useState } from "react";
import Link from "../link";
import Cart from "../cart";
import Button from "../button";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/_libs/firebase/auth";
import ThemeSwitchButton from "../themeSwitchButton";

type MobileHeaderProps = {
    navRoutes: Route[]
    activePathname?: string
    user: User | null
    className?: string
};

export default function MobileHeader({ navRoutes=[], activePathname, user, className }: MobileHeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu && document) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [showMenu]);
  const handleLogin = () => {
    setShowMenu(false);
    router.push(SIGN_IN_PATH);
  };

  return (
    <>
      <Container className={combine("flex items-center justify-between !px-4 py-3 relative", className)}>
        <div className="dark:text-cake-400 text-cake-600 transition-colors">
          <Hamburger
            rounded
            size={28}
            toggled={showMenu}
            distance="lg"
            onToggle={() => setShowMenu(!showMenu)}
          />
        </div>
        <Link
          href={HOME_PATH}
          onClick={() => setShowMenu(false)}
        >
          <LogoIcon className="w-12 h-12"/>
        </Link>
        <Cart />
      </Container>
      <div className={combine("absolute top-full right-full w-full h-full min-h-[calc(100dvh-72px)] dark:bg-cake-950 bg-cake-200 transition-all ease-linear duration-200", showMenu && "!right-0")}>
        <Container className="h-full">
          <div className="h-full flex flex-col justify-between">
            <nav>
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
            </nav>
            <div className="flex justify-between items-end">
              <div>
                {user ? (
                  <>
                    <p className="text-lg">Estas logueado como:</p>
                    <i>{user?.username || user?.email}</i>
                    <Button
                      withIcon
                      isRed
                      onClick={async () => signOut()}
                      className="whitespace-nowrap mt-4"
                    >
                      Cerrar Sesión <SignOutIcon className="w-4 h-4"/>
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="dark:text-white text-black mb-2">Todavía no estás logueado</p>
                    <Button
                      onClick={handleLogin}
                    >
                      Inicia Sesión
                    </Button>
                  </>
                )}
              </div>
              <ThemeSwitchButton />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}