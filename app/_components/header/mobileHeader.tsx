"use client";

import { Squash as Hamburger } from "hamburger-react";
import {
  ADMIN_DASHBOARD_PATH,
  HOME_PATH,
  ORDERS_PATH,
  Route,
  SIGN_IN_PATH,
  USER_PROFILE_PATH
} from "@/routes";
import Container from "../container";
import { User } from "@/types";
import { combine } from "@/app/_utils/combineClassnames";
import { LogoIcon, SignOutIcon } from "@/app/_icons";
import Link from "../link";
import Cart from "../cart";
import Button from "../button";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/_libs/firebase/auth";
import ThemeSwitchButton from "../themeSwitchButton";
import {
  LayoutDashboard,
  User as LucideUserIcon,
  ShoppingBag
} from "lucide-react";
import { WithIsClientCheck } from "../../_hocs/withIsClientCheck";
import { removeSession } from "@/actions/authActions";

type MobileHeaderProps = {
    navRoutes: Route[]
    activePathname?: string
    user: User
    showMenu: boolean
    setShowMenu: (_b: boolean) => void
    className?: string
};

function MobileHeader({ navRoutes = [], activePathname, user, showMenu, setShowMenu, className }: MobileHeaderProps) {
  const router = useRouter();

  const handleLogin = async () => {
    setShowMenu(false);
    await removeSession(); // Trick to remove first session cookie if any
    router.push(SIGN_IN_PATH);
  };

  const handleLogout = async () => {
    setShowMenu(false);
    await signOut();
    router.refresh();
  };

  return (
    <>
      <Container className={combine("flex items-center justify-between !px-4 py-3 relative", className)}>
        <div className="dark:text-cake-400 text-cake-600">
          <Hamburger
            rounded
            size={28}
            toggled={showMenu}
            distance="lg"
            color="currentColor"
            onToggle={() => setShowMenu(!showMenu)}
          />
        </div>
        <Link
          href={HOME_PATH}
          onClick={() => setShowMenu(false)}
        >
          <LogoIcon className="w-12 h-12"/>
        </Link>
        <Cart user={user}/>
      </Container>
      <div className={combine("lg:invisible transition-all ease-linear duration-300", showMenu ? "opacity-100 visible" : "opacity-0 invisible" )}>
        <div className={combine("absolute top-full right-0 w-full h-full min-h-[calc(100dvh-72px)] dark:bg-cake-950 bg-cake-200 transition-transform ease-in-out duration-300", showMenu ? "translate-x-0" : "-translate-x-full" )}>
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
                      <Link
                        href={USER_PROFILE_PATH}
                        className="flex gap-2 mb-2 font-bold"
                      ><LucideUserIcon size={20}/>Mi perfil
                      </Link>
                      <Link
                        href={ORDERS_PATH}
                        className="flex gap-2 mb-2 font-bold"
                      ><ShoppingBag size={20}/>Mis pedidos
                      </Link>
                      {user.role === "admin" ? (
                        <Link
                          href={ADMIN_DASHBOARD_PATH}
                          className="flex gap-2 mb-2 font-bold"
                        ><LayoutDashboard size={20}/>Ir al dashboard
                        </Link>
                      ) : null}
                      {user.username ?
                        <p>{user.username}</p>
                        : null
                      }
                      {user.email ?
                        <p className="text-sm italic">{user.email}</p>
                        : null
                      }
                      <Button
                        withIcon
                        isRed
                        onClick={handleLogout}
                        className="whitespace-nowrap mt-4"
                      >
                        Cerrar Sesión <SignOutIcon className="w-4 h-4"/>
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleLogin}
                    >
                      Iniciar Sesión
                    </Button>
                  )}
                </div>
                <ThemeSwitchButton />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default WithIsClientCheck(MobileHeader);