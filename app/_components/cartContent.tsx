"use client";

import { Cart, CartItem, OfferTypes } from "@/types";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { getTotals } from "../_utils/getTotals";
import { formatNumber } from "../_utils/formatNumber";
import Link from "./link";
import { CHECKOUT_PATH, PRODUCT_DETAIL_PATH } from "@/routes";
import Image from "next/image";
import Button from "./button";
import { LogoIcon, TrashIcon } from "../_icons";
import Alert from "./alert";
import Counter from "./counter";
import { MAXIMUM_PRODUCTS_PURCHASE } from "@/constants";
import { getPrices } from "../_utils/getPrices";
import { showMsg } from "../_utils/showMsg";
import Headline from "./headline";

export default function CartContent() {
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useLocalStorage<Cart>("cart", []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totals = getTotals(items);

  const handleRemove = (id: CartItem["id"]) => () => {
    if (!id) return;

    setItems(items?.filter(item => item.id !== id));
    showMsg("Producto eliminado", "success");
  };

  const setQuantity = (id: CartItem["id"], product: CartItem["product"], variant: CartItem["variant"]) => (quantity: number) => {
    try {
      const { base, offer, discount } = getPrices(product, quantity, variant);

      setItems(prevItems => {
        let updatedCart = prevItems ?? [];

        if (prevItems?.some(item => item.id === id)) {
          updatedCart = items.map(item =>
            item.id === id
              ? {
                ...item,
                quantity: Math.min(Math.max(1, quantity), MAXIMUM_PRODUCTS_PURCHASE),
                price:    {
                  base: base ?? 0,
                  ...(offer && {
                    offer: offer
                  }),
                  ...(discount && {
                    discount: {
                      type:  discount.type as OfferTypes,
                      label: discount.label
                    }
                  })
                }
              }
              : item
          );
        }

        // TODO: UPDATE USER CART ON DB

        return updatedCart;
      });

      // showMsg("Cesta actualizada", "success");
    } catch {
      showMsg("Algo ha ido mal", "error");
    }
  };

  const renderPrices = (item: CartItem) => {
    const { quantity, variant, price } = item;
    const { base, offer, discount } = price;

    const priceToPay = discount && offer ? offer * quantity : base * quantity;

    return (
      <>
        {discount ? (
          <>
            <div className="flex gap-2 items-center">
              <p className="font-bold">{formatNumber(priceToPay)}</p>
              {discount.type === "percentage" ? (
                <small className="line-through dark:text-red-400 text-red-500">{formatNumber(base * quantity)}</small>
              ) : null}
              <small className="dark:text-cake-400 text-cake-600">{discount.label}</small>
            </div>
            {quantity > 1 ?
              <small>Precio por unidad: {offer && formatNumber(offer)}</small>
              : null
            }
          </>
        ) : (
          <>
            <p className="font-bold">{formatNumber(priceToPay)}</p>
            {quantity > 1 ?
              <small>Precio por unidad: {formatNumber(base)}</small>
              : null
            }
          </>
        )}
        {variant ?
          <p className="text-sm">Opción: <span className="font-bold">{variant}</span></p>
          : null}
      </>
    );
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col lg:flex-row items-start mb-4 lg:mb-8 justify-center lg:px-8">
      <div className="w-full">
        <Headline className="mb-6 lg:mb-0">Mi cesta</Headline>
        <p className="block lg:hidden"><span className="mr-2 font-bold">{totals.units}</span>productos</p>
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 mt-4 lg:mt-8 lg:mt-10">
          <section className="w-full flex-1">
            <div className="grid gap-6 w-full">
              {items && items?.map(item => {
                const { quantity, variant, product } = item;
                const { id, name, image } = product;

                const variantProduct = variant ? product.variants?.find(el => el.name === variant): null;

                return (
                  <div
                    key={item.id}
                    className="w-full border border-cake-500 rounded-lg p-6"
                  >
                    <div className="flex gap-6 flex-wrap">
                      {variant ?
                        <>
                          <Link
                            href={`${PRODUCT_DETAIL_PATH.replace(":id", id)}?var=${variant}`}
                            className="grid place-items-center dark:bg-cake-700/50 bg-cake-200 w-20 lg:w-28 h-w-20 lg:h-28 min-w-20 lg:min-w-28 rounded-lg"
                          >
                            {image ?
                              <Image
                                src={image}
                                alt={name}
                                width={105}
                                height={105}
                                quality={90}
                                loading="lazy"
                                className="w-full h-full object-cover aspect-square"
                              />
                              :
                              <LogoIcon className="w-1/4 h-auto opacity-60"/>
                            }
                          </Link>
                          <div>
                            <Link
                              href={`${PRODUCT_DETAIL_PATH.replace(":id", id)}?var=${variant}`}
                              className="font-bold no-underline"
                            >{name}
                            </Link>
                            {renderPrices(item)}
                          </div>
                        </>
                        :
                        <>
                          <Link
                            href={PRODUCT_DETAIL_PATH.replace(":id", id)}
                            className="grid place-items-center dark:bg-cake-700/50 bg-cake-200 w-20 lg:w-28 h-w-20 lg:h-28 min-w-20 lg:min-w-28 rounded-lg"
                          >
                            {image ?
                              <Image
                                src={image}
                                alt={name}
                                width={105}
                                height={105}
                                quality={90}
                                loading="lazy"
                                className="w-full h-full object-cover aspect-square"
                              />
                              :
                              <LogoIcon className="w-full opacity-60"/>
                            }
                          </Link>
                          <div>
                            <Link
                              href={PRODUCT_DETAIL_PATH.replace(":id", id)}
                              className="font-bold no-underline"
                            >{name}
                            </Link>
                            {renderPrices(item)}
                          </div>
                        </>
                      }
                      <div className="flex gap-4 items-start w-full md:w-fit ml-auto">
                        <Alert
                          title="Eliminar producto"
                          description="¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer."
                          triggerElement={<Button
                            isRed
                            className="w-11 h-11 flex items-center justify-center p-1"
                            title="Eliminar producto"
                          >
                            <TrashIcon className="w-5 h-5"/>
                          </Button>}
                          cancelElement={<Button>Cancelar</Button>}
                          actionElement={<Button
                            isRed
                            onClick={handleRemove(item.id)}
                          >Sí, eliminar
                          </Button>}
                        />
                        <Counter
                          value={quantity}
                          setValue={setQuantity(item.id, product, variantProduct)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <div className="sticky bottom-2 lg:top-44 gap-1 lg:gap-4 grid w-full dark:bg-cake-700/50 bg-cake-200 rounded-lg p-6 lg:p-8 lg:max-w-sm">
            <p className="hidden lg:grid text-2xl font-bold">Resumen del pedido:</p>
            <div className="hidden lg:grid grid-cols-[2fr_1fr] gap-6 lg:gap-12">
              <p>Productos totales</p>
              <p className="font-bold">{totals.units}</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-6 lg:gap-12 font-bold">
              <p>Total (IVA incluido)</p>
              <p className="font-bold">{formatNumber(totals.price)}</p>
            </div>
            <Link
              href={CHECKOUT_PATH}
              asButton
              className="w-full text-center mt-4"
            >
              Realizar pedido
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}