"use client";

import Card from "@/app/_components/card";
import Link from "@/components/link";
import { ADMIN_NEW_PRODUCT_PATH, ADMIN_PRODUCT_DETAIL_PATH } from "@/routes";
import { Product } from "@/types";
import useProductsWithIds from "../_hooks/useProductsWithIds";
import { useProductsData } from "../_libs/firebase/products";
import { combine } from "../_utils/combineClassnames";
import Spinner from "./spinner";

export default function ProductList() {
  //eslint-disable-next-line
  const [ products, loading, error, snapshot ] = useProductsData();
  const productsWithIds = useProductsWithIds(products, snapshot);

  if (loading) return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center">
      <p className="text-lg">Loading products</p>
      <Spinner/>
    </div>
  );
  return (
    <>
      <Link href={ADMIN_NEW_PRODUCT_PATH} asButton>+ Nuevo Producto</Link>
      <ul className="grid gap-8 grid-cols-auto-fill my-12">
        {productsWithIds.length > 0 && productsWithIds?.map((product: Product) =>
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
              image={product.image}
              className={
                combine("group-hover:ring-1 group-hover:ring-cake-500 group-hover:shadow-md group-hover:shadow-cake-700",
                  product?.image && "justify-center"
                )
              }
            />
          </Link>
        )}
      </ul>
    </>
  );
}