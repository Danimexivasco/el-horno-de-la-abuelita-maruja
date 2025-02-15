import { Cart } from "@/types";

export const getTotals = (cartItems: Cart) => {
  if (!cartItems) return {
    units:                0,
    price:                0,
    priceBeforeDiscounts: 0
  };

  return cartItems?.reduce((acc, item) => {
    acc.units += item.quantity;
    if (item.price.discount) {
      acc.price += (item.price.offer ?? 0) * item.quantity;
    } else {
      acc.price += item.price.base * item.quantity;
    }
    acc.priceBeforeDiscounts += item.price.base * item.quantity;

    return acc;
  }, {
    units:                0,
    price:                0,
    priceBeforeDiscounts: 0
  });
};