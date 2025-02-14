/* eslint-disable @stylistic/js/max-len */
import { Product, ProductVariant } from "@/types";
import { formatNumber } from "./formatNumber";

const roundNumber = (number: number) => {
  if (!number) throw new Error("No se ha pasado un parametro");
  if (typeof number !== "number") throw new Error("No se ha pasado un numero");

  return Math.round(number * 100) / 100;
};

export const getPrices = (product: Partial<Product>, quantity: number = 1, variant: Partial<ProductVariant> | null = null) => {
  if (!product) throw new Error("No se ha pasado un producto");
  if (quantity <= 0) throw new Error("La cantidad no puede ser negativa");
  if (variant && !variant?.id) throw new Error("No se ha pasado un variante");

  const { multiPrice, price, variants, onOffer, offerType, discountPercentage, multiplierAmount } = product;

  if ((multiPrice !== "yes" || !multiPrice) && onOffer === "yes" && offerType === "percentage") return {
    base:     price && Number(price),
    offer:    price && discountPercentage && roundNumber(Number(price - (price * discountPercentage) / 100)),
    discount: {
      type:  "percentage",
      label: discountPercentage && formatNumber(discountPercentage, "percent")
    }
  };

  if ((multiPrice !== "yes" || !multiPrice) && onOffer === "yes" && offerType === "multiplier") {
    const [before, after] = multiplierAmount?.split("x") ?? [];
    const effectiveQuantity = Math.floor(quantity / before) * after + (quantity % before);

    return {
      base:     Number(product.price),
      offer:    product.price && roundNumber(Number((effectiveQuantity * product.price) / quantity)),
      discount: {
        type:  "multiplier",
        label: multiplierAmount
      }
    };
  }

  if (multiPrice === "yes" && variants && variants.length > 0 && variant?.offerData?.onOffer !== "yes") {
    if (variant) {
      return {
        base: Number(variant.value)
      };
    }
  }

  if (multiPrice === "yes" && variant?.offerData?.onOffer === "yes" && variant?.offerData?.offerType === "percentage") {
    if (variant) {
      return {
        base:     Number(variant.value),
        offer:    variant?.value && variant?.offerData?.discountPercentage && roundNumber(Number(variant?.value - (variant?.value * variant?.offerData?.discountPercentage) / 100)),
        discount: {
          type:  "percentage",
          label: variant?.offerData?.discountPercentage && formatNumber(variant?.offerData?.discountPercentage, "percent")
        }
      };
    }
  }

  if (multiPrice === "yes" && variant?.offerData?.onOffer === "yes" && variant?.offerData?.offerType === "multiplier") {
    if (variant) {
      const [before, after] = variant?.offerData?.multiplierAmount?.split("x") ?? [];
      const effectiveQuantity = Math.floor(quantity / Number(before)) * Number(after) + (quantity % Number(before));

      return {
        base:     Number(variant.value),
        offer:    variant.value && roundNumber(Number((effectiveQuantity * variant.value) / quantity)),
        discount: {
          type:  "multiplier",
          label: variant?.offerData?.multiplierAmount
        }
      };
    }
  }

  return {
    base:  Number(price),
    offer: null
  };
};