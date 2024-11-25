import Headline from "@/app/_components/headline";
import ProductList from "@/app/_components/productList";
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

export default function Products() {
  return (
    <>
      <Headline className="font-bold mb-8">Productos</Headline>
      <ProductList />
    </>
  );
}