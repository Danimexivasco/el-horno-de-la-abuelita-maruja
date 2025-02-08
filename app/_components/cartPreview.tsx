import { CART_PATH, PRODUCT_DETAIL_PATH, PRODUCTS_PATH } from "@/routes";
import Link from "./link";
import { combine } from "../_utils/combineClassnames";
import { CrossIcon, LogoIcon, NoResultIcon, TrashIcon } from "../_icons";
import { Cart, User } from "@/types";
import { usePathname } from "next/navigation";
import Button from "./button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatNumber } from "../_utils/formatNumber";
import { showMsg } from "../_utils/showMsg";
import { updateUser } from "../_libs/firebase/users";

type CartPreviewProps = {
  opened: boolean
  user: User
  cartItems: Cart
  setItems: (_items: Cart) => void
  setCartOpened: (_opened: boolean) => void
};

export default function CartPreview({ opened, user, cartItems, setItems, setCartOpened }: CartPreviewProps) {
  const pathname = usePathname();
  const [totals, setTotals] = useState({
    units: 0,
    price: 0
  });

  // TODO: Add tests to getTotals and also to check that price is never 0
  const getTotals = () => cartItems?.reduce((acc, item) => {
    acc.units += item.quantity;
    if (item.price.discount) {
      acc.price += (item.price.offer ?? 0) * item.quantity;
    } else {
      acc.price += item.price.base * item.quantity;
    }
    return acc;
  }, {
    units: 0,
    price: 0
  });

  useEffect(() => {
    if (cartItems?.length > 0) {
      const totals = getTotals();
      setTotals(totals);
    }
  }, [cartItems]);

  const handleDeleteItem = (id: string) => async () => {
    if (!id) return null;
    try {
      const updatedCart = cartItems?.filter(item => item.id !== id);

      setItems(updatedCart);
      if (user) {
        updateUser(user?.id ?? "", {
          ...user,
          cart: updatedCart
        }, false);
      }
      showMsg("Producto eliminado", "success");
    } catch {
      showMsg("Error al eliminar el producto de la cesta", "error");
      throw new Error("Error al eliminar el producto de la cesta");
    }
  };

  return (
    <div
      className={combine("bg-black/30 fixed top-0 left-0 z-40 w-full h-[100dvh] transition-all ease-linear duration-300", opened ? "opacity-100 visible" : "opacity-0 invisible")}
      onClick={() => setCartOpened(false)}
    >
      <div
        className={combine("fixed top-0 right-0 z-50 w-full lg:min-w-96 lg:w-1/4 h-[100dvh] dark:bg-cake-900 bg-cake-100 dark:text-white text-black transition-colors transition-transform ease-in-out duration-300", opened ? "translate-x-0" : "translate-x-full")}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center mb-8 lg:mb-12 p-8 pb-0">
          <p className="text-2xl font-bold">Mi cesta</p>
          <CrossIcon
            className="w-6 h-6 dark:text-cake-400 text-cake-600"
            role="button"
            onClick={() => setCartOpened(false)}
          />
        </div>
        <div className="overflow-y-auto h-[calc(100dvh-(32px+32px+32px))] p-8 pt-0">
          <div>
            {cartItems.length > 0 ? (
              <>
                <ul className="grid gap-6 mb-8">
                  {cartItems.map(item => {
                    const { quantity, variant, product, price } = item;
                    const { id, name, image } = product;
                    const { base, offer, discount } = price;

                    return (
                      <li
                        key={item.id}
                        className="flex gap-4 items-center"
                      >
                        {image ?
                          <Image
                            src={image}
                            alt={name}
                            width={64}
                            height={64}
                            quality={100}
                            className="self-start rounded-lg aspect-square object-cover shadow-md shadow-black/30"
                          />
                          :
                          <div
                            className={
                              "self-start w-16 aspect-square overflow-hidden rounded-lg flex items-center justify-center dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
                            }
                          >
                            <LogoIcon className="w-1/2 h-auto opacity-60"/>
                          </div>
                        }
                        <div className="flex flex-col flex-1 items-start text-start">
                          <Link
                            href={PRODUCT_DETAIL_PATH.replace(":id", id)}
                            className="font-bold no-underline"
                          >{name}
                          </Link>
                          {variant ?
                            <p className="text-sm">Opción: <span className="font-bold">{variant}</span></p>
                            : null
                          }
                          <div className="flex items-center gap-2 mb-2">
                            {discount ? (
                              <p className="font-bold">{offer && formatNumber(offer)}</p>
                            ) : (
                              <p className="font-bold">{formatNumber(base)}</p>
                            )}
                            {discount && discount.type === "multiplier" && <small className="dark:text-cake-400 text-cake-600 text-xs">{discount.label}</small>}
                          </div>
                          <p className="text-sm">Cantidad: <span className="font-bold">{quantity}</span></p>
                        </div>
                        <TrashIcon
                          className="w-5 h-5 self-start"
                          role="button"
                          onClick={handleDeleteItem(item.id)}
                        />
                      </li>
                    );
                  })}
                </ul>
                <div className="grid gap-4 mb-8">
                  <div className="flex justify-between items-center">
                    <p>Cantidad Total</p>
                    <p className="font-bold">{totals.units}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Total (IVA incluido)</p>
                    <p className="font-bold">{formatNumber(totals.price)}</p>
                  </div>
                </div>
                {pathname === CART_PATH ? (
                  <Button
                    onClick={() => setCartOpened(false)}
                    className="w-full lg:w-fit text-center"
                  >
                    Ver productos en mi cesta
                  </Button>
                ) : (
                  <Link
                    href={CART_PATH}
                    asButton
                    className="w-full lg:w-fit text-center"
                  >Ver productos en mi cesta
                  </Link>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="grid place-items-center rounded-full w-fit p-6 dark:bg-cake-600 bg-cake-400 mb-4">
                  <NoResultIcon className="w-16 h-auto"/>
                </div>
                <p className="text-2xl font-bold">Tu carrito está vacío</p>
                <p className="text-xl text-center mb-8">Descubre nuestros deliciosos productos🤤</p>
                {pathname === PRODUCTS_PATH ? (
                  <Button onClick={() => setCartOpened(false)}>
                    Descubrir productos
                  </Button>
                ) : (
                  <Link
                    href={PRODUCTS_PATH}
                    asButton
                  >Descubrir prodcutos
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}