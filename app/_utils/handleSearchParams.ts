import { FiltersState } from "../_components/filters";

export function handleSearchParams(filters: FiltersState, currentParams: URLSearchParams) {
  if (filters.category.length > 0) {
    currentParams.set("category", filters.category.join(","));
  } else {
    currentParams.delete("category");
  }
  if (filters.allergens.length > 0) {
    currentParams.set("allergens", filters.allergens.join(","));
  } else {
    currentParams.delete("allergens");
  }
  if (filters.priceFrom > 0) {
    currentParams.set("priceFrom", filters.priceFrom.toString());
  } else {
    currentParams.delete("priceFrom");
  }

  if(filters.priceTo > 0) {
    currentParams.set("priceTo", filters.priceTo.toString());
  } else {
    currentParams.delete("priceTo");
  }

  return currentParams;
}