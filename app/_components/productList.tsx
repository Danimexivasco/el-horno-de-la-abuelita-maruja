"use client";

import Card from "@/app/_components/card";
import Link from "@/components/link";
import { ADMIN_PRODUCT_DETAIL_PATH, PRODUCT_DETAIL_PATH } from "@/routes";
import { Product } from "@/types";
import { combine } from "../_utils/combineClassnames";
import { useSearchParams } from "next/navigation";
import useFilter from "../_hooks/useFilter";
import Headline from "./headline";
import Spinner from "./spinner";
import { useEffect, useState } from "react";
import { handleSearchParams } from "../_utils/handleSearchParams";
import { useSessionStorage } from "usehooks-ts";
import { FiltersState } from "./filters";

type ProductListProps = {
  products: Product[];
  isAdminPage?: boolean
};

// TODO: Remove old items
export default function ProductList({ products, isAdminPage = false }: ProductListProps) {
  const searchParams = useSearchParams();
  const [activeFiltersStorage] = useSessionStorage<FiltersState | null>("active-filters", null);
  const [currentParams, setCurrentParams] = useState(new URLSearchParams(searchParams.toString()));

  useEffect(() => {
    if (activeFiltersStorage) {
      handleSearchParams(activeFiltersStorage, currentParams);
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    }
  }, [currentParams, activeFiltersStorage]);

  useEffect(() => {
    setCurrentParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const [filteredItems, loading] = useFilter(products, ["name", "description", "category"]);

  if (loading) return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <p className="text-lg">Cargando productos...</p>
      <Spinner/>
    </div>
  );

  return (
    <>
      {searchParams.get("search") ? (
        <p className="font-bold">{filteredItems.length} productos coinciden con la palabra {"\""}{searchParams.get("search")?.trim() ?? ""}{"\""}</p>
      ) : (
        <p className="font-bold">Mostrando {filteredItems?.length} productos</p>
      )}
      <ul className="grid gap-12 grid-cols-auto-fill my-12">
        {filteredItems?.length > 0 ? filteredItems?.map((product: Product) => {

          return (
            <Link
              key={product.id}
              href={isAdminPage ? ADMIN_PRODUCT_DETAIL_PATH.replace(":id", product.id) : PRODUCT_DETAIL_PATH.replace(":id", product.id)}
              className="group text-decoration-none no-underline dark:!text-white !text-black transition-all duration-200 ease-linear"
            >
              <Card
                key={product.id}
                name={product.name}
                description={product.description}
                category={product.category}
                price={product.price}
                multiPrice={product.multiPrice}
                variants={product.variants}
                image={product.image}
                onOffer={product.onOffer}
                offerType={product.offerType}
                discountPercentage={product.discountPercentage}
                multiplierAmount={product.multiplierAmount}
                reviews={product.reviews}
                showBuyBtn={!isAdminPage}
                className={
                  combine("group-hover:shadow-lg dark:group-hover:shadow-cake-500/40 group-hover:shadow-black/30",
                    product?.image && "justify-center"
                  )
                }
              />
            </Link>);
        }
        )
          :
          (
            <Headline className="text-center col-span-full">Vaya, no se encontraron productos... 😔<span className="block text-2xl mt-8">No te preocupes! Prueba a cambiar los filtros o la palabra de búsqueda 🤞🏽</span></Headline>
          )
        }
      </ul>
    </>
  );
}