"use client"

import Card from "@/app/_components/card";
import { Product } from "@/types";
import { useProductsData } from "../_libs/firebase/products";
import Link from "@/components/link";
import { ADMIN_NEW_PRODUCT_PATH, ADMIN_PRODUCT_DETAIL_PATH } from "@/routes";
import useProductsWithIds from "../_hooks/useProductsWithIds";
import { combine } from "../_utils/combineClassnames";

export default function ProductList() {
  //eslint-disable-next-line
  const [ products, loading, error, snapshot ] = useProductsData();
  const productsWithIds = useProductsWithIds(products, snapshot);
  // TODO: Remove mock data
  const mockProducts : Omit<Product, "categoria">[] = [
    {
      id: "1",
      name: "Apple Watch",
      description: "A sleek and modern smartwatch",
      price: 299.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-01-01T00:00:00.000Z")
    },
    {
      id: "2",
      name: "Samsung TV",
      description: "A high-definition TV with advanced features",
      price: 999.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-02-01T00:00:00.000Z")
    },
    {
      id: "3",
      name: "Nike Shoes",
      description: "Comfortable and stylish athletic shoes",
      price: 79.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-03-01T00:00:00.000Z")
    },
    {
      id: "4",
      name: "Sony Headphones",
      description: "High-quality wireless headphones",
      price: 149.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-04-01T00:00:00.000Z")
    },
    {
      id: "5",
      name: "Canon Camera",
      description: "A professional-grade digital camera",
      price: 499.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-05-01T00:00:00.000Z")
    },
    {
      id: "6",
      name: "Dell Laptop",
      description: "A powerful and portable laptop",
      price: 699.99,
      category: "galletas",
      createdAt: new Date("2022-06-01T00:00:00.000Z")
    },
    {
      id: "7",
      name: "Xbox Console",
      description: "A next-generation gaming console",
      price: 399.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-07-01T00:00:00.000Z")
    },
    {
      id: "8",
      name: "Fitbit Tracker",
      description: "A wearable fitness tracker",
      price: 99.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-08-01T00:00:00.000Z")
    },
    {
      id: "9",
      name: "Fitbit Tracker",
      description: "A wearable fitness tracker",
      price: 99.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-08-01T00:00:00.000Z")
    },
    {
      id: "10",
      name: "Fitbit Tracker",
      description: "A wearable fitness tracker",
      price: 99.99,
      category: "galletas",
      image: "https://placehold.co/600x400/jpg",
      createdAt: new Date("2022-08-01T00:00:00.000Z")
    }
  ]

  return (
    <>
      <Link href={ADMIN_NEW_PRODUCT_PATH} asButton>+ Nuevo Producto</Link>
      <ul className="grid gap-8 grid-cols-auto-fill my-12">
        {mockProducts?.map((product) =>
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
        {productsWithIds.length > 0 && productsWithIds?.map((product : Product) =>
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
  )
}