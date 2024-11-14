"use client"

import { signOut } from "../_libs/firebase/auth";
import { Route } from "@/routes";
import Link from "./link";
import { Logo } from "../_icons/logo";
import { getPath } from "../_utils/getPath";
import SidebarNavItem from "./sidebarNavItem";
import { LogOutIcon } from "../_icons";
import Button from "@/components/button";
import Tooltip from "./tooltip";
import { combine } from "../_utils/combineClassnames";

type SidebarProps = {
  routes: Route[]
  className?: string
}

export default function Sidebar({ routes=[], className="" }: SidebarProps) {
  return (
    <section
      className={combine("fixed w-20 min-h-screen h-full flex flex-col justify-between py-3 dark:bg-cake-950 bg-cake-200 transition-colors",
        className
      )}
    >
      <nav>
        <ul className="flex flex-col gap-2">
          {routes.map((route) => (
            <SidebarNavItem
              key={route.name}
              path={route.path}
              label={route.label}
            />
          ))}
          <li
            className="flex justify-center relative w-full"
          >
            <Link href={getPath("Home")} className="peer flex justify-center">
              <Logo className="w-14 h-14"/>
            </Link>
            <Tooltip
              text="Ir a la tienda"
            />
          </li>
        </ul>
      </nav>
      <ul className="grid place-items-center gap-2">
        
        <li
          className="flex justify-center relative w-full"
        >
          <Button
            className="peer w-12 h-12 flex justify-center items-center text-center rounded-3xl shadow-lg bg-red-500/80 hover:bg-red-600/80 active:bg-red-700/80 !text-black rounded-xl cursor-pointer p-0"
            onClick={async () => await signOut()}
          >
            <LogOutIcon className="w-6 h-6"/>
          </Button>
          <Tooltip
            text="Cerrar Sesión"
          />
        </li>
      </ul>
    </section>
  );
}