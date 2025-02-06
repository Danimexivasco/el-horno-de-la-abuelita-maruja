/* eslint-disable @stylistic/js/max-len */
import { Product, ProductVariant } from "@/types";
import { formatNumber } from "./formatNumber";

export const getPrices = (product: Partial<Product>, quantity: number = 1, variant: Partial<ProductVariant> | null = null) => {
  if (!product) throw new Error("No se ha pasado un producto");

  const { multiPrice, price, variants, onOffer, offerType, discountPercentage, multiplierAmount } = product;

  if ((multiPrice !== "yes" || !multiPrice) && onOffer === "yes" && offerType === "percentage") return {
    base:     price && Number(price),
    offer:    price && discountPercentage && Number(price - (price * discountPercentage) / 100),
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
      offer:    product.price && Number((effectiveQuantity * product.price) / quantity),
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
        offer:    variant?.value && variant?.offerData?.discountPercentage && Number(variant?.value - (variant?.value * variant?.offerData?.discountPercentage) / 100),
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
        offer:    variant.value && Number((effectiveQuantity * variant.value) / quantity),
        discount: {
          type:  "multiplier",
          label: variant?.offerData?.multiplierAmount
        }
      };
    }
  }

  return {
    base: Number(price)
  };
};