/* eslint-disable @stylistic/js/max-len */
import { Product } from "@/types";
import { FiltersState } from "../_components/filters";

export const getFiltersFromProducts = (products: Product[]) => {

  const filters: FiltersState = {
    category:  [],
    allergens: [],
    priceFrom: 0,
    priceTo:   0,
    onOffer:   false
  };

  products?.forEach((product: Product) => {

    if (!filters.category?.includes(product.category)) {
      filters.category?.push(product.category);
    }

    if (product.allergens?.some((allergen: string) => !filters.allergens?.includes(allergen))) {
      filters.allergens?.push(...product.allergens);
    }

    if (product.multiPrice === "yes") {
      const sortedVariants = product.variants?.sort((a, b) => a.value - b.value) ?? [];

      const minVariant = sortedVariants[0];
      const maxVariant = sortedVariants[sortedVariants.length - 1];
      const minPrice = minVariant ? minVariant.value : 0;
      const maxPrice = maxVariant ? maxVariant.value : 0;

      filters.priceFrom = filters.priceFrom !== 0 ? Math.min(filters.priceFrom, minPrice) : minPrice;
      filters.priceTo = filters.priceTo !== 0 ? Math.max(filters.priceTo, maxPrice) : maxPrice;
    } else {
      filters.priceFrom = filters.priceFrom !== 0 ? Math.min(filters.priceFrom, product.price): product.price;
      filters.priceTo = filters.priceTo !== 0 ? Math.max(filters.priceTo, product.price): product.price;
    }
  });
  filters.allergens = [...new Set(filters.allergens)];

  return filters;
};