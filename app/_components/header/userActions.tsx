"use client";

import { useRouter } from "next/navigation";
import { User } from "@/types";
import { signOut } from "@/app/_libs/firebase/auth";
import { SIGN_IN_PATH } from "@/routes";
import { SignOutIcon, UserIcon } from "@/app/_icons";
import Button from "../button";
import Cart from "../cart";

type UserActionsProps = {
    user: User | null
};

export default function UserActions({ user }: UserActionsProps) {
  const router = useRouter();

  // TODO: adjust bg-cake-400/60 due to glass remove
  return (
    <div className="flex items-center gap-4">
      <div className="group relative">
        <UserIcon
          className="w-8 h-8 dark:active:text-cake-600 dark:hover:text-cake-500 hover:text-cake-700 active:text-cake-700"
          role="button"
        />
        <div className="hidden p-4 absolute group-hover:block group-hover:flex flex-col gap-2 top-full right-0 translate-x-1/2">
          <div
            className="relative right-4 flex flex-col gap-2 p-4 items-center rounded-md bg-cake-400/60 shadow-lg"
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
                  Cerrar Sesión <SignOutIcon className="w-4 h-4"/>
                </Button>
              </>

            ) : (
              <>
                <p className="whitespace-nowrap dark:text-white text-black">Todavía no estás logueado</p>
                <Button
                  onClick={() => router.push(SIGN_IN_PATH)}
                >
                  Inicia Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <Cart
        className="w-8 h-8"
      />
    </div>
  );
}