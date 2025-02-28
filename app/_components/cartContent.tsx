"use client";

import {
  Cart,
  CartItem,
  NewOrder,
  OfferTypes,
  Order,
  ProductVariant
} from "@/types";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { getTotals } from "../_utils/getTotals";
import { formatNumber } from "../_utils/formatNumber";
import Link from "./link";
import {
  CHECKOUT_PATH,
  PRODUCT_DETAIL_PATH,
  PRODUCTS_PATH,
  SIGN_IN_PATH
} from "@/routes";
import Image from "next/image";
import Button from "./button";
import { LogoIcon, NoResultIcon, TrashIcon } from "../_icons";
import Alert from "./alert";
import Counter from "./counter";
import { MAXIMUM_PRODUCTS_PURCHASE } from "@/constants";
import { getPrices } from "../_utils/getPrices";
import { showMsg } from "../_utils/showMsg";
import Headline from "./headline";
import { WithIsClientCheck } from "../_hocs/withIsClientCheck";
import { useRouter } from "next/navigation";
import { createOrder, updateOrder } from "../_libs/firebase/orders";
import { OrderStatus } from "../../enums";

const INITIAL_ORDER: Partial<NewOrder> = {
  products: [],
  state:    OrderStatus.PENDING
};

type CartContentProps = {
  user: string;
  pendingOrder: Order
};

function CartContent({ user, pendingOrder }: CartContentProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [items, setItems, removeItems] = useLocalStorage<Cart>("cart", []);
  const [order, setOrder] = useState(INITIAL_ORDER);

  const parsedUser = JSON.parse(user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (items?.length > 0) {
      prepareOrder(items);
    }
  }, [items]);

  const prepareOrder = (items: Cart) => {
    if (!items?.length) return;
    const orderProducts = items.map(item => {
      const { quantity, price } = item;
      const { base, offer, discount } = price;

      const priceToPay = discount && offer ? offer * quantity : base * quantity;

      return {
        id:         item.id,
        quantity:   quantity,
        unitPrice:  priceToPay / quantity,
        priceToPay: priceToPay
      };
    });

    setOrder({
      ...order,
      products: orderProducts
    });
  };

  const totals = getTotals(items);

  const handleRemove = (id: CartItem["id"]) => () => {
    if (!id) return;

    setItems(items?.filter(item => item.id !== id));
    showMsg("Producto eliminado", "success");
  };

  const setQuantity = (id: CartItem["id"], product: CartItem["product"], variant: ProductVariant | null) => (quantity: number) => {
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
                      label: discount.label as string
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        showMsg(`Error: ${error.message}`, "error");
      }
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

  const renderEmptyCart = () => {
    return (
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
    );
  };

  const handleOrder = async () => {
    try {
      let orderId;
      if (pendingOrder) {
        orderId = await updateOrder(pendingOrder.id ?? "", {
          ...pendingOrder,
          ...order,
          state:     "pending",
          updatedAt: Date.now()
        });
      } else {
        orderId = await createOrder({
          ...order,
          state:         OrderStatus.PENDING,
          products:      order.products ?? [],
          customerId:    parsedUser.id,
          createdAt:     Date.now(),
          customerEmail: parsedUser.email
        });
      }

      if (orderId) {
        router.push(`${CHECKOUT_PATH}?id=${orderId}`);
      }
    } catch {
      throw new Error("Error al realizar el pedido");
    }
  };

  if (!isClient) return null;

  return items && items?.length > 0 ? (
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

                const variantProduct = variant ? product.variants?.find(el => el.name === variant) : null;

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
                          setValue={setQuantity(item.id, product, variantProduct ?? null)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid lg:flex gap-4 lg:justify-between mt-6">
              <Alert
                title="Vaciar cesta"
                description="¿Seguro que deseas vaciar la cesta? Esta acción no se puede deshacer."
                triggerElement={<Button
                  isRed
                  title="Vaciar cesta"
                  withIcon
                  className="w-full lg:w-fit justify-center"
                >
                  <TrashIcon className="w-5 h-5"/> Vaciar cesta
                </Button>}
                cancelElement={<Button>Cancelar</Button>}
                actionElement={<Button
                  isRed
                  onClick={removeItems}
                >Sí, vaciar
                </Button>}
              />
              <Link
                href={PRODUCTS_PATH}
                asButton
                className="text-center w-full lg:w-fit"
              >
                Seguir comprando
              </Link>
            </div>
          </section>
          <div className="sticky bottom-2 lg:top-44 gap-1 lg:gap-4 grid w-full dark:bg-cake-700/50 bg-cake-200 rounded-lg p-6 lg:p-8 lg:max-w-sm shadow-md">
            <p className="hidden lg:grid text-2xl font-bold">Resumen del pedido:</p>
            <div className="hidden lg:grid grid-cols-[2fr_1fr] gap-6 lg:gap-12">
              <p>Productos totales</p>
              <p className="font-bold">{totals.units}</p>
            </div>
            {totals.priceBeforeDiscounts !== totals.price ? (
              <div className="hidden lg:grid gap-4">
                <div className="grid grid-cols-[2fr_1fr] gap-6 lg:gap-12">
                  <p>Total sin descuento</p>
                  <p className="font-bold text-red-500 line-through">{formatNumber(totals.priceBeforeDiscounts)}</p>
                </div>
                <div className="grid grid-cols-[2fr_1fr] gap-6 lg:gap-12">
                  <p>Descuento</p>
                  <p className="font-bold">-{formatNumber(totals.priceBeforeDiscounts - totals.price)}</p>
                </div>
                <div className="border-t border-cake-500"></div>
              </div>
            ) : null}
            <div className="grid grid-cols-[2fr_1fr] gap-6 lg:gap-12 font-bold lg:text-lg">
              <p>Total (IVA incluido)</p>
              <p className="font-bold">{formatNumber(totals.price)}</p>
            </div>
            {parsedUser ?
              <Button
                className="w-full"
                onClick={handleOrder}
              >Realizar pedido
              </Button>
              :
              <Link
                href={SIGN_IN_PATH}
                asButton
                className="w-full"
              >Inicia sesión para realizar el pedido
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  ) : (
    renderEmptyCart()
  );
}

export default WithIsClientCheck(CartContent);