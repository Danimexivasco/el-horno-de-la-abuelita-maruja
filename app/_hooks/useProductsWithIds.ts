import { useEffect, useState } from "react";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Product } from "@/types";

export default function useProductsWithIds(products: Product[], snapshot: QuerySnapshot<DocumentData, DocumentData>) {
  const [productsWithIds, setProductsWithIds] = useState<Product[]>([]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const _productsWithIds = products?.map((product, index) => {
        return {
          ...product,
          id: snapshot?.docs[index].id
        };
      });
      setProductsWithIds(_productsWithIds);
    }
  }, [products, snapshot?.docs?.length]);

  return productsWithIds;
}