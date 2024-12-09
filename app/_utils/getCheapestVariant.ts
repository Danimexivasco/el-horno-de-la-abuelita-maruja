import { ProductVariant } from "@/types";
import { getDiscountPrice } from "./getDiscountPrice";

export default function getCheapestVariant(variants: ProductVariant[]) {
  const sortedVariants = variants?.sort((a, b) => a.value - b.value) ?? [];
  const cheapestVariant = sortedVariants?.[0];
  const cheapestVariantWithOffer = sortedVariants?.find(variant => variant.offerData?.onOffer === "yes" && variant.offerData.offerType === "percentage");
  const variantWithOfferPrice = getDiscountPrice(cheapestVariantWithOffer?.value ?? 0, cheapestVariantWithOffer?.offerData?.discountPercentage ?? 0);
  const returningVariant = cheapestVariantWithOffer && variantWithOfferPrice <= cheapestVariant?.value ? cheapestVariantWithOffer : cheapestVariant;

  return {
    price:            returningVariant?.value,
    onOffer:          returningVariant?.offerData?.onOffer,
    offerType:        returningVariant?.offerData?.offerType,
    discount:         returningVariant?.offerData?.discountPercentage,
    multiplierAmount: returningVariant?.offerData?.discountPercentage
  };
}