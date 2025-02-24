import { FILTER_PARAMS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import getCheapestVariant from "../_utils/getCheapestVariant";
import { getDiscountPrice } from "../_utils/getDiscountPrice";
import { Product } from "@/types";

function filterOnOfferProducts(products: Product[]): Product[] {
  return products.filter(product => {
    const isParentOnOffer = product.onOffer === "yes";

    const hasOnOfferVariant = product.variants?.some(variant => variant.offerData.onOffer === "yes");

    return isParentOnOffer || hasOnOfferVariant;
  });
}

export default function useFilter(items: any[], targetFields: string[], debounceDelay = 100): [Product[], boolean] {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") ?? "";
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items ?? []);
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(query), debounceDelay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, debounceDelay]);

  useEffect(() => {
    if (FILTER_PARAMS.some((param) => searchParams.get(param))) {
      filterItems();
    } else {
      setFilteredItems(items);
    }
  }, [items, searchParams, debouncedValue]);

  const filterItems = () => {
    setLoading(true);
    let filteredItems = items;
    searchParams.forEach((value, key) => {

      if (key === "priceFrom" || key === "priceTo") {
        const priceFrom = parseFloat(searchParams.get("priceFrom") ?? "0");
        const priceTo = parseFloat(searchParams.get("priceTo") ?? "Infinity");

        filteredItems = filteredItems.filter((item) => {
          const price = item.price ?? 0;
          let isWithinMinPrice = true;
          let isWithinMaxPrice = true;

          if (item.multiPrice === "yes") {
            const minVariant = getCheapestVariant(item.variants);

            const minPrice = minVariant ? getDiscountPrice(minVariant.price ?? 0, minVariant.discount ?? 0) : 0;

            isWithinMinPrice = Number(priceFrom) <= Number(minPrice);
            isWithinMaxPrice = Number(priceTo) >= Number(minPrice);

          } else {
            const itemWithOffer = item.onOffer === "yes" && item.offerType === "percentage";
            const finalPrice = itemWithOffer ? getDiscountPrice(Number(item.price ?? 0), Number(item.discountPercentage ?? 0)) : price;

            isWithinMinPrice = finalPrice >= priceFrom;
            isWithinMaxPrice = finalPrice <= priceTo;
          }

          return isWithinMinPrice && isWithinMaxPrice;
        });
      } else if (key === "allergens") {
        const allergens = value.split(",");

        filteredItems = filteredItems.filter(
          (item) => allergens.every((allergen) =>
            !item.allergens?.includes(allergen.toLowerCase())
          )
        );
      } else if (key === "search") {
        filteredItems = filteredItems.filter((item) =>
          targetFields.some((field) =>
            item[field]?.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else if (key === "category") {
        const categories = value.split(",");

        filteredItems = filteredItems.filter((item) =>
          categories.some((category) =>
            item.category?.toLowerCase().includes(category.toLowerCase())
          )
        );
      } else if (key === "onOffer") {
        filteredItems = filterOnOfferProducts(filteredItems);
      } else {
        filteredItems = filteredItems.filter((item) =>
          item[key]?.toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    setLoading(false);
    return setFilteredItems(filteredItems);
  };

  return [filteredItems, loading];
}