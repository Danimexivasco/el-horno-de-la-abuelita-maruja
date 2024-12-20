import { useEffect, useRef, useState } from "react";

export default function useFilter(items: any[], query: string, fields: string[], debounceDelay = 100) {
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
    if (query) {
      filterItems();
    } else {
      setFilteredItems(items);
    }
  }, [items, debouncedValue]);

  const filterItems = () => {
    const filteredItems = items.filter(item => fields.some(field => item[field]?.toLowerCase().includes(query.toLowerCase())));

    return setFilteredItems(filteredItems);
  };

  return filteredItems;
}