import { Cart } from "@/types";

const INITIAL_VALUES = {
  units: 0,
  price: 0
};

export const getTotals = (cartItems: Cart) => {
  if (!cartItems) return INITIAL_VALUES;

  return cartItems?.reduce((acc, item) => {
    acc.units += item.quantity;
    if (item.price.discount) {
      acc.price += (item.price.offer ?? 0) * item.quantity;
    } else {
      acc.price += item.price.base * item.quantity;
    }
    return acc;
  }, INITIAL_VALUES);
};