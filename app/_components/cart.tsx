"use client";

import { useEffect, useState } from "react";
import { CartIcon } from "../_icons";
import { combine } from "../_utils/combineClassnames";
import { useLocalStorage } from "usehooks-ts";
import { Cart as CartType, User } from "@/types";
import CartPreview from "./cartPreview";
import { usePathname } from "next/navigation";

type CartProps = {
  user: User
  className?: string
};

export default function Cart({ user, className }: CartProps) {
  const pathname = usePathname();
  const [items, setItems] = useLocalStorage<CartType>("cart", []);
  const [cartItems, setCartItems] = useState<CartType | null>(null);
  const [cartOpened, setCartOpened] = useState(false);

  // TODO: Find a way to update cart on the localstorage from DB user

  useEffect(() => {
    setCartItems(items || []);
  }, [items]);

  useEffect(() => {
    setCartOpened(false);
  }, [pathname]);

  useEffect(() => {
    if (cartOpened && document) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
  }, [cartOpened]);

  return (
    <>
      <button
        className="relative dark:text-cake-400 dark:hover:text-cake-500 dark:active:text-cake-600 text-cake-600 hover:text-cake-700 active:text-cake-800"
        onClick={() => setCartOpened(!cartOpened)}
      >
        <CartIcon
          className={combine(
            "w-8 h-8 dark:active:text-cake-600 active:text-cake-700",
            className
          )}
          role="button"
        />
        {cartItems && cartItems.length > 0 &&
          <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 lg:translate-x-1 lg:-translate-y-3 text-xs py-1 px-2 dark:bg-cake-400/90 bg-cake-600/90 rounded-full text-black font-bold">{cartItems.length}</span>
        }
      </button>

      <CartPreview
        opened={cartOpened}
        user={user}
        cartItems={cartItems ?? []}
        setItems={setItems}
        setCartOpened={setCartOpened}
      />
    </>
  );
}