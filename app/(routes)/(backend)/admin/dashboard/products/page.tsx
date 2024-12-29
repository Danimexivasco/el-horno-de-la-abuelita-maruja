import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import ProductList from "@/app/_components/productList";
import { getProducts } from "@/app/_libs/firebase/products";
import { ADMIN_NEW_PRODUCT_PATH } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Productos",
  description: "Productos",
  openGraph:   {
    title:       "Productos",
    description: "Productos",
    url:         "https://el-horno-de-la-abuelita-maruja.vercel.app/admin/dashboard/products",
    siteName:    "El Horno de la Abuelita Maruja",
    locale:      "es-ES",
    type:        "website"
  }
};

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <Headline className="font-bold mb-8">Productos</Headline>
      <Link
        href={ADMIN_NEW_PRODUCT_PATH}
        asButton
        className="mb-8"
      >+ Nuevo Producto
      </Link>
      <ProductList
        products={products}
        isAdminPage
      />
    </>
  );
}