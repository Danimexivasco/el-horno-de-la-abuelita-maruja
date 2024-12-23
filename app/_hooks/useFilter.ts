import { FILTER_PARAMS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useFilter(items: any[], targetFields: string[], debounceDelay = 100) {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") ?? "";
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
    if (FILTER_PARAMS.some(param => searchParams.get(param))) {
      filterItems();
    } else {
      setFilteredItems(items);
    }
  }, [items, searchParams, debouncedValue]);

  const filterItems = () => {
    let filteredItems = items;
    searchParams.forEach((value, key) => {
      if (key === "priceFrom" || key === "priceTo") {
        const priceFrom = parseFloat(searchParams.get("priceFrom") ?? "0");
        const priceTo = parseFloat(searchParams.get("priceTo") ?? "Infinity");

        filteredItems = filteredItems.filter((item) => {
          const price = item.price ?? 0;
          return price >= priceFrom && price <= priceTo;
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
      } else {
        filteredItems = filteredItems.filter((item) =>
          item[key]?.toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    return setFilteredItems(filteredItems);
  };

  return filteredItems;
}