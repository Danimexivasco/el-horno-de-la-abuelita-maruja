"use client";

import { useEffect, useState } from "react";
import { FilterIcon, TrashIcon } from "../_icons";
import AnimateHeight from "react-animate-height";
import PriceRangeSlider from "./priceRangeSlider";
import Container from "./container";
import Button from "./button";
import FormField from "./forms/formField";
import { useRouter, useSearchParams } from "next/navigation";
import { FILTER_PARAMS, FILTERS_INITIAL_STATE } from "@/constants";

type FiltersProps = {
  availableFilters: FiltersState
};

export type FiltersState = {
    category: string[],
    allergens: string[],
    priceFrom: number
    priceTo: number
    [key: string]: any
};

export default function Filters({ availableFilters }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterHeight, setFilterHeight] = useState<"auto" | number>(0);
  const [filters, setFilters] = useState<FiltersState>(FILTERS_INITIAL_STATE);
  const [currentParams, setCurrentParams] = useState(new URLSearchParams(searchParams.toString()));

  useEffect(() => {
    setCurrentParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
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

    router.replace(`?${currentParams.toString()}`);
  };

  useEffect(() => {
    const searchParamsFilters = {
      ...FILTERS_INITIAL_STATE
    };
    searchParams.entries().forEach(([key, value]) => {
      if(Array.isArray(filters[key])) {
        if (value.includes(",")) {
          searchParamsFilters[key] = [...new Set([...searchParamsFilters[key], value.split(",")].flat())];
        } else {
          searchParamsFilters[key] = [...new Set([...searchParamsFilters[key], value].flat())];
        }
      } else {
        searchParamsFilters[key] = value;
      }
    });
    setFilters(searchParamsFilters);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentValues = (filters[name] as string[]) || [];
    const updatedValues = e.target.checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    setFilters({
      ...filters,
      [name]: updatedValues
    });
  };

  const handlePriceChange = (priceFrom: number, priceTo: number) => {
    setFilters({
      ...filters,
      priceFrom: priceFrom ?? filters.priceFrom,
      priceTo:   priceTo ?? filters.priceTo
    });
  };

  const clearFilters = () => {
    setFilters(FILTERS_INITIAL_STATE);
    FILTER_PARAMS.filter(param => param !== "search").forEach(param => currentParams.delete(param));
    router.replace(`?${currentParams.toString()}`);
    setFilterHeight(0);
  };

  const closeFilters = () => {
    setTimeout(() => {
      setFilterHeight(0);
    }, 300);
  };

  return (
    <section className=" dark:bg-cake-950/60 bg-cake-200/40 shadow-md">
      <Container className="h-8 flex items-center justify-end py-8 lg:px-24">
        <div
          role="button"
          className="flex items-center gap-2"
          onClick={() => setFilterHeight(filterHeight ? 0 :
            "auto"
          )}
        >
          <span className="text-lg font-bold dark:text-cake-400 text-cake-600">Filtros</span>
          <FilterIcon className="w-8 h-8 dark:text-cake-400 text-cake-600"/>
        </div>
      </Container>
      <AnimateHeight
        duration={ 300 }
        height={filterHeight}
      >
        <form onSubmit={handleFilter}>
          <Container className="grid gap-16 lg:px-24 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-auto-fit items-start justify-items-start xl:justify-items-center gap-12 lg:gap-16 max-w-1/2">
              <PriceRangeSlider
                label="Precio"
                priceFrom={availableFilters.priceFrom}
                priceTo={availableFilters.priceTo}
                onChange={handlePriceChange}
              />
              <FormField
                input={{
                  name:    "category",
                  type:    "checkbox",
                  label:   "Categoria",
                  options: availableFilters.category?.map(category => ({
                    value:   category,
                    label:   category,
                    checked: filters.category.includes(category) ?? false
                  })),
                  onChange: handleChange
                }}
              />
              <FormField
                input={{
                  name:    "allergens",
                  type:    "checkbox",
                  label:   "Evitar alérgenos",
                  options: availableFilters.allergens?.map(allergen => ({
                    value:   allergen,
                    label:   allergen,
                    checked: filters.allergens.includes(allergen) ?? false
                  })),
                  onChange: handleChange
                }}
              />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row-reverse lg:justify-start items-center">
              <Button
                type="submit"
                className="w-full lg:w-fit lg:px-24 justify-center"
                onClick={closeFilters}
              >Filtrar
              </Button>
              <Button
                type="button"
                withIcon
                isRed
                className="w-full lg:w-fit lg:px-8 justify-center"
                onClick={clearFilters}
              ><TrashIcon className="w-5 h-5 mr-2"/>Borrar Filtros
              </Button>
            </div>
          </Container>
        </form>
      </AnimateHeight>
    </section>
  );
}