"use client";

import { UserIcon, CartIcon, LogOutIcon } from "@/app/_icons";
import { signOut } from "@/app/_libs/firebase/auth";
import Link from "../link";
import { CART_PATH, SIGN_IN_PATH } from "@/routes";
import { User } from "@/types";
import Button from "../button";

type UserActionsProps = {
    user: User | null
};

export default function UserActions({ user }: UserActionsProps) {

  return (
    <div className="flex items-center gap-4">
      <div className="group relative">
        <UserIcon
          className="w-8 h-8 dark:active:text-cake-600 dark:hover:text-cake-500 hover:text-cake-700 active:text-cake-700"
          role="button"
        />
        <div className="hidden p-4 absolute group-hover:block group-hover:flex flex-col gap-2 top-full right-0 translate-x-1/2">
          <div
            className="relative right-4 flex flex-col gap-2 p-4 items-start rounded-md glass !bg-opacity-35 shadow-lg"
          >
            {user ? (
              <>
                <p className="whitespace-nowrap dark:text-white text-black">Logeado como:</p>
                <i className="text-sm whitespace-nowrap dark:text-white text-black">{user?.username || user?.email}</i>
                <Button
                  withIcon
                  isRed
                  onClick={async () => signOut()}
                  className="whitespace-nowrap mt-4"
                >
                  Cerrar Sesión <LogOutIcon className="w-4 h-4"/>
                </Button>
              </>

            ) : (
              <>
                <p className="whitespace-nowrap dark:text-white text-black">Todavía no estás logueado</p>
                <Link
                  href={SIGN_IN_PATH}
                >Inicia Sesión
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Link
        href={CART_PATH}
      >
        <CartIcon
          className="w-8 h-8 dark:active:text-cake-600 active:text-cake-700"
          role="button"
        />
      </Link>

    </div>
  );
}