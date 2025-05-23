"use client";

import { useRouter } from "next/navigation";
import { User } from "@/types";
import { signOut } from "@/app/_libs/firebase/auth";
import {
  ADMIN_DASHBOARD_PATH,
  ORDERS_PATH,
  SIGN_IN_PATH,
  USER_PROFILE_PATH
} from "@/routes";
import { SignOutIcon, UserIcon } from "@/app/_icons";
import Button from "../button";
import Cart from "../cart";
import Avatar from "../avatar";
import { showMsg } from "@/app/_utils/showMsg";
import Link from "../link";
import {
  LayoutDashboard,
  User as LucideUserIcon,
  ShoppingBag
} from "lucide-react";
import ThemeSwitchButton from "../themeSwitchButton";
import { removeSession } from "@/actions/authActions";

type UserActionsProps = {
    user: User
};

export default function UserActions({ user }: UserActionsProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.refresh();
      showMsg("Sesión cerrada", "success");
    } catch {
      throw new Error("Ha ocurrido un error al cerrar la sesión");
    }
  };

  const handleSignInLink = async () => {
    await removeSession(); // Trick to remove first session cookie if any
    router.push(SIGN_IN_PATH);
  };

  // TODO: pedidos anteriores
  return (
    <div className="flex items-center gap-4">
      <Cart user={user}/>

      <div className="group relative p-2">
        {user ? (
          <Avatar
            user={user}
            className="group-hover:shadow-lg"
          />
        ) :
          <UserIcon
            className="w-8 h-8 dark:active:text-cake-600 dark:hover:text-cake-500 hover:text-cake-700 active:text-cake-700"
            role="button"
          />
        }
        <div className="hidden absolute group-hover:block group-hover:flex flex-col gap-2 right-0">
          <div
            className="relative right-0 top-6 flex flex-col gap-2 p-6 items-center text-start rounded-md dark:bg-cake-700 bg-cake-300 shadow-xl text-black dark:text-white"
          >
            {user ? (
              <>
                <div>
                  {user.username ?
                    <p>{user.username}</p>
                    : null
                  }
                  {user.email ?
                    <p className="text-sm italic">{user.email}</p>
                    : null
                  }
                </div>
                <div className="flex justify-between items-center gap-4 self-start w-full">
                  <p>Apariencia</p>
                  <ThemeSwitchButton className="scale-75"/>
                </div>
                <div className="border-t border-cake-500 my-2 w-full"></div>
                <Link
                  href={USER_PROFILE_PATH}
                  className="flex gap-2 self-start items-center no-underline dark:text-white dark:hover:text-cake-200 dark:active:text-cake-300 text-cake-800 hover:text-cake-900 active:text-cake-950"
                ><LucideUserIcon size={20} /><span>Mi perfil</span>
                </Link>
                <Link
                  href={ORDERS_PATH}
                  className="flex gap-2 self-start items-center no-underline dark:text-white dark:hover:text-cake-200 dark:active:text-cake-300 text-cake-800 hover:text-cake-900 active:text-cake-950"
                ><ShoppingBag size={20} />Mis pedidos
                </Link>
                {user.role === "admin" ?
                  <Link
                    href={ADMIN_DASHBOARD_PATH}
                    className="flex gap-2 self-start items-center no-underline dark:text-white dark:hover:text-cake-200 dark:active:text-cake-300 text-cake-800 hover:text-cake-900 active:text-cake-950"
                  ><LayoutDashboard size={20} />Ir al dashboard
                  </Link>
                  : null
                }
                <div className="border-t border-cake-500 my-2 w-full"></div>
                <div>

                </div>
                <Button
                  withIcon
                  isRed
                  onClick={handleSignOut}
                  className="whitespace-nowrap"
                >
                  <SignOutIcon className="w-4 h-4"/> Cerrar Sesión
                </Button>
              </>

            ) : (
              <>
                <div className="flex justify-between items-center gap-4 self-start w-full">
                  <p>Apariencia</p>
                  <ThemeSwitchButton className="scale-75"/>
                </div>
                <div className="border-t border-cake-500 my-2 w-full"></div>
                <p className="whitespace-nowrap dark:text-white text-black">Todavía no has iniciado sesión</p>
                <Button
                  onClick={handleSignInLink}
                >
                  Inicia Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}