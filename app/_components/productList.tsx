"use client";

import Card from "@/app/_components/card";
import Link from "@/components/link";
import { ADMIN_PRODUCT_DETAIL_PATH } from "@/routes";
import { Product } from "@/types";
import useProductsWithIds from "../_hooks/useProductsWithIds";
import { useProductsData } from "../_libs/firebase/products";
import { combine } from "../_utils/combineClassnames";
import Spinner from "./spinner";
import { useSearchParams } from "next/navigation";
import useFilter from "../_hooks/useFilter";
import Headline from "./headline";

export default function ProductList() {
  //eslint-disable-next-line
  const [ products, loading, error, snapshot ] = useProductsData();
  const productsWithIds = useProductsWithIds(products, snapshot);
  const searchParams = useSearchParams();
  const filteredItems = useFilter(productsWithIds, searchParams.get("search")?.trim() ?? "", ["name", "description", "category"]);

  if (loading) return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center">
      <p className="text-lg">Cargando productos...</p>
      <Spinner/>
    </div>
  );
  return (
    <>
      {searchParams.get("search") ? (
        <p className="font-bold">{filteredItems.length} productos coinciden con {"\""}{searchParams.get("search")?.trim() ?? ""}{"\""}</p>
      ) : (
        <p className="font-bold">{filteredItems.length} productos</p>
      )}
      <ul className="grid gap-12 grid-cols-auto-fill my-12">
        {filteredItems.length > 0 ? filteredItems?.map((product: Product) =>
          <Link
            key={product.id}
            href={ADMIN_PRODUCT_DETAIL_PATH.replace(":id", product.id)}
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
              className={
                combine("group-hover:shadow-lg dark:group-hover:shadow-cake-500/40 group-hover:shadow-black/30",
                  product?.image && "justify-center"
                )
              }
            />
          </Link>
        )
          :
          (
            <Headline className="text-center col-span-full">No se encontraron productos...</Headline>
          )
        }
      </ul>
    </>
  );
}