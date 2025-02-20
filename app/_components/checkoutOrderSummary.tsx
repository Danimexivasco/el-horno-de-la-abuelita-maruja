"use client";

import { Cart } from "@/types";
import Image from "next/image";
import { useLocalStorage } from "usehooks-ts";
import { LogoIcon, NoResultIcon } from "../_icons";
import Link from "./link";
import { CART_PATH, PRODUCT_DETAIL_PATH, PRODUCTS_PATH } from "@/routes";
import { formatNumber } from "../_utils/formatNumber";
import { useEffect, useState } from "react";
import { getTotals } from "../_utils/getTotals";

export default function CheckoutOrderSummary() {
  const [cartItems] = useLocalStorage<Cart>("cart", []);
  const [totals, setTotals] = useState({
    units:                0,
    price:                0,
    priceBeforeDiscounts: 0
  });

  useEffect(() => {
    if (cartItems?.length > 0) {
      const totals = getTotals(cartItems);
      setTotals(totals);
    }
  }, [cartItems]);

  return (
    <div className="lg:flex-1 dark:bg-cake-700/50 bg-cake-200 rounded-lg p-6 lg:p-8 lg:sticky lg:top-44 lg:max-w-md">
      <p className="text-3xl mb-8">Resumen del pedido</p>
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
                          "self-start w-16 aspect-square overflow-hidden rounded-lg flex items-center justify-center shadow-md shadow-black/30 dark:bg-cake-100 bg-cake-900 transition-colors duration-100 ease-linear"
                        }
                      >
                        <LogoIcon className="w-1/2 h-auto opacity-60"/>
                      </div>
                    }
                    <div className="flex flex-col flex-1 items-start text-start">
                      {variant ?
                        <>
                          <Link
                            href={`${PRODUCT_DETAIL_PATH.replace(":id", id)}?var=${variant}`}
                            className="font-bold no-underline"
                          >{name}
                          </Link>
                          <p className="text-sm">Opción: <span className="font-bold">{variant}</span></p>
                        </>
                        :
                        <Link
                          href={PRODUCT_DETAIL_PATH.replace(":id", id)}
                          className="font-bold no-underline"
                        >{name}
                        </Link>
                      }
                      <div className="flex items-center gap-2 mb-2">
                        {discount && discount.type === "multiplier" && <small className="dark:text-cake-400 text-cake-600 text-xs">Promoción: {discount.label}</small>}
                      </div>
                      <p className="text-sm">Cantidad: <span className="font-bold">{quantity}</span></p>
                    </div>
                    <div className="self-start">
                      {discount ? (
                        <p className="font-bold">{offer && formatNumber(offer)}</p>
                      ) : (
                        <p className="font-bold">{formatNumber(base)}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="grid gap-4 mb-8">
              <div className="flex justify-between items-center">
                <p>Productos totales</p>
                <p className="font-bold">{totals.units}</p>
              </div>
              {totals.priceBeforeDiscounts !== totals.price? (
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <p>Total sin descuento</p>
                    <p className="font-bold text-red-500 line-through">{formatNumber(totals.priceBeforeDiscounts)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Descuento</p>
                    <p className="font-bold">-{formatNumber(totals.priceBeforeDiscounts- totals.price)}</p>
                  </div>
                  <div className="border-t border-cake-500"></div>
                </div>
              ) : null}
              <div className="flex justify-between items-center font-bold">
                <p>Total (IVA incluido)</p>
                <p>{formatNumber(totals.price)}</p>
              </div>
            </div>
            <Link
              href={CART_PATH}
              asButton
              className="w-full text-center"
            >Ver productos en mi cesta
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="grid place-items-center rounded-full w-fit p-6 dark:bg-cake-600 bg-cake-400 mb-4">
              <NoResultIcon className="w-16 h-auto"/>
            </div>
            <p className="text-2xl font-bold">Tu cesta está vacía</p>
            <p className="text-xl text-center mb-8">Descubre nuestros deliciosos productos🤤</p>
            <Link
              href={PRODUCTS_PATH}
              asButton
            >Descubrir productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}