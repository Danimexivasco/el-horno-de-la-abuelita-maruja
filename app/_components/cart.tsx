"use client";

import { useEffect, useState } from "react";
import { CART_PATH } from "@/routes";
import Link from "./link";
import { CartIcon } from "../_icons";
import { combine } from "../_utils/combineClassnames";

type CartProps = {
    className?: string
};

export default function Cart({ className }: CartProps) {
  const [items, setItems] = useState(0);

  // TODO: Create hook to check cart item changes
  useEffect(() => {
    const items = localStorage.getItem("cart")?.length;
    if (items && items > 0) {
      setItems(items);
    }
  }, []);

  return (
    <Link
      href={CART_PATH}
      className="relative"
    >
      <CartIcon
        className={combine(
          "w-10 h-10 dark:active:text-cake-600 active:text-cake-700",
          className
        )}
        role="button"
      />
      {items > 0 &&
        <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 lg:translate-x-1 lg:-translate-y-3 text-xs py-1 px-2 dark:bg-cake-400/90 bg-cake-600/90 rounded-full text-black font-bold">{items}</span>
      }
    </Link>
  );
}