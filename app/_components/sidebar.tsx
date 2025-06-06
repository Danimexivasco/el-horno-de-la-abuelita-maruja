"use client";

import { useState } from "react";
import Button from "@/components/button";
import { PRODUCTS_PATH, Route } from "@/routes";
import { useWindowSize } from "../_hooks/useWindowSize";
import { SignOutIcon, RightArrowIcon } from "../_icons";
import { signOut } from "../_libs/firebase/auth";
import { combine } from "../_utils/combineClassnames";
import SidebarNavItem from "./sidebarNavItem";
import ThemeSwitchButton from "./themeSwitchButton";
import Tooltip from "./tooltip";
import { useRouter } from "next/navigation";
import Link from "./link";
import { Store } from "lucide-react";

type SidebarProps = {
  routes: Route[]
  className?: string
};

export default function Sidebar({ routes = [], className = "" }: SidebarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isMobile } = useWindowSize();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh(); // Trick to enable header detection
  };

  return (
    <section
      className={combine("fixed z-50 sm:sticky sm:z-10 top-0 left-0 w-fit sm:w-20 min-w-20 min-h-[100dvh] h-[100dvh] flex flex-col justify-between py-3 dark:bg-cake-950 bg-cake-200 transition-all",
        !showMobileMenu && "!-left-20 w-2/3",
        className
      )}
    >
      <nav>
        <ul className={"flex flex-col gap-2"}>
          {routes.map((route) => (
            <SidebarNavItem
              key={route.label}
              path={route.path}
              label={route.label}
              onClick={() => isMobile && setShowMobileMenu(!showMobileMenu)}
            />
          ))}
        </ul>
      </nav>
      <ul className="grid place-items-center gap-4">
        <li className="flex justify-center w-full relative">
          <Link
            href={PRODUCTS_PATH}
            className="peer flex items-center "
          >
            <Store size={32}/>
          </Link>
          <Tooltip
            text={"Ir a la Tienda"}
          />
        </li>
        <li className="relative">
          <ThemeSwitchButton className="scale-75 peer"/>
        </li>
        <li
          className="flex justify-center relative w-full"
        >
          <Button
            className="peer w-12 h-12 flex justify-center items-center text-center rounded-3xl shadow-lg !text-black rounded-xl cursor-pointer p-0"
            isRed
            onClick={handleSignOut}
          >
            <SignOutIcon className="w-6 h-6"/>
          </Button>
          <Tooltip
            text="Cerrar Sesión"
          />
        </li>
      </ul>
      <Button
        withIcon
        className={combine("sm:hidden absolute top-1/2 right-0 translate-x-9 rounded-full p-3 transition-transform text-red", showMobileMenu && "rotate-180")}
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <RightArrowIcon className="w-6 h-6"/>
      </Button>
    </section>
  );
}