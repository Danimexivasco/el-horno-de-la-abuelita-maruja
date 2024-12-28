"use client";

import Card from "@/app/_components/card";
import Link from "@/components/link";
import { ADMIN_PRODUCT_DETAIL_PATH } from "@/routes";
import { Product } from "@/types";
import { combine } from "../_utils/combineClassnames";
import { useSearchParams } from "next/navigation";
import useFilter from "../_hooks/useFilter";
import Headline from "./headline";
import Spinner from "./spinner";

type ProductListProps = {
  products: Product[];
};

// TODO: Remove old items
export default function ProductList({ products }: ProductListProps) {
  const searchParams = useSearchParams();

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
        {filteredItems?.length > 0 ? filteredItems?.map((product: Product) =>
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